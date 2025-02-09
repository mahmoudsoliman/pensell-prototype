import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Heart, MessageSquare, MoreVertical, Edit2, Trash2, Filter } from 'lucide-react';
import { Story } from '../../types';

export function MyStoriesScreen() {
  const [filterStatus, setFilterStatus] = useState<'all' | 'ongoing' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'views' | 'likes'>('recent');

  // Mock data - replace with real data fetching
  const stories: Story[] = [
    {
      id: '1',
      title: 'السفينة الفضائية الأخيرة',
      description: 'مغامرة مثيرة في الفضاء ستبقيك على حافة مقعدك.',
      category: 'خيال علمي',
      tags: ['فضاء', 'مغامرة', 'خيال علمي'],
      language: 'العربية',
      maturityRating: 'General',
      status: 'Ongoing',
      coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
      authorId: '1',
      author: {
        id: '1',
        username: 'starwriter',
        displayName: 'سارة جونسون',
        following: 1200,
        followers: 5000,
        joinedDate: new Date('2023-01-01')
      },
      parts: [],
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-02-20'),
      views: 15000,
      likes: 2300,
      commentsCount: 456
    },
    {
      id: '2',
      title: 'همسات في الظلام',
      description: 'قصة رعب نفسي تستكشف أعماق الخوف البشري.',
      category: 'رعب',
      tags: ['رعب', 'نفسي', 'غموض'],
      language: 'العربية',
      maturityRating: 'Mature',
      status: 'Complete',
      coverImage: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3',
      authorId: '1',
      author: {
        id: '1',
        username: 'starwriter',
        displayName: 'سارة جونسون',
        following: 1200,
        followers: 5000,
        joinedDate: new Date('2023-01-01')
      },
      parts: [],
      createdAt: new Date('2023-12-01'),
      updatedAt: new Date('2024-01-30'),
      views: 12000,
      likes: 1800,
      commentsCount: 320
    }
  ];

  const filteredStories = stories.filter(story => {
    if (filterStatus === 'all') return true;
    return filterStatus === 'ongoing' 
      ? story.status === 'Ongoing'
      : story.status === 'Complete';
  });

  const sortedStories = [...filteredStories].sort((a, b) => {
    switch (sortBy) {
      case 'views':
        return b.views - a.views;
      case 'likes':
        return b.likes - a.likes;
      default:
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }
  });

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">قصصي</h1>
        
        {/* Filters and Sort */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="all">جميع القصص</option>
              <option value="ongoing">مستمرة</option>
              <option value="completed">مكتملة</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="recent">الأحدث</option>
              <option value="views">الأكثر مشاهدة</option>
              <option value="likes">الأكثر إعجاباً</option>
            </select>
          </div>

          <Link
            to="/write"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            كتابة قصة جديدة
          </Link>
        </div>
      </div>

      {/* Stories List */}
      <div className="space-y-4">
        {sortedStories.map(story => (
          <div key={story.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="flex items-start p-4">
              {/* Cover Image */}
              <img
                src={story.coverImage}
                alt={story.title}
                className="w-32 h-44 object-cover rounded-lg"
              />

              {/* Story Info */}
              <div className="flex-1 min-w-0 mr-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-1">
                      {story.title}
                    </h2>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                      {story.description}
                    </p>
                  </div>
                  <div className="relative">
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <MoreVertical className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <Eye className="h-4 w-4 ml-1" />
                    {story.views.toLocaleString('ar-SA')} مشاهدة
                  </span>
                  <span className="flex items-center">
                    <Heart className="h-4 w-4 ml-1" />
                    {story.likes.toLocaleString('ar-SA')} إعجاب
                  </span>
                  <span className="flex items-center">
                    <MessageSquare className="h-4 w-4 ml-1" />
                    {story.commentsCount.toLocaleString('ar-SA')} تعليق
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {story.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      story.status === 'Ongoing'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {story.status === 'Ongoing' ? 'مستمرة' : 'مكتملة'}
                    </span>
                    <span className="text-sm text-gray-500">
                      آخر تحديث: {new Date(story.updatedAt).toLocaleDateString('ar-SA')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/story/${story.id}/edit`}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <Edit2 className="h-4 w-4 ml-1" />
                      تعديل
                    </Link>
                    <button className="inline-flex items-center px-3 py-1.5 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-white hover:bg-red-50">
                      <Trash2 className="h-4 w-4 ml-1" />
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}