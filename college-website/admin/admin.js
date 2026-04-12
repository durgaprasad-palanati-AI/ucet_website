// ============================================================
//  ADMIN.JS — Full Admin Panel Logic
// ============================================================

// Local working copy of data
let DATA = {};

let currentModal = { type: null, idx: null };
let dragSrc = null;

// ── INIT ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  DATA = JSON.parse(JSON.stringify(COLLEGE_DATA));
  populateForms();
  renderAllLists();
  updateDashboardCounts();

  document.querySelectorAll('.nav-item[data-section]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      goToSection(el.dataset.section);
    });
  });
});

function goToSection(name) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById(`section-${name}`)?.classList.add('active');
  document.querySelector(`[data-section="${name}"]`)?.classList.add('active');
  document.getElementById('page-title').textContent = document.querySelector(`[data-section="${name}"]`)?.textContent?.trim() || name;
}
window.goToSection = goToSection;

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}
window.toggleSidebar = toggleSidebar;

// ── POPULATE FORMS ─────────────────────────────────────────
function populateForms() {
  const d = DATA;
  // Basic info
  setVal('f-name', d.info.name);
  setVal('f-tagline', d.info.tagline);
  setVal('f-affiliation', d.info.affiliation);
  setVal('f-phone', d.info.phone);
  setVal('f-email', d.info.email);
  setVal('f-address', d.info.address);
  setVal('f-hours', d.info.hours);
  setVal('f-footerdesc', d.info.footerDesc);
  setVal('f-fb', d.social?.facebook || '');
  setVal('f-ig', d.social?.instagram || '');
  setVal('f-yt', d.social?.youtube || '');
  setVal('f-tw', d.social?.twitter || '');

  // Hero
  setVal('h-sub', d.hero.sub);
  setVal('h-title', d.hero.title);
  setVal('h-desc', d.hero.desc);
  if (d.hero.stats.length >= 4) {
    setVal('h-s1n', d.hero.stats[0].num); setVal('h-s1l', d.hero.stats[0].label);
    setVal('h-s2n', d.hero.stats[1].num); setVal('h-s2l', d.hero.stats[1].label);
    setVal('h-s3n', d.hero.stats[2].num); setVal('h-s3l', d.hero.stats[2].label);
    setVal('h-s4n', d.hero.stats[3].num); setVal('h-s4l', d.hero.stats[3].label);
  }

  // About
  setVal('ab-p1', d.about.para1);
  setVal('ab-p2', d.about.para2);
  setVal('ab-hl', (d.about.highlights || []).join('\n'));

  // Marquee
  setVal('marquee-text', (d.marquee || []).join('\n'));
}

// ── SAVE FORMS ─────────────────────────────────────────────
function saveBasicInfo() {
  DATA.info.name = getVal('f-name');
  DATA.info.tagline = getVal('f-tagline');
  DATA.info.affiliation = getVal('f-affiliation');
  DATA.info.phone = getVal('f-phone');
  DATA.info.email = getVal('f-email');
  DATA.info.address = getVal('f-address');
  DATA.info.hours = getVal('f-hours');
  DATA.info.footerDesc = getVal('f-footerdesc');
  DATA.social = { facebook: getVal('f-fb'), instagram: getVal('f-ig'), youtube: getVal('f-yt'), twitter: getVal('f-tw') };
  toast('Basic info saved!');
}
window.saveBasicInfo = saveBasicInfo;

function saveHero() {
  DATA.hero.sub = getVal('h-sub');
  DATA.hero.title = getVal('h-title');
  DATA.hero.desc = getVal('h-desc');
  DATA.hero.stats = [
    { num: getVal('h-s1n'), label: getVal('h-s1l') },
    { num: getVal('h-s2n'), label: getVal('h-s2l') },
    { num: getVal('h-s3n'), label: getVal('h-s3l') },
    { num: getVal('h-s4n'), label: getVal('h-s4l') }
  ];
  toast('Hero section saved!');
}
window.saveHero = saveHero;

function saveAbout() {
  DATA.about.para1 = getVal('ab-p1');
  DATA.about.para2 = getVal('ab-p2');
  DATA.about.highlights = getVal('ab-hl').split('\n').map(s => s.trim()).filter(Boolean);
  toast('About section saved!');
}
window.saveAbout = saveAbout;

