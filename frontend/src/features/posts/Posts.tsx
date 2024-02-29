// frontend/src/features/posts/Posts.tsx
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  Statuses,
  fetchPostAsync,
  selectPosts,
  selectStatus,
  updatePostAsync,
} from "./postSlice";
import Post from "./Post";
import PostForm from "./PostForm";
// import { useDispatch } from "react-redux";

// useAppDispatch

function Posts() {
  // * selectPosts = (state: RootState) => state.posts.posts;
  // * selectStatus = (state: RootState) => state.posts.status;
  const posts = useAppSelector(selectPosts);
  const status = useAppSelector(selectStatus);
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();

  // postの主キーのidを引数に設定する
  const [postToEdit, setPostToEdit] = useState(0);

  useEffect(() => {
    dispatch(fetchPostAsync());
  }, [dispatch]);

  function toggleEditForm(post_id?: number) {
    console.log('post_id :>> ', post_id);
    if (postToEdit === post_id) {
      setPostToEdit(0);
    } else {
      setPostToEdit(post_id as number);
    }
  }

  // DBを更新する
  function submitEdit(formData: any) {
    dispatch(updatePostAsync(formData));
    toggleEditForm();
  }

  let contents;

  if (status !== Statuses.UpToDate) {
    contents = <div>{status}</div>;
  } else {
    contents = (
      <div className="card">
        <div className="card-body">
          <h3>{status}</h3>
          <PostForm />
          {posts &&
            posts.length > 0 &&
            posts.map((post) => {
              return (
                <div key={post.id} style={{ margin: "5em" }}>
                  <Post
                    dispatch={dispatch}
                    post={post}
                    toggleEditForm={() => toggleEditForm(post.id)}
                    postToEdit={postToEdit}
                    submitEdit={submitEdit}
                  />
                </div>
              );
            })}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Posts</h1>
      {contents}
    </div>
  );
}

export default Posts;
