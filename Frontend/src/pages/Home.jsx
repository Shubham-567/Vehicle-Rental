import Navbar from "../components/navbar/Navbar";
import Hero from "../components/hero/Hero";
import OurFleet from "../components/our-fleet/OurFeet";
import Steps from "../components/steps/Steps";
import WhyUs from "../components/why-choose-us/WhyUs";

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
      <WhyUs />
      <hr />
    </>
  );
};

export default Home;
