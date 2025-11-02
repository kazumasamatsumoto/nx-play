了解しました 👍
では、これまでの構築手順＋テスト確認方法もすべて含めた **完全版README追記** を以下にまとめました👇

---

## 📁 現在のフォルダ構成

```
my-fullstack-app/
├── apps/
│   ├── my-fullstack-app/     ← Angularフロントエンド（従来型）
│   ├── api/                  ← NestJSバックエンド
│   ├── shell/                ← マイクロフロントエンド（ホスト）
│   ├── user/                 ← マイクロフロントエンド（リモート：ユーザー機能）
│   └── product/              ← マイクロフロントエンド（リモート：製品機能）
├── libs/
│   └── shared-type/          ← 共通の型定義（インターフェースなど）
└── nx.json, package.json ...
```

---

## ✅ プロジェクト構築手順まとめ

### 1️⃣ Nxワークスペース作成（Angularを含む）

```bash
npx create-nx-workspace@latest my-fullstack-app --preset=angular
```

---

### 2️⃣ NestJSバックエンド追加

```bash
npx nx g @nx/nest:application apps/api
```

---

### 3️⃣ 共通型ライブラリの追加

```bash
npx nx g @nx/js:library libs/shared-type --importPath=@my-fullstack-app/shared-type
```

---

### 4️⃣ 共通型の定義

`libs/shared-type/src/index.ts`

```ts
export interface MessageResponse {
  message: string;
}
```

---

## 🔧 API側設定（NestJS）

### 5️⃣ 型の使用

`apps/api/src/app/app.service.ts`

```ts
import { Injectable } from '@nestjs/common';
import { MessageResponse } from '@my-fullstack-app/shared-type';

@Injectable()
export class AppService {
  getData(): MessageResponse {
    return { message: 'Hello from API ✅' };
  }
}
```

---

### 6️⃣ CORS設定を有効化

`apps/api/src/main.ts`

```ts
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 👇 Angularからの通信を許可
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
```

---

## 💻 フロントエンド設定（Angular）

### 7️⃣ API呼び出し

`apps/my-fullstack-app/src/app/app.ts`

```ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageResponse } from '@my-fullstack-app/shared-type';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  imports: [],
})
export class AppComponent implements OnInit {
  message = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<MessageResponse>('http://localhost:3000/api').subscribe({
      next: (res) => (this.message = res.message),
      error: (err) => console.error(err),
    });
  }
}
```

---

### 8️⃣ テンプレート修正

`apps/my-fullstack-app/src/app/app.html`

```html
<h1>{{ message }}</h1>
```

---

## 🚀 動作確認コマンド

```bash
# NestJS起動
npx nx serve api

# Angular起動
npx nx serve my-fullstack-app
```

