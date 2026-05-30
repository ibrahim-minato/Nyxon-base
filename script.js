// ==================== STATE MANAGEMENT ====================
let currentTemplate = 'modern';
let currentTheme = 'default';
let currentMode = 'resume';
let currentCoverTemplate = 'formal';
let currentPortfolioTemplate = 'gallery';
let experiences = [];
let educations = [];
let skills = [];
let certifications = [];
let coverLetter = { company: '', role: '', intro: '', body: '', closing: '' };
let projects = [];
// Feature flag: control whether users may enable monetization
const allowMonetization = false;

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    addExperience();
    addEducation();
    addCertification();
    renderCoverLetterInputs();
    renderProjectInputs();
    applyTheme();
    setCoverLetterTemplate(currentCoverTemplate);
    setPortfolioTemplate(currentPortfolioTemplate);
    setMode('resume');
    if (allowMonetization) {
        initAdBanner();
    } else {
        // Replace ad section with informational notice to prevent user monetization
        const adEl = document.getElementById('adSection');
        if (adEl) {
            adEl.innerHTML = `
                <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80">
                    <h2 class="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Monetization</h2>
                    <p class="text-xs text-slate-600">Ad monetization is disabled for users in this deployment. Ads are managed automatically by the platform.</p>
                </div>
            `;
        }
    }
    updatePreview();
});

const adBanners = [
    { title: 'Build Your Career Brand', text: 'Showcase your resume, cover letter, and portfolio in one polished app.' },
    { title: 'Get More Views', text: 'Add professional templates and let recruiters see your best work fast.' },
    { title: 'Earn from Your Skills', text: 'Turn your portfolio into a marketing tool with strong case studies.' },
    { title: 'Sponsor Your Side Hustle', text: 'Use ad space to highlight partners, sponsors, or premium upgrades.' }
];
let currentAdIndex = -1;

function initAdBanner() {
    refreshAdBanner();
    setInterval(refreshAdBanner, 12000);
}

function refreshAdBanner() {
    currentAdIndex = (currentAdIndex + 1) % adBanners.length;
    const ad = adBanners[currentAdIndex];
    const title = document.getElementById('adBannerTitle');
    const text = document.getElementById('adBannerText');
    if (title) title.textContent = ad.title;
    if (text) text.textContent = ad.text;
}

function applyTheme() {
    document.body.dataset.theme = currentTheme;
    const preview = document.getElementById('resumePreview');
    preview.className = `resume-page theme-${currentTheme}`;
}

function setTheme(theme) {
    currentTheme = theme;
    document.querySelectorAll('.theme-card').forEach(el => {
        if (el.id === `theme-${theme}`) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });
    applyTheme();
}

function updateZoom(value) {
    document.getElementById('previewContainer').style.transform = `scale(${value})`;
    document.getElementById('zoomValue').textContent = Math.round(value * 100) + '%';
}

function showAIThinking() {
    const toast = document.getElementById('aiToast');
    toast.classList.remove('translate-y-24', 'opacity-0');
    setTimeout(() => {
        toast.classList.add('translate-y-24', 'opacity-0');
    }, 1800);
}

function setTemplate(template) {
    currentTemplate = template;
    document.querySelectorAll('#templateSection .template-card').forEach(el => {
        el.classList.remove('active', 'border-blue-500', 'bg-blue-50');
        el.classList.add('border-slate-200');
    });
    const activeEl = document.getElementById(`tpl-${template}`);
    activeEl.classList.add('active', 'border-blue-500', 'bg-blue-50');
    activeEl.classList.remove('border-slate-200');
    showAIThinking();
    updatePreview();
}

function resetAll() {
    if(!confirm('Clear all data?')) return;
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('title').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('location').value = '';
    document.getElementById('website').value = '';
    if (document.getElementById('targetJob')) document.getElementById('targetJob').value = '';
    document.getElementById('summary').value = '';
    experiences = []; educations = []; skills = []; certifications = [];
    coverLetter = { company: '', role: '', intro: '', body: '', closing: '' };
    projects = [];
    currentCoverTemplate = 'formal';
    currentPortfolioTemplate = 'gallery';
    addExperience(); addEducation(); addCertification();
    renderExperienceInputs(); renderEducationInputs(); renderSkills(); renderCertificationInputs(); renderCoverLetterInputs(); renderProjectInputs();
    setCoverLetterTemplate(currentCoverTemplate);
    setPortfolioTemplate(currentPortfolioTemplate);
    setMode('resume');
    updatePreview();
}

// ==================== EXPERIENCE MANAGEMENT ====================
function addExperience() {
    const id = Date.now() + Math.random();
    experiences.push({ id, company: '', position: '', startDate: '', endDate: '', description: '' });
    renderExperienceInputs();
}

function removeExperience(id) {
    experiences = experiences.filter(e => e.id !== id);
    renderExperienceInputs();
    updatePreview();
}

function updateExperience(id, field, value) {
    const exp = experiences.find(e => e.id === id);
    if (exp) { exp[field] = value; updatePreview(); }
}

function renderExperienceInputs() {
    const container = document.getElementById('experienceList');
    container.innerHTML = experiences.map(exp => `
        <div class="section-enter bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
            <div class="grid grid-cols-2 gap-3">
                <input type="text" oninput="updateExperience(${exp.id}, 'company', this.value)" value="${exp.company}" class="input-animate w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-sm" placeholder="Company Name">
                <input type="text" oninput="updateExperience(${exp.id}, 'position', this.value)" value="${exp.position}" class="input-animate w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-sm" placeholder="Job Title">
            </div>
            <div class="grid grid-cols-2 gap-3">
                <input type="text" oninput="updateExperience(${exp.id}, 'startDate', this.value)" value="${exp.startDate}" class="input-animate w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-sm" placeholder="Start Date (Jan 2020)">
                <input type="text" oninput="updateExperience(${exp.id}, 'endDate', this.value)" value="${exp.endDate}" class="input-animate w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-sm" placeholder="End Date (or Present)">
            </div>
            <textarea oninput="updateExperience(${exp.id}, 'description', this.value)" rows="2" class="input-animate w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-sm resize-none" placeholder="Key responsibilities and achievements...">${exp.description}</textarea>
            ${experiences.length > 1 ? `<button onclick="removeExperience(${exp.id})" class="text-xs text-red-500 hover:text-red-700 font-semibold flex items-center gap-1"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>Remove</button>` : ''}
        </div>
    `).join('');
}

// ==================== EDUCATION MANAGEMENT ====================
function addEducation() {
    const id = Date.now() + Math.random();
    educations.push({ id, school: '', degree: '', field: '', year: '' });
    renderEducationInputs();
}

function removeEducation(id) {
    educations = educations.filter(e => e.id !== id);
    renderEducationInputs();
    updatePreview();
}

function updateEducation(id, field, value) {
    const edu = educations.find(e => e.id === id);
    if (edu) { edu[field] = value; updatePreview(); }
}

function renderEducationInputs() {
    const container = document.getElementById('educationList');
    container.innerHTML = educations.map(edu => `
        <div class="section-enter bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
            <div class="grid grid-cols-2 gap-3">
                <input type="text" oninput="updateEducation(${edu.id}, 'school', this.value)" value="${edu.school}" class="input-animate w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-sm" placeholder="School / University">
                <input type="text" oninput="updateEducation(${edu.id}, 'degree', this.value)" value="${edu.degree}" class="input-animate w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-sm" placeholder="Degree (Bachelor's)">
            </div>
            <div class="grid grid-cols-2 gap-3">
                <input type="text" oninput="updateEducation(${edu.id}, 'field', this.value)" value="${edu.field}" class="input-animate w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-sm" placeholder="Field of Study">
                <input type="text" oninput="updateEducation(${edu.id}, 'year', this.value)" value="${edu.year}" class="input-animate w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-sm" placeholder="Graduation Year">
            </div>
            ${educations.length > 1 ? `<button onclick="removeEducation(${edu.id})" class="text-xs text-red-500 hover:text-red-700 font-semibold flex items-center gap-1"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>Remove</button>` : ''}
        </div>
    `).join('');
}

// ==================== CERTIFICATIONS MANAGEMENT ====================
function addCertification() {
    const id = Date.now() + Math.random();
    certifications.push({ id, name: '', issuer: '', year: '' });
    renderCertificationInputs();
}

function removeCertification(id) {
    certifications = certifications.filter(c => c.id !== id);
    renderCertificationInputs();
    updatePreview();
}

function updateCertification(id, field, value) {
    const cert = certifications.find(c => c.id === id);
    if (cert) { cert[field] = value; updatePreview(); }
}

function renderCertificationInputs() {
    const container = document.getElementById('certificationsList');
    container.innerHTML = certifications.map(cert => `
        <div class="section-enter bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
            <div class="grid grid-cols-3 gap-3">
                <input type="text" oninput="updateCertification(${cert.id}, 'name', this.value)" value="${cert.name}" class="input-animate w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-sm" placeholder="Certification Name">
                <input type="text" oninput="updateCertification(${cert.id}, 'issuer', this.value)" value="${cert.issuer}" class="input-animate w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-sm" placeholder="Issuing Organization">
                <input type="text" oninput="updateCertification(${cert.id}, 'year', this.value)" value="${cert.year}" class="input-animate w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-sm" placeholder="Year">
            </div>
            ${certifications.length > 1 ? `<button onclick="removeCertification(${cert.id})" class="text-xs text-red-500 hover:text-red-700 font-semibold flex items-center gap-1"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>Remove</button>` : ''}
        </div>
    `).join('');
}

function addProject() {
    const id = Date.now() + Math.random();
    projects.push({ id, name: '', role: '', description: '', link: '', year: '' });
    renderProjectInputs();
}

function removeProject(id) {
    projects = projects.filter(project => project.id !== id);
    renderProjectInputs();
    updatePreview();
}

function updateProject(id, field, value) {
    const project = projects.find(p => p.id === id);
    if (project) { project[field] = value; updatePreview(); }
}

function renderProjectInputs() {
    const container = document.getElementById('portfolioList');
    if (!container) return;
    container.innerHTML = projects.map(project => `
        <div class="section-enter bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
            <div class="grid grid-cols-2 gap-3">
                <input type="text" oninput="updateProject(${project.id}, 'name', this.value)" value="${project.name}" class="input-animate w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-sm" placeholder="Project Name">
                <input type="text" oninput="updateProject(${project.id}, 'role', this.value)" value="${project.role}" class="input-animate w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-sm" placeholder="Your Role">
            </div>
            <div class="grid grid-cols-2 gap-3">
                <input type="text" oninput="updateProject(${project.id}, 'link', this.value)" value="${project.link}" class="input-animate w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-sm" placeholder="Live link or repo">
                <input type="text" oninput="updateProject(${project.id}, 'year', this.value)" value="${project.year}" class="input-animate w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-sm" placeholder="Year">
            </div>
            <textarea oninput="updateProject(${project.id}, 'description', this.value)" rows="2" class="input-animate w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-sm resize-none" placeholder="Project description and impact...">${project.description}</textarea>
            ${projects.length > 1 ? `<button onclick="removeProject(${project.id})" class="text-xs text-red-500 hover:text-red-700 font-semibold flex items-center gap-1"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>Remove</button>` : ''}
        </div>
    `).join('');
}

function renderCoverLetterInputs() {
    document.getElementById('coverCompany').value = coverLetter.company;
    document.getElementById('coverRole').value = coverLetter.role;
    document.getElementById('coverIntro').value = coverLetter.intro;
    document.getElementById('coverBody').value = coverLetter.body;
    document.getElementById('coverClosing').value = coverLetter.closing;
}

function updateCoverLetter(field, value) {
    coverLetter[field] = value;
    updatePreview();
}

function selectCoverLetterStyle(template) {
    if (currentMode !== 'cover') {
        setMode('cover');
    }
    setCoverLetterTemplate(template);
}

function selectPortfolioStyle(template) {
    if (currentMode !== 'portfolio') {
        setMode('portfolio');
    }
    setPortfolioTemplate(template);
}

