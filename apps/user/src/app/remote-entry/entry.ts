import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-user-entry',
  template: `
    <div class="remote-container">
      <div class="remote-card">
        <div class="icon">👤</div>
        <h2>ユーザー管理</h2>
        <p class="description">
          このページはマイクロフロントエンドの<strong>Userリモートアプリ</strong>です。
        </p>
        <div class="info-box">
          <div class="info-item">
            <span class="label">ポート:</span>
            <span class="value">4201</span>
          </div>
          <div class="info-item">
            <span class="label">アプリ名:</span>
            <span class="value">user</span>
          </div>
          <div class="info-item">
            <span class="label">タイプ:</span>
            <span class="value">Remote (リモート)</span>
          </div>
        </div>
        <div class="features">
          <h3>主な機能</h3>
          <ul>
            <li>✅ ユーザー一覧表示</li>
            <li>✅ ユーザー詳細表示</li>
            <li>✅ ユーザー登録・編集</li>
            <li>✅ 権限管理</li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .remote-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 60vh;
      padding: 2rem;
    }

    .remote-card {
      background: white;
      border-radius: 20px;
      padding: 3rem;
      max-width: 600px;
      width: 100%;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      animation: fadeIn 0.5s ease-in;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .icon {
      font-size: 4rem;
      text-align: center;
      margin-bottom: 1rem;
    }

    h2 {
      font-size: 2rem;
      color: #2d3748;
      text-align: center;
      margin-bottom: 1rem;
      font-weight: 700;
    }

    .description {
      text-align: center;
      color: #4a5568;
      font-size: 1.1rem;
      line-height: 1.6;
      margin-bottom: 2rem;
    }

    .info-box {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 2rem;
    }

    .info-item {
      display: flex;
      justify-content: space-between;
      color: white;
      padding: 0.5rem 0;
      font-size: 1rem;
    }

    .label {
      font-weight: 600;
    }

    .value {
      font-weight: 700;
      background: rgba(255, 255, 255, 0.2);
      padding: 0.25rem 0.75rem;
      border-radius: 6px;
    }

    .features {
      background: #f7fafc;
      border-radius: 12px;
      padding: 1.5rem;
    }

    .features h3 {
      font-size: 1.3rem;
      color: #2d3748;
      margin-bottom: 1rem;
      font-weight: 600;
    }

    .features ul {
      list-style: none;
      padding: 0;
    }

    .features li {
      color: #4a5568;
      padding: 0.5rem 0;
      font-size: 1rem;
    }

    @media (max-width: 768px) {
      .remote-card {
        padding: 2rem;
      }

      .icon {
        font-size: 3rem;
      }

      h2 {
        font-size: 1.5rem;
      }
    }
  `]
})
export class RemoteEntry {}
