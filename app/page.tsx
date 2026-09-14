"use client";

import { useEffect, useRef, useState } from "react";

type BomberColor = "red" | "blue" | "green" | "orange";
const bomberAssetVersion = "user-cutouts-v5";

const colors: { key: BomberColor; label: string; hex: string }[] = [
  { key: "red", label: "Красный", hex: "#a60019" },
  { key: "blue", label: "Синий", hex: "#08275d" },
  { key: "green", label: "Зелёный", hex: "#174c35" },
  { key: "orange", label: "Оранжевый", hex: "#d76719" },
];

function BomberPair({ color }: { color: BomberColor }) {
  return <div className="bomber-pair" aria-live="polite">
    <div className={`bomber-flight bomber-flight--${color}`} key={color}>
      <span className="bomber-speedline bomber-speedline--one" aria-hidden="true" />
      <span className="bomber-speedline bomber-speedline--two" aria-hidden="true" />
      <img src={`/bomber-pair-${color}-cutout.png?v=${bomberAssetVersion}`} alt={`${colors.find(c => c.key === color)?.label} бомбер IZI Riders — спереди и сзади`} />
      <div className="bomber-labels" aria-hidden="true">
        <span>FRONT</span>
        <span>BACK</span>
      </div>
    </div>
  </div>;
}

function ScrollLogo() {
  const mark = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!mark.current) return;
        const progress = Math.min(1, Math.max(0, window.scrollY / Math.max(1, window.innerHeight * .82)));
        const eased = progress * progress * (3 - 2 * progress);
        const mobile = window.matchMedia("(max-width: 760px)").matches;
        mark.current.style.setProperty("--logo-x", `${eased * window.innerWidth * .34}px`);
        mark.current.style.setProperty("--logo-y", `${eased * window.innerHeight * (mobile ? .78 : .5)}px`);
      });
    };
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); };
  }, []);
  return <div className="hero-logo-stage" ref={mark} aria-hidden="true"><img src="/izi-logo.svg" alt="" /></div>;
}

function ColorShiftWord() {
  const word = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const palette = [
      { color: "#aa0018", stroke: "transparent" },
      { color: "#08275d", stroke: "transparent" },
      { color: "#174c35", stroke: "transparent" },
      { color: "#d76719", stroke: "transparent" },
      { color: "#e9decd", stroke: "#090909" },
    ];
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!word.current) return;
        const rect = word.current.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, (window.innerHeight * .82 - rect.top) / (window.innerHeight * .72)));
        const tone = palette[Math.min(palette.length - 1, Math.floor(progress * palette.length))];
        word.current.style.setProperty("--word-color", tone.color);
        word.current.style.setProperty("--word-stroke", tone.stroke);
      });
    };
    update(); window.addEventListener("scroll", update, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", update); };
  }, []);
  return <span className="color-shift-word" ref={word}>ЛЮБОЙ</span>;
}

