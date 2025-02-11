import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Heart, Eye, Filter } from 'lucide-react';
import { Story } from '../../types';

interface StoryCardProps {
  story: Story;
}

function StoryCard({ story }: StoryCardProps) {
  return (
    <Link 
      to={`/story/${story.id}/read`}
      className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform hover:scale-[1.02]"
    >
      <div className="relative aspect-[3/4]">
        <img
          src={`${story.coverImage}?w=300&q=75`}
          alt={story.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-2 right-2 left-2">
          <h3 className="text-white font-bold text-sm line-clamp-2">{story.title}</h3>
          <p className="text-white/80 text-xs mt-1">بواسطة {story.author.displayName}</p>
        </div>
      </div>
      <div className="p-2">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-2">
            <span className="flex items-center">
              <Eye className="h-3 w-3 ml-0.5" />
              {story.views.toLocaleString('ar-SA')}
            </span>
            <span className="flex items-center mr-2">
              <Heart className="h-3 w-3 ml-0.5" />
              {story.likes.toLocaleString('ar-SA')}
            </span>
          </div>
          <span className="flex items-center">
            <BookOpen className="h-3 w-3 ml-0.5" />
            {story.parts.length} أجزاء
          </span>
        </div>
      </div>
    </Link>
  );
}

export function RecommendedStories() {
  const [activeTab, setActiveTab] = useState<'recommended' | 'trending' | 'following'>('recommended');
  const [showGenres, setShowGenres] = useState(false);
  
  const genres = [
    'خيال علمي',
    'فانتازيا',
    'رومانسي',
    'مغامرات',
    'رعب',
    'غموض',
    'إثارة',
    'دراما',
    'تاريخي',
    'واقعي',
    'خيال تاريخي',
    'أكشن',
    'كوميديا',
    'جريمة',
    'عائلي',
    'مذكرات',
    'قصص قصيرة',
    'شعر',
    'أدب عالمي',
    'أدب عربي'
  ];

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
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 15000,
      likes: 2300,
      commentsCount: 456
    },
    {
      id: '2',
      title: 'همسات في الظلام',
      description: 'قصة رعب نفسي مثيرة',
      category: 'رعب',
      tags: ['رعب', 'نفسي'],
      language: 'العربية',
      maturityRating: 'Mature',
      status: 'Ongoing',
      coverImage: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3',
      authorId: '2',
      author: {
        id: '2',
        username: 'darkwriter',
        displayName: 'أحمد محمود',
        following: 800,
        followers: 3000,
        joinedDate: new Date('2023-02-15')
      },
      parts: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 12000,
      likes: 1800,
      commentsCount: 320
    },
    {
      id: '3',
      title: 'حب في باريس',
      description: 'قصة رومانسية في مدينة النور',
      category: 'رومانسي',
      tags: ['رومانسي', 'باريس'],
      language: 'العربية',
      maturityRating: 'General',
      status: 'Complete',
      coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
      authorId: '3',
      author: {
        id: '3',
        username: 'romanticwriter',
        displayName: 'ليلى كريم',
        following: 1500,
        followers: 6000,
        joinedDate: new Date('2023-03-20')
      },
      parts: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 20000,
      likes: 3500,
      commentsCount: 600
    },
    {
      id: '4',
      title: 'تاج التنين',
      description: 'ملحمة فانتازيا ملحمية',
      category: 'فانتازيا',
      tags: ['فانتازيا', 'تنين'],
      language: 'العربية',
      maturityRating: 'General',
      status: 'Ongoing',
      coverImage: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699',
      authorId: '4',
      author: {
        id: '4',
        username: 'dragonlord',
        displayName: 'ماجد السعيد',
        following: 2000,
        followers: 8000,
        joinedDate: new Date('2023-04-10')
      },
      parts: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 25000,
      likes: 4200,
      commentsCount: 780
    },
    {
      id: '5',
      title: 'ثورة الآلات',
      description: 'مستقبل ديستوبي مظلم',
      category: 'خيال علمي',
      tags: ['مستقبل', 'روبوتات'],
      language: 'العربية',
      maturityRating: 'Mature',
      status: 'Ongoing',
      coverImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4',
      authorId: '5',
      author: {
        id: '5',
        username: 'cyberpunk',
        displayName: 'نور الدين',
        following: 1800,
        followers: 7500,
        joinedDate: new Date('2023-05-15')
      },
      parts: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 18000,
      likes: 2900,
      commentsCount: 520
    },
    {
      id: '6',
      title: 'المحقق الصامت',
      description: 'قصة غموض مثيرة',
      category: 'غموض',
      tags: ['غموض', 'جريمة'],
      language: 'العربية',
      maturityRating: 'Mature',
      status: 'Ongoing',
      coverImage: 'https://images.unsplash.com/photo-1509475826633-fed577a2c71b',
      authorId: '6',
      author: {
        id: '6',
        username: 'detective',
        displayName: 'حسن المحقق',
        following: 1300,
        followers: 4500,
        joinedDate: new Date('2023-06-20')
      },
      parts: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 14000,
      likes: 2100,
      commentsCount: 380
    },
    {
      id: '7',
      title: 'حديقة الأحلام',
      description: 'قصة سحرية عن الأمل',
      category: 'فانتازيا',
      tags: ['سحر', 'أحلام'],
      language: 'العربية',
      maturityRating: 'General',
      status: 'Complete',
      coverImage: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6',
      authorId: '7',
      author: {
        id: '7',
        username: 'dreamweaver',
        displayName: 'منى الحلم',
        following: 1600,
        followers: 5800,
        joinedDate: new Date('2023-07-25')
      },
      parts: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 16000,
      likes: 2600,
      commentsCount: 440
    },
    {
      id: '8',
      title: 'تاجر الزمن',
      description: 'مغامرة عبر الزمن',
      category: 'خيال علمي',
      tags: ['زمن', 'مغامرة'],
      language: 'العربية',
      maturityRating: 'General',
      status: 'Ongoing',
      coverImage: 'https://images.unsplash.com/photo-1501139083538-0139583c060f',
      authorId: '8',
      author: {
        id: '8',
        username: 'timekeeper',
        displayName: 'زياد الوقت',
        following: 1900,
        followers: 7200,
        joinedDate: new Date('2023-08-30')
      },
      parts: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 19000,
      likes: 3100,
      commentsCount: 560
    },
    {
      id: '9',
      title: 'ضائع في طوكيو',
      description: 'قصة عن الاكتشاف الذاتي',
      category: 'معاصر',
      tags: ['سفر', 'يابان'],
      language: 'العربية',
      maturityRating: 'General',
      status: 'Ongoing',
      coverImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26',
      authorId: '9',
      author: {
        id: '9',
        username: 'wanderer',
        displayName: 'ريم السفر',
        following: 2200,
        followers: 8500,
        joinedDate: new Date('2023-09-05')
      },
      parts: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 21000,
      likes: 3800,
      commentsCount: 680
    },
    {
      id: '10',
      title: 'فن الحرب',
      description: 'رواية تاريخية ملحمية',
      category: 'تاريخي',
      tags: ['حرب', 'تاريخ'],
      language: 'العربية',
      maturityRating: 'Mature',
      status: 'Complete',
      coverImage: 'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec',
      authorId: '10',
      author: {
        id: '10',
        username: 'historian',
        displayName: 'عمر التاريخ',
        following: 2500,
        followers: 9000,
        joinedDate: new Date('2023-10-10')
      },
      parts: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 23000,
      likes: 4000,
      commentsCount: 720
    },
    {
      id: '11',
      title: 'سيمفونية منتصف الليل',
      description: 'قصة موسيقية رومانسية',
      category: 'رومانسي',
      tags: ['موسيقى', 'حب'],
      language: 'العربية',
      maturityRating: 'General',
      status: 'Ongoing',
      coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
      authorId: '11',
      author: {
        id: '11',
        username: 'musician',
        displayName: 'لينا النغم',
        following: 1700,
        followers: 6200,
        joinedDate: new Date('2023-11-15')
      },
      parts: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 17000,
      likes: 2800,
      commentsCount: 490
    },
    {
      id: '12',
      title: 'عاصفة الصحراء',
      description: 'مغامرة بقاء مثيرة',
      category: 'مغامرات',
      tags: ['صحراء', 'بقاء'],
      language: 'العربية',
      maturityRating: 'General',
      status: 'Ongoing',
      coverImage: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35',
      authorId: '12',
      author: {
        id: '12',
        username: 'survivor',
        displayName: 'خالد البقاء',
        following: 2100,
        followers: 7800,
        joinedDate: new Date('2023-12-20')
      },
      parts: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 20500,
      likes: 3300,
      commentsCount: 580
    },
    {
      id: '13',
      title: 'المفارقة الكمية',
      description: 'خيال علمي فلسفي',
      category: 'خيال علمي',
      tags: ['فيزياء', 'فلسفة'],
      language: 'العربية',
      maturityRating: 'General',
      status: 'Ongoing',
      coverImage: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564',
      authorId: '13',
      author: {
        id: '13',
        username: 'quantum',
        displayName: 'د. علي الفيزياء',
        following: 2400,
        followers: 8900,
        joinedDate: new Date('2024-01-05')
      },
      parts: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 22000,
      likes: 3700,
      commentsCount: 640
    },
    {
      id: '14',
      title: 'مقهى الذكريات',
      description: 'قصة دافئة عن الحب والذكريات',
      category: 'رومانسي',
      tags: ['حب', 'ذكريات'],
      language: 'العربية',
      maturityRating: 'General',
      status: 'Complete',
      coverImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb',
      authorId: '14',
      author: {
        id: '14',
        username: 'memories',
        displayName: 'سلمى الحب',
        following: 1400,
        followers: 5100,
        joinedDate: new Date('2024-01-10')
      },
      parts: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 16500,
      likes: 2700,
      commentsCount: 460
    },
    {
      id: '15',
      title: 'أساطير المدينة',
      description: 'قصص رعب حضرية',
      category: 'رعب',
      tags: ['رعب', 'أساطير'],
      language: 'العربية',
      maturityRating: 'Mature',
      status: 'Ongoing',
      coverImage: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0',
      authorId: '15',
      author: {
        id: '15',
        username: 'urbanmyths',
        displayName: 'عمار الرعب',
        following: 1900,
        followers: 7100,
        joinedDate: new Date('2024-01-15')
      },
      parts: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 19500,
      likes: 3200,
      commentsCount: 550
    },
    {
      id: '16',
      title: 'ابنة الخيميائي',
      description: 'فانتازيا ساحرة',
      category: 'فانتازيا',
      tags: ['سحر', 'خيمياء'],
      language: 'العربية',
      maturityRating: 'General',
      status: 'Ongoing',
      coverImage: 'https://images.unsplash.com/photo-1514894780887-121968d00567',
      authorId: '16',
      author: {
        id: '16',
        username: 'alchemist',
        displayName: 'فاطمة السحر',
        following: 2300,
        followers: 8400,
        joinedDate: new Date('2024-01-20')
      },
      parts: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 21500,
      likes: 3600,
      commentsCount: 620
    },
    {
      id: '17',
      title: 'القطار الأخير',
      description: 'إثارة وغموض',
      category: 'غموض',
      tags: ['غموض', 'إثارة'],
      language: 'العربية',
      maturityRating: 'Mature',
      status: 'Ongoing',
      coverImage: 'https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb',
      authorId: '17',
      author: {
        id: '17',
        username: 'mysterytrain',
        displayName: 'طارق الغموض',
        following: 2000,
        followers: 7400,
        joinedDate: new Date('2024-01-25')
      },
      parts: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 20000,
      likes: 3400,
      commentsCount: 590
    },
    {
      id: '18',
      title: 'قلب المحيط',
      description: 'رومانسية بحرية',
      category: 'رومانسي',
      tags: ['بحر', 'حب'],
      language: 'العربية',
      maturityRating: 'General',
      status: 'Complete',
      coverImage: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6',
      authorId: '18',
      author: {
        id: '18',
        username: 'seastories',
        displayName: 'مريم البحر',
        following: 1800,
        followers: 6700,
        joinedDate: new Date('2024-01-30')
      },
      parts: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 18500,
      likes: 3000,
      commentsCount: 510
    },
    {
      id: '19',
      title: 'أحلام رقمية',
      description: 'خيال علمي معاصر',
      category: 'خيال علمي',
      tags: ['تكنولوجيا', 'مستقبل'],
      language: 'العربية',
      maturityRating: 'General',
      status: 'Ongoing',
      coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
      authorId: '19',
      author: {
        id: '19',
        username: 'digitalwriter',
        displayName: 'رامي التقنية',
        following: 2200,
        followers: 8100,
        joinedDate: new Date('2024-02-05')
      },
      parts: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 21000,
      likes: 3500,
      commentsCount: 600
    },
    {
      id: '20',
      title: 'سر الجبل',
      description: 'مغامرة جبلية مثيرة',
      category: 'مغامرات',
      tags: ['جبال', 'مغامرة'],
      language: 'العربية',
      maturityRating: 'General',
      status: 'Ongoing',
      coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
      authorId: '20',
      author: {
        id: '20',
        username: 'mountaineer',
        displayName: 'سعيد المغامر',
        following: 2400,
        followers: 8800,
        joinedDate: new Date('2024-02-10')
      },
      parts: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 22500,
      likes: 3800,
      commentsCount: 650
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setActiveTab('recommended')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeTab === 'recommended'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            موصى به
          </button>
          <button
            onClick={() => setActiveTab('trending')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeTab === 'trending'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            رائج
          </button>
          <button
            onClick={() => setActiveTab('following')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeTab === 'following'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            المتابَعون
          </button>
          <div className="relative">
            <button
              onClick={() => setShowGenres(!showGenres)}
              className="px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-indigo-600 flex items-center"
            >
              <Filter className="h-4 w-4 ml-1" />
              تصفح
            </button>
            {showGenres && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">التصنيفات</h3>
                <div className="grid grid-cols-2 gap-2">
                  {genres.map(genre => (
                    <button
                      key={genre}
                      className="text-right text-sm text-gray-600 hover:text-indigo-600 py-1"
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {stories.map(story => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
}