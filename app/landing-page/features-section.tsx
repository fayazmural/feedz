import Feature from "./feature";

const features = [
  {
    title: "Seamless Integration",
    description: "Easily integrate with your existing tools and services.",
  },
  {
    title: "Instant Feedback Collection",
    description:
      "Seamlessly gather user feedback in real-time to capture their opinions and suggestions immediately.",
  },
  {
    title: "Easy Maintenance",
    description:
      "Easily manage feedback and can search by keywords and sort by ratings, ensuring you can prioritize and act on the most relevant feedback efficiently.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="container mx-auto max-w-screen-xl px-4 my-24 flex items-center flex-col">
      <h2 className="mb-6 text-4xl font-extrabold">Features</h2>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
