import { useState, useCallback, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import MemberList from './components/MemberList';
import SplashScreen from './components/SplashScreen';
import SearchModal from './components/SearchModal';
import { initialChannels, users, currentUser, autoReplies } from './data';
import { Channel, Message } from './types';
import { useLocalStorage, useDarkMode } from './hooks/useLocalStorage';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [channels, setChannels] = useLocalStorage<Channel[]>('teamchat-channels', initialChannels);
  const [activeChannelId, setActiveChannelId] = useLocalStorage<string>('teamchat-active-channel', 'ch1');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [memberListOpen, setMemberListOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [isDark, toggleDark] = useDarkMode();

  const activeChannel = channels.find((ch) => ch.id === activeChannelId) || channels[0];
  const channelMembers = users.filter((u) => activeChannel.members.includes(u.id));
  const onlineCount = users.filter((u) => u.status === 'online').length;

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectChannel = useCallback(
    (channelId: string) => {
      setActiveChannelId(channelId);
      // Clear unread count
      setChannels((prev: Channel[]) =>
        prev.map((ch) => (ch.id === channelId ? { ...ch, unreadCount: 0 } : ch))
      );
    },
    [setActiveChannelId, setChannels]
  );

  const handleSendMessage = useCallback(
    (content: string) => {
      const newMessage: Message = {
        id: `m_${Date.now()}`,
        userId: currentUser.id,
        content,
        timestamp: new Date(),
      };

      setChannels((prev: Channel[]) =>
        prev.map((ch) =>
          ch.id === activeChannelId
            ? { ...ch, messages: [...ch.messages, newMessage] }
            : ch
        )
      );

      // Simulate typing and auto-reply
      simulateAutoReply(activeChannelId);
    },
    [activeChannelId, setChannels]
  );

  const simulateAutoReply = (channelId: string) => {
    const channel = channels.find((ch) => ch.id === channelId);
    if (!channel) return;

    // Get other members in the channel
    const otherMembers = channel.members.filter((id) => id !== currentUser.id);
    if (otherMembers.length === 0) return;

    // Pick a random member to reply
    const replierId = otherMembers[Math.floor(Math.random() * otherMembers.length)];
    const replier = users.find((u) => u.id === replierId);
    if (!replier || replier.status === 'offline') return;

    // Show typing indicator
    setTimeout(() => {
      setTypingUsers([replierId]);
    }, 1000);

    // Send auto-reply
    const replies = autoReplies[channelId] || autoReplies['ch1'];
    const reply = replies[Math.floor(Math.random() * replies.length)];

    setTimeout(() => {
      setTypingUsers([]);

      const replyMessage: Message = {
        id: `m_reply_${Date.now()}`,
        userId: replierId,
        content: reply,
        timestamp: new Date(),
      };

      setChannels((prev: Channel[]) =>
        prev.map((ch) =>
          ch.id === channelId
            ? { ...ch, messages: [...ch.messages, replyMessage] }
            : ch
        )
      );
    }, 2500 + Math.random() * 2000);
  };

  const handleGoToMessage = useCallback(
    (channelId: string, _messageId: string) => {
      setActiveChannelId(channelId);
      setChannels((prev: Channel[]) =>
        prev.map((ch) => (ch.id === channelId ? { ...ch, unreadCount: 0 } : ch))
      );
    },
    [setActiveChannelId, setChannels]
  );

  const handleResetData = useCallback(() => {
    setChannels(initialChannels);
    setActiveChannelId('ch1');
  }, [setChannels, setActiveChannelId]);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <div className="h-screen flex overflow-hidden bg-slate-100 dark:bg-slate-950">
      {/* Sidebar */}
      <Sidebar
        channels={channels}
        activeChannelId={activeChannelId}
        onSelectChannel={handleSelectChannel}
        currentUserName={currentUser.name}
        currentUserAvatar={currentUser.avatar}
        isMobileOpen={sidebarOpen}
        onCloseMobile={() => setSidebarOpen(false)}
        isDark={isDark}
        onToggleDark={toggleDark}
        onOpenSearch={() => setSearchOpen(true)}
        onlineCount={onlineCount}
      />

      {/* Main Chat Area */}
      <ChatArea
        messages={activeChannel.messages}
        users={users}
        currentUserId={currentUser.id}
        channelName={activeChannel.name}
        channelDescription={activeChannel.description}
        onSendMessage={handleSendMessage}
        onOpenSidebar={() => setSidebarOpen(true)}
        typingUsers={typingUsers}
      />

      {/* Member List */}
      <MemberList
        members={channelMembers}
        isOpen={memberListOpen}
        onToggle={() => setMemberListOpen(!memberListOpen)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        channels={channels}
        users={users}
        onGoToMessage={handleGoToMessage}
      />

      {/* Floating Action Button - Reset Data */}
      <button
        onClick={handleResetData}
        className="fixed bottom-4 left-4 z-30 bg-slate-700 dark:bg-slate-600 text-white p-2 rounded-full shadow-lg hover:bg-slate-800 dark:hover:bg-slate-500 transition-colors text-xs"
        title="Reset data ke default"
      >
        🔄
      </button>
    </div>
  );
}

export default App;
