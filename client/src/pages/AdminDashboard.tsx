import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Users, FolderKanban, Calendar as CalendarIcon, 
  MessageSquare, FileText, Menu, X, Check, XCircle, Search, 
  Plus, DollarSign, TrendingUp, TrendingDown, Eye 
} from 'lucide-react';
import JCIlogo from '../assets/logo-JCI.png'; 

// --- TYPES ---
interface AdminButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'outline';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

interface TribalCardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

interface Stat {
  label: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
}

interface Project {
  id: number;
  title: string;
  proponent: string;
  status: 'Proposed' | 'In Progress' | 'Completed';
  date: string;
}

interface Member {
  id: number;
  name: string;
  role: string;
  status: 'Active' | 'Separated';
  dues: 'Paid' | 'Pending' | 'N/A';
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

// --- CONSTANTS: THEME & FONTS (MATCHING YOUR LANDING PAGE) ---
const THEME = {
  BG_PRIMARY: '#3E2723',    // Deep Brown
  BG_SECONDARY: '#211E1E',  // Charcoal
  TEXT_PRIMARY: '#F4F1E8',  // Off White
  ACCENT_RED: '#A83232',    // Adobo Red
  ACCENT_YELLOW: '#FFBC00', // Mango Yellow
  SUCCESS_GREEN: '#2E7D32', // For Approvals
};

const FONTS = {
  HEADLINE: "'Pirata One', cursive",
  ACCENT: "'Rye', serif",
  BODY: "'Outfit', sans-serif",
};

// --- MOCK DATA (BASED ON PDF REQUIREMENTS) ---
const MOCK_STATS: Stat[] = [
  { label: 'Total Members', value: '142', icon: <Users />, trend: '+12%' },
  { label: 'Inducted', value: '89', icon: <Check />, trend: '+5%' },
  { label: 'Annual Dues', value: '₱45k', icon: <DollarSign />, trend: 'Collected' },
  { label: 'Recruitment Rate', value: '18%', icon: <TrendingUp />, trend: 'vs last mo' },
];

const MOCK_PROJECTS: Project[] = [
  { id: 1, title: 'Barangay Clean-up', proponent: 'Comm. Juan', status: 'Proposed', date: '2025-02-10' },
  { id: 2, title: 'Youth Leadership Summit', proponent: 'VP Sarah', status: 'In Progress', date: '2025-03-15' },
  { id: 3, title: 'Charity Gala', proponent: 'Pres. Matt', status: 'Proposed', date: '2025-04-20' },
  { id: 4, title: 'Tech Bootcamp', proponent: 'Dir. Alex', status: 'Completed', date: '2025-01-10' },
];

const MOCK_MEMBERS: Member[] = [
  { id: 1, name: 'Juan Dela Cruz', role: 'Member', status: 'Active', dues: 'Paid' },
  { id: 2, name: 'Maria Clara', role: 'VP Internal', status: 'Active', dues: 'Pending' },
  { id: 3, name: 'Jose Rizal', role: 'Alumni', status: 'Separated', dues: 'N/A' },
];

// --- REUSABLE COMPONENTS ---

// 1. Tribal Button (Reused)
const AdminButton: React.FC<AdminButtonProps> = ({ children, variant = 'primary', className = '', onClick, type, disabled }) => {
  const isPrimary = variant === 'primary';
  const bgColor = isPrimary ? THEME.ACCENT_RED : variant === 'success' ? THEME.SUCCESS_GREEN : 'transparent';
  const borderColor = isPrimary ? THEME.ACCENT_YELLOW : THEME.ACCENT_RED;

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`relative px-4 py-2 font-bold uppercase tracking-wider text-sm overflow-hidden flex items-center justify-center gap-2 ${className}`}
      style={{ fontFamily: FONTS.ACCENT, color: THEME.TEXT_PRIMARY }}
    >
      <div className="absolute inset-0 border-2 transform -skew-x-12" 
           style={{ backgroundColor: bgColor, borderColor: borderColor, borderStyle: isPrimary || variant === 'success' ? 'solid' : 'dashed' }}>
      </div>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
};

