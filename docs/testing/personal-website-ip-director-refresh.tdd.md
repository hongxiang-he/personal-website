# 个人网站 IP/短视频编导更新：TDD 证据

## 来源

- 实施计划：`C:\Users\33503\Documents\Codex\2026-07-17\ks\outputs\2026-07-17-personal-website-ip-director-refresh.plan.md`
- 浏览器 QA：`C:\Users\33503\Documents\Codex\2026-07-17\ks\outputs\2026-07-17-personal-website-ip-director-refresh.browser-qa.md`

## 用户旅程

1. 招聘方进入网站后，能立即识别“IP 编导 / 短视频编导”主定位。
2. 招聘方能看到作品数据、全链路工作能力与 AI 增效证据。
3. 招聘方点击下载简历时，稳定 URL 返回主人批准的新 PDF。
4. 移动端和桌面端用户都能使用导航、微信复制和证书灯箱。
5. 联系方式和下载入口在深色主题上保持清晰可读。

## RED / GREEN 记录

| 阶段 | 命令 | 结果 | 检查点 |
|---|---|---|---|
| 初始 RED | `node --test tests/site-content.test.mjs` | 9 项中 5 PASS、4 FAIL；失败精确对应旧职位口径、旧 PDF、旧进度记录 | `88ac78b` |
| 定位更新 GREEN | 同上 | 9/9 PASS | 后续并入最终 GREEN |
| 联系区 RED | 同上 | 10 项中 9 PASS、1 FAIL；失败精确对应深色主题联系区前景色 | `68d0bb5` |
| 最终 GREEN | `node --experimental-test-coverage --test tests/site-content.test.mjs` | 10/10 PASS，0 skipped；静态测试文件覆盖率 100% | `3c33042` |

## 测试规范

| # | 保证内容 | 测试类型 | 结果 |
|---|---|---|---|
| 1 | title 与 description 使用批准的 IP/短视频编导定位 | 静态集成 | PASS |
| 2 | 可见职位口径统一且不再出现“短视频操盘手” | 静态集成 | PASS |
| 3 | AI 全链路、能力体系、SOP、数据复盘证据保留 | 静态集成 | PASS |
| 4 | 简历稳定 URL 指向批准 PDF，哈希完全一致 | 文件集成 | PASS |
| 5 | 项目进度记录更新且移除旧求职方向 | 文件集成 | PASS |
| 6 | 所有本地 HTML 资源均存在 | 资源集成 | PASS |
| 7 | 所有页内导航锚点都有对应 ID | DOM 静态 | PASS |
| 8 | 新窗口外链均带 `noopener` | 安全静态 | PASS |
| 9 | 图片有 alt，移动菜单暴露展开状态 | 可访问性静态 | PASS |
| 10 | 联系值与简历按钮在深色主题使用可读前景色 | CSS 回归 | PASS |

## 额外验证

- `node --check main.js`：PASS。
- 375×812、768×1024、1440×900 Edge 真实浏览器检查：PASS。
- 菜单、微信复制、证书灯箱、Escape 关闭、简历 HTTP 下载：PASS。
- 关键词扫描：未发现旧职位方向。
- 凭据模式扫描：未发现硬编码密钥、令牌或私钥。
- `git diff --check`：PASS。

## 覆盖率与已知缺口

Node 报告的 100% 是 `node:test` 静态检查文件的执行覆盖率，不代表浏览器生产 JavaScript 的语句覆盖率。关键用户流程已由 Edge CDP 补充验证。项目没有历史视觉基线，因此像素级视觉回归为 INCONCLUSIVE；可访问性为基础自动审计，不是完整 WCAG 认证。

## 合并证据

- 设计：`b27d656`
- 初始 RED：`88ac78b`
- 联系区 RED：`68d0bb5`
- 最终 GREEN：`3c33042`

本轮未推送远端，GitHub Actions 与公网部署均未触发。

