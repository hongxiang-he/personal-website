import test from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const testDir = dirname(fileURLToPath(import.meta.url))
const root = resolve(testDir, '..')
const html = readFileSync(join(root, 'index.html'), 'utf8')
const css = readFileSync(join(root, 'style.css'), 'utf8')
const progress = readFileSync(join(root, '进度记录.md'), 'utf8')
const expectedResumeHash = 'AC13A4C3EFA9C4A263C20933E48E86290D694DAC31C14A949CD67E0A019DE6B9'

function sha256(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex').toUpperCase()
}

test('SEO uses the approved IP and short-video director positioning', () => {
  assert.match(html, /<title>[^<]*IP 编导 \/ 短视频编导[^<]*<\/title>/)
  assert.match(html, /<meta name="description" content="[^"]*IP 编导 \/ 短视频编导[^"]*">/)
})

test('visible role copy is consistent and does not use the operator label', () => {
  assert.match(html, /hero-tagline[^>]*>IP 编导 · 短视频编导<\/p>/)
  assert.match(html, /求职方向[\s\S]*?IP 编导<br>短视频编导/)
  assert.match(html, /期待 IP 编导 \/ 短视频编导相关的工作机会/)
  assert.doesNotMatch(html, /短视频操盘手/)
})

test('AI workflow and execution evidence remain visible', () => {
  for (const evidence of ['AI 贯穿全链路', 'AI 能力体系', '剪辑 SOP', '数据复盘']) {
    assert.ok(html.includes(evidence), `missing evidence: ${evidence}`)
  }
})

test('resume download keeps the stable URL and serves the approved PDF', () => {
  const resumePath = join(root, 'assets', '何宏祥的简历.pdf')
  assert.match(html, /href="assets\/何宏祥的简历\.pdf"/)
  assert.equal(sha256(resumePath), expectedResumeHash)
})

test('project progress records the new positioning and removes stale resume tasks', () => {
  assert.match(progress, /求职方向[^\n]*IP\/?短视频编导/)
  assert.match(progress, /核心定位[^\n]*IP 编导/)
  assert.doesNotMatch(progress, /地质勘探|短视频剪辑师（品牌\/商业类）|AI剪辑师/)
  assert.match(progress, /最后更新：2026-07-17/)
})

test('all local HTML resources resolve to files', () => {
  const refs = [...html.matchAll(/\b(?:src|href)="([^"]*)"/g)].map(match => match[1])
  const localRefs = refs.filter(ref => ref && !ref.startsWith('#') && !/^[a-z][a-z0-9+.-]*:/i.test(ref))

  for (const ref of localRefs) {
    const cleanRef = decodeURIComponent(ref.split(/[?#]/, 1)[0])
    assert.ok(existsSync(join(root, cleanRef)), `missing local resource: ${ref}`)
  }
})

test('all in-page navigation anchors resolve to element IDs', () => {
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]))
  const anchors = [...html.matchAll(/\bhref="#([^"]+)"/g)].map(match => match[1])

  for (const anchor of anchors) {
    assert.ok(ids.has(anchor), `missing anchor target: #${anchor}`)
  }
})

test('external links opened in a new tab use noopener', () => {
  const newTabLinks = [...html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)].map(match => match[0])
  assert.ok(newTabLinks.length > 0, 'expected at least one external new-tab link')

  for (const link of newTabLinks) {
    assert.match(link, /\brel="[^"]*noopener[^"]*"/)
  }
})

test('images have alt text and the mobile menu exposes its state', () => {
  const images = [...html.matchAll(/<img\b[^>]*>/g)].map(match => match[0])
  for (const image of images) {
    assert.match(image, /\balt="[^"]*"/)
  }

  assert.match(html, /id="nav-hamburger"[^>]*aria-expanded="false"/)
})

test('contact values and the resume button remain readable on the dark theme', () => {
  assert.match(css, /\.contact\s+\.contact-value\s*,\s*\.contact\s+\.btn-download\s*\{\s*color:\s*#F1F5F9\s*;\s*\}/)
})

test('about copy reflects the approved account-growth wording and Shanghai location', () => {
  assert.match(html, /深度参与了两个垂类账号的内容增长与爆款迭代/)
  assert.doesNotMatch(html, /从零做到数十万粉/)
  assert.match(html, /<div class="info-label">所在地<\/div>\s*<div class="info-value">上海<\/div>/)
  assert.doesNotMatch(html, /<div class="info-value">杭州<\/div>/)
})

test('why-me comparison table uses a dark panel and readable neutral columns', () => {
  assert.match(css, /\.why-table\s*\{[^}]*background:\s*rgba\(5,\s*10,\s*20,\s*0\.88\)/s)
  assert.match(css, /\.why-table\s+\.why-col--label\s*\{\s*color:\s*#94A3B8\s*;\s*\}/)
  assert.match(css, /\.why-table\s+\.why-col--other\s*,\s*\.why-table-header\s+\.why-col--other\s*\{\s*color:\s*#CBD5E1\s*;\s*\}/)
})
