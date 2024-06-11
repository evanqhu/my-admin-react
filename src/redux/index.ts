/** 定义 redux 状态管理器 */
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// 1️⃣ 引入各个 slice (store) 模块
import global from './modules/global';
import list from './modules/list';

// 2️⃣ 创建全局 store
const store = configureStore({
  reducer: {
    global,
    list,
  },
});

// 3️⃣ 定义全局 store 的类型
// store.getState 是一个函数，用于获取当前的状态树，调用它时可以查询到全局的 state 状态
// 在 JS 中，typeof 用来获取一个值的类型的字符串表示。但在 TS 中 typeof 主要用于类型查询，用来获取变量、属性或表达式的类型信息
// ReturnType 是 TypeScript 中的一个内置工具类型。它接受一个函数作为参数，并返回该函数的返回值类型
export type RootState = ReturnType<typeof store.getState>;

// 4️⃣ 定义全局 dispatch 函数的类型（函数类型）
export type AppDispatch = typeof store.dispatch;

// 5️⃣ 定义一个自定义 hook，相当于对原生的 useSelector 完成包装，用于获取 store.state 状态
// useSelector 是 redux 中用于获取 state 状态的钩子
// useSelector 可以在组件中调用，并返回当前组件对应的 state 状态
// TypedUseSelectorHook<RootState> 是一个 TS 的类型定义
// 在组件中调用 useSelector，返回的值就是一个 state 状态对象，可以直接访问 state 中的数据
// 在组件中调用 useSelector，并传递一个参数，这个参数是一个 selector 函数，如 selectGlobal
// export const selectGlobal = (state: RootState) => state.global;
// const { theme, color } = useAppSelector(selectGlobal);
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// 6️⃣ 定义一个自定义 hook，相当于对原生的 useDispatch 包装了一下，用于获取 store.dispatch 方法
// useDispatch 是 redux 中用于获取 redux 的 dispatch 方法的钩子
// const dispatch = useAppDispatch(); 这样就可以获取到 redux 的 dispatch 方法了
export const useAppDispatch = () => useDispatch<AppDispatch>();

// 8️⃣ 默认对外暴露 store
export default store;
