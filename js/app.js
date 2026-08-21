const state = loadState();
const today = localDay();
const $ = (id) => document.getElementById(id);
const DAILY_GOAL = 3;
const startOfYear = new Date(new Date().getFullYear(), 0, 0);
const dayOfYear = Math.floor((new Date() - startOfYear) / 86400000);

// Cada mascota genera monedas automáticamente. Los valores son por segundo.
const PETS = {
  luna: { name:"Luna", emoji:"🐶", description:"Perrita lectora", starter:true, income:0.15 },
  nico: { name:"Nico", emoji:"🦕", description:"Dinosaurio curioso", starter:true, income:0.20 },
  conejo: { name:"Bruno", emoji:"🐰", description:"Conejo saltarín", cost:15, income:0.35 },
  gatita: { name:"Mía", emoji:"🐱", description:"Gatita exploradora", cost:20, income:0.45 },
  tortuga: { name:"Toto", emoji:"🐢", description:"Tortuga tranquila", cost:25, income:0.55 },
  pajarito: { name:"Pipo", emoji:"🐦", description:"Pajarito cantante", cost:30, income:0.70 },
  dragoncito: { name:"Drako", emoji:"🐉", description:"Dragón legendario que genera muchas monedas", cost:250, income:3.00, legendary:true }
};
const SHOP_PETS = Object.entries(PETS).filter(([, pet]) => !pet.starter);
const LEGENDARY_ID = "dragoncito";

function getTodayReadings() {
  const pool = READINGS.map((_, index) => index);
  let seed = dayOfYear * 9301 + 49297;
  for (let i = pool.length - 1; i > 0; i--) {
    seed = (seed * 233280 + 12345) % 2147483647;
    const j = seed % (i + 1);
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, DAILY_GOAL);
}
const todayReadingIds = getTodayReadings();
let activeReadingId = null;
getDailyProgress(state, today);

