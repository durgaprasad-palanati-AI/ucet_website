// main.js — Reads COLLEGE_DATA and populates the website

document.addEventListener('DOMContentLoaded', () => {
  const d = COLLEGE_DATA;

  // ── INFO ──
  setText('college-name', d.info.name);
  setText('college-tagline', d.info.tagline);
  setText('college-affiliation', d.info.affiliation);
  setText('topbar-phone', d.info.phone);
  setText('topbar-email', d.info.email);
  setText('topbar-address', d.info.address);
  setText('c-address', d.info.address);
  setText('c-phone', d.info.phone);
  setText('c-email', d.info.email);
  setText('c-hours', d.info.hours);
  setText('footer-college-name', d.info.name);
  setText('footer-desc', d.info.footerDesc);
  setText('footer-copy', `© ${new Date().getFullYear()} ${d.info.name}. All Rights Reserved.`);

  // ── HERO ──
  setText('hero-sub', d.hero.sub);
  setText('hero-title', d.hero.title);
  setText('hero-desc', d.hero.desc);
  if (d.hero.stats.length >= 4) {
    setText('stat1-num', d.hero.stats[0].num); setText('stat1-label', d.hero.stats[0].label);
    setText('stat2-num', d.hero.stats[1].num); setText('stat2-label', d.hero.stats[1].label);
    setText('stat3-num', d.hero.stats[2].num); setText('stat3-label', d.hero.stats[2].label);
    setText('stat4-num', d.hero.stats[3].num); setText('stat4-label', d.hero.stats[3].label);
  }

  // ── ABOUT ──
  setText('about-para1', d.about.para1);
  setText('about-para2', d.about.para2);
  const programList = document.getElementById('about-programs');

d.about.programs.forEach(item => {
  const li = document.createElement('li');
  li.textContent = item;
  programList.appendChild(li);
});

  setText('about-para3', d.about.para3);
setText('about-para4', d.about.para4);
setText('about-para5', d.about.para5);
setText('about-para6', d.about.para6);
setText('about-para7', d.about.para7);
setText('about-para8', d.about.para8);
  const hEl = document.getElementById('about-highlights');
  if (hEl) {
    hEl.innerHTML = d.about.highlights.map(h =>
      `<div class="highlight-item"><i class="fas fa-check-circle"></i> ${h}</div>`
    ).join('');
  }
// -- goto top
const topBtn = document.getElementById("goTopBtn");

// Show button on scroll
window.onscroll = function () {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
};

// Scroll to top on click
topBtn.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

  // ── MARQUEE ──
  const track = document.getElementById('marquee-track');
  if (track) {
    const items = [...d.marquee, ...d.marquee].map(m => `<span>${m}</span>`).join('');
    track.innerHTML = items;
  }

  // ── DEPARTMENTS ──
  const deptGrid = document.getElementById('dept-grid');
  if (deptGrid) {
    deptGrid.innerHTML = d.departments.map(dep => `
      <div class="dept-card">
        <div class="dept-icon"><i class="${dep.icon}"></i></div>
        <h3>${dep.name}</h3>
        <p>${dep.about}</p>
        <p style="font-size:12px;color:#999;margin-top:4px">${dep.intake}</p>
      </div>`).join('');
  }

  // ── FACULTY ──
  const depts = ['all', ...new Set(d.faculty.map(f => f.dept))];
  const filterBar = document.getElementById('faculty-filter');
  if (filterBar) {
    filterBar.innerHTML = depts.map((dep, i) =>
      `<button class="filter-btn${i === 0 ? ' active' : ''}" onclick="filterFaculty('${dep}')">${dep === 'all' ? 'All' : dep}</button>`
    ).join('');
  }
  renderFaculty('all');

  // ── NOTICES / CIRCULARS / EVENTS ──
  renderNotices('notices-list', d.notices);
  renderNotices('circulars-list', d.circulars);
  renderNotices('events-list', d.events);

  // ── GALLERY ──
  const gGrid = document.getElementById('gallery-grid');
  if (gGrid) {
    if (d.gallery && d.gallery.length > 0) {
      gGrid.innerHTML = d.gallery.map(g => `
        <div class="gallery-item">
          <img src="${g.url}" alt="${g.caption || ''}" loading="lazy"/>
          ${g.caption ? `<div class="caption">${g.caption}</div>` : ''}
        </div>`).join('');
    } else {
      gGrid.innerHTML = `<div class="gallery-placeholder"><i class="fas fa-images"></i><p>Add photos from Admin Panel</p></div>`;
    }
  }

  // ── FOOTER LINKS ──
  const flEl = document.getElementById('footer-links');
  if (flEl) {
    flEl.innerHTML = d.footerLinks.map(l => `<li><a href="${l.url}">${l.label}</a></li>`).join('');
  }
//

  // ── SOCIAL ──
  const slEl = document.getElementById('social-links');
  if (slEl) {
    const icons = { facebook: 'fab fa-facebook', instagram: 'fab fa-instagram', youtube: 'fab fa-youtube', twitter: 'fab fa-twitter' };
    slEl.innerHTML = Object.entries(d.social).map(([k, v]) =>
      `<a href="${v}"><i class="${icons[k] || 'fas fa-link'}"></i></a>`
    ).join('');
  }
});

// ── HELPERS ──
function setText(id, val) {
  const el = document.getElementById(id);
  if (el && val !== undefined) el.textContent = val;
}

function renderFaculty(dept) {
  const grid = document.getElementById('faculty-grid');
  if (!grid) return;
  const list = dept === 'all' ? COLLEGE_DATA.faculty : COLLEGE_DATA.faculty.filter(f => f.dept === dept);
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.toggle('active', b.textContent === (dept === 'all' ? 'All' : dept));
  });
  grid.innerHTML = list.map(f => `
    <div class="faculty-card">
      <div class="faculty-photo">
        ${f.photo ? `<img src="${f.photo}" alt="${f.name}"/>` : `<i class="fas fa-user-tie"></i>`}
      </div>
      <h3>${f.name}</h3>
      <p>${f.designation}</p>
      <p style="font-size:12px;color:#999">${f.qual}</p>
      <span class="faculty-dept-tag">${f.dept}</span>
    </div>`).join('');
}
window.filterFaculty = renderFaculty;

function renderNotices(listId, items) {
  const el = document.getElementById(listId);
  if (!el) return;
  if (!items || items.length === 0) {
    el.innerHTML = '<li style="padding:20px;color:#999;text-align:center">No items added yet.</li>';
    return;
  }
  el.innerHTML = items.map(n => `
    <li>
      <div class="notice-date"><strong>${n.date.split(' ')[0]}</strong>${n.date.split(' ')[1] || ''}</div>
      <div class="notice-body">
        <strong>${n.title}${n.isNew ? '<span class="notice-new">NEW</span>' : ''}</strong>
        <p>${n.body}</p>
        ${n.link ? `<a href="${n.link}" class="notice-link"><i class="fas fa-paperclip"></i> View Attachment</a>` : ''}
      </div>
    </li>`).join('');
}

function switchTab(listId, tabId) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
  event.target.classList.add('active');
}
window.switchTab = switchTab;

function toggleMenu() {
  document.querySelector('.nav').classList.toggle('open');
}