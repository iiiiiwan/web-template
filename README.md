<br>

各案件について

<br>

> ほげほげ。

<br>
---
<br>

ビルド環境

<br>

| Module         | Version  |
|----------------|----------|
| node.js        | 4.2.1    |
| gulp [ CLI ]   | 3.9.0    |
| gulp [ LOCAL ] | 3.9.0    |

<br>

| Command      | Detail                            |
|--------------|-----------------------------------|
| gulp         | ローカル環境用のビルドコマンド              |
| gulp publish | 納品用のビルドコマンド                   |

<br>

| Task       | Command                   | Detail                            |
|------------|---------------------------|-----------------------------------|
| concat     | gulp modern_jslibs_concat | 共通ライブラリ(libs.js)を生成           |
| concat     | gulp legacy_jslibs_concat | IE8用ライブラリ(legacy.libs.js)を生成   |
| jade       | gulp jade                 | .htmlファイルを生成                    |
| browserify | gulp browserify           | .jsファイルを生成                      |
| refine     | gulp refine               | .jsファイルからコメント、consoleを削除      |
| sass       | gulp sass                 | .cssファイルを生成                    |
| sprite     | gulp sprite               | スプライト画像とスプライト用scssファイルを生成  |
| imagemin   | gulp imagemin             | 画像を圧縮                          |
| watch      | gulp watch                | 各資源の変更監視                     |
| docs       | gulp docs                 | .jsファイル用ドキュメントを生成            |

<br>
---
<br>