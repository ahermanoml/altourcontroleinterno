import { useState, useEffect } from "react";

// ─── HOOKS ─────────────────────────────────────────────
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return isMobile;
}

// ─── DESIGN TOKENS ─────────────────────────────────────
const C = {
  bg: "#F5F1EC", card: "#fff", border: "#E8E4DF", borderLight: "#F0ECE7",
  text: "#2C2520", textMid: "#5C554C", textMuted: "#8C857C", textFaint: "#A69E94",
  accent: "#E8C170", accentDark: "#2C2520", sidebar: "#2C2520", sidebarHover: "#3D3530",
  green: "#2E7D32", greenBg: "#E8F5E9", blue: "#1565C0", blueBg: "#E3F2FD",
  orange: "#E65100", orangeBg: "#FFF3E0", red: "#C62828", redBg: "#FFEBEE",
  purple: "#6A1B9A", purpleBg: "#F3E5F5",
};

const STATUS_COLORS = {
  "Orçamento": { bg: "#FFF3E0", fg: "#E65100", dot: "#FF9800" },
  "Confirmada": { bg: "#E8F5E9", fg: "#1B5E20", dot: "#4CAF50" },
  "Em andamento": { bg: "#E3F2FD", fg: "#0D47A1", dot: "#2196F3" },
  "Concluída": { bg: "#F3E5F5", fg: "#4A148C", dot: "#9C27B0" },
  "Cancelada": { bg: "#FFEBEE", fg: "#B71C1C", dot: "#F44336" },
};
const PRIORIDADE = {
  "Alta": { bg: "#FFEBEE", fg: "#C62828" },
  "Média": { bg: "#FFF8E1", fg: "#F57F17" },
  "Baixa": { bg: "#E8F5E9", fg: "#2E7D32" },
};

const TABS = [
  { id: "dashboard", label: "Painel", icon: "◉" },
  { id: "clientes", label: "Clientes", icon: "◎" },
  { id: "viagens", label: "Viagens", icon: "✈" },
  { id: "financeiro", label: "Financeiro", icon: "$" },
  { id: "fornecedores", label: "Fornecedores", icon: "⬡" },
  { id: "tarefas", label: "Tarefas", icon: "☐" },
  { id: "config", label: "Configurações", icon: "⚙" },
];

// ─── SAMPLE DATA ─────────────────────────────────────
const SAMPLE_CLIENTES = [
  { id: 1, nome: "Maria Silva", cpf: "123.456.789-00", telefone: "(34) 99999-1234", email: "maria@email.com", nascimento: "1985-03-15", passaporte: "FX123456", valPassaporte: "2028-06-01", indicadoPor: "—", totalViagens: 4 },
  { id: 2, nome: "João Oliveira", cpf: "987.654.321-00", telefone: "(11) 98888-5678", email: "joao@email.com", nascimento: "1990-07-22", passaporte: "GH789012", valPassaporte: "2026-01-15", indicadoPor: "Maria Silva", totalViagens: 2 },
  { id: 3, nome: "Ana Costa", cpf: "456.789.123-00", telefone: "(21) 97777-9012", email: "ana@email.com", nascimento: "1978-11-03", passaporte: "KL345678", valPassaporte: "2025-09-30", indicadoPor: "—", totalViagens: 7 },
  { id: 4, nome: "Carlos Mendes", cpf: "321.654.987-00", telefone: "(31) 96666-3456", email: "carlos@email.com", nascimento: "1995-01-28", passaporte: "—", valPassaporte: "—", indicadoPor: "Ana Costa", totalViagens: 1 },
  { id: 5, nome: "Fernanda Lima", cpf: "654.321.987-00", telefone: "(34) 95555-7890", email: "fernanda@email.com", nascimento: "1988-09-10", passaporte: "MN901234", valPassaporte: "2027-04-20", indicadoPor: "—", totalViagens: 3 },
];
const SAMPLE_VIAGENS = [
  { id: 1, clienteId: 1, cliente: "Maria Silva", destino: "Lisboa, Portugal", ida: "2026-05-10", volta: "2026-05-24", cia: "TAP", localizador: "XK3F9T", hotel: "Pestana Palace", codReserva: "PES-44821", seguro: "Assist Card Gold", status: "Confirmada", valor: 12800, pago: 8500, consultor: "Patrícia" },
  { id: 2, clienteId: 2, cliente: "João Oliveira", destino: "Cancún, México", ida: "2026-06-15", volta: "2026-06-22", cia: "Latam", localizador: "LT8HN2", hotel: "Hyatt Ziva", codReserva: "HYT-90132", seguro: "GTA Full", status: "Orçamento", valor: 9400, pago: 0, consultor: "Roberto" },
  { id: 3, clienteId: 3, cliente: "Ana Costa", destino: "Paris, França", ida: "2026-04-01", volta: "2026-04-12", cia: "Air France", localizador: "AF6QW1", hotel: "Le Marais Boutique", codReserva: "LMB-55673", seguro: "April Full", status: "Em andamento", valor: 18500, pago: 18500, consultor: "Patrícia" },
  { id: 4, clienteId: 5, cliente: "Fernanda Lima", destino: "Buenos Aires, Argentina", ida: "2026-03-05", volta: "2026-03-10", cia: "Aerolíneas", localizador: "AR2MK8", hotel: "Alvear Art", codReserva: "ALV-12098", seguro: "Assist Card Basic", status: "Concluída", valor: 5200, pago: 5200, consultor: "Roberto" },
  { id: 5, clienteId: 4, cliente: "Carlos Mendes", destino: "Gramado, RS", ida: "2026-07-01", volta: "2026-07-05", cia: "Gol", localizador: "G3X9P4", hotel: "Serra Azul", codReserva: "SA-78341", seguro: "—", status: "Orçamento", valor: 3200, pago: 0, consultor: "Patrícia" },
];
const SAMPLE_FORNECEDORES = [
  { id: 1, nome: "CVC Operadora", tipo: "Operadora", contato: "(11) 3003-9282", email: "parceiros@cvc.com.br", contrato: "Vigente até 12/2026", comissao: "12%" },
  { id: 2, nome: "TAP Air Portugal", tipo: "Cia Aérea", contato: "(11) 4002-2727", email: "agencias@tap.pt", contrato: "Vigente até 06/2026", comissao: "8%" },
  { id: 3, nome: "Pestana Hotels", tipo: "Hotel", contato: "+351 218 442 000", email: "reservas@pestana.com", contrato: "Vigente até 03/2027", comissao: "15%" },
  { id: 4, nome: "Assist Card", tipo: "Seguradora", contato: "0800 777 1000", email: "comercial@assistcard.com", contrato: "Vigente até 09/2026", comissao: "20%" },
  { id: 5, nome: "Receptivo Lisboa", tipo: "Receptivo", contato: "+351 912 345 678", email: "transfers@receptivolx.pt", contrato: "Vigente até 12/2026", comissao: "10%" },
];
const SAMPLE_TAREFAS = [
  { id: 1, descricao: "Emitir bilhete TAP — Maria Silva", prioridade: "Alta", prazo: "2026-04-09", responsavel: "Patrícia", concluida: false },
  { id: 2, descricao: "Enviar voucher hotel Cancún — João Oliveira", prioridade: "Média", prazo: "2026-04-15", responsavel: "Roberto", concluida: false },
  { id: 3, descricao: "Cobrar 2ª parcela — Maria Silva", prioridade: "Alta", prazo: "2026-04-10", responsavel: "Patrícia", concluida: false },
  { id: 4, descricao: "Verificar passaporte Ana Costa (vence 09/2025)", prioridade: "Alta", prazo: "2026-04-08", responsavel: "Patrícia", concluida: false },
  { id: 5, descricao: "Confirmar transfer Buenos Aires — Fernanda", prioridade: "Baixa", prazo: "2026-04-20", responsavel: "Roberto", concluida: true },
];

