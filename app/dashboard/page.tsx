import DashboardLayout from "@/components/DashboardLayout";
import React from "react";

const page = () => {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary">
            Dashboard is Under Construction
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            We are currently working to get this page ready for you.
          </p>
          <p className="mt-2 text-lg text-gray-700">Please check back later!</p>
          <a
            href="/"
            className="mt-6 inline-block bg-primary text-white px-4 py-2 rounded-lg "
          >
            Go Back Home
          </a>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default page;
