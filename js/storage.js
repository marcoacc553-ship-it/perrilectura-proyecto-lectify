const STORAGE_KEY = "perriLecturaState";
const DAILY_READING_GOAL = 3;
function defaultState() {
  return { completedDates:[], lastFedDate:null, streak:0, coins:0, ownedPets:["luna","nico"], totalReadings:0, incomeLastUpdate:Date.now(), dailyProgress:{ date:null, completed:[] } };
}
function loadState() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    const state = { ...defaultState(), ...(raw || {}) };
    state.ownedPets = Array.isArray(state.ownedPets) ? [...new Set(["luna","nico",...state.ownedPets])] : ["luna","nico"];
    state.completedDates = Array.isArray(state.completedDates) ? state.completedDates : [];
    state.totalReadings = Number.isFinite(state.totalReadings) ? state.totalReadings : state.completedDates.length;
    state.incomeLastUpdate = Number.isFinite(state.incomeLastUpdate) ? state.incomeLastUpdate : Date.now();
    state.dailyProgress = state.dailyProgress && Array.isArray(state.dailyProgress.completed) ? state.dailyProgress : { date:null, completed:[] };
    return state;
  } catch { return defaultState(); }
}
function saveState(state) { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function localDay(date = new Date()) { return [date.getFullYear(),String(date.getMonth()+1).padStart(2,"0"),String(date.getDate()).padStart(2,"0")].join("-"); }
function getDailyProgress(state, today = localDay()) {
  if (state.dailyProgress.date !== today) {
    state.dailyProgress = { date:today, completed:[] };
    saveState(state);
  }
  return state.dailyProgress;
}
