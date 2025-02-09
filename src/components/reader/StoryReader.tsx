import { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Eye, Settings, MessageSquare, Heart, Share2, Send, X } from 'lucide-react';
import { Story, ReadingPreferences } from '../../types';

interface Comment {
  id: string;
  userId: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  createdAt: Date;
  lineNumber: number;
}

interface LineCommentProps {
  comments: Comment[];
  lineNumber: number;
  onAddComment: (lineNumber: number, content: string) => void;
}

function LineComments({ comments, lineNumber, onAddComment }: LineCommentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const flyoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (flyoutRef.current && !flyoutRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(lineNumber, newComment);
      setNewComment('');
    }
  };

  return (
    <span className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center text-gray-400 hover:text-indigo-600 transition-colors"
      >
        <MessageSquare className="h-4 w-4" />
        {comments.length > 0 && (
          <span className="mr-1 text-xs">{comments.length}</span>
        )}
      </button>

      {isOpen && (
        <div
          ref={flyoutRef}
          className="fixed left-0 top-[104px] h-[calc(100vh-104px)] w-96 bg-white shadow-xl border-r border-gray-200 z-50 overflow-hidden"
          style={{ top: 'var(--nav-height, 104px)' }}
        >
          <div className="h-full flex flex-col">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">التعليقات</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                تعليقات على السطر {lineNumber + 1}
              </p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {comments.map(comment => (
                  <div key={comment.id} className="flex space-x-3">
                    <img
                      src={comment.user.avatar}
                      alt={comment.user.name}
                      className="h-8 w-8 rounded-full"
                    />
                    <div className="flex-1 mr-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900">
                          {comment.user.name}
                        </h4>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString('ar-SA')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t bg-white">
              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="اكتب تعليقاً..."
                  className="w-full border-gray-300 rounded-full pr-4 pl-10 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </span>
  );
}

export function StoryReader() {
  const { id } = useParams();
  const [preferences, setPreferences] = useState<ReadingPreferences>({
    fontSize: 16,
    fontFamily: 'Noto Sans Arabic',
    theme: 'light',
    showComments: true,
    showReactions: true
  });
  const [showSettings, setShowSettings] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);

  // Mock comments data
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      userId: '1',
      user: {
        name: 'أحمد محمد',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
      },
      content: 'بداية قوية للقصة!',
      createdAt: new Date('2024-02-20'),
      lineNumber: 1
    },
    {
      id: '2',
      userId: '2',
      user: {
        name: 'سارة أحمد',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
      },
      content: 'وصف رائع للمشهد',
      createdAt: new Date('2024-02-21'),
      lineNumber: 3
    }
  ]);

  // Mock story data
  const story: Story = {
    id: '1',
    title: 'السفينة الفضائية الأخيرة',
    description: 'مغامرة مثيرة في الفضاء',
    author: {
      id: '1',
      displayName: 'سارة جونسون',
      username: 'starwriter',
      following: 1200,
      followers: 5000,
      joinedDate: new Date('2023-01-01')
    },
    category: 'خيال علمي',
    tags: ['فضاء', 'مغامرة'],
    language: 'العربية',
    maturityRating: 'General',
    status: 'Ongoing',
    authorId: '1',
    parts: [
      {
        id: '1',
        storyId: '1',
        title: 'الفصل الأول: البداية',
        content: `في عام 2157، حيث تغيرت معالم الأرض تماماً...

كانت سارة تنظر من نافذة المركبة الفضائية "الأمل" إلى كوكبها الأم الذي يبتعد شيئاً فشيئاً. كانت السماء مليئة بالنجوم، وكان قلبها مليئاً بالأمل والخوف في آن واحد.

"هل نحن حقاً آخر من تبقى؟" همست لنفسها وهي تتأمل الفضاء اللانهائي أمامها.

كانت المهمة واضحة: العثور على كوكب جديد صالح للحياة. لكن التحديات كانت أكبر من أن تُحصى. فالوقت ينفد، والموارد محدودة، والمجهول يحيط بهم من كل جانب.

لكن سارة كانت تعرف أن الأمل هو كل ما تبقى لهم. وأن مستقبل البشرية يعتمد على نجاح هذه المهمة.

وبينما كانت النجوم تتلألأ في الظلام، بدأت رحلتهم الحقيقية...`,
        order: 1,
        status: 'Published',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
    views: 15000,
    likes: 2300,
    commentsCount: 456
  };

  const handleAddComment = (lineNumber: number, content: string) => {
    const newComment: Comment = {
      id: Math.random().toString(),
      userId: 'current-user',
      user: {
        name: 'أنت',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
      },
      content,
      createdAt: new Date(),
      lineNumber
    };
    setComments(prev => [...prev, newComment]);
  };

  return (
    <div className={`min-h-screen ${preferences.theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
      {/* Navigation Bar */}
      <div className={`sticky top-0 z-10 ${preferences.theme === 'dark' ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-sm border-b border-gray-200`}>
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="p-2 rounded-full hover:bg-gray-100">
                <ChevronLeft className="h-5 w-5" />
              </Link>
              
              <div className="flex items-center">
                <img
                  src={story.author.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'}
                  alt={story.author.displayName}
                  className="w-8 h-8 rounded-full ml-3"
                />
                <span className="text-sm font-medium text-gray-900">{story.author.displayName}</span>
                <span className="mx-2 text-gray-300">·</span>
                <button className="text-sm text-green-600 font-medium hover:text-green-700">Follow</button>
                <span className="mx-2 text-gray-300">·</span>
                <span className="text-sm text-gray-500">6 min read</span>
                <span className="mx-2 text-gray-300">·</span>
                <span className="text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                  <Heart className="h-5 w-5" />
                  <span className="text-sm">{story.likes.toLocaleString()}</span>
                </button>

                <button 
                  onClick={() => setShowAllComments(true)}
                  className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 mr-2"
                >
                  <MessageSquare className="h-5 w-5" />
                  <span className="text-sm">{story.commentsCount.toLocaleString()}</span>
                </button>

                <div className="flex items-center space-x-1 text-gray-500">
                  <Eye className="h-5 w-5" />
                  <span className="text-sm">{story.views.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 border-r border-gray-200 pr-4">
                <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                  <Share2 className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                  <Settings className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Flyout for All Comments */}
      {showAllComments && (
        <div className="fixed left-0 top-[104px] h-[calc(100vh-104px)] w-96 bg-white shadow-xl border-r border-gray-200 z-50 overflow-hidden">
          <div className="h-full flex flex-col">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">جميع التعليقات</h3>
                <button
                  onClick={() => setShowAllComments(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {comments.map(comment => (
                  <div key={comment.id} className="flex space-x-3">
                    <img
                      src={comment.user.avatar}
                      alt={comment.user.name}
                      className="h-8 w-8 rounded-full"
                    />
                    <div className="flex-1 mr-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900">
                          {comment.user.name}
                        </h4>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString('ar-SA')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{comment.content}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        السطر {comment.lineNumber + 1}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t bg-white">
              <form onSubmit={(e) => e.preventDefault()} className="relative">
                <input
                  type="text"
                  placeholder="اكتب تعليقاً عاماً..."
                  className="w-full border-gray-300 rounded-full pr-4 pl-10 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Story Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div
          className="prose max-w-none"
          style={{
            fontSize: `${preferences.fontSize}px`,
            fontFamily: preferences.fontFamily
          }}
        >
          <h2 className="text-2xl font-bold mb-4">{story.parts[0].title}</h2>
          {story.parts[0].content.split('\n\n').map((paragraph, index) => (
            <div key={index} className="group relative mb-4 flex">
              <p className="flex-1">{paragraph}</p>
              <span className="mr-2 pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <LineComments
                  comments={comments.filter(c => c.lineNumber === index)}
                  lineNumber={index}
                  onAddComment={handleAddComment}
                />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}