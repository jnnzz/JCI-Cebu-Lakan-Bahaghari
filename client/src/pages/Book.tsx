import React, { forwardRef, useState, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { motion } from 'framer-motion';
import { 
  User, Mail, Phone, MapPin, Send, ChevronRight, Globe, Award, Target, Users,
  CheckCircle, ArrowRight, Shield, Star, Sparkles, BookOpen, Layers
} from 'lucide-react';
import JCIlogo from '../assets/logo-removedBG.png'; 

// --- TypeScript Interfaces ---
interface PageProps {
  children: React.ReactNode;
  number?: string | number;
  side?: 'left' | 'right';
  className?: string;
}

interface InfoPanelProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  subtitle: string;
  decorativeElement?: React.ReactNode;
}

interface FormSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
  onNext: () => void;
  isSubmit?: boolean;
}

interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profession: string;
  interest: string;
}

// --- Styles & Textures ---
const TEXTURES = {
  LEATHER: "https://www.transparenttextures.com/patterns/black-thread.png",
  PAPER: "https://www.transparenttextures.com/patterns/cream-paper.png",
  NOISE: "https://www.transparenttextures.com/patterns/stardust.png"
};

// --- Reusable Components ---

// 1. The Paper Page Wrapper (Handles Shadows & Texture)
const Page = forwardRef<HTMLDivElement, PageProps>((props, ref) => {
  return (
    <div 
      className={`demoPage h-full bg-[#fdfbf7] overflow-hidden shadow-inner flex flex-col ${props.className || ''}`} 
      ref={ref}
    >
      {/* Paper Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply" style={{ backgroundImage: `url(${TEXTURES.PAPER})` }}></div>
      
      {/* Spine Shadow Gradient (Left or Right based on page side) */}
      {props.side === 'left' && (
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/10 to-transparent pointer-events-none z-20"></div>
      )}
      {props.side === 'right' && (
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/10 to-transparent pointer-events-none z-20"></div>
      )}

      {/* Content Container */}
      <div className="relative z-10 flex-1 p-8 md:p-10 flex flex-col">
        {props.children}
      </div>

      {/* Page Number */}
      <div className="relative z-10 pb-4 text-center">
        <span className="text-[10px] font-serif text-gray-400 tracking-widest">- {props.number} -</span>
      </div>
    </div>
  );
});

// 2. Left Side: Illustration / Context Panel
const InfoPanel: React.FC<InfoPanelProps> = ({ icon: Icon, title, subtitle, decorativeElement }) => (
  <div className="h-full flex flex-col justify-center items-center text-center space-y-6 relative overflow-hidden rounded-lg border border-gray-100 bg-white/50 p-6 shadow-sm">
    {/* Decorative Background Elements */}
    <div className="absolute top-0 left-0 w-24 h-24 bg-red-50 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
    <div className="absolute bottom-0 right-0 w-32 h-32 bg-yellow-50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
    
    <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg flex items-center justify-center border border-gray-100 transform rotate-3 transition-transform hover:rotate-0 duration-500">
      <Icon size={40} className="text-red-700 drop-shadow-sm" />
    </div>
    
    <div className="relative z-10">
      <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 max-w-[200px] mx-auto leading-relaxed">{subtitle}</p>
    </div>

    {decorativeElement}
  </div>
);

// 3. Right Side: Form Step
const FormSection: React.FC<FormSectionProps> = ({ title, description, children, onNext, isSubmit }) => (
  <div className="h-full flex flex-col">
    <div className="mb-8 border-b border-gray-200 pb-4">
      <h2 className="text-xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
        <span className="w-2 h-8 bg-red-700 rounded-sm inline-block"></span>
        {title}
      </h2>
      <p className="text-xs text-gray-500 mt-2 ml-4 font-medium uppercase tracking-wider">{description}</p>
    </div>

    <div className="flex-1 space-y-5">
      {children}
    </div>

    <div className="mt-auto pt-6 flex justify-end">
      <button 
        onClick={onNext}
        className={`group relative overflow-hidden rounded-full px-8 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:shadow-red-900/20 active:scale-95 ${isSubmit ? 'bg-gradient-to-r from-red-700 to-red-600' : 'bg-black'}`}
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        <span className="relative flex items-center gap-2">
          {isSubmit ? 'Submit Application' : 'Next Step'} 
          {!isSubmit && <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />}
        </span>
      </button>
    </div>
  </div>
);

