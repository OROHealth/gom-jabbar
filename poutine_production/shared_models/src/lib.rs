use serde::{Deserialize, Serialize};
/// Shared Models between multiple services
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Potato {
    pub size: usize,
}
