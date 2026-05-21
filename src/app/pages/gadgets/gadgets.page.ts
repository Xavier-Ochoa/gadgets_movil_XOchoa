import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonButton,
  IonFab, IonFabButton, IonThumbnail, IonIcon,
  IonCard, IonCardHeader, IonCardTitle,
  IonCardSubtitle, IonCardContent, IonChip
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, trashOutline, createOutline, eyeOutline } from 'ionicons/icons';
import { GadgetsService, Gadget } from '../../services/gadgets';

@Component({
  selector: 'app-gadgets',
  templateUrl: './gadgets.page.html',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonButton,
    IonFab, IonFabButton, IonThumbnail, IonIcon,
    IonCard, IonCardHeader, IonCardTitle,
    IonCardSubtitle, IonCardContent, IonChip
  ]
})
export class GadgetsPage implements OnInit {

  gadgets: Gadget[] = [];

  constructor(private gadgetsService: GadgetsService) {
    addIcons({ addOutline, trashOutline, createOutline, eyeOutline });
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
}
