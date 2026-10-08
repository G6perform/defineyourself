export default function UnsubscribePage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-off-white">
      <div className="max-w-md mx-auto px-4 text-center">
        <h1 className="font-display text-4xl tracking-wider text-text-dark mb-4">
          UNSUBSCRIBED
        </h1>
        <p className="text-text-gray leading-relaxed mb-8">
          You have been removed from our mailing list. We respect your decision
          and hope you&apos;ll continue to support our mission in other ways.
        </p>
        <a
          href="/"
          className="inline-block bg-charcoal text-white font-bold text-sm uppercase tracking-wider px-8 py-3 hover:bg-charcoal/90 transition-colors"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
