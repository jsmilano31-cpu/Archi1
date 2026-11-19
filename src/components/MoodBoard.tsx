import Image from "next/image";
import { MediaImage } from "@/components/MediaImage";
import { renderByFile } from "@/data/project";
import styles from "./MoodBoard.module.css";

const finishes = [
  { sample: "masonry", name: "Light masonry", ja: "淡色の石積み", color: "#cec7b6" },
  { sample: "timber", name: "Timber tones", ja: "木の色合い", color: "#805638" },
  { sample: "charcoal", name: "Dark accents", ja: "濃色のアクセント", color: "#44463c" },
  { sample: "fabric", name: "Soft neutrals", ja: "柔らかな中間色", color: "#c4bbab" },
];

export function MoodBoard() {
  return (
    <div className={styles.board} data-reveal>
      <h2 id="details-title">Warmth. Contrast. <em>Character.</em></h2>
      <div className={styles.composition}>
        <div className={styles.facade}>
          <MediaImage image={renderByFile("EXTERIOR PERSPECTIVE 1.png")} sizes="(max-width: 700px) 92vw, 54vw" />
        </div>
        <div className={styles.room}>
          <MediaImage image={renderByFile("LIVING AREA 1.png")} sizes="(max-width: 700px) 92vw, 40vw" />
        </div>
        <div className={styles.samples} aria-hidden="true">
          {finishes.map(({ sample }) => (
            <div key={sample} className={styles.sample}>
              <Image src={`/moodboard/${sample}.webp`} alt="" fill sizes="(max-width: 700px) 22vw, 12vw" />
            </div>
          ))}
        </div>
      </div>
      <ul className={styles.legend} aria-label="Material palette">
        {finishes.map(({ sample, name, ja, color }) => (
          <li key={sample}>
            <i style={{ backgroundColor: color }} aria-hidden="true" />
            <span>{name}<small lang="ja">{ja}</small></span>
          </li>
        ))}
      </ul>
      <p className={styles.note}>Finish descriptions reflect the supplied renders. Final specifications may vary.</p>
    </div>
  );
}
