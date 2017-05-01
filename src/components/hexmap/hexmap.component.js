import React from 'react';
import { HexGrid, Layout, Hexagon, GridGenerator, HexUtils, Pattern } from 'react-hexgrid';
import { generateZones } from '../../zones';
// import { generateCoasts } from '../../utils';
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

  const terrains = ['hills', 'mountains', 'forest', 'plains', 'swamp', 'desert', 'coast'];

  const hexMap = generateZones(hexagons, terrains, 'terrain', 10);

  const layout = config.layout;
  const size = { x: layout.width, y: layout.height };

  return (
    <HexGrid width={config.width} height={config.height} className="hexGrid">
      <Layout size={size} flat={layout.flat} spacing={layout.spacing} origin={config.origin}>
        {
          hexMap.map(hex => (
            <Hexagon
              className={`hex ${hex.props.terrain} ${hex.props.kingdom}`}
              key={HexUtils.getID(hex)}
              q={hex.q}
              r={hex.r}
              s={hex.s}
            />
          ))
        }
      </Layout>
      <Pattern id="pat-1" link="http://inkwellideas.com/wp-content/uploads/2010/04/palace.png" size={size} />
    </HexGrid>
  );
}
