# 🔧 字体调试指南

## 发现的问题

### ❌ 主要问题：`@import` 位置错误

**错误代码：**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css?family=Press+Start+2P&display=swap');
```

**问题原因：**
- CSS 规范要求 `@import` 必须在所有其他 CSS 规则之前（除了 `@charset`）
- 当 `@import` 出现在 `@tailwind` 之后时，浏览器会忽略这些导入
- 导致所有 Google Fonts 字体都无法加载

**正确代码：**
```css
/* ✅ @import 必须在最前面 */
@import url('https://fonts.googleapis.com/css?family=Press+Start+2P&display=swap');
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;500;600&display=swap');

/* 然后才是 Tailwind */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### ❌ 次要问题：Tailwind 重置样式覆盖

**问题：**
- Tailwind 的 `@layer base` 会重置所有默认样式
- 如果字体样式不在 `@layer base` 中，会被 Tailwind 覆盖

**解决方案：**
```css
@layer base {
  body {
    font-family: 'Press Start 2P', 'Courier New', monospace;
    -webkit-font-smoothing: none;
    -moz-osx-font-smoothing: grayscale;
    /* ... 其他样式 */
  }
}
```

### ❌ 其他问题：重复的样式定义

**问题：**
- `body` 样式在多个地方定义，导致优先级混乱
- 响应式字体大小重复定义

**解决方案：**
- 统一在 `@layer base` 中定义 body 样式
- 删除所有重复定义

## 调试工具

### 1. FontDebugger 组件

位置：`src/components/FontDebugger.tsx`

**功能：**
- ✅ 检查字体加载状态
- ✅ 显示实际应用的字体
- ✅ 提供视觉字体测试
- ✅ 实时监控字体变化

**使用方法：**
```tsx
import FontDebugger from "@/src/components/FontDebugger";

<FontDebugger />
```

### 2. FontLoader 组件

位置：`src/components/FontLoader.tsx`

**功能：**
- ✅ 在浏览器控制台输出详细日志
- ✅ 检查 CSS 加载顺序
- ✅ 验证字体文件加载
- ✅ 显示计算后的样式

### 3. 页面字体测试区域

在首页底部添加了字体测试区域，包含：
- 默认字体测试（Press Start 2P）
- `font-pixel-display` 类测试
- `font-pixel-content` 类测试

## 如何调试

### 步骤 1：检查浏览器控制台

打开浏览器开发者工具（F12），查看控制台输出：

```
🚀 FontLoader initialized
📍 Current URL: http://localhost:3000
🔗 Stylesheet links found: X
📋 Total stylesheets: X
🔍 Starting font check...
✅ Press Start 2P loaded: true
✅ VT323 loaded: true
✅ Pixelify Sans loaded: true
🎨 Body font-family: "Press Start 2P", "Courier New", monospace
```

### 步骤 2：查看右上角调试面板

页面右上角的绿色调试面板会显示：
- ✅/❌ 字体加载状态
- 实际应用的字体
- 字体测试示例

### 步骤 3：使用浏览器 DevTools

1. **检查元素字体：**
   - 右键点击文字 → "检查"
   - 在 "Computed" 标签页查看 `font-family`

2. **检查字体加载：**
   - 打开 Network 标签
   - 筛选 "Font"
   - 刷新页面查看字体是否成功加载

3. **检查 CSS 规则：**
   - 在 Elements 标签中选择 `<body>`
   - 查看 Styles 面板中的字体规则
   - 确认没有被覆盖（没有删除线）

## 常见问题

### Q1: 字体加载成功但没有显示

**可能原因：**
- CSS 优先级问题
- 被其他样式覆盖
- 字体名称拼写错误

**解决方案：**
```css
/* 使用 !important 提高优先级（临时方案）*/
.nes-btn {
  font-family: 'Press Start 2P', monospace !important;
}
```

### Q2: 字体看起来模糊

**原因：**
- 浏览器抗锯齿未禁用

**解决方案：**
```css
body {
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: grayscale;
  font-smooth: never;
}
```

### Q3: 某些字符显示为方块

**原因：**
- 字体不支持某些字符
- 字体加载失败

**解决方案：**
- 检查字体是否支持所需字符
- 添加后备字体：`font-family: 'Press Start 2P', 'Courier New', monospace;`

## 检查清单

调试字体问题时，按以下顺序检查：

- [ ] `@import` 是否在 CSS 文件最顶部？
- [ ] 字体 URL 是否正确？
- [ ] 浏览器控制台是否有错误？
- [ ] Network 标签显示字体是否成功加载？
- [ ] `body` 元素的 `font-family` 是否正确？
- [ ] 是否有其他 CSS 覆盖了字体？
- [ ] Tailwind 配置是否包含字体？
- [ ] 是否使用了 `@layer base`？

## 移除调试工具

调试完成后，可以移除以下内容：

1. **移除 FontDebugger 组件引用：**
```tsx
// app/page.tsx
- import FontDebugger from "@/src/components/FontDebugger";
- <FontDebugger />
```

2. **（可选）移除 FontLoader：**
```tsx
// app/layout.tsx
- import FontLoader from "../src/components/FontLoader";
- <FontLoader />
```

3. **（可选）移除字体测试区域：**
```tsx
// app/page.tsx
移除 "Font Test Section" 部分
```

4. **（可选）删除调试组件文件：**
```bash
rm src/components/FontDebugger.tsx
rm src/components/FontLoader.tsx
```

## 最终 CSS 结构

```css
/* 1️⃣ @import 必须在最前面 */
@import url('...');

/* 2️⃣ Tailwind 指令 */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 3️⃣ Tailwind Layer 配置 */
@layer base {
  body {
    font-family: 'Press Start 2P', monospace;
    -webkit-font-smoothing: none;
  }
}

/* 4️⃣ 自定义样式 */
:root { ... }
.font-pixel-display { ... }
.nes-container { ... }
```

## 参考资源

- [MDN: @import](https://developer.mozilla.org/en-US/docs/Web/CSS/@import)
- [Google Fonts](https://fonts.google.com/)
- [CSS Font Loading API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Font_Loading_API)
- [Tailwind CSS: Base Styles](https://tailwindcss.com/docs/adding-custom-styles#using-css-and-layer)

---

💡 **提示：** 保留这个文档以便将来调试其他字体问题！

