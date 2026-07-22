import { create } from 'zustand';
import { auth, db } from '../../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export type UserRole = 'director' | 'deputy' | 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status?: 'active' | 'frozen';
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  authLoading: boolean;

  setUser: (user: User | null) => void;
  logout: () => void;

  isDirector: () => boolean;
  isDeputy: () => boolean;
  isAdmin: () => boolean;

  canManageAdmins: () => boolean;
  canFreezeUser: () => boolean;
  canUnfreezeUser: () => boolean;
  canDeleteUsers: () => boolean;
  canDeleteContent: () => boolean;
  canPublishContent: () => boolean;

  canManageWallet: () => boolean;
  canManageSystemSettings: () => boolean;

  canAccess: (page: string) => boolean;
}


export const useUserStore = create<UserState>((set, get) => ({

  user: null,
  isAuthenticated: false,
  authLoading: true,


  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user
    }),


  logout: () =>
    set({
      user: null,
      isAuthenticated: false
    }),


  isDirector: () =>
    get().user?.role === 'director',


  isDeputy: () =>
    ['director','deputy']
    .includes(get().user?.role || ''),


  isAdmin: () =>
    ['director','deputy','admin']
    .includes(get().user?.role || ''),



  // إدارة الأدمن
  canManageAdmins: () =>
    ['director','deputy']
    .includes(get().user?.role || ''),



  // تجميد المستخدمين
  canFreezeUser: () =>
    ['director','deputy','admin']
    .includes(get().user?.role || ''),



  canUnfreezeUser: () =>
    ['director','deputy','admin']
    .includes(get().user?.role || ''),



  // حذف المستخدمين
  canDeleteUsers: () =>
    ['director','deputy','admin']
    .includes(get().user?.role || ''),



  // حذف المحتوى
  canDeleteContent: () =>
    ['director','deputy']
    .includes(get().user?.role || ''),



  // نشر المحتوى
  canPublishContent: () =>
    ['director','deputy']
    .includes(get().user?.role || ''),



  canManageWallet: () =>
    get().user?.role === 'director',



  canManageSystemSettings: () =>
    get().user?.role === 'director',



  canAccess: (page: string) => {

    const role = get().user?.role;

    const permissions: Record<string, UserRole[]> = {

      dashboard:
        ['director','deputy','admin'],

      users:
        ['director','deputy','admin'],

      admins:
        ['director','deputy'],

      upload:
        ['director','deputy','admin','user'],

      watch:
        ['director','deputy','admin','user'],

      content:
        ['director','deputy','admin'],

      publish:
        ['director','deputy'],

      delete:
        ['director','deputy'],

      wallet:
        ['director'],

      settings:
        ['director'],

      audit:
        ['director','deputy'],

      radio:
        ['director','deputy','admin','user'],

      aiStudio:
        ['director','deputy','admin']
    };


    return role
      ? permissions[page]?.includes(role) ?? false
      : false;

  }

}));



// مراقبة تسجيل الدخول

onAuthStateChanged(auth, async (firebaseUser) => {

  if (firebaseUser) {


    const token =
      await firebaseUser.getIdTokenResult();


    let role =
      (token.claims.role as UserRole) || 'user';


    let status:
      'active' | 'frozen' = 'active';



    // إذا لم يوجد Claim نقرأ من Firestore

    if (!token.claims.role) {

      const userDoc =
        await getDoc(
          doc(db,'users',firebaseUser.uid)
        );


      if (userDoc.exists()) {

        const data =
          userDoc.data();


        role =
          (data.role as UserRole) || 'user';


        status =
          data.status || 'active';

      }

    }



    const user: User = {

      id: firebaseUser.uid,

      name:
        firebaseUser.displayName ||
        firebaseUser.email?.split('@')[0] ||
        'User',

      email:
        firebaseUser.email || '',

      role,

      status

    };


    useUserStore.setState({

      user,

      isAuthenticated:true,

      authLoading:false

    });


  } else {


    useUserStore.setState({

      user:null,

      isAuthenticated:false,

      authLoading:false

    });


  }

});



// بيانات اختبار فقط

export const defaultUsers = {

  director:{
    id:'1',
    name:'Director',
    email:'director@shams.com',
    role:'director' as UserRole
  },

  deputy:{
    id:'5',
    name:'Deputy Director',
    email:'deputy@shams.com',
    role:'deputy' as UserRole
  },

  admin:{
    id:'2',
    name:'Admin',
    email:'admin@shams.com',
    role:'admin' as UserRole
  },

  user:{
    id:'3',
    name:'User',
    email:'user@shams.com',
    role:'user' as UserRole
  }

};
