import CaribouReducer from "./caribou";
import ModalReducer from "./modal";
import TrashZoneReducer from "./trashZone";
import UserReducer from "./user";
import ErrorReducer from "./error";

export default {
  caribou: CaribouReducer,
  modal: ModalReducer,
  trashZone: TrashZoneReducer,
  user: UserReducer,
  error: ErrorReducer,
};
