import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Certifique-se de que o diretório de saída está configurado corretamente
  },
  base: '/', // Aqui deve ser '/' se a aplicação estiver na raiz
})