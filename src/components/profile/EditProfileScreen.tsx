import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Upload, X } from 'lucide-react';

export function EditProfileScreen() {
  const [profile, setProfile] = useState({
    displayName: 'سارة جونسون',
    bio: 'كاتبة شغوفة تستكشف حدود الخيال العلمي والفانتازيا.',
    bannerImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
    profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
  });

  const [errors, setErrors] = useState<{
    displayName?: string;
    bio?: string;
    bannerImage?: string;
    profilePicture?: string;
  }>({});

  const handleBannerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          bannerImage: 'يجب أن يكون حجم الملف أقل من 5 ميجابايت'
        }));
        return;
      }

      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          bannerImage: 'صيغة الملف غير مدعومة. يرجى رفع ملف JPEG أو PNG'
        }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({
          ...prev,
          bannerImage: reader.result as string
        }));
        setErrors(prev => ({ ...prev, bannerImage: undefined }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfilePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          profilePicture: 'يجب أن يكون حجم الملف أقل من 2 ميجابايت'
        }));
        return;
      }

      if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          profilePicture: 'صيغة الملف غير مدعومة. يرجى رفع ملف JPEG أو PNG أو GIF'
        }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({
          ...prev,
          profilePicture: reader.result as string
        }));
        setErrors(prev => ({ ...prev, profilePicture: undefined }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeBannerImage = () => {
    setProfile(prev => ({
      ...prev,
      bannerImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba'
    }));
  };

  const removeProfilePicture = () => {
    setProfile(prev => ({
      ...prev,
      profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    // Validate form
    const newErrors: typeof errors = {};
    
    if (!profile.displayName.trim()) {
      newErrors.displayName = 'الاسم المعروض مطلوب';
    }
    
    if (profile.bio.length > 300) {
      newErrors.bio = 'لا يمكن أن تتجاوز النبذة الشخصية 300 حرف';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      // Show success message
      const successToast = document.getElementById('successToast');
      if (successToast) {
        successToast.classList.remove('translate-y-full');
        setTimeout(() => {
          successToast.classList.add('translate-y-full');
          // Redirect to profile page after success
          window.location.href = '/profile';
        }, 2000);
      }
    }
  };

  return (
    <main className="max-w-3xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="border-b border-gray-200 pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">تعديل الملف الشخصي</h1>
          <p className="mt-1 text-sm text-gray-500">قم بتحديث معلومات ملفك الشخصي</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Banner Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">صورة الغلاف</label>
            <div className="relative">
              <div className="aspect-[3/1] rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={profile.bannerImage}
                  alt="صورة الغلاف"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="text-center">
                    <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-white/90 rounded-full text-sm font-medium text-gray-700 hover:bg-white focus:outline-none">
                      <Upload className="h-4 w-4 ml-2" />
                      تغيير الصورة
                      <input
                        type="file"
                        accept="image/jpeg,image/png"
                        className="sr-only"
                        onChange={handleBannerUpload}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={removeBannerImage}
                      className="mr-2 inline-flex items-center px-4 py-2 bg-white/90 rounded-full text-sm font-medium text-red-600 hover:bg-white focus:outline-none"
                    >
                      <X className="h-4 w-4 ml-2" />
                      إزالة
                    </button>
                  </div>
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-500">يجب أن يكون حجم الملف أقل من 5 ميجابايت. يُفضل الأبعاد 1500×500 بكسل. يُسمح بصيغ JPEG و PNG.</p>
              {errors.bannerImage && (
                <p className="mt-1 text-xs text-red-600">{errors.bannerImage}</p>
              )}
            </div>
          </div>

          {/* Profile Picture */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">الصورة الشخصية</label>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <img
                  src={profile.profilePicture}
                  alt="صورة الملف الشخصي"
                  className="h-24 w-24 rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <label className="cursor-pointer bg-white px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span>تغيير الصورة</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/gif"
                      className="sr-only"
                      onChange={handleProfilePictureUpload}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={removeProfilePicture}
                    className="mr-2 text-sm text-red-600 hover:text-red-500"
                  >
                    إزالة
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">يجب أن يكون حجم الملف أقل من 2 ميجابايت. يُسمح بصيغ JPEG و PNG و GIF.</p>
                {errors.profilePicture && (
                  <p className="mt-1 text-xs text-red-600">{errors.profilePicture}</p>
                )}
              </div>
            </div>
          </div>

          {/* Display Name */}
          <div>
            <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
              الاسم المعروض <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="displayName"
              value={profile.displayName}
              onChange={e => setProfile(prev => ({ ...prev, displayName: e.target.value }))}
              maxLength={50}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <p className="mt-1 text-xs text-gray-500">
              <span>{profile.displayName.length}</span>/50 حرف
            </p>
            {errors.displayName && (
              <p className="mt-1 text-xs text-red-600">{errors.displayName}</p>
            )}
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">نبذة شخصية</label>
            <textarea
              id="bio"
              value={profile.bio}
              onChange={e => setProfile(prev => ({ ...prev, bio: e.target.value }))}
              rows={4}
              maxLength={300}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <p className="mt-1 text-xs text-gray-500">
              <span>{profile.bio.length}</span>/300 حرف
            </p>
            {errors.bio && (
              <p className="mt-1 text-xs text-red-600">{errors.bio}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <Link
              to="/profile"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            >
              إلغاء
            </Link>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              حفظ التغييرات
            </button>
          </div>
        </form>
      </div>

      {/* Success Toast */}
      <div
        id="successToast"
        className="fixed bottom-4 left-4 bg-green-50 text-green-800 rounded-lg p-4 shadow-lg transform transition-transform duration-300 translate-y-full"
        role="alert"
      >
        <div className="flex items-center">
          <svg className="h-5 w-5 text-green-400 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <p>تم تحديث الملف الشخصي بنجاح</p>
        </div>
      </div>
    </main>
  );
}