function saveMarquee() {
  DATA.marquee = getVal('marquee-text').split('\n').map(s => s.trim()).filter(Boolean);
  toast('Marquee news saved!');
}
window.saveMarquee = saveMarquee;

// ── RENDER ALL LISTS ───────────────────────────────────────
function renderAllLists() {
  renderDeptList();
  renderFacultyList();
  renderNoticeList('notices');
  renderNoticeList('circulars');
  renderNoticeList('events');
  renderGalleryList();
  renderLinksList();
  renderScholarshipsList();  
}

// ── DEPARTMENTS ────────────────────────────────────────────
function renderDeptList() {
  const el = document.getElementById('dept-list');
  el.innerHTML = DATA.departments.map((d, i) => `
    <div class="drag-item" draggable="true" data-list="dept" data-idx="${i}">
      <i class="fas fa-grip-vertical drag-handle"></i>
      <div class="drag-item-info">
        <strong>${d.name}</strong>
        <small>${d.about} — ${d.intake}</small>
      </div>
      <div class="drag-item-actions">
        <button class="btn-edit" onclick="editDept(${i})"><i class="fas fa-edit"></i></button>
        <button class="btn-del" onclick="deleteDept(${i})"><i class="fas fa-trash"></i></button>
      </div>
    </div>`).join('');
  bindDrag('dept-list', 'departments');
}

function addDeptRow() { editDept(-1); }
window.addDeptRow = addDeptRow;

function editDept(idx) {
  const d = idx >= 0 ? DATA.departments[idx] : { name: '', icon: 'fas fa-book', intake: '', about: '' };
  currentModal = { type: 'dept', idx };
  openModal('Department', `
    <div class="form-group"><label>Department Name</label><input id="m-dname" type="text" value="${esc(d.name)}"/></div>
    <div class="form-group"><label>Programme (e.g. B.Tech / M.Tech)</label><input id="m-dabout" type="text" value="${esc(d.about)}"/></div>
    <div class="form-group"><label>Intake (e.g. 60 seats)</label><input id="m-dintake" type="text" value="${esc(d.intake)}"/></div>
    <div class="form-group"><label>Icon Class (Font Awesome)</label><input id="m-dicon" type="text" value="${esc(d.icon)}" placeholder="fas fa-laptop-code"/></div>
    <small style="color:#64748b">Icon from <a href="https://fontawesome.com/icons" target="_blank" style="color:#3b82f6">fontawesome.com/icons</a></small>
  `);
}
window.editDept = editDept;
window.deleteDept = (i) => { if (confirm('Delete this department?')) { DATA.departments.splice(i, 1); renderDeptList(); updateDashboardCounts(); toast('Deleted'); } };

// ── FACULTY ────────────────────────────────────────────────
function renderFacultyList() {
  const el = document.getElementById('faculty-list');
  el.innerHTML = DATA.faculty.map((f, i) => `
    <div class="drag-item" draggable="true" data-list="faculty" data-idx="${i}">
      <i class="fas fa-grip-vertical drag-handle"></i>
      <div class="drag-item-info">
        <strong>${f.name}</strong>
        <small>${f.designation} — ${f.dept} — ${f.qual}</small>
      </div>
      <div class="drag-item-actions">
        <button class="btn-edit" onclick="editFaculty(${i})"><i class="fas fa-edit"></i></button>
        <button class="btn-del" onclick="deleteFaculty(${i})"><i class="fas fa-trash"></i></button>
      </div>
    </div>`).join('');
  bindDrag('faculty-list', 'faculty');
}

function addFacultyRow() { editFaculty(-1); }
window.addFacultyRow = addFacultyRow;

