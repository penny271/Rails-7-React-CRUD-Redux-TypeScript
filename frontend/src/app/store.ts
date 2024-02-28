import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
// * import
import postReducer from "../features/posts/postSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postReducer,
  },
});

// * reduxでは、ステートは通常、各スライスリデューサーがグローバルステートの自身の一部を管理するような構造になっています。例えば、Reduxのステートが次のような構造になっているとします：
// {
//   posts: {          // store.ts の reducer名
//     posts: [...],   // initialState の プロパティ名
//     status: '...'   // initialState の プロパティ名
//   },
//   // other slices...
// }

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
