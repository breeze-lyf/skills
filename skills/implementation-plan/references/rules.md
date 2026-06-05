# Implementation Plan Rules

## Template Fidelity

- Treat the user's template as the contract.
- Do not add columns not present in the template.
- Do not add a gantt sheet unless the template already has one or the user asks for it.
- Do not replace the template with a fresh design. Copy or edit the template workbook and write into its existing structure.
- Preserve visible formatting patterns, especially:
  - title block
  - blue table header
  - gray stage rows
  - light-blue active/current rows
  - black borders and strong separators
  - filters and freeze panes when possible
  - column widths

## Editing Existing User Work

If the user says they edited the workbook:

- Import the current file and modify only requested areas.
- Do not rerun an old full-generation script that could overwrite user edits.
- Inspect the changed area before patching.
- After editing, inspect the same area again and report what changed.

## Dates and Scheduling

- Fill planned start and planned end for every execution row when the template has date fields.
- Keep stage rows as summary spans of their child rows.
- Skip weekends when the user asks to avoid weekends or when prior project context established that convention.
- For half-day work, use the same date on adjacent rows if two half-day tasks share one workday.
- Only use integer or `.5` day concepts in user-facing text. Avoid `1.2`, `0.8`, or similar fractional values unless the user explicitly gives them and wants them preserved.
- If the template does not include person-day columns, do not mention person-days in the plan.

## Remarks Column

The remarks column should contain action notes, dependencies, or clarifications. Good examples:

- `前置确认事项`
- `确认报表字段、角色权限、导出字段`
- `同步校验报表角色权限`
- `项目交付排期，不计入收费人天`
- `上线交接排期`

Avoid:

- `4.5天，6月19日与下一项半天衔接`
- `0.5天，承接上一项半天`
- `20人天`
- `计费人天`
- pricing commentary, unless the template has a pricing field or the user asks.

## Output/File Columns

Only fill output/file columns with artifacts that will actually exist as files or records.

Keep:

- `确认版范围清单`
- `字段清单、权限矩阵`
- `联调记录、问题清单`
- `测试用例、验收记录`
- `上线记录、操作说明`
- `验收报告`
- `上线报告`

Clear or avoid:

- `考勤组入口`
- `权限控制逻辑`
- `排班详情报表页`
- `Excel 导出功能`
- `筛选组件与查询接口`
- `页面交互与异常提示`
- other pages, features, APIs, UI modules, or logic names that are not files/records.

## Common Cleanup Checks

Before final response:

- Formula-error scan returns no `#REF!`, `#DIV/0!`, `#VALUE!`, `#NAME?`, `#N/A`.
- No accidental placeholder values remain in body rows, especially `18`, `25`, `XX`, old company names, or old project titles unless intentionally preserved from the template.
- No stale merged cells in the rewritten body area cause dates to span unrelated rows.
- Output columns are blank for rows without real output files.
- Remarks contain work descriptions, not person-day arithmetic.
- The final link points to the exported workbook, not a scratch script or old variant.
