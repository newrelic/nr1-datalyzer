import React from 'react';
import PropTypes from 'prop-types';
import AccountPicker from '../account-picker';
import DataTypePicker from '../data-type-picker';
import EventTypePicker from './event-type-picker';
import AttributePicker from './attribute-picker';
import FunctionPicker from '../function-picker';

export default class EventsHeader extends React.PureComponent {
  static propTypes = {
    nerdletUrlState: PropTypes.object,
    entity: PropTypes.object
  };

  render() {
    const { entity } = this.props;

    // if running in the entity explorer, then the selected entity implies
    // the account id. Also we only support associated dimensional metrics for APM
    // entities at this time
    const showAccountPicker = !entity;
    const showDataTypePicker = entity || showAccountPicker;

    return (
      <div className="utility-bar">
        {showAccountPicker && <AccountPicker {...this.props} />}
        {showDataTypePicker && <DataTypePicker {...this.props} />}
        {showDataTypePicker && <hr />}
        <EventTypePicker {...this.props} {...this.state} />
        <AttributePicker {...this.props} {...this.state} />
        <FunctionPicker {...this.props} {...this.state} />
      </div>
    );
  }
}
