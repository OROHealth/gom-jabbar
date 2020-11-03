use crate::verduny_models::{CutPotatoRequest, MSDipPotatoRequest, PotatoResponse};
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
                    let mut piece = potato.clone();
                    piece.size = cut_potato_request.size;
                    potato_pieces.push(piece);
                    remaining_size -= cut_potato_request.size;
                }
                // no waste of potatoes
                if remaining_size != 0 {
                    let mut piece = potato.clone();
                    piece.size = remaining_size;
                    potato_pieces.push(piece)
                }
                potato_pieces
            })
            .collect();

        Ok(json(&PotatoResponse {
            potatoes: cut_potatoes,
        }))
    }

    /// Dips every potatoe in maple syrup
    ///
    /// ## Arguments
    /// `coat_potato_request` - Potatoes to be dipped
    ///
    /// ## Returns
    /// The collection of potatoes all dipped in maple syrup
    pub async fn dip_potatoes_in_maple_syrup(
        mut dip_potato_request: MSDipPotatoRequest,
    ) -> Result<impl Reply, Rejection> {
        for i in 0..dip_potato_request.potatoes.len() {
            dip_potato_request.potatoes[i].coated_in_maple_syrup = true;
        }
        Ok(json(&PotatoResponse {
            potatoes: dip_potato_request.potatoes,
        }))
    }
}

impl shared::NotifyMontroyashi for VerdunyHandlers {
    fn get_robot_name() -> &'static str {
        "Verduny Service"
    }
}
