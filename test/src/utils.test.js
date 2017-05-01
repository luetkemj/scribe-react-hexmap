import * as utilsLib from '../../src/utils';

let map;

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
  // zones = ['hills', 'mountains', 'forest', 'plains', 'swamp', 'desert'];
  // seeds = [map[3], map[12], map[20]];
  // zonedSeeds = [
  //   { props: { test: 'hills', testKey: 0 }, q: 3, r: 0, s: -3 },
  //   { props: { test: 'forest', testKey: 1 }, q: 1, r: 2, s: -3 },
  //   { props: { test: 'swamp', testKey: 2 }, q: -2, r: 4, s: -2 },
  // ];
});

test('utilsLib.neighbors should work', () => {
  expect(utilsLib.neighbors({ q: 0, r: 0, s: 0 })).toEqual([
    { q: 1, r: 0, s: -1 },
    { q: 1, r: -1, s: 0 },
    { q: 0, r: -1, s: 1 },
    { q: -1, r: 0, s: 1 },
    { q: -1, r: 1, s: 0 },
    { q: 0, r: 1, s: -1 },
  ]);
});

test('utilsLib.generateCoasts should work', () => {
  expect(utilsLib.generateCoasts(map)).toEqual([]);
});
