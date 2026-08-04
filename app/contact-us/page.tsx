import ContactForm from "@/components/ContactForm";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Link from "next/link";

const infoItems = [
  {
    icon: Phone,
    label: "Phone",
    value: "813-956-2388",
    href: "tel:18139562388",
  },
  {
    icon: Mail,
    label: "Email",
    value: "rosesbylina2025@gmail.com",
    href: "mailto:rosesbylina2025@gmail.com",
  },
  {
    icon: MapPin,
    label: "Service Area",
    value: "Tampa Bay, Florida",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24–48 hours",
  },
];

const Contact = () => {
  return (
    <>
      <section className="bg-primary-white px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 block font-serif text-sm uppercase tracking-widest text-muted-ink">
            Get In Touch
          </span>
          <h1 className="mb-6 font-serif text-4xl font-light text-accent-black md:text-6xl">
            Let&apos;s Create Something Beautiful
          </h1>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-ink md:text-lg">
            Whether you&apos;re celebrating a milestone, planning an event, or simply sending a
            thoughtful gesture, we&apos;d love to hear from you. We&apos;re happy to assist in
            English or Spanish — <span className="italic">hablamos español</span>.
          </p>
        </div>
      </section>

      <section className="bg-warm-surface px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-[1fr_1.4fr] md:gap-20">
          {/* Info column */}
          <div>
            <ul className="space-y-8">
              {infoItems.map((item) => (
                <li key={item.label} className="flex items-start gap-4">
                  <item.icon size={20} className="mt-1 text-main-text-gold" />
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-ink">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-lg text-accent-black hover:underline">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-lg text-accent-black">{item.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 border-t border-hairline pt-6">
              <p className="text-sm leading-relaxed text-accent-black/70">
                A 50% non-refundable deposit is required to place and secure custom orders. Please
                review our{" "}
                <Link href="/policy" className="underline font-medium hover:text-black">
                  policies
                </Link>{" "}
                before submitting your request.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-accent-black/70">
                Need something ready today?{" "}
                <Link href="/shop" className="underline font-medium hover:text-black">
                  Browse our shop
                </Link>{" "}
                instead.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl bg-accent-black p-6 md:p-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
