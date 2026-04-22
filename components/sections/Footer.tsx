export const Footer = () => {
  return (
    <footer className="bg-[#050510] border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <a href="/" className="flex items-center gap-2">
              <span className="text-lg font-bold text-white">
                Cyber<span className="text-[#6c3aff]">Flow</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse" />
            </a>
            <p className="text-[#f0f0ff]/30 text-sm mt-1">
              Presença digital que converte.
            </p>
          </div>

          <nav className="flex items-center gap-6 text-sm text-[#f0f0ff]/40">
            <a href="#how-it-works" className="hover:text-[#f0f0ff]/70 transition-colors">Como funciona</a>
            <a href="#projects" className="hover:text-[#f0f0ff]/70 transition-colors">Projetos</a>
            <a href="#plans" className="hover:text-[#f0f0ff]/70 transition-colors">Planos</a>
            <a href="https://breq.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-[#f0f0ff]/70 transition-colors">Portfólio</a>
          </nav>

          <p className="text-[#f0f0ff]/20 text-xs">
            © {new Date().getFullYear()} CyberFlow. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
