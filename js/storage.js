const STORAGE_KEY = "perriLecturaState";
function defaultState() { return { completedDates:[], lastFedDate:null, streak:0, coins:0, dinoUnlocked:false, activePet:"dog" }; }
function loadState() { try { return { ...defaultState(), ...JSON.parse(localStorage.getItem(STORAGE_KEY)) }; } catch { return defaultState(); } }
function saveState(state) { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function localDay(date = new Date()) { return [date.getFullYear(),String(date.getMonth()+1).padStart(2,"0"),String(date.getDate()).padStart(2,"0")].join("-"); }
