export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away' | 'busy';
  role: string;
}

export interface Message {
  id: string;
  userId: string;
  content: string;
  timestamp: Date;
  reactions?: Reaction[];
}

export interface Reaction {
  emoji: string;
  users: string[];
}

export interface Channel {
  id: string;
  name: string;
  description: string;
  type: 'public' | 'private' | 'direct';
  unreadCount: number;
  members: string[];
  messages: Message[];
}
