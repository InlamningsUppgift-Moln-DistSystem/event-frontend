import "./PrivacyPage.css";
import { useNavigate } from "react-router-dom";

export default function PrivacyPage() {
  const navigate = useNavigate();

  return (
    <div className="privacy-page">
      <div className="privacy-container">
        <h1>Privacy Policy</h1>
        <p>
          Your privacy is important to us. This policy outlines how we collect,
          use, and protect your personal information.
        </p>

        <h2>What We Collect</h2>
        <p>
          When you create an account, we collect the following information:
          <ul>
            <li>Username</li>
            <li>Email address</li>
            <li>Password (securely hashed and never stored in plain text)</li>
          </ul>
        </p>

        <h2>How We Use Cookies</h2>
        <p>
          We only use essential cookies to ensure the application functions as
          expected and to maintain your session. We do not use cookies for
          marketing or analytics purposes.
        </p>

        <h2>Data Storage and Security</h2>
        <p>
          All your data is securely stored in Microsoft Azure cloud services. We
          apply industry-standard encryption and access control to protect your
          information.
        </p>

        <h2>No Third-Party Sharing</h2>
        <p>
          Your data is never sold or shared with third parties. We respect your
          privacy and use your information solely to provide and improve the
          service.
        </p>

        <h2>Contact</h2>
        <p>
          For any questions regarding this policy, feel free to contact us via
          our contact page.
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
