import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-md w-full text-center space-y-4">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">404</h1>
        <p className="text-zinc-600 dark:text-zinc-400">찾으시는 단원이 아직 준비되지 않았어요.</p>
        <Link
          href="/"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          홈으로
        </Link>
      </div>
    </main>
  );
}
