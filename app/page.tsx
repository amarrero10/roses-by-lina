import HomeGallery from "@/components/HomeGallery";
import ImageTakeover from "@/components/Takeover";

export default function Home() {
  return (
    <>
      <main className=" min-h-screen bg-primary-white">
        <section className="  py-40">
          <div className=" flex flex-col w-[70%] mx-auto">
            <h1 className="text-8xl">Fresh. Modern. Roses by Lina</h1>
            <h1 className="text-8xl mb-10"> Designed for you.</h1>
            <p>Founded by Linette Carcamo</p>
            <p>Based in the Tampa Bay Area</p>
          </div>
        </section>
        <HomeGallery />
        <ImageTakeover src="/4.jpg" />

        {/* The next text section after the takeover */}
        <section className="py-32 max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-8">Next Section Title</h2>
          <p className="text-lg leading-relaxed">
            This content appears after the image takeover section...
          </p>
        </section>
      </main>
    </>
  );
}
