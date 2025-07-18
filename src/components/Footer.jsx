import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

function Footer() {
  return (
    <footer className="custom-footer bg-[#0f172a] text-white py-10">
      <div className="container mx-auto px-4">
        <div className="footer-container">

          {/* Top Grid Section */}
          <div className="footer-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

            {/* Logo + About */}
            <div className="footer-logo-section flex flex-col items-center text-center">
              <div className="footer-logo mb-4">
                <img
                  src="/img/logo2.png"
                  alt="Glocalship Logo"
                  className="w-32 h-10 object-contain block"
                />
              </div>

              <p className="footer-description text-sm text-gray-300">
                Your trusted partner for international package forwarding from India. Shop globally, ship locally.
              </p>

              {/* Social Icons */}
              <div className="footer-social-icons mt-4 flex gap-3 justify-center">
                <Facebook className="social-icon text-white hover:text-blue-500" />
                <Twitter className="social-icon text-white hover:text-sky-400" />
                <Instagram className="social-icon text-white hover:text-pink-500" />
                <Linkedin className="social-icon text-white hover:text-blue-600" />
              </div>
            </div>

            {/* Quick Links */}
            <div className="links-section">
              <h3 className="footer-heading font-semibold mb-3 text-lg">Quick Links</h3>
              <div className="footer-links flex flex-col gap-2 text-sm">
                <Link to="/" className="footer-link hover:underline">Home</Link>
                <Link to="/dashboard" className="footer-link hover:underline">Dashboard</Link>
                <Link to="/tracking" className="footer-link hover:underline">Track Package</Link>
                <Link to="/pricing" className="footer-link hover:underline">Pricing</Link>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="footer-heading font-semibold mb-3 text-lg">Services</h3>
              <div className="footer-links flex flex-col gap-2 text-sm">
                <span className="footer-link">Package Forwarding</span>
                <span className="footer-link">Package Consolidation</span>
                <span className="footer-link">Express Shipping</span>
                <span className="footer-link">Storage Services</span>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="footer-heading font-semibold mb-3 text-lg">Contact Us</h3>
              <div className="footer-contact flex flex-col gap-3 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Mail className="contact-icon w-4 h-4" /> support@shipforward.com
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="contact-icon w-4 h-4" /> +91 98765 43210
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="contact-icon w-4 h-4" /> Mumbai, India
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Strip */}
          <div className="footer-bottom text-center mt-10 pt-6 border-t border-gray-700 text-sm text-gray-400">
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
