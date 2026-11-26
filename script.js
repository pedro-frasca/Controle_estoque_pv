// GERAÇÃO DO CATÁLOGO OFICIAL DA PV COMPANY
function buildDefaultCatalog() {
  const colors = [
    { name: "Cinza", slug: "cz", code: "CZ" },
    { name: "Azul", slug: "az", code: "AZ" },
    { name: "Laranja", slug: "lj", code: "LJ" },
    { name: "Preto", slug: "pt", code: "PT" }
  ];

  // Colunas SLIM e MINI
  const columnSizes = [
    { label: "1m x 60", slug: "1x60", code: "1X60" },
    { label: "1m x 80", slug: "1x80", code: "1X80" },
    { label: "1m x 1m", slug: "1x1", code: "1X1" },
    { label: "2m x 60", slug: "2x60", code: "2X60" },
    { label: "2m x 80", slug: "2x80", code: "2X80" },
    { label: "2m x 1m", slug: "2x1", code: "2X1" }
  ];

  const columnModels = [
    { label: "SLIM", slug: "slim", code: "SLM" },
    { label: "MINI", slug: "mini", code: "MIN" }
  ];

  // Colunas Reforçado (Novo e Antigo)
  const reinforcedColumnSizes = [
    { label: "3m x 60", slug: "3x60", code: "3X60" },
    { label: "3m x 80", slug: "3x80", code: "3X80" },
    { label: "3m x 1m", slug: "3x1", code: "3X1" }
  ];

  const reinforcedColumnModels = [
    {
      label: "Reforçado Novo",
      slug: "ref-novo",
      code: "REF-NV",
      category: "Colunas Reforçado (Novo)"
    },
    {
      label: "Reforçado Antigo",
      slug: "ref-antigo",
      code: "REF-AT",
      category: "Colunas Reforçado (Antigo)"
    }
  ];

  // Longarinas SLIM, MINI e MINI 500kg
  const beamSizes = [
    { label: "1,80m", slug: "180", code: "180" },
    { label: "2m", slug: "200", code: "200" },
    { label: "2,30m", slug: "230", code: "230" },
    { label: "2,50m", slug: "250", code: "250" }
  ];

  const beamModels = [
    { label: "SLIM", slug: "slim", code: "SLM", category: "Longarinas SLIM" },
    { label: "MINI", slug: "mini", code: "MIN", category: "Longarinas MINI" },
    { label: "MINI 500kg", slug: "mini-500kg", code: "MIN500", category: "Longarinas MINI 500kg" }
  ];

  // Longarinas Reforçado 2000kg (Novo e Antigo)
  const reinforcedBeamSizes = [
    { label: "2m 2000kg", slug: "200-2000kg", code: "200-2T" },
    { label: "2,30m 2000kg", slug: "230-2000kg", code: "230-2T" },
    { label: "2,50m 2000kg", slug: "250-2000kg", code: "250-2T" }
  ];

  const reinforcedBeamModels = [
    {
      label: "Reforçado Novo",
      slug: "ref-novo",
      code: "REF-NV",
      category: "Longarinas Reforçado 2000kg (Novo)"
    },
    {
      label: "Reforçado Antigo",
      slug: "ref-antigo",
      code: "REF-AT",
      category: "Longarinas Reforçado 2000kg (Antigo)"
    }
  ];

  const catalog = [];

  // 1. Colunas SLIM e MINI (48 itens)
  columnModels.forEach((model) => {
    columnSizes.forEach((size) => {
      colors.forEach((color) => {
        catalog.push({
          id: `col-${model.slug}-${size.slug}-${color.slug}`,
          code: `COL-${model.code}-${size.code}-${color.code}`,
          category: `Colunas ${model.label}`,
          name: `Coluna ${model.label} ${size.label} — ${color.name}`,
          unit: "UN"
        });
      });
    });
  });

  // 2. Colunas Reforçado Novo e Antigo (24 itens)
  reinforcedColumnModels.forEach((model) => {
    reinforcedColumnSizes.forEach((size) => {
      colors.forEach((color) => {
        catalog.push({
          id: `col-${model.slug}-${size.slug}-${color.slug}`,
          code: `COL-${model.code}-${size.code}-${color.code}`,
          category: model.category,
          name: `Coluna ${model.label} ${size.label} — ${color.name}`,
          unit: "UN"
        });
      });
    });
  });

  // 3. Longarinas SLIM, MINI e MINI 500kg (48 itens)
  beamModels.forEach((model) => {
    beamSizes.forEach((size) => {
      colors.forEach((color) => {
        catalog.push({
          id: `lng-${model.slug}-${size.slug}-${color.slug}`,
          code: `LNG-${model.code}-${size.code}-${color.code}`,
          category: model.category,
          name: `Longarina ${model.label} ${size.label} — ${color.name}`,
          unit: "UN"
        });
      });
    });
  });

  // 4. Longarinas Reforçado 2000kg Novo e Antigo (24 itens)
  reinforcedBeamModels.forEach((model) => {
    reinforcedBeamSizes.forEach((size) => {
      colors.forEach((color) => {
        catalog.push({
          id: `lng-${model.slug}-${size.slug}-${color.slug}`,
          code: `LNG-${model.code}-${size.code}-${color.code}`,
          category: model.category,
          name: `Longarina ${model.label} ${size.label} — ${color.name}`,
          unit: "UN"
        });
      });
    });
  });

  return catalog;
}

