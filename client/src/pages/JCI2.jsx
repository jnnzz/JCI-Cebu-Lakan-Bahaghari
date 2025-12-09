import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, TrendingUp, Users, Zap, BookOpen, MapPin, Mail, Phone, Sun, Moon } from 'lucide-react';
import * as THREE from 'three';
import JCIlogo from '../assets/logo-JCI.png'; // Ensure this path is correct in your project

// --- New Color and Style Configuration ---
const COLORS = {
  RED_BG: '#D91A1A',      // Deep Red (Dominant Dark Background)
  YELLOW: '#FFC200',      // Marigold/Mustard (Accents)
  ORANGE: '#FF5500',      // Vibrant Orange (Highlights)
  CREAM: '#F2EFE9',       // Off-White (Light Background / Text on Red)
  BLACK: '#1A1A1A',       // Rich Black (Text on Cream)
  WHITE: '#FFFFFF',       // Pure white (Sparse use, mostly for specific high contrast)
};

// --- Theme Helpers ---
// "Dark Mode" is now the Red Dominant theme. "Light Mode" is the Cream theme.
const getBgColor = (isDark) => isDark ? COLORS.RED_BG : COLORS.CREAM;
const getTextColor = (isDark) => isDark ? COLORS.CREAM : COLORS.BLACK;
const getAccentColor = (isDark) => isDark ? COLORS.YELLOW : COLORS.RED_BG;
const getSecondaryBgColor = (isDark) => isDark ? '#B31414' : '#E6E1D6'; // Slightly darker red / slightly darker cream

const FONTS = {
  HEADER: '"Dela Gothic One", cursive',
  BODY: '"Montserrat", sans-serif',
};

const NAV_TABS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Programs', href: '#programs' },
  { name: 'Events', href: '#events' },
  { name: 'Membership', href: '#membership' },
  { name: 'Blog', href: '#blog' },
];

// --- Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const slideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 10 },
  },
};

// --- Components ---

