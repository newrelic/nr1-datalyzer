import React from 'react';

import { Button, Tooltip } from 'nr1'

export default class EventTypePicker extends React.PureComponent {
  render() {
    const { eventTypes, setEventType } = this.props
    console.log(this.props)

    return <div>
      {eventTypes.map(eventType => {

        return <Tooltip placementType="bottom" text={eventType.definition}>
          <Button key={eventType.name} type="plain" onClick={() => setEventType(eventType)}>
            {eventType.name}
          </Button>
        </Tooltip>
      })}
    </div>
  }
}