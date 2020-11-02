use rand::Rng;
use std::time::{Duration, SystemTime};
use warp::http::StatusCode;
use warp::reply::json;
use warp::{Rejection, Reply};

use crate::montroyashi_models::{DrunkPeopleAround, DrunkPeopleAroundResponse};

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
        println!("{}", selected_lyrics);
        Ok(StatusCode::OK)
    }

    /// This is a trigger of the noise being heard from another robot
    /// (Making the assumption that the noise heard is a drunk person)
    /// Updates the state of drunk people around.
    ///
    /// ## Returns
    /// The success message of an http status code of 200
    pub async fn noise_heard(
        drunk_people_around: DrunkPeopleAround,
    ) -> Result<impl Reply, Rejection> {
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
    /// ## Returns
    /// A response on whether there are drunk people around
    pub async fn check_for_drunk_people(
        drunk_people_around: DrunkPeopleAround,
    ) -> Result<impl Reply, Rejection> {
        let mut response = DrunkPeopleAroundResponse {
            drunk_people_around: false,
        };
        let drunk_people_around = drunk_people_around.read().await;
        // if the last time a drunk person was detected is more than 15 minutes ago
        if drunk_people_around.time_logged.elapsed().unwrap() > Duration::new(900, 0) {
            return Ok(json(&response));
        } else if drunk_people_around.status {
            println!("Drunk Person Detected");
            response.drunk_people_around = true;
            return Ok(json(&response));
        }
        Ok(json(&response))
    }
}
