
// ── Scroll progress bar ──────────────────────────
const scrollProgress = document.getElementById('scrollProgress');
if (scrollProgress) {
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct = (window.scrollY / total) * 100;
    scrollProgress.style.width = pct + '%';
  }, { passive: true });
}

'use strict';

// ── Header scroll ────────────────────────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Mobile menu ──────────────────────────────────
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  nav.classList.toggle('open');
  document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  hamburger.classList.remove('open');
  nav.classList.remove('open');
  document.body.style.overflow = '';
}));

// ── Smooth scroll ────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (!t) return;
    e.preventDefault();
    window.scrollTo({ top: t.offsetTop - header.offsetHeight - 16, behavior: 'smooth' });
  });
});

// ── Hero canvas — network particles ─────────────
const canvas = document.getElementById('heroCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H, pts = [];

  const resize = () => {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  class Dot {
    constructor() { this.init(); }
    init() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.r = Math.random() * 1.8 + 0.5;
      this.a = Math.random() * 0.4 + 0.1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.init();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(96,165,250,${this.a})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 70; i++) pts.push(new Dot());

  const loop = () => {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => { p.update(); p.draw(); });
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < 130) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(59,130,246,${(1 - d/130) * 0.15})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(loop);
  };
  loop();
}

// ── Reveal observer ──────────────────────────────
const reveals = document.querySelectorAll('.reveal');

// Immediately show elements already in viewport on load
function checkReveal() {
  reveals.forEach((el, i) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const siblings = [...el.parentElement.querySelectorAll('.reveal:not(.visible)')];
      const idx = siblings.indexOf(el);
      el.style.transitionDelay = `${Math.min(idx, 4) * 0.06}s`;
      el.classList.add('visible');
    }
  });
}

// Run immediately and on scroll
checkReveal();
window.addEventListener('scroll', checkReveal, { passive: true });

const ro = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const siblings = [...e.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
      const idx = siblings.indexOf(e.target);
      e.target.style.transitionDelay = `${Math.min(idx, 4) * 0.08}s`;
      e.target.classList.add('visible');
      ro.unobserve(e.target);
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px 0px 0px' });
reveals.forEach(el => ro.observe(el));

// ── Counters ─────────────────────────────────────
function animateCount(el) {
  const target = +el.dataset.to;
  let current = 0;
  const step = target / 50;
  const iv = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current);
    if (current >= target) clearInterval(iv);
  }, 30);
}

// Trigger hero counters immediately since hero is always visible
setTimeout(() => {
  document.querySelectorAll('.hero .count').forEach(animateCount);
}, 600);

// ── Bar fills & counters ─────────────────────────
const barObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target.querySelector('.bar-fill');
      const counter = entry.target.querySelector('.count');
      if (fill) setTimeout(() => { fill.style.width = fill.dataset.w + '%'; }, 150);
      if (counter) animateCount(counter);
      barObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.bar-item').forEach(el => barObs.observe(el));

// ── Form ─────────────────────────────────────────
const form = document.getElementById('contactoForm');
const formOk = document.getElementById('formOk');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    btn.textContent = 'Enviando...';
    btn.disabled = true;
    setTimeout(() => {
      form.style.display = 'none';
      formOk.classList.add('active');
    }, 1200);
  });
}


/* ══════════════════════════════════════════════
   VANE — Smart Multilingual Assistant
   8 languages · No API required
   ══════════════════════════════════════════════ */

const VB_WA   = 'https://wa.me/56982774194';
const VB_MAIL = 'mailto:spssasesores@gmail.com';

// ── Language detection ────────────────────────
function vbDetectLang(text) {
  const t = text.toLowerCase();
  if (/[一-鿿]/.test(text)) return 'zh';
  if (/[؀-ۿ]/.test(text)) return 'ar';
  if (/[Ѐ-ӿ]/.test(text)) return 'ru';
  const map = [
    { lang:'pt', words:['você','obrigado','tese','preço','quanto','onde','empresa','preciso','análise','bom dia','boa tarde'] },
    { lang:'fr', words:['bonjour','merci','thèse','prix','comment','où','entreprise','besoin','analyse','bonsoir'] },
    { lang:'de', words:['hallo','danke','arbeit','preis','wie','wo','unternehmen','brauche','analyse','guten'] },
    { lang:'it', words:['ciao','grazie','tesi','prezzo','come','dove','azienda','bisogno','analisi','buongiorno'] },
    { lang:'es', words:['hola','precio','costo','cuánto','cuanto','tesis','empresa','gracias','buenos','buenas','dónde','donde','pago','análisis','necesito','quiero','tengo'] },
  ];
  for (const { lang, words } of map) {
    if (words.some(w => t.includes(w))) return lang;
  }
  return 'en';
}

