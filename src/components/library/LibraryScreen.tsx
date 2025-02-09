import { useState } from 'react';
import { Search, Filter, Download, Trash2, RefreshCw } from 'lucide-react';
import { Story } from '../../types';

interface LibraryFilters {
  status: 'all' | 'ongoing' | 'completed';
  category: string;
  sortBy: 'recent' | 'title' | 'author';
}

export function LibraryScreen() {
  const [filters, setFilters] = useState<LibraryFilters>({
    status: 'all',
    category: '',
    sortBy: 'recent'
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - replace with real data fetching
  const savedStories: Story[] = [
    {
      id: '1',
      title: 'The Last Starship',
      description: 'A thrilling space adventure',
      author: {
        id: '1',
        displayName: 'Sarah Johnson',
        username: 'starwriter',
        following: 1200,
        followers: 5000,
        joinedDate: new Date('2023-01-01')
      },
      category: 'Sci-Fi',
      tags: ['space', 'adventure'],
      language: 'English',
      maturityRating: 'General',
      status: 'Ongoing',
      authorId: '1',
      parts: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 15000,
      likes: 2300,
      commentsCount: 456
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Your Library</h1>
        <button className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700 font-medium">
          <RefreshCw className="h-4 w-4 mr-2" />
          Sync Library
        </button>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your library..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>

        <div className="flex gap-4">
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value as LibraryFilters['status'] })}
            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          >
            <option value="all">All Status</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as LibraryFilters['sortBy'] })}
            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          >
            <option value="recent">Recently Added</option>
            <option value="title">Title</option>
            <option value="author">Author</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedStories.map(story => (
          <div key={story.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative aspect-[3/2]">
              <img
                src={story.coverImage || 'https://images.unsplash.com/photo-1532012197267-da84d127e765'}
                alt={story.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 flex space-x-2">
                <button className="p-2 bg-white/90 rounded-full hover:bg-white">
                  <Download className="h-4 w-4 text-gray-700" />
                </button>
                <button className="p-2 bg-white/90 rounded-full hover:bg-white">
                  <Trash2 className="h-4 w-4 text-red-600" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-900">{story.title}</h3>
              <p className="text-sm text-gray-600">by {story.author.displayName}</p>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-gray-500">{story.status}</span>
                <span className="text-gray-500">{story.parts.length} parts</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}