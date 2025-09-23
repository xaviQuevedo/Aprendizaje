(function () {
  const $ = (s) => document.querySelector(s);
  const listEl = $("#list");
  const inputEl = $("#newTask");
  const btnAdd = $("#btnAdd");
  const btnClear = $("#btnClear");
  const statsEl = $("#stats");
  const KEY = "todo.items.V1";

  /** @type {{id:string,text:string,done:boolean}[]} */
  let items = load();

  function uid() {
    return Math.random().toString(36).slice(2, 9);
  }
  function save() {
    localStorage.setItem(KEY, JSON.stringify(items));
  }
  function load() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
      return [];
    }
  }

  function render() {
    listEl.innerHTML = "";
    items.forEach((it) => {
      const li = document.createElement("li");
      if (it.done) li.classList.add("done");
      li.innerHTML = `
        <input type="checkbox" ${it.done ? "checked" : ""} data-id="${it.id}" />
        <div class="txt">${escapeHtml(it.text)}</div>
        <button class="icon del" data-del="${it.id}">Borrar</button>`;
      listEl.appendChild(li);
    });
    const pending = items.filter((i) => !i.done).length;
    statsEl.textContent = `${pending} pendiente${pending !== 1 ? "s" : ""}`;
  }

  function escapeHtml(s) {
    return s.replace(
      /[&<>"']/g,
      (m) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        }[m])
    );
  }

  function addTask() {
    const text = inputEl.value.trim();
    if (!text) return;
    items.unshift({ id: uid(), text, done: false });
    inputEl.value = "";
    save();
    render();
  }
  listEl.addEventListener("click", (e) => {
    const delBtn = e.target.closest("[data-del]");
    if (delBtn) {
      const id = delBtn.getAttribute("data-del");
      items = items.filter((it) => it.id != id);
      save();
      render();
      return;
    }

    const checkbox = e.target.closest('input[type="checkbox"][data-id]');
    if (checkbox) {
      const id = target.getAtribute("data-id");
      items = items.map((it) =>
        it.id === id ? { ...it, done: checkbox.checked } : it
      );
      save();
      render();
      return;
    }
  });

  btnAdd.addEventListener("click", addTask);
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
  });
  btnClear.addEventListener("click", () => {
    if (!items.length) return;
    if (confirm("¿Eliminar todas las tareas?")) {
      items = [];
      save();
      render();
    }
  });

  render();
})();
