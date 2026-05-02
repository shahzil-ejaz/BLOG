import Link from "next/link";
import { Menu, Terminal } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/lib/site";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <div className="sticky top-4 z-50 mx-auto w-full max-w-5xl px-4 sm:px-6 mt-4 mb-6">
      <header className="rounded-full border border-[var(--border)] bg-[var(--card)]/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.02)] transition-all">
        <div className="flex h-14 items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="group flex items-center gap-3 font-semibold tracking-tight text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
          >
            <div className="flex size-8 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)] transition-transform duration-300 group-hover:scale-110 group-hover:bg-[var(--accent)] group-hover:text-white group-hover:shadow-[0_0_15px_var(--accent)]">
              <Terminal className="size-4" />
            </div>
            <span className="hidden sm:inline-block font-bold">{siteConfig.name}</span>
          </Link>
          
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-[var(--muted)] transition-all duration-200 hover:bg-[var(--accent)]/10 hover:text-[var(--accent)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <details className="group relative md:hidden">
              <summary className="flex size-9 cursor-pointer list-none items-center justify-center rounded-full border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted-bg)] [&::-webkit-details-marker]:hidden transition-colors">
                <Menu className="size-4" />
                <span className="sr-only">Open menu</span>
              </summary>
              <div className="absolute right-0 top-full mt-2 w-48 origin-top-right rounded-2xl border border-[var(--border)] bg-[var(--card)]/95 p-2 shadow-xl backdrop-blur-xl">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-xl px-4 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </details>
          </div>
        </div>
      </header>
    </div>
  );
}
