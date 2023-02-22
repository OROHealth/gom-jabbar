import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AppNavigation from '@components/app-navigation/AppNavigation.component';
import { antlerExchangeService } from '@services/api/antlerExchangeRoom/antlerExchangeRoom.service';
import { FaStepBackward } from 'react-icons/fa';
import { addAntlerExchangeCaribouToMeeting } from '@redux/reducers/antlerExchangeCaribousMeeting/antlerExchangeMeeting.reducer';

const ChatMeetingRoom = () => {
  const [allAntlerExchangeMeetings, setAllAntlerExchangeMeetings] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let isCancelled = true;

    const getSecretCaribouMeetings = async () => {
      try {
        await antlerExchangeService.getAntlerExchangeCaribous().then((allCaribousForAntlerExchange) => {
          if (isCancelled) {
            const { allAntlerExchangeCaribous } = allCaribousForAntlerExchange?.data;
            console.log(allCaribousForAntlerExchange);

            setAllAntlerExchangeMeetings(allAntlerExchangeCaribous);
            dispatch(addAntlerExchangeCaribouToMeeting(allAntlerExchangeCaribous));
          }
        });
      } catch (error) {}
    };
    getSecretCaribouMeetings();

    return () => {
      isCancelled = false;
    };
  }, []);

  return (
    <div>
      <AppNavigation />
      <main>
        <button onClick={() => navigate('/app/dashboard')}>
          <FaStepBackward />
        </button>
        {allAntlerExchangeMeetings &&
          allAntlerExchangeMeetings.map((caribous, id) => {
            return <div key={id}>{caribous.email}</div>;
          })}
      </main>
    </div>
  );
};

export default ChatMeetingRoom;
