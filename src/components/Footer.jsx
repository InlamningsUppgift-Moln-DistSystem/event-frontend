import "./Footer.css";

function Footer() {
  return (
    <footer className="dashboard-footer">
      <div className="footer-content">
        <div className="footer-info">
          <p className="copyright">© 2025 Peterdraw</p>
          <nav className="footer-links">
            <a href="#" className="footer-link">
              Privacy Policy
            </a>
            <a href="#" className="footer-link">
              Term and conditions
            </a>
            <a href="#" className="footer-link">
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
