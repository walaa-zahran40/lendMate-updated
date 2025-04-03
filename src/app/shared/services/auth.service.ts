import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<string | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  private readonly STORAGE_KEY = 'loggedInUser';

  constructor() {
    // If you want to restore the name from localStorage on page load:
    const storedUser = localStorage.getItem(this.STORAGE_KEY);
    if (storedUser) {
      this.currentUserSubject.next(storedUser);
    }
  }
  // Fake login, just store the username in localStorage
  login(username: string): void {
    this.currentUserSubject.next(username);
    localStorage.setItem(this.STORAGE_KEY, username);
  }

  // Get current logged in user (if any)
  getLoggedInUser(): string | null {
    return localStorage.getItem(this.STORAGE_KEY);
  }

  // Logout: remove user from localStorage
  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
