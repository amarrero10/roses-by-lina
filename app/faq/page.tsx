import FAQItem from "@/components/FAQItem";
import Link from "next/link";
import { Mail } from "lucide-react";

function Faq() {
  const faqs = [
    {
      question: "What types of floral services do you offer?",
      answer:
        "We create custom floral designs for birthdays, graduations, proposals, weddings, memorials, and everyday occasions. We also carry a shop of ready-made bouquets and arrangements you can order online right away.",
    },
    {
      question: "What's the difference between the shop and a custom order?",
      answer:
        "Our shop has set prices — browse, add to cart, and check out for delivery or pickup. Custom orders (weddings, large events, or a specific vision) are quoted individually — reach out through our contact form for a personalized quote.",
    },
    {
      question: "Do you offer custom arrangements?",
      answer:
        "Yes. Every custom arrangement is thoughtfully designed based on your preferences, event details, and seasonal availability.",
    },
    {
      question: "Do you offer consultations?",
      answer:
        "We’re happy to discuss your floral needs via phone, email, or in person. Hablámos español.",
    },
    {
      question: "How much do your custom floral arrangements cost?",
      answer:
        "Because every custom arrangement is designed to order, pricing varies based on size, flower selection, seasonality, and event details. We don’t offer set prices for custom work, but we’re happy to work within your budget — contact us for a personalized quote. Shop items, by contrast, are priced upfront.",
    },
    {
      question: "How far in advance should I place my order?",
      answer:
        "For standard floral arrangements, we recommend placing your order at least 48–72 hours in advance. For larger or more involved designs, we ask for a minimum of one month’s notice to ensure availability and proper planning. Shop orders can be placed for same-day pickup or delivery, subject to availability.",
    },
    {
      question: "Do you offer delivery, and is there a fee?",
      answer:
        "Yes, delivery is available and fees vary depending on the delivery location. Pickup is always free and can be arranged at a scheduled time.",
    },
    {
      question: "Do you accept last-minute orders?",
      answer:
        "Last-minute orders may be accepted based on availability. If we are able to accommodate a rush request, a $20 rush fee will apply.",
    },
    {
      question: "Do you ship flowers?",
      answer:
        "At this time, we do not ship flowers. All orders are available for local delivery or pickup only.",
    },
  ];

  return (
    <section className="bg-primary-white px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-[1fr_1.6fr] md:gap-20">
        {/* Sticky intro column */}
        <div className="md:sticky md:top-28 md:self-start">
          <span className="mb-4 block font-serif text-sm uppercase tracking-widest text-muted-ink">
            FAQ
          </span>
          <h1 className="mb-6 font-serif text-4xl font-light text-accent-black md:text-6xl">
            Frequently Asked Questions
          </h1>
          <p className="mb-8 text-base leading-relaxed text-muted-ink">
            Answers about shop orders, custom requests, delivery, and everything in between. Still
            have a question?
          </p>
          <Link
            href="mailto:albert.marrero10@gmail.com"
            className="inline-flex items-center gap-2 border border-accent-black px-6 py-3 text-sm uppercase tracking-wide hover:bg-accent-black hover:text-primary-white transition"
          >
            <Mail size={16} />
            Email Us
          </Link>
        </div>

        {/* Accordion column */}
        <div>
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faq;
