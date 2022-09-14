import "./../css/MinSida.css"


export default function LoginError() {
  return (

    <div className="ErrorPopup">
        <h3>Inloggning misslyckades</h3>
        <p>Mejl eller lössenord är fel</p>
        <button className="addsBtn">Ok</button>

    </div>
  )

}