import Link from 'next/link';
import './nav.css'; // Optional: your own stylesheet

export default function Page() {
  return (
    <main className="section-container">
      <h1 className="section-title">🗂️ welcome {}</h1>
      <p className="section-description">
        Content for this section coming soon.
      </p>
      <Link href="/" className="go-back-link">← Back to Home</Link>
    </main>
  );
}