function editFaculty(idx) {
  const f = idx >= 0 ? DATA.faculty[idx] : { name: '', designation: '', dept: '', qual: '', photo: '' };
  const depts = [...new Set(DATA.departments.map(d => d.name))];
  currentModal = { type: 'faculty', idx };
  openModal('Faculty Member', `
    <div class="form-group"><label>Full Name</label><input id="m-fname" type="text" value="${esc(f.name)}"/></div>
    <div class="form-group"><label>Designation</label><input id="m-fdesig" type="text" value="${esc(f.designation)}" placeholder="Professor / HOD / Principal"/></div>
    <div class="form-group"><label>Department</label>
      <select id="m-fdept">
        <option value="">-- Select --</option>
        ${depts.map(d => `<option value="${d}" ${d === f.dept ? 'selected' : ''}>${d}</option>`).join('')}
        <option value="Administration" ${f.dept === 'Administration' ? 'selected' : ''}>Administration</option>
      </select>
    </div>
    <div class="form-group"><label>Qualifications</label><input id="m-fqual" type="text" value="${esc(f.qual)}" placeholder="Ph.D, M.Tech"/></div>
    <div class="form-group"><label>Photo (filename in images/ folder or full URL)</label><input id="m-fphoto" type="text" value="${esc(f.photo)}" placeholder="images/teacher1.jpg"/></div>
  `);
}
window.editFaculty = editFaculty;
window.deleteFaculty = (i) => { if (confirm('Delete?')) { DATA.faculty.splice(i, 1); renderFacultyList(); updateDashboardCounts(); toast('Deleted'); } };

// ── NOTICES / CIRCULARS / EVENTS ───────────────────────────
function renderNoticeList(type) {
  const el = document.getElementById(`${type}-admin-list`);
  const items = DATA[type] || [];
  el.innerHTML = items.map((n, i) => `
    <div class="drag-item" draggable="true" data-list="${type}" data-idx="${i}">
      <i class="fas fa-grip-vertical drag-handle"></i>
      <div class="drag-item-info">
        <strong>${n.title} ${n.isNew ? '<span style="font-size:11px;background:#f59e0b20;color:#f59e0b;padding:1px 6px;border-radius:4px">NEW</span>' : ''}</strong>
        <small>${n.date} — ${n.body.substring(0, 60)}...</small>
      </div>
      <div class="drag-item-actions">
        <button class="btn-edit" onclick="editNotice('${type}', ${i})"><i class="fas fa-edit"></i></button>
        <button class="btn-del" onclick="deleteNotice('${type}', ${i})"><i class="fas fa-trash"></i></button>
      </div>
    </div>`).join('');
  bindDrag(`${type}-admin-list`, type);
}

function addNoticeRow(type) { editNotice(type, -1); }
window.addNoticeRow = addNoticeRow;

function editNotice(type, idx) {
  const n = idx >= 0 ? DATA[type][idx] : { date: '', title: '', body: '', isNew: true, link: '' };
  currentModal = { type: `notice_${type}`, idx };
  openModal(type.charAt(0).toUpperCase() + type.slice(1), `
    <div class="form-group"><label>Date (e.g. 10 Jan)</label><input id="m-ndate" type="text" value="${esc(n.date)}"/></div>
    <div class="form-group"><label>Title / Heading</label><input id="m-ntitle" type="text" value="${esc(n.title)}"/></div>
    <div class="form-group"><label>Description</label><textarea id="m-nbody" rows="4">${esc(n.body)}</textarea></div>
    <div class="form-group"><label>Attachment Link (optional)</label><input id="m-nlink" type="text" value="${esc(n.link)}" placeholder="PDF or URL"/></div>
    <div class="form-group"><label><input type="checkbox" id="m-nnew" ${n.isNew ? 'checked' : ''} style="width:auto;margin-right:8px"/>Mark as NEW</label></div>
  `);
}
window.editNotice = editNotice;
window.deleteNotice = (type, i) => { if (confirm('Delete?')) { DATA[type].splice(i, 1); renderNoticeList(type); updateDashboardCounts(); toast('Deleted'); } };

// ── GALLERY ────────────────────────────────────────────────
function renderGalleryList() {
  const el = document.getElementById('gallery-admin-list');
  const items = DATA.gallery || [];
  if (items.length === 0) {
    el.innerHTML = '<p style="color:#64748b;font-size:14px;padding:10px 0">No photos added yet. Click "Add Photo" above.</p>';
    return;
  }
  el.innerHTML = items.map((g, i) => `
    <div class="drag-item" draggable="true" data-list="gallery" data-idx="${i}">
      <i class="fas fa-grip-vertical drag-handle"></i>
      <div class="drag-item-info">
        <strong>${g.caption || '(No caption)'}</strong>
        <small>${g.url}</small>
      </div>
      <div class="drag-item-actions">
        <button class="btn-edit" onclick="editGallery(${i})"><i class="fas fa-edit"></i></button>
        <button class="btn-del" onclick="deleteGallery(${i})"><i class="fas fa-trash"></i></button>
      </div>
    </div>`).join('');
  bindDrag('gallery-admin-list', 'gallery');
}

