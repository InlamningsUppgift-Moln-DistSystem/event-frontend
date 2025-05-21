import "./ContactPage.css";

export default function ContactPage() {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <h2 className="contact-title">Contact Us</h2>
        <p className="contact-subtitle">We’d love to hear from you.</p>

        <form className="contact-form">
          <label>
            Name
            <input type="text" placeholder="Your name" />
          </label>
          <label>
            Email
            <input type="email" placeholder="you@example.com" />
          </label>
          <label>
            Message
            <textarea rows="5" placeholder="Write your message..." />
          </label>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}
