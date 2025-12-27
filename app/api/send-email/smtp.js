export const SMTP_CONFIG = {
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_NOREPLY_USER,
    pass: process.env.SMTP_NOREPLY_PASS,
  },
  authMethod: "LOGIN",
  tls: {
    rejectUnauthorized: false,
  },
};
