# 🎓 College Website — Setup Guide

## 📁 Folder Structure
```
college-website/
├── index.html         ← Main website (open this in browser)
├── style.css          ← Website styles
├── main.js            ← Website logic
├── data.js            ← ⭐ ALL CONTENT IS HERE
├── images/            ← Put your photos here
└── admin/
    ├── index.html     ← Admin Panel (manage content)
    ├── admin.css
    └── admin.js
```

---

## 🚀 How to Open Your Website

1. Open the `college-website` folder
2. Double-click `index.html` — your website opens in the browser!

---

## ✏️ How to Edit Content (Easy Way — Admin Panel)

1. Open `admin/index.html` in your browser
2. Use the left sidebar to navigate sections
3. Add/Edit/Delete notices, faculty, departments, gallery photos, etc.
4. Click **"Export & Save"** (top right) — a `data.js` file downloads
5. **Move this downloaded `data.js`** into your `college-website/` folder (replace the old one)
6. Refresh `index.html` — your changes appear! ✅

---

## ✏️ How to Edit Content (Direct Way — data.js)

Open `data.js` in Notepad or any text editor and change values directly.

### Example — Change College Name:
```js
info: {
  name: "Your College Name Here",   ← change this
  ...
}
```

### Example — Add a Notice:
```js
notices: [
  { date: "10 Jan", title: "New Notice Title", body: "Details here.", isNew: true, link: "" },
  ...
]
```

---

## 🖼️ Adding Photos to Gallery

1. Create a folder called `images` inside `college-website/`
2. Copy your photos into it (e.g. `lab.jpg`, `sports.jpg`)
3. In Admin Panel → Gallery → Add Photo → type `images/lab.jpg`
4. Export and replace `data.js`

---

## 📋 What You Can Manage

| Section | What You Can Do |
|---|---|
| Basic Info | College name, phone, email, address |
| Hero | Banner text, statistics |
| About | Description, highlights |
| Departments | Add/edit/delete departments |
| Faculty | Add faculty with photo, designation, dept |
| Notices | Add dated notices with NEW badge |
| Circulars | Add circulars with attachment links |
| Events | Add upcoming events |
| Gallery | Add photos with captions |
| Marquee | Edit the scrolling news bar |
| Footer Links | Admission portal, results, library links |

---

## 💡 Tips

- **No internet needed** — works fully offline!
- **No installation** — just open HTML files in Chrome/Edge
- **Backup** — keep a copy of `data.js` before making changes
- Put all photos in the `images/` folder for easy management

---

*Built for easy management by non-technical users.*
