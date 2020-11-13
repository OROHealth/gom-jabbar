use async_trait::async_trait;
use easy_http_request::DefaultHttpRequest;
use serde::{Deserialize, Serialize};
use std::convert::Infallible;
use std::sync::Arc;
use tokio::sync::RwLock;
use warp::filters::BoxedFilter;
use warp::http::StatusCode;
use warp::reply::{json, with_status, Json, WithStatus};
use warp::{Filter, Rejection, Reply};

pub const TEMP_DIFF: i32 = 5;

pub type TemperatureState = Arc<RwLock<Temperature>>;

#[derive(Debug, Clone, Serialize)]
pub struct Temperature {
    pub degrees_celcius: i32,
}

/// Shared Models between multiple services
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Potato {
    pub size: usize,
    pub coated_in_maple_syrup: bool,
    pub boiled: bool,
    pub fried: bool,
    pub oil_used: Option<OilTypes>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum OilTypes {
    Sunflower,
    Canola,
    Vegetable,
}

const PORT: u16 = 8010;
#[async_trait]
pub trait NotifyMontroyashi: Sync + Send + 'static {
    fn add_sound_heard_route() -> BoxedFilter<(StatusCode,)> {
        warp::path!("sound-heard")
            .and_then(Self::notify_montroyashi_of_noise)
            .boxed()
    }
    fn get_robot_name() -> &'static str;
    async fn notify_montroyashi_of_noise() -> Result<StatusCode, Rejection> {
        match DefaultHttpRequest::post_from_url_str(&format!(
            "http://localhost:{}/noise-heard",
            PORT
        )) {
            Ok(req) => {
                if req.send().is_ok() {
                    println!(
                        "Message from {}, Successfully Notified Montroyashi",
                        Self::get_robot_name()
                    );
                    return Ok(StatusCode::OK);
                } else {
                    return Ok(StatusCode::INTERNAL_SERVER_ERROR);
                }
            }
            Err(e) => {
                println!(
                    "Message from {}, Error sending to Montroyashi: {:?}",
                    Self::get_robot_name(),
                    e
                );

                return Ok(StatusCode::INTERNAL_SERVER_ERROR);
            }
        }
    }
}

#[async_trait]
pub trait TemperatureManagement: Sync + Send + 'static {
    /// Route definition for increase temperature path
    fn add_increase_temperature_route(temp_state: TemperatureState) -> BoxedFilter<(StatusCode,)> {
        warp::path!("increase-temperature")
            .and(warp::post())
            .and(with_temp_management(temp_state.clone()))
            .and_then(Self::increase_temperature_handler)
            .boxed()
    }

    /// Increases the temperature and returns a successful status code
    ///
    /// # Arguments
    /// `temp_state` the current temperature of the substance being monitored
    async fn increase_temperature_handler(
        temp_state: TemperatureState,
    ) -> Result<StatusCode, Rejection> {
        temp_state.write().await.degrees_celcius += TEMP_DIFF;
        Ok(StatusCode::OK)
    }

    /// Route definition for decrease temperature path
    fn add_decrease_temperature_route(temp_state: TemperatureState) -> BoxedFilter<(StatusCode,)> {
        warp::path!("decrease-temperature")
            .and(warp::post())
            .and(with_temp_management(temp_state.clone()))
            .and_then(Self::decrease_temperature_handler)
            .boxed()
    }

    /// Decreases the temperature and returns a successful status code
    ///
    /// # Arguments
    /// `temp_state` the current temperature of the substance being monitored
    async fn decrease_temperature_handler(
        temp_state: TemperatureState,
    ) -> Result<StatusCode, Rejection> {
        temp_state.write().await.degrees_celcius -= TEMP_DIFF;
        Ok(StatusCode::OK)
    }

    /// Route definition for retrieving temperature path
    fn add_get_temperature_route(temp_state: TemperatureState) -> BoxedFilter<(WithStatus<Json>,)> {
        warp::path!("get-temperature")
            .and(warp::post())
            .and(with_temp_management(temp_state.clone()))
            .and_then(Self::get_temperature_handler)
            .boxed()
    }

    /// Decreases the temperature and returns a successful status code
    ///
    /// # Arguments
    /// `temp_state` the current temperature of the substance being monitored
    async fn get_temperature_handler(
        temp_state: TemperatureState,
    ) -> Result<WithStatus<Json>, Rejection> {
        let temp: Temperature = temp_state.read().await.clone();
        Ok(with_status(json(&temp), StatusCode::OK))
    }
}

fn with_temp_management(
    status: TemperatureState,
) -> impl Filter<Extract = (TemperatureState,), Error = Infallible> + Clone {
    warp::any().map(move || status.clone())
}
