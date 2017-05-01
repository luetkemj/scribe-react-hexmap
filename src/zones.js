import { assign, cloneDeep, each, find, orderBy, sample, shuffle } from 'lodash';
import { HexUtils } from 'react-hexgrid';

export function seedMap(map, zones, seeds, key, zoneKey) {
  // randomly assign zones to seeds
  return each(seeds, (seed, index) => {
    const hex = find(map, seed);
    hex.props[zoneKey] = index;
    hex.props[key] = sample(zones);

    return hex;
  });
}

export function copyClosestZone(map, seeds, key, zoneKey) {
  return each(map, (hex) => {
    const distances = seeds.map(s => ({
      distance: HexUtils.distance(hex, s),
      zone: s.props[key],
      [zoneKey]: s.props[zoneKey],
    }));

    // order the distances by distance and grab the closest one as our seed
    const seed = orderBy(distances, ['distance'])[0];

    const zonedHex = hex;

    zonedHex.props[key] = seed.zone;
    zonedHex.props[zoneKey] = seed[zoneKey];
    return zonedHex;
  });
}

export function generateZones(map, zones, key, density) {
  let zonedMap = cloneDeep(map);
  const zoneKey = `${key}Key`;
  const numSeeds = zones.length * density;

  let denseZones = [];
  for (let i = 0; i < density; i += 1) {
    denseZones = denseZones.concat(zones);
  }

  const seeds = shuffle(zonedMap).slice(0, numSeeds);

  const zonedSeeds = seedMap(zonedMap, zones, seeds, key, zoneKey);

  // find the closest seed's zone and copy that zone
  zonedMap = copyClosestZone(zonedMap, zonedSeeds, key, zoneKey);


  zonedMap.map(hex => assign(hex.props, {
    id: HexUtils.getID(hex),
  }));

  return zonedMap;
}
