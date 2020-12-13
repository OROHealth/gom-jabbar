import {useState} from 'react';

import Input from "../ui/Input";
import Button from "../ui/Button";

const PopupContent = ({mode, submitHumanPosition, submitHumanCheck, submitCaribouPosition, closeModal}) => {
  const [trashingLevel, setTrashingLevel] = useState("");
  const [excitementLevel, setExcitementLevel] = useState("");
  const [radiusToCheck, setRadiusToCheck] = useState("");

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

  if (mode === "CHECK_HUMAN") {
    return (
      <div className="row">
        <div className="offset-1 col-10">
          <h1>Vérification de position</h1>
          <p>Précisez le rayon dans lequel vérifier la présence d'un humain</p>
          <Input value={radiusToCheck} placeholder="Rayon à analyser" onChange={(text) => setRadiusToCheck(text)}/>
          <br/>
          <Button onClick={() => submitHumanCheck({radiusToCheck})}>
            Vérifier
          </Button>
        </div>
      </div>
    );
  }

  if (mode === "REGISTER_CARIBOU") {
    return (
      <div className="row">
        <div className="offset-1 col-10">
          <h1>Proposition d'échange de bois</h1>
          <p>Indiquez qu'un caribou est prêt à commercer !</p>
          <Button onClick={() => submitCaribouPosition(trashingLevel, excitementLevel)}>
            Confirmer
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
  const [mode, setMode] = useState("REGISTER_HUMAN");
  return (
    <div>
      <PopupContent mode={mode} {...props} />
      <br/>
      <Button isActive={mode === "REGISTER_HUMAN"} onClick={() => setMode("REGISTER_HUMAN")}>
        Signaler un human
      </Button>
      <Button isActive={mode === "CHECK_HUMAN"} onClick={() => setMode("CHECK_HUMAN")}>
        Vérifier la zone
      </Button>
      <Button isActive={mode === "REGISTER_CARIBOU"} onClick={() => setMode("REGISTER_CARIBOU")}>
        Signaler un caribou
      </Button>
    </div>
  );
};

export default LocationPopup;
