import React from 'react';
import { storiesOf } from '@kadira/storybook';
import HexmapContainer from '../src/containers/hexmap/hexmap.container';

storiesOf('Hexmap', module)
  .add('Hexmap Container', () => (
    <HexmapContainer />
  ));
