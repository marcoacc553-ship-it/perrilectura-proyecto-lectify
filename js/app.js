const state = loadState();
const today = localDay();
const $ = (id) => document.getElementById(id);
const startOfYear = new Date(new Date().getFullYear(), 0, 0);
const dayOfYear = Math.floor((new Date() - startOfYear) / 86400000);
const DAILY_GOAL = 3;
const readingIndex = (dayOfYear - 1) % READINGS.length;
let currentReadingIndex = readingIndex;
const getTodayReadings = () => Array.isArray(state.dailyReadings?.[today]) ? state.dailyReadings[today] : [];
const getCurrentReading = () => READINGS[currentReadingIndex];

const PETS = {
  luna: { name:"Luna", emoji:"🐶", description:"Perrita lectora", starter:true },
  nico: { name:"Nico", emoji:"🦕", description:"Dinosaurio curioso", starter:true },
  conejo: { name:"Bruno", emoji:"🐰", description:"Conejo saltarín", cost:15 },
  gatita: { name:"Mía", emoji:"🐱", description:"Gatita exploradora", cost:20 },
  tortuga: { name:"Toto", emoji:"🐢", description:"Tortuga tranquila", cost:25 },
  pajarito: { name:"Pipo", emoji:"🐦", description:"Pajarito cantante", cost:30 }
};
const SHOP_PETS = Object.entries(PETS).filter(([, pet]) => !pet.starter);

function petArt(id, extraClass = "") {
  if (id === "luna" || id === "nico") return `<span class="pet-emoji ${extraClass}">${PETS[id].emoji}</span>`;
  return `<span class="pet-art pet-${id} ${extraClass}" aria-hidden="true"><i></i><b></b><em></em></span>`;
}

function renderPets() {
  const owned = state.ownedPets.filter((id) => PETS[id]);
  const extra = owned.filter((id) => !PETS[id].starter);
  $("petsCount").textContent = `${owned.length} ${owned.length === 1 ? "mascota" : "mascotas"}`;
  $("parcelPets").innerHTML = owned.map((id) => `<article class="parcel-pet">${petArt(id, "parcel-art")}<div><strong>${PETS[id].name}</strong><small>${PETS[id].description}</small></div></article>`).join("");
  $("extraPets").innerHTML = extra.map((id) => `<span class="scene-pet" title="${PETS[id].name}">${petArt(id)}</span>`).join("");
}

function renderShop() {
  $("shopItems").innerHTML = SHOP_PETS.map(([id, pet]) => {
    const owned = state.ownedPets.includes(id);
    const canBuy = state.coins >= pet.cost;
    return `<article class="shop-item ${owned ? "owned" : ""}">${petArt(id, "shop-art")}<div class="shop-details"><h3>${pet.name}</h3><p>${pet.description}</p><strong>${owned ? "✓ Ya vive en tu parcela" : `🪙 ${pet.cost} monedas`}</strong></div><button class="buy-button" type="button" data-pet="${id}" ${owned || !canBuy ? "disabled" : ""}>${owned ? "Adoptado" : canBuy ? "Adoptar" : "Faltan monedas"}</button></article>`;
  }).join("");
}

function render() {
  const completedToday = getTodayReadings().length;
  const doneToday = completedToday >= DAILY_GOAL;
  $("streakValue").textContent = state.streak;
  $("coinsValue").textContent = state.coins;
  $("readingsValue").textContent = state.completedDates.length;
  $("progressText").textContent = `${Math.min(state.completedDates.length, 7)} / 7 días`;
  $("progressBar").style.width = `${Math.min(state.completedDates.length / 7 * 100, 100)}%`;
  $("feedButton").disabled = doneToday;
  $("feedButton").textContent = doneToday ? "✓ Meta de hoy completada" : `📚 Leer ${completedToday + 1} de ${DAILY_GOAL}`;
  $("dailyStatus").textContent = doneToday ? "¡Excelente! Completaste las 3 lecturas de hoy. Vuelve mañana para una nueva meta." : `Hoy llevas ${completedToday} de ${DAILY_GOAL} lecturas. Completa las 3 para alimentar a tus mascotas.`;
  $("pet").classList.toggle("happy", doneToday);
  $("pet").classList.toggle("hungry", !doneToday);
  $("petTitle").textContent = doneToday ? "Luna y Nico están felices" : `Luna y Nico esperan ${DAILY_GOAL - completedToday} lectura${DAILY_GOAL - completedToday === 1 ? "" : "s"}`;
  $("petMessage").textContent = doneToday ? "Completaste las 3 lecturas y cuidaste toda la parcela." : "Lee, responde y completa 3 lecturas diferentes cada día para cuidar a tus mascotas.";
  renderPets();
  renderShop();
}

