## 🧱 Nx フルスタックプロジェクト構築手順（Angular + Nest.js + Shared Types）

### 1. Nx ワークスペース作成（Angularアプリ）

```bash
npx create-nx-workspace@latest my-fullstack-app
```

質問例：

```
✔ Which stack do you want to use? · angular
✔ Integrated monorepo, or standalone project? · integrated
✔ Application name · my-fullstack-app
✔ Which bundler would you like to use? · esbuild
✔ Default stylesheet format · scss
✔ Do you want to enable Server-Side Rendering (SSR)? · No
✔ Which unit test runner? · jest
✔ Test runner for e2e tests? · playwright
✔ Which CI provider? · Do it later
```

---

### 2. Nest.js バックエンド追加

```bash
npm install -D @nx/nest
npx nx g @nx/nest:application my-nest-app
```

質問例：

```
✔ Which linter? · eslint
✔ Which unit test runner? · jest
✔ Where should the project be generated? · apps
```

生成後、以下のような構成になります：

```
apps/
├─ my-fullstack-app/   ← Angularフロント
└─ my-nest-app/        ← Nest.jsバック
```

---

### 3. 共通型定義ライブラリ追加（libs/shared-types）

```bash
npx nx g @nx/js:lib shared-types --directory=libs
```

質問例：

```
✔ Which bundler? · none
✔ Which linter? · eslint
✔ Which unit test runner? · none
```

---

### 4. 型定義を追加

📄 `libs/shared-types/src/index.ts`

```typescript
export interface MessageResponse {
  message: string;
}
```

---

### 5. Nest.js 側で利用

📄 `apps/my-nest-app/src/app/app.service.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { MessageResponse } from '@my-fullstack-app/shared-types';

@Injectable()
export class AppService {
  getData(): MessageResponse {
    return { message: 'Hello API (shared-types ✅)' };
  }
}
```

---

### 6. Angular 側で利用

📄 `apps/my-fullstack-app/src/app/app.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MessageResponse } from '@my-fullstack-app/shared-types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
})
export class AppComponent implements OnInit {
  message = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<MessageResponse>('http://localhost:3000/api').subscribe({
      next: (res) => (this.message = res.message),
    });
  }
}
```

---

### 7. 動作確認

```bash
nx serve my-nest-app   # バックエンド起動（http://localhost:3000/api）
nx serve my-fullstack-app  # フロント起動（http://localhost:4200）
```

結果：

```
{"message":"Hello API (shared-types ✅)"}
```

ブラウザで同メッセージが表示されれば成功 🎉

---

### ✅ フォルダ構成（最終形）

```
my-fullstack-app/
├─ apps/
│  ├─ my-fullstack-app/   ← Angularフロント
│  └─ my-nest-app/        ← Nest.jsバック
└─ libs/
   └─ shared-types/        ← 共通型ライブラリ
```

