import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
  Save,
  X,
  MoreVertical,
  Check
} from 'lucide-react';
import { Story, StoryPart } from '../../types';

export function StoryDetailScreen() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'summary' | 'chapters'>('summary');
  const [isEditing, setIsEditing] = useState(false);
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

  const [story, setStory] = useState<Story>({
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
  });

  const [showPublishModal, setShowPublishModal] = useState(false);
  const [selectedChapters, setSelectedChapters] = useState<string[]>([]);

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

  const handleSave = () => {
    // Here you would typically save the changes to your backend
    setIsEditing(false);
    alert('تم حفظ التغييرات بنجاح!');
  };

  const handleCancel = () => {
    // Reset any changes
    setIsEditing(false);
  };

  const handlePublish = () => {
    setShowPublishModal(true);
    // Initially select all draft chapters
    setSelectedChapters(chapters.filter(ch => ch.status === 'Draft').map(ch => ch.id));
  };

  const handlePublishChapters = () => {
    if (selectedChapters.length === 0) {
      alert('يرجى اختيار فصل واحد على الأقل للنشر');
      return;
    }

    // Update the status of selected chapters to Published
    setChapters(prev => prev.map(chapter => ({
      ...chapter,
      status: selectedChapters.includes(chapter.id) ? 'Published' : chapter.status
    })));

    setShowPublishModal(false);
    alert('تم نشر الفصول المحددة بنجاح!');
  };

  const toggleChapterSelection = (chapterId: string) => {
    setSelectedChapters(prev => 
      prev.includes(chapterId)
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex">
            {/* Cover Image */}
            <div className="flex-shrink-0">
              <img
                src={`${story.coverImage}?w=400&q=80`}
                alt={story.title}
                className="w-48 aspect-[2/3] object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Story Info */}
            <div className="flex-1 mr-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{story.title}</h1>
              <p className="text-lg text-gray-600 mb-6">{story.description}</p>
              
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  <img
                    src={story.author.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'}
                    alt={story.author.displayName}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="mr-3">
                    <p className="text-lg font-medium text-gray-900">{story.author.displayName}</p>
                    <p className="text-gray-500">@{story.author.username}</p>
                  </div>
                </div>

                <div className="flex items-center mr-8 space-x-6">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                    <Heart className="h-5 w-5" />
                    <span className="mr-2">{story.likes.toLocaleString()}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                    <MessageSquare className="h-5 w-5" />
                    <span className="mr-2">{story.commentsCount.toLocaleString()}</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100">
                  <Share2 className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100">
                  <Bookmark className="h-5 w-5" />
                </button>
                <button 
                  onClick={handlePublish}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-red-600 hover:bg-red-700"
                >
                  نشر القصة
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b bg-white sticky top-0 z-10">
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
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">نبذة عن القصة</h2>
              {isEditing ? (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleCancel}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <X className="h-4 w-4 ml-2" />
                    إلغاء
                  </button>
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Save className="h-4 w-4 ml-2" />
                    حفظ التغييرات
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Edit2 className="h-4 w-4 ml-2" />
                  تعديل
                </button>
              )}
            </div>
            
            {isEditing ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الوصف</label>
                  <textarea
                    value={story.description}
                    onChange={(e) => setStory({ ...story, description: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-2">التفاصيل</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-500">الفئة:</label>
                        <select
                          value={story.category}
                          onChange={(e) => setStory({ ...story, category: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                          {['رومانسي', 'خيال علمي', 'غموض', 'مغامرة', 'رعب'].map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-500">الحالة:</label>
                        <select
                          value={story.status}
                          onChange={(e) => setStory({ ...story, status: e.target.value as Story['status'] })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                          <option value="Ongoing">مستمرة</option>
                          <option value="Complete">مكتملة</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-500">اللغة:</label>
                        <select
                          value={story.language}
                          onChange={(e) => setStory({ ...story, language: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                          <option value="العربية">العربية</option>
                          <option value="English">English</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-500">التصنيف العمري:</label>
                        <select
                          value={story.maturityRating}
                          onChange={(e) => setStory({ ...story, maturityRating: e.target.value as Story['maturityRating'] })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                          <option value="General">عام</option>
                          <option value="Mature">للبالغين</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-2">الوسوم</h3>
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="اضغط Enter لإضافة وسم"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const input = e.target as HTMLInputElement;
                            const newTag = input.value.trim();
                            if (newTag && !story.tags.includes(newTag)) {
                              setStory({ ...story, tags: [...story.tags, newTag] });
                              input.value = '';
                            }
                          }
                        }}
                      />
                      <div className="flex flex-wrap gap-2">
                        {story.tags.map(tag => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                          >
                            {tag}
                            <button
                              onClick={() => setStory({
                                ...story,
                                tags: story.tags.filter(t => t !== tag)
                              })}
                              className="mr-1 text-indigo-600 hover:text-indigo-800"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
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
              </>
            )}
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
                                      onClick={() => {
                                        window.location.href = `/story/${id}/chapter/${chapter.id}`;
                                      }}
                                      className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                      تعديل
                                    </button>
                                    {chapter.status === 'Draft' && (
                                      <button
                                        onClick={() => {
                                          setChapters(prev => prev.map(ch => 
                                            ch.id === chapter.id 
                                              ? { ...ch, status: 'Published' as const }
                                              : ch
                                          ));
                                        }}
                                        className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                      >
                                        نشر
                                      </button>
                                    )}
                                    <button
                                      onClick={() => {
                                        if (window.confirm('هل أنت متأكد من حذف هذا الفصل؟')) {
                                          setChapters(prev => prev.filter(ch => ch.id !== chapter.id));
                                        }
                                      }}
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

      {/* Publish Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">نشر الفصول</h3>
                <button
                  onClick={() => setShowPublishModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="px-6 py-4 max-h-96 overflow-y-auto">
              <p className="text-sm text-gray-500 mb-4">
                حدد الفصول التي تريد نشرها
              </p>
              <div className="space-y-2">
                {chapters.map(chapter => (
                  <label
                    key={chapter.id}
                    className={`flex items-center p-3 rounded-lg border ${
                      chapter.status === 'Published'
                        ? 'bg-gray-50 cursor-not-allowed'
                        : 'hover:bg-gray-50 cursor-pointer'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedChapters.includes(chapter.id)}
                      onChange={() => toggleChapterSelection(chapter.id)}
                      disabled={chapter.status === 'Published'}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <div className="mr-3 flex-1">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900">
                          {chapter.title}
                        </span>
                        {chapter.status === 'Published' && (
                          <span className="mr-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <Check className="h-3 w-3 ml-1" />
                            منشور
                          </span>
                        )}
                        {chapter.status === 'Draft' && (
                          <span className="mr-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            مسودة
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        آخر تحديث: {chapter.updatedAt.toLocaleDateString()}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowPublishModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
              >
                إلغاء
              </button>
              <button
                onClick={handlePublishChapters}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md shadow-sm hover:bg-red-700"
              >
                نشر الفصول المحددة
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}