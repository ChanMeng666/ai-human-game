import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        // 显示型像素字体 - 用于UI、标题、按钮（使用 Next.js Font 变量）
        'pixel-display': ['var(--font-press-start)', '"Courier New"', 'monospace'],
        // 内容型像素字体 - 用于长文本，更易读
        'pixel-content': ['var(--font-vt323)', '"Courier New"', 'monospace'],
        // 可选的现代像素字体
        'pixel-modern': ['var(--font-pixelify)', '"Courier New"', 'monospace'],
        // 保留原有的 peaberry 配置
        peaberry: ['PeaberryBase', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pixel-fade-in': 'pixelFadeIn 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pixelFadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

