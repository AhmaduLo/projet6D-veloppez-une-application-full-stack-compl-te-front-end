import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserRegister } from "src/app/models/UserRegister";
import { AuthService } from "src/app/services/auth/auth-service.service";


@Component({
  selector: "app-register",
  template: `
  <div class="modal-backdrop" *ngIf="showModal">
  <div class="modal">
    <p>{{ successMessage }}</p>
  </div>
</div>
    <div class="register-container">
      <div class="form-box">
        <button class="back-btn" (click)="goBack()">←</button>
        <h2>Inscription</h2>

        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <label for="username">Nom d'utilisateur</label>
          <input
            id="username"
            type="text"
            formControlName="username"
            [class.invalid]="
              registerForm.get('username')?.touched &&
              registerForm.get('username')?.invalid
            "
          />
          <div
            class="error-message"
            *ngIf="
              registerForm.get('username')?.touched &&
              registerForm.get('username')?.hasError('required')
            "
          >
            Le nom d'utilisateur est obligatoire.
          </div>

          <label for="email">Adresse e-mail</label>
          <input
            id="email"
            type="email"
            formControlName="email"
            [class.invalid]="
              registerForm.get('email')?.touched &&
              registerForm.get('email')?.invalid
            "
          />
          <div class="error-message" *ngIf="registerForm.get('email')?.touched">
            <span *ngIf="registerForm.get('email')?.hasError('required')"
              >L'adresse e-mail est obligatoire.</span
            >
            <span *ngIf="registerForm.get('email')?.hasError('email')"
              >L'adresse e-mail n'est pas valide.</span
            >
          </div>

          <label for="password">Mot de passe</label>
          <input
            id="password"
            type="password"
            formControlName="password"
            [class.invalid]="
              registerForm.get('password')?.touched &&
              registerForm.get('password')?.invalid
            "
          />
          <div
            class="error-message"
            *ngIf="
              registerForm.get('password')?.touched &&
              registerForm.get('password')?.hasError('required')
            "
          >
            Le mot de passe est obligatoire.
          </div>

          <!-- Erreur globale -->
          <div class="error-message" *ngIf="errorMessage">
            {{ errorMessage }}
          </div>

          <!-- Erreur spécifique au mot de passe -->
          <div *ngIf="displayFieldError('password')" class="error-message">
            {{ displayFieldError("password") }}
          </div>

          <!-- Tu peux faire pareil pour email, username si nécessaire -->
           <div *ngIf="displayFieldError('email')" class="error-message">
            {{ displayFieldError("email") }}
          </div>
          <button
            type="submit"
            class="submit-btn"
            [disabled]="registerForm.invalid"
          >
            S’inscrire
          </button>
        </form>
      </div>
    </div>
  `,
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage = "";
  serverErrors: { [key: string]: string } = {};
  successMessage: string = '';
  showModal: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      username: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  goBack() {
    this.router.navigate([""]);
  }

  ngOnInit(): void { }

  onSubmit() {
    if (this.registerForm.valid) {
      const user: UserRegister = this.registerForm.value;

      this.authService.register(user).subscribe({
        next: (res) => {
          this.successMessage = res.message;
          this.showModal = true;

          setTimeout(() => {
            this.showModal = false;
            this.router.navigate(["/login"]);
          }, 500);
        },
        error: (error) => {
          this.errorMessage = error.error.error || null;
          this.serverErrors = error.error || {};
        },
      });
    }
  }
  displayFieldError(field: string): string | null {
    return this.serverErrors[field] || null;
  }
}
