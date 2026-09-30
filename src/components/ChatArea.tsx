import React, { useState } from 'react';
import { Message, User } from '../types';

interface ChatAreaProps {
  messages: Message[];
  users: User[];
  currentUserId: string;
  channelName: string;
  channelDescription: string;
  onSendMessage: (content: string) => void;
  onOpenSidebar: () => void;
}

const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  users,
  currentUserId,
  channelName,
  channelDescription,
  onSendMessage,
  onOpenSidebar,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const quickEmojis = ['👍', '❤️', '😂', '🎉', '🔥', '👀', '✅', '💯'];

  const getUserById = (userId: string): User | undefined => {
    return users.find((u) => u.id === userId);
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (date: Date): string => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return 'Hari ini';
    if (date.toDateString() === yesterday.toDateString()) return 'Kemarin';
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Group messages by date
  const groupedMessages: { date: string; messages: Message[] }[] = [];
  messages.forEach((msg) => {
    const dateStr = formatDate(msg.timestamp);
    const lastGroup = groupedMessages[groupedMessages.length - 1];
    if (lastGroup && lastGroup.date === dateStr) {
      lastGroup.messages.push(msg);
    } else {
      groupedMessages.push({ date: dateStr, messages: [msg] });
    }
  });

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-white">
      {/* Channel Header */}
      <header className="h-16 border-b border-slate-200 flex items-center justify-between px-4 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSidebar}
            className="lg:hidden p-2 hover:bg-slate-100 rounded-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div>
            <h2 className="font-semibold text-slate-800 flex items-center gap-1">
              <span className="text-slate-400">#</span> {channelName}
            </h2>
            <p className="text-xs text-slate-500 hidden sm:block">{channelDescription}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-700 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-700 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {groupedMessages.map((group) => (
          <div key={group.date}>
            {/* Date Divider */}
            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-slate-200"></div>
              <span className="px-4 text-xs font-medium text-slate-500 bg-white">
                {group.date}
              </span>
              <div className="flex-1 border-t border-slate-200"></div>
            </div>

            {/* Messages */}
            {group.messages.map((message, idx) => {
              const user = getUserById(message.userId);
              const isCurrentUser = message.userId === currentUserId;
              const prevMessage = idx > 0 ? group.messages[idx - 1] : null;
              const isConsecutive =
                prevMessage &&
                prevMessage.userId === message.userId &&
                message.timestamp.getTime() - prevMessage.timestamp.getTime() < 300000;

              return (
                <div
                  key={message.id}
                  className={`group flex gap-3 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors ${
                    !isConsecutive ? 'mt-3' : ''
                  }`}
                >
                  {/* Avatar or spacer */}
                  {isConsecutive ? (
                    <div className="w-10 flex-shrink-0 flex items-center justify-center">
                      <span className="text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  ) : (
                    <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-slate-100 flex items-center justify-center text-xl">
                      {user?.avatar || '👤'}
                    </div>
                  )}

                  {/* Message Content */}
                  <div className="flex-1 min-w-0">
                    {!isConsecutive && (
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`font-semibold text-sm ${isCurrentUser ? 'text-indigo-600' : 'text-slate-800'}`}>
                          {user?.name || 'Unknown'}
                        </span>
                        <span className="text-xs text-slate-400">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                    )}
                    <p className="text-sm text-slate-700 whitespace-pre-wrap break-words">
                      {message.content}
                    </p>

                    {/* Reactions */}
                    {message.reactions && message.reactions.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {message.reactions.map((reaction, rIdx) => (
                          <button
                            key={rIdx}
                            className="inline-flex items-center gap-1 px-2 py-0.5 bg-indigo-50 border border-indigo-200 rounded-full text-xs hover:bg-indigo-100 transition-colors"
                          >
                            <span>{reaction.emoji}</span>
                            <span className="text-indigo-600 font-medium">{reaction.users.length}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Message Actions */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-start gap-0.5">
                    <button className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-slate-600 text-xs">
                      😊
                    </button>
                    <button className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-slate-600 text-xs">
                      ↩️
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-slate-200">
        <div className="relative">
          <div className="border border-slate-300 rounded-xl overflow-hidden focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Kirim pesan ke #${channelName}...`}
              rows={1}
              className="w-full px-4 py-3 text-sm resize-none focus:outline-none placeholder-slate-400"
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
            <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border-t border-slate-200">
              <div className="flex items-center gap-1">
                <button className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500 hover:text-slate-700 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                <button className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500 hover:text-slate-700 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500 hover:text-slate-700 transition-colors"
                >
                  ⚡
                </button>
              </div>
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  inputValue.trim()
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Kirim
              </button>
            </div>
          </div>

          {/* Quick Emoji Picker */}
          {showEmojiPicker && (
            <div className="absolute bottom-full mb-2 left-0 bg-white border border-slate-200 rounded-xl shadow-lg p-3 z-20">
              <div className="flex gap-2">
                {quickEmojis.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => {
                      setInputValue((prev) => prev + emoji);
                      setShowEmojiPicker(false);
                    }}
                    className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-lg text-lg transition-colors"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <p className="text-xs text-slate-400 mt-2 text-center">
          Tekan <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-mono">Enter</kbd> untuk mengirim, <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-mono">Shift+Enter</kbd> untuk baris baru
        </p>
      </div>
    </div>
  );
};

export default ChatArea;
