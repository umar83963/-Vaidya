import React, { useState, useEffect, useRef, cloneElement, useCallback } from 'react';
import { 
  Home as HomeIcon, 
  Search, 
  Pill, 
  Settings, 
  ChevronRight, 
  Plus, 
  Trash2, 
  Edit, 
  Volume2,
  ArrowLeft,
  Activity,
  MapPin,
  Bell,
  Truck,
  Star,
  Phone,
  LayoutDashboard,
  QrCode,
  Navigation2,
  PhoneCall,
  Mic,
  MicOff,
  Camera as LucideCamera,
  BrainCircuit,
  Languages,
  Info,
  Globe,
  Loader2,
  User,
  ImageIcon,
  Sparkles,
  Download,
  Sun,
  Moon,
  Check,
  Stethoscope,
  Filter,
  Clock,
  Compass,
  AlertTriangle,
  RefreshCw,
  Building2,
  Hospital,
  Thermometer,
  Snowflake,
  Zap,
  Droplet,
  Bug,
  Utensils,
  Ban,
  Tag,
  CircleDollarSign,
  Flame,
  Siren,
  ShieldAlert,
  ThermometerSun,
  FileText,
  AlertCircle,
  Heart,
  Baby,
  Skull,
  Armchair,
  Coffee,
  Frown,
  Meh,
  Smile,
  ThermometerSnowflake,
  Lock,
  Mail,
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
  ShieldCheck,
  XCircle,
  LogOut,
  Type as TypeIcon,
  Upload,
  Save,
  X,
  Navigation,
  Send,
  StopCircle,
  Brain,
  Wine,
  Battery,
  ChevronDown,
  Users,
  Share2,
  Copy,
  MessageSquare,
  History as HistoryIcon
} from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AppView, Medicine, Language, Doctor, EmergencyContact, Disease } from './types.ts';
import { seedInitialData, getMedicines, saveMedicine, deleteMedicine } from './services/medicineService.ts';
import { 
  getProChatResponse, 
  getAdvancedAIResponse,
  findNearbyPlaces, 
  generateSpeech, 
  transcribeAudio, 
  editMedicalImage,
  generateMedicalImage,
  translateMedicine,
  validateEmailWithAI
} from './services/geminiService.ts';
import { DUMMY_DOCTORS, DUMMY_EMERGENCY_CONTACTS, DUMMY_DISEASES, HEALTH_DISCLAIMER, TERMS_AND_POLICIES } from './constants.tsx';

// --- Official Branding Components ---

const VaidyaLogo: React.FC<{ size?: number, className?: string, variant?: 'color' | 'light' | 'dark' }> = ({ size = 64, className = "", variant = 'color' }) => {
  const primaryColor = variant === 'color' ? "#2563eb" : (variant === 'light' ? "white" : "#18181b");
  const accentColor = variant === 'color' ? "#84cc16" : (variant === 'light' ? "rgba(255,255,255,0.7)" : "#3f3f46");

  return (
    <div className={`relative flex items-center justify-center animate-logo-3d ${className}`} style={{ width: size, height: size }}>
      {/* 3D Shadow Layer */}
      <div className="absolute inset-4 bg-black/20 dark:bg-black/40 rounded-[2.5rem] blur-xl translate-y-8 translate-z-[-20px]"></div>
      
      {/* Premium Background Glow */}
      <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
      
      {/* Outer Rotating Glow Ring */}
      <div className="absolute inset-0 border-2 border-dashed border-blue-500/20 rounded-full animate-logo-spin-slow translate-z-[-10px]"></div>
      
      <div className="relative z-10 w-full h-full flex items-center justify-center bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-[0_25px_60px_rgba(37,99,235,0.25)] border border-gray-100 dark:border-zinc-800 overflow-hidden group transform-style-preserve-3d">
        <svg width={size * 0.7} height={size * 0.7} viewBox="0 0 100 100" className="transition-all duration-700 group-hover:scale-110 translate-z-[20px]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={primaryColor} />
              <stop offset="100%" stopColor="#1e40af" />
            </linearGradient>
          </defs>

          {/* Medical Shield Base */}
          <path 
            d="M50 5 L15 20 V45 C15 65 30 85 50 95 C70 85 85 65 85 45 V20 L50 5Z" 
            fill="url(#healthGradient)" 
            className="drop-shadow-2xl opacity-10"
          />
          
          <path 
            d="M50 5 L15 20 V45 C15 65 30 85 50 95 C70 85 85 65 85 45 V20 L50 5Z" 
            stroke="url(#healthGradient)" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />

          {/* DNA Helix / Pulse Hybrid Line */}
          <path 
            d="M25 50 C25 35 35 35 40 50 C45 65 55 65 60 50 C65 35 75 35 75 50" 
            stroke={accentColor} 
            strokeWidth="6" 
            strokeLinecap="round"
            className="opacity-40"
          />
          
          <path 
            d="M25 50 L35 50 L42 25 L58 75 L65 50 L75 50" 
            stroke={primaryColor} 
            strokeWidth="8" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="animate-logo-pulse-inner"
          />

          {/* Bold Medical Cross */}
          <g fill={primaryColor}>
            <rect x="44" y="38" width="12" height="24" rx="2" className="opacity-20" />
            <rect x="38" y="44" width="24" height="12" rx="2" className="opacity-20" />
            
            <rect x="47" y="42" width="6" height="16" rx="1" />
            <rect x="42" y="47" width="16" height="6" rx="1" />
          </g>

          {/* Vitality Glow Dot */}
          <circle cx="58" cy="75" r="4" fill={accentColor} className="animate-pulse" />
        </svg>
        
        {/* Glassmorphism Shine */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>
    </div>
  );
};

const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[1000] bg-white dark:bg-zinc-950 flex flex-col items-center justify-center transition-colors duration-700 overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
           style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-to-tr from-blue-500/5 via-transparent to-lime-500/5 rounded-full blur-[120px] animate-pulse"></div>

      <div className="relative flex flex-col items-center animate-reveal">
        <div className="relative mb-12">
           <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-3xl animate-logo-pulse"></div>
           <VaidyaLogo size={150} />
        </div>
        
        <div className="text-center">
          {/* Logo Typography - Premium Serif/Sans Mix */}
          <h1 className="text-7xl font-black text-[#1a3b47] dark:text-white tracking-tighter uppercase mb-1 drop-shadow-sm">
            VAIDYA
          </h1>
          <div className="h-2 w-32 bg-gradient-to-r from-[#84cc16] to-[#2563eb] mx-auto rounded-full mb-8 shadow-sm"></div>
          
          <div className="flex flex-col items-center gap-1">
             <p className="text-[14px] font-black text-blue-700 dark:text-blue-400 uppercase tracking-[0.5em] animate-fade-up">
                Healthcare Reimagined
             </p>
             <div className="flex items-center gap-3 mt-6 px-6 py-2.5 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md rounded-full border border-white/20 dark:border-zinc-800/50 animate-fade-up delay-150 shadow-xl">
                <ShieldCheck size={18} className="text-[#84cc16]" />
                <span className="text-[11px] font-black text-gray-600 dark:text-zinc-400 uppercase tracking-widest">Trusted Secure Platform</span>
             </div>
          </div>
        </div>
      </div>

      {/* Progress Bar Matching Lime Green Branding */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-64 h-1.5 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
        <div className="h-full bg-[#a3e635] shimmer rounded-full" style={{ width: '100%', transition: 'width 2.5s cubic-bezier(0.65, 0, 0.35, 1)' }}></div>
      </div>
      
      <div className="absolute bottom-10 opacity-50">
         <p className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest">
            Phase 1 • Clinical Standard App
         </p>
      </div>
    </div>
  );
};

// --- Utility Helpers ---

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

// --- Localized Strings ---
const TRANSLATIONS = {
  [Language.ENGLISH]: {
    searchPlaceholder: 'Type your symptoms here...',
    homeGreeting: 'Hi',
    specialists: 'Specialized Doctors',
    seeAll: 'See all',
    hospital: 'Hospital',
    scanning: 'Scanning',
    ambulance: 'Ambulance',
    pharmacy: 'Pharmacy',
    searchMeds: 'Search 100+ medicines...',
    aiAssistant: 'AI Assistant',
    online: 'Online',
    typeMessage: 'Type a message...',
    listening: 'Listening...',
    howHelp: 'How can I help you?',
    aiDescription: 'I can analyze symptoms, explain medicines, or help with health tips.',
    nearbyHospitals: 'Nearby Hospitals',
    scanningCenters: 'Scanning Centers',
    emergency: 'Emergency',
    doctors: 'Doctors',
    help: 'Help',
    home: 'Home',
    medicine: 'Medicine',
    healthConditions: 'Health Conditions',
    feverSymptoms: 'Fever symptoms',
    medicineInfo: 'Medicine info',
    healthyDiet: 'Healthy diet',
    emergencySigns: 'Emergency signs',
    locating: 'Locating...',
    radiusInfo: 'Based on your GPS location (20km radius)',
    aiLogo: 'AI',
    vaidya: 'VAIDYA',
    prescription: 'Prescription',
    scanPrescription: 'Scan Prescription',
    changeLang: 'CHANGE YOUR LANGUAGE',
    chooseProblem: 'CHOOSE PROBLEM',
    medGuide: 'MEDICINE GUIDE FOR'
  },
  [Language.TELUGU]: {
    searchPlaceholder: 'మీ లక్షణాలను ఇక్కడ నమోదు చేయండి...',
    homeGreeting: 'హలో',
    specialists: 'నిపుణులైన వైద్యులు',
    seeAll: 'అన్నీ చూడండి',
    hospital: 'ఆసుపత్రి',
    scanning: 'స్కానింగ్',
    ambulance: 'అంబులెన్స్',
    pharmacy: 'ఫార్మసీ',
    searchMeds: '100+ మందులను వెతకండి...',
    aiAssistant: 'AI అసిస్టెంట్',
    online: 'ఆన్‌లైన్',
    typeMessage: 'సందేశాన్ని టైప్ చేయండి...',
    listening: 'వింటున్నాను...',
    howHelp: 'నేను మీకు ఎలా సహాయపడగలను?',
    aiDescription: 'నేను లక్షణాలను విశ్లేషించగలను, మందులను వివరించగలను లేదా ఆరోగ్య చిట్కాలతో సహాయం చేయగలను.',
    nearbyHospitals: 'దగ్గరలోని ఆసుపత్రులు',
    scanningCenters: 'స్కానింగ్ సెంటర్లు',
    emergency: 'అత్యవసర',
    doctors: 'వైద్యులు',
    help: 'సహాయం',
    home: 'హోమ్',
    medicine: 'మందులు',
    healthConditions: 'ఆరోగ్య పరిస్థితులు',
    feverSymptoms: 'జ్వరం లక్షణాలు',
    medicineInfo: 'మందుల సమాచారం',
    healthyDiet: 'ఆరోగ్యకరమైన ఆహారం',
    emergencySigns: 'అత్యవసర సంకేతాలు',
    locating: 'గుర్తిస్తోంది...',
    radiusInfo: 'మీ GPS లొకేషన్ ఆధారంగా (20కిమీ వ్యాసార్థం)',
    aiLogo: 'ఏఐ',
    vaidya: 'వైద్య',
    prescription: 'ప్రిస్క్రిప్షన్',
    scanPrescription: 'ప్రిస్క్రిప్షన్ స్కాన్ చేయండి',
    changeLang: 'భాషను మార్చండి',
    chooseProblem: 'సమస్యను ఎంచుకోండి',
    medGuide: 'మందుల గైడ్'
  },
  [Language.HINDI]: {
    searchPlaceholder: 'अपने लक्षण यहाँ टाइप करें...',
    homeGreeting: 'नमस्ते',
    specialists: 'विशेषज्ञ डॉक्टर',
    seeAll: 'सभी देखें',
    hospital: 'अस्पताल',
    scanning: 'स्कैनिंग',
    ambulance: 'अम्बलेंस',
    pharmacy: 'फार्मेसी',
    searchMeds: 'एक सौ से अधिक दवाएं खोजें...',
    aiAssistant: 'AI सहायक',
    online: 'ऑनलाइन',
    typeMessage: 'संदेश टाइप करें...',
    listening: 'सुन रहा हूँ...',
    howHelp: 'मैं आपकी किस प्रकार सहायता कर सकता हूँ?',
    aiDescription: 'मैं लक्षणों का विश्लेषण कर सकता हूँ, दवाओं के बारे में बता सकता हूँ या स्वास्थ्य युक्तियों में मदद कर सकता हूँ।',
    nearbyHospitals: 'निकटतम अस्पताल',
    scanningCenters: 'स्कैनिंग केंद्र',
    emergency: 'आपातकालीन',
    doctors: 'डॉक्टर',
    help: 'सहायता',
    home: 'होम',
    medicine: 'दवा',
    healthConditions: 'स्वास्थ्य स्थितियां',
    feverSymptoms: 'बुखार के लक्षण',
    medicineInfo: 'दवा की जानकारी',
    healthyDiet: 'स्वस्थ आहार',
    emergencySigns: 'आपातकालीन संकेत',
    locating: 'ढूंढ रहा है...',
    radiusInfo: 'आपके GPS स्थान के आधार पर (20 किमी दायरा)',
    aiLogo: 'एआई',
    vaidya: 'वैद्य',
    prescription: 'पर्चा',
    scanPrescription: 'पर्चा स्कैन करें',
    changeLang: 'अपनी भाषा बदलें',
    chooseProblem: 'समस्या चुनें',
    medGuide: 'दवा गाइड'
  },
  [Language.TAMIL]: {
    searchPlaceholder: 'உங்கள் அறிகுறிகளை இங்கே தட்டச்சு செய்க...',
    homeGreeting: 'வணக்கம்',
    specialists: 'சிறப்பு மருத்துவர்கள்',
    seeAll: 'அனைத்தையும் பார்',
    hospital: 'மருத்துவமனை',
    scanning: 'ஸ்கேனிங்',
    ambulance: 'ஆம்புலன்ஸ்',
    pharmacy: 'மருந்தகம்',
    searchMeds: '100+ மருந்துகளைத் தேடுங்கள்...',
    aiAssistant: 'AI உதவியாளர்',
    online: 'ஆன்லைன்',
    typeMessage: 'செய்தியைத் தட்டச்சு செய்க...',
    listening: 'கேட்கிறேன்...',
    howHelp: 'நான் உங்களுக்கு எப்படி உதவ முடியும்?',
    aiDescription: 'நான் அறிகுறிகளை ஆய்வு செய்யலாம், மருந்துகளை விளக்கலாம் அல்லது சுகாதார குறிப்புகளுக்கு உதவலாம்.',
    nearbyHospitals: 'அருகிலுள்ள மருத்துவமனைகள்',
    scanningCenters: 'ஸ்கேனிங் மையங்கள்',
    emergency: 'அவசரம்',
    doctors: 'மருத்துவர்கள்',
    help: 'உதவி',
    home: 'முகப்பு',
    medicine: 'மருந்து',
    healthConditions: 'சுகாதார நிலைகள்',
    feverSymptoms: 'காய்ச்சல் அறிகுறிகள்',
    medicineInfo: 'மருந்து தகவல்',
    healthyDiet: 'ஆரோக்கியமான உணவு',
    emergencySigns: 'அவசர அறிகுறிகள்',
    locating: 'கண்டறிகிறது...',
    radiusInfo: 'உங்கள் GPS இருப்பிடத்தின் அடிப்படையில் (20கிமீ ஆரம்)',
    aiLogo: 'ஏி',
    vaidya: 'வைத்தியா',
    prescription: 'பரிந்துரை',
    scanPrescription: 'பரிந்துரையை ஸ்கேன் செய்யவும்',
    changeLang: 'உங்கள் மொழியை மாற்றவும்',
    chooseProblem: 'பிரச்சனையைத் தேர்வு செய்யவும்',
    medGuide: 'மருந்து வழிகாட்டி'
  },
  [Language.KANNADA]: {
    searchPlaceholder: 'ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ...',
    homeGreeting: 'ನಮಸ್ಕಾರ',
    specialists: 'ತಜ್ಞ ವೈದ್ಯರು',
    seeAll: 'ಎಲ್ಲವನ್ನೂ ನೋಡಿ',
    hospital: 'ಆಸ್ಪತ್ರೆ',
    scanning: 'ಸ್ಕ್ಯಾನಿಂಗ್',
    ambulance: 'ಆಂಬ್ಯುಲೆನ್ಸ್',
    pharmacy: 'ಫಾರ್ಮಸಿ',
    searchMeds: '100+ ಔಷಧಿಗಳನ್ನು ಹುಡುಕಿ...',
    aiAssistant: 'AI ಸಹಾಯಕ',
    online: 'ಆನ್‌ಲೈನ್',
    typeMessage: 'ಸಂದೇಶವನ್ನು ಟೈಪ್ ಮಾಡಿ...',
    listening: 'ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದ್ದೇನೆ...',
    howHelp: 'ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?',
    aiDescription: 'ನಾನು ಲಕ್ಷಣಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಬಹುದು, ಔಷಧಿಗಳನ್ನು ವಿವರಿಸಬಹುದು ಅಥವಾ ಆರೋಗ್ಯ ಸಲಹೆಗಳೊಂದಿಗೆ ಸಹಾಯ ಮಾಡಬಹುದು.',
    nearbyHospitals: 'ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆಗಳು',
    scanningCenters: 'ಸ್ಕ್ಯಾನಿಂಗ್ ಕೇಂದ್ರಗಳು',
    emergency: 'ತುರ್ತು',
    doctors: 'ವೈದ್ಯರು',
    help: 'ಸಹಾಯ',
    home: 'ಮುಖಪುಟ',
    medicine: 'ಔಷಧಿ',
    healthConditions: 'ಆರೋಗ್ಯ ಪರಿಸ್ಥಿತಿಗಳು',
    feverSymptoms: 'ಜ್ವರದ ಲಕ್ಷಣಗಳು',
    medicineInfo: 'ಔಷಧಿ ಮಾಹಿತಿ',
    healthyDiet: 'ಆರೋೕಗ್ಯಕರ ಆಹಾರ',
    emergencySigns: 'ತುರ್ತು ಚಿಹ್ನೆಗಳು',
    locating: 'ಗುರುತಿಸುತ್ತಿದೆ...',
    radiusInfo: 'ನಿಮ್ಮ GPS ಸ್ಥಳದ ಆಧಾರದ ಮೇಲೆ (20ಕಿಮೀ ವ್ಯಾಪ್ತಿ)',
    aiLogo: 'ಎಐ',
    vaidya: 'ವೈದ್ಯ',
    changeLang: 'ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಬದಲಾಯಿಸಿ',
    chooseProblem: 'ಸಮಸ್ಯೆಯನ್ನು ಆರಿಸಿ',
    medGuide: 'ಔಷಧಿ ಮಾರ್ಗದರ್ಶಿ'
  },
  [Language.BENGALI]: {
    searchPlaceholder: 'আপনার লক্ষণগুলি এখানে টাইপ করুন...',
    homeGreeting: 'হ্যালো',
    specialists: 'বিশেষজ্ঞ ডাক্তার',
    seeAll: 'সব দেখুন',
    hospital: 'হাসপাতাল',
    scanning: 'স্ক্যানিং',
    ambulance: 'অ্যাম্বুলেন্স',
    pharmacy: 'ফার্মেসি',
    searchMeds: '১০০+ ওষুধ খুঁজুন...',
    aiAssistant: 'AI সহকারী',
    online: 'অনলাইন',
    typeMessage: 'বার্তা টাইপ করুন...',
    listening: 'শুনছি...',
    howHelp: 'আমি আপনাকে কীভাবে সাহায্য করতে পারি?',
    aiDescription: 'আমি লক্ষণ বিশ্লেষণ করতে পারি, ওষুধ ব্যাখ্যা করতে পারি বা স্বাস্থ্য টিপস দিতে পারি।',
    nearbyHospitals: 'কাছাকাছি হাসপাতাল',
    scanningCenters: 'স্ক্যানিং সেন্টার',
    emergency: 'জরুরি',
    doctors: 'ডাক্তার',
    help: 'সাহায্য',
    home: 'হোম',
    medicine: 'ওষুধ',
    healthConditions: 'স্বাস্থ্য অবস্থা',
    feverSymptoms: 'জ্বরের লক্ষণ',
    medicineInfo: 'ওষুধের তথ্য',
    healthyDiet: 'স্বাস্থ্যকর খাবার',
    emergencySigns: 'জরুরি লক্ষণ',
    locating: 'খুঁজছি...',
    radiusInfo: 'আপনার GPS অবস্থানের ভিত্তিতে (২০ কিমি ব্যাসার্ধ)',
    aiLogo: 'AI',
    vaidya: 'বৈদ্য',
    prescription: 'প্রেসক্রিপশন',
    scanPrescription: 'প্রেসক্রিপশন স্ক্যান করুন',
    changeLang: 'আপনার ভাষা পরিবর্তন করুন',
    chooseProblem: 'সমস্যা চয়ন করুন',
    medGuide: 'ওষুধ নির্দেশিকা'
  },
  [Language.MARATHI]: {
    searchPlaceholder: 'तुमची लक्षणे येथे टाइप करा...',
    homeGreeting: 'नमस्कार',
    specialists: 'तज्ञ डॉक्टर',
    seeAll: 'सर्व पहा',
    hospital: 'रुग्णालय',
    scanning: 'स्कॅनिंग',
    ambulance: 'रुग्णवाहिका',
    pharmacy: 'फार्मसी',
    searchMeds: '१००+ औषधे शोधा...',
    aiAssistant: 'AI सहाय्यक',
    online: 'ऑनलाइन',
    typeMessage: 'संदेश टाइप करा...',
    listening: 'ऐकत आहे...',
    howHelp: 'मी तुम्हाला कशी मदत करू शकतो?',
    aiDescription: 'मी लक्षणांचे विश्लेषण करू शकतो, औषधे समजावून सांगू शकतो किंवा आरोग्य टिप्स देऊ शकतो.',
    nearbyHospitals: 'जवळपासची रुग्णालये',
    scanningCenters: 'स्कॅनिंग सेंटर्स',
    emergency: 'आणीबाणी',
    doctors: 'डॉक्टर',
    help: 'मदत',
    home: 'होम',
    medicine: 'औषध',
    healthConditions: 'आरोग्य स्थिती',
    feverSymptoms: 'ताप लक्षणे',
    medicineInfo: 'औषध माहिती',
    healthyDiet: 'निरोगी आहार',
    emergencySigns: 'आणीबाणीची चिन्हे',
    locating: 'शोधत आहे...',
    radiusInfo: 'तुमच्या GPS स्थानावर आधारित (२० किमी त्रिज्या)',
    aiLogo: 'AI',
    vaidya: 'वैद्य',
    prescription: 'प्रिस्क्रिप्शन',
    scanPrescription: 'प्रिस्क्रिप्शन स्कॅन करा',
    changeLang: 'तुमची भाषा बदला',
    chooseProblem: 'संदेश निवडा',
    medGuide: 'औषध मार्गदर्शक'
  },
  [Language.GUJARATI]: {
    searchPlaceholder: 'તમારા લક્ષણો અહીં ટાઇપ કરો...',
    homeGreeting: 'નમસ્તે',
    specialists: 'નિષ્ણાત ડોકટરો',
    seeAll: 'બધું જુઓ',
    hospital: 'હોસ્પિટલ',
    scanning: 'સ્કેનિંગ',
    ambulance: 'એમ્બ્યુલન્સ',
    pharmacy: 'ફાર્મસી',
    searchMeds: '૧૦૦+ દવાઓ શોધો...',
    aiAssistant: 'AI સહાયક',
    online: 'ઓનલાઇન',
    typeMessage: 'સંદેશ ટાઇપ કરો...',
    listening: 'સાંભળી રહ્યો છું...',
    howHelp: 'હું તમને કેવી રીતે મદદ કરી શકું?',
    aiDescription: 'હું લક્ષણોનું વિશ્લેષણ કરી શકું છું, દવાઓ સમજાવી શકું છું અથવા આરોગ્ય ટિપ્સમાં મદદ કરી શકું છું.',
    nearbyHospitals: 'નજીકની હોસ્પિટલો',
    scanningCenters: 'સ્કેનિંગ સેન્ટર્સ',
    emergency: 'ઇમરજન્સી',
    doctors: 'ડોકટરો',
    help: 'મદદ',
    home: 'હોમ',
    medicine: 'દવા',
    healthConditions: 'આરોગ્યની સ્થિતિ',
    feverSymptoms: 'તાવના લક્ષણો',
    medicineInfo: 'દવાની માહિતી',
    healthyDiet: 'સ્વસ્થ આહાર',
    emergencySigns: 'ઇમરજન્સી ચિહ્નો',
    locating: 'શોધી રહ્યું છે...',
    radiusInfo: 'તમારા GPS સ્થાન પર આધારિત (૨૦ કિમી ત્રિજ્યા)',
    aiLogo: 'AI',
    vaidya: 'વૈદ્ય',
    prescription: 'પ્રિસ્ક્રિપ્શન',
    scanPrescription: 'પ્રિસ્ક્રિપ્શન સ્કેન કરો',
    changeLang: 'તમારી ભાષા બદલો',
    chooseProblem: 'સમસ્યા પસંદ કરો',
    medGuide: 'દવા માર્ગદર્શિકા'
  },
  [Language.MALAYALAM]: {
    searchPlaceholder: 'നിങ്ങളുടെ ലക്ഷണങ്ങൾ ഇവിടെ ടൈപ്പ് ചെയ്യുക...',
    homeGreeting: 'നമസ്കാരം',
    specialists: 'വിദഗ്ദ്ധ ഡോക്ടർമാർ',
    seeAll: 'എല്ലാം കാണുക',
    hospital: 'ആശുപത്രി',
    scanning: 'സ്കാനിംഗ്',
    ambulance: 'ആംബുലൻസ്',
    pharmacy: 'ഫാർമസി',
    searchMeds: '100+ മരുന്നുകൾ തിരയുക...',
    aiAssistant: 'AI അസിസ്റ്റന്റ്',
    online: 'ഓൺലൈൻ',
    typeMessage: 'സന്ദേശം ടൈപ്പ് ചെയ്യുക...',
    listening: 'ശ്രദ്ധിക്കുന്നു...',
    howHelp: 'ഞാൻ നിങ്ങളെ എങ്ങനെ സഹായിക്കും?',
    aiDescription: 'എനിക്ക് ലക്ഷണങ്ങൾ വിശകലനം ചെയ്യാനും മരുന്നുകൾ വിശദീകരിക്കാനും അല്ലെങ്കിൽ ആരോഗ്യ നുറുങ്ങുകൾ നൽകാനും കഴിയും.',
    nearbyHospitals: 'അടുത്തുള്ള ആശുപത്രികൾ',
    scanningCenters: 'സ്കാനിംഗ് സെന്ററുകൾ',
    emergency: 'അടിയന്തരാവസ്ഥ',
    doctors: 'ഡോക്ടർമാർ',
    help: 'സഹായം',
    home: 'ഹോം',
    medicine: 'മരുന്ന്',
    healthConditions: 'ആരോഗ്യ നില',
    feverSymptoms: 'പനി ലക്ഷണങ്ങൾ',
    medicineInfo: 'മരുന്ന് വിവരങ്ങൾ',
    healthyDiet: 'ആരോഗ്യകരമായ ഭക്ഷണം',
    emergencySigns: 'അടിയന്തര ലക്ഷണങ്ങൾ',
    locating: 'കണ്ടെത്തുന്നു...',
    radiusInfo: 'നിങ്ങളുടെ GPS ലൊക്കേഷൻ അടിസ്ഥാനമാക്കി (20 കിലോമീറ്റർ ചുറ്റളവ്)',
    aiLogo: 'AI',
    vaidya: 'വൈദ്യ',
    changeLang: 'നിങ്ങളുടെ ഭാഷ മാറ്റുക',
    chooseProblem: 'പ്രശ്നം തിരഞ്ഞെടുക്കുക',
    medGuide: 'മരുന്ന് ഗൈഡ്'
  }
};

// --- Helper Components ---

