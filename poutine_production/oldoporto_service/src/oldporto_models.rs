use serde::Deserialize;
use std::collections::HashMap;
use std::sync::Arc;
use tokio::sync::RwLock;

pub type Robots = Arc<RwLock<HashMap<String, Robot>>>;

pub struct Robot {
    pub port: u16,
    pub maintained_temp: Option<i64>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct RobotRegistrationRequest {
    robot_id: String,
    port: u16,
}

#[derive(Debug, Clone, Deserialize)]
pub struct RobotStartMonitoringRequest {
    robot_id: String,
    temp: i64,
}

#[derive(Debug, Clone, Deserialize)]
pub struct RobotStopMonitoringRequest {
    robot_id: String,
}
