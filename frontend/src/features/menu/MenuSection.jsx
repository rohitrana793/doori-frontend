import { Link } from "react-router-dom";

const MenuSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-optional py-10 sm:py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div
          className="
            grid
            grid-cols-1
            items-center
            gap-8
            sm:gap-10
            md:grid-cols-2
            md:gap-10
            lg:gap-14
            xl:gap-16
          "
        >
          <div className="order-2 w-full md:order-1">
            <h2
              className="
                mb-5
                font-cormorant
                text-2xl
                font-bold
                leading-[1.15]
                text-white
                sm:text-3xl
                md:mb-6
                md:text-4xl
                lg:text-5xl
                xl:text-6xl
              "
            >
              Something for
              <br />
              everyone
              <span className="hidden sm:inline">
                <br />
              </span>
              <span className="sm:hidden"> </span>!
            </h2>

            <div
              className="
                space-y-3
                font-karla
                text-sm
                leading-6
                text-white
                sm:text-base
                sm:leading-7
                md:space-y-4
                md:text-base
                lg:text-lg
                lg:leading-8
              "
            >
              <p>
                Go sauce – most popular, short for Gochujang sauce.
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                medium-hot 고소스
              </p>

              <p>So sauce – garlic soy, mild & sweet 소소스</p>

              <p>He sauce – stronger version of Go sauce 해소스</p>
            </div>

            <div className="mt-7 sm:mt-8 md:mt-10 lg:mt-12">
              <Link
                to="/menu/"
                className="
                  inline-flex
                  w-fit
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-full
                  bg-primary
                  px-7
                  py-3
                  font-karla
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[2px]
                  text-white
                  transition-all
                  duration-300
                  hover:scale-105
                  hover:bg-button
                  sm:px-8
                  sm:py-3.5
                  sm:text-sm
                  md:px-9
                  md:text-base
                "
              >
                SEE MENU
              </Link>
            </div>
          </div>

          <div className="order-1 w-full md:order-2">
            <div className="relative w-full overflow-hidden shadow-xl">
              <img
                src="/images/food.jpg"
                alt="Korean sauces"
                className="
                  block
                  h-52
                  w-full
                  object-cover
                  sm:h-64
                  md:h-80
                  lg:h-95
                  xl:h-105
                "
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/5 to-transparent" />
            </div>

            <p
              className="
                mt-2
                font-karla
                text-[8px]
                uppercase
                tracking-[0.15em]
                text-primary
                sm:mt-3
                sm:text-[10px]
                md:mt-5
                md:text-[12px]
              "
            >
              PHOTO BY MALMOFOODHUNTERS
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
