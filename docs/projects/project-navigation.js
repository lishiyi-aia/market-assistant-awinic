(() => {
  'use strict';

  // Keep the case order aligned with the three cards on the portfolio homepage.
  const projects = [
    { slug: 'ai-news-dashboard', label: 'AI 产品', title: 'AI 产品市场支持与运营复盘', note: '需求调研 · 推广执行 · AI 看板', cover: 'sohu-dashboard.png' },
    { slug: 'ai-education-partnership', label: 'AI 教育', title: 'AI 教育客户需求与合作支持', note: '客户支持 · 合作跟进 · 跨部门协作', cover: 'education-pilot.png' },
    { slug: 'zus-everywhere', label: 'ZUS Coffee', title: 'ZUS Coffee 新品推广与渠道协同', note: '新品调研 · 英文内容 · 渠道复盘', cover: 'zus-everywhere.jpg' },
  ];
  const index = projects.findIndex(project => location.pathname.endsWith(`/projects/${project.slug}/case_study.html`));
  if (index < 0) return;

  const current = projects[index];
  const previous = projects[index - 1];
  const next = projects[index + 1];
  const number = value => String(value + 1).padStart(2, '0');
  const projectUrl = project => `../${project.slug}/case_study.html`;
  const homeUrl = `../../#projects/${current.slug}`;

  // Returning to the portfolio should restore the current project card.
  document.querySelectorAll('a[href="../../"], a[href="../../index.html"]').forEach(link => {
    link.href = homeUrl;
  });

  const navigation = document.createElement('nav');
  navigation.className = 'project-browser';
  navigation.setAttribute('aria-label', '切换项目');
  navigation.innerHTML = `
    <div class="project-browser-inner">
      <a class="project-browser-home" href="${homeUrl}"><span aria-hidden="true">↖</span> 项目目录 <span class="project-browser-count">${number(index)} / ${number(projects.length - 1)}</span></a>
      <div class="project-browser-list" aria-label="全部项目">
        ${projects.map((project, i) => `<a href="${projectUrl(project)}" ${i === index ? 'aria-current="page"' : ''}><span>${number(i)}</span> ${project.label}</a>`).join('')}
      </div>
      <div class="project-browser-actions">
        ${previous ? `<a href="${projectUrl(previous)}" rel="prev" aria-label="上一个项目：${previous.title}"><span aria-hidden="true">←</span> 上一个项目</a>` : ''}
        ${next ? `<a class="project-browser-next" href="${projectUrl(next)}" rel="next" aria-label="下一个项目：${next.title}">下一个项目 <span aria-hidden="true">→</span></a>` : '<span class="project-browser-end">已到最后一个项目</span>'}
      </div>
    </div>`;
  document.body.append(navigation);
  document.body.classList.add('has-project-browser');

  const continuation = document.createElement('section');
  continuation.className = 'project-continuation';
  continuation.setAttribute('aria-label', next ? '继续浏览下一个项目' : '项目浏览完成');
  continuation.innerHTML = next ? `
    <div class="project-continuation-heading"><span>继续浏览</span><span>下一个项目 · ${number(index + 1)} / 03</span></div>
    <a class="project-continuation-card" href="${projectUrl(next)}" rel="next">
      <img src="../../works/covers/${next.cover}" alt="" loading="lazy">
      <span class="project-continuation-copy"><small>NEXT PROJECT</small><strong>${next.title}</strong><span>${next.note}</span></span>
      <span class="project-continuation-arrow" aria-hidden="true">→</span>
    </a>` : `
    <div class="project-continuation-heading"><span>已浏览到最后一个项目</span><span>03 / 03</span></div>
    <div class="project-complete"><p>感谢浏览我的项目经历。</p><a href="${homeUrl}">返回项目目录 <span aria-hidden="true">↗</span></a></div>`;
  const footer = document.querySelector('body > footer');
  if (footer) footer.before(continuation);
  else document.querySelector('main').after(continuation);
})();