ブラウザで
👉 [http://localhost:4200](http://localhost:4200)
を開くと、APIからのレスポンスが表示されれば成功！

---

## 🧩 プロジェクト一覧確認

```bash
npx nx show projects
```

出力例：

```
my-fullstack-app
my-fullstack-app-e2e
api
api-e2e
shared-type
```

---

## 🕸 依存関係グラフの可視化

```bash
npx nx graph
```

ブラウザが自動で開き、
`my-fullstack-app → shared-type → api`
の依存関係をグラフィカルに確認できます 🎨

---

## 🧪 テスト動作確認

### 各プロジェクトのテスト実行

```bash
# フロントエンド（Angular）
npx nx test my-fullstack-app

# バックエンド（NestJS）
npx nx test api

# 共通型ライブラリ
npx nx test shared-type
```

### すべてのテストを一括実行

```bash
npx nx run-many --target=test --all
```

### カバレッジ出力

```bash
npx nx test api --code-coverage
```

ブラウザで `coverage/apps/api/index.html` を開くと可視化できます。

### Watchモード

```bash
npx nx test shared-type --watch
```

---

## ✅ まとめ

これで Nx を使った
**Angular × NestJS × Shared Library** 構成が完全に稼働し、

* 型の共有
* CORS通信
* 依存グラフ可視化
* Jestテスト実行

まで網羅されています 💪🔥

---

## 🎯 マイクロフロントエンド構築手順

### Module Federationを使用したマイクロフロントエンドアーキテクチャの導入

Nx Angularの Module Federation 機能を使用して、shell（ホスト）、user、product（リモート）の3つのマイクロフロントエンドアプリケーションを構築しました。

### 9️⃣ マイクロフロントエンドアプリの作成

**実行したコマンド：**

Nx ジェネレーターUIを使用して、以下のオプションでホストアプリを作成：

```bash
# Nx ジェネレーターUIから実行
# @nx/angular:host ジェネレーターを使用
```

**設定内容：**
- **generatorName**: `@nx/angular:host`
- **name**: `shell`
- **directory**: `apps/shell`
- **style**: `scss`
- **remotes**: `["user", "product"]`
- **standalone**: `true`
- **unitTestRunner**: `jest`
- **e2eTestRunner**: `playwright`
- **linter**: `eslint`
- **strict**: `true`

**重要：** `remotes` オプションに `["user", "product"]` を指定することで、Nxが自動的に以下をすべて作成してくれます：

1. ✅ **shell** アプリ（ホスト）- `apps/shell/`
2. ✅ **user** アプリ（リモート）- `apps/user/`
3. ✅ **product** アプリ（リモート）- `apps/product/`
4. ✅ 各アプリのe2eテストプロジェクト
5. ✅ Module Federation設定ファイル（`module-federation.config.ts`）
6. ✅ Webpack設定ファイル
7. ✅ ルーティング設定

### 📝 自動生成された設定

#### Module Federation設定

**apps/shell/module-federation.config.ts**
```typescript
import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'shell',
  remotes: ['user', 'product'],
};

export default config;
```

**apps/user/module-federation.config.ts**
```typescript
import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'user',
  exposes: {
    './Routes': 'apps/user/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
```

**apps/product/module-federation.config.ts**
```typescript
import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'product',
  exposes: {
    './Routes': 'apps/product/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
```

#### ルーティング設定

**apps/shell/src/app/app.routes.ts**
```typescript
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'product',
    loadChildren: () => import('product/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'user',
    loadChildren: () => import('user/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: '',
    component: NxWelcome,
  },
];
```

### 🚀 マイクロフロントエンドアプリの起動方法

#### 統合起動（推奨）

```bash
# shellアプリを起動すると、userとproductも自動的に起動します
npx nx serve shell
```

- **shell**: http://localhost:4200
- **user**: http://localhost:4201 （自動起動）
- **product**: http://localhost:4202 （自動起動）

**重要**: `apps/shell/project.json`に`devRemotes`設定を追加しているため、shellを起動するだけで全リモートが自動起動します。

#### 個別起動（開発時に特定のリモートのみ起動したい場合）

**方法1: コマンドラインでdevRemotesを指定**
```bash
# 特定のリモートのみ開発モードで起動
npx nx serve shell --devRemotes=user

# 複数のリモートを指定（推奨）
npx nx serve shell --devRemotes=user,product

# devRemotesなしで起動（リモートは静的ビルドされたものを使用）
npx nx serve shell --devRemotes=
```

**注意**: `--devRemotes`で指定しないリモートは、事前にビルドされた静的ファイルとして提供されます（HMRなし）。

**方法2: 別々のターミナルで起動**
```bash
# ターミナル1: userアプリを起動
npx nx serve user    # ポート 4201

# ターミナル2: productアプリを起動
npx nx serve product # ポート 4202

# ターミナル3: shellアプリを起動
npx nx serve shell   # ポート 4200
```

### 🌐 アクセスURL

- ホーム: http://localhost:4200/
- ユーザー機能: http://localhost:4200/user
- 製品機能: http://localhost:4200/product

### 🐛 トラブルシューティング

#### エラー: `remoteEntry.mjs:1 Failed to load resource: the server responded with a status of 404 (Not Found)`

**原因**: リモートアプリケーション（userまたはproduct）が起動していないか、正しく接続できていません。

**解決方法**:
1. **devRemotes設定を確認**: `apps/shell/project.json`に`devRemotes`が設定されていることを確認
2. **一度停止して再起動**: 全てのサーバーを停止してから、`npx nx serve shell`を実行
3. **ポート競合を確認**: 4200, 4201, 4202が他のプロセスで使用されていないか確認
   ```bash
   # macOS/Linux
   lsof -i :4200
   lsof -i :4201
   lsof -i :4202
   ```
4. **キャッシュをクリア**: Nxのキャッシュをクリアして再実行
   ```bash
   npx nx reset
   npx nx serve shell
   ```

#### ビルドエラーが発生する場合

```bash
# 依存関係を再インストール
npm install

# Nxキャッシュをリセット
npx nx reset

# 再度起動
npx nx serve shell
```

### 🏗️ アーキテクチャ概要

```
┌─────────────────────────────────────┐
│      Shell (Host) :4200             │
│  ┌───────────────────────────────┐  │
│  │  /user  → User Remote (4201)  │  │
│  │  /product → Product Remote    │  │
│  │             (4202)             │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

### 🔍 プロジェクト確認

```bash
# 全プロジェクト一覧表示
NX_DAEMON=false npx nx show projects

# 出力例：
# shell
# shell-e2e
# user
# user-e2e
# product
# product-e2e
# (その他の既存プロジェクト)
```

### 📦 作成されたファイル構造

```
apps/
├── shell/                           # ホストアプリ
│   ├── src/
│   │   ├── app/
│   │   │   ├── app.routes.ts       # リモートへのルーティング
│   │   │   └── ...
│   │   ├── main.ts
│   │   └── bootstrap.ts            # Module Federation用ブートストラップ
│   ├── module-federation.config.ts # MF設定
│   ├── webpack.config.ts
│   └── project.json
│
├── user/                            # リモートアプリ（ユーザー機能）
│   ├── src/
│   │   ├── app/
│   │   │   └── remote-entry/
│   │   │       ├── entry.routes.ts # 公開されるルート
│   │   │       └── entry.ts
│   │   ├── main.ts
│   │   └── bootstrap.ts
│   ├── module-federation.config.ts # MF設定（exposes指定）
│   └── project.json
│
└── product/                         # リモートアプリ（製品機能）
    ├── src/
    │   ├── app/
    │   │   └── remote-entry/
    │   │       ├── entry.routes.ts # 公開されるルート
    │   │       └── entry.ts
    │   ├── main.ts
    │   └── bootstrap.ts
    ├── module-federation.config.ts # MF設定（exposes指定）
    └── project.json
```

---

## ✅ まとめ（更新版）

これで Nx を使った
**Angular × NestJS × Shared Library × Micro Frontend (Module Federation)** 構成が完全に稼働し、

* 型の共有
* CORS通信
* 依存グラフ可視化
* Jestテスト実行
* **マイクロフロントエンドアーキテクチャ（Module Federation）**

まで網羅されています 💪🔥

---