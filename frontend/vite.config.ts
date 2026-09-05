import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      // Keep local resume.pdf from sticking after you replace the file.
      'Cache-Control': 'no-store',
    },
  },
})
