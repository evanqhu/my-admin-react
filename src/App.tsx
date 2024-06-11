/** App 根组件 */
import { memo } from 'react';

// 引入路由分发组件
import Router from '@/router';

const App = memo(() => {
  return (
    <div id='app' className='flx-center'>
      <Router />
    </div>
  );
});

export default App;
