import { Button } from "@/components/ui/button";
import { ArrowRight, Smartphone, Download } from "lucide-react";

export function CTASection() {
  return (
    <section id="about" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto">
        <div className="gradient-hero rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-accent blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-primary-foreground blur-3xl" />
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Smartphone className="w-4 h-4" />
              Available on Android & iOS
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Start Your Journey to{" "}
              <span className="text-accent">Financial Freedom</span>
            </h2>
            
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Join 50,000+ community members who are saving, growing, 
              and securing their future with NestUnion.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" className="group">
                <Download className="w-5 h-5" />
                Download App
              </Button>
              <Button variant="hero-outline" size="xl">
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
            
            <p className="text-primary-foreground/60 text-sm mt-6">
              Free to join • No hidden charges • Available in 10+ languages
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
