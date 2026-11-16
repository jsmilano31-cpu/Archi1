import { ArrowDown, ArrowUpRight, ArrowRight } from "lucide-react";
import { project, images, arrival, renderByFile } from "@/data/project";
import { MediaImage } from "@/components/MediaImage";
import { SiteHeader } from "@/components/SiteHeader";
import { Motion } from "@/components/Motion";
import { Gallery } from "@/components/Gallery";
function Label({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <i />
      {children}
    </div>
  );
}
export default function Home() {
  return (
    <Motion>
      <SiteHeader />
      <main id="main">
        <section id="hero" className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <span className="eyebrow">
              A home, considered <span lang="ja">住まいを想う</span>
            </span>
            <h1 id="hero-title">
              Your next
              <br />
              chapter
              <br />
              <em>begins here.</em>
            </h1>
            <p>Discover the spaces that will become your everyday.</p>
            <a className="button" href="#exterior">
              Step inside <ArrowUpRight size={16} />
            </a>
            <a className="scroll-cue" href="#vision">
              <ArrowDown size={15} /> Scroll to discover
            </a>
          </div>
          <figure className="hero-frame">
            <MediaImage
              image={project.hero}
              priority
              sizes="(max-width:767px) 100vw, 72vw"
            />
            <figcaption>
              <span>01 / The arrival</span>
              <i />
              <span>Exterior perspective</span>
            </figcaption>
          </figure>
        </section>
        <section
          id="vision"
          className="section life"
          aria-labelledby="vision-title"
        >
          <Label number="02">
            Life within / <span lang="ja">暮らしの風景</span>
          </Label>
          <div className="split-heading">
            <h2 id="vision-title" data-reveal>
              A place for
              <br />
              <em>every moment.</em>
            </h2>
            <p data-reveal>
              Places to gather. Space to retreat. Explore a home composed of
              light finishes, warm textures, and a connection to the outdoors.
            </p>
          </div>
          <div className="life-pair">
            <figure data-reveal>
              <MediaImage image={project.living} />
              <figcaption>
                Gather. Unwind. Feel at home.
                <span lang="ja">くつろぎの時間</span>
              </figcaption>
            </figure>
            <figure data-reveal>
              <MediaImage image={project.bedroom} />
              <figcaption>
                Your own quiet retreat.<span lang="ja">自分だけの安らぎ</span>
              </figcaption>
            </figure>
          </div>
        </section>
        <section
          id="exterior"
          className="arrival"
          aria-labelledby="arrival-title"
        >
          <div className="section arrival-intro">
            <Label number="03">
              Coming home / <span lang="ja">住まいへのアプローチ</span>
            </Label>
            <div className="split-heading">
              <h2 id="arrival-title" data-reveal>
                An invitation
                <br />
                <em>to arrive.</em>
              </h2>
              <div>
                <p>
                  The complete exterior, the sheltered entrance, and the details
                  that welcome you home.
                </p>
                <a className="text-link" href="#floorplans">
                  Skip to explore the spaces <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
          <div className="arrival-sequence">
            {arrival.map((image, i) => (
              <figure className="arrival-scene" key={image.id}>
                <MediaImage image={image} />
                <figcaption>
                  <span className="eyebrow">The approach / 0{i + 1}</span>
                  <h3>
                    {
                      [
                        "The home, in view.",
                        "A welcome, considered.",
                        "A gentler approach.",
                        "Shelter for the everyday.",
                      ][i]
                    }
                  </h3>
                  <span>{image.spaceName} · Architectural render</span>
                </figcaption>
                <span className="scene-index">0{i + 1} / 04</span>
              </figure>
            ))}
          </div>
        </section>
        <section
          id="floorplans"
          className="section explore-section"
          aria-labelledby="explore-title"
        >
          <Label number="04">
            Explore by space / <span lang="ja">空間を巡る</span>
          </Label>
          <div className="split-heading">
            <h2 id="explore-title" data-reveal>
              Explore
              <br />
              <em>your home.</em>
            </h2>
            <p>
              Choose a space. Change your perspective. Discover every supplied
              view, from the entrance to the balcony, at your own pace.
            </p>
          </div>
          <Gallery items={images} />
        </section>
        <section
          id="interiors"
          className="section retreat"
          aria-labelledby="retreat-title"
        >
          <Label number="05">
            A quieter rhythm / <span lang="ja">穏やかな時間</span>
          </Label>
          <div className="split-heading">
            <h2 id="retreat-title" data-reveal>
              Connected spaces.
              <br />
              <em>Personal moments.</em>
            </h2>
            <p>
              A sculptural stair connects the levels. The rooms beyond offer
              their own character, with thoughtful lighting and comfortable
              places to rest.
            </p>
          </div>
          <div className="retreat-grid">
            <figure data-reveal>
              <MediaImage image={renderByFile("STAIRS AREA 3.png")} />
              <figcaption>A connection between levels.</figcaption>
            </figure>
            <figure data-reveal>
              <MediaImage image={renderByFile("BEDROOM 3 AREA 1.png")} />
              <figcaption>A room with its own character.</figcaption>
            </figure>
          </div>
        </section>
        <section
          id="experience"
          className="balcony section"
          aria-labelledby="balcony-title"
        >
          <div className="balcony-heading">
            <Label number="06">
              Room to breathe / <span lang="ja">開放感のあるひととき</span>
            </Label>
            <h2 id="balcony-title" data-reveal>
              A little closer
              <br />
              <em>to the outdoors.</em>
            </h2>
            <p>
              A sheltered lounge. A view into the greenery.
              <br />A space to enjoy the quieter parts of the day.
            </p>
            <a href="#floorplans" className="text-link">
              Explore every perspective <ArrowUpRight size={16} />
            </a>
          </div>
          <figure data-reveal>
            <MediaImage image={project.balcony} />
            <figcaption>Covered balcony / Architectural render</figcaption>
          </figure>
        </section>
        <section
          id="materials"
          className="section details"
          aria-labelledby="details-title"
        >
          <Label number="07">
            A shared palette / <span lang="ja">素材と色の調和</span>
          </Label>
          <div className="details-grid">
            <figure data-reveal>
              <MediaImage image={renderByFile("AESTHETICS 1.png")} />
            </figure>
            <div>
              <h2 id="details-title" data-reveal>
                Warmth.
                <br />
                Contrast.
                <br />
                <em>Character.</em>
              </h2>
              <p>
                The same visual language carries from the facade into the home:
                light masonry, timber-toned surfaces, dark framing, and soft
                neutral interiors.
              </p>
              <div className="swatches">
                {[
                  ["masonry", "Light masonry"],
                  ["timber", "Timber tones"],
                  ["charcoal", "Dark accents"],
                  ["ivory", "Soft neutrals"],
                ].map(([c, label]) => (
                  <div key={c}>
                    <span className={c} />
                    <small>{label}</small>
                  </div>
                ))}
              </div>
              <p className="fine-print">
                Finish descriptions refer to the appearance of the supplied
                renders. Final material specifications are not stated.
              </p>
            </div>
          </div>
        </section>
        <section id="finale" className="finale" aria-labelledby="finale-title">
          <Label number="08">
            The next chapter / <span lang="ja">これからの暮らし</span>
          </Label>
          <h2 id="finale-title" data-reveal>
            Imagine your
            <br />
            <em>everyday here.</em>
          </h2>
          <p>A closer look at the spaces that could become home.</p>
          <a className="button" href="#floorplans">
            Return to the collection <ArrowUpRight size={16} />
          </a>
        </section>
      </main>
      <footer className="site-footer">
        <a href="#hero" className="wordmark">
          THE RESIDENCE
        </a>
        <span>Architectural design presentation · 48 perspectives</span>
        <a href="#hero">Back to top ↑</a>
        <p>
          Supplied architectural renders illustrate the proposed design.
          Furniture, finishes and landscaping are presented as visual design
          intent.
        </p>
      </footer>
    </Motion>
  );
}
