"use client";

import { useRef, useState } from "react";

interface ContactFormProps {
  formActionUrl: string;
}

export default function ContactForm({ formActionUrl }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const disabled = formActionUrl === "#";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (disabled || !formRef.current) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(formActionUrl, {
        method: "POST",
        body: new FormData(formRef.current),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <p className="font-[family-name:var(--font-inter)] font-normal italic text-[18px] text-[#1f1f1f] leading-[1.4] tracking-[-0.04em]">
        Thank you for reaching out — we&apos;ll be in touch soon.
      </p>
    );
  }

  const inputClass =
    "w-full border-b border-[#1f1f1f] bg-transparent py-3 font-[family-name:var(--font-inter)] font-normal text-[14px] text-[#1f1f1f] tracking-[-0.04em] leading-[1.3] placeholder-[#999] focus:outline-none focus:border-black";

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
      <input
        name="name"
        type="text"
        placeholder="Name"
        required
        className={inputClass}
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className={inputClass}
      />
      <input
        name="subject"
        type="text"
        placeholder="Subject"
        className={inputClass}
      />
      <textarea
        name="message"
        placeholder="Message"
        rows={5}
        required
        className={`${inputClass} resize-none`}
      />
      {error && (
        <p className="font-[family-name:var(--font-inter)] text-[13px] text-red-600 tracking-[-0.04em]">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={disabled || submitting}
        className="self-start bg-black text-white font-[family-name:var(--font-inter)] font-medium text-sm tracking-[-0.04em] px-6 py-3 rounded-3xl disabled:opacity-40 hover:bg-zinc-800 transition-colors cursor-pointer"
      >
        {submitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
