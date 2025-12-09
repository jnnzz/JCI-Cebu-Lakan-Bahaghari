import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Menu, X, ArrowRight, TrendingUp, Users, Zap, BookOpen, MapPin, Mail, Phone } from 'lucide-react';
import JCIlogo from '../assets/logo-JCI.png'; 
import tribalImg from '../assets/tribal.jpg';

// --- CONSTANTS: THEME & FONTS ---
const THEME = {
  BG_PRIMARY: '#3E2723',    // Deep Brown background
  BG_SECONDARY: '#211E1E',  // Charcoal secondary
  TEXT_PRIMARY: '#F4F1E8',  // Off White text
  ACCENT_RED: '#A83232',    // Adobo Red
  ACCENT_YELLOW: '#FFBC00', // Mango Yellow
  BORDER: '#A83232',        // Red Border
};

// Centralized Font Management for better chemistry
const FONTS = {
  HEADLINE: "'Pirata One', cursive", // Gothic/Tribal Impact
  ACCENT: "'Rye', serif",            // Woodblock/Rough Texture
  BODY: "'Outfit', sans-serif",      // Clean/Modern/Geometric
};

const NAV_TABS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Programs', href: '#programs' },
  { name: 'Events', href: '#events' },
  { name: 'Membership', href: '#membership' },
  { name: 'Blog', href: '#blog' },
];

// --- FRAMER MOTION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 100, damping: 15 } 
  },
};

const tribalSlideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', bounce: 0.4, duration: 0.8 },
  },
};

// --- REUSABLE COMPONENTS ---

// BUTTONS: Use 'Rye' here because buttons should feel like physical blocks/stamps
const CTAButton = ({ children, primary = true, className = '', ...props }) => {
  const bgColor = primary ? THEME.ACCENT_RED : 'transparent';
  const textColor = primary ? THEME.TEXT_PRIMARY : THEME.TEXT_PRIMARY;
  const borderColor = primary ? THEME.ACCENT_YELLOW : THEME.ACCENT_RED;

  return (
    <motion.button
      className={`relative px-8 py-4 uppercase tracking-wider text-sm md:text-base group overflow-hidden ${className}`}
      style={{ 
        color: textColor,
        fontFamily: FONTS.ACCENT, // Rye fits well for clickable "blocks"
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {/* Background Shape */}
      <div 
        className="absolute inset-0 transform -skew-x-12 border-2" 
        style={{ 
          backgroundColor: bgColor, 
          borderColor: borderColor,
          borderStyle: primary ? 'solid' : 'dashed' 
        }}
      ></div>
      
      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>
    </motion.button>
  );
};

// TITLES: Use Pirata for the big text, Rye for the small "eyebrow" text
const SectionTitle = ({ title, subtitle, align = 'center' }) => {
  return (
    <div className={`text-${align} mb-12 relative z-10`}>
      <motion.h3
        className="text-lg md:text-xl uppercase tracking-[0.2em] mb-4"
        style={{ 
          color: THEME.ACCENT_YELLOW, 
          fontFamily: FONTS.ACCENT, // Rye for the small rough subtitle
          textShadow: '2px 2px 0px rgba(0,0,0,0.5)' 
        }}
        variants={tribalSlideUp}
      >
         {subtitle} 
      </motion.h3>
      <motion.h2
        className="text-6xl md:text-8xl leading-none uppercase"
        style={{ 
          color: THEME.TEXT_PRIMARY,
          fontFamily: FONTS.HEADLINE, // Pirata for the heavy impact
          textShadow: `0px 4px 10px ${THEME.BG_SECONDARY}`
        }}
        variants={tribalSlideUp}
      >
        {title}
      </motion.h2>
    </div>
  );
};

const TribalPatternBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      <svg
        className="absolute top-60 left-50 w-[150%] h-[150%] -translate-x-1/4 -translate-y-1/4 origin-center animate-slow-spin"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        fill="none"
        stroke={THEME.ACCENT_YELLOW}
        strokeWidth="0.5"
        opacity="0.05"
        style={{ willChange: 'transform' }} 
      >
        <path d="M10,10 Q30,5 50,10 Q70,15 90,10 V90 Q70,95 50,90 Q30,85 10,90 Z" />
        <path d="M20,20 Q40,15 50,20 Q60,25 80,20 V80 Q60,85 50,80 Q40,75 20,80 Z" />
        <circle cx="50" cy="50" r="15" />
        <path d="M50,35 V65 M35,50 H65" />
      </svg>
      <div className="absolute inset-0 bg-black opacity-10 mix-blend-multiply"></div>
    </div>
  );
};

