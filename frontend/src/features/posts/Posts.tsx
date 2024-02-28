// frontend/src/features/posts/Posts.tsx
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  Statuses,
  fetchPostAsync,
  selectPosts,
  selectStatus,
} from "./postSlice";
// import { useDispatch } from "react-redux";

// useAppDispatch

function Posts() {
  // * selectPosts = (state: RootState) => state.posts.posts;
  // * selectStatus = (state: RootState) => state.posts.status;
  const posts = useAppSelector(selectPosts);
  const status = useAppSelector(selectStatus);
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPostAsync());
  }, [dispatch]);

  let contents;

  if (status !== Statuses.UpToDate) {
    contents = <div>{status}</div>;
  } else {
    contents = (
      <div className="card">
        <div className="card-body">
          <h3>{status}</h3>
          {/* form goes here */}
          {posts &&
            posts.length > 0 &&
            posts.map((post) => {
              return (
                <div key={post.id} style={{ margin: "5em" }}>
                  <h3>{post.title}</h3>
                  <p>{post.body}</p>
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
