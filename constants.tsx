
import { Doctor, HospitalData, EmergencyContact, Disease } from './types.ts';

export const DUMMY_HOSPITALS: HospitalData[] = [
  {
    id: 'h1',
    name: 'Apollo Health City',
    address: 'Jubilee Hills, Hyderabad',
    distance: '1.2 km',
    phone: '040-23607777',
    hours: '24/7 Open',
    rating: 4.8,
    coordinates: { x: 30, y: 40 }
  },
  {
    id: 'h2',
    name: 'Care Multi-Specialty',
    address: 'Banjara Hills, Hyderabad',
    distance: '2.5 km',
    phone: '040-61656565',
    hours: '24/7 Open',
    rating: 4.5,
    coordinates: { x: 60, y: 25 }
  },
  {
    id: 'h3',
    name: 'Yashoda Hospitals',
    address: 'Somajiguda, Hyderabad',
    distance: '3.8 km',
    phone: '040-45674567',
    hours: '24/7 Open',
    rating: 4.6,
    coordinates: { x: 45, y: 70 }
  },
  {
    id: 'h4',
    name: 'Continental Hospital',
    address: 'Gachibowli, Hyderabad',
    distance: '5.1 km',
    phone: '040-67000000',
    hours: '24/7 Open',
    rating: 4.7,
    coordinates: { x: 80, y: 60 }
  },
  {
    id: 'h5',
    name: 'Rainbow Childrens Hospital',
    address: 'Madhapur, Hyderabad',
    distance: '4.2 km',
    phone: '040-44885000',
    hours: '24/7 Open',
    rating: 4.9,
    coordinates: { x: 20, y: 80 }
  }
];

export const DUMMY_EMERGENCY_CONTACTS: EmergencyContact[] = [
  { id: 'e1', name: 'Ambulance (General)', number: '108', type: 'Emergency' },
  { id: 'e2', name: 'Police Helpline', number: '100', type: 'Safety' },
  { id: 'e3', name: 'Women Helpline', number: '1091', type: 'Safety' },
  { id: 'e4', name: 'Apollo Emergency', number: '1066', type: 'Hospital' }
];

export const DUMMY_DISEASES: Disease[] = [
  {
    id: 'd_general',
    name: 'General Health (Weakness, Fatigue, Dehydration)',
    symptoms: 'Feeling tired, lack of energy, thirst, dry mouth, dizziness.',
    causes: 'Heat, lack of nutrition, less water intake, overwork.',
    treatment: 'Hydration, rest, and energy supplements.',
    severity: 'Mild'
  },
  {
    id: 'd_stomach',
    name: 'Stomach Care (Pain, Vomiting, Acidity)',
    symptoms: 'Stomach pain, nausea, vomiting, loose motion, burning sensation.',
    causes: 'Infection, food poisoning, indigestion, stress.',
    treatment: 'Light diet, hydration, and medication as advised by a doctor.',
    severity: 'Moderate'
  },
  {
    id: 'd_mental',
    name: 'Mental Health (Stress, Anxiety, Depression)',
    symptoms: 'Constant worry, sadness, lack of sleep, panic, mood swings.',
    causes: 'Work stress, lifestyle, chemical imbalances, trauma.',
    treatment: 'Counseling, lifestyle changes, and medication if advised by psychiatrist.',
    severity: 'Moderate'
  },
  {
    id: 'd1',
    name: 'Viral Fever',
    symptoms: 'High body temperature, fatigue, body aches, chills, sweating.',
    causes: 'Viral infections (Flu, Dengue, etc.), airborne transmission.',
    treatment: 'Rest, hydration, Paracetamol for fever. Consult if high fever persists > 3 days.',
    severity: 'Moderate'
  },
  {
    id: 'd_child_fever',
    name: 'Children Fever',
    symptoms: 'High temperature, irritability, crying, loss of appetite.',
    causes: 'Viral/Bacterial infections, teething, vaccination.',
    treatment: 'Pediatric Paracetamol, hydration, sponging.',
    severity: 'Moderate'
  },
  {
    id: 'd_sugar',
    name: 'Diabetes',
    symptoms: 'Increased thirst, frequent urination, hunger, fatigue, blurred vision.',
    causes: 'Insulin resistance, autoimmune (Type 1), genetics, obesity.',
    treatment: 'Diet control, Exercise, Metformin, Insulin (if severe).',
    severity: 'Severe'
  },
  {
    id: 'd_bp',
    name: 'Blood Pressure (Hypertension)',
    symptoms: 'Headache, shortness of breath, nosebleeds (often no symptoms).',
    causes: 'Genetics, age, unhealthy diet, lack of exercise, obesity.',
    treatment: 'Lifestyle changes. Common Meds: Amlodipine (5mg once daily), Telmisartan (40mg once daily), Losartan (50mg once daily). WARNING: These require a doctor prescription.',
    severity: 'Severe'
  },
  {
    id: 'd_pain',
    name: 'General Pain',
    symptoms: 'Headache, body ache, joint pain, back pain, muscle soreness.',
    causes: 'Stress, injury, inflammation, arthritis, viral infections.',
    treatment: 'Analgesics (Paracetamol/Ibuprofen), Rest, Physio.',
    severity: 'Moderate'
  }
];

