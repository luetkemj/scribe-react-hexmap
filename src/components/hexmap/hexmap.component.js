import React from 'react';
import { HexGrid, Layout, Hexagon, GridGenerator, HexUtils, Text } from 'react-hexgrid';
import { generateZones } from '../../zones';
import { generateCoasts } from '../../utils';
import './hexmap.component.scss';

const config = {
  width: 2300,
  height: 2000,
  layout: { width: 0.7, height: 0.7, flat: false, spacing: 1.03 },
  origin: { x: -45, y: -40 },
  map: 'rectangle',
  mapProps: [30, 30],
};

export default function HexMap() {
  const generator = GridGenerator.getGenerator(config.map);
  const hexagons = generator.apply(this, config.mapProps);

  const terrains = ['hills', 'mountains', 'forest', 'plains', 'swamp', 'desert', 'water', 'water'];

  let hexMap;
  hexMap = generateZones(hexagons, terrains, 'terrain', 10);
  hexMap = generateCoasts(hexMap);

  const layout = config.layout;
  const size = { x: layout.width, y: layout.height };

  return (
    <div className="hexGrid">
      <HexGrid width={config.width} height={config.height}>
        <Layout size={size} flat={layout.flat} spacing={layout.spacing} origin={config.origin}>
          {
            hexMap.map(hex => (
              <Hexagon
                className={`hex ${hex.terrain}`}
                key={HexUtils.getID(hex)}
                q={hex.q}
                r={hex.r}
                s={hex.s}
              >
                <Text>{hex.terrainKey}</Text>
              </Hexagon>
            ))
          }
        </Layout>
      </HexGrid>
    </div>
  );
}
