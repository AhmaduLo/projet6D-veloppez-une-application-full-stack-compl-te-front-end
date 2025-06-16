import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth-service.service";

@Component({
  selector: "app-login",
  template: `
    <div class="login-container">
      <div class="form-box">
        <button class="back-btn" (click)="goBack()">←</button>
        <h2>Connexion</h2>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            formControlName="email"
            [class.invalid]="
              loginForm.get('email')?.touched && loginForm.get('email')?.invalid
            "
          />
          <div class="error-message" *ngIf="loginForm.get('email')?.touched">
            <span *ngIf="loginForm.get('email')?.hasError('required')"
              >L'email est requis.</span
            >
            <span *ngIf="loginForm.get('email')?.hasError('email')"
              >Email invalide.</span
            >
          </div>

          <label for="password">Mot de passe</label>
          <input
            id="password"
            type="password"
            formControlName="password"
            [class.invalid]="
              loginForm.get('password')?.touched &&
              loginForm.get('password')?.invalid
            "
          />
          <div
            class="error-message"
            *ngIf="
              loginForm.get('password')?.touched &&
              loginForm.get('password')?.hasError('required')
            "
          >
            Le mot de passe est requis.
          </div>

          <div *ngIf="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>

          <button
            type="submit"
            class="submit-btn"
            [disabled]="loginForm.invalid"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  `,
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = "";

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  goBack() {
    this.router.navigate(["/"]);
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        // Ici tu peux stocker le token dans localStorage ou un service
        localStorage.setItem("token", response.token);
          this.authService.setLoggedIn(true);
        this.router.navigate(["/article"]); 
      },
      error: (err) => {
        this.errorMessage = err.error.message || "Identifiants incorrects";
      },
    });
  }
}
