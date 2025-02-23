import path from "path";

import reactRefresh from "@vitejs/plugin-react-refresh";
import {defineConfig} from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: [{find: "~", replacement: path.resolve(path.resolve(__dirname), "src")}],
  },
});
