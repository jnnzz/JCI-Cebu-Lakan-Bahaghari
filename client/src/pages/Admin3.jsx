import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Users, FolderKanban, Calendar as CalendarIcon, 
  MessageSquare, FileText, Menu, Check, XCircle, Search, 
  Plus, DollarSign, TrendingUp, TrendingDown, Eye, Bell, 
  Settings, LogOut, UserPlus, UserMinus, BarChart3, ChevronRight,
  Edit, Trash2, Reply
} from 'lucide-react';
import JCIlogo from '../assets/logo-JCI.png'; 

// --- CONSTANTS & THEME ---
const THEME = {
  BG_MAIN: '#1a1818',
  BG_CARD: '#211E1E',
  TEXT_PRIMARY: '#F4F1E8',
  ACCENT_RED: '#A83232',
  ACCENT_GOLD: '#FFBC00',
};

// --- REUSABLE COMPONENTS ---

const Card = ({ children, title, action, className = '' }) => (
  <div className={`bg-[#211E1E] border border-white/5 rounded-xl shadow-lg p-6 ${className}`}>
    {(title || action) && (
      <div className="flex justify-between items-center mb-6">
        {title && <h3 className="text-lg font-semibold text-[#F4F1E8]">{title}</h3>}
        {action && <div>{action}</div>}
      </div>
    )}
    {children}
  </div>
);

const Button = ({ children, variant = 'primary', className = '', icon: Icon, ...props }) => {
  const variants = {
    primary: `bg-[#A83232] hover:bg-[#8f2b2b] text-white shadow-md`,
    outline: `border border-white/20 hover:border-[#FFBC00] text-[#F4F1E8] hover:text-[#FFBC00] bg-transparent`,
    ghost: `text-gray-400 hover:text-white hover:bg-white/5`,
    success: `bg-green-700 hover:bg-green-600 text-white`,
    danger: `bg-red-900/50 hover:bg-red-800 text-red-200`,
  };

  return (
    <button className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${variants[variant]} ${className}`} {...props}>
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    'Proposed': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    'In Progress': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'Completed': 'bg-green-500/10 text-green-500 border-green-500/20',
    'Rejected': 'bg-red-500/10 text-red-400 border-red-500/20',
    'Active': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Paid': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Unpaid': 'bg-red-500/10 text-red-400 border-red-500/20',
    'Separated': 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || 'bg-gray-800 text-gray-400'}`}>
      {status}
    </span>
  );
};

// --- MOCK DATA ---

const DASHBOARD_STATS = [
  { label: 'Registered', value: '142', icon: Users, color: 'text-blue-400' },
  { label: 'Inducted', value: '89', icon: UserPlus, color: 'text-green-400' },
  { label: 'Separated', value: '12', icon: UserMinus, color: 'text-gray-400' },
  { label: 'Dues Collected', value: '₱45k', icon: DollarSign, color: 'text-yellow-400' },
  { label: 'Attrition Rate', value: '8.4%', icon: TrendingDown, color: 'text-red-400' },
  { label: 'Recruitment Rate', value: '15.2%', icon: TrendingUp, color: 'text-emerald-400' },
];

const PROJECTS = [
  { id: 1, title: 'Barangay Clean-up', proponent: 'Comm. Juan', status: 'Proposed', date: 'Feb 10', budget: '₱5,000' },
  { id: 2, title: 'Youth Summit', proponent: 'VP Sarah', status: 'In Progress', date: 'Mar 15', budget: '₱25,000' },
  { id: 3, title: 'Charity Gala', proponent: 'Pres. Matt', status: 'Rejected', date: 'Apr 20', reason: 'Budget constraints' },
  { id: 4, title: 'Tech Bootcamp', proponent: 'Dir. Alex', status: 'Completed', date: 'Jan 10', budget: '₱10,000' },
];

const MEMBERS = [
  { id: 1, name: 'Juan Dela Cruz', role: 'Member', status: 'Active', dues: 'Paid' },
  { id: 2, name: 'Maria Clara', role: 'VP Internal', status: 'Active', dues: 'Unpaid' },
  { id: 3, name: 'Jose Rizal', role: 'Alumni', status: 'Separated', dues: 'N/A' },
];

