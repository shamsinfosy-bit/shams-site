import { useState, useRef } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { storage, db, auth } from '../../services/firebase';
import { useAppStore } from '../../store';
import { Upload, X, CheckCircle, AlertTriangle, Film, Music, Radio, FileText } from 'lucide-react';

type MediaType = 'video' | 'audio' | 'image' | 'document';
type ContentCategory = 'movies' | 'series' | 'music' | 'news' | 'games' | 'radio' | 'podcasts';

interface UploadItem {
  id: string;
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'done' | 'error';
  url?: string;
  error?: string;
}

const CATEGORY_ICONS: Record<ContentCategory, React.ElementType> = {
  movies: Film, series: Film, music: Music,
  news: FileText, games: FileText, radio: Radio, podcasts: Radio,
};

const ACCEPTED_TYPES: Record<MediaType, string> = {
  video: 'video/*',
  audio: 'audio/*',
  image: 'image/*',
  document: '.pdf,.doc,.docx',
};

function getMediaType(file: File): MediaType {
  if (file.type.startsWith('video/')) return 'video';
  if (file.type.startsWith('audio/')) return 'audio';
  if (file.type.startsWith('image/')) return 'image';
  return 'document';
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function UploadPage() {
  const language = useAppStore((s) => s.language);
  const isRTL = language === 'ar';

  const [items, setItems] = useState<UploadItem[]>([]);
  const [title, setTitle] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [category, setCategory] = useState<ContentCategory>('movies');
  const [description, setDescription] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function addFiles(files: FileList | null) {
    if (!files) return;
    const newItems: UploadItem[] = Array.from(files).map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      file,
      progress: 0,
      status: 'pending',
    }));
    setItems((prev) => [...prev, ...newItems]);
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function updateItem(id: string, patch: Partial<UploadItem>) {
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, ...patch } : i));
  }

  async function uploadItem(item: UploadItem): Promise<void> {
    const user = auth.currentUser;
    if (!user) throw new Error('Authentication required');

    const mediaType = getMediaType(item.file);
    const path = `${category}/${user.uid}/${Date.now()}-${item.file.name}`;
    const storageRef = ref(storage, path);
    const task = uploadBytesResumable(storageRef, item.file);

    return new Promise((resolve, reject) => {
      task.on(
        'state_changed',
        (snap) => {
          const progress = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
          updateItem(item.id, { progress, status: 'uploading' });
        },
        (error) => {
          updateItem(item.id, { status: 'error', error: error.message });
          reject(error);
        },
        async () => {
          try {
            const url = await getDownloadURL(task.snapshot.ref);
            await addDoc(collection(db, 'content'), {
              title: title || item.file.name,
              titleAr: titleAr || '',
              category,
              description,
              mediaType,
              url,
              storagePath: path,
              size: item.file.size,
              uploadedBy: user.uid,
              uploadedByEmail: user.email,
              status: 'pending_review',
              createdAt: serverTimestamp(),
            });
            updateItem(item.id, { status: 'done', url, progress: 100 });
            resolve();
          } catch (error: any) {
            updateItem(item.id, { status: 'error', error: error.message });
            reject(error);
          }
        }
      );
    });
  }

  async function handleUploadAll() {
    const pending = items.filter((i) => i.status === 'pending');
    if (pending.length === 0) return;
    if (!title.trim()) {
      alert(isRTL ? 'يرجى إدخال عنوان المحتوى' : 'Please enter a content title');
      return;
    }
    await Promise.allSettled(pending.map(uploadItem));
  }

  const pendingCount = items.filter((i) => i.status === 'pending').length;
  const doneCount = items.filter((i) => i.status === 'done').length;
  const errorCount = items.filter((i) => i.status === 'error').length;

  return (
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex items-center gap-3">
        <Upload size={24} className="text-shams-400" />
        <h1 className="text-2xl font-bold text-white">
          {isRTL ? 'رفع المحتوى' : 'Upload Media'}
        </h1>
      </div>

      {/* معلومات المحتوى */}
      <div className="shams-card space-y-4">
        <h2 className="text-sm font-semibold text-shams-400 uppercase tracking-wider">
          {isRTL ? 'معلومات المحتوى' : 'Content Information'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1">
              {isRTL ? 'العنوان (إنجليزي) *' : 'Title (English) *'}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-shams-500 transition"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">
              {isRTL ? 'العنوان (عربي)' : 'Title (Arabic)'}
            </label>
            <input
              type="text"
              value={titleAr}
              onChange={(e) => setTitleAr(e.target.value)}
              placeholder="أدخل العنوان..."
              dir="rtl"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-shams-500 transition"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1">
              {isRTL ? 'الفئة' : 'Category'}
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ContentCategory)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-shams-500 transition"
            >
              <option value="movies">{isRTL ? 'أفلام' : 'Movies'}</option>
              <option value="series">{isRTL ? 'مسلسلات' : 'Series'}</option>
              <option value="music">{isRTL ? 'موسيقى' : 'Music'}</option>
              <option value="news">{isRTL ? 'أخبار' : 'News'}</option>
              <option value="games">{isRTL ? 'ألعاب' : 'Games'}</option>
              <option value="radio">{isRTL ? 'راديو' : 'Radio'}</option>
              <option value="podcasts">{isRTL ? 'بودكاست' : 'Podcasts'}</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">
              {isRTL ? 'الوصف' : 'Description'}
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={isRTL ? 'وصف مختصر...' : 'Brief description...'}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-shams-500 transition"
            />
          </div>
        </div>
      </div>

      {/* منطقة السحب والإفلات */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); addFiles(e.dataTransfer.files); }}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-shams-500 bg-shams-500/5'
            : 'border-gray-700 hover:border-shams-500/50 hover:bg-gray-800/50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="video/*,audio/*,image/*"
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
        <Upload size={40} className="mx-auto text-gray-500 mb-3" />
        <p className="text-white font-medium">
          {isRTL ? 'اسحب الملفات هنا أو انقر للاختيار' : 'Drag files here or click to select'}
        </p>
        <p className="text-gray-500 text-sm mt-1">
          {isRTL ? 'فيديو، صوت، صور' : 'Video, Audio, Images'}
        </p>
      </div>

      {/* قائمة الملفات */}
      {items.length > 0 && (
        <div className="shams-card space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-shams-400 uppercase tracking-wider">
              {isRTL ? `الملفات (${items.length})` : `Files (${items.length})`}
            </h2>
            <div className="flex items-center gap-3 text-xs">
              {doneCount > 0 && <span className="text-green-400 flex items-center gap-1"><CheckCircle size={12} />{doneCount}</span>}
              {errorCount > 0 && <span className="text-red-400 flex items-center gap-1"><AlertTriangle size={12} />{errorCount}</span>}
            </div>
          </div>

          {items.map((item) => {
            const CategoryIcon = CATEGORY_ICONS[category];
            return (
              <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                <CategoryIcon size={20} className="text-shams-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{item.file.name}</p>
                  <p className="text-xs text-gray-500">{formatBytes(item.file.size)}</p>
                  {item.status === 'uploading' && (
                    <div className="mt-1.5 h-1 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-shams-500 rounded-full transition-all duration-300"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  )}
                  {item.status === 'error' && (
                    <p className="text-xs text-red-400 mt-1">{item.error}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {item.status === 'pending' && <span className="text-xs text-gray-500">{isRTL ? 'في الانتظار' : 'Pending'}</span>}
                  {item.status === 'uploading' && <span className="text-xs text-shams-400">{item.progress}%</span>}
                  {item.status === 'done' && <CheckCircle size={16} className="text-green-400" />}
                  {item.status === 'error' && <AlertTriangle size={16} className="text-red-400" />}
                  {item.status !== 'uploading' && (
                    <button onClick={() => removeItem(item.id)} className="text-gray-600 hover:text-red-400 transition">
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {pendingCount > 0 && (
            <button
              onClick={handleUploadAll}
              className="w-full shams-btn-primary flex items-center justify-center gap-2 py-3"
            >
              <Upload size={18} />
              {isRTL
                ? `رفع ${pendingCount} ${pendingCount === 1 ? 'ملف' : 'ملفات'}`
                : `Upload ${pendingCount} ${pendingCount === 1 ? 'file' : 'files'}`}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
