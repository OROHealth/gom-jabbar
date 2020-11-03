use rand::Rng;
use std::time::{Duration, SystemTime};
use warp::http::StatusCode;
use warp::reply::json;
use warp::{Rejection, Reply};

use crate::montroyashi_models::{DrunkPeopleAround, DrunkPeopleAroundResponse};

const WAIT_TIME: u64 = 900;

const LYRICS: [&'static str; 8] = [
    "
    Maybe there’s a God above
    But all I’ve ever learned from love
    Was how to shoot somebody who outdrew ya
    And it’s not a cry that you hear at night
    It’s not somebody who’s seen the light
    It’s a cold and it’s a broken Hallelujah.",
    "Ring the bells that still can ring
    Forget your perfect offering
    There is a crack in everything
    That’s how the light gets in.",
    "
    Like a bird on the wire, like a drunk in a midnight choir
    I have tried in my way to be free.",
    "
    If you want a father for your child
    Or only want to walk with me a while across the sand
    I’m your man.",
    "Well my friends are gone and my hair is grey
    I ache in the places where I used to play
    And I’m crazy for love but I’m not coming on
    I’m just paying my rent every day
    Oh in the Tower of Song
    I said to Hank Williams: how lonely does it get?
    Hank Williams hasn’t answered yet
    But I hear him coughing all night long
    A hundred floors above me
    In the Tower of Song.",
    "
    Dance me to your beauty with a burning violin
    Dance me through the panic ’til I’m gathered safely in
    Lift me like an olive branch and be my homeward dove
    Dance me to the end of love.",
    "
    We met when we were almost young
    deep in the green lilac park
    You held on to me like I was a crucifix,
    as we went kneeling through the dark.",
    "
    Ah, the last time we saw you you looked so much older
    Your famous blue raincoat was torn at the shoulder
    You’d been to the station to meet every train, and
    You came home without Lili Marlene.",
];
pub struct MontroyashiHandlers;

impl MontroyashiHandlers {
    /// Randomly selects a song from the collection of lyrics played by Leonard Cohen
    /// "Displays the lyrics" by printing them in the console
    ///
    /// ## Returns
    /// The success message of an http status code of 200
    pub async fn display_leonard_cohen_lyrics() -> Result<impl Reply, Rejection> {
        let mut rng = rand::thread_rng();
        let index = rng.gen_range(0, LYRICS.len());
        let selected_lyrics = LYRICS[index];
        println!("Message from Montroyashi: {}", selected_lyrics);
        Ok(StatusCode::OK)
    }

    /// This is a trigger of the noise being heard from another robot
    /// (Making the assumption that the noise heard is a drunk person)
    /// Updates the state of drunk people around.
    ///
    /// ## Arguments
    /// `drunk_people_around` - The current status of drunk people being around
    ///
    /// ## Returns
    /// The success message of an http status code of 200
    pub async fn noise_heard(
        drunk_people_around: DrunkPeopleAround,
    ) -> Result<impl Reply, Rejection> {
        println!("Message from Montroyashi: A sound was heard by another machine");
        let mut drunk_people_around = drunk_people_around.write().await;
        drunk_people_around.status = true;
        drunk_people_around.time_logged = SystemTime::now();
        Ok(StatusCode::OK)
    }

    /// This function responds to the client on whether there are
    /// Drunk people around.
    ///
    /// If more than 15 minutes have elapsed since the last time noise was heard from another robot,
    /// The system assumes that no drunk people are around and the system returns false;
    ///
    /// ## Arguments
    /// `drunk_people_around` - The current status of drunk people being around
    ///
    /// ## Returns
    /// A response on whether there are drunk people around
    pub async fn check_for_drunk_people(
        drunk_people_around: DrunkPeopleAround,
    ) -> Result<impl Reply, Rejection> {
        MontroyashiHandlers::get_drunk_people_status(WAIT_TIME, drunk_people_around).await
    }

    /// This function is the handler for the caller on whether there are
    /// Drunk people around.
    ///
    /// If more than the provided seconds have elapsed since the last time noise was heard from another robot,
    /// The system assumes that no drunk people are around and the system returns false;
    ///
    /// ## Arguments
    /// `max_wait_time` - the maximum amount of time accepted since the last noise complaint
    /// `drunk_people_around` - The current status of drunk people being around
    ///
    /// ## Returns
    /// A response on whether there are drunk people around
    async fn get_drunk_people_status(
        max_wait_time: u64,
        drunk_people_around: DrunkPeopleAround,
    ) -> Result<impl Reply, Rejection> {
        let mut response = DrunkPeopleAroundResponse {
            drunk_people_around: false,
        };
        let mut drunk_people_around = drunk_people_around.write().await;
        // if the last time a drunk person was detected is more than 15 minutes ago
        if drunk_people_around.time_logged.elapsed().unwrap() > Duration::new(max_wait_time, 0) {
            drunk_people_around.status = false;
            println!("Message from Montroyashi: Drunk People Not Detected");
            return Ok(json(&response));
        } else if drunk_people_around.status {
            println!("Message from Montroyashi: Drunk People Detected");
            response.drunk_people_around = true;
            return Ok(json(&response));
        }
        println!("Message from Montroyashi: Drunk People Not Detected");
        Ok(json(&response))
    }
}

#[tokio::test]
async fn test_lyrics_request() {
    let response = MontroyashiHandlers::display_leonard_cohen_lyrics().await;
    assert!(response.is_ok());
    assert_eq!(response.unwrap().into_response().status(), StatusCode::OK);
}

#[tokio::test]
async fn test_drunk_status_update() {
    let drunk_people_state = std::sync::Arc::new(tokio::sync::RwLock::new(
        crate::montroyashi_models::DrunkPeopleAroundStatus {
            status: false,
            time_logged: std::time::SystemTime::now(),
        },
    ));

    // no drunk people detected!!
    assert!(!drunk_people_state.read().await.status);
    let response = MontroyashiHandlers::noise_heard(drunk_people_state.clone()).await;
    assert!(response.is_ok());
    // drunk people detected!!
    assert!(drunk_people_state.read().await.status);

    // No wait time - resets the status to no drunk people around
    let response =
        MontroyashiHandlers::get_drunk_people_status(0, drunk_people_state.clone()).await;
    assert!(response.is_ok());
    // no drunk people detected!!
    assert!(!drunk_people_state.read().await.status);
}
