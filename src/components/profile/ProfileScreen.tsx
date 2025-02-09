import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit2, MapPin, Calendar, Settings } from 'lucide-react';
import { User, Story } from '../../types';

interface ProfileStats {
  stories: number;
  followers: number;
  following: number;
  totalViews: number;
}

export function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<'stories' | 'about' | 'following'>('stories');

  // Mock data - replace with real data fetching
  const user: User = {
    id: '1',
    username: 'starwriter',
    displayName: 'سارة جونسون',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    backgroundImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
    about: 'كاتبة شغوفة تستكشف حدود الخيال العلمي والفانتازيا. أحب خلق عوالم جديدة وشخصيات لا تُنسى.',
    location: 'الرياض، المملكة العربية السعودية',
    following: 1200,
    followers: 5000,
    joinedDate: new Date('2023-01-01')
  };

  const stats: ProfileStats = {
    stories: 24,
    followers: user.followers,
    following: user.following,
    totalViews: 150000
  };

  const stories: Story[] = [
    {
      id: '1',
      title: 'السفينة الفضائية الأخيرة',
      description: 'مغامرة مثيرة في الفضاء',
      category: 'خيال علمي',
      tags: ['فضاء', 'مغامرة'],
      language: 'العربية',
      maturityRating: 'General',
      status: 'Ongoing',
      authorId: user.id,
      author: user,
      parts: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 15000,
      likes: 2300,
      commentsCount: 456
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image */}
      <div className="h-64 relative">
        <img
          src={user.backgroundImage}
          alt="صورة الغلاف"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Profile Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-32">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="sm:flex sm:space-x-5">
                <div className="flex-shrink-0">
                  <img
                    src={user.avatar}
                    alt={user.displayName}
                    className="mx-auto h-32 w-32 rounded-full border-4 border-white shadow-lg"
                  />
                </div>
                <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-right mr-5">
                  <p className="text-sm font-medium text-gray-600">@{user.username}</p>
                  <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                    {user.displayName}
                  </h1>
                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
                    {user.location && (
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 ml-1" />
                        {user.location}
                      </span>
                    )}
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 ml-1" />
                      انضم في {user.joinedDate.toLocaleDateString('ar-SA', { month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex justify-center sm:mt-0">
                <Link
                  to="/edit-profile"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Edit2 className="h-4 w-4 ml-2" />
                  تعديل الملف
                </Link>
                <button className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <Settings className="h-4 w-4 ml-2" />
                  الإعدادات
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-4 text-center">
              <div className="px-4 py-5 bg-gray-50 shadow-sm rounded-lg overflow-hidden sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">القصص</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {stats.stories.toLocaleString('ar-SA')}
                </dd>
              </div>
              <div className="px-4 py-5 bg-gray-50 shadow-sm rounded-lg overflow-hidden sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">المتابِعون</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {stats.followers.toLocaleString('ar-SA')}
                </dd>
              </div>
              <div className="px-4 py-5 bg-gray-50 shadow-sm rounded-lg overflow-hidden sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">المتابَعون</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {stats.following.toLocaleString('ar-SA')}
                </dd>
              </div>
              <div className="px-4 py-5 bg-gray-50 shadow-sm rounded-lg overflow-hidden sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">إجمالي المشاهدات</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {stats.totalViews.toLocaleString('ar-SA')}
                </dd>
              </div>
            </div>

            <div className="mt-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab('stories')}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'stories'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    القصص
                  </button>
                  <button
                    onClick={() => setActiveTab('about')}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm mr-8 ${
                      activeTab === 'about'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    نبذة
                  </button>
                  <button
                    onClick={() => setActiveTab('following')}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm mr-8 ${
                      activeTab === 'following'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    المتابَعون
                  </button>
                </nav>
              </div>

              <div className="mt-6">
                {activeTab === 'stories' && (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {stories.map(story => (
                      <div key={story.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <img
                          src={story.coverImage || 'https://images.unsplash.com/photo-1532012197267-da84d127e765'}
                          alt={story.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-medium text-gray-900">{story.title}</h3>
                          <p className="mt-1 text-sm text-gray-500">{story.description}</p>
                          <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                            <span>{story.status === 'Ongoing' ? 'مستمرة' : 'مكتملة'}</span>
                            <span>{story.views.toLocaleString('ar-SA')} مشاهدة</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'about' && (
                  <div className="prose max-w-none">
                    <p className="text-gray-500">{user.about}</p>
                  </div>
                )}

                {activeTab === 'following' && (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Add following list here */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}