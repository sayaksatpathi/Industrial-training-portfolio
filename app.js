// ============================================
// IT Service Portal – Vanilla JS with LocalStorage
// ============================================

// --- DEFAULT DATA ---
const DEFAULT_SERVICES = [
  { id: 's1', title: 'Web Development', category: 'Development', description: 'Custom, responsive web applications built with modern frameworks and performance best practices.', icon: 'code', features: ['Responsive Design', 'REST API Integration', 'SEO Optimized'] },
  { id: 's2', title: 'App Development', category: 'Mobile', description: 'Native and cross-platform mobile applications for iOS and Android with seamless UX.', icon: 'mobile-screen', features: ['iOS & Android', 'Push Notifications', 'Offline Support'] },
  { id: 's3', title: 'Cloud Services', category: 'Infrastructure', description: 'Scalable AWS, GCP, and Azure cloud migrations, Kubernetes orchestration, and CI/CD pipelines.', icon: 'cloud-bolt', features: ['99.9% Uptime SLA', 'Auto-scaling', 'Cost Optimization'] },
  { id: 's4', title: 'Software Development', category: 'Enterprise', description: 'Enterprise-grade software systems, microservices architecture, and custom ERP solutions.', icon: 'laptop-code', features: ['Microservices', 'API Design', 'Agile Delivery'] },
  { id: 's5', title: 'Cybersecurity & Audit', category: 'Security', description: 'Penetration testing, vulnerability assessments, and data encryption compliance solutions.', icon: 'shield-halved', features: ['Pen Testing', 'Zero-Trust Architecture', 'Compliance Reports'] },
  { id: 's6', title: 'IT Consulting', category: 'Consulting', description: 'Strategic IT roadmap consulting and digital transformation guidance for growing businesses.', icon: 'handshake', features: ['IT Roadmap', 'Tech Stack Review', 'Team Training'] }
];

