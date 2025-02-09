import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Save, Bold, Italic, Link as LinkIcon, Type, Quote, MessageSquare, Plus } from 'lucide-react';
import { Story, StoryPart } from '../../types';

export function ChapterEditScreen() {
  const { id: storyId, chapterId } = useParams();
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showFormatting, setShowFormatting] = useState(false);
  const [selectionPosition, setSelectionPosition] = useState({ top: 0, left: 0 });
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [cursorPosition, setCursorPosition] = useState<{ top: number; left: number } | null>(null);
  const [showPlusIcon, setShowPlusIcon] = useState(false);
  const editorWrapperRef = useRef<HTMLDivElement>(null);
  
  const [chapter, setChapter] = useState<StoryPart>({
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
    status: 'Draft',
    createdAt: new Date(),
    updatedAt: new Date()
  });

  const [story, setStory] = useState<Story>({
    id: '1',
    title: 'السفينة الفضائية الأخيرة',
    description: 'مغامرة مثيرة في الفضاء',
    category: 'خيال علمي',
    tags: ['فضاء', 'مغامرة'],
    language: 'العربية',
    maturityRating: 'General',
    status: 'Ongoing',
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
  });

  const saveChapter = useCallback(async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setLastSaved(new Date());
    } catch (error) {
      console.error('Error saving chapter:', error);
    } finally {
      setIsSaving(false);
    }
  }, [chapter]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const debouncedSave = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        saveChapter();
      }, 1000);
    };
    debouncedSave();
    return () => clearTimeout(timeoutId);
  }, [chapter, saveChapter]);

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && !selection.isCollapsed && contentRef.current) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      // Calculate position to center the toolbar above the selection
      const toolbarWidth = toolbarRef.current?.offsetWidth || 300;
      const left = rect.left + (rect.width / 2) - (toolbarWidth / 2);
      
      setSelectionPosition({
        top: rect.top - 10, // Position slightly above selection
        left: Math.max(10, Math.min(left, window.innerWidth - toolbarWidth - 10)) // Keep within viewport
      });
      setShowFormatting(true);
    } else {
      setShowFormatting(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toolbarRef.current && !toolbarRef.current.contains(event.target as Node)) {
        setShowFormatting(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatText = (format: string) => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    let formattedText = '';

    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'link':
        const url = prompt('أدخل الرابط:', 'https://');
        if (url) {
          formattedText = `[${selectedText}](${url})`;
        } else {
          return;
        }
        break;
      case 'heading':
        formattedText = `# ${selectedText}`;
        break;
      case 'quote':
        formattedText = selectedText.split('\n').map(line => `> ${line}`).join('\n');
        break;
      case 'comment':
        // Add comment functionality here
        alert('إضافة تعليق على النص المحدد');
        return;
      default:
        return;
    }

    const newContent = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end);
    setChapter(prev => ({ ...prev, content: newContent }));
    setShowFormatting(false);
  };

  const handlePublish = async () => {
    if (window.confirm('هل أنت متأكد من نشر هذا الفصل؟')) {
      setIsSaving(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        setChapter(prev => ({ ...prev, status: 'Published' }));
        alert('تم نشر الفصل بنجاح!');
      } catch (error) {
        console.error('Error publishing chapter:', error);
        alert('حدث خطأ أثناء نشر الفصل');
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setChapter(prev => ({ ...prev, content: newContent }));

    // Check if we're at the start of a new blank line
    const cursorPos = e.target.selectionStart;
    const lines = newContent.split('\n');
    let currentLineStart = 0;
    let currentLine = '';

    for (let i = 0; i < lines.length; i++) {
      if (cursorPos >= currentLineStart && cursorPos <= currentLineStart + lines[i].length) {
        currentLine = lines[i];
        break;
      }
      currentLineStart += lines[i].length + 1; // +1 for the newline character
    }

    // Show plus icon only if we're at the start of a blank line
    if (currentLine.trim() === '' && cursorPos === currentLineStart) {
      // Calculate position for the plus icon
      const textArea = e.target;
      const { lineHeight } = window.getComputedStyle(textArea);
      const lineHeightValue = parseInt(lineHeight);
      
      // Get the text content before the cursor
      const textBeforeCursor = newContent.substring(0, cursorPos);
      const lines = textBeforeCursor.split('\n');
      const currentLineNumber = lines.length - 1;
      
      // Calculate position relative to the textarea
      const top = currentLineNumber * lineHeightValue;
      const rect = textArea.getBoundingClientRect();
      
      setCursorPosition({
        top: rect.top + top,
        left: rect.left + 4 // Slight offset from the left edge
      });
      setShowPlusIcon(true);
    } else {
      setShowPlusIcon(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Hide plus icon when any key is pressed
    setShowPlusIcon(false);
  };

  const handlePlusClick = () => {
    // Insert a markdown block template at the current cursor position
    const textarea = contentRef.current;
    if (!textarea) return;

    const cursorPos = textarea.selectionStart;
    const content = textarea.value;
    const blockTemplate = `\n## عنوان جديد\n\nاكتب محتوى جديد هنا...\n\n`;
    
    const newContent = content.substring(0, cursorPos) + blockTemplate + content.substring(cursorPos);
    setChapter(prev => ({ ...prev, content: newContent }));
    
    // Move cursor to the content area of the new block
    const newCursorPos = cursorPos + blockTemplate.indexOf('اكتب محتوى جديد هنا');
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos + 'اكتب محتوى جديد هنا'.length);
    }, 0);
    
    setShowPlusIcon(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white z-10">
        {/* Story Title Bar */}
        <div className="h-16 bg-gray-50 border-b">
          <div className="max-w-4xl w-full mx-auto px-4 h-full flex items-center">
            <h1 className="text-lg font-semibold text-gray-900">{story.title}</h1>
          </div>
        </div>

        {/* Navigation and Actions Bar */}
        <div className="h-16 border-b">
          <div className="max-w-4xl w-full mx-auto px-4 h-full flex items-center justify-between">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm">
              <Link 
                to={`/story/${storyId}/edit`}
                className="text-gray-600 hover:text-gray-900"
              >
                تفاصيل القصة
              </Link>
              <ChevronLeft className="h-4 w-4 text-gray-400" />
              <Link 
                to={`/story/${storyId}/edit`}
                className="text-gray-600 hover:text-gray-900"
              >
                الفصول
              </Link>
              <ChevronLeft className="h-4 w-4 text-gray-400" />
              <span className="text-gray-900 font-medium">
                {chapter.title}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              {/* Auto-save Status */}
              <div className="text-sm text-gray-500">
                {isSaving ? (
                  <span>جارٍ الحفظ...</span>
                ) : lastSaved ? (
                  <span>
                    آخر حفظ: {lastSaved.toLocaleTimeString('ar-SA')}
                  </span>
                ) : null}
              </div>

              {/* Publish Button */}
              {chapter.status === 'Draft' && (
                <button
                  onClick={handlePublish}
                  disabled={isSaving}
                  className="inline-flex items-center px-8 py-2.5 text-sm font-medium rounded-full text-white bg-red-600 hover:bg-red-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  نشر الفصل
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Editor */}
      <main className="max-w-2xl mx-auto px-4 pt-36">
        {/* Chapter Title */}
        <input
          type="text"
          value={chapter.title}
          onChange={(e) => setChapter(prev => ({ ...prev, title: e.target.value }))}
          className="w-full text-4xl font-bold mb-8 focus:outline-none"
          placeholder="عنوان الفصل"
        />

        {/* Editor Wrapper */}
        <div ref={editorWrapperRef} className="relative">
          {/* Chapter Content */}
          <textarea
            ref={contentRef}
            value={chapter.content}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            onSelect={handleTextSelection}
            className="w-full min-h-[calc(100vh-12rem)] text-lg leading-relaxed focus:outline-none resize-none"
            placeholder="ابدأ الكتابة..."
          />

          {/* Plus Icon */}
          {showPlusIcon && cursorPosition && (
            <button
              onClick={handlePlusClick}
              className="absolute transform -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-150 focus:outline-none"
              style={{
                top: cursorPosition.top,
                left: cursorPosition.left
              }}
            >
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
          )}
        </div>
      </main>

      {/* Floating Formatting Toolbar */}
      {showFormatting && (
        <div 
          ref={toolbarRef}
          className="fixed bg-white rounded-full shadow-xl border border-gray-200 py-2 px-3 flex items-center space-x-1 transition-all duration-200 z-50"
          style={{
            top: `${selectionPosition.top}px`,
            left: `${selectionPosition.left}px`,
            transform: 'translateY(-100%)'
          }}
        >
          <button 
            onClick={() => formatText('bold')}
            className="p-1.5 text-gray-700 hover:bg-gray-100 rounded-full"
            title="غامق"
          >
            <Bold className="h-4 w-4" />
          </button>
          <button 
            onClick={() => formatText('italic')}
            className="p-1.5 text-gray-700 hover:bg-gray-100 rounded-full"
            title="مائل"
          >
            <Italic className="h-4 w-4" />
          </button>
          <button 
            onClick={() => formatText('link')}
            className="p-1.5 text-gray-700 hover:bg-gray-100 rounded-full"
            title="رابط"
          >
            <LinkIcon className="h-4 w-4" />
          </button>
          <button 
            onClick={() => formatText('heading')}
            className="p-1.5 text-gray-700 hover:bg-gray-100 rounded-full"
            title="عنوان"
          >
            <Type className="h-4 w-4" />
          </button>
          <button 
            onClick={() => formatText('quote')}
            className="p-1.5 text-gray-700 hover:bg-gray-100 rounded-full"
            title="اقتباس"
          >
            <Quote className="h-4 w-4" />
          </button>
          <button 
            onClick={() => formatText('comment')}
            className="p-1.5 text-gray-700 hover:bg-gray-100 rounded-full"
            title="تعليق"
          >
            <MessageSquare className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}