const DEFAULT_PRODUCTS = buildDefaultCatalog();
const STORAGE_KEY = "pv_company_inventory_v3";

// ESTADO DA APLICAÇÃO
let state = {
  employeeName: "",
  countDate: getTodayISO(),
  countNotes: "",
  quantities: {},
  customProducts: [],
  selectedCategory: "Todas",
  viewMode: "all", // 'all' | 'filled'
  searchQuery: ""
};

// INICIALIZAÇÃO
document.addEventListener("DOMContentLoaded", () => {
  loadState();
  bindEvents();
  renderAll();
});

function getTodayISO() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now - offset).toISOString().split("T")[0];
}

function getAllProducts() {
  return [...DEFAULT_PRODUCTS, ...state.customProducts];
}

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem("pv_company_inventory_v2");
    if (saved) {
      const parsed = JSON.parse(saved);
      state = {
        ...state,
        ...parsed,
        countDate: parsed.countDate || getTodayISO(),
        quantities: parsed.quantities || {},
        customProducts: parsed.customProducts || []
      };
    }
  } catch (e) {
    console.error("Erro ao carregar dados salvos:", e);
  }

  document.getElementById("employeeName").value = state.employeeName;
  document.getElementById("countDate").value = state.countDate;
  document.getElementById("countNotes").value = state.countNotes;
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    const statusEl = document.getElementById("saveStatus");
    statusEl.textContent = "✓ Salvo automaticamente";
  } catch (e) {
    console.error("Erro ao salvar no navegador:", e);
  }
}

