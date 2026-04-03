import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MapPin, CheckCircle, ChevronDown, Facebook, Instagram, Linkedin, Youtube, Twitter, Star, Calendar, ChevronLeft, ChevronRight, Cpu, GitMerge, Monitor, Activity, Quote } from 'lucide-react';

const FadeUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string, key?: React.Key }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.411.001 12.045c0 2.121.54 4.192 1.562 6.027L0 24l6.105-1.602a11.832 11.832 0 005.937 1.598h.005c6.637 0 12.05-5.411 12.053-12.044a11.83 11.83 0 00-3.539-8.513z"/>
  </svg>
);

const CustomSelect = ({ 
  label, 
  value, 
  onChange, 
  options, 
  id 
}: { 
  label: string, 
  value: string, 
  onChange: (val: string) => void, 
  options: string[],
  id: string
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative mb-6 shrink-0 w-full" ref={containerRef} id={id}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full pt-5 pb-2 px-4 border-b border-[var(--color-text-muted)]/30 bg-transparent text-[16px] text-[var(--color-text-dark)] focus:outline-none cursor-pointer flex justify-between items-center group transition-all"
      >
        <span className={`${!value ? 'text-[var(--color-text-muted)]' : 'text-[var(--color-text-dark)]'}`}>
          {value || " "}
        </span>
        <label className={`absolute left-4 transition-all pointer-events-none ${value ? 'top-1 text-[11px] font-medium text-[var(--color-pink)] tracking-wider' : 'top-4 text-[16px] text-[var(--color-text-muted)]'}`}>
          {label}
        </label>
        <ChevronDown className={`w-4 h-4 text-[var(--color-pink)] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.12)] border border-[var(--color-gold)]/20 overflow-hidden z-[100]"
          >
            <div className="max-h-[220px] overflow-y-auto py-2 custom-scrollbar">
              {options.map((opt, i) => (
                <div 
                  key={i}
                  onClick={() => { onChange(opt); setIsOpen(false); }}
                  className={`px-5 py-3 text-[15px] cursor-pointer transition-colors ${value === opt ? 'bg-[var(--color-pink)]/10 text-[var(--color-pink)] font-medium' : 'hover:bg-gray-50 text-[var(--color-text-dark)]'}`}
                >
                  {opt}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};



const scrollToBooking = (e?: React.MouseEvent) => {
  if (e) e.preventDefault();
  const el = document.getElementById('booking-form');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-4 md:px-12 py-3 md:py-4 flex justify-between items-center ${scrolled ? 'bg-white/80 backdrop-blur-[12px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] border-b border-[var(--color-gold)]/10' : 'bg-transparent'}`}>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <img src="/assets/images/Naruvi_logo_original.png" alt="Naruvi Logo" className="h-[35px] md:h-14 w-auto" />
      </div>
      <div className="flex items-center gap-1.5 md:gap-4 shrink-0">
        <a href="tel:+914166661111" className="hidden md:inline-flex items-center gap-2 text-[18px] font-bold text-[var(--color-navy)] hover:text-[var(--color-pink)] transition-all">
          <Phone className="w-5 h-5 text-[var(--color-pink)]" /> +91 416 666 1111
        </a>
        <button onClick={scrollToBooking} className="bg-gradient-to-br from-[var(--color-pink)] to-[var(--color-pink-hover)] text-white px-3.5 py-1.5 md:px-6 md:py-2.5 rounded-full text-[11px] md:text-sm font-medium hover:scale-105 hover:shadow-[0_8px_20px_rgba(212,83,128,0.3)] transition-all whitespace-nowrap">
          <span className="md:hidden">Book Now</span>
          <span className="hidden md:inline">Book a Heart Consultation</span>
        </button>
      </div>
    </header>
  );
};

