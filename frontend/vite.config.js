import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
  },
  base: '/nome-do-repositorio/' // Coloca o nome do repositório ou o caminho correto do subdiretório aqui
})