import React, { useState } from 'react';
import { NoteItem } from '../types';

interface NotesScreenProps {
  notes: NoteItem[];
  onSelectNote: (note: NoteItem) => void;
  onCreateNewNote: () => void;
}

export const NotesScreen: React.FC<NotesScreenProps> = ({
  notes,
  onSelectNote,
  onCreateNewNote
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All Notes');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['All Notes', 'Quantum Mechanics', 'Calculus', 'Computing', 'Physics'];

  const featuredNote = notes.find(n => n.isFeatured) || notes[0];

  const filteredNotes = notes.filter(n => {
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag =
      selectedTag === 'All Notes' ||
      n.category.toLowerCase() === selectedTag.toLowerCase() ||
      n.tags.some(t => t.toLowerCase() === selectedTag.toLowerCase());

    return matchesSearch && matchesTag;
  });

  return (
    <div className="space-y-6 pb-28">
      {/* Header */}
      <div>
        <span className="text-[11px] font-mono text-[#888888] uppercase tracking-widest">
          Knowledge Base
        </span>
        <h1 className="font-sans text-2xl md:text-3xl font-bold text-[#F5F5F5] tracking-tight">
          Archive & Notes
        </h1>
      </div>

      {/* Search & Filter Bar */}
      <section className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full max-w-2xl">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#888888]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your notes & research..."
            className="w-full bg-[#121212] border border-[#222222] rounded-2xl py-3 pl-12 pr-4 text-[#F5F5F5] focus:outline-none focus:border-violet-500 transition-all placeholder:text-[#888888] text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#F5F5F5]"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          )}
        </div>

        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedTag(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-mono tracking-wider transition-all ${
                selectedTag === cat
                  ? 'bg-violet-500/10 text-violet-400 border border-violet-500/30'
                  : 'bg-[#121212] border border-[#222222] text-[#888888] hover:text-[#F5F5F5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Note / Last Studied Section */}
      {featuredNote && !searchQuery && selectedTag === 'All Notes' && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-violet-400 text-xl">bookmark</span>
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#888888]">
              Last Studied
            </h2>
          </div>
          <div
            onClick={() => onSelectNote(featuredNote)}
            className="bento-card-interactive overflow-hidden grid md:grid-cols-3 gap-0 relative cursor-pointer group"
          >
            <div className="md:col-span-1 h-48 md:h-full relative overflow-hidden bg-[#050505]">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{
                  backgroundImage: `url('${featuredNote.imageUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCZdriHDWAxTHPRhrjY_RVFbbYvrAeFdWEmIX9btn2b6_CKLcMUIzxPVNGW_9WatTz3xE5gRI21rqpj8LHAMilttivwgGuZXQNhXwdlRuSWS62984XzpKY768x956VvGWObCCeU0LtryeNc-M3uI2VG68zbBzRCKk9x5QR04-HDWO9Cn5ckPEJEDVmZQFlDbr_ovnaod4dqwl3GxJvm-GS6Zq5W_tHfQPDxe9-8iR7CZ3MPsX9p4_tOg'}')`
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/40 to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#121212]"></div>
            </div>

            <div className="md:col-span-2 p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg md:text-xl text-[#F5F5F5] group-hover:text-violet-400 transition-colors">
                    {featuredNote.title}
                  </h3>
                  <span className="px-2.5 py-1 bg-violet-500/10 text-violet-400 rounded-md text-[10px] font-mono font-bold uppercase border border-violet-500/20">
                    {featuredNote.categoryTag}
                  </span>
                </div>
                <p className="text-[#888888] text-xs leading-relaxed line-clamp-3">
                  {featuredNote.summary}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between pt-4 border-t border-[#222222]">
                <div className="text-xs font-mono text-[#888888]">
                  {featuredNote.lastEditedAgo || 'Edited recently'}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectNote(featuredNote);
                  }}
                  className="text-violet-400 text-xs font-mono font-bold flex items-center gap-1 hover:gap-2 transition-all"
                >
                  Keep Reading{' '}
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Your Archive Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-violet-400 text-xl">folder_open</span>
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#888888]">
              Your Archive
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl transition-colors ${
                viewMode === 'grid'
                  ? 'bg-violet-500/10 text-violet-400 border border-violet-500/30'
                  : 'bg-[#121212] text-[#888888] border border-[#222222] hover:text-[#F5F5F5]'
              }`}
              title="Grid View"
            >
              <span className="material-symbols-outlined text-lg">grid_view</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-xl transition-colors ${
                viewMode === 'list'
                  ? 'bg-violet-500/10 text-violet-400 border border-violet-500/30'
                  : 'bg-[#121212] text-[#888888] border border-[#222222] hover:text-[#F5F5F5]'
              }`}
              title="List View"
            >
              <span className="material-symbols-outlined text-lg">list</span>
            </button>
          </div>
        </div>

        {filteredNotes.length === 0 ? (
          <div className="bento-card p-8 text-center space-y-3">
            <span className="material-symbols-outlined text-4xl text-[#888888]">
              find_in_page
            </span>
            <p className="text-sm text-[#888888]">No notes matching your search criteria.</p>
            <button
              onClick={onCreateNewNote}
              className="quantum-glow font-bold px-4 py-2 rounded-xl text-xs"
            >
              Create New Draft
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => onSelectNote(note)}
                className="bento-card-interactive p-5 space-y-4 group cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="material-symbols-outlined text-violet-400 group-hover:scale-110 transition-transform text-2xl">
                      description
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[#888888] uppercase">
                      {note.date}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-[#F5F5F5] mb-1 group-hover:text-violet-400 transition-colors line-clamp-1">
                      {note.title}
                    </h4>
                    <p className="text-xs text-[#888888] line-clamp-3 leading-relaxed">
                      {note.summary}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#222222]">
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 bg-[#1A1A1A] rounded border border-[#222222] text-[#888888]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* Create New Draft Button Card */}
            <button
              onClick={onCreateNewNote}
              className="border-2 border-dashed border-[#222222] rounded-[24px] p-6 flex flex-col items-center justify-center gap-2 text-[#888888] hover:border-violet-500/50 hover:text-violet-400 transition-all group min-h-[180px]"
            >
              <span className="material-symbols-outlined text-3xl group-hover:scale-125 transition-transform text-violet-400">
                add_circle
              </span>
              <span className="font-mono font-bold text-xs uppercase tracking-wider">Create New Draft</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => onSelectNote(note)}
                className="bento-card-interactive p-4 flex items-center justify-between gap-4 cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="material-symbols-outlined text-violet-400 text-2xl">
                    description
                  </span>
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm text-[#F5F5F5] group-hover:text-violet-400 transition-colors truncate">
                      {note.title}
                    </h4>
                    <p className="text-xs text-[#888888] truncate">{note.summary}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[10px] font-mono text-[#888888] uppercase hidden sm:inline">
                    {note.date}
                  </span>
                  <span className="material-symbols-outlined text-[#888888] group-hover:text-violet-400">
                    chevron_right
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Floating Action Button (FAB) */}
      <button
        onClick={onCreateNewNote}
        className="fixed bottom-24 right-6 w-14 h-14 quantum-glow rounded-full flex items-center justify-center text-white z-40 hover:scale-110 active:scale-90 transition-transform shadow-[0_0_20px_rgba(139,92,246,0.4)] group"
        title="Create New Note"
      >
        <span
          className="material-symbols-outlined text-2xl group-hover:rotate-90 transition-transform"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          add
        </span>
      </button>
    </div>
  );
};

