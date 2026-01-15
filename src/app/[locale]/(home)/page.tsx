import Hero from "./components/Hero";
import HeroBenefits from "./components/HeroBenefits";
import Trending from "./components/Trending";

const Home = () => {
  return (
    <main>
      <div className="container mx-auto lg:px-10 xl:px-20">
        <HeroBenefits layout="desktop" />
        <Hero />
        <HeroBenefits layout="mobile" />
      </div>
      <Trending />
    </main>
  );
};

export default Home;
