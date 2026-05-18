import api from "@/lib/api";

const dashboardService = {

  async getoverview() {
    const res = await api.get("/dashboard/overview");
    return res.data;
  },

};

export default dashboardService;