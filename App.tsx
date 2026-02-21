import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Check, ShoppingCart, Mail, Phone, MapPin, Clock, 
  ArrowRight, Loader2, Sparkles, ImageIcon,
  Instagram, Facebook, ChevronLeft, ChevronRight,
  ChevronDown, Globe, Star, LogOut, TrendingUp, Inbox, Users, AlertCircle
} from './components/Icons';
import { 
  SiteConfig, OrderFormData, User 
} from './types';
import { 
  GALLERY_CATEGORIES, REVIEWS, DEFAULT_CONFIG, ADMIN_EMAILS
} from './constants';
import { generateCakeVisualMockup } from './services/geminiService';
import { supabase, isSupabaseConfigured } from './lib/supabase';

const MAX_FILE_SIZE = 2 * 1024 * 1024;

const INITIAL_FORM_DATA: OrderFormData = {
  selectedCakeType: null,
  selectedSize: null,
  cakeFlavor: '',
  filling: '',
  frosting: '',
  selectedColors: [],
  customMessage: '',
  inspirationImage: null,
  inspirationMimeType: null,
  inspirationUrl: '',
  dietaryReqs: [],
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  deliveryMethod: '',
  deliveryDate: '',
  deliveryAddress: ''
};

const AdminDashboard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="min-h-screen bg-[#1a130f] text-white p-6 md:p-12 lg:p-16 xl:px-32 pt-28 md:pt-32 animate-fade-in">
      <div className="container mx-auto space-y-8 md:space-y-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-[#c8614a]">Studio Manager</h1>
            <p className="text-[#9c8878] text-xs md:text-sm uppercase tracking-widest font-bold">Welcome back, {user.name}</p>
          </div>
          <div className="bg-[#2c1a0e] p-5 md:p-6 rounded-[24px] md:rounded-[32px] border border-white/5 flex items-center gap-4 md:gap-6 w-full md:w-auto">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#c8614a]/20 rounded-xl md:rounded-2xl flex items-center justify-center text-[#c8614a] shrink-0"><TrendingUp size={20}/></div>
            <div>
               <p className="text-[9px] md:text-[10px] text-[#9c8878] uppercase font-black tracking-wider">Monthly Revenue</p>
               <p className="text-xl md:text-2xl font-serif italic">$15,680</p>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            <div className="bg-[#2c1a0e] rounded-[32px] md:rounded-[48px] border border-white/5 overflow-hidden">
               <div className="p-6 md:p-8 border-b border-white/5 flex justify-between items-center">
                  <h3 className="text-xl md:text-2xl font-serif italic">Pending Commissions</h3>
                  <span className="bg-[#c8614a] text-white text-[9px] md:text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">12 Active</span>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-[500px]">
                    <thead className="text-[9px] md:text-[10px] uppercase tracking-widest text-[#9c8878] bg-black/20">
                      <tr>
                        <th className="p-4 md:p-6">Client</th>
                        <th className="p-4 md:p-6">Type</th>
                        <th className="p-4 md:p-6">Date</th>
                        <th className="p-4 md:p-6 text-right">Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {[1,2,3,4,5].map(i => (
                        <tr key={i} className="hover:bg-white/5 transition-colors">
                          <td className="p-4 md:p-6">
                             <p className="font-bold text-sm md:text-base">Julianne Meyer</p>
                             <p className="text-[10px] md:text-xs text-[#9c8878]">julianne@example.com</p>
                          </td>
                          <td className="p-4 md:p-6 text-xs md:text-sm">Tiered Celebration / Madagascar Vanilla</td>
                          <td className="p-4 md:p-6 text-xs md:text-sm text-[#9c8878]">24 Oct 2024</td>
                          <td className="p-4 md:p-6 text-right font-serif italic text-lg md:text-xl">$480</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
               </div>
            </div>
          </div>
          <div className="space-y-6 md:space-y-8">
             <div className="bg-[#c8614a] p-8 md:p-10 rounded-[32px] md:rounded-[48px] text-white space-y-6 shadow-2xl">
                <h3 className="text-2xl md:text-3xl font-serif italic">Quick Actions</h3>
                <div className="space-y-3">
                   <button className="w-full bg-white/10 hover:bg-white/20 p-4 md:p-5 rounded-xl md:rounded-2xl flex items-center justify-between transition-all group">
                      <span className="text-xs md:text-sm font-bold uppercase tracking-widest">Update Pricing</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                   </button>
                   <button className="w-full bg-white/10 hover:bg-white/20 p-4 md:p-5 rounded-xl md:rounded-2xl flex items-center justify-between transition-all group">
                      <span className="text-xs md:text-sm font-bold uppercase tracking-widest">Gallery Upload</span>
                      <ImageIcon size={18} className="group-hover:scale-110 transition-transform"/>
                   </button>
                </div>
             </div>
             <div className="bg-[#2c1a0e] p-6 md:p-8 rounded-[32px] md:rounded-[48px] border border-white/5 space-y-6">
                <h3 className="text-lg md:text-xl font-serif italic flex items-center gap-3"><Inbox size={18} className="text-[#c8614a]"/> Recent Enquiries</h3>
                <div className="space-y-4">
                   {[1,2].map(i => (
                     <div key={i} className="p-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/5 space-y-1">
                        <p className="text-[10px] md:text-xs font-bold">New Message from Tom H.</p>
                        <p className="text-[10px] md:text-[12px] text-[#9c8878] line-clamp-2 italic font-serif text-base md:text-lg">"I was wondering if you do custom wedding toppers..."</p>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const AuthModal: React.FC<{ onClose: () => void; onAuthSuccess: (user: User) => void }> = ({ onClose, onAuthSuccess }) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'verify'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [verificationEmail, setVerificationEmail] = useState('');

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isSupabaseConfigured) {
      setError('Supabase is not configured.');
      return;
    }
    setLoading(true);
    setError('');
    const fData = new FormData(e.currentTarget);
    const email = fData.get('email') as string;
    
    try {
      const { error: authError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: mode === 'signup',
        }
      });
      if (authError) throw authError;
      setVerificationEmail(email);
      setMode('verify');
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fData = new FormData(e.currentTarget);
    const code = fData.get('code') as string;
    try {
      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        email: verificationEmail,
        token: code,
        type: 'magiclink'
      });
      if (verifyError) throw verifyError;
      if (data.user) {
        onAuthSuccess({
          id: data.user.id,
          email: data.user.email!,
          name: data.user.user_metadata?.name || data.user.email?.split('@')[0] || 'User',
          role: ADMIN_EMAILS.includes(data.user.email!) ? 'admin' : 'customer'
        });
      }
    } catch (err: any) {
      setError(err.message || 'Invalid code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#2c1a0e]/60 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-md p-6 md:p-10 rounded-[32px] md:rounded-[64px] shadow-2xl animate-scale-in border border-[#ede5dc]">
        <button className="absolute top-6 right-6 md:top-8 md:right-8 text-[#c8614a] hover:scale-110 transition-transform" onClick={onClose}><X/></button>
        <div className="text-center space-y-2 mb-8 md:mb-10">
          <h2 className="text-3xl md:text-4xl font-serif italic text-[#2c1a0e]">
            {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Create Profile' : 'Identity Check'}
          </h2>
          <p className="text-xs md:text-sm text-[#9c8878] font-light">
            {mode === 'verify' ? `A magic link was sent to ${verificationEmail}` : 'Premium artisan bakes await.'}
          </p>
        </div>
        {error && <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 text-xs md:text-sm flex items-center gap-3"><AlertCircle size={18}/> {error}</div>}
        {mode === 'verify' ? (
          <form onSubmit={handleVerify} className="space-y-4 md:space-y-6">
            <input name="code" required placeholder="000000" className="w-full bg-[#fdf8f4] border border-[#ede5dc] rounded-xl md:rounded-2xl p-4 md:p-5 outline-none text-center text-2xl md:text-3xl font-bold tracking-[0.4em] text-[#c8614a]" />
            <button disabled={loading} className="w-full bg-[#c8614a] text-white py-4 md:py-5 rounded-full font-bold uppercase tracking-widest text-[10px] md:text-xs shadow-xl flex justify-center items-center hover:bg-[#b04d38] transition-colors">
              {loading ? <Loader2 className="animate-spin"/> : 'Complete Verification'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleAuth} className="space-y-4 md:space-y-6">
            {mode === 'signup' && <input name="name" required placeholder="Full Name" className="w-full bg-[#fdf8f4] border border-[#ede5dc] rounded-xl md:rounded-2xl p-4 md:p-5 outline-none text-xs md:text-sm" />}
            <input name="email" type="email" required placeholder="Email Address" className="w-full bg-[#fdf8f4] border border-[#ede5dc] rounded-xl md:rounded-2xl p-4 md:p-5 outline-none text-xs md:text-sm" />
            <button disabled={loading} className="w-full bg-[#c8614a] text-white py-4 md:py-5 rounded-full font-bold uppercase tracking-widest text-[10px] md:text-xs shadow-xl flex justify-center items-center hover:bg-[#b04d38] transition-colors">
              {loading ? <Loader2 className="animate-spin"/> : 'Continue'}
            </button>
            <div className="text-center">
              <button type="button" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="text-[9px] md:text-[10px] uppercase tracking-widest font-black text-[#9c8878] hover:text-[#c8614a] transition-colors">
                {mode === 'login' ? "New here? Join the studio" : "Already a member? Sign in"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};


const CategorySlideshowCard: React.FC<{ category: any; onOrder: () => void }> = ({ category, onOrder }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx(prev => (prev + 1) % category.images.length);
    }, 4000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, [category.images.length]);

  return (
    <div className="bg-white rounded-[32px] md:rounded-[40px] overflow-hidden border border-[#ede5dc] group hover:shadow-2xl transition-all duration-700 h-full flex flex-col">
      <div className="relative h-64 md:h-80 overflow-hidden shrink-0">
        {category.images.map((img: string, i: number) => (
          <img 
            key={i}
            src={img} 
            alt={category.title}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${i === currentIdx ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
          />
        ))}
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
      </div>
      <div className="p-6 md:p-10 space-y-4 flex-grow flex flex-col justify-between">
        <div className="space-y-3 md:space-y-4">
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-[#c8614a] font-bold block">{category.category}</span>
          <h3 className="text-2xl md:text-3xl font-serif italic text-[#2c1a0e]">{category.title}</h3>
          <p className="text-xs md:text-sm text-[#9c8878] leading-relaxed line-clamp-3 font-light">{category.description}</p>
        </div>
        <button onClick={onOrder} className="pt-4 md:pt-6 flex items-center gap-3 text-[#c8614a] font-bold uppercase tracking-widest text-[9px] md:text-[10px] border-b border-transparent hover:border-[#c8614a] transition-all pb-2 group/btn w-fit">
          Start Customizing <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};


const App: React.FC = () => {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [submittingOrder, setSubmittingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mockupUrl, setMockupUrl] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [inspirationMode, setInspirationMode] = useState<'upload' | 'url'>('upload');
  const [formData, setFormData] = useState<OrderFormData>(INITIAL_FORM_DATA);

  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        if (!isSupabaseConfigured) {
          setConfig(DEFAULT_CONFIG);
          setLoading(false);
          return;
        }
        const { data, error } = await supabase.from('site_config').select('*').single();
        if (error) throw error;
        setConfig(data || DEFAULT_CONFIG);
      } catch (err) {
        setConfig(DEFAULT_CONFIG);
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { threshold: 0.15 });
    Object.keys(sectionsRef.current).forEach(key => {
      const section = sectionsRef.current[key];
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, [loading]);

  useEffect(() => {
    if (orderModalOpen || authModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [orderModalOpen, authModalOpen]);

  useEffect(() => {
    if (isSupabaseConfigured) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          handleAuthSuccess({
            id: session.user.id,
            email: session.user.email!,
            name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
            role: ADMIN_EMAILS.includes(session.user.email!) ? 'admin' : 'customer'
          });
        }
      });
    }
  }, []);

  const updateFormData = (updates: Partial<OrderFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleSelection = (updates: Partial<OrderFormData>) => updateFormData(updates);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError(null);
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) { setFileError("Image must be smaller than 2MB."); return; }
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      updateFormData({ inspirationImage: base64String, inspirationMimeType: file.type, inspirationUrl: '' });
    };
    reader.readAsDataURL(file);
  };

  const handleVisualize = async () => {
    if (!formData.selectedCakeType) return;
    setAiLoading(true);
    const cake = config?.cake_types.find(c => c.id === formData.selectedCakeType);
    try {
      const result = await generateCakeVisualMockup({
        type: cake?.name || 'Artisan Cake',
        flavor: formData.cakeFlavor,
        filling: formData.filling,
        frosting: formData.frosting,
        message: formData.customMessage,
        inspirationImage: formData.inspirationImage ? {
          data: formData.inspirationImage,
          mimeType: formData.inspirationMimeType || 'image/jpeg'
        } : undefined
      });
      setMockupUrl(result);
    } catch (err) { console.error(err); } 
    finally { setAiLoading(false); }
  };

  const calculateTotal = () => {
    if (!config || !formData.selectedCakeType || !formData.selectedSize) return 0;
    const cake = config.cake_types.find(c => c.id === formData.selectedCakeType);
    const size = config.sizes.find(s => s.id === formData.selectedSize);
    if (!cake || !size) return 0;
    let total = cake.base_price * size.multiplier;
    if (formData.frosting === 'Fondant') total += config.surcharges.fondant_premium;
    total += formData.dietaryReqs.length * config.surcharges.dietary_per_item;
    if (formData.deliveryMethod === 'delivery') total += config.surcharges.delivery_fee;
    return Math.round(total);
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSupabaseConfigured) {
      alert("Database not configured.");
      return;
    }
    setSubmittingOrder(true);
    try {
      const selectedSize = config?.sizes.find(s => s.id === formData.selectedSize);
      const payload = { 
        ...formData, 
        servings: selectedSize?.servings, 
        total_price: calculateTotal(), 
        mockup_image: mockupUrl,
        user_id: user?.id || null 
      };
      const { error } = await supabase.from('orders').insert([payload]);
      if (error) throw error;
      setOrderSuccess(true);
    } catch (err) { 
      alert('Something went wrong. Please call us at (555) 123-4567.'); 
    } finally { 
      setSubmittingOrder(false); 
    }
  };

  const handleEnquiry = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isSupabaseConfigured) return;
    const fData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fData.entries());
    try {
      const { error } = await supabase.from('enquiries').insert([payload]);
      if (error) throw error;
      setEnquirySuccess(true);
    } catch (err) { alert('Error sending enquiry.'); }
  };

  const handleAuthSuccess = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    setIsAdmin(authenticatedUser.role === 'admin');
    setAuthModalOpen(false);
  };

  const logout = async () => {
    if (isSupabaseConfigured) await supabase.auth.signOut();
    setUser(null);
    setIsAdmin(false);
  };

  const NavLink: React.FC<{ to: string; label: string }> = ({ to, label }) => (
    <a href={`#${to}`} onClick={(e) => { e.preventDefault(); document.getElementById(to)?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }}
      className={`text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] transition-all duration-300 relative group ${activeSection === to ? 'text-[#c8614a] font-black' : 'text-[#9c8878] hover:text-[#c8614a]'}`}>
      {label}
      <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-[#c8614a] transition-transform duration-300 origin-left ${activeSection === to ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
    </a>
  );

  const TOTAL_STEPS = 8;
  const getStepContent = (step: number) => {
    switch (step) {
      case 1: return { title: "Select Your Base", subtext: "Fundamental shape of your celebration." };
      case 2: return { title: "Define the Scale", subtext: "How many moments are we sharing?" };
      case 3: return { title: "Flavour Studio", subtext: "Sensory architecture of your bespoke bake." };
      case 4: return { title: "Themes & Nuance", subtext: "Personal touches and dietary considerations." };
      case 5: return { title: "Visual Inspiration", subtext: "Share your moodboards or references." };
      case 6: return { title: "Contact Profile", subtext: "Where should we reach out?" };
      case 7: return { title: "Logistics", subtext: "Timeline and handover details." };
      case 8: return { title: "Final Review", subtext: "The blueprint for your celebration." };
      default: return { title: "Bake Studio", subtext: "" };
    }
  };
  const stepInfo = getStepContent(currentStep);

  const summaryItems = [
    { label: 'Cake Type', value: config?.cake_types.find(c => c.id === formData.selectedCakeType)?.name },
    { label: 'Size', value: config?.sizes.find(s => s.id === formData.selectedSize)?.label },
    { label: 'Flavor', value: formData.cakeFlavor },
    { label: 'Filling', value: formData.filling },
    { label: 'Frosting', value: formData.frosting },
    { label: 'Method', value: formData.deliveryMethod },
    { label: 'Date', value: formData.deliveryDate },
    { label: 'Dietary', value: formData.dietaryReqs.join(', ') }
  ].filter(item => item.value);

  if (loading) return (
    <div className="fixed inset-0 bg-[#fdf8f4] flex flex-col items-center justify-center z-[9999]">
      <h1 className="text-5xl text-[#c8614a] mb-4 font-serif italic">Sweet Moments</h1>
      <div className="flex items-center gap-2 text-[#9c8878] animate-pulse"><Loader2 className="animate-spin w-4 h-4" /><p>Preparing the bakery...</p></div>
    </div>
  );

  return (
    <div className="relative overflow-x-hidden selection:bg-[#c8614a]/20">
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled || isAdmin ? 'glass border-b border-[#ede5dc] py-3 md:py-4' : 'py-6 md:py-8'}`}>
        <nav className="container mx-auto px-6 md:px-12 lg:px-32 xl:px-40 flex justify-between items-center">
          <a href="#" className="text-2xl md:text-3xl font-serif italic text-[#c8614a] hover:opacity-80 transition-opacity">Sweet Moments</a>
          <div className="hidden xl:flex gap-8 items-center">
            {isAdmin ? (
               <div className="flex gap-6 items-center">
                  <span className="text-[9px] uppercase tracking-[0.2em] font-black text-[#c8614a] bg-[#c8614a]/10 px-3 py-1.5 rounded-full">Admin Portal</span>
                  <button onClick={logout} className="text-[10px] uppercase tracking-widest text-[#9c8878] hover:text-[#c8614a] flex items-center gap-2 transition-colors"><LogOut size={14}/> Sign Out</button>
               </div>
            ) : (
              <>
                <NavLink to="home" label="Home" />
                <NavLink to="gallery" label="Gallery" />
                <NavLink to="kitchen" label="The Kitchen" />
                <NavLink to="reviews" label="Reviews" />
                <NavLink to="about" label="About" />
                <NavLink to="contact" label="Contact" />
                {user ? (
                   <div className="flex gap-5 items-center">
                      <p className="text-[10px] text-[#c8614a] font-bold uppercase tracking-wider">Hi, {user.name.split(' ')[0]}</p>
                      <button onClick={logout} className="text-[#9c8878] hover:text-[#c8614a] transition-colors" title="Sign Out"><LogOut size={14}/></button>
                   </div>
                ) : (
                   <button onClick={() => setAuthModalOpen(true)} className="text-[10px] uppercase tracking-widest text-[#9c8878] hover:text-[#c8614a] transition-colors">Sign In</button>
                )}
              </>
            )}
          </div>
          {!isAdmin && (
             <button onClick={() => { setOrderModalOpen(true); setCurrentStep(1); }} className="hidden xl:block bg-[#c8614a] text-white px-7 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#b04d38] hover:scale-105 transition-all shadow-lg">Order Now</button>
          )}
          <button className="xl:hidden text-[#c8614a] p-2 hover:bg-[#c8614a]/5 rounded-full transition-colors" onClick={() => setMobileMenuOpen(true)} aria-label="Toggle menu"><Menu size={24} /></button>
        </nav>
      </header>

      {isAdmin ? <AdminDashboard user={user!} /> : (
        <>
          <div className={`fixed inset-0 z-[60] transition-all duration-500 ${mobileMenuOpen ? 'visible' : 'invisible'}`}>
            <div className={`absolute inset-0 bg-[#2c1a0e]/20 backdrop-blur-sm transition-opacity duration-500 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setMobileMenuOpen(false)}></div>
            <div className={`absolute top-0 right-0 h-full w-[280px] sm:w-[320px] bg-white shadow-2xl transition-transform duration-500 ease-out flex flex-col p-8 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
              <div className="flex justify-between items-center mb-12">
                <span className="text-xl font-serif italic text-[#c8614a]">Menu</span>
                <button className="text-[#c8614a] p-2 hover:bg-[#c8614a]/5 rounded-full transition-colors" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu"><X size={24} /></button>
              </div>
              <div className="flex flex-col gap-6 mb-12">
                <NavLink to="home" label="Home" />
                <NavLink to="gallery" label="Gallery" />
                <NavLink to="kitchen" label="The Kitchen" />
                <NavLink to="reviews" label="Reviews" />
                <NavLink to="about" label="About" />
                <NavLink to="contact" label="Contact" />
              </div>
              
              <div className="mt-auto space-y-6">
                {user ? (
                  <div className="flex flex-col gap-4 p-4 bg-[#fdf8f4] rounded-2xl border border-[#ede5dc]">
                    <p className="text-[10px] text-[#c8614a] font-bold uppercase tracking-wider">Hi, {user.name.split(' ')[0]}</p>
                    <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="text-[10px] uppercase tracking-widest text-[#9c8878] hover:text-[#c8614a] flex items-center gap-2 transition-colors"><LogOut size={14}/> Sign Out</button>
                  </div>
                ) : (
                  <button onClick={() => { setAuthModalOpen(true); setMobileMenuOpen(false); }} className="w-full text-center py-4 text-[10px] uppercase tracking-widest text-[#9c8878] hover:text-[#c8614a] border border-[#ede5dc] rounded-full transition-colors">Sign In</button>
                )}
                <button onClick={() => { setOrderModalOpen(true); setCurrentStep(1); setMobileMenuOpen(false); }} className="w-full bg-[#c8614a] text-white py-4 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg hover:bg-[#b04d38] transition-all active:scale-95">Order Now</button>
              </div>
            </div>
          </div>

          <main className={`transition-all duration-700 ${orderModalOpen || authModalOpen ? 'blur-md scale-[0.98]' : 'blur-0 scale-100'}`}>
            <section id="home" ref={el => { sectionsRef.current['home'] = el; }} className="relative min-h-screen flex items-center pt-20 pb-12 md:py-0 overflow-hidden">
              <div className="absolute inset-0 z-0 bg-[#fdf8f4]">
                <div className="noise"></div>
              </div>
              <div className="container mx-auto px-6 md:px-12 lg:px-32 xl:px-40 grid md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
                <div className="space-y-6 md:space-y-8 animate-fade-in-up text-center md:text-left">
                  <h1 className="text-[clamp(40px,10vw,100px)] leading-[0.9] text-[#2c1a0e] tracking-tight font-serif">Cakes made<br /><span className="italic text-[#c8614a]">with intention.</span></h1>
                  <p className="text-base md:text-lg lg:text-xl text-[#9c8878] font-light max-w-md mx-auto md:mx-0 leading-relaxed">Custom artisan cakes crafted for the moments that truly matter. Everything from scratch, every detail considered.</p>
                  <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                    <button onClick={() => { setOrderModalOpen(true); setCurrentStep(1); }} className="bg-[#c8614a] text-white px-8 md:px-10 py-4 md:py-5 rounded-full text-sm md:text-base font-bold uppercase tracking-widest hover:bg-[#b04d38] hover:scale-105 transition-all shadow-xl shadow-[#c8614a]/20 whitespace-nowrap">Order a Cake</button>
                    <button onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })} className="border-2 border-[#c8614a] text-[#c8614a] px-8 md:px-10 py-4 md:py-5 rounded-full text-sm md:text-base font-bold uppercase tracking-widest hover:bg-[#c8614a] hover:text-white transition-all whitespace-nowrap">See Our Work</button>
                  </div>
                </div>
                <div className="flex justify-center md:justify-end items-center relative mt-4 md:mt-0">
                  <div className="text-[140px] sm:text-[200px] md:text-[280px] lg:text-[340px] xl:text-[420px] animate-float drop-shadow-2xl opacity-90 select-none pointer-events-none">🎂</div>
                  <div className="absolute -z-10 w-48 sm:w-64 md:w-[400px] lg:w-[500px] h-48 sm:h-64 md:h-[400px] lg:h-[500px] bg-[#d4956a]/15 rounded-full blur-[80px] md:blur-[100px] animate-pulse"></div>
                </div>
              </div>
            </section>
            
            <section id="gallery" ref={el => { sectionsRef.current['gallery'] = el; }} className="py-24 md:py-32 bg-[#fdf8f4]">
              <div className="container mx-auto px-6 md:px-12 lg:px-32 xl:px-40">
                <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
                  <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-[#c8614a] font-bold mb-4 block">Lookbook</span>
                  <h2 className="text-4xl md:text-6xl text-[#2c1a0e] font-serif italic mb-6">Our Works</h2>
                  <p className="text-base md:text-lg text-[#9c8878] font-light max-w-2xl mx-auto">Explore our curated collections, where each category is a testament to our dedication to aesthetic and flavor.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
                  {GALLERY_CATEGORIES.map(cat => (
                    <CategorySlideshowCard key={cat.id} category={cat} onOrder={() => { setOrderModalOpen(true); setCurrentStep(1); }} />
                  ))}
                </div>
              </div>
            </section>

            <section id="kitchen" ref={el => { sectionsRef.current['kitchen'] = el; }} className="py-24 md:py-32 bg-white px-6 md:px-12 lg:px-32 xl:px-40 border-y border-[#ede5dc]">
               <div className="container mx-auto">
                 <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                   <div className="space-y-8 md:space-y-12">
                     <div className="space-y-4 md:space-y-6">
                       <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-[#c8614a] font-bold block">The Process</span>
                       <h2 className="text-4xl md:text-6xl font-serif italic text-[#2c1a0e]">The Kitchen</h2>
                       <p className="text-lg md:text-xl text-[#9c8878] font-light leading-relaxed">Where technique meets obsession. Every element of your cake is crafted from the ground up using artisanal methods and the world's finest provisions.</p>
                     </div>
                     <div className="space-y-8 md:space-y-10">
                        <div className="flex gap-6 md:gap-8 group">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-[#fdf8f4] border border-[#ede5dc] rounded-xl md:rounded-2xl flex items-center justify-center text-[#c8614a] group-hover:bg-[#c8614a] group-hover:text-white transition-all shrink-0"><Sparkles size={20}/></div>
                          <div className="space-y-1 md:space-y-2"><h4 className="text-base md:text-lg font-serif italic text-[#2c1a0e]">Ethical Sourcing</h4><p className="text-xs md:text-sm text-[#9c8878]">We exclusively use Valrhona chocolate and farm-fresh organic dairy.</p></div>
                        </div>
                        <div className="flex gap-6 md:gap-8 group">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-[#fdf8f4] border border-[#ede5dc] rounded-xl md:rounded-2xl flex items-center justify-center text-[#c8614a] group-hover:bg-[#c8614a] group-hover:text-white transition-all shrink-0"><Check size={20}/></div>
                          <div className="space-y-1 md:space-y-2"><h4 className="text-base md:text-lg font-serif italic text-[#2c1a0e]">Zero Compromise</h4><p className="text-xs md:text-sm text-[#9c8878]">No pre-mixes, no artificial extracts. Madagascar vanilla beans scraped by hand.</p></div>
                        </div>
                     </div>
                   </div>
                   <div className="relative mt-8 lg:mt-0">
                      <div className="grid grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-4 md:space-y-6 pt-8 md:pt-12"><img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600" className="rounded-[24px] md:rounded-[32px] w-full aspect-[3/4] object-cover shadow-lg" alt="Kitchen 1" /><img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600" className="rounded-[24px] md:rounded-[32px] w-full aspect-square object-cover shadow-lg" alt="Kitchen 2" /></div>
                        <div className="space-y-4 md:space-y-6"><img src="https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80&w=600" className="rounded-[24px] md:rounded-[32px] w-full aspect-square object-cover shadow-lg" alt="Kitchen 3" /><img src="https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&q=80&w=600" className="rounded-[24px] md:rounded-[32px] w-full aspect-[3/4] object-cover shadow-lg" alt="Kitchen 4" /></div>
                      </div>
                   </div>
                 </div>
               </div>
            </section>

            <section id="reviews" ref={el => { sectionsRef.current['reviews'] = el; }} className="py-24 md:py-32 bg-[#fdf8f4] px-6 md:px-12 lg:px-32 xl:px-40">
              <div className="container mx-auto">
                <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
                  <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-[#c8614a] font-bold block">Testimonials</span>
                  <h2 className="text-4xl md:text-6xl text-[#2c1a0e] font-serif italic">Client Stories</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                  {REVIEWS.map((review, i) => (
                    <div key={i} className="space-y-6 md:space-y-8 bg-white p-6 md:p-10 rounded-[32px] md:rounded-[40px] border border-[#ede5dc] hover:shadow-xl transition-all duration-500">
                      <div className="relative aspect-[4/5] rounded-[24px] md:rounded-[32px] overflow-hidden">
                        <img src={review.cakeImage} alt="Cake" className="w-full h-full object-cover" />
                        <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4 bg-white/90 backdrop-blur p-3 md:p-4 rounded-xl md:rounded-2xl flex items-center gap-3 md:gap-4 shadow-lg">
                          <img src={review.clientImage} alt={review.name} className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border border-[#ede5dc]" />
                          <div><p className="text-[10px] md:text-xs font-bold text-[#2c1a0e]">{review.name}</p><div className="flex gap-0.5">{[...Array(review.rating)].map((_, j) => (<Star key={j} size={10} className="fill-[#c8614a] text-[#c8614a]" />))}</div></div>
                        </div>
                      </div>
                      <p className="text-[#9c8878] italic font-serif text-base md:text-lg leading-relaxed">"{review.comment}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="about" ref={el => { sectionsRef.current['about'] = el; }} className="py-24 md:py-32 bg-white px-6 md:px-12 lg:px-32 xl:px-40">
              <div className="container mx-auto grid md:grid-cols-2 gap-12 md:gap-24 items-center">
                <div className="relative group max-w-md mx-auto md:max-w-none">
                  <div className="bg-white aspect-[3/4] rounded-[32px] md:rounded-[48px] overflow-hidden shadow-2xl relative z-10 border border-[#ede5dc]">
                    <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Sarah" />
                  </div>
                  <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 w-full h-full bg-[#c8614a]/5 rounded-[32px] md:rounded-[48px] -z-10"></div>
                </div>
                <div className="space-y-6 md:space-y-8 text-center md:text-left">
                  <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-[#c8614a] font-bold block">The Artist</span>
                  <h2 className="text-4xl md:text-6xl font-serif italic text-[#2c1a0e]">Meet Sarah.</h2>
                  <div className="space-y-4 md:space-y-6 text-[#9c8878] text-lg md:text-xl font-light leading-relaxed">
                    <p>After a decade in London's luxury pastry scene, Sarah returned home to craft Sweet Moments. Every cake is hand-painted and curated with intention.</p>
                  </div>
                  <div className="flex gap-4 max-w-xs mx-auto md:mx-0">
                    <div className="p-4 border border-[#ede5dc] rounded-2xl bg-[#fdf8f4] text-center flex-1"><p className="text-xl md:text-2xl font-serif italic text-[#c8614a]">12+</p><p className="text-[8px] uppercase font-black text-[#9c8878]">Years Exp</p></div>
                    <div className="p-4 border border-[#ede5dc] rounded-2xl bg-[#fdf8f4] text-center flex-1"><p className="text-xl md:text-2xl font-serif italic text-[#c8614a]">5k+</p><p className="text-[8px] uppercase font-black text-[#9c8878]">Orders</p></div>
                  </div>
                </div>
              </div>
            </section>

            <section id="contact" ref={el => { sectionsRef.current['contact'] = el; }} className="py-24 md:py-32 bg-[#fdf8f4] px-6 md:px-12 lg:px-32 xl:px-40">
              <div className="container mx-auto grid md:grid-cols-2 gap-12 md:gap-24">
                <div className="space-y-12 md:space-y-16 text-center md:text-left">
                  <h2 className="text-4xl md:text-6xl font-serif italic text-[#2c1a0e]">Get in touch.</h2>
                  <div className="space-y-8 md:space-y-10">
                    {[{ icon: <Phone size={20}/>, label: 'Voice', val: '(555) 123-4567' }, { icon: <Mail size={20}/>, label: 'Email', val: 'studio@sweetmoments.com' }, { icon: <MapPin size={20}/>, label: 'The Workshop', val: '123 Baker St, Sweet City' }].map(item => (
                      <div key={item.label} className="flex flex-col md:flex-row items-center gap-4 md:gap-8 group">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-white border border-[#ede5dc] rounded-2xl md:rounded-3xl flex items-center justify-center text-[#c8614a] group-hover:bg-[#c8614a] group-hover:text-white transition-all shadow-sm shrink-0">{item.icon}</div>
                        <div className="text-center md:text-left"><p className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#9c8878] font-black">{item.label}</p><p className="text-xl md:text-2xl text-[#2c1a0e] font-serif italic">{item.val}</p></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white p-6 md:p-12 rounded-[32px] md:rounded-[48px] border border-[#ede5dc] shadow-2xl">
                  {enquirySuccess ? <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-16 md:py-24"><Check size={64} className="text-[#c8614a]" /><h3 className="text-3xl md:text-4xl font-serif italic">Message Received</h3><p className="text-sm md:text-base text-[#9c8878] font-light">Sarah will reach out within 12 business hours.</p></div>
                    : <form onSubmit={handleEnquiry} className="space-y-6 md:space-y-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8"><div className="space-y-2 md:space-y-3"><label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#9c8878]">Full Name</label><input name="name" required className="w-full bg-[#fdf8f4] border border-[#ede5dc] rounded-xl md:rounded-[16px] p-4 md:p-5 outline-none font-serif italic text-base md:text-lg focus:border-[#c8614a] transition-colors" /></div><div className="space-y-2 md:space-y-3"><label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#9c8878]">Email</label><input name="email" type="email" required className="w-full bg-[#fdf8f4] border border-[#ede5dc] rounded-xl md:rounded-[16px] p-4 md:p-5 outline-none text-sm focus:border-[#c8614a] transition-colors" /></div></div>
                      <div className="space-y-2 md:space-y-3"><label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#9c8878]">Message</label><textarea name="message" required rows={4} className="w-full bg-[#fdf8f4] border border-[#ede5dc] rounded-xl md:rounded-[16px] p-4 md:p-5 outline-none resize-none text-sm focus:border-[#c8614a] transition-colors" /></div>
                      <button type="submit" className="w-full bg-[#c8614a] text-white py-5 md:py-6 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] transition-all flex items-center justify-center gap-3 md:gap-4 shadow-xl hover:bg-[#b04d38] hover:scale-[1.02]">Transmit Inquiry <Mail size={18} /></button>
                    </form>}
                </div>
              </div>
            </section>

            <footer className="py-16 md:py-24 bg-white border-t border-[#ede5dc] text-center px-6 md:px-12 lg:px-32 xl:px-40">
              <div className="container mx-auto space-y-8 md:space-y-12">
                <a href="#" className="text-4xl md:text-5xl font-serif italic text-[#c8614a] hover:opacity-80 transition-opacity">Sweet Moments</a>
                <div className="flex justify-center gap-8 text-[#9c8878]">
                   <a href="#" className="hover:text-[#c8614a] transition-colors"><Instagram size={20}/></a>
                   <a href="#" className="hover:text-[#c8614a] transition-colors"><Facebook size={20}/></a>
                </div>
                <p className="text-[#9c8878] pt-8 md:pt-16 uppercase tracking-[0.3em] md:tracking-[0.5em] text-[8px] md:text-[10px] font-bold">© 2025 Sweet Moments Bespoke Bakery. All rights reserved.</p>
              </div>
            </footer>
          </main>
        </>
      )}

      {authModalOpen && <AuthModal onClose={() => setAuthModalOpen(false)} onAuthSuccess={handleAuthSuccess} />}

      {orderModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 md:p-8 animate-fade-in">
          <div className="absolute inset-0 bg-[#2c1a0e]/70 backdrop-blur-sm" onClick={() => setOrderModalOpen(false)}></div>
          <div className="relative w-full max-w-4xl bg-white sm:rounded-[48px] shadow-2xl border border-[#ede5dc] flex flex-col h-full sm:max-h-[92vh] overflow-hidden animate-scale-in">
            <div className="absolute top-0 right-0 z-[110]"><button onClick={() => setOrderModalOpen(false)} className="w-12 h-12 md:w-16 md:h-16 close-notch flex items-center justify-center text-[#c8614a]" aria-label="Close modal"><X size={24} className="sm:translate-x-1 sm:-translate-y-1" /></button></div>
            <div className="absolute top-0 left-0 w-full h-1 md:h-1.5 bg-[#ede5dc] z-[30]"><div className="h-full bg-[#c8614a] transition-all duration-1000 ease-in-out" style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}></div></div>
            <div className="p-6 md:p-10 pb-2 md:pb-4 flex items-center justify-between shrink-0 bg-white z-20 mt-1 md:mt-1.5"><div className="space-y-0.5 md:space-y-1"><h2 className="text-2xl md:text-4xl font-serif italic text-[#2c1a0e] leading-tight">{stepInfo.title}</h2><p className="text-[10px] md:text-sm text-[#9c8878] font-light max-w-md">{stepInfo.subtext}</p></div></div>
            <div className="flex-grow overflow-y-auto p-6 md:p-16 no-scrollbar bg-white">
               <form onSubmit={handleSubmitOrder} className="min-h-full flex flex-col">
                  <div key={currentStep} className="step-reveal min-h-full">
                    {currentStep === 1 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 animate-fade-in-up">
                        {config?.cake_types.map(cake => (
                          <div key={cake.id} onClick={() => handleSelection({ selectedCakeType: cake.id })} className={`relative p-6 md:p-8 rounded-[24px] md:rounded-[32px] border-2 cursor-pointer transition-all ${formData.selectedCakeType === cake.id ? 'border-[#c8614a] bg-[#c8614a]/5' : 'border-[#ede5dc] hover:border-[#d4956a]'}`}>
                            <div className="text-4xl md:text-5xl mb-3 md:mb-4 text-center">{cake.emoji}</div>
                            <h4 className="text-[10px] md:text-xs font-bold text-center uppercase tracking-widest">{cake.name}</h4>
                            <p className="text-[8px] md:text-[10px] text-[#9c8878] text-center mt-1 md:mt-2 font-black">FROM ${cake.base_price}</p>
                            {formData.selectedCakeType === cake.id && <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-[#c8614a] text-white rounded-full p-1"><Check size={10}/></div>}
                          </div>
                        ))}
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="grid gap-3 md:gap-4 max-w-md mx-auto animate-fade-in-up">
                        {config?.sizes.map(size => (
                          <button key={size.id} type="button" onClick={() => handleSelection({ selectedSize: size.id })} className={`p-6 md:p-8 rounded-[24px] md:rounded-[32px] border-2 text-left transition-all flex items-center justify-between group ${formData.selectedSize === size.id ? 'border-[#c8614a] bg-[#c8614a]/5' : 'border-[#ede5dc] hover:border-[#d4956a]'}`}>
                            <div><p className="font-serif text-xl md:text-2xl italic text-[#2c1a0e]">{size.label}</p><p className="text-[9px] md:text-xs font-bold text-[#9c8878] uppercase tracking-widest">Serves up to {size.servings}</p></div>
                            {formData.selectedSize === size.id && <Check className="text-[#c8614a]" size={20} />}
                          </button>
                        ))}
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="max-w-2xl mx-auto space-y-8 md:space-y-12 animate-fade-in-up">
                        <div className="space-y-3 md:space-y-4">
                          <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#c8614a]">01. The Sponge</label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {config?.cake_flavours.map(f => (
                              <button key={f} type="button" onClick={() => updateFormData({ cakeFlavor: f })} className={`p-3 md:p-4 rounded-xl md:rounded-[16px] border-2 text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all ${formData.cakeFlavor === f ? 'border-[#c8614a] bg-[#c8614a]/5 text-[#c8614a]' : 'border-[#ede5dc] text-[#9c8878] hover:border-[#d4956a]'}`}>{f}</button>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-3 md:space-y-4">
                          <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#c8614a]">02. Internal Filling</label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {config?.fillings.map(f => (
                              <button key={f} type="button" onClick={() => updateFormData({ filling: f })} className={`p-3 md:p-4 rounded-xl md:rounded-[16px] border-2 text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all ${formData.filling === f ? 'border-[#c8614a] bg-[#c8614a]/5 text-[#c8614a]' : 'border-[#ede5dc] text-[#9c8878] hover:border-[#d4956a]'}`}>{f}</button>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-3 md:space-y-4">
                          <label className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#c8614a]">03. Final Finish</label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {config?.frosting_types.map(f => (
                              <button key={f} type="button" onClick={() => updateFormData({ frosting: f })} className={`p-3 md:p-4 rounded-xl md:rounded-[16px] border-2 text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all ${formData.frosting === f ? 'border-[#c8614a] bg-[#c8614a]/5 text-[#c8614a]' : 'border-[#ede5dc] text-[#9c8878] hover:border-[#d4956a]'}`}>{f}</button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 4 && (
                      <div className="space-y-6 md:space-y-8 max-w-lg mx-auto animate-fade-in-up">
                        <div className="space-y-2 md:space-y-3">
                          <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#9c8878]">Decorative Theme / Message</label>
                          <textarea placeholder="e.g. 'Golden 30th', 'Pastel Florals'..." maxLength={100} value={formData.customMessage} onChange={e => updateFormData({ customMessage: e.target.value })} className="w-full bg-[#fdf8f4] border border-[#ede5dc] rounded-2xl md:rounded-[24px] p-4 md:p-6 outline-none focus:border-[#c8614a] min-h-[120px] md:min-h-[140px] text-sm leading-relaxed transition-colors" />
                        </div>
                        <div className="space-y-3 md:space-y-4">
                          <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#9c8878]">Dietary Requirements</label>
                          <div className="flex flex-wrap gap-2">
                            {config?.dietary_options.map(opt => (
                              <button key={opt} type="button" onClick={() => {
                                  const cur = formData.dietaryReqs;
                                  updateFormData({ dietaryReqs: cur.includes(opt) ? cur.filter(d => d !== opt) : [...cur, opt] });
                                }} className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all border-2 ${formData.dietaryReqs.includes(opt) ? 'border-[#c8614a] text-[#c8614a] bg-[#c8614a]/5' : 'border-[#ede5dc] text-[#9c8878] hover:border-[#d4956a]'}`}>{opt}</button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 5 && (
                      <div className="max-w-md mx-auto space-y-6 md:space-y-8 animate-fade-in-up">
                        <div className="flex bg-[#fdf8f4] p-1 rounded-full border border-[#ede5dc]">
                          <button type="button" onClick={() => setInspirationMode('upload')} className={`flex-1 py-2.5 md:py-3 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${inspirationMode === 'upload' ? 'bg-[#c8614a] text-white shadow-md' : 'text-[#9c8878] hover:text-[#c8614a]'}`}><ImageIcon size={14}/> Upload</button>
                          <button type="button" onClick={() => setInspirationMode('url')} className={`flex-1 py-2.5 md:py-3 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${inspirationMode === 'url' ? 'bg-[#c8614a] text-white shadow-md' : 'text-[#9c8878] hover:text-[#c8614a]'}`}><Globe size={14}/> Image URL</button>
                        </div>
                        {inspirationMode === 'upload' ? (
                          <div className="relative group">
                            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" id="inspiration-upload" />
                            <label htmlFor="inspiration-upload" className="flex flex-col items-center justify-center w-full h-48 md:h-56 border-2 border-dashed border-[#ede5dc] rounded-[32px] md:rounded-[40px] bg-[#fdf8f4] cursor-pointer hover:bg-[#ede5dc] transition-all overflow-hidden relative">
                              {formData.inspirationImage ? <img src={`data:${formData.inspirationMimeType};base64,${formData.inspirationImage}`} alt="Preview" className="w-full h-full object-cover" /> : <div className="flex flex-col items-center gap-2 md:gap-3 text-[#c8614a]"><ImageIcon size={32} /><span className="font-bold text-sm">Select Image</span><span className="text-[9px] md:text-[10px] text-[#9c8878] uppercase font-black tracking-widest">Max 2MB</span></div>}
                            </label>
                            {fileError && <p className="text-red-500 text-[9px] md:text-[10px] mt-2 text-center font-bold uppercase tracking-wider">{fileError}</p>}
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <input placeholder="Paste Image URL..." value={formData.inspirationUrl} onChange={e => updateFormData({ inspirationUrl: e.target.value, inspirationImage: null })} className="w-full bg-[#fdf8f4] border-b-2 border-[#ede5dc] py-4 outline-none focus:border-[#c8614a] px-2 text-sm transition-colors" />
                          </div>
                        )}
                      </div>
                    )}

                    {currentStep === 6 && (
                      <div className="max-w-md mx-auto space-y-6 md:space-y-8 animate-fade-in-up">
                        <input required placeholder="Full Name" value={formData.customerName} onChange={e => updateFormData({ customerName: e.target.value })} className="w-full bg-white border-b-2 border-[#ede5dc] py-4 md:py-5 outline-none focus:border-[#c8614a] px-2 text-base md:text-lg font-serif italic transition-colors" />
                        <input required type="email" placeholder="Email Address" value={formData.customerEmail} onChange={e => updateFormData({ customerEmail: e.target.value })} className="w-full bg-white border-b-2 border-[#ede5dc] py-4 md:py-5 outline-none focus:border-[#c8614a] px-2 text-base md:text-lg transition-colors" />
                        <input required type="tel" placeholder="Phone Number" value={formData.customerPhone} onChange={e => updateFormData({ customerPhone: e.target.value })} className="w-full bg-white border-b-2 border-[#ede5dc] py-4 md:py-5 outline-none focus:border-[#c8614a] px-2 text-base md:text-lg transition-colors" />
                      </div>
                    )}

                    {currentStep === 7 && (
                      <div className="max-w-md mx-auto space-y-8 md:space-y-10 animate-fade-in-up">
                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                          <button type="button" onClick={() => updateFormData({ deliveryMethod: 'pickup' })} className={`p-4 md:p-6 rounded-2xl md:rounded-[28px] border-2 transition-all ${formData.deliveryMethod === 'pickup' ? 'border-[#c8614a] bg-[#c8614a]/10' : 'border-[#ede5dc] hover:border-[#d4956a]'}`}>
                            <p className="font-bold text-xs md:text-sm uppercase tracking-widest text-[#2c1a0e]">Pickup</p><p className="text-[8px] md:text-[10px] text-[#9c8878] font-black uppercase tracking-tighter">Studio (Free)</p>
                          </button>
                          <button type="button" onClick={() => updateFormData({ deliveryMethod: 'delivery' })} className={`p-4 md:p-6 rounded-2xl md:rounded-[28px] border-2 transition-all ${formData.deliveryMethod === 'delivery' ? 'border-[#c8614a] bg-[#c8614a]/10' : 'border-[#ede5dc] hover:border-[#d4956a]'}`}>
                            <p className="font-bold text-xs md:text-sm uppercase tracking-widest text-[#2c1a0e]">Delivery</p><p className="text-[8px] md:text-[10px] text-[#9c8878] font-black uppercase tracking-tighter">+${config?.surcharges.delivery_fee}</p>
                          </button>
                        </div>
                        
                        {formData.deliveryMethod === 'delivery' && (
                          <div className="space-y-3 md:space-y-4 animate-fade-in-up">
                            <label className="text-[9px] md:text-[10px] uppercase font-black text-[#c8614a] px-2 tracking-[0.2em]">Delivery Address</label>
                            <textarea required placeholder="Full street address..." value={formData.deliveryAddress} onChange={e => updateFormData({ deliveryAddress: e.target.value })} className="w-full bg-[#fdf8f4] border border-[#ede5dc] rounded-xl md:rounded-[24px] p-4 md:p-5 outline-none focus:border-[#c8614a] text-sm h-24 md:h-32 transition-colors" />
                          </div>
                        )}

                        <div className="space-y-3 md:space-y-4">
                          <label className="text-[9px] md:text-[10px] uppercase font-black text-[#c8614a] px-2 tracking-[0.2em]">Required Date</label>
                          <input required type="date" min={new Date(new Date().setDate(new Date().getDate() + (config?.min_days_notice || 5))).toISOString().split('T')[0]} value={formData.deliveryDate} onChange={e => updateFormData({ deliveryDate: e.target.value })} className="w-full bg-[#fdf8f4] border-b-2 border-[#ede5dc] py-4 md:py-5 outline-none focus:border-[#c8614a] px-2 text-base md:text-lg transition-colors" />
                        </div>
                      </div>
                    )}

                    {currentStep === 8 && !orderSuccess && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start animate-fade-in-up">
                        <div className="bg-[#fdf8f4] p-6 md:p-10 rounded-[32px] md:rounded-[48px] border border-[#ede5dc] space-y-6 md:space-y-8">
                           <h4 className="font-serif italic text-xl md:text-2xl border-b border-[#ede5dc] pb-3 md:pb-4 text-[#2c1a0e]">Order Specifications</h4>
                           <div className="space-y-4 md:space-y-6 text-xs md:text-sm">
                              {summaryItems.map(item => (
                                <div key={item.label} className="summary-item">
                                  <span className="text-[7px] md:text-[8px] uppercase font-black text-[#9c8878] tracking-widest">{item.label}</span>
                                  <p className="font-bold text-[#c8614a]">{item.value}</p>
                                </div>
                              ))}
                              <div className="pt-4 md:pt-6 border-t border-[#ede5dc] flex justify-between items-center"><span className="font-serif text-2xl md:text-3xl italic text-[#2c1a0e]">Grand Total</span><span className="text-3xl md:text-4xl font-bold text-[#c8614a]">${calculateTotal()}</span></div>
                           </div>
                        </div>
                        <div className="space-y-6 md:space-y-8">
                           <div className="bg-[#fdf8f4] aspect-square rounded-[32px] md:rounded-[48px] border-2 border-dashed border-[#d4956a] flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden shadow-inner">
                              {aiLoading ? <div className="text-center animate-pulse"><Loader2 className="animate-spin text-[#c8614a] w-10 h-10 md:w-12 md:h-12 mx-auto" /><p className="text-[9px] md:text-[10px] text-[#9c8878] mt-3 md:mt-4 font-bold uppercase tracking-widest">Painting your dream...</p></div>
                                : mockupUrl ? <img src={mockupUrl} className="w-full h-full object-cover rounded-[24px] md:rounded-[32px] shadow-xl" alt="Cake Mockup" />
                                : <div className="text-center space-y-3 md:space-y-4">
                                    <Sparkles className="text-[#c8614a] w-8 h-8 md:w-10 md:h-10 mx-auto" />
                                    <button type="button" onClick={handleVisualize} className="bg-[#c8614a] text-white px-8 md:px-10 py-3 md:py-4 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest shadow-lg hover:bg-[#b04d38] transition-all">Generate Visual</button>
                                  </div>}
                           </div>
                           <button type="submit" disabled={submittingOrder} className="w-full bg-[#c8614a] text-white py-5 md:py-6 rounded-full font-bold uppercase tracking-widest text-[10px] md:text-xs shadow-2xl flex items-center justify-center gap-3 hover:bg-[#b04d38] hover:scale-[1.02] transition-all disabled:opacity-50">
                              {submittingOrder ? <Loader2 className="animate-spin" /> : <ShoppingCart size={18} />} Confirm My Order
                           </button>
                        </div>
                      </div>
                    )}
                  </div>
                  {!orderSuccess && (
                    <div className="mt-auto pt-10 flex gap-6">
                      {currentStep > 1 && (
                        <button type="button" onClick={() => setCurrentStep(prev => prev - 1)} className="flex-1 border-2 border-[#ede5dc] text-[#9c8878] py-5 rounded-full font-bold uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:border-[#c8614a] hover:text-[#c8614a] transition-all">
                          <ChevronLeft size={16} /> Back
                        </button>
                      )}
                      {currentStep < 8 && (
                        <button type="button" onClick={() => setCurrentStep(prev => prev + 1)} disabled={
                          (currentStep === 1 && !formData.selectedCakeType) ||
                          (currentStep === 2 && !formData.selectedSize) ||
                          (currentStep === 6 && (!formData.customerName || !formData.customerEmail || !formData.customerPhone)) ||
                          (currentStep === 7 && (!formData.deliveryMethod || !formData.deliveryDate))
                        } className="flex-[2] bg-[#c8614a] text-white py-5 rounded-full font-bold uppercase text-[10px] tracking-[0.2em] shadow-2xl flex items-center justify-center gap-4 transition-all hover:scale-[1.02] disabled:opacity-50">
                          Continue <ArrowRight size={16} />
                        </button>
                      )}
                    </div>
                  )}
                  {orderSuccess && (
                    <div className="flex flex-col items-center justify-center h-full py-24 text-center space-y-10 animate-fade-in">
                      <div className="w-32 h-32 bg-[#c8614a] rounded-full flex items-center justify-center shadow-2xl animate-bounce"><Check size={64} className="text-white draw-check" /></div>
                      <div className="space-y-6"><h3 className="text-6xl text-[#c8614a] font-serif italic">Bespoke Order Sent.</h3><p className="text-[#9c8878] max-w-sm mx-auto text-xl font-light">Expect a confirmation call within 24 hours.</p></div>
                      <button onClick={() => { setOrderSuccess(false); setCurrentStep(1); setFormData(INITIAL_FORM_DATA); setMockupUrl(null); setOrderModalOpen(false); }} className="text-[#c8614a] font-black uppercase text-xs tracking-[0.3em] border-b-2 border-[#c8614a]/20 hover:border-[#c8614a] transition-all pb-2">Return to Lookbook</button>
                    </div>
                  )}
               </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
