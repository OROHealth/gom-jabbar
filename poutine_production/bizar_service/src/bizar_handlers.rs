use crate::bizar_models::{FryRequest, FryingState};
use std::time::{Duration, SystemTime};
use warp::http::StatusCode;
use warp::reply::json;
use warp::{Rejection, Reply};

const FRY_TIME: u64 = 180;

pub struct BizarHandlers;

impl BizarHandlers {
    /// Starts frying the potatoes with the provided oil if the fryers
    /// are available
    ///
    /// ## Arguments
    /// `start_frying_request` - The potatoes to be fried
    /// `frying_status` - The status
    ///
    /// ## Returns
    /// A status code of 200 if successful, otherwise a response that potatoes are already
    /// being fried
    pub async fn start_frying_potatoes(
        frying_request: FryRequest,
        state: FryingState,
    ) -> Result<impl Reply, Rejection> {
        Ok(warp::reply::with_status(
            json(&String::new()),
            StatusCode::OK,
        ))
    }

    /// Returns the fried potatoes if they are done
    ///
    /// ## Arguments
    /// `frying_status` - The status
    ///
    /// ## Returns
    /// The fried potatoes or a message saying they are not done frying
    pub async fn get_fries(state: FryingState) -> Result<impl Reply, Rejection> {
        Ok(warp::reply::with_status(
            json(&String::new()),
            StatusCode::OK,
        ))
    }
}
