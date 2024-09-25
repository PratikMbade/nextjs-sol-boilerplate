import Navbar from "@/components/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div >
 
     



      <nav className="flex items-center  justify-center w-full border-b border-b-neutral-800">
       <Navbar/>
      </nav>
      <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto gap-x-3">
      <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <p className="font-semibold text-6xl">+</p>
        <Image
        src="https://solana.com/_next/static/media/logotype.e4df684f.svg"
        alt="Next.js logo"
        width={280}
        height={58}
        priority
        />
      </main>
    </div>
  );
}

