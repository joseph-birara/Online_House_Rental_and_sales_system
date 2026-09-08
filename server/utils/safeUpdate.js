const BLOCKED = new Set([
  "password",
  "superAdmin",
  "superowner",
  "__proto__",
  "constructor",
  "prototype",
]);

function safeUpdate(body) {
  if (!body || typeof body !== "object") {
    return {};
  }
  const update = {};
  for (const key of Object.keys(body)) {
    if (BLOCKED.has(key)) continue;
    update[key] = body[key];
  }
  return update;
}

module.exports = safeUpdate;
