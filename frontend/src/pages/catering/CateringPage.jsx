const CateringPage = () => {
  const locations = [
    {
      city: "HELSINGBORG",
      address: "Roskildegatan 2",
      postal: "252 21 Helsingborg",
      phone: "0768-605659",
      email: "info@doori.se",
    },
    {
      city: "MALMO",
      address: "Bergsgatan 15A",
      postal: "211 54 Malmö",
      phone: "0760-093707",
      email: "info@doori.se",
    },
    {
      city: "VAXJO",
      address: "Kungsgatan 15A",
      postal: "352 31 Växjö",
      phone: "0764-341268",
      email: "info@doori.se",
    },
  ];

  return (
    <section className="min-h-screen w-full bg-secondary pt-40 pb-28 md:pt-44 md:pb-8">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 md:-translate-y-5 md:grid-cols-3">
          {locations.map((location, index) => (
            <div
              key={location.city}
              className={`
                relative
                flex
                min-h-58.75
                flex-col
                items-center
                px-2
                text-center
                md:px-4
                lg:px-6

                ${
                  index !== 0
                    ? "border-t border-white/10 md:border-t-0 md:before:absolute md:before:left-0 md:before:top-2.5 md:before:h-41.25 md:before:w-px md:before:bg-white/10"
                    : ""
                }
              `}
            >
              <h2
                className="
                  font-karla
                  text-[16px]
                  font-medium
                  tracking-[0.28em]
                  text-primary
                "
              >
                {location.city}
              </h2>

              <div
                className="
                  mt-6
                  font-karla
                  text-[16px]
                  leading-[1.9]
                  text-white
                "
              >
                <p>{location.address}</p>
                <p>{location.postal}</p>
                <p>{location.phone}</p>

                <a
                  href={`mailto:${location.email}`}
                  className="
                    block
                    text-primary
                    underline
                    underline-offset-2
                    transition-all
                    duration-300
                    hover:text-white
                    hover:underline-offset-4
                  "
                >
                  {location.email}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div
          className="
            h-75
            w-full
            overflow-hidden
            sm:h-100
            md:h-150
            lg:h-200
          "
        >
          <img
            src="/images/catering-big.jpeg"
            alt="Doori catering"
            className="h-full w-full object-cover"
          />
        </div>

        <div
          className="
            mt-20
            grid
            grid-cols-1
            gap-10
            pb-10
            sm:gap-12
            lg:mt-32
            lg:grid-cols-2
            lg:gap-20
          "
        >
          <div className="pt-2 sm:pt-4">
            <p
              className="
                font-karla
                text-[16px]
                font-medium
                tracking-[0.28em]
                text-primary
              "
            >
              CONTACT US
            </p>

            <h1
              className="
                mt-6
                max-w-150
                font-cormorant
                text-[30px]
                uppercase
                leading-[1.35]
                tracking-wide
                text-white
                sm:mt-8
              "
            >
              PLEASE CONTACT US ABOUT CATERING
            </h1>

            <p
              className="
                mt-8
                font-karla
                text-[16px]
                leading-relaxed
                text-white
                sm:mt-12
              "
            >
              We usually respond the same day!
            </p>
          </div>

          <div
            className="
              w-full
              bg-white
              p-5
              sm:p-8
              md:p-9
            "
          >
            <form className="w-full">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                <input
                  type="text"
                  placeholder="First name"
                  className="
                    h-14
                    w-full
                    bg-secondary
                    px-4
                    font-karla
                    text-[16px]
                    text-white
                    outline-none
                    placeholder:text-white/85
                    focus:ring-1
                    focus:ring-primary
                    sm:h-15
                  "
                />

                <input
                  type="text"
                  placeholder="Surname"
                  className="
                    h-14
                    w-full
                    bg-secondary
                    px-4
                    font-karla
                    text-[16px]
                    text-white
                    outline-none
                    placeholder:text-white/85
                    focus:ring-1
                    focus:ring-primary
                    sm:h-15
                  "
                />
              </div>

              <input
                type="email"
                placeholder="E-mail"
                className="
                  mt-4
                  h-14
                  w-full
                  bg-secondary
                  px-4
                  font-karla
                  text-[16px]
                  text-white
                  outline-none
                  placeholder:text-white/85
                  focus:ring-1
                  focus:ring-primary
                  sm:mt-5
                  sm:h-15
                "
              />

              <input
                type="text"
                placeholder="Matter"
                className="
                  mt-4
                  h-14
                  w-full
                  bg-secondary
                  px-4
                  font-karla
                  text-[16px]
                  text-white
                  outline-none
                  placeholder:text-white/85
                  focus:ring-1
                  focus:ring-primary
                  sm:mt-5
                  sm:h-15
                "
              />

              <textarea
                placeholder="Message"
                rows={6}
                className="
                  mt-4
                  min-h-36
                  w-full
                  resize-y
                  bg-secondary
                  px-4
                  py-4
                  font-karla
                  text-[16px]
                  text-white
                  outline-none
                  placeholder:text-white/85
                  focus:ring-1
                  focus:ring-primary
                  sm:mt-5
                  sm:min-h-40
                "
              />

              <div className="mt-6 sm:mt-7">
                <p
                  className="
                    mb-2
                    font-karla
                    text-[16px]
                    font-medium
                    text-secondary
                  "
                >
                  Place
                </p>

                <div className="space-y-2">
                  {["Helsingborg", "Malmo", "Vaxjo"].map((place) => (
                    <label
                      key={place}
                      className="
                        flex
                        cursor-pointer
                        items-center
                        gap-2
                        font-karla
                        text-[16px]
                        text-secondary
                      "
                    >
                      <input
                        type="radio"
                        name="place"
                        value={place}
                        className="h-3.5 w-3.5 cursor-pointer"
                      />

                      <span>{place}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="
                  mt-5
                  w-fit
                  cursor-pointer
                  rounded-full
                  bg-primary
                  px-8
                  py-3
                  font-karla
                  text-sm
                  font-semibold
                  uppercase
                  tracking-[2px]
                  text-white
                  transition-all
                  duration-300
                  hover:bg-button
                  sm:mt-6
                  sm:px-9
                  sm:py-3.5
                "
              >
                SEND
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CateringPage;
