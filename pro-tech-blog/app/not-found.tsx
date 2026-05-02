import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-lg flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold text-[var(--foreground)]">
        Page not found
      </h1>
      <p className="mt-2 text-[var(--muted)]">
        That URL does not match any post or page.
      </p>
      <Link
        href="/"
        className="mt-8 text-sm font-medium text-[var(--accent)] hover:underline"
      >
        Back home
      </Link>
    </main>
  );
}
