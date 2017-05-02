import React, { Component } from 'react';
import { GridGenerator } from 'react-hexgrid';
import { generateZones } from '../../zones';
import { generateCoasts } from '../../utils';

import HexMap from '../../components/hexmap/hexmap.component';

export default class HexmapContainer extends Component {
  state = {
    hexMap: [],
  }

  config = {
    width: 2300,
    height: 2000,
    layout: { width: 0.7, height: 0.7, flat: false, spacing: 1.03 },
    origin: { x: -45, y: -40 },
    map: 'rectangle',
    mapProps: [30, 30],
  };

  buildMap = () => {
    const generator = GridGenerator.getGenerator(this.config.map);
    const hexagons = generator.apply(this, this.config.mapProps);
    const terrains = ['hills', 'mountains', 'forest', 'plains', 'swamp', 'desert', 'water', 'water'];

    let hexMap;
    hexMap = generateZones(hexagons, terrains, 'terrain', 10);
    hexMap = generateCoasts(hexMap);

    this.setState({
      hexMap,
    });
  }

  render() {
    return (
      <div>
        <button style={{ color: 'green' }} onClick={this.buildMap}>Generate!</button>
        <HexMap
          width={this.config.width}
          height={this.config.height}
          size={{ x: this.config.layout.width, y: this.config.layout.height }}
          flat={false}
          spacing={this.config.layout.spacing}
          origin={this.config.origin}
          hexes={this.state.hexMap}
        />
      </div>
    );
  }
}
