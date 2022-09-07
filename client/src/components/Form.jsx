import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function FormPopUp() {
  return (
<Form>
      <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
        <Form.Label>Namn</Form.Label>
        <Form.Control type="text" placeholder="Skriv namn" />
      </Form.Group>
      <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
        <Form.Label>Telefonnummer</Form.Label>
        <Form.Control type="phone" placeholder="Skriv telefonnummer" />
      </Form.Group>
      <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
        <Form.Label>Epost</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Meddelande</Form.Label>
        <Form.Control as="textarea" placeholder='Skriv meddelande' rows={3} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Bekräfta" />
      </Form.Group>

      <Form.Group className='btn_form_container'>
      <button className='btn_form_chatt'>
        chatt
      </button>
      <button className='btn_form_send'>
        skicka
      </button>
      </Form.Group>
      
    </Form>
  );
}

 
  


export default FormPopUp