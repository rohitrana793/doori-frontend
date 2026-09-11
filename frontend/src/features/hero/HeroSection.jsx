import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      className="
        relative
        flex
        h-[30vh]
        w-full
        items-center
        justify-center
        overflow-hidden
        sm:h-[35vh]
        md:h-[40vh]
        lg:h-[45vh]
        xl:h-[50vh]
      "
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
        "
      >
        <source src="/video/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black/50" />

      <div
        className="
          relative
          z-10
          flex
          w-full
          max-w-4xl
          flex-col
          items-center
          justify-center
          px-4
          text-center
          text-white
          sm:px-6
          md:px-8
        "
      >
        <div
          className="
            flex
            flex-col
            items-center
            -mt-2
            sm:-mt-3
            md:-mt-4
            lg:-mt-5
            xl:-mt-6
          "
        >
          <div
            className="
              mb-1
              flex
              w-full
              items-center
              justify-center
              sm:mb-2
              md:mb-3
            "
          >
            <span
              className="
                whitespace-nowrap
                font-karla
                text-[10px]
                font-medium
                tracking-[0.15em]
                text-primary
                sm:text-xs
                sm:tracking-[0.2em]
                md:text-sm
                lg:text-base
              "
            >
              WELCOME TO
            </span>
          </div>

          <h1
            className="
              mb-1
              font-cormorant
              text-3xl
              font-black
              leading-[1.1]
              tracking-widest
              sm:mb-2
              sm:text-4xl
              md:mb-3
              md:text-5xl
              lg:text-6xl
              xl:text-7xl
            "
          >
            DOOR
          </h1>

          <p
            className="
              mb-6
              max-w-full
              font-cormorant
              text-sm
              font-light
              uppercase
              leading-tight
              tracking-widest
              text-white
              sm:mb-8
              sm:text-base
              sm:tracking-[0.15em]
              md:mb-10
              md:text-lg
              lg:mb-14
              lg:text-2xl
              xl:text-4xl
            "
          >
            KOREAN FRIED CHICKEN &amp; BEYOND
          </p>

          <Link
            to="/menu"
            className="
              group
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-primary
              px-5
              py-2.5
              font-karla
              text-xs
              font-medium
              uppercase
              text-white
              transition-all
              duration-300
              ease-in-out
              hover:scale-105
              hover:bg-button
              hover:shadow-lg
              active:scale-95
              sm:px-6
              sm:py-3
              sm:text-sm
              md:px-7
              md:py-3
              md:text-base
            "
          >
            <span>SEE THE MENU</span>

            <ArrowRight
              size={16}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1.5
                sm:h-4
                sm:w-4
                md:h-5
                md:w-5
              "
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
