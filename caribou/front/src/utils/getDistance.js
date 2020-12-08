const toRadian = (degree) => {
  return degree * Math.PI / 180;
};

const getDistance = (locationA, locationB) => {
  const lng1 = toRadian(locationA.lng);
  const lat1 = toRadian(locationA.lat);
  const lng2 = toRadian(locationB.lng);
  const lat2 = toRadian(locationB.lat);

  const deltaLat = lat2 - lat1;
  const deltaLon = lng2 - lng1;

  const a = Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
  const c = 2 * Math.asin(Math.sqrt(a));
  const EARTH_RADIUS = 6371;
  return c * EARTH_RADIUS * 1000;
};

export default getDistance;
