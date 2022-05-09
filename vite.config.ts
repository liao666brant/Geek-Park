import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), tsconfigPaths()],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
});
