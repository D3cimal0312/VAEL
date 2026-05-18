
import dashboardService from "@/services/dashboardService.js"
import {useEffect ,useState} from "react"
import toast from 'react-hot-toast';

// single json file fetch for overview
export function usedashboard() {

    const [overview, setOverview] = useState(null);
    const [loading,setLoading]=useState(true)

    useEffect(() => {
        const fetchOverview = async () => {
            setLoading(true)
            try {
                const res = await dashboardService.getoverview();
                setOverview(res.data);
            } catch (e) {
                toast.error(e.response?.data?.message || "Failed to fetch overview");
            }finally{
                setLoading(false)
            }
        };
        fetchOverview();
    }, []);
  return (
{
    overview,
    loading
}
  )
}

