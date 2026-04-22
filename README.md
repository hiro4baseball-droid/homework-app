# 宿題提出管理アプリ

中学校の先生向け、宿題の提出状況を管理するWebアプリです。

## 機能
- 宿題の追加・削除
- 生徒ごとの提出済み・未提出の管理
- 提出率のリアルタイム表示
- 科目フィルター

## ローカルで動かす方法

```bash
# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

ブラウザで http://localhost:5173 を開く。

## デプロイ方法（GitHub + Vercel）

1. GitHubにリポジトリを作成してプッシュ
2. Vercel (vercel.com) にログイン
3. 「Add New Project」→ GitHubリポジトリを選択
4. 設定はそのままで「Deploy」をクリック

以上で自動デプロイ完了！
