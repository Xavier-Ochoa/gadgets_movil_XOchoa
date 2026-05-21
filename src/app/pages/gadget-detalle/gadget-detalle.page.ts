import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonIcon, IonBackButton, IonButtons,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
  IonCardContent, IonChip, IonSpinner
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { playOutline, pauseOutline, stopOutline, arrowBackOutline } from 'ionicons/icons';
import { GadgetsService, Gadget } from '../../services/gadgets';

@Component({
  selector: 'app-gadget-detalle',
  templateUrl: './gadget-detalle.page.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonIcon, IonBackButton, IonButtons,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
    IonCardContent, IonChip, IonSpinner
  ]
})
export class GadgetDetallePage implements OnInit, OnDestroy {

  gadget?: Gadget;
  videoUrl?: SafeResourceUrl;
  audio?: HTMLAudioElement;
  audioEstado: 'detenido' | 'reproduciendo' | 'pausado' = 'detenido';
  cargando = true;

  constructor(
    private route: ActivatedRoute,
    private gadgetsService: GadgetsService,
    private sanitizer: DomSanitizer
  ) {
    addIcons({ playOutline, pauseOutline, stopOutline, arrowBackOutline });
  }

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.gadget = await this.gadgetsService.obtenerPorId(id);
    this.cargando = false;

    if (this.gadget.video_url) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.convertirUrlEmbed(this.gadget.video_url)
      );
    }

    if (this.gadget.audio_url) {
      this.audio = new Audio(this.gadget.audio_url);
      this.audio.onended = () => { this.audioEstado = 'detenido'; };
    }
  }

  convertirUrlEmbed(url: string): string {
    const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]+)/);
    if (ytMatch) {
      return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0&showinfo=0`;
    }
    const ttMatch = url.match(/tiktok\.com\/@[^/]+\/video\/(\d+)/);
    if (ttMatch) {
      return `https://www.tiktok.com/embed/v2/${ttMatch[1]}`;
    }
    return url;
  }

  reproducirAudio() {
    if (!this.audio) return;
    this.audio.play();
    this.audioEstado = 'reproduciendo';
  }

  pausarAudio() {
    if (!this.audio) return;
    this.audio.pause();
    this.audioEstado = 'pausado';
  }

  detenerAudio() {
    if (!this.audio) return;
    this.audio.pause();
    this.audio.currentTime = 0;
    this.audioEstado = 'detenido';
  }

  ngOnDestroy() {
    this.detenerAudio();
  }
}
