
export enum Language {
  ENGLISH = 'en',
  TELUGU = 'te',
  HINDI = 'hi',
  TAMIL = 'ta',
  KANNADA = 'kn',
  BENGALI = 'bn',
  MARATHI = 'mr',
  GUJARATI = 'gu',
  MALAYALAM = 'ml'
}

export type AppView = 
  | 'login' 
  | 'signup' 
  | 'home' 
  | 'hospitals' 
  | 'scanning' 
  | 'chatbot' 
  | 'prescription_scanner'
  | 'medicines' 
  | 'medicine_detail' 
  | 'doctors' 
  | 'doctor_detail' 
  | 'emergency' 
  | 'admin' 
  | 'notifications' 
  | 'diseases' 
  | 'fever_detail' 
  | 'bp_detail' 
  | 'child_fever_detail' 
  | 'pain_detail' 
  | 'sugar_detail' 
  | 'mental_detail' 
  | 'stomach_detail' 
  | 'general_health_detail'
  | 'terms_policies';

export interface Medicine {
  id: string;
  name: string;
  usage: string;
  dailyDose: string;
  warnings: string;
  sideEffects: string;
  translations: {
    [key in Language]?: {
      name: string;
      usage: string;
      dailyDose: string;
      warnings: string;
      sideEffects: string;
    }
  };
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualification: string;
  experience: number;
  rating: number;
  reviewsCount: number;
  fee: number;
  image: string;
  hospitalName: string;
  city: string;
  hospitalAddress: string;
  timings: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  number: string;
  type: string;
}

export interface Disease {
  id: string;
  name: string;
  symptoms: string;
  causes: string;
  treatment: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
}

export interface HospitalData {
  id: string;
  name: string;
  address: string;
  distance: string;
  phone: string;
  hours: string;
  rating: number;
  coordinates: { x: number; y: number };
}
