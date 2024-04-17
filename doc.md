---
marp: true
---

# Cloudflare Pages * hono(x) * microCMSで簡単なブログを作ってみた


---

![エビフライトライアングル](./generated_image.jpg) 

↑生成AIでさっきのタイトルを投げて画像を生成した

---

# Table of contents

- Cloudflare pages is 何
- hono is 何
- microCMS is 何
- 実装内容の紹介
- 所感

---

# Cloudflare pages is 何


- Cloudflare Pagesは、JAMstackアーキテクチャに基づいたWebサイトホスティングプラットフォームです。
- CloudflareのグローバルCDNネットワーク上で配信されるため、読み取り速度が早い
- デプロイがすごく簡単にできる
  - cloudflareの登録が終わっていたら、`bun run deploy`で数十秒で本番環境にデプロイされる
  - (今回は使ってないが)ブランチごとのステージング環境も自動で作ってくれる
- 無料枠がすごい

---
# Cloudflare pages is 何

## 無料枠がすごい

- 一度に1ビルド
- 500回のビルド/月
- 統合されたWeb分析
- 無制限、無料の管理者シート
- 無制限のサイト
- 無制限のリクエスト
- 無制限の帯域幅
- SSL通信（https 化）も無料
  - ただし、無料のドメインは .pages.dev

引用: https://qiita.com/tomy0610/items/f468650e3970bbac6cc0

---

# hono is 何 

- 日本製!!!
- Cloudflare workers向けに作られたweb framework
  - とはいえ、今はいろいろなランタイムで動くようになってます
    - Cloudflare Workers, Fastly Compute, Deno, Bun, Vercel, AWS Lambda, Lambda@Edge and Node.js.
- 型推論などがかなりいけてます
  - `/contents/:slug`のpathで`slug`のみがparamsの型定義に入っているとか
  - (今回は関係ないですが)ServerとClientで型を共有できるRPC modeがあるらしい
- nextjsみたいにfile base routingしてくれるhonoxを入れてみました
  - まだalpha status

--- 

# microCMS is 何

- 日本製headless CMS
- workpressの保存する部分のみを持っているみたいなやつ
- APIを簡単にスッと作れます
- 今回の使い方なら無料
  - 無制限のAPI呼び出し
  - 最大3名のメンバー
  - 最大3個のAPI

--- 

# 実装内容の紹介

## Repository

https://github.com/ningen/mini-blog

## サイト

https://mini-blog-bgw.pages.dev/

---

# 所感

- 雑に書くならこの構成は大分体験が良かったです
  - 単純なHTMLを返す && ドメインにこだわりが無ければcloudflare pagesはかなり有用な選択肢だと感じました
- デプロイがすごい、本当にすごい
- localでは`bun`を使って開発しました、`bun init`でtsconfig含めていい感じのものを吐き出してくれるので嬉しい
  - ざっ！とスクリプトを書くならbunが第一の選択肢になりました
    - nodeコマンドをbun に変えればだいたい動きます

--- 

# ありがとうございました!