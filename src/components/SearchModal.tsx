import React, { useState, useEffect, useRef } from 'react';
import { Channel, User } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  channels: Channel[];
  users: User[];
  onGoToMessage: (channelId: string, messageId: string) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  channels,
  users,
  onGoToMessage,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (!isOpen) {
          // Will be handled by parent
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getUserById = (userId: string): User | undefined => {
    return users.find((u) => u.id === userId);
  };

  // Search results
  const messageResults: { channel: Channel; messageId: string; content: string; userName: string; userAvatar: string }[] = [];
  
  if (query.trim().length >= 2) {
    channels.forEach((channel) => {
      channel.messages.forEach((msg) => {
        if (msg.content.toLowerCase().includes(query.toLowerCase())) {
          const user = getUserById(msg.userId);
          messageResults.push({
            channel,
            messageId: msg.id,
            content: msg.content,
            userName: user?.name || 'Unknown',
            userAvatar: user?.avatar || '👤',
          });
        }
      });
    });
  }

  // Channel results
  const channelResults = channels.filter((ch) =>
    ch.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-lg mx-4 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-700">
          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari pesan, channel, atau anggota..."
            className="flex-1 text-sm bg-transparent outline-none text-slate-800 dark:text-slate-200 placeholder-slate-400"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs text-slate-400 bg-slate-100 dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto p-2">
          {!query.trim() && (
            <div className="text-center py-8 text-slate-400">
              <p className="text-3xl mb-2">🔍</p>
              <p className="text-sm">Ketik minimal 2 karakter untuk mencari</p>
            </div>
          )}

          {query.trim().length >= 2 && messageResults.length === 0 && channelResults.length === 0 && (
            <div className="text-center py-8 text-slate-400">
              <p className="text-3xl mb-2">😕</p>
              <p className="text-sm">Tidak ada hasil untuk "{query}"</p>
            </div>
          )}

          {/* Channel Results */}
          {channelResults.length > 0 && (
            <div className="mb-3">
              <h4 className="text-xs font-semibold text-slate-400 uppercase px-3 py-2">Channel</h4>
              {channelResults.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => {
                    onGoToMessage(ch.id, '');
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-left"
                >
                  <span className="text-slate-400">#</span>
                  <div>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{ch.name}</p>
                    <p className="text-xs text-slate-500">{ch.description}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Message Results */}
          {messageResults.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase px-3 py-2">Pesan</h4>
              {messageResults.slice(0, 10).map((result, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    onGoToMessage(result.channel.id, result.messageId);
                    onClose();
                  }}
                  className="w-full flex items-start gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-left"
                >
                  <span className="text-xl flex-shrink-0">{result.userAvatar}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-indigo-600">#{result.channel.name}</p>
                    <p className="text-sm text-slate-700 dark:text-slate-300 truncate">
                      <span className="font-medium">{result.userName}:</span>{' '}
                      {result.content}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-400">
          <span>
            {messageResults.length} pesan • {channelResults.length} channel
          </span>
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600">↑↓</kbd>
            <span>navigasi</span>
            <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600">↵</kbd>
            <span>pilih</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
