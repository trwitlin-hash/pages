// session.js — Concurrent session detection for sold pro keys
// Only runs when KEYS[hash].sold === true
// Friends/master keys omit sold:true and bypass this entirely.
//
// How it works:
//   1. On login, registers a session in Firebase under sessions/{keyHash}/{sessionId}
//   2. Pings every 30s to keep the session alive
//   3. Watches for 2+ active sessions on the same key (active = pinged within 90s)
//   4. If collision detected → deletes BOTH sessions → both clients get kicked
//
// Firebase Realtime Database rules required (set in Firebase console):
//   { "rules": { "sessions": { ".read": true, ".write": true } } }

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set, remove, onValue, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBRaz6d82ouZcO5--9h5XTbL6gwKEk6suo",
  authDomain: "tea-flavors.firebaseapp.com",
  databaseURL: "https://tea-flavors-default-rtdb.firebaseio.com",
  projectId: "tea-flavors",
  storageBucket: "tea-flavors.firebasestorage.app",
  messagingSenderId: "623069075359",
  appId: "1:623069075359:web:22c34b4dba080a5a150faa"
};

const PING_INTERVAL_MS  = 30_000;  // ping every 30s
const SESSION_TIMEOUT_MS = 90_000;  // sessions older than 90s are considered dead

let _db       = null;
let _sessionRef = null;
let _pingTimer  = null;

function getDb() {
  if (!_db) {
    const app = initializeApp(firebaseConfig, "session-tracker");
    _db = getDatabase(app);
  }
  return _db;
}

// Generates a random session ID
function makeSessionId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function forceLogout() {
  clearInterval(_pingTimer);
  sessionStorage.clear();
  alert(
    "⚠️ Your key was used on another device at the same time.\n\n" +
    "Both sessions have been ended. If this wasn't you, your key may be shared.\n\n" +
    "Contact support to get a new key."
  );
  window.location.replace("about:blank");
}

export function startSession(keyHash) {
  const db        = getDb();
  const sessionId = makeSessionId();
  const keyRef    = ref(db, `sessions/${keyHash}`);
  _sessionRef     = ref(db, `sessions/${keyHash}/${sessionId}`);

  // Write our session
  function ping() {
    set(_sessionRef, { ts: Date.now() }).catch(() => {});
  }
  ping();
  _pingTimer = setInterval(ping, PING_INTERVAL_MS);

  // Remove our session cleanly on page unload
  window.addEventListener("pagehide", () => {
    remove(_sessionRef).catch(() => {});
    clearInterval(_pingTimer);
  });

  // Watch all sessions for this key
  onValue(keyRef, (snapshot) => {
    const sessions = snapshot.val();
    if (!sessions) return;

    const now    = Date.now();
    const active = Object.entries(sessions).filter(
      ([, data]) => data && (now - data.ts) < SESSION_TIMEOUT_MS
    );

    if (active.length >= 2) {
      // Collision — kill all sessions for this key
      active.forEach(([sid]) => {
        remove(ref(db, `sessions/${keyHash}/${sid}`)).catch(() => {});
      });
      forceLogout();
    }
  });
}
