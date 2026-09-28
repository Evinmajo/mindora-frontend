import { createFileRoute, Link } from "@tanstack/react-router";
import hasnaAsset from "@/assets/hasna.jpg";
import stillLife from "@/assets/still-life.jpg";
import {
  AREAS_OF_INTEREST,
  EXPERIENCE,
  TRAINING,
  PRICING,
  CRISIS_NOTE,
  SITE,
} from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Mindora — Understand your mind. Nurture your wellbeing" },
      {
        name: "description",
        content:
          "What Mindora means, our philosophy and approach, and meet Hasna — psychology professional with an MSc in Clinical Health Psychology from Queen's University Belfast.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "About Mindora — Understand your mind. Nurture your wellbeing" },
      {
        property: "og:description",
        content: "Mindora — inspired by Mind and Aura. Meet your psychologist, Hasna.",
      },
    ],
  }),
  component: About,
});

const APPROACH = [
  { step: "Listen.", text: "Understand your experience without judgement." },
  { step: "Explore.", text: "Work together to understand thoughts, emotions and patterns." },
  { step: "Support.", text: "Develop practical strategies suited to your individual needs." },
  { step: "Grow.", text: "Build greater self-awareness, resilience and confidence." },
];

function About() {
  return (
    <div>
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-20 text-center">
        <p className="rise d1 mb-4 text-xs font-medium tracking-[0.22em] text-sagedeep uppercase">
          About Mindora
        </p>
        <h1 className="rise d2 mx-auto max-w-[20ch] font-display text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.05] tracking-tight text-balance">
          Understand your mind. <span className="text-sagedeep italic">Nurture your wellbeing.</span>
        </h1>
        <p className="rise d3 mx-auto mt-6 max-w-[52ch] text-base leading-relaxed text-foreground/70 text-pretty sm:text-lg">
          We believe psychological wellbeing is about more than simply managing difficulties. It is
          about understanding yourself, finding balance, building resilience, and creating a
          healthier relationship with your thoughts and emotions.
        </p>
      </section>

      {/* WHAT MINDORA MEANS */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <img
              src={stillLife}
              alt="A calm still life with eucalyptus, tea and an open journal"
              width={1024}
              height={1024}
              loading="lazy"
              className="aspect-square w-full rounded-[min(1vw,16px)] object-cover ring-1 ring-black/5"
            />
          </div>
          <div className="lg:col-span-7">
            <p className="mb-3 text-xs font-medium tracking-[0.22em] text-sagedeep uppercase">
              What does Mindora mean?
            </p>
            <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
              Mind + Aura
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="rounded-3xl bg-white/50 p-6 ring-1 ring-black/5 backdrop-blur-md">
                <p className="font-display text-2xl font-medium">Mind</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/65">
                  Represents our thoughts, emotions, experiences, and inner world.
                </p>
              </div>
              <div className="rounded-3xl bg-white/50 p-6 ring-1 ring-black/5 backdrop-blur-md">
                <p className="font-display text-2xl font-medium">Aura</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/65">
                  Represents the atmosphere and sense of calm that surrounds us.
                </p>
              </div>
            </div>
            <p className="mt-8 max-w-[52ch] text-base leading-relaxed text-foreground/70 text-pretty sm:text-lg">
              Together, <span className="font-medium text-foreground">Mindora</span> represents a
              space where your inner world can be understood, supported, and nurtured — a calm,
              compassionate, and confidential space where every individual can feel heard,
              understood, and supported.
            </p>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-[min(2vw,28px)] bg-moss/90 px-8 py-14 text-center text-cream ring-1 ring-black/10 sm:px-16">
          <p className="text-xs font-medium tracking-[0.22em] text-cream/60 uppercase">
            My philosophy
          </p>
          <p className="mx-auto mt-6 max-w-[34ch] font-display text-3xl font-medium leading-snug text-balance sm:text-4xl">
            "You don't have to have everything figured out before you ask for support."
          </p>
          <p className="mx-auto mt-8 max-w-[52ch] text-sm leading-relaxed text-cream/80 text-pretty">
            At Mindora, you are given the space to slow down, talk openly, understand yourself
            better, and take positive steps towards your psychological wellbeing. Your mind
            matters. Your experience matters. And your journey matters.
          </p>
        </div>
      </section>

      {/* APPROACH */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-12 max-w-[40ch]">
          <p className="mb-3 text-xs font-medium tracking-[0.22em] text-sagedeep uppercase">
            My approach
          </p>
          <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
            Four gentle steps forward.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {APPROACH.map((a, i) => (
            <div
              key={a.step}
              className="rounded-3xl bg-white/50 p-7 ring-1 ring-black/5 backdrop-blur-md"
            >
              <p className="font-display text-5xl font-light text-sage/70">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-5 font-display text-xl font-medium">{a.step}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/65">{a.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MEET HASNA */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <img
              src={hasnaAsset}
              alt="Hasna, your psychologist at Mindora"
              width={1200}
              height={1599}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-[min(1vw,16px)] object-cover ring-1 ring-black/5"
            />
            <div className="mt-6 flex flex-wrap gap-2">
              {["BSc Psychology · University of Calicut", "MSc Clinical Health Psychology · Queen's University Belfast, UK"].map(
                (c) => (
                  <span
                    key={c}
                    className="rounded-full bg-sage/15 px-4 py-1.5 text-xs font-medium text-sagedeep"
                  >
                    {c}
                  </span>
                ),
              )}
            </div>
          </div>
          <div className="lg:col-span-7">
            <p className="mb-3 text-xs font-medium tracking-[0.22em] text-sagedeep uppercase">
              Meet your psychologist
            </p>
            <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
              Hello, I'm Hasna.
            </h2>
            <p className="mt-6 max-w-[56ch] text-base leading-relaxed text-foreground/70 text-pretty sm:text-lg">
              My journey in psychology has given me experience across clinical, educational, and
              care settings, supporting children, young people, and adults with a range of
              emotional, behavioural, learning, and psychological needs.
            </p>
            <p className="mt-4 max-w-[56ch] text-base leading-relaxed text-foreground/70 text-pretty sm:text-lg">
              Through Mindora, I aim to provide compassionate, confidential, and individualised
              psychological wellbeing support. My approach is centred around listening carefully to
              each person's experiences and helping them develop practical strategies that are
              meaningful and realistic for their everyday life.
            </p>

            <h3 className="mt-12 font-display text-xl font-medium">Relevant experience</h3>
            <ul className="mt-4 space-y-2.5">
              {EXPERIENCE.map((e) => (
                <li key={e} className="flex items-start gap-3 text-sm leading-relaxed text-foreground/70">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-sage" />
                  {e}
                </li>
              ))}
            </ul>

            <h3 className="mt-12 font-display text-xl font-medium">Areas of interest</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {[...AREAS_OF_INTEREST, "Learning difficulty"].map((a) => (
                <span
                  key={a}
                  className="rounded-full bg-sage/15 px-4 py-1.5 text-xs font-medium text-sagedeep"
                >
                  {a}
                </span>
              ))}
            </div>

            <h3 className="mt-12 font-display text-xl font-medium">
              Training & continuing professional development
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {TRAINING.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border px-4 py-1.5 text-xs text-foreground/70"
                >
                  {t}
                </span>
              ))}
            </div>

            <h3 className="mt-12 font-display text-xl font-medium">
              Professional ethics & confidentiality
            </h3>
            <p className="mt-4 max-w-[56ch] text-sm leading-relaxed text-foreground/70 text-pretty">
              Everything you share at Mindora is treated with strict professional confidentiality.
              Sessions are a private space, and your information is never shared without your
              consent, except in the rare circumstances where there is an immediate risk of harm or
              a legal duty to act — and these limits are always explained clearly up front.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-[min(2vw,28px)] bg-white/45 p-8 text-center ring-1 ring-black/5 backdrop-blur-xl sm:p-12">
          <h2 className="font-display text-3xl font-medium tracking-tight text-balance sm:text-4xl">
            Your wellbeing. Your space. Your journey.
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-sm leading-relaxed text-foreground/70 text-pretty">
            You don't need to wait until things feel unbearable before reaching out. Whether you're
            looking for support with a specific concern or simply need a safe space to talk, Mindora
            offers a confidential and compassionate environment to begin.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/book"
              className="rounded-full bg-moss px-7 py-3.5 text-sm font-medium text-cream ring-1 ring-moss/30 transition-transform hover:-translate-y-0.5"
            >
              Book a consultation
            </Link>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border px-7 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              {SITE.whatsappLabel}
            </a>
          </div>
          <p className="mt-6 text-xs text-foreground/45">
            Initial consultation {PRICING[0]?.price} · {PRICING[0]?.minutes} minutes
          </p>
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