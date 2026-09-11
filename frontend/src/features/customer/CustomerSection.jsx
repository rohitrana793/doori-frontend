const CustomerSection = () => {
  return (
    <section className="w-full overflow-hidden bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div
          className="
            relative
            h-72
            w-full
            overflow-hidden
            bg-cover
            bg-center
            sm:h-96
            md:h-125
            lg:h-145
            lg:bg-fixed
          "
          style={{
            backgroundImage: "url('/images/customer.jpeg')",
          }}
        >
          <div className="absolute inset-0 bg-black/45" />

          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              px-2
              text-center
              sm:px-4
              md:px-6
            "
          >
            <p
              className="
                relative
                z-10
                flex
                flex-col
                gap-2
                font-cormorant
                text-[16px]
                font-medium
                uppercase
                leading-tight
                tracking-wide
                text-white
                sm:gap-3
                sm:text-3xl
                md:gap-4
                md:text-5xl
                lg:gap-5
                lg:text-[52px]
                xl:text-[56px]
              "
            >
              <span className="whitespace-nowrap">
                Our love for our customers is as
              </span>

              <span className="whitespace-nowrap">
                strong as the love for our food
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerSection;
