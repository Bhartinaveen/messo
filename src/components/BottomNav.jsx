import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  BookOpenIcon,
  InformationCircleIcon,
  PhoneIcon,
  UserIcon
} from "@heroicons/react/24/outline";

export default function BottomNav() {
  const navItems = [
    { to: "/", label: "Home", icon: HomeIcon },
    { to: "/blog", label: "Blog", icon: BookOpenIcon },
    { to: "/about", label: "About", icon: InformationCircleIcon },
    { to: "/contact", label: "Contact", icon: PhoneIcon },
    { to: "/login", label: "Login", icon: UserIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50 md:hidden">
      <div className="flex justify-around items-center h-16 text-xs font-medium">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              `flex flex-col items-center justify-center relative transition-all duration-200 ${
                isActive
                  ? "text-orange-600 scale-105"
                  : "text-gray-500 hover:text-yellow-500"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {/* Active Top Indicator */}
                {isActive && (
                  <span className="absolute -top-2 w-8 h-1 bg-yellow-300 rounded-full"></span>
                )}

                <Icon className="w-6 h-6 mb-1" />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
