import { useEffect, useState } from 'react';
import { useAppStore } from '../../store';
import { translations } from '../../i18n/translations';
import { Search, Edit, Trash2, CheckCircle } from 'lucide-react';
import { subscribeUsers, saveUser, deleteUser } from '../../services/firestore';
import { useUserStore } from '../../features/auth/store';

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: 'director' | 'deputy' | 'admin' | 'user';
  status?: 'active' | 'frozen';
}

export default function Users() {

  const language = useAppStore(s => s.language);
  const t = translations[language];

  const currentUser = useUserStore(s => s.user);

  const [users, setUsers] = useState<UserRecord[]>([]);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRole, setEditRole] = useState<UserRecord['role']>('user');
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const unsub = subscribeUsers((data) => {

      setUsers(data as UserRecord[]);
      setLoading(false);

    });

    return () => unsub();

  }, []);



  const canChangeRole = (target: UserRecord) => {

    if (!currentUser) return false;


    // حماية المدير الرئيسي
    if (target.role === 'director') return false;


    if (currentUser.role === 'director') {
      return true;
    }


    if (currentUser.role === 'deputy') {

      return (
        target.role === 'user' ||
        target.role === 'admin'
      );

    }


    return false;

  };



  const canFreeze = (target: UserRecord) => {

    if (!currentUser) return false;


    if (target.role === 'director') return false;


    return (
      currentUser.role === 'director' ||
      currentUser.role === 'deputy' ||
      (
        currentUser.role === 'admin' &&
        target.role === 'user'
      )
    );

  };



  const canDelete = (target: UserRecord) => {

    if (!currentUser) return false;


    // لا يحذف نفسه
    if (target.id === currentUser.id) return false;


    // حذف المستخدم العادي فقط
    if (target.role !== 'user') return false;


    return (
      currentUser.role === 'director' ||
      currentUser.role === 'deputy' ||
      currentUser.role === 'admin'
    );

  };



  const handleRoleChange = async (uid: string) => {

    await saveUser(uid, {
      role: editRole
    });

    setEditingId(null);

  };



  const handleFreeze = async (user: UserRecord) => {

    await saveUser(user.id, {

      status:
        user.status === 'frozen'
          ? 'active'
          : 'frozen'

    });

  };



  const handleDelete = async (user: UserRecord) => {

    if (!canDelete(user)) return;


    if (
      confirm(
        language === 'ar'
          ? 'هل تريد حذف هذا المستخدم؟'
          : 'Delete this user?'
      )
    ) {

      await deleteUser(user.id);

    }

  };



  const filteredUsers = users.filter(user =>

    user.name?.toLowerCase()
      .includes(search.toLowerCase())

    ||

    user.email?.toLowerCase()
      .includes(search.toLowerCase())

  );



  if (loading)

    return (
      <div className="p-8 text-center text-gray-400">
        Loading users...
      </div>
    );



  return (

    <div className="space-y-6">


      <h1 className="text-2xl font-bold text-white">

        {t.users || 'Users'}

      </h1>



      <div className="flex items-center gap-3 bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 max-w-md">

        <Search size={18}/>

        <input

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

          placeholder={t.search || 'Search'}

          className="bg-transparent outline-none text-white w-full"

        />

      </div>



      <div className="shams-card overflow-x-auto">


        <table className="w-full text-left">


          <thead>

            <tr className="text-gray-400">

              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>

            </tr>

          </thead>



          <tbody>


          {filteredUsers.map(user => (


            <tr
              key={user.id}
              className="border-b border-gray-800"
            >


              <td className="py-3 text-white">
                {user.name}
              </td>


              <td className="text-gray-400">
                {user.email}
              </td>


              <td>


              {editingId === user.id ? (

                <select

                  value={editRole}

                  onChange={(e)=>
                    setEditRole(
                      e.target.value as UserRecord['role']
                    )
                  }

                >

                  <option value="user">
                    User
                  </option>

                  <option value="admin">
                    Admin
                  </option>

                  <option value="deputy">
                    Deputy
                  </option>

                </select>


              ) : (

                user.role

              )}


              </td>



              <td>


              {canFreeze(user) && (

                <button
                  onClick={()=>handleFreeze(user)}
                >

                  {
                    user.status === 'frozen'
                    ? '❄ Frozen'
                    : '✅ Active'
                  }

                </button>

              )}


              </td>



              <td className="py-3 flex gap-3">


              {canChangeRole(user) && (

                editingId === user.id ? (

                  <button

                    onClick={()=>
                      handleRoleChange(user.id)
                    }

                    className="text-green-400"

                  >

                    <CheckCircle size={18}/>

                  </button>


                ) : (


                  <button

                    onClick={()=>{

                      setEditingId(user.id);
                      setEditRole(user.role);

                    }}

                    className="text-gray-400"

                  >

                    <Edit size={18}/>

                  </button>


                )

              )}



              {canDelete(user) && (

                <button

                  onClick={()=>handleDelete(user)}

                  className="text-red-400"

                >

                  <Trash2 size={18}/>

                </button>

              )}



              </td>


            </tr>


          ))}


          </tbody>


        </table>


      </div>


    </div>

  );

}
