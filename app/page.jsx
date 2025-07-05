import  './module.css';
import Link from 'next/link';
export default function WelcomePage() {
  return (
    <main className='container'>
      <h1 className='title'>Welcome to EduTrack 🎓</h1>
      <p className='subtitle'>
        Your all-in-one Code management dashboard. Easily manage students, teachers, classes, and more.
      </p>
      <div className='buttonGroup'>
        <Link href="/Login" className='primaryButton'>Login</Link>
        <Link href="/Signup" className='secondaryButton'>Sign Up</Link>
      </div>
    </main>
  );
}
