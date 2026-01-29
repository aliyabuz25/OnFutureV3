const SECTION_TARGETS = [
  { id: "hero-container", path: "/sections/hero.html" },
  { id: "hero-container2", path: "/sections/hero sec.html" },
  { id: "hero-container3", path: "/sections/hero3.html" },
  { id: "hero-container4", path: "/sections/hero4.html" },
  { id: "results-container", path: "/sections/results.html" },
  { id: "services-container", path: "/sections/services.html" },
  { id: "study-container", path: "/sections/study.html" },
  { id: "visas-container", path: "/sections/visas.html" },
  { id: "tech-container", path: "/sections/tech.html" },
  { id: "scholarship-banner-container", path: "/sections/scholarship-banner.html" },
  { id: "academy-tech-container", path: "/sections/academy-tech.html" },
  { id: "scholarship-container", path: "/sections/scholarship.html" },
  { id: "faq-container", path: "/sections/faq.html" },
  { id: "footer-container", path: "/sections/footer.html" },
];

document.addEventListener("DOMContentLoaded", () => {
  loadSections()
    .then(initPage)
    .catch((error) => console.error("Section load failed", error));
});

async function loadSections() {
  for (const { id, path } of SECTION_TARGETS) {
    const container = document.getElementById(id);
    if (!container) continue;
    const response = await fetch(path);
    if (!response.ok) continue;
    container.innerHTML = await response.text();
  }
}

