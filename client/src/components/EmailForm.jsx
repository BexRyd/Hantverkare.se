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
        <form className='email_form' ref={form} onSubmit={sendEmail}>
          <h3 className='form_h3'>Skicka meddelande:</h3>
          <input className='input_email' type="text" name="sender_name" />
          <input className='input_email' type="email" name="sender_email" />
          <input className='input_email' type="phone" name="sender_phone" />
          <textarea className='input_textarea' name="message" />
          <input className='submit' type="submit" value="Send" />
        </form>
    </div>
  );
};

export default EmailForm