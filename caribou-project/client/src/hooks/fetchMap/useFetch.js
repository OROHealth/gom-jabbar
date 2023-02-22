import { addLocationsFound } from '@redux/reducers/locationsFound/locationsFound.reducer';
import { mapService } from '@services/api/map/map.service';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

export function useFetch() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let isCancelled = true;
    const getLocations = async () => {
      try {
        setLoading(true);
        await mapService.getAllLocations().then((res) => {
          // console.log('Line 105: Result of Fetching locations: ', res, 'Map Component');
          if (isCancelled) {
            if (res?.data?.locations) {
              setData(res.data.locations);
              dispatch(addLocationsFound(res.data.locations));
              return res?.data?.locations;
            }
          }
        });
      } catch (error) {
        setError(error);
        console.log(`Line 115: Error:`, error, 'Map Component');
      } finally {
        setLoading(false);
      }
    };
    getLocations();

    return () => {
      isCancelled = false;
    };
  }, []);

  return { data, error, loading };
}
