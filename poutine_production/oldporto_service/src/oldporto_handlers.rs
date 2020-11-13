use easy_http_request::DefaultHttpRequest;
use std::thread;
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
        let mut robots = robots.write().await;
        if robots.contains_key(&req.robot_id) {
            Ok(StatusCode::FOUND)
        } else {
            robots.insert(
                req.robot_id,
                Robot {
                    maintained_temp: None,
                    port: req.port,
                    monitored: false,
                },
            );

            Ok(StatusCode::CREATED)
        }
    }

    pub async fn start_monitoring(
        req: RobotStartMonitoringRequest,
        robots: Robots,
    ) -> Result<StatusCode, Rejection> {
        if let Some(robot) = robots.write().await.get_mut(&req.robot_id) {
            if robot.monitored {
                return Ok(StatusCode::SERVICE_UNAVAILABLE);
            } else {
                robot.monitored = true;
            }
        }

        println!("\nStarting to monitor {}", req.robot_id);
        tokio::spawn(async move {
            // monitoring should be done so we can slowly decrease the temp
            while let Some(robot) = robots.read().await.get(&req.robot_id) {
                thread::sleep(Duration::new(2, 0));
                if !robot.monitored {
                    break;
                }
                println!(
                    "\n{}'s Temperature: {}",
                    req.robot_id,
                    OldPortoHandlers::request_temperature(&robot)
                );
                let decrease = OldPortoHandlers::request_temperature(&robot) < req.temp;
                if decrease {
                    OldPortoHandlers::increase_temperature(&robot);
                } else {
                    OldPortoHandlers::decrease_temperature(&robot);
                }
            }
            println!("\nDone monitoring {}", req.robot_id);
        });

        Ok(StatusCode::OK)
    }
    pub async fn stop_monitoring(
        req: RobotStopMonitoringRequest,
        robots: Robots,
    ) -> Result<StatusCode, Rejection> {
        let robot;
        {
            // set monitored to false
            if let Some(robot) = robots.write().await.get_mut(&req.robot_id) {
                robot.monitored = false;
            } else {
                return Ok(StatusCode::NOT_FOUND);
            }

            robot = robots.read().await.get(&req.robot_id).unwrap().clone();
        }

        tokio::spawn(async move {
            println!("Stopping Nordo monitoring after setting the new temperature");
            let decrease = Self::request_temperature(&robot) < req.new_temp;
            // monitoring should be done so we can slowly decrease the temp
            while (Self::request_temperature(&robot) - req.new_temp).abs() > shared::TEMP_DIFF {
                thread::sleep(Duration::new(5, 0));
                println!(
                    "\n{}'s Temperature: {}",
                    req.robot_id,
                    OldPortoHandlers::request_temperature(&robot)
                );
                if decrease {
                    Self::increase_temperature(&robot);
                } else {
                    Self::decrease_temperature(&robot);
                }
            }
            println!("Done setting the new temperature");
        });

        Ok(StatusCode::OK)
    }

    fn request_temperature(robot: &Robot) -> i64 {
        match DefaultHttpRequest::get_from_url_str(&format!(
            "http://localhost:{}/get-temperature",
            robot.port
        )) {
            Ok(req) => {
                let res = req.send().unwrap();
                if let Ok(response_string) = String::from_utf8(res.body) {
                    let response: shared::Temperature =
                        serde_json::from_str(&response_string).unwrap();
                    return response.degrees_celcius.into();
                }
                -1
            }
            _ => -1,
        }
    }

    fn increase_temperature(robot: &Robot) {
        if let Ok(req) = DefaultHttpRequest::post_from_url_str(&format!(
            "http://localhost:{}/increase-temperature",
            robot.port
        )) {
            req.send().unwrap();
        }
    }
    fn decrease_temperature(robot: &Robot) {
        if let Ok(req) = DefaultHttpRequest::post_from_url_str(&format!(
            "http://localhost:{}/decrease-temperature",
            robot.port
        )) {
            req.send().unwrap();
        }
    }
}
