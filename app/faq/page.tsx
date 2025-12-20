import FAQItem from "@/components/FAQItem";
import Image from "next/image";
import Link from "next/link";
import img from "../../public/25.jpg";
function Faq() {
  const faqs = [
    {
      question: "What types of floral services do you offer?",
      answer:
        "We create custom floral designs for birthdays, graduations, proposals, weddings, memorials, and everyday occasions.",
    },
    {
      question: "Do you offer custom arrangements?",
      answer:
        "Yes. Every arrangement is thoughtfully designed based on your preferences, event details, and seasonal availability.",
    },
    {
      question: "How far in advance should I place my order?",
      answer:
        "For everyday arrangements, 24–48 hours is recommended. Weddings and large events typically require advance notice.",
    },
    {
      question: "Do you deliver?",
      answer:
        "Yes, delivery is available within our service area. Delivery fees may vary depending on location and timing.",
    },
    {
      question: "Do you offer consultations?",
      answer:
        "We’re happy to discuss your floral needs via phone, email, or in person. Hablámos español.",
    },
    {
      question: "How much do your floral arrangements cost?",
      answer:
        "Because every arrangement is custom-designed, pricing varies based on size, flower selection, seasonality, and event details. We don’t offer set prices, but we’re happy to work within your budget. For a personalized quote, please contact us by phone or email and we’ll be glad to help.",
    },
  ];

  return (
    <>
      <section className="relative py-32 overflow-hidden">
        {/* Background image */}
        <Image src={img} alt="" fill className="object-cover" priority />

        {/* Overlay (important for readability) */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Content */}
        <div className="relative z-10 sm:max-w-3xl mx-auto bg-[#fefefe] sm:p-20 p-10 rounded-lg">
          <h2 className="text-6xl font-light text-center mb-16">
            Frequently
            <br />
            Asked Questions
          </h2>

          <div>
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>
      <section className=" py-20">
        <h2 className="sm:text-6xl px-3 sm:px-0 text-4xl font-light text-center mb-16">
          Not finding the answers you’re looking for? Get in touch!
        </h2>
        <div className="max-w-5xl mx-auto flex justify-center text-center">
          {/* Phone */}

          {/* Email */}
          <div>
            <div className="mb-4 text-black/60">
              <span className="text-3xl">✉️</span>
            </div>

            <h3 className="uppercase tracking-widest text-sm mb-2">Have a Question?</h3>

            <p className="text-sm text-black/60 mb-4">Click below to send us a message.</p>

            <Link
              href="mailto:rosesbylina2025@gmail.com"
              className="inline-block border border-black px-8 py-3 text-sm uppercase tracking-wide hover:bg-black hover:text-white transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Faq;
