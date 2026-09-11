import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const WelcomeSection = () => {
  const images = [
    "/images/1.jpeg",
    "/images/2.jpeg",
    "/images/3.jpg",
    "/images/4.jpg",
    "/images/5.jpeg",
    "/images/6.jpeg",
    "/images/7.jpg",
    "/images/8.jpeg",
    "/images/9.jpg",
    "/images/10.jpeg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  const carouselImages = [...images, images[0], images[1], images[2]];

  const nextSlide = () => {
    setIsAnimating(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (currentIndex === 0) {
      setIsAnimating(false);
      setCurrentIndex(images.length);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
          setCurrentIndex(images.length - 1);
        });
      });

      return;
    }

    setIsAnimating(true);
    setCurrentIndex((prev) => prev - 1);
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIsAnimating(true);
      setCurrentIndex((prev) => prev + 1);
    }, 3000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (currentIndex === images.length) {
      const timeout = window.setTimeout(() => {
        setIsAnimating(false);
        setCurrentIndex(0);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsAnimating(true);
          });
        });
      }, 700);

      return () => {
        window.clearTimeout(timeout);
      };
    }
  }, [currentIndex, images.length]);

  const activeDot = currentIndex % images.length;

  return (
    <section className="w-full overflow-hidden bg-optional py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div
          className="
            grid
            grid-cols-1
            items-center
            gap-8
            sm:gap-10
            md:gap-12
            lg:grid-cols-[0.8fr_1.2fr]
            lg:gap-16
            xl:gap-20
          "
        >
          <div className="w-full max-w-xl">
            <h2
              className="
                font-cormorant
                text-2xl
                font-medium
                tracking-wider
                text-white
                sm:text-3xl
                md:text-4xl
              "
            >
              Welcome to Doori!
            </h2>

            <p
              className="
                mt-5
                font-karla
                text-sm
                font-medium
                leading-7
                text-white/90
                sm:mt-6
                sm:text-base
                sm:leading-8
                md:mt-8
                md:leading-9
              "
            >
              As a small business, we have a big mission: to spread the joy of
              well-prepared authentic Korean food to as many people as possible.
              Come in and try our food and join us on our exciting journey.
            </p>
          </div>

          <div className="relative w-full min-w-0">
            <div className="relative w-full overflow-hidden">
              <div
                className={`flex ${
                  isAnimating
                    ? "transition-transform duration-700 ease-in-out"
                    : ""
                }`}
                style={{
                  width: `${(carouselImages.length / 3) * 100}%`,
                  transform: `translateX(-${
                    currentIndex * (100 / carouselImages.length)
                  }%)`,
                }}
              >
                {carouselImages.map((image, index) => (
                  <div
                    key={`${image}-${index}`}
                    className="w-[calc(100%/13)] shrink-0 px-0.5 sm:px-0.75"
                  >
                    <div
                      className="
                        relative
                        aspect-[0.72]
                        w-full
                        overflow-hidden
                      "
                    >
                      <img
                        src={image}
                        alt={`Korean food ${index + 1}`}
                        className="
                          block
                          h-full
                          w-full
                          object-cover
                        "
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous image"
                className="
                  absolute
                  left-0
                  top-1/2
                  z-20
                  flex
                  h-10
                  w-8
                  -translate-y-1/2
                  items-center
                  justify-center
                  bg-black/50
                  text-white
                  transition-all
                  duration-300
                  hover:bg-black/75
                  sm:h-12
                  sm:w-9
                  md:h-14
                  md:w-10
                  cursor-pointer
                "
              >
                <ArrowLeft
                  size={18}
                  strokeWidth={1.5}
                  className="sm:h-5 sm:w-5 md:h-6 md:w-6"
                />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next image"
                className="
                  absolute
                  right-0
                  top-1/2
                  z-20
                  flex
                  h-10
                  w-8
                  -translate-y-1/2
                  items-center
                  justify-center
                  bg-black/50
                  text-white
                  transition-all
                  duration-300
                  hover:bg-black/75
                  sm:h-12
                  sm:w-9
                  md:h-14
                  md:w-10
                  cursor-pointer
                "
              >
                <ArrowRight
                  size={18}
                  strokeWidth={1.5}
                  className="sm:h-5 sm:w-5 md:h-6 md:w-6"
                />
              </button>
            </div>

            <div className="mt-4 flex justify-center gap-1.5 sm:mt-5 sm:gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setIsAnimating(true);
                    setCurrentIndex(index);
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`
                    h-2
                    w-2
                    rounded-full
                    transition-all
                    duration-300
                    sm:h-2.5
                    sm:w-2.5
                    ${
                      activeDot === index
                        ? "scale-110 bg-white"
                        : "bg-black/60 hover:bg-white/60"
                    }
                  `}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