function showReading() {
  const completed = getTodayReadings();
  const available = READINGS.map((_, index) => index).filter((index) => !completed.includes(index));
  currentReadingIndex = available.length ? available[0] : readingIndex;
  const reading = getCurrentReading();
  $("readingSection").hidden = false;
  $("readingTitle").textContent = `${reading.title} · Lectura ${completed.length + 1} de ${DAILY_GOAL}`;
  $("readingText").textContent = reading.text;
  $("questions").innerHTML = reading.questions.map((q, i) => `<fieldset class="question"><legend>${i + 1}. ${q.text}</legend>${q.options.map((o, j) => `<label class="option"><input type="radio" name="q${i}" value="${j}"> ${o}</label>`).join("")}</fieldset>`).join("");
  $("quizFeedback").textContent = "";
  $("quizFeedback").className = "feedback";
  $("readingSection").scrollIntoView({ behavior:"smooth", block:"start" });
}

function finishReading() {
  const todayReadings = getTodayReadings();
  if (!todayReadings.includes(currentReadingIndex)) todayReadings.push(currentReadingIndex);
  state.dailyReadings[today] = todayReadings;
  const completedToday = todayReadings.length;
  if (completedToday >= DAILY_GOAL) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    state.streak = state.lastFedDate === localDay(yesterday) ? state.streak + 1 : 1;
    state.lastFedDate = today;
    if (!state.completedDates.includes(today)) state.completedDates.push(today);
  }
  state.coins += 10;
  saveState(state);
  $("food").classList.add("show");
  setTimeout(() => $("food").classList.remove("show"), 1100);
  $("readingSection").hidden = true;
  render();
  window.scrollTo({ top:0, behavior:"smooth" });
}

function buyPet(id) {
  const pet = PETS[id];
  const feedback = $("shopFeedback");
  if (!pet || pet.starter || state.ownedPets.includes(id)) return;
  if (state.coins < pet.cost) {
    feedback.textContent = `Necesitas ${pet.cost - state.coins} monedas más para adoptar a ${pet.name}.`;
    feedback.className = "feedback error";
    return;
  }
  state.coins -= pet.cost;
  state.ownedPets.push(id);
  saveState(state);
  feedback.textContent = `¡${pet.name} ya vive en tu parcela!`;
  feedback.className = "feedback success";
  render();
}

$("feedButton").addEventListener("click", showReading);
$("quizForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const reading = getCurrentReading();
  const answers = reading.questions.map((_, i) => document.querySelector(`input[name="q${i}"]:checked`));
  const feedback = $("quizFeedback");
  if (answers.some((answer) => !answer)) {
    feedback.textContent = "Responde las tres preguntas antes de continuar.";
    feedback.className = "feedback error";
    return;
  }
  const correct = answers.every((answer, i) => Number(answer.value) === reading.questions[i].answer);
  if (!correct) {
    feedback.textContent = "Aún no es correcto. Vuelve a leer con calma e inténtalo otra vez.";
    feedback.className = "feedback error";
    return;
  }
  const completedAfter = getTodayReadings().length + (getTodayReadings().includes(currentReadingIndex) ? 0 : 1);
  feedback.textContent = completedAfter >= DAILY_GOAL ? "¡Excelente! Completaste las 3 lecturas de hoy y ganaste 10 monedas." : `¡Muy bien! Completaste ${completedAfter} de ${DAILY_GOAL} lecturas. Ganaste 10 monedas.`;
  feedback.className = "feedback success";
  setTimeout(finishReading, 850);
});
$("shopItems").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-pet]");
  if (button) buyPet(button.dataset.pet);
});
$("shopButton").addEventListener("click", () => {
  $("shopSection").hidden = false;
  $("shopFeedback").textContent = "";
  $("shopSection").scrollTop = 0;
});
$("closeShopButton").addEventListener("click", () => { $("shopSection").hidden = true; });
$("shopSection").addEventListener("click", (event) => { if (event.target === $("shopSection")) $("shopSection").hidden = true; });
document.addEventListener("keydown", (event) => { if (event.key === "Escape") $("shopSection").hidden = true; });
$("resetButton").addEventListener("click", () => {
  if (confirm("¿Quieres borrar todo tu progreso y tus mascotas compradas?")) {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  }
});
render();
