use crate::verduny_models::{CutPotatoRequest, CutPotatoResponse};
use shared_models::Potato;
use warp::reply::json;
use warp::{Rejection, Reply};

pub struct VerdunyHandlers;

impl VerdunyHandlers {
    /// This will take a collection of potatoes, with any size
    /// and cut each potatoe to the specified size
    ///
    /// ## Note
    /// So no waste is done, if a smaller piece of a remaining potato is left, it is
    /// still included
    ///
    /// ## Arguments
    /// `cut_potato_request` - the potatoes to be cut in the specific size
    ///
    /// ## Returns
    /// The potatoes in smaller pieces
    pub async fn cut_potatoes(
        cut_potato_request: CutPotatoRequest,
    ) -> Result<impl Reply, Rejection> {
        println!(
            "Cutting {} Potatoes into pieces of size {}",
            cut_potato_request.potatoes.len(),
            cut_potato_request.size
        );

        let cut_potatoes = cut_potato_request
            .potatoes
            .iter()
            .flat_map(|potato| {
                let mut potato_pieces = Vec::new();
                let mut remaining_size = potato.size;
                while remaining_size > cut_potato_request.size {
                    potato_pieces.push(Potato {
                        size: cut_potato_request.size,
                    });
                    remaining_size -= cut_potato_request.size;
                }
                // no waste of potatoes
                if remaining_size != 0 {
                    potato_pieces.push(Potato {
                        size: remaining_size,
                    })
                }
                potato_pieces
            })
            .collect();

        Ok(json(&CutPotatoResponse {
            potatoes: cut_potatoes,
        }))
    }
}
