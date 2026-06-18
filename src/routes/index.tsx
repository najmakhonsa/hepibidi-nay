import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday, Nay 🌱" },
      { name: "description", content: "A little pixel meadow for Nayla Faiza Labiba's 22nd birthday — from Iyo, with love." },
      { property: "og:title", content: "Happy Birthday, Nay 🌱" },
      { property: "og:description", content: "A pixel world made just for Nay's 22nd birthday." },
    ],
  }),
  component: BirthdayPage,
});

const drive = (id: string) => `https://drive.google.com/thumbnail?id=${id}&sz=w1200`;

const PHOTOS = {
  sobakOld: [
    "1VLouKh70qDW4dIYXkpsmKzooIOQ_3yGp",
    "1JLPBFKXY4h8E5MqOjYzbPuvu8UQx3R83",
    "1oOaLx4RQ31TW94r12xtxd17iSqcFp5U4",
  ],
  sobakNew: [
    "1grZ7LOqBtJ-H2vCSnO9riQP4BGkMyHNT",
    "1LR3q8EROgPcStFRgcJqePnpPqLMHzB6r",
    "1xgJyLchEDLj1wGWMVNJJhN6UVJCs-Sz-",
  ],
  nay: [
    "1r9VlPd7hAVHIpMsUvHmwMzz30ImS-rHC",
    "1Q1KlZCd8XCU7hLY3g44dVPPfeRSRjOnB",
    "1NRsTIG_zrs83tE13f10c9icDCUa3NYaS",
  ],
  iyoNay: [
    "11FRNZ33sHvDOyUpIPC2YnRlugZcpnKwL",
    "1h5DEVhUO0SWmRlZ9NYiumL5q_yykDFKN",
  ],
};

// Japan time (JST, UTC+9) — that's where Nay is right now
const BIRTHDAY = new Date("2026-06-19T00:00:00+09:00");

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = target.getTime() - now.getTime();
  const done = diff <= 0;
  const safe = Math.max(0, diff);
  return {
    d: Math.floor(safe / 86400000),
    h: Math.floor((safe / 3600000) % 24),
    m: Math.floor((safe / 60000) % 60),
    s: Math.floor((safe / 1000) % 60),
    done,
  };
}

function PixelImg({ id, alt, className = "" }: { id: string; alt: string; className?: string }) {
  return (
    <img
      src={drive(id)}
      alt={alt}
      loading="lazy"
      className={`block w-full h-full object-cover ${className}`}
      referrerPolicy="no-referrer"
    />
  );
}

function Sparkles({ count = 18 }: { count?: number }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 2,
        size: 6 + Math.random() * 10,
      })),
    [count],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute anim-sparkle font-pixel"
          style={{
            left: `${s.left}%`, top: `${s.top}%`, fontSize: s.size,
            animationDelay: `${s.delay}s`, color: "var(--pink-deep)",
          }}
        >✦</span>
      ))}
    </div>
  );
}

/* ---------------- GATE ---------------- */
function Gate({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 py-16">
      <Sparkles />
      <div className="relative max-w-lg w-full text-center bg-card pixel-border p-8 md:p-12 anim-pop">
        <div className="font-pixel text-xs md:text-sm text-primary mb-4">✦ a wild website appears ✦</div>
        <h1 className="font-pixel text-2xl md:text-4xl leading-relaxed text-foreground mb-6">
          ARE YOU<br/>NAY?
        </h1>
        <p className="font-retro text-2xl text-muted-foreground mb-2">
          this was made for one person only.
        </p>
        <p className="font-retro text-xl text-muted-foreground mb-8">
          (if your name is Nay… press the button 🌱)
        </p>
        <button onClick={onEnter} className="pixel-btn anim-float">YES, IT'S ME →</button>
        <p className="mt-6 font-retro text-lg" style={{ color: "var(--pink-deep)" }}>
          a tiny gift from iyow :3
        </p>
      </div>
    </div>
  );
}

