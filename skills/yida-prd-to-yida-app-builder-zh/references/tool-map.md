# 相关插件与 Skill 调用地图

本 Skill 是总控型 Skill。遇到具体能力时，不要硬塞在一个 Skill 里完成；应按任务调用对应插件或子 Skill。

## 宜搭专项 Skill

| 触发场景 | 优先使用 | 用途 |
| --- | --- | --- |
| 登录、检查 Cookie | `openyida` / `yida-login` | 扫码登录、检查登录态 |
| 创建表单、更新基础字段 | `openyida` / `yida-create-form-page` | 建表、补字段、基础 Schema 更新 |
| 获取线上 Schema | `openyida` / `yida-get-schema` | 回读字段类型、fieldId、行为配置 |
| UI、字段属性、关联、联动、过滤 | Schema Patch / `openyida create-form patch` | 能用 Schema 稳定表达的配置优先 patch，更新前必须回读最新 Schema |
| 表单数据新增、更新、查询 | `yida-data-management` | 创建测试数据、验证自动化结果 |
| 自动化创建、查询、发布、禁用 | `yida-integration` | 集成&自动化配置和状态审查 |
| 流程审批规则 | `yida-process-rule` / `yida-create-process` | 审批流、条件分支、流程表单 |
| 业务关联规则/高级函数 | `yida-business-rule` | openyida 做不了的数据联动和高级规则 |
| 表单权限 | `yida-form-permission` | 数据权限、字段权限、成员权限 |
| 应用导航分组 | `yida-nav-group` | 模块分组、页面移动、导航整理 |
| 报表/看板 | `yida-report` / `yida-dashboard` / `yida-chart` | 数据看板、经营驾驶舱、图表 |
| 自定义页面 | `yida-custom-page` / `yida-publish-page` | 宜搭 JSX 自定义页面开发和发布 |
| 日志排查 | `sls-log-workbench` | 自动化或页面请求异常排查 |

## 浏览器与 UI 自动化

| 触发场景 | 优先使用 | 用途 |
| --- | --- | --- |
| 宜搭后台只能通过 UI 配置 | `browser` / `playwright` | 在宜搭页面中点击、预览、配置高级功能 |
| 需要复用用户 Chrome 登录态 | `chrome` | 访问已登录的宜搭、HyperFrames、第三方后台 |
| 需要模拟人工操作 | 浏览器自动化（browser-use 思路） | 不猜 API，通过真实按钮和表单推进 |
| 需要截图确认 UI | `screenshot` / 浏览器截图 | 检查表单预览、排版、裁切、移动端效果 |

经验规则：宜搭后台的前端路由经常直接打开返回 JSON 或空页面。遇到这种情况，不要继续猜 URL；回到工作台，从真实 UI 入口进入表单设计、集成&自动化或应用设置。

Schema Patch 细节见 [schema-patch-guide.md](schema-patch-guide.md)。能用 Schema 稳定表达的变更，优先用 patch；需要真实弹窗、设计器画布或肉眼预览时，再切浏览器。

## 文档、演示和宣传材料

| 触发场景 | 优先使用 | 用途 |
| --- | --- | --- |
| 读取或整理 `.docx` 蓝图 | `documents` / 本地解包读取 | 提取 PRD、蓝图、会议纪要 |
| 生成内部分享稿、客户方案 | `doc` / `documents` | 输出 Markdown 或 Word 文档 |
| 生成 PPT | `presentations` / `yida-ppt-slider` | 内部汇报、客户演示 |
| 生成宣传视频或网页视频 | HyperFrames / `web-video-presentation` 思路 | 数字分身口播、分镜、视频渲染 |
| 处理表格清单 | `spreadsheets` | 字段矩阵、权限矩阵、测试记录 |

## 通用工程 Skill

| 触发场景 | 优先使用 | 用途 |
| --- | --- | --- |
| 创建或更新本 Skill | `skill-creator` / `write-a-skill` / `superpowers:writing-skills` | Skill 结构、元数据、校验 |
| 需求很模糊，需要共创方案 | `superpowers:brainstorming` | 先澄清定位、受众、风格、成功标准 |
| 需要分解成可执行计划 | `superpowers:writing-plans` | 复杂交付拆任务 |
| 实施完成前自查 | `superpowers:verification-before-completion` | 防止没验证就宣布完成 |
| 多个独立模块可并行审查 | `superpowers:dispatching-parallel-agents` | 并行审 PRD、字段、自动化、权限 |

## 调用原则

- 先用本 Skill 判断阶段和业务目标，再调用专项 Skill。
- `openyida` 能做的基础动作优先自动化；`openyida` 做不了的高级配置切浏览器/后台。
- 只要涉及线上宜搭修改，先读线上状态，再改，再回读验证。
- 生成给客户看的材料时，区分内部交接、内部分享、外部宣传三种口径。
