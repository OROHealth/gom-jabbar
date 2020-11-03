use crate::bizar_models::{FriesResponse, FryRequest, FryingErrorResponse, FryingState};
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
        let mut state = state.write().await;

        if state.time.is_some() {
            return Ok(warp::reply::with_status(
                json(&FryingErrorResponse {
                    error: "A batch of potatoes is already being fried".into(),
                }),
                StatusCode::PRECONDITION_FAILED,
            ));
        }

        state.time = Some(SystemTime::now());
        state.oil = Some(frying_request.oil);
        state.potatoes = Some(frying_request.potatoes);

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
        let state = state.read().await;
        if let (Some(mut potatoes), Some(oil), Some(time)) =
            (state.potatoes.clone(), state.oil.clone(), state.time)
        {
            let time = if let Ok(time) = time.elapsed() {
                time
            } else {
                return Ok(warp::reply::with_status(
                    json(&FryingErrorResponse {
                        error: String::from("Could not unwrap time elapsed for frying potatoes"),
                    }),
                    StatusCode::INTERNAL_SERVER_ERROR,
                ));
            };
            if time < Duration::new(FRY_TIME, 0) {
                return Ok(warp::reply::with_status(
                    json(&FryingErrorResponse {
                        error: String::from("The potatoes have not finished frying"),
                    }),
                    StatusCode::OK,
                ));
            }

            potatoes
                .iter_mut()
                .for_each(|p| p.oil_used = Some(oil.clone()));

            Ok(warp::reply::with_status(
                json(&FriesResponse { potatoes }),
                StatusCode::OK,
            ))
        } else {
            return Ok(warp::reply::with_status(
                json(&FryingErrorResponse {
                    error: String::from("There are no fries to give you"),
                }),
                StatusCode::NOT_FOUND,
            ));
        }
    }
}