/* ---------------- COUNTDOWN ---------------- */
function Countdown({ onCelebrate, canCelebrate }: { onCelebrate: () => void; canCelebrate: boolean }) {
  const { d, h, m, s, done } = useCountdown(BIRTHDAY);
  const cells = [
    { label: "days", v: d }, { label: "hrs", v: h },
    { label: "min", v: m }, { label: "sec", v: s },
  ];
  return (
    <div className="text-center">
      <div className="font-pixel text-xs md:text-sm text-primary mb-4">
        {done ? "✦ THE DAY IS HERE ✦" : "✦ counting down to june 19 ✦"}
      </div>
      <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-2xl mx-auto">
        {cells.map((c) => (
          <div key={c.label} className="pixel-border-pink bg-card p-3 md:p-5 hover-float" style={{ ["--tilt" as string]: "0deg" }}>
            <div className="font-pixel text-xl md:text-4xl text-foreground">
              {String(c.v).padStart(2, "0")}
            </div>
            <div className="font-pixel text-[8px] md:text-[10px] mt-2" style={{ color: "var(--pink-deep)" }}>
              {c.label}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <button
          onClick={canCelebrate ? onCelebrate : undefined}
          disabled={!canCelebrate}
          className="pixel-btn pixel-btn-pink disabled:opacity-50 disabled:cursor-not-allowed"
          title={canCelebrate ? "Click for fireworks 🎆" : "Unlocks on June 19"}
        >
          {canCelebrate ? "🎆 LAUNCH FIREWORKS" : "🔒 LOCKED UNTIL JUNE 19"}
        </button>
      </div>
    </div>
  );
}

/* ---------------- CELEBRATION OVERLAY ---------------- */
function Celebration({ onClose }: { onClose: () => void }) {
  // 8 firework bursts at random positions
  const fireworks = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: 10 + Math.random() * 80,
    top: 15 + Math.random() * 55,
    delay: Math.random() * 2.5,
    color: ["var(--pink-deep)","var(--primary)","oklch(0.75 0.18 60)","oklch(0.65 0.2 320)"][i % 4],
  })), []);
  const confetti = useMemo(() => Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 3,
    color: ["var(--pink)","var(--primary-glow)","var(--accent)","var(--pink-deep)"][i % 4],
    size: 6 + Math.random() * 8,
  })), []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/70 backdrop-blur-sm overflow-hidden">
      {/* confetti */}
      {confetti.map(c => (
        <span key={c.id} className="absolute top-0" style={{
          left: `${c.left}%`,
          width: c.size, height: c.size, background: c.color,
          animation: `confetti-fall ${c.duration}s linear ${c.delay}s infinite`,
        }}/>
      ))}
      {/* fireworks bursts */}
      {fireworks.map(f => (
        <div key={f.id} className="absolute" style={{ left: `${f.left}%`, top: `${f.top}%` }}>
          {Array.from({ length: 14 }, (_, i) => {
            const angle = (i / 14) * Math.PI * 2;
            const r = 90 + Math.random() * 40;
            return (
              <span key={i} className="absolute block" style={{
                width: 8, height: 8, background: f.color, borderRadius: 0,
                ["--dx" as string]: `${Math.cos(angle) * r}px`,
                ["--dy" as string]: `${Math.sin(angle) * r}px`,
                animation: `firework-burst 1.4s ease-out ${f.delay + i * 0.02}s infinite`,
              }}/>
            );
          })}
        </div>
      ))}
      <div className="relative text-center px-6">
        <h2 className="font-pixel text-3xl md:text-7xl leading-[1.3] anim-title-pop drop-shadow-[4px_4px_0_var(--foreground)]">
          HAPPY<br/>BIRTHDAY<br/>NAY!
        </h2>
        <p className="mt-8 font-retro text-2xl md:text-3xl text-background">
          22 looks SO good on you ♡
        </p>
        <button onClick={onClose} className="pixel-btn pixel-btn-cream mt-8">close ✕</button>
      </div>
    </div>
  );
}