// EVENTOS
function bindEvents() {
  document.getElementById("employeeName").addEventListener("input", (e) => {
    state.employeeName = e.target.value;
    saveState();
  });

  document.getElementById("countDate").addEventListener("change", (e) => {
    state.countDate = e.target.value;
    saveState();
  });

  document.getElementById("countNotes").addEventListener("input", (e) => {
    state.countNotes = e.target.value;
    saveState();
  });

  // Busca
  const searchInput = document.getElementById("searchInput");
  const clearSearchBtn = document.getElementById("clearSearchBtn");

  searchInput.addEventListener("input", (e) => {
    state.searchQuery = e.target.value.trim();
    clearSearchBtn.classList.toggle("hidden", state.searchQuery === "");
    renderProductList();
  });

  clearSearchBtn.addEventListener("click", () => {
    state.searchQuery = "";
    searchInput.value = "";
    clearSearchBtn.classList.add("hidden");
    renderProductList();
  });

  // Toggle Todos / Apenas Preenchidos
  document.getElementById("viewAllBtn").addEventListener("click", () => {
    state.viewMode = "all";
    updateViewButtons();
    renderProductList();
  });

  document.getElementById("viewFilledBtn").addEventListener("click", () => {
    state.viewMode = "filled";
    updateViewButtons();
    renderProductList();
  });

  // Zerar contagem
  document.getElementById("btnClearAll").addEventListener("click", () => {
    const filledCount = Object.values(state.quantities).filter((q) => q > 0).length;
    if (filledCount === 0) {
      showToast("Todas as quantidades já estão zeradas.");
      return;
    }
    if (confirm("Deseja realmente zerar todas as quantidades preenchidas?")) {
      state.quantities = {};
      saveState();
      renderAll();
      showToast("Contagem zerada com sucesso.");
    }
  });

  // Modal Novo Item
  const addModal = document.getElementById("addModal");
  document.getElementById("btnAddProduct").addEventListener("click", () => {
    addModal.classList.remove("hidden");
    document.getElementById("newProdName").focus();
  });

  const closeModal = () => {
    addModal.classList.add("hidden");
    document.getElementById("addProductForm").reset();
  };

  document.getElementById("closeModalBtn").addEventListener("click", closeModal);
  document.getElementById("cancelModalBtn").addEventListener("click", closeModal);
  addModal.addEventListener("click", (e) => {
    if (e.target === addModal) closeModal();
  });

  document.getElementById("addProductForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const code = document.getElementById("newProdCode").value.trim().toUpperCase();
    const category = document.getElementById("newProdCategory").value;
    const name = document.getElementById("newProdName").value.trim();
    const unit = document.getElementById("newProdUnit").value;
    const qty = Math.max(0, parseInt(document.getElementById("newProdQty").value, 10) || 0);

    if (!name) return;

    const newId = "custom-" + Date.now();
    const generatedCode = code || "CST-" + String(state.customProducts.length + 1).padStart(3, "0");

    state.customProducts.push({
      id: newId,
      code: generatedCode,
      category,
      name,
      unit,
      isCustom: true
    });

    if (qty > 0) {
      state.quantities[newId] = qty;
    }

    saveState();
    closeModal();
    renderAll();
    showToast(`Item "${name}" adicionado ao catálogo.`);
  });

  // Exportação PDF e Impressão
  document.getElementById("btnPrintReport").addEventListener("click", handlePrintReport);
  document.getElementById("btnDownloadPdf").addEventListener("click", handleDownloadPdf);
}

function updateViewButtons() {
  document.getElementById("viewAllBtn").classList.toggle("active", state.viewMode === "all");
  document.getElementById("viewFilledBtn").classList.toggle("active", state.viewMode === "filled");
}

// RENDERIZAÇÃO
function renderAll() {
  renderCategoryTabs();
  renderProductList();
  updateStats();
}

function renderCategoryTabs() {
  const products = getAllProducts();
  const categories = ["Todas", ...new Set(products.map((p) => p.category))];
  const container = document.getElementById("categoryTabs");

  container.innerHTML = categories
    .map((cat) => {
      const isActive = state.selectedCategory === cat ? "active" : "";
      return `<button type="button" class="cat-tab ${isActive}" data-cat="${escapeHtml(cat)}">${escapeHtml(cat)}</button>`;
    })
    .join("");

  container.querySelectorAll(".cat-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.selectedCategory = btn.dataset.cat;
      renderCategoryTabs();
      renderProductList();
    });
  });
}

