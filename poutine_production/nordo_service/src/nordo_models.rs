use serde::{Deserialize, Serialize};
use shared_models::Potato;
use std::sync::Arc;
use std::time::SystemTime;
use tokio::sync::RwLock;

pub type BoilingState = Arc<RwLock<Boiling>>;

#[derive(Debug, Clone, Serialize)]
pub enum BoilingStatus {
    Freezing,
    SoCold,
    StartingToBoil,
    BoilingMore,
    DamnThatsHot,
}

#[derive(Debug, Clone)]
pub struct Boiling {
    pub time: Option<SystemTime>,
    pub potatoes: Option<Vec<Potato>>,
}

#[derive(Debug, Clone, Serialize)]
pub struct BoilingStatusResponse {
    pub status: BoilingStatus,
}

#[derive(Debug, Clone, Deserialize)]
pub struct BoilRequest {
    pub potatoes: Vec<shared_models::Potato>,
}

#[derive(Serialize, Debug)]
pub struct BoilingErrorResponse {
    pub error: String,
}