// ─── UTILS ─────────────────────────────────────────
function fmt(v) { return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }); }
function fmtDate(d) { if (!d || d === "—") return "—"; const [y, m, day] = d.split("-"); return `${day}/${m}/${y}`; }

// ─── SHARED COMPONENTS ─────────────────────────────────
function Badge({ text, colors }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: colors.bg, color: colors.fg, letterSpacing: .3 }}>
      {colors.dot && <span style={{ width: 6, height: 6, borderRadius: "50%", background: colors.dot }} />}
      {text}
    </span>
  );
}

function StatCard({ label, value, sub, accent }) {
  const isMobile = useIsMobile();
  return (
    <div style={{ background: C.card, borderRadius: 14, padding: isMobile ? "16px 16px 16px 20px" : "22px 24px", border: `1px solid ${C.border}`, position: "relative", overflow: "hidden", minWidth: 0 }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: accent, borderRadius: "14px 0 0 14px" }} />
      <div style={{ fontSize: isMobile ? 10 : 12, color: C.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: isMobile ? 6 : 8 }}>{label}</div>
      <div style={{ fontSize: isMobile ? 20 : 28, fontWeight: 700, color: C.text, fontFamily: "'DM Serif Display', Georgia, serif", wordBreak: "break-word" }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: C.textFaint, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function SearchBar({ value, onChange, placeholder }) {
  return (
    <div style={{ position: "relative", maxWidth: 340 }}>
      <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "#B5ADA3" }}>⌕</span>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ width: "100%", padding: "10px 14px 10px 34px", border: `1px solid #DDD7D0`, borderRadius: 10, fontSize: 13, fontFamily: "inherit", background: "#FDFCFA", color: C.text, outline: "none", boxSizing: "border-box" }} />
    </div>
  );
}

function Btn({ children, onClick, variant = "primary", icon, style: s = {} }) {
  const base = { display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 18px", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", border: "none", transition: "all .15s", letterSpacing: .2, ...s };
  const styles = {
    primary: { ...base, background: C.accentDark, color: "#fff" },
    secondary: { ...base, background: "transparent", color: C.text, border: `1px solid ${C.border}` },
    accent: { ...base, background: C.accent, color: C.accentDark },
    ghost: { ...base, background: "transparent", color: C.textMuted, padding: "9px 12px" },
  };
  return <button onClick={onClick} style={styles[variant]}>{icon && <span>{icon}</span>}{children}</button>;
}

function FormField({ label, placeholder, type = "text", required, options, hint, value, width }) {
  const id = label.toLowerCase().replace(/\s/g, "_");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5, minWidth: 0, width: width || "auto" }}>
      <label htmlFor={id} style={{ fontSize: 12, fontWeight: 600, color: C.textMid }}>
        {label} {required && <span style={{ color: C.red }}>*</span>}
      </label>
      {options ? (
        <select id={id} defaultValue={value || ""} style={{ padding: "10px 12px", border: `1px solid #DDD7D0`, borderRadius: 10, fontSize: 13, fontFamily: "inherit", background: "#FDFCFA", color: C.text, outline: "none", appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%238C857C'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}>
          <option value="" disabled>{placeholder || "Selecione..."}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input id={id} type={type} defaultValue={value || ""} placeholder={placeholder}
          style={{ padding: "10px 12px", border: `1px solid #DDD7D0`, borderRadius: 10, fontSize: 13, fontFamily: "inherit", background: "#FDFCFA", color: C.text, outline: "none" }} />
      )}
      {hint && <span style={{ fontSize: 11, color: C.textFaint }}>{hint}</span>}
    </div>
  );
}

function Modal({ title, onClose, children, wide }) {
  const isMobile = useIsMobile();
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(44,37,32,.45)", backdropFilter: "blur(4px)", display: "flex", alignItems: isMobile ? "flex-end" : "center", justifyContent: "center", zIndex: 1000, padding: isMobile ? 0 : 16 }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: C.bg, borderRadius: isMobile ? "20px 20px 0 0" : 20, width: isMobile ? "100%" : (wide ? 780 : 560), maxWidth: "100%", maxHeight: isMobile ? "92vh" : "85vh", overflow: "auto", boxShadow: "0 24px 80px rgba(0,0,0,.18)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: isMobile ? "16px 20px" : "20px 28px", borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, background: C.bg, borderRadius: isMobile ? "20px 20px 0 0" : "20px 20px 0 0", zIndex: 1 }}>
          <h2 style={{ margin: 0, fontSize: isMobile ? 16 : 18, fontWeight: 700, fontFamily: "'DM Serif Display', Georgia, serif", color: C.text }}>{title}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, color: C.textMuted, cursor: "pointer", padding: 4 }}>✕</button>
        </div>
        <div style={{ padding: isMobile ? "20px" : "24px 28px" }}>{children}</div>
      </div>
    </div>
  );
}

function SectionLabel({ children }) {
  return <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, color: C.textFaint, margin: "20px 0 12px", paddingBottom: 8, borderBottom: `1px solid ${C.borderLight}` }}>{children}</div>;
}

