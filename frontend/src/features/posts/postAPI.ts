// frontend/src/features/posts/postAPI.tsx

import { PostDeleteData, PostFormData, PostState } from "./postSlice";

const API_URL = "http://localhost:3000";
console.log("object :>> ", `${API_URL}/posts.json`);

export async function fetchPosts() {
  return fetch(`${API_URL}/posts.json`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("error(get) :>> ", error);
      return {} as PostState;
    });
}

// create post
export async function createPost(payload: PostFormData) {
  const post = payload.post;
  return fetch(`${API_URL}/posts.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ post }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("error(create) :>> ", error);
      return {} as PostState;
    });
}

// update post
export async function updatePost(payload: PostFormData) {
  const post = payload.post;
  return fetch(`${API_URL}/posts/${post.id}.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ post }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("error(update) :>> ", error);
      return {} as PostState;
    });
}

// destroy post
export async function destroyPost(payload: PostDeleteData) {
  const post = payload.post;
  // * Reactアプリから${API_URL}/posts/${post.post_id}.jsonのようなフェッチリクエストを行うと、Railsバックエンドに伝えていることになります：

  // * リクエストをPostsControllerのshowアクションにルーティングする（/posts/${post.post_id}のため）.jsonがあるので）JSONレスポンスを期待する

  // * コントローラのアクションがリクエストを処理し、Railsは対応するJbuilderファイル（show.json.jbuilder）を使用して、コントローラから提供されたデータに基づいてJSONレスポンスを構築します。

  //  *このように、viewsディレクトリにあるJbuilderテンプレートは、特定のURLに対するJSONレスポンスの提供に関連しています。
  return fetch(`${API_URL}/posts/${post.post_id}.json`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ post }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("error(delete) :>> ", error);
      return {} as PostState;
    });
}
