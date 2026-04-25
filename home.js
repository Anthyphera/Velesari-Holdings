async function loadHomePage() {
  try {
    const response = await fetch("./data/home.json", { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Failed to load home.json: ${response.status}`);
    }

    const data = await response.json();
    renderHomePage(data);
  } catch (error) {
    console.error(error);
    renderHomePageError();
  }
}

function renderHomePage(data) {
  renderHero(data.hero);
  renderMethod(data.method);
  renderRevenue(data.revenue);
  renderDomains(data.domains);
  renderNameMeaning(data.nameMeaning);
  renderPrinciples(data.principles);
  renderCta(data.cta);
}

function renderHero(hero) {
  setText("heroEyebrow", hero.eyebrow);
  setText("heroTitle", hero.title);
  setText("heroSubtitle", hero.subtitle);
  setText("heroBody", hero.body);
  renderActions("heroActions", hero.actions);
}

function renderMethod(method) {
  setText("methodEyebrow", method.eyebrow);
  setText("methodTitle", method.title);
  setText("methodIntro", method.intro);
  renderCards("methodSteps", method.steps);
}

function renderRevenue(revenue) {
  setText("revenueEyebrow", revenue.eyebrow);
  setText("revenueTitle", revenue.title);
  setText("revenueIntro", revenue.intro);
  renderCards("revenuePillars", revenue.pillars);
}

function renderDomains(domains) {
  setText("domainsEyebrow", domains.eyebrow);
  setText("domainsTitle", domains.title);
  setText("domainsIntro", domains.intro);
  renderCards("domainGrid", domains.items);
}

function renderNameMeaning(nameMeaning) {
  setText("nameEyebrow", nameMeaning.eyebrow);
  setText("nameTitle", nameMeaning.title);
  setText("nameBody", nameMeaning.body);
}

function renderPrinciples(principles) {
  setText("principlesEyebrow", principles.eyebrow);
  setText("principlesTitle", principles.title);
  setText("principlesIntro", principles.intro);
  renderCards("principlesList", principles.items);
}

function renderCta(cta) {
  setText("ctaEyebrow", cta.eyebrow);
  setText("ctaTitle", cta.title);
  setText("ctaBody", cta.body);
  renderActions("ctaActions", cta.actions);
}

function renderCards(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container || !Array.isArray(items)) return;

  const fragment = document.createDocumentFragment();

  items.forEach((item) => {
    const article = document.createElement("article");
    article.className = "card";
    article.setAttribute("role", "listitem");

    const title = document.createElement("h3");
    title.className = "card-title";
    title.textContent = item.title ?? "";

    const body = document.createElement("p");
    body.className = "card-body";
    body.textContent = item.body ?? "";

    article.appendChild(title);
    article.appendChild(body);
    fragment.appendChild(article);
  });

  container.replaceChildren(fragment);
}

function renderActions(containerId, actions) {
  const container = document.getElementById(containerId);
  if (!container || !Array.isArray(actions)) return;

  const fragment = document.createDocumentFragment();

  actions.forEach((action) => {
    const link = document.createElement("a");
    link.className = getActionClassName(action.variant);
    link.href = action.href ?? "#";
    link.textContent = action.label ?? "";

    if (isExternalLink(action.href)) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }

    fragment.appendChild(link);
  });

  container.replaceChildren(fragment);
}

function getActionClassName(variant) {
  if (variant === "secondary") {
    return "button button-secondary";
  }

  return "button button-primary";
}

function setText(elementId, value) {
  const element = document.getElementById(elementId);
  if (!element) return;
  element.textContent = value ?? "";
}

function isExternalLink(href) {
  return typeof href === "string" && /^(https?:)?\/\//i.test(href);
}

function renderHomePageError() {
  setText("heroEyebrow", "Velesari Holdings");
  setText("heroTitle", "Home");
  setText("heroSubtitle", "Content unavailable");
  setText(
    "heroBody",
    "Velesari Holdings content could not be loaded. Please try again later."
  );

  clearContainer("heroActions");
  clearContainer("methodSteps");
  clearContainer("revenuePillars");
  clearContainer("domainGrid");
  clearContainer("principlesList");
  clearContainer("ctaActions");
}

function clearContainer(elementId) {
  const element = document.getElementById(elementId);
  if (!element) return;
  element.replaceChildren();
}

document.addEventListener("DOMContentLoaded", loadHomePage);
