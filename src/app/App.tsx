import { useState } from "react";
import {
  Home, ArrowLeftRight, Plus, BarChart2, User, Bell, Search,
  ChevronDown, Pencil, Trash2, X, ArrowLeft,
  AlertTriangle, CheckSquare, Square, ChevronRight,
  LogOut, Zap, Clock, Wifi, Wallet, ArrowUp, ArrowDown, Calendar,
  FileText, Camera
} from "lucide-react";

// ─── Primitives ───────────────────────────────────────────────────────────────

function WireBox({ className = "", children }: { className?: string; children?: React.ReactNode }) {
  return <div className={`border-2 border-foreground bg-card ${className}`}>{children}</div>;
}

function WirePlaceholder({ className = "", label = "" }: { className?: string; label?: string }) {
  return (
    <div className={`border-2 border-foreground relative overflow-hidden flex items-center justify-center ${className}`} style={{ background: "#e8e8e8" }}>
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="10" stroke="#aaaaaa" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hatch)" />
      </svg>
      {label && <span className="relative z-10 text-[9px] font-mono text-muted-foreground bg-white/80 px-1 py-0.5 border border-foreground/30 text-center">{label}</span>}
    </div>
  );
}

function WireInput({ label, placeholder = "", type = "text" }: { label: string; placeholder?: string; type?: string }) {
  return (
    <div className="mb-3">
      <div className="text-[9px] font-mono text-muted-foreground mb-1 uppercase tracking-wider">{label}</div>
      <div className="border-2 border-foreground px-3 py-2 bg-input-background flex items-center">
        <span className="text-[11px] font-mono text-muted-foreground flex-1">
          {type === "password" ? "••••••••••" : placeholder || "_______________"}
        </span>
      </div>
    </div>
  );
}

function WireButton({ label, variant = "filled", size = "md" }: {
  label: string; variant?: "filled" | "outline"; size?: "sm" | "md";
}) {
  const sz = size === "sm" ? "py-1.5 px-3 text-[10px]" : "py-3 px-4 text-[11px]";
  const v  = variant === "filled" ? "bg-foreground text-primary-foreground" : "bg-transparent text-foreground";
  return <div className={`w-full font-mono uppercase tracking-widest text-center border-2 border-foreground cursor-pointer flex items-center justify-center gap-2 ${sz} ${v}`}>{label}</div>;
}

function WireChip({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <div className={`border-2 border-foreground px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider cursor-pointer flex-shrink-0 ${active ? "bg-foreground text-primary-foreground" : "bg-card"}`}>
      {label}
    </div>
  );
}

// ─── Status Bar ───────────────────────────────────────────────────────────────

function StatusBar({ light = false }: { light?: boolean }) {
  const text = light ? "text-foreground" : "text-primary-foreground";
  const bg   = light ? "bg-card border-b-2 border-foreground" : "bg-foreground";
  const bar  = light ? "bg-foreground" : "bg-primary-foreground";
  return (
    <div className={`flex items-center justify-between px-4 flex-shrink-0 ${bg}`} style={{ height: 24 }}>
      <span className={`text-[10px] font-mono font-medium ${text}`}>9:41</span>
      <div className={`flex items-center gap-1.5 ${text}`}>
        <div className="flex items-end gap-px">
          {[4,6,8,10].map((h,i) => <div key={i} className={bar} style={{ width:3, height:h, opacity: i<3 ? 0.5:1 }} />)}
        </div>
        <Wifi size={10} strokeWidth={2.5} />
        <div className="flex items-center gap-0.5">
          <div className={`border flex items-center px-px ${light?"border-foreground":"border-primary-foreground"}`} style={{ width:20, height:10, borderRadius:2 }}>
            <div className={`${bar}`} style={{ width:"75%", height:"60%", borderRadius:1 }} />
          </div>
          <div className={bar} style={{ width:2, height:5, borderRadius:1 }} />
        </div>
      </div>
    </div>
  );
}

// ─── Phone Frame ──────────────────────────────────────────────────────────────

function PhoneFrame({ label, screen }: { label: string; screen: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground border border-muted-foreground/40 px-3 py-1 text-center">{label}</div>
      <div className="relative border-[3px] border-foreground shadow-[6px_6px_0px_#111] overflow-hidden" style={{ width:360, borderRadius:28, background:"#111" }}>
        <div className="mx-auto bg-foreground" style={{ width:90, height:6, borderRadius:"0 0 8px 8px" }} />
        <div className="bg-background" style={{ height:720 }}>{screen}</div>
      </div>
      <div className="w-16 h-1 bg-foreground rounded-full" />
    </div>
  );
}

// ─── Top Header ───────────────────────────────────────────────────────────────