function renderProductList() {
  const container = document.getElementById("productListContainer");
  const allProducts = getAllProducts();
  const query = state.searchQuery.toLowerCase();

  const filtered = allProducts.filter((prod) => {
    const qty = state.quantities[prod.id] || 0;
    if (state.viewMode === "filled" && qty <= 0) return false;
    if (state.selectedCategory !== "Todas" && prod.category !== state.selectedCategory) return false;
    if (query) {
      const matchName = prod.name.toLowerCase().includes(query);
      const matchCode = prod.code.toLowerCase().includes(query);
      const matchCat = prod.category.toLowerCase().includes(query);
      if (!matchName && !matchCode && !matchCat) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p><strong>Nenhum material encontrado com os filtros atuais.</strong></p>
        <p style="font-size: 0.85rem; margin-top: 4px;">Tente limpar a busca ou alternar para "Todos".</p>
      </div>
    `;
    return;
  }

  const grouped = {};
  filtered.forEach((prod) => {
    if (!grouped[prod.category]) grouped[prod.category] = [];
    grouped[prod.category].push(prod);
  });

  container.innerHTML = Object.entries(grouped)
    .map(([category, items]) => {
      const filledInCat = items.filter((i) => (state.quantities[i.id] || 0) > 0).length;

      const rowsHtml = items
        .map((item) => {
          const qty = state.quantities[item.id] || 0;
          const hasQtyClass = qty > 0 ? "has-qty" : "";
          const deleteBtn = item.isCustom
            ? `<button type="button" class="delete-custom-btn" data-del="${item.id}" title="Remover item personalizado">&times;</button>`
            : "";

          return `
            <div class="product-row ${hasQtyClass}" data-row-id="${item.id}">
              <div class="product-info">
                <div class="product-title-line">
                  <span class="product-code">${escapeHtml(item.code)}</span>
                  <span class="product-name">${escapeHtml(item.name)}</span>
                  <span class="product-unit-tag">(${escapeHtml(item.unit)})</span>
                  ${deleteBtn}
                </div>
              </div>
              <div class="qty-controls">
                <button type="button" class="qty-btn" data-action="dec" data-id="${item.id}" aria-label="Diminuir">−</button>
                <input
                  type="number"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  class="qty-input"
                  min="0"
                  step="1"
                  value="${qty}"
                  data-id="${item.id}"
                  aria-label="Quantidade de ${escapeHtml(item.name)}"
                />
                <button type="button" class="qty-btn" data-action="inc" data-id="${item.id}" aria-label="Aumentar">+</button>
              </div>
            </div>
          `;
        })
        .join("");

      return `
        <div class="category-block">
          <div class="category-header">
            <h3>${escapeHtml(category)}</h3>
            <span class="category-badge">${filledInCat}/${items.length} preenchidos</span>
          </div>
          <div>${rowsHtml}</div>
        </div>
      `;
    })
    .join("");

  container.querySelectorAll(".qty-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const current = state.quantities[id] || 0;
      const next = btn.dataset.action === "inc" ? current + 1 : Math.max(0, current - 1);
      setQuantity(id, next);
    });
  });

  container.querySelectorAll(".qty-input").forEach((input) => {
    input.addEventListener("focus", () => input.select());
    input.addEventListener("input", () => {
      const id = input.dataset.id;
      const val = Math.max(0, parseInt(input.value, 10) || 0);
      setQuantity(id, val, false);
    });
    input.addEventListener("blur", () => {
      const id = input.dataset.id;
      const val = Math.max(0, parseInt(input.value, 10) || 0);
      input.value = val;
      setQuantity(id, val, true);
    });
  });

  container.querySelectorAll(".delete-custom-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.del;
      if (confirm("Remover este item personalizado do catálogo?")) {
        state.customProducts = state.customProducts.filter((p) => p.id !== id);
        delete state.quantities[id];
        saveState();
        renderAll();
        showToast("Item removido.");
      }
    });
  });
}

function setQuantity(id, qty, reRenderAll = true) {
  if (qty <= 0) {
    delete state.quantities[id];
  } else {
    state.quantities[id] = qty;
  }

  saveState();
  updateStats();

  const row = document.querySelector(`.product-row[data-row-id="${id}"]`);
  if (row) {
    row.classList.toggle("has-qty", qty > 0);
    const input = row.querySelector(".qty-input");
    if (input && reRenderAll) {
      input.value = qty;
    }
  }

  if (reRenderAll && state.viewMode === "filled" && qty === 0) {
    renderProductList();
  }
}

function updateStats() {
  const allProducts = getAllProducts();
  let filledItems = 0;
  let totalUnits = 0;

  allProducts.forEach((prod) => {
    const q = state.quantities[prod.id] || 0;
    if (q > 0) {
      filledItems++;
      totalUnits += q;
    }
  });

  document.getElementById("statCatalogTotal").textContent = allProducts.length;
  document.getElementById("statFilledItems").textContent = filledItems;
  document.getElementById("statTotalUnits").textContent = totalUnits.toLocaleString("pt-BR");
}

// PREPARAÇÃO E GERAÇÃO DO RELATÓRIO PDF / IMPRESSÃO
function preparePrintableReport() {
  const allProducts = getAllProducts();
  const filledProducts = allProducts.filter((p) => (state.quantities[p.id] || 0) > 0);

  if (filledProducts.length === 0) {
    alert("Preencha a quantidade de pelo menos 1 material antes de gerar o PDF ou imprimir.");
    return false;
  }

  const empName = state.employeeName.trim() || "Não informado";
  const notes = state.countNotes.trim() || "Nenhuma observação registrada.";
  const formattedDate = formatDateBR(state.countDate);
  const nowTime = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

  document.getElementById("printDate").textContent = formattedDate;
  document.getElementById("printTime").textContent = nowTime;
  document.getElementById("printEmployee").textContent = empName;
  document.getElementById("printSignName").textContent = empName;
  document.getElementById("printNotes").textContent = notes;
  document.getElementById("printItemCount").textContent = `${filledProducts.length} ${filledProducts.length === 1 ? "item" : "itens"}`;

  let grandTotal = 0;
  const tbody = document.getElementById("printTableBody");

  tbody.innerHTML = filledProducts
    .map((item) => {
      const qty = state.quantities[item.id] || 0;
      grandTotal += qty;
      return `
        <tr>
          <td><strong>${escapeHtml(item.code)}</strong></td>
          <td>${escapeHtml(item.category)}</td>
          <td>${escapeHtml(item.name)}</td>
          <td style="text-align: center;">${escapeHtml(item.unit)}</td>
          <td style="text-align: right;"><strong>${qty.toLocaleString("pt-BR")}</strong></td>
        </tr>
      `;
    })
    .join("");

  document.getElementById("printGrandTotal").textContent = grandTotal.toLocaleString("pt-BR");
  return true;
}

function handlePrintReport() {
  if (!preparePrintableReport()) return;
  window.print();
}

function handleDownloadPdf() {
  if (!preparePrintableReport()) return;

  const reportEl = document.getElementById("printableReport");
  const dateSlug = state.countDate || getTodayISO();
  const empSlug = (state.employeeName.trim() || "estoque")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-");

  const filename = `PV-Company-Estoque-${dateSlug}-${empSlug}.pdf`;

  if (typeof html2pdf === "undefined") {
    window.print();
    return;
  }

  const scrollPos = window.scrollY;
  window.scrollTo(0, 0);

  document.body.classList.add("generating-pdf");
  document.querySelectorAll(".no-print").forEach((el) => (el.style.display = "none"));
  reportEl.classList.add("pdf-rendering");
  showToast("Gerando arquivo PDF...");

  const opt = {
    margin: [10, 10, 10, 10],
    filename: filename,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      scrollX: 0,
      scrollY: 0,
      x: 0,
      y: 0,
      width: 710,
      windowWidth: 710
    },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    pagebreak: { mode: ["css", "legacy"], avoid: ["tr", ".print-footer", ".print-header"] }
  };

  const restoreUI = () => {
    reportEl.classList.remove("pdf-rendering");
    document.querySelectorAll(".no-print").forEach((el) => (el.style.display = ""));
    document.body.classList.remove("generating-pdf");
    window.scrollTo(0, scrollPos);
  };

  html2pdf()
    .set(opt)
    .from(reportEl)
    .save()
    .then(() => {
      restoreUI();
      showToast("PDF baixado com sucesso!");
    })
    .catch(() => {
      restoreUI();
      window.print();
    });
}

// UTILITÁRIOS
function formatDateBR(isoStr) {
  if (!isoStr || !isoStr.includes("-")) return isoStr || "—";
  const [y, m, d] = isoStr.split("-");
  return `${d}/${m}/${y}`;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

let toastTimer = null;
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}