import React from 'react';
import AccountPicker from '../account-picker';
import DataTypePicker from '../data-type-picker';
import MetricPicker from './metric-picker';
import FunctionPicker from '../function-picker';

export default class MetricsHeader extends React.PureComponent {
  render() {
    // if there is an entity guid then this header is appearing
    // in the data explorer; no need to show an account picker or
    // entity type picker in that case.
    const showAccountPicker = !this.props.nerdletUrlState.entityGuid;

    return (
      <div className="utility-bar">
        {showAccountPicker && <AccountPicker {...this.props} />}
        <DataTypePicker {...this.props} dataType="metric" />
        <hr />
        <MetricPicker {...this.props} {...this.state} />
        <FunctionPicker {...this.props} {...this.state} />
      </div>
    );
  }
}
