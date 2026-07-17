import { Bell, Search, Settings, UserCircle } from "lucide-react";
import './Navbar.css';


function Navbar() {
  return (
    <header className="h-16 bg-slate-900 border-b border-slate-700 flex items-center justify-between px-6">
      {/* Left Side */}
      <div>
        <h1 className="text-2xl font-bold ">ARISE</h1>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">
        <Search className="text-white cursor-pointer hover:text-blue-400 transition" />

        <Bell className="text-white cursor-pointer hover:text-blue-400 transition" />

        <Settings className="text-white cursor-pointer hover:text-blue-400 transition" />

        <UserCircle
          className="text-white cursor-pointer hover:text-blue-400 transition"
          size={32}
        />
      </div>
    </header>
  );
}

export default Navbar;