import React from 'react';
import PropTypes from 'prop-types';
import AccountPicker from '../account-picker';
import DataTypePicker from '../data-type-picker';
import EventTypePicker from './event-type-picker';
import AttributePicker from './attribute-picker';
import FunctionPicker from '../function-picker';

export default class EventsHeader extends React.PureComponent {
  static propTypes = {
    nerdletUrlState: PropTypes.object
  };

  render() {
    // if there is an entity guid then this header is appearing
    // in the data explorer; no need to show an account picker or
    // entity type picker in that case.
    const showAccountPicker = !this.props.nerdletUrlState.entityGuid;

    return (
      <div className="utility-bar">
        {showAccountPicker && (
          <>
            <AccountPicker {...this.props} />
            <DataTypePicker {...this.props} />
            <hr />
          </>
        )}
        <EventTypePicker {...this.props} {...this.state} />
        <AttributePicker {...this.props} {...this.state} />
        <FunctionPicker {...this.props} {...this.state} />
      </div>
    );
  }
}
