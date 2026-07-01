import Hero from "../components/Hero";
import About from "../components/About";
import BeansBand from "../components/BeansBand";
import BeansChosen from "../components/BeansChosen";
import Quality from "../components/Quality";
import CupSection from "../components/CupSection";
import OurStory from "../components/OurStory";
import Process from "../components/Process";
import VideoSection from "../components/VideoSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <BeansBand />
      <BeansChosen />
      <Quality />
      <CupSection />
      <OurStory />
      <Process />
      <VideoSection />
    </>
  );
}
