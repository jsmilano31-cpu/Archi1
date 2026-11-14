import { ArrowDown, ArrowRight, ArrowUpRight, MoveUpRight, Plus } from 'lucide-react';
import { project, editorial } from '@/data/project';
import { SiteHeader } from '@/components/SiteHeader';
import { MediaImage } from '@/components/MediaImage';
import { FloorExplorer } from '@/components/FloorExplorer';
import { Gallery } from '@/components/Gallery';
import { Experience } from '@/components/Experience';
import { Motion } from '@/components/Motion';
import { validateProjectPlans } from '@/lib/plan';

function Label({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="section-label"><span>{number}</span><span className="label-line" /><span>{children}</span></div>;
}

export default function Home() {
  const errors = validateProjectPlans(project.floors, project.rooms);
  if (errors.length) throw new Error(errors.join('; '));
  return <Motion>
    <SiteHeader studio={project.studio} />
    <main id="main">
      <section id="hero" className="hero" aria-labelledby="hero-title">
        <div className="hero-media"><MediaImage src={project.hero.src} alt={project.hero.alt} priority /></div><div className="hero-shade" />
        <div className="hero-content"><div className="hero-kicker"><span className="status-dot" /><span>An architectural study</span></div>
          <h1 id="hero-title" className="hero-title"><span>The Courtyard</span><span><em>House.</em></span></h1>
          <div className="hero-description"><span className="hero-rule" /><p>{project.subtitle}</p></div>
        </div>
        <div className="hero-bottom"><a href="#vision" className="scroll-cue"><span className="scroll-circle"><ArrowDown size={17} /></span><span>Scroll to discover</span></a><span className="hero-project-type">Private residence<br /><span>Concept presentation</span></span><span className="hero-index">01 <span>/ 08</span></span></div>
        {project.demo && <div className="demo-label">Demo concept · illustrative imagery</div>}
      </section>

      <section id="vision" className="section vision" aria-labelledby="vision-title">
        <Label number="02">The vision</Label>
        <div className="vision-grid"><div data-reveal><h2 id="vision-title">Less noise.<br /><em>More meaning.</em></h2><div className="vision-principles">{editorial.vision.principles.map((text, i) => <div key={text}><span>0{i + 1}</span><span>{text}</span><Plus size={13} /></div>)}</div></div>
          <div className="vision-right" data-reveal><p className="lead">{editorial.vision.body}</p><p className="muted">{editorial.vision.note}</p><figure className="vision-image"><MediaImage src="/images/detail.webp" alt="Illustrative meeting of limestone, oak and bronze in soft sunlight." /><figcaption>Material, light, and a little breathing room.</figcaption></figure></div>
        </div>
      </section>

      <section id="exterior" className="exterior" aria-labelledby="exterior-title">
        <div className="section exterior-intro"><Label number="03">The architecture</Label><div className="split-heading"><h2 id="exterior-title" data-reveal>Grounded in nature.<br /><em>Open to possibility.</em></h2><p className="muted" data-reveal>{editorial.exterior.body}</p></div></div>
        <div className="exterior-scene"><div className="scene-media"><MediaImage src={project.hero.src} alt={project.hero.alt} /></div><div className="scene-shade" /><div className="scene-caption"><span className="eyebrow">A dialogue with the landscape</span><p>Built around<br /><em>a slower rhythm.</em></p><span className="small">Garden elevation / Illustrative render</span></div><span className="scene-number">01 — 01</span></div>
      </section>

      <section id="floorplans" className="section plans-section" aria-labelledby="plans-title"><Label number="04">The spatial story</Label><div className="split-heading"><h2 id="plans-title" data-reveal>A place for<br /><em>every moment.</em></h2><div data-reveal><p className="muted">Discover how the spaces connect. Choose a floor, then select a room to explore its character.</p><span className="small plan-instruction"><span className="status-dot" /> Interactive floor plans</span></div></div><FloorExplorer floors={project.floors} rooms={project.rooms} /></section>

      <section id="interiors" className="section interiors" aria-labelledby="interiors-title"><Label number="05">Life within</Label><div className="split-heading"><h2 id="interiors-title" data-reveal>Spaces to<br /><em>simply be.</em></h2><p className="muted" data-reveal>{editorial.interiors.body}</p></div><Gallery items={project.gallery} /></section>

      <section id="experience" className="experience" aria-label="Experience the residence"><Experience video={project.video} model={project.model} poster={project.hero.src} /></section>

      <section id="materials" className="section materials" aria-labelledby="materials-title"><Label number="07">The finer details</Label><div className="split-heading"><h2 id="materials-title" data-reveal>Honest materials.<br /><em>Lasting character.</em></h2><p className="muted" data-reveal>A restrained palette, chosen to feel as good as it looks. Materials that hold the light, invite touch, and grow more beautiful with time.</p></div><div className="material-grid">{editorial.materials.map((material, i) => <article className="material" key={material.name} data-reveal><div className={`material-swatch ${material.className}`}><span>0{i + 1}</span><MoveUpRight size={18} aria-hidden="true" /></div><h3>{material.name}</h3><p className="small muted">{material.description}</p></article>)}</div><div className="project-facts">{editorial.facts.map(([label, value]) => <div key={label}><span className="eyebrow muted">{label}</span><span>{value}</span></div>)}</div><p className="materials-note small muted">Illustrative material direction. Final specifications will be supplied by the architect.</p></section>

      <section id="finale" className="finale" aria-labelledby="finale-title"><div className="finale-image"><MediaImage src="/images/living.webp" alt="Illustrative sunlit living space opening onto a planted courtyard." /></div><div className="finale-shade" /><div className="finale-content" data-reveal><span className="eyebrow">08 / The next chapter</span><h2 id="finale-title">A place to belong.<br /><em>A conversation to begin.</em></h2><p>Great spaces begin with a shared vision.<br />Let’s imagine what comes next.</p>{project.contactEmail ? <a href={`mailto:${project.contactEmail}`} className="button light">Discuss the project <ArrowUpRight size={17} /></a> : <><a href="#project-note" className="button light">About this presentation <ArrowRight size={17} /></a><span className="small finale-contact-note">Studio contact details to follow.</span></>}</div></section>
    </main>
    <footer className="site-footer" id="project-note"><div className="footer-main"><a className="wordmark" href="#hero">{project.studio}<span className="wordmark-dot" /></a><p>Architecture with intention.<br /><span className="muted">Space for the way we live.</span></p><a href="#hero" className="back-top">Back to top <ArrowUpRight size={16} /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {project.studio} · Demo identity</span><p>This is a fictional architectural presentation. Images are AI-generated illustrations; drawings are schematic and not to scale.</p><span>The Courtyard House</span></div></footer>
  </Motion>;
}
