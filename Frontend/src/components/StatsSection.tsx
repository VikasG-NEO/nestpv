const stats = [
  { value: "0", label: "Active Members" },
  { value: "₹0", label: "Savings Enabled" },
  { value: "0", label: "Loans Approved" },
  { value: "0", label: "States Covered" },
];

export function StatsSection() {
  return (
    <section className="py-16 gradient-hero">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-accent mb-2">
                {stat.value}
              </p>
              <p className="text-primary-foreground/80 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
