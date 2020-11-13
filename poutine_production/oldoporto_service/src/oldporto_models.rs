use serde::Deserialize;
use std::collections::HashMap;
use std::sync::Arc;
use tokio::sync::RwLock;

pub type Robots = Arc<RwLock<HashMap<String, Robot>>>;

#[derive(Debug, Clone)]
pub struct Robot {
    pub port: u16,
    pub maintained_temp: Option<i64>,
    pub monitored: bool,
}

#[derive(Debug, Clone, Deserialize)]
pub struct RobotRegistrationRequest {
    pub robot_id: String,
    pub port: u16,
}

#[derive(Debug, Clone, Deserialize)]
pub struct RobotStartMonitoringRequest {
    pub robot_id: String,
    pub temp: i64,
}

#[derive(Debug, Clone, Deserialize)]
pub struct RobotStopMonitoringRequest {
    pub robot_id: String,
    pub new_temp: i64,
}
