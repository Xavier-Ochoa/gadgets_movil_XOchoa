import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

export interface Gadget {
  id?: number;
  nombre: string;
  marca: string;
  precio: number;
  stock: number;
  categoria?: string;
  descripcion?: string;
  imagen_url?: string;
  video_url?: string;
  audio_url?: string;
}

@Injectable({ providedIn: 'root' })
export class GadgetsService {

  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  // ─── CRUD ────────────────────────────────────────────────────────────────────

  async listar(): Promise<Gadget[]> {
    const { data, error } = await this.supabase
      .from('gadgets')
      .select('*')
      .order('id', { ascending: false });
    if (error) throw error;
    return data as Gadget[];
  }

  async obtenerPorId(id: number): Promise<Gadget> {
    const { data, error } = await this.supabase
      .from('gadgets')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as Gadget;
  }

  async crear(gadget: Gadget) {
    const { data, error } = await this.supabase.from('gadgets').insert(gadget).select();
    if (error) throw error;
    return data;
  }

  async actualizar(id: number, gadget: Gadget) {
    // Se excluye el campo 'id' del payload porque es GENERATED ALWAYS y Supabase lanza error 400 si se intenta actualizarlo
    const { id: _ignorar, ...gadgetSinId } = gadget;
    const { data, error } = await this.supabase.from('gadgets').update(gadgetSinId).eq('id', id).select();
    if (error) throw error;
    return data;
  }

  async eliminar(id: number) {
    const { error } = await this.supabase.from('gadgets').delete().eq('id', id);
    if (error) throw error;
    return true;
  }

  // ─── STORAGE ─────────────────────────────────────────────────────────────────

  /** Sube una imagen al bucket 'gadgets-imagenes' y devuelve la URL pública */
  async subirImagen(file: File): Promise<string> {
    const ext = file.name.split('.').pop();
    const fileName = `img_${Date.now()}.${ext}`;
    const { error } = await this.supabase.storage
      .from('gadgets-imagenes')
      .upload(fileName, file, { upsert: true });
    if (error) throw error;
    const { data } = this.supabase.storage.from('gadgets-imagenes').getPublicUrl(fileName);
    return data.publicUrl;
  }

  /** Sube un audio al bucket 'gadgets-audios' y devuelve la URL pública */
  async subirAudio(file: File): Promise<string> {
    const ext = file.name.split('.').pop();
    const fileName = `audio_${Date.now()}.${ext}`;
    const { error } = await this.supabase.storage
      .from('gadgets-audios')
      .upload(fileName, file, { upsert: true });
    if (error) throw error;
    const { data } = this.supabase.storage.from('gadgets-audios').getPublicUrl(fileName);
    return data.publicUrl;
  }
}
