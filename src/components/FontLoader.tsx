"use client";

import { useEffect } from "react";

export default function FontLoader() {
  useEffect(() => {
    console.log("🚀 FontLoader initialized");
    console.log("📍 Current URL:", window.location.href);
    
    // 检查 link 标签
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    console.log("🔗 Stylesheet links found:", links.length);
    links.forEach((link, index) => {
      console.log(`  ${index + 1}. ${(link as HTMLLinkElement).href}`);
    });

    // 检查 style 标签
    const styles = document.querySelectorAll('style');
    console.log("📝 Style tags found:", styles.length);
    
    // 检查 @import 规则
    setTimeout(() => {
      const allStyles = Array.from(document.styleSheets);
      console.log("📋 Total stylesheets:", allStyles.length);
      
      allStyles.forEach((sheet, index) => {
        try {
          const rules = Array.from(sheet.cssRules || []);
          const importRules = rules.filter(rule => rule.type === CSSRule.IMPORT_RULE);
          if (importRules.length > 0) {
            console.log(`  Stylesheet ${index + 1} has ${importRules.length} @import rules:`);
            importRules.forEach((rule) => {
              console.log(`    - ${(rule as CSSImportRule).href}`);
            });
          }
        } catch (e) {
          console.log(`  Stylesheet ${index + 1}: Cannot access rules (CORS)`);
        }
      });
    }, 1000);

    // 监听字体加载
    const fontLoadPromises = [
      document.fonts.load("16px 'Press Start 2P'"),
      document.fonts.load("16px VT323"),
      document.fonts.load("16px 'Pixelify Sans'"),
    ];

    Promise.all(fontLoadPromises).then(() => {
      console.log("✅ All pixel fonts loaded successfully!");
    }).catch((error) => {
      console.error("❌ Error loading fonts:", error);
    });

    // 检查 body 的计算样式
    setTimeout(() => {
      const bodyStyles = window.getComputedStyle(document.body);
      console.log("🎨 Body computed styles:");
      console.log("  - font-family:", bodyStyles.fontFamily);
      console.log("  - font-size:", bodyStyles.fontSize);
      console.log("  - -webkit-font-smoothing:", bodyStyles.getPropertyValue('-webkit-font-smoothing'));
      console.log("  - text-rendering:", bodyStyles.textRendering);
    }, 1500);

  }, []);

  return null; // 这个组件不渲染任何内容
}

