了解しました 👍
では、これまでの構築手順＋テスト確認方法もすべて含めた **完全版README追記** を以下にまとめました👇

---

## 📁 現在の理想フォルダ構成

```
my-fullstack-app/
├── apps/
│   ├── my-fullstack-app/     ← Angularフロントエンド
│   └── api/                  ← NestJSバックエンド
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