const CTAButton = ({ children, primary = true, className = '', isDarkMode, ...props }) => {
  const bgColor = primary 
    ? (isDarkMode ? COLORS.YELLOW : COLORS.RED_BG) 
    : 'transparent';
  
  const textColor = primary 
    ? (isDarkMode ? COLORS.BLACK : COLORS.CREAM) 
    : (isDarkMode ? COLORS.CREAM : COLORS.RED_BG);
    
  const borderColor = primary 
    ? 'transparent' 
    : (isDarkMode ? COLORS.CREAM : COLORS.RED_BG);

  return (
    <motion.button
      className={`
        px-8 py-3 font-bold uppercase transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] tracking-widest text-sm
        border-2 rounded-none md:rounded-sm
        ${className}
      `}
      style={{ 
        backgroundColor: bgColor, 
        color: textColor, 
        borderColor: borderColor,
        fontFamily: FONTS.BODY,
        fontWeight: 800
      }}
      whileHover={{ scale: 1.02, boxShadow: '6px 6px 0px 0px rgba(0, 0, 0, 0.3)', x: -2, y: -2 }}
      whileTap={{ scale: 0.98, boxShadow: '2px 2px 0px 0px rgba(0, 0, 0, 0.3)', x: 0, y: 0 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

const SectionTitle = ({ title, subtitle, isDarkMode }) => (
  <div className="text-center mb-16 relative">
    <motion.h3
      className="text-lg md:text-xl uppercase font-extrabold tracking-[0.2em] mb-2"
      style={{ 
        color: isDarkMode ? COLORS.YELLOW : COLORS.ORANGE,
        fontFamily: FONTS.BODY
      }}
      variants={slideUp}
    >
      {subtitle}
    </motion.h3>
    <motion.h2
      className="text-4xl md:text-6xl lg:text-7xl uppercase leading-none relative z-10"
      style={{ 
        color: getTextColor(isDarkMode),
        fontFamily: FONTS.HEADER,
        textShadow: isDarkMode ? '4px 4px 0px rgba(0,0,0,0.3)' : 'none'
      }}
      variants={slideUp}
    >
      {title}
    </motion.h2>
    {/* Geometric Underline */}
    <motion.div 
      className="h-2 w-24 mx-auto mt-4"
      style={{ backgroundColor: isDarkMode ? COLORS.CREAM : COLORS.RED_BG }}
      initial={{ width: 0 }}
      whileInView={{ width: 100 }}
      viewport={{ once: true }}
    />
  </div>
);

// --- Header & Navigation ---
const Header = ({ isDarkMode, toggleDarkMode, activeSection, scrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerBg = isScrolled || isOpen ? getBgColor(isDarkMode) : 'transparent';
  const headerText = getTextColor(isDarkMode);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 h-24 flex items-center z-50 transition-all duration-300"
      style={{ 
        backgroundColor: headerBg,
        borderBottom: isScrolled ? `2px solid ${isDarkMode ? COLORS.YELLOW : COLORS.BLACK}` : 'none'
      }}
    >
      <div className="max-w-[90%] w-full mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.a
          href="#home"
          onClick={(e) => scrollToSection(e, '#home')}
          className="text-2xl font-black tracking-tighter flex items-center gap-3"
          style={{ color: headerText, fontFamily: FONTS.HEADER }}
        >
          {/* Logo Placeholder - Circular Mask */}
          <div className="w-12 h-12 rounded-full border-2 overflow-hidden bg-white flex items-center justify-center" style={{ borderColor: isDarkMode ? COLORS.YELLOW : COLORS.BLACK }}>
             <img src={JCIlogo} alt="JCI" className="w-full h-full object-cover" /> 
          </div>
          <span>
            JCI <span style={{ color: isDarkMode ? COLORS.YELLOW : COLORS.RED_BG }}>CEBU</span>
          </span>
        </motion.a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex space-x-8 items-center">
          {NAV_TABS.map((tab) => {
            const isActive = tab.href.substring(1) === activeSection;
            return (
              <motion.a
                key={tab.name}
                href={tab.href}
                onClick={(e) => scrollToSection(e, tab.href)}
                className="text-sm font-bold uppercase tracking-widest relative group py-2"
                style={{ 
                    color: isActive ? (isDarkMode ? COLORS.YELLOW : COLORS.RED_BG) : headerText,
                    fontFamily: FONTS.BODY 
                }}
                whileHover={{ y: -2 }}
              >
                {tab.name}
                <span
                  className="absolute left-0 bottom-0 h-1 w-full transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"
                  style={{ backgroundColor: isDarkMode ? COLORS.YELLOW : COLORS.RED_BG }}
                />
              </motion.a>
            )
          })}
          
          <div className="h-6 w-px mx-2" style={{ backgroundColor: headerText, opacity: 0.3 }}></div>

          <button onClick={toggleDarkMode} className="p-2 transition-transform hover:rotate-45" style={{ color: headerText }}>
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          
          <CTAButton primary={true} className="text-xs px-6 py-2" isDarkMode={isDarkMode}>
            Join
          </CTAButton>
        </nav>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-4">
           <button onClick={toggleDarkMode} style={{ color: headerText }}>
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} style={{ color: headerText }}>
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-24 left-0 w-full overflow-hidden flex flex-col"
            style={{ backgroundColor: getBgColor(isDarkMode) }}
          >
            <div className="flex flex-col p-8 space-y-6 text-center">
              {NAV_TABS.map((tab) => (
                <a
                  key={tab.name}
                  href={tab.href}
                  onClick={(e) => { setIsOpen(false); scrollToSection(e, tab.href); }}
                  className="text-2xl font-bold uppercase tracking-widest"
                  style={{ 
                    fontFamily: FONTS.HEADER,
                    color: tab.href.substring(1) === activeSection ? (isDarkMode ? COLORS.YELLOW : COLORS.RED_BG) : headerText 
                  }}
                >
                  {tab.name}
                </a>
              ))}
              <div className="pt-8">
                 <CTAButton primary={true} className="w-full" isDarkMode={isDarkMode}>Join Now</CTAButton>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

// --- Tribal/Geometric Background ---
const SubtleGeometricBackground = ({ isDarkMode }) => {
  const strokeColor = isDarkMode ? COLORS.CREAM : COLORS.BLACK;
  const opacity = isDarkMode ? 0.05 : 0.03;
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {/* SVG Zig Zag Pattern */}
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="tribalZigzag" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M0 20 L20 0 L40 20 L20 40 Z" fill="none" stroke={strokeColor} strokeWidth="1" opacity={opacity} />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#tribalZigzag)" />
        </svg>
        {/* Large Gradient Blob */}
        <div 
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] opacity-20"
            style={{ backgroundColor: isDarkMode ? COLORS.YELLOW : COLORS.ORANGE }}
        />
    </div>
  );
}

// --- 3D Canvas (Holographic Globe) ---
const ThreeDCanvas = ({ isDarkMode }) => {
  const mountRef = useRef(null);
  const globeGroupRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 2.4;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    // Define Colors based on Palette
    const PRIMARY_COLOR = isDarkMode ? COLORS.CREAM : COLORS.RED_BG; 
    const ACCENT_COLOR = isDarkMode ? COLORS.YELLOW : COLORS.ORANGE;

    // A. Inner Sphere (Solid but transparent)
    const baseSphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.0, 32, 32),
      new THREE.MeshPhongMaterial({
        color: PRIMARY_COLOR, transparent: true, opacity: 0.1, emissive: PRIMARY_COLOR, emissiveIntensity: 0.1
      })
    );
    globeGroup.add(baseSphere);

    // B. Geometric Wireframe (Icosahedron for more blocky look)
    const wireframe = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.05, 1),
      new THREE.MeshBasicMaterial({ color: PRIMARY_COLOR, wireframe: true, transparent: true, opacity: 0.4 })
    );
    globeGroup.add(wireframe);

    // C. Thick Rings
    const ringGeo = new THREE.TorusGeometry(1.4, 0.04, 3, 100); // Thicker, triangular cross section (radialSegments: 3)
    const ringMat = new THREE.MeshBasicMaterial({ color: ACCENT_COLOR, transparent: true, opacity: 0.8 });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    
    ring1.rotation.x = Math.PI / 2;
    ring1.rotation.y = 0.3;
    ring2.rotation.x = 0.3;
    ring2.rotation.y = Math.PI / 2;
    
    globeGroup.add(ring1);
    globeGroup.add(ring2);

    // D. Particles (Floating Triangles)
    const particlesGeo = new THREE.BufferGeometry();
    const count = 150;
    const positions = new Float32Array(count * 3);
    for(let i=0; i<count*3; i++) positions[i] = (Math.random() - 0.5) * 6;
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(particlesGeo, new THREE.PointsMaterial({ size: 0.05, color: ACCENT_COLOR }));
    scene.add(particles);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    const clock = new THREE.Clock();
    
    const animate = () => {
      requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      if (globeGroupRef.current) {
        globeGroupRef.current.rotation.y += 0.003; 
        const targetX = mouseRef.current.y * 0.3; 
        const targetZ = mouseRef.current.x * 0.3; 
        globeGroupRef.current.rotation.x += (targetX - globeGroupRef.current.rotation.x) * 0.05;
        globeGroupRef.current.rotation.z += (targetZ - globeGroupRef.current.rotation.z) * 0.05;
        globeGroupRef.current.position.y = Math.sin(time * 1.5) * 0.1;
      }
      ring1.rotation.z -= 0.005;
      ring2.rotation.x -= 0.005;
      particles.rotation.y = time * 0.05;
      renderer.render(scene, camera);
    };

    const handleMouseMove = (e) => {
        mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (currentMount && renderer.domElement) currentMount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [isDarkMode]);

  return <div ref={mountRef} className="w-full h-full" />;
};

