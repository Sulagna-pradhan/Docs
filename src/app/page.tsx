import Link from "next/link";
import Header from "@/components/common/Header";
import Hero from "@/components/section/HeroSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-secondary">
      <Header />
      <Hero />
    </div>
  );
}
export const metadata = {
  title: "Home | Next.js App",
  description: "Welcome to the Next.js application",
};
