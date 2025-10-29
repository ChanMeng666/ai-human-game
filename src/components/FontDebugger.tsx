"use client";

import { useEffect, useState } from "react";

export default function FontDebugger() {
  const [fontStatus, setFontStatus] = useState<{
    pressStart2P: string;
    vt323: string;
    pixelifySans: string;
  }>({
    pressStart2P: "checking...",
    vt323: "checking...",
    pixelifySans: "checking...",
  });

  const [computedFonts, setComputedFonts] = useState<{
    body: string;
    button: string;
    container: string;
  }>({
    body: "",
    button: "",
    container: "",
  });

  useEffect(() => {
    // 检查字体是否加载
    const checkFonts = async () => {
      console.log("🔍 Starting font check with Next.js Fonts...");
      
      // 等待所有字体加载完成
      await document.fonts.ready;
      
      try {
        // 检查所有字体
        const allFonts = Array.from(document.fonts).map(f => f.family);
        console.log("📦 All fonts in document:", allFonts);
        
        // 检查 Press Start 2P（Next.js 可能会重命名）
        const pressStart2PLoaded = allFonts.some(f => 
          f.includes('Press Start 2P') || f.includes('__Press_Start_2P')
        );
        console.log("✅ Press Start 2P loaded:", pressStart2PLoaded);
        setFontStatus(prev => ({
          ...prev,
          pressStart2P: pressStart2PLoaded ? "✅ Loaded" : "⏳ Loading..."
        }));

        // 检查 VT323
        const vt323Loaded = allFonts.some(f => 
          f.includes('VT323') || f.includes('__VT323')
        );
        console.log("✅ VT323 loaded:", vt323Loaded);
        setFontStatus(prev => ({
          ...prev,
          vt323: vt323Loaded ? "✅ Loaded" : "⏳ Loading..."
        }));

        // 检查 Pixelify Sans
        const pixelifySansLoaded = allFonts.some(f => 
          f.includes('Pixelify Sans') || f.includes('__Pixelify_Sans')
        );
        console.log("✅ Pixelify Sans loaded:", pixelifySansLoaded);
        setFontStatus(prev => ({
          ...prev,
          pixelifySans: pixelifySansLoaded ? "✅ Loaded" : "⏳ Loading..."
        }));

        // 检查 CSS 变量
        const rootStyles = window.getComputedStyle(document.documentElement);
        console.log("🎨 Font CSS Variables:");
        console.log("  --font-press-start:", rootStyles.getPropertyValue('--font-press-start'));
        console.log("  --font-vt323:", rootStyles.getPropertyValue('--font-vt323'));
        console.log("  --font-pixelify:", rootStyles.getPropertyValue('--font-pixelify'));

      } catch (error) {
        console.error("❌ Error checking fonts:", error);
      }

      // 检查实际应用的字体
      setTimeout(() => {
        const bodyFont = window.getComputedStyle(document.body).fontFamily;
        console.log("🎨 Body font-family:", bodyFont);
        setComputedFonts(prev => ({ ...prev, body: bodyFont }));

        const button = document.querySelector('.nes-btn');
        if (button) {
          const buttonFont = window.getComputedStyle(button).fontFamily;
          console.log("🎨 Button font-family:", buttonFont);
          setComputedFonts(prev => ({ ...prev, button: buttonFont }));
        }

        const container = document.querySelector('.nes-container');
        if (container) {
          const containerFont = window.getComputedStyle(container).fontFamily;
          console.log("🎨 Container font-family:", containerFont);
          setComputedFonts(prev => ({ ...prev, container: containerFont }));
        }

        // 检查 CSS 变量
        const styles = window.getComputedStyle(document.documentElement);
        console.log("🎨 CSS Variables:", {
          background: styles.getPropertyValue('--background'),
          foreground: styles.getPropertyValue('--foreground'),
        });

        // 检查关键 CSS 属性
        const bodyStyles = window.getComputedStyle(document.body);
        console.log("🎨 Body font rendering:", {
          fontSmoothing: bodyStyles.getPropertyValue('-webkit-font-smoothing'),
          textRendering: bodyStyles.textRendering,
          fontSize: bodyStyles.fontSize,
          lineHeight: bodyStyles.lineHeight,
        });
      }, 500);
    };

    checkFonts();

    // 监听字体加载事件
    document.fonts.ready.then(() => {
      console.log("✅ All fonts ready!");
      console.log("📊 Total fonts loaded:", document.fonts.size);
    });

  }, []);

  return (
    <div 
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        zIndex: 9999,
        padding: "15px",
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        color: "white",
        fontSize: "12px",
        fontFamily: "monospace",
        borderRadius: "8px",
        maxWidth: "400px",
        maxHeight: "90vh",
        overflow: "auto",
        border: "2px solid #00ff00",
      }}
    >
      <h3 style={{ margin: "0 0 10px 0", color: "#00ff00", fontSize: "14px" }}>
        🔧 Font Debugger
      </h3>
      
      <div style={{ marginBottom: "15px" }}>
        <strong>Font Loading Status:</strong>
        <div style={{ marginLeft: "10px", marginTop: "5px" }}>
          <div>Press Start 2P: {fontStatus.pressStart2P}</div>
          <div>VT323: {fontStatus.vt323}</div>
          <div>Pixelify Sans: {fontStatus.pixelifySans}</div>
        </div>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <strong>Computed Fonts:</strong>
        <div style={{ marginLeft: "10px", marginTop: "5px", fontSize: "10px" }}>
          <div style={{ wordBreak: "break-all" }}>
            <strong>Body:</strong> {computedFonts.body || "Loading..."}
          </div>
          <div style={{ wordBreak: "break-all", marginTop: "5px" }}>
            <strong>Button:</strong> {computedFonts.button || "No button found"}
          </div>
          <div style={{ wordBreak: "break-all", marginTop: "5px" }}>
            <strong>Container:</strong> {computedFonts.container || "No container found"}
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <strong>Font Test:</strong>
        <div style={{ marginTop: "5px", padding: "10px", background: "#222" }}>
          <div style={{ fontFamily: "var(--font-press-start), monospace", marginBottom: "5px", fontSize: "10px" }}>
            PRESS START 2P
          </div>
          <div style={{ fontFamily: "var(--font-vt323), monospace", marginBottom: "5px", fontSize: "16px" }}>
            VT323 Font Test
          </div>
          <div style={{ fontFamily: "var(--font-pixelify), monospace", marginBottom: "5px", fontSize: "12px" }}>
            Pixelify Sans
          </div>
        </div>
      </div>

      <div style={{ fontSize: "10px", color: "#888", marginTop: "10px" }}>
        Check browser console for detailed logs
      </div>
    </div>
  );
}