function setCoverLetterTemplate(template) {
    currentCoverTemplate = template;
    document.querySelectorAll('.cover-template-card').forEach(el => {
        el.classList.remove('active', 'border-blue-500', 'bg-blue-50');
        el.classList.add('border-slate-200');
    });
    const activeEl = document.getElementById(`cover-tpl-${template}`);
    if (activeEl) {
        activeEl.classList.add('active', 'border-blue-500', 'bg-blue-50');
        activeEl.classList.remove('border-slate-200');
    }
    const label = document.getElementById('coverTemplateLabel');
    if (label) {
        const coverLabels = {
            formal: 'Formal',
            classic: 'Classic',
            modern: 'Modern',
            fresh: 'Fresh',
            creative: 'Creative',
            styled: 'Styled',
            minimal: 'Minimal',
            clean: 'Clean',
            executive: 'Executive',
            polished: 'Polished',
            bold: 'Bold',
            elegant: 'Elegant',
            refined: 'Refined',
            premium: 'Premium',
            smart: 'Smart',
            direct: 'Direct',
            narrative: 'Narrative',
            persuasive: 'Persuasive',
            modern2: 'Modern 2',
            brief: 'Brief'
        };
        label.textContent = coverLabels[template] || template;
    }
    showAIThinking();
    updatePreview();
}

function setPortfolioTemplate(template) {
    currentPortfolioTemplate = template;
    document.querySelectorAll('.portfolio-template-card').forEach(el => {
        el.classList.remove('active', 'border-blue-500', 'bg-blue-50');
        el.classList.add('border-slate-200');
    });
    const activeEl = document.getElementById(`portfolio-tpl-${template}`);
    if (activeEl) {
        activeEl.classList.add('active', 'border-blue-500', 'bg-blue-50');
        activeEl.classList.remove('border-slate-200');
    }
    const label = document.getElementById('portfolioTemplateLabel');
    if (label) {
        const portfolioLabels = {
            gallery: 'Gallery',
            caseStudy: 'Case Study',
            grid: 'Grid',
            studio: 'Studio',
            bold: 'Bold',
            impact: 'Impact',
            premium: 'Premium',
            refined: 'Refined',
            luxe: 'Luxe',
            sleek: 'Sleek',
            organized: 'Organized',
            showcase: 'Showcase',
            creative: 'Creative',
            minimalist: 'Minimalist',
            classic: 'Classic',
            dynamic: 'Dynamic',
            polished: 'Polished',
            brand: 'Brand',
            interactive: 'Interactive',
            vivid: 'Vivid'
        };
        label.textContent = portfolioLabels[template] || template;
    }
    showAIThinking();
    updatePreview();
}

function renderCoverLetter(data) {
    const coverRenderers = {
        formal: renderCoverLetterFormal,
        classic: renderCoverLetterFormal,
        modern: renderCoverLetterModern,
        fresh: renderCoverLetterModern,
        creative: renderCoverLetterCreative,
        styled: renderCoverLetterCreative,
        minimal: renderCoverLetterMinimal,
        clean: renderCoverLetterMinimal,
        executive: renderCoverLetterExecutive,
        polished: renderCoverLetterExecutive,
        bold: renderCoverLetterCreative,
        elegant: renderCoverLetterFormal,
        refined: renderCoverLetterMinimal,
        premium: renderCoverLetterExecutive,
        smart: renderCoverLetterFormal,
        direct: renderCoverLetterFormal,
        narrative: renderCoverLetterModern,
        persuasive: renderCoverLetterExecutive,
        modern2: renderCoverLetterModern,
        brief: renderCoverLetterMinimal
    };
    return (coverRenderers[currentCoverTemplate] || renderCoverLetterFormal)(data);
}

function renderPortfolioPage(data) {
    const portfolioRenderers = {
        gallery: renderPortfolioGallery,
        caseStudy: renderPortfolioCaseStudy,
        grid: renderPortfolioGrid,
        studio: renderPortfolioStudio,
        bold: renderPortfolioBold,
        impact: renderPortfolioBold,
        premium: renderPortfolioStudio,
        refined: renderPortfolioGrid,
        luxe: renderPortfolioGallery,
        sleek: renderPortfolioCaseStudy,
        organized: renderPortfolioGrid,
        showcase: renderPortfolioStudio,
        creative: renderPortfolioGallery,
        minimalist: renderPortfolioGrid,
        classic: renderPortfolioGallery,
        dynamic: renderPortfolioCaseStudy,
        polished: renderPortfolioStudio,
        brand: renderPortfolioBold,
        interactive: renderPortfolioCaseStudy,
        vivid: renderPortfolioGallery
    };
    return (portfolioRenderers[currentPortfolioTemplate] || renderPortfolioGallery)(data);
}

function renderCoverLetterFormal(data) {
    const fullName = `${data.firstName} ${data.lastName}`.trim() || 'Your Name';
    return `
        <div class="min-h-[297mm] bg-white p-12 font-source">
            <div class="max-w-3xl mx-auto space-y-6 text-slate-800">
                <div class="text-sm leading-relaxed">
                    <p class="font-semibold">${fullName}</p>
                    ${data.email ? `<p>${data.email}</p>` : ''}
                    ${data.phone ? `<p>${data.phone}</p>` : ''}
                    ${data.website ? `<p>${data.website}</p>` : ''}
                    ${data.location ? `<p>${data.location}</p>` : ''}
                </div>
                <div class="text-sm text-slate-600">
                    <p>${data.coverLetter.company || 'Hiring Team'}</p>
                    ${data.coverLetter.role ? `<p>${data.coverLetter.role}</p>` : ''}
                </div>
                <div class="space-y-5 text-sm leading-7 text-slate-700">
                    ${data.coverLetter.intro ? `<p>${data.coverLetter.intro}</p>` : `<p>Dear Hiring Manager,</p><p>I am writing to express my interest in the position at your company. My professional experience and commitment to excellence make me well-suited to contribute to your team.</p>`}
                    ${data.coverLetter.body ? `<p>${data.coverLetter.body}</p>` : `<p>With a strong background in my field, I have led projects that improved operational efficiency and delivered measurable results. I appreciate the opportunity to present my qualifications for this role.</p>`}
                    ${data.coverLetter.closing ? `<p>${data.coverLetter.closing}</p>` : `<p>Thank you for your time and consideration. I look forward to the possibility of discussing this opportunity further.</p>`}
                </div>
                <div class="text-sm font-semibold">
                    <p>Yours sincerely,</p>
                    <p class="mt-4">${fullName}</p>
                </div>
            </div>
        </div>
    `;
}

function renderCoverLetterModern(data) {
    const fullName = `${data.firstName} ${data.lastName}`.trim() || 'Your Name';
    return `
        <div class="min-h-[297mm] bg-white p-12 font-source">
            <div class="max-w-4xl mx-auto">
                <div class="mb-8 p-8 bg-slate-950 text-white rounded-[32px] shadow-xl">
                    <h1 class="text-4xl font-bold">${fullName}</h1>
                    ${data.title ? `<p class="text-slate-300 mt-2">${data.title}</p>` : '<p class="text-slate-300 mt-2">Strategic Innovator & Results-Oriented Professional</p>'}
                </div>
                <div class="grid grid-cols-2 gap-8 mb-8 text-sm text-slate-700">
                    <div>${data.email ? `<p>${data.email}</p>` : ''}${data.phone ? `<p>${data.phone}</p>` : ''}</div>
                    <div>${data.website ? `<p>${data.website}</p>` : ''}${data.location ? `<p>${data.location}</p>` : ''}</div>
                </div>
                <div class="space-y-5 text-sm leading-7 text-slate-700">
                    ${data.coverLetter.intro ? `<p>${data.coverLetter.intro}</p>` : `<p>Hello, I’m excited to apply for this role because it aligns with my passion for delivering impactful results in a modern work environment.</p>`}
                    ${data.coverLetter.body ? `<p>${data.coverLetter.body}</p>` : `<p>I bring a proven ability to turn ideas into measurable outcomes, collaborate across teams, and adapt quickly to evolving priorities.</p>`}
                    ${data.coverLetter.closing ? `<p>${data.coverLetter.closing}</p>` : `<p>Thank you for your consideration. I would welcome the opportunity to discuss how I can contribute to your team.</p>`}
                </div>
                <div class="mt-12 text-sm font-semibold text-slate-900">
                    <p>Best regards,</p>
                    <p class="mt-4">${fullName}</p>
                </div>
            </div>
        </div>
    `;
}

function renderCoverLetterCreative(data) {
    const fullName = `${data.firstName} ${data.lastName}`.trim() || 'Your Name';
    return `
        <div class="min-h-[297mm] bg-white p-12 font-source">
            <div class="max-w-3xl mx-auto border-l-4 border-sky-500 pl-8 space-y-6 text-slate-800">
                <div class="space-y-1 text-sm text-slate-600">
                    <p class="text-lg font-semibold">${fullName}</p>
                    ${data.email ? `<p>${data.email}</p>` : ''}
                    ${data.phone ? `<p>${data.phone}</p>` : ''}
                    ${data.website ? `<p>${data.website}</p>` : ''}
                </div>
                <div class="text-sm text-slate-700">
                    <p class="font-semibold">${data.coverLetter.company || 'Creative Team'}</p>
                    ${data.coverLetter.role ? `<p>${data.coverLetter.role}</p>` : `<p>Design & Innovation Role</p>`}
                </div>
                <div class="space-y-5 text-sm leading-7 text-slate-700">
                    ${data.coverLetter.intro ? `<p>${data.coverLetter.intro}</p>` : `<p>Hi there, I’m excited to explore how my creative perspective can help your team make an impact.</p>`}
                    ${data.coverLetter.body ? `<p>${data.coverLetter.body}</p>` : `<p>I combine bold thinking with practical execution to create work that is both memorable and effective.</p>`}
                    ${data.coverLetter.closing ? `<p>${data.coverLetter.closing}</p>` : `<p>Thank you for your time. I look forward to collaborating on something great.</p>`}
                </div>
                <div class="mt-10 text-sm font-semibold text-slate-900">
                    <p>Warmly,</p>
                    <p class="mt-4">${fullName}</p>
                </div>
            </div>
        </div>
    `;
}

function renderCoverLetterMinimal(data) {
    const fullName = `${data.firstName} ${data.lastName}`.trim() || 'Your Name';
    return `
        <div class="min-h-[297mm] bg-white p-12 font-source">
            <div class="max-w-3xl mx-auto text-slate-900">
                <div class="mb-10 text-sm leading-7 space-y-2">
                    <p class="font-semibold">${fullName}</p>
                    ${data.email ? `<p>${data.email}</p>` : ''}
                    ${data.phone ? `<p>${data.phone}</p>` : ''}
                    ${data.website ? `<p>${data.website}</p>` : ''}
                </div>
                <div class="mb-8 text-sm text-slate-700 space-y-5">
                    ${data.coverLetter.intro ? `<p>${data.coverLetter.intro}</p>` : `<p>Hello, I am interested in this role and appreciate the chance to share my qualifications clearly.</p>`}
                    ${data.coverLetter.body ? `<p>${data.coverLetter.body}</p>` : `<p>My experience includes delivering consistent results, simplifying complex problems, and communicating clearly with teams and stakeholders.</p>`}
                    ${data.coverLetter.closing ? `<p>${data.coverLetter.closing}</p>` : `<p>Thank you for reviewing my application. I look forward to hearing from you.</p>`}
                </div>
                <div class="text-sm font-semibold">
                    <p>Sincerely,</p>
                    <p class="mt-4">${fullName}</p>
                </div>
            </div>
        </div>
    `;
}

function renderCoverLetterExecutive(data) {
    const fullName = `${data.firstName} ${data.lastName}`.trim() || 'Your Name';
    return `
        <div class="min-h-[297mm] bg-slate-950 text-white p-12 font-source">
            <div class="max-w-3xl mx-auto bg-slate-900 rounded-[32px] p-10 space-y-6 shadow-2xl">
                <div class="text-3xl font-bold tracking-tight">${fullName}</div>
                <div class="text-slate-400 text-sm space-y-1">
                    ${data.title ? `<p>${data.title}</p>` : '<p>Executive Leader</p>'}
                    ${data.email ? `<p>${data.email}</p>` : ''}
                    ${data.phone ? `<p>${data.phone}</p>` : ''}
                </div>
                <div class="border-t border-slate-700 pt-6 text-sm leading-7 text-slate-300 space-y-5">
                    ${data.coverLetter.intro ? `<p>${data.coverLetter.intro}</p>` : `<p>Dear Executive Team,</p><p>I am reaching out to express my strong interest in the position and to share how I can contribute to your organization.</p>`}
                    ${data.coverLetter.body ? `<p>${data.coverLetter.body}</p>` : `<p>With a proven ability to lead strategic initiatives, improve operations, and align teams behind shared goals, I bring the executive perspective needed to drive results.</p>`}
                    ${data.coverLetter.closing ? `<p>${data.coverLetter.closing}</p>` : `<p>Thank you for your consideration. I would welcome the opportunity to discuss how my leadership can support your priorities.</p>`}
                </div>
                <div class="pt-6 text-sm font-semibold text-slate-200">
                    <p>Respectfully,</p>
                    <p class="mt-4">${fullName}</p>
                </div>
            </div>
        </div>`;
}

