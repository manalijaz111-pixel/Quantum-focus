import React, { useState, useEffect } from 'react';
import { NoteItem } from '../types';

interface NoteEditorModalProps {
  note: NoteItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveNote: (note: NoteItem) => void;
  onDeleteNote?: (id: string) => void;
}

export const NoteEditorModal: React.FC<NoteEditorModalProps> = ({
  note,
  isOpen,
  onClose,
  onSaveNote,
  onDeleteNote
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Quantum Mechanics');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [tagsStr, setTagsStr] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setCategory(note.category);
      setSummary(note.summary);
      setContent(note.content);
      setTagsStr(note.tags.join(', '));
      setIsEditing(false);
    } else {
      setTitle('');
      setCategory('Quantum Mechanics');
      setSummary('');
      setContent('');
      setTagsStr('Physics, Note');
      setIsEditing(true);
    }
  }, [note, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!title.trim()) return;

    const tags = tagsStr.split(',').map(t => t.trim()).filter(Boolean);

    const updatedNote: NoteItem = {
      id: note ? note.id : `n-${Date.now()}`,
      title,
      category,
      categoryTag: category.slice(0, 10),
      date: note ? note.date : 'TODAY',
      summary: summary || content.slice(0, 100) + '...',
      content: content || 'No content written yet.',
      tags: tags.length ? tags : ['Note'],
      lastEditedAgo: 'Edited just now'
    };

    onSaveNote(updatedNote);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bento-card max-w-2xl w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b border-[#222222] pb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-violet-400 text-2xl">
              description
            </span>
            <h2 className="font-mono text-lg font-bold text-[#F5F5F5]">
              {note && !isEditing ? note.title : note ? 'Edit Note' : 'Create New Note Draft'}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {note && !isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1 bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 rounded-2xl text-xs font-mono font-semibold"
              >
                Edit
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-[#888888] hover:text-white rounded-2xl hover:bg-[#1A1A1A] transition-colors"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </div>

        {isEditing ? (
          <div className="space-y-4 font-mono">
            <div>
              <label className="text-[11px] font-bold text-[#888888] uppercase block mb-1">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Shor's Algorithm Notes"
                className="w-full bg-[#050505] border border-[#222222] rounded-2xl py-2.5 px-3 text-[#F5F5F5] text-sm focus:outline-none focus:border-violet-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-[#888888] uppercase block mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#050505] border border-[#222222] rounded-2xl py-2.5 px-3 text-[#F5F5F5] text-sm focus:outline-none focus:border-violet-500"
                >
                  <option value="Quantum Mechanics">Quantum Mechanics</option>
                  <option value="Calculus">Calculus</option>
                  <option value="Computing">Computing</option>
                  <option value="Physics">Physics</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#888888] uppercase block mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={tagsStr}
                  onChange={(e) => setTagsStr(e.target.value)}
                  placeholder="e.g. Physics, Review, Core"
                  className="w-full bg-[#050505] border border-[#222222] rounded-2xl py-2.5 px-3 text-[#F5F5F5] text-sm focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#888888] uppercase block mb-1">
                Short Summary
              </label>
              <input
                type="text"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Brief summary snippet..."
                className="w-full bg-[#050505] border border-[#222222] rounded-2xl py-2.5 px-3 text-[#F5F5F5] text-sm focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#888888] uppercase block mb-1">
                Note Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                placeholder="Write your study notes and quantum formulas here..."
                className="w-full bg-[#050505] border border-[#222222] rounded-2xl p-3 text-[#F5F5F5] text-sm focus:outline-none focus:border-violet-500 font-mono"
              />
            </div>

            <div className="flex justify-between pt-2">
              {note && onDeleteNote && (
                <button
                  type="button"
                  onClick={() => {
                    onDeleteNote(note.id);
                    onClose();
                  }}
                  className="px-4 py-2 bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/30 hover:bg-fuchsia-500/20 rounded-2xl text-xs font-bold"
                >
                  Delete Note
                </button>
              )}
              <div className="flex gap-2 ml-auto">
                <button
                  type="button"
                  onClick={() => note ? setIsEditing(false) : onClose()}
                  className="px-4 py-2 border border-[#222222] bg-[#1A1A1A] text-[#888888] rounded-2xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="quantum-glow text-white font-bold px-6 py-2 rounded-2xl text-xs"
                >
                  Save Note
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs font-mono text-[#888888]">
              <span className="px-2.5 py-1 bg-violet-500/10 text-violet-400 rounded-2xl font-bold">
                {note?.category}
              </span>
              <span>{note?.date}</span>
            </div>

            <div className="prose prose-invert max-w-none text-sm text-[#F5F5F5] leading-relaxed whitespace-pre-wrap font-sans">
              {note?.content}
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-[#222222]">
              {note?.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-2.5 py-1 bg-[#1A1A1A] border border-[#222222] rounded-2xl text-[#888888]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

