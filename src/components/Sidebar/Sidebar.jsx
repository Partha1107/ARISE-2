import { NavLink } from "react-router-dom";

import {
    LayoutDashboard,
    Calendar,
    Target,
    BookOpen,
    Code2,
    FolderGit2,
    Wallet,
    BarChart3,
    Mail,
    NotebookPen,
    Timer,
    Trophy,
} from "lucide-react";

function Sidebar() {
    const menuItems = [
        { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/dashboard" },
        { name: "Calendar", icon: <Calendar size={20} />, path: "/calendar" },
        { name: "Missions", icon: <Target size={20} />, path: "/missions" },
        { name: "Study", icon: <BookOpen size={20} />, path: "/study" },
        { name: "Developer", icon: <Code2 size={20} />, path: "/developer" },
        { name: "Projects", icon: <FolderGit2 size={20} />, path: "/projects" },
        { name: "Finance", icon: <Wallet size={20} />, path: "/finance" },
        { name: "Analytics", icon: <BarChart3 size={20} />, path: "/analytics" },
        { name: "Mail", icon: <Mail size={20} />, path: "/mail" },
        { name: "Notes", icon: <NotebookPen size={20} />, path: "/notes" },
        { name: "Focus", icon: <Timer size={20} />, path: "/focus" },
        { name: "Achievements", icon: <Trophy size={20} />, path: "/achievements" }
];

    return (
        <aside className="w-64 min-h-screen bg-slate-900 text-white p-5">
            <h1 className="text-3xl font-bold mb-8">ARISE</h1>

            <nav className="flex flex-col gap-2">
                {menuItems.map((item) => (
                    <NavLink key={item.name} to={item.path} className={({ isActive }) =>`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive? "bg-blue-600 text-white": "hover:bg-slate-800 text-gray-300"}`}>{item.icon}<p>{item.name}</p></NavLink>
                ))}
            </nav>
        </aside>
    );
}

export default Sidebar;