"use client";

import { useEffect, useRef, useState } from "react";

const INVITE = {
  couple: "Cynthia & Darwin",
  date: "September 26th, 2026",
  countdownDate: "2026-09-26T10:00:00+05:30",
  church: {
    label: "The Blessing",
    time: "10:00 a.m. IST",
    name: "Our Lady of Loretto Catholic Church",
    address: "Moolamkuzhi, Mundamveli, Kochi, Kerala 682507, India",
    link: "https://share.google/pckc85guwSA7kQUJx",
  },
  reception: {
    label: "The Celebration",
    time: "12:30 p.m. IST",
    name: "St. George Parish Hall",
    address: "Church Landing Cross Rd, Pallimukku, Kochi, Kerala 682016, India",
    link: "https://share.google/gOyTnCCqDM1KadVGa",
  },
};

type Countdown = { days: number; hours: number; minutes: number; seconds: number };
const emptyCountdown: Countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };

function timeLeft(): Countdown {
  const distance = Math.max(0, new Date(INVITE.countdownDate).getTime() - Date.now());
  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance / 3_600_000) % 24),
    minutes: Math.floor((distance / 60_000) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };
}

function CountdownBlock() {
  const [left, setLeft] = useState<Countdown>(emptyCountdown);
  useEffect(() => {
    setLeft(timeLeft());
    const timer = window.setInterval(() => setLeft(timeLeft()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="countdown" aria-label={`${left.days} days, ${left.hours} hours, ${left.minutes} minutes, ${left.seconds} seconds`}>
      {Object.entries(left).map(([label, value]) => (
        <div className="time-unit" key={label}>
          <span>{String(value).padStart(2, "0")}</span>
          <small>{label}</small>
        </div>
      ))}
    </div>
  );
}

function VenueCard({ venue }: { venue: typeof INVITE.church }) {
  return (
    <article className="venue-card reveal">
      <p className="eyebrow">{venue.label}</p>
      <p className="venue-time">{venue.time}</p>
      <h3>{venue.name}</h3>
      <p className="address">{venue.address}</p>
      <a className="map-button" href={venue.link} target="_blank" rel="noreferrer" aria-label={`Open directions to ${venue.name}`}>
        <span>View map & distance</span><span aria-hidden="true">↗</span>
      </a>
    </article>
  );
}

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const items = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible"));
    }, { threshold: 0.16 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [opened]);

  useEffect(() => {
    const update = () => document.documentElement.style.setProperty("--journey", String(window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight)));
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  const openInvite = async () => {
    setOpened(true);
    document.body.classList.add("invitation-open");
    try { await audioRef.current?.play(); setPlaying(true); } catch { setPlaying(false); }
    window.setTimeout(() => document.getElementById("story")?.scrollIntoView({ behavior: "smooth" }), 950);
  };

  const toggleMusic = async () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) { await audioRef.current.play(); setPlaying(true); }
    else { audioRef.current.pause(); setPlaying(false); }
  };

  return (
    <main>
      <audio ref={audioRef} src="/assets/engagement-music.mp3" loop preload="metadata" />
      <button className={`music ${playing ? "playing" : ""}`} onClick={toggleMusic} aria-label={playing ? "Pause music" : "Play music"}>
        <span className="music-bars" aria-hidden="true"><i /><i /><i /></span>{playing ? "Sound on" : "Play song"}
      </button>

      <div className="ring-journey" aria-hidden="true">
        <div className="ring ring-left"><model-viewer src="/assets/cynthia-ring.glb" camera-orbit="25deg 70deg 105%" auto-rotate rotation-per-second="18deg" disable-zoom /></div>
        <div className="ring ring-right"><model-viewer src="/assets/darwin-ring.glb" camera-orbit="-25deg 70deg 105%" auto-rotate rotation-per-second="-18deg" disable-zoom /></div>
      </div>

      <section className={`cover ${opened ? "opened" : ""}`} aria-label="Invitation cover">
        <div className="cover-grain" />
        <div className="cover-copy">
          <p className="eyebrow">Together with their families</p>
          <h1><span>Cynthia</span><b>&</b><span>Darwin</span></h1>
          <div className="cover-rule"><i /><span>✦</span><i /></div>
          <p className="date">26 · 09 · 2026</p>
          <p className="place">Kochi, Kerala</p>
        </div>
        {!opened && <button className="seal" onClick={openInvite}><span>C <i>&</i> D</span><small>Tap to open</small></button>}
        <div className="scroll-cue"><span>Begin our story</span><i /></div>
      </section>

      <section className="moonlight panel" id="story">
        <div className="moonlight-bg" />
        <div className="story-copy reveal">
          <p className="eyebrow light">A love written in the stars</p>
          <h2>One beautiful<br />promise.</h2>
          <p>Somewhere between a thousand little moments, we found forever in each other.</p>
        </div>
        <div className="star star-one">✦</div><div className="star star-two">·</div>
      </section>

      <section className="portrait panel">
        <figure className="portrait-frame reveal"><img src="/assets/our-sketch.png" alt="Cynthia and Darwin smiling together" loading="lazy" /></figure>
        <div className="portrait-copy reveal">
          <p className="eyebrow">With joyful hearts</p>
          <h2>We’re getting<br /><em>engaged.</em></h2>
          <p>It would mean the world to have you beside us as we begin this new chapter—surrounded by the people, prayers, and love that brought us here.</p>
          <p className="signature">Cynthia <span>&</span> Darwin</p>
        </div>
      </section>

      <section className="countdown-section panel">
        <div className="petals" aria-hidden="true">{Array.from({ length: 18 }).map((_, i) => <i key={i} style={{ "--i": i } as React.CSSProperties} />)}</div>
        <div className="flower flower-a" aria-hidden="true"><i/><i/><i/><i/><i/><b/></div>
        <div className="flower flower-b" aria-hidden="true"><i/><i/><i/><i/><i/><b/></div>
        <div className="countdown-copy reveal">
          <p className="eyebrow">Save the date</p>
          <h2>September <em>26</em></h2>
          <p className="year">Two thousand & twenty-six</p>
          <CountdownBlock />
          <a className="calendar-link" href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Cynthia%20%26%20Darwin%27s%20Engagement&dates=20260926T043000Z/20260926T103000Z&details=Join%20us%20for%20our%20engagement%20celebration%20in%20Kochi" target="_blank" rel="noreferrer">Add to calendar <span>＋</span></a>
        </div>
      </section>

      <section className="details panel">
        <header className="section-heading reveal"><p className="eyebrow">The day we say yes</p><h2>Where & when</h2><p>{INVITE.date}</p></header>
        <div className="venue-grid"><VenueCard venue={INVITE.church} /><VenueCard venue={INVITE.reception} /></div>
        <div className="between reveal"><span>About 6 km apart</span><i /><span>Allow 25–35 minutes</span></div>
      </section>

      <section className="finale panel">
        <div className="finale-bg" />
        <div className="finale-copy reveal">
          <p className="eyebrow light">Our favorite chapter begins</p>
          <h2>Meet us<br />under the stars.</h2>
          <p>With love, laughter, and a little moonlight.</p>
          <div className="final-date"><i />26 · 09 · 2026<i /></div>
          <p className="final-names">Cynthia <span>&</span> Darwin</p>
        </div>
      </section>
      <footer><span>C <i>&</i> D</span><p>Made with love for our forever.</p></footer>
    </main>
  );
}

declare global {
  namespace JSX { interface IntrinsicElements { "model-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { src?: string; "camera-orbit"?: string; "auto-rotate"?: boolean; "rotation-per-second"?: string; "disable-zoom"?: boolean; }; } }
}
