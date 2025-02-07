import Navbar from "../components/navbar/Navbar";
import Hero from "../components/hero/Hero";
import OurFleet from "../components/our-fleet/OurFeet";
import Steps from "../components/steps/Steps";
import WhyUs from "../components/why-choose-us/WhyUs";
import CallToAction from "../components/CTA/CallToAction";
import Footer from "../components/footer/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <hr />
      <WhyUs />
      <hr />
      <Steps />
      <hr />
      <OurFleet />
      <hr />
      <CallToAction />
      <hr />
      <Footer />
    </>
  );
};

export default Home;
