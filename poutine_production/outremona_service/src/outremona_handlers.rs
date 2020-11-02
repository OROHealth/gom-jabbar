use warp::http::StatusCode;
use warp::{Rejection, Reply};
pub struct OutremonaHandlers;

impl OutremonaHandlers {
    pub async fn get_cheese() -> Result<impl Reply, Rejection> {
        println!("Taking Cheese");
        Ok(StatusCode::OK)
    }
}
