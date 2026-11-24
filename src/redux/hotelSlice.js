import { hotelApi } from './hotelApi';

const HOTELS_LOADING = 'hotels/loading';
const HOTELS_LOADED = 'hotels/loaded';
const HOTELS_FAILED = 'hotels/failed';
const HOTEL_SAVING = 'hotel/saving';
const HOTEL_DELETING = 'hotel/deleting';

const initialState = {
  items: [],
  status: 'loading',
  error: null,
};

export function hotelReducer(state = initialState, action) {
  switch (action.type) {
    case HOTELS_LOADING:
    case HOTEL_SAVING:
    case HOTEL_DELETING:
      return { ...state, status: 'loading', error: null };
    case HOTELS_LOADED:
      return { items: action.payload, status: 'succeeded', error: null };
    case HOTELS_FAILED:
      return { ...state, status: 'failed', error: action.payload };
    default:
      return state;
  }
}

export const loadHotels = () => async (dispatch) => {
  dispatch({ type: HOTELS_LOADING });
  try {
    const hotels = await hotelApi.list();
    dispatch({ type: HOTELS_LOADED, payload: hotels });
  } catch (error) {
    dispatch({ type: HOTELS_FAILED, payload: error.message });
  }
};

export const saveHotel = (hotel) => async (dispatch) => {
  dispatch({ type: HOTEL_SAVING });
  try {
    const hotels = await hotelApi.save(hotel);
    dispatch({ type: HOTELS_LOADED, payload: hotels });
    return true;
  } catch (error) {
    dispatch({ type: HOTELS_FAILED, payload: error.message });
    return false;
  }
};

export const deleteHotel = (id) => async (dispatch) => {
  dispatch({ type: HOTEL_DELETING });
  try {
    const hotels = await hotelApi.remove(id);
    dispatch({ type: HOTELS_LOADED, payload: hotels });
    return true;
  } catch (error) {
    dispatch({ type: HOTELS_FAILED, payload: error.message });
    return false;
  }
};
