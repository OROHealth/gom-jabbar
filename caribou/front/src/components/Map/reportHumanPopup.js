import {useState} from 'react';

const ReportHumanPopup = ({onSubmit}) => {
  const [trashingLevel, setTrashingLevel] = useState("");
  const [excitementLevel, setExcitementLevel] = useState("");
  return (
    <div>
      <h1>Merci pour votre signalement !</h1>
      <p>Ce signalement permettra d'identifier de nouvelles actions afin de rendre notre monde meilleur.</p>
      <div>
        Capacité de nuisance<br/>
        <input value={trashingLevel} onChange={(e) => setTrashingLevel(e.target.value)}/>
      </div>
      <div>
        Niveau d'excitation<br/>
        <input value={excitementLevel} onChange={(e) => setExcitementLevel(e.target.value)}/>
      </div>
      <button onClick={() => onSubmit(trashingLevel, excitementLevel)}>
        Ajouter
      </button>
    </div>
  );
};

export default ReportHumanPopup;
