export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <div
        role="status"
        aria-label="불러오는 중"
        className="h-12 w-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"
      />
    </div>
  );
}
