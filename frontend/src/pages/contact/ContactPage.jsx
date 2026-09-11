import MapSection from "../../features/map/MapSection";

const ContactPage = () => {
  return (
    <section
      className="
        min-h-screen
        w-full
        bg-secondary
        pt-28
        pb-16
        sm:pt-32
        sm:pb-20
        md:pt-72
        md:pb-8
      "
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div
          className="
            grid
            grid-cols-1
            items-start
            gap-10
            lg:grid-cols-[0.9fr_1.1fr]
            lg:gap-20
            xl:gap-24
          "
        >
          <div className="pt-2 sm:pt-4 lg:pt-5">
            <p
              className="
                mb-5
                text-[13px]
                font-medium
                uppercase
                tracking-[0.2em]
                text-primary
                sm:mb-7
                sm:text-[16px]
                sm:tracking-widest
              "
            >
              Contact Us About Franchising
            </p>

            <h1
              className="
                max-w-162.5
                font-cormorant
                text-[26px]
                font-bold
                uppercase
                leading-[1.35]
                tracking-wide
                text-white
                sm:text-[30px]
              "
            >
              Do You Also Want To Help
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              Spread The Joy Of Well-
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              Cooked Korean Food In
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              Sweden?
            </h1>

            <p
              className="
                mt-8
                max-w-162.5
                font-karla
                text-[15px]
                font-medium
                leading-[1.8]
                text-white
                sm:mt-10
                sm:text-[16px]
                sm:leading-loose
                md:mt-14
              "
            >
              Korean cuisine with its unique flavors (lots of umami!) is today
              the cuisine that Swedes are most curious about, after Swedish and
              Italian. If you are professional, have the experience and want to
              join us in growing in interesting places in Sweden, contact us
              about starting our next Doori franchise!
            </p>
          </div>

          <div
            className="
              w-full
              bg-white
              p-4
              sm:p-6
              md:p-7
              lg:p-6
              xl:p-7
            "
          >
            <form className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="First name"
                  className="
                    h-13
                    w-full
                    border
                    border-[#d5d5d5]
                    bg-secondary
                    px-4
                    font-karla
                    text-[15px]
                    text-white
                    outline-none
                    placeholder:text-white/85
                    focus:border-primary
                    sm:h-13.5
                    sm:text-[16px]
                  "
                />

                <input
                  type="text"
                  placeholder="Surname"
                  className="
                    h-13
                    w-full
                    border
                    border-[#d5d5d5]
                    bg-secondary
                    px-4
                    font-karla
                    text-[15px]
                    text-white
                    outline-none
                    placeholder:text-white/85
                    focus:border-primary
                    sm:h-13.5
                    sm:text-[16px]
                  "
                />
              </div>

              <input
                type="email"
                placeholder="Email"
                className="
                  h-13
                  w-full
                  border
                  border-[#d5d5d5]
                  bg-secondary
                  px-4
                  font-karla
                  text-[15px]
                  text-white
                  outline-none
                  placeholder:text-white/85
                  focus:border-primary
                  sm:h-13.5
                  sm:text-[16px]
                "
              />

              <input
                type="text"
                placeholder="Franchising"
                className="
                  h-13
                  w-full
                  border
                  border-[#d5d5d5]
                  bg-secondary
                  px-4
                  font-karla
                  text-[15px]
                  text-white
                  outline-none
                  placeholder:text-white/85
                  focus:border-primary
                  sm:h-13.5
                  sm:text-[16px]
                "
              />

              <textarea
                placeholder="Your message"
                rows={5}
                className="
                  min-h-32
                  w-full
                  resize-y
                  border
                  border-[#d5d5d5]
                  bg-secondary
                  px-4
                  py-3
                  font-karla
                  text-[15px]
                  text-white
                  outline-none
                  placeholder:text-white/85
                  focus:border-primary
                  sm:min-h-35
                  sm:text-[16px]
                "
              />

              <div>
                <button
                  type="submit"
                  className="
                    w-fit
                    cursor-pointer
                    rounded-full
                    bg-primary
                    px-7
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
                    sm:px-9
                    sm:py-3.5
                  "
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div
        className="
          container
          mx-auto
          mt-14
          px-4
          sm:mt-20
          sm:px-6
          md:mt-28
          md:px-8
        "
      >
        <div className="w-full overflow-hidden">
          <img
            src="/images/foodtruck-big.jpg"
            alt="Doori Korean food franchise"
            className="
              block
              h-64
              w-full
              object-cover
              sm:h-80
              md:h-125
              lg:h-165
            "
          />
        </div>
      </div>

      <div className="mt-10 sm:mt-12 md:mt-14">
        <MapSection />
      </div>
    </section>
  );
};

export default ContactPage;
