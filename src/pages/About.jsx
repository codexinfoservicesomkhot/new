import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Layers, Target, Heart, Sparkles, Users, Rocket, ShieldCheck,
} from "lucide-react";
import PlatformNav, { BrandMark } from "../components/common/PlatformNav.jsx";
import PlatformSocial from "../components/common/PlatformSocial.jsx";
import { useAuth } from "../store/AuthContext.jsx";
import { setPageMeta, setLetterFavicon, DEFAULT_META } from "../utils/businessUtils.js";

const FadeIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const VALUES = [
  {
    icon: Target,
    title: "Built for local businesses",
    body: "Cresite is designed for shops, clinics, salons and service providers who need a real website without learning code or hiring an agency.",
  },
  {
    icon: Sparkles,
    title: "Beautiful by default",
    body: "Every category gets its own design identity — colours, type and layout tuned so your site looks premium from the first draft.",
  },
  {
    icon: Rocket,
    title: "Live in minutes",
    body: "Pick a category, generate content, tweak the details and publish. Share a clean link like cresite.in/your-brand the same day.",
  },
  {
    icon: ShieldCheck,
    title: "You own the story",
    body: "AI drafts are fully editable. Your words, photos and prices stay under your control — nothing is locked behind a black box.",
  },
];

const STATS = [
  { value: "170+", label: "Business categories" },
  { value: "Minutes", label: "To go live" },
  { value: "WhatsApp", label: "Orders & enquiries" },
  { value: "India", label: "Built for local markets" },
];

export default function About() {
  const { isAuthed } = useAuth();
  const ctaTo = isAuthed ? "/create" : "/signup";

  useEffect(() => {
    setPageMeta({
      ...DEFAULT_META,
      title: "About us — Cresite",
      description: "Cresite helps local businesses create professional websites in minutes — no code, no agency, no complexity.",
    });
    setLetterFavicon("C", "#5046E5");
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#101014]">
      <PlatformNav />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-black/5">
        <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-violet-400/15 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <FadeIn>
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-indigo-600">
              <Heart size={12} /> About Cresite
            </span>
            <h1 className="mt-5 max-w-3xl text-balance font-display text-4xl font-bold tracking-tight sm:text-5xl sm:leading-[1.08]">
              A simpler way to bring your business online
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-[16.5px] leading-relaxed text-[#55555E] sm:text-[17.5px]">
              Cresite is a website builder made for Indian local businesses — jewellery stores, clinics, salons, restaurants and hundreds more. We turn your category into a polished, mobile-ready site you can share in minutes.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <FadeIn>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-[2.4rem] sm:leading-[1.1]">
              Why we built Cresite
            </h2>
            <p className="mt-5 text-[15.5px] leading-relaxed text-[#55555E]">
              Most small businesses still rely on WhatsApp status, Instagram and paper visiting cards. A proper website feels expensive, slow or technical. We wanted the opposite: pick your trade, get a design that fits, edit in plain language, and go live — without freelancers, domains or hosting headaches.
            </p>
            <p className="mt-4 text-[15.5px] leading-relaxed text-[#55555E]">
              Whether you sell sarees online, run a clinic or manage a gym, Cresite gives you a professional presence that matches how your customers already message you.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-black/8 bg-white p-6 shadow-sm shadow-black/5"
                >
                  <p className="font-display text-2xl font-bold tracking-tight text-[#5046E5] sm:text-3xl">{s.value}</p>
                  <p className="mt-1.5 text-[13px] font-medium text-[#6B6B73]">{s.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-black/5 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <FadeIn>
            <h2 className="text-center font-display text-3xl font-bold tracking-tight sm:text-[2.4rem]">
              What we stand for
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-[15px] text-[#6B6B73]">
              Clear principles that shape every product decision.
            </p>
          </FadeIn>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {VALUES.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-black/8 bg-[#F7F6F2] p-6 sm:p-7">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-indigo-50 text-[#5046E5]">
                    <v.icon size={20} strokeWidth={2} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold tracking-tight">{v.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-[#55555E]">{v.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <FadeIn>
          <div className="overflow-hidden rounded-[2rem] bg-[#101014] px-8 py-12 text-center text-white sm:px-14 sm:py-16">
            <Users className="mx-auto text-indigo-300" size={28} />
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to put your business online?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-[15px] text-white/65">
              Create a free account and publish a professional website tailored to your category.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to={ctaTo}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[14px] font-bold text-[#101014] transition hover:bg-indigo-50"
              >
                Get started <ArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-[14px] font-semibold text-white transition hover:border-white/50"
              >
                Contact us
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Footer strip */}
      <footer className="border-t border-black/8 bg-[#101014] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <BrandMark />
          <div className="flex flex-wrap gap-5 text-[13.5px] text-white/65">
            <Link to="/about" className="transition hover:text-white">About</Link>
            <Link to="/contact" className="transition hover:text-white">Contact</Link>
            <Link to="/categories" className="transition hover:text-white">Categories</Link>
            <a href="/#pricing" className="transition hover:text-white">Pricing</a>
          </div>
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <PlatformSocial />
            <span className="inline-flex items-center gap-2 text-[12px] text-white/40">
              <Layers size={13} /> © {new Date().getFullYear()} Cresite
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
