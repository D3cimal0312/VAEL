import { useState, useEffect } from 'react';
import { userService } from '@/services/userService';
import toast from 'react-hot-toast';

export function useUser() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const refetch = () => setRefreshKey(refreshKey + 1);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log(user)
        if (!user?.id) return;
        const data = await userService.getProfile(user.id);
        console.log("error")

        setUserDetails(data);
      } catch (e) {
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [refreshKey]);

  return { userDetails, loading, refetch };
}