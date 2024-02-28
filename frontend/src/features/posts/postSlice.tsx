// frontend/src/features/posts/postSlice.tsx

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// ! すでに使用されているため不要
import produce from "immer";
import { RootState } from "../../app/store";
import { fetchPosts } from "./postAPI";

// * enum
export enum Statuses {
  Initial = "Not Fetched",
  Loading = "Loading...",
  UpToDate = "Up To Date",
  Deleted = "Deleted",
  Error = "Error",
}

// DBから取得される値の型
export interface PostState {
  id?: number;
  title?: string;
  body?: string;
  created_at?: any;
  updated_at?: any;
}

export interface PostsState {
  posts: PostState[];
  status: string;
}

const initialState: PostsState = {
  posts: [
    {
      id: 0,
      title: "",
      body: "",
      created_at: "",
      updated_at: "",
    },
  ],
  status: Statuses.Initial,
};

export const fetchPostAsync = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetchPosts();
  return response;
});

export const postSlice = createSlice({
  name: "posts",
  initialState,
  // 同期処理
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPostAsync.pending, (state) => {
      return produce(state, (draftState) => {
        draftState.status = Statuses.Loading;
      });
    });
    builder.addCase(fetchPostAsync.fulfilled, (state, action) => {
      return produce(state, (draftState) => {
        draftState.posts = action.payload;
        draftState.status = Statuses.UpToDate;
      });
    });
    builder.addCase(fetchPostAsync.rejected, (state) => {
      return produce(state, (draftState) => {
        draftState.status = Statuses.Error;
      });
    });
  },
});

export const {} = postSlice.actions;

// - ここで、state.postsは、ストアの設定方法によってpostReducerが管理するステートスライスを指します。このスライスの内部では、postsプロパティとstatusプロパティ（他のプロパティの可能性もあります）を持つようにステートを構成しています。したがって、state.posts.postsはこのスライス内のpostsの配列を指し、state.posts.statusは loading ステータスを指します。
export const selectPosts = (state: RootState) => state.posts.posts;
export const selectStatus = (state: RootState) => state.posts.status;

export default postSlice.reducer;
