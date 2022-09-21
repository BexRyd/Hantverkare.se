import "./../css/MinSida.css"


export default function LoginError(props) {
  return (

    <div className="ErrorPopup">
        <h3>Inloggning misslyckades</h3>
        <p>Mejl eller lössenord är fel</p>
        <button className="addsBtn"
        onClick={()=>{
            props.setLoginError(false)
        }}
        >Ok</button>

    </div>
  )

}