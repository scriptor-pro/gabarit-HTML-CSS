    (async () => {
      const root = document.documentElement;
      const uiFamily = document.getElementById("ui-font-family");
      const uiWeight = document.getElementById("ui-font-weight");
      const uiSearch = document.getElementById("ui-font-search");
      const uiSuggestions = document.getElementById("ui-font-suggestions");
      const contentFamily = document.getElementById("content-font-family");
      const contentWeight = document.getElementById("content-font-weight");
      const contentSearch = document.getElementById("content-font-search");
      const contentSuggestions = document.getElementById("content-font-suggestions");
      const aestheticPreset = document.getElementById("aesthetic-preset");
      const uiActive = document.getElementById("ui-font-active");
      const contentActive = document.getElementById("content-font-active");
      const resetFontsButton = document.getElementById("reset-fonts");
      const resetAllTokensButton = document.getElementById("reset-all-tokens");
      const resetDemoStateButton = document.getElementById("reset-demo-state");
      const openDialogButton = document.getElementById("open-dialog");
      const closeDialogButton = document.getElementById("close-dialog");
      const demoDialog = document.getElementById("demo-dialog");
      const toggleInertButton = document.getElementById("toggle-inert");
      const inertZone = document.getElementById("inert-zone");
      const inertState = document.getElementById("inert-state");
      const enterFullscreenButton = document.getElementById("enter-fullscreen");
      const exitFullscreenButton = document.getElementById("exit-fullscreen");
      const fullscreenTarget = document.getElementById("fullscreen-target");
      const fullscreenState = document.getElementById("fullscreen-state");
      const clipboardText = document.getElementById("clipboard-text");
      const copyClipboardButton = document.getElementById("copy-clipboard");
      const pasteClipboardButton = document.getElementById("paste-clipboard");
      const clipboardState = document.getElementById("clipboard-state");
      const sharePageButton = document.getElementById("share-page");
      const shareState = document.getElementById("share-state");
      const dragSource = document.getElementById("drag-source");
      const dropTarget = document.getElementById("drop-target");
      const dropState = document.getElementById("drop-state");
      const colorAccent = document.getElementById("color-accent");
      const colorBg = document.getElementById("color-bg");
      const colorSurface = document.getElementById("color-surface");
      const colorSurfaceAlt = document.getElementById("color-surface-alt");
      const colorInk = document.getElementById("color-ink");
      const colorInkSoft = document.getElementById("color-ink-soft");
      const colorLine = document.getElementById("color-line");
      const colorLineStrong = document.getElementById("color-line-strong");
      const colorAccentValue = document.getElementById("color-accent-value");
      const colorBgValue = document.getElementById("color-bg-value");
      const colorSurfaceValue = document.getElementById("color-surface-value");
      const colorSurfaceAltValue = document.getElementById("color-surface-alt-value");
      const colorInkValue = document.getElementById("color-ink-value");
      const colorInkSoftValue = document.getElementById("color-ink-soft-value");
      const colorLineValue = document.getElementById("color-line-value");
      const colorLineStrongValue = document.getElementById("color-line-strong-value");
      const colorReset = document.getElementById("color-reset");
      const colorFieldset = document.querySelector(".fieldset-colors");
      const copyPaletteButton = document.getElementById("copy-palette");
      const paletteCopyState = document.getElementById("palette-copy-state");
      const contrastWarning = document.getElementById("contrast-warning");
      const applyButton = document.getElementById("apply-fonts");
      const themeToggle = document.getElementById("theme-toggle");
      const exportThemeButton = document.getElementById("export-current-theme");
      const catalogStatus = document.getElementById("font-catalog-status");
      const uiLink = document.getElementById("font-ui-link");
      const contentLink = document.getElementById("font-content-link");
      const iframeDemo = document.getElementById("iframe-demo");
      const toggleIframeDemoButton = document.getElementById("toggle-iframe-demo");
      const iframeDemoState = document.getElementById("iframe-demo-state");
      const templateDemoOutput = document.getElementById("template-demo-output");
      const templateDemoState = document.getElementById("template-demo-state");
      const embeddedCardTemplate = document.getElementById("embedded-card-template");
      const insertTemplateCardButton = document.getElementById("insert-template-card");
      const clearTemplateCardsButton = document.getElementById("clear-template-cards");
      const demoCanvas = document.getElementById("demo-canvas");
      const videoWithTrack = document.getElementById("video-with-track");
      const trackDemoState = document.getElementById("track-demo-state");

      if (!uiFamily || !uiWeight || !uiSearch || !contentFamily || !contentWeight || !contentSearch || !applyButton || !themeToggle || !exportThemeButton || !uiLink || !contentLink) {
        return;
      }

      const allWeights = "100,200,300,400,500,600,700,800,900";
      const defaultFontConfig = {
        ui: { family: "inter", weight: "700" },
        content: { family: "source-serif-4", weight: "400" },
      };
      const buildHref = (slug) =>
        "https://fonts.bunny.net/css?family=" + encodeURIComponent(slug) + ":" + allWeights + "&display=swap";
      const minSearchChars = 2;
      const minAutocompleteChars = 3;

      const normalizeText = (value) =>
        value
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

      const iframeDemoSrcdoc =
        "<!doctype html><html lang='fr'><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'>" +
        "<style>body{margin:0;font:14px/1.45 system-ui,sans-serif;background:#f5f7ff;color:#1f1f1f;display:grid;place-items:center;min-height:100vh;padding:12px}main{max-width:28ch;background:#fff;border:1px solid #c9d1e0;border-radius:10px;padding:10px}button{font:inherit;border:1px solid #9fa8ba;border-radius:8px;padding:.35rem .55rem;background:#eef2ff;cursor:pointer}</style></head><body>" +
        "<main><p><strong>Contenu iframe</strong>: ce texte est isole du document parent.</p><p id='counter'>Compteur local: 0</p><button id='plus'>Incrementer</button></main>" +
        "<script>let count=0;const out=document.getElementById('counter');document.getElementById('plus').addEventListener('click',()=>{count+=1;out.textContent='Compteur local: '+count;});<\/script></body></html>";

      const defaultColorConfig = {
        accent: "#3b63d1",
        bg: "#f6f6f6",
        surface: "#ffffff",
        surfaceAlt: "#fafafa",
        ink: "#1f1f1f",
        inkSoft: "#595959",
        line: "#d4d4d4",
        lineStrong: "#b8b8b8",
      };

      const aestheticPresets = {
        neutral: { accent: "#3b63d1", bg: "#f6f6f6", surface: "#ffffff", ink: "#1f1f1f", line: "#d4d4d4" },
        "editorial-soft": { accent: "#5f6aa8", bg: "#f4f1eb", surface: "#fffdf9", ink: "#2a2926", line: "#d7cec0" },
        "brutalist-bw": { accent: "#101010", bg: "#f1f1f1", surface: "#ffffff", ink: "#0c0c0c", line: "#1c1c1c" },
        "bauhaus-functional": { accent: "#2057bf", bg: "#ece6d8", surface: "#fdf9f0", ink: "#171717", line: "#2c2c2c" },
        "nordic-calm": { accent: "#3d6f8b", bg: "#eef3f5", surface: "#ffffff", ink: "#1f2a31", line: "#c7d5db" },
        "newspaper-classic": { accent: "#4b4a46", bg: "#f5f3ef", surface: "#fffefb", ink: "#1f1d1a", line: "#ccc5ba" },
        "terminal-mono": { accent: "#3b8f5a", bg: "#111316", surface: "#171a1f", ink: "#d5e2da", line: "#2f363f" },
        "warm-paper": { accent: "#9a5a35", bg: "#f6eee2", surface: "#fff9f0", ink: "#2d241c", line: "#d7c3a8" },
        "oceanic-clean": { accent: "#0f6fa1", bg: "#ecf5fa", surface: "#ffffff", ink: "#1a2b36", line: "#bed6e5" },
        "forest-muted": { accent: "#4b6f58", bg: "#eef3ed", surface: "#fbfdfb", ink: "#202920", line: "#c9d6c9" },
        "sunset-soft": { accent: "#d06a4b", bg: "#fef2ea", surface: "#fffaf6", ink: "#2d2220", line: "#e5c6b8" },
        "high-contrast": { accent: "#003cff", bg: "#ffffff", surface: "#ffffff", ink: "#000000", line: "#000000" },
        "retro-console": { accent: "#2ea66f", bg: "#121816", surface: "#18201d", ink: "#d8efe3", line: "#2e413a" },
        "museum-mineral": { accent: "#6f7b88", bg: "#eff2f4", surface: "#fbfcfd", ink: "#23282d", line: "#c9d1d8" },
        "coffee-house": { accent: "#8d5a3b", bg: "#f5eee8", surface: "#fffaf5", ink: "#2e221c", line: "#d8c4b4" },
        "neon-night": { accent: "#4df0d1", bg: "#0f1220", surface: "#171b2b", ink: "#e7efff", line: "#2f3654" },
        "pastel-lab": { accent: "#7d88d9", bg: "#f6f7ff", surface: "#ffffff", ink: "#2b2f47", line: "#d7dcf8" },
        "corporate-blue": { accent: "#1f5fbf", bg: "#eef3fb", surface: "#ffffff", ink: "#1c2a3a", line: "#c7d5ea" },
        "mono-ink": { accent: "#3a3a3a", bg: "#f7f7f7", surface: "#ffffff", ink: "#1b1b1b", line: "#cbcbcb" },
        "amber-ice": { accent: "#cf7a2f", bg: "#eff6fb", surface: "#fffaf3", ink: "#1f2b34", line: "#c7d7e3" },
        "terracotta-mist": { accent: "#b8644a", bg: "#edf4f7", surface: "#fff8f5", ink: "#252c31", line: "#c9d7de" },
        "copper-lagoon": { accent: "#b96b3e", bg: "#e8f4f6", surface: "#fff9f2", ink: "#1d2b2f", line: "#bed2d7" },
        "sun-slate": { accent: "#d28f3b", bg: "#eef2f6", surface: "#fffaf1", ink: "#232a31", line: "#c9d1da" },
        "peach-fjord": { accent: "#d9795f", bg: "#e9f3f9", surface: "#fff8f4", ink: "#20303a", line: "#c4d5e3" },
        "spice-glacier": { accent: "#c26a3b", bg: "#ecf6fa", surface: "#fffaf6", ink: "#1f2c34", line: "#c3d8e4" },
        "canyon-breeze": { accent: "#bf6f45", bg: "#e7f3f5", surface: "#fff8f2", ink: "#213038", line: "#bfd3da" },
      };
      const defaultAestheticPreset = "neutral";

      const clampColor = (value) => {
        const v = Number.isFinite(value) ? value : 0;
        return Math.max(0, Math.min(255, Math.round(v)));
      };

      const shiftHexColor = (hex, ratio) => {
        const cleaned = String(hex || "").trim().replace("#", "");
        const normalized = cleaned.length === 3
          ? cleaned.split("").map((c) => c + c).join("")
          : cleaned;
        if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
          return hex;
        }

        const r = parseInt(normalized.slice(0, 2), 16);
        const g = parseInt(normalized.slice(2, 4), 16);
        const b = parseInt(normalized.slice(4, 6), 16);

        const adjust = (channel) =>
          ratio >= 0
            ? channel + (255 - channel) * ratio
            : channel * (1 + ratio);

        const toHex = (channel) => clampColor(adjust(channel)).toString(16).padStart(2, "0");

        return "#" + toHex(r) + toHex(g) + toHex(b);
      };

      const restoreSelection = (select, value) => {
        if (!value) {
          return;
        }
        const exists = Array.from(select.options).some((option) => option.value === value);
        if (exists) {
          select.value = value;
        }
      };

      const slugToFamilyName = (slug) =>
        slug
          .split("-")
          .filter(Boolean)
          .map((part) => (part.length ? part[0].toUpperCase() + part.slice(1) : part))
          .join(" ");

      const inferClassFromSlug = (slug) =>
        /(serif|slab|garamond|baskerville|bodoni|mincho|didone|roman|antiqua)/i.test(slug)
          ? "serif"
          : "sans";

      const populateFamilySelect = (select, slugs, fallbackSlug) => {
        const previous = select.value;
        const fragment = document.createDocumentFragment();

        slugs.forEach((slug) => {
          const option = document.createElement("option");
          option.value = slug;
          option.dataset.name = slugToFamilyName(slug);
          option.dataset.class = inferClassFromSlug(slug);
          option.textContent = option.dataset.name;
          fragment.appendChild(option);
        });

        select.replaceChildren(fragment);
        restoreSelection(select, previous);
        if (!select.value && slugs.length > 0) {
          restoreSelection(select, fallbackSlug);
        }
      };

      const loadBunnyCatalog = async () => {
        const response = await fetch("https://fonts.bunny.net/sitemap.xml", { cache: "force-cache" });
        if (!response.ok) {
          throw new Error("Impossible de charger le sitemap Bunny");
        }
        const xmlText = await response.text();
        const xml = new DOMParser().parseFromString(xmlText, "application/xml");
        const locNodes = Array.from(xml.querySelectorAll("url > loc"));

        const slugs = locNodes
          .map((node) => node.textContent || "")
          .map((url) => {
            const match = url.match(/\/family\/([a-z0-9-]+)$/i);
            return match ? match[1].toLowerCase() : "";
          })
          .filter(Boolean);

        return Array.from(new Set(slugs)).sort((a, b) => a.localeCompare(b));
      };

      const filterFamilyOptions = (select, query) => {
        const needle = normalizeText(query.trim());
        const groups = Array.from(select.querySelectorAll("optgroup"));

        if (groups.length === 0) {
          let visibleCount = 0;
          Array.from(select.options).forEach((option) => {
            const haystack = normalizeText([option.textContent || "", option.value || ""].join(" "));
            const visible = needle.length === 0 || haystack.includes(needle);
            option.hidden = !visible;
            if (visible) {
              visibleCount += 1;
            }
          });
          if (visibleCount > 0 && select.options[select.selectedIndex]?.hidden) {
            const fallback = Array.from(select.options).find((option) => !option.hidden);
            if (fallback) {
              select.value = fallback.value;
            }
          }
          return;
        }

        groups.forEach((group) => {
          let visibleCount = 0;
          Array.from(group.querySelectorAll("option")).forEach((option) => {
            const haystack = normalizeText(
              [option.textContent || "", option.dataset.name || "", option.value || "", group.label || ""].join(" ")
            );
            const visible = needle.length === 0 || haystack.includes(needle);
            option.hidden = !visible;
            if (visible) {
              visibleCount += 1;
            }
          });
          group.hidden = visibleCount === 0;
        });

        const selected = select.options[select.selectedIndex];
        if (selected && selected.hidden) {
          const fallback = Array.from(select.options).find((option) => !option.hidden);
          if (fallback) {
            select.value = fallback.value;
          }
        }
      };

      const updateAutocomplete = (select, datalist, query) => {
        if (!datalist) {
          return;
        }

        datalist.replaceChildren();
        const needle = normalizeText(query.trim());
        if (needle.length < minAutocompleteChars) {
          return;
        }

        const matches = [];
        Array.from(select.options).forEach((option) => {
          const name = option.dataset.name || option.textContent || "";
          const haystack = normalizeText(name + " " + (option.value || ""));
          if (haystack.includes(needle)) {
            matches.push(name.trim());
          }
        });

        Array.from(new Set(matches)).slice(0, 8).forEach((name) => {
          const opt = document.createElement("option");
          opt.value = name;
          datalist.appendChild(opt);
        });
      };

      const selectExactMatch = (select, query) => {
        const needle = normalizeText(query.trim());
        if (needle.length < minSearchChars) {
          return;
        }
        const exact = Array.from(select.options).find((option) => {
          const name = normalizeText((option.dataset.name || option.textContent || "").trim());
          const slug = normalizeText((option.value || "").trim());
          return name === needle || slug === needle;
        });
        if (exact) {
          select.value = exact.value;
        }
      };

      const resetFontsToDefault = () => {
        if (uiSearch) {
          uiSearch.value = "";
        }
        if (contentSearch) {
          contentSearch.value = "";
        }

        filterFamilyOptions(uiFamily, "");
        filterFamilyOptions(contentFamily, "");

        restoreSelection(uiFamily, defaultFontConfig.ui.family);
        restoreSelection(uiWeight, defaultFontConfig.ui.weight);
        restoreSelection(contentFamily, defaultFontConfig.content.family);
        restoreSelection(contentWeight, defaultFontConfig.content.weight);

        if (uiSuggestions) {
          uiSuggestions.replaceChildren();
        }
        if (contentSuggestions) {
          contentSuggestions.replaceChildren();
        }

        applyFontConfig("ui");
        applyFontConfig("content");
      };

      const resetAllTokens = () => {
        localStorage.removeItem("aesthetic-preset");
        localStorage.removeItem("color-config");
        localStorage.removeItem("font-ui-config");
        localStorage.removeItem("font-content-config");

        applyAestheticPreset(defaultAestheticPreset);
        resetFontsToDefault();
      };

      const setIframeDemoLoaded = (isLoaded) => {
        if (!iframeDemo) {
          return;
        }

        if (toggleIframeDemoButton) {
          toggleIframeDemoButton.setAttribute("aria-expanded", isLoaded ? "true" : "false");
        }

        if (isLoaded) {
          iframeDemo.srcdoc = iframeDemoSrcdoc;
          if (iframeDemoState) {
            iframeDemoState.textContent = "Etat: iframe chargee";
          }
        } else {
          iframeDemo.removeAttribute("srcdoc");
          iframeDemo.src = "about:blank";
          if (iframeDemoState) {
            iframeDemoState.textContent = "Etat: iframe videe";
          }
        }
      };

      const updateTemplateDemoState = () => {
        if (!templateDemoOutput || !templateDemoState) {
          return;
        }
        const count = templateDemoOutput.children.length;
        templateDemoState.textContent = "Etat: " + count + " carte" + (count > 1 ? "s" : "") + " inseree" + (count > 1 ? "s" : "");
        if (clearTemplateCardsButton) {
          clearTemplateCardsButton.disabled = count === 0;
        }
      };

      const drawCanvasDemo = () => {
        if (!demoCanvas) {
          return;
        }

        const context = demoCanvas.getContext("2d");
        if (!context) {
          return;
        }

        const gradient = context.createLinearGradient(0, 0, demoCanvas.width, demoCanvas.height);
        gradient.addColorStop(0, "#dbe8ff");
        gradient.addColorStop(1, "#ffe6d8");
        context.fillStyle = gradient;
        context.fillRect(0, 0, demoCanvas.width, demoCanvas.height);

        context.fillStyle = "#3b63d1";
        context.fillRect(14, 16, 82, 42);

        context.beginPath();
        context.arc(150, 60, 24, 0, Math.PI * 2);
        context.fillStyle = "#d06a4b";
        context.fill();

        context.fillStyle = "#1f1f1f";
        context.font = "700 14px Inter, sans-serif";
        context.fillText("Demo canvas", 196, 52);
        context.font = "400 12px Inter, sans-serif";
        context.fillText("Dessin rendu via JavaScript", 196, 73);
      };

      const resetDemoState = () => {
        if (templateDemoOutput) {
          templateDemoOutput.replaceChildren();
          updateTemplateDemoState();
        }

        if (toggleIframeDemoButton && iframeDemo) {
          setIframeDemoLoaded(true);
        }

        if (dropTarget) {
          dropTarget.textContent = "Depose ici";
        }
        if (dropState) {
          dropState.textContent = "Etat: rien depose";
        }

        if (clipboardState) {
          clipboardState.textContent = "";
        }
        if (shareState) {
          shareState.textContent = "";
        }

        if (videoWithTrack) {
          videoWithTrack.currentTime = 0;
          videoWithTrack.pause();
        }
      };

      const enableTrackDemo = () => {
        if (!videoWithTrack) {
          return;
        }

        const report = (message) => {
          if (trackDemoState) {
            trackDemoState.textContent = message;
          }
        };

        const syncTrackMode = () => {
          if (!videoWithTrack.textTracks || videoWithTrack.textTracks.length === 0) {
            report("Sous-titres: piste indisponible dans ce navigateur.");
            return;
          }

          const firstTrack = videoWithTrack.textTracks[0];
          firstTrack.mode = "showing";
          report("Sous-titres: piste active. Lance la video pour voir les cues.");
        };

        const trackElement = videoWithTrack.querySelector("track");
        if (trackElement) {
          trackElement.addEventListener("load", () => {
            syncTrackMode();
          });
          trackElement.addEventListener("error", () => {
            report("Sous-titres: echec de chargement de captions-fr.vtt.");
          });
        }

        videoWithTrack.addEventListener("loadedmetadata", () => {
          syncTrackMode();
        });

        videoWithTrack.addEventListener("error", () => {
          report("Sous-titres: video indisponible (verifie la connexion et CORS). ");
        });

        syncTrackMode();
      };

      const colorValuePairs = [
        [colorAccent, colorAccentValue],
        [colorBg, colorBgValue],
        [colorSurface, colorSurfaceValue],
        [colorSurfaceAlt, colorSurfaceAltValue],
        [colorInk, colorInkValue],
        [colorInkSoft, colorInkSoftValue],
        [colorLine, colorLineValue],
        [colorLineStrong, colorLineStrongValue],
      ];

      const updateColorValueLabels = () => {
        colorValuePairs.forEach(([input, output]) => {
          if (input && output) {
            output.value = String(input.value || "").toUpperCase();
          }
        });
      };

      const normalizeHex = (hex) => {
        const cleaned = String(hex || "").trim().replace("#", "");
        const normalized = cleaned.length === 3
          ? cleaned.split("").map((char) => char + char).join("")
          : cleaned;
        if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
          return null;
        }
        return "#" + normalized.toUpperCase();
      };

      const hexToRgb = (hex) => {
        const normalized = normalizeHex(hex);
        if (!normalized) {
          return null;
        }
        return {
          r: parseInt(normalized.slice(1, 3), 16),
          g: parseInt(normalized.slice(3, 5), 16),
          b: parseInt(normalized.slice(5, 7), 16),
        };
      };

      const relativeLuminance = (rgb) => {
        const normalizeChannel = (channel) => {
          const srgb = channel / 255;
          if (srgb <= 0.03928) {
            return srgb / 12.92;
          }
          return ((srgb + 0.055) / 1.055) ** 2.4;
        };

        return 0.2126 * normalizeChannel(rgb.r) + 0.7152 * normalizeChannel(rgb.g) + 0.0722 * normalizeChannel(rgb.b);
      };

      const contrastRatio = (foregroundHex, backgroundHex) => {
        const foreground = hexToRgb(foregroundHex);
        const background = hexToRgb(backgroundHex);
        if (!foreground || !background) {
          return null;
        }
        const fgLum = relativeLuminance(foreground);
        const bgLum = relativeLuminance(background);
        const lighter = Math.max(fgLum, bgLum);
        const darker = Math.min(fgLum, bgLum);
        return (lighter + 0.05) / (darker + 0.05);
      };

      const updateContrastNotice = (inkHex, bgHex) => {
        if (!contrastWarning || !colorFieldset) {
          return;
        }

        const ratio = contrastRatio(inkHex, bgHex);
        if (ratio !== null && ratio < 4.5) {
          colorFieldset.classList.add("is-low-contrast");
          contrastWarning.hidden = false;
          contrastWarning.textContent = "Contraste texte/fond faible (" + ratio.toFixed(2) + ":1). Vise au moins 4.5:1.";
        } else {
          colorFieldset.classList.remove("is-low-contrast");
          contrastWarning.hidden = true;
          contrastWarning.textContent = "";
        }
      };

      const paletteAsCssVars = () => {
        const config = collectColorConfig();
        return [
          ":root {",
          "  --accent: " + String(config.accent).toUpperCase() + ";",
          "  --bg: " + String(config.bg).toUpperCase() + ";",
          "  --surface: " + String(config.surface).toUpperCase() + ";",
          "  --surface-alt: " + String(config.surfaceAlt).toUpperCase() + ";",
          "  --ink: " + String(config.ink).toUpperCase() + ";",
          "  --ink-soft: " + String(config.inkSoft).toUpperCase() + ";",
          "  --line: " + String(config.line).toUpperCase() + ";",
          "  --line-strong: " + String(config.lineStrong).toUpperCase() + ";",
          "}",
        ].join("\n");
      };

      const copyTextToClipboard = async (text) => {
        if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
          await navigator.clipboard.writeText(text);
          return;
        }

        const helper = document.createElement("textarea");
        helper.value = text;
        helper.setAttribute("readonly", "");
        helper.style.position = "fixed";
        helper.style.top = "-9999px";
        document.body.appendChild(helper);
        helper.select();
        const ok = document.execCommand("copy");
        helper.remove();
        if (!ok) {
          throw new Error("Copy fallback failed");
        }
      };

      const applyColorConfig = (config) => {
        const mode = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
        const surfaceAlt = config.surfaceAlt || shiftHexColor(config.surface, mode === "dark" ? 0.08 : -0.03);
        const inkSoft = config.inkSoft || shiftHexColor(config.ink, mode === "dark" ? -0.28 : 0.35);
        const lineStrong = config.lineStrong || shiftHexColor(config.line, mode === "dark" ? 0.25 : -0.15);

        root.style.setProperty("--accent", config.accent);
        root.style.setProperty("--bg", config.bg);
        root.style.setProperty("--surface", config.surface);
        root.style.setProperty("--surface-alt", surfaceAlt);
        root.style.setProperty("--ink", config.ink);
        root.style.setProperty("--ink-soft", inkSoft);
        root.style.setProperty("--line", config.line);
        root.style.setProperty("--line-strong", lineStrong);

        if (colorAccent) {
          colorAccent.value = config.accent;
        }
        if (colorBg) {
          colorBg.value = config.bg;
        }
        if (colorSurface) {
          colorSurface.value = config.surface;
        }
        if (colorSurfaceAlt) {
          colorSurfaceAlt.value = surfaceAlt;
        }
        if (colorInk) {
          colorInk.value = config.ink;
        }
        if (colorInkSoft) {
          colorInkSoft.value = inkSoft;
        }
        if (colorLine) {
          colorLine.value = config.line;
        }
        if (colorLineStrong) {
          colorLineStrong.value = lineStrong;
        }

        localStorage.setItem("color-config", JSON.stringify({
          accent: config.accent,
          bg: config.bg,
          surface: config.surface,
          surfaceAlt,
          ink: config.ink,
          inkSoft,
          line: config.line,
          lineStrong,
        }));

        updateColorValueLabels();
        updateContrastNotice(config.ink, config.bg);
        if (paletteCopyState) {
          paletteCopyState.textContent = "";
          delete paletteCopyState.dataset.state;
        }
      };

      const applyAestheticPreset = (presetKey) => {
        const key = aestheticPresets[presetKey] ? presetKey : defaultAestheticPreset;
        if (aestheticPreset) {
          aestheticPreset.value = key;
        }
        applyColorConfig(aestheticPresets[key]);
        localStorage.setItem("aesthetic-preset", key);
      };

      const collectColorConfig = () => ({
        accent: colorAccent ? colorAccent.value : defaultColorConfig.accent,
        bg: colorBg ? colorBg.value : defaultColorConfig.bg,
        surface: colorSurface ? colorSurface.value : defaultColorConfig.surface,
        surfaceAlt: colorSurfaceAlt ? colorSurfaceAlt.value : defaultColorConfig.surfaceAlt,
        ink: colorInk ? colorInk.value : defaultColorConfig.ink,
        inkSoft: colorInkSoft ? colorInkSoft.value : defaultColorConfig.inkSoft,
        line: colorLine ? colorLine.value : defaultColorConfig.line,
        lineStrong: colorLineStrong ? colorLineStrong.value : defaultColorConfig.lineStrong,
      });

      const applyTheme = (mode) => {
        const resolved = mode === "dark" ? "dark" : "light";
        root.setAttribute("data-theme", resolved);
        themeToggle.setAttribute("aria-pressed", resolved === "dark" ? "true" : "false");
        themeToggle.textContent = resolved === "dark" ? "Passer en mode clair" : "Passer en mode fonce";
        localStorage.setItem("theme-mode", resolved);
      };

      const applyFontConfig = (group) => {
        const isUi = group === "ui";
        const familyInput = isUi ? uiFamily : contentFamily;
        const weightInput = isUi ? uiWeight : contentWeight;
        const link = isUi ? uiLink : contentLink;

        const selected = familyInput.options[familyInput.selectedIndex];
        if (!selected) {
          return;
        }
        const slug = familyInput.value;
        const familyName = selected.dataset.name || selected.textContent.trim() || "Inter";
        const familyClass = selected.dataset.class === "serif" ? "serif" : "sans";
        const normalizedWeight = String(Math.min(900, Math.max(100, Number(weightInput.value) || 400)));
        const fallbackStack =
          familyClass === "serif"
            ? '"Times New Roman", Times, serif'
            : '"Helvetica Neue", Arial, sans-serif';

        weightInput.value = normalizedWeight;
        link.href = buildHref(slug);

        root.style.setProperty(
          isUi ? "--font-ui" : "--font-content",
          '"' + familyName.replace(/"/g, "") + '", ' + fallbackStack
        );
        root.style.setProperty(
          isUi ? "--font-ui-weight" : "--font-content-weight",
          normalizedWeight
        );

        const activeTarget = isUi ? uiActive : contentActive;
        if (activeTarget) {
          activeTarget.textContent = "Police active: " + familyName + " (" + normalizedWeight + ")";
        }

        localStorage.setItem(
          isUi ? "font-ui-config" : "font-content-config",
          JSON.stringify({
            family: slug,
            weight: normalizedWeight,
          })
        );
      };

      const uiSaved = JSON.parse(localStorage.getItem("font-ui-config") || "null");
      const contentSaved = JSON.parse(localStorage.getItem("font-content-config") || "null");

      try {
        const bunnySlugs = await loadBunnyCatalog();
        if (bunnySlugs.length > 0) {
          populateFamilySelect(uiFamily, bunnySlugs, "inter");
          populateFamilySelect(contentFamily, bunnySlugs, "source-serif-4");
          if (catalogStatus) {
            catalogStatus.textContent = bunnySlugs.length + " polices disponibles";
          }
        } else if (catalogStatus) {
          catalogStatus.textContent = "Catalogue Bunny vide, liste locale conservee.";
        }
      } catch (error) {
        console.error(error);
        if (catalogStatus) {
          catalogStatus.textContent = "Catalogue Bunny indisponible, liste locale conservee.";
        }
      }

      if (uiSaved) {
        restoreSelection(uiFamily, uiSaved.family);
        restoreSelection(uiWeight, uiSaved.weight);
      } else {
        restoreSelection(uiFamily, defaultFontConfig.ui.family);
        restoreSelection(uiWeight, defaultFontConfig.ui.weight);
      }

      if (contentSaved) {
        restoreSelection(contentFamily, contentSaved.family);
        restoreSelection(contentWeight, contentSaved.weight);
      } else {
        restoreSelection(contentFamily, defaultFontConfig.content.family);
        restoreSelection(contentWeight, defaultFontConfig.content.weight);
      }

      const savedTheme = localStorage.getItem("theme-mode");
      const systemPrefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      applyTheme(savedTheme || (systemPrefersDark ? "dark" : "light"));

      const storedPreset = localStorage.getItem("aesthetic-preset");
      const storedColorConfig = JSON.parse(localStorage.getItem("color-config") || "null");
      if (storedPreset && aestheticPresets[storedPreset]) {
        applyAestheticPreset(storedPreset);
      } else {
        applyColorConfig({
          accent: storedColorConfig?.accent || defaultColorConfig.accent,
          bg: storedColorConfig?.bg || defaultColorConfig.bg,
          surface: storedColorConfig?.surface || defaultColorConfig.surface,
          surfaceAlt: storedColorConfig?.surfaceAlt || defaultColorConfig.surfaceAlt,
          ink: storedColorConfig?.ink || defaultColorConfig.ink,
          inkSoft: storedColorConfig?.inkSoft || defaultColorConfig.inkSoft,
          line: storedColorConfig?.line || defaultColorConfig.line,
          lineStrong: storedColorConfig?.lineStrong || defaultColorConfig.lineStrong,
        });
      }

      applyButton.addEventListener("click", () => {
        applyFontConfig("ui");
        applyFontConfig("content");
      });

      if (resetFontsButton) {
        resetFontsButton.addEventListener("click", () => {
          resetFontsToDefault();
        });
      }

      if (resetAllTokensButton) {
        resetAllTokensButton.addEventListener("click", () => {
          resetAllTokens();
        });
      }

      if (openDialogButton && demoDialog && typeof demoDialog.showModal === "function") {
        openDialogButton.addEventListener("click", () => {
          if (!demoDialog.open) {
            demoDialog.showModal();
          }
        });
      }

      if (closeDialogButton && demoDialog) {
        closeDialogButton.addEventListener("click", () => {
          if (demoDialog.open) {
            demoDialog.close();
          }
        });
      }

      if (toggleInertButton && inertZone) {
        const updateInertState = () => {
          const isInert = inertZone.hasAttribute("inert");
          if (inertState) {
            inertState.textContent = "Etat: " + (isInert ? "inert actif" : "actif");
          }
        };

        updateInertState();

        toggleInertButton.addEventListener("click", () => {
          if (inertZone.hasAttribute("inert")) {
            inertZone.removeAttribute("inert");
          } else {
            inertZone.setAttribute("inert", "");
          }
          updateInertState();
        });
      }

      if (enterFullscreenButton && fullscreenTarget && typeof fullscreenTarget.requestFullscreen === "function") {
        enterFullscreenButton.addEventListener("click", async () => {
          try {
            await fullscreenTarget.requestFullscreen();
          } catch (error) {
            if (fullscreenState) {
              fullscreenState.textContent = "Etat: echec plein ecran";
            }
          }
        });
      }

      if (exitFullscreenButton && typeof document.exitFullscreen === "function") {
        exitFullscreenButton.addEventListener("click", async () => {
          if (document.fullscreenElement) {
            await document.exitFullscreen();
          }
        });
      }

      if (fullscreenState) {
        document.addEventListener("fullscreenchange", () => {
          const active = document.fullscreenElement ? "plein ecran actif" : "fenetre normale";
          fullscreenState.textContent = "Etat: " + active;
        });
      }

      if (copyClipboardButton && clipboardText) {
        copyClipboardButton.addEventListener("click", async () => {
          try {
            if (!navigator.clipboard || typeof navigator.clipboard.writeText !== "function") {
              throw new Error("Clipboard API indisponible");
            }
            await navigator.clipboard.writeText(clipboardText.value || "");
            if (clipboardState) {
              clipboardState.textContent = "Etat: texte copie";
            }
          } catch (error) {
            if (clipboardState) {
              clipboardState.textContent = "Etat: copie refusee";
            }
          }
        });
      }

      if (pasteClipboardButton && clipboardText) {
        pasteClipboardButton.addEventListener("click", async () => {
          try {
            if (!navigator.clipboard || typeof navigator.clipboard.readText !== "function") {
              throw new Error("Clipboard API indisponible");
            }
            const pasted = await navigator.clipboard.readText();
            clipboardText.value = pasted;
            if (clipboardState) {
              clipboardState.textContent = "Etat: texte colle";
            }
          } catch (error) {
            if (clipboardState) {
              clipboardState.textContent = "Etat: collage refuse";
            }
          }
        });
      }

      if (sharePageButton) {
        sharePageButton.addEventListener("click", async () => {
          try {
            if (!navigator.share) {
              throw new Error("Web Share indisponible");
            }
            await navigator.share({
              title: document.title,
              text: "DIY CSS playground",
              url: location.href,
            });
            if (shareState) {
              shareState.textContent = "Etat: partage envoye";
            }
          } catch (error) {
            if (shareState) {
              shareState.textContent = "Etat: partage annule ou indisponible";
            }
          }
        });
      }

      if (dragSource && dropTarget) {
        dragSource.addEventListener("dragstart", (event) => {
          event.dataTransfer.setData("text/plain", "DIY CSS draggable chip");
          dragSource.classList.add("dragging");
        });

        dragSource.addEventListener("dragend", () => {
          dragSource.classList.remove("dragging");
        });

        dropTarget.addEventListener("dragover", (event) => {
          event.preventDefault();
          dropTarget.classList.add("is-over");
        });

        dropTarget.addEventListener("dragleave", () => {
          dropTarget.classList.remove("is-over");
        });

        dropTarget.addEventListener("drop", (event) => {
          event.preventDefault();
          dropTarget.classList.remove("is-over");
          const payload = event.dataTransfer.getData("text/plain");
          if (dropState) {
            dropState.textContent = "Etat: depose -> " + payload;
          }
        });
      }

      themeToggle.addEventListener("click", () => {
        const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
        applyTheme(current === "dark" ? "light" : "dark");
        applyColorConfig(collectColorConfig());
      });

      const extractBaseCssFromLoadedStylesheet = () => {
        const sheets = Array.from(document.styleSheets || []);
        for (const sheet of sheets) {
          const href = sheet.href || "";
          if (!href || !href.includes("style.css")) {
            continue;
          }
          try {
            const rules = Array.from(sheet.cssRules || []);
            if (rules.length > 0) {
              return rules.map((rule) => rule.cssText).join("\n\n");
            }
          } catch (error) {
            // Some environments block direct cssRules access.
          }
        }
        return "";
      };

      exportThemeButton.addEventListener("click", async () => {
        try {
          let baseCss = "";
          try {
            const response = await fetch("style.css", { cache: "no-store" });
            if (response.ok) {
              baseCss = await response.text();
            }
          } catch (error) {
            // Fallback below for local file:// usage.
          }

          if (!baseCss) {
            baseCss = extractBaseCssFromLoadedStylesheet();
          }

          const computed = getComputedStyle(root);
          const vars = [
            "--bg",
            "--surface",
            "--surface-alt",
            "--ink",
            "--ink-soft",
            "--accent",
            "--line",
            "--line-strong",
            "--font-ui",
            "--font-content",
            "--font-ui-weight",
            "--font-content-weight",
            "--radius",
          ];

          const lines = vars.map((name) => "  " + name + ": " + computed.getPropertyValue(name).trim() + ";");
          const mode = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
          const themeBlock =
            "\n\n/* --- Theme current export --- */\n" +
            ":root {\n" + lines.join("\n") + "\n}\n" +
            "/* Theme mode at export: " + mode + " */\n";

          const cssText =
            (baseCss || "/* Base style indisponible en contexte file://. */\n") +
            themeBlock;

          const blob = new Blob([cssText], { type: "text/css;charset=utf-8" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "style-with-theme-current.css";
          document.body.appendChild(link);
          link.click();
          link.remove();
          URL.revokeObjectURL(url);
        } catch (error) {
          console.error(error);
          alert("Export impossible. Ouvre la page via un serveur local (ex: Live Server). ");
        }
      });

      uiFamily.addEventListener("change", () => applyFontConfig("ui"));
      uiWeight.addEventListener("change", () => applyFontConfig("ui"));
      contentFamily.addEventListener("change", () => applyFontConfig("content"));
      contentWeight.addEventListener("change", () => applyFontConfig("content"));

      [colorAccent, colorBg, colorSurface, colorSurfaceAlt, colorInk, colorInkSoft, colorLine, colorLineStrong]
        .filter(Boolean)
        .forEach((input) => {
          input.addEventListener("input", () => applyColorConfig(collectColorConfig()));
        });

      if (aestheticPreset) {
        aestheticPreset.addEventListener("change", (event) => {
          applyAestheticPreset(event.target.value);
        });
      }

      if (colorReset) {
        colorReset.addEventListener("click", () => applyColorConfig(defaultColorConfig));
      }

      if (copyPaletteButton) {
        copyPaletteButton.addEventListener("click", async () => {
          try {
            await copyTextToClipboard(paletteAsCssVars());
            if (paletteCopyState) {
              paletteCopyState.textContent = "Palette copiee.";
              paletteCopyState.dataset.state = "success";
            }
          } catch (error) {
            if (paletteCopyState) {
              paletteCopyState.textContent = "Copie impossible ici.";
              paletteCopyState.dataset.state = "error";
            }
          }
        });
      }

      if (toggleIframeDemoButton && iframeDemo) {
        setIframeDemoLoaded(true);
        toggleIframeDemoButton.addEventListener("click", () => {
          const expanded = toggleIframeDemoButton.getAttribute("aria-expanded") === "true";
          setIframeDemoLoaded(!expanded);
        });
      }

      if (insertTemplateCardButton && embeddedCardTemplate && templateDemoOutput) {
        insertTemplateCardButton.addEventListener("click", () => {
          const fragment = embeddedCardTemplate.content.cloneNode(true);
          const createdAt = fragment.querySelector(".template-created-at");
          if (createdAt) {
            createdAt.textContent = "Creee le " + new Date().toLocaleString("fr-FR");
          }
          templateDemoOutput.appendChild(fragment);
          updateTemplateDemoState();
        });
      }

      if (clearTemplateCardsButton && templateDemoOutput) {
        clearTemplateCardsButton.addEventListener("click", () => {
          templateDemoOutput.replaceChildren();
          updateTemplateDemoState();
        });
      }

      if (resetDemoStateButton) {
        resetDemoStateButton.addEventListener("click", () => {
          resetDemoState();
        });
      }

      uiSearch.addEventListener("input", (event) => {
        const query = event.target.value;
        updateAutocomplete(uiFamily, uiSuggestions, query);
        filterFamilyOptions(uiFamily, query);
        selectExactMatch(uiFamily, query);
        applyFontConfig("ui");
      });

      contentSearch.addEventListener("input", (event) => {
        const query = event.target.value;
        updateAutocomplete(contentFamily, contentSuggestions, query);
        filterFamilyOptions(contentFamily, query);
        selectExactMatch(contentFamily, query);
        applyFontConfig("content");
      });

      const form = document.querySelector(".font-controls");
      if (form) {
        form.addEventListener("submit", (event) => {
          event.preventDefault();
          applyFontConfig("ui");
          applyFontConfig("content");
        });
      }

      applyFontConfig("ui");
      applyFontConfig("content");

      updateColorValueLabels();
      drawCanvasDemo();
      enableTrackDemo();
      updateTemplateDemoState();
    })();