function initPage() {
  const dropdown = document.querySelector(".dropdown");
  if (!dropdown) return;
  const navLinks = document.querySelectorAll(".nav-link");
  const toggle = dropdown.querySelector('[data-bs-toggle="dropdown"]');
  const menu = dropdown.querySelector(".dropdown-menu");
  const arrowIcon = toggle?.querySelector(".dropdown-arrow-icon");
  const languageLabel = dropdown.querySelector(".language-label");
  const languageFlag = dropdown.querySelector(".language-flag");
  const languageButtons = dropdown.querySelectorAll(".dropdown-item");
  const hero = document.getElementById("hero");
  const globe = document.querySelector(".globe-wrap");
  const ellipse = document.querySelector(".ellipse");
  const heroElementWrap = document.querySelector(".hero-element-wrap");
  let heroElement = heroElementWrap?.querySelector(".hero-element");
  let heroElementAnimating = false;
  const studyTabs = document.querySelectorAll(".study-tab");
  const studyCards = document.querySelectorAll(".study-card");
  const techTabs = document.querySelectorAll(".tech-tab");
  const techGrids = document.querySelectorAll(".tech-grid");
  const techProgramsGrid = document.querySelector('.tech-grid[data-tab="tech"]');
  const faqItems = document.querySelectorAll(".faq-item");

  const LANGUAGE_MAP = {
    AZE: "az",
    USA: "en",
  };
  const DEFAULT_LANGUAGE = "AZE";
  const getI18nNodes = () => document.querySelectorAll("[data-i18n-key]");
  const translationCache = {};

  const formatStudyDescriptions = () => {
    document.querySelectorAll(".study-card-desc").forEach((desc) => {
      const text = desc.textContent?.trim() || "";
      const match = text.match(/\s[-–—]\s/);
      if (!match || typeof match.index !== "number") return;
      const separator = match[0];
      const index = match.index;
      const prefix = text.slice(0, index);
      const suffix = text.slice(index + separator.length);
      desc.innerHTML = "";
      const strong = document.createElement("span");
      strong.className = "study-card-desc-strong";
      strong.textContent = prefix;
      const sep = document.createElement("span");
      sep.className = "study-card-desc-sep";
      sep.textContent = separator;
      const detail = document.createElement("span");
      detail.className = "study-card-desc-detail";
      detail.textContent = suffix;
      desc.append(strong, sep, detail);
    });
  };

  const applyTranslations = (dictionary) => {
    getI18nNodes().forEach((element) => {
      const key = element.dataset.i18nKey;
      const translation = dictionary[key];
      if (typeof translation === "string") {
        element.textContent = translation;
      }
    });
    formatStudyDescriptions();
  };

  const addProgram = (
    badgetext,
    title,
    img,
    desc,
    lessoncoynt,
    { badgeKey, titleKey, descKey, lessonsKey = "tech.lessonCount", applyKey = "tech.apply" } = {}
  ) => {
    const card = document.createElement("div");
    card.className = "tech-card";

    const chip = document.createElement("div");
    chip.className = "tech-chip";
    chip.textContent = badgetext;
    if (badgeKey) chip.dataset.i18nKey = badgeKey;

    const heading = document.createElement("h3");
    heading.textContent = title;
    if (titleKey) heading.dataset.i18nKey = titleKey;

    const media = document.createElement("div");
    media.className = "tech-media";
    const image = document.createElement("img");
    image.src = img;
    image.alt = badgetext;
    media.appendChild(image);

    const description = document.createElement("p");
    description.className = "tech-desc";
    description.textContent = desc;
    if (descKey) description.dataset.i18nKey = descKey;

    const footer = document.createElement("div");
    footer.className = "tech-footer";

    const lessons = document.createElement("div");
    lessons.className = "tech-lessons";
    const icon = document.createElement("img");
    icon.src = "/elements/book.svg";
    icon.alt = "Book icon";
    icon.width = 20;
    icon.height = 20;
    const lessonSpan = document.createElement("span");
    lessonSpan.textContent = lessoncoynt;
    if (lessonsKey) lessonSpan.dataset.i18nKey = lessonsKey;
    lessons.append(icon, lessonSpan);

    const button = document.createElement("button");
    button.className = "tech-apply";
    button.type = "button";
    button.textContent = "Müraciət et";
    if (applyKey) button.dataset.i18nKey = applyKey;

    footer.append(lessons, button);
    card.append(chip, heading, media, description, footer);
    return card;
  };

  if (techProgramsGrid) {
    const programs = [
      {
        badge: "DevOps",
        badgeKey: "tech.card1.chip",
        title: "DevOps Mühəndisliyi Kursu – CI/CD və Cloud əsasları",
        titleKey: "tech.card1.title",
        img: "/tedris/devops.png",
        desc: "Layihələrdə etibarlı yerləşdirmə üçün pipeline-lar, avtomatlaşdırma və bulud əsaslarını öyrənin.",
        descKey: "tech.card1.desc",
        lessons: "12 dərs",
      },
      {
        badge: "UI/UX Design",
        badgeKey: "tech.card2.chip",
        title: "UX/UI Dizayn Kursu – İstifadəçi təcrübəsi və interfeys dizaynı",
        titleKey: "tech.card2.title",
        img: "/tedris/uxui.png",
        desc: "Araşdırma, wireframe, prototipləmə və təhvil prosesini öyrənin.",
        descKey: "tech.card2.desc",
        lessons: "12 dərs",
      },
      {
        badge: "Q/A Assurance",
        badgeKey: "tech.card3.chip",
        title: "QA Təlimi – Manual və avtomatlaşdırılmış testlər",
        titleKey: "tech.card3.title",
        img: "/tedris/qa.png",
        desc: "Manual, avtomatlaşdırılmış və CI inteqrasiyalı test intizamı qurun.",
        descKey: "tech.card3.desc",
        lessons: "12 dərs",
      },
    ];
    const fragment = document.createDocumentFragment();
    programs.forEach((program) => {
      fragment.append(
        addProgram(
          program.badge,
          program.title,
          program.img,
          program.desc,
          program.lessons,
          {
            badgeKey: program.badgeKey,
            titleKey: program.titleKey,
            descKey: program.descKey,
          }
        )
      );
    });
    techProgramsGrid.insertBefore(fragment, techProgramsGrid.firstChild);
  }

  const loadTranslationFile = async (code) => {
    if (translationCache[code]) {
      return translationCache[code];
    }
    try {
      const response = await fetch(`${code}.json`);
      if (!response.ok) {
        throw new Error(`Unable to fetch ${code}.json`);
      }
      const data = await response.json();
      translationCache[code] = data;
      return data;
    } catch (error) {
      console.error(error);
      return {};
    }
  };

  const setLanguage = (code) => {
    loadTranslationFile(code).then((dictionary) => {
      applyTranslations(dictionary);
    });
  };

  const updateLanguageByAttr = (langAttr) => {
    const normalizedLang = LANGUAGE_MAP[langAttr] || LANGUAGE_MAP[DEFAULT_LANGUAGE];
    setLanguage(normalizedLang);
  };

  const alignEllipses = () => {
    if (!hero || !globe || !ellipse) return;
    const heroRect = hero.getBoundingClientRect();
    const globeRect = globe.getBoundingClientRect();
    const centerX = globeRect.left + globeRect.width / 2 - heroRect.left;
    const centerY =
      globeRect.top + globeRect.height / 2 - heroRect.top - 120; // position ring further upward
    const ellipseSize = globeRect.width + 348;

    ellipse.style.width = `${ellipseSize}px`;
    ellipse.style.height = `${ellipseSize}px`;
    ellipse.style.left = `${centerX}px`;
    ellipse.style.top = `${centerY}px`;
    ellipse.style.transform = "translate(-50%, -50%)";
    ellipse.style.opacity = "1";
  };

  const closeMenu = () => {
    dropdown.classList.remove("show");
    menu?.classList.remove("show");
    toggle?.setAttribute("aria-expanded", "false");
    if (arrowIcon) {
      arrowIcon.src = "/elements/arrow-down.svg";
    }
  };

  const toggleMenu = (event) => {
    event.stopPropagation();
    const isOpen = dropdown.classList.toggle("show");
    if (menu) {
      menu.classList.toggle("show", isOpen);
    }
    toggle?.setAttribute("aria-expanded", isOpen ? "true" : "false");
    if (arrowIcon) {
      arrowIcon.src = isOpen ? "/Navbar/arrow-down.png" : "/elements/arrow-down.svg";
    }
  };

  const handleSelection = (button) => {
    const lang = button.dataset.lang;
    const flag = button.dataset.flag;
    if (lang && languageLabel) {
      languageLabel.textContent = lang;
    }
    if (flag && languageFlag) {
      languageFlag.src = flag;
    }
    languageButtons.forEach((btn) => {
      if (btn === button) {
        btn.setAttribute("aria-current", "true");
      } else {
        btn.removeAttribute("aria-current");
      }
    });
    closeMenu();
    updateLanguageByAttr(lang);
  };

  const enableHeroElementSwap = () => {
    if (!heroElementWrap || !heroElement) return;

    const handleHover = () => {
      if (heroElementAnimating) return;
      heroElementAnimating = true;

      const current = heroElement;
      const incoming = current.cloneNode(true);
      incoming.classList.add("hero-element--incoming");
      heroElementWrap.appendChild(incoming);

      requestAnimationFrame(() => {
        current.classList.add("hero-element--outgoing", "hero-element--outgoing-active");
        incoming.classList.add("hero-element--incoming-active");
      });

      const cleanup = (event) => {
        if (event.target !== current) return;
        current.removeEventListener("transitionend", cleanup);
        current.remove();
        incoming.classList.remove("hero-element--incoming", "hero-element--incoming-active");
        heroElement = incoming;
        heroElementAnimating = false;
        heroElement.addEventListener("mouseenter", handleHover);
      };

      current.addEventListener("transitionend", cleanup);
      current.removeEventListener("mouseenter", handleHover);
    };

    heroElement.addEventListener("mouseenter", handleHover);
  };

  const setupServiceIcons = () => {
    const cards = document.querySelectorAll(".service-card");
    cards.forEach((card) => {
      const icon = card.querySelector(".service-card-icon img");
      if (!icon) return;
      const base = icon.dataset.base || icon.src;
      const hover = icon.dataset.hover || base;
      if (base === hover) return;
      card.addEventListener("mouseenter", () => {
        icon.src = hover;
      });
      card.addEventListener("mouseleave", () => {
        icon.src = base;
      });
    });
  };

  const setupStudyTabs = () => {
    if (!studyTabs.length || !studyCards.length) return;

    const activateDegree = (degree) => {
      studyTabs.forEach((tab) => {
        tab.classList.toggle("active", tab.dataset.degree === degree);
      });
      studyCards.forEach((card) => {
        const match = card.dataset.degree === degree;
        card.classList.toggle("hidden", !match);
      });
    };

    studyTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        activateDegree(tab.dataset.degree || "");
      });
    });

    const initial = document.querySelector(".study-tab.active")?.dataset.degree || studyTabs[0]?.dataset.degree;
    if (initial) activateDegree(initial);
  };

  const setupTechTabs = () => {
    if (!techTabs.length || !techGrids.length) return;

    const activateTab = (tabName) => {
      techTabs.forEach((tab) => {
        tab.classList.toggle("active", tab.dataset.tab === tabName);
      });
      techGrids.forEach((grid) => {
        grid.classList.toggle("active", grid.dataset.tab === tabName);
      });
    };

    techTabs.forEach((tab) => {
      tab.addEventListener("click", () => activateTab(tab.dataset.tab || ""));
    });

    const initial = document.querySelector(".tech-tab.active")?.dataset.tab || techTabs[0]?.dataset.tab;
    if (initial) activateTab(initial);
  };

  const setupFaq = () => {
    if (!faqItems.length) return;

    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");
      const icon = question?.querySelector(".faq-icon");
      if (!question || !answer) return;
      // Reset to closed state on load
      item.classList.remove("open");
      question.setAttribute("aria-expanded", "false");
      if (icon) icon.textContent = "+";
      question.addEventListener("click", () => {
        const isOpen = item.classList.toggle("open");
        question.setAttribute("aria-expanded", isOpen ? "true" : "false");
        if (icon) icon.textContent = isOpen ? "-" : "+";
      });
    });
  };

  languageButtons.forEach((btn) => {
    btn.addEventListener("click", () => handleSelection(btn));
  });

  updateLanguageByAttr(DEFAULT_LANGUAGE);
  alignEllipses();
  window.addEventListener("resize", alignEllipses);
  enableHeroElementSwap();
  setupServiceIcons();
  setupStudyTabs();
  setupTechTabs();
  setupFaq();

  toggle?.addEventListener("click", toggleMenu);
  menu?.addEventListener("click", (event) => event.stopPropagation());
  document.addEventListener("click", closeMenu);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
  setActiveNavByPath(navLinks);
}

function setActiveNavByPath(navLinks) {
  if (!navLinks || !navLinks.length) return;
  navLinks.forEach((link) => link.classList.remove("active"));
  const path = decodeURIComponent(window.location.pathname);
  let targetIndex = 0;
  if (path.includes("/pages/Təhsil.html")) {
    targetIndex = 1;
  } else if (path.includes("/pages/Akademiya.html")) {
    targetIndex = 2;
  } else if (path.includes("/pages/Eleqa.html")) {
    targetIndex = 3;
  }
  navLinks[targetIndex]?.classList.add("active");
}
