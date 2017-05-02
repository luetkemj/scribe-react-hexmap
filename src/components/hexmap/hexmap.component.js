import React, { PropTypes } from 'react';
import { HexGrid, Layout, Hexagon, HexUtils, Text } from 'react-hexgrid';

import './hexmap.component.scss';

export default function HexMap({ width, height, size, flat, spacing, origin, hexes }) {
  return (
    <div className="hexGrid">
      <HexGrid width={width} height={height}>
        <Layout size={size} flat={flat} spacing={spacing} origin={origin}>
          {
            hexes.map(hex => (
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

HexMap.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  size: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  flat: PropTypes.bool.isRequired,
  spacing: PropTypes.number.isRequired,
  origin: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  hexes: PropTypes.arrayOf({}).isRequired,
};
