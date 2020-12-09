import {useState} from 'react';

import Input from "../ui/Input";
import Button from "../ui/Button";

const ReportHumanPopup = ({onSubmit}) => {
  const [trashingLevel, setTrashingLevel] = useState("");
  const [excitementLevel, setExcitementLevel] = useState("");
  return (
    <div className="row">
      <div className="offset-1 col-10">
        <h1>Merci pour votre signalement !</h1>
        <p>Ce signalement permettra d'identifier de nouvelles actions afin de rendre notre monde meilleur.</p>
        <Input value={trashingLevel} placeholder="Capacité de nuisance" onChange={(text) => setTrashingLevel(text)}/>
        <Input value={excitementLevel} placeholder="Niveau d'excitation" onChange={(text) => setExcitementLevel(text)}/>
        <br/>
        <Button onClick={() => onSubmit(trashingLevel, excitementLevel)}>
          Ajouter
        </Button>
      </div>
    </div>
  );
};

export default ReportHumanPopup;
