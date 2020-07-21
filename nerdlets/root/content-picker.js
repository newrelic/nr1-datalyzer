import React from 'react';
import PropTypes from 'prop-types';
import { Stack, StackItem, Radio } from 'nr1';

const ContentPicker = ({ contentTypes, setContentType, selectedType }) => {
  return (
    <Stack
      verticalType={Stack.VERTICAL_TYPE.TRAILING}
      horizontalType={Stack.HORIZONTAL_TYPE.RIGHT}
      className="chart-picker"
      fullWidth
    >
      {Object.values(contentTypes).map(contentType => {
        return (
          <StackItem key={contentType}>
            <Radio
              label={contentType}
              checked={contentType === selectedType}
              onClick={() => {
                setContentType(contentType);
              }}
            />
          </StackItem>
        );
      })}
    </Stack>
  );
};

ContentPicker.propTypes = {
  setContentType: PropTypes.func.isRequired,
  contentTypes: PropTypes.array.isRequired,
  selectedType: PropTypes.string
};

export default ContentPicker;
