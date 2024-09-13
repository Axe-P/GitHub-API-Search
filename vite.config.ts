import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // Removed .env folder route definition. Now being used in (default) root.
  plugins: [react()],
});
