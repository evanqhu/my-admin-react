// Vite 项目配置文件
// @see: https://cn.vitejs.dev/config/
import react from '@vitejs/plugin-react-swc';
import autoprefixer from 'autoprefixer';
import { resolve } from 'path';
import { ConfigEnv, defineConfig, loadEnv } from 'vite';

// 当前工作目录（绝对路径，与 __dirname 相同）
// const CWD = process.cwd();

export default defineConfig((params: ConfigEnv) => {
  const { mode } = params; // mode: 'development'
  // 加载环境变量文件 .env（拿到的都是 string）
  const { VITE_BASE_URL, VITE_DROP_CONSOLE } = loadEnv(mode, __dirname);

  return {
    base: VITE_BASE_URL,
    resolve: {
      // 配置别名
      alias: { '@': resolve(__dirname, './src') },
    },
    css: {
      postcss: {
        plugins: [
          // 处理 css 兼容性问题
          autoprefixer(),
        ],
      },
    },
    plugins: [react()],
    /** 构建 */
    esbuild: {
      // 移除控制台代码
      pure: VITE_DROP_CONSOLE === 'true' ? ['console.log', 'debugger'] : [],
    },
  };
});
