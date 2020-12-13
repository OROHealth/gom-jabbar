import {useState} from 'react';

import Input from "../ui/Input";
import Button from "../ui/Button";

const PopupContent = ({mode, submitHumanPosition, closeModal}) => {
  const [trashingLevel, setTrashingLevel] = useState("");
  const [excitementLevel, setExcitementLevel] = useState("");

  if (mode === "REGISTER_HUMAN") {
    return (
      <div className="row">
        <div className="offset-1 col-10">
          <h1>Signaler un humain</h1>
          <p>Ce signalement permettra d'identifier de nouvelles actions afin de rendre notre monde meilleur.</p>
          <Input value={trashingLevel} placeholder="Capacité de nuisance" onChange={(text) => setTrashingLevel(text)}/>
          <Input value={excitementLevel} placeholder="Niveau d'excitation" onChange={(text) => setExcitementLevel(text)}/>
          <br/>
          <Button onClick={() => submitHumanPosition({trashingLevel, excitementLevel})}>
            Ajouter
          </Button>
          <Button onClick={() => closeModal()}>
            Annuler
          </Button>
        </div>
      </div>
    );
  }

  return null;
};

const LocationPopup = (props) => {
  const [mode] = useState("REGISTER_HUMAN");
  return (
    <div>
      <PopupContent mode={mode} {...props} />
    </div>
  );
};

export default LocationPopup;
