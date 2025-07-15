import { Link } from "react-router-dom";
import { Package, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";


function Footer() {
  return (
    <footer className="custom-footer">
      <div className="container">
        <div className="footer-container">

          {/* Top Section */}
          <div className="footer-grid">

            {/* Logo + About */}
            <div className="footer-logo-section">
              <div className="footer-logo">
                <div className="logo-icon">
                  <Package className="icon-white" />
                </div>
                <span className="footer-brand">ShipForward</span>
              </div>
              <p className="footer-description">
                Your trusted partner for international package forwarding from India. Shop globally, ship locally.
              </p>
              <div className="footer-social-icons">
                <Facebook className="social-icon fb" />
                <Twitter className="social-icon tw" />
                <Instagram className="social-icon ig" />
                <Linkedin className="social-icon li" />
              </div>
            </div>

            {/* Quick Links */}
            <div className="links-section">
              <h3 className="footer-heading">Quick Links</h3>
              <div className="footer-links">
                <Link to="/" className="footer-link">Home</Link>
                <Link to="/dashboard" className="footer-link">Dashboard</Link>
                <Link to="/tracking" className="footer-link">Track Package</Link>
                <Link to="/pricing" className="footer-link">Pricing</Link>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="footer-heading">Services</h3>
              <div className="footer-links">
                <span className="footer-link">Package Forwarding</span>
                <span className="footer-link">Package Consolidation</span>
                <span className="footer-link">Express Shipping</span>
                <span className="footer-link">Storage Services</span>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="footer-heading">Contact Us</h3>
              <div className="footer-contact">
                <div><Mail className="contact-icon" /> support@shipforward.com</div>
                <div><Phone className="contact-icon" /> +91 98765 43210</div>
                <div><MapPin className="contact-icon" /> Mumbai, India</div>
              </div>
            </div>
          </div>

          {/* Bottom Strip */}
          <div className="footer-bottom">
            <p>
              © 2024 ShipForward. All rights reserved. | Privacy Policy | Terms of Service
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