// ── Translations ──────────────────────────────
const T = {
  greeting: {
    es: '¡Hola! Soy <strong>Vane</strong>, asistente de <strong>AC& Data Consulting</strong>.<br>¿En qué te puedo ayudar hoy?',
    en: 'Hello! I\'m <strong>Vane</strong>, assistant at <strong>AC& Data Consulting</strong>.<br>How can I help you today?',
    pt: 'Olá! Sou a <strong>Vane</strong>, assistente da <strong>AC& Data Consulting</strong>.<br>Como posso ajudar?',
    fr: 'Bonjour! Je suis <strong>Vane</strong>, assistante chez <strong>AC& Data Consulting</strong>.<br>Comment puis-je vous aider?',
    de: 'Hallo! Ich bin <strong>Vane</strong>, Assistentin bei <strong>AC& Data Consulting</strong>.<br>Wie kann ich Ihnen helfen?',
    it: 'Ciao! Sono <strong>Vane</strong>, assistente di <strong>AC& Data Consulting</strong>.<br>Come posso aiutarti?',
    zh: '您好！我是<strong>Vane</strong>，AC& Data Consulting的助理。<br>我能为您做什么？',
    ar: 'مرحباً! أنا <strong>Vane</strong>، مساعدة AC& Data Consulting.<br>كيف يمكنني مساعدتك؟',
    ru: 'Привет! Я <strong>Vane</strong>, ассистент AC& Data Consulting.<br>Чем могу помочь?',
  },
  chips: {
    es: ['Precios','Tesis','Empresas','Plazos','Pago','¿Dónde operan?'],
    en: ['Pricing','Thesis','Enterprise','Deadlines','Payment','Locations'],
    pt: ['Preços','Tese','Empresas','Prazos','Pagamento','Onde?'],
    fr: ['Tarifs','Thèse','Entreprises','Délais','Paiement','Où?'],
    de: ['Preise','Abschlussarbeit','Unternehmen','Fristen','Zahlung','Wo?'],
    it: ['Prezzi','Tesi','Aziende','Scadenze','Pagamento','Dove?'],
    zh: ['价格','论文','企业','截止日期','付款','在哪里?'],
    ar: ['الأسعار','الأطروحة','الشركات','المواعيد','الدفع','أين؟'],
    ru: ['Цены','Диссертация','Компании','Сроки','Оплата','Где?'],
  },
  fallback: {
    es: `No tengo esa información exacta, pero nuestro equipo responde de inmediato.<br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">WhatsApp</a><a href="${VB_MAIL}" class="vb-cta vb-cta--mail">Email</a>`,
    en: `I don't have that info, but our team replies immediately.<br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">WhatsApp</a><a href="${VB_MAIL}" class="vb-cta vb-cta--mail">Email</a>`,
    pt: `Não tenho essa informação, mas nossa equipe responde imediatamente.<br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">WhatsApp</a><a href="${VB_MAIL}" class="vb-cta vb-cta--mail">Email</a>`,
    fr: `Je n'ai pas cette information, mais notre équipe répond immédiatement.<br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">WhatsApp</a><a href="${VB_MAIL}" class="vb-cta vb-cta--mail">Email</a>`,
    de: `Diese Information habe ich nicht, aber unser Team antwortet sofort.<br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">WhatsApp</a><a href="${VB_MAIL}" class="vb-cta vb-cta--mail">Email</a>`,
    it: `Non ho quell'informazione, ma il nostro team risponde immediatamente.<br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">WhatsApp</a><a href="${VB_MAIL}" class="vb-cta vb-cta--mail">Email</a>`,
    zh: `我没有那个具体信息，但我们的团队会立即回复。<br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">WhatsApp</a><a href="${VB_MAIL}" class="vb-cta vb-cta--mail">Email</a>`,
    ar: `ليس لدي هذه المعلومات، لكن فريقنا يرد فوراً.<br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">واتساب</a><a href="${VB_MAIL}" class="vb-cta vb-cta--mail">البريد</a>`,
    ru: `У меня нет этой информации, но наша команда отвечает немедленно.<br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">WhatsApp</a><a href="${VB_MAIL}" class="vb-cta vb-cta--mail">Email</a>`,
  }
};