function EasyScrollDrum() {
  const section = useRef<HTMLElement>(null);
  const reel = useRef<HTMLDivElement>(null);
  const words = [
    { text: "EASY", color: "#d71936" },
    { text: "ЛЕГКО", color: "#e9decd" },
    { text: "EASY", color: "#5da47c" },
    { text: "ЛЕГКО", color: "#ef8126" },
    { text: "EASY", color: "#ffffff" },
  ];

  useEffect(() => {
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!section.current || !reel.current) return;
        const rect = section.current.getBoundingClientRect();
        const distance = Math.max(1, section.current.offsetHeight - window.innerHeight);
        const progress = Math.min(1, Math.max(0, -rect.top / distance));
        reel.current.style.transform = `translateY(${-progress * 80}%)`;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return <section className="easy-section" ref={section} aria-label="IZI значит легко">
    <div className="easy-sticky">
      <div className="easy-equation">
        <span className="easy-prefix">IZI =</span>
        <div className="easy-drum" aria-hidden="true">
          <div className="easy-reel" ref={reel}>
            {words.map((item, index) => <span key={`${item.text}-${index}`} style={{ color: item.color }}>{item.text}</span>)}
          </div>
        </div>
      </div>
      <small>ЛИСТАЙ</small>
    </div>
  </section>;
}

const customPatches = ["ROUTE 77", "MOSCOW", "NO RUSH", "23:10"];

export default function Home() {
  const [color, setColor] = useState<BomberColor>("red");
  const [patches, setPatches] = useState<string[]>([]);

  useEffect(() => {
    const pointer = (e: PointerEvent) => {
      const x = e.clientX / window.innerWidth - .5, y = e.clientY / window.innerHeight - .5;
      document.documentElement.style.setProperty("--mx", `${x}`);
      document.documentElement.style.setProperty("--my", `${y}`);
    };
    window.addEventListener("pointermove", pointer, { passive: true });
    const observer = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add("is-visible")), { threshold: .14 });
    document.querySelectorAll(".reveal").forEach(node => observer.observe(node));
    return () => { window.removeEventListener("pointermove", pointer); observer.disconnect(); };
  }, []);

  const togglePatch = (patch: string) => setPatches(current => current.includes(patch) ? current.filter(p => p !== patch) : [...current, patch].slice(-3));

  return <main>
    <header className="site-header">
      <a className="brand" href="#top" aria-label="IZI RIDERS — наверх"><img src="/izi-logo.svg" alt="" /><span>IZI RIDERS<br />MOSCOW</span></a>
      <a className="telegram telegram--header" href="https://t.me/izi_riders" target="_blank" rel="noreferrer">TELEGRAM <span>↗</span></a>
    </header>

    <section className="hero" id="top">
      <div className="hero-color hero-color--red" /><div className="hero-color hero-color--navy" />
      <p className="hero-kicker">MOSCOW MOTORCYCLE CLUB · 2026</p>
      <h1 className="hero-title" aria-label="IZI RIDERS — мотоклуб"><span>RIDERS</span><small>МОТОКЛУБ</small></h1>
      <ScrollLogo />
      <div className="hero-bottom"><p className="hero-motto">Мотоциклы. Друзья.<br />Кастомные бомберы.</p><p className="keep">KEEP IT IZI.</p></div>
      <a className="scroll-cue" href="#club" aria-label="Листать ниже">SCROLL <span>↓</span></a>
    </section>

    <section className="club-intro" id="club" aria-labelledby="club-title">
      <h2 id="club-title" className="reveal"><span>МОТОКЛУБ</span><em>МОСКВА</em></h2>
      <p className="reveal">Любим вместе ездить хорошей компанией друзей. Обычно спонтанно выбираем интересное место и уезжаем на один день. Иногда отправляемся дальше и надольше — уже меньшим составом.</p>
    </section>

    <section className="statement" id="identity">
      <div className="ticker" aria-hidden="true"><div>NOT YOUR USUAL MOTORCYCLE CLUB · NOT YOUR USUAL MOTORCYCLE CLUB · </div></div>
      <div className="statement-grid reveal">
        <p className="eyebrow">01 / IDENTITY</p>
        <h2>ОДИН КЛУБ.<br /><em><ColorShiftWord /> ЦВЕТ.</em></h2>
        <p className="statement-copy">Общая идентичность.<br />Твой собственный стиль.</p>
      </div>
    </section>

    <section className="roles">
      <div className="roles-copy reveal">
        <p className="eyebrow">02 / EARNED, NOT ORDERED</p><h2>THE BOMBER<br />TELLS THE STORY.</h2>
        <div className="color-picker" role="group" aria-label="Цвет бомбера">
          {colors.map(c => <button key={c.key} className={color === c.key ? "active" : ""} style={{ "--dot": c.hex } as React.CSSProperties} onClick={() => setColor(c.key)} aria-label={c.label}><i /></button>)}
        </div>
      </div>
      <BomberPair color={color} />
      <div className="patch-notes reveal"><span>ТВОИ НАШИВКИ</span><span>ТВОЙ ЦВЕТ</span><span>ТВОЙ СМЫСЛ</span></div>
    </section>

    <section className="customize">
      <div className="customize-copy reveal"><p className="eyebrow">03 / MAKE IT YOURS</p><h2>КЛУБНЫЙ.<br /><em>НО ТВОЙ.</em></h2><p>Кастомайзь бомбер как твой мот</p></div>
      <div className="customizer reveal">
        <div className="custom-bomber">
          <img src={`/bomber-red-front-cutout.png?v=${bomberAssetVersion}`} alt="Красный бомбер для кастомизации" />
          {patches.map((p, i) => <span className={`placed-patch placed-patch--${i + 1}`} key={p}>{p}</span>)}
        </div>
        <div className="patch-tray"><p>ВЫБЕРИ СВОЙ ПАТЧ</p>{customPatches.map(p => <button className={patches.includes(p) ? "active" : ""} key={p} onClick={() => togglePatch(p)}>{p}</button>)}</div>
      </div>
    </section>

    <EasyScrollDrum />

    <section className="friendship">
      <div className="join-path reveal" aria-label="Путь вступления в клуб">
        <div><b>01</b><span>RIDE<br />WITH US</span></div>
        <div><b>02</b><span>BECOME<br />A FRIEND</span></div>
        <div><b>03</b><span>BECOME<br />IZI</span></div>
      </div>
      <div className="friendship-copy reveal"><p className="eyebrow">04 / MEMBERSHIP</p><h2>СТАЛ НАШИМ<br />НАСТОЯЩИМ ДРУГОМ —<br /><em className="already-izi">ТЫ УЖЕ IZI.</em></h2></div>
    </section>

    <footer>
      <div className="founders reveal">
        <p className="eyebrow">FOUNDERS</p>
        <div className="founder-cards">
          <figure className="founder-card founder-card--kiko"><img src="/kiko.jpg" alt="KIKO" /><figcaption><b>KIKO</b></figcaption></figure>
          <span className="founder-x">×</span>
          <figure className="founder-card founder-card--ches"><img src="/ches.jpg" alt="CHES" /><figcaption><b>CHES</b></figcaption></figure>
        </div>
        <small>MOSCOW · EST. 2026</small>
      </div>
      <a className="telegram telegram--footer reveal" href="https://t.me/izi_riders" target="_blank" rel="noreferrer"><span>JOIN THE RIDE</span><strong>t.me/izi_riders ↗</strong></a>
      <div className="footer-word">KEEP IT IZI.</div>
    </footer>
  </main>;
}
