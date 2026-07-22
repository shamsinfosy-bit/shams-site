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
  XCircle
} from 'lucide-react';

import {
  subscribeContent,
  deleteContent,
  approveContent,
  rejectContent,
  publishContent
} from '../../services/firestore';

import { useUserStore } from '../../features/auth/store';

interface ContentItem {
  id: string;
  title?: string;
  titleAr?: string;
  mediaType?: string;
  category?: string;
  status?: string;
  views?: string;
  createdAt?: any;
}

export default function Content() {

  const language = useAppStore(s => s.language);
  const t = translations[language];
  const navigate = useNavigate();

  const currentUser = useUserStore(s => s.user);

  const [content, setContent] = useState<ContentItem[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');


  useEffect(() => {

    const unsubscribe = subscribeContent((data) => {
      setContent(data as ContentItem[]);
    });

    return () => unsubscribe();

  }, []);


  const canApprove = () => {
    return (
      currentUser?.role === 'director' ||
      currentUser?.role === 'deputy'
    );
  };


  const canPublish = () => {
    return (
      currentUser?.role === 'director' ||
      currentUser?.role === 'deputy'
    );
  };


  const filteredContent = content.filter(item => {

    const title =
      item.title ||
      item.titleAr ||
      '';

    const matchesSearch =
      title.toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === 'all' ||
      item.mediaType === filter;

    return matchesSearch && matchesFilter;

  });


  const getTypeIcon = (type?: string) => {

    switch(type){

      case 'video':
        return <FileVideo size={18} />;

      case 'image':
        return <Image size={18} />;

      case 'article':
        return <FileText size={18} />;

      default:
        return <Eye size={18}/>;
    }

  };


  return (

    <div className="space-y-6">

      <h1 className="text-2xl font-bold text-white">
        {t.content || 'Content'}
      </h1>


      <div className="flex items-center gap-3 bg-gray-900 border border-gray-800 rounded-lg px-4 py-2">

        <Search size={18}/>

        <input
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          placeholder="Search"
          className="bg-transparent text-white outline-none w-full"
        />

      </div>


      <select
        value={filter}
        onChange={(e)=>setFilter(e.target.value)}
        className="bg-gray-900 text-white p-2 rounded"
      >

        <option value="all">
          All
        </option>

        <option value="video">
          Video
        </option>

        <option value="audio">
          Audio
        </option>

        <option value="image">
          Image
        </option>

      </select>


      <div className="shams-card overflow-x-auto">

        <table className="w-full text-left">

          <thead>

            <tr className="text-gray-400">

              <th>Title</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>

            </tr>

          </thead>


          <tbody>

          {filteredContent.map(item => (

            <tr
              key={item.id}
              className="border-b border-gray-800"
            >

              <td className="py-3 text-white flex gap-2 items-center">

                {getTypeIcon(item.mediaType)}

                {item.title || item.titleAr}

              </td>


              <td className="text-gray-400">

                {item.mediaType}

              </td>


              <td className="text-gray-400">

                {item.status}

              </td>


              <td className="flex gap-3 py-3">


                {item.status === 'pending_review'
                && canApprove()
                && (

                  <button
                    onClick={()=>approveContent(item.id)}
                    className="text-green-400"
                  >
                    <CheckCircle size={18}/>
                  </button>

                )}


                {item.status === 'approved'
                && canPublish()
                && (

                  <button
                    onClick={()=>publishContent(item.id)}
                    className="text-blue-400"
                  >
                    <CheckCircle size={18}/>
                  </button>

                )}


                {canApprove()
                && (

                  <button
                    onClick={()=>rejectContent(item.id)}
                    className="text-yellow-400"
                  >
                    <XCircle size={18}/>
                  </button>

                )}


                <button
                  onClick={()=>navigate(`/watch/${item.id}`)}
                  className="text-blue-400"
                >
                  <Play size={18}/>
                </button>


                <button
                  onClick={()=>deleteContent(item.id)}
                  className="text-red-400"
                >
                  <Trash2 size={18}/>
                </button>


              </td>

            </tr>

          ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}