function addGalleryRow() { editGallery(-1); }
window.addGalleryRow = addGalleryRow;

function editGallery(idx) {
  const g = idx >= 0 ? DATA.gallery[idx] : { url: '', caption: '' };
  currentModal = { type: 'gallery', idx };
  openModal('Photo', `
    <div class="form-group"><label>Image filename or URL</label><input id="m-gurl" type="text" value="${esc(g.url)}" placeholder="images/photo1.jpg OR https://..."/></div>
    <div class="form-group"><label>Caption</label><input id="m-gcap" type="text" value="${esc(g.caption)}" placeholder="Science Lab opening ceremony"/></div>
    <p style="font-size:12px;color:#64748b;margin-top:4px">Place image files in the <code style="color:#3b82f6">college-website/images/</code> folder.</p>
  `);
}
window.editGallery = editGallery;
window.deleteGallery = (i) => { if (confirm('Delete?')) { DATA.gallery.splice(i, 1); renderGalleryList(); updateDashboardCounts(); toast('Deleted'); } };

// ── FOOTER LINKS ───────────────────────────────────────────
function renderLinksList() {
  const el = document.getElementById('links-admin-list');
  el.innerHTML = DATA.footerLinks.map((l, i) => `
    <div class="drag-item" draggable="true" data-list="links" data-idx="${i}">
      <i class="fas fa-grip-vertical drag-handle"></i>
      <div class="drag-item-info"><strong>${l.label}</strong><small>${l.url}</small></div>
      <div class="drag-item-actions">
        <button class="btn-edit" onclick="editLink(${i})"><i class="fas fa-edit"></i></button>
        <button class="btn-del" onclick="deleteLink(${i})"><i class="fas fa-trash"></i></button>
      </div>
    </div>`).join('');
  bindDrag('links-admin-list', 'footerLinks');
}

function addLinkRow() { editLink(-1); }
window.addLinkRow = addLinkRow;

function editLink(idx) {
  const l = idx >= 0 ? DATA.footerLinks[idx] : { label: '', url: '#' };
  currentModal = { type: 'link', idx };
  openModal('Footer Link', `
    <div class="form-group"><label>Link Label</label><input id="m-llabel" type="text" value="${esc(l.label)}" placeholder="Admission Portal"/></div>
    <div class="form-group"><label>URL</label><input id="m-lurl" type="text" value="${esc(l.url)}" placeholder="https://..."/></div>
  `);
}
window.editLink = editLink;
window.deleteLink = (i) => { if (confirm('Delete?')) { DATA.footerLinks.splice(i, 1); renderLinksList(); toast('Deleted'); } };

// ---scholarship

// Render the list
function renderScholarshipsList() {
  const el = document.getElementById('scholarships-list');
  const items = DATA.scholarships || [];
  el.innerHTML = items.map((s, i) => `
    <div class="drag-item">
      <i class="fas fa-grip-vertical drag-handle"></i>
      <div class="drag-item-info">
        <strong>${s.name}</strong>
        <small>${s.amount} — ${s.eligibility}</small>
      </div>
      <div class="drag-item-actions">
        <button class="btn-edit" onclick="editScholarship(${i})">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn-del" onclick="deleteScholarship(${i})">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>`).join('');
}

