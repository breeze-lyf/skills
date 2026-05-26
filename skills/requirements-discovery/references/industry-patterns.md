# Industry-Neutral Discovery Patterns

Use this only when the task needs examples of how the same discovery method adapts across industries.

## Universal Pattern

Every project has an operating spine:

- manufacturing: production order, project, sales order, equipment serial number
- catering: table/order, reservation, meal period, store, delivery order
- retail: customer order, store, product SKU, return/exchange request
- service: service ticket, contract, customer asset, work order
- education: student, course, class, enrollment, payment record
- government/approval: application, case, applicant, approval batch

The discovery goal is to find the spine, not to apply a preset industry workflow.

## Better First Questions

1. What number/object does everyone use when asking "where is this now"?
2. Show one completed real case from start to finish. Which documents exist?
3. Which data is structured in the system, and which stays as attachments or external records?
4. Which external systems are authoritative?
5. Which steps are required for phase one, and which are nice-to-have?
6. Which exceptions happen often enough to design for?
7. What reports does management actually need first?

## Sample Material Requests By Industry

### Manufacturing / project delivery

- one complete order/project sample
- BOM, purchase order, inbound record, shipment/outbound record
- invoice/payment examples
- material category and project cost examples

### Catering / restaurant

- menu/category/item list
- table/reservation/order examples
- kitchen ticket or production/prep workflow
- cashier/payment/refund examples
- inventory or purchase examples, if in scope

### Retail / trading

- product/SKU/customer/supplier exports
- sales order, return/exchange, delivery examples
- purchase/inbound/outbound examples
- payment/invoice/settlement examples

### Service / after-sales

- customer asset list
- service ticket/work order examples
- dispatch, onsite record, parts usage, fee examples
- satisfaction/closure/reporting examples

## Scope Correction

If the contract lists many modules, do not make phase one "everything."

Prefer:

`operating spine -> essential master data -> core transaction loop -> execution/approval -> settlement/finance -> reports/integration`

Defer:

- edge-case automation
- advanced dashboards
- detailed payroll/bonus logic
- deep external-system replacement
- highly unstable operational details

## Language To Use With Customers

"We first need to confirm the main business object and trace one real case end to end. After that we can decide which forms belong in the main system, which items are only tracked outside, and which modules should be phase one."

"The implementation list tells us what may be built, but the sample case tells us how the company actually runs."
