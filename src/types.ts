// Core Types
export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
  backgroundImage?: string;
  about?: string;
  location?: string;
  following: number;
  followers: number;
  joinedDate: Date;
}

export interface Story {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  language: string;
  maturityRating: 'General' | 'Mature';
  status: 'Ongoing' | 'Complete';
  coverImage?: string;
  authorId: string;
  author: User;
  parts: StoryPart[];
  createdAt: Date;
  updatedAt: Date;
  views: number;
  likes: number;
  commentsCount: number;
}

export interface StoryPart {
  id: string;
  storyId: string;
  title: string;
  content: string;
  order: number;
  status: 'Draft' | 'Published';
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  user: User;
  storyId: string;
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
}

export interface Notification {
  id: string;
  type: 'comment' | 'mention' | 'follow' | 'story_update';
  userId: string;
  relatedUserId?: string;
  storyId?: string;
  commentId?: string;
  read: boolean;
  createdAt: Date;
}

export interface ReadingPreferences {
  fontSize: number;
  fontFamily: string;
  theme: 'light' | 'dark';
  showComments: boolean;
  showReactions: boolean;
}

export interface UserSettings {
  email: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  blockedTags: string[];
  showMatureContent: boolean;
  preferredLanguage: string;
}

// Constants
export const CATEGORIES = [
  'Romance',
  'Sci-Fi',
  'Mystery',
  'Fantasy',
  'Horror',
  'Thriller',
  'Adventure',
  'Historical Fiction'
];

export const LANGUAGES = [
  'English',
  'Spanish',
  'French',
  'German',
  'Chinese',
  'Japanese',
  'Korean',
  'Russian'
];

export const FONT_FAMILIES = [
  'Inter',
  'Merriweather',
  'Roboto',
  'Open Sans',
  'Lora'
];