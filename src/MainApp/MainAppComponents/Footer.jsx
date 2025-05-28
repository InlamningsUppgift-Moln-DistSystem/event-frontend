import "./Footer.css";

function Footer() {
  return (
    <footer className="dashboard-footer">
      <div className="footer-content">
        <div className="footer-info">
          <p className="copyright">© 2025 Ventixe</p>
          <nav className="footer-links">
            <a href="/privacy" className="footer-link">
              Privacy Policy
            </a>
            <a href="/terms" className="footer-link">
              Terms and Conditions
            </a>
            <a href="/contact" className="footer-link">
              Contact
            </a>
          </nav>
        </div>
        {/* <div className="social-links">
          <a href="#" className="social-link">
            🔗
          </a>
        </div> */}
      </div>
    </footer>
  );
}

export default Footer;
