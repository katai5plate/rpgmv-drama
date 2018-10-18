# ツクールMV専用プラグイン H2A-drama
文章の表示で使用する文章を、プラグインとして別ファイルに分けて管理します。

# Download
https://raw.githubusercontent.com/katai5plate/rpgmv-drama/master/src/H2A_drama.js

## Usage
### 基本
1. プラグイン「H2A-drama」をONに設定する
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

## 昔のブラウザでも動くようにしたい場合
コンパイルする必要があります。

0. 以下が入っていない場合はインストールする
```
・Node.js
・yarn
・gulp
・git
```
1. コマンドプロンプトかターミナルを開き、以下を行う
```cmd
cd "任意の作業フォルダの絶対パス"
git clone https://github.com/katai5plate/rpgmv-drama.git
cd rpgmv-drama
yarn install
yarn build
```
2. outフォルダにコンパイルされたプラグインが出力されます
```bat
H2A_drama.safe.js
: 可読性を残してコンパイルしたバージョン
H2A_drama.safe.min.js
: 軽量化を最優先してコンパイルしたバージョン
```
