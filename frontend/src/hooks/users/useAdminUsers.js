import { useState, useEffect, useCallback } from 'react';
import { userService } from '@/services/userService';
import toast from 'react-hot-toast';

// get all admin users
export function useAdminUsers(filter={}, refreshKey = 0) {
  const [users, setUsers] = useState([]);
  const [count,setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      try {
        const data = await userService.getAll(filter);
        setUsers(data.data);
        setCount(data.count);
        setTotalPage(data.totalPage);

      } catch (e) {
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [filter, refreshKey]);

  return { users, loading,count,totalPage,page,setPage};
}

// GET single — admin user detail page
// export function useAdminUser(id) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!id) return;
//     async function fetch() {
//       setLoading(true);
//       try {
//         const data = await userService.getById(id);
//         setUser(data);
//       } catch (e) {
//         toast.error(e.message);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetch();
//   }, [id]);

//   return { user, loading };
// }

// Mutations — update only (no create/delete for users typically)
export function useUserMutations() {
  const [loading, setLoading] = useState(false);

  const updateUser = useCallback(async (id, data) => {
    setLoading(true);
    try {
      return await userService.update(id, data);
    } catch (e) {
      toast.error(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { updateUser, loading };
}