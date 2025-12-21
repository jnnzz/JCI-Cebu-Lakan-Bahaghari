import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Calendar, FileText, CheckCircle, 
  XCircle, Plus, Trophy, BookOpen, MessageSquare, 
  Menu, Bell, Search, LogOut, ChevronRight, User,
  Clock, MapPin, Send, AlertCircle, Bookmark, Filter, 
  LucideIcon,
} from 'lucide-react';
import JCIlogo from '../assets/logo-JCI.png'; 

// --- TYPES ---
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

interface SectionHeaderProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

interface BadgeProps {
  status: string;
}

interface MemberStats {
  rankName: string;
  eventsAttended: number;
  projectsCompleted: number;
}

interface Activity {
  id: number;
  title: string;
  type: 'Event' | 'Project';
  date: string;
  role: string;
  status: 'Attended' | 'Completed';
}

interface Proposal {
  id: number;
  title: string;
  date: string;
  budget: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

interface BlogPost {
  id: number;
  title: string;
  author: string;
  date: string;
  readTime: string;
}

interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

// --- 1. REUSABLE UI COMPONENTS ---

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => (
  <div className={`relative group bg-[#1E1C1C]/80 backdrop-blur-md border border-white/[0.08] rounded-2xl shadow-2xl ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
    <div className="relative z-10 h-full">
      {children}
    </div>
  </div>
);

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, action }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 md:mb-8">
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-[#F4F1E8] tracking-tight">{title}</h2>
      {subtitle && <p className="text-xs text-gray-500 mt-2 font-mono tracking-wide uppercase">{subtitle}</p>}
    </div>
    {action && <div className="flex-shrink-0">{action}</div>}
  </div>
);

const Badge: React.FC<BadgeProps> = ({ status }) => {
    const styles: Record<string, string> = {
      'Completed': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      'Attended': 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-widest border ${styles[status] || 'bg-gray-800 text-gray-400 border-gray-700'}`}>
        <span className={`w-1.5 h-1.5 rounded-full mr-2 bg-current`}></span>
        {status}
      </span>
    );
  };

  

// --- CUSTOM SVG FOR FEEDBACK ---
const VoiceFeedbackSVG = () => (
  <div className="w-48 h-48 mx-auto relative">
    <motion.svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
      {/* Background Blob */}
      <circle cx="100" cy="110" r="60" fill="#FFBC00" fillOpacity="0.05" />
      
      {/* Character Body */}
      <path d="M100 160C120 160 135 180 135 180H65C65 180 80 160 100 160Z" fill="#3A3A3A" />
      
      {/* Character Head */}
      <circle cx="100" cy="125" r="25" fill="#F4F1E8" />
      
      {/* Megaphone Body */}
      <path d="M115 115L150 100V140L115 125V115Z" fill="#A83232" />
      <ellipse cx="150" cy="120" rx="5" ry="20" fill="#8B2525" />
      
      {/* Hand holding megaphone */}
      <circle cx="110" cy="135" r="8" fill="#F4F1E8" stroke="#121010" strokeWidth="2"/>
      
      {/* Floating Speech Bubbles (Animated) */}
      <motion.g 
        animate={{ y: [0, -5, 0], opacity: [0.6, 1, 0.6] }} 
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="50" cy="70" r="15" fill="#FFBC00" fillOpacity="0.8"/>
        <path d="M50 85L45 95L58 83" fill="#FFBC00" fillOpacity="0.8"/>
        <text x="42" y="75" fontSize="16" fill="#121010" fontWeight="bold">?</text>
      </motion.g>

      <motion.g 
        animate={{ y: [0, -8, 0], opacity: [0.4, 0.9, 0.4] }} 
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <circle cx="160" cy="60" r="10" fill="#A83232" fillOpacity="0.8"/>
        <path d="M160 70L155 78L165 68" fill="#A83232" fillOpacity="0.8"/>
        <text x="156" y="64" fontSize="10" fill="white" fontWeight="bold">!</text>
      </motion.g>
    </motion.svg>
  </div>
);


// --- 2. MOCK DATA ---

