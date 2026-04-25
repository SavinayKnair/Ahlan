import HeroSection from "@/components/sections/HeroSection";
import AnimatedStats from "@/components/sections/AnimatedStats";
import AboutSection from "@/components/sections/AboutSection";
import PackageSection from "@/components/sections/PackageSection";
import ThingsToDo from "@/components/sections/ThingsToDo";

import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BlogSection from "@/components/sections/BlogSection";
import FaqSection from "@/components/sections/FaqSection";
import WeatherWidget from "@/components/sections/WeatherWidget";
import RoomSection from "@/components/sections/RoomSection";
import CountdownSection from "@/components/sections/CountdownSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AnimatedStats />
      <AboutSection />
      <RoomSection />
      <PackageSection />
      <ThingsToDo />

      <WeatherWidget />
      <TestimonialsSection />
      <CountdownSection />
      <BlogSection />
      <FaqSection />
    </>
  );
}
