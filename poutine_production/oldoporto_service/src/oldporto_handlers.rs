use std::time::{Duration, SystemTime};
use warp::http::StatusCode;
use warp::Rejection;

use crate::oldporto_models::{
    Robot, RobotRegistrationRequest, RobotStartMonitoringRequest, RobotStopMonitoringRequest,
    Robots,
};
pub struct OldPortoHandlers;

impl OldPortoHandlers {
    pub async fn register_robots(
        req: RobotRegistrationRequest,
        robots: Robots,
    ) -> Result<StatusCode, Rejection> {
        Ok(StatusCode::OK)
    }

    pub async fn start_monitoring(
        req: RobotStartMonitoringRequest,
        robots: Robots,
    ) -> Result<StatusCode, Rejection> {
        Ok(StatusCode::OK)
    }
    pub async fn stop_monitoring(
        req: RobotStopMonitoringRequest,
        robots: Robots,
    ) -> Result<StatusCode, Rejection> {
        Ok(StatusCode::OK)
    }
}
