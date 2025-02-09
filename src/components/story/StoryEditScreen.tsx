import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { 
  Heart, 
  MessageSquare, 
  Share2, 
  Bookmark,
  Plus,
  GripVertical,
  Edit2,
  Trash2,
  MoreVertical
} from 'lucide-react';
import { Story, StoryPart } from '../../types';

export function StoryEditScreen() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'summary' | 'chapters'>('summary');
  const [chapters, setChapters] = useState<StoryPart[]>([
    {
      id: '1',
      storyId: '1',
      title: 'الفصل الأول: البداية',
      content: 'تبدأ القصة...',
      order: 1,
      status: 'Published',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      storyId: '1',
      title: 'الفصل الثاني: المواجهة',
      content: 'في هذا الفصل...',
      order: 2,
      status: 'Published',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      storyId: '1',
      title: 'الفصل الثالث: مسودة',
      content: 'فصل جديد...',
      order: 3,
      status: 'Draft',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  // Mock data
  const story: Story = {
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
    parts: chapters,
    createdAt: new Date(),
    updatedAt: new Date(),
    views: 15000,
    likes: 2300,
    commentsCount: 456
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(chapters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update order numbers
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index + 1
    }));

    setChapters(updatedItems);
  };

  const handleEditChapter = (chapterId: string) => {
    window.location.href = `/story/${id}/chapter/${chapterId}`;
  };

  const handleDeleteChapter = (chapterId: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الفصل؟')) {
      setChapters(prev => prev.filter(chapter => chapter.id !== chapterId));
    }
  };

  const handlePublishChapter = (chapterId: string) => {
    setChapters(prev => prev.map(chapter => 
      chapter.id === chapterId 
        ? { ...chapter, status: 'Published' as const }
        : chapter
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-b from-indigo-900 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4">{story.title}</h1>
              <div className="flex items-center space-x-4">
                <img
                  src={story.author.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'}
                  alt={story.author.displayName}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="text-lg font-medium">{story.author.displayName}</p>
                  <p className="text-indigo-200">@{story.author.username}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-full hover:bg-white/20">
                <Heart className="h-5 w-5" />
                <span>{story.likes.toLocaleString()}</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-full hover:bg-white/20">
                <MessageSquare className="h-5 w-5" />
                <span>{story.commentsCount.toLocaleString()}</span>
              </button>
              <button className="p-2 bg-white/10 rounded-full hover:bg-white/20">
                <Share2 className="h-5 w-5" />
              </button>
              <button className="p-2 bg-white/10 rounded-full hover:bg-white/20">
                <Bookmark className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('summary')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'summary'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              ملخص القصة
            </button>
            <button
              onClick={() => setActiveTab('chapters')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'chapters'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              الفصول
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'summary' ? (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">نبذة عن القصة</h2>
            <p className="text-gray-600 mb-6">{story.description}</p>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-2">التفاصيل</h3>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">الفئة:</dt>
                    <dd className="text-gray-900">{story.category}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">الحالة:</dt>
                    <dd className="text-gray-900">{story.status === 'Ongoing' ? 'مستمرة' : 'مكتملة'}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">اللغة:</dt>
                    <dd className="text-gray-900">{story.language}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">التصنيف العمري:</dt>
                    <dd className="text-gray-900">{story.maturityRating === 'General' ? 'عام' : 'للبالغين'}</dd>
                  </div>
                </dl>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-2">الوسوم</h3>
                <div className="flex flex-wrap gap-2">
                  {story.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">الفصول</h2>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                  <Plus className="h-5 w-5 ml-2" />
                  فصل جديد
                </button>
              </div>
            </div>
            
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="chapters">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="divide-y"
                  >
                    {chapters.map((chapter, index) => (
                      <Draggable
                        key={chapter.id}
                        draggableId={chapter.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="p-4 hover:bg-gray-50"
                          >
                            <div className="flex items-center">
                              <div
                                {...provided.dragHandleProps}
                                className="px-2 cursor-move"
                              >
                                <GripVertical className="h-5 w-5 text-gray-400" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center">
                                  <h3 className="text-sm font-medium text-gray-900">
                                    {chapter.title}
                                  </h3>
                                  {chapter.status === 'Draft' && (
                                    <span className="mr-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                      مسودة
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-500">
                                  آخر تحديث: {chapter.updatedAt.toLocaleDateString()}
                                </p>
                              </div>
                              <div className="relative">
                                <button
                                  onClick={() => {
                                    const menu = document.getElementById(`chapter-menu-${chapter.id}`);
                                    if (menu) {
                                      menu.classList.toggle('hidden');
                                    }
                                  }}
                                  className="p-2 hover:bg-gray-100 rounded-full"
                                >
                                  <MoreVertical className="h-5 w-5 text-gray-400" />
                                </button>
                                <div
                                  id={`chapter-menu-${chapter.id}`}
                                  className="hidden absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                                >
                                  <div className="py-1">
                                    <button
                                      onClick={() => handleEditChapter(chapter.id)}
                                      className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                      تعديل
                                    </button>
                                    {chapter.status === 'Draft' && (
                                      <button
                                        onClick={() => handlePublishChapter(chapter.id)}
                                        className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                      >
                                        نشر
                                      </button>
                                    )}
                                    <button
                                      onClick={() => handleDeleteChapter(chapter.id)}
                                      className="w-full text-right px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                    >
                                      حذف
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        )}
      </div>
    </div>
  );
}