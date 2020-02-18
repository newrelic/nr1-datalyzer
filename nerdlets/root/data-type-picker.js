import React from 'react';
import { Radio } from 'nr1';

export default function DataTypePicker({ setDataType, dataType }) {
  return (
    <div className="data-type-picker">
      <Radio
        onClick={() => setDataType('event')}
        checked={dataType == 'event'}
        label="Events"
        className="data-type-picker-radio"
      />
      <Radio
        onClick={() => setDataType('metric')}
        checked={dataType == 'metric'}
        label="Metrics"
        className="data-type-picker-radio"
      />
    </div>
  );
}
