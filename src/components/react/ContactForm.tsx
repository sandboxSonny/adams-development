import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import "./ContactForm.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { AceTurnstile } from "@sandboxsonny/ace-kit/react";
import { contactSchema, type ContactFormData } from "../../lib/schema/contact.validation";

const fields: Array<{
  label: string;
  type: string;
  name: keyof ContactFormData;
}> = [
  {
    label: "Full name",
    type: "text",
    name: "fullname",
  },
  {
    label: "Email",
    type: "email",
    name: "email",
  },
  {
    label: "Message",
    type: "textarea",
    name: "message",
  },
];

type ContactFormProps = {
  /** The Cloudflare Turnstile site key, when the owners turned it on in the CMS. Left out, there is no check. */
  turnstileSiteKey?: string;
};

export const ContactForm = ({ turnstileSiteKey }: ContactFormProps) => {
  const [status, setStatus] = useState("");
  const [token, setToken] = useState("");
  const [sent, setSent] = useState(0);
  // The spam trap: hidden from people, so only a bot fills it in.
  const honeypot = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (payload: unknown) => {
    if (turnstileSiteKey && !token) {
      setStatus("Please complete the check that you are a person.");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...(payload as object),
          honeypot: honeypot.current?.value ?? "",
          turnstile_token: token,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setStatus(responseData.message);
        reset();
      } else {
        setStatus(responseData.error ?? "Error sending message");
      }
    } catch {
      setStatus("Error sending message");
    } finally {
      setLoading(false);
      // A Turnstile check works once, so a new one is asked for after every send.
      setSent((count) => count + 1);
      reset();
    }
  };

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <section className="contact">
      <div className="contact__grid">
        <div className="contact__form-wrapper">
          <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
            <h2 className="contact-form__title">Send a message</h2>

            {fields.map((field) => {
              const error = errors[field.name];
              const fieldClass = field.type === "textarea" ? "contact-form__textarea" : "contact-form__input";

              const props = {
                type: field.type,
                id: field.name,
                ...register(field.name, { required: true }),
                className: fieldClass,
              };

              return (
                <>
                  <label htmlFor={field.name} className="contact-form__label">
                    {field.label}
                    <span className="contact-form__required">*</span>
                  </label>
                  {field.type === "textarea" && <textarea {...props} />}
                  {field.type !== "textarea" && <input {...props} />}
                  {error && <p className="contact-form__error">{error.message}</p>}
                </>
              );
            })}

            <input
              ref={honeypot}
              type="text"
              name="honeypot"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
            />

            <AceTurnstile siteKey={turnstileSiteKey} onToken={setToken} resetKey={sent} />

            <div className="contact-form__actions">
              <button disabled={loading} type="submit" className="contact-form__submit">
                {loading ? "Sending…" : "Submit"}
              </button>
            </div>
          </form>
          {status && <p className="contact__status">{status}</p>}
        </div>
      </div>
    </section>
  );
};
