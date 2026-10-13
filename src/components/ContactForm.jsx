import { useState } from "react";

const BAKERY_EMAIL = "tatev.bakery@gmail.com";
const emptyForm = { name: "", email: "", message: "" };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  }
  if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (values.message.trim().length < 10) {
    errors.message = "Your message should be at least 10 characters.";
  }
  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    // Clear a field's error as soon as the user starts fixing it
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = validate(values);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setStatus("");
      return;
    }

    // Opens the visitor's email app with the message filled in
    const subject = "Message from " + values.name.trim();
    const body = values.message.trim() + "\n\nFrom: " + values.name.trim() + " (" + values.email.trim() + ")";
    window.location.href =
      "mailto:" + BAKERY_EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

    setStatus("Thank you! Your email app should open so you can send the message.");
    setValues(emptyForm);
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="input-box">
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          aria-label="Your name"
          aria-invalid={Boolean(errors.name)}
          value={values.name}
          onChange={handleChange}
        />
        {errors.name && <p className="field-error">{errors.name}</p>}
      </div>

      <div className="input-box">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          aria-label="Your email"
          aria-invalid={Boolean(errors.email)}
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <p className="field-error">{errors.email}</p>}
      </div>

      <div className="input-box message-box">
        <textarea
          name="message"
          placeholder="Enter your message"
          aria-label="Your message"
          aria-invalid={Boolean(errors.message)}
          value={values.message}
          onChange={handleChange}
        />
        {errors.message && <p className="field-error">{errors.message}</p>}
      </div>

      <div className="submit-button">
        <button type="submit">Submit</button>
      </div>
      <p className="form-status" aria-live="polite">{status}</p>
    </form>
  );
}
