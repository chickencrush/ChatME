import React from 'react';
import { Channel } from '../types';

interface SidebarProps {
  channels: Channel[];
  activeChannelId: string;
  onSelectChannel: (channelId: string) => void;
  currentUserName: string;
  currentUserAvatar: string;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  isDark: boolean;
  onToggleDark: () => void;
  onOpenSearch: () => void;
  onlineCount: number;
}

const Sidebar: React.FC<SidebarProps> = ({
  channels,
  activeChannelId,
  onSelectChannel,
  currentUserName,
  currentUserAvatar,
  isMobileOpen,
  onCloseMobile,
  isDark,
  onToggleDark,
  onOpenSearch,
  onlineCount,
}) => {
  const publicChannels = channels.filter((ch) => ch.type === 'public');
  const totalUnread = channels.reduce((sum, ch) => sum + ch.unreadCount, 0);

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white flex flex-col transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Workspace Header */}
        <div className="p-4 border-b border-slate-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-lg shadow-lg">
                💬
              </div>
              <div>
                <h1 className="text-base font-bold">TeamChat</h1>
                <p className="text-[10px] text-slate-400">Workspace Tim Kerja</p>
              </div>
            </div>
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="px-3 pt-3">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-slate-400 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Cari pesan...</span>
            <kbd className="ml-auto text-[10px] bg-slate-700 px-1.5 py-0.5 rounded">⌘K</kbd>
          </button>
        </div>

        {/* User Info */}
        <div className="px-3 py-3">
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-slate-800/50">
            <div className="relative">
              <span className="text-2xl">{currentUserAvatar}</span>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse"></span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{currentUserName}</p>
              <p className="text-[10px] text-green-400">● Online</p>
            </div>
            <button
              onClick={onToggleDark}
              className="p-1.5 hover:bg-slate-700 rounded-lg transition-colors"
              title={isDark ? 'Light mode' : 'Dark mode'}
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>

        {/* Channels List */}
        <div className="flex-1 overflow-y-auto px-3 pb-3">
          <div className="mb-4">
            <h3 className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-2 mb-2 flex items-center justify-between">
              <span>📢 Channels</span>
              {totalUnread > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {totalUnread}
                </span>
              )}
            </h3>
            <ul className="space-y-0.5">
              {publicChannels.map((channel) => (
                <li key={channel.id}>
                  <button
                    onClick={() => {
                      onSelectChannel(channel.id);
                      onCloseMobile();
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between transition-all duration-200 ${
                      activeChannelId === channel.id
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <span className={`text-sm ${activeChannelId === channel.id ? 'text-indigo-200' : 'text-slate-500'}`}>#</span>
                      <span className="truncate font-medium">{channel.name}</span>
                    </span>
                    {channel.unreadCount > 0 && (
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center ${
                        activeChannelId === channel.id
                          ? 'bg-white/20 text-white'
                          : 'bg-red-500 text-white'
                      }`}>
                        {channel.unreadCount}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-2 mb-2">
              🔒 Private
            </h3>
            <ul className="space-y-0.5">
              <li>
                <button className="w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                  <span className="text-slate-500">🔒</span>
                  <span>manajemen</span>
                </button>
              </li>
              <li>
                <button className="w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                  <span className="text-slate-500">🔒</span>
                  <span>hrd-internal</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-700/50">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>{onlineCount} anggota online</span>
            </div>
            <span className="text-[10px] text-slate-500">v2.0</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
