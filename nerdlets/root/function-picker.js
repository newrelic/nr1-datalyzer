import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const FUNCTIONS = [
  { value: 'average', label: 'Average' },
  { value: 'sum', label: 'Sum' },
  { value: 'latest', label: 'Latest' },
  { value: 'median', label: 'Median' },
  { value: 'max', label: 'Maximum' },
  { value: 'min', label: 'Minimum' }
];

export default class FunctionPicker extends React.PureComponent {
  static propTypes = {
    setFunction: PropTypes.func,
    attribute: PropTypes.string,
    fn: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { setFunction, attribute, fn } = this.props;
    const isCount = attribute === '__count__';

    if (!attribute || isCount) return <div />;

    const value = fn ? FUNCTIONS.find(f => f.value === fn) : FUNCTIONS[0];

    const options = FUNCTIONS;
    return (
      <div className="react-select-input-group">
        <label>Function</label>
        <Select
          value={value}
          options={options}
          onChange={s => setFunction(s.value)}
          classNamePrefix="react-select"
        />
      </div>
    );
  }
}