function getIncomePerSecond() {
  return state.ownedPets.reduce((total, id) => total + (PETS[id]?.income || 0), 0);
}
function collectPassiveIncome() {
  const now = Date.now();
  const last = Number.isFinite(state.incomeLastUpdate) ? state.incomeLastUpdate : now;
  const elapsed = Math.max(0, Math.min((now - last) / 1000, 86400));
  const income = getIncomePerSecond();
  const earned = income * elapsed;
  state.coins = Number((state.coins + earned).toFixed(2));
  state.incomeLastUpdate = now;
  if (earned > 0) saveState(state);
  return earned;
}
function formatCoins(value) { return Number(value).toLocaleString("es-PE", { maximumFractionDigits:2 }); }
function petArt(id, extraClass = "") {
  if (id === "luna" || id === "nico") return `<span class="pet-emoji ${extraClass} pet-${id}" aria-hidden="true">${PETS[id].emoji}</span>`;
  return `<span class="pet-art pet-${id} ${extraClass}" aria-hidden="true"><i class="pet-ear-left"></i><i class="pet-ear-right"></i><b class="pet-head"></b><em class="pet-body"></em><span class="pet-face"></span><span class="pet-feet"></span><span class="pet-tail"></span></span>`;
}
function completedToday() { return state.dailyProgress.completed.length; }
function isDayComplete() { return completedToday() >= DAILY_GOAL; }
function renderPets() {
  const owned = state.ownedPets.filter((id) => PETS[id]);
  const extra = owned.filter((id) => !PETS[id].starter);
  $("petsCount").textContent = `${owned.length} ${owned.length === 1 ? "mascota" : "mascotas"}`;
  $("parcelPets").innerHTML = owned.map((id) => `<article class="parcel-pet ${PETS[id].legendary ? "legendary-card" : ""}">${petArt(id, "parcel-art")}<div><strong>${PETS[id].legendary ? "👑 " : ""}${PETS[id].name}</strong><small>${PETS[id].description}</small><small>⚡ ${formatCoins(PETS[id].income)} monedas/s</small></div></article>`).join("");
  $("extraPets").innerHTML = extra.map((id) => `<span class="scene-pet ${PETS[id].legendary ? "legendary-scene" : ""}" title="${PETS[id].name}">${petArt(id)}</span>`).join("");
}
function renderShop() {
  $("shopItems").innerHTML = SHOP_PETS.map(([id, pet]) => {
    const owned = state.ownedPets.includes(id);
    const canBuy = state.coins >= pet.cost;
    return `<article class="shop-item ${owned ? "owned" : ""} ${pet.legendary ? "legendary-card" : ""}">${petArt(id, "shop-art")}<div class="shop-details"><h3>${pet.legendary ? "👑 " : ""}${pet.name}</h3><p>${pet.description}</p><strong>${owned ? "✓ Ya vive en tu parcela" : `🪙 ${pet.cost} monedas · ⚡ ${formatCoins(pet.income)}/s`}</strong></div><button class="buy-button" type="button" data-pet="${id}" ${owned || !canBuy ? "disabled" : ""}>${owned ? "Adoptado" : canBuy ? "Adoptar" : "Faltan monedas"}</button></article>`;
  }).join("");
}
function render() {
  collectPassiveIncome();
  const done = completedToday();
  const remaining = Math.max(DAILY_GOAL - done, 0);
  const income = getIncomePerSecond();
  $("streakValue").textContent = state.streak;
  $("coinsValue").textContent = formatCoins(state.coins);
  $("incomeValue").textContent = formatCoins(income);
  $("readingsValue").textContent = state.totalReadings;
  $("progressText").textContent = `${Math.min(state.completedDates.length, 7)} / 7 días`;
  $("progressBar").style.width = `${Math.min(state.completedDates.length / 7 * 100, 100)}%`;
  $("dailyProgressText").textContent = `${done} / ${DAILY_GOAL} lecturas`;
  $("dailyProgressHint").textContent = remaining ? `Te ${remaining === 1 ? "falta" : "faltan"} ${remaining} ${remaining === 1 ? "lectura" : "lecturas"}` : "¡Meta diaria completada!";
  $("dailyProgressBar").style.width = `${Math.min(done / DAILY_GOAL * 100, 100)}%`;
  $("feedButton").disabled = isDayComplete();
  $("feedButton").textContent = isDayComplete() ? "✓ Completaste las 3 lecturas" : `📖 Leer (${done + 1}/${DAILY_GOAL})`;
  $("dailyStatus").textContent = isDayComplete() ? "¡Excelente! Vuelve mañana para tus siguientes 3 lecturas." : `Completa ${remaining} ${remaining === 1 ? "lectura" : "lecturas"} más para cuidar a tus mascotas.`;
  $("pet").classList.toggle("happy", isDayComplete());
  $("pet").classList.toggle("hungry", !isDayComplete());
  $("petTitle").textContent = isDayComplete() ? "Luna y Nico están felices" : `Luna y Nico esperan tu lectura ${done + 1}`;
  $("petMessage").textContent = isDayComplete() ? "¡Terminaste las 3 lecturas de hoy! Tus mascotas siguen generando monedas." : "Lee, responde las preguntas y avanza por las 3 lecturas de hoy.";
  $("incomeText").textContent = income > 0 ? `Tus mascotas generan ${formatCoins(income)} monedas cada segundo. ¡Incluso mientras esperas!` : "Consigue mascotas para generar monedas automáticamente.";
  renderPets(); renderShop();
}
function showReading() {
  if (isDayComplete()) return;
  const next = todayReadingIds.find(id => !state.dailyProgress.completed.includes(id));
  activeReadingId = next ?? todayReadingIds[0];
  const reading = READINGS[activeReadingId];
  $("readingSection").hidden = false;
  $("readingTitle").textContent = `Lectura ${completedToday() + 1} de ${DAILY_GOAL}: ${reading.title}`;
  $("readingText").textContent = reading.text;
  $("questions").innerHTML = reading.questions.map((q, i) => `<fieldset class="question"><legend>${i + 1}. ${q.text}</legend>${q.options.map((o, j) => `<label class="option"><input type="radio" name="q${i}" value="${j}"> ${o}</label>`).join("")}</fieldset>`).join("");
  $("quizFeedback").textContent = ""; $("quizFeedback").className = "feedback";
  $("readingSection").scrollIntoView({ behavior:"smooth", block:"start" });
}
function finishReading() {
  const wasComplete = isDayComplete();
  if (!state.dailyProgress.completed.includes(activeReadingId)) {
    state.dailyProgress.completed.push(activeReadingId);
    state.totalReadings += 1;
    state.coins += 10;
  }
  if (!wasComplete && isDayComplete()) {
    const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
    state.streak = state.lastFedDate === localDay(yesterday) ? state.streak + 1 : 1;
    state.lastFedDate = today;
    if (!state.completedDates.includes(today)) state.completedDates.push(today);
  }
  saveState(state);
  $("food").classList.add("show");
  setTimeout(() => $("food").classList.remove("show"), 1100);
  $("readingSection").hidden = true;
  render(); window.scrollTo({ top:0, behavior:"smooth" });
}
function buyPet(id) {
  const pet = PETS[id], feedback = $("shopFeedback");
  if (!pet || pet.starter || state.ownedPets.includes(id)) return;
  collectPassiveIncome();
  if (state.coins < pet.cost) { feedback.textContent = `Necesitas ${formatCoins(pet.cost - state.coins)} monedas más para adoptar a ${pet.name}.`; feedback.className = "feedback error"; return; }
  state.coins = Number((state.coins - pet.cost).toFixed(2)); state.ownedPets.push(id); saveState(state);
  feedback.textContent = pet.legendary ? `🌟 ¡${pet.name} ha llegado! Es una mascota LEGENDARIA.` : `¡${pet.name} ya vive en tu parcela!`;
  feedback.className = "feedback success"; render();
}
let eggClicks = 0;
let eggTimer = null;
function triggerLegendaryEgg() {
  eggClicks += 1;
  clearTimeout(eggTimer);
  eggTimer = setTimeout(() => eggClicks = 0, 1800);
  if (eggClicks >= 5) {
    eggClicks = 0;
    if (!state.ownedPets.includes(LEGENDARY_ID)) {
      state.ownedPets.push(LEGENDARY_ID);
      state.incomeLastUpdate = Date.now();
      saveState(state); render();
      alert("🌟 ¡EASTER EGG! Encontraste a Drako, la mascota legendaria. Genera 3 monedas por segundo.");
    } else {
      state.coins += 50; saveState(state); render();
      alert("🥚 ¡Easter egg encontrado otra vez! Recibiste 50 monedas.");
    }
  }
}
$("feedButton").addEventListener("click", showReading);
$("quizForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const reading = READINGS[activeReadingId];
  const answers = reading.questions.map((_, i) => document.querySelector(`input[name="q${i}"]:checked`));
  const feedback = $("quizFeedback");
  if (answers.some((answer) => !answer)) { feedback.textContent = "Responde las tres preguntas antes de continuar."; feedback.className = "feedback error"; return; }
  const correct = answers.every((answer, i) => Number(answer.value) === reading.questions[i].answer);
  if (!correct) { feedback.textContent = "Aún no es correcto. Vuelve a leer con calma e inténtalo otra vez."; feedback.className = "feedback error"; return; }
  const last = completedToday() === DAILY_GOAL - 1;
  feedback.textContent = last ? "¡Excelente! Completaste las 3 lecturas y ganaste 10 monedas." : `¡Muy bien! Lectura completada. Ganaste 10 monedas. Te quedan ${DAILY_GOAL - completedToday() - 1} ${DAILY_GOAL - completedToday() - 1 === 1 ? "lectura" : "lecturas"}.`;
  feedback.className = "feedback success"; setTimeout(finishReading, 850);
});
$("shopItems").addEventListener("click", (event) => { const button = event.target.closest("button[data-pet]"); if (button) buyPet(button.dataset.pet); });
$("shopButton").addEventListener("click", () => { $("shopSection").hidden = false; $("shopFeedback").textContent = ""; });
$("closeShopButton").addEventListener("click", () => { $("shopSection").hidden = true; });
$("shopSection").addEventListener("click", (event) => { if (event.target === $("shopSection")) $("shopSection").hidden = true; });
$("brandButton").addEventListener("click", triggerLegendaryEgg);
document.addEventListener("keydown", (event) => { if (event.key === "Escape") $("shopSection").hidden = true; });
$("resetButton").addEventListener("click", () => { if (confirm("¿Quieres borrar todo tu progreso y tus mascotas compradas?")) { localStorage.removeItem(STORAGE_KEY); location.reload(); } });

setInterval(() => render(), 1000);
render();
