## プロジェクト作成
`rails new rails-react-crud`

## プロジェクト起動
`rails s`
` ./bin/dev | awk -F'|' '{print $2}'`

## scaffold作成 models, migrate, controller, views, test, routes, helper, assets関連のフォルダ、ファイル作成
`rails g scaffold post title:string body:text`

## rack-cors を gemfileに追加
`bundle add rack-cors`

## migrate
`rails db:migrate`

## フロントエンド作成 ※redux-toolkitは自動で入っている
`npx create-react-app frontend --template redux-typescript`

## フロントエンド起動
`cd frontend`
`npm start`

## posts一覧確認
`http://localhost:3000/posts.json`

