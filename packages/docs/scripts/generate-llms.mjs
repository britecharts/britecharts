// Writes static/llms.txt and static/llms-full.txt, which Docusaurus copies to
// the root of the site, following https://llmstxt.org.
//
// llms.txt is an index: what Britecharts is, then a link and a line for each
// page a coding agent needs. llms-full.txt is those pages' text in one file,
// for an agent that reads one URL rather than following links. The API pages
// come from docs/API, which generate-docs.js writes from the JSDoc first, so
// both files describe the accessors the source declares.
//
// Run after `docs:api`; `build` and `start` do both.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const docsDir = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '..'
);
const pagesDir = path.join(docsDir, 'docs');
const staticDir = path.join(docsDir, 'static');
// Where the site is deployed (url + baseUrl in docusaurus.config.js). The
// files are read away from the site, so every link in them is absolute.
const SITE = 'https://britecharts.github.io/britecharts/';

// The guides a user needs, in reading order, with what each one answers.
// Contributor docs go under Optional, which llmstxt.org lets an agent skip.
const GUIDES = [
    [
        'Britecharts',
        'What Britecharts is, its three packages, and the charts it draws',
    ],
    [
        'tutorials/getting-started',
        'Draw a first chart: load Britecharts, configure a bar chart and render it with data',
    ],
    [
        'tutorials/installing-britecharts',
        'Install from npm, load from the CDN, or build from source',
    ],
    [
        'tutorials/composing-dataviz',
        'Combine a line chart with a tooltip, a legend and a brush',
    ],
    [
        'tutorials/styling-charts',
        'Colour palettes, gradients and overriding the default styles',
    ],
    [
        'how-tos/user-how-to-guides',
        'Recipes: colours, tooltips, number and date formats, loading states, animation, negative values, accessibility, time scales',
    ],
    [
        'how-tos/migration-guide-2-to-3',
        'Every breaking change from version 2 to 3, and what to change',
    ],
];
const PACKAGES = [
    ['packages/core-readme', 'The charts, for plain JavaScript'],
    [
        'packages/wrappers-readme',
        'One call that creates, updates and destroys a chart, for frameworks',
    ],
    ['packages/react-readme', 'The charts as React components'],
];
const OPTIONAL = [
    ['topics/reusable-api', 'The reusable chart pattern every chart follows'],
    ['topics/api-guidelines', 'How accessors are named'],
    ['how-tos/contributor-how-to-guides', 'Recipes for contributors'],
];

const urlOf = (id) => `${SITE}docs/${id}`;

