import React, { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Users, FolderKanban, Calendar as CalendarIcon, 
  MessageSquare, FileText, Menu, Check, XCircle, Search, 
  Plus, DollarSign, TrendingUp, TrendingDown, Eye, Bell, 
  Settings, LogOut, UserPlus, UserMinus, BarChart3, ChevronRight,
  Edit, Trash2, Reply, MoreVertical, Filter, Download, LucideIcon
} from 'lucide-react';

// --- 1. TYPES & INTERFACES ---

export type StatusType = 'Proposed' | 'Pending' | 'In Progress' | 'Completed' | 'Approved' | 'Rejected' | 'Active' | 'Paid' | 'Unpaid' | 'Separated' | 'OTI' | 'Event' | 'Draft';

export interface Project {
  id: number;
  title: string;
  proponent: string;
  status: StatusType;
  date: string;
  budget: string;
}

export interface Member {
  id: number;
  name: string;
  role: string;
  status: StatusType;
  dues: StatusType | 'N/A';
  email: string;
}

export interface JCIEvent {
  id: number;
  title: string;
  type: StatusType;
  date: string;
  status: StatusType;
}

export interface Feedback {
  id: number;
  user: string;
  text: string;
  date: string;
}

export interface Blog {
  id: number;
  title: string;
  status: StatusType;
  date: string;
}

export interface DashboardStat {
  label: string;
  value: string;
  sub: string;
  icon: LucideIcon;
  color: string;
}

// --- 2. REUSABLE PREMIUM COMPONENTS ---

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => (
  <div className={`relative group bg-[#1E1C1C]/80 backdrop-blur-md border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    <div className="relative z-10 h-full">{children}</div>
  </div>
);

interface SectionHeaderProps {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, action }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
    <div>
      <h2 className="text-3xl font-bold text-[#F4F1E8] tracking-tight">{title}</h2>
      {subtitle && <p className="text-xs text-gray-500 mt-2 font-mono tracking-wide uppercase">{subtitle}</p>}
    </div>
    {action && <div className="flex-shrink-0">{action}</div>}
  </div>
);

const Badge: React.FC<{ status: StatusType | string }> = ({ status }) => {
  const styles: Record<string, string> = {
    'Proposed': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    'Pending': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    'In Progress': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'Completed': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Approved': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Rejected': 'bg-red-500/10 text-red-400 border-red-500/20',
    'Active': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Paid': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Unpaid': 'bg-red-500/10 text-red-400 border-red-500/20',
    'Separated': 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    'OTI': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    'Event': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-widest border ${styles[status] || 'bg-gray-800 text-gray-400 border-gray-700'}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-2 ${['Active','Paid','In Progress'].includes(status) ? 'animate-pulse bg-current' : 'bg-current'}`}></span>
      {status}
    </span>
  );
};

// --- 3. MOCK DATA ---

const DASHBOARD_STATS: DashboardStat[] = [
  { label: 'Registered', value: '142', sub: '+12 this month', icon: Users, color: 'text-blue-400' },
  { label: 'Inducted', value: '89', sub: 'Target: 100', icon: UserPlus, color: 'text-emerald-400' },
  { label: 'Dues Collected', value: '₱45,200', sub: '92% Rate', icon: DollarSign, color: 'text-yellow-400' },
  { label: 'Attrition', value: '4.2%', sub: '-1.5% vs last yr', icon: TrendingDown, color: 'text-red-400' },
];

const PROJECTS: Project[] = [
  { id: 1, title: 'Barangay Clean-up', proponent: 'Comm. Juan', status: 'Proposed', date: 'Feb 10', budget: '₱5,000' },
  { id: 2, title: 'Youth Summit', proponent: 'VP Sarah', status: 'In Progress', date: 'Mar 15', budget: '₱25,000' },
  { id: 3, title: 'Charity Gala', proponent: 'Pres. Matt', status: 'Rejected', date: 'Apr 20', budget: '₱100,000' },
  { id: 4, title: 'Tech Bootcamp', proponent: 'Dir. Alex', status: 'Completed', date: 'Jan 10', budget: '₱10,000' },
];

