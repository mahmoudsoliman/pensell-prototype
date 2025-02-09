import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pen, Home, User, BookMarked, PenSquare, LogOut, BookOpen, Bell } from 'lucide-react';

export function Navigation() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Add logout logic here
    console.log('تسجيل الخروج...');
  };

  return (
    <nav className="bg-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Pen className="h-8 w-8 text-indigo-600 ml-2" />
              <span className="text-xl font-bold text-gray-900">بنسل</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            >
              <Home className="h-5 w-5 ml-1" />
              الرئيسية
            </Link>
            <Link
              to="/write"
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            >
              <PenSquare className="h-5 w-5 ml-1" />
              كتابة
            </Link>
            <Link
              to="/library"
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            >
              <BookMarked className="h-5 w-5 ml-1" />
              المكتبة
            </Link>
            
            {/* Notifications Dropdown */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-1 rounded-full hover:bg-gray-100 focus:outline-none"
              >
                <Bell className="h-6 w-6 text-gray-600" />
                {/* Notification badge */}
                <span className="absolute top-0 left-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
              </button>

              {isNotificationsOpen && (
                <div className="absolute left-0 mt-2 w-80 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-900">الإشعارات</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {/* Sample notifications */}
                    <div className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium text-gray-900">أحمد محمد</span> علق على قصتك
                      </p>
                      <p className="text-xs text-gray-500 mt-1">قبل ساعتين</p>
                    </div>
                    <div className="p-4 hover:bg-gray-50 cursor-pointer">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium text-gray-900">سارة أحمد</span> بدأت بمتابعتك
                      </p>
                      <p className="text-xs text-gray-500 mt-1">قبل 5 ساعات</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative inline-block text-right" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center focus:outline-none group"
              >
                <div className="relative">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-white">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                      alt="الملف الشخصي"
                      className="h-full w-full object-cover"
                    />
                    {/* Star badge */}
                    <div className="absolute -top-1 -left-1 bg-yellow-400 p-1 rounded-full shadow-sm">
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>

              {isDropdownOpen && (
                <div 
                  className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                >
                  <div className="py-1" role="none">
                    {/* User info section */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">سارة جونسون</p>
                      <p className="text-xs text-gray-500">sarah@example.com</p>
                    </div>

                    {/* Menu items */}
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                      role="menuitem"
                    >
                      <User className="h-4 w-4 ml-3" />
                      الملف الشخصي
                    </Link>
                    <Link
                      to="/my-stories"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                      role="menuitem"
                    >
                      <BookOpen className="h-4 w-4 ml-3" />
                      قصصي
                    </Link>

                    {/* Divider */}
                    <div className="h-px bg-gray-100 my-1" role="none"></div>

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                      role="menuitem"
                    >
                      <LogOut className="h-4 w-4 ml-3" />
                      تسجيل الخروج
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}