use warp::{Rejection, Reply};

pub struct NordoHandlers;

impl NordoHandlers {
    /// Randomly selects a song from the collection of lyrics played by Leonard Cohen
    /// "Displays the lyrics" by printing them in the console
    ///
    /// ## Returns
    /// The success message of an http status code of 200
    pub async fn boil_potatoes() -> Result<impl Reply, Rejection> {
        Ok(warp::http::StatusCode::OK)
    }
}
