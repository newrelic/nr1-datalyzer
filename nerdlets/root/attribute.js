import React from 'react';
import PropTypes from 'prop-types';
import { navigation, EntityByGuidQuery } from 'nr1';
import get from 'lodash.get';

export default function Attribute({ name, value }) {
  let onClick = null;
  if (name === 'guid' || name === 'entityGuid') {
    onClick = async () => {
      // fetch domain and type required as well as guid.
      const { data } = await EntityByGuidQuery.query({ entityGuid: value });
      const entity = get(data, 'entities[0]');
      if (entity) {
        navigation.openStackedEntity(value);
      }
    };
  }

  const linkStyle = onClick ? 'linked-value' : '';
  return (
    <>
      <span className="attribute-name">{name}: </span>
      <span className={`attribute-value ${linkStyle}`} onClick={onClick}>
        {value}
      </span>
    </>
  );
}

Attribute.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string
};