const EVENTS = [
  { id: 1, title: 'General Membership Meeting', type: 'OTI', date: '2025-02-15', status: 'Proposed' },
  { id: 2, title: 'Induction Night', type: 'Event', date: '2025-03-01', status: 'In Progress' },
];

// --- SUB-MODULES ---

// 1. DASHBOARD HOME
const DashboardHome = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {DASHBOARD_STATS.map((stat, idx) => (
        <Card key={idx} className="flex flex-col justify-between p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</span>
            <stat.icon size={16} className={stat.color} />
          </div>
          <h4 className="text-2xl font-bold text-[#F4F1E8]">{stat.value}</h4>
        </Card>
      ))}
    </div>
    
    <div className="grid lg:grid-cols-3 gap-6">
      <Card title="Quick Reports" className="lg:col-span-1">
        <ul className="space-y-4">
          <li className="flex justify-between text-sm text-gray-300 border-b border-white/5 pb-2">
            <span>Monthly Growth</span>
            <span className="text-green-400">+12%</span>
          </li>
          <li className="flex justify-between text-sm text-gray-300 border-b border-white/5 pb-2">
            <span>Project Completion</span>
            <span className="text-yellow-400">75%</span>
          </li>
          <li className="flex justify-between text-sm text-gray-300 pb-2">
            <span>Event Attendance</span>
            <span className="text-blue-400">88%</span>
          </li>
        </ul>
        <Button variant="outline" className="w-full mt-6 text-xs">View Full Analytics</Button>
      </Card>
      
      <Card title="Calendar Snapshot" className="lg:col-span-2">
        <div className="flex items-center gap-4 mb-4">
           <div className="bg-[#A83232] text-white p-3 rounded-lg text-center min-w-[60px]">
             <span className="block text-xs uppercase">FEB</span>
             <span className="block text-xl font-bold">15</span>
           </div>
           <div>
             <h4 className="font-bold text-white">General Membership Meeting (GMM)</h4>
             <p className="text-sm text-gray-400">18:00 - 20:00 • Clubhouse</p>
           </div>
           <StatusBadge status="OTI" />
        </div>
        <div className="flex items-center gap-4">
           <div className="bg-[#2a2626] text-gray-400 border border-white/10 p-3 rounded-lg text-center min-w-[60px]">
             <span className="block text-xs uppercase">FEB</span>
             <span className="block text-xl font-bold">28</span>
           </div>
           <div>
             <h4 className="font-bold text-gray-300">Community Outreach</h4>
             <p className="text-sm text-gray-500">08:00 - 12:00 • Brgy. Hall</p>
           </div>
           <StatusBadge status="Project" />
        </div>
      </Card>
    </div>
  </div>
);

