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

## ✅ ここまでの流れ（README追記用まとめ）

以下を `README.md` に追記すれば、誰でも同じ構成を再現できます👇

---

### 📘 Nx Monorepo 環境セットアップ手順

#### 1️⃣ Nxワークスペース作成（Angularを含む）

```bash
npx create-nx-workspace@latest my-fullstack-app --preset=angular
```

#### 2️⃣ NestJSバックエンド追加

```bash
npx nx g @nx/nest:application apps/api
```

#### 3️⃣ 共通型ライブラリの追加

```bash
npx nx g @nx/js:library libs/shared-type --importPath=@my-fullstack-app/shared-type
```

#### 4️⃣ 共通型の定義

`libs/shared-type/src/index.ts`

```ts
export interface MessageResponse {
  message: string;
}
```

---

## 🔧 API 側設定（NestJS）

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

### 6️⃣ CORS 設定を有効化

`apps/api/src/main.ts`

```ts
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 👇 Angularからの通信を許可（CORS設定）
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
```

---

## 💻 フロントエンド側設定（Angular）

### 7️⃣ API呼び出しと型の利用

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

### 8️⃣ テンプレート修正

`apps/my-fullstack-app/src/app/app.html`

```html
<h1>{{ message }}</h1>
```

（初期の `<app-nx-welcome>` を削除して置き換える）

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
を開くと、APIから返されたメッセージが `<h1>` に表示されればOK！

---

## 🧩 プロジェクト一覧の確認

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

## 🕸 依存関係グラフの可視化（Dependency Graph）

```bash
npx nx graph
```

これでブラウザが自動で開き、
`apps/my-fullstack-app → libs/shared-type → apps/api`
という依存関係がグラフィカルに確認できます 🎨

> 💡 手動で開く場合は：
>
> ```bash
> npx nx graph --open=false
> ```
>
> として、出力されたURLをブラウザに貼り付け。

---

## ✅ まとめ

これで Nx を使った **Angular × NestJS × Shared Library** の構成が完成です 🎯
CORS 対応済みなので、フロントから API を安全に呼び出せます。

