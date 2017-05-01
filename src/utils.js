import { cloneDeep, each, find } from 'lodash';
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

  each(coastalMap, (hex) => {
    const neighbors = neighbours(hex);

    each(neighbors, (neighbor) => {
      if (!find(coastalMap, neighbor)) {
        // we are at a map edge!
        // hex.terrainKey = 'water';
      }
    });
  });

  return coastalMap;
}
