'use client';

interface HowToUseProps {
  language: 'en' | 'zh';
  onClose: () => void;
}

export default function HowToUse({ language, onClose }: HowToUseProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="retro-card p-8 max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-3xl font-bold">
            {language === 'en' ? '📖 How to Use' : '📖 使用指南'}
          </h2>
          <button
            onClick={onClose}
            className="retro-button text-sm"
          >
            {language === 'en' ? 'Close' : '關閉'}
          </button>
        </div>

        {language === 'en' ? (
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="font-bold text-lg mb-2">🎯 Getting Started</h3>
              <p>
                This gallery contains curated AI prompts for creative projects. Each prompt
                card includes an example image, usage instructions, and the full prompt text.
              </p>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-2">🔍 Finding Prompts</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Use the search bar to find prompts by keyword</li>
                <li>Filter by category using the category buttons</li>
                <li>Browse all prompts by selecting "All"</li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-2">💡 Using Prompts</h3>
              <p className="mb-2 font-bold">Two ways to use prompts:</p>

              <div className="mb-3 p-3 bg-accent bg-opacity-30 border-2 border-current">
                <p className="font-bold mb-1">🚀 Quick Start with AI Studio:</p>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Click "🚀 AI Studio" button</li>
                  <li>Prompt is copied & AI Studio opens in new tab</li>
                  <li>Press Ctrl+V (or Cmd+V on Mac) to paste</li>
                  <li>Start creating!</li>
                </ol>
              </div>

              <div className="p-3 bg-accent bg-opacity-30 border-2 border-current">
                <p className="font-bold mb-1">📋 Manual Copy:</p>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Click "📋 Copy" button</li>
                  <li>Open your preferred AI tool</li>
                  <li>Paste the prompt (Ctrl+V / Cmd+V)</li>
                  <li>Customize as needed</li>
                </ol>
              </div>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-2">✏️ Customizing Prompts</h3>
              <p>
                Many prompts contain placeholders in [square brackets]. Replace these with
                your specific requirements. For example: [CHARACTER] → "a young woman with
                blue hair"
              </p>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-2">🎨 Categories</h3>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Image Editing:</strong> Transform and enhance existing images</li>
                <li><strong>Portrait:</strong> Create stunning portrait photos</li>
                <li><strong>AI Design:</strong> Generate creative designs and layouts</li>
                <li><strong>Photo Enhancement:</strong> Restore and improve photos</li>
                <li><strong>Scene Compositing:</strong> Combine elements into new scenes</li>
                <li><strong>Character Design:</strong> Create unique character portraits</li>
              </ul>
            </section>
          </div>
        ) : (
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="font-bold text-lg mb-2">🎯 入門指南</h3>
              <p>
                這個畫廊包含精選的 AI 提示詞，用於創意專案。每個提示詞卡片都包含範例圖片、使用說明和完整的提示詞文字。
              </p>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-2">🔍 尋找提示詞</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>使用搜尋欄按關鍵字尋找提示詞</li>
                <li>使用分類按鈕按類別篩選</li>
                <li>選擇「全部」瀏覽所有提示詞</li>
              </ul>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-2">💡 使用提示詞</h3>
              <p className="mb-2 font-bold">兩種使用方式：</p>

              <div className="mb-3 p-3 bg-accent bg-opacity-30 border-2 border-current">
                <p className="font-bold mb-1">🚀 快速使用 AI Studio：</p>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>點擊「🚀 AI Studio」按鈕</li>
                  <li>提示詞已複製且 AI Studio 在新分頁開啟</li>
                  <li>按 Ctrl+V（Mac 為 Cmd+V）貼上</li>
                  <li>開始創作！</li>
                </ol>
              </div>

              <div className="p-3 bg-accent bg-opacity-30 border-2 border-current">
                <p className="font-bold mb-1">📋 手動複製：</p>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>點擊「📋 複製」按鈕</li>
                  <li>開啟您偏好的 AI 工具</li>
                  <li>貼上提示詞（Ctrl+V / Cmd+V）</li>
                  <li>根據需求自訂</li>
                </ol>
              </div>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-2">✏️ 自訂提示詞</h3>
              <p>
                許多提示詞包含 [方括號] 中的占位符。將這些替換為您的具體要求。例如：[CHARACTER] → "一位有藍色頭髮的年輕女性"
              </p>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-2">🎨 分類說明</h3>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>圖像編輯：</strong>轉換和增強現有圖像</li>
                <li><strong>肖像：</strong>創建令人驚艷的肖像照片</li>
                <li><strong>AI 設計：</strong>生成創意設計和佈局</li>
                <li><strong>照片增強：</strong>修復和改善照片</li>
                <li><strong>場景合成：</strong>將元素組合成新場景</li>
                <li><strong>角色設計：</strong>創建獨特的角色肖像</li>
              </ul>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
