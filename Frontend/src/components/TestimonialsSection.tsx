import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ramesh Kumar",
    role: "Auto Driver, Delhi",
    content: "NestUnion helped me save ₹50,000 in one year. The app is so simple, even my wife uses it now for her savings.",
    avatar: "R",
    rating: 5,
  },
  {
    name: "Lakshmi Devi",
    role: "Vegetable Vendor, Chennai",
    content: "I got a loan for my cart in just 2 days. No long forms, no bank visits. Everything on phone.",
    avatar: "L",
    rating: 5,
  },
  {
    name: "Mohammad Irfan",
    role: "Delivery Partner, Mumbai",
    content: "The health insurance saved my family during COVID. Now I recommend NestUnion to all my friends.",
    avatar: "M",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 bg-secondary/50">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block bg-success/10 text-success px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Trusted by{" "}
            <span className="text-accent">Thousands</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Real stories from real members across India.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-6 shadow-brand-sm border border-border/50"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              
              {/* Content */}
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
