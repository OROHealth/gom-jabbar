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

#[tokio::test]
async fn test_taking_cheese() {
    let response = OutremonaHandlers::get_cheese().await;
    assert!(response.is_ok());
    assert_eq!(response.unwrap().into_response().status(), StatusCode::OK);
}

#[tokio::test]
async fn test_squeezing_cheese() {
    let response = OutremonaHandlers::squeeze_cheese().await;
    assert!(response.is_ok());
    assert_eq!(response.unwrap().into_response().status(), StatusCode::OK);
}
