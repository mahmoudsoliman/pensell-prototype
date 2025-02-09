import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">حول</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/about" className="text-gray-500 hover:text-indigo-600">من نحن</Link></li>
              <li><Link to="/blog" className="text-gray-500 hover:text-indigo-600">المدونة</Link></li>
              <li><Link to="/careers" className="text-gray-500 hover:text-indigo-600">الوظائف</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">الدعم</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/help" className="text-gray-500 hover:text-indigo-600">مركز المساعدة</Link></li>
              <li><Link to="/safety" className="text-gray-500 hover:text-indigo-600">مركز الأمان</Link></li>
              <li><Link to="/guidelines" className="text-gray-500 hover:text-indigo-600">إرشادات المجتمع</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">قانوني</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/terms" className="text-gray-500 hover:text-indigo-600">شروط الخدمة</Link></li>
              <li><Link to="/privacy" className="text-gray-500 hover:text-indigo-600">سياسة الخصوصية</Link></li>
              <li><Link to="/cookies" className="text-gray-500 hover:text-indigo-600">سياسة ملفات تعريف الارتباط</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-center text-gray-500">© {new Date().getFullYear()} بنسل. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}