function TopHeader({ title = "Ka-Ching!", showBack = false }: { title?: string; showBack?: boolean }) {
  return (
    <div className="border-b-2 border-foreground px-4 py-2.5 flex items-center justify-between bg-card flex-shrink-0">
      <div className="flex items-center gap-2">
        {showBack && <ArrowLeft size={15} strokeWidth={2.5} />}
        <span className="font-mono font-medium text-[14px] tracking-tight">{title}</span>
      </div>
      <div className="flex items-center gap-3">
        <Bell size={16} strokeWidth={2} />
        <div className="border-2 border-foreground flex items-center justify-center bg-secondary" style={{ width:26, height:26 }}>
          <User size={14} strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}

// ─── Bottom Nav ───────────────────────────────────────────────────────────────

function BottomNav({ active = "home" }: { active?: "home"|"transactions"|"budget"|"insights" }) {
  const left  = [
    { id:"home",         icon:<Home size={17} strokeWidth={2}/>,          label:"Home"    },
    { id:"transactions", icon:<ArrowLeftRight size={15} strokeWidth={2}/>, label:"History" },
  ];
  const right = [
    { id:"budget",   icon:<Wallet size={17} strokeWidth={2}/>,   label:"Budget"   },
    { id:"insights", icon:<BarChart2 size={17} strokeWidth={2}/>, label:"Insights" },
  ];
  return (
    <div className="absolute bottom-0 left-0 right-0 border-t-2 border-foreground bg-card">
      <div className="flex items-center justify-around px-2 pt-2 pb-2.5">
        {left.map(item => (
          <div key={item.id} className="flex flex-col items-center gap-0.5 flex-1">
            <div style={{ opacity: item.id===active ? 1 : 0.35 }}>{item.icon}</div>
            <span className={`text-[8px] font-mono uppercase tracking-wider ${item.id===active?"font-medium":"text-muted-foreground"}`}>{item.label}</span>
          </div>
        ))}
        <div className="flex flex-col items-center flex-1" style={{ marginTop:-18 }}>
          <div className="border-2 border-foreground bg-foreground flex items-center justify-center shadow-[3px_3px_0_#555]" style={{ width:46, height:46 }}>
            <Plus size={20} strokeWidth={2.5} color="white" />
          </div>
          <span className="text-[8px] font-mono uppercase tracking-wider text-muted-foreground mt-1">Add</span>
        </div>
        {right.map(item => (
          <div key={item.id} className="flex flex-col items-center gap-0.5 flex-1">
            <div style={{ opacity: item.id===active ? 1 : 0.35 }}>{item.icon}</div>
            <span className={`text-[8px] font-mono uppercase tracking-wider ${item.id===active?"font-medium":"text-muted-foreground"}`}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Screen 1 · Login ────────────────────────────────────────────────────────

function ScreenLogin() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-background font-mono">
      <StatusBar />
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth:"none" }}>
        <div className="flex flex-col items-center pt-10 pb-6 px-6 border-b-2 border-dashed border-muted">
          <WirePlaceholder className="mb-4 w-20 h-20" label="LOGO" />
          <div className="text-[24px] font-medium tracking-tight">Ka-Ching!</div>
          <div className="text-center mt-2">
            <div className="text-[11px] font-medium">Your personal finance companion.</div>
            <div className="text-[10px] text-muted-foreground mt-0.5">Track smarter. Save better.</div>
          </div>
        </div>
        <div className="px-6 pt-5">
          <WireInput label="Email Address" placeholder="user@example.com" />
          <WireInput label="Password" placeholder="••••••••" type="password" />
          <div className="text-right mb-4 -mt-1">
            <span className="text-[10px] text-muted-foreground underline cursor-pointer">Forgot Password?</span>
          </div>
          <WireButton label="Login" variant="filled" />
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 border-t-2 border-dashed border-muted" />
            <span className="text-[10px] text-muted-foreground">OR CONTINUE WITH</span>
            <div className="flex-1 border-t-2 border-dashed border-muted" />
          </div>
          <div className="space-y-2.5 mb-5">
            <div className="border-2 border-foreground py-2.5 flex items-center gap-3 px-4 bg-card cursor-pointer">
              <div className="border-2 border-foreground bg-secondary flex items-center justify-center font-bold text-[11px]" style={{ width:22, height:22 }}>G</div>
              <span className="text-[11px] font-mono flex-1 text-center">Continue with Google</span>
            </div>
            <div className="border-2 border-foreground py-2.5 flex items-center gap-3 px-4 bg-card cursor-pointer">
              <div className="border-2 border-foreground bg-foreground text-primary-foreground flex items-center justify-center font-bold text-[11px]" style={{ width:22, height:22 }}>f</div>
              <span className="text-[11px] font-mono flex-1 text-center">Continue with Facebook</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 py-3 border-t-2 border-dashed border-muted">
            <span className="text-[10px] text-muted-foreground">No account yet?</span>
            <span className="text-[10px] font-medium underline cursor-pointer">Register here</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 2 · Dashboard ────────────────────────────────────────────────────

function ScreenDashboard() {
  const categories = [
    { label:"Food & Drink", amount:"RM 210"   },
    { label:"Transport",    amount:"RM 85"    },
    { label:"Shopping",     amount:"RM 120"   },
    { label:"Health",       amount:"RM 45"    },
    { label:"Entertain.",   amount:"RM 95"    },
    { label:"Income",       amount:"RM 4,050" },
  ];
  const transactions = [
    { merchant:"Spotify",     category:"Entertainment", amount:"-RM 9.99"  },
    { merchant:"Salary",      category:"Income",        amount:"+RM 3,200" },
    { merchant:"Tesco Extra", category:"Groceries",     amount:"-RM 54.30" },
    { merchant:"Netflix",     category:"Entertainment", amount:"-RM 15.49" },
  ];
  return (
    <div className="flex flex-col h-full overflow-hidden bg-background font-mono relative">
      <StatusBar />
      <TopHeader />
      <div className="flex-1 overflow-y-auto pb-20" style={{ scrollbarWidth:"none" }}>
        <div className="px-4 pt-3 pb-1">
          <div className="text-[10px] text-muted-foreground">Good Morning,</div>
          <div className="text-[14px] font-medium">Jordan Kim</div>
        </div>
        <div className="mx-4 mt-2 border-2 border-foreground bg-foreground p-4 shadow-[4px_4px_0_#555]">
          <div className="text-[8px] tracking-widest uppercase text-primary-foreground/60 mb-1">Current Balance</div>
          <div className="text-[28px] font-medium text-primary-foreground tracking-tight leading-none mb-3">RM 12,480.50</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="border-2 border-primary-foreground/30 p-2 bg-white/10">
              <div className="flex items-center gap-1 mb-0.5">
                <ArrowUp size={9} strokeWidth={3} className="text-primary-foreground/70" />
                <div className="text-[7px] uppercase tracking-widest text-primary-foreground/50">This Month Income</div>
              </div>
              <div className="text-[13px] font-medium text-primary-foreground">RM 4,050</div>
            </div>
            <div className="border-2 border-primary-foreground/30 p-2 bg-white/10">
              <div className="flex items-center gap-1 mb-0.5">
                <ArrowDown size={9} strokeWidth={3} className="text-primary-foreground/70" />
                <div className="text-[7px] uppercase tracking-widest text-primary-foreground/50">This Month Expenses</div>
              </div>
              <div className="text-[13px] font-medium text-primary-foreground">RM 1,569</div>
            </div>
          </div>
        </div>
        <div className="mx-4 mt-3 border-2 border-foreground bg-card">
          <div className="px-3 py-2 border-b-2 border-dashed border-muted flex items-center justify-between">
            <span className="text-[10px] font-medium uppercase tracking-widest">Spending Breakdown</span>
            <span className="text-[8px] text-muted-foreground">Jul 2026</span>
          </div>
          <div className="p-3">
            <WirePlaceholder className="h-24" label="[ Bar Chart — 6 months ]" />
            <div className="flex justify-between mt-1 px-0.5 mb-3">
              {["Feb","Mar","Apr","May","Jun","Jul"].map(m => <span key={m} className="text-[8px] text-muted-foreground">{m}</span>)}
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {categories.map((cat, i) => (
                <div key={i} className="border border-dashed border-muted p-1.5 bg-secondary flex flex-col gap-0.5">
                  <div className="flex items-center gap-1">
                    <div className="flex-shrink-0 border border-foreground bg-muted" style={{ width:7, height:7 }} />
                    <span className="text-[8px] truncate">{cat.label}</span>
                  </div>
                  <span className="text-[9px] font-medium">{cat.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mx-4 mt-3 mb-3 border-2 border-foreground bg-card">
          <div className="px-3 py-2 border-b-2 border-dashed border-muted flex items-center justify-between">
            <span className="text-[10px] font-medium uppercase tracking-widest">Recent Transactions</span>
            <span className="text-[8px] text-muted-foreground underline cursor-pointer">See all</span>
          </div>
          {transactions.map((t, i) => (
            <div key={i} className={`flex items-center justify-between px-3 py-2.5 ${i<transactions.length-1?"border-b border-dashed border-muted":""}`}>
              <div className="flex items-center gap-2">
                <div className="border-2 border-muted bg-secondary flex items-center justify-center flex-shrink-0" style={{ width:26, height:26 }}>
                  <span className="text-[7px] text-muted-foreground">ICO</span>
                </div>
                <div>
                  <div className="text-[11px] font-medium">{t.merchant}</div>
                  <div className="text-[8px] text-muted-foreground uppercase tracking-wider">{t.category}</div>
                </div>
              </div>
              <div className="text-[11px] font-medium text-muted-foreground">{t.amount}</div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="home" />
    </div>
  );
}

// ─── Screen 10 · Bottom Sheet Modal ──────────────────────────────────────────

function ScreenBottomSheet() {
  const methods = [
      { 
        icon: (
          <div className="border-2 border-muted bg-secondary flex items-center justify-center flex-shrink-0" style={{ width: 26, height: 26 }}>
            <span className="text-[7px] text-muted-foreground">ICO</span>
          </div>
        ), 
        label: "Manual Expense Entry",     
        sub: "Enter transaction details manually"     
      },
      { 
        icon: (
          <div className="border-2 border-muted bg-secondary flex items-center justify-center flex-shrink-0" style={{ width: 26, height: 26 }}>
            <span className="text-[7px] text-muted-foreground">ICO</span>
          </div>
        ), 
        label: "Screenshot Batch Import",  
        sub: "Import multiple receipt images at once" 
      },
      { 
        icon: (
          <div className="border-2 border-muted bg-secondary flex items-center justify-center flex-shrink-0" style={{ width: 26, height: 26 }}>
            <span className="text-[7px] text-muted-foreground">ICO</span>
          </div>
        ), 
        label: "Single Receipt Camera",    
        sub: "Capture one receipt with live camera"   
      },
    ];
  return (
    <div className="flex flex-col h-full overflow-hidden font-mono relative">
      <StatusBar />
      {/* Dashboard background (dimmed) */}
      <div className="absolute top-6 left-0 right-0 bottom-0">
        {/* Faint header */}
        <div className="border-b-2 border-foreground px-4 py-2.5 flex items-center justify-between bg-card opacity-40">
          <span className="font-medium text-[14px]">Ka-Ching!</span>
          <div className="flex gap-3"><Bell size={16} strokeWidth={2} /></div>
        </div>
        {/* Faint dashboard content */}
        <div className="px-4 pt-2 opacity-30 bg-background">
          <div className="text-[14px] font-medium mt-1">Jordan Kim</div>
          <div className="border-2 border-foreground bg-foreground mt-2 p-3" style={{ height:82 }}>
            <div className="text-[8px] text-primary-foreground/50 uppercase tracking-widest">Current Balance</div>
            <div className="text-[22px] font-medium text-primary-foreground">RM 12,480.50</div>
          </div>
          <div className="border-2 border-foreground bg-card mt-3" style={{ height:110 }} />
          <div className="border-2 border-foreground bg-card mt-3" style={{ height:80 }} />
        </div>
      </div>

      {/* Dark semi-transparent mask */}
      <div className="absolute top-6 left-0 right-0 bottom-0 bg-foreground/60" />

      {/* Bottom Sheet */}
      <div className="absolute bottom-0 left-0 right-0 bg-card border-t-[3px] border-l-[3px] border-r-[3px] border-foreground shadow-[0_-4px_0_#111]" style={{ borderRadius:"20px 20px 0 0" }}>
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="bg-muted border border-muted-foreground/30" style={{ width:40, height:4, borderRadius:2 }} />
        </div>

        <div className="px-4 pb-2">
          {/* Title */}
          <div className="text-[13px] font-medium uppercase tracking-widest mb-1 pb-2 border-b-2 border-dashed border-muted">
            Choose Ingestion Method
          </div>
          <div className="text-[8px] text-muted-foreground mb-4">Select how you want to add a transaction</div>

          {/* 3 Neo-Brutalism buttons */}
          <div className="space-y-3 mb-4">
            {methods.map((m, i) => (
              <div
                key={i}
                className="border-2 border-foreground bg-card flex items-center gap-3 px-3 py-3 cursor-pointer shadow-[3px_3px_0_#111]"
                style={{ borderRadius:4 }}
              >
                <span className="text-[22px] flex-shrink-0 leading-none">{m.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-medium uppercase tracking-wider">{m.label}</div>
                  <div className="text-[9px] text-muted-foreground mt-0.5">{m.sub}</div>
                </div>
                <div className="border-2 border-foreground bg-foreground flex-shrink-0" style={{ width:8, height:8, borderRadius:2 }} />
              </div>
            ))}
          </div>

          {/* Cancel */}
          <div className="border-2 border-foreground py-2.5 text-center text-[10px] font-medium uppercase tracking-widest bg-secondary cursor-pointer mb-4" style={{ borderRadius:4 }}>
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 3 · Transaction History ──────────────────────────────────────────

function ScreenTransactions() {
  const [activeFilter, setActiveFilter] = useState("all");
  const groups = [
    { date:"Today — Jul 4", items:[
      { merchant:"Coffee House",  category:"Food & Drink", amount:"-RM 4.80"     },
      { merchant:"Salary",        category:"Income",       amount:"+RM 3,200.00" },
    ]},
    { date:"Yesterday — Jul 3", items:[
      { merchant:"Amazon",   category:"Shopping",  amount:"-RM 34.99" },
      { merchant:"Rapid KL", category:"Transport", amount:"-RM 2.50"  },
    ]},
    { date:"Jul 2", items:[
      { merchant:"Gym Membership", category:"Health",  amount:"-RM 29.00"  },
      { merchant:"Freelance Work", category:"Income",  amount:"+RM 420.00" },
    ]},
  ];
  return (
    <div className="flex flex-col h-full overflow-hidden bg-background font-mono relative">
      <StatusBar />
      <TopHeader title="Transactions" />
      <div className="flex-1 overflow-y-auto pb-20" style={{ scrollbarWidth:"none" }}>
        <div className="mx-4 mt-3">
          <div className="border-2 border-foreground flex items-center gap-2 px-3 py-2 bg-card">
            <Search size={12} strokeWidth={2.5} className="text-muted-foreground flex-shrink-0" />
            <span className="text-[11px] font-mono text-muted-foreground flex-1">Search transactions...</span>
            <X size={12} strokeWidth={2} className="text-muted-foreground/40" />
          </div>
        </div>
        <div className="flex gap-2 px-4 mt-2.5 flex-wrap">
          {["all","income","expense","date"].map(f => (
            <div key={f} onClick={() => setActiveFilter(f)}>
              <WireChip label={f} active={activeFilter===f} />
            </div>
          ))}
        </div>
        <div className="mx-4 mt-3 space-y-3">
          {groups.map((g, gi) => (
            <div key={gi}>
              <div className="text-[8px] uppercase tracking-widest text-muted-foreground border-b-2 border-dashed border-muted pb-1 mb-1.5">{g.date}</div>
              <WireBox>
                {g.items.map((item, ii) => (
                  <div key={ii} className={`flex items-center gap-2 px-3 py-2.5 ${ii<g.items.length-1?"border-b border-dashed border-muted":""}`}>
                    <div className="border-2 border-muted flex-shrink-0 flex items-center justify-center bg-secondary" style={{ width:26, height:26 }}>
                      <span className="text-[7px] text-muted-foreground">ICO</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-medium truncate">{item.merchant}</div>
                      <div className="text-[8px] text-muted-foreground uppercase tracking-wider">{item.category}</div>
                    </div>
                    <div className="text-[11px] font-medium flex-shrink-0">{item.amount}</div>
                    <div className="flex gap-1.5 ml-1">
                      <Pencil size={11} strokeWidth={2} className="text-muted-foreground" />
                      <Trash2 size={11} strokeWidth={2} className="text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </WireBox>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="transactions" />
    </div>
  );
}

// ─── Screen 4 · Add Transaction ───────────────────────────────────────────────

function ScreenAddTransaction() {
  const [type, setType] = useState<"income"|"expense">("expense");
  const categories = ["Food & Drink","Shopping","Transport","Health","Entertainment","Income","Other"];
  return (
    <div className="flex flex-col h-full overflow-hidden bg-background font-mono relative">
      <StatusBar />
      <TopHeader title="Add Transaction" showBack />
      <div className="flex-1 overflow-y-auto pb-20 px-4 pt-3" style={{ scrollbarWidth:"none" }}>
        <div className="border-2 border-foreground bg-card p-3 text-center mb-3 shadow-[3px_3px_0_#bbb]">
          <div className="text-[8px] uppercase tracking-widest text-muted-foreground mb-1.5">Amount (RM)</div>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-[20px] font-medium text-muted-foreground">RM</span>
            <span className="text-[34px] font-medium tracking-tight leading-none">0.00</span>
          </div>
          <div className="mt-1.5 border-t-2 border-dashed border-muted pt-1.5">
            <span className="text-[8px] text-muted-foreground">Tap to enter amount</span>
          </div>
        </div>
        <div className="mb-3">
          <div className="text-[8px] uppercase tracking-widest text-muted-foreground mb-1.5">Transaction Type</div>
          <div className="border-2 border-foreground grid grid-cols-2">
            <div className={`py-2.5 text-center text-[10px] font-medium uppercase tracking-widest cursor-pointer border-r-2 border-foreground ${type==="expense"?"bg-foreground text-primary-foreground":"bg-card text-muted-foreground"}`} onClick={() => setType("expense")}>Expense</div>
            <div className={`py-2.5 text-center text-[10px] font-medium uppercase tracking-widest cursor-pointer ${type==="income"?"bg-foreground text-primary-foreground":"bg-card text-muted-foreground"}`} onClick={() => setType("income")}>Income</div>
          </div>
        </div>
        <div className="mb-3">
          <div className="text-[8px] uppercase tracking-widest text-muted-foreground mb-1">Category</div>
          <div className="border-2 border-foreground px-3 py-2 bg-input-background flex items-center justify-between">
            <span className="text-[11px] font-mono text-muted-foreground">Select category...</span>
            <ChevronDown size={13} strokeWidth={2.5} className="text-muted-foreground" />
          </div>
          <div className="border-2 border-t-0 border-foreground bg-card">
            {categories.slice(0,3).map((cat, i) => (
              <div key={i} className={`px-3 py-1.5 text-[10px] font-mono ${i<2?"border-b border-dashed border-muted":""} text-muted-foreground`}>{cat}</div>
            ))}
            <div className="px-3 py-1 text-[9px] font-mono text-muted-foreground/50 italic border-t border-dashed border-muted">+ {categories.length-3} more...</div>
          </div>
        </div>
        <WireInput label="Merchant / Payee" placeholder="e.g. Tesco Extra" />
        <div className="mb-3">
          <div className="text-[8px] uppercase tracking-widest text-muted-foreground mb-1">Date</div>
          <div className="border-2 border-foreground px-3 py-2 bg-input-background flex items-center justify-between">
            <span className="text-[11px] font-mono text-muted-foreground">04 Jul 2026</span>
            <Calendar size={13} strokeWidth={2} className="text-muted-foreground" />
          </div>
        </div>
        <div className="mb-4">
          <div className="text-[8px] uppercase tracking-widest text-muted-foreground mb-1">Description (optional)</div>
          <div className="border-2 border-foreground px-3 py-2 bg-input-background" style={{ minHeight:48 }}>
            <span className="text-[10px] font-mono text-muted-foreground/50">Add a note...</span>
          </div>
        </div>
        <WireButton label="Save Transaction" variant="filled" />
      </div>
      <BottomNav active="home" />
    </div>
  );
}

// ─── Screen 5 · Image Upload (OCR) ───────────────────────────────────────────

function ScreenOCR() {
  const [confirmed, setConfirmed] = useState(false);
  const queue = [
    { label:"tesco_receipt.jpg", status:"done"       },
    { label:"grab_food.jpg",     status:"done"       },
    { label:"petrol_slip.png",   status:"processing" },
    { label:"receipt_04.jpg",    status:"pending"    },
    { label:"receipt_05.jpg",    status:"pending"    },
  ];
  return (
    <div className="flex flex-col h-full overflow-hidden bg-background font-mono relative">
      <StatusBar />
      <TopHeader title="Image Upload" showBack />
      <div className="flex-1 overflow-y-auto pb-20 px-4 pt-3" style={{ scrollbarWidth:"none" }}>
        <div className="text-[8px] uppercase tracking-widest text-muted-foreground mb-1.5">Upload Receipt / Screenshot</div>
        <div className="border-2 border-dashed border-foreground bg-secondary flex flex-col items-center justify-center gap-1.5 mb-3" style={{ height:96 }}>
          <FileText size={20} strokeWidth={1.5} className="text-muted-foreground" />
          <div className="text-[10px] font-medium">Tap to upload or capture</div>
          <div className="flex gap-2">
            <div className="border border-foreground px-2 py-0.5 text-[8px] font-mono bg-card cursor-pointer">Gallery</div>
            <div className="border border-foreground px-2 py-0.5 text-[8px] font-mono bg-card cursor-pointer">Camera</div>
          </div>
        </div>
        <div className="text-[8px] uppercase tracking-widest text-muted-foreground mb-1.5">
          Batch Import Queue <span className="normal-case">(5 images · 2 done)</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 mb-3" style={{ scrollbarWidth:"none" }}>
          {queue.map((q, i) => (
            <div key={i} className="flex-shrink-0 border-2 border-foreground bg-card flex flex-col items-center gap-1 px-1.5 py-1.5" style={{ width:68 }}>
              <WirePlaceholder className="w-10 h-10" />
              <div className="text-[7px] font-mono text-muted-foreground w-full text-center truncate">{q.label}</div>
              <div className={`text-[7px] uppercase tracking-wider border px-1 py-0.5 ${q.status==="done"?"border-foreground bg-foreground text-primary-foreground":q.status==="processing"?"border-foreground text-foreground":"border-muted text-muted-foreground"}`}>
                {q.status==="done"?"✓ Done":q.status==="processing"?"· · ·":"Queue"}
              </div>
            </div>
          ))}
        </div>
        <div className="border-2 border-foreground bg-card p-3 mb-3 shadow-[3px_3px_0_#bbb]">
          <div className="flex items-center gap-2 border-b-2 border-dashed border-muted pb-2 mb-2.5">
            <Zap size={11} strokeWidth={2.5} />
            <span className="text-[9px] font-medium uppercase tracking-widest">OCR Extraction — tesco_receipt.jpg</span>
          </div>
          {[
            { lbl:"Amount Detected",  val:"RM 34.80"           },
            { lbl:"Merchant Detected", val:"Tesco Extra Puchong" },
            { lbl:"Date Detected",    val:"04 Jul 2026"         },
          ].map((row, i) => (
            <div key={i} className="mb-2.5">
              <div className="text-[8px] uppercase tracking-wider text-muted-foreground mb-1">{row.lbl}</div>
              <div className="border-2 border-foreground px-3 py-2 bg-input-background flex items-center justify-between">
                <span className="text-[11px] font-mono">{row.val}</span>
                <div className="border border-muted px-1 py-0.5 text-[8px] text-muted-foreground cursor-pointer">EDIT</div>
              </div>
            </div>
          ))}
          <div className="mb-2.5">
            <div className="text-[8px] uppercase tracking-wider text-muted-foreground mb-1">Category (AI-Suggested)</div>
            <div className="border-2 border-foreground px-3 py-2 bg-input-background flex items-center justify-between">
              <span className="text-[11px] font-mono">Groceries</span>
              <ChevronDown size={12} strokeWidth={2.5} className="text-muted-foreground" />
            </div>
          </div>
          <div className="flex items-center gap-2 border border-dashed border-muted p-1.5">
            <div className="border border-foreground bg-secondary px-1.5 py-0.5 text-[8px] font-medium whitespace-nowrap">OCR: 94%</div>
            <div className="text-[8px] text-muted-foreground">High accuracy — review recommended</div>
          </div>
        </div>
        <div onClick={() => setConfirmed(!confirmed)}>
          <WireButton label={confirmed?"✓ Stored Successfully":"Confirm & Store"} variant={confirmed?"outline":"filled"} />
        </div>
      </div>
      <BottomNav active="home" />
    </div>
  );
}

// ─── Screen 5a · Live Camera View ────────────────────────────────────────────

function ScreenCamera() {
  return (
    <div className="flex flex-col h-full overflow-hidden font-mono relative" style={{ background:"#1a1a1a" }}>
      {/* Camera viewfinder — full screen */}
      <div className="absolute inset-0" style={{ background:"#222" }}>
        {/* X diagonal lines */}
        <svg className="w-full h-full" viewBox="0 0 360 750" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="0" x2="360" y2="750" stroke="#444" strokeWidth="2" />
          <line x1="360" y1="0" x2="0" y2="750" stroke="#444" strokeWidth="2" />
        </svg>
      </div>

      {/* Scan frame with corner brackets */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ paddingBottom:100 }}>
        <div className="relative" style={{ width:270, height:180 }}>
          {/* Dashed guide border */}
          <div className="absolute inset-0 border-2 border-dashed border-white/30" />
          {/* Corner accents — neo-brutalist thick marks */}
          {[
            "absolute top-0 left-0 border-t-[3px] border-l-[3px] border-white",
            "absolute top-0 right-0 border-t-[3px] border-r-[3px] border-white",
            "absolute bottom-0 left-0 border-b-[3px] border-l-[3px] border-white",
            "absolute bottom-0 right-0 border-b-[3px] border-r-[3px] border-white",
          ].map((cls, i) => (
            <div key={i} className={cls} style={{ width:20, height:20 }} />
          ))}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest text-center">
              [ Camera Viewfinder ]<br />Point at receipt
            </span>
          </div>
        </div>
      </div>

      {/* Top overlay bar */}
      <div className="absolute top-0 left-0 right-0 z-10" style={{ background:"rgba(0,0,0,0.7)" }}>
        {/* Status bar */}
        <div className="flex items-center justify-between px-4" style={{ height:24 }}>
          <span className="text-[10px] font-mono font-medium text-white">9:41</span>
          <div className="flex items-center gap-1.5 text-white">
            <div className="flex items-end gap-px">
              {[4,6,8,10].map((h,i) => <div key={i} className="bg-white" style={{ width:3, height:h, opacity:i<3?0.5:1 }} />)}
            </div>
            <Wifi size={10} strokeWidth={2.5} />
          </div>
        </div>
        {/* Close row */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="border-2 border-white flex items-center justify-center shadow-[2px_2px_0_#000]" style={{ width:30, height:30 }}>
              <X size={16} strokeWidth={2.5} color="white" />
            </div>
            <span className="text-[11px] font-mono text-white uppercase tracking-wider">Close</span>
          </div>
          <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider">Receipt Capture</span>
          <div className="border-2 border-white/50 flex items-center justify-center" style={{ width:30, height:30 }}>
            <Zap size={14} strokeWidth={2} color="rgba(255,255,255,0.7)" />
          </div>
        </div>
      </div>

      {/* Bottom control bar */}
      <div className="absolute bottom-0 left-0 right-0 border-t-[3px] border-foreground shadow-[0_-4px_0_#000]" style={{ background:"#111", height:100 }}>
        <div className="flex items-center justify-between px-8 h-full">
          {/* Gallery shortcut */}
          <div className="border-2 border-white/40 flex items-center justify-center cursor-pointer shadow-[2px_2px_0_#000]" style={{ width:40, height:40 }}>
            <FileText size={16} strokeWidth={2} color="rgba(255,255,255,0.6)" />
          </div>

          {/* Shutter button — solid white circle, hard black shadow */}
          <div className="flex items-center justify-center cursor-pointer rounded-full border-[4px] border-white bg-white shadow-[4px_4px_0_#000]" style={{ width:66, height:66 }}>
            <div className="border-2 border-foreground rounded-full" style={{ width:48, height:48 }} />
          </div>

          {/* Flip/switch icon */}
          <div className="border-2 border-white/40 flex items-center justify-center cursor-pointer shadow-[2px_2px_0_#000]" style={{ width:40, height:40 }}>
            <Camera size={16} strokeWidth={2} color="rgba(255,255,255,0.6)" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 6 · Budget Planning ───────────────────────────────────────────────

function ScreenBudget() {
  const budgets = [
    { category: "Groceries", used: 210, pct: 10.5, subtitle: "10.5% of total budget" },
    { category: "Transport", used: 85, pct: 4.25, subtitle: "4.3% of total budget" },
    { category: "Food & Drink", used: 600, pct: 30.0, subtitle: "30.0% of total budget" }
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background font-mono relative">
      <StatusBar />
      <TopHeader title="Budget Planning" />
      <div className="flex-1 overflow-y-auto pb-20 px-4 pt-3" style={{ scrollbarWidth: "none" }}>
        
        <div className="border-2 border-foreground bg-foreground p-3 mb-3 shadow-[4px_4px_0_#555]">
          <div className="text-[8px] uppercase tracking-widest text-primary-foreground/60 mb-2.5">Budget Summary — July 2026</div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {[
              { label: "Total Budget", val: "RM 2,000" },
              { label: "Savings Target", val: "RM 500" },
              { label: "Spent so far", val: "RM 895.00" },
              { label: "Remaining", val: "RM 1,105.00" },
            ].map((row, i) => (
              <div key={i} className="border-2 border-primary-foreground/20 p-2 bg-white/10">
                <div className="text-[7px] uppercase tracking-widest text-primary-foreground/50 mb-0.5">{row.label}</div>
                <div className="text-[12px] font-medium text-primary-foreground">{row.val}</div>
              </div>
            ))}
          </div>
          <div className="text-[8px] text-primary-foreground/60 mb-1">Overall budget used: 44.75%</div>
          <div className="border border-primary-foreground/30 bg-white/10 h-2.5">
            <div className="h-full bg-primary-foreground/60" style={{ width: "44.75%" }} />
          </div>
        </div>

        <div className="border-2 border-foreground bg-card mb-3">
          <div className="px-3 py-2 border-b-2 border-dashed border-muted">
            <span className="text-[9px] font-medium uppercase tracking-widest">Budget Usage — This Month</span>
          </div>
          {budgets.map((b, i) => (
            <div key={i} className={`px-3 py-2.5 ${i < budgets.length - 1 ? "border-b border-dashed border-muted" : ""}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-medium">{b.category}</span>
                <span className="text-[9px] text-muted-foreground">RM {b.used}.00 Spent</span>
              </div>
              <div className="border border-foreground bg-secondary h-2.5">
                <div className="h-full bg-foreground" style={{ width: `${Math.min(b.pct, 100)}%` }} />
              </div>
              <div className="flex items-center justify-between mt-0.5">
                <span className="text-[7px] text-muted-foreground">{b.subtitle}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="border-2 border-foreground bg-card p-3 mb-3">
          <div className="text-[9px] font-medium uppercase tracking-widest border-b border-dashed border-muted pb-2 mb-2.5">Manual Budget Setup</div>
          <WireInput label="Monthly Spending Limit (RM)" placeholder="e.g. 2,000.00" />
          <WireInput label="Monthly Savings Target (RM)" placeholder="e.g. 500.00" />
          <div className="mb-4">
            <div className="text-[8px] uppercase tracking-widest text-muted-foreground mb-1">Budget Period</div>
            <div className="border-2 border-foreground px-2 py-2 bg-input-background flex items-center justify-between">
              <span className="text-[10px] font-mono text-muted-foreground">Monthly</span>
              <ChevronDown size={12} strokeWidth={2.5} className="text-muted-foreground" />
            </div>
          </div>
          <WireButton label="SAVE" variant="filled" />
        </div>
        
        <div className="border-2 border-foreground p-3 mb-3 shadow-[3px_3px_0_#111] bg-card">
          <div className="flex items-start gap-2 mb-2.5 pb-2 border-b-2 border-dashed border-muted">
            <Zap size={12} strokeWidth={2.5} className="mt-0.5" />
            <div>
              <div className="text-[10px] font-medium uppercase tracking-wider">AI Auto-Recommendation</div>
              <div className="text-[8px] mt-0.5 text-muted-foreground">Based on 3-month spending average</div>
            </div>
          </div>
          {[
            { label: "Suggested Limit", val: "RM 1,850" },
            { label: "Savings Target", val: "RM 620" },
            { label: "Emergency Buffer", val: "RM 200" },
          ].map((row, i) => (
            <div key={i} className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] text-muted-foreground">{row.label}</span>
              <span className="text-[11px] font-medium">{row.val}</span>
            </div>
          ))}
          <div className="border-2 border-foreground bg-foreground text-primary-foreground py-2.5 px-4 text-center text-[10px] font-medium uppercase tracking-widest cursor-pointer mt-3 shadow-[2px_2px_0_#000]">
            Apply Recommendation
          </div>
        </div>

      </div>
      <BottomNav active="budget" />
    </div>
  );
}

// ─── Screen 7 · AI Insights ───────────────────────────────────────────────────

function ScreenAnalytics() {
  const [checked, setChecked] = useState([true,true,false,false,false]);
  return (
    <div className="flex flex-col h-full overflow-hidden bg-background font-mono relative">
      <StatusBar />
      <TopHeader title="AI Insights" />
      <div className="flex-1 overflow-y-auto pb-20 px-4 pt-3" style={{ scrollbarWidth:"none" }}>
        <div className="border-2 border-foreground bg-card p-3 mb-3 shadow-[3px_3px_0_#bbb]">
          <div className="flex items-center gap-2 border-b-2 border-dashed border-muted pb-2 mb-2.5">
            <div className="border-2 border-foreground bg-foreground text-primary-foreground flex items-center justify-center flex-shrink-0 text-[8px] font-bold" style={{ width:20, height:20 }}>01</div>
            <div>
              <div className="text-[10px] font-medium uppercase tracking-wider">Pattern Detection</div>
              <div className="text-[8px] text-muted-foreground">Habit Summary — 90 day window</div>
            </div>
          </div>
          {[
            { habit:"Coffee shops",  freq:"4× / week", trend:"↑ +12%"       },
            { habit:"Grocery runs",  freq:"2× / week", trend:"→ stable"      },
            { habit:"Subscriptions", freq:"11 active", trend:"↓ -1 this mo." },
          ].map((h, i) => (
            <div key={i} className="flex items-center justify-between px-2 py-1.5 border border-dashed border-muted bg-secondary mb-1 last:mb-0">
              <div>
                <div className="text-[10px] font-medium">{h.habit}</div>
                <div className="text-[8px] text-muted-foreground">{h.freq}</div>
              </div>
              <div className="text-[10px] font-medium">{h.trend}</div>
            </div>
          ))}
        </div>
        <div className="border-2 border-foreground bg-card p-3 mb-3 shadow-[3px_3px_0_#bbb]">
          <div className="flex items-center gap-2 border-b-2 border-dashed border-muted pb-2 mb-2.5">
            <div className="border-2 border-foreground bg-foreground text-primary-foreground flex items-center justify-center flex-shrink-0 text-[8px] font-bold" style={{ width:20, height:20 }}>02</div>
            <div>
              <div className="text-[10px] font-medium uppercase tracking-wider">Predictive Alert</div>
              <div className="text-[8px] text-muted-foreground">Month-end Forecast</div>
            </div>
          </div>
          <WirePlaceholder className="h-20 mb-1.5" label="[ Line Graph — Forecast vs. Budget ]" />
          <div className="flex justify-between px-0.5 mb-2">
            {["Jul 1","Jul 8","Jul 15","Jul 22","Jul 31"].map(d => <span key={d} className="text-[7px] text-muted-foreground">{d}</span>)}
          </div>
          <div className="flex items-center gap-2 border border-dashed border-muted p-1.5">
            <AlertTriangle size={12} strokeWidth={2.5} className="flex-shrink-0" />
            <div>
              <div className="text-[9px] font-medium">Projected overspend: +RM 230</div>
              <div className="text-[8px] text-muted-foreground">Budget exceeded by Jul 26 at current rate</div>
            </div>
          </div>
        </div>
        <div className="border-2 border-foreground bg-card p-3 mb-3 shadow-[3px_3px_0_#bbb]">
          <div className="flex items-center gap-2 border-b-2 border-dashed border-muted pb-2 mb-2.5">
            <div className="border-2 border-foreground bg-foreground text-primary-foreground flex items-center justify-center flex-shrink-0 text-[8px] font-bold" style={{ width:20, height:20 }}>03</div>
            <div>
              <div className="text-[10px] font-medium uppercase tracking-wider">Actionable Insights</div>
              <div className="text-[8px] text-muted-foreground">Budget · Savings · Checklist</div>
            </div>
          </div>
          <div className="mb-2.5">
            <div className="text-[8px] font-medium uppercase tracking-widest text-muted-foreground border-b border-dashed border-muted pb-1 mb-1.5">Budget Improvement Suggestions</div>
            {["Cut weekend dining by 20% → save RM 120/month","Cancel 1 unused subscription → save RM 35/month","Switch to monthly Grab Pass → save RM 28/month"].map((tip, i) => (
              <div key={i} className="flex items-start gap-1.5 mb-1">
                <span className="text-muted-foreground text-[9px] flex-shrink-0 mt-0.5">•</span>
                <span className="text-[9px] leading-tight">{tip}</span>
              </div>
            ))}
          </div>
          <div className="mb-2.5">
            <div className="text-[8px] font-medium uppercase tracking-widest text-muted-foreground border-b border-dashed border-muted pb-1 mb-1.5">Savings Recommendations</div>
            {["Auto-save RM 200 on payday (1st of month)","Round-up each transaction to nearest RM 5","Set a dining weekend cap of RM 80"].map((tip, i) => (
              <div key={i} className="flex items-start gap-1.5 mb-1">
                <span className="text-muted-foreground text-[9px] flex-shrink-0 mt-0.5">•</span>
                <span className="text-[9px] leading-tight">{tip}</span>
              </div>
            ))}
          </div>
          <div>
            <div className="text-[8px] font-medium uppercase tracking-widest text-muted-foreground border-b border-dashed border-muted pb-1 mb-1.5">Financial Improvement Checklist</div>
            {["Build 3-month emergency fund (target: RM 8,000)","Enable auto-save on payday","Review and cancel unused subscriptions","Reach monthly savings target of RM 500","Keep food spending below RM 600 this month"].map((item, i) => (
              <div key={i} className="flex items-start gap-2 py-1.5 border-b border-dashed border-muted last:border-0 cursor-pointer" onClick={() => setChecked(p => p.map((v,j) => j===i?!v:v))}>
                {checked[i]
                  ? <CheckSquare size={12} strokeWidth={2} className="flex-shrink-0 mt-0.5" />
                  : <Square size={12} strokeWidth={2} className="flex-shrink-0 mt-0.5 text-muted-foreground" />
                }
                <span className={`text-[9px] leading-tight ${checked[i]?"line-through text-muted-foreground":""}`}>{item}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-2">
            <div className="border border-foreground bg-secondary px-2 py-0.5 text-[8px] font-medium">
              {checked.filter(Boolean).length} / {checked.length} completed
            </div>
          </div>
        </div>
      </div>
      <BottomNav active="insights" />
    </div>
  );
}

// ─── Screen 8 · Notifications ─────────────────────────────────────────────────

function ScreenNotifications() {
  const alerts = [
    { unread:true,  title:"Budget Alert: Entertainment Limit", body:"You've spent RM 95 of your RM 80 limit.",     time:"2 min ago",  tag:"ALERT"  },
    { unread:true,  title:"OCR Scan Complete",        body:"3 receipts processed — 1 requires your verification.",      time:"18 min ago", tag:"OCR"    },
    { unread:true,  title:"AI Forecast: Overspending Risk",  body:"Current velocity indicates you will overspend by RM 230 this month.", time:"1 hr ago",   tag:"AI"     },
    { unread:false, title:"Auto-Captured via TNG eWallet",       body:"Successfully recorded: RM 34.90 spent at Starbucks.",                time:"Yesterday",  tag:"TXN"    },
    { unread:false, title:"Savings Goal Achieved! 🎉",      body:"Congratulations! You hit your July savings target of RM 600.", time:"Yesterday",  tag:"GOAL"   },
    { unread:false, title:"Recurring Expense Detected",     body:"Detected Adobe CC subscription charge of RM 54.99/mo.",           time:"Jul 3",      tag:"INFO"   },
    { unread:false, title:"Monthly Financial Insights Ready",       body:"Your comprehensive financial summary for June 2026 is ready.",  time:"Jul 1",      tag:"REPORT" },
  ];
  return (
    <div className="flex flex-col h-full overflow-hidden bg-background font-mono relative">
      <StatusBar />
      <TopHeader title="Notifications" />
      <div className="flex items-center justify-between px-4 py-1.5 border-b-2 border-dashed border-muted bg-secondary flex-shrink-0">
        <span className="text-[9px] font-medium">3 unread notifications</span>
        <span className="text-[8px] text-muted-foreground underline cursor-pointer">Mark all read</span>
      </div>
      <div className="flex-1 overflow-y-auto pb-20" style={{ scrollbarWidth:"none" }}>
        {alerts.map((a, i) => (
          <div key={i} className={`flex gap-2.5 px-3 py-2.5 border-b border-dashed border-muted ${a.unread?"bg-secondary":"bg-card"}`}>
            {/* Unread dot */}
            <div className="flex flex-col items-center pt-1 flex-shrink-0">
              <div className={`rounded-full ${a.unread?"bg-foreground":"bg-transparent border border-muted"}`} style={{ width:6, height:6 }} />
            </div>
            <div className="flex-1 min-w-0">
              {/* Title row with time on the right */}
              <div className="flex items-start justify-between gap-2 mb-0.5">
                <div className={`text-[10px] leading-tight flex-1 ${a.unread?"font-medium":"text-muted-foreground"}`}>{a.title}</div>
                <span className="text-[8px] text-muted-foreground/70 flex-shrink-0 whitespace-nowrap">{a.time}</span>
              </div>
              <div className="text-[9px] text-muted-foreground leading-tight mb-1.5 max-w-[90%]">{a.body}</div>
              {/* Tag only */}
              <div className="border border-foreground px-1 py-0.5 text-[7px] font-medium inline-block">{a.tag}</div>
            </div>
          </div>
        ))}
      </div>
      <BottomNav active="home" />
    </div>
  );
}

// ─── Screen 9 · Profile & Settings ───────────────────────────────────────────

function ScreenProfile() {
  const [notifIngestion, setNotifIngestion] = useState(true);
  const [currency, setCurrency] = useState("RM (MYR)");
  return (
    <div className="flex flex-col h-full overflow-hidden bg-background font-mono relative">
      <StatusBar />
      <TopHeader title="Profile & Settings" />
      <div className="flex-1 overflow-y-auto pb-20" style={{ scrollbarWidth:"none" }}>

        {/* Profile block */}
        <div className="flex flex-col items-center pt-5 pb-4 border-b-2 border-dashed border-muted bg-card">
          <div className="border-2 border-foreground relative overflow-hidden mb-3" style={{ width:60, height:60 }}>
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="hatch2" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#aaa" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hatch2)" />
            </svg>
            <div className="absolute inset-0 flex items-end justify-center pb-1">
              <User size={28} strokeWidth={1.5} className="text-muted-foreground" />
            </div>
            <div className="absolute bottom-0 right-0 border-t border-l border-foreground bg-secondary p-0.5 cursor-pointer">
              <Pencil size={8} strokeWidth={2} />
            </div>
          </div>
          <div className="text-[14px] font-medium tracking-tight">Jordan Kim</div>
          <div className="text-[10px] text-muted-foreground mb-3">jordan@example.com</div>
          <div className="border-2 border-foreground px-4 py-1.5 text-[10px] font-medium uppercase tracking-widest cursor-pointer bg-card">
            Edit Profile
          </div>
        </div>

        {/* Android Integration */}
        <div className="bg-secondary border-b border-t border-dashed border-muted px-4 py-1.5">
          <span className="text-[8px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Android Integration</span>
        </div>
        <div className="bg-card px-4 py-3 border-b-2 border-dashed border-muted">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="text-[11px] font-medium mb-1">Enable Android Notification Ingestion</div>
              <div className="text-[9px] text-muted-foreground leading-relaxed">
                Allows Ka-Ching! to securely scan incoming background payment and banking notification streams for automated, zero-touch transaction logging. Requires Notification Access Permission.
              </div>
            </div>
            <div
              className="border-2 border-foreground flex items-center px-1 py-0.5 cursor-pointer flex-shrink-0 mt-0.5"
              style={{ width:46, height:24 }}
              onClick={() => setNotifIngestion(!notifIngestion)}
            >
              <div className={`border-2 border-foreground flex-shrink-0 transition-all ${notifIngestion?"ml-auto bg-foreground":"bg-card"}`} style={{ width:16, height:16 }} />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-secondary border-b border-t border-dashed border-muted px-4 py-1.5">
          <span className="text-[8px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Preferences</span>
        </div>
        <div className="bg-card border-b-2 border-dashed border-muted">
          <div className="flex items-center justify-between px-4 py-3">
            <div>
              <div className="text-[11px] font-medium">Currency</div>
              <div className="text-[8px] text-muted-foreground">Display currency for all amounts</div>
            </div>
            <div className="border-2 border-foreground px-2 py-1 flex items-center gap-1 bg-input-background cursor-pointer" onClick={() => setCurrency(currency==="RM (MYR)"?"USD ($)":"RM (MYR)")}>
              <span className="text-[10px] font-medium">{currency}</span>
              <ChevronDown size={11} strokeWidth={2.5} className="text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* More */}
        <div className="bg-secondary border-b border-t border-dashed border-muted px-4 py-1.5">
          <span className="text-[8px] font-medium uppercase tracking-[0.2em] text-muted-foreground">More</span>
        </div>
        <div className="bg-card">
          {["Export Data (CSV / JSON)","Privacy Policy","Help & Support"].map((label, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3 border-b border-dashed border-muted cursor-pointer">
              <span className="text-[11px]">{label}</span>
              <ChevronRight size={13} strokeWidth={2} />
            </div>
          ))}
          <div className="flex items-center justify-between px-4 py-3 cursor-pointer">
            <span className="text-[11px] text-muted-foreground">Sign Out</span>
            <LogOut size={13} strokeWidth={2} className="text-muted-foreground" />
          </div>
        </div>
      </div>
      <BottomNav active="home" />
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen bg-[#e0e0e0] font-mono py-12 px-8" style={{ fontFamily:"'DM Mono', monospace" }}>

      {/* Page header */}
      <div className="max-w-[1700px] mx-auto mb-10">
        <div className="border-b-2 border-foreground pb-4 flex items-end justify-between">
          <div>
            <h1 className="text-[26px] font-medium tracking-tight leading-none">Ka-Ching! <span className="text-muted-foreground font-normal">— Mobile App</span></h1>
          </div>
          <div className="text-right">
            <div className="text-[9px] font-mono text-muted-foreground">Android Compact · 360 × 720 dp</div>
          </div>
        </div>
      </div>

      {/* Row 1: Screens 1, 2, Modal, 3 */}
      <div className="max-w-[1700px] mx-auto mb-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 justify-items-center">
          <PhoneFrame label="Screen 1 — Login / Register"       screen={<ScreenLogin />}         />
          <PhoneFrame label="Screen 2 — Dashboard (Home)"       screen={<ScreenDashboard />}     />
          <PhoneFrame label="Modal — Choose Ingestion Method"   screen={<ScreenBottomSheet />}   />
          <PhoneFrame label="Screen 3 — Transaction History"    screen={<ScreenTransactions />}  />
        </div>
      </div>

      {/* Row 2: Screens 4, 5, 5a, 6 */}
      <div className="max-w-[1700px] mx-auto mb-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 justify-items-center">
          <PhoneFrame label="Screen 4 — Add Transaction"        screen={<ScreenAddTransaction />} />
          <PhoneFrame label="Screen 5 — Image Upload (OCR)"    screen={<ScreenOCR />}            />
          <PhoneFrame label="Screen 5a — Live Camera Capture"  screen={<ScreenCamera />}         />
          <PhoneFrame label="Screen 6 — Budget Planning"       screen={<ScreenBudget />}         />
        </div>
      </div>

      {/* Row 3: Screens 7, 8, 9 */}
      <div className="max-w-[1700px] mx-auto mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 justify-items-center">
          <PhoneFrame label="Screen 7 — AI Insights"            screen={<ScreenAnalytics />}      />
          <PhoneFrame label="Screen 8 — Notification Center"    screen={<ScreenNotifications />}  />
          <PhoneFrame label="Screen 9 — Profile & Settings"     screen={<ScreenProfile />}        />
        </div>
      </div>

    </div>
  );
}
