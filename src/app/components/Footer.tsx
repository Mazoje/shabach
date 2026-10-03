import Link from 'next/link';
import { 
  Building2, 
  MapPin, 
  PhoneCall, 
  Mail, 
  Send 
} from 'lucide-react';

export default function Footer() {
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Properties', href: '/properties' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer id="contact" className="bg-[#080C10] text-slate-400 pt-20 pb-10 px-6 mt-auto">
      <div className="max-w-7xl mx-auto">
        
        {/* Newsletter Banner */}
        <div className="bg-white/5 rounded-3xl p-8 md:p-10 mb-16 flex flex-col lg:flex-row items-center justify-between gap-8 border border-white/5">
          <div className="max-w-lg">
            <h3 className="text-xl md:text-2xl font-light text-white mb-2">
              Subscribe to our private portfolio
            </h3>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              Receive exclusive off-market listings, architectural insights, and market updates directly to your inbox.
            </p>
          </div>

          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="bg-white/10 text-white placeholder:text-slate-500 text-xs px-5 py-3.5 rounded-full focus:outline-none focus:ring-1 focus:ring-white/30 w-full sm:w-80"
            />
            <button className="bg-white text-slate-900 hover:bg-slate-100 text-xs font-semibold px-6 py-3.5 rounded-full transition flex items-center justify-center gap-2 shrink-0">
              Subscribe <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16">
          
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white border border-white/15">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-base font-bold tracking-widest text-white uppercase block leading-none">
                  SHABACH
                </span>
                <span className="text-[9px] tracking-[0.2em] text-slate-400 uppercase block mt-0.5">
                  EMPIRE
                </span>
              </div>
            </Link>
            <p className="text-xs text-slate-400 font-light leading-relaxed max-w-sm mb-6">
              Delivering exceptional architectural properties, luxurious residences, and premier real estate investments tailored for discerning clients.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition">
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.6a1.49 1.49 0 0 0-1.5 1.5 1.5 1.5 0 0 0 1.5 1.5 1.49 1.49 0 0 0 1.5-1.5 1.49 1.49 0 0 0-1.5-1.5z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-3 text-xs">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Property Types</h4>
            <ul className="space-y-3 text-xs">
              <li><Link href="/properties" className="hover:text-white transition">Luxury Villas</Link></li>
              <li><Link href="/properties" className="hover:text-white transition">Penthouse Suites</Link></li>
              <li><Link href="/properties" className="hover:text-white transition">Modern Apartments</Link></li>
              <li><Link href="/properties" className="hover:text-white transition">Off-Plan Projects</Link></li>
              <li><Link href="/properties" className="hover:text-white transition">Commercial Spaces</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Contact Info</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>Ikoyi, Lagos State, Nigeria</span>
              </li>
              <li className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-slate-500 shrink-0" />
                <span>+234 (0) 800 SHABACH</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <span>info@shabachempire.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Shabach Empire Real Estate. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-400 transition">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-slate-400 transition">Terms of Service</Link>
            <Link href="/cookie-settings" className="hover:text-slate-400 transition">Cookie Settings</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}