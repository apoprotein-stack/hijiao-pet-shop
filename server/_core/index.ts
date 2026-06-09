// server/_core/index.ts - Vercel optimized version
import "dotenv/config";
import express2 from "express";
import { createServer } from "http";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

// [All your original code from shared/const.ts to serveStatic function remains here]
// Please keep all the original definitions (ENV, db functions, sdk, routers, etc.)

// Simplified serveStatic for Vercel
function serveStatic(app) {
  const distPath = path2.resolve(import.meta.dirname, "dist/public");
  if (!fs2.existsSync(distPath)) {
    console.error(`Build directory not found: ${distPath}`);
    app.get("*", (req, res) => res.status(404).send("Build not found"));
    return;
  }
  app.use(express2.static(distPath));
  app.use("*", (_req, res) => res.sendFile(path2.resolve(distPath, "index.html")));
}

export async function createApp() {
  const app = express2();

  app.use(express2.json({ limit: "50mb" }));
  app.use(express2.urlencoded({ limit: "50mb", extended: true }));

  registerStorageProxy(app);
  registerOAuthRoutes(app);

  app.use("/api/trpc", createExpressMiddleware({ router: appRouter, createContext }));

  if (process.env.NODE_ENV !== "development") {
    serveStatic(app);
  } else {
    const server = createServer(app);
    await setupVite(app, server);
  }

  return app;
}

// Local dev
if (process.env.NODE_ENV === "development") {
  (async () => {
    const app = await createApp();
    const server = createServer(app);
    const port = parseInt(process.env.PORT || "3000");
    server.listen(port, () => console.log(`Server on http://localhost:${port}`));
  })().catch(console.error);
}

export default await createApp();