const LanguageSelector: React.FC<{
  currentLanguage: Language;
  onSelect: (l: Language) => void;
  isOpen: boolean;
  onToggle: () => void;
  customIcon?: React.ReactNode;
}> = ({ currentLanguage, onSelect, isOpen, onToggle, customIcon }) => {
  const blinkClass = !isOpen ? 'animate-blink-soft' : '';

  return (
    <div className="relative">
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className={`p-2 transition-transform active:scale-90 flex flex-col items-center ${isOpen ? 'text-blue-500' : ''}`}
      >
        {customIcon ? (
          cloneElement(customIcon as React.ReactElement<any>, { 
            className: `${(customIcon as React.ReactElement<any>).props.className || ''} ${blinkClass}`.trim() 
          })
        ) : (
          <div className="relative">
            <Globe size={28} className={`text-gray-800 dark:text-zinc-100 ${blinkClass}`} />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white dark:border-zinc-950">
              <span className="text-[6px] text-white font-black uppercase">{currentLanguage}</span>
            </div>
          </div>
        )}
        <span className="text-[7px] font-black uppercase tracking-tighter mt-0.5 whitespace-nowrap opacity-70">change your language</span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 z-50 bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl border border-gray-100 dark:border-zinc-800 p-2 min-w-[220px] animate-in slide-in-from-top-4 duration-200 overflow-hidden">
          <div className="px-3 py-2 border-b border-gray-100 dark:border-zinc-800 mb-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Select Language</span>
          </div>
          <div className="max-h-[320px] overflow-y-auto no-scrollbar space-y-1">
            {[
              { id: Language.ENGLISH, label: 'English', sub: 'USA/UK', flag: '🇺🇸' },
              { id: Language.TELUGU, label: 'తెలుగు', sub: 'Telugu', flag: '🇮🇳' },
              { id: Language.HINDI, label: 'हिन्दी', sub: 'Hindi', flag: '🇮🇳' },
              { id: Language.TAMIL, label: 'தமிழ்', sub: 'Tamil', flag: '🇮🇳' },
              { id: Language.KANNADA, label: 'ಕನ್ನಡ', sub: 'Kannada', flag: '🇮🇳' },
              { id: Language.BENGALI, label: 'বাংলা', sub: 'Bengali', flag: '🇮🇳' },
              { id: Language.MARATHI, label: 'मराठी', sub: 'Marathi', flag: '🇮🇳' },
              { id: Language.GUJARATI, label: 'ગુજરાતી', sub: 'Gujarati', flag: '🇮🇳' },
              { id: Language.MALAYALAM, label: 'മലയാളം', sub: 'Malayalam', flag: '🇮🇳' }
            ].map((l) => (
              <button 
                key={l.id}
                onClick={() => {
                  onSelect(l.id);
                  onToggle();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all group ${
                  currentLanguage === l.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                  : 'text-gray-600 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-800'
                }`}
              >
                <span className="text-xl grayscale group-hover:grayscale-0 transition-all">{l.flag}</span>
                <div className="flex flex-col items-start">
                  <span className="leading-tight">{l.label}</span>
                  <span className="text-[9px] font-medium opacity-60">{l.sub}</span>
                </div>
                {currentLanguage === l.id ? (
                  <div className="ml-auto w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                    <Check size={12} className="text-white" strokeWidth={4} />
                  </div>
                ) : (
                  <div className="ml-auto w-2 h-2 rounded-full bg-gray-200 dark:bg-zinc-700 group-hover:bg-blue-400 transition-colors"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const LoginView: React.FC<{ onLogin: () => void, onNavigateToSignup: () => void, userName: string, language: Language }> = ({ onLogin, onNavigateToSignup, userName, language }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const t = TRANSLATIONS[language];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const isReal = await validateEmailWithAI(email);
      if (!isReal) {
        setError('Please enter a valid, real email address.');
        setLoading(false);
        return;
      }

      // Simulate authentication
      setTimeout(() => {
        onLogin();
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Connection error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-white dark:bg-zinc-950 items-center justify-center p-8 transition-colors duration-300">
      <div className="w-full max-w-sm space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-[3rem] bg-blue-50 dark:bg-blue-950/20 mb-4 animate-reveal">
             <div className="p-4 border-2 border-white dark:border-zinc-800 rounded-[2.5rem] bg-white dark:bg-zinc-900 shadow-xl overflow-hidden">
                <VaidyaLogo size={75} />
             </div>
          </div>
          <div className="relative">
             <h1 className="text-4xl font-black text-[#1a3b47] dark:text-white tracking-tighter text-center uppercase">
                {userName && userName !== 'Habibba' ? `Welcome, ${userName}` : 'VAIDYA'}
             </h1>
             <p className="text-[10px] font-black text-[#a3e635] uppercase tracking-[0.3em] mt-1">{t.vaidya}</p>
          </div>
          <p className="text-gray-500 dark:text-zinc-400 font-bold text-sm uppercase tracking-widest text-center">Healthcare & Emergency</p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <XCircle className="text-red-500 shrink-0" size={20} />
            <p className="text-xs font-black text-red-600 dark:text-red-400 uppercase tracking-tight">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                <Mail size={20} />
              </div>
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                className="w-full bg-gray-50 dark:bg-zinc-900 border-2 border-transparent focus:border-blue-500 dark:focus:border-blue-500 rounded-2xl py-4 pl-12 pr-4 text-gray-900 dark:text-white outline-none font-bold transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                <Lock size={20} />
              </div>
              <input 
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-gray-50 dark:bg-zinc-900 border-2 border-transparent focus:border-blue-500 dark:focus:border-blue-500 rounded-2xl py-4 pl-12 pr-12 text-gray-900 dark:text-white outline-none font-bold transition-all"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-5 rounded-[2rem] font-black text-xl shadow-[0_15px_30px_rgba(59,130,246,0.2)] active:scale-95 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <LogIn size={24} />}
            {loading ? 'VALIDATING...' : 'LOG IN'}
          </button>
        </form>

        <div className="text-center">
           <p className="text-sm text-gray-500 font-bold">Don't have an account? <button onClick={onNavigateToSignup} className="text-blue-600 font-black uppercase tracking-tighter ml-1">Sign Up</button></p>
        </div>
      </div>
    </div>
  );
};

const SignupView: React.FC<{ onSignup: (name: string, image: string | null) => void, onBack: () => void, language: Language }> = ({ onSignup, onBack, language }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const t = TRANSLATIONS[language];

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!agreed) {
      setError('You must agree to the Terms of Service.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    
    try {
      const isReal = await validateEmailWithAI(email);
      if (!isReal) {
        setError('The email address appears to be invalid or from an unsupported domain.');
        setLoading(false);
        return;
      }

      setTimeout(() => {
        onSignup(name, image);
        setLoading(false);
      }, 1500);
    } catch (err) {
      setError('Validation failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-white dark:bg-zinc-950 items-center justify-center p-8 transition-colors duration-300">
      <div className="w-full max-sm space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-blue-50 dark:bg-blue-950/20 mb-2 animate-reveal shadow-inner">
             <VaidyaLogo size={48} />
          </div>
          <h1 className="text-4xl font-black text-[#1a3b47] dark:text-white tracking-tighter">Join VAIDYA</h1>
          <p className="text-[10px] font-black text-[#a3e635] uppercase tracking-widest">{t.vaidya}</p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <XCircle className="text-red-500 shrink-0" size={20} />
            <p className="text-xs font-black text-red-600 dark:text-red-400 uppercase tracking-tight">{error}</p>
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="flex flex-col items-center gap-3 py-2">
            <div 
              onClick={handleImageClick}
              className="w-28 h-28 rounded-full border-4 border-dashed border-blue-500/30 dark:border-blue-500/20 flex items-center justify-center bg-gray-50 dark:bg-zinc-900 overflow-hidden cursor-pointer hover:border-blue-500 transition-all relative group shadow-inner"
            >
              {image ? (
                <img src={image} alt="Profile preview" className="w-full h-full object-cover animate-in fade-in zoom-in-75 duration-300" />
              ) : (
                <div className="flex flex-col items-center gap-1">
                   <Upload className="text-gray-300 group-hover:text-blue-500 transition-colors" size={32} />
                   <span className="text-[8px] font-black text-gray-400 uppercase">Gallery</span>
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
                accept="image/*" 
                className="hidden" 
              />
            </div>
            <button 
              type="button" 
              onClick={handleImageClick}
              className="px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-600 text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all active:scale-95"
            >
              Upload Your Image
            </button>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                <User size={18} />
              </div>
              <input 
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Habibba Begum"
                className="w-full bg-gray-50 dark:bg-zinc-900 border-2 border-transparent focus:border-blue-500 dark:focus:border-blue-500 rounded-2xl py-3.5 pl-11 pr-4 text-gray-900 dark:text-white outline-none font-bold transition-all text-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                <Mail size={18} />
              </div>
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                className="w-full bg-gray-50 dark:bg-zinc-900 border-2 border-transparent focus:border-blue-500 dark:focus:border-blue-500 rounded-2xl py-3.5 pl-11 pr-4 text-gray-900 dark:text-white outline-none font-bold transition-all text-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                <Lock size={18} />
              </div>
              <input 
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-gray-50 dark:bg-zinc-900 border-2 border-transparent focus:border-blue-500 dark:focus:border-blue-500 rounded-2xl py-3.5 pl-11 pr-11 text-gray-900 dark:text-white outline-none font-bold transition-all text-sm"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Confirm Password</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                <ShieldCheck size={18} />
              </div>
              <input 
                type={showPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full bg-gray-50 dark:bg-zinc-900 border-2 rounded-2xl py-3.5 pl-11 pr-11 text-gray-900 dark:text-white outline-none font-bold transition-all text-sm ${
                   confirmPassword ? (passwordsMatch ? 'border-emerald-500/30' : 'border-red-500/30') : 'border-transparent'
                }`}
              />
              {confirmPassword && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                   {passwordsMatch ? <Check className="text-emerald-500" size={16} /> : <XCircle className="text-red-500" size={16} />}
                </div>
              )}
            </div>
          </div>

          <label className="flex items-start gap-3 cursor-pointer group mt-6">
             <div className="relative mt-0.5">
                <input 
                  type="checkbox" 
                  checked={agreed} 
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="peer sr-only"
                />
                <div className="w-5 h-5 border-2 border-gray-200 dark:border-zinc-800 rounded-md peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all flex items-center justify-center">
                   <Check size={12} className="text-white opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={4} />
                </div>
             </div>
             <p className="text-[10px] text-gray-500 font-bold leading-relaxed select-none">
                I agree to VAIDYA's <span className="text-blue-600 underline">Terms of Service</span> and <span className="text-blue-600 underline">Privacy Policy</span>.
             </p>
          </label>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-4 rounded-2xl font-black text-lg shadow-[0_12px_24px_rgba(59,130,246,0.15)] active:scale-95 hover:scale-[1.01] transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-4 overflow-hidden relative"
          >
            {loading && <div className="absolute inset-0 bg-blue-600 flex items-center justify-center"><Loader2 className="animate-spin" /></div>}
            <Sparkles size={20} />
            {loading ? 'VALIDATING...' : 'CREATE ACCOUNT'}
          </button>
        </form>

        <div className="text-center pt-2">
           <button onClick={onBack} className="text-[11px] font-black text-gray-400 uppercase tracking-widest hover:text-blue-600 transition-colors flex items-center justify-center gap-2 mx-auto active:scale-95">
             <ArrowLeft size={14} /> Back to Log In
           </button>
        </div>
      </div>
    </div>
  );
};

const HomeView: React.FC<{ 
  onNavigate: (v: AppView) => void, 
  onDoctorClick: (d: Doctor) => void, 
  doctors: Doctor[], 
  isDarkMode: boolean, 
  toggleDarkMode: () => void,
  globalLanguage: Language,
  setGlobalLanguage: (l: Language) => void,
  userName: string,
  userImage: string,
  onUpdateUser: (name: string, image: string) => void,
  onLogout: () => void,
  dailyUsage: { count: number, date: string },
  dailyLimit: number,
  onRefill: () => void
}> = ({ onNavigate, onDoctorClick, doctors, isDarkMode, toggleDarkMode, globalLanguage, setGlobalLanguage, userName, userImage, onUpdateUser, onLogout, dailyUsage, dailyLimit, onRefill }) => {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(userName);
  const t = TRANSLATIONS[globalLanguage];
  
  const homeImageInputRef = useRef<HTMLInputElement>(null);

  const usagePercent = Math.min(100, (dailyUsage.count / dailyLimit) * 100);
  const isLimitReached = dailyUsage.count >= dailyLimit;

  const handleUpdateName = () => {
    if (newName.trim()) {
      onUpdateUser(newName.trim(), userImage);
      setIsEditingName(false);
      setShowProfileMenu(false);
    }
  };

  const handleHomeImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateUser(userName, reader.result as string);
        setShowProfileMenu(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950 relative transition-colors duration-300 overflow-hidden">
      <div className="h-64 bg-blue-50 dark:bg-blue-950/20 absolute top-0 left-0 right-0 z-0 transition-colors duration-300"></div>

      <div className="sticky top-0 z-30 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md px-6 pt-safe pb-4 transition-all duration-300">
        <div className="flex justify-between items-center mb-6 px-2 pt-4">
          <div className="flex items-center gap-4 relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-16 h-16 rounded-full border-4 border-white dark:border-zinc-800 shadow-lg overflow-hidden bg-white dark:bg-zinc-900 transition-colors duration-300 active:scale-95 hover:border-blue-500"
            >
              <img 
                src={userImage} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </button>
            <div>
               <h1 className="text-3xl font-medium text-gray-900 dark:text-zinc-100 drop-shadow-sm transition-colors duration-300 font-bold">
                  {t.homeGreeting} {userName}
               </h1>
               <p className="text-[11px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">{t.vaidya}</p>
            </div>

            {showProfileMenu && (
               <>
                 <div className="fixed inset-0 z-40" onClick={() => { setShowProfileMenu(false); setIsEditingName(false); }}></div>
                 <div className="absolute top-20 left-0 z-50 bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl border border-gray-100 dark:border-zinc-800 p-2 min-w-[240px] animate-in slide-in-from-top-4 duration-200">
                    {!isEditingName ? (
                      <button 
                        onClick={() => { setIsEditingName(true); setNewName(userName); }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <TypeIcon size={16} className="text-blue-500" /> Change Name
                      </button>
                    ) : (
                      <div className="px-3 py-4 space-y-3 bg-gray-50 dark:bg-zinc-800/50 rounded-xl m-1 border border-gray-100 dark:border-zinc-700 animate-in zoom-in-95 duration-200">
                         <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-black uppercase text-gray-400 tracking-widest">Edit Name</span>
                            <button onClick={() => setIsEditingName(false)} className="text-gray-400 hover:text-red-500"><X size={12}/></button>
                         </div>
                         <input 
                            autoFocus
                            type="text" 
                            value={newName} 
                            onChange={(e) => setNewName(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-blue-500/30 text-sm font-bold outline-none focus:border-blue-500 dark:text-white"
                            placeholder="Enter Name"
                         />
                         <div className="flex gap-2">
                           <button 
                              onClick={handleUpdateName}
                              className="flex-1 py-2 bg-blue-500 text-white rounded-lg text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-600 active:scale-95 transition-all shadow-md shadow-blue-500/20"
                           >
                              <Save size={14}/> Save
                           </button>
                           <button 
                              onClick={() => setIsEditingName(false)}
                              className="px-3 py-2 bg-gray-200 dark:bg-zinc-700 text-gray-600 dark:text-gray-300 rounded-lg text-xs font-black uppercase tracking-widest flex items-center justify-center hover:bg-gray-300 transition-all active:scale-95"
                           >
                              <X size={14}/>
                           </button>
                         </div>
                      </div>
                    )}
                    
                    {!isEditingName && (
                      <button 
                        onClick={() => homeImageInputRef.current?.click()}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <LucideCamera size={16} className="text-lime-500" /> Change Image
                        <input 
                          type="file" 
                          ref={homeImageInputRef} 
                          onChange={handleHomeImageChange} 
                          accept="image/*" 
                          capture="environment"
                          className="hidden" 
                        />
                      </button>
                    )}
                    
                    {!isEditingName && (
                      <button 
                        onClick={() => onNavigate('terms_policies')}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <ShieldCheck size={16} className="text-emerald-500" /> Terms & Policies
                      </button>
                    )}
                    
                    {!isEditingName && (
                      <>
                        <div className="h-px bg-gray-100 dark:bg-zinc-800 my-1"></div>
                        <button 
                          onClick={onLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-black text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                        >
                          <LogOut size={16} /> Logout
                        </button>
                      </>
                    )}
                 </div>
               </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleDarkMode} className="text-gray-800 dark:text-zinc-100 p-2 transition-colors duration-300">
              {isDarkMode ? <Sun size={28} /> : <Moon size={28} />}
            </button>
            <button onClick={() => onNavigate('notifications')} className="text-gray-800 dark:text-zinc-100 p-2 transition-colors duration-300">
              <Bell size={32} className="stroke-[1.5px]" />
            </button>
          </div>
        </div>

        {/* Search Bar with Globe Icon */}
        <div className="mb-6 relative">
          <div className="relative shadow-2xl rounded-[2rem] bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 flex items-center px-6 py-5 transition-colors duration-300">
            <input 
              type="text" 
              placeholder={t.searchPlaceholder} 
              className="bg-transparent text-gray-500 dark:text-zinc-400 w-full text-xl outline-none px-2"
              readOnly
              onClick={() => onNavigate('chatbot')}
            />
            <LanguageSelector 
              currentLanguage={globalLanguage} 
              onSelect={setGlobalLanguage} 
              isOpen={showLangMenu} 
              onToggle={() => setShowLangMenu(!showLangMenu)} 
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="flex flex-col items-center gap-2">
            <button onClick={() => onNavigate('hospitals')} className="w-full aspect-square bg-white dark:bg-zinc-900 rounded-3xl shadow-xl flex items-center justify-center border border-gray-50 dark:border-zinc-800 group active:scale-95 transition-all">
              <div className="p-3 border-2 border-blue-500 rounded-2xl">
                 <Hospital size={28} className="text-blue-500 animate-subtle-blink" />
              </div>
            </button>
            <span className="text-gray-500 dark:text-zinc-400 font-bold text-xs uppercase tracking-tight text-center">{t.hospital}</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <button onClick={() => onNavigate('scanning')} className="w-full aspect-square bg-white dark:bg-zinc-900 rounded-3xl shadow-xl flex items-center justify-center border border-gray-100 dark:border-zinc-800 active:scale-95 transition-all">
               <div className="p-3 border-2 border-[#a3e635] rounded-2xl">
                  <Plus size={28} className="text-[#a3e635] animate-subtle-blink" />
               </div>
            </button>
            <span className="text-gray-500 dark:text-zinc-400 font-bold text-xs uppercase tracking-tight text-center">{t.scanning}</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <button onClick={() => onNavigate('prescription_scanner')} className="w-full aspect-square bg-white dark:bg-zinc-900 rounded-3xl shadow-xl flex items-center justify-center border border-gray-100 dark:border-zinc-800 active:scale-95 transition-all">
               <div className="p-3 border-2 border-purple-500 rounded-2xl">
                 <FileText size={26} className="text-purple-500 animate-subtle-blink" />
               </div>
            </button>
            <span className="text-gray-500 dark:text-zinc-400 font-bold text-xs uppercase tracking-tight text-center">{t.prescription}</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <button onClick={() => onNavigate('emergency')} className="w-full aspect-square bg-white dark:bg-zinc-900 rounded-3xl shadow-xl flex items-center justify-center border border-gray-100 dark:border-zinc-800 active:scale-95 transition-all">
               <div className="p-3 border-2 border-red-500 rounded-2xl">
                 <PhoneCall size={26} className="text-red-500 animate-subtle-blink" />
               </div>
            </button>
            <span className="text-gray-500 dark:text-zinc-400 font-bold text-xs uppercase tracking-tight text-center">{t.ambulance}</span>
          </div>
        </div>
      </div>

      <div className="p-6 pt-0">
        <div className="mb-6">
          <div className="flex justify-between items-end mb-6">
            <h3 className="text-2xl font-black text-gray-800 dark:text-zinc-100 tracking-tight transition-colors duration-300">{t.specialists}</h3>
            <button onClick={() => onNavigate('doctors')} className="text-gray-400 dark:text-zinc-500 text-lg font-bold">{t.seeAll}</button>
          </div>

          <div className="flex overflow-x-auto gap-4 no-scrollbar pb-4 -mx-2 px-2">
            {doctors.map((doc) => (
              <div key={doc.id} onClick={() => onDoctorClick(doc)} className="min-w-[220px] bg-white dark:bg-zinc-900 rounded-[2rem] border border-gray-100 dark:border-zinc-800 shadow-md flex flex-col overflow-hidden active:scale-[0.98] transition-all">
                <div className="w-full h-44 overflow-hidden relative bg-gray-50 dark:bg-zinc-800 transition-colors duration-300">
                  <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
                  <div className="absolute bottom-2 right-2 bg-white dark:bg-zinc-900 px-2 py-0.5 rounded-lg flex items-center gap-1 shadow-sm transition-colors duration-300">
                    <Star size={8} fill="#facc15" className="text-yellow-400" />
                    <span className="text-[10px] font-black text-gray-800 dark:text-zinc-100">{doc.rating} ({doc.reviewsCount})</span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-sm text-gray-900 dark:text-zinc-100 leading-tight truncate transition-colors duration-300">{doc.name}</h4>
                  <p className="text-[10px] text-gray-400 dark:text-zinc-500 font-black uppercase mt-1">{doc.specialty}</p>
                  <p className="text-[10px] text-gray-600 dark:text-zinc-400 font-bold mt-1">{doc.hospitalName}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const GeneralHealthDetailView: React.FC<{ 
  onBack: () => void, 
  globalLanguage: Language, 
  setGlobalLanguage: (l: Language) => void 
}> = ({ onBack, globalLanguage, setGlobalLanguage }) => {
  const [activeTab, setActiveTab] = useState('Weakness');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const t = TRANSLATIONS[globalLanguage];

  // Localized Data for General Health
  const GENERAL_DATA: Record<Language, any> = {
    [Language.ENGLISH]: {
      categories: [
        { id: 'Weakness', label: 'Weakness', sub: '(నీరసం)' },
        { id: 'Fatigue', label: 'Fatigue', sub: '(అలసట)' },
        { id: 'Dehydration', label: 'Dehydration', sub: '(డీహైడ్రేషన్)' },
        { id: 'Emergency', label: '🔴 Serious Signs', sub: '(అత్యవసర)' }
      ],
      medicines: [
        { name: 'ORS Powder', power: 'Standard sachet', company: 'Electral / FDC', use: 'Dehydration, weakness', timing: 'Mix in water, drink through day', cost: '₹20–40', warn: 'SEVERE DEHYDRATION → HOSPITAL', side: 'Rare, salt taste', foodEat: 'Rice, banana, curd', foodAvoid: 'Alcohol, junk food' },
        { name: 'Zincovit', power: 'Multivitamin', company: 'Apex', use: 'Weakness, low immunity', timing: 'Once daily after food', cost: '₹90–150', warn: 'DO NOT OVERDOSE', side: 'Mild stomach upset', foodEat: 'Normal meals, fruits', foodAvoid: 'Alcohol excess' }
      ],
      emergency: { title: 'RED ALERT!', list: ['Fainting', 'Cannot drink water', 'Continuous vomiting', 'Confusion', 'Very weak to stand'], footer: 'Go to hospital immediately.' }
    },
    [Language.TELUGU]: {
      categories: [
        { id: 'Weakness', label: 'నీరసం', sub: '(Weakness)' },
        { id: 'Fatigue', label: 'అలసట', sub: '(Fatigue)' },
        { id: 'Dehydration', label: 'డీహైడ్రేషన్', sub: '(Dehydration)' },
        { id: 'Emergency', label: '🔴 అత్యవసర సంకేతాలు', sub: '(Serious Signs)' }
      ],
      medicines: [
        { name: 'ORS పౌడర్', power: 'ప్రామాణిక సాచెట్', company: 'Electral / FDC', use: 'డీహైడ్రేషన్, నీరసం', timing: 'నీటిలో కలిపి, రోజంతా తాగాలి', cost: '₹20–40', warn: 'తీవ్రమైన డీహైడ్రేషన్ → వెంటనే ఆసుపత్రికి', side: 'అరుదుగా, ఉప్పు రుచి', foodEat: 'అన్నం, అరటిపండు, పెరుగు', foodAvoid: 'మద్యపానంతో నివారించండి, జంక్ ఫుడ్' },
        { name: 'జింకోవిట్', power: 'మల్టీవిటమిన్', company: 'Apex', use: 'నీరసం, తక్కువ రోగనిరోధక శక్తి', timing: 'భోజనం తర్వాత రోజుకు ఒకసారి', cost: '₹90–150', warn: 'అతిగా వాడకండి', side: 'తేలికపాటి కడుపు నొప్పి', foodEat: 'సాధారణ భోజనం, పండ్లు', foodAvoid: 'మద్యపానం' }
      ],
      emergency: { title: 'రెడ్ అలర్ట్!', list: ['స్పృహ కోల్పోవడం', 'నీరు తాగలేకపోవడం', 'నిరంతర వాంతులు', 'గందరగోళం', 'నిలబడలేనంత నీరసం'], footer: 'వెంటనే ఆసుపత్రికి వెళ్లండి.' }
    },
    [Language.HINDI]: {
      categories: [
        { id: 'Weakness', label: 'कमजोरी', sub: '(Weakness)' },
        { id: 'Fatigue', label: 'थकान', sub: '(Fatigue)' },
        { id: 'Dehydration', label: 'निर्जलीकरण', sub: '(Dehydration)' },
        { id: 'Emergency', label: '🔴 गंभीर लक्षण', sub: '(Emergency)' }
      ],
      medicines: [
        { name: 'ORS पाउडर', power: 'मानक पाउच', company: 'Electral / FDC', use: 'निर्जलीकरण, कमजोरी', timing: 'पानी में मिलाएं, दिन भर पिएं', cost: '₹20–40', warn: 'गंभीर निर्जलीकरण → अस्पताल जाएं', side: 'दुर्लभ, नमकीन स्वाद', foodEat: 'चावल, केला, दही', foodAvoid: 'शराब, जंक फूड' },
        { name: 'जिंकोविट', power: 'मल्टीविटामिन', company: 'Apex', use: 'कमजोरी, कम रोग प्रतिरोधक क्षमता', timing: 'भोजन के बाद दिन में एक बार', cost: '₹90–150', warn: 'ओवरडोज न लें', side: 'पेट की हल्की खराबी', foodEat: 'सामान्य भोजन, फल', foodAvoid: 'अत्यधिक शराब' }
      ],
      emergency: { title: 'रेड अलर्ट!', list: ['बेहोशी', 'पानी न पी पाना', 'लगातार उल्टी', 'भ्रम', 'खड़े होने में अत्यधिक कमजोरी'], footer: 'तुरंत अस्पताल जाएं।' }
    },
    [Language.TAMIL]: {
      categories: [
        { id: 'Weakness', label: 'பலவீனம்', sub: '(Weakness)' },
        { id: 'Fatigue', label: 'சோர்வு', sub: '(Fatigue)' },
        { id: 'Dehydration', label: 'நீரிழப்பு', sub: '(Dehydration)' },
        { id: 'Emergency', label: '🔴 அவசர அறிகுறிகள்', sub: '(Emergency)' }
      ],
      medicines: [
        { name: 'ORS தூள்', power: 'தரமான பாக்கெட்', company: 'Electral / FDC', use: 'நீரிழப்பு, பலவீனம்', timing: 'தண்ணீரில் கலந்து நாள் முழுவதும் குடிக்கவும்', cost: '₹20–40', warn: 'கடுமையான நீரிழப்பு → மருத்துவமனைக்குச் செல்லவும்', side: 'அரிதானது, உப்பு சுவை', foodEat: 'சாதம், வாழைப்பழம், தயிர்', foodAvoid: 'மதுபானம், జంక్ ஃபுட்' },
        { name: 'ஜிங்கோவிட்', power: 'மல்டிவைட்டமின்', company: 'Apex', use: 'பலவீனம், நோய் எதிர்ப்பு சக்தி குறைவு', timing: 'உணவுக்குப் பிறகு ஒரு நாளைಕ್ಕೆ ஒரு முறை', cost: '₹90–150', warn: 'அதிகமாக எடுத்துக்கொள்ள வேண்டாம்', side: 'லேசான வயிற்று உபாதை', foodEat: 'சாதாரண உணவு, பழங்கள்', foodAvoid: 'மதுபானம்' }
      ],
      emergency: { title: 'ரெட் అలర్ట్!', list: ['மயக்கம்', 'தண்ணீர் குடிக்க முடியாமை', 'தொடர்ச்சியான வாந்தி', 'குழப்பம்', 'நிற்க முடியாத பலவீனம்'], footer: 'உடனடியாக மருத்துவமனைக்குச் செல்லவும்.' }
    },
    [Language.KANNADA]: {
      categories: [
        { id: 'Weakness', label: 'ದೌರ್ಬಲ್ಯ', sub: '(Weakness)' },
        { id: 'Fatigue', label: 'ಆಯಾಸ', sub: '(Fatigue)' },
        { id: 'Dehydration', label: 'ನಿರ್ಜಲೀಕರಣ', sub: '(Dehydration)' },
        { id: 'Emergency', label: '🔴 ಗಂಭೀರ ಲಕ್ಷಣಗಳು', sub: '(Emergency)' }
      ],
      medicines: [
        { name: 'ORS ಪುಡಿ', power: 'ಸ್ಟ್ಯಾಂಡರ್ಡ್ ಸ್ಯಾಚೆಟ್', company: 'Electral / FDC', use: 'ನಿರ್ಜಲೀಕರಣ, ದೌರ್ಬಲ್ಯ', timing: 'ನೀರಿನಲ್ಲಿ ಬೆರೆಸಿ ದಿನವಿಡೀ ಕುಡಿಯಿರಿ', cost: '₹20–40', warn: 'ತೀವ್ರ ನಿರ್ಜಲೀಕರಣ → ಆಸ್ಪತ್ರೆಗೆ ಹೋಗಿ', side: 'ಅಪರೂಪ, ಉಪ್ಪು ರುಚಿ', foodEat: 'ಅನ್ನ, ಬಾಳೆಹಣ್ಣು, ಮೊಸರು', foodAvoid: 'ಮದ್ಯಪಾನ, ಜಂಕ್ ಫುಡ್' },
        { name: 'ಜಿಂಕೋವಿಟ್', power: 'ಮಲ್ಟಿವಿಟಮಿನ್', company: 'Apex', use: 'ದೌರ್ಬಲ್ಯ, ರೋಗನಿರೋಧಕ ಶಕ್ತಿ ಕೊರತೆ', timing: 'ಊಟದ ನಂತರ ದಿನಕ್ಕೆ ಒಮ್ಮೆ', cost: '₹90–150', warn: 'ಅತಿಯಾದ ಪ್ರಮಾಣ ಬೇಡ', side: 'ಸೌಮ್ಯ ಹೊಟ್ಟೆಯ ತೊಂದರೆ', foodEat: 'ಸಾಮಾನ್ಯ ಊಟ, ಹಣ್ಣುಗಳು', foodAvoid: 'ಮದ್ಯಪಾನ' }
      ],
      emergency: { title: 'ರೆಡ್ అలర్ట్!', list: ['ಪ್ರಜ್ಞೆ ತಪ್ಪುವುದು', 'ನೀರು ಕುಡಿಯಲು ಅಸಮರ್ಥತೆ', 'ನಿರಂತರ ವಾಂತಿ', 'ಗೊಂದಲ', 'ನಿಲ್ಲಲು ಆಗದಷ್ಟು ದೌರ್ಬಲ್ಯ'], footer: 'ತಕ್ಷಣ ಆಸ್ಪತ್ರೆಗೆ ಹೋಗಿ.' }
    },
    [Language.BENGALI]: {
      categories: [
        { id: 'Weakness', label: 'দুর্বলতা', sub: '(Weakness)' },
        { id: 'Fatigue', label: 'ক্লান্তি', sub: '(Fatigue)' },
        { id: 'Dehydration', label: 'ডিহাইড্রেশন', sub: '(Dehydration)' },
        { id: 'Emergency', label: '🔴 গুরুতর লক্ষণ', sub: '(Serious Signs)' }
      ],
      medicines: [
        { name: 'ORS পাউডার', power: 'স্ট্যান্ডার্ড স্যাচেট', company: 'Electral / FDC', use: 'ডিহাইড্রেশন, দুর্বলতা', timing: 'জলে মিশিয়ে সারাদিন পান করুন', cost: '₹২০–৪০', warn: 'তীব্র ডিহাইড্রেশন → হাসপাতাল', side: 'বিরল, নোনতা স্বাদ', foodEat: 'ভাত, কলা, দই', foodAvoid: 'অ্যালকোহল, জাঙ্ক ফুড' },
        { name: 'Zincovit', power: 'মাল্টিভিটামিন', company: 'Apex', use: 'দুর্বলতা, কম রোগ প্রতিরোধ ক্ষমতা', timing: 'খাবারের পর দিনে একবার', cost: '₹৯০–১৫০', warn: 'অতিরিক্ত সেবন করবেন না', side: 'সামান্য পেট খারাপ', foodEat: 'স্বাভাবিক খাবার, ফল', foodAvoid: 'অতিরিক্ত অ্যালকোহল' }
      ],
      emergency: { title: 'রেড অ্যালার্ট!', list: ['মূর্ছা যাওয়া', 'জল পান করতে না পারা', 'অবিরাম বমি', 'বিভ্রান্তি', 'দাঁড়াতে না পারার মতো দুর্বলতা'], footer: 'অবিলম্বে হাসপাতালে যান।' }
    },
    [Language.MARATHI]: {
      categories: [
        { id: 'Weakness', label: 'कमजोरी', sub: '(Weakness)' },
        { id: 'Fatigue', label: 'थकावट', sub: '(Fatigue)' },
        { id: 'Dehydration', label: 'निर्जलीकरण', sub: '(Dehydration)' },
        { id: 'Emergency', label: '🔴 गंभीर लक्षण', sub: '(Serious Signs)' }
      ],
      medicines: [
        { name: 'ORS पावडर', power: 'मानक पाकीट', company: 'Electral / FDC', use: 'निर्जलीकरण, कमजोरी', timing: 'पाण्यात मिसळून दिवसभर प्या', cost: '₹२०–४०', warn: 'गंभीर निर्जलीकरण → रुग्णालय', side: 'दुर्मिळ, खारट चव', foodEat: 'भात, केळी, दही', foodAvoid: 'मद्यपान, जंक फूड' },
        { name: 'Zincovit', power: 'मल्टीविटामिन', company: 'Apex', use: 'कमजोरी, कमी रोगप्रतिकारशक्ती', timing: 'जेवणानंतर दिवसातून एकदा', cost: '₹९०–१५०', warn: 'ओव्हरडोज घेऊ नका', side: 'सौम्य पोटदुखी', foodEat: 'सामान्य जेवण, फळे', foodAvoid: 'अति मद्यपान' }
      ],
      emergency: { title: 'रेड अलर्ट!', list: ['बेशुद्ध पडणे', 'पाणी पिण्यास असमर्थता', 'सतत उलट्या', 'गोंधळ', 'उभे राहण्यास असमर्थता'], footer: 'त्वरीत रुग्णालयात जा.' }
    },
    [Language.GUJARATI]: {
      categories: [
        { id: 'Weakness', label: 'નબળાઈ', sub: '(Weakness)' },
        { id: 'Fatigue', label: 'થાક', sub: '(Fatigue)' },
        { id: 'Dehydration', label: 'ડિહાઇડ્રેશન', sub: '(Dehydration)' },
        { id: 'Emergency', label: '🔴 ગંભીર ચિહ્નો', sub: '(Serious Signs)' }
      ],
      medicines: [
        { name: 'ORS પાવડર', power: 'સ્ટાન્ડર્ડ પેકેટ', company: 'Electral / FDC', use: 'ડિહાઇડ્રેશન, નબળાઈ', timing: 'પાણીમાં ભેળવીને આખો દિવસ પીવો', cost: '₹૨૦–૪૦', warn: 'ગંભીર ડિહાઇડ્રેશન → હોસ્પિટલ', side: 'દુર્લભ, ખારો સ્વાદ', foodEat: 'ભાત, કેળા, દહીં', foodAvoid: 'દારૂ, જંક ફૂડ' },
        { name: 'Zincovit', power: 'મલ્ટીવિટામીન', company: 'Apex', use: 'નબળાઈ, ઓછી રોગપ્રતિકારક શક્તિ', timing: 'જમ્યા પછી દિવસમાં એકવાર', cost: '₹૯૦–૧૫૦', warn: 'વધારે પડતો ડોઝ ન લેવો', side: 'પેટમાં હળવી તકલીફ', foodEat: 'સામાન્ય ભોજન, ફળો', foodAvoid: 'વધારે પડતો દારૂ' }
      ],
      emergency: { title: 'રેડ એલર્ટ!', list: ['બેભાન થવું', 'પાણી પીવામાં અસમર્થતા', 'સતત ઉલટી', 'મૂંઝવણ', 'ઊભા રહેવામાં અસમર્થતા'], footer: 'તરત જ હોસ્પિટલ જાઓ.' }
    },
    [Language.MALAYALAM]: {
      categories: [
        { id: 'Weakness', label: 'ക്ഷീണം', sub: '(Weakness)' },
        { id: 'Fatigue', label: 'തളർച്ച', sub: '(Fatigue)' },
        { id: 'Dehydration', label: 'നിർജ്ജലീകരണം', sub: '(Dehydration)' },
        { id: 'Emergency', label: '🔴 ഗുരുതരമായ ലക്ഷണങ്ങൾ', sub: '(Serious Signs)' }
      ],
      medicines: [
        { name: 'ORS പൗഡർ', power: 'സ്റ്റാൻഡേർഡ് സാച്ചെറ്റ്', company: 'Electral / FDC', use: 'നിർജ്ജലീകരണം, ക്ഷീണം', timing: 'വെള്ളത്തിൽ കലർത്തി ദിവസം മുഴുവൻ കുടിക്കുക', cost: '₹20–40', warn: 'കഠിനമായ നിർജ്ജലീകരണം → ആശുപത്രി', side: 'അപൂർവ്വമായി, ഉപ്പ് രുചി', foodEat: 'ചോറ്, പഴം, തൈര്', foodAvoid: 'മദ്യം, ജങ്ക് ഫുഡ്' },
        { name: 'Zincovit', power: 'മൾട്ടിവിറ്റമിൻ', company: 'Apex', use: 'ക്ഷീണം, കുറഞ്ഞ പ്രതിരോധശേഷി', timing: 'ഭക്ഷണത്തിന് ശേഷം ദിവസത്തിൽ ഒരിക്കൽ', cost: '₹90–150', warn: 'അമിതമായി ഉപയോഗിക്കരുത്', side: 'നേരിയ വയറുവേദന', foodEat: 'സാധാരണ ഭക്ഷണം, പഴങ്ങൾ', foodAvoid: 'അമിതമായ മദ്യപാനം' }
      ],
      emergency: { title: 'റെഡ് അലേർട്ട്!', list: ['ബോധക്ഷയം', 'വെള്ളം കുടിക്കാൻ കഴിയാത്ത അവസ്ഥ', 'തുടർച്ചയായ ഛർദ്ദി', 'ആശയക്കുഴപ്പം', 'നിൽക്കാൻ കഴിയാത്തത്ര ക്ഷീണം'], footer: 'ഉടൻ ആശുപത്രിയിൽ പോകുക.' }
    }
  };

  const currentData = GENERAL_DATA[globalLanguage] || GENERAL_DATA[Language.ENGLISH];
  const isEmergencySelected = activeTab === 'Emergency';

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950 transition-colors duration-300 animate-in fade-in duration-500">
      {/* Header with requested UI */}
      <div className="p-6 bg-white dark:bg-zinc-900 border-b dark:border-zinc-800 sticky top-0 z-40 flex items-center gap-4 shadow-sm">
        <button onClick={onBack} className="w-12 h-12 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center active:scale-90 transition-all border border-gray-100 dark:border-zinc-700 shrink-0">
          <ArrowLeft size={24} className="dark:text-white text-gray-900" />
        </button>
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center gap-3">
             <div className="p-2.5 bg-blue-50 dark:bg-blue-900/30 rounded-2xl">
                <Battery className="text-blue-500" size={28} />
             </div>
             <div className="min-w-0">
                <h1 className="text-2xl font-black text-gray-900 dark:text-white leading-tight uppercase truncate">{t.healthConditions}</h1>
                <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest truncate">General Health Guide</p>
             </div>
          </div>
          {/* Requested Logo + Text UI */}
          <div className="flex items-center mt-2 -ml-2">
            <LanguageSelector 
              currentLanguage={globalLanguage}
              onSelect={setGlobalLanguage}
              isOpen={showLangMenu}
              onToggle={() => setShowLangMenu(!showLangMenu)}
              customIcon={<Globe className="text-rose-500" size={20} />}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-40 no-scrollbar">
        {/* selector */}
        <div>
           <h3 className="text-[11px] font-black uppercase text-gray-400 tracking-widest mb-4 px-2">{t.chooseProblem}</h3>
           <div className="flex flex-wrap gap-3">
              {currentData.categories.map((cat: any) => (
                 <button 
                   key={cat.id} 
                   onClick={() => setActiveTab(cat.id)}
                   className={`px-5 py-3 rounded-2xl text-xs font-black transition-all border-2 text-left flex flex-col ${
                     activeTab === cat.id 
                     ? (cat.id === 'Emergency' ? 'bg-red-600 border-red-600 text-white shadow-xl shadow-red-500/30' : 'bg-blue-500 border-blue-500 text-white shadow-xl shadow-blue-500/30') 
                     : 'bg-white dark:bg-zinc-800 text-gray-500 dark:text-gray-400 border-gray-100 dark:border-zinc-800 hover:border-blue-300'
                   }`}
                 >
                    <span>{cat.label}</span>
                    <span className={`text-[9px] mt-0.5 opacity-80 ${activeTab === cat.id ? 'text-white' : 'text-gray-400'}`}>{cat.sub}</span>
                 </button>
              ))}
           </div>
        </div>

        {isEmergencySelected ? (
           <div className="space-y-6 animate-in zoom-in-95 duration-300">
              <div className="p-8 bg-red-600 text-white rounded-[2.5rem] shadow-2xl border-[6px] border-red-500/50 flex flex-col items-center text-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                     <Siren size={60} className="animate-pulse" />
                  </div>
                  <div>
                     <h3 className="font-black text-3xl uppercase tracking-tighter mb-3 leading-tight">{currentData.emergency.title}</h3>
                     <p className="text-lg font-bold leading-relaxed opacity-95">
                        {currentData.emergency.list.map((item: string) => <React.Fragment key={item}>• {item}<br/></React.Fragment>)}
                     </p>
                     <div className="h-px bg-white/30 my-6"></div>
                     <p className="text-2xl font-black uppercase tracking-tight">
                        {currentData.emergency.footer}
                     </p>
                  </div>
              </div>
              
              <div className="p-6 bg-white dark:bg-zinc-900 border-2 border-red-100 dark:border-red-900/20 rounded-[2rem] space-y-4">
                 <h4 className="text-red-600 font-black uppercase text-sm flex items-center gap-2 px-1 text-center justify-center">
                   <AlertCircle size={18} /> CRITICAL SAFETY WARNING
                 </h4>
                 <p className="text-sm font-bold text-gray-600 dark:text-zinc-400 leading-relaxed px-1 text-center">
                   In case of extreme weakness, medication alone is not enough. Direct medical observation is mandatory.
                 </p>
              </div>
           </div>
        ) : (
          <>
            {/* Reference medicines section */}
            <div className="space-y-6">
               <div className="flex items-center justify-between px-2">
                  <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">{t.medGuide} {activeTab.toUpperCase()}</h3>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 dark:bg-zinc-800 rounded-full">
                    <Lock size={14} className="text-gray-400" />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Reference Only</span>
                  </div>
               </div>

               <div className="bg-amber-50 dark:bg-amber-900/10 p-5 rounded-[2rem] border-2 border-amber-100/50 dark:border-amber-900/20 flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 dark:bg-amber-800/30 rounded-2xl flex items-center justify-center shrink-0">
                    <AlertCircle className="text-amber-600" size={24} />
                  </div>
                  <div>
                     <p className="text-sm font-black text-amber-700 dark:text-amber-300 uppercase leading-snug">Doctor advice required. Do not self-medicate.</p>
                  </div>
               </div>

               <div className="space-y-6">
                  {currentData.medicines.map((med: any, idx: number) => (
                     <div key={idx} className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-[3rem] p-7 shadow-xl hover:shadow-2xl transition-all duration-300 group border-b-8 border-b-blue-500/10">
                        <div className="flex justify-between items-start mb-6">
                           <div>
                              <h4 className="text-2xl font-black text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform origin-left">{med.name}</h4>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-xl text-[11px] font-black text-blue-600 dark:text-blue-400 uppercase border border-blue-100 dark:border-blue-800">{med.power}</span>
                                <span className="text-gray-200">|</span>
                                <span className="text-[11px] font-black text-gray-400 uppercase tracking-wide">{med.company}</span>
                              </div>
                           </div>
                           <div className="p-4 bg-gray-50 dark:bg-zinc-800 rounded-3xl group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
                              <Pill size={28} className="text-blue-500" />
                           </div>
                        </div>
                        
                        <div className="space-y-6">
                           <div className="grid grid-cols-2 gap-4">
                              <div className="bg-slate-50 dark:bg-zinc-800/50 p-5 rounded-[2rem] border border-slate-100 dark:border-zinc-700">
                                 <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">Use</p>
                                 <p className="text-sm font-bold text-gray-800 dark:text-zinc-200 leading-tight">{med.use}</p>
                              </div>
                              <div className="bg-slate-50 dark:bg-zinc-800/50 p-5 rounded-[2rem] border border-slate-100 dark:border-zinc-700">
                                 <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">Timing</p>
                                 <p className="text-sm font-bold text-gray-800 dark:text-zinc-200 leading-tight">{med.timing}</p>
                              </div>
                           </div>

                           <div className="bg-rose-50 dark:bg-rose-900/10 p-6 rounded-[2.2rem] border-2 border-rose-100/50 dark:border-rose-900/20">
                              <p className="text-[11px] font-black uppercase text-rose-500 tracking-widest mb-2 flex items-center gap-2">
                                 <AlertTriangle size={14} /> Warning
                              </p>
                              <p className="text-[14px] font-black text-rose-700 dark:text-rose-300 leading-tight uppercase tracking-tight">{med.warn}</p>
                           </div>

                           <div className="px-1 flex justify-between gap-4">
                              <div>
                                 <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2 flex items-center gap-2">
                                    <Activity size={14} /> Side Effects
                                 </p>
                                 <p className="text-[13px] font-bold text-gray-600 dark:text-zinc-400 leading-relaxed">{med.side}</p>
                              </div>
                              <div className="text-right">
                                 <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2 flex items-center gap-2 justify-end">
                                    <Tag size={14} /> Approx Cost
                                 </p>
                                 <p className="text-[16px] font-black text-gray-800 dark:text-white leading-relaxed">{med.cost}</p>
                              </div>
                           </div>

                           <div className="grid grid-cols-2 gap-4">
                              <div className="bg-emerald-50 dark:bg-emerald-900/10 p-5 rounded-[2rem] border border-emerald-100/50 dark:border-emerald-900/20">
                                 <div className="flex items-center gap-2 mb-2 text-emerald-600">
                                    <Utensils size={14} />
                                    <p className="text-[10px] font-black uppercase tracking-widest">Food: Eat</p>
                                 </div>
                                 <p className="text-sm font-black text-emerald-800 dark:text-emerald-300">{med.foodEat}</p>
                              </div>
                              <div className="bg-rose-50 dark:bg-rose-900/10 p-5 rounded-[2rem] border border-rose-100/50 dark:border-rose-900/20">
                                 <div className="flex items-center gap-2 mb-2 text-rose-600">
                                    <Ban size={14} />
                                    <p className="text-[10px] font-black uppercase tracking-widest">Avoid</p>
                                 </div>
                                 <p className="text-sm font-black text-rose-800 dark:text-rose-300">{med.foodAvoid}</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* Bottom Section */}
            <div className="space-y-6 pt-6">
                <div className="p-8 text-center bg-gray-50 dark:bg-zinc-900 rounded-[3rem] border-2 border-dashed border-gray-200 dark:border-zinc-800">
                   <h5 className="text-xl font-black text-gray-900 dark:text-white uppercase mb-4 tracking-tighter">Doctor Advice is Compulsory</h5>
                   <p className="text-xs text-gray-500 font-bold leading-relaxed max-w-[280px] mx-auto uppercase tracking-wide opacity-80">
                      This application provides general reference information ONLY. It is not a clinical diagnosis or treatment plan.
                   </p>
                </div>
                
                <div className="bg-blue-600 p-8 rounded-[3rem] text-white flex flex-col items-center text-center gap-4 shadow-xl shadow-blue-600/20">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <Info size={24} />
                    </div>
                    <h5 className="text-lg font-black uppercase tracking-tight">Medical Disclaimer</h5>
                    <p className="text-xs font-bold leading-relaxed opacity-90">
                       "This app provides general health information only. It does not replace professional medical advice."
                    </p>
                </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const StomachCareDetailView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('Stomach Pain');
  
  const categories = [
    { id: 'Stomach Pain', label: 'Stomach Pain', sub: '(కడుపు నొప్పి)' },
    { id: 'Vomiting', label: 'Vomiting', sub: '(వాంతులు)' },
    { id: 'Diarrhea', label: 'Diarrhea', sub: '(విరేచనాలు)' },
    { id: 'Acidity', label: 'Acidity', sub: '(ఎసిడిటీ)' },
    { id: 'Emergency', label: '🔴 Serious Symptoms', sub: '(అత్యవసర)' }
  ];
  
  const medicineData = [
    { 
      name: 'Pantoprazole', 
      power: '40 mg', 
      company: 'Sun Pharma', 
      use: 'Acidity, burning sensation (కడుపు మంట)', 
      timing: 'Morning, before food (ఉదయం పరగడుపున)', 
      cost: '₹40–80', 
      warn: 'Use long term only if doctor says (వైద్యుల సూచన మేరకే వాడాలి)', 
      side: 'Headache, loose motion', 
      foodEat: 'Rice, curd, light food (పెరుగు అన్నం, తేలికపాటి ఆహారం)', 
      foodAvoid: 'Spicy, oily, alcohol (కారంగా ఉండేవి, నూనె పదార్థాలు)' 
    },
    { 
      name: 'Ondansetron', 
      power: '4 mg', 
      company: 'Cipla', 
      use: 'Vomiting, nausea (వాంతులు, వికారం)', 
      timing: 'After food / doctor advice (ఆహారం తర్వాత)', 
      cost: '₹30–60', 
      warn: 'Not for daily regular use (రోజూ వాడకూడదు)', 
      side: 'Constipation, headache', 
      foodEat: 'ORS, coconut water (కొబ్బరి నీళ్లు, ఓఆర్ఎస్)', 
      foodAvoid: 'Heavy meals, fried food (భారీ భోజనం, వేయించిన ఆహారం)' 
    },
    { 
      name: 'Dicycloverine', 
      power: '10 mg', 
      company: 'Abbott', 
      use: 'Pain, cramps (కడుపు నొప్పి, తిమ్మిర్లు)', 
      timing: 'After food (ఆహారం తర్వాత)', 
      cost: '₹20–50', 
      warn: 'May cause sleep (నిద్ర రావచ్చు)', 
      side: 'Dry mouth, dizziness', 
      foodEat: 'Soft food (మెత్తని ఆహారం)', 
      foodAvoid: 'Gas food (గ్యాస్ కలిగించే ఆహారం)' 
    },
    { 
      name: 'Loperamide', 
      power: '2 mg', 
      company: 'Janssen', 
      use: 'Loose motion / Diarrhea (విరేచనాలు)', 
      timing: 'As doctor says (వైద్యుల సూచన మేరకు)', 
      cost: '₹15–40', 
      warn: 'Avoid in infection diarrhea (ఇన్ఫెక్షన్ విరేచనాల్లో వాడకండి)', 
      side: 'Constipation', 
      foodEat: 'Banana, curd rice (అరటిపండు, పెరుగు అన్నం)', 
      foodAvoid: 'Milk, street food (పాలు, బయట ఆహారం)' 
    },
    { 
      name: 'Famotidine', 
      power: '20 mg', 
      company: 'Various', 
      use: 'Acidity, heartbeat (గుండెల్లో మంట)', 
      timing: 'Before food or night (ఆహారానికి ముందు లేదా రాత్రి)', 
      cost: '₹20–60', 
      warn: 'Kidney patients ask doctor (కిడ్నీ సమస్యలున్నవారు అడగాలి)', 
      side: 'Headache, tiredness', 
      foodEat: 'Home food (ఇంటి భోజనం)', 
      foodAvoid: 'Spicy, excess tea (కారం, అతిగా టీ తాగడం)' 
    }
  ];

  const isEmergencySelected = activeTab === 'Emergency';

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950 transition-colors duration-300 animate-in fade-in duration-500">
      {/* Header */}
      <div className="p-6 bg-white dark:bg-zinc-900 border-b dark:border-zinc-800 sticky top-0 z-40 flex items-center gap-4 shadow-sm">
        <button onClick={onBack} className="w-12 h-12 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center active:scale-90 transition-all border border-gray-100 dark:border-zinc-700">
          <ArrowLeft size={24} className="dark:text-white text-gray-900" />
        </button>
        <div className="flex items-center gap-3">
           <div className="p-2.5 bg-orange-50 dark:bg-orange-900/30 rounded-2xl">
              <Utensils className="text-orange-500" size={28} />
           </div>
           <div>
              <h1 className="text-2xl font-black text-gray-900 dark:text-white leading-tight">STOMACH CARE</h1>
              <p className="text-[10px] font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest">Gastro Specialty Guide</p>
           </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-40 no-scrollbar">
        {/* selector */}
        <div>
           <h3 className="text-[11px] font-black uppercase text-gray-400 tracking-widest mb-4 px-2">Choose Condition (పరిస్థితిని ఎంచుకోండి)</h3>
           <div className="flex flex-wrap gap-3">
              {categories.map(cat => (
                 <button 
                   key={cat.id} 
                   onClick={() => setActiveTab(cat.id)}
                   className={`px-5 py-3 rounded-2xl text-xs font-black transition-all border-2 text-left flex flex-col ${
                     activeTab === cat.id 
                     ? (cat.id === 'Emergency' ? 'bg-red-600 border-red-600 text-white shadow-xl shadow-red-500/30' : 'bg-orange-500 border-orange-500 text-white shadow-xl shadow-orange-500/30') 
                     : 'bg-white dark:bg-zinc-800 text-gray-500 dark:text-gray-400 border-gray-100 dark:border-zinc-800 hover:border-orange-300'
                   }`}
                 >
                    <span>{cat.label}</span>
                    <span className={`text-[9px] mt-0.5 opacity-80 ${activeTab === cat.id ? 'text-white' : 'text-gray-400'}`}>{cat.sub}</span>
                 </button>
              ))}
           </div>
        </div>

        {isEmergencySelected ? (
           <div className="space-y-6 animate-in zoom-in-95 duration-300">
              <div className="p-8 bg-red-600 text-white rounded-[2.5rem] shadow-2xl border-[6px] border-red-500/50 flex flex-col items-center text-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                     <Siren size={60} className="animate-pulse" />
                  </div>
                  <div>
                     <h3 className="font-black text-3xl uppercase tracking-tighter mb-3 leading-tight">EMERGENCY! (అత్యవసర)</h3>
                     <p className="text-lg font-bold leading-relaxed opacity-95">
                        If you have:<br/>
                        • Blood in vomiting (వాంతిలో రక్తం)<br/>
                        • Very strong pain (తీవ్రమైన నొప్పి)<br/>
                        • Continuous loose motion (నిరంతర విరేచనాలు)<br/>
                        • Dehydration (నీరసం, కళ్లు తిరగడం)<br/>
                        • Fever with vomiting (జ్వరంతో వాంతులు)
                     </p>
                     <div className="h-px bg-white/30 my-6"></div>
                     <p className="text-2xl font-black uppercase tracking-tight">
                        Go to hospital immediately.
                     </p>
                     <p className="text-xs font-black mt-4 uppercase bg-black/20 py-2 px-4 rounded-xl inline-block">వెంటనే ఆసుపత్రికి వెళ్లండి</p>
                  </div>
              </div>
              
              <div className="p-6 bg-white dark:bg-zinc-900 border-2 border-red-100 dark:border-red-900/20 rounded-[2rem] space-y-4">
                 <h4 className="text-red-600 font-black uppercase text-sm flex items-center gap-2 px-1 text-center justify-center">
                   <AlertCircle size={18} /> CRITICAL SAFETY WARNING
                 </h4>
                 <p className="text-sm font-bold text-gray-600 dark:text-zinc-400 leading-relaxed px-1 text-center">
                   In severe stomach cases, no medicines should be taken without direct clinical checking. Please seek help.
                 </p>
              </div>
           </div>
        ) : (
          <>
            {/* Reference medicines section */}
            <div className="space-y-6">
               <div className="flex items-center justify-between px-2">
                  <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Medicine Guide for {activeTab}</h3>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 dark:bg-zinc-800 rounded-full">
                    <Lock size={14} className="text-gray-400" />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Reference Only</span>
                  </div>
               </div>

               <div className="bg-amber-50 dark:bg-amber-900/10 p-5 rounded-[2rem] border-2 border-amber-100/50 dark:border-amber-900/20 flex items-start gap-4 shadow-sm">
                  <div className="w-12 h-12 bg-amber-100 dark:bg-amber-800/30 rounded-2xl flex items-center justify-center shrink-0">
                    <AlertCircle className="text-amber-600" size={24} />
                  </div>
                  <div>
                     <p className="text-sm font-black text-amber-700 dark:text-amber-300 uppercase leading-snug">Doctor advice required. Do not self-medicate.</p>
                     <p className="text-[11px] font-bold text-amber-600/70 mt-1 uppercase">వైద్యుల సలహా లేకుండా మందులు వాడకండి</p>
                  </div>
               </div>

               <div className="space-y-6">
                  {medicineData.map((med, idx) => (
                     <div key={idx} className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-[3rem] p-7 shadow-xl hover:shadow-2xl transition-all duration-300 group border-b-8 border-b-orange-500/10">
                        <div className="flex justify-between items-start mb-6">
                           <div>
                              <h4 className="text-2xl font-black text-orange-600 dark:text-orange-400 group-hover:scale-105 transition-transform origin-left">{med.name}</h4>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="bg-orange-50 dark:bg-orange-900/20 px-3 py-1 rounded-xl text-[11px] font-black text-orange-600 dark:text-orange-400 uppercase border border-orange-100 dark:border-orange-800">{med.power}</span>
                                <span className="text-gray-200">|</span>
                                <span className="text-[11px] font-black text-gray-400 uppercase tracking-wide">{med.company}</span>
                              </div>
                           </div>
                           <div className="p-4 bg-gray-50 dark:bg-zinc-800 rounded-3xl group-hover:bg-orange-50 dark:group-hover:bg-orange-900/20 transition-colors">
                              <Pill size={28} className="text-orange-500" />
                           </div>
                        </div>
                        
                        <div className="space-y-6">
                           <div className="grid grid-cols-2 gap-4">
                              <div className="bg-slate-50 dark:bg-zinc-800/50 p-5 rounded-[2rem] border border-slate-100 dark:border-zinc-700">
                                 <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">Use</p>
                                 <p className="text-sm font-bold text-gray-800 dark:text-zinc-200 leading-tight">{med.use}</p>
                              </div>
                              <div className="bg-slate-50 dark:bg-zinc-800/50 p-5 rounded-[2rem] border border-slate-100 dark:border-zinc-700">
                                 <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">Timing</p>
                                 <p className="text-sm font-bold text-gray-800 dark:text-zinc-200 leading-tight">{med.timing}</p>
                              </div>
                           </div>

                           <div className="bg-rose-50 dark:bg-rose-900/10 p-6 rounded-[2.2rem] border-2 border-rose-100/50 dark:border-rose-900/20">
                              <p className="text-[11px] font-black uppercase text-rose-500 tracking-widest mb-2 flex items-center gap-2">
                                 <AlertTriangle size={14} /> Warning
                              </p>
                              <p className="text-[14px] font-black text-rose-700 dark:text-rose-300 leading-tight uppercase tracking-tight">{med.warn}</p>
                           </div>

                           <div className="px-1 flex justify-between gap-4">
                              <div>
                                 <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2 flex items-center gap-2">
                                    <Activity size={14} /> Side Effects
                                 </p>
                                 <p className="text-[13px] font-bold text-gray-600 dark:text-zinc-400 leading-relaxed">{med.side}</p>
                              </div>
                              <div className="text-right">
                                 <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2 flex items-center gap-2 justify-end">
                                    <Tag size={14} /> Approx Cost
                                 </p>
                                 <p className="text-[16px] font-black text-gray-800 dark:text-white leading-relaxed">{med.cost}</p>
                              </div>
                           </div>

                           <div className="grid grid-cols-2 gap-4">
                              <div className="bg-emerald-50 dark:bg-emerald-900/10 p-5 rounded-[2rem] border border-emerald-100/50 dark:border-emerald-900/20">
                                 <div className="flex items-center gap-2 mb-2 text-emerald-600">
                                    <Utensils size={14} />
                                    <p className="text-[10px] font-black uppercase tracking-widest">Food: Eat</p>
                                 </div>
                                 <p className="text-sm font-black text-emerald-800 dark:text-emerald-300">{med.foodEat}</p>
                              </div>
                              <div className="bg-rose-50 dark:bg-rose-900/10 p-5 rounded-[2rem] border-rose-100/50 dark:border-rose-900/20">
                                 <div className="flex items-center gap-2 mb-2 text-rose-600">
                                    <Ban size={14} />
                                    <p className="text-[10px] font-black uppercase tracking-widest">Avoid</p>
                                 </div>
                                 <p className="text-sm font-black text-rose-800 dark:text-rose-300">{med.foodAvoid}</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* Bottom Section */}
            <div className="space-y-6 pt-6">
                <div className="p-8 text-center bg-gray-50 dark:bg-zinc-900 rounded-[3rem] border-2 border-dashed border-gray-200 dark:border-zinc-800">
                   <h5 className="text-xl font-black text-gray-900 dark:text-white uppercase mb-4 tracking-tighter">Doctor Advice is Compulsory</h5>
                   <p className="text-xs text-gray-500 font-bold leading-relaxed max-w-[280px] mx-auto uppercase tracking-wide opacity-80">
                      This application provides general reference information ONLY. It is not a clinical diagnosis or treatment plan.
                   </p>
                </div>
                
                <div className="bg-orange-600 p-8 rounded-[3rem] text-white flex flex-col items-center text-center gap-4 shadow-xl shadow-orange-600/20">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <Info size={24} />
                    </div>
                    <h5 className="text-lg font-black uppercase tracking-tight">Medical Disclaimer</h5>
                    <p className="text-xs font-bold leading-relaxed opacity-90">
                       "This app provides general information only. It does not replace doctor consultation."
                    </p>
                </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const MentalHealthDetailView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('Anxiety');
  
  const categories = ['Stress', 'Anxiety', 'Depression', 'Panic', 'Sleep Problem', 'Mood Disorder', 'Severe Symptoms'];
  
  const medicineData = [
      { name: 'Escitalopram', power: '10 mg', use: 'Anxiety, Depression, Panic', timing: 'Once daily (morning or night)', warn: 'Do not stop suddenly', side: 'Nausea, headache, sleep change', food: 'Normal meals ok', avoid: 'Alcohol' },
      { name: 'Clonazepam', power: '0.5 mg', use: 'Anxiety, Panic, Sleep', timing: 'Usually night', warn: 'Habit forming. Long use careful.', side: 'Sleepiness, dizziness', food: 'After food', avoid: 'Alcohol, driving' },
      { name: 'Sertraline', power: '50 mg', use: 'Depression, Anxiety', timing: 'Morning', warn: 'Takes few weeks for result', side: 'Stomach upset, insomnia', food: 'Regular food', avoid: 'Alcohol' },
      { name: 'Alprazolam', power: '0.25 mg', use: 'Anxiety, Panic', timing: 'Night or as doctor says', warn: 'Can be addictive', side: 'Heavy sleep, weakness', food: 'After food', avoid: 'Alcohol' },
      { name: 'Quetiapine', power: '25 mg', use: 'Mood problem, Sleep', timing: 'Night', warn: 'Weight gain possible', side: 'Drowsy, dry mouth', food: 'Balanced diet', avoid: 'Heavy fatty food' }
  ];

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950 transition-colors duration-300 animate-in fade-in duration-500">
      {/* Header */}
      <div className="p-6 bg-white dark:bg-zinc-900 border-b dark:border-zinc-800 sticky top-0 z-40 flex items-center gap-4">
        <button onClick={onBack} className="w-12 h-12 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center active:scale-90 transition-all border border-gray-100 dark:border-zinc-700">
          <ArrowLeft size={24} className="dark:text-white text-gray-900" />
        </button>
        <div className="flex items-center gap-3">
           <div className="p-2.5 bg-teal-50 dark:bg-teal-900/30 rounded-2xl">
              <Brain className="text-teal-500" size={28} />
           </div>
           <div>
              <h1 className="text-2xl font-black text-gray-900 dark:text-white leading-tight">Mental Health Support</h1>
              <p className="text-[10px] font-black text-teal-600 dark:text-teal-400 uppercase tracking-widest">Psychiatry Information</p>
           </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-40 no-scrollbar">
        {/* selector */}
        <div>
           <h3 className="text-[11px] font-black uppercase text-gray-400 tracking-widest mb-4 px-2">Choose Condition (పరిస్థితిని ఎంచుకోండి)</h3>
           <div className="flex flex-wrap gap-3">
              {categories.map(cat => (
                 <button 
                   key={cat} 
                   onClick={() => setActiveTab(cat)}
                   className={`px-5 py-3 rounded-2xl text-xs font-black transition-all border-2 ${
                     activeTab === cat 
                     ? (cat === 'Severe Symptoms' ? 'bg-red-600 border-red-600 text-white shadow-xl shadow-red-500/30' : 'bg-teal-500 border-teal-500 text-white shadow-xl shadow-teal-500/30') 
                     : 'bg-white dark:bg-zinc-800 text-gray-500 dark:text-gray-400 border-gray-100 dark:border-zinc-800 hover:border-teal-300'
                   }`}
                 >
                    {cat}
                 </button>
              ))}
           </div>
        </div>

        {activeTab === 'Severe Symptoms' ? (
           <div className="space-y-6 animate-in zoom-in-95 duration-300">
              <div className="p-8 bg-red-600 text-white rounded-[2.5rem] shadow-2xl border-[6px] border-red-500/50 flex flex-col items-center text-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                     <ShieldAlert size={60} className="animate-pulse" />
                  </div>
                  <div>
                     <h3 className="font-black text-3xl uppercase tracking-tighter mb-3 leading-tight">Serious Condition!</h3>
                     <p className="text-lg font-bold leading-relaxed opacity-90">
                        If you have suicidal thoughts, severe panic attack, not sleeping for many days, or aggressive behaviour...
                     </p>
                     <div className="h-px bg-white/30 my-6"></div>
                     <p className="text-2xl font-black uppercase tracking-tight">
                        Visit hospital or psychiatrist immediately.
                     </p>
                     <p className="text-xs font-black mt-4 uppercase bg-black/20 py-2 px-4 rounded-xl inline-block">అత్యవసర పరిస్థితి - వెంటనే ఆసుపత్రికి వెళ్లండి</p>
                  </div>
              </div>
              
              <div className="p-6 bg-white dark:bg-zinc-900 border-2 border-red-100 dark:border-red-900/20 rounded-[2rem] space-y-4">
                 <h4 className="text-red-600 font-black uppercase text-sm flex items-center gap-2 px-1">
                   <AlertCircle size={18} /> Important Safety Rule
                 </h4>
                 <p className="text-sm font-bold text-gray-600 dark:text-zinc-400 leading-relaxed px-1">
                   In cases of severe mental health distress, medical intervention is required. No medicine information is provided here for emergency symptoms to prevent misuse.
                 </p>
              </div>
           </div>
        ) : (
          <>
            {/* Reference medicines section */}
            <div className="space-y-6">
               <div className="flex items-center justify-between px-2">
                  <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Medicine Guide for {activeTab}</h3>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 dark:bg-zinc-800 rounded-full">
                    <Lock size={14} className="text-gray-400" />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Reference Only</span>
                  </div>
               </div>

               <div className="bg-amber-50 dark:bg-amber-900/10 p-5 rounded-[2rem] border-2 border-amber-100/50 dark:border-amber-900/20 flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 dark:bg-amber-800/30 rounded-2xl flex items-center justify-center shrink-0">
                    <AlertCircle className="text-amber-600" size={24} />
                  </div>
                  <div>
                     <p className="text-sm font-black text-amber-700 dark:text-amber-300 uppercase leading-snug">Doctor advice required. Do not self-medicate.</p>
                     <p className="text-[11px] font-bold text-amber-600/70 mt-1 uppercase">వైద్యుల సలహా లేకుండా మందులు వాడకండి</p>
                  </div>
               </div>

               <div className="space-y-6">
                  {medicineData.map((med, idx) => (
                     <div key={idx} className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-[3rem] p-7 shadow-xl hover:shadow-2xl transition-all duration-300 group border-b-8 border-b-teal-500/10">
                        <div className="flex justify-between items-start mb-6">
                           <div>
                              <h4 className="text-2xl font-black text-teal-600 dark:text-teal-400 group-hover:scale-105 transition-transform origin-left">{med.name}</h4>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="bg-teal-50 dark:bg-teal-900/20 px-3 py-1 rounded-xl text-[11px] font-black text-teal-600 dark:text-teal-400 uppercase border border-teal-100 dark:border-teal-800">{med.power}</span>
                                <span className="text-gray-200">|</span>
                                <span className="text-[11px] font-black text-gray-400 uppercase tracking-wide">Psychiatry Ref</span>
                              </div>
                           </div>
                           <div className="p-4 bg-gray-50 dark:bg-zinc-800 rounded-3xl group-hover:bg-teal-50 dark:group-hover:bg-teal-900/20 transition-colors">
                              <Pill size={28} className="text-teal-500" />
                           </div>
                        </div>
                        
                        <div className="space-y-6">
                           <div className="grid grid-cols-2 gap-4">
                              <div className="bg-slate-50 dark:bg-zinc-800/50 p-5 rounded-[2rem] border border-slate-100 dark:border-zinc-700">
                                 <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">Common Use</p>
                                 <p className="text-sm font-bold text-gray-800 dark:text-zinc-200 leading-tight">{med.use}</p>
                              </div>
                              <div className="bg-slate-50 dark:bg-zinc-800/50 p-5 rounded-[2rem] border border-slate-100 dark:border-zinc-700">
                                 <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">Timing</p>
                                 <p className="text-sm font-bold text-gray-800 dark:text-zinc-200 leading-tight">{med.timing}</p>
                              </div>
                           </div>

                           <div className="bg-rose-50 dark:bg-rose-900/10 p-6 rounded-[2.2rem] border-2 border-rose-100/50 dark:border-rose-900/20">
                              <p className="text-[11px] font-black uppercase text-rose-500 tracking-widest mb-2 flex items-center gap-2">
                                 <AlertTriangle size={14} /> Critical Warning
                              </p>
                              <p className="text-[15px] font-black text-rose-700 dark:text-rose-300 leading-tight uppercase tracking-tight">{med.warn}</p>
                           </div>

                           <div className="px-1">
                              <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2 flex items-center gap-2">
                                 <Activity size={14} /> Side Effects
                              </p>
                              <p className="text-[13px] font-bold text-gray-600 dark:text-zinc-400 leading-relaxed">{med.side}</p>
                           </div>

                           <div className="grid grid-cols-2 gap-4">
                              <div className="bg-emerald-50 dark:bg-emerald-900/10 p-5 rounded-[2rem] border border-emerald-100/50 dark:border-emerald-900/20">
                                 <div className="flex items-center gap-2 mb-2 text-emerald-600">
                                    <Utensils size={14} />
                                    <p className="text-[10px] font-black uppercase tracking-widest">Food Allowed</p>
                                 </div>
                                 <p className="text-sm font-black text-emerald-800 dark:text-emerald-300">{med.food}</p>
                              </div>
                              <div className="bg-rose-50 dark:bg-rose-900/10 p-5 rounded-[2rem] border border-rose-100/50 dark:border-rose-900/20">
                                 <div className="flex items-center gap-2 mb-2 text-rose-600">
                                    <Ban size={14} />
                                    <p className="text-[10px] font-black uppercase tracking-widest">Avoid</p>
                                 </div>
                                 <p className="text-sm font-black text-rose-800 dark:text-rose-300">{med.avoid}</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* Bottom Section */}
            <div className="space-y-6 pt-6">
                <div className="p-8 text-center bg-gray-50 dark:bg-zinc-900 rounded-[3rem] border-2 border-dashed border-gray-200 dark:border-zinc-800">
                   <h5 className="text-xl font-black text-gray-900 dark:text-white uppercase mb-4 tracking-tighter">Doctor Advice is Compulsory</h5>
                   <p className="text-xs text-gray-500 font-bold leading-relaxed max-w-[280px] mx-auto uppercase tracking-wide opacity-80">
                      This application provides general reference information ONLY. It is not a clinical diagnosis or treatment plan.
                   </p>
                </div>
                
                <div className="bg-blue-600 p-8 rounded-[3rem] text-white flex flex-col items-center text-center gap-4 shadow-xl shadow-blue-600/20">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <Info size={24} />
                    </div>
                    <h5 className="text-lg font-black uppercase tracking-tight">Medical Disclaimer</h5>
                    <p className="text-xs font-bold leading-relaxed opacity-90">
                       "This app provides general information only. It does not replace doctor consultation."
                    </p>
                </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const DoctorDetailView: React.FC<{ doctor: Doctor | null, onBack: () => void }> = ({ doctor, onBack }) => {
  if (!doctor) return null;
  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950 overflow-y-auto">
      <div className="relative h-[45%]">
        <img src={doctor.image} className="w-full h-full object-cover" />
        <button onClick={onBack} className="absolute top-6 left-6 w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white"><ArrowLeft size={20} /></button>
        <div className="absolute bottom-6 left-6 text-white drop-shadow-lg">
          <h1 className="text-3xl font-black">{doctor.name}</h1>
          <p className="font-bold text-white/90">{doctor.specialty} • {doctor.qualification}</p>
        </div>
      </div>
      <div className="p-8 space-y-8">
        <div className="flex justify-between items-center p-6 bg-gray-50 dark:bg-zinc-900 rounded-3xl">
          <div className="text-center"><p className="text-[8px] font-black uppercase text-gray-400">Experience</p><p className="font-bold">{doctor.experience} Yrs</p></div>
          <div className="text-center"><p className="text-[8px] font-black uppercase text-gray-400">Rating</p><p className="font-bold">{doctor.rating}</p></div>
          <div className="text-center"><p className="text-[8px] font-black uppercase text-gray-400">Fee</p><p className="font-bold">₹{doctor.fee}</p></div>
        </div>

        <div className="space-y-4">
           <div className="flex gap-4 p-5 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-sm">
             <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/20 rounded-xl flex items-center justify-center shrink-0">
                <Building2 className="text-blue-600" size={24} />
             </div>
             <div>
               <h4 className="text-xs font-black uppercase text-gray-400 mb-1">Clinic / Hospital</h4>
               <p className="font-black text-sm text-gray-800 dark:text-zinc-100">{doctor.hospitalName}</p>
               <p className="text-xs font-bold text-gray-500 mt-1">{doctor.hospitalAddress}</p>
             </div>
           </div>

           <div className="flex gap-4 p-5 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-sm">
             <div className="w-12 h-12 bg-amber-50 dark:bg-amber-950/20 rounded-xl flex items-center justify-center shrink-0">
                <Clock className="text-amber-600" size={24} />
             </div>
             <div>
               <h4 className="text-xs font-black uppercase text-gray-400 mb-1">Available Timings</h4>
               <p className="font-black text-sm text-gray-800 dark:text-zinc-100">{doctor.timings}</p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const SugarDetailView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [sugar, setSugar] = useState<number>(110);
  const [showDetails, setShowDetails] = useState(false);

  const getStatus = (val: number) => {
    if (val > 300) return { label: 'VERY HIGH (EMERGENCY)', color: 'bg-red-600', text: 'text-white', msg: 'Emergency condition. Seek medical help immediately.', isEmergency: true };
    if (val >= 200) return { label: 'HIGH SUGAR', color: 'bg-orange-600', text: 'text-white', msg: 'Sugar level is high. Medication likely needed.', isEmergency: false };
    if (val >= 126) return { label: 'DIABETES', color: 'bg-orange-500', text: 'text-white', msg: 'Diabetes range. Consult doctor.', isEmergency: false };
    if (val >= 100) return { label: 'BORDERLINE', color: 'bg-yellow-100', text: 'text-yellow-800', msg: 'Pre-diabetes range. Lifestyle changes required.', isEmergency: false };
    if (val >= 70) return { label: 'NORMAL', color: 'bg-emerald-500', text: 'text-white', msg: 'Great! Sugar levels are healthy.', isEmergency: false };
    return { label: 'LOW SUGAR', color: 'bg-blue-500', text: 'text-white', msg: 'Hypoglycemia risk. Eat something sweet.', isEmergency: false };
  };

  const status = getStatus(sugar);
  const showMeds = (status.label === 'BORDERLINE' || status.label === 'DIABETES' || status.label === 'HIGH SUGAR');

  const medicines = [
    { name: 'Metformin', company: 'Glycomet', power: '500mg', time: 'After food', cost: '₹40', side: 'Gas/Bloating' },
    { name: 'Glimepiride', company: 'Amaryl', power: '1mg', time: 'Before breakfast', cost: '₹60', side: 'Low sugar' },
    { name: 'Vildagliptin', company: 'Glycomet', power: '50mg', time: 'Twice daily', cost: '₹150', side: 'Headache' },
    { name: 'Sitagliptin', company: 'Januvia', power: '100mg', time: 'Once daily', cost: '₹300', side: 'Runny nose' },
    { name: 'Gliclazide', company: 'Reclide', power: '80mg', time: 'Before breakfast', cost: '₹90', side: 'Upset stomach' },
    { name: 'Empagliflozin', company: 'Jardiance', power: '10mg', time: 'Morning', cost: '₹450', side: 'Urine infection' },
    { name: 'Pioglitazone', company: 'Pioz', power: '15mg', time: 'After food', cost: '₹45', side: 'Swelling' }
  ];

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-900 transition-colors duration-300">
       <div className="p-6 bg-white dark:bg-zinc-900 border-b dark:border-zinc-800 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-4 mb-2">
          <button onClick={onBack} className="w-10 h-10 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center active:scale-90 transition-all">
             <ArrowLeft size={20} className="text-gray-800 dark:text-zinc-100" />
          </button>
          <div className="flex items-center gap-2">
             <Droplet className="text-emerald-500" size={24} />
             <h1 className="text-xl font-black text-gray-900 dark:text-zinc-100">Check Blood Sugar</h1>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-32 p-6">
           {/* Input Section */}
           <div className="flex flex-col items-center justify-center mb-8">
               <div className="relative mb-2">
                   <span className="text-6xl font-black text-gray-900 dark:text-zinc-100 tracking-tighter">
                       {sugar}
                       <span className="text-2xl text-gray-400 ml-1">mg/dL</span>
                   </span>
               </div>
               
               <p className="text-xs font-black uppercase text-gray-400 mb-6 tracking-widest">Fasting / Random Level</p>

               <input 
                  type="range" min="20" max="600" value={sugar} 
                  onChange={(e) => { setSugar(parseInt(e.target.value)); setShowDetails(false); }}
                  className="w-full h-4 bg-gray-200 rounded-xl appearance-none cursor-pointer accent-emerald-500 mb-6"
               />
  
               <button 
                 onClick={() => setShowDetails(true)}
                 className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-emerald-500/30 active:scale-95 transition-all flex items-center justify-center gap-2"
                 >
                  Check Sugar Details
               </button>
           </div>

           {showDetails && (
             <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 space-y-6">
                
                {/* Status Banner */}
                <div className={`p-5 rounded-2xl ${status.color} flex items-center gap-4 shadow-sm`}>
                    <div className={`w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0`}>
                        <Droplet size={32} />
                    </div>
                    <div>
                        <h2 className={`text-2xl font-black ${status.text}`}>{status.label}</h2>
                        <p className={`text-xs font-bold opacity-90 ${status.text}`}>{status.msg}</p>
                    </div>
                </div>

                {/* Emergency Alert */}
                {status.isEmergency && (
                   <div className="p-5 bg-red-600 text-white rounded-2xl animate-pulse shadow-xl border-4 border-red-500 flex items-start gap-4">
                      <ShieldAlert size={36} className="shrink-0 mt-1" />
                      <div>
                         <h3 className="font-black text-base uppercase mb-2">Emergency Condition</h3>
                         <p className="text-sm font-bold leading-relaxed opacity-95">
                            Sugar level critical. Seek medical help immediately. Do not wait.
                         </p>
                      </div>
                   </div>
                )}

                {/* Medicines Section */}
                <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
                       <div className="flex items-center justify-between mb-4">
                           <div className="flex items-center gap-2 text-emerald-600">
                               <Pill size={22} className="fill-current" />
                               <h3 className="font-black text-lg text-gray-900 dark:text-zinc-100">Reference Medicines</h3>
                           </div>
                           <Lock size={16} className="text-gray-400" />
                       </div>

                       <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 p-3 rounded-xl flex items-center gap-2 mb-5">
                            <AlertTriangle size={16} className="text-red-600 shrink-0" />
                            <p className="text-[10px] font-black text-red-700 dark:text-red-300 uppercase">Doctor advice required. Do not self-medicate.</p>
                       </div>
    
                       <div className="space-y-3">
                            {medicines.map((med, idx) => (
                                <div key={idx} className="bg-gray-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-gray-200 dark:border-zinc-700">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-zinc-100">{med.name}</h4>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase">{med.company}</p>
                                        </div>
                                        <span className="bg-white dark:bg-zinc-700 px-2 py-1 rounded text-xs font-black text-gray-700 dark:text-gray-300 shadow-sm">{med.power}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-y-1 text-[10px] text-gray-500 font-bold">
                                        <span>Timing: {med.time}</span>
                                        <span>Cost: {med.cost}</span>
                                        <span className="col-span-2 text-red-500">Side Effect: {med.side}</span>
                                    </div>
                                </div>
                            ))}
                       </div>
                    </div>
    
                {/* Diet Section */}
                <div className="grid grid-cols-1 gap-4">
                    <div className="bg-emerald-50 dark:bg-emerald-900/10 p-5 rounded-3xl border border-emerald-100 dark:border-emerald-900/20">
                        <div className="flex items-center gap-2 mb-3 text-emerald-700 dark:text-emerald-400">
                            <Utensils size={18} />
                            <h3 className="font-black text-sm uppercase">Food to Eat</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {['Leafy Greens', 'Berries', 'Oats', 'Bananas'].map(i => (
                                <span key={i} className="bg-white dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-800 dark:text-emerald-200 shadow-sm">{i}</span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-red-50 dark:bg-red-900/10 p-5 rounded-3xl border border-red-100 dark:border-red-900/20">
                        <div className="flex items-center gap-2 mb-3 text-red-700 dark:text-red-400">
                            <Ban size={18} />
                            <h3 className="font-black text-sm uppercase">Food to Avoid</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {['Sweets', 'Processed Food', 'Sugary Drinks', 'White Bread'].map(i => (
                                <span key={i} className="bg-white dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-xs font-bold text-red-800 dark:text-red-200 shadow-sm">{i}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-6 text-center">
                   <p className="text-[10px] text-gray-400 font-medium leading-relaxed max-w-xs mx-auto">
                      {HEALTH_DISCLAIMER}
                   </p>
                </div>

             </div>
           )}
      </div>
    </div>
  );
};

const DiseasesView: React.FC<{ 
  onBack: () => void, 
  onNavigate: (v: AppView) => void, 
  globalLanguage: Language,
  setGlobalLanguage: (l: Language) => void 
}> = ({ onBack, onNavigate, globalLanguage, setGlobalLanguage }) => {
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const t = TRANSLATIONS[globalLanguage];

  const filteredDiseases = DUMMY_DISEASES.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) || 
    d.symptoms.toLowerCase().includes(search.toLowerCase())
  );

  const toggleExpand = (id: string, name: string) => {
    const n = name.toLowerCase();
    if (n.includes('child') && n.includes('fever')) {
        onNavigate('child_fever_detail');
        return;
    }
    if (n.includes('stomach') || n.includes('vomit') || n.includes('diarrhea') || n.includes('acidity') || n.includes('motion')) {
        onNavigate('stomach_detail');
        return;
    }
    if (n.includes('mental') || n.includes('stress') || n.includes('anxiety') || n.includes('depression') || n.includes('sleep') || n.includes('panic')) {
        onNavigate('mental_detail');
        return;
    }
    if (n.includes('general') || n.includes('weakness') || n.includes('fatigue') || n.includes('dehydration')) {
        onNavigate('general_health_detail');
        return;
    }
    if (n.includes('viral fever') || (n.includes('fever') && !n.includes('child'))) {
        onNavigate('fever_detail');
        return;
    }
    if (n.includes('bp') || n.includes('hypertension')) {
        onNavigate('bp_detail');
        return;
    }
    if (n.includes('pain') || n.includes('muscle') || n.includes('joint') || n.includes('back') || n.includes('neck') || n.includes('leg')) {
        onNavigate('pain_detail');
        return;
    }
    if (n.includes('diabetes') || n.includes('sugar')) {
        onNavigate('sugar_detail');
        return;
    }

    setExpandedId(expandedId === id ? null : id);
  };

  const getDiseaseIcon = (name: string) => {
      const n = name.toLowerCase();
      if (n.includes('stomach') || n.includes('vomiting') || n.includes('diarrhea')) return <Utensils className="text-orange-500" size={32} strokeWidth={1.5} />;
      if (n.includes('mental') || n.includes('stress') || n.includes('anxiety') || n.includes('depression')) return <Brain className="text-teal-500" size={32} strokeWidth={1.5} />;
      if (n.includes('general') || n.includes('weakness') || n.includes('fatigue')) return <Battery className="text-blue-500" size={32} strokeWidth={1.5} />;
      if (n.includes('child')) return <Baby className="text-pink-500" size={32} strokeWidth={1.5} />;
      if (n.includes('fever')) return <Thermometer className="text-rose-500" size={32} strokeWidth={1.5} />;
      if (n.includes('cold')) return <Snowflake className="text-sky-400" size={32} strokeWidth={1.5} />;
      if (n.includes('pain') || n.includes('migraine')) return <Zap className="text-amber-500" size={32} strokeWidth={1.5} />;
      if (n.includes('diabetes')) return <Droplet className="text-emerald-500" size={32} strokeWidth={1.5} />;
      if (n.includes('bp') || n.includes('hypertension')) return <Activity className="text-rose-600" size={32} strokeWidth={1.5} />;
      if (n.includes('malaria') || n.includes('dengue')) return <Bug className="text-emerald-600" size={32} strokeWidth={1.5} />;
      return <Activity className="text-gray-400" size={32} strokeWidth={1.5} />;
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950 transition-colors duration-300">
      <div className="p-6 bg-white dark:bg-zinc-900 border-b dark:border-zinc-800 sticky top-0 z-20 shadow-sm transition-colors">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={onBack} className="w-10 h-10 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center active:scale-90 transition-all">
             <ArrowLeft size={20} className="text-gray-800 dark:text-zinc-100" />
          </button>
          <h1 className="text-2xl font-black text-gray-900 dark:text-zinc-100 leading-tight">{t.healthConditions}</h1>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search symptoms or disease..."
            className="w-full bg-gray-50 dark:bg-zinc-800 border-none px-12 py-4 rounded-2xl focus:ring-2 focus:ring-blue-500/20 transition-all text-sm font-medium dark:text-zinc-100 placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 pb-32">
        {filteredDiseases.map(d => (
          <div 
            key={d.id} 
            onClick={() => toggleExpand(d.id, d.name)}
            className={`bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-[2rem] p-6 shadow-sm active:scale-[0.99] transition-all cursor-pointer overflow-hidden relative flex flex-col gap-4 ${expandedId === d.id ? 'ring-2 ring-blue-500/20' : ''}`}
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gray-50/50 dark:bg-zinc-800/50 rounded-[1.2rem] flex items-center justify-center shrink-0">
                 {getDiseaseIcon(d.name)}
              </div>
              <div className="flex-1 min-w-0">
                 <div className="flex justify-between items-start gap-2">
                    <h3 className="font-bold text-xl text-gray-900 dark:text-zinc-100 leading-tight pr-12">{d.name}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest shrink-0 absolute top-6 right-6 ${
                        d.severity === 'Severe' ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' :
                        d.severity === 'Moderate' ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400' :
                        'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400'
                    }`}>
                        {d.severity}
                    </span>
                 </div>
                 {!expandedId && <p className="text-sm font-medium text-gray-400 dark:text-zinc-500 line-clamp-1 mt-1.5">{d.symptoms}</p>}
              </div>
            </div>

            {expandedId === d.id && (
              <div className="mt-2 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="bg-rose-50 dark:bg-rose-900/10 p-4 rounded-xl">
                  <h4 className="text-xs font-black text-rose-500 uppercase tracking-widest mb-1">Symptoms</h4>
                  <p className="text-sm text-gray-700 dark:text-zinc-300 leading-relaxed">{d.symptoms}</p>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                   <div className="bg-gray-50 dark:bg-zinc-800/50 p-4 rounded-xl">
                      <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Causes</h4>
                      <p className="text-sm text-gray-700 dark:text-zinc-300 leading-relaxed">{d.causes}</p>
                   </div>
                   <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl">
                      <h4 className="text-xs font-black text-blue-500 uppercase tracking-widest mb-1">Treatment Overview</h4>
                      <p className="text-sm text-gray-700 dark:text-zinc-300 leading-relaxed">{d.treatment}</p>
                   </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-center -mb-2">
               {expandedId !== d.id && <ChevronDown className="text-gray-200 dark:text-zinc-800" size={24} />}
            </div>
          </div>
        ))}
        {filteredDiseases.length === 0 && (
          <div className="text-center py-10">
            <Activity className="mx-auto text-gray-300 mb-2" size={48} />
            <p className="text-gray-400 font-bold">No diseases found</p>
          </div>
        )}
      </div>
    </div>
  );
};

const NearbyView: React.FC<{ type: 'hospital' | 'scanning_center', onBack: () => void, globalLanguage: Language }> = ({ type, onBack, globalLanguage }) => {
  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [permissionError, setPermissionError] = useState(false);
  const t = TRANSLATIONS[globalLanguage];

  useEffect(() => {
    setLoading(true);
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(
         (pos) => {
            setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
         },
         (err) => {
            console.error(err);
            setPermissionError(true);
            setLocation({ lat: 17.3850, lng: 78.4867 });
         }
       );
    } else {
       setPermissionError(true);
       setLocation({ lat: 17.3850, lng: 78.4867 });
    }
  }, []);

  const fetchPlaces = useCallback(async () => {
    if (!location) return;
    setLoading(true);
    setPlaces([]);

    try {
      const res = await findNearbyPlaces("", location, type);
      
      if (res.text === "QUOTA_EXCEEDED") {
        setPlaces([]);
        setLoading(false);
        return;
      }

      let items: any[] = [];
      
      // Try to parse JSON from text response first as it's often more complete (includes distance/address)
      const jsonMatch = res.text.match(/\[\s*\{.*\}\s*\]/s);
      if (jsonMatch) {
        try {
          items = JSON.parse(jsonMatch[0]);
        } catch (e) {
          console.error("Failed to parse JSON fallback", e);
        }
      }

      // If JSON parsing failed or returned nothing, use grounding chunks
      if (items.length === 0 && res.chunks && res.chunks.length > 0) {
        items = res.chunks.map((c: any) => {
          const mapsData = c.maps || c.web || {};
          return {
            name: mapsData.title || 'Medical Facility',
            address: mapsData.address || mapsData.snippet || 'Address information available in maps',
            distance: 'Nearby',
            rating: mapsData.rating || null,
            uri: mapsData.uri || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsData.title || (type === 'hospital' ? 'Hospital' : 'Scanning Center'))}`
          };
        }).filter(item => item.name !== 'Medical Facility');
      }

      // If still empty, try to parse markdown list as last resort
      if (items.length === 0) {
        const lines = res.text.split('\n');
        let currentItem: any = null;
        
        lines.forEach(line => {
          const trimmed = line.trim();
          if (trimmed.match(/^\d+\.|\*|-/) || (trimmed && !trimmed.includes(':') && trimmed.length < 50)) {
            if (currentItem && currentItem.name) items.push(currentItem);
            currentItem = { name: trimmed.replace(/^\d+\.|\*|-/, '').trim(), address: '', distance: 'Nearby', rating: null };
          } else if (currentItem && trimmed.includes(':')) {
            const [key, ...valParts] = trimmed.split(':');
            const val = valParts.join(':').trim();
            const lowerKey = key.toLowerCase();
            if (lowerKey.includes('address')) currentItem.address = val;
            if (lowerKey.includes('rating')) currentItem.rating = val;
            if (lowerKey.includes('distance')) currentItem.distance = val;
          }
        });
        if (currentItem && currentItem.name) items.push(currentItem);
      }

      // Final cleanup and deduplication
      const uniqueItems = Array.from(new Map(items.map(item => [item.name, item])).values());
      
      setPlaces(uniqueItems);
    } catch (error) {
      console.error("Error fetching places:", error);
    } finally {
      setLoading(false);
    }
  }, [location, type]);

  useEffect(() => {
    fetchPlaces();
  }, [fetchPlaces]);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950 transition-colors duration-300">
      <div className="p-6 border-b dark:border-zinc-800 flex items-center gap-4 bg-white dark:bg-zinc-900 sticky top-0 z-30">
        <button onClick={onBack} className="w-10 h-10 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center active:scale-90 transition-all">
           <ArrowLeft size={20} className="dark:text-white" />
        </button>
        <div>
          <h1 className="text-xl font-black dark:text-white leading-tight">
             {type === 'hospital' ? t.nearbyHospitals : t.scanningCenters}
          </h1>
          <p className="text-xs font-bold text-gray-500 dark:text-zinc-400">
             {loading ? t.locating : t.radiusInfo}
          </p>
        </div>
      </div>
      
      <div className="p-6 flex-1 overflow-y-auto pb-32">
        {loading ? (
           <div className="flex flex-col items-center justify-center h-64 space-y-4">
              <Loader2 className="animate-spin text-blue-500" size={48} />
              <p className="text-sm font-bold text-gray-400 animate-pulse">Scanning nearby area...</p>
           </div>
        ) : (
          <div className="space-y-4">
            {permissionError && (
               <div className="p-5 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-[2rem] mb-6 flex flex-col gap-3 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center text-red-600">
                      <AlertTriangle size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-red-900 dark:text-red-100 uppercase tracking-widest">GPS Access Required</h3>
                      <p className="text-xs font-bold text-red-700 dark:text-red-300 uppercase">Showing default results for Hyderabad</p>
                    </div>
                  </div>
                  <p className="text-xs font-medium text-red-800 dark:text-red-200 leading-relaxed">
                    To see hospitals near your actual location, please enable GPS/Location permissions in your browser settings and click retry.
                  </p>
                  <button 
                    onClick={() => window.location.reload()}
                    className="mt-2 w-full py-3 bg-red-600 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-red-700 transition-all active:scale-95"
                  >
                    Enable & Refresh
                  </button>
               </div>
            )}

            {places.length === 0 ? (
               <div className="text-center py-10 opacity-50 flex flex-col items-center">
                  <MapPin size={48} className="mx-auto mb-2 text-gray-300" />
                  <p className="font-bold text-gray-500 mb-4">No places found nearby.</p>
                  <button 
                    onClick={() => fetchPlaces()}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-blue-500/20"
                  >
                    <RefreshCw size={14} /> Retry Search
                  </button>
               </div>
            ) : (
               places.map((p, i) => (
              <div key={i} className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-5 shadow-sm active:scale-[0.99] transition-all flex flex-col gap-3">
                <div className="flex justify-between items-start">
                   <div className="flex-1">
                      <h3 className="font-black text-lg text-gray-900 dark:text-white leading-tight mb-1">{p.name}</h3>
                      <p className="text-xs font-medium text-gray-500 dark:text-zinc-400 line-clamp-2">{p.address}</p>
                   </div>
                   {p.rating && (
                      <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-lg shrink-0">
                         <Star size={12} fill="#facc15" className="text-yellow-400" />
                         <span className="text-xs font-black text-yellow-700 dark:text-yellow-400">{p.rating}</span>
                      </div>
                   )}
                </div>

                <div className="flex items-center gap-4 mt-2 pt-3 border-t border-gray-50 dark:border-zinc-800">
                   <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500">
                         <MapPin size={16} />
                      </div>
                      <div>
                         <p className="text-[10px] font-black uppercase text-gray-400">Distance</p>
                         <p className="text-sm font-bold text-gray-800 dark:text-zinc-200">{p.distance || 'N/A'}</p>
                      </div>
                   </div>
                   
                   <a 
                     href={p.uri} 
                     target="_blank" 
                     rel="noreferrer" 
                     className="ml-auto flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20"
                   >
                      <Navigation size={14} /> Directions
                   </a>
                </div>
              </div>
            )))}
          </div>
        )}
      </div>
    </div>
  );
};

const PrescriptionScanner: React.FC<{ 
  onBack: () => void, 
  globalLanguage: Language,
  dailyUsage: { count: number, date: string },
  dailyLimit: number,
  incrementUsage: () => void
}> = ({ onBack, globalLanguage, dailyUsage, dailyLimit, incrementUsage }) => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = TRANSLATIONS[globalLanguage];

  const handleCapture = async () => {
    try {
      const permissions = await Camera.requestPermissions();
      if (permissions.camera === 'granted') {
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: true,
          resultType: CameraResultType.Base64,
          source: CameraSource.Camera
        });

        if (image.base64String) {
          const base64Data = `data:image/${image.format};base64,${image.base64String}`;
          setImage(base64Data);
          analyzePrescription(base64Data);
        }
      } else {
        alert("Camera permission is required to scan prescriptions.");
      }
    } catch (e) {
      console.error("Camera error:", e);
      // Fallback to gallery if camera fails or is cancelled
      fileInputRef.current?.click();
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('vaidya_scan_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveToHistory = (img: string, analysis: string) => {
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      image: img,
      analysis: analysis
    };
    
    // Reduce history limit to 5 to save space
    const updated = [newEntry, ...history].slice(0, 5);
    setHistory(updated);
    
    try {
      localStorage.setItem('vaidya_scan_history', JSON.stringify(updated));
    } catch (e) {
      console.warn("Storage quota exceeded, trying to save without images...");
      try {
        // Fallback: Save history without images if quota exceeded
        const historyWithoutImages = updated.map(item => ({ ...item, image: '' }));
        localStorage.setItem('vaidya_scan_history', JSON.stringify(historyWithoutImages));
      } catch (innerE) {
        console.error("Failed to save even minimal history", innerE);
      }
    }
  };

  const deleteFromHistory = (id: number) => {
    const updated = history.filter(h => h.id !== id);
    setHistory(updated);
    localStorage.setItem('vaidya_scan_history', JSON.stringify(updated));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        analyzePrescription(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzePrescription = async (imgData: string) => {
    if (dailyUsage.count >= dailyLimit && !localStorage.getItem('custom_gemini_api_key')) {
      setResult("Daily free limit reached. Please watch an ad in Settings to get more requests or add your own API key.");
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      // Combine analysis and translation into a single prompt for speed
      const prompt = globalLanguage === Language.ENGLISH 
        ? "Please analyze this medical prescription image. Extract the following details in a structured, point-wise format: Medication Name, Usage/Purpose, Dosage Instructions, Key Warnings, and Potential Side Effects. If you see multiple medicines, list them clearly."
        : `Please analyze this medical prescription image. Extract the following details in a structured, point-wise format: Medication Name, Usage/Purpose, Dosage Instructions, Key Warnings, and Potential Side Effects. If you see multiple medicines, list them clearly. IMPORTANT: Provide the entire response in ${globalLanguage}.`;

      const response = await getAdvancedAIResponse(
        prompt,
        [],
        imgData
      );
      
      let finalResult = response.text;
      
      if (response.model === 'error') {
        setResult(finalResult);
        return;
      }

      incrementUsage();
      setResult(finalResult);
      try {
        saveToHistory(imgData, finalResult);
      } catch (historyError) {
        console.error("History save failed but analysis succeeded", historyError);
      }
    } catch (e: any) {
      setResult("Failed to analyze the prescription: " + (e.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const handleSpeak = async () => {
    if (!result || isSpeaking) return;
    setIsSpeaking(true);
    try {
      const audioData = await generateSpeech(result.substring(0, 1000));
      if (audioData) {
        const audio = new Audio(`data:audio/mp3;base64,${audioData}`);
        audio.onended = () => setIsSpeaking(false);
        audio.play();
      } else {
        setIsSpeaking(false);
      }
    } catch (e) {
      console.error(e);
      setIsSpeaking(false);
    }
  };

  const handleShare = async () => {
    if (!result) return;
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Prescription Analysis',
          text: result
        });
      } else {
        throw new Error('Share not supported');
      }
    } catch (e) {
      // Fallback to clipboard
      navigator.clipboard.writeText(result);
      alert("Analysis copied to clipboard!");
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="p-4 border-b dark:border-zinc-800 flex items-center justify-between bg-white dark:bg-zinc-900 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center active:scale-90 transition-all">
            <ArrowLeft size={20} className="dark:text-white" />
          </button>
          <h1 className="text-xl font-black dark:text-white uppercase tracking-tight">{t.scanPrescription}</h1>
        </div>
        <button 
          onClick={() => setShowHistory(!showHistory)}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${showHistory ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-zinc-800 text-gray-500'}`}
        >
          <HistoryIcon size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {showHistory ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-sm font-black uppercase text-gray-400 tracking-widest">Recent Scans</h2>
              <span className="text-xs font-bold text-blue-500 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-lg">{history.length} Saved</span>
            </div>
            {history.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 opacity-40">
                <HistoryIcon size={48} className="mb-4" />
                <p className="text-sm font-bold">No scan history found</p>
              </div>
            ) : (
              history.map((item) => (
                <div key={item.id} className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-zinc-800 flex gap-4">
                  <img src={item.image} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <p className="text-xs font-black text-blue-500 uppercase">{item.date}</p>
                      <button onClick={() => deleteFromHistory(item.id)} className="text-gray-300 hover:text-red-500">
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <p className="text-xs font-bold text-gray-800 dark:text-zinc-200 line-clamp-2 mt-1">{item.analysis}</p>
                    <button 
                      onClick={() => { setResult(item.analysis); setImage(item.image); setShowHistory(false); }}
                      className="text-xs font-black text-blue-600 uppercase mt-2"
                    >
                      View Full Analysis
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : !image ? (
          <div className="h-full flex flex-col items-center justify-center space-y-6">
            <div 
              onClick={handleCapture}
              className="w-full max-w-sm aspect-[3/4] bg-white dark:bg-zinc-900 border-4 border-dashed border-blue-500/20 rounded-[3rem] flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-blue-500/40 transition-all group shadow-xl"
            >
              <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                <LucideCamera size={40} />
              </div>
              <div className="text-center">
                <p className="text-lg font-black text-gray-800 dark:text-zinc-200">Upload Prescription</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Camera or Gallery</p>
              </div>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageSelect} 
              accept="image/*" 
              className="hidden" 
            />
            <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/20 max-w-sm">
              <p className="text-xs font-bold text-blue-700 dark:text-blue-300 leading-relaxed uppercase tracking-wider">
                VAIDYA Pro uses advanced AI to read doctor's handwriting and explain your medications.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-800">
              <img src={image} alt="Prescription" className="w-full h-auto" />
              <button 
                onClick={() => { setImage(null); setResult(null); }}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {loading ? (
              <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-8 shadow-xl border border-gray-100 dark:border-zinc-800 flex flex-col items-center gap-4">
                <div className="relative">
                  <Loader2 className="animate-spin text-blue-500" size={48} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Brain size={20} className="text-blue-400 animate-pulse" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-black text-gray-800 dark:text-zinc-200 uppercase tracking-widest">Analyzing Prescription</p>
                  <p className="text-xs font-bold text-gray-400 uppercase mt-1">Reading handwriting & extracting data...</p>
                </div>
              </div>
            ) : result && (
              <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-6 shadow-xl border border-gray-100 dark:border-zinc-800 animate-in zoom-in-95 duration-300">
                <div className="flex items-center justify-between mb-6 pb-4 border-b dark:border-zinc-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center text-emerald-600">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest">Analysis Result</h3>
                      <p className="text-xs font-bold text-emerald-600 uppercase">Extracted Successfully</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={handleSpeak}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isSpeaking ? 'bg-blue-500 text-white animate-pulse' : 'bg-gray-100 dark:bg-zinc-800 text-gray-500'}`}
                    >
                      <Volume2 size={18} />
                    </button>
                    <button 
                      onClick={handleShare}
                      className="w-10 h-10 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-gray-500"
                    >
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>
                
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <div className="text-sm font-medium text-gray-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
                    {result}
                  </div>
                </div>

                <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-900/20 flex gap-3">
                  <AlertCircle className="text-amber-600 shrink-0" size={18} />
                  <p className="text-[10px] font-bold text-amber-800 dark:text-amber-200 leading-relaxed uppercase tracking-wider">
                    Always verify AI-extracted information with your pharmacist or doctor before taking any medication.
                  </p>
                </div>

                <button 
                  onClick={() => { setImage(null); setResult(null); }}
                  className="mt-6 w-full py-4 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-600/20"
                >
                  Scan Another
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const AdvancedChatbot: React.FC<{ 
  onBack: () => void, 
  globalLanguage: Language, 
  setGlobalLanguage: (l: Language) => void,
  dailyUsage: { count: number, date: string },
  dailyLimit: number,
  incrementUsage: () => void,
  onRefill: () => void
}> = ({ onBack, globalLanguage, setGlobalLanguage, dailyUsage, dailyLimit, incrementUsage, onRefill }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('custom_gemini_api_key') || '');
  const [saved, setSaved] = useState(false);
  const [showApiKeySettings, setShowApiKeySettings] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const t = TRANSLATIONS[globalLanguage];

  const usagePercent = Math.min(100, (dailyUsage.count / dailyLimit) * 100);
  const isLimitReached = dailyUsage.count >= dailyLimit;

  const handleSaveKey = () => {
    localStorage.setItem('custom_gemini_api_key', apiKey.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleClearKey = () => {
    localStorage.removeItem('custom_gemini_api_key');
    setApiKey('');
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const QUICK_PROMPTS = [
      { icon: <FileText size={14} />, text: t.scanPrescription },
      { icon: <Thermometer size={14} />, text: t.feverSymptoms },
      { icon: <Pill size={14} />, text: t.medicineInfo },
      { icon: <ShieldAlert size={14} />, text: t.emergencySigns }
  ];

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
            const result = reader.result as string;
            const base64Audio = result.split(',')[1];
            setLoading(true);
            try {
               const text = await transcribeAudio(base64Audio, 'audio/webm');
               setInput(prev => prev + (prev ? " " : "") + text);
            } catch (e) {
               console.error("Transcription error", e);
               setInput(prev => prev + " (Audio Transcription Failed)");
            }
            setLoading(false);
        };
        stream.getTracks().forEach(track => track.stop());
      };
      mediaRecorder.start();
      setIsRecording(true);
    } catch (err: any) {
      console.error("Mic error", err);
      if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        alert("No microphone detected. Please connect a microphone and try again.");
      } else if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        alert("Microphone access denied. Please enable microphone permissions in your browser settings.");
      } else {
        alert("Microphone error: " + (err.message || "Unknown error"));
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const send = async (msgText: string = input) => {
    if ((!msgText.trim() && !image) || loading) return;

    if (dailyUsage.count >= dailyLimit && !localStorage.getItem('custom_gemini_api_key')) {
      setMessages(prev => [...prev, { 
        role: 'model', 
        parts: [{ text: "Daily free limit reached. Please watch an ad in Settings to get more requests or add your own API key." }],
        model: 'error'
      }]);
      return;
    }

    const userParts: any[] = [{ text: msgText }];
    if (image) {
        userParts.unshift({ inlineData: { data: image, mimeType: 'image/jpeg' } });
    }

    const newMessage = { 
        role: 'user', 
        parts: userParts 
    };

    // Capture current messages for history before updating state
    const historyForAI = [...messages];
    
    setMessages(prev => [...prev, newMessage]);
    setInput("");
    const imageToSend = image;
    setImage(null);
    setLoading(true);

    try {
      const response = await getAdvancedAIResponse(msgText, historyForAI, imageToSend || undefined);
      
      if (response.model !== 'error') {
        incrementUsage();
      }

      setMessages(prev => [...prev, { 
        role: 'model', 
        parts: [{ text: response.text }],
        model: response.model 
      }]);
    } catch (e: any) {
      console.error("Chat error:", e);
      setMessages(prev => [...prev, { 
        role: 'model', 
        parts: [{ text: "I'm having trouble connecting to my medical database: " + (e.message || "Unknown error") }],
        model: 'error'
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950 transition-colors duration-300">
      <div className="border-b dark:border-zinc-800 bg-white dark:bg-zinc-900 sticky top-0 z-30 shadow-sm">
        <div className="p-1.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
              <button onClick={onBack} className="w-7 h-7 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center shrink-0 active:scale-90 transition-all">
                  <ArrowLeft size={14} className="dark:text-white" />
              </button>
              <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/10 rounded-lg flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-900/20">
                  <VaidyaLogo size={22} />
              </div>
              <div className="min-w-0">
                  <h1 className="text-xs font-black dark:text-white truncate leading-none">
                      {t.aiAssistant}
                  </h1>
                  <p className="text-[7px] font-bold text-[#a3e635] flex items-center gap-1 mt-0.5">
                      <span className="w-1 h-1 bg-[#a3e635] rounded-full animate-pulse"></span> {t.online}
                  </p>
              </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
              <div className="flex flex-col items-end mr-1">
                  <span className="text-[9px] font-black dark:text-white leading-none">{dailyUsage.count}/{dailyLimit}</span>
              </div>
              <button 
                onClick={onRefill}
                className="px-1 py-0.5 bg-emerald-500 text-white rounded-md text-[7px] font-black uppercase active:scale-95 transition-all"
              >
                +3
              </button>
              <div className="w-px h-5 bg-gray-100 dark:bg-zinc-800 mx-0.5"></div>
              <LanguageSelector 
                currentLanguage={globalLanguage} 
                onSelect={setGlobalLanguage} 
                isOpen={showLangMenu} 
                onToggle={() => setShowLangMenu(!showLangMenu)} 
              />
              <button 
                  onClick={() => setMessages([])} 
                  className="w-7 h-7 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center text-red-500 hover:bg-red-100 transition-colors"
              >
                  <Trash2 size={12} />
              </button>
          </div>
        </div>
        
        {/* Ultra-thin progress bar at the bottom */}
        <div className="h-0.5 w-full bg-gray-50 dark:bg-zinc-900 overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${isLimitReached ? 'bg-red-500' : 'bg-blue-500'}`}
            style={{ width: `${usagePercent}%` }}
          />
        </div>

        {/* Collapsible API Key Settings */}
        {showApiKeySettings && (
          <div className="p-3 border-t dark:border-zinc-800 bg-slate-50 dark:bg-black/20 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-gray-100 dark:border-zinc-800 space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <Zap size={16} />
                <h2 className="text-[10px] font-black uppercase tracking-tight">Dedicated API Key</h2>
              </div>
              <p className="text-[9px] font-bold text-gray-500 dark:text-zinc-400 leading-tight">
                Enter your Gemini API key for unlimited access.
              </p>
              <input 
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter API key..."
                className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 rounded-lg py-1.5 px-2 text-[10px] text-gray-900 dark:text-white outline-none font-bold"
              />
              <div className="flex gap-2">
                <button 
                  onClick={handleSaveKey}
                  className="flex-1 py-1.5 bg-blue-500 text-white rounded-lg text-[9px] font-black uppercase tracking-widest active:scale-95 transition-all"
                >
                  Save
                </button>
                <button 
                  onClick={() => { setApiKey(''); localStorage.removeItem('gemini_api_key'); setShowApiKeySettings(false); }}
                  className="px-3 py-1.5 bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-gray-400 rounded-lg text-[9px] font-black uppercase tracking-widest active:scale-95 transition-all"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50 dark:bg-black/20">

        {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-80 mt-10">
                <div className="w-24 h-24 bg-white dark:bg-zinc-800 rounded-[3rem] shadow-lg flex items-center justify-center mb-6 animate-reveal">
                    <VaidyaLogo size={80} />
                </div>
                <h2 className="text-2xl font-black text-gray-800 dark:text-zinc-200 mb-2">{t.howHelp}</h2>
                <p className="text-sm font-medium text-gray-500 dark:text-zinc-500 text-center max-w-xs mb-8">
                    {t.aiDescription}
                </p>
                
                <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
                    {QUICK_PROMPTS.map((prompt, idx) => (
                        <button 
                            key={idx}
                            onClick={() => send(prompt.text)}
                            className="flex items-center gap-3 p-4 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95 text-left"
                        >
                            <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                                {prompt.icon}
                            </div>
                            <span className="text-xs font-bold text-gray-700 dark:text-zinc-300">{prompt.text}</span>
                        </button>
                    ))}
                </div>
            </div>
        ) : (
            messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                    <div className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${
                        m.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-none' 
                        : 'bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-zinc-800 rounded-bl-none'
                    }`}>
                        {m.parts.some((p: any) => p.inlineData) && (
                           <div className="mb-3 rounded-xl overflow-hidden border border-white/20">
                               <img 
                                 src={(() => {
                                     const part = m.parts.find((p: any) => p.inlineData);
                                     if (!part) return '';
                                     const data = part.inlineData.data;
                                     if (typeof data === 'string' && data.startsWith('data:')) {
                                         return data;
                                     }
                                     return `data:${part.inlineData.mimeType || 'image/jpeg'};base64,${data}`;
                                 })()} 
                                 alt="User upload" 
                                 className="w-full max-h-60 object-cover" 
                               />
                           </div>
                        )}
                        <div className="text-sm font-medium leading-relaxed whitespace-pre-wrap">
                            {m.parts.filter((p: any) => p.text).map((p: any) => p.text).join('')}
                        </div>
                        {m.model && (
                            <div className="mt-2 pt-2 border-t border-gray-100 dark:border-zinc-800 flex items-center gap-1.5">
                                {m.model === 'gemini-3.1-pro-preview' ? (
                                    <Brain size={10} className="text-blue-500" />
                                ) : (
                                    <Zap size={10} className="text-amber-500" />
                                )}
                                <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">
                                    {m.model === 'gemini-3.1-pro-preview' ? 'Thinking Mode Active' : 'Fast Response Mode'}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            ))
        )}
        
        {loading && (
            <div className="flex justify-start animate-in fade-in zoom-in-50 duration-300">
                <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl rounded-bl-none p-4 shadow-sm flex items-center gap-3">
                    <Loader2 className="animate-spin text-blue-500" size={20} />
                    <span className="text-xs font-bold text-gray-500 dark:text-zinc-400">Vaidya is thinking...</span>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-2 bg-white dark:bg-zinc-900 border-t dark:border-zinc-800 relative z-40">
        {image && (
            <div className="absolute bottom-full left-0 right-0 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm p-3 border-t dark:border-zinc-800 flex items-center gap-3 animate-in slide-in-from-bottom-2">
                <div className="relative">
                    <img src={image} alt="Preview" className="h-16 w-16 object-cover rounded-xl border border-gray-200 dark:border-zinc-700" />
                    <button 
                        onClick={() => setImage(null)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 shadow-md hover:scale-110 transition-transform"
                    >
                        <X size={12} />
                    </button>
                </div>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">Image attached</span>
            </div>
        )}

        <div className="flex items-end gap-2">
            <button 
                onClick={() => fileInputRef.current?.click()}
                className="p-2.5 bg-gray-100 dark:bg-zinc-800 rounded-xl text-gray-500 dark:text-zinc-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all active:scale-95"
                title="Upload Image"
            >
                <ImageIcon size={18} />
            </button>
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageSelect} 
                accept="image/*" 
                className="hidden" 
            />

            <button 
                onClick={toggleRecording}
                className={`p-2.5 rounded-xl transition-all active:scale-95 ${
                    isRecording 
                    ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/30' 
                    : 'bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400 hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20'
                }`}
            >
                {isRecording ? <StopCircle size={18} /> : <Mic size={18} />}
            </button>

            <textarea 
                className="flex-1 bg-gray-100 dark:bg-zinc-800 border-none rounded-xl px-3 py-2 text-sm font-medium dark:text-white resize-none max-h-32 focus:ring-2 focus:ring-blue-500/20 outline-none"
                rows={1}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={isRecording ? t.listening : t.typeMessage}
                onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        send();
                    }
                }}
            />

            <button 
                onClick={() => send()} 
                disabled={(!input.trim() && !image) || loading}
                className="p-2.5 bg-gradient-to-tr from-blue-600 to-blue-400 text-white rounded-xl shadow-lg shadow-blue-600/30 disabled:opacity-50 disabled:shadow-none active:scale-95 transition-all hover:brightness-110"
            >
                <Send size={18} className={loading ? 'opacity-0' : 'opacity-100'} />
                {loading && <Loader2 size={18} className="animate-spin absolute" />}
            </button>
        </div>
      </div>
    </div>
  );
};

const MedicinesView: React.FC<{ 
  medicines: Medicine[], 
  onBack: () => void, 
  onMedicineClick: (m: Medicine) => void,
  globalLanguage: Language
}> = ({ medicines, onBack, onMedicineClick, globalLanguage }) => {
  const [search, setSearch] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [isOfflineAvailable, setIsOfflineAvailable] = useState(false);
  const filtered = medicines.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    const lastSync = localStorage.getItem('vaidya_medicines_last_sync');
    if (lastSync) {
      setIsOfflineAvailable(true);
    }
  }, []);

  const handleDownloadOffline = () => {
    setIsDownloading(true);
    // Simulate downloading/syncing
    setTimeout(() => {
      localStorage.setItem('vaidya_medicines_last_sync', new Date().toISOString());
      setIsDownloading(false);
      setIsOfflineAvailable(true);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950">
      <div className="p-4 border-b dark:border-zinc-800 flex items-center gap-4">
        <button onClick={onBack} className="w-10 h-10 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center active:scale-90 transition-all">
          <ArrowLeft size={20} className="dark:text-white" />
        </button>
        <div className="flex-1">
           <input 
             className="w-full bg-gray-100 dark:bg-zinc-900 border-none rounded-xl px-4 py-2 dark:text-white font-bold"
             placeholder="Search medicines..."
             value={search}
             onChange={e => setSearch(e.target.value)}
           />
        </div>
      </div>

      <div className="px-6 py-3 bg-blue-50 dark:bg-blue-900/10 flex items-center justify-between border-b dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isOfflineAvailable ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
          <span className="text-[10px] font-black uppercase text-gray-500 dark:text-zinc-400 tracking-widest">
            {isOfflineAvailable ? 'Offline Mode Active' : 'Online Mode'}
          </span>
        </div>
        <button 
          onClick={handleDownloadOffline}
          disabled={isDownloading}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 ${isDownloading ? 'bg-blue-100 text-blue-400' : 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'}`}
        >
          {isDownloading ? (
            <><Loader2 size={12} className="animate-spin" /> Syncing...</>
          ) : isOfflineAvailable ? (
            <><Check size={12} /> Updated</>
          ) : (
            <><Download size={12} /> Download Offline</>
          )}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-40">
            <Pill size={48} className="mb-4" />
            <p className="text-sm font-bold">No medicines found</p>
          </div>
        ) : (
          filtered.map(m => (
            <div 
              key={m.id} 
              onClick={() => onMedicineClick(m)} 
              className="p-5 bg-white dark:bg-zinc-900 rounded-[2rem] border border-gray-100 dark:border-zinc-800 shadow-sm flex justify-between items-center active:scale-[0.98] transition-all cursor-pointer hover:border-blue-500/30"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600">
                  <Pill size={24} />
                </div>
                <div>
                  <h3 className="font-black text-gray-900 dark:text-white tracking-tight">{m.name}</h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5 line-clamp-1">{m.usage}</p>
                </div>
              </div>
              <div className="w-8 h-8 bg-gray-50 dark:bg-zinc-800 rounded-full flex items-center justify-center text-gray-300">
                <ChevronRight size={16} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const MedicineDetailView: React.FC<{ 
  medicine: Medicine | null, 
  onBack: () => void, 
  globalLanguage: Language, 
  onUpdate: (m: Medicine) => void 
}> = ({ medicine, onBack, globalLanguage }) => {
  if (!medicine) return null;
  const trans = medicine.translations?.[globalLanguage];
  const name = trans?.name || medicine.name;
  const usage = trans?.usage || medicine.usage;
  const dose = trans?.dailyDose || medicine.dailyDose;

  const playAudio = async () => {
     try {
       const audioData = await generateSpeech(`${name}. ${usage}. Dose: ${dose}`);
       if (audioData) {
         const audio = new Audio(`data:audio/mp3;base64,${audioData}`);
         audio.play();
       }
     } catch (e) { console.error(e); }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950">
       <div className="p-6 bg-blue-50 dark:bg-blue-950/20 rounded-b-[3rem]">
          <button onClick={onBack} className="mb-4"><ArrowLeft size={24} className="dark:text-white text-gray-900" /></button>
          <h1 className="text-4xl font-black text-blue-900 dark:text-blue-100">{name}</h1>
          <button onClick={playAudio} className="mt-6 flex items-center gap-2 bg-white dark:bg-blue-800 px-6 py-2.5 rounded-full shadow-lg text-sm font-black text-blue-600 dark:text-white active:scale-95 transition-all">
            <Volume2 size={18} /> Listen Instructions
          </button>
       </div>
       <div className="p-6 space-y-6 overflow-y-auto flex-1 no-scrollbar">
          <div className="p-6 bg-gray-50 dark:bg-zinc-900 rounded-[2rem] border border-gray-100 dark:border-zinc-800 shadow-sm">
             <h4 className="text-xs font-black uppercase text-gray-400 mb-3 tracking-widest">Usage Context</h4>
             <p className="dark:text-white font-bold leading-relaxed">{usage}</p>
          </div>
          <div className="p-6 bg-gray-50 dark:bg-zinc-900 rounded-[2rem] border border-gray-100 dark:border-zinc-800 shadow-sm">
             <h4 className="text-xs font-black uppercase text-gray-400 mb-3 tracking-widest">Recommended Dosage</h4>
             <p className="dark:text-white font-bold leading-relaxed">{dose}</p>
          </div>
       </div>
    </div>
  );
};

const CategorizedDoctorsView: React.FC<{ onBack: () => void, onDoctorClick: (d: Doctor) => void, doctors: Doctor[], globalLanguage: Language }> = ({ onBack, onDoctorClick, doctors, globalLanguage }) => {
  const t = TRANSLATIONS[globalLanguage];
  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950">
       <div className="p-6 border-b dark:border-zinc-800 flex items-center gap-4 bg-white dark:bg-zinc-900 sticky top-0 z-30 shadow-sm">
         <button onClick={onBack} className="w-10 h-10 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center active:scale-90 transition-all"><ArrowLeft size={20} className="dark:text-white" /></button>
         <h1 className="text-2xl font-black text-gray-900 dark:text-white">{t.doctors}</h1>
       </div>
       
       <div className="flex-1 overflow-y-auto p-6 space-y-4 pb-32">
          {doctors.map((doc) => (
             <div 
               key={doc.id} 
               onClick={() => onDoctorClick(doc)}
               className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-md flex p-4 gap-4 active:scale-[0.98] transition-all cursor-pointer"
             >
                <div className="w-24 h-24 rounded-3xl overflow-hidden shrink-0 border-2 border-white dark:border-zinc-800 shadow-sm">
                   <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-center py-1">
                   <div className="flex justify-between items-start">
                      <h3 className="font-black text-gray-900 dark:text-white leading-tight">{doc.name}</h3>
                      <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-1.5 py-0.5 rounded-lg">
                         <Star size={14} fill="#facc15" className="text-yellow-400" />
                         <span className="text-xs font-black text-yellow-700 dark:text-yellow-400">{doc.rating}</span>
                      </div>
                   </div>
                   <p className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase mt-1">{doc.specialty}</p>
                   <div className="mt-2 space-y-1">
                      <p className="text-xs font-bold text-gray-400 dark:text-zinc-500 flex items-center gap-1">
                        <Hospital size={14} /> {doc.hospitalName}
                      </p>
                      <p className="text-xs font-bold text-gray-500 dark:text-zinc-400 flex items-center gap-1">
                        <MapPin size={14} /> {doc.city}
                      </p>
                   </div>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
};

const EmergencyView: React.FC<{ onBack: () => void, contacts: EmergencyContact[], globalLanguage: Language }> = ({ onBack, contacts, globalLanguage }) => {
  const t = TRANSLATIONS[globalLanguage];
  const [familyContacts, setFamilyContacts] = useState<string[]>(['', '', '']);
  const [sending, setSending] = useState(false);
  const [lastGeneratedLink, setLastGeneratedLink] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('vaidya_family_contacts');
    if (saved) {
      try {
        setFamilyContacts(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSaveFamilyContacts = () => {
    const cleaned = familyContacts.map(c => c.trim());
    localStorage.setItem('vaidya_family_contacts', JSON.stringify(cleaned));
    alert("Family contacts saved successfully.");
  };

  const handleCallContact = (num: string) => {
    if (num.trim()) {
      window.location.href = `tel:${num.trim()}`;
    }
  };

  const handleSendAlert = () => {
    const activeContacts = familyContacts.filter(c => c.trim() !== '');
    if (activeContacts.length === 0) {
      alert("Please add at least one family emergency contact number first.");
      return;
    }

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setSending(true);
    setLastGeneratedLink(null);
    
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
        const message = `EMERGENCY! I need help. My current location: ${mapsLink}`;
        setLastGeneratedLink(mapsLink);
        setSending(false);

        // 1. Try native share first
        if (navigator.share) {
          try {
            await navigator.share({
              title: 'EMERGENCY ALERT',
              text: message,
              url: mapsLink
            });
          } catch (err) {
            console.log('Native share failed or cancelled', err);
          }
        }

        // 2. Trigger SMS to all contacts
        const smsNumbers = activeContacts.join(',');
        const smsUrl = `sms:${smsNumbers}?body=${encodeURIComponent(message)}`;
        
        // Use a small delay to ensure the browser doesn't block the second action
        setTimeout(() => {
          window.location.href = smsUrl;
        }, 500);

        // 3. Copy to clipboard as fallback (only if document is focused)
        if (navigator.clipboard) {
          try {
            // We only attempt to write if the document has focus to avoid the "Document is not focused" error
            if (document.hasFocus()) {
              await navigator.clipboard.writeText(message);
            }
          } catch (e) {
            // Silently fail for clipboard errors as it's a background fallback
            console.warn("Clipboard fallback skipped:", e);
          }
        }
      },
      (error) => {
        let errorMsg = "Location access required to send emergency alert.";
        if (error.code === error.PERMISSION_DENIED) {
          errorMsg = "Location permission denied. Please enable location access in your browser settings and try again.";
        } else if (error.code === error.TIMEOUT) {
          errorMsg = "Location request timed out. Please ensure GPS is on and try again.";
        }
        alert(errorMsg);
        setSending(false);
      },
      options
    );
  };

  const handleShareToWhatsApp = () => {
    if (lastGeneratedLink) {
      const text = encodeURIComponent(`EMERGENCY! I need help. My location: ${lastGeneratedLink}`);
      window.open(`https://wa.me/?text=${text}`, '_blank');
    }
  };

  const handleShareToEmail = () => {
    if (lastGeneratedLink) {
      const subject = encodeURIComponent("EMERGENCY ALERT");
      const body = encodeURIComponent(`I need help. My current location: ${lastGeneratedLink}`);
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    }
  };

  const handleCopyLink = async () => {
    if (lastGeneratedLink) {
      try {
        await navigator.clipboard.writeText(`EMERGENCY! I need help. My location: ${lastGeneratedLink}`);
        alert("Link copied to clipboard!");
      } catch (e) {
        alert("Failed to copy link.");
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] text-white transition-colors duration-300 font-sans">
       {/* Hardware-style Header */}
       <div className="p-6 border-b border-white/10 flex items-center justify-between bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50">
         <div className="flex items-center gap-4">
            <button onClick={onBack} className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center transition-all active:scale-90 border border-white/10">
               <ArrowLeft className="text-red-500" size={20} />
            </button>
            <div>
               <h1 className="text-lg font-black uppercase tracking-[0.2em] text-red-500">Emergency Hub</h1>
               <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">System Status: Active</p>
            </div>
         </div>
         <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
            <span className="text-[10px] font-black text-red-500 uppercase tracking-tighter">Live SOS</span>
         </div>
       </div>
       
       <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32 no-scrollbar">
           {/* SOS Big Button Section */}
           <div className="flex flex-col items-center py-4">
               <div className="flex items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <button 
                    onClick={handleSendAlert}
                    disabled={sending}
                    className={`relative w-40 h-40 rounded-full flex flex-col items-center justify-center transition-all active:scale-95 shadow-2xl ${sending ? 'bg-zinc-800' : 'bg-red-600 hover:bg-red-500 shadow-red-600/40'}`}
                  >
                     <div className="absolute inset-0 rounded-full border-4 border-white/20 animate-ping opacity-20"></div>
                     <div className="absolute inset-4 rounded-full border border-white/10"></div>
                     
                     {sending ? (
                       <Loader2 className="animate-spin text-white" size={40} />
                     ) : (
                       <ShieldAlert size={48} className="text-white mb-2" />
                     )}
                     <span className="text-xl font-black uppercase tracking-tighter text-white">
                       {sending ? 'Sending' : 'SOS'}
                     </span>
                     <span className="text-[8px] font-bold uppercase tracking-widest text-white/60 mt-1">Alert SMS</span>
                  </button>
                  
                  {familyContacts[0]?.trim() && (
                    <button 
                      onClick={() => handleCallContact(familyContacts[0])}
                      className="mt-2 px-6 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-[10px] font-black text-red-500 uppercase tracking-widest flex items-center gap-2 active:scale-95 transition-all"
                    >
                      <PhoneCall size={14} /> Call Primary
                    </button>
                  )}
                </div>

                <div className="flex flex-col gap-4">
                  <a 
                    href="tel:108"
                    className="w-20 h-20 bg-emerald-600 rounded-2xl flex flex-col items-center justify-center shadow-lg shadow-emerald-600/20 active:scale-90 transition-all border border-white/10"
                  >
                    <PhoneCall size={24} className="text-white mb-1" />
                    <span className="text-[10px] font-black text-white uppercase">108</span>
                  </a>
                  <a 
                    href="tel:100"
                    className="w-20 h-20 bg-blue-600 rounded-2xl flex flex-col items-center justify-center shadow-lg shadow-blue-600/20 active:scale-90 transition-all border border-white/10"
                  >
                    <Phone size={24} className="text-white mb-1" />
                    <span className="text-[10px] font-black text-white uppercase">100</span>
                  </a>
                </div>
              </div>
              
              <p className="mt-8 text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em] text-center max-w-[240px] animate-pulse">
                 Sends location alert & initiates emergency call
              </p>

              {lastGeneratedLink && (
                <div className="mt-6 w-full max-w-xs animate-in fade-in slide-in-from-top-4">
                  <div className="bg-zinc-900 border border-blue-500/30 rounded-2xl p-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Location Link Ready</span>
                      <button onClick={() => setLastGeneratedLink(null)} className="text-zinc-500 hover:text-white">
                        <X size={14} />
                      </button>
                    </div>
                    <p className="text-[10px] text-zinc-400 truncate bg-black/40 p-2 rounded-lg border border-white/5">
                      {lastGeneratedLink}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={handleCopyLink}
                        className="bg-white/5 hover:bg-white/10 border border-white/10 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
                      >
                        <Copy size={12} /> Copy
                      </button>
                      <button 
                        onClick={handleShareToWhatsApp}
                        className="bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all text-emerald-400"
                      >
                        <MessageSquare size={12} /> WhatsApp
                      </button>
                      <button 
                        onClick={handleShareToEmail}
                        className="bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all text-blue-400"
                      >
                        <Mail size={12} /> Email
                      </button>
                      <button 
                        onClick={handleSendAlert}
                        className="bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all text-red-400"
                      >
                        <RefreshCw size={12} /> Update
                      </button>
                    </div>
                  </div>
                </div>
              )}
           </div>

          {/* Family Emergency Share Card - Hardware Style */}
          <div className="bg-zinc-900 border border-white/10 rounded-[2rem] p-6 shadow-2xl space-y-6 relative overflow-hidden">
             <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500 border border-red-500/20">
                      <Users size={20} />
                   </div>
                   <div>
                      <h2 className="text-sm font-black uppercase tracking-widest">Family Circle</h2>
                      <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-tighter">Emergency Recipients</p>
                   </div>
                </div>
                <button 
                  onClick={handleSaveFamilyContacts}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10"
                  title="Save Contacts"
                >
                   <Save size={16} className="text-zinc-400" />
                </button>
             </div>

             <div className="space-y-3">
                 {familyContacts.map((num, idx) => (
                   <div key={idx} className="flex gap-2">
                      <div className="relative group/input flex-1">
                         <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within/input:text-red-500 transition-colors">
                            <Phone size={14} />
                         </div>
                         <input 
                           type="tel"
                           value={num}
                           onChange={(e) => {
                              const newC = [...familyContacts];
                              newC[idx] = e.target.value;
                              setFamilyContacts(newC);
                           }}
                           placeholder={`Emergency Contact ${idx + 1}`}
                           className="w-full bg-black/40 border border-white/5 focus:border-red-500/50 rounded-xl py-3 pl-10 pr-4 text-xs font-bold text-white transition-all outline-none placeholder:text-zinc-700"
                         />
                      </div>
                      {num.trim() && (
                        <button 
                          onClick={() => handleCallContact(num)}
                          className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-500 active:scale-90 transition-all"
                        >
                          <PhoneCall size={18} />
                        </button>
                      )}
                   </div>
                ))}
             </div>

             <div className="bg-red-500/5 border border-red-500/10 p-3 rounded-xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center text-red-500 shrink-0">
                   <Info size={16} />
                </div>
                <p className="text-[9px] font-bold text-zinc-400 leading-relaxed uppercase tracking-tight">
                   Contacts are saved locally on your device for privacy.
                </p>
             </div>
          </div>

          <div className="space-y-4">
             <div className="flex items-center gap-4 px-2">
                <div className="h-px flex-1 bg-white/10"></div>
                <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] whitespace-nowrap">Official Helplines</h3>
                <div className="h-px flex-1 bg-white/10"></div>
             </div>
             
             <div className="grid grid-cols-1 gap-3">
                {contacts.map(c => (
                   <a 
                     key={c.id} 
                     href={`tel:${c.number}`}
                     className="p-4 bg-zinc-900 border border-white/5 rounded-2xl flex justify-between items-center hover:bg-zinc-800 transition-all active:scale-[0.98] group"
                   >
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all border border-red-500/20">
                            <Siren size={20} />
                         </div>
                         <div>
                            <h3 className="text-xs font-black uppercase tracking-widest text-zinc-300">{c.name}</h3>
                            <p className="text-red-500 font-black text-lg tracking-tighter leading-none mt-1">{c.number}</p>
                         </div>
                      </div>
                      <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-zinc-500 group-hover:text-white transition-all">
                         <Phone size={18} />
                      </div>
                   </a>
                ))}
             </div>
          </div>

          {/* Footer Disclaimer */}
          <div className="pt-4 pb-8 text-center">
             <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-[0.2em] leading-relaxed max-w-[240px] mx-auto">
                Vaidya Emergency Hub is a support tool. In life-threatening situations, always call official emergency services first.
             </p>
          </div>
       </div>
    </div>
  );
};

const AdminSystem: React.FC<{ medicines: Medicine[], doctors: Doctor[], onUpdateMedicines: () => void, onLogout: () => void }> = ({ onLogout }) => {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950">
       <div className="p-6 bg-zinc-900 text-white flex justify-between items-center">
          <h1 className="font-bold text-xl">Admin Panel</h1>
          <button onClick={onLogout} className="text-xs bg-red-600 px-3 py-1 rounded">Logout</button>
       </div>
       <div className="p-6">
          <p className="dark:text-white">Admin functionality placeholder.</p>
       </div>
    </div>
  );
};

const NotificationsView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950">
       <div className="p-4 border-b dark:border-zinc-800 flex items-center gap-4">
         <button onClick={onBack}><ArrowLeft className="dark:text-white" /></button>
         <h1 className="text-xl font-bold dark:text-white">Notifications</h1>
       </div>
       <div className="p-8 text-center text-gray-400">
          <Bell size={48} className="mx-auto mb-4 opacity-50" />
          <p>No new notifications</p>
       </div>
    </div>
  );
};

const FeverDetailView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [temperature, setTemperature] = useState<number>(99.0);
  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState('Viral Fever');

  let status = { label: 'NORMAL', color: 'bg-emerald-500', text: 'text-white', msg: 'Body temperature is normal.' };
  
  if (temperature > 104) {
      status = { label: 'VERY HIGH / DANGER ⚠️', color: 'bg-red-600', text: 'text-white', msg: 'Emergency fever. Go to hospital immediately.' };
  } else if (temperature >= 102) {
      status = { label: 'HIGH FEVER', color: 'bg-red-500', text: 'text-white', msg: 'High temperature. Needs attention.' };
  } else if (temperature >= 100) {
      status = { label: 'FEVER', color: 'bg-orange-500', text: 'text-white', msg: 'You have a fever. Monitor closely.' };
  } else if (temperature >= 99) {
      status = { label: 'MILD FEVER', color: 'bg-yellow-100', text: 'text-yellow-800', msg: 'Slightly warm. Rest well.' };
  } else if (temperature < 97) {
      status = { label: 'LOW TEMP', color: 'bg-blue-400', text: 'text-white', msg: 'Body is cold. Keep warm.' };
  }

  const isEmergency = temperature > 104;

  const feverTypes = [
    {
      id: 'Viral Fever',
      symptoms: 'Fever, Body pains, Weakness, Cold or cough',
      warning: 'Doctor advice required. Do not self-medicate.',
      meds: [
        { name: 'Paracetamol', company: 'Calpol', power: '500 mg', time: 'Every 6 hours, After food', cost: '₹20–30', side: 'Liver risk if overdose' },
        { name: 'Paracetamol', company: 'Crocin', power: '650 mg', time: 'Every 8 hours', cost: '₹25–40', side: 'Nausea' },
        { name: 'Ibuprofen', company: 'Brufen', power: '400 mg', time: 'After food', cost: '₹30–50', side: 'Stomach pain' },
        { name: 'Aceclofenac', company: 'Hifenac', power: '100 mg', time: 'Night', cost: '₹40–60', side: 'Acidity' },
        { name: 'Meftal-P', company: 'Blue Cross', power: '500 mg', time: 'After food', cost: '₹35–60', side: 'Gastric upset' }
      ]
    },
    {
      id: 'Bacterial Fever',
      symptoms: 'High fever, throat pain, ear pain, infection signs',
      warning: 'Doctor prescription required.',
      meds: [
        { name: 'Paracetamol', company: 'Calpol', power: '650 mg', time: 'After food', cost: '₹30', side: 'Nausea' },
        { name: 'Paracetamol', company: 'Dolo', power: '650 mg', time: 'After food', cost: '₹30', side: 'Dizziness' },
        { name: 'Azithromycin', company: 'Azee', power: '500 mg', time: 'Once daily', cost: '₹120', side: 'Loose stools' },
        { name: 'Amoxicillin', company: 'Novamox', power: '500 mg', time: 'After food', cost: '₹80', side: 'Allergy' },
        { name: 'Cefixime', company: 'Zifi', power: '200 mg', time: 'Twice daily', cost: '₹150', side: 'Stomach upset' }
      ]
    },
    {
      id: 'Dengue (Suspected)',
      symptoms: 'High fever, severe headache, pain behind eyes, joint pain',
      warning: 'No Ibuprofen. No Aspirin.',
      meds: [
        { name: 'Paracetamol', company: 'Calpol', power: '500 mg', time: 'After food', cost: '₹25', side: 'Liver risk' },
        { name: 'Paracetamol', company: 'Crocin', power: '650 mg', time: 'After food', cost: '₹30', side: 'Nausea' },
        { name: 'Paracetamol', company: 'Dolo', power: '650 mg', time: 'After food', cost: '₹30', side: 'Dizziness' },
        { name: 'Paracetamol', company: 'Metacin', power: '500 mg', time: 'After food', cost: '₹20', side: 'Weakness' },
        { name: 'Paracetamol', company: 'Pacimol', power: '500 mg', time: 'After food', cost: '₹20', side: 'Nausea' }
      ]
    },
    {
      id: 'Typhoid (Suspected)',
      symptoms: 'Sustained fever, stomach pain, headache',
      warning: 'Doctor consultation mandatory.',
      meds: [
        { name: 'Paracetamol', company: 'Calpol', power: '650 mg', time: 'After food', cost: '₹30', side: 'Nausea' },
        { name: 'Azithromycin', company: 'Azee', power: '500 mg', time: 'Morning', cost: '₹120', side: 'Loose stools' },
        { name: 'Cefixime', company: 'Zifi', power: '200 mg', time: 'Twice daily', cost: '₹150', side: 'Acidity' },
        { name: 'Ofloxacin', company: 'Zanocin', power: '200 mg', time: 'After food', cost: '₹90', side: 'Dizziness' },
        { name: 'Ciprofloxacin', company: 'Ciplox', power: '500 mg', time: 'After food', cost: '₹80', side: 'Nausea' }
      ]
    },
    {
      id: 'Malaria (Suspected)',
      symptoms: 'Shaking chills, high fever, sweating',
      warning: 'Doctor prescription required.',
      meds: [
        { name: 'Hydroxychloroquine', company: 'HCQS', power: '200 mg', time: 'As prescribed', cost: '₹100', side: 'Eye issues' },
        { name: 'Artemether-Lumefantrine', company: 'Lumerax', power: '80/480', time: 'As prescribed', cost: '₹150', side: 'Headache' },
        { name: 'Chloroquine', company: 'Lariago', power: '250 mg', time: 'As prescribed', cost: '₹20', side: 'Itching' },
        { name: 'Primaquine', company: 'Pmq', power: '7.5 mg', time: 'As prescribed', cost: '₹15', side: 'Nausea' },
        { name: 'Paracetamol', company: 'Dolo', power: '650 mg', time: 'For fever', cost: '₹30', side: 'Dizziness' }
      ]
    },
    {
      id: 'Seasonal Fever',
      symptoms: 'Runny nose, mild fever, sneezing',
      warning: 'Doctor advice required.',
      meds: [
        { name: 'Paracetamol', company: 'Calpol', power: '500 mg', time: 'Every 6 hrs', cost: '₹20', side: 'Liver risk' },
        { name: 'Cetirizine', company: 'Cetzine', power: '10 mg', time: 'Night', cost: '₹30', side: 'Sleepiness' },
        { name: 'Levocetirizine', company: 'Levoz', power: '5 mg', time: 'Night', cost: '₹40', side: 'Drowsiness' },
        { name: 'Phenylephrine', company: 'Cofsils', power: '10 mg', time: 'Every 8 hrs', cost: '₹40', side: 'BP rise' },
        { name: 'Montelukast', company: 'Montek', power: '10 mg', time: 'Night', cost: '₹90', side: 'Mood change' }
      ]
    }
  ];

  const currentData = feverTypes.find(t => t.id === activeTab) || feverTypes[0];

  return (
      <div className="flex flex-col h-full bg-slate-50 dark:bg-zinc-950 transition-colors duration-300">
         <div className="p-6 bg-white dark:bg-zinc-900 border-b dark:border-zinc-800 sticky top-0 z-30 shadow-sm">
            <div className="flex items-center gap-4 mb-2">
                <button onClick={onBack} className="w-10 h-10 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center active:scale-90 transition-all">
                    <ArrowLeft size={20} className="text-gray-800 dark:text-zinc-100" />
                </button>
                <div className="flex items-center gap-2">
                    <ThermometerSun className="text-rose-500" size={24} />
                    <h1 className="text-xl font-black text-gray-900 dark:text-zinc-100">Check Fever</h1>
                </div>
            </div>
         </div>

         <div className="flex-1 overflow-y-auto pb-32 p-6">
             <div className="flex flex-col items-center justify-center mb-8">
                 <div className="relative mb-2">
                     <span className="text-7xl font-black text-gray-900 dark:text-zinc-100 tracking-tighter">
                         {temperature.toFixed(1)}
                         <span className="text-3xl text-gray-400 ml-1">°F</span>
                     </span>
                 </div>
                 
                 <p className="text-xs font-black uppercase text-gray-400 mb-6 tracking-widest">Select Body Temperature</p>

                 <input 
                    type="range" 
                    min="95" 
                    max="107.6" 
                    step="0.1" 
                    value={temperature} 
                    onChange={(e) => { setTemperature(parseFloat(e.target.value)); setShowDetails(false); }}
                    className="w-full h-4 bg-gray-200 rounded-xl appearance-none cursor-pointer accent-rose-500 mb-8"
                 />
    
                 <button 
                   onClick={() => setShowDetails(true)}
                   className="w-full bg-rose-500 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-rose-500/30 active:scale-95 transition-all flex items-center justify-center gap-2"
                 >
                    Check Status
                 </button>
             </div>

             {showDetails && (
                 <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 space-y-6">
                    <div className={`p-6 rounded-3xl ${status.color} flex items-center gap-4 shadow-md`}>
                        <div className={`w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0 backdrop-blur-sm`}>
                            <Thermometer size={32} />
                        </div>
                        <div>
                            <h2 className={`text-2xl font-black ${status.text}`}>{status.label}</h2>
                            <p className={`text-xs font-bold opacity-90 ${status.text}`}>{status.msg}</p>
                        </div>
                    </div>

                    {isEmergency ? (
                        <div className="p-6 bg-red-600 text-white rounded-3xl animate-pulse shadow-xl border-4 border-red-500 flex flex-col items-center text-center gap-4">
                            <Siren size={48} />
                            <div>
                                <h3 className="font-black text-2xl uppercase mb-2">RED ALERT</h3>
                                <p className="text-lg font-bold leading-relaxed">
                                    Emergency fever.<br/>Go to hospital immediately.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div>
                                <h3 className="text-lg font-black text-gray-900 dark:text-zinc-100 mb-4 px-2">Select Fever Type</h3>
                                <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4 px-2 pb-2">
                                    {feverTypes.map(t => (
                                        <button 
                                            key={t.id} 
                                            onClick={() => setActiveTab(t.id)}
                                            className={`px-5 py-3 rounded-2xl text-xs font-black whitespace-nowrap border transition-all ${activeTab === t.id ? 'bg-slate-800 text-white border-slate-800 shadow-lg' : 'bg-white dark:bg-zinc-800 text-gray-500 dark:text-zinc-400 border-gray-200 dark:border-zinc-700'}`}
                                        >
                                            {t.id}
                                        </button>
                                    ))}
                                </div>
            
                                <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-[2rem] p-6 shadow-sm mx-1">
                                    <div className="mb-6">
                                        <h4 className="font-black text-2xl text-gray-900 dark:text-zinc-100 mb-2">{currentData.id}</h4>
                                        <p className="text-sm font-medium text-gray-500 dark:text-zinc-400 bg-gray-50 dark:bg-zinc-800 p-3 rounded-xl">
                                            <span className="font-black uppercase text-xs block text-gray-400 mb-1">Symptoms</span>
                                            {currentData.symptoms}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 mb-4">
                                        <Pill className="text-blue-500" size={20} />
                                        <h4 className="font-black text-lg text-gray-800 dark:text-zinc-200">Suggested Medicines (Reference)</h4>
                                    </div>

                                    <div className="bg-red-50 dark:bg-red-900/10 p-3 rounded-xl border border-red-100 dark:border-red-900/20 mb-5 flex items-start gap-3">
                                        <AlertTriangle className="text-red-600 shrink-0 mt-0.5" size={18} />
                                        <div>
                                            <p className="text-xs font-black text-red-700 dark:text-red-300 uppercase">{currentData.warning}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {currentData.meds.map((med, idx) => (
                                            <div key={idx} className="bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-slate-100 dark:border-zinc-700">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h5 className="font-black text-slate-800 dark:text-slate-200 text-lg">{med.name}</h5>
                                                        <p className="text-[10px] font-black uppercase text-slate-400">{med.company} • {med.power}</p>
                                                    </div>
                                                    <span className="bg-white dark:bg-zinc-700 px-2 py-1 rounded-lg text-xs font-black text-slate-600 dark:text-slate-300 shadow-sm border border-slate-100 dark:border-zinc-600">{med.cost}</span>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                                                    <div>
                                                        <span className="text-[10px] font-black uppercase text-slate-400 block">Timing</span>
                                                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{med.time}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-[10px] font-black uppercase text-slate-400 block">Side Effect</span>
                                                        <span className="text-xs font-bold text-red-500">{med.side}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    <div className="grid grid-cols-1 gap-4 mt-4">
                        <div className="bg-emerald-50 dark:bg-emerald-900/10 p-5 rounded-3xl border border-emerald-100 dark:border-emerald-900/20">
                            <div className="flex items-center gap-2 mb-3 text-emerald-700 dark:text-emerald-400">
                                <Utensils size={20} />
                                <h3 className="font-black text-sm uppercase">Food: Eat</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {['Warm Water', 'Rice', 'Dal', 'Soup', 'Fruits'].map(i => (
                                    <span key={i} className="bg-white dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-800 dark:text-emerald-200 shadow-sm">{i}</span>
                                ))}
                            </div>
                        </div>
    
                        <div className="bg-red-50 dark:bg-red-900/10 p-5 rounded-3xl border border-red-100 dark:border-red-900/20">
                            <div className="flex items-center gap-2 mb-3 text-red-700 dark:text-red-400">
                                <Ban size={20} />
                                <h3 className="font-black text-sm uppercase">Food: Avoid</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {['Cold Drinks', 'Ice Cream', 'Fried Food', 'Alcohol'].map(i => (
                                    <span key={i} className="bg-white dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-xs font-bold text-red-800 dark:text-red-200 shadow-sm">{i}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="p-6 text-center opacity-60">
                       <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold leading-relaxed max-w-xs mx-auto">
                          This app provides general information only and does not replace professional medical advice.
                       </p>
                    </div>
    
                 </div>
             )}
         </div>
      </div>
  );
};

const ChildFeverDetailView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [temperature, setTemperature] = useState<number>(100.8);
  const [ageGroup, setAgeGroup] = useState('1-3 years');
  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState('Viral Fever');

  const ageGroups = ['Below 1 year', '1–3 years', '3–5 years', '5–12 years'];

  const getStatus = (t: number) => {
    if (t > 104) return { label: 'VERY HIGH / DANGER ⚠️', color: 'bg-red-600', text: 'text-white', msg: 'EMERGENCY FEVER. GO TO HOSPITAL IMMEDIATELY.', isEmergency: true };
    if (t >= 102) return { label: 'HIGH FEVER', color: 'bg-orange-600', text: 'text-white', msg: 'HIGH TEMPERATURE. NEEDS ATTENTION.', isEmergency: false };
    if (t >= 100.5) return { label: 'FEVER', color: 'bg-orange-500', text: 'text-white', msg: 'CHILD HAS FEVER. MONITOR CLOSELY.', isEmergency: false };
    if (t >= 99) return { label: 'MILD FEVER', color: 'bg-yellow-400', text: 'text-yellow-900', msg: 'SLIGHTLY WARM. KEEP CHILD COMFORTABLE.', isEmergency: false };
    return { label: 'NORMAL', color: 'bg-emerald-500', text: 'text-white', msg: 'BODY TEMPERATURE IS NORMAL.', isEmergency: false };
  };

  const status = getStatus(temperature);

  const feverTypes = [
    {
      id: 'Viral Fever',
      warning: 'Doctor advice required. Do not self-medicate.',
      meds: [
        { name: 'Paracetamol Syrup', company: 'Calpol', power: '120 mg / 5 ml', time: 'Every 6 hours, After food', cost: '₹30–50', side: 'Liver risk if overdose' },
        { name: 'Paracetamol Syrup', company: 'Crocin', power: '250 mg / 5 ml', time: 'Every 6–8 hours', cost: '₹40–60', side: 'Nausea' },
        { name: 'Paracetamol Syrup', company: 'Dolo', power: '250 mg / 5 ml', time: 'After food', cost: '₹40–60', side: 'Sleepiness' },
        { name: 'Meftal-P Syrup', company: 'Blue Cross', power: 'As prescribed', time: 'After food', cost: '₹50–70', side: 'Stomach upset' },
        { name: 'Calpol Drops', company: 'GSK', power: 'Infant drops', time: 'As advised', cost: '₹25–40', side: 'Overdose risk' }
      ]
    },
    {
      id: 'Bacterial Fever',
      warning: 'Doctor prescription required.',
      meds: [
        { name: 'Paracetamol Syrup', company: 'Calpol', power: 'After food', time: 'After food', cost: '₹40', side: 'Nausea' },
        { name: 'Paracetamol Syrup', company: 'Crocin', power: 'After food', time: 'After food', cost: '₹50', side: 'Dizziness' },
        { name: 'Amoxicillin Syrup', company: 'Novamox', power: 'As prescribed', time: 'As prescribed', cost: '₹80', side: 'Allergy' },
        { name: 'Cefixime Syrup', company: 'Zifi', power: 'As prescribed', time: 'As prescribed', cost: '₹150', side: 'Loose stools' },
        { name: 'Azithromycin Syrup', company: 'Azee', power: 'Once daily', time: 'Once daily', cost: '₹120', side: 'Stomach pain' }
      ]
    },
    {
      id: 'Post-Vaccination Fever',
      warning: 'Doctor advice required. Do not self-medicate.',
      meds: [
        { name: 'Paracetamol Syrup', company: 'Calpol', power: '120 mg', time: 'After food', cost: '₹40', side: 'Nausea' },
        { name: 'Paracetamol Syrup', company: 'Crocin', power: '250 mg', time: 'After food', cost: '₹50', side: 'Dizziness' },
        { name: 'Calpol Drops', company: 'GSK', power: 'Infant', time: 'As advised', cost: '₹30', side: 'Sleepiness' },
        { name: 'Pacimol Drops', company: 'Ipca', power: 'Infant', time: 'As advised', cost: '₹25', side: 'Weakness' },
        { name: 'Metacin Syrup', company: 'Themis', power: '125 mg', time: 'After food', cost: '₹30', side: 'Nausea' }
      ]
    },
    {
      id: 'Seasonal Fever',
      warning: 'Doctor advice required. Do not self-medicate.',
      meds: [
        { name: 'Paracetamol Syrup', company: 'Calpol', power: '120 mg', time: 'Every 6 hrs', cost: '₹40', side: 'Liver risk' },
        { name: 'Cetirizine Syrup', company: 'Cetzine', power: '2.5 mg / 5ml', time: 'Night', cost: '₹40', side: 'Sleepiness' },
        { name: 'Levocetirizine', company: 'Levoz', power: '2.5 mg / 5ml', time: 'Night', cost: '₹50', side: 'Drowsiness' },
        { name: 'Phenylephrine', company: 'Cofsils', power: '10 mg', time: 'Every 8 hrs', cost: '₹40', side: 'BP rise' },
        { name: 'Montelukast', company: 'Montek', power: '4 mg', time: 'Night', cost: '₹80', side: 'Mood change' }
      ]
    }
  ];

  const currentData = feverTypes.find(t => t.id === activeTab) || feverTypes[0];

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="p-6 bg-white dark:bg-zinc-900 border-b dark:border-zinc-800 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center active:scale-90 transition-all">
            <ArrowLeft size={20} className="text-gray-800 dark:text-zinc-100" />
          </button>
          <div className="flex items-center gap-2">
            <Baby className="text-pink-500" size={24} />
            <h1 className="text-xl font-black text-gray-900 dark:text-zinc-100">Child Fever</h1>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-32">
        <div className="space-y-3">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest text-center">Select Child's Age</h3>
            <div className="flex flex-wrap justify-center gap-2">
                {ageGroups.map(age => (
                    <button 
                        key={age}
                        onClick={() => { setAgeGroup(age); setShowDetails(false); }}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${ageGroup === age ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30' : 'bg-white dark:bg-zinc-800 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-zinc-800'}`}
                    >
                        {age}
                    </button>
                ))}
            </div>
        </div>

        <div className="flex flex-col items-center justify-center pt-4">
             <div className="relative mb-2">
                 <span className="text-7xl font-black text-gray-900 dark:text-zinc-100 tracking-tighter">
                     {temperature.toFixed(1)}
                     <span className="text-3xl text-gray-400 ml-1">°F</span>
                 </span>
             </div>
             
             <p className="text-xs font-black uppercase text-gray-400 mb-6 tracking-widest">Select Temperature</p>

             <input 
                type="range" 
                min="95" 
                max="107.6" 
                step="0.1" 
                value={temperature} 
                onChange={(e) => { setTemperature(parseFloat(e.target.value)); setShowDetails(false); }}
                className="w-full h-4 bg-gray-200 rounded-xl appearance-none cursor-pointer accent-pink-500 mb-8"
             />

             <button 
               onClick={() => setShowDetails(true)}
               className="w-full bg-pink-500 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-pink-500/30 active:scale-95 transition-all flex items-center justify-center gap-2"
             >
                Check Fever Status
             </button>
         </div>

         {showDetails && (
             <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 space-y-6">
                <div className={`p-6 rounded-3xl ${status.color} flex items-center gap-4 shadow-md`}>
                    <div className={`w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0 backdrop-blur-sm`}>
                        <Thermometer size={32} />
                    </div>
                    <div>
                        <h2 className={`text-2xl font-black ${status.text}`}>{status.label}</h2>
                        <p className={`text-xs font-bold opacity-90 ${status.text} mt-1`}>{status.msg}</p>
                    </div>
                </div>

                {status.isEmergency ? (
                    <div className="p-6 bg-red-600 text-white rounded-3xl animate-pulse shadow-xl border-4 border-red-500 flex flex-col items-center text-center gap-4">
                        <Siren size={48} />
                        <div>
                            <h3 className="font-black text-2xl uppercase mb-2">RED ALERT</h3>
                            <p className="text-lg font-bold leading-relaxed">
                                EMERGENCY FEVER IN CHILD.<br/>GO TO HOSPITAL IMMEDIATELY.
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        <div>
                            <h3 className="text-lg font-black text-gray-900 dark:text-zinc-100 mb-4 px-2">Fever Type</h3>
                            <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4 px-2 pb-2">
                                {feverTypes.map(t => (
                                    <button 
                                        key={t.id} 
                                        onClick={() => setActiveTab(t.id)}
                                        className={`px-5 py-3 rounded-2xl text-xs font-black whitespace-nowrap border transition-all ${activeTab === t.id ? 'bg-slate-800 text-white border-slate-800 shadow-lg' : 'bg-white dark:bg-zinc-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-zinc-700'}`}
                                    >
                                        {t.id}
                                    </button>
                                ))}
                            </div>

                            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-[2rem] p-6 shadow-sm mx-1">
                                <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-100 dark:border-red-900/20 mb-6 flex items-start gap-3">
                                    <AlertTriangle className="text-red-600 shrink-0 mt-0.5" size={18} />
                                    <div>
                                        <p className="text-xs font-black text-red-700 dark:text-red-300 uppercase leading-relaxed">{currentData.warning}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mb-4">
                                    <Pill className="text-blue-500" size={20} />
                                    <h4 className="font-black text-lg text-gray-800 dark:text-zinc-200">Reference Medicines</h4>
                                </div>

                                <div className="space-y-3">
                                    {currentData.meds.map((med, idx) => (
                                        <div key={idx} className="bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-slate-100 dark:border-zinc-700">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h5 className="font-black text-slate-800 dark:text-slate-200 text-lg">{med.name}</h5>
                                                    <p className="text-[10px] font-black uppercase text-slate-400">{med.company} • {med.power}</p>
                                                </div>
                                                <span className="bg-white dark:bg-zinc-700 px-2 py-1 rounded-lg text-xs font-black text-slate-600 dark:text-slate-300 shadow-sm border border-slate-100 dark:border-zinc-600">{med.cost}</span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                                                <div>
                                                    <span className="text-[10px] font-black uppercase text-slate-400 block">Timing</span>
                                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{med.time}</span>
                                                </div>
                                                <div>
                                                    <span className="text-[10px] font-black uppercase text-slate-400 block">Side Effect</span>
                                                    <span className="text-xs font-bold text-red-500">{med.side}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 mt-2">
                            <div className="bg-emerald-50 dark:bg-emerald-900/10 p-5 rounded-3xl border border-emerald-100 dark:border-emerald-900/20">
                                <div className="flex items-center gap-2 mb-3 text-emerald-700 dark:text-emerald-400">
                                    <Utensils size={20} />
                                    <h3 className="font-black text-sm uppercase">Give</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {['Warm Water', 'Breast Milk / Milk', 'Light Food', 'Rest', 'Love & Care'].map(i => (
                                        <span key={i} className="bg-white dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-800 dark:text-emerald-200 shadow-sm">{i}</span>
                                    ))}
                                </div>
                            </div>
        
                            <div className="bg-red-50 dark:bg-red-900/10 p-5 rounded-3xl border border-red-100 dark:border-red-900/20">
                                <div className="flex items-center gap-2 mb-3 text-red-700 dark:text-red-400">
                                    <Ban size={20} />
                                    <h3 className="font-black text-sm uppercase">Avoid</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {['Cold Drinks', 'Ice Cream', 'Outside Food', 'Over-wrapping'].map(i => (
                                        <span key={i} className="bg-white dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-xs font-bold text-red-800 dark:text-red-200 shadow-sm">{i}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}

                <div className="p-6 text-center opacity-60">
                   <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold leading-relaxed max-w-xs mx-auto">
                     This app provides general information only and does not replace professional medical advice.
                   </p>
                </div>
             </div>
         )}
      </div>
    </div>
  );
};

const PainDetailView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('Muscle Pain');
  const [isEmergency, setIsEmergency] = useState(false);
  
  const categories = ['Headache', 'Neck Pain', 'Back Pain', 'Muscle Pain', 'Joint Pain', 'Leg Pain'];
  
  const medicineData = [
    { 
      name: 'Paracetamol', 
      power: '500 mg', 
      company: 'Crocin', 
      use: 'Mild pain, headache, fever', 
      timing: 'After food', 
      cost: '₹10–30', 
      warn: 'Do not exceed daily limit', 
      side: 'Liver damage if overdose', 
      foodEat: 'Normal food', 
      foodAvoid: 'Alcohol' 
    },
    { 
      name: 'Ibuprofen', 
      power: '400 mg', 
      company: 'Brufen', 
      use: 'Muscle pain, swelling', 
      timing: 'After food', 
      cost: '₹15–40', 
      warn: 'Avoid in kidney problem', 
      side: 'Stomach irritation', 
      foodEat: 'With meals', 
      foodAvoid: 'Empty stomach' 
    },
    { 
      name: 'Aceclofenac', 
      power: '100 mg', 
      company: 'Hetero', 
      use: 'Joint pain, back pain', 
      timing: 'After meals', 
      cost: '₹40–90', 
      warn: 'Not for ulcer patients', 
      side: 'Acidity, stomach pain', 
      foodEat: 'Full meals', 
      foodAvoid: 'Alcohol' 
    },
    { 
      name: 'Diclofenac', 
      power: '50 mg', 
      company: 'Voveran', 
      use: 'Strong pain, inflammation', 
      timing: 'Doctor advice', 
      cost: '₹20–60', 
      warn: 'Long-term use risky', 
      side: 'Nausea, acidity', 
      foodEat: 'After food', 
      foodAvoid: 'Alcohol' 
    },
    { 
      name: 'Myospaz', 
      power: 'Combination', 
      company: 'Win-Medicare', 
      use: 'Muscle spasm', 
      timing: 'After food', 
      cost: '₹80–150', 
      warn: 'May cause sleep', 
      side: 'Drowsiness, dry mouth', 
      foodEat: 'Regular food', 
      foodAvoid: 'Driving, alcohol' 
    }
  ];

  const emergencySigns = [
    'Pain after accident',
    'Cannot move',
    'Severe swelling',
    'Chest pain',
    'Numbness'
  ];

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950 transition-colors duration-300 animate-in fade-in duration-500">
      {/* Header */}
      <div className="p-6 bg-white dark:bg-zinc-900 border-b dark:border-zinc-800 sticky top-0 z-40 flex items-center gap-4 shadow-sm">
        <button onClick={onBack} className="w-12 h-12 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center active:scale-90 transition-all border border-gray-100 dark:border-zinc-700 shrink-0">
          <ArrowLeft size={24} className="dark:text-white text-gray-900" />
        </button>
        <div className="flex items-center gap-3">
           <div className="p-2.5 bg-blue-50 dark:bg-blue-900/30 rounded-2xl">
              <Armchair className="text-blue-500" size={28} />
           </div>
           <div>
              <h1 className="text-2xl font-black text-gray-900 dark:text-white leading-tight">BODY PAIN RELIEF</h1>
              <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">Orthopedic Guide</p>
           </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-40 no-scrollbar">
        {/* selector */}
        <div>
           <h3 className="text-[11px] font-black uppercase text-gray-400 tracking-widest mb-4 px-2">Choose Pain Area</h3>
           <div className="flex flex-wrap gap-3">
              {categories.map(cat => (
                 <button 
                   key={cat} 
                   onClick={() => { setActiveTab(cat); setIsEmergency(false); }}
                   className={`px-5 py-3 rounded-2xl text-xs font-black transition-all border-2 text-left ${
                     activeTab === cat && !isEmergency
                     ? 'bg-blue-500 border-blue-500 text-white shadow-xl shadow-blue-500/30' 
                     : 'bg-white dark:bg-zinc-800 text-gray-500 dark:text-gray-400 border-gray-100 dark:border-zinc-800 hover:border-blue-300'
                   }`}
                 >
                    {cat}
                 </button>
              ))}
              <button 
                onClick={() => setIsEmergency(true)}
                className={`px-5 py-3 rounded-2xl text-xs font-black transition-all border-2 text-left flex items-center gap-2 ${
                  isEmergency 
                  ? 'bg-red-600 border-red-600 text-white shadow-xl shadow-red-500/30' 
                  : 'bg-white dark:bg-zinc-800 text-red-500 border-red-100 dark:border-red-900/20 hover:border-red-400'
                }`}
              >
                 <AlertCircle size={14} /> Serious Signs
              </button>
           </div>
        </div>

        {isEmergency ? (
           <div className="space-y-6 animate-in zoom-in-95 duration-300">
              <div className="p-8 bg-red-600 text-white rounded-[2.5rem] shadow-2xl border-[6px] border-red-500/50 flex flex-col items-center text-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                     <Siren size={60} className="animate-pulse" />
                  </div>
                  <div>
                     <h3 className="font-black text-3xl uppercase tracking-tighter mb-4 leading-tight">Emergency!</h3>
                     <p className="text-xl font-bold leading-relaxed opacity-95 mb-6">
                        If you have:<br/>
                        {emergencySigns.map(sign => <span key={sign} className="block">• {sign}</span>)}
                     </p>
                     <div className="h-px bg-white/30 mb-6"></div>
                     <p className="text-2xl font-black uppercase tracking-tight">
                        Go to hospital immediately.
                     </p>
                  </div>
              </div>
           </div>
        ) : (
          <>
            <div className="space-y-6">
               <div className="flex items-center justify-between px-2">
                  <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Medicine for {activeTab}</h3>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 dark:bg-zinc-800 rounded-full">
                    <Lock size={14} className="text-gray-400" />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Reference Only</span>
                  </div>
               </div>

               <div className="bg-amber-50 dark:bg-amber-900/10 p-5 rounded-[2rem] border-2 border-amber-100/50 dark:border-amber-900/20 flex items-start gap-4 shadow-sm">
                  <div className="w-12 h-12 bg-amber-100 dark:bg-amber-800/30 rounded-2xl flex items-center justify-center shrink-0">
                    <AlertCircle className="text-amber-600" size={24} />
                  </div>
                  <div>
                     <p className="text-sm font-black text-amber-700 dark:text-amber-300 uppercase leading-snug">Doctor advice required. Do not self-medicate.</p>
                  </div>
               </div>

               <div className="space-y-6">
                  {medicineData.map((med, idx) => (
                     <div key={idx} className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-[3rem] p-7 shadow-xl hover:shadow-2xl transition-all duration-300 group border-b-8 border-b-blue-500/10">
                        <div className="flex justify-between items-start mb-6">
                           <div className="flex-1 pr-4">
                              <h4 className="text-2xl font-black text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform origin-left leading-tight">{med.name}</h4>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-xl text-[11px] font-black text-blue-600 dark:text-blue-400 uppercase border border-blue-100 dark:border-blue-800">{med.power}</span>
                                <span className="text-gray-200">|</span>
                                <span className="text-[11px] font-black text-gray-400 uppercase tracking-wide truncate">{med.company}</span>
                              </div>
                           </div>
                           <div className="p-4 bg-gray-50 dark:bg-zinc-800 rounded-3xl group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors shrink-0">
                              <Zap size={28} className="text-blue-500" />
                           </div>
                        </div>
                        
                        <div className="space-y-6">
                           <div className="grid grid-cols-2 gap-4">
                              <div className="bg-slate-50 dark:bg-zinc-800/50 p-5 rounded-[2rem] border border-slate-100 dark:border-zinc-700">
                                 <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">Use</p>
                                 <p className="text-sm font-bold text-gray-800 dark:text-zinc-200 leading-tight">{med.use}</p>
                              </div>
                              <div className="bg-slate-50 dark:bg-zinc-800/50 p-5 rounded-[2rem] border border-slate-100 dark:border-zinc-700">
                                 <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">Timing</p>
                                 <p className="text-sm font-bold text-gray-800 dark:text-zinc-200 leading-tight">{med.timing}</p>
                              </div>
                           </div>

                           <div className="bg-rose-50 dark:bg-rose-900/10 p-6 rounded-[2.2rem] border-2 border-rose-100/50 dark:border-rose-900/20">
                              <p className="text-[11px] font-black uppercase text-rose-500 tracking-widest mb-2 flex items-center gap-2">
                                 <AlertTriangle size={14} /> Warning
                              </p>
                              <p className="text-[14px] font-black text-rose-700 dark:text-rose-300 leading-tight uppercase tracking-tight">{med.warn}</p>
                           </div>

                           <div className="px-1 flex justify-between gap-4">
                              <div>
                                 <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2 flex items-center gap-2">
                                    <Activity size={14} /> Side Effects
                                 </p>
                                 <p className="text-[13px] font-bold text-gray-600 dark:text-zinc-400 leading-relaxed">{med.side}</p>
                              </div>
                              <div className="text-right">
                                 <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2 flex items-center gap-2 justify-end">
                                    <Tag size={14} /> Approx Cost
                                 </p>
                                 <p className="text-[16px] font-black text-gray-800 dark:text-white leading-relaxed">{med.cost}</p>
                              </div>
                           </div>

                           <div className="grid grid-cols-2 gap-4">
                              <div className="bg-emerald-50 dark:bg-emerald-900/10 p-5 rounded-[2rem] border border-emerald-100/50 dark:border-emerald-900/20">
                                 <div className="flex items-center gap-2 mb-2 text-emerald-600">
                                    <Utensils size={14} />
                                    <p className="text-[10px] font-black uppercase tracking-widest">Food: Eat</p>
                                 </div>
                                 <p className="text-sm font-black text-emerald-800 dark:text-emerald-300">{med.foodEat}</p>
                              </div>
                              <div className="bg-rose-50 dark:bg-rose-900/10 p-5 rounded-[2rem] border border-rose-100/50 dark:border-rose-900/20">
                                 <div className="flex items-center gap-2 mb-2 text-rose-600">
                                    <Ban size={14} />
                                    <p className="text-[10px] font-black uppercase tracking-widest">Avoid</p>
                                 </div>
                                 <p className="text-sm font-black text-rose-800 dark:text-rose-300">{med.foodAvoid}</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
               
               <div className="p-8 text-center bg-gray-50 dark:bg-zinc-900 rounded-[3rem] border-2 border-dashed border-gray-200 dark:border-zinc-800">
                   <p className="text-[10px] text-gray-500 font-bold leading-relaxed max-w-[280px] mx-auto uppercase tracking-wide opacity-80">
                      Doctor advice required. Do not self-medicate. This information is for general reference only.
                   </p>
                </div>
            </div>
          </>
        )}

        {/* Disclaimer Footer */}
        <div className="bg-blue-600 p-8 rounded-[3rem] text-white flex flex-col items-center text-center gap-4 shadow-xl shadow-blue-600/20">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Info size={24} />
            </div>
            <h5 className="text-lg font-black uppercase tracking-tight">Medical Disclaimer</h5>
            <p className="text-xs font-bold leading-relaxed opacity-90">
                This app provides general information only. It does not replace professional doctor consultation.
            </p>
        </div>
      </div>
    </div>
  );
};

const BPDetailView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [systolic, setSystolic] = useState<number>(120);
  const [diastolic, setDiastolic] = useState<number>(80);
  const [showDetails, setShowDetails] = useState(false);

  const getStatus = (sys: number, dia: number) => {
    if (sys > 180 || dia > 120) return { label: 'HYPERTENSIVE CRISIS', color: 'bg-red-700', text: 'text-white', msg: 'Emergency care needed immediately.', isEmergency: true };
    if (sys >= 140 || dia >= 90) return { label: 'HIGH BLOOD PRESSURE (STAGE 2)', color: 'bg-red-600', text: 'text-white', msg: 'Consult doctor immediately.', isEmergency: false };
    if (sys >= 130 || dia >= 80) return { label: 'HIGH BLOOD PRESSURE (STAGE 1)', color: 'bg-orange-600', text: 'text-white', msg: 'Lifestyle changes & medication needed.', isEmergency: false };
    if (sys >= 120 && dia < 80) return { label: 'ELEVATED', color: 'bg-yellow-400', text: 'text-yellow-900', msg: 'Developing risk. Control diet.', isEmergency: false };
    if (sys < 90 || dia < 60) return { label: 'LOW BLOOD PRESSURE', color: 'bg-blue-400', text: 'text-white', msg: 'Dizziness risk. Hydrate & salt intake.', isEmergency: false };
    return { label: 'NORMAL', color: 'bg-emerald-500', text: 'text-white', msg: 'BP is healthy.', isEmergency: false };
  };

  const status = getStatus(systolic, diastolic);

  const medicines = [
    { name: 'Amlodipine', company: 'Amlong', power: '5 mg', time: 'Morning', cost: '₹30', side: 'Swelling' },
    { name: 'Telmisartan', company: 'Telma', power: '40 mg', time: 'Morning', cost: '₹50', side: 'Dizziness' },
    { name: 'Losartan', company: 'Losar', power: '50 mg', time: 'Night', cost: '₹40', side: 'Back pain' },
    { name: 'Enalapril', company: 'Enam', power: '5 mg', time: 'Night', cost: '₹20', side: 'Cough' },
    { name: 'Metoprolol', company: 'Metxl', power: '25 mg', time: 'Morning', cost: '₹60', side: 'Fatigue' }
  ];

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-900 transition-colors duration-300">
       <div className="p-6 bg-white dark:bg-zinc-900 border-b dark:border-zinc-800 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-4 mb-2">
          <button onClick={onBack} className="w-10 h-10 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center active:scale-90 transition-all">
             <ArrowLeft size={20} className="text-gray-800 dark:text-zinc-100" />
          </button>
          <div className="flex items-center gap-2">
             <Activity className="text-rose-600" size={24} />
             <h1 className="text-xl font-black text-gray-900 dark:text-zinc-100">Check Blood Pressure</h1>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-32 p-6">
           <div className="flex flex-col items-center justify-center mb-8">
               <div className="relative mb-2 flex items-baseline gap-1">
                   <span className="text-6xl font-black text-gray-900 dark:text-zinc-100 tracking-tighter">{systolic}</span>
                   <span className="text-4xl font-black text-gray-400">/</span>
                   <span className="text-6xl font-black text-gray-900 dark:text-zinc-100 tracking-tighter">{diastolic}</span>
                   <span className="text-xl text-gray-400 ml-1 font-bold">mmHg</span>
               </div>
               <p className="text-xs font-black uppercase text-gray-400 mb-6 tracking-widest">Adjust Systolic / Diastolic</p>
               <div className="w-full space-y-6 mb-6">
                   <div>
                       <div className="flex justify-between text-xs font-bold text-gray-500 mb-2">
                           <span>Systolic (Upper)</span>
                           <span>{systolic}</span>
                       </div>
                       <input 
                          type="range" min="70" max="250" value={systolic} 
                          onChange={(e) => { setSystolic(parseInt(e.target.value)); setShowDetails(false); }}
                          className="w-full h-4 bg-gray-200 rounded-xl appearance-none cursor-pointer accent-rose-600"
                       />
                   </div>
                   <div>
                       <div className="flex justify-between text-xs font-bold text-gray-500 mb-2">
                           <span>Diastolic (Lower)</span>
                           <span>{diastolic}</span>
                       </div>
                       <input 
                          type="range" min="40" max="150" value={diastolic} 
                          onChange={(e) => { setDiastolic(parseInt(e.target.value)); setShowDetails(false); }}
                          className="w-full h-4 bg-gray-200 rounded-xl appearance-none cursor-pointer accent-blue-600"
                       />
                   </div>
               </div>
               <button 
                 onClick={() => setShowDetails(true)}
                 className="w-full bg-rose-600 text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-rose-600/30 active:scale-95 transition-all flex items-center justify-center gap-2"
                 >
                  Check BP Details
               </button>
           </div>

           {showDetails && (
             <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 space-y-6">
                <div className={`p-5 rounded-2xl ${status.color} flex items-center gap-4 shadow-sm`}>
                    <div className={`w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0`}>
                        <Activity size={32} />
                    </div>
                    <div>
                        <h2 className={`text-2xl font-black ${status.text}`}>{status.label}</h2>
                        <p className={`text-xs font-bold opacity-90 ${status.text}`}>{status.msg}</p>
                    </div>
                </div>

                {status.isEmergency && (
                   <div className="p-5 bg-red-600 text-white rounded-2xl animate-pulse shadow-xl border-4 border-red-500 flex items-start gap-4">
                      <ShieldAlert size={36} className="shrink-0 mt-1" />
                      <div>
                         <h3 className="font-black text-base uppercase mb-2">Emergency Condition</h3>
                         <p className="text-sm font-bold leading-relaxed opacity-95">
                            Hypertensive Crisis. Seek medical help immediately. Stroke risk high.
                         </p>
                      </div>
                   </div>
                )}

                <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
                       <div className="flex items-center justify-between mb-4">
                           <div className="flex items-center gap-2 text-rose-600">
                               <Pill size={22} className="fill-current" />
                               <h3 className="font-black text-lg text-gray-900 dark:text-zinc-100">Reference Medicines</h3>
                           </div>
                           <Lock size={16} className="text-gray-400" />
                       </div>

                       <div className="bg-red-50 dark:bg-red-900/10 p-3 rounded-xl border border-red-100 dark:border-red-900/20 p-3 rounded-xl flex items-center gap-2 mb-5">
                            <AlertTriangle size={16} className="text-red-600 shrink-0" />
                            <p className="text-[10px] font-black text-red-700 dark:text-red-300 uppercase">Doctor advice required. Do not self-medicate.</p>
                       </div>
    
                       <div className="space-y-3">
                            {medicines.map((med, idx) => (
                                <div key={idx} className="bg-gray-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-gray-200 dark:border-zinc-700">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-zinc-100">{med.name}</h4>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase">{med.company}</p>
                                        </div>
                                        <span className="bg-white dark:bg-zinc-700 px-2 py-1 rounded text-xs font-black text-gray-700 dark:text-gray-300 shadow-sm">{med.power}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-y-1 text-[10px] text-gray-500 font-bold">
                                        <span>Timing: {med.time}</span>
                                        <span>Cost: {med.cost}</span>
                                        <span className="col-span-2 text-red-500">Side Effect: {med.side}</span>
                                    </div>
                                </div>
                            ))}
                       </div>
                </div>
    
                <div className="grid grid-cols-1 gap-4">
                    <div className="bg-emerald-50 dark:bg-emerald-900/10 p-5 rounded-3xl border border-emerald-100 dark:border-emerald-900/20">
                        <div className="flex items-center gap-2 mb-3 text-emerald-700 dark:text-emerald-400">
                            <Utensils size={18} />
                            <h3 className="font-black text-sm uppercase">Food to Eat</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {['Leafy Greens', 'Berries', 'Oats', 'Bananas'].map(i => (
                                <span key={i} className="bg-white dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-800 dark:text-emerald-200 shadow-sm">{i}</span>
                            ))}
                        </div>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/10 p-5 rounded-3xl border border-red-100 dark:border-red-900/20">
                        <div className="flex items-center gap-2 mb-3 text-red-700 dark:text-red-400">
                            <Ban size={18} />
                            <h3 className="font-black text-sm uppercase">Food to Avoid</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {['Salt', 'Pickles', 'Processed Food', 'Alcohol', 'Caffeine'].map(i => (
                                <span key={i} className="bg-white dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-xs font-bold text-red-800 dark:text-red-200 shadow-sm">{i}</span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="p-6 text-center">
                   <p className="text-[10px] text-gray-400 font-medium leading-relaxed max-w-xs mx-auto">
                      {HEALTH_DISCLAIMER}
                   </p>
                </div>
             </div>
           )}
      </div>
    </div>
  );
};

const TermsAndPoliciesView: React.FC<{ onBack: () => void, globalLanguage: Language }> = ({ onBack, globalLanguage }) => {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950 transition-colors duration-300">
      <div className="p-4 border-b dark:border-zinc-800 flex items-center gap-4 bg-white dark:bg-zinc-900 sticky top-0 z-30 shadow-sm">
        <button onClick={onBack} className="w-10 h-10 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center active:scale-90 transition-all">
          <ArrowLeft size={20} className="dark:text-white" />
        </button>
        <h1 className="text-xl font-black dark:text-white uppercase tracking-tight">Terms & Policies</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-blue-600">
              <ShieldCheck size={20} />
            </div>
            <h2 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-widest">Privacy Policy</h2>
          </div>
          <div className="bg-gray-50 dark:bg-zinc-900 rounded-3xl p-6 border border-gray-100 dark:border-zinc-800">
            <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed whitespace-pre-wrap font-medium">
              {TERMS_AND_POLICIES.privacyPolicy}
            </p>
          </div>
        </section>

        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/20 rounded-full flex items-center justify-center text-purple-600">
              <FileText size={20} />
            </div>
            <h2 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-widest">Terms of Service</h2>
          </div>
          <div className="bg-gray-50 dark:bg-zinc-900 rounded-3xl p-6 border border-gray-100 dark:border-zinc-800">
            <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed whitespace-pre-wrap font-medium">
              {TERMS_AND_POLICIES.termsOfService}
            </p>
          </div>
        </section>

        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center text-emerald-600">
              <ShieldAlert size={20} />
            </div>
            <h2 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-widest">Compliance</h2>
          </div>
          <div className="bg-gray-50 dark:bg-zinc-900 rounded-3xl p-6 border border-gray-100 dark:border-zinc-800">
            <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed whitespace-pre-wrap font-medium">
              {TERMS_AND_POLICIES.compliance}
            </p>
          </div>
        </section>

        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/20 rounded-full flex items-center justify-center text-orange-600">
              <Mail size={20} />
            </div>
            <h2 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-widest">Support</h2>
          </div>
          <div className="bg-gray-50 dark:bg-zinc-900 rounded-3xl p-6 border border-gray-100 dark:border-zinc-800">
            <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed whitespace-pre-wrap font-medium">
              {TERMS_AND_POLICIES.contactSupport}
            </p>
          </div>
        </section>

        <div className="p-6 bg-amber-50 dark:bg-amber-900/10 rounded-3xl border border-amber-100 dark:border-amber-900/20">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="text-amber-600" size={20} />
            <h3 className="text-sm font-black text-amber-900 dark:text-amber-100 uppercase tracking-widest">Medical Disclaimer</h3>
          </div>
          <p className="text-xs font-bold text-amber-800 dark:text-amber-200 leading-relaxed uppercase tracking-wider">
            {HEALTH_DISCLAIMER}
          </p>
        </div>
        
        <div className="text-center pb-8">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Vaidya Healthcare Platform v1.0.0</p>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [globalLanguage, setGlobalLanguage] = useState<Language>(Language.ENGLISH);
  
  // User Profile State
  const [userName, setUserName] = useState('Habibba');
  const [userImage, setUserImage] = useState('https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop');
  
  // Daily Usage State
  const [dailyUsage, setDailyUsage] = useState<{ count: number, date: string }>(() => {
    const saved = localStorage.getItem('vaidya_daily_usage');
    const today = new Date().toDateString();
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.date === today) return parsed;
      } catch (e) { console.error("Error parsing daily usage", e); }
    }
    return { count: 0, date: today };
  });

  const DAILY_LIMIT = 5;

  useEffect(() => {
    localStorage.setItem('vaidya_daily_usage', JSON.stringify(dailyUsage));
  }, [dailyUsage]);

  const incrementUsage = useCallback(() => {
    setDailyUsage(prev => ({ ...prev, count: prev.count + 1 }));
  }, []);

  const refillUsage = () => {
    // Simulate watching an ad
    alert("Simulating Ad Playback... Please wait 3 seconds.");
    setTimeout(() => {
      setDailyUsage(prev => ({ ...prev, count: Math.max(0, prev.count - 3) }));
      alert("Ad watched! You got 3 more free requests.");
    }, 3000);
  };

  useEffect(() => {
    seedInitialData();
    setMedicines(getMedicines());
    
    // Splash screen timer
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    const auth = localStorage.getItem('vaidya_auth');
    if (auth) {
      setIsLoggedIn(true);
      setActiveView('home');
    }

    const savedName = localStorage.getItem('vaidya_user_name');
    const savedImage = localStorage.getItem('vaidya_user_image');
    const savedLang = localStorage.getItem('vaidya_language') as Language;
    
    if (savedName) setUserName(savedName);
    if (savedImage) setUserImage(savedImage);
    if (savedLang) setGlobalLanguage(savedLang);

    const savedTheme = localStorage.getItem('vaidya_theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    return () => clearTimeout(splashTimer);
  }, []);

  const handleUpdateUser = (name: string, image: string) => {
    setUserName(name);
    setUserImage(image);
    localStorage.setItem('vaidya_user_name', name);
    localStorage.setItem('vaidya_user_image', image);
  };

  const handleLanguageChange = (l: Language) => {
    setGlobalLanguage(l);
    localStorage.setItem('vaidya_language', l);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('vaidya_auth', 'true');
    setActiveView('home');
  };

  const handleSignup = (name: string, image: string | null) => {
    setUserName(name);
    localStorage.setItem('vaidya_user_name', name);
    if (image) {
      setUserImage(image);
      localStorage.setItem('vaidya_user_image', image);
    }
    setIsLoggedIn(true);
    localStorage.setItem('vaidya_auth', 'true');
    setActiveView('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('vaidya_auth');
    setActiveView('login');
  };

  const toggleDarkMode = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('vaidya_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('vaidya_theme', 'light');
    }
  };

  const renderView = () => {
    switch (activeView) {
      case 'login': return <LoginView onLogin={handleLogin} onNavigateToSignup={() => setActiveView('signup')} userName={userName} language={globalLanguage} />;
      case 'signup': return <SignupView onSignup={handleSignup} onBack={() => setActiveView('login')} language={globalLanguage} />;
      case 'home': return <HomeView 
          onNavigate={setActiveView} 
          onDoctorClick={(d) => { setSelectedDoctor(d); setActiveView('doctor_detail'); }} 
          doctors={DUMMY_DOCTORS} 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode} 
          globalLanguage={globalLanguage} 
          setGlobalLanguage={handleLanguageChange} 
          userName={userName}
          userImage={userImage}
          onUpdateUser={handleUpdateUser}
          onLogout={handleLogout}
          dailyUsage={dailyUsage}
          dailyLimit={DAILY_LIMIT}
          onRefill={refillUsage}
        />;
      case 'hospitals': return <NearbyView type="hospital" onBack={() => setActiveView('home')} globalLanguage={globalLanguage} />;
      case 'scanning': return <NearbyView type="scanning_center" onBack={() => setActiveView('home')} globalLanguage={globalLanguage} />;
      case 'chatbot': return <AdvancedChatbot 
          onBack={() => setActiveView('home')} 
          globalLanguage={globalLanguage} 
          setGlobalLanguage={handleLanguageChange} 
          dailyUsage={dailyUsage}
          dailyLimit={DAILY_LIMIT}
          incrementUsage={incrementUsage}
          onRefill={refillUsage}
      />;
      case 'prescription_scanner': return <PrescriptionScanner 
          onBack={() => setActiveView('home')} 
          globalLanguage={globalLanguage} 
          dailyUsage={dailyUsage}
          dailyLimit={DAILY_LIMIT}
          incrementUsage={incrementUsage}
      />;
      case 'medicines': return <MedicinesView medicines={medicines} onBack={() => setActiveView('home')} onMedicineClick={(m) => { setSelectedMedicine(m); setActiveView('medicine_detail'); }} globalLanguage={globalLanguage} />;
      case 'medicine_detail': return <MedicineDetailView 
          medicine={selectedMedicine} 
          onBack={() => setActiveView('medicines')} 
          globalLanguage={globalLanguage} 
          onUpdate={(updated) => {
            setSelectedMedicine(updated);
            setMedicines(prev => prev.map(m => m.id === updated.id ? updated : m));
          }}
      />;
      case 'doctors': return <CategorizedDoctorsView onBack={() => setActiveView('home')} onDoctorClick={(d) => { setSelectedDoctor(d); setActiveView('doctor_detail'); }} doctors={DUMMY_DOCTORS} globalLanguage={globalLanguage} />;
      case 'doctor_detail': return <DoctorDetailView doctor={selectedDoctor} onBack={() => setActiveView('home')} />;
      case 'emergency': return <EmergencyView onBack={() => setActiveView('home')} contacts={DUMMY_EMERGENCY_CONTACTS} globalLanguage={globalLanguage} />;
      case 'admin': return <AdminSystem medicines={medicines} doctors={DUMMY_DOCTORS} onUpdateMedicines={() => setMedicines(getMedicines())} onLogout={handleLogout} />;
      case 'notifications': return <NotificationsView onBack={() => setActiveView('home')} />;
      case 'diseases': return <DiseasesView onBack={() => setActiveView('home')} onNavigate={setActiveView} globalLanguage={globalLanguage} setGlobalLanguage={handleLanguageChange} />;
      case 'fever_detail': return <FeverDetailView onBack={() => setActiveView('diseases')} />;
      case 'bp_detail': return <BPDetailView onBack={() => setActiveView('diseases')} />;
      case 'child_fever_detail': return <ChildFeverDetailView onBack={() => setActiveView('diseases')} />;
      case 'pain_detail': return <PainDetailView onBack={() => setActiveView('diseases')} />;
      case 'sugar_detail': return <SugarDetailView onBack={() => setActiveView('diseases')} />;
      case 'mental_detail': return <MentalHealthDetailView onBack={() => setActiveView('diseases')} />;
      case 'stomach_detail': return <StomachCareDetailView onBack={() => setActiveView('diseases')} />;
      case 'general_health_detail': return <GeneralHealthDetailView 
          onBack={() => setActiveView('diseases')} 
          globalLanguage={globalLanguage} 
          setGlobalLanguage={handleLanguageChange} 
        />;
      case 'terms_policies': return <TermsAndPoliciesView onBack={() => setActiveView('home')} globalLanguage={globalLanguage} />;
      default: return <HomeView 
          onNavigate={setActiveView} 
          onDoctorClick={() => {}} 
          doctors={DUMMY_DOCTORS} 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode} 
          globalLanguage={globalLanguage} 
          setGlobalLanguage={handleLanguageChange} 
          userName={userName}
          userImage={userImage}
          onUpdateUser={handleUpdateUser}
          onLogout={handleLogout}
          dailyUsage={dailyUsage}
          dailyLimit={DAILY_LIMIT}
          onRefill={refillUsage}
        />;
    }
  };

  const t = TRANSLATIONS[globalLanguage];

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-zinc-950 font-sans w-full md:max-w-md md:mx-auto md:shadow-2xl overflow-hidden relative transition-colors duration-300 antialiased">
      {showSplash && <SplashScreen />}
      
      <main className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
        {!showSplash && renderView()}
      </main>

      {isLoggedIn && !showSplash && activeView !== 'login' && activeView !== 'signup' && (
        <nav className="bg-white dark:bg-zinc-900 flex justify-around items-center h-24 pb-safe shrink-0 border-t border-gray-100 dark:border-zinc-800 z-50 transition-colors duration-300 animate-in slide-in-from-bottom-full duration-500">
            <button onClick={() => setActiveView('home')} className="flex flex-col items-center group active:scale-95 transition-all">
            <HomeIcon size={26} className={`${activeView === 'home' ? 'text-blue-500' : 'text-gray-400 dark:text-zinc-500'} animate-subtle-blink`} />
            <span className={`text-xs font-bold mt-1 ${activeView === 'home' ? 'text-blue-500' : 'text-gray-400 dark:text-zinc-500'}`}>{t.home}</span>
          </button>

          <button onClick={() => setActiveView('doctors')} className="flex flex-col items-center group active:scale-95 transition-all">
            <User size={26} className={`${activeView === 'doctors' ? 'text-blue-500' : 'text-gray-400 dark:text-zinc-500'} animate-subtle-blink`} />
            <span className={`text-xs font-bold mt-1 ${activeView === 'doctors' ? 'text-blue-500' : 'text-gray-400 dark:text-zinc-500'}`}>{t.doctors}</span>
          </button>

          <div className="relative -top-6">
            <button 
              onClick={() => setActiveView('chatbot')} 
              className="w-20 h-20 rounded-full flex items-center justify-center relative active:scale-90 transition-all shadow-[0_20px_40px_rgba(59,130,246,0.3)] group overflow-hidden animate-sos-blink"
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #a3e635 100%)',
                padding: '3px'
              }}
            >
                <div 
                  className="w-full h-full rounded-full flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 70%)',
                    boxShadow: 'inset 0 4px 10px rgba(255,255,255,0.4), inset 0 -4px 10px rgba(0,0,0,0.2)'
                  }}
                >
                  <div className="flex flex-col items-center justify-center animate-in zoom-in duration-300">
                     <span className="text-white font-black text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] relative z-10 tracking-tight leading-none">{t.aiLogo}</span>
                  </div>
                </div>
            </button>
          </div>

          <button onClick={() => setActiveView('diseases')} className="flex flex-col items-center group active:scale-95 transition-all">
            <Pill size={26} className={`${activeView === 'diseases' ? 'text-blue-500' : 'text-gray-400 dark:text-zinc-500'} animate-subtle-blink`} />
            <span className={`text-xs font-bold mt-1 ${activeView === 'diseases' ? 'text-blue-500' : 'text-gray-400 dark:text-zinc-500'}`}>{t.medicine}</span>
          </button>

          <button onClick={() => setActiveView('emergency')} className="flex flex-col items-center group active:scale-95 transition-all">
            <Phone size={26} className={`${activeView === 'emergency' ? 'text-red-600' : 'text-gray-400 dark:text-zinc-500'} animate-pulse`} />
            <span className={`text-xs font-bold mt-1 ${activeView === 'emergency' ? 'text-red-600' : 'text-gray-400 dark:text-zinc-500'}`}>{t.help}</span>
          </button>
        </nav>
      )}

      <div 
        onClick={(e) => {
          if (e.detail === 3) setActiveView('admin');
        }} 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-6 z-[100] cursor-default opacity-0"
      ></div>
    </div>
  );
};

export default App;