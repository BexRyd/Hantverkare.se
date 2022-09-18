import React from "react";
import "../css/footer.css"
import Recaptcha from "./ReCAPTCHA"

import ReCAPTCHA from "react-google-recaptcha";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="textFooter">
        <Recaptcha />
      <p>Copyright ⓒ {currentYear}</p>
    </footer>
  );
}

export default Footer;
