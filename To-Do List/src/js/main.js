import { initController } from "./todoController.js";

const THEME_KEY = "todo.theme";

function applyTheme(theme) {
  const root = document.documentElement;
  const isDark = theme === "dark";
  root.classList.toggle("dark", isDark);
  const btn = document.getElementById("btnDark");
  if (btn) btn.setAttribute("aria-pressed", String(isDark));
}

function detectPreferredTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "dark" || saved === "light") return saved;
  // si no hay preferencia guardada, mira al sistema
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function initThemeToggle() {
  const current = detectPreferredTheme();
  applyTheme(current);

  const btn = document.getElementById("btnDark");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const now = document.documentElement.classList.contains("dark") ? "dark" : "light";
    const next = now === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  });
}

initThemeToggle();
initController();
