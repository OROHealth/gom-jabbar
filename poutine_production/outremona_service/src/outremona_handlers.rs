use warp::http::StatusCode;
use warp::{Rejection, Reply};
pub struct OutremonaHandlers;

impl OutremonaHandlers {
    /// Handler for get cheese request, prints that the
    /// robot is taking cheese
    ///
    /// ## Returns
    /// Http status code 200
    pub async fn get_cheese() -> Result<impl Reply, Rejection> {
        println!("Taking Cheese");
        Ok(StatusCode::OK)
    }

    /// Handler for squeeze cheese request, prints that the
    /// robot is squeezing the cheese
    ///
    /// ## Returns
    /// Http status code 200
    pub async fn squeeze_cheese() -> Result<impl Reply, Rejection> {
        println!("Squeezing Cheese");
        Ok(StatusCode::OK)
    }
}
