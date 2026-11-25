import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store';
import { translations } from '../../i18n/translations';
import {
  Search,
  FileVideo,
  Image,
  FileText,
  Eye,
  Trash2,
  Play,
  CheckCircle,
  XCircle,
  X,
  Save,
  Upload as UploadIcon
} from 'lucide-react';
import {
  subscribeContent,
  deleteContent,
  saveContent
} from '../../services/firestore';
import { useUserStore } from '../../features/auth/store';
import { extractYouTubeId, buildYouTubeThumbnail } from '../../services/youtube';

interface ContentItem {
  id: string;
  title?: string;
  titleAr?: string;
  mediaType?: string;
  category?: string;
  status?: string;
  description?: string;
  youtubeId?: string;
  url?: string;
  thumbnailUrl?: string;
  officialWatchUrl?: string;
  affiliateWatchUrl?: string;
  affiliateNetwork?: string;
  affiliateEnabled?: boolean;
  views?: number;
  createdAt?: any;
}

const CATEGORIES = ['movies', 'series', 'music', 'news', 'games', 'radio', 'podcasts'];

export default function Content() {
  const language = useAppStore(s => s.language);
  const t = translations[language];
  const navigate = useNavigate();

  const currentUser = useUserStore(s => s.user);
  const [content, setContent] = useState<ContentItem[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('draft');

  // نافذة التحرير
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formTitleAr, setFormTitleAr] = useState('');
  const [formCategory, setFormCategory] = useState('movies');
  const [formLanguage, setFormLanguage] = useState<'arabic' | 'foreign'>('foreign');
  const [formDescription, setFormDescription] = useState('');
  const [formYoutubeLink, setFormYoutubeLink] = useState('');
  const [formOfficialWatchUrl, setFormOfficialWatchUrl] = useState('');
  const [formAffiliateWatchUrl, setFormAffiliateWatchUrl] = useState('');
  const [formAffiliateNetwork, setFormAffiliateNetwork] = useState('');
  const [formAffiliateEnabled, setFormAffiliateEnabled] = useState(false);
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeContent((data) => {
      setContent(data as ContentItem[]);
    });
    return () => unsubscribe();
  }, []);

  const canDelete = () => {
    return (
      currentUser?.role === 'director' ||
      currentUser?.role === 'deputy'
    );
  };

  const canEdit = () => {
    return (
      currentUser?.role === 'director' ||
      currentUser?.role === 'deputy' ||
      currentUser?.role === 'admin'
    );
  };

  const filteredContent = content.filter(item => {
    const title = item.title || item.titleAr || '';
    const matchesSearch = title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || item.mediaType === filter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesFilter && matchesStatus;
  });

  const getTypeIcon = (type?: string) => {
    switch (type) {
      case 'video':
        return <FileVideo size={18} />;
      case 'image':
        return <Image size={18} />;
      case 'article':
        return <FileText size={18} />;
      default:
        return <Eye size={18} />;
    }
  };

  const statusBadge = (status?: string) => {
    const colors: Record<string, string> = {
      draft: 'bg-gray-700 text-gray-300',
      scheduled: 'bg-purple-900 text-purple-300',
      pending_review: 'bg-yellow-900 text-yellow-300',
      approved: 'bg-blue-900 text-blue-300',
      published: 'bg-green-900 text-green-300',
      rejected: 'bg-red-900 text-red-300',
    };
    return (
      <span className={`px-2 py-1 rounded text-xs ${colors[status || ''] || 'bg-gray-700 text-gray-300'}`}>
        {status || '—'}
      </span>
    );
  };

  const openEditor = (item: ContentItem) => {
    setEditingItem(item);
    setFormTitle(item.title || '');
    setFormTitleAr(item.titleAr || '');
    setFormCategory(item.category || 'movies');
    setFormDescription(item.description || '');
    setFormYoutubeLink(item.youtubeId ? `https://youtu.be/${item.youtubeId}` : '');
    setFormOfficialWatchUrl(item.officialWatchUrl || '');
    setFormAffiliateWatchUrl(item.affiliateWatchUrl || '');
    setFormAffiliateNetwork(item.affiliateNetwork || '');
    setFormAffiliateEnabled(item.affiliateEnabled === true);
    setFormError('');
  };

  const closeEditor = () => {
    setEditingItem(null);
    setFormError('');
  };

  const handleSave = async (publish: boolean) => {
    if (!editingItem) return;
    setFormError('');

    let youtubeId: string | null | undefined = editingItem.youtubeId || null;
    if (formYoutubeLink.trim()) {
      const extracted = extractYouTubeId(formYoutubeLink.trim());
      if (!extracted) {
        setFormError(language === 'ar' ? 'رابط يوتيوب غير صالح' : 'Invalid YouTube link');
        return;
      }
      youtubeId = extracted;
    }

    if (publish && !youtubeId && !editingItem.url) {
      setFormError(language === 'ar' ? 'يجب إضافة رابط يوتيوب أو رفع فيديو قبل النشر' : 'You must add a YouTube link or upload a video before publishing');
      return;
    }

    setSaving(true);
    try {
      const updateData: any = {
        title: formTitle,
        titleAr: formTitleAr,
        category: formCategory,
        description: formDescription,
        mediaType: 'video',
        officialWatchUrl: formOfficialWatchUrl.trim(),
        affiliateWatchUrl: formAffiliateWatchUrl.trim(),
        affiliateNetwork: formAffiliateNetwork.trim(),
        affiliateEnabled: formAffiliateEnabled && !!formAffiliateWatchUrl.trim(),
      };

      if (youtubeId) {
        updateData.youtubeId = youtubeId;
        if (!editingItem.thumbnailUrl) {
          updateData.thumbnailUrl = buildYouTubeThumbnail(youtubeId);
        }
      }

      if (publish) {
        updateData.approved = true;
        updateData.status = 'scheduled';
        updateData.scheduledAt = new Date().toISOString();
      }

      await saveContent(editingItem.id, updateData);
      closeEditor();
    } catch (err: any) {
      setFormError(err.message || 'Error saving');
    } finally {
      setSaving(false);
    }
  };

  const handleUnpublish = async () => {
    if (!editingItem) return;
    setSaving(true);
    try {
      await saveContent(editingItem.id, { status: 'draft' });
      closeEditor();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">
        {t.content || 'Content'}
      </h1>

      <div className="flex items-center gap-3 bg-gray-900 border border-gray-800 rounded-lg px-4 py-2">
        <Search size={18} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="bg-transparent text-white outline-none w-full"
        />
      </div>

      <div className="flex gap-3 flex-wrap">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-gray-900 text-white p-2 rounded border border-gray-800"
        >
          <option value="all">All Types</option>
          <option value="video">Video</option>
          <option value="audio">Audio</option>
          <option value="image">Image</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-gray-900 text-white p-2 rounded border border-gray-800"
        >
          <option value="all">All Status</option>
          <option value="draft">Draft</option>
          <option value="pending_review">Pending Review</option>
          <option value="approved">Approved</option>
          <option value="published">Published</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="shams-card overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400">
              <th className="pb-2">Title</th>
              <th className="pb-2">Type</th>
              <th className="pb-2">Status</th>
              <th className="pb-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredContent.map(item => (
              <tr key={item.id} className="border-b border-gray-800">
                <td className="py-3 text-white">
                  <button
                    onClick={() => canEdit() && openEditor(item)}
                    className="flex gap-2 items-center hover:text-shams-400 transition text-left"
                    disabled={!canEdit()}
                  >
                    {getTypeIcon(item.mediaType)}
                    <span>{item.title || item.titleAr}</span>
                    {!item.youtubeId && (
                      <span className="text-xs text-yellow-500 border border-yellow-700 rounded px-1">
                        {language === 'ar' ? 'بلا فيديو' : 'no video'}
                      </span>
                    )}
                  </button>
                </td>

                <td className="text-gray-400">{item.mediaType}</td>
                <td>{statusBadge(item.status)}</td>

                <td className="flex gap-3 py-3">
                  {canEdit() && (
                    <button onClick={() => openEditor(item)} className="text-shams-400" title="Edit">
                      <UploadIcon size={18} />
                    </button>
                  )}

                  <button
                    onClick={() => navigate(`/watch/${item.id}`)}
                    className="text-blue-400"
                    title="Preview"
                  >
                    <Play size={18} />
                  </button>

                  {canDelete() && (
                    <button
                      onClick={() => deleteContent(item.id)}
                      className="text-red-400"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* نافذة التحرير */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">
                {language === 'ar' ? 'تحرير المحتوى' : 'Edit Content'}
              </h2>
              <button onClick={closeEditor} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  {language === 'ar' ? 'العنوان (إنجليزي)' : 'Title (English)'}
                </label>
                <input
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  {language === 'ar' ? 'العنوان (عربي)' : 'Title (Arabic)'}
                </label>
                <input
                  value={formTitleAr}
                  onChange={(e) => setFormTitleAr(e.target.value)}
                  dir="rtl"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  {language === 'ar' ? 'الفئة' : 'Category'}
                </label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  {language === 'ar' ? 'لغة المحتوى' : 'Content Language'}
                </label>
                <select
                  value={formLanguage}
                  onChange={(e) => setFormLanguage(e.target.value as 'arabic' | 'foreign')}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                  <option value="arabic">🇸🇾 عربي</option>
                  <option value="foreign">🌍 أجنبي</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  {language === 'ar' ? 'لغة المحتوى' : 'Content Language'}
                </label>
                <select
                  value={formLanguage}
                  onChange={(e) => setFormLanguage(e.target.value as 'arabic' | 'foreign')}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                >
                  <option value="arabic">🇸🇾 عربي</option>
                  <option value="foreign">🌍 أجنبي</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  {language === 'ar' ? 'الوصف' : 'Description'}
                </label>
                <textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  rows={3}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  {language === 'ar' ? 'رابط يوتيوب' : 'YouTube Link'}
                </label>
                <input
                  value={formYoutubeLink}
                  onChange={(e) => setFormYoutubeLink(e.target.value)}
                  placeholder="https://youtu.be/..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                  dir="ltr"
                />
              </div>


          <div className="border-t border-gray-800 pt-4">
            <p className="text-sm font-semibold text-shams-400 mb-3">
              {language === 'ar' ? 'التسويق بالعمولة' : 'Affiliate'}
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  {language === 'ar' ? 'رابط المشاهدة الرسمي' : 'Official Watch URL'}
                </label>
                <input
                  value={formOfficialWatchUrl}
                  onChange={(e) => setFormOfficialWatchUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  {language === 'ar' ? 'رابط الأفلييت' : 'Affiliate URL'}
                </label>
                <input
                  value={formAffiliateWatchUrl}
                  onChange={(e) => setFormAffiliateWatchUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  {language === 'ar' ? 'شبكة الأفلييت' : 'Affiliate Network'}
                </label>
                <input
                  value={formAffiliateNetwork}
                  onChange={(e) => setFormAffiliateNetwork(e.target.value)}
                  placeholder="Admitad"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"
                  dir="ltr"
                />
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formAffiliateEnabled}
                  onChange={(e) => setFormAffiliateEnabled(e.target.checked)}
                  className="w-4 h-4 accent-shams-500"
                />
                <span className="text-sm text-gray-300">
                  {language === 'ar' ? 'تفعيل زر شاهد الآن' : 'Enable Watch Now button'}
                </span>
              </label>
            </div>
          </div>

              {formError && (
                <p className="text-red-400 text-sm">{formError}</p>
              )}

              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={() => handleSave(true)}
                  disabled={saving}
                  className="w-full py-2.5 bg-shams-500 hover:bg-shams-600 text-black font-semibold rounded-lg transition disabled:opacity-50"
                >
                  {saving ? '...' : (language === 'ar' ? 'حفظ ونشر' : 'Save & Publish')}
                </button>

                <button
                  onClick={() => handleSave(false)}
                  disabled={saving}
                  className="w-full py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Save size={16} />
                  {language === 'ar' ? 'حفظ كمسودة' : 'Save as Draft'}
                </button>

                {editingItem.status === 'published' && (
                  <button
                    onClick={handleUnpublish}
                    disabled={saving}
                    className="w-full py-2 text-yellow-400 text-sm hover:text-yellow-300"
                  >
                    {language === 'ar' ? 'إلغاء النشر' : 'Unpublish'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
