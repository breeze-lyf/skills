#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

function zh(value) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value.zh_CN || value.en_US || value.pureEn_US || '';
}

function walk(node, out = [], depth = 0) {
  if (Array.isArray(node)) {
    node.forEach(child => walk(child, out, depth));
    return out;
  }
  if (!node || typeof node !== 'object') return out;
  if (node.componentName && node.props && node.props.fieldId) {
    out.push({
      depth,
      componentName: node.componentName,
      label: zh(node.props.label),
      fieldId: node.props.fieldId,
      behavior: node.props.behavior || '',
      submittable: node.props.submittable || '',
      hidden: node.props.hidden || ''
    });
  }
  for (const value of Object.values(node)) {
    if (value && typeof value === 'object') walk(value, out, depth + 1);
  }
  return out;
}

function parseSchema(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const jsonStart = raw.indexOf('{');
  const data = JSON.parse(jsonStart >= 0 ? raw.slice(jsonStart) : raw);
  const content = typeof data.content === 'string' ? JSON.parse(data.content) : data.content || data;
  const tree = content.pages ? content.pages[0].componentsTree : content.content.pages[0].componentsTree;
  return walk(tree);
}

const files = process.argv.slice(2);
if (!files.length) {
  console.error('Usage: extract-yida-fields.js <schema.json> [schema.json ...]');
  process.exit(1);
}

for (const file of files) {
  console.log(`\n# ${path.basename(file)}`);
  console.log('label\tcomponentName\tfieldId\tbehavior\tsubmittable\thidden');
  for (const row of parseSchema(file).filter(r => r.label)) {
    console.log([row.label, row.componentName, row.fieldId, row.behavior, row.submittable, row.hidden].join('\t'));
  }
}
