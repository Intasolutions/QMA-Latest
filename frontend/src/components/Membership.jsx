// RegistrationFormDialog.jsx
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const API_BASE = "http://127.0.0.1:8000"; // change if needed

export default function RegistrationFormDialog({ onClose }) {
  const dialogRef = useRef(null);
  const formRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      ".dialog-overlay",
      { opacity: 0 },
      { opacity: 0.6, duration: 0.4, ease: "power1.out" }
    ).fromTo(
      dialogRef.current,
      { y: -100, scale: 0.8, opacity: 0 },
      { y: 0, scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.4)" },
      "-=0.3"
    );

    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);
    const payload = {
      full_name: fd.get("fullName"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      address: fd.get("address"),
      e_transfer_id: fd.get("eTransferId"),
      adults: Number(fd.get("adults") || 0),
      children: Number(fd.get("children") || 0),
      registration_type: fd.get("registrationType"), // "Individual" | "Family" | "Student"
      consent: !!fd.get("consent"),
    };

    if ((payload.adults || 0) + (payload.children || 0) < 1) {
      setErrorMsg("Please include at least 1 adult or child.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(`${API_BASE}/api/registrations/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed (${res.status})`);
      }

      // reset form (no TS optional chaining)
      if (e.currentTarget && typeof e.currentTarget.reset === "function") {
        e.currentTarget.reset();
      }

      setSuccess(true);
    } catch (err) {
      console.error(err);
      setErrorMsg("Submission failed. Please check your entries and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
      {/* Overlay */}
      <div
        className="dialog-overlay fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => !submitting && onClose?.()}
      ></div>

      {/* Dialog */}
      <div
        ref={dialogRef}
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-2xl mx-4 p-6 sm:p-8 overflow-y-auto overflow-x-hidden max-h-[90vh] custom-scrollbar-y"
        role="dialog"
        aria-modal="true"
      >
        {/* Floating shapes */}
        <div className="absolute -top-6 sm:-top-10 -right-6 sm:-right-10 w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-tr from-green-400 to-teal-400 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-6 sm:-bottom-8 -left-6 sm:-left-8 w-12 sm:w-20 h-12 sm:h-20 bg-gradient-to-tr from-red-600 to-white rounded-full opacity-30 animate-pulse"></div>

        {/* Close Button */}
        <button
          onClick={() => !submitting && onClose?.()}
          disabled={submitting}
          className="absolute top-3 sm:top-4 right-3 sm:right-4 w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-green-500 hover:text-white transition-all transform hover:scale-110 hover:rotate-12 text-green-600 text-lg sm:text-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 sm:mb-6 text-center">
          Join Quinte Malayalee Association
        </h2>

        {/* Success */}
        {success ? (
          <div className="rounded-2xl border border-green-200 bg-green-50 p-4 sm:p-6 text-green-800 text-sm sm:text-base">
            <p className="font-semibold mb-1">Application submitted!</p>
            <p>
              Thank you for registering. We’ll review your submission and get
              back to you shortly.
            </p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-green-600 text-white hover:brightness-110"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Error */}
            {errorMsg && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-red-700 text-sm">
                {errorMsg}
              </div>
            )}

            {/* Form */}
            <form ref={formRef} className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="relative w-full">
                <input
                  type="text"
                  name="fullName"
                  required
                  className="peer w-full border border-gray-300 rounded-xl px-3 sm:px-4 pt-4 sm:pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition shadow-sm"
                />
                <label className="absolute left-3 sm:left-4 top-2 text-gray-400 text-xs sm:text-sm transition-all peer-placeholder-shown:top-4 sm:peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-green-500 peer-focus:text-xs sm:peer-focus:text-sm">
                  Full Name
                </label>
              </div>

              {/* Email + Phone Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative w-full">
                  <input
                    type="email"
                    name="email"
                    required
                    className="peer w-full border border-gray-300 rounded-xl px-3 sm:px-4 pt-4 sm:pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition shadow-sm"
                  />
                  <label className="absolute left-3 sm:left-4 top-2 text-gray-400 text-xs sm:text-sm transition-all peer-placeholder-shown:top-4 sm:peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-green-500 peer-focus:text-xs sm:peer-focus:text-sm">
                    Email
                  </label>
                </div>

                <div className="relative w-full">
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="peer w-full border border-gray-300 rounded-xl px-3 sm:px-4 pt-4 sm:pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition shadow-sm"
                  />
                  <label className="absolute left-3 sm:left-4 top-2 text-gray-400 text-xs sm:text-sm transition-all peer-placeholder-shown:top-4 sm:peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-green-500 peer-focus:text-xs sm:peer-focus:text-sm">
                    Phone Number
                  </label>
                </div>
              </div>

              {/* Address */}
              <div className="relative w-full">
                <textarea
                  rows={3}
                  name="address"
                  required
                  className="peer w-full border border-gray-300 rounded-xl px-3 sm:px-4 pt-4 sm:pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition shadow-sm resize-none"
                ></textarea>
                <label className="absolute left-3 sm:left-4 top-2 text-gray-400 text-xs sm:text-sm transition-all peer-placeholder-shown:top-4 sm:peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-green-500 peer-focus:text-xs sm:peer-focus:text-sm">
                  Address
                </label>
              </div>

              {/* E-Transfer Money Id */}
              <div className="relative w-full">
                <textarea
                  rows={2}
                  name="eTransferId"
                  required
                  className="peer w-full border border-gray-300 rounded-xl px-3 sm:px-4 pt-4 sm:pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition shadow-sm resize-none"
                ></textarea>
                <label className="absolute left-3 sm:left-4 top-2 text-gray-400 text-xs sm:text-sm transition-all peer-placeholder-shown:top-4 sm:peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-green-500 peer-focus:text-xs sm:peer-focus:text-sm">
                  E-Transfer Money Id
                </label>
              </div>

              {/* Adults + Children Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative w-full">
                  <input
                    type="number"
                    name="adults"
                    min="0"
                    required
                    className="peer w-full border border-gray-300 rounded-xl px-3 sm:px-4 pt-4 sm:pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition shadow-sm"
                  />
                  <label className="absolute left-3 sm:left-4 top-2 text-gray-400 text-xs sm:text-sm transition-all peer-placeholder-shown:top-4 sm:peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-green-500 peer-focus:text-xs sm:peer-focus:text-sm">
                    Number of Adults
                  </label>
                </div>

                <div className="relative w-full">
                  <input
                    type="number"
                    name="children"
                    min="0"
                    required
                    className="peer w-full border border-gray-300 rounded-xl px-3 sm:px-4 pt-4 sm:pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition shadow-sm"
                  />
                  <label className="absolute left-3 sm:left-4 top-2 text-gray-400 text-xs sm:text-sm transition-all peer-placeholder-shown:top-4 sm:peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-green-500 peer-focus:text-xs sm:peer-focus:text-sm">
                    Number of Children
                  </label>
                </div>
              </div>

              {/* Registration Type */}
              <div className="w-full">
                <span className="block mb-2 sm:mb-3 text-gray-500 font-medium text-xs sm:text-sm">
                  Registration Type
                </span>
                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  {["Individual", "Family", "Student"].map((type, idx) => (
                    <label
                      key={idx}
                      className="relative flex flex-col items-center justify-center p-3 sm:p-4 border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:border-green-400 transition-all duration-300 bg-white cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="registrationType"
                        value={type}
                        className="peer hidden"
                        required
                      />
                      <span className="text-gray-700 font-semibold text-center transition-colors peer-checked:text-white z-10 text-xs sm:text-sm">
                        {type}
                      </span>
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400 to-teal-500 opacity-0 peer-checked:opacity-100 transition-opacity duration-300 z-0"></div>
                    </label>
                  ))}
                </div>

                {/* Registration Fee Info */}
                <div className="mt-3 sm:mt-4 p-3 sm:p-4 rounded-xl bg-green-50 border border-green-200 text-xs sm:text-sm text-gray-700">
                  <p className="font-semibold text-green-700 mb-2">
                    Membership Fees:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Family Registration: $35</li>
                    <li>Individual Registration: $15</li>
                  </ul>
                  <p className="mt-2">
                    Payment via <strong>e-Transfer</strong> to:{" "}
                    <span className="font-medium text-green-600">
                      finance@quintemalayaleeassociation.ca
                    </span>
                  </p>
                </div>
              </div>

              {/* Consent */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="consent"
                  required
                  className="mt-1 w-4 sm:w-5 h-4 sm:h-5 text-green-500 border-gray-300 rounded focus:ring-green-400"
                />
                <span className="text-xs sm:text-sm text-gray-600">
                  I grant permission and give consent to QMA to use my contact
                  information for QMA events and photos from QMA events on
                  website and social media sites.
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="relative w-full py-2 sm:py-3 font-semibold text-white rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-green-400 via-teal-400 to-green-500 animate-gradient-x opacity-80 rounded-2xl"></span>
                <span className="relative z-10">
                  {submitting ? "Submitting..." : "Submit Application"}
                </span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