const HeroCarousel = () => {
  const images = [
    "/assets/Hero Images/DJI_0017.jpg",
    "/assets/Hero Images/09 Reception - 2.jpg",
    "/assets/Hero Images/DSC04971.jpg",
    "/assets/Hero Images/File 3.jpg"
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[240px] sm:h-[300px] md:h-[600px] bg-[var(--color-navy)] overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.img
          key={index}
          src={images[index]}
          alt={`Naruvi Hospital Hero ${index + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          referrerPolicy="no-referrer"
        />
      </AnimatePresence>
      
      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)]/60 via-transparent to-transparent z-10"></div>
      
      {/* Indicator Dots */}
      <div className="absolute bottom-4 md:bottom-32 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === index ? 'w-8 bg-[var(--color-pink)]' : 'bg-white/40 hover:bg-white/60'}`}
          />
        ))}
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-24 md:pt-28 pb-10 md:pb-16 px-6 md:px-12 min-h-screen flex flex-col md:flex-row items-center justify-between">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-r from-[var(--color-pink)] to-[#FAD4E4] opacity-[55%] blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-l from-[var(--color-pink)] to-transparent opacity-50 blur-[100px]"></div>
      </div>
      <svg className="absolute -top-[10%] -right-[5%] w-[600px] h-[600px] opacity-10 pointer-events-none z-0" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="var(--color-pink)" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.3,-46.3C90.8,-33.5,96.8,-18.1,97.2,-2.5C97.6,13.1,92.4,29,82.8,42.1C73.2,55.2,59.2,65.5,44.2,72.6C29.2,79.7,13.2,83.6,-2.4,87.6C-18,91.6,-33.2,95.7,-46.8,90.5C-60.4,85.3,-72.4,70.8,-80.6,55.1C-88.8,39.4,-93.2,22.5,-92.8,6.2C-92.4,-10.1,-87.2,-25.8,-78.3,-39.2C-69.4,-52.6,-56.8,-63.7,-42.8,-71.1C-28.8,-78.5,-13.4,-82.2,1.5,-84.8C16.4,-87.4,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
      </svg>

      <div className="w-full md:w-[55%] relative z-10 pr-0 md:pr-10 mb-8 md:mb-0 text-center md:text-left">
        <FadeUp>
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-8">
            <span className="px-3 py-1 rounded-full text-[10px] md:text-[11px] font-medium tracking-wider uppercase bg-[var(--color-navy)] text-white">NABH Accredited</span>
            <span className="w-1 h-1 bg-[var(--color-gold)] rounded-full hidden md:block opacity-50"></span>
            <span className="px-3 py-1 rounded-full text-[10px] md:text-[11px] font-medium tracking-wider uppercase text-[var(--color-navy)] border border-[var(--color-gold)]/40">475+ Beds</span>
            <span className="w-1 h-1 bg-[var(--color-gold)] rounded-full hidden md:block opacity-50"></span>
            <span className="px-3 py-1 rounded-full text-[10px] md:text-[11px] font-medium tracking-wider uppercase text-[var(--color-navy)] border border-[var(--color-gold)]/40">25+ Specialties</span>
            <span className="w-1 h-1 bg-[var(--color-gold)] rounded-full hidden md:block opacity-50"></span>
            <span className="px-3 py-1 rounded-full text-[10px] md:text-[11px] font-medium tracking-wider uppercase text-[var(--color-navy)] border border-[var(--color-gold)]/40">#6 Best Multispeciality Emerging Hospital PAN India</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-medium text-[var(--color-navy)] leading-[1.15] mb-6">
            Your Heart Deserves<br/>
            <span className="text-[var(--color-pink)]">the Very Best Care.</span>
          </h1>
          
          <p className="text-sm md:text-lg text-[var(--color-text-muted)] mb-8 md:mb-12 max-w-[95%] mx-auto md:mx-0 leading-relaxed">
            At Naruvi, our cardiology team combines world-class expertise with genuinely compassionate care. Right here in Vellore.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-5 justify-center md:justify-start">
            <button onClick={scrollToBooking} className="bg-gradient-to-br from-[var(--color-pink)] to-[var(--color-pink-hover)] text-white px-8 py-3.5 rounded-full font-medium hover:scale-105 hover:shadow-[0_8px_20px_rgba(212,83,128,0.3)] transition-all text-center w-full sm:w-auto">
              Book a Heart Consultation &rarr;
            </button>
            <span className="text-sm text-[var(--color-text-muted)]">or WhatsApp us directly: <a href="https://wa.me/918754047748" target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--color-navy)] hover:text-[var(--color-pink)] transition-colors">+91 87540 47748</a></span>
          </div>
        </FadeUp>
      </div>

      <div className="w-full md:w-[45%] relative z-10">
        <FadeUp delay={0.2}>
          <div className="relative w-full rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(26,42,74,0.15)] mt-8 md:mt-0 border border-white/20">
            <HeroCarousel />
            
            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 bg-[var(--color-navy)]/50 backdrop-blur-[16px] text-[var(--color-cream)] p-4 md:p-5 rounded-2xl grid grid-cols-3 divide-x divide-white/20 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-50">
              <div className="text-center px-1">
                <div className="text-xl md:text-2xl font-medium text-[var(--color-pink)] leading-tight">5,000+</div>
                <div className="text-[9px] md:text-[11px] font-light uppercase tracking-wider opacity-80 mt-1">Cardiac Interventions</div>
              </div>
              <div className="text-center px-1">
                <div className="text-xl md:text-2xl font-medium text-[var(--color-pink)] leading-tight">3,000+</div>
                <div className="text-[9px] md:text-[11px] font-light uppercase tracking-wider opacity-80 mt-1">Heart Surgeries</div>
              </div>
              <div className="text-center px-1">
                <div className="text-xl md:text-2xl font-medium text-[var(--color-pink)] leading-tight">24/7</div>
                <div className="text-[9px] md:text-[11px] font-light uppercase tracking-wider opacity-80 mt-1">Cardiac Care</div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