// 2. Tribal Card (Container)
const TribalCard: React.FC<TribalCardProps> = ({ children, title, className = '' }) => (
  <div className={`relative p-6 rounded-xl border-l-4 border-b-4 ${className}`}
       style={{ backgroundColor: THEME.BG_SECONDARY, borderColor: THEME.ACCENT_RED }}>
    {title && (
      <h3 className="text-xl mb-4 uppercase tracking-widest" 
          style={{ fontFamily: FONTS.ACCENT, color: THEME.ACCENT_YELLOW }}>
        // {title} //
      </h3>
    )}
    {children}
    {/* Corner Accent */}
    <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2" style={{ borderColor: THEME.ACCENT_YELLOW }} />
  </div>
);

// --- SUB-VIEWS (MODULES) ---

// MODULE 1: DASHBOARD OVERVIEW [cite: 5, 7-12]
const DashboardOverview = () => (
  <div className="space-y-8">
    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {MOCK_STATS.map((stat, idx) => (
        <TribalCard key={idx} className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400 font-light" style={{ fontFamily: FONTS.BODY }}>{stat.label}</p>
            <h4 className="text-4xl mt-1" style={{ fontFamily: FONTS.HEADLINE, color: THEME.TEXT_PRIMARY }}>{stat.value}</h4>
            <span className="text-xs text-green-400 font-bold tracking-wider">{stat.trend}</span>
          </div>
          <div className="p-3 rounded-full bg-black/30" style={{ color: THEME.ACCENT_YELLOW }}>
            {stat.icon}
          </div>
        </TribalCard>
      ))}
    </div>

    {/* Calendar & Activity [cite: 13, 14] */}
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <TribalCard title="Organization Calendar">
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-700 rounded-lg bg-black/20">
             <div className="text-center text-gray-500">
                <CalendarIcon size={48} className="mx-auto mb-2 opacity-50"/>
                <p style={{ fontFamily: FONTS.BODY }}>Google Calendar Integration View</p>
             </div>
          </div>
        </TribalCard>
      </div>

      <TribalCard title="Recent Activity">
        <ul className="space-y-4">
          {[1,2,3].map((i) => (
             <li key={i} className="flex items-start gap-3 pb-4 border-b border-gray-700 last:border-0">
                <div className="w-2 h-2 mt-2 rounded-full" style={{ backgroundColor: THEME.ACCENT_YELLOW }} />
                <div>
                   <p className="text-sm font-bold" style={{ fontFamily: FONTS.BODY }}>New Member Inducted</p>
                   <p className="text-xs text-gray-400">2 hours ago</p>
                </div>
             </li>
          ))}
        </ul>
      </TribalCard>
    </div>
  </div>
);