// ─── ONBOARDING WIZARD ─────────────────────────────────
function OnboardingWizard({ onFinish }) {
  const [step, setStep] = useState(0);
  const isMobile = useIsMobile();
  const steps = [
    { title: "Bem-vindo ao ViagemPro!", subtitle: "Vamos configurar sua agência em poucos minutos." },
    { title: "Sobre sua agência", subtitle: "Informações básicas para personalizar o sistema." },
    { title: "Sua equipe", subtitle: "Quem são os consultores que atendem os clientes?" },
    { title: "Parceiros frequentes", subtitle: "Cadastre os fornecedores que você mais trabalha." },
    { title: "Importar clientes", subtitle: "Traga sua base de clientes de uma planilha existente." },
    { title: "Tudo pronto!", subtitle: "Sua agência está configurada." },
  ];

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: isMobile ? "stretch" : "center", justifyContent: "center", fontFamily: "'IBM Plex Sans', sans-serif", padding: isMobile ? 0 : 16 }}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet" />
      <div style={{ width: isMobile ? "100%" : 620, maxWidth: "100%", background: C.card, borderRadius: isMobile ? 0 : 24, boxShadow: isMobile ? "none" : "0 20px 60px rgba(0,0,0,.08)", overflow: "hidden" }}>
        {/* Progress */}
        <div style={{ display: "flex", gap: 4, padding: isMobile ? "16px 20px 0" : "20px 32px 0" }}>
          {steps.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= step ? C.accentDark : "#E8E4DF", transition: "background .3s" }} />
          ))}
        </div>
        <div style={{ padding: isMobile ? "20px 20px 28px" : "28px 40px 36px" }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: C.textFaint, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 8 }}>Passo {step + 1} de {steps.length}</div>
          <h1 style={{ margin: "0 0 6px", fontSize: isMobile ? 22 : 26, fontFamily: "'DM Serif Display', Georgia, serif", color: C.text }}>{steps[step].title}</h1>
          <p style={{ margin: "0 0 28px", fontSize: 14, color: C.textMuted }}>{steps[step].subtitle}</p>

          {step === 0 && (
            <div style={{ background: "#FDFAF6", border: `1px solid ${C.border}`, borderRadius: 14, padding: 24, lineHeight: 1.8, fontSize: 13, color: C.textMid }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>✈</div>
              Em <b>5 passos rápidos</b>, você vai configurar:
              <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
                {["Dados da sua agência", "Equipe de consultores", "Fornecedores frequentes", "Importação de clientes"].map(t => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ width: 22, height: 22, borderRadius: 6, background: C.greenBg, color: C.green, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>✓</span>
                    {t}
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div style={{ display: "grid", gap: 16 }}>
              <FormField label="Nome da agência" placeholder="Ex: Viaje Mais Turismo" required />
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 }}>
                <FormField label="CNPJ" placeholder="00.000.000/0001-00" required />
                <FormField label="Cadastur" placeholder="Nº do cadastro" hint="Registro no Ministério do Turismo" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 }}>
                <FormField label="Telefone" placeholder="(00) 00000-0000" />
                <FormField label="E-mail principal" placeholder="contato@agencia.com" type="email" />
              </div>
              <FormField label="Endereço" placeholder="Rua, número, cidade — UF" />
            </div>
          )}

          {step === 2 && (
            <div>
              <div style={{ display: "grid", gap: 12 }}>
                {["Patrícia Souza", "Roberto Almeida"].map((name, i) => (
                  <div key={i} style={{ background: "#FDFAF6", border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: i === 0 ? C.purpleBg : C.blueBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: i === 0 ? C.purple : C.blue }}>{name[0]}</div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{name}</div>
                        <div style={{ fontSize: 11, color: C.textMuted }}>{i === 0 ? "Gerente" : "Consultor"}</div>
                      </div>
                    </div>
                    <select defaultValue={i === 0 ? "admin" : "consultor"} style={{ padding: "6px 10px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12, fontFamily: "inherit", background: "#fff", color: C.textMid, outline: "none" }}>
                      <option value="admin">Administrador — acesso total</option>
                      <option value="consultor">Consultor — apenas seus clientes</option>
                      <option value="financeiro">Financeiro — valores e relatórios</option>
                    </select>
                  </div>
                ))}
              </div>
              <button style={{ marginTop: 16, background: "none", border: `1px dashed ${C.border}`, borderRadius: 12, padding: "14px", width: "100%", fontSize: 13, color: C.textMuted, cursor: "pointer", fontFamily: "inherit" }}>
                + Adicionar consultor
              </button>
            </div>
          )}

          {step === 3 && (
            <div>
              <div style={{ display: "grid", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 8 }}>Companhias aéreas que você trabalha</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {["Latam", "Gol", "Azul", "TAP", "Air France", "Emirates"].map(a => (
                      <label key={a} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 10, border: `1px solid ${C.border}`, background: "#FDFAF6", fontSize: 12, fontWeight: 500, color: C.textMid, cursor: "pointer" }}>
                        <input type="checkbox" defaultChecked={["Latam", "Gol", "TAP"].includes(a)} style={{ accentColor: C.accentDark }} /> {a}
                      </label>
                    ))}
                    <span style={{ padding: "8px 14px", fontSize: 12, color: C.textFaint }}>+ Outra</span>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 8 }}>Seguradoras parceiras</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {["Assist Card", "GTA", "April", "Affinity", "Travel Ace"].map(a => (
                      <label key={a} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 10, border: `1px solid ${C.border}`, background: "#FDFAF6", fontSize: 12, fontWeight: 500, color: C.textMid, cursor: "pointer" }}>
                        <input type="checkbox" defaultChecked={["Assist Card", "GTA"].includes(a)} style={{ accentColor: C.accentDark }} /> {a}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 8 }}>Operadoras / consolidadoras</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {["CVC Corp", "Trend", "Schultz", "Orinter", "Visual"].map(a => (
                      <label key={a} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 10, border: `1px solid ${C.border}`, background: "#FDFAF6", fontSize: 12, fontWeight: 500, color: C.textMid, cursor: "pointer" }}>
                        <input type="checkbox" defaultChecked={["CVC Corp"].includes(a)} style={{ accentColor: C.accentDark }} /> {a}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <div style={{ border: `2px dashed ${C.border}`, borderRadius: 16, padding: "40px 32px", textAlign: "center", background: "#FDFAF6" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>📄</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: C.text, marginBottom: 6 }}>Arraste sua planilha aqui</div>
                <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 16 }}>Aceita .xlsx, .xls e .csv</div>
                <Btn variant="secondary">Selecionar arquivo</Btn>
              </div>
              <div style={{ marginTop: 20, background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 18 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.text, marginBottom: 10 }}>Formato esperado da planilha:</div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                    <thead>
                      <tr style={{ background: "#F8F5F1" }}>
                        {["Nome *", "CPF *", "Telefone", "E-mail", "Nascimento", "Passaporte", "Val. Passaporte"].map(h => (
                          <th key={h} style={{ padding: "8px 10px", textAlign: "left", fontWeight: 700, color: C.textMuted, borderBottom: `1px solid ${C.border}` }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {["Maria Silva", "123.456.789-00", "(34) 9999-1234", "maria@email.com", "15/03/1985", "FX123456", "01/06/2028"].map((v, i) => (
                          <td key={i} style={{ padding: "8px 10px", color: C.textFaint, borderBottom: `1px solid ${C.borderLight}`, fontFamily: "monospace", fontSize: 11 }}>{v}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div style={{ fontSize: 11, color: C.textFaint, marginTop: 10 }}>* Campos obrigatórios. As demais colunas são opcionais.</div>
              </div>
              <button style={{ marginTop: 16, background: "none", border: "none", fontSize: 13, color: C.textMuted, cursor: "pointer", fontFamily: "inherit", textDecoration: "underline" }}>
                Pular — vou cadastrar manualmente
              </button>
            </div>
          )}

          {step === 5 && (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
              <div style={{ fontSize: 15, color: C.textMid, lineHeight: 1.8, maxWidth: 380, margin: "0 auto" }}>
                Sua agência está configurada e pronta para usar. Você pode alterar tudo em <b>Configurações</b> a qualquer momento.
              </div>
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32 }}>
            {step > 0 ? <Btn variant="ghost" onClick={() => setStep(s => s - 1)}>← Voltar</Btn> : <div />}
            {step < steps.length - 1
              ? <Btn variant="primary" onClick={() => setStep(s => s + 1)}>Continuar →</Btn>
              : <Btn variant="accent" onClick={onFinish}>Entrar no ViagemPro ✈</Btn>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── NOVO CLIENTE MODAL ─────────────────────────────────
function NovoClienteModal({ onClose }) {
  const isMobile = useIsMobile();
  const col2 = isMobile ? "1fr" : "1fr 1fr";
  const col3 = isMobile ? "1fr" : "1fr 1fr 1fr";
  return (
    <Modal title="Novo cliente" onClose={onClose} wide>
      <SectionLabel>Dados pessoais</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: col2, gap: 16 }}>
        <FormField label="Nome completo" placeholder="Nome do cliente" required />
        <FormField label="CPF" placeholder="000.000.000-00" required hint="Validação automática" />
        <FormField label="Data de nascimento" type="date" />
        <FormField label="Indicado por" options={["—", "Maria Silva", "Ana Costa", "João Oliveira"]} />
      </div>
      <SectionLabel>Contato</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: col2, gap: 16 }}>
        <FormField label="Telefone / WhatsApp" placeholder="(00) 00000-0000" required />
        <FormField label="E-mail" placeholder="email@exemplo.com" type="email" />
      </div>
      <SectionLabel>Documentos de viagem</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: col2, gap: 16 }}>
        <FormField label="Nº Passaporte" placeholder="Ex: FX123456" hint="Deixe em branco se não tiver" />
        <FormField label="Validade do passaporte" type="date" hint="Alerta automático 6 meses antes" />
        <FormField label="Nº RG" placeholder="MG-12.345.678" />
        <FormField label="Nacionalidade" placeholder="Brasileira" />
      </div>
      <SectionLabel>Preferências</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: col3, gap: 16 }}>
        <FormField label="Assento preferido" options={["Sem preferência", "Janela", "Corredor", "Saída de emergência"]} />
        <FormField label="Classe preferida" options={["Econômica", "Premium Economy", "Executiva", "Primeira"]} />
        <FormField label="Restrição alimentar" options={["Nenhuma", "Vegetariano", "Vegano", "Kosher", "Sem glúten", "Sem lactose"]} />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 28, paddingTop: 20, borderTop: `1px solid ${C.border}` }}>
        <Btn variant="secondary" onClick={onClose}>Cancelar</Btn>
        <Btn variant="primary" onClick={onClose}>Salvar cliente</Btn>
      </div>
    </Modal>
  );
}

