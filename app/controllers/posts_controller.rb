# app/controllers/posts_controller.rb

class PostsController < ApplicationController
  before_action :set_post, only: %i[ show edit update destroy ]
  # skip
  skip_before_action :verify_authenticity_token

  # GET /posts or /posts.json
  def index
    @posts = Post.all
  end

  # GET /posts/1 or /posts/1.json
  def show
  end

  # GET /posts/new
  def new
    @post = Post.new
  end

  # GET /posts/1/edit
  def edit
  end

  # POST /posts or /posts.json
  def create
    @post = Post.new(post_params)

    respond_to do |format|
      if @post.save
        format.html { redirect_to post_url(@post), notice: "Post was successfully created." }
        # * この行は、リクエストのフォーマットがJSONの場合に実行されます。各パートの意味は以下の通り：
        # * render :show： JSONや特定のビューを直接レンダリングする代わりに、PostsControllerのshowビューをレンダリングするようRailsに指示します。JSON形式のコンテキストでは、これは通常、Railsがviews/postsディレクトリにあるshow.json.jbuilderファイルを探してJSONレスポンスを構築することを意味します。このJbuilderファイルは、 post データをJSONでどのようにフォーマットするかを定義します。
        # * status: :created： これは、リソースの作成に成功したことを示す標準的なコードです。これは、ウェブ開発で使用されるRESTfulな規約の一部です。
        # * ロケーションを指定します： post： HTTPレスポンスに、新しく作成された post のURLを示すLocationヘッダーを追加します。これもRESTful規約の一部で、新しく作成されたリソースがどこにあるかを示します。
        format.json { render :show, status: :created, location: @post }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /posts/1 or /posts/1.json
  def update
    respond_to do |format|
      if @post.update(post_params)
        format.html { redirect_to post_url(@post), notice: "Post was successfully updated." }
        format.json { render :show, status: :ok, location: @post }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /posts/1 or /posts/1.json
  def destroy
    @post.destroy

    # * response_toは、リクエストの形式に応じて異なるレスポンスを指定するためのRailsメソッドです。これは、複数の形式（HTMLとJSONなど）でレスポンスを提供するアプリケーションで特に役立ちます。
    respond_to do |format|
      format.html { redirect_to posts_url, notice: "Post was successfully destroyed." }
      format.json { render json: Post.all, status: :ok }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.require(:post).permit(:title, :body, :id)
    end
end

# * JSON レスポンスに Jbuilder を使用する標準的な Rails アプリケーションでは、 Jbuilder ファイルは通常コントローラのアクションに応じた名前で、 views フォルダの下のコントローラ名と同じディレクトリに配置されます。PostsController の場合、Jbuilder ファイルは app/views/posts/ に配置されます。各コントローラのアクションの一般的な対応は以下のとおりです：

# * Index Action (index):
# * ファイル: app/views/posts/index.json.jbuilder
# * このファイルは、通常/postsまたは/posts.jsonへのGETリクエストによってindexアクションにアクセスするときに使用されます。通常、すべてのpostをJSON形式でレンダリングするコードが含まれています。

# * Show Action (show)：
# * ファイル: app/views/posts/show.json.jbuilder
# * このファイルは、通常/posts/:idまたは/posts/:id.jsonへのGETリクエストによってshowアクションにアクセスするときに使用されます。このファイルには通常、単一のpostをJSON形式でレンダリングするコードが含まれています。

# * Create Action (create):
# * createアクション自体はJbuilderファイルを直接使用しませんが、作成に成功すると、通常はshowアクションにリダイレクトされるか、showテンプレートがレンダリングされます。

# * Uppdate Action (update):
# * createアクションと同様に、updateアクション自体はJbuilderファイルを直接使用しません。しかし、アップデートに成功すると、通常、JSONレスポンス用のshowテンプレートをレンダリングします。つまり、app/views/posts/show.json.jbuilderが使用されます。

# * Destroy Action (destroy):
# * destroyアクションはステータスコードを返すだけなので、通常は専用のJbuilderファイルを持たないかもしれません。しかし、特定のコントローラコードでは、postが破棄された後、すべてのpostをJSON形式でレンダリングします。つまり、index Jbuilderテンプレート：app/views/posts/index.json.jbuilderを使用します。
