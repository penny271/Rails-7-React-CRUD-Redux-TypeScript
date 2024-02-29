// frontend/src/features/posts/postSlice.tsx

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// ! すでに使用されているため不要
import produce from "immer";
import { RootState } from "../../app/store";
import { fetchPosts, createPost, destroyPost, updatePost } from "./postAPI";

// * enum
export enum Statuses {
  Initial = "Not Fetched",
  Loading = "Loading...",
  UpToDate = "Up To Date",
  Deleted = "Deleted",
  Error = "Error",
}

// * create時は、idがないためオプショナルにしている
export interface PostFormData {
  post: {
    id?: string;
    title: string;
    body: string;
  };
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

export interface PostUpdateData {
  post_id: number;
  post: PostState;
}

export interface PostDeleteData {
  post: {
    post_id: number;
  };
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

// get all posts
export const fetchPostAsync = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetchPosts();
  return response;
});

// create
export const createPostAsync = createAsyncThunk(
  "posts/createPost",
  async (payload: PostFormData) => {
    const response = await createPost(payload);
    return response;
  }
);

export const destroyPostAsync = createAsyncThunk(
  "posts/destroyPost",
  async (payload: PostDeleteData) => {
    const response = await destroyPost(payload);
    return response;
  }
);

export const updatePostAsync = createAsyncThunk(
  "post/updatePost",
  async (payload: PostFormData) => {
    const response = await updatePost(payload);

    return response;
  }
);

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
    // Create Section
    builder.addCase(createPostAsync.pending, (state) => {
      return produce(state, (draftState) => {
        draftState.status = Statuses.Loading;
      });
    });
    builder.addCase(createPostAsync.fulfilled, (state, action) => {
      return produce(state, (draftState) => {
        draftState.posts.push(action.payload);
        draftState.status = Statuses.UpToDate;
      });
    });
    builder.addCase(createPostAsync.rejected, (state) => {
      return produce(state, (draftState) => {
        draftState.status = Statuses.Error;
      });
    });
    // Update Section
    builder.addCase(updatePostAsync.pending, (state) => {
      return produce(state, (draftState) => {
        draftState.status = Statuses.Loading;
      });
    });
    // DBを更新したあと、stateの状態も更新する
    builder.addCase(updatePostAsync.fulfilled, (state, action) => {
      return produce(state, (draftState) => {
        const index = draftState.posts.findIndex(
          (post) => post.id == action.payload.id
        );
        draftState.posts[index] = action.payload;
        draftState.status = Statuses.UpToDate;
      });
    });
    builder.addCase(updatePostAsync.rejected, (state) => {
      return produce(state, (draftState) => {
        draftState.status = Statuses.Error;
      });
    });
    // Destroy Section
    builder.addCase(destroyPostAsync.pending, (state) => {
      return produce(state, (draftState) => {
        draftState.status = Statuses.Loading;
      });
    });
    builder.addCase(destroyPostAsync.fulfilled, (state, action) => {
      return produce(state, (draftState) => {
        draftState.posts = action.payload;
        draftState.status = Statuses.UpToDate;
      });
    });
    builder.addCase(destroyPostAsync.rejected, (state) => {
      return produce(state, (draftState) => {
        draftState.status = Statuses.Error;
      });
    });
    // Edit Section
    // builder.addCase(destroyPostAsync.pending, (state) => {
    //   return produce(state, (draftState) => {
    //     draftState.status = Statuses.Loading;
    //   });
    // });
    // builder.addCase(destroyPostAsync.fulfilled, (state, action) => {
    //   return produce(state, (draftState) => {
    //     draftState.posts = action.payload;
    //     draftState.status = Statuses.UpToDate;
    //   });
    // });
    // builder.addCase(destroyPostAsync.rejected, (state) => {
    //   return produce(state, (draftState) => {
    //     draftState.status = Statuses.Error;
    //   });
    // });
  },
});

export const {} = postSlice.actions;

// - ここで、state.postsは、ストアの設定方法によってpostReducerが管理するステートスライスを指します。このスライスの内部では、postsプロパティとstatusプロパティ（他のプロパティの可能性もあります）を持つようにステートを構成しています。したがって、state.posts.postsはこのスライス内のpostsの配列を指し、state.posts.statusは loading ステータスを指します。
export const selectPosts = (state: RootState) => state.posts.posts;
export const selectStatus = (state: RootState) => state.posts.status;

export default postSlice.reducer;
