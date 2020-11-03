use serde::{Deserialize, Serialize};
use shared::{OilTypes, Potato};
use std::sync::Arc;
use std::time::SystemTime;
use tokio::sync::RwLock;

pub type FryingState = Arc<RwLock<Frying>>;

#[derive(Debug, Clone)]
pub struct Frying {
    pub time: Option<SystemTime>,
    pub potatoes: Option<Vec<Potato>>,
    pub oil: Option<OilTypes>,
}

#[derive(Debug, Clone, Serialize)]
pub struct FriesResponse {
    pub potatoes: Vec<Potato>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct FryRequest {
    pub potatoes: Vec<shared::Potato>,
    pub oil: OilTypes,
}

#[derive(Serialize, Debug)]
pub struct FryingErrorResponse {
    pub error: String,
}