const Doctors = () => {
  const docs = [
    { 
      name: "Dr. V. Jacob Jose", 
      spec: "MD, DM, MS, FCCP, FACC, FIAE, FCSI, FASE", 
      image: "/assets/images/MS_Dr_Jacob_Jose.jpg" 
    },
    { 
      name: "Dr. Bala Vignesh S", 
      spec: "MBBS, MD, DM", 
      image: "/assets/images/Dr_Balavignesh.jpg" 
    },
    { 
      name: "Dr. Vinayak Shukla", 
      spec: "MBBS, MS, M.Ch, DNB", 
      image: "/assets/images/Dr_Vinayak.jpg" 
    },
    { 
      name: "Dr. Ray George", 
      spec: "MBBS, MS, MRCS, Mch (Cth), DNB (Cth)", 
      image: "/assets/images/Dr_Ray_George.jpg" 
    }
  ];

  return (
    <section className="relative py-10 md:py-20 px-6 md:px-12 text-center">
      <FadeUp className="mb-12 md:mb-20 relative z-10">
        <h2 className="text-3xl md:text-5xl font-medium text-[var(--color-navy)] mb-4 tracking-tight">Our Clinical Experts</h2>
        <div className="w-24 h-1 bg-[var(--color-pink)] mx-auto rounded-full"></div>
      </FadeUp>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto relative z-10 px-4">
        {docs.map((doc, i) => (
          <FadeUp key={i} delay={i * 0.2} className="w-full max-w-[320px] relative mt-6 md:mt-12 mx-auto">
            {/* Decorative corner leaf */}
            <div className="absolute top-0 right-0 w-16 h-16 z-0 pointer-events-none translate-x-[40%] -translate-y-[40%]">
              <img src="/assets/images/leaf-naruvi-pink.svg" alt="" className="w-full h-full object-contain" />
            </div>
            <div className="group flex flex-col h-full bg-white rounded-[40px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-700 hover:shadow-[0_25px_50px_rgba(242,128,166,0.2)] hover:-translate-y-1 relative z-10">
              
              {/* Single cohesive card containing Image + Details */}
              <div className="relative w-full aspect-[4/5]">
                <img 
                  src={doc.image} 
                  alt={doc.name} 
                  className="w-full h-full object-cover block" 
                />
              </div>
              
              <div className="bg-[var(--color-pink)]/85 backdrop-blur-[12px] p-5 md:p-6 text-left flex-grow -mt-px relative z-10">
                <h3 className="text-white text-lg md:text-2xl font-semibold mb-2 tracking-tight leading-tight">{doc.name}</h3>
                <p className="text-white/95 text-xs md:text-sm leading-relaxed font-light opacity-90 max-w-[90%]">
                  {doc.spec}
                </p>
              </div>

            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
};

const HowItWorks = () => {
  return (
    <section className="relative py-10 md:py-16 px-6 md:px-12 text-center">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[80%] h-[80%] rounded-full bg-gradient-to-b from-[var(--color-pink)] to-transparent opacity-40 blur-[100px]"></div>
      </div>
      <FadeUp className="relative z-10">
        <span className="text-[var(--color-pink)] text-[11px] font-medium tracking-wider uppercase mb-3 block">The Naruvi Way</span>
        <h2 className="text-2xl md:text-4xl font-medium text-[var(--color-navy)] mb-10 md:mb-16 max-w-2xl mx-auto px-4">Priority cardiac care, simplified.</h2>
      </FadeUp>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row justify-between gap-10 md:gap-0 mb-16">
        <div className="hidden md:block absolute top-[30px] left-[10%] right-[10%] h-px border-t-2 border-dashed border-[var(--color-gold)] opacity-50 z-0"></div>
        
        {[
          { num: 1, title: "Fill the form", desc: "Share your symptoms securely." },
          { num: 2, title: "30-min Callback", desc: "Coordinator calls to confirm your slot." },
          { num: 3, title: "Meet Specialist", desc: "World-class consultation at our campus." }
        ].map((step, i) => (
          <FadeUp key={i} delay={i * 0.2} className="relative z-10 w-full md:w-[30%] flex flex-col items-center">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-[var(--color-pink)] text-white rounded-full flex items-center justify-center text-xl md:text-2xl font-medium mb-4 md:mb-6 shadow-[0_0_0_8px_var(--color-cream)] md:shadow-[0_0_0_10px_var(--color-cream)]">
              {step.num}
            </div>
            <h3 className="text-base md:text-lg font-medium text-[var(--color-navy)] mb-2 md:mb-3">{step.title}</h3>
            <p className="text-[13px] md:text-[15px] text-[var(--color-text-muted)] max-w-[250px] md:max-w-none">{step.desc}</p>
          </FadeUp>
        ))}
      </div>

      <FadeUp delay={0.6} className="relative z-10">
        <button onClick={scrollToBooking} className="bg-gradient-to-br from-[var(--color-pink)] to-[var(--color-pink-hover)] text-white px-7 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-base font-medium hover:scale-105 hover:shadow-[0_8px_20px_rgba(212,83,128,0.3)] transition-all inline-block">
          Book My Consultation &rarr;
        </button>
      </FadeUp>
    </section>
  );
};

const AppointmentForm = ({ 
  specialty, 
  setSpecialty
}: { 
  specialty: string, 
  setSpecialty: (val: string) => void
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [place, setPlace] = useState('');
  const [errors, setErrors] = useState({ name: false, mobile: false });

  const specialties = [
    "Chest Pain / Angina",
    "Palpitations / Irregular Heartbeat",
    "Shortness of Breath",
    "High Blood Pressure",
    "Second Opinion for Surgery",
    "Routine Heart Checkup",
    "Other"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { name: false, mobile: false };

    if (!name.trim()) {
      newErrors.name = true;
      valid = false;
    }
    if (!mobile.trim() || !/^\d{10}$/.test(mobile.trim())) {
      newErrors.mobile = true;
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      setSubmitted(true);
      window.history.pushState(null, '', '/appointment-booked');
    }
  };

  return (
    <section id="booking-form" className="relative py-10 md:py-16 px-6 md:px-12 flex justify-center">
      <FadeUp className="relative z-10 w-full max-w-3xl mt-10 md:mt-12">
        {/* Decorative corner leaf */}
        <div className="absolute top-0 right-0 w-28 h-28 z-0 pointer-events-none translate-x-[40%] -translate-y-[40%]">
          <img src="/assets/images/leaf-naruvi-pink.svg" alt="" className="w-full h-full object-contain" />
        </div>
        <div className="bg-white/70 backdrop-blur-[20px] rounded-[24px] md:rounded-[32px] border border-[var(--color-pink)]/25 p-5 md:p-12 shadow-[0_30px_60px_rgba(26,42,74,0.08)] relative overflow-visible z-10">
          {!submitted ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="text-center mb-6 md:mb-10">
                <span className="text-[var(--color-pink)] text-[10px] md:text-[11px] font-medium tracking-wider uppercase mb-3 md:mb-4 block">Get Started</span>
                <h2 className="text-2xl md:text-3xl font-medium text-[var(--color-navy)] inline-block relative mb-4">
                  Book a Heart Consultation
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-12 md:w-16 h-1 bg-[var(--color-pink)] rounded-full"></div>
                </h2>
                <p className="text-sm text-[var(--color-text-muted)] mt-4 max-w-[90%] mx-auto">Our cardiac coordinator will reach you within 30 minutes during working hours.</p>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative mb-6">
                    <input 
                      type="text" 
                      id="fullName" 
                      value={name}
                      onChange={(e) => { setName(e.target.value); setErrors({...errors, name: false}); }}
                      className={`w-full pt-5 pb-2 px-4 border-b ${errors.name ? 'border-[var(--color-pink)]' : 'border-[var(--color-text-muted)]/30'} bg-transparent text-[16px] text-[var(--color-text-dark)] focus:outline-none focus:border-[var(--color-pink)] focus:bg-[var(--color-pink)]/5 transition-all peer`}
                      placeholder=" "
                    />
                    <label htmlFor="fullName" className={`absolute left-4 transition-all pointer-events-none ${name ? 'top-1 text-[11px] font-medium text-[var(--color-pink)] tracking-wider' : 'top-4 text-[16px] text-[var(--color-text-muted)]'} peer-focus:top-1 peer-focus:text-[11px] peer-focus:font-medium peer-focus:text-[var(--color-pink)] peer-focus:tracking-wider`}>
                      Full Name *
                    </label>
                    {errors.name && <div className="absolute left-4 bottom-[-18px] text-[var(--color-pink)] text-[10px] uppercase font-bold tracking-tight">Required</div>}
                  </div>

                  <div className="relative mb-6">
                    <input 
                      type="tel" 
                      id="mobile" 
                      value={mobile}
                      onChange={(e) => { setMobile(e.target.value); setErrors({...errors, mobile: false}); }}
                      className={`w-full pt-5 pb-2 pl-[3rem] pr-4 border-b ${errors.mobile ? 'border-[var(--color-pink)]' : 'border-[var(--color-text-muted)]/30'} bg-transparent text-[16px] text-[var(--color-text-dark)] focus:outline-none focus:border-[var(--color-pink)] focus:bg-[var(--color-pink)]/5 transition-all peer`}
                      placeholder=" "
                      maxLength={10}
                    />
                    <span className={`absolute left-4 top-[22px] transition-all duration-300 font-medium text-[var(--color-text-dark)] pointer-events-none z-10 ${mobile ? 'opacity-100' : 'opacity-0 peer-focus:opacity-100'}`}>
                      +91
                    </span>
                    <label htmlFor="mobile" className={`absolute transition-all pointer-events-none ${mobile ? 'left-4 top-1 text-[11px] font-medium text-[var(--color-pink)] tracking-wider' : 'left-4 top-4 text-[16px] text-[var(--color-text-muted)]'} peer-focus:top-1 peer-focus:text-[11px] peer-focus:font-medium peer-focus:text-[var(--color-pink)] peer-focus:tracking-wider`}>
                      Mobile Number *
                    </label>
                    {errors.mobile && <div className="absolute left-4 bottom-[-18px] text-[var(--color-pink)] text-[10px] uppercase font-bold tracking-tight">Invalid Mobile Number</div>}
                  </div>

                  <div className="relative mb-6">
                    <input 
                      type="email" 
                      id="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pt-5 pb-2 px-4 border-b border-[var(--color-text-muted)]/30 bg-transparent text-[16px] text-[var(--color-text-dark)] focus:outline-none focus:border-[var(--color-pink)] focus:bg-[var(--color-pink)]/5 transition-all peer"
                      placeholder=" "
                    />
                    <label htmlFor="email" className={`absolute left-4 transition-all pointer-events-none ${email ? 'top-1 text-[11px] font-medium text-[var(--color-pink)] tracking-wider' : 'top-4 text-[16px] text-[var(--color-text-muted)]'} peer-focus:top-1 peer-focus:text-[11px] peer-focus:font-medium peer-focus:text-[var(--color-pink)] peer-focus:tracking-wider`}>
                      Email Address
                    </label>
                  </div>

                  <div className="relative mb-6">
                    <input 
                      type="text" 
                      id="place" 
                      value={place}
                      onChange={(e) => setPlace(e.target.value)}
                      className="w-full pt-5 pb-2 px-4 border-b border-[var(--color-text-muted)]/30 bg-transparent text-[16px] text-[var(--color-text-dark)] focus:outline-none focus:border-[var(--color-pink)] focus:bg-[var(--color-pink)]/5 transition-all peer"
                      placeholder=" "
                    />
                    <label htmlFor="place" className={`absolute left-4 transition-all pointer-events-none ${place ? 'top-1 text-[11px] font-medium text-[var(--color-pink)] tracking-wider' : 'top-4 text-[16px] text-[var(--color-text-muted)]'} peer-focus:top-1 peer-focus:text-[11px] peer-focus:font-medium peer-focus:text-[var(--color-pink)] peer-focus:tracking-wider`}>
                      Place / Area
                    </label>
                  </div>

                  <div className="md:col-span-2">
                    <CustomSelect 
                      id="specialty"
                      label="Area of Concern"
                      value={specialty}
                      onChange={setSpecialty}
                      options={specialties}
                    />
                  </div>
                </div>

                <button type="submit" className="w-full mt-6 md:mt-8 bg-gradient-to-br from-[var(--color-pink)] to-[var(--color-pink-hover)] text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-medium text-base md:text-lg hover:scale-105 hover:shadow-[0_8px_20px_rgba(212,83,128,0.3)] transition-all">
                  Book My Consultation &rarr;
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-10 bg-white/40 backdrop-blur-[20px] rounded-[32px] p-8 mt-12 border border-[var(--color-pink)]/25">
              <div className="w-20 h-20 bg-[var(--color-pink)]/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-10 h-10 text-[var(--color-pink)]" />
              </div>
              <h2 className="text-3xl font-medium text-[var(--color-navy)] mb-4">You're all set, {name.split(' ')[0]}!</h2>
              <p className="text-lg text-[var(--color-text-muted)] mb-10">
                Our cardiac care coordinator will call you at +91 {mobile} within 30 minutes.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <button className="px-6 py-3 border border-[var(--color-navy)] text-[var(--color-navy)] rounded-full font-medium hover:bg-[var(--color-navy)]/5 transition-colors">
                  Add to Calendar
                </button>
                <a href="https://wa.me/918754047748" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-gradient-to-br from-[var(--color-pink)] to-[var(--color-pink-hover)] text-white rounded-full font-medium hover:scale-105 transition-all shadow-md">
                  WhatsApp Us Now: +91 87540 47748
                </a>
              </div>
              <p className="text-sm text-[var(--color-pink)] font-medium bg-[var(--color-pink)]/5 py-3 px-6 rounded-lg inline-block">
                If this is a medical emergency, please visit the nearest ER immediately.
              </p>
            </motion.div>
          )}

        </div>
      </FadeUp>
    </section>
  );
};

const ConditionsWeTreat = ({ setSpecialty }: { setSpecialty: (val: string) => void }) => {
  const conditions = [
    "Coronary Artery Disease", "Heart Attack (MI)", "Heart Failure", "Arrhythmia (Irregular Heartbeat)", 
    "Valvular Heart Disease", "Congenital Heart Defects", "Aortic Aneurysm", "Peripheral Artery Disease", 
    "High Blood Pressure", "High Cholesterol"
  ];

  return (
    <section className="relative py-10 md:py-16 px-6 md:px-12 text-center">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[40%] h-[60%] rounded-full bg-gradient-to-r from-[var(--color-pink)] to-transparent opacity-40 blur-[120px]"></div>
      </div>
      <FadeUp className="relative z-10">
        <span className="text-[var(--color-pink)] text-[11px] font-medium tracking-wider uppercase mb-4 block">Conditions We Treat</span>
        <h2 className="text-3xl md:text-4xl font-medium text-[var(--color-navy)] mb-12 max-w-4xl mx-auto">Every heart condition has an answer.</h2>
      </FadeUp>

      <FadeUp delay={0.2} className="relative z-10">
        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto mb-12">
          {conditions.map((condition, i) => (
            <button 
              key={i}
              onClick={() => {
                setSpecialty(condition);
                scrollToBooking();
              }}
              className="px-4 py-2 md:px-6 md:py-2.5 bg-[var(--color-cream)] border border-[var(--color-gold)] rounded-full text-sm md:text-[15px] text-[var(--color-navy)] hover:bg-[var(--color-pink)] hover:text-white hover:border-[var(--color-pink)] transition-all"
            >
              {condition}
            </button>
          ))}
        </div>
      </FadeUp>

      <FadeUp delay={0.4} className="relative z-10">
        <button onClick={scrollToBooking} className="text-[var(--color-pink)] font-medium inline-flex items-center gap-2 hover:gap-3 transition-all">
          Not sure what you need? Describe your symptoms in the form — we'll guide you &rarr;
        </button>
      </FadeUp>
    </section>
  );
};

const Technology = () => {
  const techList = [
    { 
      title: "Advanced GE Innova TM IGS 5 Series", 
      desc: "For ultra-precise imaging during complex interventions.",
      icon: <Cpu className="w-6 h-6 text-[var(--color-pink)]" />
    },
    { 
      title: "Robotised Hybrid Cath Lab", 
      desc: "Asia's first, combining surgical and catheter-based capabilities.",
      icon: <GitMerge className="w-6 h-6 text-[var(--color-pink)]" />
    },
    { 
      title: "GE Vivid E95 Premium 4D", 
      desc: "Cardiac ultrasound for unparalleled diagnostic clarity.",
      icon: <Monitor className="w-6 h-6 text-[var(--color-pink)]" />
    },
    { 
      title: "Dedicated Coronary Care Unit", 
      desc: "24/7 intensive monitoring for critical cardiac patients.",
      icon: <Activity className="w-6 h-6 text-[var(--color-pink)]" />
    }
  ];

  return (
    <section className="relative py-12 md:py-20 px-6 md:px-12 text-center">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[60%] rounded-full bg-gradient-to-l from-[var(--color-pink)] to-transparent opacity-40 blur-[120px]"></div>
      </div>
      <FadeUp className="relative z-10 mb-12 md:mb-20">
        <span className="text-[var(--color-pink)] text-[11px] font-medium tracking-wider uppercase mb-3 block">Our Cardiac Technology</span>
        <h2 className="text-2xl md:text-5xl font-medium text-[var(--color-navy)] mb-4 md:mb-6 max-w-4xl mx-auto px-4">World-class tech for a healthy heart</h2>
        <p className="text-sm md:text-base text-[var(--color-text-muted)] max-w-2xl mx-auto px-4 leading-relaxed">Precision diagnosis and faster recovery powered by the most advanced medical tech.</p>
      </FadeUp>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto relative z-10">
        {techList.map((tech, i) => (
          <FadeUp key={i} delay={i * 0.1}>
            <div className="group relative h-full bg-white/40 backdrop-blur-[16px] border border-[var(--color-gold)]/30 rounded-[28px] md:rounded-[32px] p-6 md:p-10 text-left transition-all duration-500 hover:border-[var(--color-pink)]/40 hover:shadow-[0_20px_50px_rgba(242,128,166,0.12)] hover:-translate-y-2">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-sm group-hover:bg-[var(--color-pink)]/5 transition-colors">
                {tech.icon}
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-navy)] mb-4 leading-tight">{tech.title}</h3>
              <p className="text-[15px] text-[var(--color-text-muted)] leading-relaxed">{tech.desc}</p>
              

            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    {
      text: "Consulted Cardiologist Dr. Bala vignesh sir, his diagnosis is good. When compare to previous visit, now naruvi has changed so much with the service. Excellent care and Guidance of staffs. Food is excellent and hygiene. Staffs also very hospitality and facilities also super. Getting so better now. Will well recommend naruvi with my colleagues and neighbors.",
      author: "Thiru",
      initials: "TH"
    },
    {
      text: "Naruvi hospital is the best hospital for cardiology in Vellore. Dr Bala Vignesh is a nice doctor. He done angio for my father. He save my father Life. Thank u so much doctor you not only save my father Life you save my whole family 🙏🙏🙏🙏🙏",
      author: "Kalai Vani",
      initials: "KV"
    },
    {
      text: "Consulting Dr. Bala vignesh for cardio problem, excellent service of him. Hospital facilities are good and patient care is good.",
      author: "Sindhubalamurugan",
      initials: "SB"
    },
    {
      text: "Naruvi I came this first time icu staffs and security was very kind behaving very good response dr. Bala Vignesh very good doctor",
      author: "Yuvaraj",
      initials: "YU"
    },
    {
      text: "Consulting Cardiologist Dr. Bala vignesh sir treatment service is good. Hospitality of staffs are excellent. Highly qualified doctors and responsive nursing care.",
      author: "Sailaja Sathish",
      initials: "SS"
    },
    {
      text: "We visited Naruvi and consulted ortho Dr. Manoharan and cardiovascular surgeon Dr. Ray George. Their consultation is good and explained each and everything clearly. Staffs also polite and respectful. Nursing staffs took good care and doctors also visiting every 2 times of the day. Food quality also good. Overall service in Naruvi is excellent and satisfied.",
      author: "Sangamik Mithra",
      initials: "SM"
    },
    {
      text: "Cardiology Dr. Bala Vignesh consultation is good. While in admission doctor visited often and nurses took good care and attentive towards the patient. Monitoring the patient on time. Good service from from staff side and hospitality is excellent.",
      author: "Beplab Pal",
      initials: "BP"
    },
    {
      text: "Cardiologist Dr Jacob jose sir consultation is good, we have been consulting him from past few years such a humble and good doctor. Dr. Aravindan Nair doctor is such a kind doctor. He is god to us. Service of him is excellent.",
      author: "Prasenjit Paira",
      initials: "PP"
    }
  ];

  return (
    <section className="relative py-10 md:py-16 text-center overflow-hidden" id="testimonials">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-[var(--color-pink)] to-transparent opacity-40 blur-[120px]"></div>
      </div>
      
      <FadeUp className="relative z-10 mb-12 md:mb-20 px-6 md:px-12">
        <span className="text-[var(--color-pink)] text-[11px] font-medium tracking-wider uppercase mb-3 block">Patient Stories</span>
        <h2 className="text-2xl md:text-5xl font-medium text-[var(--color-navy)] mb-4 md:mb-6 px-4">Hearts that beat because of Naruvi.</h2>
        <div className="flex items-center justify-center gap-3 text-xs md:text-sm font-medium text-[var(--color-text-muted)]">
          <div className="flex text-[var(--color-gold)]">
            {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
          </div>
          <span className="w-1 h-1 bg-[var(--color-text-muted)] opacity-30 rounded-full"></span>
          <span>4.5/5 on Google Reviews</span>
        </div>
      </FadeUp>

      <div className="relative z-10 flex overflow-hidden py-10 group">
        <motion.div 
          className="flex gap-6 px-4 md:gap-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 80, 
            repeat: Infinity, 
            ease: "linear"
          }}
        >
          {[...reviews, ...reviews].map((review, i) => (
            <div 
              key={i} 
              className="w-[300px] md:w-[450px] flex-shrink-0 relative bg-white/40 backdrop-blur-[20px] border border-[var(--color-gold)]/30 rounded-[32px] md:rounded-[40px] p-6 md:p-10 text-left h-full flex flex-col transition-all duration-500 hover:shadow-[0_25px_60px_rgba(242,128,166,0.1)] hover:-translate-y-2"
            >
              <div className="absolute top-6 right-6 md:top-10 md:right-10 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-8 h-8 md:w-12 md:h-12 text-[var(--color-pink)]" />
              </div>
              
              <div className="flex text-[var(--color-gold)] mb-4 md:mb-8">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 md:w-4 md:h-4 fill-current" />)}
              </div>
              
              <p className="text-[14px] md:text-[17px] leading-relaxed md:leading-[1.8] text-[var(--color-text-dark)] font-light mb-6 md:mb-10 flex-grow relative z-10 italic">
                "{review.text}"
              </p>
              
              <div className="flex items-center gap-3 md:gap-4 pt-4 md:pt-6 border-t border-[var(--color-gold)]/10 mt-auto">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[var(--color-navy)] to-[var(--color-navy-dark)] text-white flex items-center justify-center text-xs md:text-sm font-semibold shadow-md shrink-0">
                  {review.initials}
                </div>
                <div>
                  <h4 className="text-sm md:text-base font-semibold text-[var(--color-navy)] leading-tight">{review.author}</h4>
                  <p className="text-[10px] md:text-[12px] uppercase tracking-wide text-[var(--color-text-muted)] opacity-70 mt-1">Verified Patient</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="relative bg-[var(--color-navy-dark)] text-[var(--color-cream)] pt-10 md:pt-16 pb-6 md:pb-8 px-6 md:px-12 mt-6 md:mt-0">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--color-gold)]/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--color-pink)]/5 blur-[120px]"></div>
      </div>
      
      {/* Integrated Location / Map Section */}
      <div className="max-w-7xl mx-auto relative z-10 mb-8 md:mb-10 mt-6 md:mt-8">

        <div className="flex flex-col md:flex-row gap-12 items-center bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-12 relative overflow-hidden backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-10">
          <div className="w-full md:w-1/2">
          <span className="text-[var(--color-gold)] text-[11px] font-medium tracking-wider uppercase mb-4 block">Location</span>
          <h2 className="text-3xl md:text-4xl font-medium mb-8">Find us in Vellore.</h2>
          
          <div className="mb-10">
            <h3 className="text-xl font-medium text-[var(--color-cream)] mb-3">Naruvi Hospitals</h3>
            <p className="text-sm text-[#8A9BBF] mb-2 leading-relaxed max-w-sm">
              12, Bangalore-Chennai National Highway,<br/>Vellore, Tamil Nadu 632004
            </p>
            <div className="flex flex-col gap-3 mt-6 text-[var(--color-gold)]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--color-gold)]/10 flex items-center justify-center">
                  <WhatsAppIcon className="w-4 h-4" />
                </div>
                <a href="https://wa.me/918754047748" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-white transition-colors">WhatsApp: +91 87540 47748</a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--color-gold)]/10 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <a href="tel:+914166661111" className="text-sm hover:text-white transition-colors">Call: +91 416 666 1111</a>
              </div>
            </div>
          </div>

          <a 
            href="https://maps.app.goo.gl/NNpUWXiAGG5AbSng9" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block px-8 py-3 bg-[var(--color-gold)] text-[var(--color-navy-dark)] rounded-full text-sm font-medium hover:bg-white transition-colors shadow-lg"
          >
            Get Directions
          </a>
        </div>

        <div className="w-full md:w-1/2">
          <div className="w-full h-[300px] md:h-[400px] border border-[var(--color-gold)]/30 rounded-3xl bg-white/5 overflow-hidden shadow-2xl">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6435.381802004255!2d79.1412632!3d12.935297499999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bad38907aaafc99%3A0x85f4e76c54e6ef28!2sNaruvi%20Hospitals!5e1!3m2!1sen!2sin!4v1774437187823!5m2!1sen!2sin" 
              className="w-full h-full" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Location"
            ></iframe>
          </div>
        </div>
      </div>
      </div>

      {/* Standard Footer Links */}
      <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10 max-w-7xl mx-auto text-center md:text-left">
        {/* Logo & Copyright */}
        <div className="flex flex-col md:flex-row items-center gap-5">
          <img src="/assets/images/Naruvi_logo_original.png" alt="Naruvi Logo" className="h-8 md:h-10 w-auto brightness-0 invert" />
          <div className="hidden md:block w-px h-8 bg-white/10"></div>
          <div className="text-[12px] text-[#8A9BBF] uppercase tracking-wider">&copy; 2026 Naruvi Hospitals</div>
        </div>

        {/* Shortened Mission Statement */}
        <p className="max-w-md text-[13px] text-[#8A9BBF] leading-relaxed hidden lg:block opacity-70">
          World-class cardiac healthcare rooted in Vellore, bringing luminary specialists to your city.
        </p>

        {/* Simplified Socials */}
        <div className="flex gap-3">
          {[
            { Icon: Facebook, url: "https://www.facebook.com/naruvihospital" },
            { Icon: Instagram, url: "https://www.instagram.com/naruvi_hospitals/?hl=en" },
            { Icon: Twitter, url: "https://twitter.com/NaruviHospitals" },
            { Icon: Linkedin, url: "https://www.linkedin.com/company/naruvi-hospitals" },
            { Icon: Youtube, url: "https://www.youtube.com/@NaruviHospitals" }
          ].map((item, i) => (
            <a 
              key={i} 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-[#8A9BBF] hover:bg-[var(--color-pink)] hover:text-white transition-all border border-white/5"
            >
              <item.Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [specialty, setSpecialty] = useState('');

  return (
    <div className="min-h-screen bg-white font-sans text-[var(--color-text-dark)] overflow-x-hidden">
      <Header />
      <Hero />
      <Doctors />
      <HowItWorks />
      <AppointmentForm 
        specialty={specialty} 
        setSpecialty={setSpecialty} 
      />
      <ConditionsWeTreat setSpecialty={setSpecialty} />
      <Technology />
      <Testimonials />
      <Footer />
    </div>
  );
}