// ── Knowledge base — all 9 languages ─────────
const VB_KB = [
  {
    keys: ['precio','costo','cuánto','cuanto','valor','tarifa','pricing','price','cost','rate','fee','preço','quanto','tarif','prix','preis','prezzo','价格','الأسعار','цены'],
    es: `Nuestras tarifas se adaptan a cada proyecto:<br><br><strong>🎓 Estudiantes / Tesis:</strong> Desde <strong>45€ hasta 500€</strong> según la magnitud. Superamos cualquier oferta del mercado.<br><br><strong>🏢 Empresas:</strong> Propuesta personalizada con respuesta prioritaria e inmediata.<br><br>¿Le enviamos una cotización sin costo?<br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">WhatsApp</a><a href="${VB_MAIL}" class="vb-cta vb-cta--mail">Email</a>`,
    en: `Our rates adapt to each project:<br><br><strong>🎓 Students / Thesis:</strong> From <strong>€45 to €500</strong> depending on complexity. We beat any competitor.<br><br><strong>🏢 Enterprise:</strong> Custom proposal with immediate priority response.<br><br>Want a free quote?<br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">WhatsApp</a><a href="${VB_MAIL}" class="vb-cta vb-cta--mail">Email</a>`,
    pt: `Nossas tarifas se adaptam a cada projeto:<br><br><strong>🎓 Estudantes / Tese:</strong> De <strong>€45 a €500</strong> segundo a complexidade. Superamos qualquer oferta.<br><br><strong>🏢 Empresas:</strong> Proposta personalizada com resposta prioritária imediata.<br><br>Quer um orçamento gratuito?<br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">WhatsApp</a><a href="${VB_MAIL}" class="vb-cta vb-cta--mail">Email</a>`,
    fr: `Nos tarifs s'adaptent à chaque projet:<br><br><strong>🎓 Étudiants / Thèse:</strong> De <strong>45€ à 500€</strong> selon la complexité. Nous battons toute concurrence.<br><br><strong>🏢 Entreprises:</strong> Proposition personnalisée avec réponse prioritaire immédiate.<br><br>Devis gratuit?<br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">WhatsApp</a><a href="${VB_MAIL}" class="vb-cta vb-cta--mail">Email</a>`,
    de: `Unsere Preise passen sich jedem Projekt an:<br><br><strong>🎓 Studenten / Abschlussarbeit:</strong> Von <strong>45€ bis 500€</strong> je nach Umfang. Wir unterbieten jeden Mitbewerber.<br><br><strong>🏢 Unternehmen:</strong> Individuelles Angebot mit sofortiger Prioritätsantwort.<br><br>Kostenloses Angebot?<br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">WhatsApp</a><a href="${VB_MAIL}" class="vb-cta vb-cta--mail">Email</a>`,
    it: `Le nostre tariffe si adattano a ogni progetto:<br><br><strong>🎓 Studenti / Tesi:</strong> Da <strong>€45 a €500</strong> secondo la complessità. Superiamo qualsiasi offerta.<br><br><strong>🏢 Aziende:</strong> Proposta personalizzata con risposta prioritaria immediata.<br><br>Preventivo gratuito?<br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">WhatsApp</a><a href="${VB_MAIL}" class="vb-cta vb-cta--mail">Email</a>`,
    zh: `我们的价格适应每个项目：<br><br><strong>🎓 学生/论文：</strong> 从<strong>€45到€500</strong>，取决于复杂程度。我们超越任何竞争对手。<br><br><strong>🏢 企业：</strong> 个性化方案，立即优先回复。<br><br>免费报价？<br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">WhatsApp</a><a href="${VB_MAIL}" class="vb-cta vb-cta--mail">Email</a>`,
    ar: `أسعارنا تتكيف مع كل مشروع:<br><br><strong>🎓 الطلاب / الأطروحة:</strong> من <strong>45€ إلى 500€</strong> حسب التعقيد. نتفوق على أي منافس.<br><br><strong>🏢 الشركات:</strong> عرض مخصص مع رد فوري.<br><br>عرض سعر مجاني؟<br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">واتساب</a><a href="${VB_MAIL}" class="vb-cta vb-cta--mail">بريد</a>`,
    ru: `Наши тарифы адаптируются к каждому проекту:<br><br><strong>🎓 Студенты / Диссертация:</strong> От <strong>€45 до €500</strong> в зависимости от сложности.<br><br><strong>🏢 Компании:</strong> Индивидуальное предложение с немедленным ответом.<br><br>Бесплатная консультация?<br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">WhatsApp</a><a href="${VB_MAIL}" class="vb-cta vb-cta--mail">Email</a>`,
  },
  {
    keys: ['tesis','tesina','tfg','tfm','thesis','dissertation','master','doctoral','academic','grado','posgrado','tese','thèse','arbeit','abschluss','tesi','论文','الأطروحة','диссертация'],
    es: `Llevamos <strong>más de 20 años</strong> apoyando investigación académica en todo el mundo.<br><br>✔ Diseño metodológico<br>✔ Análisis con SPSS, R o Python<br>✔ Interpretación de resultados<br>✔ Tablas en formato APA<br><br>Desde <strong>€45</strong> · Entrega en plazo garantizado.<br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">Cuéntanos tu proyecto</a>`,
    en: `<strong>20+ years</strong> supporting academic research worldwide.<br><br>✔ Research design<br>✔ SPSS, R or Python analysis<br>✔ Results interpretation<br>✔ APA-formatted tables<br><br>From <strong>€45</strong> · On-time delivery guaranteed.<br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">Tell us about your thesis</a>`,
    pt: `<strong>Mais de 20 anos</strong> apoiando pesquisa acadêmica em todo o mundo.<br><br>✔ Desenho metodológico<br>✔ Análise com SPSS, R ou Python<br>✔ Interpretação de resultados<br>✔ Tabelas em formato APA<br><br>A partir de <strong>€45</strong> · Entrega no prazo garantida.<br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">Fale sobre seu projeto</a>`,
    fr: `<strong>Plus de 20 ans</strong> à soutenir la recherche académique dans le monde entier.<br><br>✔ Conception méthodologique<br>✔ Analyse avec SPSS, R ou Python<br>✔ Interprétation des résultats<br>✔ Tableaux au format APA<br><br>À partir de <strong>45€</strong> · Livraison dans les délais garantie.<br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">Parlez-nous de votre projet</a>`,
    de: `<strong>Über 20 Jahre</strong> Unterstützung akademischer Forschung weltweit.<br><br>✔ Methodisches Design<br>✔ Analyse mit SPSS, R oder Python<br>✔ Ergebnisinterpretation<br>✔ APA-formatierte Tabellen<br><br>Ab <strong>€45</strong> · Pünktliche Lieferung garantiert.<br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">Erzählen Sie uns von Ihrer Arbeit</a>`,
    it: `<strong>Oltre 20 anni</strong> a supportare la ricerca accademica in tutto il mondo.<br><br>✔ Progettazione metodologica<br>✔ Analisi con SPSS, R o Python<br>✔ Interpretazione dei risultati<br>✔ Tabelle in formato APA<br><br>Da <strong>€45</strong> · Consegna puntuale garantita.<br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">Raccontaci il tuo progetto</a>`,
    zh: `<strong>20年以上</strong>支持全球学术研究。<br><br>✔ 研究设计<br>✔ SPSS、R或Python分析<br>✔ 结果解释<br>✔ APA格式表格<br><br>从<strong>€45</strong>起 · 按时交付保证。<br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">告诉我们您的项目</a>`,
    ar: `<strong>أكثر من 20 عاماً</strong> في دعم البحث الأكاديمي حول العالم.<br><br>✔ التصميم المنهجي<br>✔ التحليل بـ SPSS أو R أو Python<br>✔ تفسير النتائج<br>✔ جداول بتنسيق APA<br><br>من <strong>€45</strong> · تسليم في الموعد مضمون.<br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">أخبرنا عن مشروعك</a>`,
    ru: `<strong>Более 20 лет</strong> поддержки академических исследований по всему миру.<br><br>✔ Методологическое проектирование<br>✔ Анализ в SPSS, R или Python<br>✔ Интерпретация результатов<br>✔ Таблицы в формате APA<br><br>От <strong>€45</strong> · Своевременная доставка гарантирована.<br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">Расскажите о вашем проекте</a>`,
  },
  {
    keys: ['empresa','empresas','corporate','enterprise','business','negocio','pyme','organization','entreprise','unternehmen','azienda','企业','الشركات','компании'],
    es: `Las empresas reciben <strong>respuesta prioritaria e inmediata.</strong><br><br>Especialidades:<br>✔ Business Intelligence & Dashboards<br>✔ Analítica Avanzada y modelos predictivos<br>✔ Optimización de procesos<br>✔ Evaluación estratégica<br><br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">Línea prioritaria empresas</a>`,
    en: `Enterprise clients receive <strong>immediate priority response.</strong><br><br>Specialties:<br>✔ Business Intelligence & Dashboards<br>✔ Advanced Analytics & predictive models<br>✔ Process optimization<br>✔ Strategic evaluation<br><br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">Enterprise priority line</a>`,
    pt: `Empresas recebem <strong>resposta prioritária imediata.</strong><br><br>Especialidades:<br>✔ Business Intelligence & Dashboards<br>✔ Análise Avançada e modelos preditivos<br>✔ Otimização de processos<br>✔ Avaliação estratégica<br><br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">Linha prioritária empresas</a>`,
    fr: `Les entreprises reçoivent une <strong>réponse prioritaire immédiate.</strong><br><br>Spécialités:<br>✔ Business Intelligence & Tableaux de bord<br>✔ Analyses avancées et modèles prédictifs<br>✔ Optimisation des processus<br>✔ Évaluation stratégique<br><br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">Ligne prioritaire entreprises</a>`,
    de: `Unternehmen erhalten eine <strong>sofortige Prioritätsantwort.</strong><br><br>Spezialgebiete:<br>✔ Business Intelligence & Dashboards<br>✔ Erweiterte Analyse & Prognosemodelle<br>✔ Prozessoptimierung<br>✔ Strategische Bewertung<br><br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">Unternehmens-Prioritätslinie</a>`,
    it: `Le aziende ricevono una <strong>risposta prioritaria immediata.</strong><br><br>Specialità:<br>✔ Business Intelligence & Dashboard<br>✔ Analisi avanzata e modelli predittivi<br>✔ Ottimizzazione dei processi<br>✔ Valutazione strategica<br><br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">Linea prioritaria aziende</a>`,
    zh: `企业客户获得<strong>即时优先响应。</strong><br><br>专业领域：<br>✔ 商业智能和仪表板<br>✔ 高级分析和预测模型<br>✔ 流程优化<br>✔ 战略评估<br><br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">企业优先热线</a>`,
    ar: `تحصل الشركات على <strong>رد فوري وذو أولوية.</strong><br><br>التخصصات:<br>✔ ذكاء الأعمال ولوحات المعلومات<br>✔ التحليلات المتقدمة والنماذج التنبؤية<br>✔ تحسين العمليات<br>✔ التقييم الاستراتيجي<br><br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">خط الأولوية للشركات</a>`,
    ru: `Корпоративные клиенты получают <strong>немедленный приоритетный ответ.</strong><br><br>Специализации:<br>✔ Business Intelligence & Дашборды<br>✔ Расширенная аналитика и прогнозные модели<br>✔ Оптимизация процессов<br>✔ Стратегическая оценка<br><br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">Корпоративная приоритетная линия</a>`,
  },
  {
    keys: ['plazo','urgente','deadline','fast','delivery','entrega','cuanto tarda','horas','time','rapido','rápido','prazo','délai','frist','scadenza','时间','المواعيد','сроки'],
    es: `Los plazos son críticos — lo entendemos perfectamente.<br><br>Trabajamos con <strong>respuesta y entrega prioritaria</strong> para proyectos urgentes.<br><br>Hemos entregado análisis completos en <strong>48 horas.</strong> Cuéntenos su plazo y lo hacemos posible.<br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">Hablar de mi plazo</a>`,
    en: `Deadlines are critical — we fully understand.<br><br>We handle <strong>priority delivery</strong> for urgent projects.<br><br>We've delivered complete analyses in <strong>48 hours.</strong> Tell us your deadline and we'll make it work.<br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">Discuss my deadline</a>`,
    pt: `Prazos são críticos — entendemos perfeitamente.<br><br>Trabalhamos com <strong>entrega prioritária</strong> para projetos urgentes.<br><br>Já entregamos análises completas em <strong>48 horas.</strong><br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">Falar sobre meu prazo</a>`,
    fr: `Les délais sont critiques — nous comprenons parfaitement.<br><br>Nous travaillons avec <strong>livraison prioritaire</strong> pour les projets urgents.<br><br>Nous avons livré des analyses complètes en <strong>48 heures.</strong><br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">Parler de mes délais</a>`,
    de: `Fristen sind kritisch — wir verstehen das vollkommen.<br><br>Wir arbeiten mit <strong>Prioritätslieferung</strong> für dringende Projekte.<br><br>Wir haben vollständige Analysen in <strong>48 Stunden</strong> geliefert.<br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">Frist besprechen</a>`,
    it: `Le scadenze sono critiche — lo capiamo perfettamente.<br><br>Lavoriamo con <strong>consegna prioritaria</strong> per progetti urgenti.<br><br>Abbiamo consegnato analisi complete in <strong>48 ore.</strong><br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">Parlare della mia scadenza</a>`,
    zh: `截止日期至关重要——我们完全理解。<br><br>我们为紧急项目提供<strong>优先交付</strong>。<br><br>我们曾在<strong>48小时内</strong>完成完整分析。<br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">讨论我的截止日期</a>`,
    ar: `المواعيد النهائية حرجة — نفهم تماماً.<br><br>نعمل مع <strong>التسليم ذو الأولوية</strong> للمشاريع العاجلة.<br><br>سلّمنا تحليلات كاملة في <strong>48 ساعة.</strong><br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">مناقشة موعدي النهائي</a>`,
    ru: `Сроки критичны — мы прекрасно понимаем.<br><br>Мы работаем с <strong>приоритетной доставкой</strong> для срочных проектов.<br><br>Мы выполняли полный анализ за <strong>48 часов.</strong><br><a href="${VB_WA}" target="_blank" class="vb-cta vb-cta--wa">Обсудить мой дедлайн</a>`,
  },
  {
    keys: ['pago','factura','paypal','invoice','payment','pay','transferencia','pagamento','paiement','zahlung','pagamento','付款','الدفع','оплата'],
    es: `Proceso de pago simple y seguro:<br><br>✔ <strong>Pago anticipado</strong> al inicio del proyecto<br>✔ <strong>PayPal</strong> para pagos internacionales (USD / EUR)<br>✔ Factura o comprobante incluido<br><br>Atendemos clientes en Chile, España, Colombia, Ecuador y todo el mundo.`,
    en: `Simple and secure payment process:<br><br>✔ <strong>Advance payment</strong> at project start<br>✔ <strong>PayPal</strong> for international payments (USD / EUR)<br>✔ Invoice or receipt always provided<br><br>Clients in Chile, Spain, Colombia, Ecuador and worldwide.`,
    pt: `Processo de pagamento simples e seguro:<br><br>✔ <strong>Pagamento antecipado</strong> no início do projeto<br>✔ <strong>PayPal</strong> para pagamentos internacionais (USD / EUR)<br>✔ Fatura ou recibo incluído<br><br>Clientes no Chile, Espanha, Colômbia, Equador e mundo todo.`,
    fr: `Processus de paiement simple et sécurisé:<br><br>✔ <strong>Paiement anticipé</strong> au début du projet<br>✔ <strong>PayPal</strong> pour les paiements internationaux (USD / EUR)<br>✔ Facture ou reçu fourni<br><br>Clients au Chili, Espagne, Colombie, Équateur et dans le monde entier.`,
    de: `Einfacher und sicherer Zahlungsablauf:<br><br>✔ <strong>Vorauszahlung</strong> zu Beginn des Projekts<br>✔ <strong>PayPal</strong> für internationale Zahlungen (USD / EUR)<br>✔ Rechnung oder Quittung inklusive<br><br>Kunden in Chile, Spanien, Kolumbien, Ecuador und weltweit.`,
    it: `Processo di pagamento semplice e sicuro:<br><br>✔ <strong>Pagamento anticipato</strong> all'inizio del progetto<br>✔ <strong>PayPal</strong> per pagamenti internazionali (USD / EUR)<br>✔ Fattura o ricevuta inclusa<br><br>Clienti in Cile, Spagna, Colombia, Ecuador e in tutto il mondo.`,
    zh: `简单安全的付款流程：<br><br>✔ 项目开始时<strong>预付款</strong><br>✔ <strong>PayPal</strong>国际支付（USD / EUR）<br>✔ 始终提供发票或收据<br><br>服务智利、西班牙、哥伦比亚、厄瓜多尔及全球客户。`,
    ar: `عملية دفع بسيطة وآمنة:<br><br>✔ <strong>دفع مسبق</strong> عند بداية المشروع<br>✔ <strong>PayPal</strong> للمدفوعات الدولية (USD / EUR)<br>✔ فاتورة أو إيصال مضمون<br><br>عملاء في تشيلي وإسبانيا وكولومبيا والإكوادور وحول العالم.`,
    ru: `Простой и безопасный процесс оплаты:<br><br>✔ <strong>Предоплата</strong> в начале проекта<br>✔ <strong>PayPal</strong> для международных платежей (USD / EUR)<br>✔ Счёт-фактура или квитанция включены<br><br>Клиенты в Чили, Испании, Колумбии, Эквадоре и по всему миру.`,
  },
  {
    keys: ['donde','dónde','país','country','donde operan','location','locations','onde','où','wo','dove','在哪里','أين','где','remote','remoto'],
    es: `Operamos <strong>100% de forma remota</strong> en todo el mundo.<br><br>Clientes activos en:<br><strong>Chile · España · Colombia · Ecuador · Perú · México · Argentina</strong><br><br>Todo el trabajo se entrega digitalmente. Reuniones por videollamada, entrega de archivos y comunicación fluida sin importar el país.`,
    en: `We operate <strong>100% remotely</strong> worldwide.<br><br>Active clients in:<br><strong>Chile · Spain · Colombia · Ecuador · Peru · Mexico · Argentina</strong><br><br>All work delivered digitally. Video calls, file delivery, seamless communication anywhere.`,
    pt: `Operamos <strong>100% remotamente</strong> em todo o mundo.<br><br>Clientes ativos em:<br><strong>Chile · Espanha · Colômbia · Equador · Peru · México · Argentina</strong><br><br>Tudo entregue digitalmente. Videochamadas, entrega de arquivos, comunicação fluente em qualquer país.`,
    fr: `Nous opérons <strong>100% à distance</strong> dans le monde entier.<br><br>Clients actifs dans:<br><strong>Chili · Espagne · Colombie · Équateur · Pérou · Mexique · Argentine</strong><br><br>Tout livré numériquement. Appels vidéo, livraison de fichiers, communication fluide partout.`,
    de: `Wir arbeiten <strong>100% remote</strong> weltweit.<br><br>Aktive Kunden in:<br><strong>Chile · Spanien · Kolumbien · Ecuador · Peru · Mexiko · Argentinien</strong><br><br>Alles digital geliefert. Videoanrufe, Dateiübertragung, reibungslose Kommunikation überall.`,
    it: `Operiamo <strong>100% da remoto</strong> in tutto il mondo.<br><br>Clienti attivi in:<br><strong>Cile · Spagna · Colombia · Ecuador · Perù · Messico · Argentina</strong><br><br>Tutto consegnato digitalmente. Videochiamate, consegna file, comunicazione fluente ovunque.`,
    zh: `我们在全球<strong>100%远程</strong>运营。<br><br>活跃客户：<br><strong>智利 · 西班牙 · 哥伦比亚 · 厄瓜多尔 · 秘鲁 · 墨西哥 · 阿根廷</strong><br><br>所有工作数字化交付。视频通话，文件交付，任何地方无缝沟通。`,
    ar: `نعمل <strong>100% عن بُعد</strong> في جميع أنحاء العالم.<br><br>عملاء نشطون في:<br><strong>تشيلي · إسبانيا · كولومبيا · إكوادور · بيرو · المكسيك · الأرجنتين</strong><br><br>جميع الأعمال تُسلَّم رقمياً. مكالمات فيديو وتسليم ملفات في أي مكان.`,
    ru: `Мы работаем <strong>100% удалённо</strong> по всему миру.<br><br>Активные клиенты в:<br><strong>Чили · Испания · Колумбия · Эквадор · Перу · Мексика · Аргентина</strong><br><br>Всё доставляется цифровым способом. Видеозвонки, передача файлов, связь везде.`,
  },
];