const MEMBER_STATS: MemberStats = { rankName: 'JCI Senator', eventsAttended: 12, projectsCompleted: 5 };
const MY_ACTIVITIES: Activity[] = [
    { id: 1, title: 'Induction Night 2024', type: 'Event', date: 'Jan 15, 2024', role: 'Attendee', status: 'Attended' },
    { id: 2, title: 'Barangay Clean-up', type: 'Project', date: 'Feb 02, 2024', role: 'Volunteer', status: 'Completed' },
];

const MY_PROPOSALS: Proposal[] = [
  { id: 1, title: 'Youth Tech Summit', date: 'Feb 10, 2025', budget: '₱25,000', status: 'Pending' },
  { id: 2, title: 'Community Garden', date: 'Jan 05, 2025', budget: '₱5,000', status: 'Approved' },
  { id: 3, title: 'Beach Party', date: 'Dec 12, 2024', budget: '₱50,000', status: 'Rejected' },
];

const BLOG_POSTS: BlogPost[] = [
  { id: 1, title: "The JCI Creed Explained", author: "Pres. Matt", date: "2 days ago", readTime: "5 min" },
  { id: 2, title: "Upcoming National Convention", author: "Sec. Gen", date: "1 week ago", readTime: "3 min" },
];

const ProgressSparkles = () => (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 pointer-events-none flex items-center justify-center">
        {/* Central Hot Spot (The burning tip) */}
        <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_3px_#FFBC00] animate-pulse relative z-10"></div>

        {/* Orbiting/Shooting Sparks */}
        {[...Array(8)].map((_, i) => (
           <motion.div
             key={i}
             // Base style for a spark
             className="absolute w-0.5 h-0.5 bg-white rounded-full"
             initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
             animate={{
               opacity: [1, 0],
               scale: [1, 0],
               // Move outwards in random directions like fireworks
               x: Math.cos(i * 45 * (Math.PI / 180)) * (Math.random() * 12 + 4),
               y: Math.sin(i * 45 * (Math.PI / 180)) * (Math.random() * 12 + 4),
             }}
             transition={{
               duration: 0.5 + Math.random() * 0.3, // Randomize duration for natural look
               repeat: Infinity,
               delay: Math.random() * 0.2, // Randomize delay so they don't pulse together
               ease: "easeOut"
             }}
             // Add a hot golden glow to the particles
             style={{ boxShadow: '0 0 4px 1px #FFBC00, 0 0 2px 0px white' }}
           />
        ))}
    </div>
);

// --- 3. MODULE COMPONENTS ---

