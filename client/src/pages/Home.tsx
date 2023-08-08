import BookingModal from "components/BookingModal";
import BusinessModal from "components/BusinessModal";
import Header from "components/Header";
import { LoginModal } from "components/Login";
import { Map } from "components/Map";
import { Menu } from "components/MenuCarousel";
import { useAppSelector } from "hooks/redux-hooks";
import { selectBusiness } from "store/business/businessSlice";

const Home = () => {
  const { modalOpen: isBusinessModalOpen } = useAppSelector(selectBusiness);

  return (
    <>
      <div className=" fixed top-0 bottom-0 left-0 right-0 flex flex-col bg-gray-200">
        <Header />
        <div className="xs:flex-row relative flex flex-col-reverse flex-1">
          <Menu />
          <Map />
        </div>

        <BookingModal />
      </div>
      {isBusinessModalOpen && <BusinessModal />}
      <LoginModal />
    </>
  );
};

export default Home;
