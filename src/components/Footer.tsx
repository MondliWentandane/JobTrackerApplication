import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={footerStyle}>
      <p style={textStyle}>© 2025 JobBuddy. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

const footerStyle: React.CSSProperties = {
  backgroundColor: "#00a8e8",
  height: "3rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",  // optional: stays at the bottom
  bottom: 0,
  width: "100%",
};

const textStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "0.9rem",
  color: "#333",
};
