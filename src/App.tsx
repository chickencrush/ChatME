import { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import MemberList from './components/MemberList';
import { initialChannels, users, currentUser } from './data';
import { Channel, Message } from './types';

function App() {
  const [channels, setChannels] = useState<Channel[]>(initialChannels);
  const [activeChannelId, setActiveChannelId] = useState<string>('ch1');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [memberListOpen, setMemberListOpen] = useState(false);

  const activeChannel = channels.find((ch) => ch.id === activeChannelId) || channels[0];
  const channelMembers = users.filter((u) => activeChannel.members.includes(u.id));

  const handleSelectChannel = useCallback((channelId: string) => {
    setActiveChannelId(channelId);
    // Clear unread count
    setChannels((prev) =>
      prev.map((ch) => (ch.id === channelId ? { ...ch, unreadCount: 0 } : ch))
    );
  }, []);

  const handleSendMessage = useCallback(
    (content: string) => {
      const newMessage: Message = {
        id: `m_${Date.now()}`,
        userId: currentUser.id,
        content,
        timestamp: new Date(),
      };

      setChannels((prev) =>
        prev.map((ch) =>
          ch.id === activeChannelId
            ? { ...ch, messages: [...ch.messages, newMessage] }
            : ch
        )
      );
    },
    [activeChannelId]
  );

  return (
    <div className="h-screen flex overflow-hidden bg-slate-100">
      {/* Sidebar */}
      <Sidebar
        channels={channels}
        activeChannelId={activeChannelId}
        onSelectChannel={handleSelectChannel}
        currentUserName={currentUser.name}
        currentUserAvatar={currentUser.avatar}
        isMobileOpen={sidebarOpen}
        onCloseMobile={() => setSidebarOpen(false)}
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
      />

      {/* Member List */}
      <MemberList
        members={channelMembers}
        isOpen={memberListOpen}
        onToggle={() => setMemberListOpen(!memberListOpen)}
      />
    </div>
  );
}

export default App;
