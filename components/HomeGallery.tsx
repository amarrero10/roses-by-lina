import Image from "next/image";

export default function HomeGallery() {
  const imgs = [
    { src: "/1.jpg", w: 380, h: 620, y: "-40%" },
    { src: "/2.jpg", w: 360, h: 580, y: "30%" },
    { src: "/3.jpg", w: 460, h: 700, y: "-10%" },
    { src: "/4.jpg", w: 600, h: 850, y: "10%" }, // large yellow flower equivalent
    { src: "/5.jpg", w: 460, h: 560, y: "25%" },
    { src: "/6.jpg", w: 500, h: 650, y: "2%" },
  ];

  return (
    <section className="w-full overflow-hidden mt-20 py-10">
      <div className="flex justify-center">
        <div className="flex gap-10">
          {imgs.map((img, i) => (
            <div
              key={i}
              className="relative rounded-xl overflow-hidden"
              style={{
                width: img.w,
                height: img.h,
                transform: `translateY(${img.y})`,
              }}
            >
              <Image src={img.src} alt="" fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