const MEMBERS: Member[] = [
  { id: 1, name: 'Juan Dela Cruz', role: 'Member', status: 'Active', dues: 'Paid', email: 'juan@jci.ph' },
  { id: 2, name: 'Maria Clara', role: 'VP Internal', status: 'Active', dues: 'Unpaid', email: 'maria@jci.ph' },
  { id: 3, name: 'Jose Rizal', role: 'Alumni', status: 'Separated', dues: 'N/A', email: 'jose@jci.ph' },
];

const EVENTS: JCIEvent[] = [
  { id: 1, title: 'General Membership Meeting', type: 'OTI', date: '2025-02-15', status: 'Proposed' },
  { id: 2, title: 'Induction Night', type: 'Event', date: '2025-03-01', status: 'In Progress' },
];

const FEEDBACK: Feedback[] = [
  { id: 1, user: 'Anonymous', text: "The venue for the GMM was too small.", date: '2 days ago' },
  { id: 2, user: 'Member #42', text: "Great job on the community outreach!", date: '1 week ago' },
];

const BLOGS: Blog[] = [
  { id: 1, title: "Recap: JCI Week 2025", status: "Active", date: "Jan 20" },
  { id: 2, title: "Message from the President", status: "Draft", date: "Feb 01" },
];

// --- 4. MODULE VIEWS ---

