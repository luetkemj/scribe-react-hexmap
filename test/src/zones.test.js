// import * as _ from 'lodash';
// import { GridGenerator } from 'react-hexgrid';
import * as zonesLib from '../../src/zones';

jest.unmock('lodash');
const lodash = require.requireActual('lodash');

let map;
let zones;
let seeds;
let zonedSeeds;

beforeEach(() => {
  map = [
    { q: -0, r: 0, s: 0, props: {} },
    { q: 1, r: 0, s: -1, props: {} },
    { q: 2, r: 0, s: -2, props: {} },
    { q: 3, r: 0, s: -3, props: {} }, // 3
    { q: 4, r: 0, s: -4, props: {} },
    { q: -0, r: 1, s: -1, props: {} },
    { q: 1, r: 1, s: -2, props: {} },
    { q: 2, r: 1, s: -3, props: {} },
    { q: 3, r: 1, s: -4, props: {} },
    { q: 4, r: 1, s: -5, props: {} },
    { q: -1, r: 2, s: -1, props: {} },
    { q: 0, r: 2, s: -2, props: {} },
    { q: 1, r: 2, s: -3, props: {} }, // 12
    { q: 2, r: 2, s: -4, props: {} },
    { q: 3, r: 2, s: -5, props: {} },
    { q: -1, r: 3, s: -2, props: {} },
    { q: 0, r: 3, s: -3, props: {} },
    { q: 1, r: 3, s: -4, props: {} },
    { q: 2, r: 3, s: -5, props: {} },
    { q: 3, r: 3, s: -6, props: {} },
    { q: -2, r: 4, s: -2, props: {} }, // 20
    { q: -1, r: 4, s: -3, props: {} },
    { q: 0, r: 4, s: -4, props: {} },
    { q: 1, r: 4, s: -5, props: {} },
    { q: 2, r: 4, s: -6, props: {} },
  ];
  zones = ['hills', 'mountains', 'forest', 'plains', 'swamp', 'desert'];
  seeds = [map[3], map[12], map[20]];
  zonedSeeds = [
    { props: { test: 'hills', testKey: 0 }, q: 3, r: 0, s: -3 },
    { props: { test: 'forest', testKey: 1 }, q: 1, r: 2, s: -3 },
    { props: { test: 'swamp', testKey: 2 }, q: -2, r: 4, s: -2 },
  ];
});

test('seedMap should work', () => {
  lodash.sample = jest.fn();
  lodash.sample.mockReturnValueOnce('hills')
    .mockReturnValueOnce('forest')
    .mockReturnValueOnce('swamp');

  expect(zonesLib.seedMap(map, zones, seeds, 'test', 'testKey')).toEqual([
    { props: { test: 'hills', testKey: 0 }, q: 3, r: 0, s: -3 },
    { props: { test: 'forest', testKey: 1 }, q: 1, r: 2, s: -3 },
    { props: { test: 'swamp', testKey: 2 }, q: -2, r: 4, s: -2 },
  ]);
});

test('copyClosestZone should work', () => {
  expect(zonesLib.copyClosestZone(map, zonedSeeds, 'test', 'testKey')).toEqual([]);
});
