const CateringSection = () => {
  return (
    <section className="w-full overflow-hidden bg-secondary py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div
          className="
            grid
            grid-cols-1
            items-center
            gap-8
            sm:gap-10
            md:gap-12
            lg:grid-cols-2
            lg:gap-16
          "
        >
          <div className="order-1 w-full">
            <div className="relative w-full overflow-hidden shadow-xl">
              <img
                src="/images/catering.jpeg"
                alt="Korean food catering"
                className="
                  block
                  h-60
                  w-full
                  object-cover
                  sm:h-72
                  md:h-80
                  lg:h-100
                  xl:h-105
                "
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />
            </div>
          </div>

          <div className="order-2 w-full font-karla">
            <h2
              className="
                mb-3
                font-karla
                text-xs
                font-medium
                tracking-[0.25em]
                text-primary
                sm:mb-4
                sm:text-sm
                md:text-base
                lg:text-lg
              "
            >
              CATERING
            </h2>

            <h3
              className="
                max-w-xl
                font-cormorant
                text-2xl
                font-medium
                uppercase
                leading-[1.25]
                tracking-wide
                text-white
                sm:text-3xl
                md:text-4xl
                lg:text-4xl
                xl:text-5xl
              "
            >
              We would love to be
              <br className="hidden sm:block" /> a part of your
              <br className="hidden sm:block" /> special occasion.
            </h3>

            <p
              className="
                mt-5
                max-w-xl
                font-karla
                text-sm
                leading-7
                text-white/85
                sm:mt-6
                sm:text-base
                sm:leading-8
                md:text-lg
                md:leading-8
              "
            >
              We welcome large and small groups. 20 or 200, we will come to you
              and serve a unique taste experience!
            </p>

            <div
              className="
                mt-6
                space-y-3
                sm:mt-7
                sm:space-y-4
                md:mt-8
              "
            >
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />

                <span
                  className="
                    font-karla
                    text-sm
                    font-medium
                    text-white/85
                    sm:text-base
                  "
                >
                  Authentic Korean food
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />

                <span
                  className="
                    font-karla
                    text-sm
                    font-medium
                    text-white/85
                    sm:text-base
                  "
                >
                  Vegetarian options
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />

                <span
                  className="
                    font-karla
                    text-sm
                    font-medium
                    text-white/85
                    sm:text-base
                  "
                >
                  Always freshly prepared
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CateringSection;
