import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import '../css/EmailForm.css'

export const EmailForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_1m0w8jn', 'template_t7qz2qc', form.current, 'IAf3etytOmfZmoBns')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <div className="contacts">
        <form ref={form} onSubmit={sendEmail}>
          <h3>Skicka meddelande:</h3>
          <label>Namn</label>
          <input type="text" name="sender_name" />
          <label>Epost</label>
          <input type="email" name="sender_email" />
          <label>Telefonnummer</label>
          <input type="phone" name="sender_phone" />
          <label>Meddelande</label>
          <textarea name="message" />
          <input className='submit' type="submit" value="Send" />
        </form>
    </div>
  );
};

export default EmailForm