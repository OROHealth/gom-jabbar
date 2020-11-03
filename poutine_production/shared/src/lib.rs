use easy_http_request::DefaultHttpRequest;
use serde::{Deserialize, Serialize};
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

pub trait NotifyMontroyashi {
    fn notify_montroyashi_of_noise() {
        const Robot: &str;
        match DefaultHttpRequest::post("http://localhost:8010/noise-heard").send() {
            Ok(_) => println!("Message from {}, Successfully Notified Montroyashi", + Robot),
            Err(e) => println!(
                "Message from {}, Error sending to Montroyashi: {:?}" + Robot,
                e
            ),
        }
    }
}
