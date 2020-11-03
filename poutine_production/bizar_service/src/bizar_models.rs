use serde::{Deserialize, Serialize};
use shared_models::Potato;
use std::sync::Arc;
use std::time::SystemTime;
use tokio::sync::RwLock;

pub type FryingState = Arc<RwLock<Frying>>;

#[derive(Debug, Clone)]
pub struct Frying {
    pub time: Option<SystemTime>,
    pub potatoes: Option<Vec<Potato>>,
}

#[derive(Debug, Clone, Serialize)]
pub struct FriesResponse {
    pub potatoes: Vec<Potato>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct FryRequest {
    pub potatoes: Vec<shared_models::Potato>,
}

#[derive(Serialize, Debug)]
pub struct FryingErrorResponse {
    pub error: String,
}
