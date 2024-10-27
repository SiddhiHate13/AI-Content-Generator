import Image from "next/image";
import Link from "next/link";
import Spline from "@splinetool/react-spline";

export default function Home() {
  return (
    <main className="relative w-full h-screen">
      {/* Spline as Background */}
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/PYdRvTnhm558uzrC/scene.splinecode" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        {/* Logo on the top left corner */}
        <div className="absolute top-10 left-8 z-50">
          <Image src={"/logo.png"} alt="logo" width={150} height={150} />
        </div>

        {/* Main Content */}
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-[450px] pb-10 text-center">
          <div className="mt-5 max-w-2xl mx-auto">
            <h1 className="block font-bold text-gray-100 text-4xl md:text-5xl lg:text-6xl dark:text-neutral-200">
              AI Content
              <span className="bg-clip-text bg-gradient-to-tl from-slate-200 to-violet-500 text-transparent">
                Generator
              </span>
            </h1>
          </div>

          <div className="mt-5 max-w-3xl mx-auto">
            <p className="text-lg text-violet-100 dark:text-neutral-400">
              Revolutionize your content creation with our AI-powered app,
              delivering engaging and high-quality text in seconds.
            </p>
          </div>

          <div className="mt-8 gap-4 flex justify-center">
            <Link
              className="inline-flex justify-center items-center gap-x-6 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-lg font-medium rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600 py-3 px-4 dark:focus:ring-offset-gray-800"
              href="/dashboard"
            >
              Get started
              <svg
                className="flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
