---
name: requirements-discovery
description: Turns contracts, implementation lists, kickoff notes, meeting minutes, sample forms, and customer documents into grounded requirements-discovery outputs. Use when the user asks to generate or review a customer discovery plan, required-customer-materials list, workflow diagram, phase-one scope, form/process logic, implementation research table, or to compare an initial discovery plan with actual customer findings across any industry.
---

# Requirements Discovery

## Purpose

Use this skill to avoid turning a contract or feature list into a fake business process. First separate facts from assumptions, identify the customer's real operating spine and system boundary, then generate practical discovery materials and a customer-provided-materials list.

This skill is industry-neutral. It can apply to manufacturing, catering, retail, service, education, government workflows, finance operations, or any custom business system.

## Core Rule

Do not start from an industry template. Start from one real business case and follow it end to end.

Required order of work:

1. Extract explicit facts from source files.
2. Mark inferred assumptions separately.
3. Identify the operating spine: the single identifier, object, person, order, case, project, customer, table, reservation, or service request everything should hang from.
4. Identify system boundaries and body-outside-system exceptions.
5. Identify phase-one scope versus later topics.
6. Generate a unified required-customer-materials table.
7. Only then generate the research table, workflow, form logic, automation rules, and confirmation questions.

## Source Handling

When given files, inspect the actual content before writing outputs. For Word/Excel/PPT files, extract paragraphs and tables with document/spreadsheet tools.

Classify important items as:

- `confirmed`: explicitly stated in source material or meeting notes.
- `assumption`: inferred from feature lists, contracts, or common practice.
- `question`: must be confirmed with the customer.
- `out-of-scope-for-now`: useful, but should not drive phase-one design.

If the only source is a contract or implementation list, say that it is not enough to determine the true process. Generate a discovery hypothesis, not a final process.

## Discovery Workflow

### 1. Find the operating spine

Ask or infer cautiously:

- What object does the business track from beginning to end?
- Is it an order, contract, reservation, table, project, production order, service ticket, patient/customer record, application, invoice, or case?
- Can one upstream object split into multiple downstream objects?
- Can it have multiple batches, appointments, deliveries, invoices, payments, visits, or settlements?
- Which reports and costs must aggregate by this spine?

If the spine is unknown, make it the first confirmation question.

### 2. Trace one real case

Request one complete historical sample when possible. Adapt the list to the industry:

- source request or customer entry point
- quotation/menu/order/application/ticket/contract
- internal planning or assignment record
- purchase/resource/preparation/execution records
- delivery/service/completion record
- invoice/receipt/payment/settlement records
- report or financial summary

Use the sample to validate the proposed flow. Do not rely only on department names or module names.

### 3. Define boundaries

Before listing forms, confirm what does not enter the main system:

- customer-owned items or third-party-owned items
- offline contracts, supplier formats, or external approval tools
- legacy finance/ERP/POS/CRM systems that remain authoritative
- documents that are only attachments, not structured data
- operational details too unstable for phase one
- manual exceptions that should be tracked outside the main workflow

Represent these as explicit boundary notes, not missing requirements.

### 4. Separate data categories

Always distinguish:

- master data: customers, suppliers, products, services, employees, departments, locations, warehouses, stores, tables, assets, subjects, etc.
- transaction data: orders, tickets, reservations, purchases, visits, deliveries, applications, payments, invoices.
- status data: approval state, execution state, payment state, sync state.
- external system data: ERP/POS/finance/CRM/warehouse/payment platform data.
- reporting dimensions: time, customer, project/order/case, department, employee, location, category, status.

### 5. Phase the scope

Recommend a first phase that proves the main loop before adding detail:

`operating spine -> required master data -> core transaction flow -> approval/execution -> finance/settlement -> reports/integration`

Defer details that are unstable, high-complexity, or not needed to prove the main loop.

## Required Customer Materials Table

When the user asks what materials the customer should provide, generate one unified table. Do not produce a huge unrealistic laundry list.

Use columns like:

| 优先级 | 模块/场景 | 需要客户提供 | 提供形式 | 用途 | 是否必须 | 备注/待确认 |
|---|---|---|---|---|---|---|

Rules:

- Merge similar requests into one row. For example, do not separately ask for every field if a current Excel export or screenshot can cover it.
- Prefer "current template + 3 to 5 desensitized examples" over abstract field lists.
- Accept Excel, Word, PDF, screenshots, system exports, paper form photos, or verbal walkthrough notes.
- Separate `first batch required` from `later supplement`.
- Include "one complete real case sample" as a high-priority row when possible.
- Explain that the customer does not need to standardize the materials before sending them.

Recommended priority labels:

- `P0`: required before discovery/design can be credible.
- `P1`: needed before form/process configuration.
- `P2`: can be supplemented during build or testing.

## Output Templates

### Customer Materials List

Use when generating a required-customer-materials list from a contract or implementation list:

1. Short note: "Provide existing materials as-is; templates, exports, screenshots, or desensitized examples are acceptable."
2. Unified table with priority, module/scenario, material, format, purpose, must-have, notes.
3. Small "minimum first batch" list: usually 6 to 10 items maximum.
4. Follow-up confirmation questions.

### Discovery Review

Use when comparing an earlier research plan with actual findings:

1. `High-level verdict`: where the earlier plan was right and wrong.
2. `Major differences`: spine, boundary, integration, phase-one scope, special cases.
3. `Root causes`: which assumptions came from feature-list thinking.
4. `Corrections`: how the next discovery output should change.
5. `Prevention checklist`: questions to ask before generating a plan.

### Customer Research Plan

Use this structure for new discovery materials:

1. `Known facts`
2. `Assumptions to verify`
3. `Operating spine hypothesis`
4. `End-to-end sample case walkthrough`
5. `Department/role interview table`
6. `Required customer materials table`
7. `Boundary confirmation questions`
8. `Phase-one scope recommendation`
9. `Risks and follow-up topics`

### Workflow Diagram

For Mermaid or draw.io outputs, show:

- main spine and key identifiers
- phase-one main loop
- exception/boundary flows as dashed or side notes
- external system integration as a separate lane
- deferred topics as a backlog, not part of the critical path

## Mandatory Confirmation Checklist

Before presenting any workflow as final, confirm or call out as unknown:

- What is the core identifier/object for the whole lifecycle?
- What is the relationship among upstream and downstream objects?
- Which data belongs in the main system, and which stays outside?
- Which existing system remains authoritative?
- What is the real trigger for each important action?
- Which steps are automatic, approval-based, manually initiated, or only recorded after the fact?
- Which reports must aggregate by which dimensions?
- What integration path exists: API, database/SQL, import file, webhook, manual export/import, or no integration?
- Which modules are phase-one, and which are later topics?
- What real examples can the customer provide to validate the flow?

## Anti-Patterns

Avoid these:

- Treating a feature list as a confirmed process.
- Listing every possible system form as a customer request.
- Assuming an industry-standard flow before seeing one real case.
- Assuming API integration because a list says "API".
- Making advanced reports, detailed payroll, complex production, or edge-case logic phase-one by default.
- Hiding exceptions instead of documenting them as system boundaries.
