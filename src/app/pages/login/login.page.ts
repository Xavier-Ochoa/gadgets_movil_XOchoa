import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
  IonCard,
  IonCardContent,
  IonIcon,
  IonSpinner,
  LoadingController,
  ToastController
} from '@ionic/angular/standalone';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../services/supabase.service';
import { addIcons } from 'ionicons';
import { eyeOutline, eyeOffOutline, lockClosedOutline, mailOutline, hardwareChipOutline } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonText,
    IonCard,
    IonCardContent,
    IonIcon,
    IonSpinner
  ]
})
export class LoginPage {
  email = '';
  password = '';
  mensaje = '';
  tipoMensaje: 'danger' | 'success' = 'danger';
  cargando = false;
  mostrarPassword = false;
  modoRegistro = false;

  constructor(
    private supabaseService: SupabaseService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    addIcons({ eyeOutline, eyeOffOutline, lockClosedOutline, mailOutline, hardwareChipOutline });
  }

  toggleModo() {
    this.modoRegistro = !this.modoRegistro;
    this.mensaje = '';
    this.email = '';
    this.password = '';
  }

  togglePassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  async login() {
    if (!this.email || !this.password) {
      this.mensaje = 'Por favor, completa todos los campos.';
      this.tipoMensaje = 'danger';
      return;
    }

    this.cargando = true;
    this.mensaje = '';

    const loading = await this.loadingCtrl.create({
      message: 'Autenticando...',
      spinner: 'crescent',
      cssClass: 'tech-loading'
    });
    await loading.present();

    const { error } = await this.supabaseService.login(this.email, this.password);

    await loading.dismiss();
    this.cargando = false;

    if (error) {
      this.mensaje = this.traducirError(error.message);
      this.tipoMensaje = 'danger';
      return;
    }

    await this.mostrarToast('¡Acceso concedido! Bienvenido.', 'success');
    this.router.navigateByUrl('/gadgets', { replaceUrl: true });
  }

  async register() {
    if (!this.email || !this.password) {
      this.mensaje = 'Por favor, completa todos los campos.';
      this.tipoMensaje = 'danger';
      return;
    }

    if (this.password.length < 6) {
      this.mensaje = 'La contraseña debe tener al menos 6 caracteres.';
      this.tipoMensaje = 'danger';
      return;
    }

    this.cargando = true;
    this.mensaje = '';

    const loading = await this.loadingCtrl.create({
      message: 'Creando cuenta...',
      spinner: 'crescent',
      cssClass: 'tech-loading'
    });
    await loading.present();

    const { data, error } = await this.supabaseService.register(this.email, this.password);

    await loading.dismiss();
    this.cargando = false;

    if (error) {
      this.mensaje = this.traducirError(error.message);
      this.tipoMensaje = 'danger';
      return;
    }

    if (data.user && !data.session) {
      this.mensaje = '¡Cuenta creada! Revisa tu correo para confirmarla antes de iniciar sesión.';
      this.tipoMensaje = 'success';
    } else {
      await this.mostrarToast('¡Cuenta creada! Ya puedes iniciar sesión.', 'success');
      this.modoRegistro = false;
    }
  }

  private traducirError(error: string): string {
    const errores: { [key: string]: string } = {
      'Invalid login credentials': 'Credenciales incorrectas. Acceso denegado.',
      'Email not confirmed': 'Debes confirmar tu correo antes de iniciar sesión.',
      'User already registered': 'Este correo ya está registrado.',
      'Password should be at least 6 characters': 'La contraseña debe tener al menos 6 caracteres.',
      'Unable to validate email address: invalid format': 'El formato del correo no es válido.',
      'signup is disabled': 'El registro está deshabilitado en este momento.',
      'Email rate limit exceeded': 'Demasiados intentos. Espera un momento.',
    };
    return errores[error] ?? error;
  }

  private async mostrarToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'bottom',
      color
    });
    await toast.present();
  }
}
