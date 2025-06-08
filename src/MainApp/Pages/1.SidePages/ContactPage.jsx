import { useState } from "react";
import "./ContactPage.css";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(
        "https://emailservice-api-e4c5b9cnfxehg6h8.swedencentral-01.azurewebsites.net/api/email/send-contact-message",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <button className="back-button top-right" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <h2 className="contact-title">Contact Us</h2>
        <p className="contact-subtitle">We’d love to hear from you.</p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Message
            <textarea
              name="message"
              rows="5"
              placeholder="Write your message..."
              value={form.message}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <p style={{ color: "green" }}>✅ Message sent!</p>
          )}
          {status === "error" && (
            <p style={{ color: "red" }}>❌ Something went wrong.</p>
          )}
        </form>
      </div>
    </div>
  );
}
