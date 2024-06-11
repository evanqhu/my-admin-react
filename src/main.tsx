/** 入口文件 */
import '@/styles/main.less';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // 连接 store 和整个 react 应用
import { BrowserRouter } from 'react-router-dom';

import App from '@/App';
import store from '@/redux'; // redux store

// 暗黑模式
// document.documentElement.setAttribute('theme-mode', 'dark');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
);
