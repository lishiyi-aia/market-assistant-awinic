import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
const root = new URL('.', import.meta.url);
const git = '/usr/bin/git';
const owner = 'lishiyi-aia';
const repo = 'market-assistant-awinic';
const auth = spawnSync(git, ['credential', 'fill'], {
  input: 'protocol=https\nhost=github.com\n\n', encoding: 'utf8',
  env: { ...process.env, GIT_TERMINAL_PROMPT: '0' }, timeout: 20000
});
if (auth.status !== 0) throw new Error('Configured GitHub authentication is unavailable.');
const fields = Object.fromEntries(auth.stdout.trim().split('\n').map(line => {
  const i = line.indexOf('='); return [line.slice(0, i), line.slice(i + 1)];
}));
if (!fields.password) throw new Error('No GitHub credential returned.');
async function api(path, method = 'GET', body) {
  const response = await fetch(`https://api.github.com${path}`, {
    method, headers: { Authorization: `Bearer ${fields.password}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined, signal: AbortSignal.timeout(30000)
  });
  const data = response.status === 204 ? {} : await response.json();
  if (!response.ok && response.status !== 404) throw new Error(`GitHub ${response.status}: ${data.message}`);
  return { status: response.status, data };
}
const account = await api('/user');
if (account.data.login !== owner) throw new Error('The authenticated account is not the portfolio owner.');
const recordPath = new URL('github-publication.json', root);
const previous = fs.existsSync(recordPath) ? JSON.parse(fs.readFileSync(recordPath, 'utf8')) : {};
const mode = process.argv[2] || 'inspect';
if (mode === 'inspect') {
  const existing = await api(`/repos/${owner}/${repo}`);
  const original = await api(`/repos/${owner}/market-trainee-finetoday/commits/main`);
  if (existing.status !== 404 && previous.repository !== `${owner}/${repo}`) throw new Error('Target repository already exists and does not belong to this task.');
  fs.writeFileSync(recordPath, JSON.stringify({ ...previous, repository: `${owner}/${repo}`, original_repository: `${owner}/market-trainee-finetoday`, original_commit_before: previous.original_commit_before || original.data.sha, stage: previous.stage || 'prepared' }, null, 2));
  console.log(JSON.stringify({ account: account.data.login, targetStatus: existing.status, originalCommit: original.data.sha }));
} else if (mode === 'create') {
  const existing = await api(`/repos/${owner}/${repo}`);
  if (existing.status !== 404) throw new Error('Target repository already exists; refusing to overwrite it.');
  const created = await api('/user/repos', 'POST', { name: repo, description: 'Shiyi Li | Awinic Market Assistant 2027: market support, customer coordination, channel execution and AI dashboards', private: false, auto_init: false });
  fs.writeFileSync(recordPath, JSON.stringify({ ...previous, provider: 'github-pages', repository: created.data.full_name, repository_url: created.data.html_url, repository_id: created.data.id, clone_url: created.data.clone_url, branch: 'main', source_path: '/docs', stage: 'created' }, null, 2));
  console.log(JSON.stringify({ status: created.status, repository: created.data.html_url }));
} else if (mode === 'enable') {
  if (previous.repository !== `${owner}/${repo}` || previous.stage === 'prepared') throw new Error('New repository ownership is not recorded.');
  const current = await api(`/repos/${owner}/${repo}/pages`);
  const result = current.status === 404 ? await api(`/repos/${owner}/${repo}/pages`, 'POST', { build_type: 'legacy', source: { branch: 'main', path: '/docs' } }) : current;
  fs.writeFileSync(recordPath, JSON.stringify({ ...previous, site_url: result.data.html_url, stage: 'publishing' }, null, 2));
  console.log(JSON.stringify({ status: result.status, url: result.data.html_url, source: result.data.source }));
} else if (mode === 'status') {
  const pages = await api(`/repos/${owner}/${repo}/pages`);
  const build = await api(`/repos/${owner}/${repo}/pages/builds/latest`);
  const original = await api(`/repos/${owner}/market-trainee-finetoday/commits/main`);
  const unchanged = original.data.sha === previous.original_commit_before;
  if (!unchanged) throw new Error('Original repository changed; investigate before reporting success.');
  const status = { pages: { status: pages.status, url: pages.data.html_url, state: pages.data.status }, build: { status: build.status, state: build.data.status, commit: build.data.commit, error: build.data.error }, originalUnchanged: unchanged };
  fs.writeFileSync(recordPath, JSON.stringify({ ...previous, site_url: pages.data.html_url, pages_status: pages.data.status, commit_sha: build.data.commit, original_commit_after: original.data.sha, original_unchanged: unchanged, stage: pages.data.status === 'built' ? 'live' : 'publishing' }, null, 2));
  console.log(JSON.stringify(status));
} else throw new Error('Unknown action.');
