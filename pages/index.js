import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
import Head from "next/head";
import Header from "@/components/Header";

const WalletPageWithNoSSR = dynamic(() => import("@/components/WalletPage"), {
  ssr: false, // Disable server-side rendering for this component
});

export default function Home() {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <style>{`body { font-family: 'Space Grotesk', sans-serif; }`}</style>
      </Head>

      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow">
          <div className="container mx-auto px-4 py-8 flex justify-center">
            <WalletPageWithNoSSR />
          </div>
        </div>
        <div className="w-full">
          <Footer />
        </div>
      </div>
    </>
  );
}
