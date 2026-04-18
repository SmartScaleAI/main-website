"use client";

import * as React from "react";
import { Dialog } from "@base-ui/react/dialog";
import { XIcon, CheckCircleIcon } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactModal() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMsg, setErrorMsg] = React.useState("");

  function reset() {
    setName("");
    setEmail("");
    setMessage("");
    setStatus("idle");
    setErrorMsg("");
  }

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) reset();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data.error || "Something went wrong. Please try again.",
        );
      }

      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-lg border border-brand-blue/20 bg-white/5 px-4 py-3 text-sm text-brand-text placeholder:text-brand-text/30 outline-none focus:border-brand-blue/60 transition-colors duration-150";

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger
        className="text-brand-text/25 text-xs no-underline transition-colors duration-200 hover:text-brand-blue/70 cursor-pointer bg-transparent border-0 p-0"
        style={{ fontFamily: "var(--font-barlow)" }}
      >
        Contact Us
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />

        <Dialog.Popup className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-brand-blue/[.12] bg-brand-bg p-8 shadow-2xl transition-all duration-200 data-ending-style:opacity-0 data-ending-style:scale-95 data-starting-style:opacity-0 data-starting-style:scale-95">
          <Dialog.Close
            className="absolute right-4 top-4 rounded-md p-1 text-brand-text/30 transition-colors hover:text-brand-text/70"
            aria-label="Close"
          >
            <XIcon size={18} />
          </Dialog.Close>

          {status === "success" ? (
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              <CheckCircleIcon size={44} className="text-brand-blue" />
              <Dialog.Title
                className="text-xl font-bold text-brand-text"
                style={{ fontFamily: "var(--font-barlow)" }}
              >
                Message sent!
              </Dialog.Title>
              <p className="text-sm text-brand-text/50">
                We&apos;ll get back to you as soon as possible.
              </p>
              <Dialog.Close className="mt-2 rounded-lg bg-brand-blue px-6 py-2.5 text-sm font-semibold text-brand-bg transition-opacity hover:opacity-90">
                Close
              </Dialog.Close>
            </div>
          ) : (
            <>
              <Dialog.Title
                className="mb-1 text-xl font-bold text-brand-text"
                style={{ fontFamily: "var(--font-barlow)" }}
              >
                Get in touch
              </Dialog.Title>
              <Dialog.Description className="mb-6 text-sm text-brand-text/40">
                Send us a message and we&apos;ll respond shortly.
              </Dialog.Description>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={inputClass}
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={inputClass}
                />
                <textarea
                  placeholder="Your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  className={`${inputClass} resize-none`}
                />

                {status === "error" && (
                  <p className="text-xs text-red-400">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-1 w-full rounded-lg bg-brand-blue py-3 text-sm font-semibold text-brand-bg transition-opacity hover:opacity-90 disabled:opacity-50"
                  style={{ fontFamily: "var(--font-barlow)" }}
                >
                  {status === "submitting" ? "Sending…" : "Send Message"}
                </button>
              </form>
            </>
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
