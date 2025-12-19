const ServicesHero = () => {
  return (
    <>
      <section className="relative h-screen w-full overflow-hidden -z-10">
        {/* Background video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/lina-reels.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          {" "}
          video not supported
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 h-full flex items-center sm:px-32 px-6">
          <div className="sm:max-w-xl text-white">
            <span className="block text-sm uppercase tracking-widest text-white/70 mb-4">
              Our Services
            </span>

            <h1 className="sm:text-7xl text-4xl font-light leading-tight mb-6">
              Floral Design for
              <br />
              Every Occasion
            </h1>

            <p className="text-lg leading-relaxed text-white/80">
              Thoughtfully designed florals for life’s moments — from everyday arrangements to
              once-in-a-lifetime celebrations.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesHero;
