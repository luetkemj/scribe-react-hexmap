import { cloneDeep, each, find, some } from 'lodash';
import { HexUtils } from 'react-hexgrid';

export function neighbours(hex) {
  const array = [];
  for (let i = 0; i < HexUtils.DIRECTIONS.length; i += 1) {
    array.push(HexUtils.neighbour(hex, i));
  }

  return array;
}

export function generateCoasts(map) {
  const coastalMap = cloneDeep(map);
  const blackList = [];

  each(coastalMap, (hex) => {
    // check if terrainKey is blacklisted
    // console.log(blackList);
    // console.log(hex.terrainKey);
    if (some(blackList, o => o === hex.terrainKey)) {
      // console.log('blacklisted');
      // terrainKey is blacklisted
      // set hex to water
      return hex.terrain = 'water'; // eslint-disable-line
    } else {
      const neighbors = neighbours(hex);

      return each(neighbors, (neighbor) => {
        if (!find(coastalMap, neighbor)) {
          // we are at a map edge!

          /* eslint-disable no-param-reassign */
          hex.terrain = 'water';

          blackList.push(hex.terrainKey);
        }
      });
    }
  });

  return coastalMap;
}
