import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

// Import scroll helper for safari
import mVKMiniAppsScrollHelper from '@vkontakte/mvk-mini-apps-scroll-helper';

// Главный файл
import App from '../pages/App.jsx';

// Стили VKUI
import '@vkontakte/vkui/dist/vkui.css';

// Use scroll helper
const root = document.getElementById('root');
mVKMiniAppsScrollHelper(root);

if (document.location.href) {
  axios.defaults.headers.common.user = document.location.href;
}

ReactDOM.render(
  React.createElement(App),
  root
);
