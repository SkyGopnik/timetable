import React from 'react';
import {
  TabbarItem
} from '@vkontakte/vkui';

export default class extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const {
      name,
      title,
      icon,
      activeStory,
      changeStory
    } = this.props;

    return (
      <TabbarItem
        onClick={changeStory}
        selected={activeStory === name}
        data-story={name}
        text={title}
      >
        {icon}
      </TabbarItem>
    );
  }
}
