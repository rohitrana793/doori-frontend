import { X } from "lucide-react";

const ShowOrderModal = ({ setShowOrderModal, title }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/55">
      <div
        className="
          absolute
          left-1/2
          top-16
          w-[calc(100%-32px)]
          max-w-212.5
          -translate-x-1/2
          bg-white/85
          px-3
          pb-5
          pt-3
          sm:top-20
          sm:w-[calc(100%-48px)]
          sm:px-4
          sm:pb-6
          sm:pt-4
          md:top-28
          md:px-4.5
          md:pb-7.5
          md:pt-4.5
        "
      >
        <button
          type="button"
          onClick={() => setShowOrderModal(false)}
          aria-label="Close order modal"
          className="
            absolute
            right-0
            top-0
            z-20
            flex
            h-10
            w-8
            cursor-pointer
            items-center
            justify-center
            bg-[#858585]
            text-white
            transition-colors
            hover:bg-[#707070]
            sm:h-11
            md:h-12
          "
        >
          <X size={24} className="sm:h-6 sm:w-6 md:h-7.5 md:w-7.5" />
        </button>
        <div
          className="
            flex
            min-h-60
            flex-col
            items-center
            bg-[#191f2b]
            px-4
            pb-7
            pt-10
            text-center
            sm:min-h-55
            sm:px-6
            sm:pt-10
            md:px-8
          "
        >
          <p
            className="
              m-0
              max-w-2xl
              text-[16px]
              font-normal
              leading-[1.5]
              text-white
              sm:text-[18px]
              sm:leading-[1.6]
              md:text-[22px]
            "
          >
            You are about to order from Doori{" "}
            <span className="uppercase text-red-500">{title}</span>.
          </p>

          <p
            className="
              mt-2
              m-0
              max-w-2xl
              text-[16px]
              font-normal
              leading-[1.5]
              text-white
              sm:text-[18px]
              sm:leading-[1.6]
              md:text-[22px]
            "
          >
            Choose how you want your food delivered:
          </p>

          <button
            type="button"
            className="
              mt-6
              w-fit
              cursor-pointer
              rounded-full
              bg-primary
              px-7
              py-2.5
              text-xs
              font-semibold
              uppercase
              tracking-[1.5px]
              text-white
              transition-all
              duration-300
              hover:bg-button
              sm:mt-7
              sm:px-8
              sm:py-3
              sm:text-sm
              sm:tracking-[2px]
              md:px-9
              md:py-3.5
            "
          >
            BRING
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowOrderModal;
