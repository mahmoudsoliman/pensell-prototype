import { Clock } from 'lucide-react';
import { Story } from '../../types';

interface ReadingListItemProps {
  story: Story;
  progress: number;
}

function ReadingListItem({ story, progress }: ReadingListItemProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex items-center space-x-4">
      <img
        src={story.coverImage || 'https://images.unsplash.com/photo-1532012197267-da84d127e765'}
        alt={story.title}
        className="w-16 h-16 object-cover rounded"
      />
      <div className="flex-1 min-w-0 mr-4">
        <h4 className="font-medium text-gray-900 truncate">{story.title}</h4>
        <p className="text-sm text-gray-500">بواسطة {story.author.displayName}</p>
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-indigo-600 h-1.5 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
            <span>{progress}% مكتمل</span>
            <span className="flex items-center">
              <Clock className="h-3 w-3 ml-1" />
              {Math.ceil((100 - progress) / 10)} دقائق متبقية
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ReadingList() {
  // Mock data - replace with real data fetching
  const readingList = [
    {
      story: {
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
        coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
        category: 'خيال علمي',
        tags: ['فضاء', 'مغامرة'],
        language: 'العربية',
        maturityRating: 'General',
        status: 'Ongoing',
        authorId: '1',
        parts: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        views: 15000,
        likes: 2300,
        commentsCount: 456
      },
      progress: 75
    }
  ];

  return (
    <div className="space-y-4 mb-12">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">متابعة القراءة</h2>
        <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
          عرض الكل
        </button>
      </div>
      <div className="space-y-3">
        {readingList.map(({ story, progress }) => (
          <ReadingListItem key={story.id} story={story} progress={progress} />
        ))}
      </div>
    </div>
  );
}