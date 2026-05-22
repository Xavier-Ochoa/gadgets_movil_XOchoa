import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonButtons,
  IonFab, IonFabButton, IonIcon,
  AlertController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, trashOutline, createOutline, eyeOutline, logOutOutline, cashOutline, cubeOutline, hardwareChipOutline } from 'ionicons/icons';
import { GadgetsService, Gadget } from '../../services/gadgets';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-gadgets',
  templateUrl: './gadgets.page.html',
  styleUrls: ['./gadgets.page.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonButtons,
    IonFab, IonFabButton, IonIcon
  ]
})
export class GadgetsPage implements OnInit {

  gadgets: Gadget[] = [];

  constructor(
    private gadgetsService: GadgetsService,
    private supabaseService: SupabaseService,
    private router: Router,
    private alertCtrl: AlertController
  ) {
    addIcons({ addOutline, trashOutline, createOutline, eyeOutline, logOutOutline, cashOutline, cubeOutline, hardwareChipOutline });
  }

  ngOnInit() { this.cargar(); }
  ionViewWillEnter() { this.cargar(); }

  async cargar() {
    this.gadgets = await this.gadgetsService.listar();
  }

  async eliminar(id: number) {
    await this.gadgetsService.eliminar(id);
    await this.cargar();
  }

  async confirmarLogout() {
    const alert = await this.alertCtrl.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que quieres salir?',
      cssClass: 'tech-alert',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Salir', role: 'destructive', handler: () => this.logout() }
      ]
    });
    await alert.present();
  }

  async logout() {
    await this.supabaseService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