const parse = (id) => {
    const source = readFileSync(path.join(pagesDir, `${id}.md`), 'utf8');
    const frontmatter = source.match(/^---\n([\s\S]*?)\n---\n/);
    const body = frontmatter ? source.slice(frontmatter[0].length) : source;
    const title =
        frontmatter?.[1].match(/^title:\s*(.+)$/m)?.[1] ??
        body.match(/^\s*# (.+)$/m)?.[1] ??
        id;

    return { id, title: title.trim(), body };
};

// A page's links, inline and in reference definitions, made absolute the way
// Docusaurus routes them: `./x.md`, `../API/line` and `API/bar` against the
// page's own URL, `/docs/...` and `pathname:///...` against the site, and
// `#anchor` against the page
const absoluteLinks = (id, text) => {
    const toUrl = (href) => {
        if (href.startsWith('pathname:///')) {
            return SITE + href.slice('pathname:///'.length);
        }
        if (/^[a-z][a-z\d+.-]*:/i.test(href)) {
            return href;
        }
        if (href.startsWith('/')) {
            return SITE + href.slice(1);
        }

        return new URL(href.replace(/\.mdx?(?=#|$)/, ''), urlOf(id)).href;
    };

    return text
        .replace(/\]\(([^)\s]+)\)/g, (match, href) => `](${toUrl(href)})`)
        .replace(
            /^(\[[^\]]+\]:\s*)(\S+)/gm,
            (match, label, href) => `${label}${toUrl(href)}`
        );
};

// jsdoc2md's markup, read as text. Its anchors and the table of contents that
// links to them mean nothing away from the page, nor do the Kind and Access
// lines every accessor repeats, and the HTML it puts around types reads better
// as backticks. Link text can hold brackets, as in `[.colorMap([_x])]`
const plainApi = (text) =>
    text
        .replace(/^<a name="[^"]*"[^>]*><\/a>\n+/gm, '')
        .replace(/^\s*\* (\[.*\]\(#[^)]*\)|_[a-z]+_).*\n/gm, '')
        .replace(
            /^\*\*(Kind|Access)\*\*: (static method of .*|public)[ \t]*\n/gm,
            ''
        )
        .replace(/\[((?:[^[\]]|\[[^\]]*\])+)\]\(#[^)]*\)/g, '$1')
        .replace(/<code>([\s\S]*?)<\/code>/g, '`$1`')
        .replace(/ ⏏/g, '')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/\n{3,}/g, '\n\n');

// The first sentence of prose under the title, for an API page's line
const firstSentence = (body) =>
    plainApi(body)
        .split(/\n{2,}/)
        .map((block) => block.trim())
        .find((block) => block && !/^(#|\*\*|```|[*-] |<|>)/.test(block))
        ?.replace(/\s+/g, ' ')
        .split(/(?<=\.) (?=[A-Z])/)[0]
        .replace(/\.$/, '');

// The charts and components, then the helpers, whose pages sit in API/helpers.
// The helpers' pages document internals, so they are listed under Optional
// and left out of llms-full.txt
const pagesIn = (dir) =>
    readdirSync(path.join(pagesDir, dir))
        .filter((file) => file.endsWith('.md'))
        .map((file) => parse(`${dir}/${file.replace(/\.md$/, '')}`))
        .sort((a, b) => a.title.localeCompare(b.title));
const chartPages = pagesIn('API');
const helperPages = pagesIn('API/helpers');

const linkLine = ({ id, title }, description) =>
    `- [${title}](${urlOf(id)})${description ? `: ${description}` : ''}`;
const section = (heading, entries) =>
    `## ${heading}\n\n${entries
        .map(([id, description]) => linkLine(parse(id), description))
        .join('\n')}\n`;

const index = `# Britecharts

> Britecharts is a library of reusable D3.js charts: bar, grouped bar, stacked bar, line, stacked area, donut, scatter plot, heatmap, treemap, sparkline and bullet charts, with a legend, tooltips and a brush. Each chart is a function configured through chained getter and setter accessors, then called on a D3 selection that holds the data. \`@britecharts/core\` has the charts, \`@britecharts/wrappers\` creates, updates and destroys them in one call, and \`@britecharts/react\` has them as React components.

Version 3 is in beta: install \`@britecharts/core@beta\`, \`@britecharts/wrappers@beta\` or \`@britecharts/react@beta\`. Code written for version 2, the \`britecharts\` package, differs; the migration guide lists each change. Every chart shares one accessor vocabulary, such as \`colorSchema\`, \`isAnimated\`, \`isLoading\`, \`numberFormat\`, \`a11yTitle\` and \`a11yDescription\`, and an unset accessor reads back \`null\`.

The whole of this documentation, as one text file: ${SITE}llms-full.txt

${section('Guides', GUIDES)}
${section('Packages', PACKAGES)}
## API reference

${chartPages.map((page) => linkLine(page, firstSentence(page.body))).join('\n')}

${section('Optional', OPTIONAL)}${helperPages
    .map((page) => linkLine(page, 'Internal helpers the charts share'))
    .join('\n')}
`;

const fullPage = ({ id, title, body }) => {
    const text = absoluteLinks(
        id,
        id.startsWith('API/') ? plainApi(body) : body
    )
        // The page's own title opens its section below
        .replace(/^\s*# .+\n/, '')
        .trim();

    return `# ${title}\n\nSource: ${urlOf(id)}\n\n${text}\n`;
};

const full = [
    `# Britecharts documentation\n\nEvery guide and API page from ${SITE}, as text. The index is ${SITE}llms.txt.\n`,
    ...[...GUIDES, ...PACKAGES].map(([id]) => fullPage(parse(id))),
    ...chartPages.map(fullPage),
].join('\n---\n\n');

writeFileSync(path.join(staticDir, 'llms.txt'), index);
writeFileSync(path.join(staticDir, 'llms-full.txt'), full);
console.log(
    `-= Wrote llms.txt (${index.length} chars) and llms-full.txt (${full.length} chars) =-`
);
