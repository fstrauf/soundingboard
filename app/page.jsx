// import Image from "next/image";
// import Testimonials from "../components/Testimonials";
// import References from "../components/References";
// import FAQ from "../components/FAQ";
// import Features from "../components/Features";
// import Link from "next/link";
import Head from "next/head";
import AccountList from "../components/AccountSection/AccountSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-third">
      <div className="container mx-auto px-4">
        <Head>
          {/* <link rel="canonical" href="https://www.expensesorted.com/" /> */}
        </Head>
        <main className="flex-grow flex items-center justify-center sm:p-10">
          <div className="w-full max-w-4xl p-6 text-third space-y-6">
            <h1 className="text-3xl font-bold leading-tight text-center text-white">
              Heading into uncharted territory? Talk to someone who's been there before.
            </h1>
            <h2 className="text-2xl text-first text-center">Find a sounding board.</h2>
            <p className="text-lg text-center text-white">
              List yourself or find someone that you might want to reach out to.
            </p>
            <AccountList/>
           
            {/* <h1 className="pt-20 text-3xl font-bold leading-tight text-center">
              You want to learn more you said?
            </h1>
            <div className="flex flex-col gap-20">
              <Features />
              <Testimonials />
              <FAQ />
              <References />
            </div> */}
          </div>
        </main>
      </div>
    </div>
  );
}