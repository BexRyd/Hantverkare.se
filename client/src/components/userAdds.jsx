  import "./../css/Adds.css"
import "./../css/MinSida.css"

  export default function UserAdds({useradds, authorized})
  {
    return(
      authorized?
      useradds.map((add, id) => {
        return (
         
            <div className="userAdds" key={id}>
              <img className="addsImg" src={add.img}></img>

              <div className="textBox">
                <h3 className="addsHeading">{add.heading}</h3>
                <p className="addsDescription">{add.description}</p>
              </div>

              <button
                className="addsBtn"
                // /* id={id}
                // onClick={() => {
                //   showDetail(id);
                //   handlePopUp();
                //   setPopUpAdds(true);
                //   setNewAddPopup(false);
                // }} */
              >
                mer info
              </button>
             
            </div>
          
        );
      }):null
    )}