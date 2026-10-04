import React, { useState, useRef, useEffect } from 'react';
import { Message, User } from '../types';

interface ChatAreaProps {
  messages: Message[];
  users: User[];
  currentUserId: string;
  channelName: string;
  channelDescription: string;
  onSendMessage: (content: string) => void;
  onOpenSidebar: () => void;
  typingUsers: string[];
}

const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  users,
  currentUserId,
  channelName,
  channelDescription,
  onSendMessage,
  onOpenSidebar,
  typingUsers,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const emojiCategories = {
    'Smileys': ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '😊', '😇', '🥰', '😍', '🤩', '😘'],
    'Gestures': ['👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '👊', '✊', '🤛', '🤜', '👏', '🙌', '🤝', '🙏'],
    'Hearts': ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '💕', '💞', '💓', '💗', '💖', '💘', '💝'],
    'Objects': ['🔥', '⭐', '🌟', '💫', '✨', '⚡', '💥', '🎉', '🎊', '🏆', '🎯', '💡', '📌', '📎', '🔗'],
    'Work': ['💻', '📱', '⌨️', '🖥️', '📊', '📈', '📉', '📋', '📝', '✅', '❌', '⏰', '📅', '🔔', '📢'],
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typingUsers]);

  const getUserById = (userId: string): User | undefined => {
    return users.find((u) => u.id === userId);
  };

  const formatTime = (date: Date): string => {
    const d = new Date(date);
    return d.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (date: Date): string => {
    const d = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (d.toDateString() === today.toDateString()) return 'Hari ini';
    if (d.toDateString() === yesterday.toDateString()) return 'Kemarin';
    return d.toLocaleDateString('id-ID', {
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
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    // Auto resize
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
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
    <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-slate-900">
      {/* Channel Header */}
      <header className="h-16 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSidebar}
            className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div>
            <h2 className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
              <span className="text-slate-400">#</span> {channelName}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">{channelDescription}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Welcome message */}
        <div className="text-center mb-6 py-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center text-3xl mb-3">
            #
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
            Selamat datang di #{channelName}!
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {channelDescription}
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
            Ini adalah awal dari channel #{channelName}.
          </p>
        </div>

        {groupedMessages.map((group) => (
          <div key={group.date}>
            {/* Date Divider */}
            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-slate-200 dark:border-slate-700"></div>
              <span className="px-4 text-xs font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900">
                {group.date}
              </span>
              <div className="flex-1 border-t border-slate-200 dark:border-slate-700"></div>
            </div>

            {/* Messages */}
            {group.messages.map((message, idx) => {
              const user = getUserById(message.userId);
              const isCurrentUser = message.userId === currentUserId;
              const prevMessage = idx > 0 ? group.messages[idx - 1] : null;
              const isConsecutive =
                prevMessage &&
                prevMessage.userId === message.userId &&
                new Date(message.timestamp).getTime() - new Date(prevMessage.timestamp).getTime() < 300000;

              return (
                <div
                  key={message.id}
                  className={`group flex gap-3 px-3 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${
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
                    <div className={`w-10 h-10 flex-shrink-0 rounded-lg flex items-center justify-center text-xl ${
                      isCurrentUser
                        ? 'bg-indigo-100 dark:bg-indigo-900/30'
                        : 'bg-slate-100 dark:bg-slate-800'
                    }`}>
                      {user?.avatar || '👤'}
                    </div>
                  )}

                  {/* Message Content */}
                  <div className="flex-1 min-w-0">
                    {!isConsecutive && (
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`font-semibold text-sm ${isCurrentUser ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-800 dark:text-slate-200'}`}>
                          {user?.name || 'Unknown'}
                        </span>
                        {user?.role && (
                          <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded">
                            {user.role}
                          </span>
                        )}
                        <span className="text-xs text-slate-400 dark:text-slate-500">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                    )}
                    <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap break-words leading-relaxed">
                      {message.content}
                    </p>

                    {/* Reactions */}
                    {message.reactions && message.reactions.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {message.reactions.map((reaction, rIdx) => (
                          <button
                            key={rIdx}
                            className="inline-flex items-center gap-1 px-2 py-0.5 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-full text-xs hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors"
                          >
                            <span>{reaction.emoji}</span>
                            <span className="text-indigo-600 dark:text-indigo-400 font-medium">{reaction.users.length}</span>
                          </button>
                        ))}
                        <button className="inline-flex items-center px-2 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-xs hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors opacity-0 group-hover:opacity-100">
                          <span>+</span>
                          <span className="text-slate-500">😊</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Message Actions */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-start gap-0.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm p-0.5">
                    <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs transition-colors">
                      😊
                    </button>
                    <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs transition-colors">
                      ↩️
                    </button>
                    <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs transition-colors">
                      ⋯
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        {/* Typing Indicator */}
        {typingUsers.length > 0 && (
          <div className="flex items-center gap-2 px-3 py-2 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex gap-0.5">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
            <span>
              <span className="font-medium">
                {typingUsers.map(id => getUserById(id)?.name).join(', ')}
              </span>
              {' '}sedang mengetik...
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
        <div className="relative">
          <div className="border border-slate-300 dark:border-slate-600 rounded-xl overflow-hidden focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 dark:focus-within:ring-indigo-900/30 transition-all bg-white dark:bg-slate-800">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder={`Kirim pesan ke #${channelName}...`}
              rows={1}
              className="w-full px-4 py-3 text-sm resize-none focus:outline-none placeholder-slate-400 dark:placeholder-slate-500 bg-transparent text-slate-800 dark:text-slate-200"
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
            <div className="flex items-center justify-between px-3 py-2 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-1">
                <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors" title="Lampirkan file">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors" title="Emoji">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                  title="GIF & Sticker"
                >
                  ⚡
                </button>
                <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors" title="Mention">
                  @
                </button>
              </div>
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  inputValue.trim()
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow-md'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                }`}
              >
                Kirim ↗
              </button>
            </div>
          </div>

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="absolute bottom-full mb-2 left-0 right-0 sm:right-auto sm:w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-20 overflow-hidden">
              <div className="p-3 border-b border-slate-200 dark:border-slate-700">
                <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Emoji</h4>
              </div>
              <div className="max-h-60 overflow-y-auto p-3">
                {Object.entries(emojiCategories).map(([category, emojis]) => (
                  <div key={category} className="mb-3">
                    <h5 className="text-[10px] font-semibold text-slate-400 uppercase mb-1">{category}</h5>
                    <div className="flex flex-wrap gap-1">
                      {emojis.map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => {
                            setInputValue((prev) => prev + emoji);
                            setShowEmojiPicker(false);
                          }}
                          className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-lg transition-colors"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 text-center">
          Tekan <kbd className="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-[9px] font-mono">Enter</kbd> untuk kirim, <kbd className="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-[9px] font-mono">Shift+Enter</kbd> untuk baris baru
        </p>
      </div>
    </div>
  );
};

export default ChatArea;