// --- Styled Input Component ---
const InputField: React.FC<InputFieldProps> = ({ label, type = "text", placeholder, name, value, onChange }) => (
  <div className="group">
    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 transition-colors group-focus-within:text-red-700">{label}</label>
    <input 
      type={type} 
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-transparent border-b border-gray-300 py-2 text-sm text-gray-800 placeholder-gray-300 focus:border-red-700 focus:outline-none transition-all"
    />
  </div>
);

// --- Main Book Component ---
const Book: React.FC = () => {
  const bookRef = useRef<HTMLFlipBook | null>(null);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    profession: '',
    interest: 'community'
  });

  const nextFlip = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipNext();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-10 bg-[#1a1a1a] relative overflow-hidden">
        
      {/* 3D Environment / Table Surface */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#2a2a2a_0%,_#000_100%)] pointer-events-none"></div>
      
      {/* Ambient Lighting Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-900/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, rotateX: 20, y: 50 }}
        animate={{ opacity: 1, rotateX: 0, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10"
        style={{ perspective: '2000px' }}
      >
          {/* BOOK CONFIGURATION */}
          <HTMLFlipBook 
            ref={bookRef}
            width={480} 
            height={680} 
            size="fixed"
            minWidth={300}
            maxWidth={500}
            minHeight={400}
            maxHeight={700}
            maxShadowOpacity={0.4}
            showCover={true}
            mobileScrollSupport={true}
            usePortrait={false}
            className="shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)]" // Heavy drop shadow for realism
          >
            
            {/* --------------------------- */}
            {/* PAGE 0: HARD COVER (Front)  */}
            {/* --------------------------- */}
            <div className="demoPage rounded-r-md cursor-pointer" style={{ backgroundColor: '#D4AF37' }}>
                <div className="h-full w-full relative border-l-[16px] border-[#B8860B] flex flex-col items-center justify-center p-8 overflow-hidden shadow-inner">
                    {/* Leather Texture Overlay */}
                    <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{ backgroundImage: `url(${TEXTURES.LEATHER})` }}></div>
                    {/* Gloss Shine */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col items-center transform transition-transform hover:scale-105 duration-700">
                        <div className="w-48 h-48 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 mb-8 shadow-2xl">
                            <img src={JCIlogo} alt="JCI Logo" className="w-32 h-32 object-contain drop-shadow-lg" />
                        </div>
                        
                        <h1 className="text-6xl font-black text-white tracking-tighter mb-2 drop-shadow-md">
                            JCI <span className="text-red-900">CEBU</span>
                        </h1>
                        <div className="w-24 h-1 bg-red-900 mb-4 rounded-full"></div>
                        <h2 className="text-xl font-serif text-red-950 font-bold tracking-widest uppercase">Membership 2025</h2>
                        
                        <div className="mt-20 px-6 py-2 border border-red-900/30 rounded-full bg-red-900/10 backdrop-blur-md">
                            <p className="text-[10px] font-bold text-red-950 uppercase tracking-[0.2em]">Official Document</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --------------------------- */}
            {/* SPREAD 1: INTRO & PERSONAL  */}
            {/* --------------------------- */}
            
            {/* LEFT 1: Welcome Context */}
            <Page number={1} side="left">
                <InfoPanel 
                    icon={Sparkles}
                    title="Begin Your Journey"
                    subtitle="Join a global network of young active citizens creating positive change."
                    decorativeElement={
                        <div className="mt-8 space-y-3 w-full px-4">
                            <div className="flex items-center gap-3 text-xs text-gray-500 bg-gray-50 p-2 rounded border border-gray-100">
                                <CheckCircle size={14} className="text-green-600" /> <span>Professional Development</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-500 bg-gray-50 p-2 rounded border border-gray-100">
                                <CheckCircle size={14} className="text-green-600" /> <span>Community Impact</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-500 bg-gray-50 p-2 rounded border border-gray-100">
                                <CheckCircle size={14} className="text-green-600" /> <span>Global Network</span>
                            </div>
                        </div>
                    }
                />
            </Page>

            {/* RIGHT 1: Personal Info Form */}
            <Page number={2} side="right">
                <FormSection title="Personal Information" description="Let's get to know you" onNext={nextFlip}>
                    <div className="grid grid-cols-2 gap-6">
                        <InputField label="First Name" name="firstName" placeholder="Juan" value={formData.firstName} onChange={handleChange} />
                        <InputField label="Last Name" name="lastName" placeholder="Dela Cruz" value={formData.lastName} onChange={handleChange} />
                    </div>
                    <InputField label="Profession / Student" name="profession" placeholder="e.g. Software Engineer" value={formData.profession} onChange={handleChange} />
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100 mt-4">
                        <div className="flex gap-3">
                            <Shield className="text-yellow-600 flex-shrink-0" size={18} />
                            <p className="text-[10px] text-yellow-800 leading-tight">
                                Your information is secure. We use this to verify your eligibility for the Cebu chapter.
                            </p>
                        </div>
                    </div>
                </FormSection>
            </Page>

            {/* --------------------------- */}
            {/* SPREAD 2: CONTACT & DETAILS */}
            {/* --------------------------- */}

            {/* LEFT 2: Contact Context */}
            <Page number={3} side="left">
                <InfoPanel 
                    icon={Globe}
                    title="Stay Connected"
                    subtitle="We need valid contact details to send you exclusive event invitations."
                    decorativeElement={
                        <div className="mt-8 relative">
                            <div className="w-32 h-20 mx-auto bg-white border border-gray-200 shadow-lg rounded-lg p-3 rotate-3">
                                <div className="w-8 h-8 rounded-full bg-gray-100 mb-2"></div>
                                <div className="h-2 w-16 bg-gray-100 rounded mb-1"></div>
                                <div className="h-2 w-12 bg-gray-100 rounded"></div>
                            </div>
                            <div className="w-32 h-20 mx-auto bg-white border border-gray-200 shadow-md rounded-lg p-3 -rotate-6 absolute top-0 left-0 right-0 -z-10 bg-opacity-80"></div>
                        </div>
                    }
                />
            </Page>

            {/* RIGHT 2: Contact Form */}
            <Page number={4} side="right">
                <FormSection title="Contact Details" description="How can we reach you?" onNext={nextFlip}>
                    <InputField label="Email Address" type="email" name="email" placeholder="name@example.com" value={formData.email} onChange={handleChange} />
                    <InputField label="Mobile Number" type="tel" name="phone" placeholder="+63 900 000 0000" value={formData.phone} onChange={handleChange} />
                    
                    <div className="mt-6">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Preferred Communication</label>
                        <div className="flex gap-3">
                            {['Email', 'SMS', 'Viber'].map(method => (
                                <button key={method} className="flex-1 py-2 text-xs border border-gray-200 rounded-md hover:border-red-600 hover:text-red-700 transition-colors focus:bg-red-50 focus:border-red-600 focus:text-red-700">
                                    {method}
                                </button>
                            ))}
                        </div>
                    </div>
                </FormSection>
            </Page>

            {/* --------------------------- */}
            {/* SPREAD 3: INTERESTS & SUBMIT*/}
            {/* --------------------------- */}

            {/* LEFT 3: Interest Context */}
            <Page number={5} side="left">
                <InfoPanel 
                    icon={Target}
                    title="Find Your Niche"
                    subtitle="Select the areas where you want to grow and contribute the most."
                    decorativeElement={
                        <div className="mt-10 grid grid-cols-2 gap-2 w-full max-w-[200px]">
                            <div className="bg-red-50 p-2 rounded text-center"><Award size={16} className="mx-auto text-red-400 mb-1"/><span className="text-[8px] text-gray-500 uppercase font-bold">Growth</span></div>
                            <div className="bg-blue-50 p-2 rounded text-center"><Users size={16} className="mx-auto text-blue-400 mb-1"/><span className="text-[8px] text-gray-500 uppercase font-bold">Social</span></div>
                            <div className="bg-green-50 p-2 rounded text-center"><Globe size={16} className="mx-auto text-green-400 mb-1"/><span className="text-[8px] text-gray-500 uppercase font-bold">Civic</span></div>
                            <div className="bg-purple-50 p-2 rounded text-center"><BookOpen size={16} className="mx-auto text-purple-400 mb-1"/><span className="text-[8px] text-gray-500 uppercase font-bold">Biz</span></div>
                        </div>
                    }
                />
            </Page>

            {/* RIGHT 3: Final Form */}
            <Page number={6} side="right">
                <FormSection title="Areas of Interest" description="Customize your experience" isSubmit={true} onNext={() => alert('Application Submitted!')}>
                    <div className="space-y-3">
                        {['Community Development', 'Business & Entrepreneurship', 'International Relations', 'Individual Development'].map((item) => (
                            <label key={item} className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group">
                                <div className="w-4 h-4 rounded-full border border-gray-300 mr-3 group-hover:border-red-500 flex items-center justify-center">
                                    <div className={`w-2 h-2 rounded-full bg-red-600 ${formData.interest === item ? 'opacity-100' : 'opacity-0'} transition-opacity`}></div>
                                </div>
                                <span className="text-sm text-gray-700 font-medium">{item}</span>
                                <input 
                                    type="radio" 
                                    name="interest" 
                                    value={item} 
                                    className="hidden" 
                                    onChange={handleChange}
                                    checked={formData.interest === item}
                                />
                            </label>
                        ))}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <label className="flex items-start gap-2 cursor-pointer">
                            <input type="checkbox" className="mt-1 accent-red-700" />
                            <span className="text-[10px] text-gray-500 leading-snug">
                                I agree to the <a href="#" className="underline hover:text-red-700">Constitution and By-Laws</a> of JCI Cebu Lakan Bahaghari.
                            </span>
                        </label>
                    </div>
                </FormSection>
            </Page>

            {/* --------------------------- */}
            {/* PAGE 7: BACK COVER (Inside) */}
            {/* --------------------------- */}
            <Page number="" side="left">
                <div className="h-full flex flex-col justify-center items-center opacity-50">
                    <img src={JCIlogo} className="w-16 h-16 grayscale mb-4" />
                    <p className="text-xs font-serif italic text-gray-400">"Be Better."</p>
                </div>
            </Page>

            {/* --------------------------- */}
            {/* PAGE 8: BACK COVER (Outside)*/}
            {/* --------------------------- */}
            <div className="demoPage rounded-l-md" style={{ backgroundColor: '#D4AF37' }}>
                <div className="h-full w-full relative border-r-[16px] border-[#B8860B] flex flex-col items-center justify-center p-8 shadow-2xl">
                    <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{ backgroundImage: `url(${TEXTURES.LEATHER})` }}></div>
                    <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/10 to-transparent pointer-events-none"></div>
                    
                    <div className="relative z-10 text-center">
                        <p className="text-white/50 text-[10px] tracking-[0.3em] font-bold uppercase mb-2">Established 1948</p>
                        <div className="w-8 h-8 rounded-full border border-white/30 mx-auto flex items-center justify-center">
                            <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>

          </HTMLFlipBook>
      </motion.div>
    </div>
  );
};

export default Book;