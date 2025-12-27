// app/lib/sendEmail.js

export async function sendEmail({ to, subject,html }) {
  try {
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to, subject, html }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || `HTTP ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("sendEmail failed:", err);
    throw err;
  }
}
