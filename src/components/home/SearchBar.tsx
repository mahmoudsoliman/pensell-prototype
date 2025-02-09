import { Search } from 'lucide-react';

export function SearchBar() {
  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="ابحث عن القصص، الكتّاب، أو الوسوم..."
          className="w-full pr-10 pl-4 py-2 rounded-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>
      <div className="absolute inset-x-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 divide-y divide-gray-100 hidden">
        <div className="p-2">
          <h4 className="text-xs font-medium text-gray-500 uppercase px-2 mb-1">عمليات البحث الأخيرة</h4>
          <button className="w-full text-right px-2 py-1.5 rounded hover:bg-gray-50">
            قصص خيالية عن التنانين
          </button>
          <button className="w-full text-right px-2 py-1.5 rounded hover:bg-gray-50">
            روايات خيال علمي فضائية
          </button>
        </div>
        <div className="p-2">
          <h4 className="text-xs font-medium text-gray-500 uppercase px-2 mb-1">الأكثر رواجاً</h4>
          <button className="w-full text-right px-2 py-1.5 rounded hover:bg-gray-50">
            #خيال_علمي
          </button>
          <button className="w-full text-right px-2 py-1.5 rounded hover:bg-gray-50">
            #فانتازيا_حضرية
          </button>
        </div>
      </div>
    </div>
  );
}