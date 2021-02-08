/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  View,
  Snackbar
} from '@vkontakte/vkui';

export default class extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const {
      id,
      activePanel,
      panelList,
      modal,
      popout
    } = this.props;

    return (
      <View
        id={id}
        activePanel={activePanel}
        modal={modal}
        popout={popout}
      >
        {panelList.map((item, index) => (
          <item.component
            {...item.props}
            {...this.props}
            key={index}
            id={item.id}
          />
        ))}
      </View>
    );
  }
}
