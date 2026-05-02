/**
 * Reserved region for Google AdSense (enable script in root layout when approved).
 * Min-height reduces CLS when real ads load.
 */
export function AdSlot({ label = "Advertisement" }: { label?: string }) {
  return (
    <aside
      className="ad-slot my-8 flex min-h-[120px] items-center justify-center rounded-lg border border-dashed border-[var(--border)] bg-[var(--muted-bg)]/50 px-4 py-6 text-center text-xs text-[var(--muted)]"
      aria-label={label}
    >
      <span>Ad placeholder — replace with AdSense unit when ready.</span>
    </aside>
  );
}
