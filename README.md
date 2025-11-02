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

以下を `README.md` に書いておくと、再現性の高いプロジェクト構成手順になります👇

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

#### 5️⃣ API側で使用

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

#### 6️⃣ フロント側で使用

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

### ✅ 確認コマンド

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

この状態が **Nx公式ドキュメントでも推奨されている構成**（apps = アプリ層 / libs = 共有ロジック）です 💪
これでフロント・バック・共通型の3点が完全に連携できる環境になりました！

