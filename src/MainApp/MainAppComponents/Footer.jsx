import "./Footer.css";

function Footer() {
  return (
    <footer className="dashboard-footer">
      <div className="footer-content">
        <div className="footer-info">
          <p className="copyright">© 2025 Peterdraw</p>
          <nav className="footer-links">
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              Terms and Conditions
            </a>
            <a
              href="/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              Contact
            </a>
          </nav>
        </div>
        <div className="social-links">
          <a href="#" className="social-link">
            🔗
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
