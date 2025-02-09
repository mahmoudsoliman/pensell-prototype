import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Eye, Upload, X, Send } from 'lucide-react';
import { Story, CATEGORIES } from '../types';

const SUGGESTED_TAGS = [
  'مغامرة',
  'رومانسي',
  'غموض',
  'خيال',
  'خيال علمي',
  'رعب',
  'إثارة',
  'دراما',
  'حركة',
  'كوميديا'
];

export function StoryForm() {
  const navigate = useNavigate();
  const [story, setStory] = useState<Story>({
    title: '',
    description: '',
    category: '',
    tags: ['دراما', 'حركة'], // Pre-selected tags
    status: 'Ongoing'
  });
  
  const [tagInput, setTagInput] = useState('');
  const [tagSuggestions, setTagSuggestions] = useState<string[]>([]);
  const [errors, setErrors] = useState<Partial<Record<keyof Story, string>>>({});
  
  useEffect(() => {
    const savedDraft = localStorage.getItem('storyDraft');
    if (savedDraft) {
      const parsed = JSON.parse(savedDraft);
      setStory(parsed);
    }
  }, []);

  const validateForm = () => {
    const newErrors: Partial<Record<keyof Story, string>> = {};
    
    if (!story.title.trim()) {
      newErrors.title = 'العنوان مطلوب';
    }
    
    if (story.description.length < 50) {
      newErrors.description = 'يجب أن يكون الوصف 50 حرفًا على الأقل';
    }
    
    if (!story.category) {
      newErrors.category = 'يرجى اختيار فئة';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrors({ ...errors, coverImage: 'يجب أن يكون حجم الملف أقل من 10 ميجابايت' });
        return;
      }
      
      if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
        setErrors({ ...errors, coverImage: 'يُسمح فقط بملفات PNG و JPG و JPEG' });
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setStory({
          ...story,
          coverImage: file,
          coverImagePreview: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTagInput(value);
    
    if (value.trim()) {
      const suggestions = SUGGESTED_TAGS.filter(tag => 
        tag.includes(value) &&
        !story.tags.includes(tag)
      );
      setTagSuggestions(suggestions);
    } else {
      setTagSuggestions([]);
    }
  };

  const addTag = (tag: string) => {
    if (!story.tags.includes(tag)) {
      setStory({ ...story, tags: [...story.tags, tag] });
    }
    setTagInput('');
    setTagSuggestions([]);
  };

  const removeTag = (tagToRemove: string) => {
    setStory({
      ...story,
      tags: story.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const saveDraft = () => {
    localStorage.setItem('storyDraft', JSON.stringify(story));
    alert('تم حفظ المسودة بنجاح!');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Here you would typically make an API call to save the story
      // For now, we'll simulate a successful save
      
      // Show success message
      alert('تم نشر القصة بنجاح!');
      
      // Redirect to the story detail page
      // In a real app, you would get the ID from the API response
      const newStoryId = '1';
      navigate(`/story/${newStoryId}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg" dir="rtl">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">العنوان</label>
          <input
            type="text"
            value={story.title}
            onChange={e => setStory({ ...story, title: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="أدخل عنوان قصتك"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">الوصف</label>
          <textarea
            value={story.description}
            onChange={e => setStory({ ...story, description: e.target.value })}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="اكتب وصفًا مقنعًا (50 حرفًا كحد أدنى)"
          />
          <p className="mt-1 text-sm text-gray-500">
            {story.description.length}/50 الحد الأدنى للأحرف
          </p>
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">الفئة</label>
          <select
            value={story.category}
            onChange={e => setStory({ ...story, category: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">اختر فئة</option>
            {['رومانسي', 'خيال علمي', 'غموض', 'خيال', 'رعب', 'إثارة', 'مغامرة', 'خيال تاريخي'].map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">الوسوم</label>
          <div className="mt-1">
            <input
              type="text"
              value={tagInput}
              onChange={handleTagInput}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="اكتب لإضافة وسوم"
            />
            {tagSuggestions.length > 0 && (
              <div className="mt-2 p-2 bg-white border rounded-md shadow-sm">
                {tagSuggestions.map(suggestion => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => addTag(suggestion)}
                    className="m-1 px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            <div className="mt-2 flex flex-wrap gap-2">
              {story.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="mr-1 inline-flex items-center p-0.5 rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">الحالة</label>
          <select
            value={story.status}
            onChange={e => setStory({ ...story, status: e.target.value as Story['status'] })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="Ongoing">مستمر</option>
            <option value="Complete">مكتمل</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">صورة الغلاف</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            {story.coverImagePreview ? (
              <div className="space-y-1 text-center">
                <img
                  src={story.coverImagePreview}
                  alt="معاينة الغلاف"
                  className="mx-auto h-32 w-auto"
                />
                <button
                  type="button"
                  onClick={() => setStory({ ...story, coverImage: undefined, coverImagePreview: undefined })}
                  className="text-sm text-red-600 hover:text-red-500"
                >
                  إزالة
                </button>
              </div>
            ) : (
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                    <span>تحميل ملف</span>
                    <input
                      type="file"
                      className="sr-only"
                      accept=".jpg,.jpeg,.png"
                      onChange={handleImageUpload}
                    />
                  </label>
                  <p className="pr-1">أو اسحب وأفلت</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, JPEG حتى 10MB</p>
              </div>
            )}
          </div>
          {errors.coverImage && <p className="mt-1 text-sm text-red-600">{errors.coverImage}</p>}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => setStory({
              title: '',
              description: '',
              category: '',
              tags: ['دراما', 'حركة'], // Reset to initial tags
              status: 'Ongoing'
            })}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            إعادة تعيين
          </button>
          <button
            type="button"
            onClick={saveDraft}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Save className="h-4 w-4 ml-2" />
            حفظ المسودة
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Send className="h-4 w-4 ml-2" />
            نشر القصة
          </button>
        </div>
      </div>
    </form>
  );
}