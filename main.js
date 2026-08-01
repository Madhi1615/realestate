/* =========================================================
   KIEZWERK IMMOBILIEN — main.js
   No script here runs any non-essential/tracking code.
   Anything non-essential (e.g. the Google Maps embed on the
   contact page) is gated behind explicit user consent below.
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  initNav();
  initCookieConsent();
  initPropertyFilters();
  initMapLoader();
  setActiveNav();
});

/* ---------- Mobile nav ---------- */
function initNav() {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (!toggle || !links) return;
  toggle.addEventListener("click", function () {
    var open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  links.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setActiveNav() {
  var path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    var href = a.getAttribute("href");
    if (href === path) a.setAttribute("aria-current", "page");
  });
}

/* ---------- Property filters (client-side, no data leaves the browser) ---------- */
function initPropertyFilters() {
  var buttons = document.querySelectorAll(".filter-btn");
  var cards = document.querySelectorAll(".property-card");
  if (!buttons.length) return;
  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      buttons.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var kiez = btn.getAttribute("data-kiez");
      cards.forEach(function (card) {
        var match = kiez === "alle" || card.getAttribute("data-kiez") === kiez;
        card.style.display = match ? "" : "none";
      });
    });
  });
}

/* =========================================================
   COOKIE CONSENT
   Categories:
   - essential: always on, no toggle (session/consent storage only)
   - maps: loads the embedded Google Maps iframe on /kontakt.html
   Nothing is loaded and no cookie other than the consent choice
   itself is set until the visitor actively opts in.
   ========================================================= */
var CONSENT_KEY = "kiezwerk_consent_v1";

function getConsent() {
  try {
    var raw = localStorage.getItem(CONSENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function setConsent(consent) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  } catch (e) { /* storage unavailable — banner will just reappear next visit */ }
  document.dispatchEvent(new CustomEvent("kiezwerk:consent", { detail: consent }));
}

function initCookieConsent() {
  var banner = document.getElementById("cookie-banner");
  var modal = document.getElementById("cookie-modal");
  if (!banner) return;

  var acceptBtn = document.getElementById("cookie-accept");
  var declineBtn = document.getElementById("cookie-decline");
  var settingsBtn = document.getElementById("cookie-settings");
  var modalSave = document.getElementById("cookie-modal-save");
  var modalAcceptAll = document.getElementById("cookie-modal-accept-all");
  var modalClose = document.getElementById("cookie-modal-close");
  var mapsToggle = document.getElementById("consent-maps");
  var footerLink = document.getElementById("footer-cookie-settings");

  var existing = getConsent();
  if (!existing) {
    banner.classList.add("visible");
  }

  function closeModal() { modal.classList.remove("visible"); }
  function openModal() {
    var current = getConsent() || { maps: false };
    if (mapsToggle) mapsToggle.checked = !!current.maps;
    modal.classList.add("visible");
  }

  if (acceptBtn) acceptBtn.addEventListener("click", function () {
    setConsent({ essential: true, maps: true, ts: Date.now() });
    banner.classList.remove("visible");
  });

  if (declineBtn) declineBtn.addEventListener("click", function () {
    setConsent({ essential: true, maps: false, ts: Date.now() });
    banner.classList.remove("visible");
  });

  if (settingsBtn) settingsBtn.addEventListener("click", openModal);
  if (footerLink) footerLink.addEventListener("click", function (e) {
    e.preventDefault();
    openModal();
    banner.classList.add("visible");
  });
  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modalSave) modalSave.addEventListener("click", function () {
    setConsent({ essential: true, maps: mapsToggle ? mapsToggle.checked : false, ts: Date.now() });
    closeModal();
    banner.classList.remove("visible");
  });
  if (modalAcceptAll) modalAcceptAll.addEventListener("click", function () {
    setConsent({ essential: true, maps: true, ts: Date.now() });
    closeModal();
    banner.classList.remove("visible");
  });
}

/* ---------- Click-to-load map (only after consent) ---------- */
function initMapLoader() {
  var placeholder = document.getElementById("map-placeholder");
  if (!placeholder) return;
  var loadBtn = document.getElementById("map-load-btn");

  function renderMap() {
    var iframe = document.createElement("iframe");
    iframe.className = "map-frame";
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    iframe.title = "Standort KIEZWERK Immobilien auf der Karte";
    iframe.src = "https://www.google.com/maps?q=Torstra%C3%9Fe+Berlin&output=embed";
    placeholder.innerHTML = "";
    placeholder.appendChild(iframe);
  }

  var consent = getConsent();
  if (consent && consent.maps) renderMap();

  if (loadBtn) {
    loadBtn.addEventListener("click", function () {
      var c = getConsent() || {};
      c.essential = true;
      c.maps = true;
      c.ts = Date.now();
      setConsent(c);
      renderMap();
    });
  }

  document.addEventListener("kiezwerk:consent", function (e) {
    if (e.detail && e.detail.maps) renderMap();
  });
}

/* ---------- Contact form ---------- */
function initContactForm() {
  var form = document.getElementById("contact-form");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    var consentBox = document.getElementById("consent-checkbox");
    if (consentBox && !consentBox.checked) {
      e.preventDefault();
      alert("Bitte bestätigen Sie die Datenschutzhinweise, bevor Sie das Formular senden.");
    }
  });
}
document.addEventListener("DOMContentLoaded", initContactForm);
