import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import nrdbQuery from '../../lib/nrdb-query';

const DOMAIN_EVENT_TYPES = {
  APM: ['Transaction', 'TransactionError'],
  BROWSER: [
    'PageView',
    'PageAction',
    'AjaxRequest',
    'Ajax',
    'BrowserInteraction',
    'JavascriptError'
  ],
  MOBILE: [
    'MobileSession',
    'Mobile',
    'MobileUserAction',
    'MobileRequest',
    'MobileRequestError',
    'MobileCrash',
    'MobileHandledException'
  ],
  INFRA: ['SystemSample', 'ProcessSample'],
  EXT: []
};

export default class EventTypePicker extends React.PureComponent {
  static propTypes = {
    dataType: PropTypes.string,
    eventType: PropTypes.string,
    account: PropTypes.object,
    entity: PropTypes.object,
    setEventType: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.loadEventTypes();
  }

  componentDidUpdate({ dataType, account, entity }) {
    if (
      dataType !== this.props.dataType ||
      account.id !== this.props.account.id ||
      entity !== this.props.entity
    ) {
      this.loadEventTypes();
    }
  }

  async loadEventTypes() {
    const { entity } = this.props;
    if (entity) {
      await this.loadEntityEventTypes();
    } else {
      await this.loadAllEventTypes();
    }
  }

  async loadAllEventTypes() {
    const { account, setEventType } = this.props;

    const nrql = `SHOW EVENT TYPES`;
    const results = await nrdbQuery(account.id, nrql);

    const eventTypes = results
      .map(r => r.eventType)
      .sort()
      .filter(e => e !== 'Metric' && e !== 'MetricRaw');
    this.setState({ eventTypes });
    if (eventTypes.length > 0) setEventType(eventTypes[0]);
  }

  loadEntityEventTypes() {
    const { entity, setEventType } = this.props;
    const eventTypes = DOMAIN_EVENT_TYPES[entity.domain];

    this.setState({ eventTypes });
    setEventType(eventTypes[0]);
  }

  render() {
    const { eventTypes } = this.state;
    const { setEventType, eventType } = this.props;
    if (!eventTypes) return <div />;

    const options = eventTypes.map(o => {
      return { value: o, label: o };
    });
    return (
      <div className="react-select-input-group">
        <label>Event Type</label>
        <Select
          options={options}
          value={{ value: eventType, label: eventType }}
          onChange={s => setEventType(s.value)}
          classNamePrefix="react-select"
        />
      </div>
    );
  }
}
