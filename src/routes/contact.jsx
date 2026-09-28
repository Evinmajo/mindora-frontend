import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE, CRISIS_NOTE } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Mindora Psychology Consultancy" },
      {
        name: "description",
        content:
          "Reach Mindora by email or WhatsApp for confidential online psychological wellbeing consultations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Contact — Mindora Psychology Consultancy" },
      {
        property: "og:description",
        content: "Email or WhatsApp Mindora — a confidential, compassionate space to begin.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-16 pb-20">
      <div className="text-center">
        <p className="rise d1 mb-4 text-xs font-medium tracking-[0.22em] text-sagedeep uppercase">
          Contact
        </p>
        <h1 className="rise d2 mx-auto max-w-[20ch] font-display text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.05] tracking-tight text-balance">
          A safe space to begin.
        </h1>
        <p className="rise d3 mx-auto mt-6 max-w-[52ch] text-base leading-relaxed text-foreground/70 text-pretty sm:text-lg">
          However you reach out, you'll be met with warmth and confidentiality. Ask anything — there
          is no wrong first question.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2">
        <a
          href={`mailto:${SITE.email}?subject=Consultation enquiry`}
          className="group rounded-3xl bg-white/50 p-8 ring-1 ring-black/5 backdrop-blur-md transition-transform hover:-translate-y-1"
        >
          <p className="text-xs font-medium tracking-[0.22em] text-sagedeep uppercase">Email</p>
          <p className="mt-4 font-display text-xl font-medium break-all">{SITE.email}</p>
          <p className="mt-3 text-sm text-foreground/60">
            For bookings, questions, and resource requests. We reply within 1–2 working days.
          </p>
          <p className="mt-6 text-xs font-medium text-sagedeep transition-transform group-hover:translate-x-1">
            Write to us →
          </p>
        </a>
        <a
          href={SITE.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="group rounded-3xl bg-white/50 p-8 ring-1 ring-black/5 backdrop-blur-md transition-transform hover:-translate-y-1"
        >
          <p className="text-xs font-medium tracking-[0.22em] text-sagedeep uppercase">WhatsApp</p>
          <p className="mt-4 font-display text-xl font-medium">{SITE.whatsappLabel}</p>
          <p className="mt-1 text-sm font-medium text-foreground/70">{SITE.whatsappNumber}</p>
          <p className="mt-3 text-sm text-foreground/60">
            The quickest way to reach us — ask about sessions, timings, or request a resource.
          </p>
          <p className="mt-6 text-xs font-medium text-sagedeep transition-transform group-hover:translate-x-1">
            Start a chat →
          </p>
        </a>
      </div>

      <div className="mx-auto mt-12 max-w-4xl rounded-[min(2vw,28px)] bg-white/45 p-8 ring-1 ring-black/5 backdrop-blur-xl sm:p-10">
        <p className="mb-3 text-xs font-medium tracking-[0.22em] text-sagedeep uppercase">
          Before you reach out
        </p>
        <p className="text-sm leading-relaxed text-foreground/70 text-pretty">{CRISIS_NOTE}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/book"
            className="rounded-full bg-moss px-6 py-3 text-sm font-medium text-cream ring-1 ring-moss/30 transition-transform hover:-translate-y-0.5"
          >
            Book a consultation
          </Link>
          <Link
            to="/resources"
            className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Read the FAQ
          </Link>
        </div>
      </div>
    </div>
  );
}