// ─── NOVA VIAGEM MODAL ─────────────────────────────────
function NovaViagemModal({ onClose }) {
  const isMobile = useIsMobile();
  const col2 = isMobile ? "1fr" : "1fr 1fr";
  const col3 = isMobile ? "1fr" : "1fr 1fr 1fr";
  return (
    <Modal title="Nova viagem" onClose={onClose} wide>
      <SectionLabel>Cliente e consultor</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: col2, gap: 16 }}>
        <FormField label="Cliente" options={SAMPLE_CLIENTES.map(c => c.nome)} required />
        <FormField label="Consultor responsável" options={["Patrícia", "Roberto"]} required />
      </div>
      <SectionLabel>Roteiro</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: col3, gap: 16 }}>
        <FormField label="Destino" placeholder="Cidade, País" required />
        <FormField label="Data de ida" type="date" required />
        <FormField label="Data de volta" type="date" required />
      </div>
      <SectionLabel>Aéreo</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: col2, gap: 16 }}>
        <FormField label="Companhia aérea" options={["Latam", "Gol", "Azul", "TAP", "Air France", "Emirates", "Outra"]} />
        <FormField label="Localizador" placeholder="Ex: XK3F9T" hint="Código da reserva aérea" />
      </div>
      <SectionLabel>Hospedagem</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: col2, gap: 16 }}>
        <FormField label="Hotel / Pousada" placeholder="Nome do hotel" />
        <FormField label="Código da reserva" placeholder="Ex: PES-44821" />
      </div>
      <SectionLabel>Seguro e extras</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: col2, gap: 16 }}>
        <FormField label="Seguro viagem" options={["—", "Assist Card Gold", "Assist Card Basic", "GTA Full", "April Full", "Travel Ace", "Outro"]} />
        <FormField label="Transfer" options={["Não incluso", "Apenas ida", "Apenas volta", "Ida e volta"]} />
      </div>
      <SectionLabel>Financeiro</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: col3, gap: 16 }}>
        <FormField label="Valor total" placeholder="R$ 0,00" type="number" required />
        <FormField label="Forma de pagamento" options={["À vista — PIX", "À vista — cartão", "Parcelado 2x", "Parcelado 3x", "Parcelado 6x", "Parcelado 10x", "Parcelado 12x"]} />
        <FormField label="Status" options={["Orçamento", "Confirmada", "Em andamento"]} />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 28, paddingTop: 20, borderTop: `1px solid ${C.border}` }}>
        <Btn variant="secondary" onClick={onClose}>Cancelar</Btn>
        <Btn variant="primary" onClick={onClose}>Criar viagem</Btn>
      </div>
    </Modal>
  );
}

// ─── NOVO PAGAMENTO MODAL ───────────────────────────────
function NovoPagamentoModal({ onClose }) {
  const isMobile = useIsMobile();
  return (
    <Modal title="Registrar pagamento" onClose={onClose}>
      <div style={{ display: "grid", gap: 16 }}>
        <FormField label="Viagem" options={SAMPLE_VIAGENS.map(v => `${v.cliente} — ${v.destino}`)} required />
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 }}>
          <FormField label="Valor recebido" placeholder="R$ 0,00" type="number" required />
          <FormField label="Data do pagamento" type="date" required />
        </div>
        <FormField label="Forma" options={["PIX", "Cartão de crédito", "Cartão de débito", "Transferência", "Dinheiro", "Boleto"]} required />
        <FormField label="Observação" placeholder="Ex: 2ª parcela de 3" />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 28, paddingTop: 20, borderTop: `1px solid ${C.border}` }}>
        <Btn variant="secondary" onClick={onClose}>Cancelar</Btn>
        <Btn variant="primary" onClick={onClose}>Registrar</Btn>
      </div>
    </Modal>
  );
}

// ─── NOVO FORNECEDOR MODAL ──────────────────────────────
function NovoFornecedorModal({ onClose }) {
  const isMobile = useIsMobile();
  const col2 = isMobile ? "1fr" : "1fr 1fr";
  return (
    <Modal title="Novo fornecedor" onClose={onClose}>
      <div style={{ display: "grid", gap: 16 }}>
        <FormField label="Nome / Razão social" placeholder="Ex: CVC Operadora" required />
        <FormField label="Tipo" options={["Operadora", "Cia Aérea", "Hotel / Rede", "Seguradora", "Receptivo / Transfer", "Outro"]} required />
        <div style={{ display: "grid", gridTemplateColumns: col2, gap: 16 }}>
          <FormField label="Telefone" placeholder="(00) 0000-0000" />
          <FormField label="E-mail" placeholder="parceiros@empresa.com" type="email" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: col2, gap: 16 }}>
          <FormField label="Comissão padrão (%)" placeholder="Ex: 12" type="number" />
          <FormField label="Contrato vigente até" type="date" />
        </div>
        <FormField label="Observações" placeholder="Condições comerciais, contato do representante..." />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 28, paddingTop: 20, borderTop: `1px solid ${C.border}` }}>
        <Btn variant="secondary" onClick={onClose}>Cancelar</Btn>
        <Btn variant="primary" onClick={onClose}>Salvar fornecedor</Btn>
      </div>
    </Modal>
  );
}

