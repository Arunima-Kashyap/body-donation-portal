
const API = import.meta.env.VITE_API_URL;
const CHAT_URL = `${API}/chat/ask`;

export async function askBot(message) {
  const res = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question: message,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error("REQUEST_FAILED");
  }

  if (!data?.answer) {
    throw new Error("EMPTY_REPLY");
  }

  return data.answer;
}
