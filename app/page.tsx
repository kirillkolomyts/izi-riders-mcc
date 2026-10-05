"use client";

import { useEffect, useRef, useState } from "react";

type BomberColor = "red" | "blue" | "green" | "orange";
const bomberAssetVersion = "transparent-lowres-20261001";

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

const customPatches = [
  { key: "character", label: "ПЕРСОНАЖ", description: "Любимый персонаж — рядом с карманом" },
  { key: "nickname", label: "НИКНЕЙМ", description: "Твой никнейм — под MEMBER" },
  { key: "bike", label: "ТВОЙ БАЙК", description: "Модель твоего байка — на плече" },
  { key: "city", label: "ГОРОД / РАЙОН", description: "Важное для тебя место — на корпусе" },
  { key: "story", label: "ТВОЯ ИСТОРИЯ", description: "Личная фраза или дата — на рукаве" },
] as const;
type PersonalPatch = typeof customPatches[number]["key"];

function PersonalPatchArtwork({ kind }: { kind: PersonalPatch }) {
  if (kind === "character") return <img className="mascot-patch" src="/personal-mascot.png" alt="Синий персонаж — персональная нашивка" />;
  if (kind === "nickname") return <span className="textile-patch name-patch">@kiko_drive</span>;
  if (kind === "bike") return <span className="textile-patch bike-patch"><small>MOTO</small><b>V4</b><small>RIDER</small></span>;
  if (kind === "city") return <span className="textile-patch city-patch"><small>HOME TOWN</small><b>МОСКВА</b><span>55°45′ N · 37°37′ E</span></span>;
  return <span className="textile-patch story-patch"><span>MY FIRST RIDE</span><b>2026</b></span>;
}

type MemberBike = { brand: string; model: string; photo?: string };
const members: { name: string; username: string; photo?: string; roles: string[]; bikes: MemberBike[] }[] = [
  { name: "KIKO", username: "kirill_kolomyts", photo: "/kiko-20261005.webp", roles: ["FOUNDER", "MEMBER"], bikes: [{ brand: "BMW", model: "R1250GS", photo: "/kiko-r1250gs.webp" }, { brand: "BMW", model: "K1100 LT", photo: "/kiko-k1100lt.webp" }] },
  { name: "CHES", username: "cheslavram", photo: "/ches.webp", roles: ["FOUNDER", "MEMBER"], bikes: [{ brand: "Ducati", model: "Multistrada V4", photo: "/ches-multistrada-v4.webp" }, { brand: "Triumph", model: "Rocket 3", photo: "/ches-rocket-3.webp" }] },
  { name: "ANTON", username: "oshur1", photo: "/anton-20261005.webp", roles: ["MEMBER"], bikes: [{ brand: "BMW", model: "R1200R", photo: "/anton-r1200r.webp" }] },
];

function ClubMembers() {
  return <section className="club-members" id="members" aria-labelledby="members-title">
    <div className="members-heading reveal"><p className="eyebrow">01 / THE RIDERS</p><h2 id="members-title">СВОИ<br /><em>ЛЮДИ.</em></h2><p className="members-caption">IZI RIDERS MCC<br />MOSCOW · EST. 2026</p></div>
    <div className="member-grid">
      {members.map(member => <article className={`member-card member-card--${member.name.toLowerCase()} reveal`} key={member.username} aria-labelledby={`member-${member.name}`}>
        <div className="member-roles">{member.roles.map(role => <span className={`member-role member-role--${role.toLowerCase()}`} key={role}>{role}</span>)}</div>
        <div className="member-portrait">{member.photo
          ? <img src={member.photo} alt={member.name} loading="lazy" decoding="async" />
          : <div className="member-monogram" aria-label="ANTON"><span aria-hidden="true">A</span><small>IZI RIDERS</small></div>}
        </div>
        <h3 id={`member-${member.name}`}>{member.name}</h3>
        <div className="member-bikes" aria-label={`Мотоциклы ${member.name}`}>
          {member.bikes.map(bike => <details className="member-bike" key={`${bike.brand}-${bike.model}`} onPointerEnter={event => { if (event.pointerType === "mouse") event.currentTarget.open = true; }} onPointerLeave={event => { if (event.pointerType === "mouse") event.currentTarget.open = false; }}>
            <summary aria-label={`${bike.brand} ${bike.model}: показать фото`}><span><b>{bike.brand}</b> {bike.model}</span><span className="bike-photo-dot" aria-hidden="true">+</span></summary>
            <div className="bike-photo-panel">{bike.photo ? <img src={bike.photo} alt={`${bike.brand} ${bike.model}`} loading="lazy" decoding="async" /> : <div className="bike-photo-pending"><b>{bike.brand}</b><span>{bike.model}</span><small>ФОТО СКОРО</small></div>}</div>
          </details>)}
        </div>
        <a className="member-telegram" href={`https://t.me/${member.username}`} target="_blank" rel="noreferrer" aria-label={`${member.name} в Telegram: @${member.username}`}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21 3-4 18-6-5-4 4 1-7L3 9Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="m8 13 9-6-6 9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
          <span><small>TG</small><b>@{member.username}</b></span>
        </a>
      </article>)}
    </div>
  </section>;
}

