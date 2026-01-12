import Hero from "./components/Hero";
import HeroBenefits from "./components/HeroBenefits";

const Home = () => {
  return (
    <main>
      <div className="container mx-auto lg:px-10 xl:px-20">
        <HeroBenefits layout="desktop" />
        <Hero />
        <HeroBenefits layout="mobile" />
      </div>
    </main>
  );
};

export default Home;
