import Link from 'next/link';

export default function NotFound() {
  return <main className="not-found"><span className="eyebrow">Form & Field / 404</span><h1>A little<br /><em>off the plan.</em></h1><p>We couldn’t find the page you were looking for.</p><Link href="/" className="button">Return to the house ↗</Link></main>;
}
