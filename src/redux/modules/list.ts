/** list reducer */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ContractListReq } from '@/api/interfaces/list';
import { getContractList } from '@/api/modules/list';
import { RootState } from '@/redux';
import { ListState } from '@/redux/interfaces';

// 1️⃣ 定义命名空间
const namespace = 'list';

// 2️⃣ 定义初始状态
const initialState: ListState = {
  loading: false,
  test: true,
  contractList: [],
  current: 1,
  pageSize: 10,
  total: 0,
};

// 3️⃣ 创建异步 action
export const getList = createAsyncThunk(`${namespace}/getList`, async (payload: ContractListReq) => {
  const result = await getContractList(payload);
  return {
    list: result?.list,
    pageSize: payload.pageSize,
    current: payload.current,
  };
});
// 可以使用 extraReducers 修改状态，也可以触发一个同步任务来修改状态
// thunkAPI 内部提供了dispatch方法，可以触发其他的同步 action
// (payload, thunkAPI) => {
//   getRegionPopulation(payload).then((res) => {
//     thunkAPI.dispatch(setTodos(res.data));
//   });
// };

// 4️⃣ 创建带有命名空间的 slice (状态切片)
// 一个 slice 是指一个包含了一部分状态（state）、对应的 reducer 和 action creators (自动生成)的逻辑单元
// 例如 dispatch(toggleMenu(true)); 这里的 toggleMenu(true) 就是一个action creator 函数，调用后会生成 action 对象
// 它会自动生成一个动作对象，type 为 namespace/toggleMenu， payload 为 true
const { actions, reducer } = createSlice({
  name: namespace, // 作为 action 对象中 type 属性值的前缀
  initialState,
  reducers: {
    clearListState: () => initialState,
  },
  // 处理其他 slice 或全局 action 触发的状态更新。它的作用在于能够在当前 slice 中处理不属于当前 slice 定义的 action
  // 还可以处理异步操作
  extraReducers: (builder) => {
    builder
      .addCase(getList.pending, (state: ListState) => {
        state.loading = true;
      })
      .addCase(getList.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.contractList = payload?.list ?? [];
        state.pageSize = payload?.pageSize;
        state.current = payload?.current;
      })
      .addCase(getList.rejected, (state) => {
        state.loading = false;
      });
  },
});

// 5️⃣ 定义一个 selector 函数，作为 useSelector 钩子的参数，用于从 Redux store 中获取特定部分的 state
// 相当于 mapStateToProps
export const selectList = (state: RootState) => state.list;

// 6️⃣ 对外暴露 action creator 函数；自动创建，无需手动书写
export const { clearListState } = actions;

// 7️⃣ 默认对外暴露 reducer
export default reducer;
