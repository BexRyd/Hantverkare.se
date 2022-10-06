import ReCAPTCHA from 'react-google-recaptcha'


const Recaptcha = (props) => {


  function onChange() {


    props.setRecaptchaValue((current) => !current); //toggle
  };






  return (
    <div className="App">
      <ReCAPTCHA
        sitekey="6LdqMAwiAAAAADCSKAnd9VLheBJj3oFwBpicdF4N"
        onChange={onChange}
      />
    </div>
  );
};
export default Recaptcha;