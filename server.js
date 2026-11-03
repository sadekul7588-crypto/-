import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3e3;
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "Sadekul Agro Bangla", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
});
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Sadekul Agro Bangla server listening on http://0.0.0.0:${PORT}`);
});
