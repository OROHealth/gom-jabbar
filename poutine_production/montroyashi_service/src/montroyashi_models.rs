use serde::Serialize;
use std::sync::Arc;
use std::time::SystemTime;
use tokio::sync::RwLock;

pub type DrunkPeopleAround = Arc<RwLock<DrunkPeopleAroundStatus>>;

#[derive(Debug, Clone)]
pub struct DrunkPeopleAroundStatus {
    pub status: bool,
    pub time_logged: SystemTime,
}

#[derive(Debug, Clone, Serialize)]
pub struct DrunkPeopleAroundResponse {
    pub drunk_people_around: bool,
}
