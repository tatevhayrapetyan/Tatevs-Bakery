import ContactForm from "../components/ContactForm.jsx";

const contactDetails = [
  { icon: "location_on", topic: "Address", lines: ["Alek Mankuyan 44", "Yerevan, Armenia"] },
  { icon: "call", topic: "Phone", lines: ["+374 44 102345", "+374 91 987654"] },
  { icon: "mail", topic: "Email", lines: ["tatev.bakery@gmail.com", "tatev.ysu@gmail.com"] },
];

export default function ContactPage() {
  return (
    <main className="contact-container-big">
      <div className="contact-container">
        <div className="content">
          <div className="left-side">
            {contactDetails.map((detail) => (
              <div className="details" key={detail.topic}>
                <i className="icon material-symbols-rounded" aria-hidden="true">{detail.icon}</i>
                <div className="topic">{detail.topic}</div>
                {detail.lines.map((line) => (
                  <div className="contact-text" key={line}>{line}</div>
                ))}
              </div>
            ))}
          </div>

          <div className="right-side">
            <h2 className="topic-text">Send us a message!</h2>
            <p>
              If you have any requests, questions or suggestions, you can send us a message from here.
              It's our pleasure to help you!
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
