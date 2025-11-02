import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageResponse } from '@my-fullstack-app/shared-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  imports: [CommonModule],
})
export class AppComponent implements OnInit {
  private http = inject(HttpClient);
  message = '';

  ngOnInit() {
    this.http.get<MessageResponse>('http://localhost:3000/api').subscribe({
      next: (res) => (this.message = res.message),
      error: (err) => console.error(err),
    });
  }
}
