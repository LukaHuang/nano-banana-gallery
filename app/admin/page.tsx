'use client';

import { useState, useEffect } from 'react';
import { Prompt } from '@/data/prompts';

interface PromptDB extends Prompt {
  createdAt?: string;
  updatedAt?: string;
}

export default function AdminPage() {
  const [prompts, setPrompts] = useState<PromptDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPrompt, setEditingPrompt] = useState<PromptDB | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchPrompts();
  }, []);

  const fetchPrompts = async () => {
    try {
      const res = await fetch('/api/prompts');
      const data = await res.json();
      setPrompts(data);
    } catch (error) {
      console.error('Failed to fetch prompts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('確定要刪除這個提示詞嗎？')) return;

    try {
      const res = await fetch(`/api/prompts/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchPrompts();
      }
    } catch (error) {
      console.error('Failed to delete prompt:', error);
    }
  };

  const handleEdit = (prompt: PromptDB) => {
    setEditingPrompt(prompt);
    setShowForm(true);
  };

  const handleSave = async (prompt: PromptDB) => {
    try {
      const url = editingPrompt
        ? `/api/prompts/${editingPrompt.id}`
        : '/api/prompts';
      const method = editingPrompt ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prompt),
      });

      if (res.ok) {
        setShowForm(false);
        setEditingPrompt(null);
        fetchPrompts();
      }
    } catch (error) {
      console.error('Failed to save prompt:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold">載入中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-black mb-2">PROMPT 管理後台</h1>
            <p className="text-sm opacity-70">Admin Dashboard</p>
          </div>
          <button
            onClick={() => {
              setEditingPrompt(null);
              setShowForm(true);
            }}
            className="retro-button"
          >
            ➕ 新增 Prompt
          </button>
        </div>

        <div className="retro-divider mb-8" />

        {showForm && (
          <PromptForm
            prompt={editingPrompt}
            onSave={handleSave}
            onCancel={() => {
              setShowForm(false);
              setEditingPrompt(null);
            }}
          />
        )}

        <div className="retro-card overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr className="border-b-3 border-current">
                <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider">
                  圖片
                </th>
                <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider">
                  標題
                </th>
                <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider">
                  分類
                </th>
                <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider">
                  標籤
                </th>
                <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody>
              {prompts.map((prompt) => (
                <tr key={prompt.id} className="border-b-2 border-current hover:bg-accent hover:bg-opacity-30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="border-3 border-current overflow-hidden">
                      <img
                        src={prompt.imageUrl}
                        alt={prompt.title.zh}
                        className="h-16 w-16 object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold">
                      {prompt.title.zh}
                    </div>
                    <div className="text-xs opacity-70">
                      {prompt.title.en}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="retro-badge text-xs">
                      {prompt.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {prompt.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="retro-badge text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                      {prompt.tags.length > 3 && (
                        <span className="retro-badge text-xs">
                          +{prompt.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">
                    <button
                      onClick={() => handleEdit(prompt)}
                      className="mr-4 hover:underline"
                    >
                      ✏️ 編輯
                    </button>
                    <button
                      onClick={() => handleDelete(prompt.id)}
                      className="hover:underline"
                    >
                      🗑️ 刪除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-center">
          <span className="retro-badge text-sm">
            總共 {prompts.length} 個提示詞
          </span>
        </div>
      </div>
    </div>
  );
}

function PromptForm({
  prompt,
  onSave,
  onCancel,
}: {
  prompt: PromptDB | null;
  onSave: (prompt: PromptDB) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<PromptDB>(
    prompt || {
      id: '',
      title: { en: '', zh: '' },
      description: { en: '', zh: '' },
      usage: { en: '', zh: '' },
      prompt: '',
      category: '',
      tags: [],
      imageUrl: '',
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="retro-card p-6 mb-8">
      <h2 className="text-3xl font-black mb-6 border-b-3 border-current pb-3">
        {prompt ? '✏️ 編輯 Prompt' : '➕ 新增 Prompt'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-2 uppercase">ID</label>
            <input
              type="text"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              className="w-full border-3 border-current px-4 py-3 font-mono bg-background focus:outline-none focus:bg-accent focus:bg-opacity-20"
              required
              disabled={!!prompt}
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 uppercase">分類</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full border-3 border-current px-4 py-3 font-mono bg-background focus:outline-none focus:bg-accent focus:bg-opacity-20"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">標題 (中文)</label>
            <input
              type="text"
              value={formData.title.zh}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: { ...formData.title, zh: e.target.value },
                })
              }
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              標題 (English)
            </label>
            <input
              type="text"
              value={formData.title.en}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: { ...formData.title, en: e.target.value },
                })
              }
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">描述 (中文)</label>
            <textarea
              value={formData.description.zh}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: { ...formData.description, zh: e.target.value },
                })
              }
              className="w-full border rounded px-3 py-2"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              描述 (English)
            </label>
            <textarea
              value={formData.description.en}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: { ...formData.description, en: e.target.value },
                })
              }
              className="w-full border rounded px-3 py-2"
              rows={3}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              使用說明 (中文)
            </label>
            <textarea
              value={formData.usage.zh}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  usage: { ...formData.usage, zh: e.target.value },
                })
              }
              className="w-full border rounded px-3 py-2"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              使用說明 (English)
            </label>
            <textarea
              value={formData.usage.en}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  usage: { ...formData.usage, en: e.target.value },
                })
              }
              className="w-full border rounded px-3 py-2"
              rows={3}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Prompt 內容
          </label>
          <textarea
            value={formData.prompt}
            onChange={(e) =>
              setFormData({ ...formData, prompt: e.target.value })
            }
            className="w-full border rounded px-3 py-2"
            rows={6}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">圖片 URL</label>
          <input
            type="url"
            value={formData.imageUrl}
            onChange={(e) =>
              setFormData({ ...formData, imageUrl: e.target.value })
            }
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            標籤 (用逗號分隔)
          </label>
          <input
            type="text"
            value={formData.tags.join(', ')}
            onChange={(e) =>
              setFormData({
                ...formData,
                tags: e.target.value.split(',').map((t) => t.trim()),
              })
            }
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            取消
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            儲存
          </button>
        </div>
      </form>
    </div>
  );
}
