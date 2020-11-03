use async_trait::async_trait;
use easy_http_request::DefaultHttpRequest;
use serde::{Deserialize, Serialize};
use warp::http::StatusCode;
use warp::{Rejection, Reply};

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

#[async_trait]
pub trait NotifyMontroyashi {
    const PORT: u16 = 8010;
    fn get_robot_name() -> &'static str;
    async fn notify_montroyashi_of_noise() -> Result<Box<dyn Reply>, Rejection> {
        match DefaultHttpRequest::post_from_url_str(&format!(
            "http://localhost:{}/noise-heard",
            Self::PORT
        )) {
            Ok(req) => {
                if req.send().is_ok() {
                    println!(
                        "Message from {}, Successfully Notified Montroyashi",
                        Self::get_robot_name()
                    );
                    return Ok(Box::new(StatusCode::OK));
                } else {
                    return Ok(Box::new(StatusCode::INTERNAL_SERVER_ERROR));
                }
            }
            Err(e) => {
                println!(
                    "Message from {}, Error sending to Montroyashi: {:?}",
                    Self::get_robot_name(),
                    e
                );

                return Ok(Box::new(StatusCode::INTERNAL_SERVER_ERROR));
            }
        }
    }
}