// ─── NOVA TAREFA MODAL ──────────────────────────────────
function NovaTarefaModal({ onClose }) {
  const isMobile = useIsMobile();
  return (
    <Modal title="Nova tarefa" onClose={onClose}>
      <div style={{ display: "grid", gap: 16 }}>
        <FormField label="Descrição" placeholder="Ex: Emitir bilhete TAP — Maria Silva" required />
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 }}>
          <FormField label="Prioridade" options={["Alta", "Média", "Baixa"]} required />
          <FormField label="Prazo" type="date" required />
        </div>
        <FormField label="Responsável" options={["Patrícia", "Roberto"]} required />
        <FormField label="Viagem relacionada" options={["—", ...SAMPLE_VIAGENS.map(v => `${v.cliente} — ${v.destino}`)]} />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 28, paddingTop: 20, borderTop: `1px solid ${C.border}` }}>
        <Btn variant="secondary" onClick={onClose}>Cancelar</Btn>
        <Btn variant="primary" onClick={onClose}>Criar tarefa</Btn>
      </div>
    </Modal>
  );
}

// ─── CONFIGURAÇÕES ──────────────────────────────────────
function Configuracoes() {
  const [subTab, setSubTab] = useState("agencia");
  const isMobile = useIsMobile();
  const subs = [
    { id: "agencia", label: "Agência" },
    { id: "equipe", label: "Equipe e permissões" },
    { id: "parceiros", label: "Parceiros frequentes" },
    { id: "financeiro", label: "Financeiro" },
    { id: "importar", label: "Importar dados" },
  ];

  return (
    <div>
      <div style={{ display: "flex", gap: 4, marginBottom: 24, borderBottom: `1px solid ${C.border}`, paddingBottom: 0, overflowX: "auto", whiteSpace: "nowrap" }}>
        {subs.map(s => (
          <button key={s.id} onClick={() => setSubTab(s.id)} style={{
            padding: "10px 18px", fontSize: 13, fontWeight: subTab === s.id ? 700 : 500,
            color: subTab === s.id ? C.text : C.textMuted, background: "none",
            border: "none", borderBottom: subTab === s.id ? `2px solid ${C.accentDark}` : "2px solid transparent",
            cursor: "pointer", fontFamily: "inherit", marginBottom: -1
          }}>{s.label}</button>
        ))}
      </div>

      {subTab === "agencia" && (
        <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: isMobile ? 18 : 28 }}>
          <div style={{ display: "grid", gap: 16, maxWidth: 480 }}>
            <FormField label="Nome da agência" value="Viaje Mais Turismo" required />
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 }}>
              <FormField label="CNPJ" value="12.345.678/0001-90" />
              <FormField label="Cadastur" value="12345678" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 }}>
              <FormField label="Telefone" value="(34) 3333-4444" />
              <FormField label="E-mail" value="contato@viajemais.com.br" />
            </div>
            <FormField label="Endereço" value="Rua das Palmeiras, 123 — Uberlândia, MG" />
          </div>
          <div style={{ marginTop: 24 }}><Btn variant="primary">Salvar alterações</Btn></div>
        </div>
      )}

      {subTab === "equipe" && (
        <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: 28 }}>
          <div style={{ display: "grid", gap: 12, marginBottom: 20 }}>
            {[
              { nome: "Patrícia Souza", email: "patricia@viajemais.com.br", perfil: "admin" },
              { nome: "Roberto Almeida", email: "roberto@viajemais.com.br", perfil: "consultor" },
            ].map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", background: "#FDFAF6", borderRadius: 12, border: `1px solid ${C.border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: i === 0 ? C.purpleBg : C.blueBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: i === 0 ? C.purple : C.blue }}>{m.nome[0]}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{m.nome}</div>
                    <div style={{ fontSize: 12, color: C.textMuted }}>{m.email}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <select defaultValue={m.perfil} style={{ padding: "7px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12, fontFamily: "inherit", background: "#fff" }}>
                    <option value="admin">Administrador</option>
                    <option value="consultor">Consultor</option>
                    <option value="financeiro">Financeiro</option>
                  </select>
                  <Btn variant="ghost" style={{ fontSize: 11, color: C.red }}>Remover</Btn>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: "#FDFAF6", border: `1px dashed ${C.border}`, borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 12 }}>Convidar novo membro</div>
            <div style={{ display: "flex", gap: 12 }}>
              <FormField label="" placeholder="email@exemplo.com" />
              <div style={{ display: "flex", alignItems: "flex-end" }}><Btn variant="primary">Enviar convite</Btn></div>
            </div>
          </div>
          <div style={{ marginTop: 24, background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20, overflowX: "auto" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 14 }}>O que cada perfil pode fazer</div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, minWidth: 480 }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                  {["Permissão", "Administrador", "Consultor", "Financeiro"].map(h => (
                    <th key={h} style={{ padding: "8px 10px", textAlign: "left", fontWeight: 700, color: C.textMuted, fontSize: 11, textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Ver todos os clientes", true, false, false],
                  ["Cadastrar clientes e viagens", true, true, false],
                  ["Ver valores e comissões", true, false, true],
                  ["Registrar pagamentos", true, false, true],
                  ["Alterar configurações", true, false, false],
                  ["Gerenciar equipe", true, false, false],
                ].map(([perm, admin, cons, fin], i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${C.borderLight}` }}>
                    <td style={{ padding: "10px", color: C.textMid }}>{perm}</td>
                    {[admin, cons, fin].map((v, j) => (
                      <td key={j} style={{ padding: "10px", textAlign: "center", fontSize: 14 }}>{v ? <span style={{ color: C.green }}>✓</span> : <span style={{ color: "#DDD" }}>—</span>}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {subTab === "parceiros" && (
        <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: 28 }}>
          {[
            { titulo: "Companhias aéreas", items: ["Latam", "Gol", "Azul", "TAP"] },
            { titulo: "Seguradoras", items: ["Assist Card", "GTA"] },
            { titulo: "Operadoras", items: ["CVC Corp"] },
            { titulo: "Hotéis frequentes", items: ["Pestana Hotels", "Ibis", "Hyatt"] },
          ].map(grupo => (
            <div key={grupo.titulo} style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 10 }}>{grupo.titulo}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {grupo.items.map(item => (
                  <span key={item} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 10, background: "#FDFAF6", border: `1px solid ${C.border}`, fontSize: 12, fontWeight: 500, color: C.textMid }}>
                    {item} <span style={{ cursor: "pointer", color: C.textFaint, fontSize: 14 }}>×</span>
                  </span>
                ))}
                <span style={{ display: "inline-flex", alignItems: "center", padding: "7px 14px", borderRadius: 10, border: `1px dashed ${C.border}`, fontSize: 12, color: C.textMuted, cursor: "pointer" }}>+ Adicionar</span>
              </div>
            </div>
          ))}
          <div style={{ fontSize: 11, color: C.textFaint, marginTop: 8 }}>Esses parceiros aparecem como opções nos formulários de viagem.</div>
        </div>
      )}

      {subTab === "financeiro" && (
        <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: 28, maxWidth: 500 }}>
          <div style={{ display: "grid", gap: 16 }}>
            <FormField label="Moeda padrão" options={["BRL — Real", "USD — Dólar", "EUR — Euro"]} />
            <FormField label="Comissão padrão aéreo (%)" placeholder="8" type="number" hint="Usado como sugestão ao cadastrar viagem" />
            <FormField label="Comissão padrão hotel (%)" placeholder="15" type="number" />
            <FormField label="Alerta de inadimplência após" options={["7 dias", "15 dias", "30 dias"]} hint="Gera tarefa automática de cobrança" />
            <FormField label="Formas de pagamento aceitas" placeholder="PIX, cartão, boleto..." hint="Aparece nos formulários" />
          </div>
          <div style={{ marginTop: 24 }}><Btn variant="primary">Salvar</Btn></div>
        </div>
      )}

      {subTab === "importar" && (
        <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: isMobile ? 18 : 28 }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 20 }}>
            {[
              { titulo: "Importar clientes", desc: "Planilha com nome, CPF, contato e documentos", icon: "👤" },
              { titulo: "Importar viagens", desc: "Histórico de viagens com destinos e valores", icon: "✈" },
              { titulo: "Importar fornecedores", desc: "Cadastro de operadoras, hotéis e cias aéreas", icon: "🏢" },
              { titulo: "Importar financeiro", desc: "Histórico de pagamentos e comissões", icon: "💰" },
            ].map(item => (
              <div key={item.titulo} style={{ border: `2px dashed ${C.border}`, borderRadius: 14, padding: "28px 24px", textAlign: "center", background: "#FDFAF6", cursor: "pointer" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 4 }}>{item.titulo}</div>
                <div style={{ fontSize: 12, color: C.textMuted }}>{item.desc}</div>
                <div style={{ marginTop: 12 }}><Btn variant="secondary" style={{ fontSize: 12, padding: "6px 14px" }}>Selecionar .xlsx</Btn></div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, fontSize: 12, color: C.textFaint }}>
            💡 Precisa de ajuda? <span style={{ textDecoration: "underline", cursor: "pointer" }}>Baixe um modelo de planilha</span> com o formato correto.
          </div>
        </div>
      )}
    </div>
  );
}

// ─── DASHBOARD ──────────────────────────────────────────
function Dashboard({ viagens, tarefas }) {
  const isMobile = useIsMobile();
  const totalReceita = viagens.reduce((s, v) => s + v.valor, 0);
  const totalPago = viagens.reduce((s, v) => s + v.pago, 0);
  const confirmadas = viagens.filter(v => v.status === "Confirmada" || v.status === "Em andamento").length;
  const tarefasPend = tarefas.filter(t => !t.concluida).length;
  const tarefasAlta = tarefas.filter(t => !t.concluida && t.prioridade === "Alta");

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fit, minmax(170px, 1fr))", gap: isMobile ? 12 : 16, marginBottom: isMobile ? 24 : 32 }}>
        <StatCard label="Receita total" value={fmt(totalReceita)} sub={`${viagens.length} viagens`} accent={C.green} />
        <StatCard label="Recebido" value={fmt(totalPago)} accent={C.blue} />
        <StatCard label="A receber" value={fmt(totalReceita - totalPago)} accent={C.orange} />
        <StatCard label="Viagens ativas" value={confirmadas} accent={C.purple} />
        <StatCard label="Tarefas pendentes" value={tarefasPend} sub={`${tarefasAlta.length} urgentes`} accent={C.red} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 16 : 24 }}>
        <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: 24 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: C.text }}>Próximas viagens</h3>
          {viagens.filter(v => v.status !== "Concluída" && v.status !== "Cancelada").sort((a, b) => a.ida.localeCompare(b.ida)).slice(0, 4).map(v => (
            <div key={v.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${C.borderLight}` }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{v.destino}</div>
                <div style={{ fontSize: 11, color: C.textMuted }}>{v.cliente} · {fmtDate(v.ida)}</div>
              </div>
              <Badge text={v.status} colors={STATUS_COLORS[v.status]} />
            </div>
          ))}
        </div>
        <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: 24 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: C.text }}>Tarefas urgentes</h3>
          {tarefasAlta.slice(0, 4).map(t => (
            <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${C.borderLight}` }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{t.descricao}</div>
                <div style={{ fontSize: 11, color: C.textMuted }}>{t.responsavel} · até {fmtDate(t.prazo)}</div>
              </div>
              <Badge text={t.prioridade} colors={PRIORIDADE[t.prioridade]} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CLIENTES ───────────────────────────────────────────
function ClientesTab({ clientes, onAdd }) {
  const [search, setSearch] = useState("");
  const isMobile = useIsMobile();
  const filtered = clientes.filter(c => c.nome.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "stretch" : "center", gap: 12, marginBottom: 20 }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Buscar cliente..." />
        <div style={{ display: "flex", alignItems: "center", justifyContent: isMobile ? "space-between" : "flex-end", gap: 12 }}>
          <span style={{ fontSize: 12, color: C.textMuted }}>{filtered.length} clientes</span>
          <Btn variant="primary" onClick={onAdd} icon="+">Novo cliente</Btn>
        </div>
      </div>
      <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 720 }}>
          <thead>
            <tr style={{ background: "#F8F5F1", textAlign: "left" }}>
              {["Nome", "CPF", "Telefone", "E-mail", "Passaporte", "Val. Passap.", "Viagens"].map(h => (
                <th key={h} style={{ padding: "12px 16px", fontWeight: 700, color: C.textMuted, fontSize: 11, textTransform: "uppercase", letterSpacing: .8, borderBottom: `1px solid ${C.border}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => {
              const vencido = c.valPassaporte !== "—" && c.valPassaporte < "2026-01-01";
              return (
                <tr key={c.id} style={{ cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.background = "#FDFAF6"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "12px 16px", fontWeight: 600, color: C.text, borderBottom: `1px solid ${C.borderLight}` }}>{c.nome}</td>
                  <td style={{ padding: "12px 16px", color: C.textMid, borderBottom: `1px solid ${C.borderLight}`, fontFamily: "monospace", fontSize: 12 }}>{c.cpf}</td>
                  <td style={{ padding: "12px 16px", color: C.textMid, borderBottom: `1px solid ${C.borderLight}` }}>{c.telefone}</td>
                  <td style={{ padding: "12px 16px", color: C.textMid, borderBottom: `1px solid ${C.borderLight}` }}>{c.email}</td>
                  <td style={{ padding: "12px 16px", color: C.textMid, borderBottom: `1px solid ${C.borderLight}`, fontFamily: "monospace", fontSize: 12 }}>{c.passaporte}</td>
                  <td style={{ padding: "12px 16px", borderBottom: `1px solid ${C.borderLight}`, color: vencido ? C.red : C.textMid, fontWeight: vencido ? 700 : 400 }}>{fmtDate(c.valPassaporte)}{vencido && " ⚠"}</td>
                  <td style={{ padding: "12px 16px", color: C.textMid, borderBottom: `1px solid ${C.borderLight}`, textAlign: "center" }}>{c.totalViagens}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}

// ─── VIAGENS ────────────────────────────────────────────
function ViagensTab({ viagens, onAdd }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const isMobile = useIsMobile();
  const filtered = viagens.filter(v => {
    const m1 = v.cliente.toLowerCase().includes(search.toLowerCase()) || v.destino.toLowerCase().includes(search.toLowerCase());
    return m1 && (statusFilter === "Todos" || v.status === statusFilter);
  });
  return (
    <div>
      <div style={{ display: "flex", gap: 12, alignItems: isMobile ? "stretch" : "center", marginBottom: 20, flexWrap: "wrap", flexDirection: isMobile ? "column" : "row" }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Buscar destino ou cliente..." />
        <div style={{ display: "flex", gap: 6, flex: 1, flexWrap: "wrap", overflowX: isMobile ? "auto" : "visible" }}>
          {["Todos", ...Object.keys(STATUS_COLORS)].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} style={{ padding: "6px 14px", borderRadius: 20, border: statusFilter === s ? "2px solid #2C2520" : `1px solid #DDD7D0`, background: statusFilter === s ? "#2C2520" : "#fff", color: statusFilter === s ? "#fff" : "#5C554C", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", flexShrink: 0 }}>{s}</button>
          ))}
        </div>
        <Btn variant="primary" onClick={onAdd} icon="+">Nova viagem</Btn>
      </div>
      <div style={{ display: "grid", gap: 16 }}>
        {filtered.map(v => (
          <div key={v.id} style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: isMobile ? 18 : 24, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr auto", gap: isMobile ? 14 : 20, alignItems: "start" }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 4 }}>{v.destino}</div>
              <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 8 }}>{v.cliente}</div>
              <Badge text={v.status} colors={STATUS_COLORS[v.status]} />
            </div>
            <div style={{ fontSize: 12, color: C.textMid, lineHeight: 2 }}>
              <div><span style={{ color: C.textFaint }}>Ida:</span> {fmtDate(v.ida)}</div>
              <div><span style={{ color: C.textFaint }}>Volta:</span> {fmtDate(v.volta)}</div>
              <div><span style={{ color: C.textFaint }}>Cia:</span> {v.cia} · <span style={{ fontFamily: "monospace" }}>{v.localizador}</span></div>
            </div>
            <div style={{ fontSize: 12, color: C.textMid, lineHeight: 2 }}>
              <div><span style={{ color: C.textFaint }}>Hotel:</span> {v.hotel}</div>
              <div><span style={{ color: C.textFaint }}>Reserva:</span> <span style={{ fontFamily: "monospace" }}>{v.codReserva}</span></div>
              <div><span style={{ color: C.textFaint }}>Seguro:</span> {v.seguro}</div>
            </div>
            <div style={{ textAlign: isMobile ? "left" : "right", minWidth: isMobile ? 0 : 130, paddingTop: isMobile ? 8 : 0, borderTop: isMobile ? `1px solid ${C.borderLight}` : "none" }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: C.text, fontFamily: "'DM Serif Display', Georgia, serif" }}>{fmt(v.valor)}</div>
              <div style={{ fontSize: 11, color: v.pago >= v.valor ? C.green : C.orange, fontWeight: 600, marginTop: 4 }}>
                {v.pago >= v.valor ? "✓ Quitado" : `Pago: ${fmt(v.pago)}`}
              </div>
              <div style={{ fontSize: 11, color: C.textFaint, marginTop: 4 }}>Consultor: {v.consultor}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── FINANCEIRO ─────────────────────────────────────────
function FinanceiroTab({ viagens, onAddPagamento }) {
  const isMobile = useIsMobile();
  const totalReceita = viagens.reduce((s, v) => s + v.valor, 0);
  const totalPago = viagens.reduce((s, v) => s + v.pago, 0);
  const inadimplentes = viagens.filter(v => v.pago < v.valor && v.status !== "Orçamento");
  const barMax = Math.max(...viagens.map(v => v.valor));
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: isMobile ? 12 : 16, flex: 1 }}>
          <StatCard label="Receita prevista" value={fmt(totalReceita)} accent={C.green} />
          <StatCard label="Total recebido" value={fmt(totalPago)} sub={`${((totalPago / totalReceita) * 100).toFixed(0)}%`} accent={C.blue} />
          <StatCard label="Pendente" value={fmt(totalReceita - totalPago)} accent={C.orange} />
        </div>
      </div>
      <div style={{ marginBottom: 16, display: "flex", justifyContent: "flex-end" }}>
        <Btn variant="primary" onClick={onAddPagamento} icon="+">Registrar pagamento</Btn>
      </div>
      <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: isMobile ? 18 : 24, marginBottom: 24 }}>
        <h3 style={{ margin: "0 0 20px", fontSize: 15, fontWeight: 700, color: C.text }}>Receita por viagem</h3>
        <div style={{ display: "grid", gap: 14 }}>
          {viagens.map(v => (
            <div key={v.id}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
                <span style={{ fontWeight: 600, color: C.text }}>{v.destino} <span style={{ fontWeight: 400, color: C.textMuted }}>— {v.cliente}</span></span>
                <span style={{ color: C.textMid }}>{fmt(v.valor)}</span>
              </div>
              <div style={{ height: 8, background: "#F0ECE7", borderRadius: 4, overflow: "hidden", position: "relative" }}>
                <div style={{ height: "100%", width: `${(v.valor / barMax) * 100}%`, background: "#DDD7D0", borderRadius: 4, position: "absolute" }} />
                <div style={{ height: "100%", width: `${(v.pago / barMax) * 100}%`, background: v.pago >= v.valor ? "#4CAF50" : "#FF9800", borderRadius: 4, position: "absolute" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      {inadimplentes.length > 0 && (
        <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: 24 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: C.red }}>⚠ Saldos pendentes</h3>
          {inadimplentes.map(v => (
            <div key={v.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${C.borderLight}` }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{v.cliente}</div>
                <div style={{ fontSize: 11, color: C.textMuted }}>{v.destino} · {fmtDate(v.ida)}</div>
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.orange }}>{fmt(v.valor - v.pago)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── FORNECEDORES ───────────────────────────────────────
function FornecedoresTab({ fornecedores, onAdd }) {
  const isMobile = useIsMobile();
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
        <Btn variant="primary" onClick={onAdd} icon="+">Novo fornecedor</Btn>
      </div>
      <div style={{ display: "grid", gap: 16 }}>
        {fornecedores.map(f => (
          <div key={f.id} style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: isMobile ? 18 : 24, display: "grid", gridTemplateColumns: isMobile ? "1fr auto" : "1fr 1fr 1fr auto", gap: isMobile ? 12 : 20, alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{f.nome}</div>
              <div style={{ fontSize: 12, color: C.textMuted, marginTop: 4 }}>{f.tipo}</div>
            </div>
            <div style={{ fontSize: 12, color: C.textMid, lineHeight: 2 }}>
              <div>{f.contato}</div><div>{f.email}</div>
            </div>
            <div style={{ fontSize: 12, color: C.textMid }}>{f.contrato}</div>
            <div style={{ background: C.greenBg, color: C.green, padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 700 }}>{f.comissao}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── TAREFAS ────────────────────────────────────────────
function TarefasTab({ tarefas, setTarefas, onAdd }) {
  const toggle = id => setTarefas(p => p.map(t => t.id === id ? { ...t, concluida: !t.concluida } : t));
  const pendentes = tarefas.filter(t => !t.concluida).sort((a, b) => a.prazo.localeCompare(b.prazo));
  const concluidas = tarefas.filter(t => t.concluida);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
        <Btn variant="primary" onClick={onAdd} icon="+">Nova tarefa</Btn>
      </div>
      <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: 24, marginBottom: 24 }}>
        <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: C.text }}>Pendentes ({pendentes.length})</h3>
        {pendentes.map(t => (
          <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: `1px solid ${C.borderLight}`, cursor: "pointer" }} onClick={() => toggle(t.id)}>
            <div style={{ width: 22, height: 22, borderRadius: 6, border: "2px solid #CCC5BB", flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{t.descricao}</div>
              <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>{t.responsavel} · até {fmtDate(t.prazo)}</div>
            </div>
            <Badge text={t.prioridade} colors={PRIORIDADE[t.prioridade]} />
          </div>
        ))}
      </div>
      {concluidas.length > 0 && (
        <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: 24, opacity: .7 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: C.textMuted }}>Concluídas ({concluidas.length})</h3>
          {concluidas.map(t => (
            <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: `1px solid ${C.borderLight}`, cursor: "pointer" }} onClick={() => toggle(t.id)}>
              <div style={{ width: 22, height: 22, borderRadius: 6, background: "#4CAF50", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#fff", fontSize: 13 }}>✓</div>
              <div style={{ flex: 1, textDecoration: "line-through", color: C.textFaint, fontSize: 13 }}>{t.descricao}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════
export default function App() {
  const [onboarded, setOnboarded] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [tarefas, setTarefas] = useState(SAMPLE_TAREFAS);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useIsMobile();

  // Modals
  const [modal, setModal] = useState(null);

  if (!onboarded) return <OnboardingWizard onFinish={() => setOnboarded(true)} />;

  const tabTitles = { dashboard: "Painel geral", clientes: "Clientes", viagens: "Viagens", financeiro: "Financeiro", fornecedores: "Fornecedores", tarefas: "Tarefas", config: "Configurações" };

  const tabContent = {
    dashboard: <Dashboard viagens={SAMPLE_VIAGENS} tarefas={tarefas} />,
    clientes: <ClientesTab clientes={SAMPLE_CLIENTES} onAdd={() => setModal("cliente")} />,
    viagens: <ViagensTab viagens={SAMPLE_VIAGENS} onAdd={() => setModal("viagem")} />,
    financeiro: <FinanceiroTab viagens={SAMPLE_VIAGENS} onAddPagamento={() => setModal("pagamento")} />,
    fornecedores: <FornecedoresTab fornecedores={SAMPLE_FORNECEDORES} onAdd={() => setModal("fornecedor")} />,
    tarefas: <TarefasTab tarefas={tarefas} setTarefas={setTarefas} onAdd={() => setModal("tarefa")} />,
    config: <Configuracoes />,
  };

  const pickTab = (id) => {
    setActiveTab(id);
    if (isMobile) setDrawerOpen(false);
  };

  const sidebarVisible = !isMobile || drawerOpen;
  const sidebarWidth = isMobile ? 240 : (sidebarCollapsed ? 64 : 220);

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'IBM Plex Sans', 'Segoe UI', sans-serif", background: C.bg, color: C.text }}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet" />

      {/* Modals */}
      {modal === "cliente" && <NovoClienteModal onClose={() => setModal(null)} />}
      {modal === "viagem" && <NovaViagemModal onClose={() => setModal(null)} />}
      {modal === "pagamento" && <NovoPagamentoModal onClose={() => setModal(null)} />}
      {modal === "fornecedor" && <NovoFornecedorModal onClose={() => setModal(null)} />}
      {modal === "tarefa" && <NovaTarefaModal onClose={() => setModal(null)} />}

      {/* Mobile drawer backdrop */}
      {isMobile && drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(44,37,32,.5)", zIndex: 90 }}
        />
      )}

      {/* Sidebar */}
      <nav style={{
        width: sidebarWidth,
        background: C.sidebar,
        color: "#E8E4DF",
        display: "flex",
        flexDirection: "column",
        transition: isMobile ? "transform .25s ease" : "width .25s ease",
        flexShrink: 0,
        overflow: "hidden",
        ...(isMobile ? {
          position: "fixed",
          top: 0, left: 0, bottom: 0,
          zIndex: 100,
          transform: sidebarVisible ? "translateX(0)" : "translateX(-100%)",
          boxShadow: sidebarVisible ? "0 10px 40px rgba(0,0,0,.3)" : "none",
        } : {}),
      }}>
        <div style={{ padding: (!isMobile && sidebarCollapsed) ? "24px 12px" : "24px 20px", borderBottom: "1px solid #3D3530", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, cursor: isMobile ? "default" : "pointer", whiteSpace: "nowrap" }} onClick={isMobile ? undefined : () => setSidebarCollapsed(c => !c)}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22 }}>✈</span>
            {(!sidebarCollapsed || isMobile) && <span style={{ fontSize: 16, fontWeight: 700, fontFamily: "'DM Serif Display', Georgia, serif", letterSpacing: .5 }}>ViagemPro</span>}
          </div>
          {isMobile && (
            <button onClick={() => setDrawerOpen(false)} style={{ background: "none", border: "none", color: "#A69E94", fontSize: 20, cursor: "pointer", padding: 4 }}>✕</button>
          )}
        </div>
        <div style={{ flex: 1, padding: "12px 0" }}>
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => pickTab(tab.id)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 12,
              padding: "12px 20px", background: activeTab === tab.id ? C.sidebarHover : "transparent",
              border: "none", color: activeTab === tab.id ? "#fff" : "#A69E94",
              fontSize: 13, fontWeight: activeTab === tab.id ? 700 : 500,
              cursor: "pointer", fontFamily: "inherit", textAlign: "left",
              borderLeft: activeTab === tab.id ? `3px solid ${C.accent}` : "3px solid transparent",
              transition: "all .15s", whiteSpace: "nowrap"
            }}>
              <span style={{ fontSize: 16, width: 20, textAlign: "center" }}>{tab.icon}</span>
              {(!sidebarCollapsed || isMobile) && tab.label}
            </button>
          ))}
        </div>
        {(!sidebarCollapsed || isMobile) && <div style={{ padding: "16px 20px", borderTop: "1px solid #3D3530", fontSize: 10, color: "#6C655C" }}>ViagemPro v0.2</div>}
      </nav>

      {/* Main */}
      <main style={{ flex: 1, padding: isMobile ? "16px 16px 32px" : 32, overflowY: "auto", minWidth: 0, width: isMobile ? "100%" : "auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
          {isMobile && (
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Abrir menu"
              style={{
                width: 40, height: 40, borderRadius: 10,
                background: C.sidebar, color: "#fff",
                border: "none", fontSize: 18, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}
            >☰</button>
          )}
          <h1 style={{ margin: 0, fontSize: isMobile ? 20 : 24, fontWeight: 700, fontFamily: "'DM Serif Display', Georgia, serif", color: C.text }}>{tabTitles[activeTab]}</h1>
        </div>
        <div style={{ fontSize: 12, color: C.textFaint, marginBottom: isMobile ? 20 : 28 }}>Hoje: {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</div>
        {tabContent[activeTab]}
      </main>
    </div>
  );
}
