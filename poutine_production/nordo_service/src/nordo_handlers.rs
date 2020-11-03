use std::time::{Duration, SystemTime};
use warp::http::StatusCode;
use warp::reply::json;
use warp::{Rejection, Reply};

use crate::nordo_models::{BoilRequest, BoilingErrorResponse, BoilingState};

const BOIL_TIME: u64 = 900;

pub struct NordoHandlers;

impl NordoHandlers {
    /// Starts boiling the potatoes
    ///
    /// ## Returns
    /// The success message of an http status code of 200
    pub async fn start_boiling_potatoes(
        request: BoilRequest,
        state: BoilingState,
    ) -> Result<impl Reply, Rejection> {
        println!("Starting to boil potatoes");
        let mut state = state.write().await;
        if let Some(time) = state.time {
            if time.elapsed().unwrap() < Duration::new(BOIL_TIME, 0) {
                let res = BoilingErrorResponse {
                    error: "There are already potatoes boiling.".into(),
                };
                return Ok(warp::reply::with_status(
                    json(&res),
                    StatusCode::PRECONDITION_FAILED,
                ));
            }
        }
        state.time = Some(SystemTime::now());
        state.potatoes = Some(request.potatoes);
        Ok(warp::reply::with_status(
            json(&String::from("")),
            StatusCode::OK,
        ))
    }

    /// Returns the status of currently boiling potatoes
    ///
    /// ## Returns
    /// The status of the potatoes as a response
    pub async fn get_potatoes_status() -> Result<impl Reply, Rejection> {
        Ok(warp::http::StatusCode::OK)
    }

    /// If the potatoes are boiled, they are then returned, otherwise the status
    /// of the potatoes is returned
    ///
    /// ## Returns
    /// The boiled potatoes or a message giving them their status
    pub async fn get_boiled_potatoes() -> Result<impl Reply, Rejection> {
        Ok(warp::http::StatusCode::OK)
    }
}
