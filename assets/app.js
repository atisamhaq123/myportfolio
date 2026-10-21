(() => {
  'use strict';
  const projects = window.portfolioProjects;
  const grid = document.querySelector('#projects-grid');
  const caseDialog = document.querySelector('#case-dialog');
  const imageDialog = document.querySelector('#image-dialog');
  const briefDialog = document.querySelector('#brief-dialog');
  let currentProject;
  let currentImage = 0;
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
  const imagePath = (project, file) => `assets/screenshots/${project.id}/${file}`;
  const thumbnailPath = (project, file) => `assets/thumbnails/${project.id}/${file.replace(/\.png$/, '.webp')}`;
  const dots = '<span class="browser-dots"><i></i><i></i><i></i></span>';
  const tags = stack => `<div class="tech-tags">${stack.map(tech => `<span>${escape(tech)}</span>`).join('')}</div>`;

  grid.innerHTML = projects.map((project, index) => `
    <article class="project-card" data-category="${escape(project.category)}" style="--card-color:${project.color}">
      <div class="card-visual"><span class="card-number">PROJECT ${String(index + 1).padStart(2, '0')} / ${escape(project.type)}</span>
        <button class="card-screen" data-project="${project.id}" aria-label="Explore ${escape(project.title)} case study"><span class="browser-top">${dots}<span>${escape(project.subtitle.toLowerCase())}</span><span>↗</span></span><img src="${thumbnailPath(project, project.cover)}" alt="${escape(project.title)} desktop application screenshot" width="1440" height="1000" loading="lazy"></button>
        <button class="card-phone" data-project="${project.id}" aria-label="Explore ${escape(project.title)} mobile screenshots"><img src="${thumbnailPath(project, project.mobileCover)}" alt="${escape(project.title)} mobile application screenshot" width="390" height="844" loading="lazy"></button>
      </div>
      <div class="card-body"><p class="card-type">${escape(project.type)}</p><div class="card-title-row"><h3>${escape(project.title)}</h3><button class="card-arrow" data-project="${project.id}" aria-label="Open ${escape(project.title)} case study">↗</button></div><p class="card-subtitle">${escape(project.subtitle)}</p><p class="card-description">${escape(project.summary)}</p>${tags(project.stack.slice(0, 5))}<div class="card-meta"><span>${escape(project.client)} ·  client</span><span>${escape(project.date)} · </span></div><div class="card-footer"><span>${project.screens.filter(([, , device]) => device === 'desktop').length} desktop + ${project.screens.filter(([, , device]) => device === 'mobile').length} mobile views</span><button class="card-case-link" data-project="${project.id}">View case study <span aria-hidden="true">↗</span></button></div></div>
    </article>`).join('');

  const engineeringHighlights = {
    'quotient-procurement': 'Tenant-safe quote comparison, approvals & bounded AI review',
    'orbit-sales': 'Document-based RAG, hybrid retrieval & cited AI answers',
    clientnest: 'Tenant-scoped access, private files & verified subscription limits',
    'grounded-men': 'Capacity-protected bookings & teacher-scoped attendance',
    talentflow: 'Team-scoped access & hiring-stage history',
    veyra: 'Listing review & multi-role property workflows',
    medica: 'Authenticator MFA & encrypted clinical notes',
    aurelle: 'Transactional stock & preserved order snapshots',
    helio: 'Customer-scoped records & persistent support',
    lingua: 'Booking conflicts & enrollment-controlled lessons',
    wholesale: 'Inventory reservations & multi-supplier order splits',
    marketplace: 'Listing ownership & validated photo galleries',
    zenda: 'Custom theme with native WooCommerce workflows'
  };
  grid.querySelectorAll('.project-card').forEach((card, index) => {
    const highlight = document.createElement('div');
    highlight.className = 'engineering-highlight';
    highlight.innerHTML = `<div><small>ENGINEERING DETAIL</small>${escape(engineeringHighlights[projects[index].id])}</div>`;
    card.querySelector('.tech-tags').before(highlight);
  });
  const dialogState = new WeakMap();
  let pageScroll = 0;
  const showDialog = dialog => {
    if (dialog.open) return;
    if (!document.querySelector('dialog[open]')) pageScroll = window.scrollY;
    dialogState.set(dialog, {
      trigger: document.activeElement,
      parent: document.querySelector('dialog[open]'),
      parentScroll: caseDialog.scrollTop
    });
    document.documentElement.classList.add('modal-open');
    dialog.showModal();
    dialog.scrollTop = 0;
    dialog.querySelector('[data-close]').focus({preventScroll:true});
  };
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.addEventListener('close', () => {
      const state = dialogState.get(dialog);
      if (!document.querySelector('dialog[open]')) {
        document.documentElement.classList.remove('modal-open');
        window.scrollTo({top:pageScroll,behavior:'instant'});
      }
      if (state?.parent?.open) state.parent.scrollTop = state.parentScroll;
      if (state?.trigger?.isConnected && !state.trigger.closest('dialog:not([open])')) {
        state.trigger.focus({preventScroll:true});
      }
    });
  });
  function openProject(id, updateHash = true) {
    const project = projects.find(item => item.id === id);
    if (!project) return;
    currentProject = project;
    document.querySelector('#case-content').innerHTML = `
      <header class="case-header"><p class="eyebrow">${escape(project.type)} / ${escape(project.category.toUpperCase())}</p><h2 id="case-title">${escape(project.title)}</h2><p class="case-subtitle">${escape(project.subtitle)}</p><div class="case-metadata"><div><small> CLIENT</small>${escape(project.client)}</div><div><small> PROJECT DATE</small>${escape(project.date)}</div><div><small>MY ROLE</small>Design & full stack development</div><div><small>PLATFORMS</small>Desktop & mobile web</div></div><p class="-note"></p></header>
      <div class="case-detail"><p class="case-intro">${escape(project.description)}</p><div class="case-columns"><section><h3>The challenge</h3><p>${escape(project.challenge)}</p></section><section><h3>The implementation</h3><p>${escape(project.solution)}</p></section></div><h3>What’s included</h3><ul class="feature-list">${project.features.map(feature => `<li>${escape(feature)}</li>`).join('')}</ul><div class="case-stack"><span>TECHNOLOGY STACK</span>${tags(project.stack)}</div></div>
      <section class="gallery-section"><div class="gallery-heading"><h3>The application, up close.</h3><span>5 original captures · Click to explore</span></div><div class="screenshot-grid">${project.screens.map(([file, caption, device], index) => `<button class="screenshot-button ${device}" data-image="${index}" aria-label="Open full resolution: ${escape(caption)}"><img src="${thumbnailPath(project, file)}" alt="${escape(caption)} screenshot from ${escape(project.title)}" loading="lazy"><span>${escape(caption)}<i aria-hidden="true">↗</i></span></button>`).join('')}</div></section>
      <p class="scope-note"><strong>Project scope:</strong> ${escape(project.scope)}</p><div class="case-bottom"><p>Have a similar project in mind?</p><button class="button button-dark" data-discuss="${project.id}">Let’s discuss your idea <span aria-hidden="true">↗</span></button></div>`;
    const note = document.querySelector('#case-content .-note');
    note.className = 'sample-note';
    if (project.mockup) {
      const download = document.createElement('a');
      download.className = 'text-button';
      download.href = project.mockup;
      download.download = '';
      download.textContent = 'Download portfolio mockup (1000 × 750 PNG)';
      note.append(download);
    }
    const engineering = document.createElement('p');
    engineering.className = 'case-engineering';
    engineering.innerHTML = `<small>ENGINEERING FOCUS</small>${escape(engineeringHighlights[project.id])}`;
    document.querySelector('.case-intro').before(engineering);
    if (!caseDialog.open) showDialog(caseDialog);
    else caseDialog.scrollTop = 0;
    if (updateHash) history.replaceState(null, '', `#project-${id}`);
  }
  function showImage(index) {
    currentImage = (index + currentProject.screens.length) % currentProject.screens.length;
    const [file, caption, device] = currentProject.screens[currentImage];
    const image = document.querySelector('#viewer-image');
    image.src = imagePath(currentProject, file);
    image.alt = `${currentProject.title} — ${caption}`;
    document.querySelector('#image-title').textContent = `${currentProject.title} / ${caption}`;
    const counter = document.querySelector('#image-counter');
    counter.textContent = `${currentImage + 1} of ${currentProject.screens.length} · Original PNG`;
    image.onload = () => { counter.textContent = `${currentImage + 1} of ${currentProject.screens.length} · ${image.naturalWidth}px wide · Original PNG`; };
    document.querySelector('#image-download').href = image.src;
    document.querySelector('#image-download').download = `${currentProject.id}-${file}`;
    document.querySelector('.image-stage').classList.toggle('mobile', device === 'mobile');
    if (!imageDialog.open) showDialog(imageDialog);
    else imageDialog.scrollTop = 0;
  }
  document.addEventListener('click', event => {
    const projectButton = event.target.closest('[data-project]');
    if (projectButton) openProject(projectButton.dataset.project);
    const imageButton = event.target.closest('[data-image]');
    if (imageButton) showImage(Number(imageButton.dataset.image));
    const closeButton = event.target.closest('[data-close]');
    if (closeButton) document.getElementById(closeButton.dataset.close).close();
    const discuss = event.target.closest('[data-discuss]');
    if (discuss) {
      caseDialog.close();
      document.querySelector('#brief-form [name=project]').value = `An application like ${projects.find(project => project.id === discuss.dataset.discuss).title}`;
      showDialog(briefDialog);
    }
  });
  document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(filter => {filter.classList.toggle('active', filter === button);filter.setAttribute('aria-pressed', String(filter === button));});
    let count = 0;
    document.querySelectorAll('.project-card').forEach(card => {const visible = button.dataset.filter === 'All' || card.dataset.category === button.dataset.filter;card.hidden = !visible;if (visible) count++;});
    document.querySelector('#results-count').textContent = `Showing ${count} ${count === 1 ? 'project' : 'projects'}`;
  }));
  document.querySelector('#image-prev').addEventListener('click', () => showImage(currentImage - 1));
  document.querySelector('#image-next').addEventListener('click', () => showImage(currentImage + 1));
  document.addEventListener('keydown', event => {
    if (!imageDialog.open) return;
    if (event.key === 'ArrowLeft') {event.preventDefault();showImage(currentImage - 1);}
    if (event.key === 'ArrowRight') {event.preventDefault();showImage(currentImage + 1);}
  });
  document.querySelectorAll('dialog').forEach(dialog => dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  }));
  caseDialog.addEventListener('close', () => {if (location.hash.startsWith('#project-')) history.replaceState(null, '', '#work');});
  document.querySelector('#brief-open').addEventListener('click', () => showDialog(briefDialog));
  document.querySelector('#brief-form').addEventListener('submit', event => {
    event.preventDefault();
    const values = new FormData(event.target);
    document.querySelector('#brief-output').value = `Hi Atisam,\n\nI’d like to discuss a project: ${values.get('project').trim()}\n\nWhat I need:\n${values.get('details').trim()}\n\nPreferred timeline: ${values.get('timeline').trim() || 'Open to discussion'}\nBudget range: ${values.get('budget').trim() || 'Open to discussion'}\n\nCould you share your suggested approach and availability?`;
    document.querySelector('#brief-result').hidden = false;
    document.querySelector('#copy-status').textContent = 'Your brief is ready. Copy it and send it on Upwork.';
    document.querySelector('#brief-result').scrollIntoView({block:'nearest'});
  });
  document.querySelector('#copy-brief').addEventListener('click', async () => {
    const output = document.querySelector('#brief-output');
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(output.value);
      else {output.focus();output.select();if (!document.execCommand('copy')) throw new Error('Copy unavailable');}
      document.querySelector('#copy-status').textContent = 'Copied. Paste your message into your Upwork conversation with Atisam.';
    } catch {output.focus();output.select();document.querySelector('#copy-status').textContent = 'Select and copy this message with Ctrl+C or your device’s Copy command.';}
  });
  const openLinkedProject = () => {if (location.hash.startsWith('#project-')) openProject(location.hash.slice(9), false);};
  // Content is visible by default. Reveal it once as it enters the viewport.
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let revealObserver;
  const reveal = element => {
    element.classList.remove('reveal-pending');
    revealObserver?.unobserve(element);
  };
  const revealTargets = document.querySelectorAll('.technology-strip, .specialist-note > div, .section-heading > *, .work-toolbar, .project-card, .work-note, .expertise-grid > article, .process-row > div, .contact-card > div, .site-footer > *');
  if ('IntersectionObserver' in window && !motion.matches) {
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {if (entry.isIntersecting) reveal(entry.target);});
    }, {threshold:0, rootMargin:'0px 0px -24px 0px'});
    revealTargets.forEach((element, index) => {
      element.classList.add('scroll-reveal', 'reveal-pending');
      element.style.setProperty('--reveal-delay', `${(index % 3) * 55}ms`);
      revealObserver.observe(element);
    });
    document.addEventListener('focusin', event => {
      const element = event.target.closest('.reveal-pending');
      if (element) reveal(element);
    });
  }
  motion.addEventListener('change', event => {
    if (event.matches) {
      revealTargets.forEach(reveal);
      revealObserver?.disconnect();
    }
  });
  window.addEventListener('hashchange', openLinkedProject);
  openLinkedProject();
})();
