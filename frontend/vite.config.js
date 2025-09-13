import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server:{
    allowedHosts:["91004af48bda.ngrok-free.app","ed29da2e4476.ngrok-free.app "]
  }
 
  },
);
