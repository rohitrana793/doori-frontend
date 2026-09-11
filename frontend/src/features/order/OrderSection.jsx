const OrderSection = () => {
  return (
    <section className="relative w-full bg-white py-12 sm:py-14 md:py-16 lg:py-17">
      <div className="container mx-auto px-5 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 gap-12 sm:gap-14 lg:grid-cols-3 lg:gap-12.5">
          <div className="flex items-center justify-center lg:pt-23">
            <div
              className="
                flex
                h-87.5
                w-full
                max-w-92.5
                flex-col
                items-center
                justify-center
                border
                border-white
                bg-primary
                px-6
                shadow-none
                sm:px-8
              "
            >
              <div className="flex flex-col items-center justify-center">
                <h2
                  className="
                    text-center
                    font-cormorant
                    text-[30px]
                    font-medium
                    leading-[1.12]
                    tracking-[3px]
                    text-[#171717]
                    sm:text-[32px]
                    md:text-[36px]
                  "
                >
                  We are ready
                  <br />
                  to receive
                  <br />
                  your order!
                </h2>

                <div className="my-6 h-px w-22 bg-white/70 sm:my-7" />

                <button
                  type="button"
                  onClick={() => {
                    const section = document.getElementById("restaurants");

                    if (section) {
                      const y =
                        section.getBoundingClientRect().top +
                        window.scrollY -
                        150;

                      window.scrollTo({
                        top: y,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="
    w-fit
    cursor-pointer
    rounded-full
    bg-[#35302D]
    px-8
    py-3
    text-sm
    font-semibold
    uppercase
    tracking-[2px]
    text-white
    transition-all
    duration-300
    hover:bg-[#24211f]
    sm:px-9
    sm:py-3.5
  "
                >
                  Order here
                </button>
              </div>
            </div>
          </div>

          <div className="lg:pt-16">
            <div className="space-y-12 sm:space-y-13.5">
              <div className="flex items-start gap-4 sm:gap-6">
                <div
                  className="
                    h-16
                    w-16
                    shrink-0
                    overflow-hidden
                    rounded-full
                    sm:h-18
                    sm:w-18
                  "
                >
                  <img
                    src="/images/items/dumplings.jpg"
                    alt="Fried Dumplings"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="min-w-0 pt-px">
                  <h3
                    className="
                      font-cormorant
                      text-[16px]
                      font-medium
                      uppercase
                      leading-tight
                      tracking-[0.5px]
                      text-[#30303a]
                    "
                  >
                    Fried Dumplings
                  </h3>

                  <p
                    className="
                      mt-2.5
                      font-karla
                      text-[13px]
                      font-normal
                      leading-[1.55]
                      text-[#3f4655]
                      sm:mt-3
                      sm:text-[14px]
                    "
                  >
                    Cream cheese / Carrot / Chives
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 sm:gap-6">
                <div
                  className="
                    h-16
                    w-16
                    shrink-0
                    overflow-hidden
                    rounded-full
                    sm:h-18
                    sm:w-18
                  "
                >
                  <img
                    src="/images/items/mandoo.jpg"
                    alt="Mandoo"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="min-w-0 pt-px">
                  <h3
                    className="
                      font-cormorant
                      text-[16px]
                      font-medium
                      uppercase
                      leading-tight
                      tracking-[0.5px]
                      text-[#30303a]
                    "
                  >
                    Mandoo
                  </h3>

                  <p
                    className="
                      mt-2.5
                      font-karla
                      text-[13px]
                      font-normal
                      leading-[1.55]
                      text-[#3f4655]
                      sm:mt-3
                      sm:text-[14px]
                    "
                  >
                    Chicken / tofu / kimchi / sweet potato noodles / ginger /
                    garlic / green onions
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 sm:gap-6">
                <div
                  className="
                    h-16
                    w-16
                    shrink-0
                    overflow-hidden
                    rounded-full
                    sm:h-18
                    sm:w-18
                  "
                >
                  <img
                    src="/images/items/kimchi.jpg"
                    alt="Kimchi"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="min-w-0 pt-px">
                  <h3
                    className="
                      font-cormorant
                      text-[16px]
                      font-medium
                      uppercase
                      leading-tight
                      tracking-[0.5px]
                      text-[#30303a]
                    "
                  >
                    Kimchi
                  </h3>

                  <p
                    className="
                      mt-2.5
                      font-karla
                      text-[13px]
                      font-normal
                      leading-[1.55]
                      text-[#3f4655]
                      sm:mt-3
                      sm:text-[14px]
                    "
                  >
                    Salad bowl / radish / green onion / chili powder / ginger /
                    apple / garlic / fish sauce
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:pt-0">
            <div className="space-y-12 sm:space-y-13.5">
              <div className="flex items-start gap-4 sm:gap-6">
                <div
                  className="
                    h-16
                    w-16
                    shrink-0
                    overflow-hidden
                    rounded-full
                    sm:h-18
                    sm:w-18
                  "
                >
                  <img
                    src="/images/items/chicken.jpg"
                    alt="Korean Fried Chicken"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="min-w-0 pt-px">
                  <h3
                    className="
                      max-w-55
                      font-cormorant
                      text-[16px]
                      font-medium
                      uppercase
                      leading-tight
                      tracking-[0.5px]
                      text-[#30303a]
                    "
                  >
                    Korean Fried Chicken With Go, So Or He Sauce
                  </h3>

                  <p
                    className="
                      mt-2.5
                      font-karla
                      text-[13px]
                      font-normal
                      leading-[1.55]
                      text-[#3f4655]
                      sm:mt-3
                      sm:text-[14px]
                    "
                  >
                    Chicken / Rice / Pickled Radish / Chives / Sesame Seeds
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 sm:gap-6">
                <div
                  className="
                    h-16
                    w-16
                    shrink-0
                    overflow-hidden
                    rounded-full
                    sm:h-18
                    sm:w-18
                  "
                >
                  <img
                    src="/images/items/mayo.jpeg"
                    alt="Chicken Mayo"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="min-w-0 pt-px">
                  <h3
                    className="
                      max-w-55
                      font-cormorant
                      text-[16px]
                      font-medium
                      uppercase
                      leading-tight
                      tracking-[0.5px]
                      text-[#30303a]
                    "
                  >
                    Chicken Mayo / Vegetable Mayo
                  </h3>

                  <p
                    className="
                      mt-2.5
                      font-karla
                      text-[13px]
                      font-normal
                      leading-[1.55]
                      text-[#3f4655]
                      sm:mt-3
                      sm:text-[14px]
                    "
                  >
                    Chicken or Veggies / Rice / Egg / Sauce / Mayonnaise /
                    Seaweed Chips / Chives
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 sm:gap-6">
                <div
                  className="
                    h-16
                    w-16
                    shrink-0
                    overflow-hidden
                    rounded-full
                    sm:h-18
                    sm:w-18
                  "
                >
                  <img
                    src="/images/items/bibim.jpg"
                    alt="Bibimbap"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="min-w-0 pt-px">
                  <h3
                    className="
                      max-w-55
                      font-cormorant
                      text-[16px]
                      font-medium
                      uppercase
                      leading-tight
                      tracking-[0.5px]
                      text-[#30303a]
                    "
                  >
                    Bibimbap / Vegetarian Bap
                  </h3>

                  <p
                    className="
                      mt-2.5
                      font-karla
                      text-[13px]
                      font-normal
                      leading-[1.55]
                      text-[#3f4655]
                      sm:mt-3
                      sm:text-[14px]
                    "
                  >
                    Marinated beef or tofu / cucumber / carrot / bean sprouts /
                    mushroom / spinach / rice / bibim sauce / kimchi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSection;
