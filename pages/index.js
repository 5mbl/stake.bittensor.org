import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const WalletPageWithNoSSR = dynamic(() => import("@/components/WalletPage"), {
  ssr: false, // Disable server-side rendering for this component
});

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <WalletPageWithNoSSR />
    </div>
  );
}
