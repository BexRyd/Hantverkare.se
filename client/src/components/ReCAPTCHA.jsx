import ReCAPTCHA from 'react-google-recaptcha'

const Recaptcha= () => {
  function onChange(value) {
    console.log('Captcha value:', value);
  }
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