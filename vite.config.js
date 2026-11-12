import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// REACT_APP_* variables read by the code: replaced at build time like react-scripts
// did (from the environment or .env files), undefined when not set.
const ENV_KEYS = [
  "REACT_APP_API_TOKEN",
  "REACT_APP_API_URL",
  "REACT_APP_DHIS",
  "REACT_APP_LOG_ROCKET_APP_ID",
  "REACT_APP_PASSWORD",
  "REACT_APP_USER",
];

export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), "REACT_APP_"), ...process.env };
  const define = {
    "process.env.PUBLIC_URL": JSON.stringify("."),
    global: "globalThis",
  };
  for (const key of ENV_KEYS) {
    define[`process.env.${key}`] = JSON.stringify(env[key]);
  }

  return {
    // relative urls: served by dhis2 as an app and by orbf2 under /hesabu-manager/
    base: "./",
    // react 16: classic runtime, components import React
    plugins: [react({ include: /\.jsx?$/, jsxRuntime: "classic" })],
    // jsx lives in .js files
    esbuild: { loader: "jsx", include: /src\/.*\.jsx?$/, exclude: [] },
    optimizeDeps: { esbuildOptions: { loader: { ".js": "jsx" } } },
    define,
    server: { port: 3000 },
    build: {
      outDir: "build", // script/release zips build/
      commonjsOptions: { transformMixedEsModules: true }, // react-cookie mixes require and import
    },
    test: {
      globals: true,
      environment: "jsdom",
      coverage: { provider: "v8", include: ["src/**/*.{js,jsx}"] },
    },
  };
});
