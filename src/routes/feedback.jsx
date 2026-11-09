import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const Route = createFileRoute("/feedback")({
  head: () => ({
    meta: [
      { title: "Share Your Feedback — Mindora Psychology Consultancy" },
      {
        name: "description",
        content:
          "Help us nurture our safe space. Share your feedback or experience with Mindora Psychology Consultancy.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Share Your Feedback — Mindora" },
    ],
  }),
  component: Feedback,
});

function Feedback() {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [service, setService] = useState("Individual Session");
  const [message, setMessage] = useState("");
  const [allowPublic, setAllowPublic] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || "Anonymous",
          service,
          rating,
          message: message.trim(),
          allowPublic,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        throw new Error(data.error || "Failed to submit feedback.");
      }
    } catch (err) {
      console.error("Feedback submission error:", err);
      setErrorMsg("Something went wrong while sending your feedback. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* HERO SECTION */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-16 text-center">
        <p className="rise d1 mb-4 text-xs font-medium tracking-[0.22em] text-sagedeep uppercase">
          Client Experiences & Feedback
        </p>
        <h1 className="rise d2 mx-auto max-w-[22ch] font-display text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.05] tracking-tight text-balance">
          Your voice helps us <span className="text-sagedeep italic">nurture a safer space.</span>
        </h1>
        <p className="rise d3 mx-auto mt-6 max-w-[52ch] text-base leading-relaxed text-foreground/70 text-pretty sm:text-lg">
          Whether you have completed a consultation, used our resources, or simply want to share
          your experience, we deeply value your feedback.
        </p>
      </section>

      {/* FEEDBACK FORM / SUCCESS MESSAGE */}
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <div className="rounded-[min(2vw,28px)] bg-white/45 p-8 ring-1 ring-black/5 backdrop-blur-xl sm:p-12">
          {submitted ? (
            <div className="py-8 text-center">
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-sage/25 text-xl text-sagedeep">
                ✓
              </span>
              <h2 className="mt-6 font-display text-2xl font-medium tracking-tight">
                Thank you for your feedback!
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70 text-pretty">
                We truly appreciate you taking the time to share your experience with Mindora. Your
                input helps us continue delivering compassionate and thoughtful care.
              </p>
              <div className="mt-8 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setMessage("");
                    setName("");
                  }}
                  className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  Submit another response
                </button>
                <Link
                  to="/"
                  className="rounded-full bg-moss px-6 py-3 text-sm font-medium text-cream ring-1 ring-moss/30"
                >
                  Back home
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="font-display text-2xl font-medium tracking-tight">
                Share your experience
              </h2>

              {/* RATING */}
              <div>
                <label className="mb-2 block text-xs font-medium text-foreground/60">
                  Overall rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 text-2xl transition-transform hover:scale-110 focus:outline-none"
                    >
                      <span
                        className={
                          star <= (hoverRating || rating)
                            ? "text-amber-500"
                            : "text-foreground/20"
                        }
                      >
                        ★
                      </span>
                    </button>
                  ))}
                  <span className="ml-2 text-xs font-medium text-foreground/50">
                    {rating === 5
                      ? "Excellent"
                      : rating === 4
                      ? "Good"
                      : rating === 3
                      ? "Average"
                      : rating === 2
                      ? "Needs improvement"
                      : "Poor"}
                  </span>
                </div>
              </div>

              {/* NAME & SERVICE */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-foreground/60">
                    Your name (or leave blank to remain anonymous)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Optional"
                    className="w-full rounded-xl bg-white/60 px-4 py-3 text-sm ring-1 ring-black/5 placeholder:text-foreground/35 focus:ring-2 focus:ring-primary/40 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-foreground/60">
                    Service received
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full rounded-xl bg-white/60 px-4 py-3 text-sm ring-1 ring-black/5 focus:ring-2 focus:ring-primary/40 focus:outline-none"
                  >
                    <option value="Initial Consultation">Initial Consultation (30 mins)</option>
                    <option value="Individual Session">Individual Session (45 / 60 mins)</option>
                    <option value="Learning Difficulties Support">Learning Difficulties Support</option>
                    <option value="General Enquiry / Website">General Enquiry / Website</option>
                  </select>
                </div>
              </div>

              {/* MESSAGE */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-foreground/60">
                  Your feedback / review <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share what went well, how your session helped, or areas where we can improve..."
                  className="w-full resize-none rounded-xl bg-white/60 px-4 py-3 text-sm ring-1 ring-black/5 placeholder:text-foreground/35 focus:ring-2 focus:ring-primary/40 focus:outline-none"
                />
              </div>

              {/* PUBLIC CONSENT CHECKBOX */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="allowPublic"
                  checked={allowPublic}
                  onChange={(e) => setAllowPublic(e.target.checked)}
                  className="mt-1 rounded border-border text-moss focus:ring-moss"
                />
                <label htmlFor="allowPublic" className="text-xs leading-relaxed text-foreground/70">
                  You have my permission to display this feedback as a public testimonial on the website (your email will never be shared).
                </label>
              </div>

              {errorMsg && (
                <div className="rounded-xl bg-rose-500/10 p-4 text-xs text-rose-600">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting || !message.trim()}
                className="w-full rounded-full bg-moss py-3.5 text-sm font-medium text-cream ring-1 ring-moss/30 transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
              >
                {submitting ? "Submitting..." : "Submit Feedback"}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}