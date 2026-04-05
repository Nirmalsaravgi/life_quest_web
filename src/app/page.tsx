import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none scanline-overlay opacity-20 z-50" />

      {/* Corner HUD Frame */}
      <div className="fixed inset-0 pointer-events-none z-40 border-[1px] border-white/5 hidden md:block m-4 rounded-none">
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-ember" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-ember" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-ember" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-ember" />
        <div className="absolute top-1/2 left-2 w-1 h-8 bg-ember/30 -translate-y-1/2" />
        <div className="absolute top-1/2 right-2 w-1 h-8 bg-ember/30 -translate-y-1/2" />

        {/* System Diagnostics */}
        <div className="absolute bottom-6 left-6 text-[10px] text-ember-glow font-mono tracking-widest flex flex-col gap-1 opacity-70">
          <span>SYS.DIAG :: ONLINE</span>
          <span>CORE_TEMP: 420K</span>
          <span>QUEST_FLUX: STABLE</span>
        </div>

        {/* Status Indicator */}
        <div className="absolute top-6 right-6 text-[10px] text-success-neon font-mono tracking-widest text-right opacity-80">
          <span>SECURE_LINK_ESTABLISHED</span>
          <br />
          <span className="animate-pulse">● LIVE FEED</span>
        </div>
      </div>

      <div className="relative flex min-h-screen flex-col">
        {/* Header */}
        <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-obsidian/95 backdrop-blur-md">
          <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="text-ember relative group">
                <div className="absolute inset-0 bg-ember/20 blur-md rounded-full group-hover:bg-ember/40 transition-all" />
                <svg
                  className="relative z-10 w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L2 19h20L12 2zm0 4l6.5 11h-13L12 6z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold tracking-[0.1em] text-white leading-none">
                  RENMA
                </h1>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-ember rounded-none" />
                  <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">
                    Ember OS v3.1
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-10">
              <a
                className="text-xs font-bold tracking-[0.2em] text-gray-500 hover:text-ember transition-colors flex items-center gap-2 group font-mono"
                href="#features"
              >
                <span className="w-1 h-1 bg-gray-600 group-hover:bg-ember transition-colors" />
                FEATURES
              </a>
              <a
                className="text-xs font-bold tracking-[0.2em] text-gray-500 hover:text-white transition-colors font-mono"
                href="#modules"
              >
                MODULES
              </a>
              <a
                className="text-xs font-bold tracking-[0.2em] text-gray-500 hover:text-white transition-colors font-mono"
                href="#pricing"
              >
                PRICING
              </a>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center gap-6">
              <Link
                href="/login"
                className="text-xs font-bold tracking-widest text-white hidden sm:block hover:text-ember transition-colors font-mono"
              >
                LOGIN
              </Link>
              <Link
                href="/register"
                className="relative overflow-hidden group bg-transparent border border-ember/30 hover:border-ember hover:bg-ember/5 text-ember text-[11px] font-bold py-2 px-6 transition-all duration-300 btn-clip font-mono"
              >
                <span className="relative z-10 tracking-[0.2em]">
                  START_QUEST
                </span>
                <div className="absolute inset-0 bg-ember/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-grow flex flex-col bg-charcoal">
          {/* Hero Section */}
          <section className="relative pt-8 pb-12 md:pt-12 md:pb-16 overflow-hidden bg-metallic-texture min-h-[calc(100vh-80px)] flex items-center">
            <div className="absolute inset-0 bg-[size:40px_40px] bg-grid-pattern opacity-[0.1]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-ember/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amethyst/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-20">
              <div className="flex flex-col items-center text-center gap-6 max-w-6xl mx-auto">
                {/* Core Animation */}
                <div
                  className="relative w-48 h-48 md:w-64 md:h-64 flex justify-center items-center"
                  title="Core System"
                >
                  <div className="core-wrapper">
                    <div className="core-inner animate-pulse-fast !w-20 !h-20 md:!w-24 md:!h-24" />
                    <div className="absolute w-36 h-36 md:w-44 md:h-44 border border-ember/60 rounded-full animate-spin-slow opacity-80 border-t-transparent border-l-transparent" />
                    <div className="absolute w-44 h-44 md:w-52 md:h-52 border border-dashed border-amethyst/40 rounded-full animate-spin-reverse-slow" />
                    <div
                      className="absolute w-52 h-52 md:w-60 md:h-60 border border-thin border-ember/20 rounded-full animate-spin-slow"
                      style={{ animationDuration: "40s" }}
                    />
                    <div
                      className="absolute w-40 h-40 md:w-48 md:h-48 border border-amethyst/30 animate-[spin_15s_linear_infinite]"
                      style={{ transform: "rotate(45deg)" }}
                    />
                    <div
                      className="absolute w-40 h-40 md:w-48 md:h-48 border border-ember/20 animate-[spin_25s_linear_infinite_reverse]"
                      style={{ transform: "rotate(45deg)" }}
                    />
                  </div>

                  {/* Sync Rate */}
                  <div className="absolute top-0 -right-16 bg-black/80 border-l-2 border-ember p-2 pl-4 backdrop-blur-sm hidden md:block">
                    <p className="text-[9px] text-gray-500 font-mono leading-none mb-1">
                      SYNC_RATE
                    </p>
                    <p className="text-lg font-mono text-ember font-bold animate-flicker">
                      99.8%
                    </p>
                  </div>

                  {/* User Level */}
                  <div className="absolute bottom-10 -left-20 bg-black/80 border-r-2 border-amethyst p-2 pr-4 text-right backdrop-blur-sm hidden md:block">
                    <p className="text-[9px] text-gray-500 font-mono leading-none mb-1">
                      YOUR_LEVEL
                    </p>
                    <p className="text-lg font-mono text-amethyst font-bold">
                      LVL_01
                    </p>
                  </div>
                </div>

                {/* Hero Text */}
                <div className="flex flex-col gap-4 items-center max-w-4xl">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="h-[1px] w-12 bg-ember/50" />
                    <span className="text-ember text-xs font-mono tracking-[0.3em] uppercase font-bold">
                      System Initialization Ready
                    </span>
                    <span className="h-[1px] w-12 bg-ember/50" />
                  </div>
                  <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.85] font-display">
                    UPGRADE YOUR
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-ember via-ember-glow to-amethyst glow-text">
                      REALITY
                    </span>
                  </h1>
                  <p className="text-gray-400 text-base md:text-lg font-light max-w-lg leading-relaxed mt-2 font-mono">
                    // Gamify existence.
                    <br />
                    // Track stats. Level up.
                    <br />
                    // The operating system for the human experience.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row gap-4 w-full justify-center">
                  <Link
                    href="/register"
                    className="relative group bg-ember text-black font-bold h-14 px-12 overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(255,95,31,0.4)] btn-clip flex items-center justify-center"
                  >
                    <div className="absolute inset-0 bg-white/40 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <div className="flex items-center gap-3 relative z-10 font-display tracking-widest">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>INITIALIZE_PROTOCOL</span>
                    </div>
                  </Link>
                  <button className="flex items-center justify-center gap-2 h-14 px-10 border border-gray-700 hover:border-white text-gray-400 hover:text-white transition-all font-bold tracking-wide bg-charcoal/50 backdrop-blur-sm btn-clip font-display">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <span>SYSTEM DEMO</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section id="features" className="border-y border-white/5 bg-black">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
                <div className="p-8 flex flex-col items-center md:items-start gap-2 group hover:bg-white/5 transition-colors">
                  <p className="text-gray-600 text-[10px] font-mono tracking-widest uppercase">
                    System Status
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-success-neon animate-pulse shadow-[0_0_10px_#4ade80]" />
                    <p className="text-white text-xl font-bold font-mono">
                      ONLINE
                    </p>
                  </div>
                  <p className="text-success-neon text-[10px] font-mono border-l-2 border-gray-800 pl-2">
                    UPTIME: 99.9%
                  </p>
                </div>
                <div className="p-8 flex flex-col items-center md:items-start gap-2 group hover:bg-white/5 transition-colors">
                  <p className="text-gray-600 text-[10px] font-mono tracking-widest uppercase">
                    Active Players
                  </p>
                  <p className="text-white text-xl font-bold font-mono group-hover:text-ember transition-colors">
                    12,402
                  </p>
                  <p className="text-ember text-[10px] font-mono border-l-2 border-ember pl-2">
                    +12% GROWTH
                  </p>
                </div>
                <div className="p-8 flex flex-col items-center md:items-start gap-2 group hover:bg-white/5 transition-colors">
                  <p className="text-gray-600 text-[10px] font-mono tracking-widest uppercase">
                    Daily Quests
                  </p>
                  <p className="text-white text-xl font-bold font-mono">
                    ACTIVE
                  </p>
                  <p className="text-gray-500 text-[10px] font-mono border-l-2 border-gray-800 pl-2">
                    SYNCED: 100%
                  </p>
                </div>
                <div className="p-8 flex flex-col items-center md:items-start gap-2 group hover:bg-white/5 transition-colors">
                  <p className="text-gray-600 text-[10px] font-mono tracking-widest uppercase">
                    Protocol Ver
                  </p>
                  <p className="text-white text-xl font-bold font-mono text-amethyst">
                    v1.0.0
                  </p>
                  <p className="text-gray-500 text-[10px] font-mono border-l-2 border-gray-800 pl-2">
                    STABLE BUILD
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Modules Section */}
          <section id="modules" className="py-24 relative bg-charcoal">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="flex flex-col md:flex-row gap-12 items-end mb-16 border-b border-white/5 pb-8">
                <div className="flex-1">
                  <h2 className="text-4xl font-black text-white mb-2 tracking-tight font-display">
                    SYSTEM MODULES
                  </h2>
                  <p className="text-gray-500 font-mono text-sm max-w-md">
                    /// Core components of the LifeQuest improvement protocol.
                  </p>
                </div>
                <div className="flex-none pb-2">
                  <div className="text-right">
                    <p className="text-xs font-mono text-ember mb-1">
                      MODULES_LOADED: 3/3
                    </p>
                    <div className="flex gap-1 justify-end">
                      <span className="h-1 w-4 bg-ember" />
                      <span className="h-1 w-4 bg-ember/50" />
                      <span className="h-1 w-4 bg-ember/20" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Skill Trees */}
                <div className="hud-border p-8 group hover:bg-white/5 transition-colors duration-300">
                  <div className="w-12 h-12 border border-ember/30 flex items-center justify-center mb-6 text-ember group-hover:bg-ember group-hover:text-black transition-all shadow-[0_0_15px_rgba(255,95,31,0.1)]">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wide font-display">
                    Skill Trees
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 font-mono">
                    Unlock real-world abilities through gamified progression
                    paths based on actual learning curves.
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
                    <div className="h-[4px] w-full bg-black border border-white/10">
                      <div className="h-full bg-success-neon w-2/3 group-hover:w-full transition-all duration-500 shadow-[0_0_5px_#4ade80]" />
                    </div>
                    <span className="text-success-neon">67%</span>
                  </div>
                </div>

                {/* Habit Tracking */}
                <div className="hud-border p-8 group hover:bg-white/5 transition-colors duration-300">
                  <div className="w-12 h-12 border border-white/20 flex items-center justify-center mb-6 text-gray-300 group-hover:bg-white group-hover:text-black transition-all">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wide font-display">
                    Habit Tracking
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 font-mono">
                    Monitor daily routines with precision analytics. Visualize
                    your consistency with streak bonuses.
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
                    <div className="h-[4px] w-full bg-black border border-white/10">
                      <div className="h-full bg-success-neon w-1/2 group-hover:w-full transition-all duration-500 shadow-[0_0_5px_#4ade80]" />
                    </div>
                    <span className="text-success-neon">50%</span>
                  </div>
                </div>

                {/* Social Raids */}
                <div className="hud-border p-8 group hover:bg-white/5 transition-colors duration-300">
                  <div className="w-12 h-12 border border-amethyst/30 flex items-center justify-center mb-6 text-amethyst group-hover:bg-amethyst group-hover:text-white transition-all shadow-[0_0_15px_rgba(157,78,221,0.2)]">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wide font-display">
                    Social Raids
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 font-mono">
                    Collaborate with other players to achieve massive community
                    goals and earn rare badges.
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
                    <div className="h-[4px] w-full bg-black border border-white/10">
                      <div className="h-full bg-success-neon w-3/4 group-hover:w-full transition-all duration-500 shadow-[0_0_5px_#4ade80]" />
                    </div>
                    <span className="text-success-neon">75%</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section
            id="pricing"
            className="py-20 bg-gradient-to-b from-charcoal to-obsidian border-t border-white/5"
          >
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="text-center mb-16">
                <span className="text-ember text-[10px] font-mono tracking-[0.3em] uppercase mb-2 block">
                  // SUBSCRIPTION_MODEL
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-white font-display">
                  SELECT YOUR TIER
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Rookie */}
                <div className="relative bg-[#151515] border border-white/5 p-8 flex flex-col hover:border-gray-600 transition-colors">
                  <div className="mb-6 pb-6 border-b border-white/5">
                    <h3 className="text-gray-400 text-sm font-bold tracking-widest mb-2 font-display">
                      ROOKIE AGENT
                    </h3>
                    <p className="text-4xl font-black text-white flex items-baseline gap-1 font-mono">
                      $0{" "}
                      <span className="text-sm font-medium text-gray-600 font-mono">
                        /mo
                      </span>
                    </p>
                  </div>
                  <ul className="flex-1 flex flex-col gap-4 mb-8 font-mono text-xs">
                    <li className="flex gap-3 text-gray-400">
                      <span className="text-gray-600">[+]</span> Basic Stat
                      Tracking
                    </li>
                    <li className="flex gap-3 text-gray-400">
                      <span className="text-gray-600">[+]</span> Daily Quests
                    </li>
                    <li className="flex gap-3 text-gray-400">
                      <span className="text-gray-600">[+]</span> Community
                      Access
                    </li>
                  </ul>
                  <button className="w-full py-3 border border-gray-700 text-white font-bold text-xs tracking-widest hover:bg-white hover:text-black transition-all font-display">
                    ACCESS BASIC
                  </button>
                </div>

                {/* Veteran */}
                <div className="relative bg-[#1a1a1a] border border-ember p-8 flex flex-col shadow-[0_0_30px_rgba(255,95,31,0.15)] transform md:-translate-y-4 z-10">
                  <div className="absolute top-0 right-0 bg-ember text-black text-[9px] font-bold px-3 py-1 font-mono">
                    RECOMMENDED
                  </div>
                  <div className="mb-6 pb-6 border-b border-ember/20">
                    <h3 className="text-ember text-sm font-bold tracking-widest mb-2 font-display">
                      VETERAN OPERATIVE
                    </h3>
                    <p className="text-4xl font-black text-white flex items-baseline gap-1 font-mono">
                      $15{" "}
                      <span className="text-sm font-medium text-gray-600 font-mono">
                        /mo
                      </span>
                    </p>
                  </div>
                  <ul className="flex-1 flex flex-col gap-4 mb-8 font-mono text-xs">
                    <li className="flex gap-3 text-white">
                      <span className="text-ember">[+]</span> Advanced Analytics
                    </li>
                    <li className="flex gap-3 text-white">
                      <span className="text-ember">[+]</span> Custom Avatar Gear
                    </li>
                    <li className="flex gap-3 text-white">
                      <span className="text-ember">[+]</span> Clan Creation
                    </li>
                    <li className="flex gap-3 text-white">
                      <span className="text-ember">[+]</span> Priority Support
                    </li>
                  </ul>
                  <button className="w-full py-3 bg-ember text-black font-bold text-xs tracking-widest hover:bg-ember-glow hover:shadow-[0_0_20px_rgba(255,95,31,0.6)] transition-all font-display">
                    UPGRADE CORE
                  </button>
                </div>

                {/* Elite */}
                <div className="relative bg-[#151515] border border-white/5 p-8 flex flex-col hover:border-amethyst transition-colors">
                  <div className="mb-6 pb-6 border-b border-white/5">
                    <h3 className="text-amethyst-dim text-sm font-bold tracking-widest mb-2 font-display">
                      ELITE CYBORG
                    </h3>
                    <p className="text-4xl font-black text-white flex items-baseline gap-1 font-mono">
                      $45{" "}
                      <span className="text-sm font-medium text-gray-600 font-mono">
                        /mo
                      </span>
                    </p>
                  </div>
                  <ul className="flex-1 flex flex-col gap-4 mb-8 font-mono text-xs">
                    <li className="flex gap-3 text-gray-400">
                      <span className="text-amethyst">[+]</span> AI Coaching
                    </li>
                    <li className="flex gap-3 text-gray-400">
                      <span className="text-amethyst">[+]</span> Beta Features
                    </li>
                    <li className="flex gap-3 text-gray-400">
                      <span className="text-amethyst">[+]</span> Exclusive Skins
                    </li>
                  </ul>
                  <button className="w-full py-3 border border-gray-700 text-white font-bold text-xs tracking-widest hover:border-amethyst hover:text-amethyst hover:shadow-[0_0_15px_rgba(157,78,221,0.3)] transition-all font-display">
                    MAXIMIZE POTENTIAL
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 py-12 bg-black">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">
              © 2026 RENMA SYSTEMS INC. // ALL RIGHTS RESERVED.
            </div>
            <div className="flex gap-8">
              <a
                className="text-[10px] font-mono text-gray-500 hover:text-ember transition-colors"
                href="#"
              >
                PRIVACY_PROTOCOL
              </a>
              <a
                className="text-[10px] font-mono text-gray-500 hover:text-ember transition-colors"
                href="#"
              >
                TERMS_OF_ENGAGEMENT
              </a>
              <a
                className="text-[10px] font-mono text-gray-500 hover:text-ember transition-colors"
                href="#"
              >
                SYSTEM_STATUS
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
