import React, { Component } from 'react';
import { GridGenerator } from 'react-hexgrid';
import { generateZones } from '../../zones';
import { generateOceans } from '../../utils';

import HexMap from '../../components/hexmap/hexmap.component';
import './hexmap.container.scss';

export default class HexmapContainer extends Component {
  state = {
    hexMap: [],
    hexDisplay: 'terrain',
  }

  componentWillMount() {
    this.buildMap();
  }

  config = {
    width: 770,
    height: 660,
    layout: { width: 2.1, height: 2.1, flat: false, spacing: 1.03 },
    origin: { x: -55, y: -47 },
    map: 'rectangle',
    mapProps: [30, 30],
  };

  buildMap = () => {
    const generator = GridGenerator.getGenerator(this.config.map);
    const hexagons = generator.apply(this, this.config.mapProps);
    const terrains = ['hills', 'mountains', 'forest', 'plains', 'swamp', 'desert', 'water', 'water'];

    let hexMap;
    hexMap = generateZones(hexagons, terrains, 'terrain', 10);
    hexMap = generateOceans(hexMap);

    this.setState({
      hexMap,
    });
  }

  handleChange = (event) => {
    this.setState({ hexDisplay: event.target.value });
  }

  render() {
    return (
      <div>
        <div className="controls">
          <div className="actions">
            <button className="button" onClick={this.buildMap}>Generate Map</button>

            <form onSubmit={this.handleSubmit} className="form select">
              <label htmlFor="hex-display">
                Hexes should display:
                <select id="hex-display" value={this.state.hexDisplay} onChange={this.handleChange}>
                  <option value="nothing">Nothing</option>
                  <option value="terrain">terrain</option>
                  <option value="terrainKey">terrainKeys</option>
                </select>
              </label>
            </form>

          </div>
          <div className="legend">
            <div className="pair">
              <div className="key mountains" />
              <div className="value">mountains</div>
            </div>
            <div className="pair">
              <div className="key hills" />
              <div className="value">hills</div>
            </div>
            <div className="pair">
              <div className="key plains" />
              <div className="value">plains</div>
            </div>
            <div className="pair">
              <div className="key desert" />
              <div className="value">desert</div>
            </div>
            <div className="pair">
              <div className="key swamp" />
              <div className="value">swamp</div>
            </div>
            <div className="pair">
              <div className="key forest" />
              <div className="value">forest</div>
            </div>
            <div className="pair">
              <div className="key water" />
              <div className="value">water</div>
            </div>
          </div>
        </div>
        <HexMap
          width={this.config.width}
          height={this.config.height}
          size={{ x: this.config.layout.width, y: this.config.layout.height }}
          flat={false}
          spacing={this.config.layout.spacing}
          origin={this.config.origin}
          hexes={this.state.hexMap}
          hexDisplay={this.state.hexDisplay}
        />
      </div>
    );
  }
}
