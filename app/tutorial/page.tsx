"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGame } from "@/src/context/GameContext";

export default function TutorialPage() {
  const router = useRouter();
  const { soundEnabled } = useGame();

  const playBubbleSound = () => {
    if (soundEnabled) {
      const bubbleAudio = new Audio("/audio/bubble.wav");
      bubbleAudio.play().catch((e) => console.log("Audio play failed:", e));
    }
  };

  const handleStartGame = () => {
    playBubbleSound();
    setTimeout(() => {
      router.push("/category");
    }, 300);
  };

  return (
    <div className="min-h-screen pond-gradient flex flex-col items-center py-4 sm:py-6 px-3 sm:px-4">
      <div className="w-full max-w-[95%] sm:max-w-2xl md:max-w-3xl">
        
        {/* Header */}
        <div className="nes-container is-dark with-title mb-4 sm:mb-6">
          <p className="title text-xs sm:text-sm md:text-base">如何玩</p>
          <div className="text-center py-3 sm:py-4">
            <div className="text-3xl sm:text-4xl mb-2">📖</div>
            <p className="text-white text-xs sm:text-sm">
              学习如何玩 AI vs Human 猜测游戏
            </p>
          </div>
        </div>

        {/* Game Rules */}
        <div className="nes-container is-rounded pond-theme mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
            <i className="nes-icon trophy is-small"></i>
            游戏目标
          </h2>
          <p className="text-xs sm:text-sm leading-relaxed mb-3">
            你的任务是从两个内容中识别出<strong>哪一个是人类创作的</strong>，哪一个是AI生成的。
          </p>
          <p className="text-xs sm:text-sm leading-relaxed">
            测试你在文本、图片、音频和视频四个类别中识别AI内容的能力！
          </p>
        </div>

        {/* How to Play */}
        <div className="nes-container is-rounded pond-theme mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
            <i className="nes-icon star is-small"></i>
            游戏流程
          </h2>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#9b2e83] text-white flex items-center justify-center font-bold text-sm sm:text-base">
                1
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xs sm:text-sm mb-1">选择分类</h3>
                <p className="text-[10px] sm:text-xs opacity-80">
                  从文本、图片、音频、视频中选择一个分类开始游戏
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#9b2e83] text-white flex items-center justify-center font-bold text-sm sm:text-base">
                2
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xs sm:text-sm mb-1">比较内容</h3>
                <p className="text-[10px] sm:text-xs opacity-80">
                  仔细观察左右两侧的内容，寻找人类创作的特征
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#9b2e83] text-white flex items-center justify-center font-bold text-sm sm:text-base">
                3
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xs sm:text-sm mb-1">做出选择</h3>
                <p className="text-[10px] sm:text-xs opacity-80">
                  点击你认为是人类创作的那一侧
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#9b2e83] text-white flex items-center justify-center font-bold text-sm sm:text-base">
                4
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xs sm:text-sm mb-1">获得反馈</h3>
                <p className="text-[10px] sm:text-xs opacity-80">
                  立即查看答案是否正确，并自动进入下一题
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="nes-container is-rounded pond-theme mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
            <i className="nes-icon file is-small"></i>
            四大分类
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="nes-container is-rounded">
              <div className="flex items-center gap-2 mb-2">
                <i className="nes-icon file is-small"></i>
                <h3 className="font-bold text-xs sm:text-sm">文本 (Text)</h3>
              </div>
              <p className="text-[10px] sm:text-xs opacity-80">
                比较文章、诗歌、故事的写作风格
              </p>
            </div>

            <div className="nes-container is-rounded">
              <div className="flex items-center gap-2 mb-2">
                <i className="nes-icon star is-small"></i>
                <h3 className="font-bold text-xs sm:text-sm">图片 (Images)</h3>
              </div>
              <p className="text-[10px] sm:text-xs opacity-80">
                识别艺术作品、照片、设计的真伪
              </p>
            </div>

            <div className="nes-container is-rounded">
              <div className="flex items-center gap-2 mb-2">
                <i className="nes-icon heart is-small"></i>
                <h3 className="font-bold text-xs sm:text-sm">音频 (Audio)</h3>
              </div>
              <p className="text-[10px] sm:text-xs opacity-80">
                辨别音乐、声音、语音的来源
              </p>
            </div>

            <div className="nes-container is-rounded">
              <div className="flex items-center gap-2 mb-2">
                <i className="nes-icon trophy is-small"></i>
                <h3 className="font-bold text-xs sm:text-sm">视频 (Videos)</h3>
              </div>
              <p className="text-[10px] sm:text-xs opacity-80">
                分辨视频片段、动画的制作方式
              </p>
            </div>
          </div>
        </div>

        {/* Scoring */}
        <div className="nes-container is-rounded pond-theme mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
            <i className="nes-icon coin is-small"></i>
            分数系统
          </h2>
          <div className="space-y-2 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>每答对一题得 <strong>1分</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-600 font-bold">✗</span>
              <span>答错不扣分，但也不加分</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-600 font-bold">🏆</span>
              <span>每个分类有 <strong>10道题</strong>，满分10分</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-600 font-bold">⭐</span>
              <span>完成所有4个分类，总分最高40分</span>
            </div>
          </div>
        </div>

        {/* Performance Levels */}
        <div className="nes-container is-rounded pond-theme mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
            <i className="nes-icon user is-small"></i>
            评级系统
          </h2>
          <div className="space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between items-center">
              <span className="opacity-80">10/10</span>
              <span className="font-bold text-yellow-600">完美 🏆 (专家级)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="opacity-80">8-9/10</span>
              <span className="font-bold text-green-600">优秀 ⭐ (高级)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="opacity-80">5-7/10</span>
              <span className="font-bold text-blue-600">良好 👍 (中级)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="opacity-80">0-4/10</span>
              <span className="font-bold text-gray-600">加油 🌱 (初级)</span>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="nes-container is-rounded is-warning mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
            <i className="nes-icon exclamation is-small"></i>
            实用技巧
          </h2>
          <ul className="space-y-2 text-xs sm:text-sm list-disc list-inside">
            <li>仔细观察细节，AI生成的内容往往有特定的"痕迹"</li>
            <li>人类创作通常有更多的情感和个性化表达</li>
            <li>AI生成的内容可能过于完美或有不自然的地方</li>
            <li>不要着急，每题都有充足的时间思考</li>
            <li>游戏会自动保存进度，可以随时继续</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button
            onClick={handleStartGame}
            className="nes-btn is-primary text-xs sm:text-sm md:text-base flex items-center justify-center gap-2"
          >
            <i className="nes-icon play is-small"></i>
            <span>开始游戏</span>
          </button>
          <Link href="/">
            <button className="nes-btn text-xs sm:text-sm md:text-base flex items-center justify-center gap-2 w-full">
              <i className="nes-icon caret-left is-small"></i>
              <span>返回主页</span>
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}

