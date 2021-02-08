import React from 'react';

/*
  Панели
*/
import MainPanel from '../panels/Main/Main.jsx';

// Компоненты
import ViewLight from '../components/ViewLight.jsx';

export default class extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { id, active } = this.props;

    return (
      <ViewLight
        id={id}
        activePanel={active.panel}
        panelList={[
          {
            id: 'main',
            component: MainPanel
          }
        ]}
      />
    );
  }
}