function renderPortfolioGallery(data) {
    const fullName = `${data.firstName} ${data.lastName}`.trim() || 'Your Name';
    return `
        <div class="min-h-[297mm] bg-white p-10">
            <div class="max-w-6xl mx-auto">
                <div class="mb-10 grid grid-cols-12 gap-8">
                    <div class="col-span-4 bg-slate-950 text-white rounded-[32px] p-8 space-y-6">
                        <h1 class="text-4xl font-bold">${fullName}</h1>
                        ${data.title ? `<p class="text-slate-300">${data.title}</p>` : ''}
                        ${data.summary ? `<p class="text-slate-400 text-sm leading-relaxed">${data.summary}</p>` : ''}

                        <div class="mt-4 pt-4 border-t border-white/10">
                            <h3 class="text-xs uppercase tracking-[0.2em] text-slate-300 mb-2">Contact</h3>
                            ${data.email ? `<p class="text-sm text-slate-200">${data.email}</p>` : ''}
                            ${data.phone ? `<p class="text-sm text-slate-200">${data.phone}</p>` : ''}
                            ${data.location ? `<p class="text-sm text-slate-200">${data.location}</p>` : ''}
                            ${data.website ? `<p class="text-sm text-sky-300">${data.website}</p>` : ''}
                        </div>

                        ${data.skills && data.skills.length > 0 ? `
                        <div class="mt-4">
                            <h3 class="text-xs uppercase tracking-[0.2em] text-slate-300 mb-2">Skills</h3>
                            <div class="flex flex-wrap gap-2">
                                ${data.skills.map(skill => `<span class="px-2 py-1 text-xs bg-white/10 rounded-md">${skill}</span>`).join('')}
                            </div>
                        </div>` : ''}

                        ${data.certifications && data.certifications.length > 0 ? `
                        <div class="mt-4">
                            <h3 class="text-xs uppercase tracking-[0.2em] text-slate-300 mb-2">Certifications</h3>
                            <div class="space-y-1 text-sm text-slate-200">
                                ${data.certifications.map(cert => `<div><p class="font-semibold">${cert.name}</p><p class="text-xs text-slate-300">${cert.issuer || ''}${cert.year ? ` · ${cert.year}` : ''}</p></div>`).join('')}
                            </div>
                        </div>` : ''}
                    </div>
                    <div class="col-span-8 grid gap-6">
                        ${data.projects.length > 0 ? data.projects.map(project => `
                            <div class="bg-slate-50 rounded-[32px] p-8 shadow-sm ring-1 ring-slate-200/80">
                                <h2 class="text-xl font-semibold text-slate-900">${project.name || 'Project Name'}</h2>
                                <p class="text-sm text-slate-600 mt-1">${project.role || 'Role'}${project.year ? ` · ${project.year}` : ''}</p>
                                <p class="mt-4 text-slate-700 leading-relaxed">${project.description || 'Describe the project, impact, and your contribution.'}</p>
                                ${project.link ? `<p class="mt-4 text-sky-600 text-sm">${project.link.startsWith('http') ? project.link : 'https://' + project.link}</p>` : ''}
                            </div>
                        `).join('') : `<div class="bg-slate-50 rounded-[32px] p-8 shadow-sm ring-1 ring-slate-200/80"><p class="text-slate-600">Add your portfolio projects to showcase your work.</p></div>`}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderPortfolioCaseStudy(data) {
    const fullName = `${data.firstName} ${data.lastName}`.trim() || 'Your Name';
    return `
        <div class="min-h-[297mm] bg-white p-10">
            <div class="max-w-6xl mx-auto">
                <div class="mb-10 p-10 rounded-[36px] bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                    <h1 class="text-5xl font-bold">${fullName}</h1>
                    ${data.title ? `<p class="mt-4 text-lg text-slate-200">${data.title}</p>` : ''}
                    ${data.summary ? `<p class="mt-6 max-w-3xl text-slate-300 leading-relaxed">${data.summary}</p>` : ''}
                </div>
                <div class="space-y-8">
                    ${data.projects.length > 0 ? data.projects.map(project => `
                        <div class="bg-slate-50 rounded-[32px] p-10 shadow-sm ring-1 ring-slate-200/80">
                            <div class="flex flex-wrap items-start justify-between gap-4 mb-4">
                                <div>
                                    <h2 class="text-2xl font-semibold text-slate-900">${project.name || 'Project Name'}</h2>
                                    <p class="text-sm text-slate-600 mt-1">${project.role || 'Role'}${project.year ? ` · ${project.year}` : ''}</p>
                                </div>
                                ${project.link ? `<a href="${project.link.startsWith('http') ? project.link : 'https://' + project.link}" target="_blank" class="text-sm font-semibold text-sky-600">View Project</a>` : ''}
                            </div>
                            <p class="text-slate-700 leading-relaxed">${project.description || 'Share the challenge, your approach, and the results.'}</p>
                        </div>
                    `).join('') : `<div class="bg-slate-50 rounded-[32px] p-10 shadow-sm ring-1 ring-slate-200/80"><p class="text-slate-600">Add portfolio projects to fill this showcase.</p></div>`}
                </div>
            </div>
        </div>
    `;
}

function renderPortfolioGrid(data) {
    const fullName = `${data.firstName} ${data.lastName}`.trim() || 'Your Name';
    return `
        <div class="min-h-[297mm] bg-white p-10">
            <div class="max-w-6xl mx-auto">
                <div class="mb-10 flex flex-wrap items-center justify-between gap-6">
                    <div>
                        <h1 class="text-4xl font-bold text-slate-900">${fullName}</h1>
                        ${data.title ? `<p class="text-slate-600 mt-2">${data.title}</p>` : ''}
                    </div>
                    ${data.website ? `<p class="text-sm text-sky-600">${data.website}</p>` : ''}
                </div>
                <div class="grid grid-cols-2 gap-6">
                    ${data.projects.length > 0 ? data.projects.map(project => `
                        <div class="bg-slate-50 rounded-[32px] p-8 shadow-sm ring-1 ring-slate-200/80">
                            <h2 class="text-xl font-semibold text-slate-900">${project.name || 'Project Name'}</h2>
                            <p class="text-sm text-slate-600 mt-1">${project.role || 'Role'}${project.year ? ` · ${project.year}` : ''}</p>
                            <p class="mt-4 text-slate-700 leading-relaxed">${project.description || 'A concise description of the project and your role.'}</p>
                        </div>
                    `).join('') : `<div class="col-span-2 bg-slate-50 rounded-[32px] p-8 shadow-sm ring-1 ring-slate-200/80"><p class="text-slate-600">Add project details so this grid fills with polished entries.</p></div>`}
                </div>
            </div>
        </div>
    `;
}

function renderPortfolioStudio(data) {
    const fullName = `${data.firstName} ${data.lastName}`.trim() || 'Your Name';
    return `
        <div class="min-h-[297mm] bg-white p-10">
            <div class="max-w-6xl mx-auto">
                <div class="mb-10 grid grid-cols-12 gap-8">
                    <div class="col-span-5 bg-slate-900 text-white rounded-[32px] p-8 space-y-6">
                        <h1 class="text-4xl font-bold">${fullName}</h1>
                        ${data.title ? `<p class="text-slate-300">${data.title}</p>` : ''}
                        ${data.summary ? `<p class="text-slate-400 text-sm leading-relaxed">${data.summary}</p>` : ''}
                    </div>
                    <div class="col-span-7 space-y-6">
                        ${data.projects.length > 0 ? data.projects.map(project => `
                            <div class="bg-slate-50 rounded-[32px] p-8 shadow-sm ring-1 ring-slate-200/80">
                                <div class="flex items-center justify-between gap-4 mb-3">
                                    <h2 class="text-xl font-semibold text-slate-900">${project.name || 'Project Name'}</h2>
                                    ${project.link ? `<a href="${project.link.startsWith('http') ? project.link : 'https://' + project.link}" target="_blank" class="text-sm text-sky-600 font-semibold">Visit</a>` : ''}
                                </div>
                                <p class="text-sm text-slate-600 mb-3">${project.role || 'Role'}${project.year ? ` · ${project.year}` : ''}</p>
                                <p class="text-slate-700 leading-relaxed">${project.description || 'A polished description of your project outcome.'}</p>
                            </div>
                        `).join('') : `<div class="bg-slate-50 rounded-[32px] p-8 shadow-sm ring-1 ring-slate-200/80"><p class="text-slate-600">Add a project to bring this portfolio page to life.</p></div>`}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderPortfolioBold(data) {
    const fullName = `${data.firstName} ${data.lastName}`.trim() || 'Your Name';
    return `
        <div class="min-h-[297mm] bg-white p-10">
            <div class="max-w-6xl mx-auto">
                <div class="mb-10 rounded-[32px] bg-gradient-to-r from-sky-600 to-indigo-600 text-white p-10">
                    <h1 class="text-5xl font-bold">${fullName}</h1>
                    ${data.title ? `<p class="mt-4 text-lg text-slate-100">${data.title}</p>` : ''}
                </div>
                <div class="space-y-6">
                    ${data.projects.length > 0 ? data.projects.map(project => `
                        <div class="bg-slate-950 text-white rounded-[32px] p-8">
                            <div class="flex items-center justify-between gap-4 mb-3">
                                <div>
                                    <h2 class="text-2xl font-semibold">${project.name || 'Project Name'}</h2>
                                    <p class="text-sm text-slate-300">${project.role || 'Role'}${project.year ? ` · ${project.year}` : ''}</p>
                                </div>
                                ${project.link ? `<a href="${project.link.startsWith('http') ? project.link : 'https://' + project.link}" target="_blank" class="text-sky-300 text-sm font-semibold">Visit</a>` : ''}
                            </div>
                            <p class="text-slate-200 leading-relaxed">${project.description || 'Highlight the impact and your unique contribution.'}</p>
                        </div>
                    `).join('') : `<div class="bg-slate-950 text-white rounded-[32px] p-8"><p class="text-slate-300">Add projects to populate this bold portfolio layout.</p></div>`}
                </div>
            </div>
        </div>
    `;
}

// ==================== SKILLS MANAGEMENT ====================
function handleSkillKeypress(e) {
    if (e.key === 'Enter') { e.preventDefault(); addSkill(); }
}

function addSkill() {
    const input = document.getElementById('skillInput');
    const value = input.value.trim();
    if (value && !skills.includes(value)) {
        skills.push(value);
        input.value = '';
        renderSkills();
        updatePreview();
    }
}

function removeSkill(skill) {
    skills = skills.filter(s => s !== skill);
    renderSkills();
    updatePreview();
}

function renderSkills() {
    const container = document.getElementById('skillsList');
    container.innerHTML = skills.map(skill => `
        <span class="skill-tag inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold border border-blue-200/60">
            ${skill}
            <button onclick="removeSkill('${skill}')" class="hover:text-blue-900 w-4 h-4 flex items-center justify-center rounded-full hover:bg-blue-200 transition-colors">×</button>
        </span>
    `).join('');
}

// ==================== DATA GATHERING ====================
function getFormData() {
    return {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        title: document.getElementById('title').value,
        targetJob: document.getElementById('targetJob') ? document.getElementById('targetJob').value : '',
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        location: document.getElementById('location').value,
        website: document.getElementById('website').value,
        summary: document.getElementById('summary').value,
        experiences: experiences.filter(e => e.company || e.position),
        educations: educations.filter(e => e.school || e.degree),
        certifications: certifications.filter(c => c.name),
        skills: skills,
        coverLetter: coverLetter,
        projects: projects.filter(p => p.name || p.description || p.link || p.role || p.year)
    };
}

function getTargetJobLabel(data) {
    return data.targetJob ? `<p class="text-sm italic text-slate-500 mt-2">Targeting: ${data.targetJob}</p>` : '';
}

function highlightSkillClass(skill, data, normalClass, highlightClass) {
    return (data.targetJob && data.targetJob.toLowerCase().includes(skill.toLowerCase())) ? highlightClass : normalClass;
}

// ==================== OUTPUT MODE MANAGEMENT ====================
function setMode(mode) {
    currentMode = mode;
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('bg-slate-900', 'text-white');
        btn.classList.add('bg-slate-50', 'text-slate-700');
    });
    const active = document.getElementById(`mode-${mode}`);
    if (active) {
        active.classList.remove('bg-slate-50', 'text-slate-700');
        active.classList.add('bg-slate-900', 'text-white');
    }
    // Update header badge to make mode change obvious to users
    const badge = document.getElementById('currentModeBadge');
    if (badge) {
        badge.classList.remove('resume','cv','cover','portfolio');
        if (mode === 'resume') {
            badge.textContent = 'Resume · Job-specific';
            badge.classList.add('resume');
            badge.title = 'Building a printable resume specific to the target job.';
        } else if (mode === 'cv') {
            badge.textContent = 'CV · Broad';
            badge.classList.add('cv');
            badge.title = 'Build a broader CV for career or academic applications.';
        } else if (mode === 'cover') {
            badge.textContent = 'Cover Letter';
            badge.classList.add('cover');
            badge.title = 'Compose a tailored cover letter';
        } else if (mode === 'portfolio') {
            badge.textContent = 'Portfolio';
            badge.classList.add('portfolio');
            badge.title = 'Create a visual portfolio page';
        } else {
            badge.textContent = mode;
        }
        // small pulse to draw attention on change
        badge.style.transform = 'scale(0.98)';
        setTimeout(() => { badge.style.transform = ''; }, 160);
    }
    document.getElementById('templateSection').classList.toggle('hidden', mode !== 'resume' && mode !== 'cv');
    document.getElementById('coverLetterSection').classList.toggle('hidden', mode !== 'cover');
    document.getElementById('coverLetterTemplateSection').classList.toggle('hidden', mode !== 'cover');
    document.getElementById('portfolioSection').classList.toggle('hidden', mode !== 'portfolio');
    document.getElementById('portfolioTemplateSection').classList.toggle('hidden', mode !== 'portfolio');
    if (mode === 'cover') setCoverLetterTemplate(currentCoverTemplate);
    if (mode === 'portfolio') setPortfolioTemplate(currentPortfolioTemplate);
    if (mode === 'portfolio' && projects.length === 0) addProject();
    updatePreview();
}

