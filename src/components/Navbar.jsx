// src/components/Navbar.jsx
export default function Navbar({ onNavClick }) {
    return (
        <nav className="fixed top-0 left-0 right-0 bg-black text-white flex justify-center space-x-6 p-4 z-50">
            <button onClick={() => onNavClick("home")} className="hover:text-purple-400">
                Home
            </button>
            <button onClick={() => onNavClick("testimonials")} className="hover:text-purple-400">
                Testimonials
            </button>
            <button onClick={() => onNavClick("footer")} className="hover:text-purple-400">
                Footer
            </button>
        </nav>
    );
}
