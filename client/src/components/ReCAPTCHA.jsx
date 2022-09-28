import ReCAPTCHA from 'react-google-recaptcha'



const Recaptcha= (props) => {


  function onChange(value) {
    console.log('Captcha value:', value);

    const button = document.getElementById("login_btn")
    if(value === undefined){
      button.disabled= true
    }else{
      button.removeAttribute("disabled");
    }
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