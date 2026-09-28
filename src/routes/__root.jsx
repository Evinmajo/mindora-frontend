import { QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useState, useEffect } from "react";

import appCss from "../styles.css?url";
import { SITE } from "@/lib/site";
import logoAsset from "@/assets/midora.png";

// Get API URL from environment variables or default to local backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/resources", label: "Resources" },
  { to: "/contact", label: "Contact" },
];

function WhatsAppButton() {
  return (
    <a
      href={SITE.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label={SITE.whatsappLabel}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full bg-moss py-3 pr-5 pl-4 text-sm font-medium text-cream shadow-lg shadow-moss/30 ring-1 ring-black/10 transition-transform hover:-translate-y-0.5"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
        <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.5A9.9 9.9 0 1 0 12.04 2Zm0 1.8a8.1 8.1 0 1 1-4.13 15.06l-.3-.17-3.05.87.87-2.97-.2-.31A8.1 8.1 0 0 1 12.04 3.8Zm-3.1 3.9c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.23.9 2.42 1.02 2.59.13.17 1.76 2.8 4.3 3.82 2.1.84 2.53.67 2.99.63.46-.04 1.48-.6 1.69-1.19.21-.58.21-1.08.15-1.19-.06-.1-.23-.17-.48-.29s-1.48-.73-1.7-.81c-.23-.09-.4-.13-.56.12-.17.25-.65.81-.79.98-.15.17-.29.19-.54.06a6.7 6.7 0 0 1-1.97-1.22 7.4 7.4 0 0 1-1.36-1.7c-.14-.25-.02-.38.11-.5.11-.12.25-.31.37-.46.12-.16.17-.27.25-.44.08-.17.04-.31-.02-.44-.06-.12-.54-1.36-.76-1.86-.19-.43-.38-.42-.54-.43l-.42-.01Z" />
      </svg>
      {SITE.whatsappLabel}
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-cream/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img
            src={logoAsset}
            alt="Mindora"
            width="2000"
            height=""
            className="h-28 w-auto max-w-80 object-contain sm:h-36 sm:max-w-96"
          />
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-foreground/70 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="transition-colors hover:text-foreground"
              activeProps={{ className: "font-medium text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/book"
            className="rounded-full bg-moss px-5 py-2.5 text-sm font-medium text-cream ring-1 ring-moss/30 transition-transform hover:-translate-y-0.5"
          >
            Book a session
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-full text-foreground/70 ring-1 ring-border md:hidden"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-border px-6 py-4 md:hidden">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm text-foreground/80 hover:bg-secondary"
              activeProps={{ className: "font-medium text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-foreground/55 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <img src={logoAsset} alt="" width="1254" height="1254" className="size-12 rounded-full object-cover" />
          <span className="font-display text-base font-medium text-foreground">
            Mindora Psychology Consultancy
          </span>
        </div>
        <div className="flex flex-col gap-1 sm:items-end">
          <p>{SITE.tagline}</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} Mindora · Online & worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-medium text-foreground">404</h1>
        <h2 className="mt-4 font-display text-xl font-medium text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-moss px-6 py-3 text-sm font-medium text-cream ring-1 ring-moss/30 transition-transform hover:-translate-y-0.5"
          >
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl font-medium tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-moss px-6 py-3 text-sm font-medium text-cream ring-1 ring-moss/30"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-input bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Mindora — Psychology & Wellbeing Consultancy" },
      { name: "description", content: "A safe space for a calmer, healthier you." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Inter:wght@400;500;600&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  // Trigger Render backend warm-up ping as soon as any user lands on the website
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/health`)
      .then((res) => res.json())
      .then((data) => console.log("⚡ Backend warm-up ping response:", data.message))
      .catch((err) => console.warn("Warming up backend server...", err));
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative flex min-h-screen flex-col bg-cream font-body text-ink antialiased selection:bg-sage/30">
        {/* ambient light */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="breathe absolute -top-40 -left-32 size-[520px] rounded-full bg-mist/60 blur-3xl" />
          <div className="absolute top-1/3 -right-40 size-[460px] rounded-full bg-sage/25 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 size-[380px] rounded-full bg-clay/15 blur-3xl" />
        </div>
        <Header />
        <main className="flex-1">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </QueryClientProvider>
  );
}