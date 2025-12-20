"use client";

import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { sendEmail } from "@/utils/send-email";
import Button from "@/components/ui/Button";
import Link from "next/link";

export type FormData = {
  name: string;
  email: string;
  message: string;
  phone: number;
  date: Date;
};

type ContactFormProps = {
  className?: string;
};

const today = new Date().toISOString().split("T")[0];

const ContactForm: FC<ContactFormProps> = ({ className = "" }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    const result = await sendEmail(data);

    setIsSubmitting(false);

    if (result.success) {
      reset();
      setIsSubmitted(true);
    } else {
      // show error message
      console.error("Failed to send email");
    }
  };

  return (
    <>
      {isSubmitted ? (
        <SuccessMessage />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className={` ${className}`}>
          <div className="mb-5">
            <label htmlFor="name" className="mb-3 block text-base font-medium text-primary-white">
              Name
            </label>
            <input
              type="text"
              placeholder="Jane Doe"
              className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
              {...register("name", { required: true })}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="phone" className="mb-3 block text-base font-medium text-primary-white">
              Phone Number
            </label>
            <input
              type="tel"
              maxLength={10}
              required
              placeholder="8139562388"
              className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
              {...register("phone", { required: true })}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="mb-3 block text-base font-medium text-primary-white">
              Email Address
            </label>
            <input
              type="email"
              placeholder="rosesbylina2025@gmail.com"
              className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
              {...register("email", { required: true })}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="date" className="mb-3 block text-base font-medium text-primary-white">
              Requested Delivery / Pickup Date
            </label>

            <input
              type="date"
              min={today}
              className="w-[80%] resize-none rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
              {...register("date", {
                required: "Date is required",
                validate: (value) => {
                  const selectedDate = new Date(value);
                  const now = new Date();
                  now.setHours(0, 0, 0, 0);

                  return selectedDate >= now || "Date cannot be in the past";
                },
              })}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="message"
              className="mb-3 block text-base font-medium text-primary-white"
            >
              Describe Your Request
            </label>
            <textarea
              rows={5}
              placeholder="Tell us what you are looking for (occasion, colors, size, budget, delivery or pickup, etc.)"
              className="w-full resize-none rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
              {...register("message", { required: true })}
            ></textarea>
          </div>

          <div className=" flex justify-center">
            <Button className=" border border-primary-white py-3 px-6">
              {isSubmitting ? (
                <>
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-primary-white border-t-transparent" />{" "}
                  Sending...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      )}
    </>
  );
};

const SuccessMessage = () => (
  <div className="flex flex-col items-center justify-center text-center px-6 py-12 bg-main-text-gold h-full">
    <h3 className="text-2xl md:text-3xl font-light text-primary-white mb-4">Thank You!</h3>

    <p className="text-base md:text-lg text-primary-white/80 leading-relaxed max-w-md">
      Your request has been received. We’ll review the details and get back to you shortly. Please
      have any inspiration photos ready when we reach out.
    </p>

    <div className="w-12 h-px bg-primary-white/40 my-8" />

    <p className="text-sm text-primary-white/60">
      A 50% non-refundable deposit is required to secure your order.
    </p>

    <div className="text-primary-white/60 my-8">
      <p>
        Please see our{" "}
        <span>
          <Link href="/policy" className="text-primary-white underline">
            policy page
          </Link>
        </span>{" "}
        for more information.{" "}
      </p>
    </div>
  </div>
);

export default ContactForm;
