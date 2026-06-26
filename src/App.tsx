import { useLenis } from "./lib/useLenis";
import { useIsDesktop } from "./lib/useIsDesktop";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stage from "./components/Stage";
import StageMobile from "./components/StageMobile";
import BeansBand from "./components/BeansBand";
import Quality from "./components/Quality";
import CupSection from "./components/CupSection";
import OurStory from "./components/OurStory";
import Process from "./components/Process";
import VideoSection from "./components/VideoSection";
import Footer from "./components/Footer";

export default function App() {
  useLenis();
  const isDesktop = useIsDesktop();

  return (
    <>
      <Navbar />

      <main className="relative">
        {/* Hero — static pouches, no 3D */}
        <Hero />

        {/* About + 3D model → scroll → Why Choose Us.
            Only one variant (and one 3D canvas) mounts. */}
        {isDesktop ? <Stage /> : <StageMobile />}

        <BeansBand />
        <Quality />
        <CupSection />
        <OurStory />
        <Process />
        <VideoSection />
        <Footer />
      </main>
    </>
  );
}
