export const prerender = false;

import { contactSchema } from "../../lib/schema/contact.validation";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const key = import.meta.env.RESEND_API_KEY;
  try {
    if (!key) {
      console.error("Missing RESEND_API_KEY");
      return new Response(JSON.stringify({ message: "Server misconfiguration" }), { status: 500 });
    }

    let body;
    try {
      body = await request.json();
    } catch (err) {
      console.error("JSON parse error:", err);
      return new Response(JSON.stringify({ message: "Invalid JSON body" }), {
        status: 400,
      });
    }

    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return new Response(
        JSON.stringify({
          message: "Invalid form data",
          errors: result.error.flatten().fieldErrors,
        }),
        { status: 400 },
      );
    }

    const { fullname, email, message } = result.data;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Adams Development <noreply@adamsdevelopment.co.uk>",
        to: ["sonny@adamsdevelopment.co.uk"],
        subject: `New contact form submission from ${fullname}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>New contact form submission</h2>
            <p><strong>Name:</strong> ${fullname}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br/>")}</p>
          </div>
        `,
      }),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("Resend API error:", resendData);

      return new Response(
        JSON.stringify({
          message: "Failed to send message",
          error: resendData,
        }),
        { status: 502 },
      );
    }

    return new Response(
      JSON.stringify({
        message: "Thank you for your submission, I will be in contact shortly",
      }),
      { status: 200 },
    );
  } catch (err) {
    console.error("FATAL API ERROR:", err);

    return new Response(
      JSON.stringify({
        message: "Internal server error",
        error: String(err),
      }),
      { status: 500 },
    );
  }
};
