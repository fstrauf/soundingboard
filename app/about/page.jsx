import Link from "next/link";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-first via-second to-third">
      <main className="flex-grow flex items-center justify-center p-10">
        <div className="w-full max-w-4xl bg-third p-6 rounded-xl shadow-lg text-white space-y-6 prose prose-invert">
          <h1 className="text-3xl font-bold leading-tight text-center">
            About Sounding Board
          </h1>
          <p className="text-lg text-center">
            We've been relying on our friends to get advice, but sometimes you
            don't know someone with the expertise you need.
          </p>
          <p>
            I regularly post updates and other content on this topic -{" "}
            <a className="underline" href="https://twitter.com/ffstrauf">
              follow me on Twitter
            </a>{" "}
            or{" "}
            <a className="underline" href="https://florianstrauf.substack.com/">
              Substack
            </a>
            .
          </p>
          <h2 className="pt-20 text-3xl font-bold leading-tight text-center">
            Our Mission
          </h2>
          <p className="text-lg text-center">
            With this platform, we want to help connect you to someone that has
            expertise in the area you need it in, when you need it.
            If you have something you feel you can help others with, go ahead and list your profile
          </p>
        </div>
      </main>
    </div>
  );
}
