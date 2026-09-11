const ReviewSection = () => {
  const reviews = [
    {
      rating: "4.9 / 5",
      platform: "Google Reviews",
    },
    {
      rating: "4.6 / 5",
      platform: "Foodora",
    },
    {
      rating: "4.8 / 5",
      platform: "Uber Eats",
    },
  ];

  return (
    <section className="w-full bg-secondary py-8 sm:py-10 md:py-12 lg:py-8">
      <div className="mx-auto w-full max-w-300 px-4 sm:px-6 md:px-8">
        <h2
          className="
            text-center
            font-cormorant
            text-[34px]
            font-medium
            uppercase
            leading-tight
            tracking-[1px]
            text-white
            sm:text-[40px]
            md:text-[48px]
            lg:text-[48px]
          "
        >
          Recommendations & Reviews
        </h2>

        <div
          className="
            mt-8
            grid
            grid-cols-1
            sm:mt-9
            md:mt-10
            md:grid-cols-3
          "
        >
          {reviews.map((review, index) => (
            <div
              key={review.platform}
              className={`
                relative
                flex
                min-h-[130px]
                flex-col
                items-center
                justify-center
                px-4
                text-center

                ${
                  index !== reviews.length - 1
                    ? "border-b border-white/80 md:border-b-0 md:border-r"
                    : ""
                }

                ${index !== 0 ? "pt-8 md:pt-0" : ""}
              `}
            >
              <div
                className="
                  font-karla
                  text-[40px]
                  font-bold
                  leading-none
                  tracking-[-1px]
                  text-white
                  sm:text-[46px]
                  md:text-[52px]
                  lg:text-[58px]
                "
              >
                {review.rating}
              </div>

              <p
                className="
                  mt-4
                  font-karla
                  text-[13px]
                  font-medium
                  leading-none
                  text-white
                  sm:text-[14px]
                  md:text-[16px]
                "
              >
                {review.platform}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
