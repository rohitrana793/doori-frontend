import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <section className="min-h-screen w-full bg-secondary pt-28 pb-10 sm:pt-32 md:pt-44 md:pb-14">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div
          className="
            grid
            grid-cols-1
            gap-10
            lg:grid-cols-[minmax(0,1fr)_300px]
            lg:gap-4
            xl:grid-cols-[minmax(0,1fr)_300px]
          "
        >
          <div className="flex flex-col">
            <p
              className="
                mb-5
                text-[14px]
                font-medium
                uppercase
                tracking-[0.25em]
                text-primary
                sm:mb-7
                sm:text-[16px]
                sm:tracking-[0.35em]
              "
            >
              Our History
            </p>

            <h1
              className="
                mb-6
                font-cormorant
                text-[26px]
                uppercase
                tracking-wide
                text-white
                sm:text-[30px]
                md:mb-8
              "
            >
              How It Began
            </h1>

            <div
              className="
                max-w-200
                space-y-5
                font-karla
                text-[15px]
                leading-[1.8]
                text-white
                sm:space-y-6
                sm:text-[16px]
              "
            >
              <p>
                It all started in 2021 when a friend and I decided to try
                renting a small food truck over the summer. We drove around
                Skåne to show what Korean cuisine has to offer. Very quickly we
                had an answer: Korean food was really appreciated and Korean
                Fried Chicken was without a doubt the favorite dish!
              </p>

              <p>
                By the next summer, we had found the smallest restaurant we
                could find in Helsingborg and after twelve days of intensive
                fixing and sweeping, we had opened our first restaurant!
              </p>

              <p>
                Then things have gone at a furious pace and you can now find our
                Korean Fried Chicken in Helsingborg, Malmö and Växjö. Welcome
                there!
              </p>
            </div>

            <div className="mt-10 w-full max-w-200 sm:mt-14">
              <img
                src="/images/about/mat1.jpeg"
                alt="Korean food"
                className="
                  block
                  h-60
                  w-full
                  object-cover
                  sm:h-100
                  md:h-135
                "
              />
            </div>

            <div className="mt-6 flex flex-col gap-5 sm:mt-7">
              <h2
                className="
                  max-w-180
                  font-cormorant
                  text-[26px]
                  uppercase
                  leading-[1.4]
                  tracking-wide
                  text-white
                  sm:text-[30px]
                "
              >
                We are located in Helsingborg, Malmö
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                and Växjö.
              </h2>

              <Link
                to="/menu/"
                className="
                  w-fit
                  cursor-pointer
                  rounded-full
                  bg-primary
                  px-7
                  py-3
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
                Our Menu
              </Link>
            </div>
          </div>

          <div className="flex w-full flex-col gap-1.25">
            <img
              src="/images/about/malmo.jpg"
              alt="Restaurant interior"
              className="
                h-65
                w-full
                object-cover
                sm:h-80
                md:h-95
              "
            />

            <img
              src="/images/about/cateringbild.jpg"
              alt="Korean food"
              className="
                h-65
                w-full
                object-cover
                sm:h-80
                md:h-95
              "
            />

            <img
              src="/images/about/group.jpg"
              alt="Restaurant"
              className="
                h-65
                w-full
                object-cover
                sm:h-80
                md:h-95
              "
            />
          </div>
        </div>
      </div>

      <div
        className="
          mt-16
          w-full
          bg-optional
          py-16
          sm:mt-20
          sm:py-20
          md:mt-28
          md:py-28
        "
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div
            className="
              grid
              grid-cols-1
              items-start
              gap-y-20
              lg:grid-cols-[1.05fr_0.95fr]
              lg:gap-x-32
            "
          >
            <div
              className="
                relative
                mx-auto
                h-145
                w-full
                max-w-150
                sm:h-155
                md:h-170
              "
            >
              <div
                className="
                  absolute
                  left-[20%]
                  top-0
                  z-0
                  h-65
                  w-[65%]
                  sm:left-[28%]
                  sm:h-75
                  sm:w-[58%]
                "
              />

              <div
                className="
                  absolute
                  left-[12%]
                  top-3
                  z-10
                  h-72
                  w-[75%]
                  border-[5px]
                  border-[#1b2330]
                  bg-white
                  p-1
                  sm:left-[25%]
                  sm:h-95
                  sm:w-[320px]
                  sm:border-[6px]
                  sm:p-1.25
                "
              >
                <img
                  src="/images/about/img2.jpg"
                  alt="Korean restaurant"
                  className="h-full w-full object-cover"
                />
              </div>

              <div
                className="
                  absolute
                  -bottom-2
                  left-0
                  z-20
                  h-72
                  w-[75%]
                  border-[5px]
                  border-white
                  bg-white
                  sm:-bottom-5
                  sm:left-[2%]
                  sm:h-95
                  sm:w-[320px]
                  sm:border-[6px]
                "
              >
                <img
                  src="/images/about/img1.jpg"
                  alt="Food truck"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div
              className="
                w-full
                max-w-107.5
                lg:pt-2
              "
            >
              <p
                className="
                  mb-5
                  text-[14px]
                  font-medium
                  uppercase
                  tracking-[0.25em]
                  text-primary
                  sm:mb-6
                  sm:text-[16px]
                  sm:tracking-[0.35em]
                "
              >
                Who We Are
              </p>

              <h2
                className="
                  mb-6
                  font-cormorant
                  text-[28px]
                  uppercase
                  tracking-wide
                  text-white
                  sm:mb-7
                  sm:text-[30px]
                "
              >
                Small But Big
              </h2>

              <p
                className="
                  max-w-105
                  font-karla
                  text-[15px]
                  leading-[1.8]
                  text-white
                  sm:text-[16px]
                "
              >
                As a small business, we have a big mission: to spread the joy of
                well-cooked authentic Korean food to as many people as possible.
                Most people don't know what Korean food tastes like, so we come
                and bring Korean food to those who haven't tried it before.
              </p>

              <div
                className="
                  mt-7
                  grid
                  max-w-[320px]
                  grid-cols-2
                  gap-y-3
                  text-[15px]
                  text-white
                  sm:text-[16px]
                "
              >
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Restaurants
                </div>

                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Catering
                </div>

                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Bring
                </div>

                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  Events
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
