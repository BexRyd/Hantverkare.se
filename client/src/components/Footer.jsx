import React from "react";
import "../css/footer.css"

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="textFooter">
      <p>Copyright ⓒ {currentYear}</p>
    </footer>
  );
}

export default Footer;