const MemberHome = () => (
  <div className="space-y-6">
    {/* Gamification / Points Banner */}
    <GlassCard className="relative">
       {/* NOTE: Removed overflow-hidden from GlassCard so sparkles don't get clipped at the edge */}
      <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[#FFBC00]/10 to-transparent pointer-events-none rounded-r-2xl"></div>
      <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="text-center md:text-left">
          <h3 className="text-gray-400 font-mono text-xs uppercase tracking-widest mb-1">Current Standing</h3>
          <h2 className="text-4xl font-bold text-white mb-2">850 <span className="text-[#FFBC00] text-lg">Points</span></h2>
          <p className="text-gray-400 text-sm">You are <span className="text-white font-bold">150 points</span> away from {MEMBER_STATS.rankName} status.</p>
        </div>
        <div className="w-full md:w-1/2 space-y-2">
            <div className="flex justify-between text-xs font-mono text-gray-500">
              <span>Member</span>
              <span>{MEMBER_STATS.rankName}</span>
            </div>

            {/* --- PROGRESS BAR UPDATE START --- */}
            {/* 1. Container container: Removed overflow-hidden, added padding to contain the glow internally */}
            <div className="w-full h-3 bg-black/40 rounded-full border border-white/5 relative p-[1px]">
              {/* 2. The Filling Bar: Added relative positioning */}
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: '85%' }} 
                transition={{ duration: 1.5, ease: "easeOut" }}
                // Added rounded-full here specifically
                className="h-full bg-gradient-to-r from-[#A83232] to-[#FFBC00] rounded-full relative"
              >
                 {/* 3. Insert the Sparkle Component at the tip */}
                 <ProgressSparkles />
              </motion.div>
            </div>
            {/* --- PROGRESS BAR UPDATE END --- */}

        </div>
      </div>
    </GlassCard>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {/* Stats Cards */}
      <GlassCard className="p-6 flex items-center gap-4">
         <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400"><Calendar size={24}/></div>
         <div>
            <p className="text-2xl font-bold text-white">{MEMBER_STATS.eventsAttended}</p>
            <p className="text-xs text-gray-500 font-mono uppercase">Events Attended</p>
         </div>
      </GlassCard>
      
      <GlassCard className="p-6 flex items-center gap-4">
         <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400"><CheckCircle size={24}/></div>
         <div>
            <p className="text-2xl font-bold text-white">{MEMBER_STATS.projectsCompleted}</p>
            <p className="text-xs text-gray-500 font-mono uppercase">Projects Completed</p>
         </div>
      </GlassCard>

      <GlassCard className="p-6 flex items-center gap-4">
         <div className="p-3 bg-yellow-500/10 rounded-xl text-yellow-400"><FileText size={24}/></div>
         <div>
            <p className="text-2xl font-bold text-white">3</p>
            <p className="text-xs text-gray-500 font-mono uppercase">Active Proposals</p>
         </div>
      </GlassCard>
    </div>

    {/* Recent Activity */}
    <GlassCard>
      <div className="p-6 border-b border-white/5 flex justify-between items-center">
        <h3 className="font-bold text-white">Recent Activity</h3>
        <button className="text-xs text-[#FFBC00] font-mono hover:underline">View All</button>
      </div>
      <div className="divide-y divide-white/5">
        {MY_ACTIVITIES.map(act => (
          <div key={act.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.02]">
             <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center text-white ${act.type === 'Event' ? 'bg-purple-900/30 border border-purple-500/30' : 'bg-blue-900/30 border border-blue-500/30'}`}>
                  {act.type === 'Event' ? <Calendar size={18}/> : <CheckCircle size={18}/>}
                </div>
                <div>
                   <h4 className="text-sm font-bold text-gray-200">{act.title}</h4>
                   <p className="text-xs text-gray-500 font-mono">{act.date} • {act.role}</p>
                </div>
             </div>
             <div className="self-end sm:self-auto">
               <Badge status={act.status} />
             </div>
          </div>
        ))}
      </div>
    </GlassCard>
  </div>
);

const ProposalCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'New' | 'History'>('New'); // New, My Proposals

  return (
    <div className="space-y-6">
       <div className="flex bg-[#211E1E] p-1 rounded-lg border border-white/10 w-full sm:w-fit overflow-x-auto">
          {['New Proposal', 'My History'].map(t => (
            <button 
              key={t} 
              onClick={() => setActiveTab(t === 'New Proposal' ? 'New' : 'History')} 
              className={`flex-1 sm:flex-none px-4 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                (activeTab === 'New' && t === 'New Proposal') || (activeTab === 'History' && t === 'My History')
                ? 'bg-[#A83232] text-white shadow-lg' 
                : 'text-gray-400 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
       </div>

       {activeTab === 'New' ? (
         <GlassCard className="p-6 md:p-8 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/5">
               <div className="p-2 bg-[#FFBC00]/10 rounded-lg text-[#FFBC00]"><FileText size={24}/></div>
               <div>
                 <h3 className="text-xl font-bold text-white">Project Proposal Form</h3>
                 <p className="text-xs text-gray-500 font-mono">Submit your idea for board review.</p>
               </div>
            </div>
            
            <form className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-xs font-mono text-gray-400 uppercase">Project Title</label>
                     <input type="text" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#FFBC00] focus:outline-none transition-colors" placeholder="e.g. Youth Summit 2025"/>
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-mono text-gray-400 uppercase">Proposed Date</label>
                     <input type="date" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#FFBC00] focus:outline-none transition-colors"/>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-xs font-mono text-gray-400 uppercase">Budget Est. (PHP)</label>
                     <input type="number" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#FFBC00] focus:outline-none transition-colors" placeholder="0.00"/>
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-mono text-gray-400 uppercase">Chairman</label>
                     <input type="text" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#FFBC00] focus:outline-none transition-colors" defaultValue="Juan Dela Cruz (You)" readOnly/>
                  </div>
               </div>

               <div className="space-y-2">
                  <label className="text-xs font-mono text-gray-400 uppercase">Project Description & Objectives</label>
                  <textarea rows={4} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#FFBC00] focus:outline-none transition-colors" placeholder="Describe the impact of this project..."></textarea>
               </div>

               <div className="pt-4 flex flex-col sm:flex-row justify-end gap-3">
                  <button type="button" className="px-6 py-3 rounded-lg text-sm font-bold text-gray-400 hover:text-white transition-colors order-2 sm:order-1">Save Draft</button>
                  <button type="button" className="bg-[#A83232] hover:bg-red-700 text-white px-6 py-3 rounded-lg text-sm font-bold shadow-lg shadow-red-900/20 flex items-center justify-center gap-2 transition-all order-1 sm:order-2">
                    <Send size={16}/> Submit Proposal
                  </button>
               </div>
            </form>
         </GlassCard>
       ) : (
         <GlassCard className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs font-mono text-gray-500 border-b border-white/5 uppercase tracking-wider">
                    <th className="p-6 whitespace-nowrap">Project Title</th>
                    <th className="p-6 whitespace-nowrap">Submission Date</th>
                    <th className="p-6 whitespace-nowrap">Budget</th>
                    <th className="p-6 whitespace-nowrap">Status</th>
                    <th className="p-6 text-right whitespace-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {MY_PROPOSALS.map(prop => (
                    <tr key={prop.id} className="hover:bg-white/[0.02]">
                      <td className="p-6 font-bold text-white whitespace-nowrap">{prop.title}</td>
                      <td className="p-6 text-sm text-gray-400 font-mono whitespace-nowrap">{prop.date}</td>
                      <td className="p-6 text-sm text-gray-300 whitespace-nowrap">{prop.budget}</td>
                      <td className="p-6 whitespace-nowrap"><Badge status={prop.status}/></td>
                      <td className="p-6 text-right whitespace-nowrap">
                        {prop.status === 'Rejected' ? (
                          <button className="text-xs text-[#FFBC00] hover:underline">View Reason</button>
                        ) : (
                          <button className="text-gray-500 hover:text-white"><ChevronRight size={18}/></button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
         </GlassCard>
       )}
    </div>
  );
};

const PakkbookView = () => (
  <div className="flex flex-col items-center justify-center h-[60vh] space-y-6 text-center px-4">
      <div className="relative">
        <div className="absolute inset-0 bg-[#FFBC00] blur-[40px] opacity-20 rounded-full"></div>
        <BookOpen size={60} className="text-[#F4F1E8] relative z-10 md:w-20 md:h-20"/>
      </div>
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tighter mb-2">PAKKBOOK</h2>
        <p className="text-gray-400 max-w-md mx-auto text-sm md:text-base">Exclusive member resources, directories, and playbooks.</p>
      </div>
      <div className="p-4 border border-white/10 bg-white/5 rounded-lg max-w-sm w-full">
        <p className="text-xs font-mono text-[#FFBC00] flex items-center justify-center gap-2">
          <AlertCircle size={14}/> COMING SOON
        </p>
        <p className="text-xs text-gray-500 mt-1">Content to be provided by Pres. Matt.</p>
      </div>
  </div>
);

const BlogReader = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {BLOG_POSTS.map((blog, idx) => (
      <GlassCard key={idx} className="flex flex-col h-full cursor-pointer hover:border-[#A83232]/50 transition-colors">
        <div className="h-48 bg-gray-800 relative overflow-hidden">
           {/* Placeholder for Blog Image */}
           <div className="absolute inset-0 flex items-center justify-center bg-[#121010]">
              <FileText size={40} className="text-gray-700"/>
           </div>
           <div className="absolute top-4 left-4">
              <span className="bg-[#A83232] text-white text-[10px] font-bold px-2 py-1 rounded">NEWS</span>
           </div>
        </div>
        <div className="p-6 flex flex-col flex-1">
           <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono mb-3">
              <Clock size={12}/> {blog.date} • {blog.readTime} read
           </div>
           <h3 className="text-xl font-bold text-white mb-2 leading-tight">{blog.title}</h3>
           <p className="text-sm text-gray-400 line-clamp-3 mb-4 flex-1">
             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
           </p>
           <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <span className="text-xs text-[#FFBC00] font-bold">By {blog.author}</span>
              <Bookmark size={16} className="text-gray-500 hover:text-white"/>
           </div>
        </div>
      </GlassCard>
    ))}
  </div>
);

const FeedbackForm = () => (
  <div className="max-w-2xl mx-auto">
     <GlassCard className="p-6 md:p-8 relative overflow-hidden">
        {/* Decorative Background Blob */}
        <div className="absolute top-[-50px] right-[-50px] w-[150px] h-[150px] bg-[#A83232] rounded-full blur-[80px] opacity-20 pointer-events-none"></div>

        <div className="text-center mb-8 relative z-10">
           {/* CUTE CUSTOM SVG INSERTED HERE */}
           <VoiceFeedbackSVG />
           
           <h3 className="text-2xl font-bold text-white mt-4">We Value Your Voice</h3>
           <p className="text-sm text-gray-400 mt-2 px-4">Share your thoughts, concerns, or suggestions for the chapter.</p>
        </div>

        <form className="space-y-4 relative z-10">
           <div>
              <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">Subject</label>
              <select className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-gray-300 focus:border-[#FFBC00] focus:outline-none">
                 <option>General Feedback</option>
                 <option>Event Suggestion</option>
                 <option>Project Complaint</option>
                 <option>Site Issue</option>
              </select>
           </div>
           <div>
              <label className="text-xs font-mono text-gray-400 uppercase mb-2 block">Message</label>
              <textarea rows={5} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#FFBC00] focus:outline-none" placeholder="Type your message here..."></textarea>
           </div>
           <div className="flex items-center gap-2">
              <input type="checkbox" id="anon" className="rounded bg-black/20 border-white/10 text-[#A83232] focus:ring-0"/>
              <label htmlFor="anon" className="text-xs text-gray-400">Submit Anonymously</label>
           </div>
           <button type="button" className="w-full bg-[#A83232] hover:bg-red-700 text-white py-3 rounded-lg font-bold shadow-lg shadow-red-900/20 transition-all mt-4">
             Send Feedback
           </button>
        </form>
     </GlassCard>
  </div>
);

// --- 4. MAIN LAYOUT SHELL ---

const MemberDashboard: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [activeModule, setActiveModule] = useState<string>('dashboard');

  const MENU: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'proposals', label: 'Project Center', icon: FileText }, 
    { id: 'pakkbook', label: 'PAKKBOOK', icon: BookOpen },
    { id: 'blogs', label: 'JCI Blogs', icon: MapPin }, 
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
  ];

  const renderContent = () => {
    switch(activeModule) {
      case 'dashboard': return <MemberHome />;
      case 'proposals': return <ProposalCenter />;
      case 'pakkbook': return <PakkbookView />;
      case 'blogs': return <BlogReader />;
      case 'feedback': return <FeedbackForm />;
      default: return <MemberHome />;
    }
  };

  return (
    <div className="min-h-screen bg-[#121010] text-[#F4F1E8] font-sans selection:bg-[#A83232] selection:text-white overflow-hidden relative">
      {/* 0. NOISE TEXTURE */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>
      <div className="fixed top-[-20%] left-[20%] w-[500px] h-[500px] bg-[#A83232] rounded-full blur-[120px] opacity-10 pointer-events-none"></div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
        body { font-family: 'Outfit', sans-serif; }
      `}</style>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} 
          />
        )}
      </AnimatePresence>

      <div className="flex h-screen relative z-10">
        {/* SIDEBAR */}
        <motion.aside 
          className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#171515]/95 backdrop-blur-xl border-r border-white/5 transform lg:translate-x-0 transition-transform duration-300 flex flex-col shadow-2xl lg:shadow-none
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          {/* Logo Area */}
          <div className="h-20 md:h-24 flex items-center px-6 md:px-8 border-b border-white/5 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#A83232] to-[#FFBC00]"></div>
             <div className="flex items-center gap-3">
               <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-[#FFBC00]/20 p-0.5">
                  <img src={JCIlogo} alt="JCI" className="w-full h-full rounded-full object-cover"/>
               </div>
               <div>
                 <h1 className="text-lg md:text-xl font-bold tracking-tight text-white">JCI MEMBER</h1>
                 <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Portal</p>
               </div>
             </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6 md:py-8 px-4 space-y-1 overflow-y-auto">
            {MENU.map((item) => {
              const isActive = activeModule === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { setActiveModule(item.id); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden group ${
                    isActive ? 'text-white' : 'text-gray-400 hover:text-[#FFBC00]'
                  }`}
                >
                  {isActive && (
                    <motion.div layoutId="nav-bg" className="absolute inset-0 bg-gradient-to-r from-[#A83232]/20 to-transparent border-l-2 border-[#A83232]" />
                  )}
                  <item.icon size={20} className={`relative z-10 ${isActive ? 'text-[#FFBC00]' : 'group-hover:text-[#FFBC00] transition-colors'}`} />
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 md:p-6 border-t border-white/5">
             <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors cursor-pointer group">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#FFBC00] text-black flex items-center justify-center font-bold text-xs md:text-sm">
                   JD
                </div>
                <div className="flex-1 overflow-hidden">
                   <p className="text-sm font-bold text-white truncate">Juan Dela Cruz</p>
                   <p className="text-[10px] text-gray-500 truncate font-mono">juan@jci.org.ph</p>
                </div>
                <LogOut size={16} className="text-gray-600 group-hover:text-red-400 transition-colors"/>
             </div>
          </div>
        </motion.aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden">
           {/* Header */}
           <header className="h-16 md:h-20 flex items-center justify-between px-4 md:px-12 border-b border-white/5 bg-[#121010]/80 backdrop-blur-sm z-20">
              <div className="flex items-center gap-4">
                 <button className="lg:hidden p-2 text-gray-400 hover:text-white" onClick={() => setSidebarOpen(true)}><Menu/></button>
                 <div className="hidden md:flex items-center text-sm text-gray-500 font-mono">
                   <span>Member Portal</span>
                   <ChevronRight size={14} className="mx-2"/>
                   <span className="text-[#FFBC00] uppercase">{MENU.find(m => m.id === activeModule)?.label}</span>
                 </div>
              </div>
              <div className="flex items-center gap-4 md:gap-6">
                 <div className="hidden sm:flex relative">
                    <Search className="absolute left-3 top-2.5 text-gray-600" size={16}/>
                    <input type="text" placeholder="Search resources..." className="bg-black/20 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-gray-300 focus:outline-none focus:border-[#FFBC00]/50 w-48 md:w-64 transition-all"/>
                 </div>
                 <button className="relative text-gray-400 hover:text-white transition-colors">
                    <Bell size={20}/>
                 </button>
              </div>
           </header>

           {/* Scroll Content */}
           <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 scroll-smooth">
              <div className="max-w-7xl mx-auto pb-20">
                 <AnimatePresence mode="wait">
                    <motion.div
                       key={activeModule}
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, y: -10 }}
                       transition={{ duration: 0.2 }}
                    >
                       <SectionHeader 
                          title={MENU.find(m => m.id === activeModule)?.label} 
                          subtitle={activeModule === 'dashboard' ? `Welcome back, Juan.` : `Management`}
                          action={activeModule === 'dashboard' ? (
                             <button className="bg-[#A83232] text-white px-4 py-2 md:px-6 md:py-2 rounded-lg font-bold text-xs md:text-sm shadow-lg shadow-red-900/20 hover:bg-red-700 transition-all flex items-center gap-2">
                                <Trophy size={16}/> <span className="hidden sm:inline">Leaderboard</span>
                             </button>
                          ) : null}
                       />
                       {renderContent()}
                    </motion.div>
                 </AnimatePresence>
              </div>
           </div>
        </main>
      </div>
    </div>
  );
};

export default MemberDashboard;