/* ---------------- QUIZ ---------------- */
const QUIZ = [
  {
    q: "Who loves Nay the most?",
    options: ["iyow", "leon", "ayel"],
    answer: 0,
    reply: "obviously me duhh",
  },
  {
    q: "Who does iyow miss the most right now?",
    options: ["Nay 🥺", "Bahlil", "Daddy Sylus"],
    answer: 0,
    reply: "RRRAAAHHHH WHEN WILL WE MEET.",
  },
  {
    q: "Who will be your husband :3 ?",
    options: ["Daddy Leon", "ayel", "caleb", "semuanya lah"],
    answer: 3,
    reply: "AMEN",
  },
  {
    q: "What anime brought us together?",
    options: ["Free!", "Naruto", "twilight knock off <3"],
    answer: 2,
    reply: "HAHAH",
  },
  {
    q: "Who iyow & Nay hate the most??",
    options: ["pomko", "bahlil", "prabowo <3"],
    answer: 2,
    reply: "mbg",
  },
];

function MiniBurst() {
  // tiny confetti burst around the picked answer
  const bits = useMemo(() => Array.from({ length: 14 }, (_, i) => {
    const angle = (i / 14) * Math.PI * 2;
    const r = 50 + Math.random() * 40;
    return {
      i,
      dx: Math.cos(angle) * r,
      dy: Math.sin(angle) * r,
      color: ["var(--primary)","var(--pink-deep)","var(--accent)","var(--primary-glow)"][i % 4],
    };
  }), []);
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {bits.map(b => (
        <span key={b.i} className="absolute block" style={{
          width: 8, height: 8, background: b.color,
          ["--dx" as string]: `${b.dx}px`,
          ["--dy" as string]: `${b.dy}px`,
          animation: "mini-burst .9s ease-out forwards",
        }}/>
      ))}
    </div>
  );
}

