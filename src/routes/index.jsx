import { createFileRoute, Link } from "@tanstack/react-router";
import heroRoom from "@/assets/hero-room.jpg";
import hasnaAsset from "@/assets/hasna.jpg";
import { SERVICES, PRICING, SITE, CRISIS_NOTE } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mindora — A safe space for a calmer, healthier you" },
      {
        name: "description",
        content:
          "Mindora is a psychology and wellbeing consultancy offering confidential online consultations for anxiety, depression, panic, stress, sleep difficulties, and learning difficulties.",
      },
      { property: "og:title", content: "Mindora — A safe space for a calmer, healthier you" },
      {
        property: "og:description",
        content:
          "Compassionate, evidence-informed online psychological wellbeing consultations. Initial 30-minute consultation ₹350.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div>
      {/* HERO */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pt-10 pb-20 lg:grid-cols-12 lg:gap-8 lg:pt-16">
        <div className="lg:col-span-7">
          <p className="rise d1 mb-6 text-xs font-medium tracking-[0.22em] text-sagedeep uppercase">
            Psychology & wellbeing consultancy · Online
          </p>
          <h1 className="rise d2 font-display text-[clamp(2.6rem,6vw,4.6rem)] font-medium leading-[1.02] tracking-tight text-balance">
            A safe space for a <span className="text-sagedeep italic">calmer, healthier</span> you.
          </h1>
          <p className="rise d3 mt-7 max-w-[46ch] text-base leading-relaxed text-foreground/70 text-pretty sm:text-lg">
            Mindora helps you better understand your thoughts, emotions, and experiences — with
            compassionate, evidence-informed support for anxiety, depression, panic, stress, learning difficulties, and
            sleep difficulties. A welcoming, non-judgemental space where you can feel heard.
          </p>
          <div className="rise d4 mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/book"
              className="rounded-full bg-moss px-7 py-3.5 text-sm font-medium text-cream ring-1 ring-moss/30 transition-transform hover:-translate-y-0.5"
            >
              Book a consultation
            </Link>
            <Link
              to="/services"
              className="rounded-full px-2 py-3.5 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
            >
              See how we can support you
            </Link>
          </div>
          <div className="rise d4 mt-12 flex flex-wrap gap-2 border-t border-border pt-6">
            {[
              "Anxiety",
              "Depression",
              "Panic",
              "Stress",
              "Sleep",
              "Personal growth",
              "Learning difficulty",
            ].map((a) => (
              <span
                key={a}
                className="rounded-full bg-sage/15 px-4 py-1.5 text-xs font-medium text-sagedeep"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
        <div className="rise d3 lg:col-span-5">
          <div className="relative">
            <img
              src={heroRoom}
              alt="A calm, sunlit therapy room with a linen armchair and a potted fern"
              width={1024}
              height={1280}
              className="aspect-[4/5] w-full rounded-[min(1vw,16px)] object-cover ring-1 ring-black/5"
            />
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-white/55 p-4 ring-1 ring-black/5 backdrop-blur-md sm:block">
              <p className="font-display text-sm text-moss italic">
                "You don't have to have everything figured out before you ask for support."
              </p>
              <p className="mt-1 text-xs text-foreground/50">— the Mindora philosophy</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING / WAYS TO BEGIN */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 max-w-[40ch]">
          <p className="mb-3 text-xs font-medium tracking-[0.22em] text-sagedeep uppercase">
            Sessions
          </p>
          <h2 className="font-display text-3xl font-medium tracking-tight text-balance sm:text-4xl">
            Three ways to begin, at your own pace.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {PRICING.map((p, i) => (
            <div
              key={p.minutes}
              className="rounded-3xl bg-white/50 p-7 ring-1 ring-black/5 backdrop-blur-md"
            >
              <p className="font-display text-5xl font-light text-sage/70">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-5 font-display text-xl font-medium">{p.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/65">
                {p.minutes === 30
                  ? "A gentle first conversation to understand what brings you here and find the right fit."
                  : p.minutes === 45
                    ? "A focused session with space to explore what's on your mind and build practical strategies."
                    : "A longer, unhurried space for deeper work and harder conversations."}
              </p>
              <p className="mt-6 font-display text-2xl font-medium">{p.price}</p>
              <p className="text-xs text-foreground/45">{p.minutes} minutes · online</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-foreground/50">
          Follow-up sessions are arranged after your initial consultation.
        </p>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[44ch]">
            <p className="mb-3 text-xs font-medium tracking-[0.22em] text-sagedeep uppercase">
              Our services
            </p>
            <h2 className="font-display text-3xl font-medium tracking-tight text-balance sm:text-4xl">
              A calmer mind starts with the right support.
            </h2>
          </div>
          <Link
            to="/services"
            className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Explore all services
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <Link
              key={s.num}
              to="/services"
              className="group rounded-3xl bg-white/50 p-7 ring-1 ring-black/5 backdrop-blur-md transition-transform hover:-translate-y-1"
            >
              <p className="font-mono text-xs text-sagedeep">{s.num}</p>
              <h3 className="mt-4 font-display text-xl font-medium">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/65 text-pretty">
                {s.tagline}
              </p>
              <p className="mt-5 text-xs font-medium text-sagedeep transition-transform group-hover:translate-x-1">
                Learn more →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rounded-[min(2vw,28px)] bg-white/45 p-3 ring-1 ring-black/5 backdrop-blur-xl">
              <img
                src={hasnaAsset}
                alt="Hasna, psychology professional at Mindora"
                width={1200}
                height={1599}
                loading="lazy"
                className="aspect-[4/5] w-full rounded-[min(1.5vw,20px)] object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <p className="mb-3 text-xs font-medium tracking-[0.22em] text-sagedeep uppercase">
              About your psychologist
            </p>
            <h2 className="font-display text-3xl font-medium tracking-tight text-balance sm:text-4xl">
              Hello, I'm Hasna.
            </h2>
            <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-foreground/70 text-pretty sm:text-lg">
              I'm a psychology professional with a BSc in Psychology from the University of Calicut
              and a Master's in Clinical Health Psychology from Queen's University Belfast, UK. My
              experience spans clinical, educational, and care settings, supporting children, young
              people, and adults.
            </p>
            <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-foreground/70 text-pretty sm:text-lg">
              I believe seeking support is not a sign of weakness. Sometimes, a safe and
              non-judgemental space to talk is the first step towards understanding what you are
              experiencing.
            </p>
            <Link
              to="/about"
              className="mt-8 inline-block rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Get to know Mindora
            </Link>
          </div>
        </div>
      </section>

      {/* BOOKING TEASER */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="rounded-[min(2vw,28px)] bg-white/45 p-8 ring-1 ring-black/5 backdrop-blur-xl sm:p-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="mb-3 text-xs font-medium tracking-[0.22em] text-sagedeep uppercase">
                Book a consultation
              </p>
              <h2 className="font-display text-3xl font-medium tracking-tight text-balance sm:text-4xl">
                Ready to take the first step?
              </h2>
              <ul className="mt-8 space-y-3 text-sm text-foreground/70">
                {[
                  "Confidential online sessions",
                  "Individualised support",
                  "A safe and non-judgemental environment",
                  "Practical coping strategies",
                  "Flexible access from the comfort of your home",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-sage/25 text-[10px] font-semibold text-sagedeep">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-secondary/60 p-6">
                <p className="font-display text-sm font-medium tracking-[0.18em] text-sagedeep uppercase">
                  Online consultation
                </p>
                <div className="mt-4 space-y-2">
                  {PRICING.map((p) => (
                    <div key={p.minutes} className="flex items-baseline justify-between text-sm">
                      <span className="text-foreground/70">
                        {p.minutes}-minute session
                        {p.minutes === 30 ? " · first step" : ""}
                      </span>
                      <span className="font-display text-lg font-medium">{p.price}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to="/book"
                  className="mt-6 block rounded-full bg-moss py-3.5 text-center text-sm font-medium text-cream ring-1 ring-moss/30 transition-transform hover:-translate-y-0.5"
                >
                  Book your consultation
                </Link>
                <p className="mt-3 text-center text-xs text-foreground/45">
                  Or {SITE.whatsappLabel.toLowerCase()} — we reply personally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CRISIS NOTE */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-2xl bg-moss/90 p-6 text-cream/90 ring-1 ring-black/10 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <p className="text-sm leading-relaxed text-pretty">{CRISIS_NOTE}</p>
          <span className="mt-3 shrink-0 text-xs tracking-[0.15em] text-cream/60 uppercase sm:mt-0">
            Free & confidential
          </span>
        </div>
      </section>
    </div>
  );
}