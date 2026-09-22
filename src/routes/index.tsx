import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUp, ArrowUpRight, Instagram, Mail, Menu, MessageCircle, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import logoAsset from "@/assets/logo.png.asset.json";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zyro Adz — Marketing Beyond Expectation" },
      { name: "description", content: "Zyro Adz is a creative marketing and advertising agency for bold brands." },
      { property: "og:title", content: "Zyro Adz — Marketing Beyond Expectation" },
      { property: "og:description", content: "Strategy, creative design and digital marketing built to make brands impossible to ignore." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const services = [
  ["01", "BRANDING", "Identity systems, visual direction, brand strategy and memorable brand experiences."],
  ["02", "DIGITAL MARKETING", "Digital strategies designed to reach the right people and create measurable growth."],
  ["03", "SOCIAL MEDIA", "Content systems, creative direction and social campaigns that build attention."],
  ["04", "ADVERTISING", "Creative campaigns and performance advertising built around clear objectives."],
  ["05", "CREATIVE DESIGN", "Campaign visuals, social creatives, posters and digital design with a premium edge."],
  ["06", "VIDEO & CONTENT", "Reels, branded content and visual storytelling made for modern platforms."],
];

const processSteps = [
  ["01", "DISCOVER", "We understand your brand, audience, market and goals."],
  ["02", "STRATEGY", "We build the direction, message and creative plan."],
  ["03", "CREATE", "We turn strategy into identity, content and campaigns."],
  ["04", "LAUNCH", "We put the work in front of the right audience."],
  ["05", "GROW", "We measure, optimize and keep building momentum."],
];

function Logo({ compact = false }: { compact?: boolean }) {
  return <img className={compact ? "logo logo--compact" : "logo"} src={logoAsset.url} alt="Zyro Creative Studio" />;
}

function Index() {
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealItems = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    if (reduceMotion) revealItems.forEach((item) => item.classList.add("is-visible"));
    const observer = reduceMotion ? null : new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealItems.forEach((item) => observer?.observe(item));

    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      if (!reduceMotion) document.documentElement.style.setProperty("--scroll-y", `${y}px`);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("modal-locked", modalOpen || menuOpen);
    if (modalOpen) window.setTimeout(() => closeRef.current?.focus(), 50);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setModalOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("modal-locked");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [modalOpen, menuOpen]);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const dot = document.querySelector<HTMLElement>(".cursor-dot");
    const ring = document.querySelector<HTMLElement>(".cursor-ring");
    if (!dot || !ring) return;
    let mouseX = 0; let mouseY = 0; let ringX = 0; let ringY = 0; let frame = 0;
    const move = (event: MouseEvent) => { mouseX = event.clientX; mouseY = event.clientY; dot.style.transform = `translate3d(${mouseX}px,${mouseY}px,0)`; };
    const animate = () => { ringX += (mouseX - ringX) * 0.16; ringY += (mouseY - ringY) * 0.16; ring.style.transform = `translate3d(${ringX}px,${ringY}px,0)`; frame = window.requestAnimationFrame(animate); };
    const hover = (event: MouseEvent) => ring.classList.toggle("is-hovering", Boolean((event.target as Element).closest("a,button")));
    window.addEventListener("mousemove", move); document.addEventListener("mouseover", hover); frame = window.requestAnimationFrame(animate);
    return () => { window.removeEventListener("mousemove", move); document.removeEventListener("mouseover", hover); window.cancelAnimationFrame(frame); };
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const openContact = () => { setMenuOpen(false); setModalOpen(true); };

  return (
    <main className="site-shell">
      <div className="cursor-dot" aria-hidden="true" /><div className="cursor-ring" aria-hidden="true" />
      <header className={`site-nav ${scrolled ? "site-nav--scrolled" : ""}`}>
        <a href="#home" aria-label="Zyro Adz home"><Logo compact /></a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#about">ABOUT</a><a href="#services">SERVICES</a><a href="#process">PROCESS</a>
        </nav>
        <Button className="nav-cta" onClick={openContact}>LET&apos;S TALK <ArrowUpRight /></Button>
        <Button className="menu-toggle" variant="ghost" size="icon" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu /></Button>
      </header>

      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu__top"><Logo compact /><Button variant="ghost" size="icon" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></Button></div>
        <nav aria-label="Mobile navigation"><a href="#about" onClick={closeMenu}>ABOUT</a><a href="#services" onClick={closeMenu}>SERVICES</a><a href="#process" onClick={closeMenu}>PROCESS</a></nav>
        <Button className="button-primary" onClick={openContact}>LET&apos;S TALK <ArrowUpRight /></Button>
      </div>

      <section id="home" className="hero">
        <div className="hero-grid" aria-hidden="true" /><div className="hero-glow hero-glow--one" aria-hidden="true" /><div className="hero-glow hero-glow--two" aria-hidden="true" />
        <div className="hero-z" aria-hidden="true">Z</div>
        <div className="hero-content">
          <p className="eyebrow hero-eyebrow"><span /> CREATIVE MARKETING &amp; ADVERTISING AGENCY</p>
          <h1 className="hero-title"><span>MARKETING</span><span className="accent-text">BEYOND</span><span>EXPECTATION.</span></h1>
          <div className="hero-bottom">
            <p>Strategy, creativity and digital marketing built to make brands impossible to ignore.</p>
            <div className="button-row"><Button className="button-primary" onClick={openContact}>START A PROJECT <ArrowUpRight /></Button><Button className="button-secondary" variant="outline" asChild><a href="#services">EXPLORE SERVICES <ArrowDown /></a></Button></div>
          </div>
        </div>
        <a className="scroll-cue" href="#statement">SCROLL TO EXPLORE <ArrowDown /></a>
      </section>

      <section id="statement" className="statement section-pad">
        <div className="statement-circle" aria-hidden="true" />
        <p className="section-label" data-reveal>01 / THE IDEA</p>
        <div className="statement-grid"><h2 className="display-title" data-reveal>WE DON&apos;T JUST<br />MAKE <span className="accent-text">NOISE.</span><br />WE MAKE IT<br /><span className="accent-text">MATTER.</span></h2><p className="body-lead" data-reveal>Every brand has something worth saying. We turn that message into sharp strategy, distinctive creative and marketing that moves people to act.</p></div>
      </section>

      <section id="about" className="about section-pad">
        <p className="section-label" data-reveal>02 / ABOUT ZYRO</p>
        <div className="about-grid"><div><p className="kicker" data-reveal>WE ARE ZYRO ADZ.</p><h2 className="display-title" data-reveal>IDEAS THAT<br /><span className="accent-text">MOVE.</span><br />BRANDS THAT<br /><span className="accent-text">GROW.</span></h2></div><div className="about-copy" data-reveal><p>ZYRO ADZ is a modern marketing and advertising agency focused on building brands that look sharp, communicate clearly and perform in the real world.</p><p>From strategy and identity to social media, campaigns, advertising and content, we bring creative thinking and business goals together.</p><Button className="button-primary" onClick={openContact}>WORK WITH US <ArrowUpRight /></Button></div></div>
        <div className="stats" data-reveal>{[["20+","PROJECTS"],["10+","BRANDS"],["06","CORE SERVICES"],["∞","BIG IDEAS"]].map(([value,label]) => <div className="stat" key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
      </section>

      <section id="services" className="services section-pad">
        <p className="section-label" data-reveal>03 / SERVICES</p><h2 className="display-title" data-reveal>CREATIVE<br />THAT <span className="accent-text">WORKS.</span></h2>
        <div className="service-list">{services.map(([number,title,description], index) => <article className="service-row" data-reveal key={title} style={{ "--delay": `${index * 70}ms` } as React.CSSProperties}><span>{number}</span><h3>{title}</h3><p>{description}</p><ArrowUpRight aria-hidden="true" /></article>)}</div>
      </section>

      <section id="process" className="process section-pad">
        <div className="process-heading"><div><p className="section-label" data-reveal>04 / PROCESS</p><h2 className="display-title" data-reveal>FROM IDEA<br />TO <span className="accent-text">IMPACT.</span></h2></div><p className="body-lead" data-reveal>Clear thinking. Sharp execution. No unnecessary layers.</p></div>
        <div className="process-list">{processSteps.map(([number,title,description], index) => <article className="process-row" data-reveal key={title} style={{ "--delay": `${index * 70}ms` } as React.CSSProperties}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
      </section>

      <section className="final-cta section-pad">
        <div className="cta-glow" aria-hidden="true" /><p className="section-label" data-reveal>READY WHEN YOU ARE</p><h2 className="display-title" data-reveal>LET&apos;S MAKE<br />IT <span className="accent-text">HAPPEN.</span></h2><p className="body-lead" data-reveal>Have an idea, a brand that needs a refresh, or a campaign ready to launch?</p><Button className="button-primary cta-button" onClick={openContact}>START A CONVERSATION <ArrowUpRight /></Button>
      </section>

      <footer><div className="footer-main"><Logo /><p>MARKETING BEYOND EXPECTATION.</p></div><div className="footer-links"><span>© 2026 ZYRO ADZ</span><button onClick={openContact}>CONTACT</button><a href="https://www.instagram.com/zyro_adz?stkn=MW5ld3c1eXo0NGMzYQ==" target="_blank" rel="noreferrer">INSTAGRAM</a><a href="#home">BACK TO TOP <ArrowUp /></a></div></footer>

      <div className={`contact-modal ${modalOpen ? "is-open" : ""}`} aria-hidden={!modalOpen} role="dialog" aria-modal="true" aria-labelledby="contact-title" onMouseDown={(event) => { if (event.target === event.currentTarget) setModalOpen(false); }}>
        <div className="contact-panel"><div className="contact-panel__top"><Logo compact /><Button ref={closeRef} variant="ghost" size="icon" onClick={() => setModalOpen(false)} aria-label="Close contact dialog"><X /></Button></div><h2 id="contact-title">LET&apos;S BUILD<br /><span className="accent-text">SOMETHING.</span></h2><p>Choose how you&apos;d like to connect with Zyro Adz.</p><div className="contact-grid">
          <a href="tel:+917994764276"><Phone /><span>CALL US</span><strong>79947 64276</strong><ArrowUpRight /></a>
          <a href="https://wa.me/917994764276" target="_blank" rel="noreferrer"><MessageCircle /><span>WHATSAPP</span><strong>Chat with us</strong><ArrowUpRight /></a>
          <a href="mailto:zyroadz@gmail.com"><Mail /><span>EMAIL</span><strong>zyroadz@gmail.com</strong><ArrowUpRight /></a>
          <a href="https://www.instagram.com/zyro_adz?stkn=MW5ld3c1eXo0NGMzYQ==" target="_blank" rel="noreferrer"><Instagram /><span>INSTAGRAM</span><strong>@zyro_adz</strong><ArrowUpRight /></a>
        </div></div>
      </div>
    </main>
  );
}