const HeroSection = ({ isDarkMode }) => {
  return (
    <motion.section
      id="home"
      className="min-h-screen flex items-center pt-24 relative overflow-hidden"
      style={{ backgroundColor: getBgColor(isDarkMode) }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
    >
      <SubtleGeometricBackground isDarkMode={isDarkMode} />
      
      <div className="max-w-[90%] mx-auto relative z-10 w-full">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="md:col-span-7 z-10">
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.h1 
                className="text-5xl sm:text-7xl lg:text-8xl leading-[0.9] mb-6 uppercase" 
                variants={itemVariants} 
                style={{ color: getTextColor(isDarkMode), fontFamily: FONTS.HEADER }}
              >
                Equity. <br />
                Inclusion. <br />
                <span className="relative inline-block z-10 text-transparent bg-clip-text" 
                      style={{ 
                          backgroundImage: `linear-gradient(45deg, ${isDarkMode ? COLORS.YELLOW : COLORS.RED_BG}, ${COLORS.ORANGE})`,
                          WebkitTextStroke: isDarkMode ? `0px` : `2px ${COLORS.RED_BG}`
                      }}>
                  Diversity
                  {/* Underline Graphic */}
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="absolute -bottom-2 left-0 h-4 md:h-6 -z-10"
                    style={{ backgroundColor: isDarkMode ? COLORS.RED_BG : COLORS.YELLOW, opacity: 0.5 }}
                  />
                </span>
                .
              </motion.h1>

              <motion.p 
                className="text-lg md:text-xl mt-6 max-w-lg font-medium leading-relaxed" 
                variants={itemVariants} 
                style={{ color: getTextColor(isDarkMode), fontFamily: FONTS.BODY }}
              >
                The premier organization for young active citizens in Cebu. 
                <span className="font-bold"> Driving positive change through bold action.</span>
              </motion.p>

              <motion.div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-10" variants={itemVariants}>
                <CTAButton isDarkMode={isDarkMode}>
                  Join Now
                </CTAButton>
                <CTAButton primary={false} isDarkMode={isDarkMode}>
                  Explore Programs
                </CTAButton>
              </motion.div>
            </motion.div>
          </div>

          {/* 3D Visual */}
          <div className="md:col-span-5 relative flex justify-center items-center h-[400px] md:h-auto mt-10 md:mt-0 z-10">
             {/* Abstract Shapes behind globe */}
            <div className="absolute w-full h-full transform scale-110" style={{ opacity: 0.1 }}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-0 -left-4 w-32 h-32 bg-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-32 h-32 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <motion.div
              className="relative w-full aspect-square max-w-[500px]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <ThreeDCanvas isDarkMode={isDarkMode} />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

// --- Values Section ---
const VisionMissionSection = ({ isDarkMode }) => {
  const cards = [
    { title: 'Diversity', desc: 'Embracing every background and perspective.', color: COLORS.YELLOW },
    { title: 'Equity', desc: 'Dismantling barriers to ensure fair opportunities.', color: COLORS.ORANGE },
    { title: 'Inclusion', desc: 'Fostering a culture where everyone belongs.', color: COLORS.BLACK }, // In dark mode this might need adjustment
  ];

  return (
    <motion.section
      id="about"
      className="py-24 relative"
      style={{ backgroundColor: getBgColor(isDarkMode) }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="max-w-[90%] mx-auto relative z-10">
        <SectionTitle title="Our Core Values" subtitle="Guiding Principles" isDarkMode={isDarkMode} />

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {cards.map((card, idx) => (
            <motion.div 
                key={idx}
                variants={itemVariants} 
                className="p-8 border-4 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
                style={{ 
                    backgroundColor: isDarkMode ? COLORS.RED_BG : COLORS.WHITE,
                    borderColor: isDarkMode ? COLORS.CREAM : COLORS.BLACK,
                    boxShadow: isDarkMode ? 'none' : '10px 10px 0px 0px rgba(0,0,0,1)'
                }}
            >
                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-16 h-16 transform translate-x-8 -translate-y-8 rotate-45" style={{ backgroundColor: card.color }}></div>
                
                <h3 className="text-3xl font-bold mb-4 uppercase" style={{ color: getTextColor(isDarkMode), fontFamily: FONTS.HEADER }}>
                    {card.title}
                </h3>
                <p className="text-lg leading-relaxed font-medium" style={{ color: getTextColor(isDarkMode), fontFamily: FONTS.BODY, opacity: 0.8 }}>
                    {card.desc}
                </p>
                
                {/* Bottom line */}
                <div className="absolute bottom-0 left-0 h-2 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" style={{ backgroundColor: card.color }}></div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-24 p-12 relative z-10 border-4 text-center max-w-4xl mx-auto"
          style={{ 
              backgroundColor: COLORS.BLACK, 
              borderColor: COLORS.YELLOW,
              color: COLORS.CREAM
          }}
          variants={itemVariants}
        >
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-4 py-1 font-bold uppercase tracking-wider" style={{ fontFamily: FONTS.HEADER, backgroundColor: COLORS.YELLOW }}>Mission Statement</div>
            <p className="text-2xl md:text-3xl font-bold leading-tight" style={{ fontFamily: FONTS.HEADER }}>
            "To empower young people to create positive change by providing development opportunities."
            </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

// --- Feature Modules ---
const FeatureModulesSection = ({ isDarkMode }) => {
  const features = [
    { icon: <TrendingUp size={32} />, title: 'Leadership Tracker', desc: 'Monitor impact & growth.' },
    { icon: <Users size={32} />, title: 'Member Directory', desc: 'Connect locally & globally.' },
    { icon: <Zap size={32} />, title: 'Admin Tools', desc: 'Streamlined chapter management.' },
    { icon: <BookOpen size={32} />, title: 'Learning Library', desc: 'Access exclusive modules.' },
  ];

  return (
    <motion.section
      id="programs"
      className="py-24 relative"
      style={{ backgroundColor: getSecondaryBgColor(isDarkMode) }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={containerVariants}
    >
        {/* Decorative Divider Top */}
        <div className="absolute top-0 left-0 w-full h-4" 
             style={{ background: `repeating-linear-gradient(45deg, ${COLORS.YELLOW}, ${COLORS.YELLOW} 10px, transparent 10px, transparent 20px)` }}>
        </div>

      <div className="max-w-[90%] mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
            
            <div className="order-2 md:order-1">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                        key={index}
                        variants={itemVariants}
                        className="p-6 border-2 transition-colors duration-300 group"
                        style={{ 
                            backgroundColor: isDarkMode ? COLORS.RED_BG : COLORS.WHITE,
                            borderColor: isDarkMode ? COLORS.CREAM : COLORS.BLACK
                        }}
                        whileHover={{ y: -5 }}
                        >
                        <div className="mb-4 inline-block p-3 border-2 rounded-full" style={{ borderColor: isDarkMode ? COLORS.YELLOW : COLORS.RED_BG, color: isDarkMode ? COLORS.YELLOW : COLORS.RED_BG }}>
                            {feature.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-2 uppercase" style={{ color: getTextColor(isDarkMode), fontFamily: FONTS.HEADER }}>
                            {feature.title}
                        </h3>
                        <p className="text-sm font-medium" style={{ color: getTextColor(isDarkMode), opacity: 0.7 }}>
                            {feature.desc}
                        </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="order-1 md:order-2 text-left">
                <motion.h3 className="text-xl uppercase font-bold tracking-widest mb-2" style={{ color: COLORS.ORANGE }} variants={slideUp}>
                    Digital Empowerment
                </motion.h3>
                <motion.h2 className="text-5xl md:text-6xl font-black leading-none mb-6" style={{ color: getTextColor(isDarkMode), fontFamily: FONTS.HEADER }} variants={slideUp}>
                    Tools for <br/> <span style={{ color: isDarkMode ? COLORS.YELLOW : COLORS.RED_BG }}>Impact.</span>
                </motion.h2>
                <motion.p className="text-lg mb-8" style={{ color: getTextColor(isDarkMode) }} variants={slideUp}>
                    We provide our members with state-of-the-art digital resources to track professional development, manage projects, and connect with the global JCI network.
                </motion.p>
                <CTAButton isDarkMode={isDarkMode}>Access Portal</CTAButton>
            </div>
        </div>
      </div>
    </motion.section>
  );
};

// --- Events Section ---
const EventHighlightSection = ({ isDarkMode }) => {
  return (
    <motion.section
      id="events"
      className="py-32 relative"
      style={{ backgroundColor: getBgColor(isDarkMode) }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="max-w-[90%] mx-auto relative z-10">
        <SectionTitle title="Project Highlights" subtitle="Driving Change" isDarkMode={isDarkMode} />

        <div className="grid md:grid-cols-2 gap-0 border-4" style={{ borderColor: isDarkMode ? COLORS.CREAM : COLORS.BLACK }}>
            
            {/* Image Side - Stylized */}
            <motion.div className="relative min-h-[400px] overflow-hidden group" variants={itemVariants}>
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                     style={{ backgroundImage: 'url("https://placehold.co/800x800/1A1A1A/FFFFFF?text=JCI+Action")' }}></div>
                <div className="absolute inset-0 opacity-40 mix-blend-multiply" style={{ backgroundColor: COLORS.RED_BG }}></div>
                
                {/* Overlay Text */}
                <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black to-transparent">
                    <p className="text-white font-bold uppercase tracking-widest text-sm mb-1">Featured Event</p>
                    <h3 className="text-white text-3xl font-black uppercase" style={{ fontFamily: FONTS.HEADER }}>Bahaghari Summit</h3>
                </div>
            </motion.div>

            {/* Content Side */}
            <motion.div 
                className="p-10 md:p-16 flex flex-col justify-center"
                style={{ backgroundColor: isDarkMode ? COLORS.BLACK : COLORS.CREAM }}
                variants={itemVariants}
            >
                <h3 className="text-3xl font-bold mb-6 uppercase" style={{ color: isDarkMode ? COLORS.WHITE : COLORS.BLACK, fontFamily: FONTS.HEADER }}>
                    Active Citizen Framework
                </h3>
                <p className="text-lg mb-8 font-medium" style={{ color: isDarkMode ? '#CCCCCC' : '#444444' }}>
                    From community clean-up drives focused on sustainability to high-level leadership seminars, JCI Lakan Bahaghari is at the forefront of local development.
                </p>
                
                <ul className="space-y-4 mb-10">
                    {[
                        'Entrepreneurship Mentorship',
                        'Sustainable Governance Debates',
                        'Youth Leadership Bootcamps'
                    ].map((item, i) => (
                        <li key={i} className="flex items-center font-bold" style={{ color: isDarkMode ? COLORS.YELLOW : COLORS.RED_BG }}>
                            <div className="w-2 h-2 mr-4 rotate-45" style={{ backgroundColor: COLORS.ORANGE }}></div>
                            {item}
                        </li>
                    ))}
                </ul>

                <CTAButton isDarkMode={isDarkMode} primary={false} className="self-start">
                    View All Projects
                </CTAButton>
            </motion.div>

        </div>
      </div>
    </motion.section>
  );
};

// --- Footer ---
const Footer = ({ isDarkMode }) => {
  const footerBg = isDarkMode ? COLORS.BLACK : COLORS.RED_BG;
  const footerText = COLORS.CREAM;

  return (
    <footer id="contact" className="py-20 relative overflow-hidden" style={{ backgroundColor: footerBg, color: footerText }}>
      {/* Big Watermark */}
      <div className="absolute top-0 right-0 text-[20rem] font-black opacity-5 pointer-events-none leading-none -mt-20 -mr-20 truncate" 
           style={{ fontFamily: FONTS.HEADER, color: COLORS.WHITE }}>
        JCI
      </div>

      <div className="max-w-[90%] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/20 pb-12 mb-12">
          
          <div className="md:col-span-2">
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-6" style={{ fontFamily: FONTS.HEADER }}>
              JCI <span style={{ color: COLORS.YELLOW }}>Cebu</span> <br/>Lakan Bahaghari
            </h3>
            <p className="max-w-md text-lg font-medium opacity-80">
              Developing leaders for a changing world. Join the movement of young active citizens today.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 uppercase tracking-widest text-white/50">Quick Links</h4>
            <ul className="space-y-3 font-bold">
              {NAV_TABS.slice(0, 4).map(tab => (
                <li key={tab.name}>
                  <a href={tab.href} className="hover:text-yellow-400 transition-colors uppercase text-sm">{tab.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 uppercase tracking-widest text-white/50">Contact</h4>
            <div className="space-y-4 font-medium opacity-90">
              <p className="flex items-center"><MapPin className="w-5 h-5 mr-3 text-yellow-400" /> Cebu City, Philippines</p>
              <p className="flex items-center"><Mail className="w-5 h-5 mr-3 text-yellow-400" /> info@jci-lakan.org</p>
              <div className="flex gap-4 mt-6">
                {['F', 'I', 'L'].map((l, i) => (
                    <div key={i} className="w-10 h-10 border-2 border-white/30 flex items-center justify-center hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all cursor-pointer font-bold">
                        {l}
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-sm font-bold opacity-50 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} JCI Cebu Lakan Bahaghari</p>
          <p>Equity . Inclusion . Diversity</p>
        </div>
      </div>
    </footer>
  );
};

// --- Main App Component ---
const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to Dark (Red Dominant) Mode
  const [activeSection, setActiveSection] = useState('home');

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const id = href.substring(1);
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { root: null, rootMargin: '-10% 0px -40% 0px', threshold: 0.1 }
    );
    NAV_TABS.forEach((tab) => {
      const section = document.getElementById(tab.href.substring(1));
      if (section) observer.observe(section);
    });
    return () => NAV_TABS.forEach((tab) => {
        const s = document.getElementById(tab.href.substring(1));
        if (s) observer.unobserve(s);
    });
  }, []);

  return (
    <div style={{ backgroundColor: getBgColor(isDarkMode), minHeight: '100vh', transition: 'background-color 0.5s ease' }}>
        {/* Inject Google Fonts */}
        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=Montserrat:wght@400;500;700;900&display=swap');
            
            html { scroll-behavior: smooth; }
            body { overflow-x: hidden; }
            
            ::selection {
                background-color: ${COLORS.YELLOW};
                color: ${COLORS.BLACK};
            }
        `}</style>

      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} activeSection={activeSection} scrollToSection={scrollToSection} />
      
      <main>
        <HeroSection isDarkMode={isDarkMode} />
        <VisionMissionSection isDarkMode={isDarkMode} />
        <FeatureModulesSection isDarkMode={isDarkMode} />
        <EventHighlightSection isDarkMode={isDarkMode} />
        
        {/* Membership CTA Section */}
        <motion.section
          id="membership"
          className="py-32 relative text-center"
          style={{ backgroundColor: getBgColor(isDarkMode) }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={containerVariants}
        >
          <SubtleGeometricBackground isDarkMode={isDarkMode} />
          <div className="relative z-10 max-w-4xl mx-auto px-6">
            <h2 className="text-5xl md:text-7xl font-black uppercase mb-8" style={{ color: getTextColor(isDarkMode), fontFamily: FONTS.HEADER }}>
                Be The Change. <br/> Join the Movement.
            </h2>
            <CTAButton isDarkMode={isDarkMode} className="text-xl px-10 py-5">
                Apply for Membership
            </CTAButton>
          </div>
        </motion.section>

        {/* Blog Section */}
        <motion.section
          id="blog"
          className="py-24"
          style={{ backgroundColor: getSecondaryBgColor(isDarkMode) }}
        >
             <div className="max-w-[90%] mx-auto">
                <SectionTitle title="Latest Insights" subtitle="Member Stories" isDarkMode={isDarkMode} />
                <div className="flex justify-center">
                    <CTAButton primary={false} isDarkMode={isDarkMode}>View Blog</CTAButton>
                </div>
             </div>
        </motion.section>
      </main>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default App;