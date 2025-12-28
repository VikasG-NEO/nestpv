import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CommunitySection } from "@/components/CommunitySection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CommunitySection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
