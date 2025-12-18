import ContactForm from "@/components/ContactForm";
import { Mail, Phone } from "lucide-react";

const Contact = () => {
  return (
    <>
      {/* Intro */}
      <section className="bg-[#f4efe9] py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-6xl font-light mb-6">Contact Us</h1>
          <p className="text-lg text-black/60 leading-relaxed">
            Whether you’re planning an event or have a question about our services, we’d love to
            hear from you.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-accent-black py-20">
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-24 items-start bg-accent-text-purple ">
          {/* Text */}
          <div className="text-accent-black p-10">
            <h2 className="text-5xl font-light mb-6">Let’s Create Something Beautiful</h2>

            <p className="text-lg text-accent-black/70 leading-relaxed mb-6">
              Whether you’re celebrating a milestone, planning an event, or simply sending a
              thoughtful gesture, we’d love to hear from you. Share a few details and we’ll be in
              touch.
            </p>
            <div className="w-10 h-px bg-accent-black/30 my-6" />
            {/* Secondary contact blurb */}
            <p className="text-sm text-accent-black leading-relaxed">
              Prefer to reach out directly? You’re welcome to call or email us instead. We’re happy
              to assist in English or Spanish — <span className="italic">hablamos español</span>.
            </p>
            <div className="mt-6 space-y-2 text-sm ">
              <div className="flex items-center ">
                <Phone className="inline-block mr-2 text-accent-black " />
                <a href="tel:18139562388" className="block hover:text-white transition">
                  813&nbsp;·&nbsp;956&nbsp;·&nbsp;2388
                </a>
              </div>
              <div className="flex items-center ">
                <Mail className="inline-block mr-2 text-accent-black" />
                <a
                  href="mailto:rosesbylina@gmail.com"
                  className="block hover:text-white underline transition"
                >
                  rosesbylina@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <ContactForm className="bg-black p-12" />
        </div>
      </section>
    </>
  );
};

export default Contact;
