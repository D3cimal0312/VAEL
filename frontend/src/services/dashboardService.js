import api from "@/lib/api";

const dashboardService = {
    
    async getoverview () {
        try {
            const res = await api.get("/dashboard/overview")
            return res.data
        }
        catch(error) {
            console.error("Error fetching dashboard overview", error)
            throw new Error("Failed to fetch dashboard overview")
        }
    }
}

export default dashboardService;