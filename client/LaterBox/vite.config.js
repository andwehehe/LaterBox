import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command }) => ({
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  plugins: [tailwindcss(), react()],
  base: command === "serve" ? "/LaterBox/" : "/"
}))