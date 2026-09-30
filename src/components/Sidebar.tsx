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
}

const Sidebar: React.FC<SidebarProps> = ({
  channels,
  activeChannelId,
  onSelectChannel,
  currentUserName,
  currentUserAvatar,
  isMobileOpen,
  onCloseMobile,
}) => {
  const publicChannels = channels.filter((ch) => ch.type === 'public');

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white flex flex-col transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Workspace Header */}
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold flex items-center gap-2">
                <span className="text-2xl">💬</span>
                TeamChat
              </h1>
              <p className="text-xs text-slate-400 mt-1">Workspace Tim Kerja</p>
            </div>
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-2 hover:bg-slate-700 rounded-lg"
            >
              ✕
            </button>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="text-2xl">{currentUserAvatar}</span>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></span>
            </div>
            <div>
              <p className="font-medium text-sm">{currentUserName}</p>
              <p className="text-xs text-green-400">● Online</p>
            </div>
          </div>
        </div>

        {/* Channels List */}
        <div className="flex-1 overflow-y-auto p-3">
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2">
              📢 Channel
            </h3>
            <ul className="space-y-0.5">
              {publicChannels.map((channel) => (
                <li key={channel.id}>
                  <button
                    onClick={() => {
                      onSelectChannel(channel.id);
                      onCloseMobile();
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between transition-colors ${
                      activeChannelId === channel.id
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <span className="text-slate-400">#</span>
                      <span className="truncate">{channel.name}</span>
                    </span>
                    {channel.unreadCount > 0 && (
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                        {channel.unreadCount}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2">
              🔒 Private
            </h3>
            <ul className="space-y-0.5">
              <li>
                <button className="w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                  <span className="text-slate-400">🔒</span>
                  <span>manajemen</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>⚡</span>
            <span>8 anggota aktif</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
