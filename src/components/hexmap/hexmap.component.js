import React from 'react';
import { HexGrid, Layout, Hexagon, GridGenerator, HexUtils } from 'react-hexgrid';
import { generateZones } from '../../zones';
import { generateCoasts } from '../../utils';
import './hexmap.component.scss';

const config = {
  width: 2300,
  height: 2000,
  layout: { width: 0.7, height: 0.7, flat: false, spacing: 1.03 },
  origin: { x: -45, y: -40 },
  map: 'rectangle',
  mapProps: [32, 32],
};

export default function HexMap() {
  const generator = GridGenerator.getGenerator(config.map);
  const hexagons = generator.apply(this, config.mapProps);

  const terrains = ['hills', 'mountains', 'forest', 'plains', 'swamp', 'desert', 'water'];

  let hexMap;
  hexMap = generateZones(hexagons, terrains, 'terrain', 15);
  hexMap = generateCoasts(hexMap);

  // console.log(hexMap);

  const layout = config.layout;
  const size = { x: layout.width, y: layout.height };

  return (
    <div className="hexGrid">
      <HexGrid width={config.width} height={config.height}>
        <Layout size={size} flat={layout.flat} spacing={layout.spacing} origin={config.origin}>
          {
            hexMap.map(hex => (
            // hexagons.map(hex => (
              <Hexagon
                className={`hex ${hex.terrain}`}
                key={HexUtils.getID(hex)}
                q={hex.q}
                r={hex.r}
                s={hex.s}
              />
            ))
          }
        </Layout>
      </HexGrid>
    </div>
  );
}