// ==================== RESUME RENDERING ====================
function updatePreview() {
    const data = getFormData();
    const preview = document.getElementById('resumePreview');
    const renderers = {
        modern: renderModern,
        classic: renderClassic,
        minimal: renderMinimal,
        executive: renderExecutive,
        creative: renderCreative,
        technical: renderTechnical,
        academic: renderAcademic,
        ats: renderATS,
        portfolio: renderPortfolio,
        startup: renderStartup,
        corporate: renderCorporate,
        freelance: renderFreelance,
        editorial: renderClassic,
        premium: renderExecutive,
        clean: renderMinimal,
        refined: renderCorporate,
        studio: renderPortfolio,
        bold: renderCreative,
        luxe: renderExecutive,
        adaptive: renderTechnical
    };
    if (currentMode === 'cover') {
        preview.innerHTML = renderCoverLetter(data);
    } else if (currentMode === 'cv') {
        preview.innerHTML = renderCV(data);
    } else if (currentMode === 'portfolio') {
        preview.innerHTML = renderPortfolioPage(data);
    } else {
        preview.innerHTML = renderers[currentTemplate](data);
    }
}

function renderCV(data) {
    const fullName = `${data.firstName} ${data.lastName}`.trim() || 'Your Name';
    const cvStyles = {
        modern: { name: 'Modern', headingText: 'text-slate-900', accentText: 'text-slate-500', line: 'bg-slate-900' },
        classic: { name: 'Classic', headingText: 'text-slate-900', accentText: 'text-slate-500', line: 'bg-slate-800' },
        minimal: { name: 'Minimal', headingText: 'text-slate-900', accentText: 'text-slate-400', line: 'bg-slate-400' },
        executive: { name: 'Executive', headingText: 'text-slate-900', accentText: 'text-amber-500', line: 'bg-amber-500' },
        creative: { name: 'Creative', headingText: 'text-slate-900', accentText: 'text-rose-500', line: 'bg-rose-500' },
        technical: { name: 'Technical', headingText: 'text-slate-900', accentText: 'text-emerald-500', line: 'bg-emerald-500' },
        academic: { name: 'Academic', headingText: 'text-slate-900', accentText: 'text-amber-500', line: 'bg-amber-500' },
        ats: { name: 'ATS', headingText: 'text-slate-900', accentText: 'text-green-600', line: 'bg-green-600' },
        portfolio: { name: 'Portfolio', headingText: 'text-slate-900', accentText: 'text-sky-500', line: 'bg-sky-500' },
        startup: { name: 'Startup', headingText: 'text-slate-900', accentText: 'text-cyan-500', line: 'bg-cyan-500' },
        corporate: { name: 'Corporate', headingText: 'text-slate-900', accentText: 'text-orange-500', line: 'bg-orange-500' },
        freelance: { name: 'Freelance', headingText: 'text-slate-900', accentText: 'text-amber-500', line: 'bg-amber-500' },
        editorial: { name: 'Editorial', headingText: 'text-slate-900', accentText: 'text-violet-500', line: 'bg-violet-500' },
        premium: { name: 'Premium', headingText: 'text-slate-900', accentText: 'text-amber-500', line: 'bg-amber-500' },
        clean: { name: 'Clean', headingText: 'text-slate-900', accentText: 'text-slate-400', line: 'bg-slate-400' },
        refined: { name: 'Refined', headingText: 'text-slate-900', accentText: 'text-blue-500', line: 'bg-blue-500' },
        studio: { name: 'Studio', headingText: 'text-slate-900', accentText: 'text-fuchsia-500', line: 'bg-fuchsia-500' },
        bold: { name: 'Bold', headingText: 'text-slate-900', accentText: 'text-red-500', line: 'bg-red-500' },
        luxe: { name: 'Luxe', headingText: 'text-slate-900', accentText: 'text-amber-500', line: 'bg-amber-500' },
        adaptive: { name: 'Adaptive', headingText: 'text-slate-900', accentText: 'text-cyan-500', line: 'bg-cyan-500' }
    };
    const config = cvStyles[currentTemplate] || cvStyles.modern;
    return `
        <div class="min-h-[297mm] bg-white p-12 font-source">
            <div class="max-w-5xl mx-auto">
                <div class="mb-10">
                    <div class="h-1 ${config.line} rounded-full mb-4"></div>
                    <h1 class="text-5xl font-bold tracking-tight ${config.headingText}">${fullName}</h1>
                    ${data.title ? `<p class="text-lg ${config.accentText} mt-3">${data.title}</p>` : ''}
                    <p class="text-sm ${config.accentText} mt-1">Template: ${config.name}</p>
                    ${getTargetJobLabel(data)}
                    <div class="mt-5 text-sm ${config.accentText} space-y-2">
                        ${data.email ? `<p>Email: ${data.email}</p>` : ''}
                        ${data.phone ? `<p>Phone: ${data.phone}</p>` : ''}
                        ${data.location ? `<p>Location: ${data.location}</p>` : ''}
                        ${data.website ? `<p>Website: ${data.website}</p>` : ''}
                    </div>
                </div>
                ${data.summary ? `<div class="mb-10"><h2 class="text-xs uppercase tracking-[0.28em] text-slate-500 mb-3">Professional Profile</h2><p class="text-slate-700 leading-relaxed">${data.summary}</p></div>` : ''}
                <div class="space-y-12">
                    <section class="space-y-4">
                        <h2 class="text-xs uppercase tracking-[0.28em] text-slate-500">Experience</h2>
                        ${data.experiences.length > 0 ? data.experiences.map(exp => `
                            <div class="rounded-2xl p-6 bg-slate-50 border border-slate-200">
                                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                    <div>
                                        <p class="text-base font-semibold text-slate-900">${exp.position || 'Job Title'}</p>
                                        <p class="text-sm text-slate-600">${exp.company || 'Company Name'}</p>
                                    </div>
                                    <p class="text-sm text-slate-500">${exp.startDate || ''}${exp.startDate && exp.endDate ? ' — ' : ''}${exp.endDate || ''}</p>
                                </div>
                                ${exp.description ? `<p class="mt-4 text-sm leading-7 text-slate-700">${exp.description}</p>` : ''}
                            </div>
                        `).join('') : '<p class="text-slate-600">Add work history here to fill out your CV.</p>'}
                    </section>
                    <section class="grid gap-8 lg:grid-cols-2">
                        <div class="space-y-4">
                            <h2 class="text-xs uppercase tracking-[0.28em] text-slate-500">Education</h2>
                            ${data.educations.length > 0 ? data.educations.map(edu => `
                                <div class="rounded-2xl p-6 bg-slate-50 border border-slate-200">
                                    <p class="text-base font-semibold text-slate-900">${edu.school || 'School / University'}</p>
                                    <p class="text-sm text-slate-600">${edu.degree || ''}${edu.degree && edu.field ? ', ' : ''}${edu.field || ''}</p>
                                    ${edu.year ? `<p class="text-sm text-slate-500 mt-2">${edu.year}</p>` : ''}
                                </div>
                            `).join('') : '<p class="text-slate-600">Add your education history to complete your CV.</p>'}
                        </div>
                        <div class="space-y-6">
                            <div class="rounded-2xl p-6 bg-slate-50 border border-slate-200">
                                <h2 class="text-xs uppercase tracking-[0.28em] text-slate-500 mb-4">Skills</h2>
                                ${data.skills.length > 0 ? `<div class="flex flex-wrap gap-2">${data.skills.map(skill => `<span class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${highlightSkillClass(skill, data, 'bg-slate-200 text-slate-700', 'bg-slate-900 text-white')}">${skill}</span>`).join('')}</div>` : '<p class="text-slate-600">Add your key skills here.</p>'}
                            </div>
                            <div class="rounded-2xl p-6 bg-slate-50 border border-slate-200">
                                <h2 class="text-xs uppercase tracking-[0.28em] text-slate-500 mb-4">Certifications</h2>
                                ${data.certifications.length > 0 ? `<div class="space-y-3">${data.certifications.map(cert => `<div><p class="text-sm font-semibold text-slate-900">${cert.name || 'Certification'}</p><p class="text-sm text-slate-600">${cert.issuer || ''}${cert.year ? ` · ${cert.year}` : ''}</p></div>`).join('')}</div>` : '<p class="text-slate-600">Add certificates that support your CV.</p>'}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    `;
}

