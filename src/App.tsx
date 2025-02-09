import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { StoryForm } from './components/StoryForm';
import { Footer } from './components/Footer';
import { LibraryScreen } from './components/library/LibraryScreen';
import { ProfileScreen } from './components/profile/ProfileScreen';
import { EditProfileScreen } from './components/profile/EditProfileScreen';
import { MyStoriesScreen } from './components/profile/MyStoriesScreen';
import { ReadingList } from './components/home/ReadingList';
import { RecommendedStories } from './components/home/RecommendedStories';
import { SearchBar } from './components/home/SearchBar';
import { StoryDetailScreen } from './components/story/StoryDetailScreen';
import { StoryEditScreen } from './components/story/StoryEditScreen';
import { ChapterEditScreen } from './components/story/ChapterEditScreen';
import { StoryReader } from './components/reader/StoryReader';

function HomeScreen() {
  return (
    <div className="container mx-auto py-8 px-4">
      <SearchBar />
      <div className="mt-8 space-y-12">
        <ReadingList />
        <RecommendedStories />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/write" element={<StoryForm />} />
            <Route path="/library" element={<LibraryScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/edit-profile" element={<EditProfileScreen />} />
            <Route path="/my-stories" element={<MyStoriesScreen />} />
            <Route path="/story/:id" element={<StoryDetailScreen />} />
            <Route path="/story/:id/read" element={<StoryReader />} /> {/* Added new route for reader */}
            <Route path="/story/:id/edit" element={<StoryEditScreen />} />
            <Route path="/story/:id/chapter/:chapterId" element={<ChapterEditScreen />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;