"use client";

import { FC } from "react";
import { useForm } from "react-hook-form";
import { sendEmail } from "@/utils/send-email";
import Button from "@/components/ui/Button";

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
  const { register, handleSubmit, reset } = useForm<FormData>();

  function onSubmit(data: FormData) {
    sendEmail(data);
    reset();
  }

  return (
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
          className="w-full resize-none rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-purple-500 focus:shadow-md"
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
        <label htmlFor="message" className="mb-3 block text-base font-medium text-primary-white">
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
        <Button className=" border border-primary-white py-3 px-6">Submit</Button>
      </div>
    </form>
  );
};

export default ContactForm;
