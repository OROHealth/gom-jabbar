import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// styleSheet
import '@components/chatMeetingRoom/ChatMeetingRoom.styles.scss';

// components
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
        // Save the caribou who wants to antler exchange to the database
        await antlerExchangeService.getAntlerExchangeCaribous().then((allCaribousForAntlerExchange) => {
          if (isCancelled) {
            const { allAntlerExchangeCaribous } = allCaribousForAntlerExchange?.data;
            console.log('result', allCaribousForAntlerExchange.data.allAntlerExchangeCaribous);

            // Saving to useState and Dispatching to redux
            setAllAntlerExchangeMeetings(allAntlerExchangeCaribous);
            dispatch(addAntlerExchangeCaribouToMeeting(allCaribousForAntlerExchange.data.allAntlerExchangeCaribous));
          }
        });
      } catch (error) {}
    };
    getSecretCaribouMeetings();

    return () => {
      isCancelled = false;
    };
  }, [dispatch]);

  const HandleJoinChatOnClick = () => {};

  return (
    <div>
      <AppNavigation />
      <main>
        <div className="Chat-meeting-container">
          <button onClick={() => navigate('/app/dashboard')}>
            <FaStepBackward />
          </button>
          <div className="grid-card-wrapper">
            {allAntlerExchangeMeetings &&
              allAntlerExchangeMeetings.map((caribous) => {
                // Gets the ISO-8601 date and converts it to local Date and transforms it to a string and save.
                const iSODate = new Date(caribous.expiresAt);
                const nowDate = new Date();

                // Converting the time to minutes
                const expireTimeInMinutes = iSODate.getMinutes() - nowDate.getMinutes();

                return (
                  <div className="caribou-card" key={caribous.id}>
                    <img src={caribous.avatarImage} alt="" />
                    <div className="caribou-card-text">
                      <p>
                        Join the Secret meeting with: <span>&quot;{caribous.email.charAt(0).toUpperCase()}&quot;</span>
                      </p>
                      <p>
                        Expires in: <span>{expireTimeInMinutes}</span> mins
                      </p>
                    </div>
                    <button className="button" onClick={HandleJoinChatOnClick}>
                      Join
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatMeetingRoom;
