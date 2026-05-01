const SITE_PARTIALS = {
  header: {
    targetId: "siteHeader",
    path: "./header.html"
  },
  footer: {
    targetId: "siteFooter",
    path: "./footer.html"
  }
};

document.addEventListener("DOMContentLoaded", initSite);

async function initSite() {
  await Promise.all([
    mountPartial(SITE_PARTIALS.header),
    mountPartial(SITE_PARTIALS.footer)
  ]);

  setActiveNavLink();
  initNavToggle();
  syncFooterYear();
  closeNavOnResize();
  closeNavOnLinkClick();
  closeNavOnEscape();
}

async function mountPartial({ targetId, path }) {
  const target = document.getElementById(targetId);
  if (!target) return;

  try {
    const response = await fetch(path, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Failed to load ${path}: ${response.status}`);
    }

    const markup = await response.text();
    target.innerHTML = markup;
  } catch (error) {
    console.error(error);
    target.innerHTML = "";
  }
}

function setActiveNavLink() {
  const page = document.body?.dataset?.page;
  if (!page) return;

  const navLinks = document.querySelectorAll("[data-nav]");
  navLinks.forEach((link) => {
    const isActive = link.dataset.nav === page;
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("siteNav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const nextState = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(nextState));
    nav.classList.toggle("is-open", nextState);
    document.body.classList.toggle("nav-open", nextState);
  });
}

function closeNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("siteNav");
  if (!toggle || !nav) return;

  toggle.setAttribute("aria-expanded", "false");
  nav.classList.remove("is-open");
  document.body.classList.remove("nav-open");
}

function closeNavOnResize() {
  window.addEventListener("resize", () => {
    if (window.innerWidth > 960) {
      closeNav();
    }
  });
}

function closeNavOnLinkClick() {
  document.addEventListener("click", (event) => {
    const link = event.target.closest("#siteNav a");
    if (!link) return;
    closeNav();
  });
}

function closeNavOnEscape() {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNav();
    }
  });
}

function syncFooterYear() {
  const yearNode = document.getElementById("footerYear");
  if (!yearNode) return;
  yearNode.textContent = String(new Date().getFullYear());
}
