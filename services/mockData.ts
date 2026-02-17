import { Pool, Confession, MatchProfile, Message, User } from '../types';

export const currentUser: User = {
  id: 'u1',
  username: 'near_nomad.near',
  avatarUrl: 'https://picsum.photos/200/200?random=1',
  bio: 'Just exploring the decentralized web.',
  isOnline: true
};

export const pools: Pool[] = [
  { id: 'p1', name: 'Crypto Confessions', emoji: '💸', tagline: 'Lost your keys? Bought the top?', memberCount: 1240, confessionCount: 843, isJoined: true },
  { id: 'p2', name: 'Dating Confessions', emoji: '💔', tagline: 'Ghost stories and red flags.', memberCount: 3500, confessionCount: 2100, isJoined: false },
  { id: 'p3', name: 'Life Confessions', emoji: '🌱', tagline: 'Real talk about real life.', memberCount: 890, confessionCount: 430, isJoined: true },
  { id: 'p4', name: 'Campus Confessions', emoji: '🎓', tagline: 'What happens at uni...', memberCount: 5600, confessionCount: 4200, isJoined: false },
  { id: 'p5', name: 'Work Confessions', emoji: '💼', tagline: 'My boss doesn\'t know...', memberCount: 2100, confessionCount: 900, isJoined: true },
  { id: 'p6', name: 'General', emoji: '🗣️', tagline: 'Anything goes.', memberCount: 10500, confessionCount: 8900, isJoined: true },
];

export const confessions: Confession[] = [
  { id: 'c1', poolId: 'p1', text: 'I sold my entire stack right before the pump. I tell everyone I\'m holding.', timestamp: '2h ago', reactions: { heart: 12, fire: 4, thinking: 45, ghost: 2 } },
  { id: 'c2', poolId: 'p1', text: 'Sometimes I pretend to understand Zero Knowledge Proofs but I just nod.', timestamp: '4h ago', reactions: { heart: 56, fire: 10, thinking: 5, ghost: 0 } },
  { id: 'c3', poolId: 'p1', text: 'I use my seed phrase as my password for everything. I know it is bad.', timestamp: '1d ago', reactions: { heart: 2, fire: 89, thinking: 12, ghost: 15 } },
];

export const matches: MatchProfile[] = [
  { id: 'm1', anonymousId: 'Anon #8492', avatarUrl: 'https://picsum.photos/200/200?random=2', compatibility: 94, status: 'matched', tags: ['Crypto', 'Travel'] },
  { id: 'm2', anonymousId: 'Anon #1293', avatarUrl: 'https://picsum.photos/200/200?random=3', compatibility: 82, status: 'pending', tags: ['Music', 'Art'] },
  { id: 'm3', anonymousId: 'Anon #5511', avatarUrl: 'https://picsum.photos/200/200?random=4', compatibility: 45, status: 'rejected', tags: ['Sports'] },
  { id: 'm4', anonymousId: 'Anon #9910', avatarUrl: 'https://picsum.photos/200/200?random=5', compatibility: 78, status: 'accepted', tags: ['Gaming', 'Tech'] },
];

export const messages: Message[] = [
  { id: 'msg1', senderId: 'm1', text: 'Hey! Saw we matched on the crypto interest.', timestamp: '10:30 AM', isMe: false },
  { id: 'msg2', senderId: 'u1', text: 'Yeah! Do you trade often?', timestamp: '10:32 AM', isMe: true },
  { id: 'msg3', senderId: 'm1', text: 'Mostly hold. Too stressful to trade daily haha.', timestamp: '10:33 AM', isMe: false },
];
