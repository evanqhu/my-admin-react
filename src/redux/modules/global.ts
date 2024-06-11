/** global reducer */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@/redux';
import { GlobalState } from '@/redux/interfaces';

// 1️⃣ 定义命名空间
const namespace = 'global';

// 2️⃣ 定义初始状态
const initialState: GlobalState = {
  collapsed: window.innerWidth < 1000, // 宽度小于1000 菜单闭合
};

// 3️⃣ 创建带有命名空间的 slice (状态切片)
// 一个 slice 是指一个包含了一部分状态（state）、对应的 reducer 和 action creators (自动生成)的逻辑单元
// 例如 dispatch(toggleMenu(true)); 这里的 toggleMenu(true) 就是一个action creator 函数，调用后会生成 action 对象
// 它会自动生成一个动作对象，type 为 namespace/toggleMenu， payload 为 true
// Redux Toolkit 将 slice 作为组织 Redux 逻辑的推荐方式。
const { actions, reducer } = createSlice({
  name: namespace, // 作为 action 对象中 type 属性值的前缀
  initialState,
  reducers: {
    // 折叠左侧菜单（PayloadAction<boolean | null>）用于定义 payload 的类型
    toggleMenu: (state: GlobalState, { payload }: PayloadAction<boolean | null>) => {
      if (payload === null) {
        state.collapsed = !state.collapsed;
      } else {
        state.collapsed = !!payload;
      }
    },

    // 测试载荷预处理功能
    // addTodo: {
    //   reducer(state, action) {
    //     state.push(action.payload);
    //   },
    //   prepare(payload) {
    //     return {
    //       payload: { title: payload.title, id: nanoid() },
    //     };
    //   },
    // },
  },
  // 处理其他 slice 或全局 action 触发的状态更新。它的作用在于能够在当前 slice 中处理不属于当前 slice 定义的 action
  // 还可以处理异步操作
});

// 4️⃣ 定义一个 selector 函数，作为 useSelector 钩子的参数，用于从 Redux store 中获取特定部分的 state
// 相当于 mapStateToProps
export const selectGlobal = (state: RootState) => state.global;

// 5️⃣ 对外暴露 action creator 函数；自动创建，无需手动书写
export const { toggleMenu } = actions;

// 6️⃣ 默认对外暴露 reducer
export default reducer;

// 举例说明 extraReducers
/*
// userSlice.js 用户 slice
const userSlice = createSlice({
  name: 'user',
  initialState: { isLoggedIn: false },
  reducers: {
    login: (state) => { state.isLoggedIn = true },
    logout: (state) => { state.isLoggedIn = false },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
 */

/*
// cartSlice.js 购物车 slice
import { login } from './userSlice'; // 导入 userSlice 中的 action

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addToCart: (state, action) => { state.items.push(action.payload) },
    removeFromCart: (state, action) => { state.items = state.items.filter(item => item.id !== action.payload) },
  },
  extraReducers: (builder) => {
    builder.addCase(login, (state) => {
      state.items = []; // 用户登录时清空购物车
    });
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
 */
