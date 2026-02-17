export interface User {
  id: string;
  username: string;
  avatarUrl: string;
  bio?: string;
  isOnline?: boolean;
}

export interface Pool {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  memberCount: number;
  confessionCount: number;
  isJoined: boolean;
}

export interface Confession {
  id: string;
  poolId: string;
  text: string;
  timestamp: string;
  reactions: {
    heart: number;
    fire: number;
    thinking: number;
    ghost: number;
  };
}

export interface MatchProfile {
  id: string;
  anonymousId: string;
  avatarUrl: string;
  compatibility: number;
  status: 'pending' | 'accepted' | 'rejected' | 'matched';
  tags: string[];
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export interface Preferences {
  interests: string[];
  values: string[];
  dealBreakers: string;
  minAge: number;
  maxAge: number;
}