const DashboardHome: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {DASHBOARD_STATS.map((stat, idx) => (
          <GlassCard key={idx} className="p-6 flex flex-col justify-between h-32 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12 transform scale-150">
               <stat.icon size={64} className="text-white" />
            </div>
            <div className="flex justify-between items-start z-10">
              <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">{stat.label}</span>
              <stat.icon size={18} className={stat.color} />
            </div>
            <div className="z-10">
              <h4 className="text-3xl font-bold text-[#F4F1E8] font-mono tracking-tighter">{stat.value}</h4>
              <p className={`text-[10px] font-medium mt-1 ${stat.label === 'Attrition' ? 'text-green-400' : 'text-gray-500'}`}>{stat.sub}</p>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="p-0 col-span-1 lg:col-span-2 flex flex-col">
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-white text-lg">Recruitment Analytics</h3>
              <p className="text-xs text-gray-500 font-mono">Q1 2025 Performance</p>
            </div>
            <button className="text-xs text-gray-400 font-mono border border-white/10 px-3 py-1 rounded hover:text-[#FFBC00] hover:border-[#FFBC00] transition-colors">
              View Reports &rarr;
            </button>
          </div>

          <div className="grid grid-cols-3 divide-x divide-white/5 border-b border-white/5 bg-white/[0.01]">
              {[ {l: 'Applicants', v: '150', c: 'bg-yellow-500', w: 'w-full'}, 
                 {l: 'Interviewed', v: '110', c: 'bg-blue-500', w: 'w-[73%]'}, 
                 {l: 'Inducted', v: '89', c: 'bg-emerald-500', w: 'w-[59%]'} 
              ].map((item, i) => (
                <div key={i} className="p-6 text-center hover:bg-white/[0.02] transition-colors">
                  <span className="text-xs text-gray-500 font-mono uppercase block mb-2">{item.l}</span>
                  <span className={`text-2xl font-bold block ${item.l === 'Inducted' ? 'text-emerald-400' : 'text-white'}`}>{item.v}</span>
                  <div className={`w-16 h-1 mx-auto ${item.c}/30 rounded-full mt-3 overflow-hidden`}>
                    <div className={`h-full ${item.c} ${item.w}`}></div>
                  </div>
                </div>
              ))}
          </div>

          <div className="p-8 relative">
              <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 relative z-10">
                <div className="absolute inset-0 flex flex-col justify-between z-0 opacity-20 pointer-events-none">
                   {[1,2,3,4,5].map(i => <div key={i} className={`w-full border-t ${i===5?'border-gray-500':'border-dashed border-gray-500'}`}></div>)}
                </div>

                {[35, 55, 45, 70, 50, 85, 40, 65, 55, 95, 60, 80].map((h, i) => (
                  <div 
                    key={i} 
                    className="flex-1 flex flex-col justify-end relative z-10 h-full"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <AnimatePresence>
                      {hoveredIndex === i && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 5, scale: 0.95 }}
                          className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[#171515] text-white py-2 px-3 rounded-lg border border-white/20 shadow-2xl z-50 pointer-events-none"
                        >
                           <div className="flex flex-col items-center">
                             <span className="text-lg font-bold text-[#FFBC00] leading-none">{h}</span>
                             <span className="text-[9px] text-gray-400 font-mono uppercase tracking-wide">Candidates</span>
                           </div>
                           <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#171515] border-r border-b border-white/20 rotate-45 transform"></div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.div 
                      initial={{ height: 0 }} 
                      animate={{ height: `${h}%` }} 
                      transition={{ delay: i * 0.05, duration: 0.5 }}
                      className={`w-full rounded-t-sm cursor-pointer transition-all duration-300
                        ${i % 2 === 0 ? 'bg-[#A83232]' : 'bg-[#2a2626] border border-white/10'}
                        ${hoveredIndex === i ? 'opacity-100 shadow-[0_0_20px_rgba(255,188,0,0.3)] bg-[#FFBC00] border-[#FFBC00]' : 'opacity-70'}
                      `}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-[10px] font-mono text-gray-500 uppercase">
                {['Week 1','Week 2','Week 3','Week 4','Week 5','Week 6'].map(w => <span key={w}>{w}</span>)}
              </div>
          </div>
        </GlassCard>

        <GlassCard className="p-0">
          <div className="p-6 border-b border-white/5"><h3 className="font-bold text-white">Upcoming</h3></div>
          <div className="divide-y divide-white/5">
              {[
                { d: '15', m: 'FEB', title: 'GMM Night', type: 'OTI' },
                { d: '28', m: 'FEB', title: 'Clean-up', type: 'Project' },
                { d: '05', m: 'MAR', title: 'Board Meeting', type: 'Admin' },
                { d: '12', m: 'MAR', title: 'Recruitment', type: 'Event' },
              ].map((evt, i) => (
                <div key={i} className="p-4 flex gap-4 hover:bg-white/[0.02] transition-colors cursor-pointer group">
                  <div className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-[#2a2626] border border-white/10 group-hover:border-[#FFBC00] transition-colors">
                    <span className="text-[10px] text-gray-400 font-mono">{evt.m}</span>
                    <span className="text-lg font-bold text-white">{evt.d}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-200 group-hover:text-[#FFBC00] transition-colors">{evt.title}</h4>
                    <p className="text-xs text-gray-500 font-mono mt-1 flex items-center gap-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${evt.type === 'OTI' ? 'bg-purple-500' : 'bg-blue-500'}`}></span>
                      {evt.type}
                    </p>
                  </div>
                </div>
              ))}
          </div>
          <div className="p-4 border-t border-white/5">
              <button className="w-full py-2 text-xs text-gray-400 hover:text-white border border-dashed border-gray-700 rounded hover:border-gray-500 transition-all">View All Events</button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

const CalendarView: React.FC = () => (
  <GlassCard className="h-[75vh] flex flex-col p-6">
    <div className="flex justify-between items-center mb-6">
       <div className="flex gap-4 items-center">
          <h2 className="text-2xl font-bold text-white">February 2025</h2>
          <div className="flex gap-2">
             <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5"><ChevronRight className="rotate-180" size={16}/></button>
             <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5"><ChevronRight size={16}/></button>
          </div>
       </div>
       <button className="bg-[#A83232] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-red-900/20 hover:bg-red-700 transition-all flex items-center gap-2">
          <Plus size={16}/> Add Event
       </button>
    </div>
    <div className="grid grid-cols-7 border-b border-white/5 pb-2 mb-2">
      {['SUN','MON','TUE','WED','THU','FRI','SAT'].map(d => (
        <div key={d} className="text-center text-[10px] font-mono text-gray-500">{d}</div>
      ))}
    </div>
    <div className="flex-1 grid grid-cols-7 grid-rows-5 gap-1">
      {Array.from({length: 35}).map((_, i) => {
        const day = i + 1;
        const isProject = day === 10;
        const isEvent = day === 15;
        return (
          <div key={i} className={`p-2 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors relative group ${day > 28 ? 'opacity-30' : ''}`}>
             <span className="text-xs font-mono text-gray-400">{day > 28 ? day - 28 : day}</span>
             {isProject && <div className="mt-2 text-[9px] bg-blue-500/20 text-blue-300 border border-blue-500/20 p-1 rounded truncate">Clean-up</div>}
             {isEvent && <div className="mt-2 text-[9px] bg-purple-500/20 text-purple-300 border border-purple-500/20 p-1 rounded truncate">GMM Night</div>}
          </div>
        )
      })}
    </div>
  </GlassCard>
);

const ProjectManager: React.FC = () => {
  const [tab, setTab] = useState<string>('Overview');
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
         <div className="flex bg-[#211E1E] p-1 rounded-lg border border-white/10">
            {['Overview', 'Proposals', 'Active', 'Rejected'].map(t => (
              <button key={t} onClick={() => setTab(t)} className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${tab === t ? 'bg-[#A83232] text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>
                {t}
              </button>
            ))}
         </div>
         <button className="flex items-center gap-2 bg-[#F4F1E8] text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-white transition-colors">
           <Plus size={16}/> New Proposal
         </button>
      </div>

      <GlassCard className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-xs font-mono text-gray-500 border-b border-white/5 uppercase tracking-wider">
              <th className="p-6">Project</th>
              <th className="p-6">Proponent</th>
              <th className="p-6">Timeline</th>
              <th className="p-6">Status</th>
              <th className="p-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {PROJECTS.filter(p => {
               if(tab === 'Proposals') return p.status === 'Proposed';
               if(tab === 'Active') return p.status === 'In Progress' || p.status === 'Completed';
               if(tab === 'Rejected') return p.status === 'Rejected';
               return true; 
            }).map((p) => (
              <tr key={p.id} className="group hover:bg-white/[0.02] transition-colors">
                <td className="p-6">
                   <div className="font-bold text-[#F4F1E8]">{p.title}</div>
                   <div className="text-xs text-gray-500 mt-1 font-mono">{p.budget}</div>
                </td>
                <td className="p-6 text-sm text-gray-300">{p.proponent}</td>
                <td className="p-6 text-sm text-gray-400 font-mono">{p.date}</td>
                <td className="p-6"><Badge status={p.status}/></td>
                <td className="p-6 text-right flex justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                   {p.status === 'Proposed' ? (
                     <>
                       <button className="p-2 hover:bg-green-500/20 text-green-400 rounded"><Check size={16}/></button>
                       <button className="p-2 hover:bg-red-500/20 text-red-400 rounded"><XCircle size={16}/></button>
                     </>
                   ) : (
                     <button className="text-xs text-[#FFBC00] hover:underline font-mono">VIEW_DETAILS</button>
                   )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  );
};

const MemberManager: React.FC = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
       <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-600" size={16}/>
          <input type="text" placeholder="Search members..." className="bg-black/20 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-gray-300 focus:outline-none focus:border-[#FFBC00]/50 w-64"/>
       </div>
       <div className="flex gap-2">
          <button className="px-4 py-2 border border-white/10 rounded-lg text-sm text-gray-400 hover:text-white hover:border-[#FFBC00] transition-colors"><Download size={16}/></button>
          <button className="bg-[#A83232] text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2"><UserPlus size={16}/> Add</button>
       </div>
    </div>
    <GlassCard className="overflow-x-auto">
       <table className="w-full text-left">
          <thead>
             <tr className="text-xs font-mono text-gray-500 border-b border-white/5 uppercase tracking-wider">
                <th className="p-6">Member Info</th>
                <th className="p-6">Position</th>
                <th className="p-6">Dues</th>
                <th className="p-6">Status</th>
                <th className="p-6 text-right">Opts</th>
             </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
             {MEMBERS.map(m => (
                <tr key={m.id} className="group hover:bg-white/[0.02]">
                   <td className="p-6">
                      <div className="font-bold text-white">{m.name}</div>
                      <div className="text-xs text-gray-500 font-mono">{m.email}</div>
                   </td>
                   <td className="p-6 text-sm text-gray-300">{m.role}</td>
                   <td className="p-6"><Badge status={m.dues}/></td>
                   <td className="p-6"><Badge status={m.status}/></td>
                   <td className="p-6 text-right flex justify-end gap-2 opacity-50 group-hover:opacity-100">
                      <button className="p-2 hover:text-[#FFBC00]"><DollarSign size={16}/></button>
                      <button className="p-2 hover:text-white"><Edit size={16}/></button>
                      <button className="p-2 hover:text-red-400"><UserMinus size={16}/></button>
                   </td>
                </tr>
             ))}
          </tbody>
       </table>
    </GlassCard>
  </div>
);

const EventManager: React.FC = () => (
  <div className="space-y-6">
     <div className="grid grid-cols-3 gap-6">
        {[ {l: 'Proposed Events', v: '2', c: 'border-[#FFBC00]'}, 
           {l: 'Upcoming', v: '1', c: 'border-[#A83232]'}, 
           {l: 'Completed', v: '8', c: 'border-emerald-500'} 
        ].map((s, i) => (
          <GlassCard key={i} className={`p-6 border-l-2 ${s.c} flex flex-col justify-center`}>
             <span className="text-xs font-mono text-gray-500 uppercase">{s.l}</span>
             <span className="text-3xl font-bold text-white mt-2">{s.v}</span>
          </GlassCard>
        ))}
     </div>
     <GlassCard>
        <table className="w-full text-left">
           <thead>
              <tr className="text-xs font-mono text-gray-500 border-b border-white/5 uppercase tracking-wider">
                 <th className="p-6">Event Title</th>
                 <th className="p-6">Type</th>
                 <th className="p-6">Date</th>
                 <th className="p-6">Status</th>
                 <th className="p-6 text-right"></th>
              </tr>
           </thead>
           <tbody className="divide-y divide-white/5">
              {EVENTS.map(e => (
                 <tr key={e.id} className="hover:bg-white/[0.02]">
                    <td className="p-6 font-bold text-white">{e.title}</td>
                    <td className="p-6 text-sm text-gray-300">{e.type}</td>
                    <td className="p-6 text-sm text-gray-400 font-mono">{e.date}</td>
                    <td className="p-6"><Badge status={e.status}/></td>
                    <td className="p-6 text-right"><button className="text-gray-500 hover:text-white"><MoreVertical size={18}/></button></td>
                 </tr>
              ))}
           </tbody>
        </table>
     </GlassCard>
  </div>
);

const FeedbackAndBlogs: React.FC<{ type: 'feedback' | 'blogs' }> = ({ type }) => (
  <div className="space-y-6">
     <div className="flex justify-end">
        {type === 'blogs' && (
           <button className="bg-[#A83232] text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2"><Plus size={16}/> New Blog</button>
        )}
     </div>
     {type === 'feedback' ? (
        <div className="grid gap-4">
           {FEEDBACK.map(f => (
              <GlassCard key={f.id} className="p-6">
                 <div className="flex justify-between mb-2">
                    <span className="font-bold text-[#FFBC00]">{f.user}</span>
                    <span className="text-xs text-gray-500 font-mono">{f.date}</span>
                 </div>
                 <p className="text-gray-300 italic text-sm">"{f.text}"</p>
                 <div className="mt-4"><button className="text-xs bg-white/5 hover:bg-white/10 px-3 py-1 rounded text-white border border-white/5 flex items-center gap-1"><Reply size={12}/> Reply</button></div>
              </GlassCard>
           ))}
        </div>
     ) : (
        <div className="grid md:grid-cols-2 gap-6">
           {BLOGS.map(b => (
              <GlassCard key={b.id} className="group cursor-pointer">
                 <div className="h-40 bg-black/40 border-b border-white/5 flex items-center justify-center">
                    <FileText size={40} className="text-gray-700 group-hover:text-[#A83232] transition-colors"/>
                 </div>
                 <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                       <h4 className="font-bold text-white text-lg">{b.title}</h4>
                       <Badge status={b.status === 'Active' ? 'Active' : 'Pending'}/>
                    </div>
                    <p className="text-xs text-gray-500 font-mono mb-4">{b.date}</p>
                    <div className="flex gap-2">
                       <button className="text-gray-400 hover:text-white"><Edit size={16}/></button>
                       <button className="text-gray-400 hover:text-red-400"><Trash2 size={16}/></button>
                    </div>
                 </div>
              </GlassCard>
           ))}
        </div>
     )}
  </div>
);

// --- 5. MAIN DASHBOARD SHELL ---

const AdminDashboard: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [activeModule, setActiveModule] = useState<string>('dashboard');

  const MENU = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'members', label: 'Membership', icon: Users },
    { id: 'events', label: 'Events', icon: CalendarIcon },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
    { id: 'blogs', label: 'Blogs', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-[#121010] text-[#F4F1E8] font-sans selection:bg-[#A83232] selection:text-white overflow-hidden relative">
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>
      <div className="fixed top-[-20%] left-[20%] w-[500px] h-[500px] bg-[#A83232] rounded-full blur-[120px] opacity-10 pointer-events-none"></div>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} 
          />
        )}
      </AnimatePresence>

      <div className="flex h-screen relative z-10">
        <motion.aside 
          className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#171515]/90 backdrop-blur-xl border-r border-white/5 transform lg:translate-x-0 transition-transform duration-300 flex flex-col
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="h-24 flex items-center px-8 border-b border-white/5 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#A83232] to-[#FFBC00]"></div>
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full border-2 border-[#FFBC00]/20 p-0.5 bg-gray-800" />
               <div>
                 <h1 className="text-xl font-bold tracking-tight text-white">JCI ADMIN</h1>
                 <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Chapter Console</p>
               </div>
             </div>
          </div>

          <nav className="flex-1 py-8 px-4 space-y-1">
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
                  {isActive && <motion.div layoutId="nav-bg" className="absolute inset-0 bg-gradient-to-r from-[#A83232]/20 to-transparent border-l-2 border-[#A83232]" />}
                  <item.icon size={20} className={`relative z-10 ${isActive ? 'text-[#FFBC00]' : 'group-hover:text-[#FFBC00]'}`} />
                  <span className="relative z-10">{item.label}</span>
                  {isActive && <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-[#FFBC00] shadow-[0_0_10px_#FFBC00]" />}
                </button>
              );
            })}
          </nav>

          <div className="p-6 border-t border-white/5">
             <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-700 to-black flex items-center justify-center text-xs font-bold font-mono text-gray-300 border border-white/5 group-hover:text-white">AD</div>
                <div className="flex-1 overflow-hidden">
                   <p className="text-sm font-bold text-white truncate">Administrator</p>
                   <p className="text-[10px] text-gray-500 truncate font-mono">admin@jci.org.ph</p>
                </div>
                <LogOut size={16} className="text-gray-600 group-hover:text-red-400"/>
             </div>
          </div>
        </motion.aside>

        <main className="flex-1 flex flex-col h-screen overflow-hidden">
           <header className="h-20 flex items-center justify-between px-6 lg:px-12 border-b border-white/5 bg-[#121010]/50 backdrop-blur-sm z-20">
              <div className="flex items-center gap-4">
                 <button className="lg:hidden p-2 text-gray-400" onClick={() => setSidebarOpen(true)}><Menu/></button>
                 <div className="hidden md:flex items-center text-sm text-gray-500 font-mono">
                    <span>JCI</span><ChevronRight size={14} className="mx-2"/><span className="text-[#FFBC00] uppercase">{MENU.find(m => m.id === activeModule)?.label}</span>
                 </div>
              </div>
              <div className="flex items-center gap-6">
                 <div className="hidden sm:flex relative">
                    <Search className="absolute left-3 top-2.5 text-gray-600" size={16}/>
                    <input type="text" placeholder="Command..." className="bg-black/20 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-gray-300 focus:outline-none focus:border-[#FFBC00]/50 w-64"/>
                 </div>
                 <button className="relative text-gray-400 hover:text-white"><Bell size={20}/><span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" /></button>
              </div>
           </header>

           <div className="flex-1 overflow-y-auto p-6 lg:p-12 scroll-smooth">
              <div className="max-w-7xl mx-auto pb-20">
                 <AnimatePresence mode="wait">
                    <motion.div
                       key={activeModule}
                       initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
                    >
                       <SectionHeader 
                          title={MENU.find(m => m.id === activeModule)?.label} 
                          subtitle={`Management Console / ${activeModule}`}
                          action={activeModule === 'dashboard' ? <button className="bg-[#A83232] text-white px-6 py-2 rounded-lg font-bold text-sm shadow-lg shadow-red-900/20 hover:bg-red-700 flex items-center gap-2"><FileText size={16}/> Generate Report</button> : null}
                       />
                       {activeModule === 'dashboard' && <DashboardHome />}
                       {activeModule === 'calendar' && <CalendarView />}
                       {activeModule === 'projects' && <ProjectManager />}
                       {activeModule === 'members' && <MemberManager />}
                       {activeModule === 'events' && <EventManager />}
                       {activeModule === 'feedback' && <FeedbackAndBlogs type="feedback" />}
                       {activeModule === 'blogs' && <FeedbackAndBlogs type="blogs" />}
                    </motion.div>
                 </AnimatePresence>
              </div>
           </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;