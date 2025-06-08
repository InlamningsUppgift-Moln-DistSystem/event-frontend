import "./TermsAndConditionsPage.css";
import { useNavigate } from "react-router-dom";

export default function TermsAndConditionPage() {
  const navigate = useNavigate();

  return (
    <div className="terms-page">
      <div className="terms-container">
        <h1>Terms and Conditions</h1>

        <p>
          By accessing and using this platform, you agree to the following terms
          and conditions. Please read them carefully.
        </p>

        <h2>1. Acceptable Use</h2>
        <p>
          You agree to use this platform only for lawful purposes. You must not
          use it:
          <ul>
            <li>For any illegal or fraudulent activity</li>
            <li>To transmit any abusive, offensive, or hateful content</li>
            <li>To share explicit or sexually suggestive content</li>
            <li>To harass, threaten, or impersonate other users</li>
          </ul>
        </p>

        <h2>2. Account Responsibility</h2>
        <p>
          You are responsible for maintaining the confidentiality of your
          account credentials. Any activity under your account is your
          responsibility.
        </p>

        <h2>3. Intellectual Property</h2>
        <p>
          All content, trademarks, and design elements on this platform are the
          property of Ventixe. You may not reproduce, distribute, or use them
          without explicit permission.
        </p>

        <h2>4. Service Availability</h2>
        <p>
          We strive to keep the platform available at all times, but we do not
          guarantee uninterrupted access. Scheduled maintenance or unforeseen
          issues may temporarily impact availability.
        </p>

        <h2>5. Violations</h2>
        <p>
          We reserve the right to suspend or terminate accounts that violate
          these terms without prior notice.
        </p>

        <h2>6. Changes</h2>
        <p>
          We may update these terms at any time. Continued use of the platform
          after updates implies acceptance of the new terms.
        </p>

        <h2>7. Contact</h2>
        <p>
          For questions or concerns about these terms, please contact us via our
          contact page.
        </p>
        <div className="back-button-container">
          <button className="back-button" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
