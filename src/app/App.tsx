import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useSpring, useTransform } from "motion/react";
import {
  BookOpen, Star, Users, Phone, Mail, MessageCircle,
  ChevronLeft, ChevronRight, Menu, X, Award, Heart,
  Mic, BookMarked, GraduationCap, Sparkles, ArrowRight, Check
} from "lucide-react";

// ─── Islamic geometric SVG pattern ───────────────────────────────────────────
function IslamicPattern({ className = "" }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="120" height="120">
      <defs>
        <pattern id="islamic" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4">
            <polygon points="30,2 58,16 58,44 30,58 2,44 2,16" />
            <polygon points="30,10 50,20 50,40 30,50 10,40 10,20" />
            <line x1="30" y1="2" x2="30" y2="10" />
            <line x1="58" y1="16" x2="50" y2="20" />
            <line x1="58" y1="44" x2="50" y2="40" />
            <line x1="30" y1="58" x2="30" y2="50" />
            <line x1="2" y1="44" x2="10" y2="40" />
            <line x1="2" y1="16" x2="10" y2="20" />
            <circle cx="30" cy="30" r="8" />
            <line x1="30" y1="22" x2="30" y2="10" />
            <line x1="30" y1="38" x2="30" y2="50" />
            <line x1="22" y1="30" x2="10" y2="30" />
            <line x1="38" y1="30" x2="50" y2="30" />
          </g>
        </pattern>
      </defs>
      <rect width="120" height="120" fill="url(#islamic)" />
    </svg>
  );
}

const EMAIL_LINK = "https://mail.google.com/mail/?view=cm&fs=1&to=hafizwaleed619@gmail.com&su=Admission%20Inquiry&body=Assalamu%20Alaikum,%20I%20would%20like%20to%20know%20more%20about%20Tajweedi%20Quran%20Academy.";

