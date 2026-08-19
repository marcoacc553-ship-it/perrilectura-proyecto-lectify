const STORAGE_KEY = "perriLecturaState";
function defaultState() { return { completedDates:[], dailyReadings:{}, lastFedDate:null, streak:0, coins:0, ownedPets:["luna","nico"] }; }
function loadState() { try { const state = { ...defaultState(), ...JSON.parse(localStorage.getItem(STORAGE_KEY)) }; state.dailyReadings = state.dailyReadings && typeof state.dailyReadings === "object" ? state.dailyReadings : {}; state.ownedPets = Array.isArray(state.ownedPets) ? [...new Set(["luna","nico",...state.ownedPets])] : ["luna","nico"]; return state; } catch { return defaultState(); } }
function saveState(state) { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function localDay(date = new Date()) { return [date.getFullYear(),String(date.getMonth()+1).padStart(2,"0"),String(date.getDate()).padStart(2,"0")].join("-"); }
