const MapSection = () => {
  return (
    <section className="w-full">
      <div
        className="
          h-[280px]
          w-full
          overflow-hidden
          sm:h-[350px]
          md:h-[400px]
          lg:h-[450px]
        "
      >
        <iframe
          title="Roskildegatan 2 Map"
          className="h-full w-full border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=Roskildegatan+2,+252+21+Helsingborg,+Sweden&output=embed"
        />
      </div>
    </section>
  );
};

export default MapSection;
