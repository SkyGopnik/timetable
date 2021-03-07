import React from 'react';
import {
  Panel,
  PanelHeader,
  PanelHeaderContext,
  PanelHeaderContent,
  Group,
  Cell,
  List,
  Tabs,
  TabsItem,
  InfoRow,
  SimpleCell,
  HorizontalScroll
} from '@vkontakte/vkui';

import { Swipeable } from 'react-swipeable';

import Icon16Dropdown from '@vkontakte/icons/dist/16/dropdown';

import Icon24Done from '@vkontakte/icons/dist/24/done';

import isset from '../../functions/isset.jsx';

import './Main.scss';

export default class extends React.Component {
  constructor() {
    super();

    this.state = {
      contextOpened: false,
      type: 'up',
      days: {
        monday: 'Понедельник',
        tuesday: 'Вторник',
        wednesday: 'Среда',
        thursday: 'Четверг',
        friday: 'Пятница'
      },
      subjects: {
        up: {
          monday: {
            building: 'Основное',
            list: [
              {
                number: 0,
                name: 'Ин.яз',
                teacher: '2 п/г'
              },
              {
                number: 1,
                name: 'ТВиМС',
                teacher: 'Ковалевский А.Б.'
              },
              {
                number: 2,
                name: 'ТВиМС',
                teacher: 'Ковалевский А.Б.'
              }
            ]
          },
          tuesday: {
            building: 'Основное',
            list: [
              {
                number: 1,
                name: 'Численные методы',
                teacher: 'Ерёмин М.Ю.',
                cabinet: 303
              },
              {
                number: 2,
                name: 'ТРПО',
                teacher: 'Митрошенкова Е.А.',
                cabinet: 417
              },
              {
                number: 3,
                name: 'Психология общения',
                teacher: 'Мягкова Н.Н.',
                cabinet: 210
              }
            ]
          },
          wednesday: {
            building: 'Основное',
            list: [
              {
                number: 0,
                name: 'Психология общения',
                teacher: 'Мягкова Н.Н.',
                cabinet: 210
              },
              {
                number: 1,
                name: 'ТРиЗ БД',
                teacher: 'Осипова Н.М.',
                cabinet: 122
              },
              {
                number: 2,
                name: 'ТРиЗ БД',
                teacher: 'Осипова Н.М.',
                cabinet: 122
              },
              {
                number: 3,
                name: 'Физическая культура',
                teacher: 'Шлёпкина Т.Е.'
              }
            ]
          },
          thursday: {
            building: 'Основное',
            list: [
              {
                number: 0,
                name: 'Дисректная математика'
              },
              {
                number: 1,
                name: 'Дисректная математика'
              },
              {
                number: 2,
                name: 'Основы программирования',
                teacher: 'Тамахина И.А.'
              },
              {
                number: 3,
                name: 'Основы программирования',
                teacher: 'Тамахина И.А.'
              }
            ]
          },
          friday: {
            building: 'Основное',
            list: [
              {
                number: 0,
                name: 'ОСиС',
                teacher: 'Грушицын А.С.'
              },
              {
                number: 1,
                name: 'ОСиС',
                teacher: 'Грушицын А.С.'
              },
              {
                number: 2,
                name: 'Численные методы',
                teacher: 'Ерёмин М.Ю.',
                cabinet: 303
              },
              {
                number: 3,
                name: 'Англ.яз (1 п/г)'
              }
            ]
          }
        },
        down: {
          monday: {
            building: 'Основное',
            list: [
              {
                number: 0,
                name: 'Ин.яз',
                teacher: '2 п/г'
              },
              {
                number: 1,
                name: 'ТВиМС',
                teacher: 'Ковалевский А.Б.'
              },
              {
                number: 2,
                name: 'ТВиМС',
                teacher: 'Ковалевский А.Б.'
              }
            ]
          },
          tuesday: {
            building: 'Основное',
            list: [
              {
                number: 1,
                name: 'Численные методы',
                teacher: 'Ерёмин М.Ю.',
                cabinet: 303
              },
              {
                number: 2,
                name: 'ТРПО',
                teacher: 'Митрошенкова Е.А.',
                cabinet: 417
              },
              {
                number: 3,
                name: 'Психология общения',
                teacher: 'Мягкова Н.Н.',
                cabinet: 210
              }
            ]
          },
          wednesday: {
            building: 'Основное',
            list: [
              {
                number: 0,
                name: 'ТРиЗ БД',
                teacher: 'Осипова Н.М.',
                cabinet: 122
              },
              {
                number: 1,
                name: 'ТРиЗ БД',
                teacher: 'Осипова Н.М.',
                cabinet: 122
              },
              {
                number: 2,
                name: 'ТРиЗ БД',
                teacher: 'Осипова Н.М.',
                cabinet: 122
              },
              {
                number: 3,
                name: 'Физическая культура',
                teacher: 'Шлёпкина Т.Е.'
              }
            ]
          },
          thursday: {
            building: 'Основное',
            list: [
              {
                number: 0,
                name: 'Дисректная математика'
              },
              {
                number: 1,
                name: 'Дисректная математика'
              },
              {
                number: 2,
                name: 'Основы программирования',
                teacher: 'Тамахина И.А.'
              },
              {
                number: 3,
                name: 'Основы программирования',
                teacher: 'Тамахина И.А.'
              }
            ]
          },
          friday: {
            building: 'Основное',
            list: [
              {
                number: 0,
                name: 'ОСиС',
                teacher: 'Грушицын А.С.'
              },
              {
                number: 1,
                name: 'ОСиС',
                teacher: 'Грушицын А.С.'
              },
              {
                number: 2,
                name: 'Численные методы',
                teacher: 'Ерёмин М.Ю.',
                cabinet: 303
              },
              {
                number: 3,
                name: 'Англ.яз (1 п/г)'
              }
            ]
          }
        }
      },
      currentDay: 'monday',
      time: ['9:00 - 10:30', '10:40 - 12:10', '12:40 - 14:00', '14:30 - 16:00']
    };

    this.toggleContext = this.toggleContext.bind(this);
    this.selectType = this.selectType.bind(this);
    this.swipe = this.swipe.bind(this);
  }

