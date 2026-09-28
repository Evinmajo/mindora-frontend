import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SERVICES as SITE_SERVICES, PRICING } from "@/lib/site";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a Consultation — Mindora" },
      {
        name: "description",
        content:
          "Choose a service, pick a 30, 45 or 60-minute session, and select a date and time. Initial consultation ₹350.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Book a Consultation — Mindora" },
      {
        property: "og:description",
        content: "A soft, four-step booking for your confidential online consultation.",
      },
    ],
  }),
  component: Book,
});

// Added Learning Difficulties service alongside site defaults
const EXTRA_SERVICES = [
  {
    num: "LD",
    title: "Learning Difficulties",
    tagline: "Support for Dyslexia, ADHD, focus, and learning challenges",
  },
];

const SERVICES = [...SITE_SERVICES, ...EXTRA_SERVICES];

// Updated time slots from 10:00 to 20:00
const TIMES = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

function Book() {
  const [service, setService] = useState(SERVICES[0]?.title ?? "");
  const [minutes, setMinutes] = useState(30);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const price = PRICING.find((p) => p.minutes === minutes)?.price ?? "";

  const valid = name.trim() !== "" && email.trim() !== "" && date !== "" && time !== "";

  const handleBookingAndPayment = async () => {
    if (!valid) return;

    setLoading(true);

    try {
      const bookingRes = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service,
          minutes,
          price,
          date,
          time,
          name,
          email,
          phone,
          note,
          status: "Pending Payment",
        }),
      });

      const bookingData = await bookingRes.json();
      if (!bookingRes.ok || !bookingData.success) {
        throw new Error(bookingData.error || "Failed to create booking");
      }

      const bookingId = bookingData.booking._id;

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert("Failed to load Razorpay SDK. Please check your internet connection.");
        setLoading(false);
        return;
      }

      const numericPrice = parseInt(price.replace(/[^0-9]/g, ""), 10) || 350;

      const orderRes = await fetch(`${API_BASE_URL}/api/payments/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: numericPrice, bookingId }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.success) {
        throw new Error(orderData.error || "Failed to initialize payment order");
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "Mindora Health",
        description: `${service} (${minutes} mins session)`,
        order_id: orderData.order.id,
        handler: async function (response) {
          try {
            const verifyRes = await fetch(`${API_BASE_URL}/api/payments/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingId,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyRes.ok && verifyData.success) {
              setDone(true);
            } else {
              alert("Payment verification failed. Please contact support if money was deducted.");
            }
          } catch (err) {
            console.error("Verification error:", err);
            alert("Error verifying payment.");
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name,
          email,
          contact: phone,
        },
        theme: {
          color: "#2e4a3b",
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (err) {
      console.error("Booking payment flow error:", err);
      alert(err.message || "An unexpected error occurred during checkout.");
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-xl rounded-[min(2vw,28px)] bg-white/45 p-10 text-center ring-1 ring-black/5 backdrop-blur-xl">
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-sage/25 text-xl text-sagedeep">
            ✓
          </span>
          <h1 className="mt-6 font-display text-3xl font-medium tracking-tight">
            Booking & Payment Confirmed, {name.split(" ")[0]}!
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-foreground/70 text-pretty">
            You've successfully booked a <span className="font-medium text-foreground">{minutes}-minute</span>{" "}
            session for <span className="font-medium text-foreground">{service}</span> on{" "}
            <span className="font-medium text-foreground">{date}</span> at{" "}
            <span className="font-medium text-foreground">{time}</span> ({price}). We'll send your meeting link to{" "}
            <span className="font-medium text-foreground">{email}</span> shortly.
          </p>
          <p className="mt-4 text-xs leading-relaxed text-foreground/50">
            Payment has been successfully processed. You can reschedule or cancel free of charge up to 24 hours before your session.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              to="/"
              className="rounded-full bg-moss px-6 py-3 text-sm font-medium text-cream ring-1 ring-moss/30"
            >
              Back home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 pt-16 pb-20">
      <div className="mb-10 max-w-[44ch]">
        <p className="mb-3 text-xs font-medium tracking-[0.22em] text-sagedeep uppercase">
          Book a consultation
        </p>
        <h1 className="font-display text-[clamp(2.2rem,4.5vw,3.4rem)] font-medium leading-tight tracking-tight text-balance">
          Let's find a time that works for you.
        </h1>
        <p className="mt-4 max-w-[46ch] text-sm leading-relaxed text-foreground/65 text-pretty">
          A simple four-step booking with secure online payment via UPI, Cards, or Net Banking.
        </p>
      </div>

      <div className="rounded-[min(2vw,28px)] bg-white/45 p-8 ring-1 ring-black/5 backdrop-blur-xl sm:p-12">
        <div className="mb-6 flex items-center gap-3">
          <span className="grid size-7 place-items-center rounded-full bg-sagedeep text-xs font-medium text-cream">
            1
          </span>
          <span className="text-sm font-medium">Select a service</span>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <label key={s.num || s.title} className="cursor-pointer">
              <input
                type="radio"
                name="service"
                className="peer sr-only"
                checked={service === s.title}
                onChange={() => setService(s.title)}
              />
              <div className="h-full rounded-2xl border border-border bg-white/40 p-4 transition-colors peer-checked:border-primary peer-checked:bg-primary/10">
                <p className="text-sm font-medium">{s.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-foreground/50">{s.tagline}</p>
              </div>
            </label>
          ))}
        </div>

        <div className="mb-6 mt-10 flex items-center gap-3">
          <span className="grid size-7 place-items-center rounded-full bg-sagedeep text-xs font-medium text-cream">
            2
          </span>
          <span className="text-sm font-medium">Choose your session length</span>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {PRICING.map((p) => (
            <label key={p.minutes} className="cursor-pointer">
              <input
                type="radio"
                name="minutes"
                className="peer sr-only"
                checked={minutes === p.minutes}
                onChange={() => setMinutes(p.minutes)}
              />
              <div className="rounded-2xl border border-border bg-white/40 p-4 transition-colors peer-checked:border-primary peer-checked:bg-primary/10">
                <p className="text-sm font-medium">{p.name}</p>
                <p className="mt-1 text-xs text-foreground/50">
                  {p.price} · {p.minutes} minutes
                </p>
              </div>
            </label>
          ))}
        </div>

        <div className="mb-6 mt-10 flex items-center gap-3">
          <span className="grid size-7 place-items-center rounded-full bg-sagedeep text-xs font-medium text-cream">
            3
          </span>
          <span className="text-sm font-medium">Select date and time</span>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground/60">
              Preferred date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl bg-white/60 px-4 py-3 text-sm ring-1 ring-black/5 focus:ring-2 focus:ring-primary/40 focus:outline-none"
            />
          </div>
          <div>
            <span className="mb-1.5 block text-xs font-medium text-foreground/60">Preferred time</span>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {TIMES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTime(t)}
                  className={
                    time === t
                      ? "rounded-xl bg-sagedeep py-2.5 text-xs font-medium text-cream"
                      : "rounded-xl bg-white/40 py-2.5 text-xs ring-1 ring-black/5 transition-colors hover:bg-secondary"
                  }
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-6 mt-10 flex items-center gap-3">
          <span className="grid size-7 place-items-center rounded-full bg-sagedeep text-xs font-medium text-cream">
            4
          </span>
          <span className="text-sm font-medium">Enter your details</span>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground/60">Your name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="How should I address you?"
              className="w-full rounded-xl bg-white/60 px-4 py-3 text-sm ring-1 ring-black/5 placeholder:text-foreground/35 focus:ring-2 focus:ring-primary/40 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground/60">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="w-full rounded-xl bg-white/60 px-4 py-3 text-sm ring-1 ring-black/5 placeholder:text-foreground/35 focus:ring-2 focus:ring-primary/40 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground/60">
              WhatsApp number (optional)
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="For your reminder and meeting link"
              className="w-full rounded-xl bg-white/60 px-4 py-3 text-sm ring-1 ring-black/5 placeholder:text-foreground/35 focus:ring-2 focus:ring-primary/40 focus:outline-none"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs font-medium text-foreground/60">
              What would you like support with? (optional)
            </label>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="A few words is enough — everything you share stays confidential."
              className="w-full resize-none rounded-xl bg-white/60 px-4 py-3 text-sm ring-1 ring-black/5 placeholder:text-foreground/35 focus:ring-2 focus:ring-primary/40 focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-10 rounded-2xl bg-secondary/60 p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
            <span className="text-foreground/70">
              {service} · {minutes} minutes · {date || "pick a date"} {time && `· ${time}`}
            </span>
            <span className="font-display text-xl font-medium">{price}</span>
          </div>
          <button
            type="button"
            disabled={!valid || loading}
            onClick={handleBookingAndPayment}
            className="mt-5 w-full rounded-full bg-moss py-3.5 text-sm font-medium text-cream ring-1 ring-moss/30 transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
          >
            {loading ? "Processing..." : `Pay ${price} & Book Session`}
          </button>
          <p className="mt-4 text-xs leading-relaxed text-foreground/55">
            <span className="font-medium text-foreground/70">Payment:</span> Secure checkout via
            UPI, credit/debit cards, or net banking via Razorpay. An email confirmation will follow upon successful payment.
          </p>
          <p className="mt-2 text-xs leading-relaxed text-foreground/55">
            <span className="font-medium text-foreground/70">Cancellation & refunds:</span> Free
            rescheduling or cancellation up to 24 hours before your session.
          </p>
        </div>
      </div>
    </div>
  );
}