// Open edit modal
function editScholarship(idx) {
  const s = idx >= 0 ? DATA.scholarships[idx]
                     : { name:'', amount:'', eligibility:'', deadline:'',link:'' };
  currentModal = { type: 'scholarship', idx };
  openModal('Scholarship', `
    <div class="form-group">
      <label>Scholarship Name</label>
      <input id="m-sname" type="text" value="${esc(s.name)}"/>
    </div>
    <div class="form-group">
      <label>Amount</label>
      <input id="m-samount" type="text" value="${esc(s.amount)}"/>
    </div>
    <div class="form-group">
      <label>Eligibility</label>
      <input id="m-selig" type="text" value="${esc(s.eligibility)}"/>
    </div>
    <div class="form-group">
      <label>Application Deadline</label>
      <input id="m-sdeadline" type="text" value="${esc(s.deadline)}"/>
    </div>
    <div class="form-group">
      <label>Apply Link (URL)</label>
      <input id="m-slink" type="text" value="${esc(s.link || '')}" placeholder="https://scholarships.gov.in"/>
    </div>
    `);
}
window.addScholarship = () => editScholarship(-1);
window.editScholarship = editScholarship;
window.deleteScholarship = (i) => {
  if (confirm('Delete?')) {
    DATA.scholarships.splice(i, 1);
    renderScholarshipsList();
    toast('Deleted');
  }
};

// Handle save from modal (add this inside the saveModal if-else chain)
// In the existing saveModal function, add:


// ── MODAL ──────────────────────────────────────────────────
function openModal(title, html) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = html;
  document.getElementById('modal-overlay').classList.add('open');
}
function closeModal() { document.getElementById('modal-overlay').classList.remove('open'); }
window.closeModal = closeModal;

function saveModal() {
  const { type, idx } = currentModal;
  if (type === 'dept') {
    const obj = { name: getVal('m-dname'), about: getVal('m-dabout'), intake: getVal('m-dintake'), icon: getVal('m-dicon') || 'fas fa-book' };
    if (idx < 0) DATA.departments.push(obj); else DATA.departments[idx] = obj;
    renderDeptList(); updateDashboardCounts();
  } else if (type === 'faculty') {
    const obj = { name: getVal('m-fname'), designation: getVal('m-fdesig'), dept: getVal('m-fdept'), qual: getVal('m-fqual'), photo: getVal('m-fphoto') };
    if (idx < 0) DATA.faculty.push(obj); else DATA.faculty[idx] = obj;
    renderFacultyList(); updateDashboardCounts();
  } else if (type?.startsWith('notice_')) {
    const ntype = type.replace('notice_', '');
    const obj = { date: getVal('m-ndate'), title: getVal('m-ntitle'), body: getVal('m-nbody'), link: getVal('m-nlink'), isNew: document.getElementById('m-nnew')?.checked || false };
    if (!DATA[ntype]) DATA[ntype] = [];
    if (idx < 0) DATA[ntype].unshift(obj); else DATA[ntype][idx] = obj;
    renderNoticeList(ntype); updateDashboardCounts();
  } else if (type === 'gallery') {
    const obj = { url: getVal('m-gurl'), caption: getVal('m-gcap') };
    if (!DATA.gallery) DATA.gallery = [];
    if (idx < 0) DATA.gallery.push(obj); else DATA.gallery[idx] = obj;
    renderGalleryList(); updateDashboardCounts();
  } else if (type === 'link') {
    const obj = { label: getVal('m-llabel'), url: getVal('m-lurl') };
    if (idx < 0) DATA.footerLinks.push(obj); else DATA.footerLinks[idx] = obj;
    renderLinksList();
  }
  else if (type === 'scholarship') {
  const obj = {
    name: getVal('m-sname'),
    amount: getVal('m-samount'),
    eligibility: getVal('m-selig'),
    deadline: getVal('m-sdeadline'),
    link: getVal('m-slink')
  };
  if (!DATA.scholarships) DATA.scholarships = [];
  if (idx < 0) DATA.scholarships.push(obj);
  else DATA.scholarships[idx] = obj;
  renderScholarshipsList();
}
  closeModal();
  toast('Saved successfully!');
}
window.saveModal = saveModal;

