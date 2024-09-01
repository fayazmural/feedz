import React from "react";
import PricingCard from "./pricing-card";

export type PricingPlan = {
  title: string;
  price: number;
  description: string;
  isPopular: boolean;
  features: string[];
  url: string;
};

export const pricingPlans: PricingPlan[] = [
  {
    title: "Free",
    price: 0,
    description: "For small teams just getting started",
    isPopular: false,
    url: "/dashboard",
    features: [
      "3 projects",
    ],
  },
  {
    title: "Yearly",
    price: 39.99,
    description: "Upgrade to save more!",
    isPopular: true,
    url: "/payments/subscribe?plan=yearly",
    features: [
      "Unlimited projects",
    ],
  },
];

const PricingSection = () => {
  return (
    <div className="text-center">
      <h1 className="capitalize text-3xl">Pricing</h1>
      <h2 className="font-extrabold text-3xl mb-8 pt-3">
        Flexible Pricing to Fix your needs
      </h2>
      <div className="mt-10 grid items-center grid-cols-1 gap-3 md:grid-cols-2 max-w-screen-xl">
        {pricingPlans.map((plan, index) => {
          return <PricingCard key={index} {...plan} />;
        })}
      </div>
    </div>
  );
};

export default PricingSection;
