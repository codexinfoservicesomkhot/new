import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Layers, Mail, Phone, MapPin, Send, Check, MessageCircle,
} from "lucide-react";
import PlatformNav, { BrandMark } from "../components/common/PlatformNav.jsx";
import PlatformSocial from "../components/common/PlatformSocial.jsx";
import PhoneInput from "../components/common/PhoneInput.jsx";
import { submitLead } from "../services/leadApi.js";
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

const CHANNELS = [
  {
    icon: Mail,
    title: "Email",
    body: "cresite.in@gmail.com",
    href: "mailto:cresite.in@gmail.com",
    hint: "We reply within one business day",
  },
  {
    icon: Phone,
    title: "Phone / WhatsApp",
    body: "+91 9130859962",
    href: "https://wa.me/919130859962",
    hint: "Mon – Sat, 10 AM – 7 PM IST",
  },
  {
    icon: MapPin,
    title: "Based in India",
    body: "Serving businesses nationwide",
    href: null,
    hint: "Built for local Indian markets",
  },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

  useEffect(() => {
    setPageMeta({
      ...DEFAULT_META,
      title: "Contact us — Cresite",
      description: "Get in touch with the Cresite team. Questions about websites, plans or partnerships — we are happy to help.",
    });
    setLetterFavicon("C", "#5046E5");
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim()) return setError("Please tell us your name.");
    if (!form.phone.trim() && !form.email.trim()) {
      return setError("Please add a phone number or email so we can reply.");
    }

    setBusy(true);
    const res = await submitLead({
      businessSlug: "cresite-platform",
      ...form,
    });
    setBusy(false);

    if (!res.ok) return setError(res.error || "Could not send your message. Please try again.");

    setSent(true);
    setForm({ name: "", phone: "", email: "", message: "" });
    setTimeout(() => setSent(false), 5000);
    return undefined;
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#101014]">
      <PlatformNav />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-black/5">
        <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <FadeIn>
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-indigo-600">
              <MessageCircle size={12} /> Contact
            </span>
            <h1 className="mt-5 max-w-2xl text-balance font-display text-4xl font-bold tracking-tight sm:text-5xl sm:leading-[1.08]">
              Prefer to talk to a human?
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-[16.5px] leading-relaxed text-[#55555E]">
              Questions about plans, categories or getting your site live — send a message and we will get back to you.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Channels + form */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Side channels */}
          <FadeIn className="lg:col-span-2">
            <div className="space-y-4">
              {CHANNELS.map((c) => {
                const inner = (
                  <div className="flex gap-4 rounded-2xl border border-black/8 bg-white p-5 shadow-sm shadow-black/5 transition hover:border-indigo-200">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-indigo-50 text-[#5046E5]">
                      <c.icon size={18} />
                    </span>
                    <div>
                      <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#8E8E96]">{c.title}</p>
                      <p className="mt-1 text-[15px] font-semibold text-[#101014]">{c.body}</p>
                      <p className="mt-0.5 text-[13px] text-[#6B6B73]">{c.hint}</p>
                    </div>
                  </div>
                );
                return c.href ? (
                  <a key={c.title} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                    {inner}
                  </a>
                ) : (
                  <div key={c.title}>{inner}</div>
                );
              })}
            </div>
            <p className="mt-6 text-[13.5px] leading-relaxed text-[#6B6B73]">
              Looking for help with an existing website? Sign in to your{" "}
              <Link to="/dashboard" className="font-semibold text-[#5046E5] hover:underline">
                dashboard
              </Link>{" "}
              or mention your site link in the message.
            </p>
          </FadeIn>

          {/* Form */}
          <FadeIn delay={0.08} className="lg:col-span-3">
            <div className="rounded-[1.75rem] border border-black/8 bg-white p-7 shadow-sm shadow-black/5 sm:p-9">
              <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">Send a message</h2>
              <p className="mt-1.5 text-[14px] text-[#6B6B73]">We usually reply within one business day.</p>

              {sent ? (
                <div className="mt-8 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-emerald-800">
                  <Check size={20} className="mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold">Message sent</p>
                    <p className="mt-0.5 text-[14px]">Thanks — we will get back to you shortly.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-7 space-y-4">
                  <div>
                    <label className="mb-1.5 block text-[12px] font-bold uppercase tracking-[0.12em] text-[#8E8E96]">
                      Name
                    </label>
                    <input
                      className="w-full rounded-xl border border-black/10 bg-[#FBFAF7] px-4 py-3 text-[14.5px] outline-none transition focus:border-indigo-400 focus:bg-white"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Your name"
                      autoComplete="name"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-[12px] font-bold uppercase tracking-[0.12em] text-[#8E8E96]">
                        Phone
                      </label>
                      <PhoneInput
                        value={form.phone}
                        onChange={(value) => setForm((f) => ({ ...f, phone: value }))}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[12px] font-bold uppercase tracking-[0.12em] text-[#8E8E96]">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full rounded-xl border border-black/10 bg-[#FBFAF7] px-4 py-3 text-[14.5px] outline-none transition focus:border-indigo-400 focus:bg-white"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        placeholder="you@example.com"
                        autoComplete="email"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[12px] font-bold uppercase tracking-[0.12em] text-[#8E8E96]">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      className="w-full resize-y rounded-xl border border-black/10 bg-[#FBFAF7] px-4 py-3 text-[14.5px] outline-none transition focus:border-indigo-400 focus:bg-white"
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="How can we help?"
                    />
                  </div>
                  {error && (
                    <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-[13.5px] font-medium text-red-700">
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={busy}
                    className="inline-flex items-center gap-2 rounded-full bg-[#5046E5] px-6 py-3 text-[14px] font-bold text-white shadow-lg shadow-indigo-500/25 transition hover:bg-[#4338CA] disabled:opacity-60"
                  >
                    {busy ? "Sending…" : (
                      <>
                        Send message <Send size={15} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Secondary CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
        <FadeIn>
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-black/8 bg-white px-7 py-8 sm:flex-row sm:items-center sm:px-10">
            <div>
              <h3 className="font-display text-xl font-bold tracking-tight">Want to start building?</h3>
              <p className="mt-1 text-[14.5px] text-[#6B6B73]">Create a free account and publish your first website today.</p>
            </div>
            <Link
              to="/signup"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#101014] px-5 py-2.5 text-[13.5px] font-bold text-white transition hover:bg-[#5046E5]"
            >
              Get started <ArrowRight size={15} />
            </Link>
          </div>
        </FadeIn>
      </section>

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
