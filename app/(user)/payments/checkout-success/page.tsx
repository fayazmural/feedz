import { Button } from "@/components/ui/button";
import Link from "next/link";

const CheckoutSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="max-w-md p-6 bg-slate-100 rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-green-600">
          Subscription Confirmed!
        </h1>
        <p className="mt-4 text-base text-gray-700">
          Your subscription has been successfully activated. Thank you for
          joining us!
        </p>
        <div className="mt-6">
          <Button asChild className="bg-blue-700 hover:bg-blue-600">
            <Link href={"/"}>Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
