---
name: implementation-plan
description: Create or revise project implementation master plans from project scope, meeting notes, cost sheets, and spreadsheet templates. Use when the user asks to generate an implementation plan, implementation master plan, project delivery plan, 项目实施主计划, 实施计划, 交付计划, or asks to fit a project plan into a provided Excel/WPS template while preserving the template's existing fields and style.
---

# Implementation Plan

## Purpose

Create spreadsheet-based implementation plans that match the user's provided template exactly enough to be usable with customers. Prefer template fidelity over adding explanatory fields.

## Workflow

1. **Read the current artifact first**
   - If the user provides a template, inspect its sheets, headers, merged regions, existing stage rows, filters, grouping, borders, and date columns.
   - If the user provides an existing generated plan and says they modified it, import that file and edit in place. Do not regenerate from an older script unless explicitly asked.
   - Use the spreadsheet skill/runtime for `.xlsx` work. Verify exported workbooks after writing.

2. **Extract project structure**
   - Build stages from the project scope, meeting notes, cost sheet, and confirmed delivery boundaries.
   - Keep non-billable but schedule-relevant work in the plan when it affects project duration, such as scope confirmation, field confirmation, joint debugging, UAT, acceptance, and go-live.
   - Do not expose pricing logic unless the template has such a field or the user asks for it.

3. **Map to the template only**
   - Use only columns already present in the template. Do not add new columns such as `计费人天`, `排期工期`, `风险等级`, or `甘特图` unless the template already contains them or the user asks.
   - Preserve the template's sheet count unless asked to add sheets.
   - Preserve obvious styling: title area, header colors, stage row fill, borders, filters, frozen rows, grouping, column widths, and merged-title areas.
   - Before writing body rows, unmerge only the body area that will be rewritten to avoid stale merged cells swallowing dates.

4. **Write clean implementation rows**
   - Use parent stage rows for high-level phases.
   - Use subtask rows only where the template shows that style or the project needs real execution detail.
   - For late phases, follow the template's style. Some templates use simple stage rows like `3 内部测试`, `4 用户测试`, `5 项目验收`, `6 部署上线`; do not force parent/child structure there.
   - Dates should be detailed enough that each executable row has its own planned start/end date when the template supports dates.

5. **Keep remarks and outputs disciplined**
   - Remarks should say what happens or what must be confirmed. Do not put person-day calculations in remarks.
   - Output/file columns should contain only real files or records that will exist, such as `范围确认清单`, `字段清单`, `权限矩阵`, `联调记录`, `问题清单`, `测试用例`, `验收记录`, `上线记录`, `操作说明`.
   - Clear output cells for pages, UI modules, features, logic, and APIs when those are not actual output files.

6. **Verify before final**
   - Inspect key ranges and formula errors.
   - Confirm no template-forbidden extra columns or sheets were added.
   - Confirm stale placeholder values such as accidental `18`, `25`, or old template names are removed.
   - Confirm date cells are per-row and not caused by stale merged cells.

Read [references/rules.md](references/rules.md) when the task involves a spreadsheet template, a user-modified plan, Chinese/WPS implementation plans, or ambiguity about what belongs in remarks/output columns.