  toggleContext() {
    const { contextOpened } = this.state;

    this.setState({ contextOpened: !contextOpened });
  }

  selectType(e) {
    const type = e.currentTarget.dataset.mode;
    this.setState({ type: type });
    requestAnimationFrame(this.toggleContext);
  }

  swipe(type) {
    const { days, currentDay } = this.state;
    const daysKeys = Object.keys(days);

    const findCurrentDayIndex = daysKeys.indexOf(currentDay);

    let nextDay;

    if (type === 'left') {
      nextDay = isset(daysKeys[findCurrentDayIndex + 1]) ? (
        daysKeys[findCurrentDayIndex + 1]
      ) : 'monday';
    } else {
      nextDay = isset(daysKeys[findCurrentDayIndex - 1]) ? (
        daysKeys[findCurrentDayIndex - 1]
      ) : 'friday';
    }

    this.setState({
      currentDay: nextDay
    });
  }

  render() {
    const { id } = this.props;
    const {
      contextOpened,
      type,
      days,
      subjects,
      currentDay,
      time
    } = this.state;

    return (
      <Panel id={id}>
        <PanelHeader separator={false}>
          <PanelHeaderContent
            aside={<Icon16Dropdown style={{ transform: `rotate(${contextOpened ? '180deg' : '0'})` }} />}
            onClick={this.toggleContext}
          >
            {type === 'up' && 'Верхняя неделя'}
            {type === 'down' && 'Нижняя неделя'}
          </PanelHeaderContent>
        </PanelHeader>
        <PanelHeaderContext opened={contextOpened} onClose={this.toggleContext}>
          <List>
            <Cell
              asideContent={type === 'up' ? <Icon24Done fill="var(--accent)" /> : null}
              onClick={this.selectType}
              data-mode="up"
            >
              Верхняя неделя
            </Cell>
            <Cell
              asideContent={type === 'down' ? <Icon24Done fill="var(--accent)" /> : null}
              onClick={this.selectType}
              data-mode="down"
            >
              Нижняя неделя
            </Cell>
          </List>
        </PanelHeaderContext>
        <Tabs>
          <HorizontalScroll>
            {Object.keys(days).map((name, index) => (
              <TabsItem
                key={`day-tab-${index}`}
                onClick={() => this.setState({ currentDay: name })}
                selected={currentDay === name}
              >
                {days[name]}
              </TabsItem>
            ))}
          </HorizontalScroll>
        </Tabs>

        <Swipeable
          className="tabs-swiper"
          onSwipedLeft={() => this.swipe('left')}
          onSwipedRight={() => this.swipe('right')}
        >
          <Group>
            <SimpleCell disabled>
              <InfoRow header="Здание">
                {subjects[type][currentDay].building}
              </InfoRow>
            </SimpleCell>
            <SimpleCell disabled>
              <InfoRow header="Начало дня">
                {time[subjects[type][currentDay].list[0].number].split('-')[0]}
              </InfoRow>
            </SimpleCell>
          </Group>
          <Group>
            {subjects[type][currentDay].list.map((subject, subjectIndex) => (
              <Cell
                key={`subject-${subjectIndex}`}
                indicator={time[subject.number]}
                description={
                  <div>
                    {subject.teacher && <div>Преподаватель: {subject.teacher}</div>}
                    {subject.cabinet && <div>Кабинет: {subject.cabinet}</div>}
                  </div>
                }
                multiline
              >
                {subject.name}
              </Cell>
            ))}
          </Group>
        </Swipeable>
      </Panel>
    );
  }
}
