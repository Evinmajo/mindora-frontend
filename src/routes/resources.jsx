import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { FAQS, TOOLKIT, DOWNLOADS, CRISIS_NOTE, SITE } from "@/lib/site";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources & FAQ — Mindora" },
      {
        name: "description",
        content:
          "Is counselling right for me? Answers to common questions, the Mindora Toolkit of evidence-informed exercises, and The Mindora Letter newsletter.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Resources & FAQ — Mindora" },
      {
        property: "og:description",
        content: "Gentle answers, practical exercises and free wellbeing resources.",
      },
    ],
  }),
  component: Resources,
});

function Resources() {
  const [openFaq, setOpenFaq] = useState(0);
  const [letterEmail, setLetterEmail] = useState("");
  const [letterDone, setLetterDone] = useState(false);

  return (
    <div>
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-16 text-center">
        <p className="rise d1 mb-4 text-xs font-medium tracking-[0.22em] text-sagedeep uppercase">
          Mindora resources
        </p>
        <h1 className="rise d2 mx-auto max-w-[22ch] font-display text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.05] tracking-tight text-balance">
          Is counselling right for me?
        </h1>
        <p className="rise d3 mx-auto mt-6 max-w-[52ch] text-base leading-relaxed text-foreground/70 text-pretty sm:text-lg">
          A short, honest FAQ — and a growing library of gentle, evidence-informed tools you can
          use between sessions.
        </p>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <div
              key={f.q}
              className="overflow-hidden rounded-2xl bg-white/50 ring-1 ring-black/5 backdrop-blur-md"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-display text-lg font-medium">{f.q}</span>
                <span className="text-sagedeep">{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && (
                <p className="px-6 pb-6 text-sm leading-relaxed text-foreground/70 text-pretty">
                  {f.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CRISIS */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-2xl bg-moss/90 p-6 text-cream/90 ring-1 ring-black/10">
          <p className="text-xs font-medium tracking-[0.22em] text-cream/60 uppercase">
            In an emergency
          </p>
          <p className="mt-3 max-w-[70ch] text-sm leading-relaxed text-pretty">{CRISIS_NOTE}</p>
        </div>
      </section>

      {/* TOOLKIT */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-10 max-w-[44ch]">
          <p className="mb-3 text-xs font-medium tracking-[0.22em] text-sagedeep uppercase">
            The Mindora Toolkit
          </p>
          <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
            Short, evidence-informed exercises.
          </h2>
          <p className="mt-4 max-w-[48ch] text-sm leading-relaxed text-foreground/65 text-pretty">
            Gentle practices to try between sessions — or simply to feel a little steadier today.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLKIT.map((t) => (
            <div
              key={t.name}
              className="rounded-3xl bg-white/50 p-7 ring-1 ring-black/5 backdrop-blur-md"
            >
              <h3 className="font-display text-lg font-medium">{t.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/65">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DOWNLOADS */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-[min(2vw,28px)] bg-white/45 p-8 ring-1 ring-black/5 backdrop-blur-xl sm:p-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="mb-3 text-xs font-medium tracking-[0.22em] text-sagedeep uppercase">
                Free downloads
              </p>
              <h2 className="font-display text-3xl font-medium tracking-tight text-balance sm:text-4xl">
                Workbooks for your own pace.
              </h2>
              <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-foreground/65 text-pretty">
                Ask for any of these on WhatsApp or by email and we'll send your copy — free,
                always.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-moss px-6 py-3 text-sm font-medium text-cream ring-1 ring-moss/30 transition-transform hover:-translate-y-0.5"
                >
                  Request on WhatsApp
                </a>
                <Link
                  to="/contact"
                  className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  Email us
                </Link>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {DOWNLOADS.map((d) => (
                  <div
                    key={d}
                    className="flex items-center gap-3 rounded-2xl bg-secondary/60 px-5 py-4 text-sm"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-sage/25 text-xs text-sagedeep">
                      ↓
                    </span>
                    {d}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-[min(2vw,28px)] bg-moss/90 p-8 text-cream ring-1 ring-black/10 sm:p-12">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-xs font-medium tracking-[0.22em] text-cream/60 uppercase">
              The Mindora Letter
            </p>
            <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-balance sm:text-4xl">
              A monthly letter for a calmer mind.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-cream/80 text-pretty">
              Psychology-based wellbeing information, once a month. No noise, no pressure — just a
              gentle read.
            </p>
            {letterDone ? (
              <p className="mt-8 rounded-2xl bg-cream/15 px-6 py-4 text-sm">
                Thank you — you're on the list. Your first letter is on its way.
              </p>
            ) : (
              <form
                className="mt-8 flex flex-col gap-3 sm:flex-row"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (letterEmail.trim()) setLetterDone(true);
                }}
              >
                <input
                  type="email"
                  required
                  value={letterEmail}
                  onChange={(e) => setLetterEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="flex-1 rounded-full bg-cream/15 px-5 py-3.5 text-sm text-cream ring-1 ring-cream/25 placeholder:text-cream/50 focus:outline-none focus:ring-cream/50"
                />
                <button
                  type="submit"
                  className="rounded-full bg-cream px-7 py-3.5 text-sm font-medium text-moss transition-transform hover:-translate-y-0.5"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
