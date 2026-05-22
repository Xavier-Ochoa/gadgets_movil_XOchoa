import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonLabel, IonInput, IonButton,
  IonSpinner, IonIcon, IonTextarea, IonBackButton, IonButtons
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cloudUploadOutline, imageOutline, musicalNoteOutline } from 'ionicons/icons';
import { GadgetsService, Gadget } from '../../services/gadgets';

@Component({
  selector: 'app-gadget-form',
  templateUrl: './gadget-form.page.html',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonLabel, IonInput, IonButton,
    IonSpinner, IonIcon, IonTextarea, IonBackButton, IonButtons
  ]
})
export class GadgetFormPage implements OnInit {

  id?: number;
  cargando = false;
  subiendoImagen = false;
  subiendoAudio = false;

  gadget: Gadget = {
    nombre: '',
    marca: '',
    precio: 0,
    stock: 0,
    categoria: '',
    descripcion: '',
    imagen_url: '',
    video_url: '',
    audio_url: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gadgetsService: GadgetsService
  ) {
    addIcons({ cloudUploadOutline, imageOutline, musicalNoteOutline });
  }

  async ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
      this.gadget = await this.gadgetsService.obtenerPorId(this.id);
    }
  }

  /** Selección y subida de imagen a Supabase Storage */
  async seleccionarImagen(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;
    this.subiendoImagen = true;
    try {
      this.gadget.imagen_url = await this.gadgetsService.subirImagen(file);
    } catch (e) {
      console.error('Error subiendo imagen', e);
      alert('Error al subir imagen. Revisa la consola.');
    } finally {
      this.subiendoImagen = false;
    }
  }

  /** Selección y subida de audio a Supabase Storage */
  async seleccionarAudio(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;
    this.subiendoAudio = true;
    try {
      this.gadget.audio_url = await this.gadgetsService.subirAudio(file);
    } catch (e) {
      console.error('Error subiendo audio', e);
      alert('Error al subir audio. Revisa la consola.');
    } finally {
      this.subiendoAudio = false;
    }
  }

  async guardar() {
    this.cargando = true;
    try {
      if (this.id) {
        await this.gadgetsService.actualizar(this.id, this.gadget);
      } else {
        await this.gadgetsService.crear(this.gadget);
      }
      this.router.navigate(['/gadgets']);
    } catch (e) {
      console.error('Error guardando', e);
      alert('Error al guardar. Revisa la consola.');
    } finally {
      this.cargando = false;
    }
  }
}
