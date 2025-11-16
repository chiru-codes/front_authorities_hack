import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Proxy `/auth/*` requests during local development to the real API to avoid CORS
    proxy: {
      '/auth': {
        target: 'https://fi7faricwd.execute-api.us-east-1.amazonaws.com',
        changeOrigin: true,
        secure: true,
        // keep the path as-is: `/auth/login` -> `https://.../auth/login`
      },
    },
  },
})