export const DUMMY_DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Aarav Sharma',
    specialty: 'Cardiologist',
    qualification: 'MBBS, MD (Cardiology)',
    experience: 15,
    rating: 4.9,
    reviewsCount: 1240,
    fee: 800,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400&h=400',
    hospitalName: 'HeartCare Clinic',
    city: 'Hyderabad',
    hospitalAddress: 'Flat 102, HeartCare Clinic, Jubilee Hills, Road No. 36, Hyderabad, Telangana 500033',
    timings: '10:00 AM - 02:00 PM'
  },
  {
    id: '2',
    name: 'Dr. Ishani Rao',
    specialty: 'Pediatrician',
    qualification: 'MBBS, DCH (Pediatrics)',
    experience: 12,
    rating: 4.8,
    reviewsCount: 850,
    fee: 500,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400&h=400',
    hospitalName: 'Little Stars Hospital',
    city: 'Bangalore',
    hospitalAddress: 'No 45, Little Stars Hospital, Indiranagar 2nd Stage, Bangalore, Karnataka 560038',
    timings: '04:00 PM - 08:00 PM'
  },
  {
    id: '3',
    name: 'Dr. Vikram Malhotra',
    specialty: 'Orthopedic',
    qualification: 'MBBS, MS (Ortho)',
    experience: 20,
    rating: 4.7,
    reviewsCount: 1120,
    fee: 1000,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400&h=400',
    hospitalName: 'Bone & Joint Center',
    city: 'Mumbai',
    hospitalAddress: 'G-12, Malhotra Medical Hub, Andheri West, Mumbai, Maharashtra 400053',
    timings: '11:00 AM - 03:00 PM'
  },
  {
    id: '4',
    name: 'Dr. Sneha Reddy',
    specialty: 'Dermatologist',
    qualification: 'MBBS, MD (Dermatology)',
    experience: 9,
    rating: 4.6,
    reviewsCount: 670,
    fee: 750,
    image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=400&h=400',
    hospitalName: 'Glow Skin Clinic',
    city: 'Chennai',
    hospitalAddress: 'Block B, Glow Skin Specialist Center, Nungambakkam High Road, Chennai, Tamil Nadu 600034',
    timings: '05:00 PM - 09:00 PM'
  },
  {
    id: '5',
    name: 'Dr. Arjun Gupta',
    specialty: 'General Physician',
    qualification: 'MBBS, MD (Internal Medicine)',
    experience: 22,
    rating: 4.9,
    reviewsCount: 2100,
    fee: 400,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400&h=400',
    hospitalName: 'Family Health Center',
    city: 'Delhi',
    hospitalAddress: 'H-56, Family Health Center, Hauz Khas Enclave, Delhi 110016',
    timings: '09:00 AM - 01:00 PM'
  }
];

export const HEALTH_DISCLAIMER = "VAIDYA MEDICAL DISCLAIMER: This AI assistant provides general health information and support. It is NOT a replacement for professional medical advice, clinical diagnosis, or treatment. In case of a life-threatening emergency, please call your local emergency number or visit the nearest hospital immediately.";

export const TERMS_AND_POLICIES = {
  privacyPolicy: `
    PRIVACY POLICY
    Last Updated: February 2026
    
    1. Information Collection: Vaidya collects minimal personal data (name, profile image) stored locally on your device.
    2. Health Data: Any prescription scans or health queries are processed via secure AI models and are not stored on our servers permanently.
    3. Location Data: Emergency features use your real-time location to assist in SOS alerts. This data is only shared with your designated emergency contacts.
    4. Data Security: We prioritize your privacy and use industry-standard encryption for all data transmissions.
  `,
  termsOfService: `
    TERMS OF SERVICE
    
    1. Acceptance of Terms: By using Vaidya, you agree to these terms.
    2. Not Medical Advice: Vaidya is an informational tool. Always consult a qualified healthcare provider for medical concerns.
    3. User Responsibility: You are responsible for the accuracy of the information you provide.
    4. Emergency Use: While Vaidya includes SOS features, it depends on network availability and device functionality. Do not rely solely on it for life-critical situations.
  `,
  compliance: `
    HEALTH SECTOR COMPLIANCE
    
    Vaidya adheres to standard health data privacy guidelines. We do not sell user data. Our AI interactions are designed to be supportive and educational, emphasizing professional consultation.
  `,
  contactSupport: `
    SUPPORT & CONTACT
    
    For any queries, support, or data deletion requests, please contact us at:
    Email: support@vaidya-health.com
    Website: www.vaidya-health.com
    Address: Healthcare Hub, Hyderabad, India.
  `
};
