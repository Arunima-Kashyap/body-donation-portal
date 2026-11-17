
// Shared helpers for the donor portal hand-off.
export const API = "https://body-donation-portal-jj35.onrender.com";

function jwtPayload(token) {
  try {
    const part = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(part));
  } catch {
    return null;
  }
}

export function errorText(data) {
  const d = data?.detail ?? data?.message;
  if (typeof d === "string") return d;
  if (Array.isArray(d)) return d.map((x) => x.msg).filter(Boolean).join(". ") || null;
  return null;
}

// Pulls the token (and role or name, if the server sends them) out of the login reply.
export function readSession(data) {
  if (!data || typeof data !== "object") return null;
  const token = data.access_token ?? data.token ?? data.accessToken ?? data.jwt ?? null;
  if (!token) return null;
  const claims = jwtPayload(token);
  return {
    token,
    role: data.role ?? data.user?.role ?? claims?.role ?? null,
    name: data.user?.full_name ?? data.full_name ?? claims?.full_name ?? null,
  };
}

// Used after signup so a new donor goes straight into the portal.
export async function login(email, password) {
  const body = new URLSearchParams();
  body.append("username", email.trim());
  body.append("password", password);

  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: body.toString(),
  });

  const text = await res.text();
  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) throw new Error(errorText(data) ?? "We couldn't log you in.");

  const session = readSession(data);
  if (!session) throw new Error("NO_TOKEN");

  return session;
}

// Result kinds: ok, none, forbidden, unauthorized, error.
export async function fetchStatus(token) {
  try {
    const res = await fetch(`${API}/donor/my_status`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 401) return { kind: "unauthorized" };
    if (res.status === 403) return { kind: "forbidden" };
    if (res.status === 404) return { kind: "none" };
    if (!res.ok) return { kind: "error" };

    const data = await res.json().catch(() => null);
    return { kind: "ok", value: data };
  } catch {
    return { kind: "error" };
  }
}

// If the login reply names a role, trust it. Otherwise ask the donor endpoint.
export async function isDonor(session) {
  if (session.role) return session.role === "donor";
  const r = await fetchStatus(session.token);
  return r.kind !== "forbidden";
}

const pretty = (v) => {
  const t = String(v ?? "").replace(/[_-]+/g, " ").trim();
  return t ? t[0].toUpperCase() + t.slice(1) : null;
};

// Converts the backend response into the object the portal screens expect.
//
// Important:
// The current backend response does not expose individual witness confirmations.
// We therefore leave witnessConfirmed as null instead of guessing.
export function toStatus(r) {
  const empty = {
    consentSubmitted: null,
    witnessConfirmed: null,
    registrationStatus: null,
    institutionUpdate: null,
  };

  if (!r || r.kind === "error" || r.kind === "unauthorized" || r.kind === "forbidden") {
    return null;
  }

  if (r.kind === "none") {
    return { ...empty, consentSubmitted: false };
  }

  if (r.kind !== "ok") return null;

  const d = r.value?.donor;
  if (!d) return null;

  return {
    // The backend creates the donor record when consent is submitted.
    consentSubmitted: true,

    // The current status endpoint doesn't tell us whether both witnesses verified.
    witnessConfirmed:
      typeof d.witness_confirmed === "boolean"
        ? d.witness_confirmed
        : null,

    registrationStatus: pretty(d.donor_status),
    institutionUpdate: pretty(d.cadaver?.status ?? d.death_report?.status),
  };
}

export async function fetchMe(token) {
  try {
    const res = await fetch(`${API}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
}

export async function submitConsent(token, payload) {
  let res;

  try {
    res = await fetch(`${API}/donor/consent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error("Unable to connect to the server. Please try again.");
  }

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(
      errorText(data) ??
      "We couldn't submit your consent. Please check the form and try again."
    );
  }
}
