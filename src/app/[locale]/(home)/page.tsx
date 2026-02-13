// Componentes
import HeroBenefits from "./components/HeroBenefits";
import Hero from "./components/Hero";
import Trending from "./components/Trending";
import { Collections } from "./components/Collections";
import { ConversionSection } from "./components/ConversionSection";

const Home = () => {
  return (
    <main>
      <div className="container mx-auto lg:px-10 xl:px-20">
        <HeroBenefits layout="desktop" />
        <Hero />
        <HeroBenefits layout="mobile" />
      </div>
      <Trending />

      <div className="bg-neutral-100">
        <Collections />
      </div>
      <ConversionSection />
    </main>
  );
};

export default Home;