export default function Home() {
  const [color, setColor] = useState<BomberColor>("red");
  const [patches, setPatches] = useState<PersonalPatch[]>([]);

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

  const togglePatch = (patch: PersonalPatch) => setPatches(current => current.includes(patch) ? current.filter(p => p !== patch) : [...current, patch]);

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
      <div className="club-intro-copy reveal">
      <p>Любим путешествовать хорошей компанией и открывать новые места. Иногда это спонтанная поездка на один день, а иногда — настоящее путешествие небольшим составом на несколько дней. Главное — дорога, свобода и люди, с которыми хочется разделить эти моменты.</p>
        <p className="club-membership">Катайся с нами. Станем друзьями — <strong>ты уже IZI.</strong></p>
      </div>
    </section>

    <section className="statement" id="identity">
      <div className="ticker" aria-hidden="true"><div>NOT YOUR USUAL MOTORCYCLE CLUB · NOT YOUR USUAL MOTORCYCLE CLUB · </div></div>
      <ClubMembers />
      <div className="statement-grid reveal">
        <p className="eyebrow">02 / IDENTITY</p>
        <h2>ОДИН КЛУБ.<br /><em><ColorShiftWord /> ЦВЕТ.</em></h2>
        <p className="statement-copy">Общая идентичность.<br />Твой собственный стиль.</p>
      </div>
    </section>

    <section className="roles">
      <div className="roles-copy reveal">
        <p className="eyebrow">03 / EARNED, NOT ORDERED</p><h2>THE BOMBER<br />TELLS THE STORY.</h2>
        <div className="color-picker" role="group" aria-label="Цвет бомбера">
          {colors.map(c => <button key={c.key} className={color === c.key ? "active" : ""} style={{ "--dot": c.hex } as React.CSSProperties} onClick={() => setColor(c.key)} aria-label={c.label}><i /></button>)}
        </div>
      </div>
      <BomberPair color={color} />
      <div className="patch-notes reveal"><span>ТВОИ НАШИВКИ</span><span>ТВОЙ ЦВЕТ</span><span>ТВОЙ СМЫСЛ</span></div>
    </section>

    <section className="customize" id="customize" aria-labelledby="customize-title">
      <div className="customize-copy reveal"><p className="eyebrow">04 / MAKE IT YOURS</p><h2 id="customize-title">КЛУБНЫЙ.<br /><em>НО ТВОЙ.</em></h2><p>Кастомайзь бомбер как твой мот</p><p className="personal-copy">Символика IZI объединяет. Персональные патчи рассказывают о тебе: твой никнейм, байк, любимый персонаж, места и истории.</p></div>
      <div className="customizer reveal">
        <div className="custom-bomber">
          <div className="bomber-canvas">
            <svg viewBox="0 0 532 577" role="img" aria-label="Клубный красный бомбер IZI с персональными патчами">
              <defs><clipPath id="red-bomber-front"><rect width="532" height="577" /></clipPath></defs>
              <image href={`/bomber-pair-red-cutout.png?v=${bomberAssetVersion}`} width="1024" height="577" clipPath="url(#red-bomber-front)" />
            </svg>
            {customPatches.map(p => patches.includes(p.key)
              ? <div className={`personal-patch personal-patch--${p.key}`} key={p.key}><PersonalPatchArtwork kind={p.key} /></div>
              : <button key={p.key} className={`patch-zone patch-zone--${p.key}`} onClick={() => togglePatch(p.key)} aria-label={`Добавить: ${p.description}`}><span>+</span></button>)}
          </div>
        </div>
        <div className="patch-tray">
          <div className="patch-tray-intro"><p>ДОБАВЬ СВОЁ</p><span>Нажми на категорию. Ещё раз — снять патч.</span></div>
          <div className="patch-buttons">{customPatches.map(p => <button className={patches.includes(p.key) ? "active" : ""} key={p.key} onClick={() => togglePatch(p.key)} aria-pressed={patches.includes(p.key)} title={p.description}><span aria-hidden="true">{patches.includes(p.key) ? "−" : "+"}</span>{p.label}</button>)}</div>
        </div>
      </div>
    </section>

    <EasyScrollDrum />

    <footer>
      <a className="telegram telegram--footer reveal" href="https://t.me/izi_riders" target="_blank" rel="noreferrer"><span>JOIN THE RIDE</span><strong>t.me/izi_riders ↗</strong></a>
      <div className="footer-word">KEEP IT IZI.</div>
    </footer>
  </main>;
}
