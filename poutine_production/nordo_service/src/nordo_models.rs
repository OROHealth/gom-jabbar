use serde::{Deserialize, Serialize};
use std::sync::Arc;
use std::time::SystemTime;
use tokio::sync::RwLock;

pub type LockedBoilingTime = Arc<RwLock<BoilingStatus>>;

#[derive(Debug, Clone, Serialize)]
pub enum BoilingStatus {
    Freezing,
    SoCold,
    StartingToBoil,
    BoilingMore,
    DamnThatsHot,
}

#[derive(Debug, Clone)]
pub struct BoilingTime {
    pub time: SystemTime,
}

#[derive(Debug, Clone, Serialize)]
pub struct BoilingStatusResponse {
    pub status: BoilingStatus,
}

#[derive(Debug, Clone, Deserialize)]
pub struct BoilRequest {
    potatoes: Vec<shared_models::Potato>,
}

#[derive(Serialize, Debug)]
pub struct BoilingErrorResponse {
    pub error: String,
}