// ── Engine ─────────────────────────────────────
let vbLang = 'es';
let vbChatOpen = false;
let vbStarted = false;

function vbGetLang(code) {
  return T.chips[code] ? code : 'en';
}

function vbOpen() {
  document.getElementById('vbCard').classList.remove('show');
  vbToggleChat(true);
}

function vbToggleChat(forceOpen) {
  vbChatOpen = forceOpen !== undefined ? forceOpen : !vbChatOpen;
  document.getElementById('vbChat').classList.toggle('show', vbChatOpen);
  if (vbChatOpen && !vbStarted) {
    vbStarted = true;
    setTimeout(() => {
      vbAddMsg('vane', T.greeting[vbLang] || T.greeting.en);
      setTimeout(vbRenderChips, 700);
    }, 350);
  }
  if (vbChatOpen) setTimeout(() => { const i = document.getElementById('vbInput'); if(i) i.focus(); }, 400);
}

function vbCloseCard() { document.getElementById('vbCard').classList.remove('show'); }

function vbGetImg() {
  const img = document.querySelector('.vb-trigger__av img');
  return img ? img.src : '';
}

function vbAddMsg(who, html) {
  const msgs = document.getElementById('vbMsgs');
  const div = document.createElement('div');
  div.className = `vb-msg vb-msg--${who}`;
  const src = vbGetImg();
  div.innerHTML = who === 'vane'
    ? `<div class="vb-msg__av">${src ? `<img src="${src}" alt="Vane"/>` : ''}</div><div class="vb-msg__bubble">${html}</div>`
    : `<div class="vb-msg__bubble">${html}</div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function vbTyping(cb) {
  const msgs = document.getElementById('vbMsgs');
  const t = document.createElement('div');
  t.className = 'vb-msg vb-msg--vane'; t.id = 'vbTyping';
  const src = vbGetImg();
  t.innerHTML = `<div class="vb-msg__av">${src ? `<img src="${src}" alt="Vane"/>` : ''}</div><div class="vb-typing"><span></span><span></span><span></span></div>`;
  msgs.appendChild(t);
  msgs.scrollTop = msgs.scrollHeight;
  setTimeout(() => {
    const el = document.getElementById('vbTyping');
    if (el) el.remove();
    cb();
    msgs.scrollTop = msgs.scrollHeight;
  }, 950);
}

function vbRenderChips() {
  const chips = document.getElementById('vbChips');
  if (!chips) return;
  const lang = vbGetLang(vbLang);
  const labels = T.chips[lang];
  const keys = ['precio','tesis','empresa','plazo','pago','donde'];
  chips.innerHTML = labels.map((l, i) =>
    `<button class="vb-chip" onclick="vbQuick('${keys[i]}','${l}')">${l}</button>`
  ).join('');
}

function vbQuick(key, label) {
  document.getElementById('vbChips').innerHTML = '';
  vbCloseCard();
  if (!vbChatOpen) vbToggleChat(true);
  setTimeout(() => {
    if (!vbStarted) {
      vbStarted = true;
      vbAddMsg('vane', T.greeting[vbLang] || T.greeting.en);
    }
    setTimeout(() => {
      vbAddMsg('user', label);
      const match = VB_KB.find(item => item.keys.includes(key));
      vbTyping(() => {
        const lang = vbGetLang(vbLang);
        vbAddMsg('vane', match ? (match[lang] || match.en) : (T.fallback[lang] || T.fallback.en));
        setTimeout(vbRenderChips, 500);
      });
    }, 400);
  }, 350);
}

function vbSend() {
  const inp = document.getElementById('vbInput');
  const text = inp.value.trim();
  if (!text) return;
  inp.value = '';
  vbLang = vbDetectLang(text);
  document.getElementById('vbChips').innerHTML = '';
  vbAddMsg('user', text);
  const lower = text.toLowerCase();
  const match = VB_KB.find(item => item.keys.some(k => lower.includes(k)));
  const lang = vbGetLang(vbLang);
  vbTyping(() => {
    vbAddMsg('vane', match ? (match[lang] || match.en) : (T.fallback[lang] || T.fallback.en));
    setTimeout(vbRenderChips, 500);
  });
}

// Show card after 4s
setTimeout(() => {
  const card = document.getElementById('vbCard');
  if (card && !vbChatOpen) card.classList.add('show');
}, 4000);

// Wave
setTimeout(() => {
  const wave = document.getElementById('vbWave');
  if (wave) {
    wave.style.opacity = '1';
    wave.style.animation = 'vbWave 1.3s ease-in-out 3';
    setTimeout(() => { wave.style.opacity = '0'; }, 4500);
  }
}, 1200);


/* Animación de barras y cifras: se activa al entrar en pantalla */
(function () {
  const section = document.querySelector('.impacto__bars');
  if (!section) return;
  let played = false;
  const animate = () => {
    if (played) return;
    played = true;
    section.querySelectorAll('.bar-fill').forEach((bar, i) => {
      const width = Number(bar.dataset.width || 0);
      window.setTimeout(() => { bar.style.width = Math.max(0, Math.min(100, width)) + '%'; }, i * 140);
    });
    section.querySelectorAll('.count-up').forEach((node) => {
      const target = Number(node.dataset.target || 0);
      const duration = target > 100 ? 1700 : 1200;
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        node.textContent = Math.round(target * eased).toLocaleString('es-ES');
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  };
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some(entry => entry.isIntersecting)) {
        animate();
        observer.disconnect();
      }
    }, { threshold: 0.22 });
    observer.observe(section);
  } else {
    animate();
  }
})();


// Compatibility fix for the animated indicators: trigger once the bars enter the viewport.
(function () {
  const section = document.querySelector('.impacto__bars');
  if (!section) return;
  const animateIndicators = () => {
    section.classList.add('is-animated');
    section.querySelectorAll('.bar-fill').forEach((bar, index) => {
      const width = Math.min(100, Math.max(0, Number(bar.dataset.width || 0)));
      bar.style.setProperty('--bar-width', width + '%');
      window.setTimeout(() => { bar.style.width = width + '%'; }, index * 130);
    });
  };
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        animateIndicators();
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(section);
  } else {
    animateIndicators();
  }
})();
