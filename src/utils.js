import { cloneDeep, each, find, some } from 'lodash';
import { HexUtils } from 'react-hexgrid';

export function generateOceans(map) {
  const coastalMap = cloneDeep(map);
  const blackList = [];

  // first pass
  each(coastalMap, (hex) => {
    // check if terrainKey is blacklisted
    if (some(blackList, o => o === hex.terrainKey)) {
      // terrainKey is blacklisted
      // set hex to water
      return hex.terrain = 'water'; // eslint-disable-line
    }
    const neighbors = HexUtils.neighbours(hex);

    return each(neighbors, (neighbor) => {
      if (!find(coastalMap, neighbor)) {
        // we are at a map edge!
        /* eslint-disable no-param-reassign */
        hex.terrain = 'water';
        blackList.push(hex.terrainKey);
      }
    });
  });

  // second pass
  // iterate over blacklist removing any hexes missed in the first round
  each(blackList, (terrainKey) => {
    each(coastalMap, (hex) => {
      if (terrainKey === hex.terrainKey) {
        hex.terrain = 'water';
      }
    });
  });

  return coastalMap;
}