// 2. CALENDAR VIEW (Google Calendar Style)
const CalendarView = () => {
  const days = Array.from({ length: 35 }, (_, i) => i + 1); // Mock 35 days grid
  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">February 2025</h2>
        <div className="flex gap-2">
          <Button variant="outline" icon={Plus}>Add Event</Button>
          <Button variant="ghost">Today</Button>
        </div>
      </div>
      
      {/* Calendar Grid */}
      <div className="flex-1 bg-[#211E1E] border border-white/5 rounded-xl overflow-hidden grid grid-cols-7 grid-rows-5">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d} className="h-10 border-b border-r border-white/5 text-xs font-bold text-gray-500 uppercase flex items-center justify-center bg-[#1a1818]">{d}</div>
        ))}
        {days.map((day, i) => (
          <div key={i} className={`border-b border-r border-white/5 p-2 min-h-[100px] relative hover:bg-white/[0.02] transition-colors ${day > 28 ? 'text-gray-600' : 'text-gray-300'}`}>
            <span className="text-sm font-medium">{day > 28 ? day - 28 : day}</span>
            {day === 15 && (
               <div className="mt-2 text-[10px] bg-[#A83232] text-white p-1 rounded truncate cursor-pointer">
                 18:00 GMM
               </div>
            )}
            {day === 10 && (
               <div className="mt-2 text-[10px] bg-blue-900/50 text-blue-200 border border-blue-500/30 p-1 rounded truncate cursor-pointer">
                 Clean-up Drive
               </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// 3. PROJECT MANAGEMENT
const ProjectManagement = () => {
  const [tab, setTab] = useState('overview'); // overview, proposed, approved, rejected
  
  return (
    <div className="space-y-6">
      {/* Project Sub-Nav */}
      <div className="flex gap-4 border-b border-white/10 pb-1">
        {[
          {id: 'overview', label: 'Dashboard'},
          {id: 'proposed', label: 'Proposals'},
          {id: 'approved', label: 'Approved & Active'},
          {id: 'rejected', label: 'Rejected'},
          {id: 'reports', label: 'Reports'},
        ].map(item => (
          <button 
            key={item.id} 
            onClick={() => setTab(item.id)}
            className={`pb-3 text-sm font-medium px-2 border-b-2 transition-colors ${tab === item.id ? 'border-[#FFBC00] text-[#FFBC00]' : 'border-transparent text-gray-400 hover:text-white'}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div className="grid grid-cols-3 gap-6">
           <Card className="text-center p-8 border-l-4 border-l-yellow-500">
             <h3 className="text-gray-400 text-sm uppercase">Proposed</h3>
             <p className="text-4xl font-bold text-white mt-2">5</p>
           </Card>
           <Card className="text-center p-8 border-l-4 border-l-blue-500">
             <h3 className="text-gray-400 text-sm uppercase">In Progress</h3>
             <p className="text-4xl font-bold text-white mt-2">3</p>
           </Card>
           <Card className="text-center p-8 border-l-4 border-l-green-500">
             <h3 className="text-gray-400 text-sm uppercase">Completed</h3>
             <p className="text-4xl font-bold text-white mt-2">12</p>
           </Card>
        </div>
      )}

      {(tab === 'proposed' || tab === 'approved' || tab === 'rejected') && (
        <Card>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-500 border-b border-white/10">
                <th className="p-4">Project Title</th>
                <th className="p-4">Proponent</th>
                <th className="p-4">Date</th>
                {tab === 'rejected' && <th className="p-4 text-red-400">Reason</th>}
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {PROJECTS.filter(p => {
                if(tab === 'proposed') return p.status === 'Proposed';
                if(tab === 'approved') return p.status === 'In Progress' || p.status === 'Completed';
                if(tab === 'rejected') return p.status === 'Rejected';
                return true;
              }).map(p => (
                <tr key={p.id} className="hover:bg-white/5">
                  <td className="p-4 font-medium text-white">{p.title}</td>
                  <td className="p-4 text-gray-300">{p.proponent}</td>
                  <td className="p-4 text-gray-400">{p.date}</td>
                  {tab === 'rejected' && <td className="p-4 text-red-300 italic">"{p.reason}"</td>}
                  <td className="p-4 text-right flex justify-end gap-2">
                    {tab === 'proposed' && (
                      <>
                        <Button variant="success" className="px-2 py-1"><Check size={14}/> Approve</Button>
                        <Button variant="danger" className="px-2 py-1"><XCircle size={14}/> Reject</Button>
                        <button className="p-2 text-gray-400 hover:text-white"><Eye size={16}/></button>
                      </>
                    )}
                    {tab === 'approved' && (
                      <Button variant="outline" className="text-xs">View Progress</Button>
                    )}
                    {tab === 'rejected' && (
                      <Button variant="ghost" className="text-xs">Details</Button>
                    )}
                  </td>
                </tr>
              ))}
              {PROJECTS.filter(p => {
                 if(tab === 'proposed') return p.status === 'Proposed';
                 if(tab === 'approved') return p.status === 'In Progress' || p.status === 'Completed';
                 if(tab === 'rejected') return p.status === 'Rejected';
                 return false;
              }).length === 0 && (
                <tr><td colSpan="5" className="p-8 text-center text-gray-500">No projects found in this category.</td></tr>
              )}
            </tbody>
          </table>
        </Card>
      )}
      
      {tab === 'reports' && (
        <Card title="Project Analytics">
           <div className="h-64 flex items-center justify-center border border-dashed border-white/10 rounded">
             <span className="text-gray-500 flex items-center gap-2"><BarChart3/> Generate Project Report PDF</span>
           </div>
        </Card>
      )}
    </div>
  );
};

// 4. MEMBER MANAGEMENT
const MemberManagement = () => (
  <div className="space-y-6">
    <div className="flex justify-between">
      <div className="relative w-64">
        <Search className="absolute left-3 top-2.5 text-gray-500" size={16} />
        <input type="text" placeholder="Search members..." className="w-full pl-10 pr-4 py-2 bg-[#211E1E] border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-[#FFBC00]"/>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" icon={FileText}>Reports</Button>
        <Button variant="primary" icon={Plus}>Add Member</Button>
      </div>
    </div>

    <Card>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-gray-500 border-b border-white/10">
            <th className="p-4">Name</th>
            <th className="p-4">Role</th>
            <th className="p-4">Dues Status</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-right">Management</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {MEMBERS.map(m => (
            <tr key={m.id} className="hover:bg-white/5">
              <td className="p-4 font-bold text-white">{m.name}</td>
              <td className="p-4 text-gray-300">{m.role}</td>
              <td className="p-4"><StatusBadge status={m.dues} /></td>
              <td className="p-4"><StatusBadge status={m.status} /></td>
              <td className="p-4 text-right flex justify-end gap-2">
                <button className="text-gray-400 hover:text-green-400" title="Induct/Onboard"><UserPlus size={16}/></button>
                <button className="text-gray-400 hover:text-yellow-400" title="Update Dues"><DollarSign size={16}/></button>
                <button className="text-gray-400 hover:text-red-400" title="Offboard"><UserMinus size={16}/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  </div>
);

// 5. EVENT MANAGEMENT
const EventManagement = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
       <div className="flex gap-4">
          <Card className="px-6 py-2 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-500"></div><span className="text-sm text-gray-300">Proposed: 2</span></Card>
          <Card className="px-6 py-2 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div><span className="text-sm text-gray-300">Upcoming: 1</span></Card>
       </div>
       <Button variant="primary" icon={Plus}>Create Event</Button>
    </div>

    <Card title="Events List">
      <table className="w-full text-left text-sm">
        <thead className="text-gray-500 border-b border-white/10">
          <tr>
            <th className="p-4">Event Name</th>
            <th className="p-4">Type</th>
            <th className="p-4">Date</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {EVENTS.map(e => (
            <tr key={e.id} className="hover:bg-white/5">
              <td className="p-4 text-white font-medium">{e.title}</td>
              <td className="p-4 text-gray-400">{e.type}</td>
              <td className="p-4 text-gray-400">{e.date}</td>
              <td className="p-4"><StatusBadge status={e.status}/></td>
              <td className="p-4 text-right flex justify-end gap-3">
                <Edit size={16} className="text-gray-400 hover:text-white cursor-pointer"/>
                <Trash2 size={16} className="text-gray-400 hover:text-red-400 cursor-pointer"/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  </div>
);

// 6. FEEDBACK & BLOGS (Simplified)
const FeedbackManagement = () => (
  <div className="space-y-6">
    <Card title="Member Feedback">
      <div className="space-y-4">
        {[1,2].map(i => (
          <div key={i} className="bg-black/20 p-4 rounded-lg border border-white/5">
             <div className="flex justify-between mb-2">
               <span className="font-bold text-white text-sm">Anonymous Member</span>
               <span className="text-xs text-gray-500">2 days ago</span>
             </div>
             <p className="text-sm text-gray-300 italic">"The recent GMM venue was too small for the crowd. Please consider a larger venue next time."</p>
             <div className="mt-3 flex gap-2">
                <Button variant="ghost" className="text-xs px-2 py-1"><Eye size={14}/> View Details</Button>
                <Button variant="primary" className="text-xs px-2 py-1 bg-blue-900/50 hover:bg-blue-800 text-blue-200"><Reply size={14}/> Reply</Button>
             </div>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

const BlogManagement = () => (
   <div className="space-y-6">
     <div className="flex justify-end"><Button variant="primary" icon={Plus}>Write New Blog</Button></div>
     <div className="grid md:grid-cols-2 gap-4">
       {[1,2].map(i => (
         <Card key={i} className="hover:border-[#FFBC00]/30 transition-colors">
            <div className="h-32 bg-gray-800 rounded mb-4 flex items-center justify-center text-gray-600"><FileText size={32}/></div>
            <h4 className="font-bold text-white mb-2">JCI Week Celebration Highlights</h4>
            <p className="text-xs text-gray-500 mb-4">Published on Jan 20, 2025</p>
            <div className="flex justify-end gap-2">
               <Button variant="ghost" className="text-xs">Edit</Button>
               <Button variant="ghost" className="text-xs text-red-400 hover:bg-red-900/20">Delete</Button>
            </div>
         </Card>
       ))}
     </div>
   </div>
);


// --- MAIN LAYOUT ---

const AdminDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeModule, setActiveModule] = useState('dashboard');

  const MENU_ITEMS = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'calendar', label: 'JCI Calendar', icon: CalendarIcon },
    { id: 'projects', label: 'Project Mgmt', icon: FolderKanban },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'events', label: 'Events', icon: CalendarIcon },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
    { id: 'blogs', label: 'Blogs', icon: FileText },
  ];

  return (
    <div className="min-h-screen flex bg-[#1a1818] text-[#F4F1E8] font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
        body { font-family: 'Outfit', sans-serif; }
      `}</style>

      {/* SIDEBAR */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 bg-[#211E1E] border-r border-white/5 flex flex-col shadow-2xl`}>
        <div className="h-20 flex items-center px-6 border-b border-white/5 gap-3">
             <img src={JCIlogo} alt="JCI" className="w-8 h-8 rounded-full border border-[#FFBC00]/50"/>
             <div>
               <h1 className="text-lg font-bold tracking-tight text-white leading-none">JCI ADMIN</h1>
               <span className="text-[10px] text-gray-500 uppercase tracking-widest">Portal</span>
             </div>
        </div>
        <nav className="flex-1 py-6 px-3 space-y-1">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveModule(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                activeModule === item.id 
                  ? 'bg-[#A83232] text-white shadow-md' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={18} className={activeModule === item.id ? 'text-white' : 'text-gray-500 group-hover:text-[#FFBC00]'} />
              {item.label}
              {activeModule === item.id && <ChevronRight size={14} className="ml-auto text-white/50"/>}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5">
          <button className="flex items-center gap-2 text-gray-500 hover:text-red-400 text-sm font-medium w-full px-2 py-2 rounded hover:bg-white/5 transition-colors">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 flex items-center justify-between px-8 border-b border-white/5 bg-[#1a1818]/95 backdrop-blur z-20">
           <div className="flex items-center gap-4">
             <button className="lg:hidden text-gray-400" onClick={() => setSidebarOpen(true)}><Menu size={24} /></button>
             <h2 className="text-xl font-semibold text-[#F4F1E8]">{MENU_ITEMS.find(m => m.id === activeModule)?.label}</h2>
           </div>
           <div className="flex items-center gap-4">
             <div className="relative"><Bell size={20} className="text-gray-400 hover:text-[#FFBC00] cursor-pointer"/><span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span></div>
             <Settings size={20} className="text-gray-400 hover:text-white cursor-pointer"/>
             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#A83232] to-orange-600 flex items-center justify-center text-xs font-bold">AD</div>
           </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode='wait'>
              <motion.div
                key={activeModule}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeModule === 'dashboard' && <DashboardHome />}
                {activeModule === 'calendar' && <CalendarView />}
                {activeModule === 'projects' && <ProjectManagement />}
                {activeModule === 'members' && <MemberManagement />}
                {activeModule === 'events' && <EventManagement />}
                {activeModule === 'feedback' && <FeedbackManagement />}
                {activeModule === 'blogs' && <BlogManagement />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
      
      {isSidebarOpen && <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
};

export default AdminDashboard;