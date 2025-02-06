import Navbar from "../components/navbar/Navbar";
import Hero from "../components/hero/Hero";
import OurFleet from "../components/our-fleet/OurFeet";
import Steps from "../components/steps/Steps";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <hr />
      <Steps />
      <hr />
      <OurFleet />
      <hr />
    </>
  );
};

export default Home;
