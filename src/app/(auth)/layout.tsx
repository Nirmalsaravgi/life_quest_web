// src/app/(auth)/layout.tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-obsidian overflow-hidden">
      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 scanline-overlay opacity-20" />

      {/* Vertical Scan Line */}
      <div className="vertical-scan-line" />

      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-ember/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amethyst/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Corner HUD Frame */}
      <div className="fixed inset-0 pointer-events-none z-40 border-[1px] border-white/5 hidden md:block m-6 rounded-sm">
        <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-ember/50" />
        <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-ember/50" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-ember/50" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-ember/50" />

        {/* Corner Dots */}
        <div className="absolute top-1/2 left-4 w-2 h-2 border border-amethyst/40 -translate-y-1/2" />
        <div className="absolute top-1/2 right-4 w-2 h-2 border border-amethyst/40 -translate-y-1/2" />
        <div className="absolute top-4 left-1/2 w-2 h-2 border border-amethyst/40 -translate-x-1/2" />
        <div className="absolute bottom-4 left-1/2 w-2 h-2 border border-amethyst/40 -translate-x-1/2" />

        {/* System Info */}
        <div className="absolute bottom-8 left-8 text-[10px] text-gray-500 font-mono tracking-widest flex flex-col gap-1">
          <span className="text-ember">SYSTEM EMBER :: ONLINE</span>
          <span>CORE_TEMP: 420°K</span>
          <span>ENCRYPTION: AES-4096-GCM</span>
        </div>

        {/* Status */}
        <div className="absolute top-8 right-8 text-[10px] text-amethyst font-mono tracking-widest text-right">
          <span>SECURE_GATEWAY_V3</span>
          <br />
          <span className="animate-pulse text-success-neon">● LINK ESTABLISHED</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="w-full max-w-md relative z-20 p-4">{children}</main>
    </div>
  );
}