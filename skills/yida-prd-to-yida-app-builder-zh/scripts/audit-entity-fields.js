#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const schemaDir = args[0];
const labelPattern = new RegExp(args[1] || '名称|编号|门店|产品|供应商|工厂|设备|合同|人员|师傅');

if (!schemaDir) {
  console.error('Usage: audit-entity-fields.js <schema-dir> [label-regex]');
  console.error('Example: audit-entity-fields.js .cache/schemas \"门店名称|供应商名称|设备编号\"');
  process.exit(1);
}

function zh(value) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value.zh_CN || value.en_US || value.pureEn_US || '';
}

function parseJsonFile(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const start = raw.indexOf('{');
  const data = JSON.parse(start >= 0 ? raw.slice(start) : raw);
  return typeof data.content === 'string' ? JSON.parse(data.content) : data.content || data;
}

function walk(node, out = [], parent = '') {
  if (Array.isArray(node)) {
    node.forEach(child => walk(child, out, parent));
    return out;
  }
  if (!node || typeof node !== 'object') return out;
  const label = zh(node.props && node.props.label);
  const fieldId = node.props && node.props.fieldId;
  if (node.componentName && fieldId && labelPattern.test(label)) {
    out.push({ node, label, fieldId, parent });
  }
  const nextParent = label || parent;
  for (const child of node.children || []) walk(child, out, nextParent);
  return out;
}

function formNameFromFile(file) {
  return path.basename(file).replace(/-FORM-.+\.json$/, '').replace(/\.json$/, '');
}

function assocTarget(props) {
  const assoc = props.associationForm || {};
  return zh(assoc.formTitle || assoc.title) || assoc.formUuid || '';
}

function yesNo(value) {
  return value ? 'YES' : 'NO';
}

const files = fs.readdirSync(schemaDir)
  .filter(file => file.endsWith('.json') && file !== 'index.json')
  .map(file => path.join(schemaDir, file));

console.log('form\tparent\tlabel\tcomponentName\tfieldId\tassociationTarget\thasFillingRules\thasFilterRules\tbehavior\tsubmittable\trecommendation');

for (const file of files) {
  let schema;
  try {
    schema = parseJsonFile(file);
  } catch (err) {
    continue;
  }
  const tree = schema.pages ? schema.pages[0].componentsTree : schema.content && schema.content.pages && schema.content.pages[0].componentsTree;
  if (!tree) continue;
  for (const item of walk(tree)) {
    const props = item.node.props || {};
    const isAssoc = item.node.componentName === 'AssociationFormField';
    const isReadonly = props.behavior === 'READONLY' || props.behavior === 'HIDDEN';
    const hasFilling = !!(props.dataFillingRules && (
      (props.dataFillingRules.mainRules || []).length ||
      (props.dataFillingRules.tableRules || []).length
    ));
    const hasFilter = !!(props.dataFilterRules && (props.dataFilterRules.rules || []).length);
    const recommendation = isAssoc || isReadonly ? 'OK_OR_DERIVED' : 'CHECK_IF_SHOULD_ASSOCIATE';
    console.log([
      formNameFromFile(file),
      item.parent,
      item.label,
      item.node.componentName,
      item.fieldId,
      assocTarget(props),
      yesNo(hasFilling),
      yesNo(hasFilter),
      props.behavior || '',
      props.submittable || '',
      recommendation
    ].join('\t'));
  }
}
