const state = loadState();
const today = localDay();
const $ = (id) => document.getElementById(id);
const startOfYear = new Date(new Date().getFullYear(),0,0);
const dayOfYear = Math.floor((new Date() - startOfYear) / 86400000);
const reading = READINGS[(dayOfYear - 1) % READINGS.length];
const petNames = { dog:"Luna", dino:"Nico" };
function isDinoUnlocked() { return state.dinoUnlocked || state.completedDates.length >= 7; }
function render() {
  const doneToday = state.lastFedDate === today;
  const dinoUnlocked = isDinoUnlocked();
  if (state.activePet === "dino" && !dinoUnlocked) state.activePet = "dog";
  const activePet = state.activePet === "dino" ? "dino" : "dog";
  const name = petNames[activePet];
  $("streakValue").textContent = state.streak;
  $("coinsValue").textContent = state.coins;
  $("readingsValue").textContent = state.completedDates.length;
  $("progressText").textContent = `${Math.min(state.completedDates.length,7)} / 7 días`;
  $("progressBar").style.width = `${Math.min(state.completedDates.length / 7 * 100,100)}%`;
  $("feedButton").disabled = doneToday;
  $("feedButton").textContent = doneToday ? `✓ ${name} ya comió hoy` : `${activePet === "dino" ? "🥬" : "🍖"} Alimentar a ${name}`;
  $("dailyStatus").textContent = doneToday ? "¡Excelente! Vuelve mañana para una nueva lectura." : "";
  $("pet").hidden = activePet !== "dog"; $("dinoPet").hidden = activePet !== "dino";
  $("pet").classList.toggle("happy",doneToday); $("pet").classList.toggle("hungry",!doneToday);
  $("food").textContent = activePet === "dino" ? "🥬" : "🍖";
  $("petTitle").textContent = doneToday ? `${name} está feliz` : `${name} tiene hambre`;
  $("petMessage").textContent = doneToday ? `Gracias por leer hoy. Tu amistad hace crecer a ${name}.` : "Lee y responde las preguntas para darle su comida de hoy.";
  $("dinoUnlock").hidden = !dinoUnlocked;
  $("dogButton").classList.toggle("selected",activePet === "dog"); $("dinoButton").classList.toggle("selected",activePet === "dino");
}
function showReading() {
  $("readingSection").hidden = false; $("readingTitle").textContent = reading.title; $("readingText").textContent = reading.text;
  $("questions").innerHTML = reading.questions.map((q,i) => `<fieldset class="question"><legend>${i+1}. ${q.text}</legend>${q.options.map((o,j)=>`<label class="option"><input type="radio" name="q${i}" value="${j}"> ${o}</label>`).join("")}</fieldset>`).join("");
  $("readingSection").scrollIntoView({behavior:"smooth",block:"start"});
}
function finishDay() {
  const yesterday = new Date(); yesterday.setDate(yesterday.getDate()-1);
  state.streak = state.lastFedDate === localDay(yesterday) ? state.streak + 1 : 1;
  state.lastFedDate = today; if (!state.completedDates.includes(today)) state.completedDates.push(today); state.coins += 10;
  const unlockedNow = !state.dinoUnlocked && state.completedDates.length >= 7;
  if (state.completedDates.length >= 7) state.dinoUnlocked = true;
  saveState(state);
  $("food").classList.add("show"); setTimeout(()=>$("food").classList.remove("show"),1100);
  $("readingSection").hidden = true; render();
  if (unlockedNow) $("dailyStatus").textContent = "¡Logro especial! Desbloqueaste a Nico, tu mascota dinosaurio.";
  window.scrollTo({top:0,behavior:"smooth"});
}
$("feedButton").addEventListener("click",showReading);
$("quizForm").addEventListener("submit",(event)=> { event.preventDefault(); const answers = reading.questions.map((_,i)=>document.querySelector(`input[name="q${i}"]:checked`)); const feedback=$("quizFeedback"); if (answers.some(x=>!x)) { feedback.textContent="Responde las tres preguntas antes de continuar."; feedback.className="feedback error"; return; } const correct=answers.every((a,i)=>Number(a.value)===reading.questions[i].answer); if (!correct) { feedback.textContent="Aún no es correcto. Vuelve a leer con calma e inténtalo otra vez."; feedback.className="feedback error"; return; } feedback.textContent=`¡Muy bien! ${petNames[state.activePet] || "Luna"} recibió su comida y ganaste 10 monedas.`; feedback.className="feedback success"; setTimeout(finishDay,850); });
$("dogButton").addEventListener("click",()=> { state.activePet="dog"; saveState(state); render(); });
$("dinoButton").addEventListener("click",()=> { if (isDinoUnlocked()) { state.activePet="dino"; saveState(state); render(); } });
$("resetButton").addEventListener("click",()=> { if (confirm("¿Quieres borrar todo tu progreso?")) { localStorage.removeItem(STORAGE_KEY); location.reload(); } });
render();
