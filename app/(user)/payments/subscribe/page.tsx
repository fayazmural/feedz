import SubscribeButton from "@/components/subscribe-btn";
import { monthlyPlanId, yearlyPlanId } from "@/lib/payments";
import React from "react";

const Page = ({
  searchParams: { plan },
}: {
  searchParams: {
    plan: string;
  };
}) => {
  const planId = plan === "monthly" ? monthlyPlanId : yearlyPlanId;
  return (
    <div className="flex border p-4 rounded-md flex-col">
      <h1 className="text-2xl font-bold">Start your subscription now</h1>
      <div className="w-fit mt-3">
        <SubscribeButton price={planId} />
      </div>
    </div>
  );
};

export default Page;
