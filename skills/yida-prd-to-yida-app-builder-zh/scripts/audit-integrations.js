#!/usr/bin/env node
'use strict';

const fs = require('fs');

const file = process.argv[2];
const protectedOwners = (process.argv[3] || '').split(',').map(s => s.trim()).filter(Boolean);
const raw = file ? fs.readFileSync(file, 'utf8') : fs.readFileSync(0, 'utf8');
const rows = JSON.parse(raw);

function namingStatus(name) {
  if (!name || name === '未命名') return 'BAD_UNNAMED';
  if (/^【[^】]+】.+/.test(name)) return 'OK';
  return 'CHECK_NAMING';
}

function ownerStatus(owner) {
  return protectedOwners.includes(owner) ? 'PROTECTED_OWNER' : '';
}

console.log('status\tmodifier\townerFlag\tname\tnaming\tformUuid\tprocessCode\tgmtModified');
for (const row of rows) {
  console.log([
    row.status || '',
    row.modifier || '',
    ownerStatus(row.modifier || ''),
    row.name || '',
    namingStatus(row.name || ''),
    row.formUuid || '',
    row.processCode || '',
    row.gmtModified || ''
  ].join('\t'));
}
