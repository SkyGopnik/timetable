import React from 'react';
import {
  Tabbar
} from '@vkontakte/vkui';

import Icon28ArticleOutline from '@vkontakte/icons/dist/28/article_outline';

import TabbarItemLight from './TabbarItemLight.jsx';

export default class extends React.Component {
  constructor() {
    super();

    this.state = {
      tabbarItems: [
        {
          name: 'main',
          title: 'Главная',
          icon: <Icon28ArticleOutline />
        },
        // {
        //   name: 'add',
        //   title: 'Добавить',
        //   icon: <Icon28AddSquareOutline />
        // },
        // {
        //   name: 'profile',
        //   title: 'Профиль',
        //   icon: <Icon28Profile />
        // }
      ]
    };
  }

  render() {
    const { activeStory, changeStory } = this.props;
    const { tabbarItems } = this.state;

    return (
      <Tabbar>
        {tabbarItems.map((item) => (
          <TabbarItemLight
            key={item.name}
            name={item.name}
            title={item.title}
            icon={item.icon}
            activeStory={activeStory}
            changeStory={changeStory}
          />
        ))}
      </Tabbar>
    );
  }
}
