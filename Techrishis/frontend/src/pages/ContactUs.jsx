import React from "react";
import "./contactus.css"; 
const ContactUs = () => {
  return (
    <div className="contact-us">
      <div className="form-container">
        <iframe
          src="https://forms.gle/53dKfzcS3KrYgXg37"
          width="950"
          height="400"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="Contact Form"
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
};

export default ContactUs;
