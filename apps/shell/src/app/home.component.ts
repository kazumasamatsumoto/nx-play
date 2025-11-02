import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-home',
  template: `
    <div class="home-container">
      <div class="hero-section">
        <h1 class="hero-title">🎉 マイクロフロントエンド</h1>
        <p class="hero-subtitle">Nx + Angular + Module Federationで構築</p>
      </div>

      <div class="cards-grid">
        <div class="card host-card">
          <div class="card-icon">🏠</div>
          <h3>Shell (ホスト)</h3>
          <p class="card-description">
            すべてのリモートアプリを統合するホストアプリケーション
          </p>
          <div class="card-info">
            <span class="port">Port: 4200</span>
          </div>
        </div>

        <div class="card remote-card user-card">
          <div class="card-icon">👤</div>
          <h3>User (リモート)</h3>
          <p class="card-description">
            ユーザー管理機能を提供するリモートアプリケーション
          </p>
          <div class="card-info">
            <span class="port">Port: 4201</span>
          </div>
          <a routerLink="/user" class="card-button">
            開く →
          </a>
        </div>

        <div class="card remote-card product-card">
          <div class="card-icon">📦</div>
          <h3>Product (リモート)</h3>
          <p class="card-description">
            製品管理機能を提供するリモートアプリケーション
          </p>
          <div class="card-info">
            <span class="port">Port: 4202</span>
          </div>
          <a routerLink="/product" class="card-button">
            開く →
          </a>
        </div>
      </div>

      <div class="architecture-section">
        <h2>🏗️ アーキテクチャ</h2>
        <div class="architecture-diagram">
          <div class="arch-item arch-host">
            <strong>Shell (Host)</strong>
            <div class="arch-remotes">
              <div class="arch-remote">User</div>
              <div class="arch-remote">Product</div>
            </div>
          </div>
        </div>
        <div class="tech-stack">
          <h3>技術スタック</h3>
          <div class="tech-badges">
            <span class="badge">Angular 20.3</span>
            <span class="badge">Nx 22.0</span>
            <span class="badge">Webpack Module Federation</span>
            <span class="badge">TypeScript</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .hero-section {
      text-align: center;
      margin-bottom: 3rem;
      animation: fadeIn 0.8s ease-in;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .hero-title {
      font-size: 3rem;
      font-weight: 800;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 1rem;
    }

    .hero-subtitle {
      font-size: 1.3rem;
      color: white;
      font-weight: 500;
    }

    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .card {
      background: white;
      border-radius: 16px;
      padding: 2rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      animation: slideUp 0.5s ease-in;
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .card:hover {
      transform: translateY(-8px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    }

    .card-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .card h3 {
      font-size: 1.5rem;
      font-weight: 700;
      color: #2d3748;
      margin-bottom: 0.75rem;
    }

    .card-description {
      color: #4a5568;
      line-height: 1.6;
      margin-bottom: 1rem;
      font-size: 0.95rem;
    }

    .card-info {
      margin-bottom: 1rem;
    }

    .port {
      display: inline-block;
      background: #f7fafc;
      color: #4a5568;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.9rem;
    }

    .card-button {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .card-button:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    .architecture-section {
      background: white;
      border-radius: 16px;
      padding: 2rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .architecture-section h2 {
      font-size: 2rem;
      font-weight: 700;
      color: #2d3748;
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .architecture-diagram {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      padding: 2rem;
      margin-bottom: 2rem;
    }

    .arch-item {
      text-align: center;
      color: white;
    }

    .arch-host strong {
      display: block;
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    .arch-remotes {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-top: 1rem;
    }

    .arch-remote {
      background: rgba(255, 255, 255, 0.2);
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
    }

    .tech-stack {
      text-align: center;
    }

    .tech-stack h3 {
      font-size: 1.3rem;
      color: #2d3748;
      margin-bottom: 1rem;
      font-weight: 600;
    }

    .tech-badges {
      display: flex;
      gap: 0.75rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .badge {
      background: #f7fafc;
      color: #4a5568;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.9rem;
    }

    @media (max-width: 768px) {
      .hero-title {
        font-size: 2rem;
      }

      .hero-subtitle {
        font-size: 1rem;
      }

      .cards-grid {
        grid-template-columns: 1fr;
      }

      .arch-remotes {
        flex-direction: column;
      }
    }
  `]
})
export class HomeComponent {}

