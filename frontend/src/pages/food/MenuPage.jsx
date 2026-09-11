const MenuPage = () => {
  const leftColumn = [
    {
      image: "/images/menu/dumplings.jpg",
      title: "FRIED DUMPLINGS",
      ingredients: "Cream cheese / Carrot / Chives",
      description:
        "Homemade dumplings filled with cream cheese, carrot, chives.",
    },
    {
      image: "/images/menu/mandoo.jpg",
      title: "MANDOO",
      ingredients:
        "Chicken / tofu / kimchi / sweet potato noodles / ginger / garlic / green onions",
      description:
        "Homemade Korean dumplings filled with chicken, kimchi, tofu, sweet potato noodles, scallions, ginger, garlic.",
    },
    {
      image: "/images/menu/kimchi.jpg",
      title: "KIMCHI",
      ingredients:
        "Salad bowl / radish / green onion / chili powder / ginger / apple / garlic / fish sauce",
      description: "Fermented salad cabbage with homemade kimchi sauce.",
    },
  ];

  const rightColumn = [
    {
      image: "/images/menu/fried-chicken.jpg",
      title: "KOREAN FRIED CHICKEN WITH GO, SO OR HE SAUCE",
      ingredients:
        "Chicken or vegetables / Rice / Pickled Radish / Chives / Sesame seeds",
      description:
        "Doori's fried chicken with your choice of homemade sauce, served with rice and pickled radish.",
    },
    {
      image: "/images/menu/chicken-mayo.jpg",
      title: "CHICKEN MAYO / VEGETABLE MAYO",
      ingredients:
        "Chicken or vegetables / Rice / Egg / Sauce / Mayonnaise / Seaweed chips / Chives",
      description:
        "Korean Fried Chicken with rice and scrambled eggs, topped with So sauce, teriyaki sauce and mayonnaise. Mix before eating to make it taste better.",
    },
    {
      image: "/images/menu/bibimbap.jpeg",
      title: "BIBIMBAP / VEGETARIAN BAP",
      ingredients:
        "Marinated beef / cucumber / carrot / bean sprouts / mushroom / spinach / rice / bibim sauce / kimchi",
      description:
        "One of Korea's national dishes – Bibimbap is rice served in a bowl covered with seasoned vegetables, bulgogi and topped with a sunny side up egg. Doori's homemade sauce is served on the side but should be mixed in and stirred long and well for the best flavor! Also offered in a vegetarian version with tofu instead of bulgogi.",
    },
  ];

  const FoodItem = ({ image, title, ingredients, description }) => {
    return (
      <article className="flex w-full items-start gap-5 sm:gap-6 md:gap-7">
        <div
          className="
            w-30
            shrink-0
            sm:w-35
            md:w-40
            lg:w-42.5
          "
        >
          <img
            src={image}
            alt={title}
            className="block h-auto w-full object-contain"
          />
        </div>

        <div className="min-w-0 flex-1 pt-0.5">
          <h2
            className="
              font-cormorant
              text-[21px]
              font-medium
              leading-tight
              text-white
              md:text-[21px]
            "
          >
            {title}
          </h2>

          <p
            className="
              mt-2
              text-[15px]
              leading-7
              text-white/85
              md:text-[15px]
            "
          >
            {ingredients}
          </p>

          <p
            className="
              mt-2
              text-[15px]
              font-semibold
              leading-7
              text-white
              md:text-[15px]
            "
          >
            {description}
          </p>
        </div>
      </article>
    );
  };

  return (
    <section
      className="
        min-h-screen
        w-full
        bg-secondary
        py-32
        md:py-36
        lg:py-40
      "
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="mb-16 text-center md:mb-20">
          <p
            className="
              text-[16px]
              tracking-[0.45em]
              text-green-500
              md:text-[16px]
            "
          >
            DOOR
          </p>

          <h1
            className="
              mt-5
              font-cormorant
              text-[40px]
              font-medium
              tracking-wide
              text-white
              md:text-[40px]
            "
          >
            OUR SPECIALTIES
          </h1>

          <p
            className="
              mt-5
              text-[14px]
              font-semibold
              text-white
              sm:text-[15px]
              md:text-[16px]
            "
          >
            Vegetarian and lactose/gluten-free versions available
          </p>
        </div>

        <div
          className="
            flex
            flex-col
            gap-16
            lg:flex-row
            lg:items-start
            lg:gap-16
            xl:gap-24
          "
        >
          <div
            className="
              flex
              w-full
              flex-col
              gap-16
              lg:w-1/2
              lg:pt-27.5
            "
          >
            {leftColumn.map((food) => (
              <FoodItem
                key={food.title}
                image={food.image}
                title={food.title}
                ingredients={food.ingredients}
                description={food.description}
              />
            ))}
          </div>

          <div
            className="
              flex
              w-full
              flex-col
              gap-16
              lg:w-1/2
            "
          >
            {rightColumn.map((food) => (
              <FoodItem
                key={food.title}
                image={food.image}
                title={food.title}
                ingredients={food.ingredients}
                description={food.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuPage;