// ─── Animated Counter ────────────────────────────────────────────────────────
function AnimatedCounter({ value, suffix = "" }: { value: number, suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const spring = useSpring(0, { stiffness: 45, damping: 25 });
  const display = useTransform(spring, (v) => Math.floor(v).toLocaleString() + suffix);

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["Home", "Courses", "About", "Demo", "Testimonials", "Contact"];

  const scroll = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "top-0 backdrop-blur-xl bg-white/80 shadow-lg shadow-emerald-900/10 border-b border-border"
            : "top-0 bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => scroll("home")} className="flex items-center group">
            <img src="/assets/img/logo.svg" alt="Tajweedi Academy" className="w-[180px] md:w-[220px] lg:w-[280px] h-auto transition-transform group-hover:scale-[1.02]" />
          </button>

          <div className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <button
                key={l}
                onClick={() => scroll(l === "Home" ? "home" : l.toLowerCase())}
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
              >
                {l}
              </button>
            ))}
            <button
              onClick={() => scroll("contact")}
              className="ml-2 px-4 py-2 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Enroll Now
            </button>
          </div>

          <button className="md:hidden text-foreground" onClick={() => setOpen((o) => !o)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-white/95 backdrop-blur-xl border-b border-border px-6 pb-6 pt-2 flex flex-col gap-4"
            >
              {links.map((l) => (
                <button
                  key={l}
                  onClick={() => scroll(l === "Home" ? "home" : l.toLowerCase())}
                  className="text-left text-base font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  {l}
                </button>
              ))}
              <button
                onClick={() => scroll("contact")}
                className="w-full py-3 rounded-full bg-primary text-white text-sm font-medium"
              >
                Enroll Now
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B6E4F] via-[#085a40] to-[#0a3d2b]" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#C8A951]/20 blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#0B6E4F]/40 blur-[100px] animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
      </div>
      <div className="absolute inset-0 text-white/5 overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
          {Array.from({ length: 64 }).map((_, i) => (
            <IslamicPattern key={i} className="w-full h-full" />
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-40 opacity-10">
        <svg viewBox="0 0 1440 160" className="w-full h-full" preserveAspectRatio="none">
          <path
            d="M0,160 L0,120 L60,120 L60,80 L80,80 L80,60 L100,40 L120,60 L120,80 L140,80 L140,120
               L200,120 L200,100 L240,60 L260,30 L280,10 L300,30 L320,60 L360,100 L360,120
               L500,120 L500,140 L540,140 L540,120 L600,120 L600,100 L640,70 L660,50 L680,30 L700,10
               L720,30 L740,50 L760,70 L800,100 L800,120 L900,120 L900,140 L940,140 L940,120
               L1000,120 L1000,100 L1040,80 L1060,60 L1080,40 L1100,60 L1120,80 L1140,100 L1140,120
               L1200,120 L1200,80 L1220,80 L1220,60 L1240,40 L1260,60 L1260,80 L1280,80 L1280,120
               L1440,120 L1440,160 Z"
            fill="white"
          />
        </svg>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-white/80 text-sm font-medium mb-4 backdrop-blur-sm">
            <Sparkles size={13} className="text-[#C8A951]" />
            Admissions Open at Tajweedi Quran Academy
          </div>

          <span className="hero-salam block text-[#E8D28C] text-xl mb-2 font-arabic">
            Assalamu Alaikum 🌸
          </span>
          <h1 className="font-['Playfair_Display'] text-4xl md:text-6xl lg:text-7xl font-500 text-white leading-tight mb-6 tracking-normal">
            Learn Quran with <br className="hidden md:block" />
            <span className="text-[#C8A951] italic">Beautiful Voice</span> & Perfect Tajweed
          </h1>
          <p className="hero-sub text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed text-lg font-300">
            Brighten your child's future with the light of the Quran. 🌸 Structured Nazra, Hifz, Tajweed
            and Makharij classes taught by experienced, child-friendly teachers — online or physically.
          </p>
          <div className="w-full flex flex-col items-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full">
              <div className="hidden md:block w-[240px]" />
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-10 py-4 rounded-full bg-[#C8A951] text-[#0D1F17] font-bold text-base hover:bg-[#d4b55e] transition-all hover:shadow-[0_0_30px_rgba(200,169,81,0.4)] active:scale-95 z-10"
              >
                Join Now
              </button>
              <button
                onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full md:w-[240px] px-8 py-4 rounded-full bg-white/10 text-white font-semibold text-base border border-white/20 hover:bg-white/20 transition-all active:scale-95 text-center whitespace-nowrap"
              >
                Free Demo Class
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────
function Stats() {
  const stats = [
    { icon: <Users />, val: 500, suffix: "+", label: "Students Taught" },
    { icon: <Star />, val: 8, suffix: "+", label: "Years Experience" },
    { icon: <Check />, val: 3, suffix: " Days", label: "Free Demo" },
    { icon: <Sparkles />, val: 100, suffix: "%", label: "Tajweed Focused" },
  ];
  return (
    <div className="bg-[#052A20] py-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
              {s.icon}
            </div>
            <div className="text-3xl font-700 text-white font-['Playfair_Display']">
              <AnimatedCounter value={s.val} suffix={s.suffix} />
            </div>
            <div className="text-white/40 text-sm uppercase tracking-wider mt-1">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Courses ──────────────────────────────────────────────────────────────────
function Courses() {
  const courses = [
    {
      title: "Nazra Quran",
      desc: "Learn to read the Quran fluently with correct pronunciation, starting from Noorani Qaida through to complete Quran reading.",
      icon: <BookOpen />,
      tags: ["Beginner Friendly", "Online & Physical"],
    },
    {
      title: "Hifz Quran",
      desc: "Complete Quran memorisation with a proven daily revision system to make Hifz lasting and strong.",
      icon: <Star />,
      tags: ["Structured Revision", "All Ages"],
    },
    {
      title: "Tajweed Rules",
      desc: "Master the rules of Tajweed — Noon Sakinah, Meem Sakinah, Madd, Qalqalah and more — with practice.",
      icon: <Mic />,
      tags: ["Rule-by-Rule", "Practice Focused"],
    },
    {
      title: "Makharij ul Huroof",
      desc: "Precise training on the correct articulation points of Arabic letters — the foundation of beautiful recitation.",
      icon: <Sparkles />,
      tags: ["Voice Training", "One-on-One"],
    },
  ];

  return (
    <section id="courses" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-primary font-semibold tracking-widest uppercase text-xs mb-3">Our Courses</div>
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-700 text-foreground mb-4">
            Structured Learning, Step by Step
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-card p-8 rounded-3xl border border-border hover:border-primary transition-all hover:shadow-2xl hover:shadow-emerald-900/10 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                {c.icon}
              </div>
              <h3 className="text-xl font-700 text-foreground mb-3 font-['Playfair_Display']">{c.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">{c.desc}</p>
              <div className="flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <span key={t} className="text-[10px] font-semibold bg-muted px-2 py-1 rounded-md text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About ───────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-emerald-900 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center text-[#C8A951]/20">
              <BookOpen size={200} strokeWidth={0.5} />
            </div>
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <div className="text-4xl font-arabic mb-2">اقرأ</div>
              <p className="text-white/60 text-sm italic">"Recite in the name of your Lord who created"</p>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-3xl shadow-xl shadow-emerald-900/10 border border-border hidden md:block">
            <div className="text-4xl font-700 text-primary font-['Playfair_Display']">8+</div>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Years of Trust</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-primary font-semibold tracking-widest uppercase text-xs mb-3">About the Academy</div>
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-700 text-foreground mb-6">
            A Home for the Quran, Built on Trust & Tarbiyah
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Tajweedi Quran Academy was founded with one purpose — to make correct, beautiful Quran
            recitation accessible to every child and adult. Every class blends traditional Tajweed
            discipline with a warm, patient teaching style.
          </p>

          <div className="space-y-6">
            {[
              { t: "Our Mission", d: "To teach every student to recite with correct Tajweed and love for Allah's words.", i: <GraduationCap /> },
              { t: "Our Vision", d: "A generation of confident Huffaz who carry the Quran's light into their daily lives.", i: <Star /> },
              { t: "Why Trust Us", d: "Experienced teachers, flexible scheduling, and child-friendly classrooms.", i: <Award /> }
            ].map((p, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-border shadow-sm flex items-center justify-center text-primary flex-shrink-0">
                  {p.i}
                </div>
                <div>
                  <h4 className="font-700 text-foreground mb-1">{p.t}</h4>
                  <p className="text-muted-foreground text-sm">{p.d}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  const [idx, setIdx] = useState(0);
  const items = [
    { q: "My son's Tajweed has improved so much in just two months. The teacher is patient and genuinely cares.", n: "Ayesha R.", r: "Parent — Nazra Class" },
    { q: "The free demo classes convinced us instantly. Flexible timing works perfectly with our schedule.", n: "Muhammad F.", r: "Parent — Hifz Class" },
    { q: "Makharij training here is excellent — my daughter's pronunciation has become so much clearer.", n: "Sana K.", r: "Parent — Makharij Class" }
  ];

  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="text-primary font-semibold tracking-widest uppercase text-xs mb-3">Testimonials</div>
        <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-700 text-foreground mb-16">
          What Parents Are Saying
        </h2>

        <div className="relative h-64 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute"
            >
              <Sparkles size={40} className="text-primary/10 mx-auto mb-6" />
              <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed mb-8 italic">
                "{items[idx].q}"
              </p>
              <div className="font-bold text-foreground text-lg">{items[idx].n}</div>
              <div className="text-muted-foreground text-sm">{items[idx].r}</div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${i === idx ? "bg-primary w-8" : "bg-muted"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
function Gallery() {
  const imgs = [
    { src: "https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=800&auto=format&fit=crop", alt: "Quran Study" },
    { src: "https://images.unsplash.com/photo-1590076215667-8739973663b4?q=80&w=800&auto=format&fit=crop", alt: "Student Reading" },
    { src: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800&auto=format&fit=crop", alt: "Islamic Education" },
    { src: "https://images.unsplash.com/photo-1597933534024-16499806b12c?q=80&w=800&auto=format&fit=crop", alt: "Classroom" },
    { src: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=800&auto=format&fit=crop", alt: "Memorization" },
  ];

  return (
    <section id="gallery" className="py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-primary font-semibold tracking-widest uppercase text-xs mb-3">Gallery</div>
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-700 text-foreground mb-4">
            A Glimpse Into Our Classes
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {imgs.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className={`relative overflow-hidden rounded-xl bg-muted ${i === 0 ? "md:row-span-2" : ""}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className={`w-full object-cover ${i === 0 ? "h-full min-h-[280px]" : "h-44"}`}
              />
              <div className="absolute inset-0 bg-primary/0 hover:bg-primary/20 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", course: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation is handled by HTML5 attributes (required, type="email")
    // but we can double check here
    if (!form.name || !form.email) return;

    setLoading(true);

    // Build WhatsApp message
    let waMessage = `New Admission Inquiry\n`;
    waMessage += `Name: ${form.name}\n`;
    waMessage += `Phone: ${form.phone || 'Not provided'}\n`;
    waMessage += `Email: ${form.email}\n`;
    waMessage += `Course: ${form.course || 'Not selected'}\n`;
    waMessage += `Message: ${form.message || 'Not provided'}`;

    const encodedMsg = encodeURIComponent(waMessage);
    const waUrl = `https://wa.me/923266336947?text=${encodedMsg}`;

    // Show feedback and redirect
    setTimeout(() => {
      window.open(waUrl, '_blank');
      setSent(true);
      setLoading(false);
      setForm({ name: "", email: "", phone: "", course: "", message: "" });
      setTimeout(() => setSent(false), 5000);
    }, 1000);

    /*
    // --- LEGACY BACKEND INTEGRATION (Commented for later) ---
    // fetch('/api/contact', { ... })
    */
  };

  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-primary font-semibold tracking-widest uppercase text-xs mb-3">Get In Touch</div>
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-700 text-foreground mb-6">
            Start Your Child's Quran Journey Today
          </h2>
          <p className="text-muted-foreground text-lg mb-10">
            Reach out for admissions, free demo classes, or any questions. We reply within 24 hours.
          </p>

          <div className="grid gap-4">
            <a
              href="https://wa.me/923266336947"
              target="_blank"
              rel="noopener"
              className="flex items-center gap-4 p-5 bg-card rounded-2xl border border-border hover:border-primary hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <MessageCircle size={22} className="text-green-600" />
              </div>
              <div>
                <div className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                  WhatsApp Support
                </div>
                <div className="text-muted-foreground text-sm">+92 326 6336947</div>
              </div>
              <ArrowRight size={16} className="ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
            </a>

            <a
              href={EMAIL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 bg-card rounded-2xl border border-border hover:border-primary hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Mail size={22} className="text-primary" />
              </div>
              <div>
                <div className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                  Email
                </div>
                <div className="text-muted-foreground text-sm">hafizwaleed619@gmail.com</div>
              </div>
              <ArrowRight size={16} className="ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
            </a>

            <a
              href="tel:+923266336947"
              className="flex items-center gap-4 p-5 bg-card rounded-2xl border border-border hover:border-primary hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <Phone size={22} className="text-accent-foreground" />
              </div>
              <div>
                <div className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                  Phone / Call
                </div>
                <div className="text-muted-foreground text-sm">+92 326 6336947</div>
              </div>
              <ArrowRight size={16} className="ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <form
            onSubmit={handleSubmit}
            className="bg-card rounded-2xl border border-border p-8 flex flex-col gap-5"
          >
            <h3 className="font-['Playfair_Display'] text-2xl font-700 text-foreground">
              Register for FREE Demo
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-foreground/70 mb-1.5 uppercase tracking-wide">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-input-background border border-border text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground/70 mb-1.5 uppercase tracking-wide">
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  placeholder="+92 300 1234567"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-input-background border border-border text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground/70 mb-1.5 uppercase tracking-wide">
                Email Address
              </label>
              <input
                required
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-input-background border border-border text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground/70 mb-1.5 uppercase tracking-wide">
                Course of Interest
              </label>
              <select
                value={form.course}
                onChange={(e) => setForm({ ...form, course: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-input-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              >
                <option value="">Select a course...</option>
                <option value="nazra">Nazra (Quran Reading)</option>
                <option value="hifz">Hifz (Memorization)</option>
                <option value="tajweed">Tajweed (Rules of Recitation)</option>
                <option value="makharij">Makharij (Articulation)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground/70 mb-1.5 uppercase tracking-wide">
                Message (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Any specific requirements or questions..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-input-background border border-border text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-primary text-white font-semibold text-base hover:bg-primary/90 transition-all active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                "Opening WhatsApp..."
              ) : sent ? (
                <>
                  <Check size={18} className="text-[#C8A951]" />
                  JazakAllah Khair! Please tap Send in WhatsApp.
                </>
              ) : (
                "Register for FREE Demo"
              )}
            </button>

            <p className="text-center text-xs text-muted-foreground">
              By registering you agree to our privacy policy. No spam, ever.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#052A20] pt-24 pb-12 text-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16 border-b border-white/5 pb-16">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <BookOpen size={15} className="text-white" />
            </div>
            <div className="font-['Playfair_Display'] font-700 text-lg">Tajweedi</div>
          </div>
          <p className="text-white/50 text-sm leading-relaxed mb-6">
            Brighten your child's future with the light of the Quran. Nazra, Hifz, Tajweed and Makharij
            classes — online and physically.
          </p>
          <div className="flex gap-4">
            <a href="https://wa.me/923266336947" target="_blank" rel="noopener" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
              <MessageCircle size={16} />
            </a>
            <a href={EMAIL_LINK} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
              <Mail size={16} />
            </a>
            <a href="tel:+923266336947" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
              <Phone size={16} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-[#C8A951]">Quick Links</h4>
          <div className="flex flex-col gap-3 text-white/50 text-sm">
            {["About", "Courses", "Free Demo", "Why Us", "Gallery", "Contact"].map((l) => (
              <button key={l} onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" })} className="text-left hover:text-white transition-colors">
                {l}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-[#C8A951]">Courses</h4>
          <div className="flex flex-col gap-3 text-white/50 text-sm">
            {["Nazra Quran", "Hifz Quran", "Tajweed Rules", "Makharij ul Huroof"].map((l) => (
              <button key={l} onClick={() => document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" })} className="text-left hover:text-white transition-colors">
                {l}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-[#C8A951]">Contact Us</h4>
          <div className="flex flex-col gap-3 text-white/50 text-sm">
            <a href="https://wa.me/923266336947" target="_blank" rel="noopener" className="flex items-center gap-2 hover:text-white transition-colors">
              <MessageCircle size={15} className="text-green-400" /> +92 326 6336947
            </a>
            <a href={EMAIL_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail size={15} className="text-[#C8A951]" /> hafizwaleed619@gmail.com
            </a>
            <a href="tel:+923266336947" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone size={15} className="text-[#C8A951]" /> +92 326 6336947
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 flex flex-col md:row justify-between items-center gap-4 text-white/30 text-xs">
        <div>© {new Date().getFullYear()} Tajweedi Quran Academy. All rights reserved.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="bg-background text-foreground font-['Jost']">
      <Nav />
      <Hero />
      <Stats />
      <About />
      <Courses />
      <Testimonials />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
}