// ── DRAG & DROP ────────────────────────────────────────────
function bindDrag(listId, dataKey) {
  const el = document.getElementById(listId);
  if (!el) return;
  el.querySelectorAll('.drag-item').forEach(item => {
    item.addEventListener('dragstart', e => { dragSrc = item; item.classList.add('dragging'); e.dataTransfer.effectAllowed = 'move'; });
    item.addEventListener('dragend', () => { item.classList.remove('dragging'); el.querySelectorAll('.drag-item').forEach(i => i.classList.remove('drag-over')); });
    item.addEventListener('dragover', e => { e.preventDefault(); item.classList.add('drag-over'); });
    item.addEventListener('dragleave', () => item.classList.remove('drag-over'));
    item.addEventListener('drop', e => {
      e.preventDefault();
      if (dragSrc !== item) {
        const items = [...el.querySelectorAll('.drag-item')];
        const from = parseInt(dragSrc.dataset.idx);
        const to = parseInt(item.dataset.idx);
        const arr = DATA[dataKey];
        const moved = arr.splice(from, 1)[0];
        arr.splice(to, 0, moved);
        // Re-render
        if (dataKey === 'departments') renderDeptList();
        else if (dataKey === 'faculty') renderFacultyList();
        else if (dataKey === 'notices' || dataKey === 'circulars' || dataKey === 'events') renderNoticeList(dataKey);
        else if (dataKey === 'gallery') renderGalleryList();
        else if (dataKey === 'footerLinks') renderLinksList();
      }
    });
  });
}

// ── DASHBOARD COUNTS ───────────────────────────────────────
function updateDashboardCounts() {
  setElText('dash-notices-count', DATA.notices?.length || 0);
  setElText('dash-circulars-count', DATA.circulars?.length || 0);
  setElText('dash-faculty-count', DATA.faculty?.length || 0);
  setElText('dash-dept-count', DATA.departments?.length || 0);
  setElText('dash-gallery-count', DATA.gallery?.length || 0);
  setElText('dash-events-count', DATA.events?.length || 0);
}

// ── EXPORT data.js ─────────────────────────────────────────
function saveAllData() {
  // Collect any unsaved form data
  if (document.getElementById('f-name')) {
    DATA.info.name = getVal('f-name') || DATA.info.name;
    DATA.info.tagline = getVal('f-tagline') || DATA.info.tagline;
    DATA.info.affiliation = getVal('f-affiliation') || DATA.info.affiliation;
    DATA.info.phone = getVal('f-phone') || DATA.info.phone;
    DATA.info.email = getVal('f-email') || DATA.info.email;
    DATA.info.address = getVal('f-address') || DATA.info.address;
    DATA.info.hours = getVal('f-hours') || DATA.info.hours;
    DATA.info.footerDesc = getVal('f-footerdesc') || DATA.info.footerDesc;
    DATA.social = {
      facebook: getVal('f-fb') || DATA.social?.facebook,
      instagram: getVal('f-ig') || DATA.social?.instagram,
      youtube: getVal('f-yt') || DATA.social?.youtube,
      twitter: getVal('f-tw') || DATA.social?.twitter
    };
    DATA.hero.sub = getVal('h-sub') || DATA.hero.sub;
    DATA.hero.title = getVal('h-title') || DATA.hero.title;
    DATA.hero.desc = getVal('h-desc') || DATA.hero.desc;
    DATA.about.para1 = getVal('ab-p1') || DATA.about.para1;
    DATA.about.para2 = getVal('ab-p2') || DATA.about.para2;
    const hlVal = getVal('ab-hl');
    if (hlVal) DATA.about.highlights = hlVal.split('\n').map(s => s.trim()).filter(Boolean);
    const mqVal = getVal('marquee-text');
    if (mqVal) DATA.marquee = mqVal.split('\n').map(s => s.trim()).filter(Boolean);
  }

  const js = `// ============================================================
//  DATA.JS  —  Edit this file OR use the Admin Panel
//  All website content is stored here
//  Last updated: ${new Date().toLocaleString()}
// ============================================================

const COLLEGE_DATA = ${JSON.stringify(DATA, null, 2)};
`;

  const blob = new Blob([js], { type: 'application/javascript' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'data.js';
  a.click();
  URL.revokeObjectURL(a.href);
  toast('✅ data.js downloaded! Replace the file in your college-website folder.');
}
window.saveAllData = saveAllData;

// ── HELPERS ───────────────────────────────────────────────
function getVal(id) { const el = document.getElementById(id); return el ? el.value.trim() : ''; }
function setVal(id, val) { const el = document.getElementById(id); if (el) el.value = val || ''; }
function setElText(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }
function esc(str) { return String(str || '').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }

function toast(msg, isError = false) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show' + (isError ? ' error' : '');
  setTimeout(() => { t.className = 'toast'; }, 3500);
}
