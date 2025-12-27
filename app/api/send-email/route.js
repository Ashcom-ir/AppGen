import nodemailer from "nodemailer";
import { SMTP_CONFIG } from "./smtp";

export async function POST(req) {
  try {
    const { to, subject, html } = await req.json();

    console.log("SMTP Config:", SMTP_CONFIG);
    console.log("Sending email to:", to);

    const transporter = nodemailer.createTransport(SMTP_CONFIG);

    const info = await transporter.sendMail({
      from: `"My App" <${SMTP_CONFIG.auth.user}>`,
      to,
      subject,
      html,
    });

    console.log("Email sent:", info);

    return new Response(JSON.stringify({ success: true, info }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("MAIL ERROR:", err);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET() {
  return Response.json({
    message: "Use POST method",
  });
}
