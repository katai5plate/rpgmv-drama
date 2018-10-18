# ツクールMV専用プラグイン H2A-drama
文章の表示で使用する文章を、プラグインとして別ファイルに分けて管理します。

## Download
- [コンパイル版](https://raw.githubusercontent.com/katai5plate/rpgmv-drama/master/out/H2A_drama.safe.js)
- [コンパイル版・軽量](https://raw.githubusercontent.com/katai5plate/rpgmv-drama/master/out/H2A_drama.safe.min.js)
- [通常版](https://raw.githubusercontent.com/katai5plate/rpgmv-drama/master/src/H2A_drama.js)

## Usage
### 基本
1. プラグイン「H2A_drama」をONに設定する
2. そのプラグインの下に、文章専用に作ったプラグインを配置しONにする
3. 文章を表示したいタイミングで、`イベントコマンド:スクリプト` を使い以下のようなスクリプトを入力する
```js
drama.read("book名", page数);
```

### 文章専用プラグインの作成
1. 空の `*.js` ファイルを新規作成
2. 以下の雛形を使用して設定と文章を入力し、保存
```js
drama.chara({
  "ハロルド": ["Actor1", 0],
})

drama.write("book名", [
  [
    `> ハロルド
    これはテストメッセージです。
    ０ページ目です。`,
    `> 
    顔グラフィックなしの場合は
    １行目を「> 」だけにします`,
    `> ハロルド
    次のように長文を作ることもできます
    １
    ２
    ３
    ４
    ５`,
    `> ハロルド
    タグをつけるには\\c[6]こうします\\c[0]。`
  ],
  [
    `> ハロルド
    １ページ目です。`
  ],
  [
    `> ハロルド
    ２ページ目です。`
  ]
])
```

## 文章専用プラグインを１つのファイルに圧縮したい場合
- 上級者向け。
### わかる人向け手順
文章専用プラグインを src/books に置いて `gulp archive` するだけ。

### わからない人向け手順
0. 以下が入っていない場合はインストールする
```yml
- Node.js
- yarn
- gulp
- git
```
1. コマンドプロンプトかターミナルを開き、以下を行う
```bat
cd "任意の作業フォルダの絶対パス"
git clone https://github.com/katai5plate/rpgmv-drama.git
cd rpgmv-drama
yarn install
```
2. 作業フォルダの中にある `src` フォルダの中に `books` フォルダを作って、そこに圧縮したい文章専用プラグインを全部入れる
3. `1.` から使っているコマンドプロンプトかターミナルで以下を行う
```bat
yarn packing
```
4. out/booksフォルダに圧縮されたプラグインが出力されます
```bat
book-shelf.js
: 単純に結合したバージョン
book-shelf.safe.js
: 古いブラウザでも動くように変換したバージョン
book-shelf.safe.min.js
: 軽量化と難読化を最優先して古いブラウザでも動くように圧縮したバージョン
```

## References
### Scripts
#### start
- `yarn start` or `npm start`
- すべての主要機能が走ります。
#### build
- `yarn build` or `npm run build` or `gulp build`
- プラグインのコンパイルを行い out/ に出力します。
#### archive
- `yarn archive` or `npm run archive` or `gulp archive`
- src/books 内の js ファイルを結合・コンパイルし、 out/books に `book-shelf` として出力します。
#### build-all
- `gulp build-all`
- src/ 内のすべての js ファイルをコンパイルし out/ に出力します。

### Plug-in
- メタ: プラグイン内部で使用されるメソッド。
- 外部入力用: 文章専用プラグイン内での使用を推奨するメソッド。
- イベント用: スクリプトイベントコマンドでの使用を推奨するメソッド。
- `<...>` のように表記された引数は省略可能です。
#### `drama.define()`
- メタ
- プラグイン本体が読み込まれると最初に実行されます。
- グローバル変数に `drama` が無い場合、`drama` をグローバルに定義します。
#### `drama.chara({表示名: [ファイル名, 番号] })`
- 外部入力用
- 文章の 1 行目で指定したキーワードによって設定される顔グラフィックを定義します。
- 2 回以上実行された場合、過去の内容とマージされます。
- 入力例: ( `$$` による差分管理機能をそのうち実装予定 )
```
drama.chara({
  "アレックス": ["Face_Actor_Alex", 0],
  "アレックス$$喜": ["Face_Actor_Alex", 1],
  "アレックス$$怒": ["Face_Actor_Alex", 2],
  "アレックス$$哀": ["Face_Actor_Alex", 3],
  "アレックス$$楽": ["Face_Actor_Alex", 4],
})
drama.chara({
  "ブライアン": ["Face_Actor_Other", 1],
  "ゴメス": ["Face_Actor_Other", 2],
})
```
#### `drama.write(book名, [[message内容, ...], [page], ...])`
- 外部入力用
- `drama.read` で呼び出す事ができる文章を `本` として定義します。
  - book: 「オープニング」や「村人A」など くくり のようなものです。中に沢山の `page` を加えることができます。
  - page: 「１回目のイベント」や「薬草を持っている時」などの 段落 のようなものです。中に沢山の `message` を加えることができます。
  - message: 実際に文章の表示にて使用されるメッセージです。
- 同じ `book名` での再定義はできません。
  - エラーメッセージ: `The "..." book has already been booked.`
- messageは以下のように記述します。
```js
`> ここに顔グラフィック表示名$$差分管理名
１行目
２行目
３行目
４行目`
```
  - 顔グラフィックを指定する `> ` の後はスペースを必ず開けてください。
    - 顔グラフィックを省略する場合も、`> `を残してください。
  - 表示しきれない行は、改ページされます。
  - 各行の頭に空白が入っていると、その空白は無視されます。
  - タグを使用する場合 `\\c[6]` のように `\` を 2 つ使用します。
  - 末尾が以下のようになっている場合、空行とみなされます:
  ```js
  `> ここに顔グラフィック表示名$$差分管理名
  １行目
  ２行目
  ` // <-- 空行の３行目として扱われます
  ```
#### `drama.read(book名, page数, <[スライス開始, スライス終了]>)`
- イベント用
- 実行すると指定された `message` で `文章を表示` を行います。
- 第 3 引数のスライスを設定することで、指定の `page` から一部の `message` に絞ることができます。
  - 挙動は `String.prototype.slice` と同じです。
- 入力例:
```js
// book「opening」の 0 page目をすべて表示
drama.read("opening", 0);
// book「opening」の 5 page目の 0 ～ 2 番目を表示
// 使用例: 会話の途中に文章以外のイベントを挟む時など
drama.read("opening", 5, [0, 3]);
```
#### `drama.getBook(book名)`
- メタ
- 指定の `book名` の `book` を検索・取得します。
- 見つからなかった場合、空の配列が返ります。
