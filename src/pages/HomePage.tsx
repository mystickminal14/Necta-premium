import Hero from "../components/Hero";
import About from "../components/About";
import BeansBand from "../components/BeansBand";
import BeansChosen from "../components/BeansChosen";
import OurProducts from "../components/OurProducts";
import Testimonials from "../components/Testimonials";
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
      <OurProducts />
      <Testimonials />
      <OurStory />
      <Process />
      <VideoSection />
    </>
  );
}
