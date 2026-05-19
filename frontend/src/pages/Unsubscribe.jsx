import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MailX, CheckCircle, AlertCircle } from "lucide-react";
import emailService from "@/services/emailService";

const getEmailFromToken = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1])).email;
  } catch {
    return null;
  }
};

export default function Unsubscribe() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("confirm");

  const token = searchParams.get("token");        
  const email = token ? getEmailFromToken(token) : null;

  const handleUnsubscribe = async () => {
    if (!token) return setStatus("error");
    setStatus("loading");
    try {
      await emailService.unsubscribe(token);       
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-cream-light flex items-center justify-center px-4">
      <div className="bg-white border border-offwhite rounded-2xl p-8 max-w-md w-full text-center">

        {(status === "confirm" || status === "loading") && (
          <>
            <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-4">
              <MailX size={22} className="text-red-400" strokeWidth={1.6} />
            </div>
            <h1 className="text-lg font-medium text-hair-dark mb-2">
              Unsubscribe from emails?
            </h1>
            <p className="text-sm text-hair leading-relaxed mb-1">
              You are about to unsubscribe
            </p>
            {email && (
              <p className="text-sm font-medium text-hair-dark mb-5">{email}</p>
            )}
            <p className="text-xs text-hair opacity-70 mb-6">
              You will no longer receive updates, offers, or announcements from
              us. This action can only be reversed by contacting support.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => window.history.back()}
                disabled={status === "loading"}
                className="flex-1 px-4 py-2.5 text-sm text-hair border border-offwhite rounded-lg bg-transparent hover:bg-cream-light transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUnsubscribe}
                disabled={status === "loading"}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-lux border-0 rounded-lg hover:bg-red-600 transition-colors cursor-pointer disabled:opacity-60"
              >
                {status === "loading" ? "Unsubscribing…" : "Yes, unsubscribe"}
              </button>
            </div>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-12 h-12 rounded-full bg-green-50 border border-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={22} className="text-green-500" strokeWidth={1.6} />
            </div>
            <h1 className="text-lg font-medium text-hair-dark mb-2">
              You've been unsubscribed
            </h1>
            <p className="text-sm text-hair leading-relaxed">
              {email && <span className="font-medium text-hair-dark">{email} </span>}
              has been removed from our mailing list. You won't receive any
              further emails from us.
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={22} className="text-red-400" strokeWidth={1.6} />
            </div>
            <h1 className="text-lg font-medium text-hair-dark mb-2">
              Something went wrong
            </h1>
            <p className="text-sm text-hair leading-relaxed mb-5">
              This link may have expired or is invalid. Please contact support.
            </p>
            <button
              onClick={() => setStatus("confirm")}
              className="px-5 py-2.5 text-sm font-medium text-hair-dark border border-offwhite rounded-lg bg-transparent hover:bg-cream-light transition-colors cursor-pointer"
            >
              Try again
            </button>
          </>
        )}
      </div>
    </div>
  );
}