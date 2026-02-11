import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-white dark:bg-black text-black dark:text-white text-center px-4">
      <h1 className="text-[150px] md:text-[200px] font-serif leading-none opacity-10 select-none">
        404
      </h1>

      <div className="relative -mt-12 md:-mt-20 space-y-6 z-10">
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight">
          Void.
        </h2>
        <p className="text-gray-500 max-w-md mx-auto">
          The item you are looking for has been moved, sold out, or never
          existed in this reality.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest border-b border-black dark:border-white pb-1 hover:opacity-50 transition-opacity mt-8"
        >
          <ArrowLeft size={16} /> Return Home
        </Link>
      </div>
    </div>
  );
}
