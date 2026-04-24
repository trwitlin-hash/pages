// auth.js — key validation using SHA-256 hashing
// Keys are never stored in plain text — only their hashes are compared.
// Uses sessionStorage so the key is required again each new browser session.
//
// Domain rules:
//   teabagpress.com  → pro codes only  → sees all games
//   everywhere else  → free codes only → sees free games only

const AUTH_KEY  = "sgUnlockedSession";
const AUTH_TIER = "sgUnlockedTier";

function isProDomain() {
  const h = window.location.hostname;
  return h === "teabagpress.com" || h === "www.teabagpress.com";
}

function requiredTier() {
  return isProDomain() ? "pro" : "free";
}

async function hashKey(raw) {
  const encoded = new TextEncoder().encode(raw.trim().toUpperCase());
  const buffer  = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

function isUnlocked() {
  const saved = sessionStorage.getItem(AUTH_KEY);
  if (!saved) return false;
  if (!(saved in KEYS)) return false;
  const { tier, expiry } = KEYS[saved];
  if (expiry !== null && Date.now() > expiry) {
    sessionStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem(AUTH_TIER);
    return false;
  }
  // Enforce domain/tier match
  if (tier !== requiredTier()) return false;
  return true;
}

function getTier() {
  return sessionStorage.getItem(AUTH_TIER) || "free";
}

async function tryUnlock(inputKey) {
  const hash = await hashKey(inputKey);
  if (!(hash in KEYS)) return false;
  const { tier, expiry } = KEYS[hash];
  if (expiry !== null && Date.now() > expiry) return false;
  // Reject keys that don't match this domain
  if (tier !== requiredTier()) return false;
  sessionStorage.setItem(AUTH_KEY, hash);
  sessionStorage.setItem(AUTH_TIER, tier);
  return true;
}

const MASTER_HASH = "3c24a22bee85ee04968579c51f996bfe2e53b218a2bc1028e76492b417da4a83";

function isMaster() {
  return sessionStorage.getItem(AUTH_KEY) === MASTER_HASH;
}

function lock() {
  sessionStorage.removeItem(AUTH_KEY);
  sessionStorage.removeItem(AUTH_TIER);
}
