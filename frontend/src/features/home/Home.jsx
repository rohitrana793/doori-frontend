import CateringSection from "../catering/CateringSection";
import CustomerSection from "../customer/CustomerSection";
import HeroSection from "../hero/HeroSection";
import LocationSection from "../map/MapSection";
import MenuSection from "../menu/MenuSection";
import OrderSection from "../order/OrderSection";
import RestaurantSection from "../restaurant/RestaurantSection";
import ReviewSection from "../review/ReviewSection";
import WelcomeSection from "../welcome/WelcomeSection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <RestaurantSection />
      <WelcomeSection />
      <CustomerSection />
      <CateringSection />
      <MenuSection />
      <OrderSection />
      <ReviewSection />
      <LocationSection />
    </>
  );
};

export default Home;
