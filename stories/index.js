import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Hexmap from '../src/components/hexmap/hexmap.component';

const DATA = require('./data.json');

storiesOf('Hexmap', module)
  .add('test with title = tile', () => (
    <Hexmap data={DATA} />
  ));