function Quiz({ onPass }: { onPass: () => void }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [wrong, setWrong] = useState(false);
  const [passed, setPassed] = useState(false);

  const current = QUIZ[i];

  const pick = (idx: number) => {
    if (picked !== null || passed) return;
    setPicked(idx);
    if (idx !== current.answer) {
      setWrong(true);
      setTimeout(() => { setPicked(null); setWrong(false); }, 1400);
    }
  };

  const next = () => {
    if (i + 1 >= QUIZ.length) {
      setPassed(true);
      setTimeout(onPass, 2200);
    } else {
      setI(i + 1); setPicked(null);
    }
  };

  if (passed) {
    return (
      <div className="relative bg-card pixel-border p-8 md:p-14 text-center overflow-hidden">
        <Sparkles count={24} />
        <div className="relative">
          <div className="text-6xl md:text-8xl mb-4 anim-pop">🎉</div>
          <h3 className="font-pixel text-xl md:text-3xl anim-title-pop mb-4">YAY! YOU PASSED!</h3>
          <p className="font-retro text-2xl text-muted-foreground">unlocking the rest of your world…</p>
        </div>
      </div>
    );
  }

  const isCorrect = picked !== null && picked === current.answer;

  return (
    <div className={`relative bg-card pixel-border p-6 md:p-10 transition-transform ${wrong ? "anim-wiggle" : ""}`}>
      {isCorrect && <MiniBurst />}
      <div className="flex items-center justify-between mb-4">
        <span className="font-pixel text-[10px] text-primary">Q {i + 1} / {QUIZ.length}</span>
        <span className="font-pixel text-[10px]" style={{ color: "var(--pink-deep)" }}>
          {wrong ? "nope — try again" : "all-correct = unlock"}
        </span>
      </div>
      <h3 className="font-pixel text-base md:text-xl leading-relaxed text-foreground mb-6">
        {current.q}
      </h3>
      <div className="grid gap-3">
        {current.options.map((opt, idx) => {
          const correct = picked === idx && idx === current.answer;
          const incorrect = picked === idx && idx !== current.answer;
          return (
            <button
              key={idx}
              onClick={() => pick(idx)}
              disabled={picked !== null}
              className="pixel-border-sm bg-background text-left p-3 md:p-4 font-retro text-xl hover-float"
              style={{
                background: correct ? "var(--primary)" : incorrect ? "var(--pink)" : undefined,
                color: correct ? "var(--primary-foreground)" : undefined,
                cursor: picked === null ? "pointer" : "default",
              }}
            >
              {String.fromCharCode(65 + idx)}. {opt}
            </button>
          );
        })}
      </div>
      {isCorrect && (
        <div className="mt-6 anim-pop">
          <p className="font-retro text-xl text-muted-foreground mb-4">→ {current.reply}</p>
          <button onClick={next} className="pixel-btn">
            {i + 1 >= QUIZ.length ? "finish ✨" : "next →"}
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------------- MINI GAME: blow out the candles ---------------- */
function CakeGame() {
  const TOTAL = 6;
  const [out, setOut] = useState<boolean[]>(() => Array(TOTAL).fill(false));
  const [wished, setWished] = useState(false);
  const allOut = out.every(Boolean);

  const blow = (i: number) => {
    if (out[i]) return;
    setOut((prev) => prev.map((v, idx) => (idx === i ? true : v)));
  };
  const reset = () => { setOut(Array(TOTAL).fill(false)); setWished(false); };

  useEffect(() => {
    if (allOut && !wished) {
      const t = setTimeout(() => setWished(true), 700);
      return () => clearTimeout(t);
    }
  }, [allOut, wished]);

  const remaining = out.filter((v) => !v).length;

  return (
    <div className="bg-card pixel-border p-5 md:p-8">
      <div className="flex items-center justify-between mb-3">
        <span className="font-pixel text-[10px] text-primary">▸ blow out the candles</span>
        <span className="font-pixel text-[10px]" style={{ color: "var(--pink-deep)" }}>
          {wished ? "wish made ♡" : allOut ? "make a wish…" : `${remaining} left`}
        </span>
      </div>

      <div className="relative h-80 md:h-96 pixel-border-sm overflow-hidden meadow-bg flex items-end justify-center pb-6">
        {/* candles */}
        <div className="absolute top-10 md:top-14 left-1/2 -translate-x-1/2 flex gap-3 md:gap-5 z-10">
          {out.map((isOut, i) => (
            <button
              key={i}
              onClick={() => blow(i)}
              className="relative flex flex-col items-center group"
              aria-label={`candle ${i + 1}`}
            >
              {/* flame */}
              <span
                className="block w-3 h-4 md:w-4 md:h-5 mb-1 transition-all duration-300"
                style={{
                  background: isOut ? "transparent" : "oklch(0.82 0.18 70)",
                  boxShadow: isOut ? "none" : "0 0 12px oklch(0.85 0.2 60), 0 0 4px oklch(0.95 0.15 90)",
                  borderRadius: "40% 40% 50% 50% / 60% 60% 40% 40%",
                  animation: isOut ? "none" : `float-up 0.6s ease-in-out ${i * 0.1}s infinite`,
                }}
              />
              {/* smoke when out */}
              {isOut && (
                <span className="absolute -top-3 text-xs opacity-60 anim-float" aria-hidden>💨</span>
              )}
              {/* candle stick */}
              <span
                className="block w-2.5 md:w-3 h-14 md:h-20 pixel-border-sm group-hover:scale-110 transition-transform"
                style={{ background: ["var(--pink)","var(--accent)","var(--primary-glow)"][i % 3] }}
              />
            </button>
          ))}
        </div>

        {/* cake */}
        <div className="relative z-0 w-72 md:w-96">
          {/* top tier (frosting) */}
          <div className="h-8 md:h-10 pixel-border-pink mx-6 md:mx-8" style={{ background: "var(--pink)" }} />
          {/* mid tier */}
          <div className="h-14 md:h-20 pixel-border mx-2 md:mx-3 -mt-1" style={{ background: "var(--accent)" }} />
          {/* bottom tier */}
          <div className="h-16 md:h-24 pixel-border -mt-1" style={{ background: "var(--primary-glow)" }} />
        </div>

        {/* overlay when all out */}
        {allOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-card/85 backdrop-blur-sm anim-pop">
            <div className="text-center px-6">
              <div className="text-5xl md:text-6xl mb-3">{wished ? "🎂✨" : "🤫"}</div>
              <p className="font-pixel text-sm md:text-lg mb-3" style={{ color: "var(--pink-deep)" }}>
                {wished ? "may your wish come true, nay" : "close your eyes and wish…"}
              </p>
              <button onClick={reset} className="pixel-btn pixel-btn-pink mt-2">light them again ↻</button>
            </div>
          </div>
        )}
      </div>

      <p className="mt-3 text-center font-retro text-lg text-muted-foreground">
        tap each candle to blow it out 🕯️
      </p>
    </div>
  );
}

/* ---------------- SCROLL REVEAL ---------------- */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setVisible(true); return; }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) { setVisible(true); io.unobserve(e.target); }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------------- GALLERY (swipeable + lightbox) ---------------- */
function Lightbox({ ids, index, onClose, onPrev, onNext }: {
  ids: string[]; index: number; onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose, onPrev, onNext]);

  // swipe support
  const touchStart = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (dx > 50) onPrev();
    else if (dx < -50) onNext();
    touchStart.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-[60] bg-foreground/90 backdrop-blur-sm flex items-center justify-center px-4 anim-pop"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 pixel-btn pixel-btn-cream !p-3 z-10"
        aria-label="previous"
      >←</button>
      <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
        <div className="bg-card pixel-border p-3 md:p-4">
          <div className="aspect-square md:aspect-[4/5] bg-muted overflow-hidden">
            <PixelImg id={ids[index]} alt={`photo ${index + 1}`} />
          </div>
          <div className="flex items-center justify-between pt-3">
            <span className="font-pixel text-[10px] text-primary">{index + 1} / {ids.length}</span>
            <button onClick={onClose} className="font-pixel text-[10px]" style={{color:"var(--pink-deep)"}}>close ✕</button>
          </div>
        </div>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 pixel-btn pixel-btn-cream !p-3 z-10"
        aria-label="next"
      >→</button>
    </div>
  );
}