// --- HEADER ---
const Header = ({ activeSection, scrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let timeoutId = null;
    const handleScroll = () => {
      if(timeoutId) return;
      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > 30);
        timeoutId = null;
      }, 50); 
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerBg = isScrolled || isOpen ? THEME.BG_PRIMARY : 'transparent';
  
  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 h-24 place-content-center z-50 transition-colors duration-300 ${isScrolled ? 'border-b-4 shadow-lg' : ''}`}
      style={{ backgroundColor: headerBg, borderColor: THEME.ACCENT_RED }}
      initial={{ y: -100 }} animate={{ y: 0 }} transition={{ type: 'spring', damping: 20 }}
    >
      <div className="max-w-full xl:max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* LOGO: Uses Pirata for Brand Identity */}
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, '#home')}
          className="text-4xl tracking-wide flex items-center uppercase hover:scale-105 transition-transform"
          style={{ 
            color: THEME.TEXT_PRIMARY,
            fontFamily: FONTS.HEADLINE 
          }}
        >
          <img src={JCIlogo} alt="JCI Logo" className="w-12 h-12 mr-3 rounded-full border-2" style={{ borderColor: THEME.ACCENT_YELLOW }}/>
          JCI <span style={{ color: THEME.ACCENT_RED }} className="ml-2">Cebu</span>
        </a>

        {/* NAV: Uses 'Outfit' (Clean) - Readable navigation is crucial. Rye is too hard to read here. */}
        <nav className="hidden lg:flex space-x-10 items-center">
          {NAV_TABS.map((tab) => {
            const isActive = tab.href.substring(1) === activeSection;
            return (
              <a
                key={tab.name}
                href={tab.href}
                onClick={(e) => scrollToSection(e, tab.href)}
                className="text-sm font-bold uppercase relative group tracking-[0.15em] transition-colors"
                style={{ 
                  color: isActive ? THEME.ACCENT_RED : THEME.TEXT_PRIMARY,
                  fontFamily: FONTS.BODY // Clean font for navigation
                }}
              >
                <span className="group-hover:text-yellow-500 transition-colors">{tab.name}</span>
                {isActive && (
                   <div className="absolute -bottom-2 left-0 w-full h-1 rounded-full" style={{ backgroundColor: THEME.ACCENT_YELLOW }} />
                )}
              </a>
            )
          })}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center space-x-4">
          <button onClick={() => setIsOpen(!isOpen)} style={{ color: THEME.TEXT_PRIMARY }}>
            {isOpen ? <X size={32} strokeWidth={3} /> : <Menu size={32} strokeWidth={3} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-24 left-0 w-full shadow-2xl border-b-4"
            style={{ backgroundColor: THEME.BG_PRIMARY, borderColor: THEME.ACCENT_RED }}
          >
            <div className="py-6 px-4 space-y-4">
              {NAV_TABS.map((tab) => (
                <a
                  key={tab.name} href={tab.href}
                  onClick={(e) => { setIsOpen(false); scrollToSection(e, tab.href); }}
                  className="block text-2xl font-bold uppercase tracking-widest hover:text-yellow-500 transition-colors"
                  style={{ 
                    color: THEME.TEXT_PRIMARY,
                    fontFamily: FONTS.BODY // Keep it readable on mobile
                  }}
                >
                  {tab.name}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

// --- INTERACTIVE VISUAL ---
const InteractiveTribalVisual = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]); 
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const xPct = (event.clientX - rect.left) / rect.width - 0.5;
    const yPct = (event.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct * 200);
    y.set(yPct * 200);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className="w-full h-[500px] flex items-center justify-center relative perspective-1000"
      style={{ perspective: 1200 }} 
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-[300px] h-[450px] md:w-[380px] md:h-[520px] rounded-2xl"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          willChange: 'transform'
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div 
           className="absolute inset-4 rounded-2xl blur-3xl opacity-40 -z-10"
           style={{ backgroundColor: THEME.ACCENT_YELLOW }}
        ></div>

        <div 
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border-4 shadow-2xl"
          style={{ borderColor: THEME.ACCENT_YELLOW, transform: "translateZ(0px)" }}
        >
         <img 
           src={tribalImg}
           alt="Tribal Mask" 
           className="w-full h-full object-cover filter contrast-110"
           loading="eager"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        </div>

        <div 
           className="absolute inset-0 pointer-events-none border-2 border-white/20 rounded-2xl"
           style={{ transform: "translateZ(40px)" }}
        >
             <svg viewBox="0 0 400 550" className="w-full h-full drop-shadow-md">
               <ellipse cx="200" cy="80" rx="60" ry="10" stroke="white" strokeWidth="3" fill="none" />
               <line x1="200" y1="120" x2="200" y2="450" stroke="white" strokeWidth="4" strokeLinecap="round" />
               <circle cx="140" cy="220" r="25" stroke="white" strokeWidth="4" fill="transparent" />
               <circle cx="260" cy="220" r="25" stroke="white" strokeWidth="4" fill="transparent" />
             </svg>
        </div>

        <div 
           className="absolute bottom-10 left-0 w-full text-center pointer-events-none"
           style={{ transform: "translateZ(60px)" }}
        >
           <span 
             className="inline-block px-4 py-2 bg-white text-black uppercase text-lg tracking-widest shadow-lg"
             style={{ fontFamily: FONTS.ACCENT }} // Stamp effect
           >
             Lakan Bahaghari
           </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- SECTIONS ---

const HeroSection = () => {
  return (
    <motion.section
      id="home"
      className="min-h-screen flex items-center pt-28 relative overflow-hidden"
      style={{ backgroundColor: THEME.BG_PRIMARY }}
      initial="hidden" whileInView="visible" viewport={{ once: true }}
    >
      <TribalPatternBackground />
      
      {/* Static Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none overflow-hidden">
          <h1 
            className="text-[20vw] leading-none text-white text-center"
            style={{ fontFamily: FONTS.HEADLINE }}
          >
              LAKAN<br/>BAHAGHARI
          </h1>
      </div>

      <div className="max-w-full xl:max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
        <div className="grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7">
            <motion.div variants={containerVariants}>
              {/* Rye for the subhead gives it that western/poster vibe */}
              <motion.h3 variants={itemVariants} className="text-xl md:text-2xl uppercase tracking-[0.3em] mb-4" style={{ color: THEME.ACCENT_YELLOW, fontFamily: FONTS.HEADLINE }}>
                Ignite Your Spirit 
              </motion.h3>
              
              {/* Pirata for the Main Headline - Maximum Impact */}
              <motion.h1 
                className="text-7xl sm:text-8xl lg:text-9xl leading-[0.9] mb-6 uppercase relative" 
                variants={itemVariants} 
                style={{ 
                  color: THEME.TEXT_PRIMARY,
                  fontFamily: FONTS.ACCENT
                }}
              >
                Equity. Inclusion.
                <br />
                <span className="relative inline-block z-10 text-transparent bg-clip-text" 
                      style={{ backgroundImage: `linear-gradient(to right, ${THEME.ACCENT_YELLOW}, ${THEME.ACCENT_RED})` }}>
                  Diversity.
                </span>
              </motion.h1>

              {/* Outfit for the paragraph - High Readability */}
              <motion.p className="text-lg md:text-xl mt-8 max-w-xl font-light leading-relaxed text-gray-200" variants={itemVariants} style={{ fontFamily: FONTS.BODY }}>
                The premier tribe of young active citizens in Cebu. We drive positive change through bold action and inclusive leadership.
              </motion.p>

              <motion.div className="flex flex-wrap gap-4 mt-12" variants={itemVariants}>
                <CTAButton>Join The Tribe</CTAButton>
                <CTAButton primary={false}>
                  Our Mission <ArrowRight className="inline ml-2 w-5 h-5" />
                </CTAButton>
              </motion.div>
            </motion.div>
          </div>

          <div className="md:col-span-5 relative z-10">
              <InteractiveTribalVisual />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const VisionMissionSection = () => {
  return (
    <motion.section
      id="about"
      className="py-24 relative z-10"
      style={{ backgroundColor: THEME.BG_SECONDARY }}
      initial="hidden" whileInView="visible" viewport={{ amount: 0.1, once: true }}
      variants={containerVariants}
    >
      <div className="max-w-full xl:max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <SectionTitle title="Our Guiding Totems" subtitle="A Commitment to DEI for All" />

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {['Diversity', 'Equity', 'Inclusion'].map((item, index) => {
            const cardBg = index === 0 ? THEME.ACCENT_YELLOW : index === 1 ? THEME.ACCENT_RED : THEME.TEXT_PRIMARY;
            const textColor = index === 2 ? '#211E1E' : '#F4F1E8'; 
            
            return (
            <motion.div key={item} variants={itemVariants} whileHover={{ y: -10 }} className="relative group">
              <div className="absolute inset-0 transform translate-x-2 translate-y-2 bg-black/50 -z-10 rounded-xl"></div>
              
              <div className="h-full p-8 relative overflow-hidden rounded-xl" style={{ backgroundColor: cardBg }}>
                <svg className="absolute top-0 right-0 w-32 h-32 opacity-20 pointer-events-none" viewBox="0 0 100 100" fill={textColor}>
                    <path d="M10,10 Q50,50 90,10 M10,30 Q50,70 90,30 M10,50 Q50,90 90,50" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>

                <h3 className="text-5xl mb-4 uppercase" style={{ color: textColor, fontFamily: FONTS.HEADLINE }}>{item}</h3>
                
                {/* Clean font for body text inside cards */}
                <p className="font-medium text-lg leading-relaxed" style={{ color: textColor, fontFamily: FONTS.BODY }}>
                  We embrace every background, perspective, and talent. Our strength lies in the rich tapestry of our members.
                </p>
              </div>
            </motion.div>
          )})}
        </div>

        <motion.div
          className="mt-20 p-12 relative z-10 text-center"
          variants={tribalSlideUp}
        >
          <div className="absolute inset-0 transform -rotate-1 bg-opacity-90 border-2 border-dashed rounded-lg" 
               style={{ backgroundColor: THEME.ACCENT_RED, borderColor: THEME.ACCENT_YELLOW }}>
          </div>
          {/* Using Rye here for the "Manifesto" look */}
          <p className="relative z-10 text-xl md:text-3xl leading-relaxed text-white" style={{ fontFamily: FONTS.ACCENT }}>
            "Our Mission: To empower young people to create positive change by providing development opportunities that enable them to meet the needs of their communities."
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

const FeatureModulesSection = () => {
  const features = [
    { icon: <TrendingUp size={40} />, title: 'Leadership Tracker' },
    { icon: <Users size={40} />, title: 'Member Directory' },
    { icon: <Zap size={40} />, title: 'Admin Dashboards' },
    { icon: <BookOpen size={40} />, title: 'Learning Library' },
  ];

  return (
    <motion.section id="programs" className="py-24 relative z-10" style={{ backgroundColor: THEME.BG_PRIMARY }} initial="hidden" whileInView="visible" viewport={{ amount: 0.1, once: true }} variants={containerVariants}>
      <TribalPatternBackground />
      <div className="max-w-full xl:max-w-[90%] mx-auto px-4 relative z-20">
        <SectionTitle title="Tools of the Trade" subtitle="Digital Empowerment" />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`transform transition-all duration-300 hover:scale-105 ${index % 2 === 1 ? 'lg:mt-12' : ''}`}
            >
              <div className="h-full bg-opacity-90 p-8 relative border-l-4 border-b-4" 
                   style={{ backgroundColor: THEME.BG_SECONDARY, borderColor: THEME.ACCENT_RED }}>
                
                  <div className="mb-6 inline-block p-4 rounded-full bg-black/30" style={{ color: THEME.ACCENT_RED }}>
                    {feature.icon}
                  </div>
                  <h3 className="text-3xl mb-3 uppercase" style={{ color: THEME.TEXT_PRIMARY, fontFamily: FONTS.HEADLINE }}>
                    {feature.title}
                  </h3>
                  
                  {/* Clean font for descriptions */}
                  <p className="font-light text-gray-400" style={{ fontFamily: FONTS.BODY }}>
                    Access resources to monitor impact, connect globally, and develop professional skills.
                  </p>
                  
                  <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2" style={{ borderColor: THEME.ACCENT_YELLOW }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 mt-12 relative text-white overflow-hidden" style={{ backgroundColor: '#1a1110' }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ 
            backgroundImage: `radial-gradient(${THEME.ACCENT_YELLOW} 2px, transparent 2px)`,
            backgroundSize: '30px 30px'
        }}></div>

      <div className="max-w-full xl:max-w-[90%] mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <h3 className="text-5xl tracking-wide mb-6 uppercase" style={{ fontFamily: FONTS.HEADLINE }}>
              JCI <span style={{ color: THEME.ACCENT_YELLOW }}>Lakan Bahaghari</span>
            </h3>
            <p className="text-lg pr-4 font-light mb-6 text-gray-400" style={{ fontFamily: FONTS.BODY }}>
              Young Active Citizens creating positive change. The fire that fuels Cebu's future.
            </p>
            <div className="flex space-x-4">
              {['F', 'I', 'L'].map(social => (
                <a key={social} href="#" className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-white font-bold text-xl transition-colors hover:bg-yellow-500 hover:text-black hover:border-yellow-500 hover:-translate-y-1 transform duration-200">
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-2xl mb-6 uppercase" style={{ color: THEME.ACCENT_YELLOW, fontFamily: FONTS.HEADLINE }}>Pathways</h4>
            <ul className="space-y-4 font-bold tracking-widest text-sm" style={{ fontFamily: FONTS.BODY }}>
              {NAV_TABS.slice(0, 4).map(tab => (
                <li key={tab.name}><a href={tab.href} className="hover:text-yellow-400 transition-colors underline-offset-4 hover:underline">{tab.name}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-2xl mb-6 uppercase" style={{ color: THEME.ACCENT_YELLOW, fontFamily: FONTS.HEADLINE }}>Contact the Tribe</h4>
            <div className="space-y-4 font-light text-gray-300" style={{ fontFamily: FONTS.BODY }}>
              <p className="flex items-center"><MapPin className="mr-3" size={20} color={THEME.ACCENT_YELLOW}/> Cebu City, Philippines</p>
              <p className="flex items-center"><Mail className="mr-3" size={20} color={THEME.ACCENT_YELLOW}/> info@jci-lakan.org</p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center font-bold tracking-widest text-gray-500" style={{ fontFamily: FONTS.BODY }}>
          <p>&copy; {new Date().getFullYear()} JCI Cebu Lakan Bahaghari. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// --- MAIN APP ---
const App = () => {
    const [activeSection, setActiveSection] = useState('home');

    const scrollToSection = (e, href) => {
      e.preventDefault();
      const id = href.substring(1);
      setActiveSection(id);
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({ top: element.offsetTop - 90, behavior: 'smooth' });
      }
    };

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveSection(entry.target.id);
          });
        },
        { rootMargin: '-20% 0px -50% 0px', threshold: 0.1 }
      );

      NAV_TABS.forEach((tab) => {
        const section = document.getElementById(tab.href.substring(1));
        if (section) observer.observe(section);
      });
      return () => observer.disconnect();
    }, []);

  return (
    <div style={{ fontFamily: FONTS.BODY, backgroundColor: THEME.BG_PRIMARY }} className="min-h-screen text-white">
      <style>{`
        /* FONT STRATEGY:
           1. Pirata One: Headings / Logo (The Tribal feel)
           2. Rye: Buttons / Subtitles (The Rough/Wood texture)
           3. Outfit: Body / Nav (Modern, Geometric, Clean readability)
        */
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;700&family=Pirata+One&family=Rye&display=swap');
        
        @keyframes slowSpin {
            from { transform: translate(-25%, -25%) rotate(0deg); }
            to { transform: translate(-25%, -25%) rotate(360deg); }
        }
        .animate-slow-spin {
            animation: slowSpin 120s linear infinite;
        }
      `}</style>

      <Header activeSection={activeSection} scrollToSection={scrollToSection} />
      <main>
        <HeroSection />
        <VisionMissionSection />
        <FeatureModulesSection />
        
        {/* Placeholder for Events */}
        <section id="events" className="h-[50vh] flex items-center justify-center text-4xl relative z-10" style={{backgroundColor: THEME.BG_SECONDARY, color: THEME.TEXT_PRIMARY, fontFamily: FONTS.HEADLINE}}>
            <TribalPatternBackground />
            <h2>Events Section Coming Soon...</h2>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;