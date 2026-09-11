import { Search } from "lucide-react";

const PageNotFound = () => {
  return (
    <section
      className="
        min-h-[70vh]
        w-full
        bg-optional
        pt-28
        pb-16
        sm:pt-30
        md:min-h-[75vh]
        md:pt-32
        md:pb-10
      "
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        <div
          className="
            flex
            min-h-[5vh]
            flex-col
            justify-start
            bg-secondary
            p-5
            sm:p-6
            md:p-8
          "
        >
          <h2
            className="
              mt-2
              font-cormorant
              text-[32px]
              font-medium
              uppercase
              leading-[1.15]
              tracking-[2px]
              text-white
              sm:text-[40px]
              md:text-[48px]
              lg:text-[55px]
            "
          >
            Oops! That page can’t be found.
          </h2>

          <p
            className="
              mt-5
              max-w-xl
              text-sm
              leading-7
              text-white
              sm:text-base
            "
          >
            It looks like nothing was found at this location. Maybe try a
            search?
          </p>

          <form className="mt-8 flex w-full">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Sök ..."
                className="
                  h-12
                  w-full
                  border
                  border-white
                  bg-transparent
                  px-4
                  pr-12
                  text-[16px]
                  text-white
                  outline-none
                  placeholder:text-[16px]
                  placeholder:text-white/60
                  focus:border-primary
                "
              />

              <Search
                size={18}
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-white/85
                "
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;
