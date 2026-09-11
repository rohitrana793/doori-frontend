import { useState } from "react";
import ShowOrderModal from "../../components/commom/ShowOrderModal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerDetailsSchema } from "../../schema/customerDetailsSchema";

const MalmoWesternPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(customerDetailsSchema),
  });
  const [showOrderModal, setShowOrderModal] = useState(false);
  const title = "malmö västra hanmen";

  const onSubmit = (data) => {
    console.log("Data", data);
  };

  return (
    <section className="min-h-screen w-full bg-secondary pt-16 pb-10 md:pt-20 md:pb-14">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="mb-3 md:mb-4">
          <h1
            className="
              font-cormorant
              text-3xl
              font-medium
              uppercase
              leading-tight
              tracking-wide
              text-white
              sm:text-4xl
              md:text-[40px]
            "
          >
            Malmö Western Harbour
          </h1>
        </div>

        <div
          className="
            relative
            min-h-[400px]
            w-full
            overflow-hidden
            sm:min-h-[420px]
            md:h-[300px]
            md:min-h-0
            lg:h-[320px]
          "
        >
          <img
            src="/images/opening-hours.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-white/95" />

          <div
            className="
              relative
              z-10
              flex
              h-full
              w-full
              flex-col
              justify-center
              px-6
              py-8
              sm:px-10
              md:flex-row
              md:items-center
              md:px-14
              md:py-0
              lg:px-16
            "
          >
            <div className="flex w-full items-center md:w-[42%]">
              <h2
                className="
                  font-karla
                  text-2xl
                  font-bold
                  tracking-wide
                  text-primary
                  sm:text-[28px]
                  md:text-[32px]
                "
              >
                Opening hours
              </h2>
            </div>

            <div
              className="
                mt-6
                flex
                w-full
                flex-col
                gap-2
                font-karla
                text-base
                sm:mt-8
                sm:text-lg
                md:mt-0
                md:w-[58%]
                md:gap-2.5
                md:text-[20px]
              "
            >
              <div className="grid grid-cols-[120px_1fr] sm:grid-cols-[150px_1fr]">
                <span>Monday:</span>
                <span>11.00 – 21.00</span>
              </div>

              <div className="grid grid-cols-[120px_1fr] sm:grid-cols-[150px_1fr]">
                <span>Tuesday:</span>
                <span>11.00 – 21.00</span>
              </div>

              <div className="grid grid-cols-[120px_1fr] sm:grid-cols-[150px_1fr]">
                <span>Wednesday:</span>
                <span>11.00 – 21.00</span>
              </div>

              <div className="grid grid-cols-[120px_1fr] sm:grid-cols-[150px_1fr]">
                <span>Thursday:</span>
                <span>11.00 – 22.00</span>
              </div>

              <div className="grid grid-cols-[120px_1fr] sm:grid-cols-[150px_1fr]">
                <span>Friday:</span>
                <span>12.00 – 22.00</span>
              </div>

              <div className="grid grid-cols-[120px_1fr] sm:grid-cols-[150px_1fr]">
                <span>Saturday:</span>
                <span>12.00 – 21.00</span>
              </div>

              <div className="grid grid-cols-[120px_1fr] sm:grid-cols-[150px_1fr]">
                <span>Sunday:</span>
                <span>CLOSED</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="
            flex
            min-h-[170px]
            flex-col
            items-center
            justify-center
            bg-[#30394b]
            px-4
            py-8
            text-center
            sm:min-h-[180px]
            md:min-h-[195px]
          "
        >
          <p
            className="
              font-karla
              text-sm
              font-medium
              text-white
              sm:text-lg
              md:text-[20px]
            "
          >
            Order food online for takeout:
          </p>

          <div
            className="
              mt-4
              flex
              w-full
              flex-col
              items-center
              justify-center
              gap-3
              sm:flex-row
              sm:gap-5
              md:gap-8
            "
          >
            <button
              type="button"
              onClick={() => setShowOrderModal(true)}
              className="
                w-full
                max-w-[220px]
                cursor-pointer
                rounded-full
                bg-primary
                px-6
                py-3
                text-sm
                font-semibold
                uppercase
                tracking-[2px]
                text-white
                transition-all
                duration-300
                hover:bg-button
                sm:w-auto
                sm:px-8
                md:px-9
                md:py-3.5
                md:text-base
              "
            >
              Order Here
            </button>

            <button
              type="button"
              className="
                w-full
                max-w-[220px]
                cursor-pointer
                rounded-full
                bg-primary
                px-6
                py-3
                text-sm
                font-semibold
                uppercase
                tracking-[2px]
                text-white
                transition-all
                duration-300
                hover:bg-button
                sm:w-auto
                sm:px-8
                md:px-9
                md:py-3.5
                md:text-base
              "
            >
              Book a Table
            </button>
          </div>
        </div>

        <div
          className="
            mt-8
            w-full
            border
            border-primary
            p-4
            sm:mt-10
            sm:p-6
            md:p-10
            lg:p-12
          "
        >
          <div
            className="
              grid
              grid-cols-1
              gap-10
              md:grid-cols-2
              md:gap-12
              lg:gap-14
            "
          >
            <div className="flex w-full flex-col">
              <h2
                className="
                  mb-6
                  font-karla
                  text-2xl
                  font-medium
                  text-white
                  sm:mb-8
                  sm:text-3xl
                "
              >
                Contact us
              </h2>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex w-full flex-col gap-5 sm:gap-6"
              >
                <div className="w-full">
                  <label
                    htmlFor="name"
                    className="
                      mb-2
                      block
                      font-karla
                      text-sm
                      font-medium
                      text-white
                      sm:text-base
                    "
                  >
                    Name
                  </label>

                  <input
                    id="name"
                    {...register("name")}
                    type="text"
                    className="
                      h-12
                      w-full
                      border
                      border-gray-400
                      bg-transparent
                      px-4
                      font-karla
                      text-base
                      text-white
                      outline-none
                      transition-colors
                      focus:border-primary
                      sm:h-14
                    "
                  />
                  {errors.name && (
                    <p className="text-red-800 bg-white py-2 px-2 border border-red-400 text-[16px] font-medium">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="w-full">
                  <label
                    htmlFor="email"
                    className="
                      mb-2
                      block
                      font-karla
                      text-sm
                      font-medium
                      text-white
                      sm:text-base
                    "
                  >
                    Email <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="email"
                    {...register("email")}
                    type="email"
                    className="
                      h-12
                      w-full
                      border
                      border-gray-400
                      bg-transparent
                      px-4
                      font-karla
                      text-base
                      text-white
                      outline-none
                      transition-colors
                      focus:border-primary
                      sm:h-14
                    "
                  />
                  {errors.email && (
                    <p className="text-red-800 bg-white py-2 px-2 border border-red-400 text-[16px] font-medium mt-2">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="w-full">
                  <label
                    htmlFor="message"
                    className="
                      mb-2
                      block
                      font-karla
                      text-sm
                      font-medium
                      text-white
                      sm:text-base
                    "
                  >
                    Message <span className="text-red-500">*</span>
                  </label>

                  <textarea
                    id="message"
                    {...register("message")}
                    rows={7}
                    className="
                      min-h-[180px]
                      w-full
                      resize-y
                      border
                      border-gray-400
                      bg-transparent
                      px-4
                      py-3
                      font-karla
                      text-base
                      text-white
                      outline-none
                      transition-colors
                      focus:border-primary
                      sm:min-h-[190px]
                    "
                  />
                  {errors.message && (
                    <p className="text-red-800 bg-white py-2 px-2 border border-red-400 text-[16px] font-medium mt-2">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
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
                  Submit
                </button>
              </form>
            </div>

            <div
              className="
                flex
                w-full
                items-start
                justify-center
                md:justify-end
              "
            >
              <img
                src="/images/branch/malmo-vastra.jpeg"
                alt="Restaurant"
                className="
                  h-[320px]
                  w-full
                  object-cover
                  sm:h-[400px]
                  sm:w-[85%]
                  md:h-[480px]
                  md:w-[80%]
                  lg:h-[515px]
                "
              />
            </div>
          </div>
        </div>

        <div
          className="
            mt-3
            grid
            w-full
            grid-cols-1
            gap-3
            md:grid-cols-[29%_1fr]
          "
        >
          <div
            className="
              flex
              min-h-[330px]
              flex-col
              bg-primary
              px-6
              py-7
              sm:min-h-[360px]
              sm:px-9
              sm:py-9
              md:h-[450px]
              md:min-h-0
              md:px-10
              md:py-10
              lg:h-[450px]
              lg:px-11
            "
          >
            <h2
              className="
                font-karla
                text-2xl
                font-bold
                leading-tight
                text-white
                sm:text-[32px]
              "
            >
              Contact details
            </h2>

            <div
              className="
                mt-5
                font-karla
                text-sm
                leading-6
                text-[#172017]
                sm:mt-6
                sm:text-base
                md:text-[17px]
                md:leading-7
              "
            >
              <p>
                Masttorget 3
                <br />
                211 77 Malmö
              </p>

              <p className="mt-4">
                E-mail:{" "}
                <a
                  href="mailto:info@doori.se"
                  className="break-all underline underline-offset-2"
                >
                  info@doori.se
                </a>
              </p>

              <p className="mt-1">
                Telephone:{" "}
                <a
                  href="tel:0760070855"
                  className="underline underline-offset-2"
                >
                  076 007 08 55
                </a>
              </p>
            </div>
          </div>

          <div
            className="
              h-[330px]
              w-full
              overflow-hidden
              sm:h-[360px]
              md:h-[450px]
            "
          >
            <iframe
              src="https://www.google.com/maps?q=Masttorget+3,+211+77+Malm%C3%B6,+Sweden&output=embed"
              className="h-full w-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="Masttorget 3 Map"
            />
          </div>
        </div>
      </div>

      {showOrderModal && (
        <ShowOrderModal setShowOrderModal={setShowOrderModal} title={title} />
      )}
    </section>
  );
};

export default MalmoWesternPage;
