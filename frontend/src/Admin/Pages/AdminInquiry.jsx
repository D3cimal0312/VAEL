import React, { useState } from "react";
import { Send, AlertCircle, CheckCircle } from "lucide-react";
import emailService from "@/services/emailService";
import MailGuide from "../components/MaildGuide";
import Heading from "@/common/Heading";
import toast from "react-hot-toast";
const AdminInquiry = () => {
  const [form, setForm] = useState({ subject: "", body: "" });
  const [status, setStatus] = useState(null);
  const [result, setResult] = useState(null);

  const handleSend = async () => {
    if (!form.subject.trim() || !form.body.trim()) {
      setStatus("error");
      setResult({ message: "Subject and body are required." });
      return;
    }

    setStatus("loading");
    setResult(null);

    try {
      const data = await emailService.sendBulkEmail(form);
      setStatus("success");
      setResult(data);
      setForm({ subject: "", body: "" });
      toast.success("Email sent successfully.");
    } catch (err) {
      setStatus("error");
      setResult({
        message: err.response?.data?.error || "Failed to send emails.",
      });
      toast.error("Failed to send emails.");
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status) setStatus(null);
  };

  return (
    <div className="p-6 bg-cream">
      <Heading
        mainheading={"Send Mail"}
        subheading={"Send inquiry to all clients"}
      />

      <div className="flex h-fit lg:h-screen gap-4 flex-wrap lg:flex-nowrap w-full ">
        <div className="w-full lg:w-1/2 border border-lux rounded-xl h-fit">
          <div className="bg-cream-light border border-offwhite rounded-xl p-5">
            <div className="mb-4">
              <label className="block text-lg  text-hair mb-1.5">
                Subject line
              </label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="e.g. Important update from our team"
                maxLength={80}
                className="w-full px-3 py-2  text-xl bg-white border border-offwhite rounded-lg text-hair-dark placeholder:text-hair/50 focus:outline-none focus:border-lux/40 transition-colors"
              />
              <p className="text-lg text-hair opacity-60 mt-1 m-0">
                {form.subject.length}/80
              </p>
            </div>

            <div className="mb-5">
              <label className="block text-lg  text-hair mb-1.5">
                Email body
              </label>
              <textarea
                name="body"
                value={form.body}
                onChange={handleChange}
                placeholder="Write your message here."
                rows={10}
                className="w-full px-3 py-2 text-xl bg-white border border-offwhite rounded-lg text-hair-dark placeholder:text-hair/50 focus:outline-none focus:border-lux/40 transition-colors resize-y font-mono leading-relaxed"
              />
              <p className="text-lg text-hair opacity-60 mt-1 m-0">
                Basic HTML supported. Unsubscribe link is automatically added.
              </p>
            </div>

            {status === "success" && result && (
              <div className="flex items-center gap-2 bg-green-50 border border-cream rounded-lg px-4 py-3 mb-4">
                <CheckCircle size={24} className="text-lux mt-0.5 shrink-0" />
                <div>
                  <p className="text-lg  text-lux m-0">{result.message}</p>
                  <p className="text-lg text-lux m-0 mt-0.5">
                    Sent {result.sent} · Failed {result.failed} · Total{" "}
                    {result.total}
                  </p>
                </div>
              </div>
            )}

            {status === "error" && result && (
              <div className="flex items-start gap-2 bg-red-50 border border-cream rounded-lg px-4 py-3 mb-4">
                <AlertCircle size={15} className="text-lux mt-0.5 shrink-0" />
                <p className="text-xl text-red-600 m-0">{result.message}</p>
              </div>
            )}

            <button
              onClick={handleSend}
              disabled={status === "loading"}
              className="flex items-center gap-2 px-5 py-2.5 bg-lux text-cream text-lg  rounded-lg cursor-pointer transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed border-0"
            >
              <Send size={14} strokeWidth={1.8} />
              {status === "loading" ? "Sending…" : "Send bulk email"}
            </button>
          </div>
        </div>
        <div className="w-full lg:w-1/2 border border-lux rounded-xl h-fit">
          <MailGuide />
        </div>
      </div>
    </div>
  );
};

export default AdminInquiry;
