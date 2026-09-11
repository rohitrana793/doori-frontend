import { FaFacebook } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";

const locations = [
  {
    city: "HELSINGBORG",
    address: ["Roskildegatan 2", "252 21 Helsingborg"],
    email: "info@doori.se",
    phone: "0768-605659",
    hours: [
      "Mon–Thurs 11.30–20.00",
      "Friday 11.30–20.30",
      "Saturday 12.00–20.30",
      "Sunday CLOSED",
    ],
  },
  {
    city: (
      <>
        MALMÖ
        <br />
        BERGSGATAN
      </>
    ),
    address: ["Bergsgatan 15A", "211 54 Malmö"],
    email: "info@doori.se",
    phone: "0760-093707",
    hours: [
      "Mon–Thurs 11:00–21:00",
      "Friday 11:00–22:00",
      "Saturday 12:00–22:00",
      "Sunday 12:00–21:00",
    ],
  },
  {
    city: (
      <>
        MALMÖ WESTERN
        <br />
        HARBOUR
      </>
    ),
    address: ["Masttorget 3", "211 77 Malmö"],
    email: "info@doori.se",
    phone: "0760-070855",
    hours: [
      "Mon–Thurs 11:00–21:00",
      "Friday 11:00–22:00",
      "Saturday 12:00–22:00",
      "Sunday 12:00–21:00",
    ],
  },
  {
    city: "VÄXJÖ",
    address: ["Kungsgatan 15A", "352 31 Växjö"],
    email: "info@doori.se",
    phone: "0764-341268",
    hours: ["Mon–Fri 11:00–20:30", "Saturday 12:00–20:30", "Sunday CLOSED"],
  },
  {
    city: "COPENHAGEN",
    address: ["Your Copenhagen Address", "Copenhagen, Denmark"],
    email: "info@doori.se",
    phone: "Your Phone Number",
    hours: ["Mon–Fri 11:00–20:30", "Saturday 12:00–20:30", "Sunday CLOSED"],
  },
];

const galleryImages = [
  "/images/foot-image/1.jpeg",
  "/images/foot-image/2.jpg",
  "/images/foot-image/3.jpg",
  "/images/foot-image/4.jpg",
  "/images/foot-image/5.jpg",
  "/images/foot-image/6.jpg",
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-white pt-10 pb-3 sm:pt-12 md:pt-14 md:pb-4">
      <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-10">
        <div
          className="
            grid
            grid-cols-1
            gap-12
            sm:grid-cols-2
            sm:gap-x-8
            sm:gap-y-14
            lg:grid-cols-6
            lg:gap-x-7
            lg:gap-y-8
            xl:gap-x-9
          "
        >
          {locations.map((location, index) => (
            <div
              key={index}
              className="
                min-w-0
                text-center
                sm:text-left
              "
            >
              <h3
                className="
                  min-h-0
                  font-cormorant
                  text-[21px]
                  leading-[1.35]
                  tracking-[1px]
                  sm:min-h-17.5
                  sm:text-[22px]
                  md:text-[23px]
                "
              >
                {location.city}
              </h3>

              <div
                className="
                  mt-4
                  space-y-1
                  font-karla
                  text-[15px]
                  leading-[1.5]
                  sm:mt-5
                  sm:text-[16px]
                "
              >
                {location.address.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>

              <div
                className="
                  mt-7
                  space-y-1
                  font-karla
                  text-[15px]
                  leading-[1.6]
                  text-primary
                  sm:mt-8
                  sm:text-[16px]
                "
              >
                <a
                  href={`mailto:${location.email}`}
                  className="
                    block
                    break-words
                    transition-opacity
                    duration-200
                    hover:opacity-70
                  "
                >
                  E-mail: {location.email}
                </a>

                <a
                  href={`tel:${location.phone.replace(/[^0-9+]/g, "")}`}
                  className="
                    block
                    transition-opacity
                    duration-200
                    hover:opacity-70
                  "
                >
                  Telephone: {location.phone}
                </a>
              </div>

              <div className="mt-7 sm:mt-8">
                <h4
                  className="
                    font-karla
                    text-[16px]
                    font-bold
                    leading-normal
                  "
                >
                  Opening hours
                </h4>

                <div
                  className="
                    mt-1
                    space-y-1
                    font-karla
                    text-[15px]
                    leading-[1.5]
                    sm:text-[16px]
                  "
                >
                  {location.hours.map((hour, i) => (
                    <p key={i}>{hour}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <div
            className="
              flex
              w-full
              min-w-0
              flex-col
              items-center
              justify-start
              pt-2
              sm:col-span-2
              lg:col-span-1
              lg:items-center
              lg:pt-0
            "
          >
            <div className="mb-6 w-full text-center sm:mb-8">
              <img
                src="/images/doorilogo.png"
                alt="Doori Korean fried chicken"
                className="
                  mx-auto
                  h-auto
                  w-52
                  max-w-full
                  object-contain
                  sm:w-60
                  md:w-64
                  lg:w-56
                  xl:w-64
                "
              />
            </div>

            <div
              className="
                grid
                w-full
                max-w-56
                grid-cols-3
                gap-2
                sm:max-w-60
                sm:gap-2.5
                lg:w-52
                lg:max-w-none
                lg:gap-2
                xl:w-56
              "
            >
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="
                    aspect-square
                    overflow-hidden
                    bg-gray-100
                  "
                >
                  <img
                    src={image}
                    alt={`Doori food ${index + 1}`}
                    loading="lazy"
                    className="
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-300
                      hover:scale-105
                    "
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 sm:mt-14 md:mt-16">
          <div
            className="
              flex
              min-h-20
              flex-col
              items-center
              justify-center
              gap-5
              py-5
              sm:min-h-22.5
              sm:flex-row
              sm:justify-between
              sm:gap-4
              sm:py-6
            "
          >
            <p
              className="
                font-karla
                text-center
                text-[15px]
                sm:text-left
                sm:text-[16px]
              "
            >
              © {year} Doori
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/Doorikoreanskmat"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Doori Facebook"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-primary
                  text-white
                  transition-all
                  duration-200
                  hover:scale-105
                  hover:bg-button
                  active:scale-95
                "
              >
                <FaFacebook size={18} />
              </a>

              <a
                href="https://www.instagram.com/doori_koreanskmat"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Doori Instagram"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-primary
                  text-white
                  transition-all
                  duration-200
                  hover:scale-105
                  hover:bg-button
                  active:scale-95
                "
              >
                <IoLogoInstagram size={19} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