// ---------- MODERN TEMPLATE ----------
function renderModern(data) {
    const fullName = `${data.firstName} ${data.lastName}`.trim() || 'Your Name';
    const hasContact = data.email || data.phone || data.location || data.website;
    const hasCerts = data.certifications.length > 0;
    
    return `
        <div class="flex h-full min-h-[297mm]">
            <div class="w-[34%] bg-slate-900 text-white p-8 flex flex-col">
                <div class="mb-8">
                    <h1 class="text-[28px] font-bold leading-tight mb-1 tracking-tight">${fullName}</h1>
                    ${data.title ? `<p class="text-blue-400 font-semibold text-xs uppercase tracking-[0.2em] mt-2">${data.title}</p>` : ''}
                    ${getTargetJobLabel(data)}
                </div>
                ${hasContact ? `
                <div class="mb-8 space-y-3">
                    <h3 class="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">Contact</h3>
                    ${data.email ? `<div class="flex items-center gap-3 text-[13px] text-slate-300"><svg class="w-3.5 h-3.5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>${data.email}</div>` : ''}
                    ${data.phone ? `<div class="flex items-center gap-3 text-[13px] text-slate-300"><svg class="w-3.5 h-3.5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>${data.phone}</div>` : ''}
                    ${data.location ? `<div class="flex items-center gap-3 text-[13px] text-slate-300"><svg class="w-3.5 h-3.5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>${data.location}</div>` : ''}
                    ${data.website ? `<div class="flex items-center gap-3 text-[13px] text-slate-300"><svg class="w-3.5 h-3.5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>${data.website}</div>` : ''}
                </div>` : ''}
                ${data.skills.length > 0 ? `
                <div class="mb-8">
                    <h3 class="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">Skills</h3>
                    <div class="flex flex-wrap gap-2">
                        ${data.skills.map(skill => `<span class="px-3 py-1.5 ${highlightSkillClass(skill, data, 'bg-slate-800 text-blue-300', 'bg-amber-400 text-slate-900')} text-[11px] rounded-full border border-slate-700 font-medium">${skill}</span>`).join('')}
                    </div>
                </div>` : ''}
                ${data.educations.length > 0 ? `
                <div class="mb-8">
                    <h3 class="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">Education</h3>
                    <div class="space-y-4">
                        ${data.educations.map(edu => `
                            <div>
                                <p class="font-semibold text-[13px] text-white leading-snug">${edu.school || 'School Name'}</p>
                                <p class="text-[12px] text-slate-400 mt-0.5">${edu.degree || ''}${edu.degree && edu.field ? ' in ' : ''}${edu.field || ''}</p>
                                ${edu.year ? `<p class="text-[11px] text-slate-600 mt-1">${edu.year}</p>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>` : ''}
                ${hasCerts ? `
                <div>
                    <h3 class="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">Certifications</h3>
                    <div class="space-y-3">
                        ${data.certifications.map(cert => `
                            <div>
                                <p class="text-[12px] text-slate-300 font-medium">${cert.name}</p>
                                <p class="text-[11px] text-slate-500">${cert.issuer}${cert.issuer && cert.year ? ' · ' : ''}${cert.year || ''}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>` : ''}
            </div>
            <div class="w-[66%] p-8 bg-white">
                ${data.summary ? `
                <div class="mb-8">
                    <h2 class="text-base font-bold text-slate-900 mb-3 flex items-center gap-2 uppercase tracking-wider">
                        <span class="w-6 h-0.5 bg-blue-600"></span>
                        Profile
                    </h2>
                    <p class="text-[13px] text-slate-600 leading-relaxed">${data.summary}</p>
                </div>` : ''}
                ${data.experiences.length > 0 ? `
                <div>
                    <h2 class="text-base font-bold text-slate-900 mb-6 flex items-center gap-2 uppercase tracking-wider">
                        <span class="w-6 h-0.5 bg-blue-600"></span>
                        Experience
                    </h2>
                    <div class="space-y-6">
                        ${data.experiences.map(exp => `
                            <div class="relative pl-5 border-l-2 border-slate-200">
                                <div class="absolute -left-[9px] top-1 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-sm"></div>
                                <div class="mb-1">
                                    <h3 class="font-bold text-slate-900 text-[14px]">${exp.position || 'Position'}</h3>
                                    <p class="text-blue-600 font-semibold text-[12px] mt-0.5">${exp.company || 'Company'}</p>
                                </div>
                                <p class="text-[11px] text-slate-500 mb-2 font-medium uppercase tracking-wide">${exp.startDate || ''}${exp.startDate && exp.endDate ? ' — ' : ''}${exp.endDate || ''}</p>
                                ${exp.description ? `<p class="text-[12px] text-slate-600 leading-relaxed">${exp.description}</p>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>` : ''}
            </div>
        </div>
    `;
}

// ---------- CLASSIC TEMPLATE ----------
function renderClassic(data) {
    const fullName = `${data.firstName} ${data.lastName}`.trim() || 'Your Name';
    const hasContact = data.email || data.phone || data.location || data.website;
    
    return `
        <div class="p-12 bg-white min-h-[297mm] font-source">
            <div class="text-center border-b-2 border-slate-900 pb-6 mb-8">
                <h1 class="text-[42px] font-playfair font-bold text-slate-900 mb-2 tracking-tight">${fullName}</h1>
                ${data.title ? `<p class="text-lg text-slate-600 font-playfair italic mb-4">${data.title}</p>` : ''}
                ${getTargetJobLabel(data)}
                ${hasContact ? `
                <div class="flex justify-center items-center gap-3 text-sm text-slate-600 flex-wrap">
                    ${data.email ? `<span>${data.email}</span>` : ''}
                    ${data.phone ? `<span class="text-slate-300">|</span><span>${data.phone}</span>` : ''}
                    ${data.location ? `<span class="text-slate-300">|</span><span>${data.location}</span>` : ''}
                    ${data.website ? `<span class="text-slate-300">|</span><span>${data.website}</span>` : ''}
                </div>` : ''}
            </div>
            ${data.summary ? `
            <div class="mb-8">
                <h2 class="text-xs font-bold uppercase tracking-[0.2em] text-slate-900 border-b border-slate-300 pb-1.5 mb-3">Professional Summary</h2>
                <p class="text-sm text-slate-700 leading-relaxed text-justify">${data.summary}</p>
            </div>` : ''}
            ${data.experiences.length > 0 ? `
            <div class="mb-8">
                <h2 class="text-xs font-bold uppercase tracking-[0.2em] text-slate-900 border-b border-slate-300 pb-1.5 mb-4">Professional Experience</h2>
                <div class="space-y-5">
                    ${data.experiences.map(exp => `
                        <div>
                            <div class="flex justify-between items-baseline mb-1">
                                <h3 class="font-bold text-slate-900 text-[15px]">${exp.position || 'Position'}</h3>
                                <span class="text-sm text-slate-600 italic">${exp.startDate || ''}${exp.startDate && exp.endDate ? ' – ' : ''}${exp.endDate || ''}</span>
                            </div>
                            <p class="text-sm text-slate-700 font-semibold mb-1.5">${exp.company || 'Company'}</p>
                            ${exp.description ? `<p class="text-sm text-slate-600 leading-relaxed">${exp.description}</p>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>` : ''}
            ${data.educations.length > 0 ? `
            <div class="mb-8">
                <h2 class="text-xs font-bold uppercase tracking-[0.2em] text-slate-900 border-b border-slate-300 pb-1.5 mb-4">Education</h2>
                <div class="space-y-3">
                    ${data.educations.map(edu => `
                        <div class="flex justify-between items-baseline">
                            <div>
                                <p class="font-bold text-slate-900 text-[15px]">${edu.school || 'School'}</p>
                                <p class="text-sm text-slate-700">${edu.degree || ''}${edu.degree && edu.field ? ', ' : ''}${edu.field || ''}</p>
                            </div>
                            ${edu.year ? `<span class="text-sm text-slate-600 italic">${edu.year}</span>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>` : ''}
            ${data.certifications.length > 0 ? `
            <div class="mb-8">
                <h2 class="text-xs font-bold uppercase tracking-[0.2em] text-slate-900 border-b border-slate-300 pb-1.5 mb-4">Certifications</h2>
                <div class="space-y-2">
                    ${data.certifications.map(cert => `
                        <p class="text-sm text-slate-700">${cert.name}${cert.issuer ? ` — ${cert.issuer}` : ''}${cert.year ? ` (${cert.year})` : ''}</p>
                    `).join('')}
                </div>
            </div>` : ''}
            ${data.skills.length > 0 ? `
            <div>
                <h2 class="text-xs font-bold uppercase tracking-[0.2em] text-slate-900 border-b border-slate-300 pb-1.5 mb-4">Skills</h2>
                <div class="flex flex-wrap gap-x-3 gap-y-1">
                    ${data.skills.map((skill, i) => `<span class="text-sm ${highlightSkillClass(skill, data, 'text-slate-700', 'text-slate-900 font-semibold')}">${skill}${i < data.skills.length - 1 ? ',' : ''}</span>`).join('')}
                </div>
            </div>` : ''}
        </div>
    `;
}

// ---------- MINIMAL TEMPLATE ----------
function renderMinimal(data) {
    const fullName = `${data.firstName} ${data.lastName}`.trim() || 'Your Name';
    
    return `
        <div class="p-14 bg-white min-h-[297mm] max-w-3xl mx-auto">
            <div class="mb-12">
                <h1 class="text-5xl font-light text-slate-900 mb-3 tracking-tight">${fullName}</h1>
                ${data.title ? `<p class="text-xl text-slate-400 font-light">${data.title}</p>` : ''}
                ${getTargetJobLabel(data)}
                <div class="mt-5 flex gap-4 text-sm text-slate-400 flex-wrap">
                    ${data.email ? `<span>${data.email}</span>` : ''}
                    ${data.phone ? `<span>· ${data.phone}</span>` : ''}
                    ${data.location ? `<span>· ${data.location}</span>` : ''}
                    ${data.website ? `<span>· ${data.website}</span>` : ''}
                </div>
            </div>
            ${data.summary ? `
            <div class="mb-12">
                <p class="text-base text-slate-700 leading-relaxed font-light">${data.summary}</p>
            </div>` : ''}
            ${data.experiences.length > 0 ? `
            <div class="mb-12">
                <h2 class="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-6">Experience</h2>
                <div class="space-y-8">
                    ${data.experiences.map(exp => `
                        <div class="grid grid-cols-12 gap-5">
                            <div class="col-span-3">
                                <p class="text-sm text-slate-400 font-medium">${exp.startDate || ''}${exp.startDate && exp.endDate ? ' – ' : ''}${exp.endDate || ''}</p>
                            </div>
                            <div class="col-span-9">
                                <h3 class="font-semibold text-slate-900 text-lg">${exp.position || 'Position'}</h3>
                                <p class="text-slate-500 mb-2 text-sm">${exp.company || 'Company'}</p>
                                ${exp.description ? `<p class="text-sm text-slate-600 leading-relaxed">${exp.description}</p>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>` : ''}
            ${data.educations.length > 0 ? `
            <div class="mb-12">
                <h2 class="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-6">Education</h2>
                <div class="space-y-4">
                    ${data.educations.map(edu => `
                        <div class="grid grid-cols-12 gap-5">
                            <div class="col-span-3">
                                ${edu.year ? `<p class="text-sm text-slate-400 font-medium">${edu.year}</p>` : ''}
                            </div>
                            <div class="col-span-9">
                                <p class="font-semibold text-slate-900">${edu.school || 'School'}</p>
                                <p class="text-slate-500 text-sm">${edu.degree || ''}${edu.degree && edu.field ? ' — ' : ''}${edu.field || ''}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>` : ''}
            ${data.certifications.length > 0 ? `
            <div class="mb-12">
                <h2 class="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-6">Certifications</h2>
                <div class="space-y-2">
                    ${data.certifications.map(cert => `
                        <p class="text-sm text-slate-600">${cert.name}${cert.issuer ? ` — ${cert.issuer}` : ''}${cert.year ? ` (${cert.year})` : ''}</p>
                    `).join('')}
                </div>
            </div>` : ''}
            ${data.skills.length > 0 ? `
            <div>
                <h2 class="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-4">Skills</h2>
                <div class="flex flex-wrap gap-2">
                    ${data.skills.map(skill => `<span class="px-3 py-1 rounded-md text-sm ${highlightSkillClass(skill, data, 'bg-slate-100 text-slate-600', 'bg-slate-900 text-white')}">${skill}</span>`).join('')}
                </div>
            </div>` : ''}
        </div>
    `;
}

// ---------- EXECUTIVE TEMPLATE ----------
function renderExecutive(data) {
    const fullName = `${data.firstName} ${data.lastName}`.trim() || 'Your Name';
    const initials = (data.firstName?.[0] || '') + (data.lastName?.[0] || '');
    
    return `
        <div class="min-h-[297mm] bg-white">
            <div class="bg-slate-900 text-white p-10 pb-8">
                <div class="flex items-start gap-6">
                    ${initials ? `<div class="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center text-3xl font-bold border border-white/20 flex-shrink-0">${initials}</div>` : ''}
                    <div class="flex-1">
                        <h1 class="text-[36px] font-bold tracking-tight">${fullName}</h1>
                        ${data.title ? `<p class="text-lg text-slate-400 mt-1 font-light">${data.title}</p>` : ''}
                        <div class="flex gap-5 mt-4 text-sm text-slate-400 flex-wrap">
                            ${data.email ? `<span class="flex items-center gap-1.5"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8"/></svg>${data.email}</span>` : ''}
                            ${data.phone ? `<span class="flex items-center gap-1.5"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>${data.phone}</span>` : ''}
                            ${data.location ? `<span class="flex items-center gap-1.5"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>${data.location}</span>` : ''}
                            ${data.website ? `<span class="flex items-center gap-1.5"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"/></svg>${data.website}</span>` : ''}
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-10">
                ${data.summary ? `
                <div class="mb-10 bg-slate-50 p-6 rounded-xl border-l-4 border-slate-900">
                    <p class="text-[15px] text-slate-700 leading-relaxed italic font-playfair">"${data.summary}"</p>
                </div>` : ''}
                <div class="grid grid-cols-3 gap-10">
                    <div class="col-span-2">
                        ${data.experiences.length > 0 ? `
                        <div class="mb-10">
                            <h2 class="text-sm font-bold uppercase tracking-[0.15em] text-slate-900 mb-6 flex items-center gap-2">
                                <span class="w-8 h-[2px] bg-slate-900"></span>
                                Professional Experience
                            </h2>
                            <div class="space-y-7">
                                ${data.experiences.map(exp => `
                                    <div class="border-l-2 border-slate-200 pl-5">
                                        <div class="flex justify-between items-start mb-1">
                                            <div>
                                                <h3 class="font-bold text-slate-900 text-[15px]">${exp.position || 'Position'}</h3>
                                                <p class="text-slate-600 text-sm font-medium">${exp.company || 'Company'}</p>
                                            </div>
                                            <span class="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded font-medium whitespace-nowrap">${exp.startDate || ''}${exp.startDate && exp.endDate ? ' – ' : ''}${exp.endDate || ''}</span>
                                        </div>
                                        ${exp.description ? `<p class="text-[13px] text-slate-600 leading-relaxed mt-2">${exp.description}</p>` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </div>` : ''}
                        ${data.educations.length > 0 ? `
                        <div>
                            <h2 class="text-sm font-bold uppercase tracking-[0.15em] text-slate-900 mb-6 flex items-center gap-2">
                                <span class="w-8 h-[2px] bg-slate-900"></span>
                                Education
                            </h2>
                            <div class="space-y-4">
                                ${data.educations.map(edu => `
                                    <div class="flex justify-between items-baseline">
                                        <div>
                                            <p class="font-bold text-slate-900 text-[15px]">${edu.school || 'School'}</p>
                                            <p class="text-sm text-slate-600">${edu.degree || ''}${edu.degree && edu.field ? ' in ' : ''}${edu.field || ''}</p>
                                        </div>
                                        ${edu.year ? `<span class="text-xs text-slate-500 font-medium">${edu.year}</span>` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </div>` : ''}
                    </div>
                    <div>
                        ${data.skills.length > 0 ? `
                        <div class="mb-8">
                            <h2 class="text-sm font-bold uppercase tracking-[0.15em] text-slate-900 mb-4">Core Competencies</h2>
                            <div class="space-y-2">
                                ${data.skills.map(skill => `
                                    <div class="flex items-center gap-2">
                                        <div class="w-1.5 h-1.5 bg-slate-900 rounded-full"></div>
                                        <span class="text-sm text-slate-700 font-medium">${skill}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>` : ''}
                        ${data.certifications.length > 0 ? `
                        <div class="mb-8">
                            <h2 class="text-sm font-bold uppercase tracking-[0.15em] text-slate-900 mb-4">Certifications</h2>
                            <div class="space-y-3">
                                ${data.certifications.map(cert => `
                                    <div class="bg-slate-50 p-3 rounded-lg">
                                        <p class="text-sm font-semibold text-slate-800">${cert.name}</p>
                                        <p class="text-xs text-slate-500 mt-0.5">${cert.issuer}${cert.issuer && cert.year ? ' · ' : ''}${cert.year || ''}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ---------- CREATIVE TEMPLATE ----------
function renderCreative(data) {
    const fullName = `${data.firstName} ${data.lastName}`.trim() || 'Your Name';
    const hasContact = data.email || data.phone || data.location || data.website;

    return `
        <div class="min-h-[297mm] bg-white relative overflow-hidden">
            <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-rose-100 to-orange-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-60"></div>
            <div class="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-full translate-y-1/2 opacity-70"></div>
            <div class="relative p-12 pt-20 max-w-[1100px] mx-auto">
                <div class="grid grid-cols-12 gap-8">
                    <div class="col-span-5 bg-slate-950 text-white rounded-[36px] p-10 shadow-2xl ring-1 ring-slate-200/10">
                        <div class="mb-10">
                            <p class="text-[10px] uppercase tracking-[0.35em] text-blue-300 mb-4">Creative Resume</p>
                            <h1 class="text-[42px] font-bold leading-tight tracking-tight">${fullName}</h1>
                            ${data.title ? `<p class="mt-4 text-lg text-slate-300 font-medium">${data.title}</p>` : ''}
                            ${getTargetJobLabel(data)}
                        </div>
                        ${hasContact ? `
                        <div class="space-y-3 text-sm text-slate-300">
                            ${data.email ? `<p>Email: ${data.email}</p>` : ''}
                            ${data.phone ? `<p>Phone: ${data.phone}</p>` : ''}
                            ${data.location ? `<p>Location: ${data.location}</p>` : ''}
                            ${data.website ? `<p>Website: ${data.website}</p>` : ''}
                        </div>` : ''}
                        ${data.skills.length > 0 ? `
                        <div class="mt-10">
                            <h2 class="text-[11px] uppercase tracking-[0.35em] text-blue-300 mb-4">Skills</h2>
                            <div class="grid grid-cols-2 gap-2">
                                ${data.skills.map(skill => `<span class="inline-flex items-center px-3 py-2 rounded-full text-[12px] ${highlightSkillClass(skill, data, 'bg-blue-500/10 text-blue-900', 'bg-slate-100 text-slate-950 font-semibold')}">${skill}</span>`).join('')}
                            </div>
                        </div>` : ''}
                    </div>
                    <div class="col-span-7 space-y-8">
                        ${data.summary ? `
                        <div class="bg-slate-50 rounded-[32px] p-8 shadow-sm ring-1 ring-slate-200/80">
                            <h2 class="text-sm uppercase tracking-[0.35em] text-slate-500 mb-4">Profile</h2>
                            <p class="text-slate-700 leading-relaxed">${data.summary}</p>
                        </div>` : ''}
                        ${data.experiences.length > 0 ? `
                        <div class="bg-white rounded-[32px] p-8 shadow-sm ring-1 ring-slate-200/80">
                            <h2 class="text-sm uppercase tracking-[0.35em] text-slate-500 mb-6">Experience</h2>
                            <div class="space-y-6">
                                ${data.experiences.map(exp => `
                                    <div>
                                        <div class="flex items-start justify-between gap-4 mb-2">
                                            <div>
                                                <h3 class="text-lg font-semibold text-slate-900">${exp.position || 'Position'}</h3>
                                                <p class="text-sm text-slate-500">${exp.company || 'Company'}</p>
                                            </div>
                                            <span class="text-xs uppercase tracking-[0.35em] text-slate-400">${exp.startDate || ''}${exp.startDate && exp.endDate ? ' – ' : ''}${exp.endDate || ''}</span>
                                        </div>
                                        ${exp.description ? `<p class="text-slate-600 leading-relaxed">${exp.description}</p>` : ''}
                                    </div>`).join('')}
                            </div>
                        </div>` : ''}
                        <div class="grid grid-cols-2 gap-6">
                            ${data.educations.length > 0 ? `
                            <div class="bg-slate-50 rounded-[32px] p-8 shadow-sm ring-1 ring-slate-200/80">
                                <h2 class="text-sm uppercase tracking-[0.35em] text-slate-500 mb-6">Education</h2>
                                <div class="space-y-4">
                                    ${data.educations.map(edu => `
                                        <div>
                                            <p class="font-semibold text-slate-900 text-sm">${edu.school || 'School'}</p>
                                            <p class="text-sm text-slate-500">${edu.degree || ''}${edu.degree && edu.field ? ' in ' : ''}${edu.field || ''}</p>
                                            ${edu.year ? `<p class="text-xs uppercase tracking-[0.35em] text-slate-400 mt-2">${edu.year}</p>` : ''}
                                        </div>`).join('')}
                                </div>
                            </div>` : ''}
                            ${data.certifications.length > 0 ? `
                            <div class="bg-slate-50 rounded-[32px] p-8 shadow-sm ring-1 ring-slate-200/80">
                                <h2 class="text-sm uppercase tracking-[0.35em] text-slate-500 mb-6">Certifications</h2>
                                <div class="space-y-3">
                                    ${data.certifications.map(cert => `
                                        <div>
                                            <p class="text-sm font-semibold text-slate-900">${cert.name}</p>
                                            <p class="text-sm text-slate-500">${cert.issuer}${cert.issuer && cert.year ? ' · ' : ''}${cert.year || ''}</p>
                                        </div>`).join('')}
                                </div>
                            </div>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderTechnical(data) {
    const fullName = `${data.firstName} ${data.lastName}`.trim() || 'Your Name';
    return `
        <div class="min-h-[297mm] bg-white p-12 font-mono text-slate-800">
            <div class="grid grid-cols-12 gap-8">
                <div class="col-span-4 bg-slate-950 text-white rounded-[30px] p-8 space-y-6">
                    <div>
                        <h1 class="text-4xl font-bold tracking-tight">${fullName}</h1>
                        ${data.title ? `<p class="mt-3 text-slate-300 text-sm">${data.title}</p>` : ''}
                    ${getTargetJobLabel(data)}
                    </div>
                    ${data.summary ? `<div><h2 class="text-xs uppercase tracking-[0.35em] text-slate-400 mb-3">Profile</h2><p class="text-sm text-slate-300 leading-relaxed">${data.summary}</p></div>` : ''}
                    <div>
                        <h2 class="text-xs uppercase tracking-[0.35em] text-slate-400 mb-3">Contact</h2>
                        <div class="space-y-2 text-sm text-slate-300">
                            ${data.email ? `<p>${data.email}</p>` : ''}
                            ${data.phone ? `<p>${data.phone}</p>` : ''}
                            ${data.location ? `<p>${data.location}</p>` : ''}
                            ${data.website ? `<p>${data.website}</p>` : ''}
                        </div>
                    </div>
                    ${data.skills.length > 0 ? `<div><h2 class="text-xs uppercase tracking-[0.35em] text-slate-400 mb-3">Skills</h2><div class="grid gap-2">${data.skills.map(skill => `<span class="inline-flex px-3 py-2 rounded-full text-[12px] ${highlightSkillClass(skill, data, 'bg-slate-800/90 text-slate-100', 'bg-cyan-400 text-slate-950 font-semibold')}">${skill}</span>`).join('')}</div></div>` : ''}
                </div>
                <div class="col-span-8 space-y-8">
                    ${data.experiences.length > 0 ? `<div class="bg-slate-50 rounded-[30px] p-8 shadow-sm ring-1 ring-slate-200/80"><h2 class="text-sm uppercase tracking-[0.35em] text-slate-500 mb-6">Experience</h2><div class="space-y-6">${data.experiences.map(exp => `<div><div class="flex items-center justify-between gap-4"><div><h3 class="font-semibold text-slate-900">${exp.position || 'Position'}</h3><p class="text-sm text-slate-600">${exp.company || 'Company'}</p></div><span class="text-xs uppercase tracking-[0.35em] text-slate-400">${exp.startDate || ''}${exp.startDate && exp.endDate ? ' – ' : ''}${exp.endDate || ''}</span></div>${exp.description ? `<p class="text-sm text-slate-600 mt-3 leading-relaxed">${exp.description}</p>` : ''}</div>`).join('')}</div></div>` : ''}
                    ${data.educations.length > 0 ? `<div class="bg-slate-50 rounded-[30px] p-8 shadow-sm ring-1 ring-slate-200/80"><h2 class="text-sm uppercase tracking-[0.35em] text-slate-500 mb-6">Education</h2><div class="space-y-4">${data.educations.map(edu => `<div><p class="font-semibold text-slate-900">${edu.school || 'School'}</p><p class="text-sm text-slate-600">${edu.degree || ''}${edu.degree && edu.field ? ' — ' : ''}${edu.field || ''}</p>${edu.year ? `<p class="text-xs uppercase tracking-[0.35em] text-slate-400 mt-2">${edu.year}</p>` : ''}</div>`).join('')}</div></div>` : ''}
                    ${data.certifications.length > 0 ? `<div class="bg-slate-50 rounded-[30px] p-8 shadow-sm ring-1 ring-slate-200/80"><h2 class="text-sm uppercase tracking-[0.35em] text-slate-500 mb-6">Certifications</h2><div class="space-y-3">${data.certifications.map(cert => `<div><p class="text-sm font-semibold text-slate-900">${cert.name}</p><p class="text-sm text-slate-600">${cert.issuer}${cert.issuer && cert.year ? ' · ' : ''}${cert.year || ''}</p></div>`).join('')}</div></div>` : ''}
                </div>
            </div>
        </div>
    `;
}

function renderAcademic(data) {
    const fullName = `${data.firstName} ${data.lastName}`.trim() || 'Your Name';
    return `
        <div class="min-h-[297mm] bg-white p-12">
            <div class="text-center mb-12">
                <h1 class="text-5xl font-bold text-slate-900 mb-2">${fullName}</h1>
                ${data.title ? `<p class="text-xl text-slate-600">${data.title}</p>` : ''}
                ${getTargetJobLabel(data)}
                <div class="mt-4 text-sm text-slate-500">${data.email || ''}${data.email && data.phone ? ' | ' : ''}${data.phone || ''}${(data.email || data.phone) && data.website ? ' | ' : ''}${data.website || ''}</div>
            </div>
            ${data.summary ? `<div class="mb-12"><h2 class="text-xs uppercase tracking-[0.3em] text-slate-400 mb-3">Research Summary</h2><p class="text-slate-700 leading-relaxed">${data.summary}</p></div>` : ''}
            ${data.educations.length > 0 ? `<div class="mb-10"><h2 class="text-sm uppercase tracking-[0.3em] text-slate-600 mb-4">Education</h2><div class="space-y-5">${data.educations.map(edu => `<div><p class="font-semibold text-slate-900">${edu.degree || 'Degree'}${edu.field ? ` in ${edu.field}` : ''}</p><p class="text-slate-600">${edu.school || 'School'}${edu.year ? ` · ${edu.year}` : ''}</p></div>`).join('')}</div></div>` : ''}
            ${data.experiences.length > 0 ? `<div class="mb-10"><h2 class="text-sm uppercase tracking-[0.3em] text-slate-600 mb-4">Experience</h2><div class="space-y-5">${data.experiences.map(exp => `<div><p class="font-semibold text-slate-900">${exp.position || 'Position'}</p><p class="text-slate-600">${exp.company || 'Organization'}${exp.startDate || exp.endDate ? ` · ${exp.startDate || ''}${exp.startDate && exp.endDate ? ' – ' : ''}${exp.endDate || ''}` : ''}</p>${exp.description ? `<p class="text-slate-700 mt-2">${exp.description}</p>` : ''}</div>`).join('')}</div></div>` : ''}
            ${data.certifications.length > 0 ? `<div class="mb-10"><h2 class="text-sm uppercase tracking-[0.3em] text-slate-600 mb-4">Certifications & Honors</h2><div class="space-y-3">${data.certifications.map(cert => `<p class="text-slate-700">${cert.name}${cert.issuer ? ` — ${cert.issuer}` : ''}${cert.year ? ` (${cert.year})` : ''}</p>`).join('')}</div></div>` : ''}
            ${data.skills.length > 0 ? `<div><h2 class="text-sm uppercase tracking-[0.3em] text-slate-600 mb-4">Skills</h2><div class="flex flex-wrap gap-2">${data.skills.map(skill => `<span class="px-3 py-2 bg-slate-100 text-slate-700 rounded-full text-sm">${skill}</span>`).join('')}</div></div>` : ''}
        </div>
    `;
}

function renderATS(data) {
    const fullName = `${data.firstName} ${data.lastName}`.trim() || 'Your Name';
    return `
        <div class="min-h-[297mm] bg-white p-10 text-slate-900 font-source">
            <div class="mb-10">
                <h1 class="text-4xl font-bold mb-2">${fullName}</h1>
                ${data.title ? `<p class="text-lg text-slate-700 mb-4">${data.title}</p>` : ''}
                <div class="text-sm text-slate-600 leading-relaxed">${data.email || ''}${data.email && data.phone ? ' | ' : ''}${data.phone || ''}${(data.email || data.phone) && data.location ? ' | ' : ''}${data.location || ''}${(data.email || data.phone || data.location) && data.website ? ' | ' : ''}${data.website || ''}</div>
            </div>
            ${data.summary ? `<div class="mb-8"><h2 class="text-sm font-bold uppercase tracking-[0.2em] text-slate-700 mb-3">Summary</h2><p class="text-sm text-slate-700 leading-relaxed">${data.summary}</p></div>` : ''}
            ${data.skills.length > 0 ? `<div class="mb-8"><h2 class="text-sm font-bold uppercase tracking-[0.2em] text-slate-700 mb-3">Skills</h2><div class="grid grid-cols-2 gap-2 text-sm text-slate-700">${data.skills.map(skill => `<span class="${highlightSkillClass(skill, data, 'text-slate-700', 'font-semibold text-slate-900')}">• ${skill}</span>`).join('')}</div></div>` : ''}
            ${data.experiences.length > 0 ? `<div class="mb-8"><h2 class="text-sm font-bold uppercase tracking-[0.2em] text-slate-700 mb-3">Work Experience</h2><div class="space-y-5">${data.experiences.map(exp => `<div><p class="font-semibold text-slate-900">${exp.position || 'Position'}</p><p class="text-sm text-slate-700">${exp.company || 'Company'}${exp.startDate || exp.endDate ? ` | ${exp.startDate || ''}${exp.startDate && exp.endDate ? ' – ' : ''}${exp.endDate || ''}` : ''}</p>${exp.description ? `<p class="text-sm text-slate-700 mt-2">${exp.description}</p>` : ''}</div>`).join('')}</div></div>` : ''}
            ${data.educations.length > 0 ? `<div class="mb-8"><h2 class="text-sm font-bold uppercase tracking-[0.2em] text-slate-700 mb-3">Education</h2><div class="space-y-4">${data.educations.map(edu => `<div><p class="font-semibold text-slate-900">${edu.school || 'School'}</p><p class="text-sm text-slate-700">${edu.degree || ''}${edu.degree && edu.field ? `, ${edu.field}` : ''}${edu.year ? ` | ${edu.year}` : ''}</p></div>`).join('')}</div></div>` : ''}
            ${data.certifications.length > 0 ? `<div class="mb-8"><h2 class="text-sm font-bold uppercase tracking-[0.2em] text-slate-700 mb-3">Certifications</h2><div class="space-y-2">${data.certifications.map(cert => `<p class="text-sm text-slate-700">${cert.name}${cert.issuer ? `, ${cert.issuer}` : ''}${cert.year ? ` (${cert.year})` : ''}</p>`).join('')}</div></div>` : ''}
        </div>
    `;
}

function renderPortfolio(data) {
    const fullName = `${data.firstName} ${data.lastName}`.trim() || 'Your Name';
    const hasContact = data.email || data.phone || data.location || data.website;

    return `
        <div class="min-h-[297mm] bg-white p-10">
            <div class="grid grid-cols-12 gap-8">
                <div class="col-span-4 bg-slate-900 text-white rounded-[32px] p-8 space-y-6">
                    <div>
                        <p class="text-xs uppercase tracking-[0.3em] text-sky-300 mb-3">Portfolio</p>
                        <h1 class="text-4xl font-bold leading-tight">${fullName}</h1>
                        ${data.title ? `<p class="mt-4 text-slate-300 text-sm">${data.title}</p>` : ''}
                        ${getTargetJobLabel(data)}
                    </div>
                    ${hasContact ? `
                    <div class="space-y-2 text-sm text-slate-300">
                        ${data.email ? `<p>Email: ${data.email}</p>` : ''}
                        ${data.phone ? `<p>Phone: ${data.phone}</p>` : ''}
                        ${data.location ? `<p>Location: ${data.location}</p>` : ''}
                        ${data.website ? `<p>Website: ${data.website}</p>` : ''}
                    </div>` : ''}
                    ${data.skills.length > 0 ? `
                    <div>
                        <h2 class="text-xs uppercase tracking-[0.3em] text-sky-300 mb-3">Skills</h2>
                        <div class="flex flex-wrap gap-2">
                            ${data.skills.map(skill => `<span class="px-3 py-2 rounded-full text-xs ${highlightSkillClass(skill, data, 'bg-slate-800 text-slate-100', 'bg-sky-200 text-slate-950 font-semibold')}">${skill}</span>`).join('')}
                        </div>
                    </div>` : ''}
                </div>
                <div class="col-span-8 space-y-8">
                    ${data.summary ? `<div class="bg-slate-50 rounded-[32px] p-8 shadow-sm ring-1 ring-slate-200/80"><h2 class="text-sm font-bold uppercase tracking-[0.2em] text-slate-700 mb-4">About</h2><p class="text-slate-700 leading-relaxed">${data.summary}</p></div>` : ''}
                    ${data.experiences.length > 0 ? `<div class="bg-slate-50 rounded-[32px] p-8 shadow-sm ring-1 ring-slate-200/80"><h2 class="text-sm font-bold uppercase tracking-[0.2em] text-slate-700 mb-4">Experience</h2><div class="space-y-6">${data.experiences.map(exp => `<div><div class="flex items-start justify-between gap-4 mb-2"><div><p class="font-semibold text-slate-900">${exp.position || 'Position'}</p><p class="text-slate-600 text-sm">${exp.company || 'Company'}</p></div><span class="text-xs uppercase tracking-[0.3em] text-slate-500">${exp.startDate || ''}${exp.startDate && exp.endDate ? ' – ' : ''}${exp.endDate || ''}</span></div>${exp.description ? `<p class="text-slate-600 leading-relaxed">${exp.description}</p>` : ''}</div>`).join('')}</div></div>` : ''}
                    <div class="grid grid-cols-2 gap-6">
                        ${data.educations.length > 0 ? `<div class="bg-slate-50 rounded-[32px] p-8 shadow-sm ring-1 ring-slate-200/80"><h2 class="text-sm font-bold uppercase tracking-[0.2em] text-slate-700 mb-4">Education</h2><div class="space-y-4">${data.educations.map(edu => `<div><p class="font-semibold text-slate-900">${edu.school || 'School'}</p><p class="text-slate-600 text-sm">${edu.degree || ''}${edu.degree && edu.field ? ` · ${edu.field}` : ''}</p>${edu.year ? `<p class="text-xs uppercase tracking-[0.3em] text-slate-500 mt-2">${edu.year}</p>` : ''}</div>`).join('')}</div></div>` : ''}
                        ${data.certifications.length > 0 ? `<div class="bg-slate-50 rounded-[32px] p-8 shadow-sm ring-1 ring-slate-200/80"><h2 class="text-sm font-bold uppercase tracking-[0.2em] text-slate-700 mb-4">Certifications</h2><div class="space-y-3">${data.certifications.map(cert => `<div><p class="font-semibold text-slate-900">${cert.name}</p><p class="text-slate-600 text-sm">${cert.issuer || ''}${cert.issuer && cert.year ? ` · ${cert.year}` : cert.year || ''}</p></div>`).join('')}</div></div>` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderStartup(data) {
    const fullName = `${data.firstName} ${data.lastName}`.trim() || 'Your Name';

    return `
        <div class="min-h-[297mm] bg-white p-10">
            <div class="bg-gradient-to-r from-cyan-500 to-slate-900 text-white rounded-[36px] p-10 mb-8 shadow-2xl">
                <div class="max-w-4xl mx-auto">
                    <p class="text-xs uppercase tracking-[0.35em] text-cyan-200 mb-4">Startup Resume</p>
                    <h1 class="text-5xl font-bold tracking-tight">${fullName}</h1>
                    ${data.title ? `<p class="mt-4 text-lg text-cyan-100">${data.title}</p>` : ''}
                    ${getTargetJobLabel(data)}
                    ${data.summary ? `<p class="mt-6 max-w-3xl text-slate-100 leading-relaxed">${data.summary}</p>` : ''}
                </div>
            </div>
            <div class="grid grid-cols-12 gap-8">
                <div class="col-span-8 space-y-8">
                    ${data.experiences.length > 0 ? `<div class="bg-slate-50 rounded-[32px] p-8 shadow-sm ring-1 ring-slate-200/80"><h2 class="text-sm font-bold uppercase tracking-[0.2em] text-slate-700 mb-5">Experience</h2><div class="space-y-6">${data.experiences.map(exp => `<div><p class="font-semibold text-slate-900">${exp.position || 'Position'} · ${exp.company || 'Company'}</p><p class="text-xs uppercase tracking-[0.3em] text-slate-500 mb-2">${exp.startDate || ''}${exp.startDate && exp.endDate ? ' – ' : ''}${exp.endDate || ''}</p>${exp.description ? `<p class="text-slate-600 leading-relaxed">${exp.description}</p>` : ''}</div>`).join('')}</div></div>` : ''}
                    ${data.educations.length > 0 ? `<div class="bg-slate-50 rounded-[32px] p-8 shadow-sm ring-1 ring-slate-200/80"><h2 class="text-sm font-bold uppercase tracking-[0.2em] text-slate-700 mb-5">Education</h2><div class="space-y-4">${data.educations.map(edu => `<div><p class="font-semibold text-slate-900">${edu.degree || 'Degree'}${edu.field ? `, ${edu.field}` : ''}</p><p class="text-slate-600 text-sm">${edu.school || 'School'}${edu.year ? ` · ${edu.year}` : ''}</p></div>`).join('')}</div></div>` : ''}
                </div>
                <div class="col-span-4 space-y-8">
                    ${data.skills.length > 0 ? `<div class="bg-slate-950 text-white rounded-[32px] p-8 shadow-lg"><h2 class="text-xs uppercase tracking-[0.35em] text-cyan-300 mb-4">Skills</h2><div class="flex flex-wrap gap-2">${data.skills.map(skill => `<span class="inline-flex items-center px-3 py-2 rounded-full text-xs ${highlightSkillClass(skill, data, 'bg-white/10 text-white', 'bg-cyan-300 text-slate-950 font-semibold')}">${skill}</span>`).join('')}</div></div>` : ''}
                    ${data.certifications.length > 0 ? `<div class="bg-slate-950 text-white rounded-[32px] p-8 shadow-lg"><h2 class="text-xs uppercase tracking-[0.35em] text-cyan-300 mb-4">Certifications</h2><div class="space-y-3">${data.certifications.map(cert => `<div><p class="font-semibold">${cert.name}</p><p class="text-xs text-slate-300">${cert.issuer || ''}${cert.issuer && cert.year ? ` · ${cert.year}` : cert.year || ''}</p></div>`).join('')}</div></div>` : ''}
                    ${data.email || data.phone || data.location || data.website ? `<div class="bg-slate-50 rounded-[32px] p-8 shadow-sm ring-1 ring-slate-200/80"><h2 class="text-sm font-bold uppercase tracking-[0.2em] text-slate-700 mb-4">Contact</h2>${data.email ? `<p class="text-slate-700 text-sm">${data.email}</p>` : ''}${data.phone ? `<p class="text-slate-700 text-sm">${data.phone}</p>` : ''}${data.location ? `<p class="text-slate-700 text-sm">${data.location}</p>` : ''}${data.website ? `<p class="text-slate-700 text-sm">${data.website}</p>` : ''}</div>` : ''}
                </div>
            </div>
        </div>
    `;
}

function renderCorporate(data) {
    const fullName = `${data.firstName} ${data.lastName}`.trim() || 'Your Name';
    return `
        <div class="min-h-[297mm] bg-white p-12 font-source">
            <div class="grid grid-cols-12 gap-8">
                <div class="col-span-4 bg-slate-100 rounded-[32px] p-8 space-y-6">
                    <div>
                        <p class="text-xs uppercase tracking-[0.3em] text-slate-500 mb-3">Corporate</p>
                        <h1 class="text-4xl font-bold text-slate-900">${fullName}</h1>
                        ${data.title ? `<p class="mt-3 text-slate-600 text-lg">${data.title}</p>` : ''}
                        ${getTargetJobLabel(data)}
                    </div>
                    <div class="space-y-2 text-sm text-slate-700">
                        ${data.email ? `<p>Email: ${data.email}</p>` : ''}
                        ${data.phone ? `<p>Phone: ${data.phone}</p>` : ''}
                        ${data.location ? `<p>Location: ${data.location}</p>` : ''}
                        ${data.website ? `<p>Website: ${data.website}</p>` : ''}
                    </div>
                    ${data.skills.length > 0 ? `<div><h2 class="text-xs uppercase tracking-[0.3em] text-slate-500 mb-3">Core Skills</h2><div class="flex flex-wrap gap-2">${data.skills.map(skill => `<span class="px-3 py-2 rounded-full text-xs ${highlightSkillClass(skill, data, 'bg-slate-200 text-slate-800', 'bg-slate-900 text-white font-semibold')}">${skill}</span>`).join('')}</div></div>` : ''}
                </div>
                <div class="col-span-8 space-y-8">
                    ${data.summary ? `<div class="bg-slate-50 rounded-[32px] p-8 shadow-sm ring-1 ring-slate-200/80"><h2 class="text-sm uppercase tracking-[0.2em] text-slate-700 mb-4">Executive Summary</h2><p class="text-slate-700 leading-relaxed">${data.summary}</p></div>` : ''}
                    ${data.experiences.length > 0 ? `<div class="bg-white rounded-[32px] p-8 shadow-sm ring-1 ring-slate-200/80"><h2 class="text-sm uppercase tracking-[0.2em] text-slate-700 mb-5">Professional Experience</h2><div class="space-y-6">${data.experiences.map(exp => `<div><div class="flex items-center justify-between gap-4"><div><p class="font-semibold text-slate-900">${exp.position || 'Position'}</p><p class="text-sm text-slate-600">${exp.company || 'Company'}</p></div><span class="text-xs uppercase tracking-[0.3em] text-slate-500">${exp.startDate || ''}${exp.startDate && exp.endDate ? ' – ' : ''}${exp.endDate || ''}</span></div>${exp.description ? `<p class="text-slate-600 mt-3 leading-relaxed">${exp.description}</p>` : ''}</div>`).join('')}</div></div>` : ''}
                    ${data.educations.length > 0 ? `<div class="bg-slate-50 rounded-[32px] p-8 shadow-sm ring-1 ring-slate-200/80"><h2 class="text-sm uppercase tracking-[0.2em] text-slate-700 mb-5">Education</h2><div class="space-y-4">${data.educations.map(edu => `<div><p class="font-semibold text-slate-900">${edu.school || 'School'}</p><p class="text-sm text-slate-600">${edu.degree || ''}${edu.degree && edu.field ? ` · ${edu.field}` : ''}${edu.year ? ` · ${edu.year}` : ''}</p></div>`).join('')}</div></div>` : ''}
                    ${data.certifications.length > 0 ? `<div class="bg-white rounded-[32px] p-8 shadow-sm ring-1 ring-slate-200/80"><h2 class="text-sm uppercase tracking-[0.2em] text-slate-700 mb-5">Certifications</h2><div class="space-y-3">${data.certifications.map(cert => `<div><p class="font-semibold text-slate-900">${cert.name}</p><p class="text-sm text-slate-600">${cert.issuer || ''}${cert.issuer && cert.year ? ` · ${cert.year}` : cert.year || ''}</p></div>`).join('')}</div></div>` : ''}
                </div>
            </div>
        </div>
    `;
}

function renderFreelance(data) {
    const fullName = `${data.firstName} ${data.lastName}`.trim() || 'Your Name';
    return `
        <div class="min-h-[297mm] bg-white p-10">
            <div class="bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-[36px] p-10 mb-8 shadow-2xl">
                <div class="max-w-4xl mx-auto">
                    <p class="text-xs uppercase tracking-[0.35em] text-amber-100 mb-4">Freelance Profile</p>
                    <h1 class="text-5xl font-bold tracking-tight">${fullName}</h1>
                    ${data.title ? `<p class="mt-4 text-lg text-amber-100">${data.title}</p>` : ''}
                    ${getTargetJobLabel(data)}
                    ${data.summary ? `<p class="mt-6 max-w-3xl text-orange-100 leading-relaxed">${data.summary}</p>` : ''}
                </div>
            </div>
            <div class="grid grid-cols-12 gap-8">
                <div class="col-span-7 space-y-8">
                    ${data.experiences.length > 0 ? `<div class="bg-slate-50 rounded-[32px] p-8 shadow-sm ring-1 ring-slate-200/80"><h2 class="text-sm uppercase tracking-[0.2em] text-slate-700 mb-5">Project Experience</h2><div class="space-y-6">${data.experiences.map(exp => `<div><p class="font-semibold text-slate-900">${exp.position || 'Project Role'}</p><p class="text-sm text-slate-600 mb-2">${exp.company || 'Client'}${exp.startDate || exp.endDate ? ` · ${exp.startDate || ''}${exp.startDate && exp.endDate ? ' – ' : ''}${exp.endDate || ''}` : ''}</p>${exp.description ? `<p class="text-slate-600 leading-relaxed">${exp.description}</p>` : ''}</div>`).join('')}</div></div>` : ''}
                    ${data.educations.length > 0 ? `<div class="bg-white rounded-[32px] p-8 shadow-sm ring-1 ring-slate-200/80"><h2 class="text-sm uppercase tracking-[0.2em] text-slate-700 mb-5">Education</h2><div class="space-y-4">${data.educations.map(edu => `<div><p class="font-semibold text-slate-900">${edu.degree || 'Degree'}${edu.field ? `, ${edu.field}` : ''}</p><p class="text-sm text-slate-600">${edu.school || 'School'}${edu.year ? ` · ${edu.year}` : ''}</p></div>`).join('')}</div></div>` : ''}
                </div>
                <div class="col-span-5 space-y-8">
                    ${data.skills.length > 0 ? `<div class="bg-orange-50 rounded-[32px] p-8 shadow-lg"><h2 class="text-xs uppercase tracking-[0.35em] text-orange-600 mb-4">Skills</h2><div class="flex flex-wrap gap-2">${data.skills.map(skill => `<span class="inline-flex items-center px-3 py-2 rounded-full text-xs ${highlightSkillClass(skill, data, 'bg-white text-slate-900', 'bg-orange-500 text-white font-semibold')}">${skill}</span>`).join('')}</div></div>` : ''}
                    ${data.certifications.length > 0 ? `<div class="bg-orange-50 rounded-[32px] p-8 shadow-lg"><h2 class="text-xs uppercase tracking-[0.35em] text-orange-600 mb-4">Certifications</h2><div class="space-y-3">${data.certifications.map(cert => `<div><p class="font-semibold">${cert.name}</p><p class="text-sm text-slate-700">${cert.issuer || ''}${cert.issuer && cert.year ? ` · ${cert.year}` : cert.year || ''}</p></div>`).join('')}</div></div>` : ''}
                    ${data.email || data.phone || data.location || data.website ? `<div class="bg-slate-50 rounded-[32px] p-8 shadow-sm ring-1 ring-slate-200/80"><h2 class="text-sm uppercase tracking-[0.2em] text-slate-700 mb-4">Contact</h2>${data.email ? `<p class="text-slate-700 text-sm">${data.email}</p>` : ''}${data.phone ? `<p class="text-slate-700 text-sm">${data.phone}</p>` : ''}${data.location ? `<p class="text-slate-700 text-sm">${data.location}</p>` : ''}${data.website ? `<p class="text-slate-700 text-sm">${data.website}</p>` : ''}</div>` : ''}
                </div>
            </div>
        </div>
    `;
}

function exportToPDF() {
    const data = getFormData();
    const filename = `${(data.firstName || 'Resume').replace(/[^a-zA-Z0-9_-]/g, '') || 'Resume'}-CV.pdf`;
    const element = document.getElementById('resumePreview');
    html2pdf().set({
        margin: 10,
        filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }).from(element).save();
}

function loadDemoData() {
    document.getElementById('firstName').value = 'Ava';
    document.getElementById('lastName').value = 'Bennett';
    document.getElementById('title').value = 'Product Designer';
    document.getElementById('email').value = 'ava.bennett@example.com';
    document.getElementById('phone').value = '+1 555 123 4567';
    document.getElementById('location').value = 'Austin, TX';
    document.getElementById('website').value = 'ava.design';
    if (document.getElementById('targetJob')) document.getElementById('targetJob').value = 'Senior Product Designer at Nova Labs';
    document.getElementById('summary').value = 'Creative product designer with 8 years of experience bringing digital experiences to life for startups and enterprise teams.';
    experiences = [
        { id: Date.now() + 1, company: 'Nova Labs', position: 'Senior Product Designer', startDate: 'Jan 2022', endDate: 'Present', description: 'Led design strategy for customer-facing SaaS products and mentored a team of designers to streamline workflows.' },
        { id: Date.now() + 2, company: 'Arc Interactive', position: 'Product Designer', startDate: 'Jun 2018', endDate: 'Dec 2021', description: 'Delivered polished digital experiences through user research, wireframing, and cross-functional design reviews.' }
    ];
    educations = [
        { id: Date.now() + 3, school: 'University of Texas', degree: 'B.A.', field: 'Visual Communication', year: '2018' }
    ];
    certifications = [
        { id: Date.now() + 4, name: 'Certified UX Specialist', issuer: 'Interaction Design Foundation', year: '2020' }
    ];
    skills = ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'UI Animation'];
    coverLetter = {
        company: 'Nova Labs',
        role: 'Lead Product Designer',
        intro: 'I am excited to apply for the Lead Product Designer role at Nova Labs, where I can blend strategy, creativity, and user-centered design.',
        body: 'With 8 years of experience delivering polished digital experiences and leading collaborative product teams, I drive design decisions that connect business goals to delightful user outcomes.',
        closing: 'I would love to discuss how my background can support Nova Labs’ next product milestone. Thank you for your consideration.'
    };
    projects = [
        { id: Date.now() + 11, name: 'Nyxon Quest Dashboard', role: 'Design Lead', description: 'Led the design system, user flows, and interactive prototype for a career-focused productivity dashboard.', link: 'nyxonquest.app', year: '2025' },
        { id: Date.now() + 12, name: 'Nyxon Shield Portfolio', role: 'Product Designer', description: 'Created a brand-led portfolio page and case study layout for high-impact client presentations.', link: 'nyxonshield.app', year: '2024' }
    ];
    renderExperienceInputs();
    renderEducationInputs();
    renderCertificationInputs();
    renderSkills();
    renderCoverLetterInputs();
    renderProjectInputs();
    showAIThinking();
    updatePreview();
}
