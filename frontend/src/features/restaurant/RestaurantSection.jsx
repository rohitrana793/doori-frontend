import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const RestaurantSection = () => {
  const restaurants = [
    {
      name: "HELSINGBORG",
      image: "/images/helsingborg.jpg",
      link: "/helsingborg/",
    },
    {
      name: "VÄXJÖ",
      image: "/images/vaxjo.jpeg",
      link: "/vaxjo/",
    },
    {
      name: "MALMO BERGSGATAN",
      image: "/images/malmo.jpeg",
      link: "/malmo/",
    },
    {
      name: "MALMÖ – WESTERN HARBOR",
      image: "/images/malmo-western.jpeg",
      link: "/malmo-vastra-hamnen/",
    },
    {
      name: "COPENHAGEN",
      image: "/images/copenhagen.jpeg",
      link: "/copenhagen/",
    },
  ];

  return (
    <section
      id="restaurants"
      className="
        relative
        w-full
        bg-secondary
        py-8
        sm:py-10
        md:py-12
      "
    >
      <div
        className="
          container
          mx-auto
          w-full
          px-4
          sm:px-6
          md:px-8
        "
      >
        <div className="flex flex-col items-start gap-3 sm:gap-4">
          <span
            className="
              font-karla
              text-xs
              font-medium
              uppercase
              tracking-[0.3em]
              text-primary
              sm:text-sm
            "
          >
            our
          </span>

          <h2
            className="
              mt-0.5
              font-cormorant
              text-4xl
              font-black
              leading-none
              tracking-widest
              text-white
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
            "
          >
            RESTAURANTS
          </h2>
        </div>

        <p
          className="
            mt-5
            max-w-full
            font-karla
            text-xs
            font-medium
            leading-6
            text-white
            sm:mt-6
            sm:max-w-xl
            sm:text-sm
            md:mt-8
            md:max-w-3xl
            md:text-base
            md:leading-7
          "
        >
          Now you can find our Korean Fried Chicken in Helsingborg, Växjö and
          Malmö. And it tastes best with beer and soju! Try the combination
          (Chimek) in Malmö.
        </p>

        <div
          className="
            mt-8
            grid
            grid-cols-1
            gap-7
            sm:mt-10
            sm:grid-cols-2
            sm:gap-6
            md:mt-14
            md:grid-cols-3
            md:gap-6
            lg:grid-cols-4
            lg:gap-6
            xl:grid-cols-5
          "
        >
          {restaurants.map((restaurant) => (
            <Link
              key={restaurant.name}
              to={restaurant.link}
              className="
                group
                block
                min-w-0
                w-full
              "
            >
              <div
                className="
                  aspect-[3/4]
                  w-full
                  overflow-hidden
                "
              >
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  loading="lazy"
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-105
                  "
                />
              </div>

              <div className="mt-4 flex w-full justify-center sm:mt-5">
                <div
                  className="
                    flex
                    min-h-14
                    w-full
                    min-w-0
                    items-center
                    justify-between
                    gap-2
                    rounded-full
                    border-2
                    border-primary
                    bg-transparent
                    px-4
                    py-2.5
                    font-karla
                    transition-all
                    duration-300
                    group-hover:bg-primary
                    sm:px-5
                    sm:py-3
                  "
                >
                  <span
                    className="
                      min-w-0
                      flex-1
                      pr-1
                      text-left
                      text-[11px]
                      font-semibold
                      uppercase
                      leading-tight
                      tracking-[0.08em]
                      text-primary
                      transition-colors
                      duration-300
                      group-hover:text-white
                      sm:text-[12px]
                      sm:tracking-[0.1em]
                      md:text-[13px]
                      md:tracking-[0.12em]
                    "
                  >
                    {restaurant.name}
                  </span>

                  <span
                    className="
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-primary
                      text-white
                      transition-all
                      duration-300
                      group-hover:bg-white
                      group-hover:text-primary
                      sm:h-9
                      sm:w-9
                    "
                  >
                    <ArrowRight
                      size={15}
                      className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                        sm:h-4
                        sm:w-4
                      "
                    />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RestaurantSection;
