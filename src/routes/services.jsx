import { createFileRoute, Link } from "@tanstack/react-router";
import { SERVICES, PRICING, CRISIS_NOTE } from "@/lib/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Our Services — Mindora Psychology Consultancy" },
      {
        name: "description",
        content:
          "Confidential online consultations for anxiety & stress, depression & low mood, panic & emotional regulation, sleep & wellbeing, psychological wellbeing, and personal growth.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Our Services — Mindora Psychology Consultancy" },
      {
        property: "og:description",
        content: "A calmer mind starts with the right support. Online sessions from ₹350.",
      },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <div>
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-16 text-center">
        <p className="rise d1 mb-4 text-xs font-medium tracking-[0.22em] text-sagedeep uppercase">
          Our services
        </p>
        <h1 className="rise d2 mx-auto max-w-[22ch] font-display text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.05] tracking-tight text-balance">
          A calmer mind starts with the right support.
        </h1>
        <p className="rise d3 mx-auto mt-6 max-w-[56ch] text-base leading-relaxed text-foreground/70 text-pretty sm:text-lg">
          At Mindora Psychology Consultancy, we offer confidential online psychological wellbeing
          consultations designed around your individual experiences and needs. Whether you're
          struggling with anxiety, low mood, panic, sleep difficulties, or simply feeling
          overwhelmed, our sessions provide a safe space to talk, reflect, and develop practical
          ways forward.
        </p>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-10 max-w-[40ch]">
          <p className="mb-3 text-xs font-medium tracking-[0.22em] text-sagedeep uppercase">
            How we can support you
          </p>
          <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
            Six gentle paths forward.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {SERVICES.map((s) => (
            <div
              key={s.num}
              className="flex flex-col rounded-3xl bg-white/50 p-8 ring-1 ring-black/5 backdrop-blur-md"
            >
              <p className="font-mono text-xs text-sagedeep">{s.num}</p>
              <h3 className="mt-4 font-display text-2xl font-medium">{s.title}</h3>
              <p className="mt-2 font-display text-base text-sagedeep italic">{s.tagline}</p>
              <p className="mt-4 text-sm leading-relaxed text-foreground/65 text-pretty">{s.body}</p>
              <div className="mt-6 flex flex-wrap gap-x-2 gap-y-1 border-t border-border pt-5 text-xs font-medium text-foreground/60">
                {s.points.map((p, i) => (
                  <span key={p} className="flex items-center gap-2">
                    {i > 0 && <span className="text-sage">•</span>}
                    {p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-[min(2vw,28px)] bg-white/45 p-8 ring-1 ring-black/5 backdrop-blur-xl sm:p-12">
          <div className="mb-8 max-w-[44ch]">
            <p className="mb-3 text-xs font-medium tracking-[0.22em] text-sagedeep uppercase">
              Sessions & pricing
            </p>
            <h2 className="font-display text-3xl font-medium tracking-tight text-balance sm:text-4xl">
              Simple, transparent sessions.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {PRICING.map((p) => (
              <div key={p.minutes} className="rounded-2xl bg-secondary/60 p-6">
                <p className="font-display text-3xl font-medium">{p.price}</p>
                <p className="mt-1 text-sm text-foreground/70">{p.name}</p>
                <p className="mt-3 text-xs text-foreground/45">
                  {p.minutes} minutes · confidential online session
                </p>
              </div>
            ))}
          </div>
          <ul className="mt-8 grid gap-3 text-sm text-foreground/70 sm:grid-cols-2">
            {[
              "Confidential online sessions",
              "Individualised support",
              "Safe and non-judgemental environment",
              "Practical coping strategies",
              "Flexible access from home",
              "Follow-up sessions available",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-sage/25 text-[10px] font-semibold text-sagedeep">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Link
              to="/book"
              className="inline-block rounded-full bg-moss px-7 py-3.5 text-sm font-medium text-cream ring-1 ring-moss/30 transition-transform hover:-translate-y-0.5"
            >
              Book your consultation
            </Link>
          </div>
        </div>
      </section>

      {/* CRISIS NOTE */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-2xl border border-border bg-secondary/60 p-6 text-sm leading-relaxed text-foreground/70">
          {CRISIS_NOTE}
        </div>
      </section>
    </div>
  );
}
