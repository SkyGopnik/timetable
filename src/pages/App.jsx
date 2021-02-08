import React from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
  ConfigProvider,
  Epic,
  Root
} from '@vkontakte/vkui';

/*
  View
*/
import MainView from '../views/Main.jsx';

/*
  Компоненты
*/
import TabbarLight from '../components/TabbarLight.jsx';

/*
  Функции
*/
import queryGet from '../functions/query_get.jsx';
import isset from '../functions/isset.jsx';
import unixTime from '../functions/unixtime.jsx';

import './App.scss';

let isExit = false;
let historyDelay = Number(new Date().getTime() / 1000);

export default class extends React.Component {
  constructor() {
    super();

    this.state = {
      active: {
        story: 'main',
        panel: 'main'
      },
      activeView: 'app',
      scheme: 'bright_light'
    };

    this.onStoryChange = this.onStoryChange.bind(this);
    this.onPanelChange = this.onPanelChange.bind(this);
    this.onStoryAndPanelChange = this.onStoryAndPanelChange.bind(this);
    this.menu = this.menu.bind(this);
  }

  componentDidMount() {
    const { active } = this.state;

    // Навешиваем обработчик кнопку вперёд/назад
    window.addEventListener('popstate', (e) => {
      // Отменяем стандартное событие
      e.preventDefault();
      // Выполняем наш переход внутри приложения
      this.menu(e);
    });

    // Обновляем историю переходов (Ставим начальную страницу)
    this.updateHistory(active.story, active.panel);

    if (queryGet('platform') === 'vk') {
      bridge.subscribe(({ detail: { type, data } }) => {
        if (type === 'VKWebAppUpdateConfig') {
          let scheme = 'bright_light';

          if (data.scheme === 'bright_light' || data.scheme === 'client_light') {
            scheme = 'bright_light';
          } else if (data.scheme === 'client_dark' || data.scheme === 'space_gray') {
            scheme = 'space_gray';
          }

          const schemeArray = {
            'bright_light': {
              status: 'dark',
              color: '#ffffff'
            },
            'space_gray': {
              status: 'light',
              color: '#19191a'
            }
          };

          bridge.sendPromise(
            'VKWebAppSetViewSettings',
            {
              'status_bar_style': schemeArray[scheme].status,
              'action_bar_color': schemeArray[scheme].color
            }
          );

          this.setState({
            scheme: scheme
          });
        }

        if (type === 'VKWebAppViewRestore') {
          isExit = false;
        }
      });
    }

    // Init VK Mini App
    bridge.send('VKWebAppInit');
  }

  onStoryChange(e) {
    const { active } = this.state;

    // Id нужного View
    const id = e.currentTarget.dataset.story;

    if (
      id !== active.panel
      && (
        id === 'main'
      )
    ) {
      // Поднимаем контент вверх
      window.scroll({ top: 0 });
    }

    // Проверяем на Tap to top
    if (id !== active.panel) {
      // Обновляем историю переходов
      this.updateHistory(id, id);

      // Устанавливаем новый View
      this.setState({
        active: {
          story: id,
          panel: id
        }
      });
    } else {
      // Поднимаем контент вверх
      window.scroll({ top: 0, behavior: 'smooth' });
    }
  }

  onPanelChange(e, panel, data) {
    const { active } = this.state;
    const panelName = e ? e.currentTarget.dataset.to : panel;
    const panelData = e ? (
      isset(e.currentTarget.dataset.params) && e.currentTarget.dataset.params
    ) : data;

    if (active.panel !== panelName) {
      // Обновляем историю переходов
      this.updateHistory(active.story, panelName, JSON.parse(panelData));

      // Устанавливаем новую панель
      this.setState({
        active: {
          story: active.story,
          panel: panelName
        }
      });
    }
  }

  onStoryAndPanelChange(story, panel, data) {
    // Обновляем историю переходов
    this.updateHistory(story, panel, data);

    if (
      story === 'main'
    ) {
      // Поднимаем контент вверх
      window.scroll({ top: 0 });
    }

    // Устанавливаем новую панель
    this.setState({
      active: {
        story: story,
        panel: panel
      }
    });
  }

  updateHistory(s, p, panelData) {
    // Записываем новое значение истории переходов
    window.history.pushState({ story: s, panel: p, data: panelData && panelData }, `${s}/${p}`);
  }

  menu(e) {
    // Если история переходов существует
    if (e.state) {
      const { story, panel, data } = e.state;

      if (historyDelay < unixTime()) {
        // Обновляем блокировку
        historyDelay = unixTime() + 1;

        // Снимаем блокировку скрола у body
        const body = document.getElementsByTagName('body')[0];
        body.style.overflowY = 'scroll';

        const newData = { ...data };
        newData.isBack = true;

        // Устанавливаем новые значения для View и Panel
        this.setState({
          active: {
            story: story,
            panel: panel
          }
        });
      } else {
        this.updateHistory(story, panel, data);
      }
    } else {
      this.updateHistory('main', 'main');

      this.setState({
        active: {
          story: 'main',
          panel: 'main'
        }
      });

      if (!isExit) {
        isExit = true;
        bridge.sendPromise('VKWebAppClose', {
          'status': 'success', 'text': 'Ждём Вас снова! :3'
        });
      }
    }
  }

  render() {
    const {
      active,
      activeView,
      scheme
    } = this.state;

    return (
      <ConfigProvider scheme={scheme}>
        <Root activeView={activeView}>
          <Epic
            id="app"
            activeStory={active.story}
            tabbar={
              <TabbarLight
                activeStory={active.story}
                changeStory={this.onStoryChange}
              />
            }
          >
            <MainView
              id="main"
              active={active}
            />
          </Epic>
        </Root>
      </ConfigProvider>
    );
  }
}
