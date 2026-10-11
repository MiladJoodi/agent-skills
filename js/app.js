(function () {
  "use strict";

  function inPagesDir() {
    var path = (window.location.pathname || "").replace(/\\/g, "/");
    return /\/pages\//.test(path) || /skill\.html$/i.test(path);
  }

  function rootPrefix() {
    return inPagesDir() ? "../" : "";
  }

  function pageHref(relativeFromRoot) {
    return rootPrefix() + relativeFromRoot.replace(/^\//, "");
  }

  function skillMdHref(slug) {
    return pageHref("skills/" + slug + "/SKILL.md");
  }

  function skillBundleHref(skill) {
    if (!skill || !skill.bundle) return "";
    var slug = skill.slug || skill.id;
    var name = String(skill.bundle).replace(/^\/+/, "");
    return pageHref("skills/" + slug + "/" + name);
  }

  function loadCatalog() {
    var data = window.SKILLS_CATALOG;
    if (!data || !Array.isArray(data.skills) || !Array.isArray(data.categories)) {
      throw new Error("SKILLS_CATALOG missing — load js/skills-data.js first");
    }
    var map = {};
    data.categories.forEach(function (category) {
      map[category.id] = category;
    });
    return {
      categories: data.categories,
      skills: data.skills,
      categoryMap: map,
    };
  }

  function categoryName(catalog, categoryId) {
    return (catalog.categoryMap[categoryId] && catalog.categoryMap[categoryId].name) || categoryId;
  }

  function getSkillBySlug(catalog, slug) {
    if (!slug) return null;
    var needle = String(slug).toLowerCase();
    for (var i = 0; i < catalog.skills.length; i++) {
      var skill = catalog.skills[i];
      if (
        (skill.slug && skill.slug.toLowerCase() === needle) ||
        (skill.id && skill.id.toLowerCase() === needle)
      ) {
        return skill;
      }
    }
    return null;
  }

  function normalize(value) {
    return String(value || "")
      .toLowerCase()
      .trim();
  }

  function matchesQuery(skill, query) {
    var q = normalize(query);
    if (!q) return true;
    var haystack = [
      skill.name,
      skill.nameFa,
      skill.nameEn,
      skill.slug,
      skill.id,
      skill.summary,
      skill.description,
      skill.whenToUse,
      skill.category,
      skill.source,
      skill.sourceUrl,
    ]
      .concat(skill.tags || [])
      .concat(skill.useCases || [])
      .map(normalize)
      .join(" ");
    return q.split(/\s+/).every(function (token) {
      return haystack.indexOf(token) !== -1;
    });
  }

  function filterSkills(skills, query) {
    return skills.filter(function (skill) {
      return matchesQuery(skill, query);
    });
  }

  function sortSkills(skills) {
    return skills.slice().sort(function (a, b) {
      if (Boolean(a.featured) !== Boolean(b.featured)) {
        return a.featured ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });
  }

  var FARSIUI_SKILLS_URL = "https://farsiui.ir/skills";

  function skillSource(skill) {
    return {
      label: skill.sourceName || "FarsiUI",
      url: skill.sourceUrl || FARSIUI_SKILLS_URL,
    };
  }

  function renderDrawerSource(source, category) {
    if (!drawerEls.sub) return;
    var label = source.label;
    var url = source.url || "";
    drawerEls.sub.innerHTML =
      (url
        ? '<a class="source-verified" href="' +
          escapeHtml(url) +
          '" target="_blank" rel="noopener noreferrer">'
        : '<span class="source-verified">') +
      VERIFY_ICON_SVG +
      "<span>" +
      escapeHtml(label) +
      "</span>" +
      (url ? "</a>" : "</span>") +
      '<span class="drawer-cat">' +
      escapeHtml(category) +
      "</span>";
  }

  var STORAGE_KEY = "agent-skills-theme";

  function initThemeToggle(button) {
    if (!button) return;
    function syncLabel() {
      var theme = document.documentElement.getAttribute("data-theme");
      button.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      );
    }
    syncLabel();
    button.addEventListener("click", function () {
      var current =
        document.documentElement.getAttribute("data-theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light");
      var next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem(STORAGE_KEY, next);
      syncLabel();
    });
  }

  function formatStarCount(n) {
    if (n >= 1000) {
      return (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, "") + "k";
    }
    return String(n);
  }

  function loadGithubStars() {
    var countEl = document.getElementById("github-star-count");
    var link = document.getElementById("github-stars");
    if (!countEl) return;

    fetch("https://api.github.com/repos/MiladJoodi/agent-skills")
      .then(function (response) {
        if (!response.ok) throw new Error("HTTP " + response.status);
        return response.json();
      })
      .then(function (data) {
        var stars = typeof data.stargazers_count === "number" ? data.stargazers_count : 0;
        countEl.textContent = formatStarCount(stars);
        if (link) {
          link.setAttribute("aria-label", stars + " stars on GitHub");
        }
      })
      .catch(function () {
        countEl.textContent = "★";
      });
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function yamlEscape(value) {
    var text = String(value == null ? "" : value).replace(/\s+/g, " ").trim();
    if (!text) return '""';
    if (/[:#{}[\],&*?|>!%@`]/.test(text) || text.indexOf('"') !== -1 || text.indexOf("'") !== -1) {
      return '"' + text.replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"';
    }
    return text;
  }

  function buildSkillMarkdown(skill) {
    var name = skill.slug || skill.id;
    var description =
      skill.activationDescription || skill.summary || skill.description || skill.name;
    return (
      "---\nname: " +
      yamlEscape(name) +
      "\ndescription: " +
      yamlEscape(description) +
      "\n---\n\n# " +
      skill.name +
      "\n\n" +
      (skill.summary || "") +
      "\n"
    );
  }

  function triggerBlobDownload(content, filename, mimeType) {
    var blob =
      content instanceof Blob
        ? content
        : new Blob([content], {
            type: mimeType || "application/octet-stream",
          });
    var url = URL.createObjectURL(blob);
    var anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    anchor.rel = "noopener";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1000);
  }

  function fetchAsBlob(href) {
    var isHttp =
      window.location.protocol === "http:" || window.location.protocol === "https:";
    if (!isHttp) {
      return Promise.reject(new Error("not http"));
    }
    return fetch(href)
      .then(function (response) {
        if (!response.ok) throw new Error("HTTP " + response.status);
        return response.blob();
      });
  }

  function loadSkillMarkdown(skill) {
    var slug = skill.slug || skill.id;
    var href = skillMdHref(slug);
    var isHttp =
      window.location.protocol === "http:" || window.location.protocol === "https:";
    var fallback = buildSkillMarkdown(skill);

    if (!isHttp) {
      return Promise.resolve(fallback);
    }

    return fetch(href)
      .then(function (response) {
        if (!response.ok) throw new Error("HTTP " + response.status);
        return response.text();
      })
      .catch(function () {
        return fallback;
      });
  }

  function downloadSkill(skill) {
    var slug = skill.slug || skill.id;
    var bundleHref = skillBundleHref(skill);
    var bundleName = skill.bundle || slug + ".zip";

    if (bundleHref) {
      fetchAsBlob(bundleHref)
        .then(function (blob) {
          triggerBlobDownload(blob, bundleName, "application/zip");
        })
        .catch(function () {
          var anchor = document.createElement("a");
          anchor.href = bundleHref;
          anchor.download = bundleName;
          document.body.appendChild(anchor);
          anchor.click();
          anchor.remove();
        });
      return;
    }

    loadSkillMarkdown(skill).then(function (text) {
      triggerBlobDownload(text, "SKILL.md", "text/markdown;charset=utf-8");
    });
  }

  function copyText(value, button) {
    var label = button ? button.getAttribute("aria-label") || "Copy" : "Copy";

    function flashCopied() {
      if (!button) return;
      button.classList.add("is-copied");
      button.setAttribute("aria-label", "Copied");
      window.setTimeout(function () {
        button.classList.remove("is-copied");
        button.setAttribute("aria-label", label);
      }, 1400);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(value).then(flashCopied).catch(function () {
        window.prompt("Copy this path:", value);
      });
      return;
    }
    window.prompt("Copy this path:", value);
  }

  var COPY_ICON_SVG =
    '<svg class="copy-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">' +
    '<rect x="8" y="8" width="12" height="12" rx="2" stroke="currentColor" stroke-width="2"/>' +
    '<path d="M4 16V6a2 2 0 0 1 2-2h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
    "</svg>" +
    '<svg class="copied-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">' +
    '<path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>' +
    "</svg>";

  var VERIFY_ICON_SVG =
    '<svg class="source-check" viewBox="0 0 20 20" width="13" height="13" aria-hidden="true" fill="none">' +
    '<circle cx="10" cy="10" r="8.25" stroke="currentColor" stroke-width="1.35"/>' +
    '<path d="M6.2 10.15l2.15 2.15 5.35-5.35" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round"/>' +
    "</svg>";

  /* ---------- Drawer ---------- */

  var drawerEls = {
    root: null,
    backdrop: null,
    panel: null,
    body: null,
    title: null,
    sub: null,
  };

  function cacheDrawer() {
    drawerEls.root = document.getElementById("skill-drawer");
    drawerEls.backdrop = document.getElementById("drawer-backdrop");
    drawerEls.panel = document.getElementById("drawer-panel");
    drawerEls.body = document.getElementById("drawer-body");
    drawerEls.title = document.getElementById("drawer-title");
    drawerEls.sub = document.getElementById("drawer-sub");
  }

  function installTargets(slug) {
    return [
      { id: "claude", label: "Claude Code", path: ".claude/skills/" + slug + "/SKILL.md" },
      { id: "cursor", label: "Cursor", path: ".cursor/skills/" + slug + "/SKILL.md" },
      { id: "codex", label: "Codex", path: ".agents/skills/" + slug + "/SKILL.md" },
    ];
  }

  function openDrawer(skill, catalog) {
    if (!drawerEls.root) return;
    var slug = skill.slug || skill.id;
    var cat = categoryName(catalog, skill.category);
    var targets = installTargets(slug);
    var activeId = "claude";

    drawerEls.title.textContent = skill.name;
    renderDrawerSource(skillSource(skill), cat);

    var hasBundle = Boolean(skill.bundle);
    var downloadLabel = hasBundle ? "Download skill (.zip)" : "Download SKILL.md";
    var installHelp = hasBundle
      ? "Download the zip, extract it, and place the folder in one of the paths below:"
      : "Download the file or create it yourself and place it in one of the paths below:";

    var tabsHtml = targets
      .map(function (target) {
        return (
          '<button type="button" class="install-tab' +
          (target.id === activeId ? " is-active" : "") +
          '" data-install-tab="' +
          target.id +
          '" role="tab" aria-selected="' +
          String(target.id === activeId) +
          '">' +
          escapeHtml(target.label) +
          "</button>"
        );
      })
      .join("");

    var panelsHtml = targets
      .map(function (target) {
        var path = hasBundle
          ? target.path.replace(/\/SKILL\.md$/, "/")
          : target.path;
        return (
          '<div class="install-panel' +
          (target.id === activeId ? " is-active" : "") +
          '" data-install-panel="' +
          target.id +
          '" role="tabpanel"' +
          (target.id === activeId ? "" : " hidden") +
          ">" +
          '<div class="drawer-cmd-row">' +
          "<code>" +
          escapeHtml(path) +
          "</code>" +
          '<button type="button" class="copy-icon-btn" data-copy-path="' +
          escapeHtml(path) +
          '" aria-label="Copy path" title="Copy">' +
          COPY_ICON_SVG +
          "</button>" +
          "</div>" +
          "</div>"
        );
      })
      .join("");

    drawerEls.body.innerHTML =
      '<p class="drawer-summary">' +
      escapeHtml(skill.summary || "") +
      "</p>" +
      '<button type="button" class="btn btn-primary btn-download" id="drawer-download">' +
      escapeHtml(downloadLabel) +
      "</button>" +
      '<section class="drawer-section">' +
      "<h3>Manual install</h3>" +
      '<p class="drawer-help">' +
      escapeHtml(installHelp) +
      "</p>" +
      '<div class="install-tabs" role="tablist">' +
      tabsHtml +
      "</div>" +
      panelsHtml +
      "</section>";

    drawerEls.root.hidden = false;
    document.body.classList.add("drawer-open");
    requestAnimationFrame(function () {
      drawerEls.root.classList.add("is-open");
    });

    document.getElementById("drawer-download").addEventListener("click", function () {
      downloadSkill(skill);
    });

    drawerEls.body.querySelectorAll("[data-install-tab]").forEach(function (tab) {
      tab.addEventListener("click", function () {
        var id = tab.getAttribute("data-install-tab");
        drawerEls.body.querySelectorAll("[data-install-tab]").forEach(function (el) {
          var on = el === tab;
          el.classList.toggle("is-active", on);
          el.setAttribute("aria-selected", String(on));
        });
        drawerEls.body.querySelectorAll("[data-install-panel]").forEach(function (panel) {
          var on = panel.getAttribute("data-install-panel") === id;
          panel.classList.toggle("is-active", on);
          panel.hidden = !on;
        });
      });
    });

    drawerEls.body.querySelectorAll("[data-copy-path]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        copyText(btn.getAttribute("data-copy-path"), btn);
      });
    });

    if (history.replaceState) {
      history.replaceState(null, "", "?id=" + encodeURIComponent(slug));
    }
  }

  function closeDrawer() {
    if (!drawerEls.root || drawerEls.root.hidden) return;
    drawerEls.root.classList.remove("is-open");
    document.body.classList.remove("drawer-open");
    window.setTimeout(function () {
      drawerEls.root.hidden = true;
    }, 220);
    if (history.replaceState) {
      history.replaceState(null, "", window.location.pathname + window.location.hash);
    }
  }

  function initDrawer() {
    cacheDrawer();
    if (!drawerEls.root) return;
    document.getElementById("drawer-close").addEventListener("click", closeDrawer);
    drawerEls.backdrop.addEventListener("click", closeDrawer);
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeDrawer();
    });
  }

  /* ---------- Tree catalog ---------- */

  function groupByCategory(catalog, skills) {
    return catalog.categories
      .map(function (category) {
        var items = sortSkills(
          skills.filter(function (skill) {
            return skill.category === category.id;
          })
        );
        return { category: category, skills: items };
      })
      .filter(function (group) {
        return group.skills.length > 0;
      })
      .sort(function (a, b) {
        return a.category.name.localeCompare(b.category.name, "en", {
          sensitivity: "base",
        });
      });
  }

  function renderTree(catalog) {
    var root = document.getElementById("skills-grid");
    var empty = document.getElementById("empty-state");
    var meta = document.getElementById("results-meta");
    var collapseBtn = document.getElementById("collapse-all");
    var searchInput = document.getElementById("search-input");
    if (!root || !searchInput) return;

    var openState = {};
    catalog.categories.forEach(function (category) {
      openState[category.id] = false;
    });

    function anyOpen() {
      return Object.keys(openState).some(function (id) {
        return openState[id] === true;
      });
    }

    function syncCollapseBtn() {
      if (!collapseBtn) return;
      var active = anyOpen();
      collapseBtn.hidden = false;
      collapseBtn.classList.toggle("is-active", active);
      collapseBtn.disabled = !active;
      collapseBtn.setAttribute(
        "aria-label",
        active ? "Collapse all categories" : "No open categories"
      );
    }

    function collapseAll() {
      Object.keys(openState).forEach(function (id) {
        openState[id] = false;
      });
      root.querySelectorAll(".tree-group.is-open").forEach(function (group) {
        group.classList.remove("is-open");
        var toggle = group.querySelector(".tree-group-toggle");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      });
      syncCollapseBtn();
    }

    function paint() {
      var filtered = filterSkills(catalog.skills, searchInput.value);
      var groups = groupByCategory(catalog, filtered);
      var searching = normalize(searchInput.value).length > 0;

      if (searching) {
        groups.forEach(function (group) {
          openState[group.category.id] = true;
        });
      }

      root.innerHTML = groups
        .map(function (group) {
          var id = group.category.id;
          var open = openState[id] === true;
          var rows = group.skills
            .map(function (skill) {
              var slug = escapeHtml(skill.slug || skill.id);
              return (
                '<li class="tree-skill">' +
                '<button type="button" class="tree-skill-btn" data-open-skill="' +
                slug +
                '">' +
                '<span class="skill-row-icon" aria-hidden="true">' +
                '<svg viewBox="0 0 24 24" width="18" height="18" fill="none">' +
                '<path stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M8 4.5h5.5L18 9v10.5a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-14a1 1 0 0 1 1-1z"/>' +
                '<path stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5V9H18M10 13h4M10 16.5h4"/>' +
                "</svg>" +
                "</span>" +
                '<span class="tree-skill-text">' +
                '<span class="skill-title">' +
                escapeHtml(skill.name) +
                "</span>" +
                "</span>" +
                '<span class="skill-slug">' +
                slug +
                "</span>" +
                "</button>" +
                '<button type="button" class="tree-skill-dl" data-download="' +
                slug +
                '" aria-label="Download ' +
                slug +
                '" title="Download">' +
                '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">' +
                '<path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 4v10m0 0 4-4m-4 4-4-4M5 18h14"/>' +
                "</svg>" +
                "</button>" +
                "</li>"
              );
            })
            .join("");

          return (
            '<li class="tree-group' +
            (open ? " is-open" : "") +
            '" data-category="' +
            escapeHtml(id) +
            '">' +
            '<button type="button" class="tree-group-toggle" aria-expanded="' +
            String(open) +
            '">' +
            '<span class="tree-caret" aria-hidden="true"></span>' +
            '<span class="tree-group-name">' +
            escapeHtml(group.category.name) +
            "</span>" +
            '<span class="tree-group-count">' +
            group.skills.length +
            "</span>" +
            "</button>" +
            '<div class="tree-skills-panel">' +
            '<ul class="tree-skills">' +
            rows +
            "</ul>" +
            "</div>" +
            "</li>"
          );
        })
        .join("");

      if (meta) {
        meta.textContent =
          filtered.length === 1
            ? "1 skill"
            : filtered.length + " skills · " + groups.length + " categories";
      }
      if (empty) empty.hidden = filtered.length > 0;
      syncCollapseBtn();
    }

    if (collapseBtn) {
      collapseBtn.addEventListener("click", collapseAll);
    }

    root.addEventListener("click", function (event) {
      var toggle = event.target.closest(".tree-group-toggle");
      if (toggle) {
        var group = toggle.closest(".tree-group");
        var id = group.dataset.category;
        var next = !group.classList.contains("is-open");
        openState[id] = next;
        group.classList.toggle("is-open", next);
        toggle.setAttribute("aria-expanded", String(next));
        syncCollapseBtn();
        return;
      }

      var downloadBtn = event.target.closest("[data-download]");
      if (downloadBtn) {
        event.stopPropagation();
        var dlSkill = getSkillBySlug(catalog, downloadBtn.dataset.download);
        if (dlSkill) downloadSkill(dlSkill);
        return;
      }

      var openBtn = event.target.closest("[data-open-skill]");
      if (openBtn) {
        var skill = getSkillBySlug(catalog, openBtn.dataset.openSkill);
        if (skill) openDrawer(skill, catalog);
      }
    });

    searchInput.addEventListener("input", paint);
    paint();

    var params = new URLSearchParams(window.location.search);
    var initial = params.get("id") || params.get("slug");
    if (initial) {
      var skill = getSkillBySlug(catalog, initial);
      if (skill) openDrawer(skill, catalog);
    }
  }

  function main() {
    initThemeToggle(document.getElementById("theme-toggle"));
    loadGithubStars();
    initDrawer();
    try {
      var catalog = loadCatalog();
      if (document.getElementById("skills-grid")) renderTree(catalog);
    } catch (error) {
      console.error(error);
      var meta = document.getElementById("results-meta");
      if (meta) {
        meta.textContent = "Could not load skills catalog.";
        meta.classList.add("error-state");
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", main);
  } else {
    main();
  }
})();