function SwipeGallery({ ids, label, captions }: { ids: string[]; label: string; captions?: string[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div>
      <div className="flex items-center justify-between mb-2 px-2">
        <div className="font-pixel text-[10px] md:text-xs text-primary">▸ {label}</div>
        <div className="font-pixel text-[9px] md:text-[10px]" style={{color:"var(--pink-deep)"}}>← swipe →</div>
      </div>
      <div className="swipe-rail">
        {ids.map((id, i) => {
          const tilt = (i % 2 === 0 ? -1 : 1) * (1 + (i % 3));
          return (
            <button
              key={id}
              onClick={() => setOpen(i)}
              className="swipe-card bg-card pixel-border p-2 hover-float text-left"
              style={{ ["--tilt" as string]: `${tilt}deg`, transform: `rotate(${tilt}deg)` }}
              aria-label={`open photo ${i + 1}`}
            >
              <div className="aspect-square overflow-hidden bg-muted">
                <PixelImg id={id} alt={captions?.[i] ?? "photo"} />
              </div>
              {captions?.[i] && (
                <div className="pt-2 pb-1 text-center font-retro text-lg text-muted-foreground">{captions[i]}</div>
              )}
              <div className="pt-1 text-center font-pixel text-[8px]" style={{color:"var(--pink-deep)"}}>tap to zoom 🔍</div>
            </button>
          );
        })}
      </div>
      {open !== null && (
        <Lightbox
          ids={ids}
          index={open}
          onClose={() => setOpen(null)}
          onPrev={() => setOpen(o => o === null ? 0 : (o - 1 + ids.length) % ids.length)}
          onNext={() => setOpen(o => o === null ? 0 : (o + 1) % ids.length)}
        />
      )}
    </div>
  );
}

/* ---------------- PROUD + GOOD ---------------- */
const PROUD = [
  { emoji: "🌱", title: "YOU ARE ALIVE", body: "i'm proud you stayed. you survive all this years. ugh no one is stronger than you." },
  { emoji: "🏠", title: "you built your own safe place", body: "despite ur npd parents, still, YOU CHOSE to grow into someone gentle, careful, and loving. you became the home you needed." },
  { emoji: "📄", title: "PUBLISHED A PAPER???", body: "GIRL CONGRATSS YIPPIEE" },
  { emoji: "🛫", title: "INTERN IN JAPAN?", body: "I DONT KNOW ANYONE AS HARDWORKER AS YOU" },
  { emoji: "🍇", title: "YOU CAN COOK", body: "girl everytime u send that picture, its always looks delishh cant wait to cook together w u hereeee." },
  { emoji: "💚", title: "you literally the KINDEST person ever", body: "after everything, you still text first, still care, still love people around you." },
];

const GOOD = [
  "MY PRETTY PRINCESS SAYANGKU WANITAKU KEKASIH HATIKU.",
  "PATIENT.",
  "you ALWAYS remember the tiny details abt me :(",
  "if i say i'm sick today, you'll text me tomorrow asking how i feel :(",
  "we text every single day you make me feel less lonely at my intership",
  "you care, like REALLY CARE.",
  "smartest bitch around",
  "pussy good.",
  "you make me want to be a better friend, esp for you.",
];

/* ---------------- MAIN ---------------- */
function BirthdayPage() {
  const [entered, setEntered] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const { done: countdownDone } = useCountdown(BIRTHDAY);

  // Lock celebration to after countdown completes
  const canCelebrate = countdownDone;

  // Auto-celebrate the moment the countdown hits zero
  useEffect(() => {
    if (countdownDone && entered && !celebrating) {
      // Only auto-fire once
      const k = "celebrated-once";
      if (!sessionStorage.getItem(k)) {
        sessionStorage.setItem(k, "1");
        setCelebrating(true);
      }
    }
  }, [countdownDone, entered, celebrating]);

  const scrollToUnlocked = useCallback(() => {
    setTimeout(() => {
      document.getElementById("after-quiz")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 400);
  }, []);

  if (!entered) return <Gate onEnter={() => setEntered(true)} />;

  return (
    <main className="min-h-screen pb-24">
      {celebrating && <Celebration onClose={() => setCelebrating(false)} />}

      {/* HERO */}
      <section className="relative meadow-bg pixel-border border-t-0 border-x-0 px-6 py-16 md:py-24 overflow-hidden">
        <Sparkles />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="font-pixel text-[10px] md:text-xs text-primary mb-4 anim-wiggle inline-block">
            ✦ welcome hihi ✦
          </div>
          <h1 className="font-pixel text-3xl md:text-6xl leading-[1.4] text-foreground mb-6">
            HAPPY<br/>
            <span style={{ color: "var(--pink-deep)" }}>BIRTHDAY,</span><br/>
            NAY!
          </h1>
          <p className="font-retro text-2xl md:text-3xl text-muted-foreground mb-2">
            Nay, 22 today 🎂
          </p>
          <p className="font-retro text-xl md:text-2xl mb-10" style={{ color: "var(--pink-deep)" }}>
            june 19, 2026 · made by iyow
          </p>
          <Countdown canCelebrate={canCelebrate} onCelebrate={() => setCelebrating(true)} />
        </div>
      </section>

      {/* QUIZ */}
      <section className="px-6 py-16 md:py-24 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="font-pixel text-[10px] md:text-xs text-primary mb-2">▸ mini quest 01</div>
          <h2 className="font-pixel text-xl md:text-3xl text-foreground">unlock your world 🔐</h2>
          <p className="font-retro text-xl text-muted-foreground mt-2">
            get every answer right to open the rest of the page. (a wrong answer just resets the question — no pressure 💚)
          </p>
        </div>
        <Quiz onPass={() => { setUnlocked(true); scrollToUnlocked(); }} />
      </section>

      {/* EVERYTHING BELOW IS LOCKED UNTIL QUIZ PASSED */}
      <div id="after-quiz" className={unlocked ? "" : "locked"} aria-hidden={!unlocked}>

        {/* MINI GAME */}
        <section className="px-6 py-12 md:py-16 max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-6">
              <div className="font-pixel text-[10px] md:text-xs text-primary mb-2">▸ mini quest 02</div>
              <h2 className="font-pixel text-xl md:text-3xl text-foreground">blow out the candles 🎂</h2>
              <p className="font-retro text-xl text-muted-foreground mt-2">tap every flame, then make a wish.</p>
            </div>
          </Reveal>
          <Reveal delay={120}><CakeGame /></Reveal>
        </section>

        {/* NAY GALLERY */}
        <section className="px-6 py-12 md:py-16 max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-8">
              <div className="font-pixel text-[10px] md:text-xs text-primary mb-2">▸ chapter 01</div>
              <h2 className="font-pixel text-xl md:text-3xl text-foreground">the birthday girl 🌷</h2>
              <p className="font-retro text-xl text-muted-foreground mt-2">swipe through and tap any photo to zoom.</p>
            </div>
          </Reveal>
          <Reveal delay={120}><SwipeGallery ids={PHOTOS.nay} label="nay being nay" /></Reveal>
        </section>

        {/* SOBAK */}
        <section className="px-6 py-12 md:py-16 max-w-5xl mx-auto space-y-14">
          <Reveal>
            <div className="text-center">
              <div className="font-pixel text-[10px] md:text-xs text-primary mb-2">▸ chapter 02</div>
              <h2 className="font-pixel text-xl md:text-3xl text-foreground">sobak: then & now 🫂</h2>
              <p className="font-retro text-xl text-muted-foreground mt-2">KAPAN KITA UPDATE FOTO.</p>
            </div>
          </Reveal>
          <Reveal delay={100}><SwipeGallery ids={PHOTOS.sobakOld} label="sobak: back then" /></Reveal>
          <Reveal delay={150}><SwipeGallery ids={PHOTOS.sobakNew} label="sobak: right now" /></Reveal>
        </section>

        {/* IYO + NAY */}
        <section className="px-6 py-12 md:py-16 max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-8">
              <div className="font-pixel text-[10px] md:text-xs text-primary mb-2">▸ chapter 03</div>
              <h2 className="font-pixel text-xl md:text-3xl text-foreground">iyo & nay</h2>
              <p className="font-retro text-xl text-muted-foreground mt-2">MASA AKU CUMA NEMU FOTO KITA DUA</p>
            </div>
          </Reveal>
          <Reveal delay={120}><SwipeGallery ids={PHOTOS.iyoNay} label="us, baby version" /></Reveal>
        </section>

        {/* PROUD */}
        <section className="px-6 py-16 md:py-24 max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-10">
              <div className="font-pixel text-[10px] md:text-xs text-primary mb-2">▸ chapter 04</div>
              <h2 className="font-pixel text-xl md:text-3xl text-foreground">things im SO PROUD of you for *MORE I CANT LIST*🏆</h2>
              <p className="font-retro text-xl text-muted-foreground mt-2">read every single one OKAY.</p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-5">
            {PROUD.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <div className="bg-card pixel-border p-5 md:p-6 hover-float h-full">
                  <div className="text-3xl mb-2">{p.emoji}</div>
                  <h3 className="font-pixel text-xs md:text-sm text-foreground mb-3 leading-relaxed">{p.title}</h3>
                  <p className="font-retro text-xl text-muted-foreground">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* GOOD */}
        <section className="px-6 py-16 md:py-24 max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-10">
              <div className="font-pixel text-[10px] md:text-xs text-primary mb-2">▸ chapter 05</div>
              <h2 className="font-pixel text-xl md:text-3xl text-foreground">good things about you 🌿</h2>
              <p className="font-retro text-xl text-muted-foreground mt-2">i could write 100 more.</p>
            </div>
          </Reveal>
          <ol className="space-y-3">
            {GOOD.map((g, i) => (
              <Reveal key={i} delay={i * 60}>
                <li className="bg-card pixel-border-sm p-4 flex gap-3 items-start hover-float">
                  <span className="font-pixel text-xs text-primary shrink-0 mt-1">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-retro text-xl text-foreground">{g}</span>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* LETTER */}
        <section className="px-6 py-16 md:py-24 max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-8">
              <div className="font-pixel text-[10px] md:text-xs text-primary mb-2">▸ final chapter</div>
              <h2 className="font-pixel text-xl md:text-3xl text-foreground">uhuk uhuk a little words from me</h2>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <article className="bg-card pixel-border-pink p-6 md:p-10 font-retro text-xl md:text-2xl leading-relaxed text-foreground space-y-5">
              <p>Wanitaku Nay,</p>
              <p>
                HEPIBIDI NAY! sayangku, genuinely cannot believe we're both in college now, damn and you re abt to graduate :(
              </p>
              <p>
                I cant believe i have a friend from elementary school that stays until now.
                damn its already how many years? TEN YEARS???? NO WAY DAMN CRAZY
                and we still texting every single daayyyy even tho we literally so far away.
                time flies... i cant believe... and i dont think we change that much.
                still have same interest, still like diabolik lovers, free, and stuff.
                but we're baddies now EYYYYYY
              </p>
              <p>
                im sooooooo unbelievably proud of you, nay. you are the coolest person ever. 
                how can u manage doing all that? work, paper, ALONE ALL BY YOURSELF??
                idk i cant even imagining me as you. wow. you have to appreciate yourself more.
                pat your back. treat yourself. be proud cuz i ammm
              </p>
              <p>
                also im sorry. 
                sorry I haven't been as good a friend back as you've been to me. You're the one
                who remembers the  little things, who follows up when im sick, who texts first, 
                who cares without being asked. DESPITE YOU Have your own struggle, your own problem
                you never stop care and being kind to other :( IM SORRY I NEVER GAVE YOU
                ANYTHING. IM SORRY I CAN ONLY DO THIS.
                AND THANK YOU.
                thank you. really thank you. you really dont know how grateful i am to have you. 
                i really appreciate you. i don't always show it back the way you deserve, and ill working on that. 
                to be the man u deserve (MOVE LEON)
              </p>
              <p>
                I MISS YOU SO MUCH SO FUCKING MUCH. I CANT WAIT for September. I can't
                wait to hug you again, to talk, to laugh. like PLESE
                come home. We have to eat, walk around, photobox ofc, EVERYTHING WE NEVER TRY BEFORE.
              </p>
              <p>
                i have a whole list already btw. We HAVE to make a tiktok together (I HAVE A FUCKING
                FOLDER ON IG ISINYA TIKTOK WE MUST RECREATE). Photobox (pomko really want the
                wedding one). Play LADS OBV. Eat. Eat a LOT. STARDEW. EPIC. ALL STUFF.
              </p>
              <p>
                I love you, nay. Thank you for picking me back in 6th grade, and for picking me
                every year after. THANK YOU FOR BEING BY BEST FRIEND. THANK YOU FOR CARING. 
                THANK YOU FOR ALWAYSS TEXTING ME. THANK YOU FOR ALL GIFT YOU GAVE ME.
                FUCK YOU AND THANK YOU FOR INTRODUCE ME TO DIABOLIK LOVERS.
                thank you for making me fanfic backthen, even fanart. thank you for staying alive,
                staying strong and here. It'll be worth it. i believe theres something great waiting 
                for you dimasa depan. i hope your war is soon over. I LITERALLY CRYING TYPING THIS.
              </p>
              <p>
                May your 22nd year be peace, full of everything you deserve. May your dreams keep moving. 
                May you stay healthy. May you stay loved and surrounded by good, good people. May you
                always happy. thank you.
              </p>
              <p>Happy birthday, Nay.</p>
              <p className="pt-4 font-pixel text-xs md:text-sm" style={{ color: "var(--pink-deep)" }}>
                ♡ from iyow,<br/>
                who never ever deserve a best friend like you,<br/>
              </p>
            </article>
          </Reveal>
        </section>
      </div>

      {!unlocked && (
        <div className="text-center -mt-16 mb-12 font-pixel text-[10px] text-muted-foreground">
          🔒 finish the quiz above to unlock everything below
        </div>
      )}

      <footer className="px-6 pt-8 text-center">
        <p className="font-pixel text-[10px] text-muted-foreground">
          ✦ thank you :( ✦
        </p>
      </footer>
    </main>
  );
}