const DEFAULT_PROJECTS = [
  { id: 'p1', title: 'E-Commerce Platform', client: 'RetailCo India', category: 'Web Development', description: 'A full-featured e-commerce platform with payment gateway, inventory management, and real-time analytics.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80', tags: ['HTML', 'CSS', 'Node.js'] },
  { id: 'p2', title: 'HealthTrack Mobile App', client: 'MediPlus Corp', category: 'App Development', description: 'A cross-platform health monitoring app with doctor appointment scheduling and telemedicine features.', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80', tags: ['React Native', 'Firebase'] },
  { id: 'p3', title: 'Cloud ERP System', client: 'ManufactureX', category: 'Cloud Services', description: 'A fully cloud-native ERP system on AWS with real-time inventory, payroll, and supply chain automation.', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80', tags: ['AWS', 'Node.js', 'React'] }
];

// --- INIT STORAGE ---
if (!localStorage.getItem('v_services')) localStorage.setItem('v_services', JSON.stringify(DEFAULT_SERVICES));
if (!localStorage.getItem('v_projects')) localStorage.setItem('v_projects', JSON.stringify(DEFAULT_PROJECTS));
if (!localStorage.getItem('v_requests')) localStorage.setItem('v_requests', JSON.stringify([]));

// --- THEME ---
let theme = localStorage.getItem('nexusit_theme') || 'dark';
document.documentElement.setAttribute('data-theme', theme);
updateThemeIcon();

document.getElementById('themeBtn').addEventListener('click', () => {
  theme = theme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('nexusit_theme', theme);
  updateThemeIcon();
});

function updateThemeIcon() {
  const icon = document.getElementById('themeIcon');
  if (icon) icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

// --- NAVIGATION ---
function navigate(page) {
  document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

  const section = document.getElementById('page-' + page);
  if (section) section.classList.add('active');

  const link = document.querySelector(`.nav-link[data-page="${page}"]`);
  if (link) link.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (page === 'home') updateHomeCounters();
  if (page === 'services') renderServices();
  if (page === 'projects') renderProjects();
  if (page === 'admin') renderAdmin();
}

// --- HOME COUNTERS ---
function updateHomeCounters() {
  const reqs = JSON.parse(localStorage.getItem('v_requests'));
  const srvs = JSON.parse(localStorage.getItem('v_services'));
  const projs = JSON.parse(localStorage.getItem('v_projects'));
  document.getElementById('count-requests').textContent = reqs.length;
  document.getElementById('count-services').textContent = srvs.length;
  document.getElementById('count-projects').textContent = projs.length;
}

// --- SERVICES ---
function renderServices() {
  const services = JSON.parse(localStorage.getItem('v_services'));
  const grid = document.getElementById('services-list-grid');
  if (!grid) return;
  grid.innerHTML = services.map(s => `
    <div class="service-card clickable-card" onclick="selectService('${s.title}')">
      <span class="service-badge">${s.category}</span>
      <div class="service-icon"><i class="fa-solid fa-${s.icon}"></i></div>
      <h3 class="service-title">${s.title}</h3>
      <p class="service-desc">${s.description}</p>
      <ul class="service-features">
        ${s.features.map(f => `<li><i class="fa-solid fa-check"></i> ${f}</li>`).join('')}
      </ul>
      <button class="btn btn-primary full-width" onclick="event.stopPropagation();selectService('${s.title}')">
        <i class="fa-solid fa-paper-plane"></i> Request This Service
      </button>
    </div>
  `).join('');
}

function selectService(title) {
  navigate('request');
  setTimeout(() => {
    const sel = document.getElementById('reqService');
    if (sel) sel.value = title;
  }, 100);
}

// --- PROJECTS ---
function renderProjects() {
  const projects = JSON.parse(localStorage.getItem('v_projects'));
  const grid = document.getElementById('projects-list-grid');
  if (!grid) return;
  grid.innerHTML = projects.map(p => `
    <div class="project-card">
      <div class="project-img-wrapper">
        <img src="${p.image}" alt="${p.title}" loading="lazy" />
        <span class="project-category-tag">${p.category}</span>
      </div>
      <div class="project-body">
        <h3 class="project-title">${p.title}</h3>
        <p class="project-client"><i class="fa-solid fa-building"></i> ${p.client}</p>
        <p class="project-desc">${p.description}</p>
        <div class="project-tags">
          ${p.tags.map(t => `<span class="tag-badge">${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

// --- SERVICE REQUEST ---
function submitRequest(e) {
  e.preventDefault();
  const req = {
    id: 'req-' + Date.now(),
    name: document.getElementById('reqName').value,
    email: document.getElementById('reqEmail').value,
    phone: document.getElementById('reqPhone').value || 'N/A',
    service: document.getElementById('reqService').value,
    description: document.getElementById('reqDesc').value,
    status: 'Pending',
    date: new Date().toLocaleDateString('en-IN')
  };

  const reqs = JSON.parse(localStorage.getItem('v_requests'));
  reqs.unshift(req);
  localStorage.setItem('v_requests', JSON.stringify(reqs));

  showToast('Service request submitted successfully!');
  document.getElementById('requestForm').reset();
  setTimeout(() => navigate('admin'), 1200);
}

// --- CONTACT FORM ---
function submitContact(e) {
  e.preventDefault();
  showToast('Message sent! We will respond within 24 hours.');
  e.target.reset();
}

// --- ADMIN DASHBOARD ---
function renderAdmin() {
  const reqs = JSON.parse(localStorage.getItem('v_requests'));
  const srvs = JSON.parse(localStorage.getItem('v_services'));
  const projs = JSON.parse(localStorage.getItem('v_projects'));
  const pending = reqs.filter(r => r.status === 'Pending').length;

  document.getElementById('admin-req-count').textContent = reqs.length;
  document.getElementById('admin-pending-count').textContent = pending + ' Pending';
  document.getElementById('admin-srv-count').textContent = srvs.length;
  document.getElementById('admin-proj-count').textContent = projs.length;

  const tbody = document.getElementById('admin-requests-tbody');
  if (!tbody) return;

  if (reqs.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:var(--text-secondary);padding:2rem">No requests yet. <a href="#" onclick="navigate('request');return false;" style="color:var(--accent-blue)">Submit one!</a></td></tr>`;
    return;
  }

  tbody.innerHTML = reqs.map(r => `
    <tr>
      <td><strong>${r.name}</strong></td>
      <td>
        <div style="color:var(--accent-blue)">${r.email}</div>
        <div style="font-size:0.8rem;color:var(--text-secondary)">${r.phone}</div>
      </td>
      <td>${r.service}</td>
      <td>${r.date}</td>
      <td>
        <select class="status-select" onchange="updateStatus('${r.id}', this.value)">
          <option value="Pending" ${r.status === 'Pending' ? 'selected' : ''}>Pending</option>
          <option value="In Progress" ${r.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
          <option value="Completed" ${r.status === 'Completed' ? 'selected' : ''}>Completed</option>
        </select>
      </td>
      <td class="text-right">
        <button class="btn-icon" style="color:var(--text-secondary)" onclick="viewReq('${r.id}')"><i class="fa-solid fa-eye"></i></button>
        <button class="btn-icon" style="color:#ef4444" onclick="deleteReq('${r.id}')"><i class="fa-solid fa-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

function updateStatus(id, newStatus) {
  const reqs = JSON.parse(localStorage.getItem('v_requests'));
  const idx = reqs.findIndex(r => r.id === id);
  if (idx > -1) {
    reqs[idx].status = newStatus;
    localStorage.setItem('v_requests', JSON.stringify(reqs));
    showToast('Status updated to: ' + newStatus);
    renderAdmin();
  }
}

function deleteReq(id) {
  if (!confirm('Delete this request permanently?')) return;
  let reqs = JSON.parse(localStorage.getItem('v_requests'));
  reqs = reqs.filter(r => r.id !== id);
  localStorage.setItem('v_requests', JSON.stringify(reqs));
  renderAdmin();
  showToast('Request deleted!');
}

function viewReq(id) {
  const reqs = JSON.parse(localStorage.getItem('v_requests'));
  const req = reqs.find(r => r.id === id);
  if (req) alert(`Request Details:\n\nName: ${req.name}\nEmail: ${req.email}\nPhone: ${req.phone}\nService: ${req.service}\nDate: ${req.date}\nStatus: ${req.status}\n\nDescription:\n${req.description}`);
}

// --- TOAST ---
function showToast(msg) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast success';
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 400); }, 3000);
}

// --- INITIAL LOAD ---
updateHomeCounters();
