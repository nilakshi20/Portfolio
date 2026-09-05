// Builds public/resume.pdf from src/data/portfolioData.js.
// Replace public/resume.pdf with a hand-made PDF any time; nothing imports this at build time.
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { portfolio } from '../src/data/portfolioData.js'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const PAGE_W = 595.28
const PAGE_H = 841.89
const MARGIN = 40
const BOTTOM_MARGIN = 32
const CONTENT_W = PAGE_W - MARGIN * 2
const BODY = 9.5

const ascii = (value) =>
  String(value)
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/\u00b7/g, '-')
    .replace(/[^\x20-\x7e]/g, '')

const widthOf = (text, size, bold) => text.length * size * (bold ? 0.55 : 0.5)

function wrap(text, size, bold) {
  const words = ascii(text).split(/\s+/).filter(Boolean)
  const lines = []
  let line = ''
  for (const word of words) {
    const next = line ? `${line} ${word}` : word
    if (widthOf(next, size, bold) > CONTENT_W && line) {
      lines.push(line)
      line = word
    } else {
      line = next
    }
  }
  if (line) lines.push(line)
  return lines
}

// Each page is a list of drawing ops; y is tracked from the top down.
const pages = [[]]
let y = MARGIN

const newPage = () => {
  pages.push([])
  y = MARGIN
}

function text(value, { size = BODY, bold = false, gap = 4, indent = 0 } = {}) {
  for (const line of wrap(value, size, bold)) {
    if (y + size > PAGE_H - BOTTOM_MARGIN) newPage()
    pages[pages.length - 1].push({
      kind: 'text',
      line,
      size,
      bold,
      x: MARGIN + indent,
      y: y + size,
    })
    y += size * 1.12
  }
  y += gap
}

function rule() {
  if (y + 8 > PAGE_H - BOTTOM_MARGIN) newPage()
  pages[pages.length - 1].push({ kind: 'rule', y: y + 2 })
  y += 10
}

function heading(value) {
  // Avoid orphaning a section title at the very bottom of a page.
  if (y + 44 > PAGE_H - BOTTOM_MARGIN) newPage()
  text(value.toUpperCase(), { size: 10, bold: true, gap: 1 })
  rule()
}

text(portfolio.name, { size: 20, bold: true, gap: 1 })
text(portfolio.title, { size: 11.5, gap: 1 })
text(
  [portfolio.email, portfolio.phone, portfolio.socials.github, portfolio.socials.linkedin]
    .filter(Boolean)
    .join('  |  '),
  { size: 9.5, gap: 8 },
)

heading('Summary')
text(portfolio.hero.subtitle, { gap: 6 })

heading('Experience')
for (const role of portfolio.experience) {
  text(`${role.role} - ${role.company}`, { size: 10.5, bold: true, gap: 1 })
  text([role.period, role.location].filter(Boolean).join(' | '), {
    size: 9,
    gap: 2,
  })
  if (role.summary) text(role.summary, { gap: 2 })
  for (const highlight of role.highlights ?? []) {
    text(`- ${highlight}`, { gap: 0, indent: 10 })
  }
  y += 5
}

heading('Projects')
for (const project of portfolio.projects) {
  text(project.title, { size: 10.5, bold: true, gap: 1 })
  text(project.description, { gap: 1 })
  text(`Stack: ${project.tags.join(', ')}`, { size: 9, gap: 5 })
}

heading('Skills')
for (const group of portfolio.skills) {
  text(`${group.category}: ${group.items.join(', ')}`, { gap: 1 })
}
y += 5

heading('Research')
for (const paper of portfolio.research) {
  text(paper.title, { size: 10, bold: true, gap: 1 })
  text(`${paper.venue}, ${paper.publisher}`, { size: 9, gap: 1 })
  text(paper.summary, { gap: 5 })
}

heading('Education')
for (const item of portfolio.education) {
  text(item.degree, { size: 10, bold: true, gap: 1 })
  text(`${item.school} | ${item.period}`, { size: 9, gap: 4 })
}

const escape = (value) => value.replace(/([\\()])/g, '\\$1')

const streamFor = (ops) => {
  const parts = []
  for (const op of ops) {
    if (op.kind === 'rule') {
      parts.push(
        `0.78 0.78 0.75 RG 0.7 w ${MARGIN} ${(PAGE_H - op.y).toFixed(2)} m ${(
          PAGE_W - MARGIN
        ).toFixed(2)} ${(PAGE_H - op.y).toFixed(2)} l S`,
      )
      continue
    }
    parts.push(
      `BT /${op.bold ? 'F2' : 'F1'} ${op.size} Tf 0.1 0.14 0.11 rg ${op.x.toFixed(
        2,
      )} ${(PAGE_H - op.y).toFixed(2)} Td (${escape(op.line)}) Tj ET`,
    )
  }
  return parts.join('\n')
}

// Object layout: 1 = catalog, 2 = pages tree, then per-page [contents, page], then fonts.
const objects = []
const catalogId = 1
const pagesId = 2
let next = 3
const pageEntries = pages.map((ops) => {
  const contentId = next++
  const pageId = next++
  return { ops, contentId, pageId }
})
const fontRegularId = next++
const fontBoldId = next++

objects[catalogId - 1] = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`
objects[pagesId - 1] = `<< /Type /Pages /Count ${
  pageEntries.length
} /Kids [${pageEntries.map((entry) => `${entry.pageId} 0 R`).join(' ')}] >>`

for (const entry of pageEntries) {
  const stream = streamFor(entry.ops)
  objects[entry.contentId - 1] = `<< /Length ${Buffer.byteLength(
    stream,
    'latin1',
  )} >>\nstream\n${stream}\nendstream`
  objects[entry.pageId - 1] =
    `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] ` +
    `/Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R >> >> ` +
    `/Contents ${entry.contentId} 0 R >>`
}

objects[fontRegularId - 1] =
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>'
objects[fontBoldId - 1] =
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>'

let pdf = '%PDF-1.4\n'
const offsets = []
objects.forEach((body, index) => {
  offsets[index] = Buffer.byteLength(pdf, 'latin1')
  pdf += `${index + 1} 0 obj\n${body}\nendobj\n`
})

const xrefOffset = Buffer.byteLength(pdf, 'latin1')
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`
for (const offset of offsets) {
  pdf += `${String(offset).padStart(10, '0')} 00000 n \n`
}
pdf +=
  `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R ` +
  `/Info << /Title (${escape(ascii(portfolio.name))} - Resume) /Author (${escape(
    ascii(portfolio.name),
  )}) >> >>\nstartxref\n${xrefOffset}\n%%EOF\n`

const outPath = resolve(root, 'public/resume.pdf')
mkdirSync(dirname(outPath), { recursive: true })
writeFileSync(outPath, Buffer.from(pdf, 'latin1'))
console.log(`Wrote ${outPath} (${pageEntries.length} page(s))`)
