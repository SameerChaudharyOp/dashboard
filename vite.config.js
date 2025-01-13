import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Externalize 'recharts' so it is not bundled with the final output
      external: ['recharts'],
    },
  },
})
