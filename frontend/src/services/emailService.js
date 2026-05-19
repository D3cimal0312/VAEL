import api from "../lib/api";

const emailService = {
  async sendBulkEmail(form) {
    const res = await api.post("/email/send", form);
    return res.data;
  },

  async unsubscribe(token) {
    const res = await api.get(`/email/unsubscribe/${token}`);
    return res.data;
  },
};

export default emailService;