// MODULE 2: PROJECT MANAGEMENT [cite: 15-23]
const ProjectsModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'proposed' | 'active'>('proposed'); // 'proposed' or 'active'

  return (
    <div className="space-y-6">
      <div className="flex gap-4 mb-6">
        <button 
          onClick={() => setActiveTab('proposed')}
          className={`pb-2 text-lg uppercase tracking-widest transition-colors ${activeTab === 'proposed' ? 'border-b-4' : 'opacity-50'}`}
          style={{ fontFamily: FONTS.ACCENT, color: THEME.TEXT_PRIMARY, borderColor: THEME.ACCENT_YELLOW }}
        >
          Proposals
        </button>
        <button 
          onClick={() => setActiveTab('active')}
          className={`pb-2 text-lg uppercase tracking-widest transition-colors ${activeTab === 'active' ? 'border-b-4' : 'opacity-50'}`}
          style={{ fontFamily: FONTS.ACCENT, color: THEME.TEXT_PRIMARY, borderColor: THEME.ACCENT_YELLOW }}
        >
          Active Projects
        </button>
      </div>

      <TribalCard title={activeTab === 'proposed' ? "Pending Proposals" : "Project Progress"}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-700 text-gray-400 uppercase text-xs tracking-wider" style={{ fontFamily: FONTS.BODY }}>
                <th className="p-4">Project Name</th>
                <th className="p-4">Proponent</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody style={{ fontFamily: FONTS.BODY }}>
              {MOCK_PROJECTS.filter(p => activeTab === 'proposed' ? p.status === 'Proposed' : p.status !== 'Proposed').map((project) => (
                <tr key={project.id} className="border-b border-gray-800 hover:bg-white/5 transition-colors">
                  <td className="p-4 font-bold text-white">{project.title}</td>
                  <td className="p-4 text-gray-300">{project.proponent}</td>
                  <td className="p-4 text-gray-300">{project.date}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 text-xs uppercase font-bold rounded-full ${
                      project.status === 'Proposed' ? 'bg-yellow-900 text-yellow-500' :
                      project.status === 'Completed' ? 'bg-green-900 text-green-500' : 
                      'bg-blue-900 text-blue-400'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="p-4 flex justify-end gap-2">
                    {activeTab === 'proposed' ? (
                      <>
                        <button className="p-2 hover:bg-green-900 rounded text-green-500" title="Approve"><Check size={18}/></button>
                        <button className="p-2 hover:bg-red-900 rounded text-red-500" title="Reject"><XCircle size={18}/></button>
                        <button className="p-2 hover:bg-gray-700 rounded text-gray-300" title="View"><Eye size={18}/></button>
                      </>
                    ) : (
                      <button className="text-sm underline text-yellow-500">View Progress</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TribalCard>
    </div>
  );
};

// MODULE 3: MEMBER MANAGEMENT [cite: 25-29]
const MembersModule = () => (
  <div className="space-y-6">
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="relative w-full md:w-96">
        <Search className="absolute left-3 top-3 text-gray-500" size={20} />
        <input 
          type="text" 
          placeholder="Search Lakan members..." 
          className="w-full pl-10 pr-4 py-3 bg-black/20 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500 text-white"
          style={{ fontFamily: FONTS.BODY }}
        />
      </div>
      <AdminButton><Plus size={18} /> Add Member</AdminButton>
    </div>

    <TribalCard>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700 text-gray-400 uppercase text-xs tracking-wider" style={{ fontFamily: FONTS.BODY }}>
              <th className="p-4">Name</th>
              <th className="p-4">Role</th>
              <th className="p-4">Dues Status</th>
              <th className="p-4">Membership</th>
              <th className="p-4 text-right">Manage</th>
            </tr>
          </thead>
          <tbody style={{ fontFamily: FONTS.BODY }}>
            {MOCK_MEMBERS.map((member) => (
              <tr key={member.id} className="border-b border-gray-800 hover:bg-white/5">
                <td className="p-4 font-bold text-lg" style={{ fontFamily: FONTS.HEADLINE, letterSpacing: '1px' }}>{member.name}</td>
                <td className="p-4 text-gray-300">{member.role}</td>
                <td className="p-4">
                  <span className={`text-xs font-bold ${member.dues === 'Paid' ? 'text-green-500' : 'text-red-400'}`}>
                    {member.dues}
                  </span>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-gray-800 text-xs rounded border border-gray-600">{member.status}</span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-gray-400 hover:text-white mr-3">Edit</button>
                  <button className="text-red-400 hover:text-red-300">Offboard</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TribalCard>
  </div>
);

// --- MAIN ADMIN LAYOUT ---

const AdminDashboard: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [activeModule, setActiveModule] = useState<string>('dashboard');

  const MENU_ITEMS: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'projects', label: 'Projects', icon: <FolderKanban size={20} /> },
    { id: 'members', label: 'Members', icon: <Users size={20} /> },
    { id: 'events', label: 'Events', icon: <CalendarIcon size={20} /> },
    { id: 'feedback', label: 'Feedback', icon: <MessageSquare size={20} /> },
    { id: 'blogs', label: 'Blogs', icon: <FileText size={20} /> },
  ];

  return (
    <div className="min-h-screen flex bg-[#3E2723] text-[#F4F1E8] font-sans overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;700&family=Pirata+One&family=Rye&display=swap');
      `}</style>

      {/* BACKGROUND PATTERN (Reused from your code) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]">
         <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern id="tribal-pat" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
               <path d="M0 20 L20 0 L40 20 L20 40 Z" fill="none" stroke="#FFBC00" strokeWidth="1"/>
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#tribal-pat)" />
         </svg>
      </div>

      {/* SIDEBAR NAVIGATION */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 bg-[#211E1E] border-r border-[#A83232]`}>
        <div className="h-full flex flex-col">
          {/* Logo Area */}
          <div className="h-24 flex items-center justify-center border-b border-[#A83232]/30">
            <div className="flex items-center gap-3">
               <img src={JCIlogo} alt="JCI" className="w-10 h-10 rounded-full border border-[#FFBC00]"/>
               <span className="text-2xl uppercase tracking-wide" style={{ fontFamily: FONTS.HEADLINE }}>Admin</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 py-8 px-4 space-y-2">
            {MENU_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveModule(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all group ${
                  activeModule === item.id ? 'bg-[#A83232] text-white' : 'text-gray-400 hover:bg-white/5 hover:text-[#FFBC00]'
                }`}
              >
                <span className={activeModule === item.id ? 'text-[#FFBC00]' : 'group-hover:text-[#FFBC00]'}>
                  {item.icon}
                </span>
                <span className="uppercase tracking-widest text-sm font-bold" style={{ fontFamily: FONTS.ACCENT }}>
                  {item.label}
                </span>
              </button>
            ))}
          </nav>

          {/* Logout Area */}
          <div className="p-4 border-t border-[#A83232]/30">
             <button className="w-full py-3 text-center text-red-400 hover:text-red-300 uppercase text-xs tracking-widest font-bold">
               Sign Out
             </button>
          </div>
        </div>
      </aside>

      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 flex items-center justify-between px-8 bg-[#3E2723]/90 border-b border-[#A83232]/30 backdrop-blur-sm z-20">
          <button className="lg:hidden text-[#FFBC00]" onClick={() => setSidebarOpen(true)}>
            <Menu size={28} />
          </button>
          
          <h2 className="text-3xl uppercase tracking-wider" style={{ fontFamily: FONTS.HEADLINE }}>
            {MENU_ITEMS.find(m => m.id === activeModule)?.label} Panel
          </h2>

          <div className="flex items-center gap-4">
             <span className="hidden md:inline text-sm font-bold text-[#FFBC00]" style={{ fontFamily: FONTS.BODY }}>
                Welcome, Admin
             </span>
             <div className="w-10 h-10 rounded-full bg-[#A83232] border-2 border-[#FFBC00]"></div>
          </div>
        </header>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 relative z-10">
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeModule === 'dashboard' && <DashboardOverview />}
              {activeModule === 'projects' && <ProjectsModule />}
              {activeModule === 'members' && <MembersModule />}
              {activeModule === 'events' && (
                <TribalCard title="Events Management">
                  <p className="text-gray-400 text-center py-12">Events Calendar and CRUD module goes here.</p>
                </TribalCard>
              )}
              {activeModule === 'blogs' && (
                <TribalCard title="Blog Management">
                   <div className="flex justify-end mb-4"><AdminButton>Write New Blog</AdminButton></div>
                   <p className="text-gray-400 text-center py-8">Blog list and Editor.</p>
                </TribalCard>
              )}
              {activeModule === 'feedback' && (
                <TribalCard title="User Feedback">
                  <p className="text-gray-400 text-center py-12">Feedback table from members.</p>
                </TribalCard>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;