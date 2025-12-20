import { FormData } from "@/components/ContactForm";

export async function sendEmail(data: FormData) {
  try {
    const res = await fetch("/api/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to send email");
    }

    return { success: true };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false };
  }
}
