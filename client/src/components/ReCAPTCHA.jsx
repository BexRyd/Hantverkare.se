import ReCAPTCHA from 'react-google-recaptcha'


const Recaptcha = (props) => {


  function onChange() {


    props.setRecaptchaValue((current) => !current); //toggle
  };






  return (
    <div className="App">
      <ReCAPTCHA
        sitekey="6Lf03l4iAAAAAF45kd6Btcy7duLg_1V10-5dNnxD"
        onChange={onChange}
      />
    </div>
  );
};
export default Recaptcha;