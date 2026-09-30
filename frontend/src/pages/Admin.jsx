import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { BarChart3, Download, FolderKanban, LayoutDashboard, Loader2, LogOut, Users } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const API = process.env.REACT_APP_BACKEND_URL;
const STATUSES = ["new", "contacted", "qualified", "enrolled", "lost"];

function api(path, opts = {}) {
  return fetch(`${API}${path}`, { credentials: "include", ...opts }).then(async (r) => {
    if (r.status === 401) throw Object.assign(new Error("auth"), { auth: true });
    if (!r.ok) throw new Error(`http_${r.status}`);
    const ct = r.headers.get("content-type") || "";
    return ct.includes("json") ? r.json() : r;
  });
}

const jsonField = (v) => (v == null ? "" : typeof v === "string" ? v : JSON.stringify(v, null, 1));
const pick = (o, lang) => (o && typeof o === "object" ? o.en || o.mr || "" : o || "");

function Login({ onOk }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const r = await fetch(`${API}/api/admin/login`, {
        method: "POST", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!r.ok) throw new Error();
      onOk();
    } catch {
      toast.error("Invalid credentials");
    } finally { setBusy(false); }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy px-4" data-testid="admin-login">
      <form onSubmit={submit} className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/5 p-8">
        <h1 className="font-display text-2xl font-semibold text-white">Admin Login</h1>
        <p className="mt-1 text-xs text-white/50">AI Career Master — internal use only</p>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="Email" data-testid="admin-login-email"
          className="mt-6 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none focus:border-gold" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required placeholder="Password" data-testid="admin-login-password"
          className="mt-3 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none focus:border-gold" />
        <button disabled={busy} data-testid="admin-login-submit" className="btn-primary mt-5 w-full justify-center disabled:opacity-60">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
        </button>
      </form>
    </div>
  );
}

function Stat({ label, value, tone = "" }) {
  return (
    <div className={`rounded-2xl border p-5 ${tone || "border-border bg-white"}`} data-testid={`admin-stat-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold text-navy">{value}</p>
    </div>
  );
}

function Overview() {
  const [stats, setStats] = useState(null);
  useEffect(() => { api("/api/admin/stats").then(setStats).catch(() => toast.error("Could not load stats")); }, []);
  if (!stats) return <div className="p-10 text-center text-sm text-muted-foreground"><Loader2 className="mx-auto h-6 w-6 animate-spin" /></div>;
  const maxDay = Math.max(1, ...stats.last14days.map((d) => d.count));
  return (
    <div className="space-y-8" data-testid="admin-overview">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        <Stat label="Total Leads" value={stats.total} />
        {STATUSES.map((s) => <Stat key={s} label={s[0].toUpperCase() + s.slice(1)} value={stats.by_status[s]} />)}
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-white p-6">
          <h3 className="text-sm font-bold text-navy">Leads by Program</h3>
          {stats.by_program.length === 0 && <p className="mt-3 text-xs text-muted-foreground">No data yet</p>}
          <ul className="mt-4 space-y-2">
            {stats.by_program.map((r) => (
              <li key={r.program} className="flex items-center justify-between text-xs">
                <span className="font-semibold text-navy/80">{r.program}</span><span className="font-bold text-royal">{r.count}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-white p-6">
          <h3 className="text-sm font-bold text-navy">Leads by Source</h3>
          {stats.by_source.length === 0 && <p className="mt-3 text-xs text-muted-foreground">No data yet</p>}
          <ul className="mt-4 space-y-2">
            {stats.by_source.map((r) => (
              <li key={r.source} className="flex items-center justify-between text-xs">
                <span className="font-semibold text-navy/80">{r.source}</span><span className="font-bold text-royal">{r.count}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-white p-6">
          <h3 className="text-sm font-bold text-navy">Campaigns & Integrations</h3>
          <ul className="mt-4 space-y-2 text-xs">
            {stats.by_campaign.map((r) => (
              <li key={r.campaign} className="flex items-center justify-between">
                <span className="font-semibold text-navy/80">{r.campaign}</span><span className="font-bold text-royal">{r.count}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-2 border-t border-border pt-4 text-xs" data-testid="admin-integration-status">
            <p className="flex justify-between"><span className="text-navy/70">Google Forms</span>
              <span className={`font-bold ${stats.integrations.google_forms_configured ? "text-green-600" : "text-amber-600"}`}>
                {stats.integrations.google_forms_configured ? "Configured" : "Not configured"}
              </span></p>
            <p className="flex justify-between"><span className="text-navy/70">Coacheasily CRM</span>
              <span className="font-bold text-amber-600">Not configured</span></p>
            <p className="flex justify-between"><span className="text-navy/70">Pending syncs</span><span className="font-bold text-navy">{stats.integrations.pending_sync}</span></p>
            <p className="flex justify-between"><span className="text-navy/70">Failed syncs</span><span className={`font-bold ${stats.integrations.failed ? "text-red-600" : "text-navy"}`}>{stats.integrations.failed}</span></p>
          </div>
        </div>
      </div>
      <div className="rounded-2xl border border-border bg-white p-6">
        <h3 className="text-sm font-bold text-navy">Last 14 Days</h3>
        <div className="mt-4 flex h-28 items-end gap-1.5" data-testid="admin-last14">
          {stats.last14days.map((d) => (
            <div key={d.date} className="flex flex-1 flex-col items-center gap-1">
              <div className="w-full rounded-t bg-royal/80" style={{ height: `${(d.count / maxDay) * 90}px` }} title={`${d.date}: ${d.count}`} />
              <span className="text-[8px] text-muted-foreground">{d.date.slice(8)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Leads() {
  const [leads, setLeads] = useState(null);
  const [status, setStatus] = useState("");
  const load = (s = status) => api(`/api/admin/leads?limit=100${s ? `&status=${s}` : ""}`).then((d) => setLeads(d)).catch(() => toast.error("Could not load leads"));
  useEffect(() => { load(); }, [status]);
  const update = async (id, s) => {
    try {
      await api(`/api/admin/leads/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: s }) });
      toast.success("Status updated");
      load();
    } catch { toast.error("Update failed"); }
  };
  return (
    <div className="space-y-4" data-testid="admin-leads">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <select value={status} onChange={(e) => setStatus(e.target.value)} data-testid="admin-leads-filter"
          className="rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold text-navy">
          <option value="">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <a href={`${API}/api/admin/leads/export`} data-testid="admin-export-csv"
          className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-xs font-bold text-white hover:bg-navy-2">
          <Download className="h-4 w-4" /> Export CSV
        </a>
      </div>
      {!leads && <div className="p-10 text-center"><Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground" /></div>}
      {leads && (
        <div className="overflow-x-auto rounded-2xl border border-border bg-white">
          <table className="w-full min-w-[900px] text-left text-xs" data-testid="admin-leads-table">
            <thead className="bg-cream text-[10px] uppercase tracking-wider text-muted-foreground">
              <tr>{["Date", "Name", "Phone", "Email", "Type", "Program", "Source", "Integration", "Status"].map((h) => (
                <th key={h} className="px-4 py-3 font-bold">{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {leads.leads.map((l) => (
                <tr key={l.id} className="border-t border-border" data-testid={`admin-lead-row-${l.id}`}>
                  <td className="px-4 py-3 text-muted-foreground">{(l.created_at || "").slice(0, 10)}</td>
                  <td className="px-4 py-3 font-bold text-navy">{l.name}</td>
                  <td className="px-4 py-3">{(l.phone_country_code || "+91")} {l.phone}</td>
                  <td className="px-4 py-3 text-muted-foreground">{l.email || "—"}</td>
                  <td className="px-4 py-3">{l.lead_type}</td>
                  <td className="px-4 py-3">{l.program || "—"}</td>
                  <td className="px-4 py-3">{(l.utm && l.utm.source) || "Direct"}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${l.google_submitted ? "bg-green-100 text-green-700" : l.google_result === "not_configured" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>
                      G: {l.google_submitted ? "ok" : l.google_result || "?"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <select value={l.status || "new"} onChange={(e) => update(l.id, e.target.value)} data-testid={`admin-lead-status-${l.id}`}
                      className="rounded-lg border border-border px-2 py-1 text-[11px] font-semibold">
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
              {leads.leads.length === 0 && <tr><td colSpan={9} className="px-4 py-8 text-center text-muted-foreground">No leads yet</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Programs() {
  const [programs, setPrograms] = useState(null);
  const [editing, setEditing] = useState(null);
  const load = () => api("/api/admin/programs").then((d) => setPrograms(d.programs)).catch(() => toast.error("Could not load programs"));
  useEffect(() => { load(); }, []);

  const save = async (p, isNew) => {
    const payload = JSON.parse(JSON.stringify(p));
    ["highlights", "outcomes", "modules", "roadmap", "methodology", "tracking", "college_value", "careers"].forEach((k) => {
      if (typeof payload[k] === "string") { try { payload[k] = JSON.parse(payload[k] || "[]"); } catch { payload[k] = []; } }
    });
    try {
      await api(`/api/admin/programs${isNew ? "" : "/" + p.slug}`, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      toast.success(isNew ? "Program created" : "Program saved");
      setEditing(null);
      load();
    } catch (e) { toast.error(e.message === "409" ? "Slug already exists" : "Save failed"); }
  };

  if (!programs) return <div className="p-10 text-center"><Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="space-y-4" data-testid="admin-programs">
      <div className="flex justify-end">
        <button onClick={() => setEditing({ slug: "", name: { en: "", mr: "" }, tag: { en: "", mr: "" }, summary: { en: "", mr: "" }, audience: [], icon: "Sparkles", accent: "royal", status: "draft", display_order: 99 })} data-testid="admin-program-add"
          className="inline-flex items-center gap-2 rounded-full bg-orange px-5 py-2.5 text-xs font-bold text-white hover:bg-orange-deep">
          Add Program
        </button>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-border bg-white">
        <table className="w-full min-w-[760px] text-left text-xs">
          <thead className="bg-cream text-[10px] uppercase tracking-wider text-muted-foreground">
            <tr>{["Order", "Slug", "Name (EN)", "Duration (EN)", "Audience", "Status", "Actions"].map((h) => <th key={h} className="px-4 py-3 font-bold">{h}</th>)}</tr>
          </thead>
          <tbody>
            {programs.map((p) => (
              <tr key={p.slug} className="border-t border-border" data-testid={`admin-program-row-${p.slug}`}>
                <td className="px-4 py-3">{p.display_order}</td>
                <td className="px-4 py-3 font-mono text-[11px]">{p.slug}</td>
                <td className="px-4 py-3 font-bold text-navy">{pick(p.name, "en")}</td>
                <td className="px-4 py-3">{pick(p.duration, "en")}</td>
                <td className="px-4 py-3">{(p.audience || []).join(", ")}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${p.status === "published" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{p.status}</span>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => setEditing(JSON.parse(JSON.stringify(p)))} data-testid={`admin-program-edit-${p.slug}`} className="font-bold text-royal hover:underline">Edit</button>
                  {p.status === "draft" && (
                    <button onClick={() => save({ ...p, status: "published" }, false)} data-testid={`admin-program-publish-${p.slug}`} className="ml-3 font-bold text-green-600 hover:underline">Publish</button>
                  )}
                  {p.status === "published" && (
                    <button onClick={() => save({ ...p, status: "draft" }, false)} data-testid={`admin-program-unpublish-${p.slug}`} className="ml-3 font-bold text-amber-600 hover:underline">Unpublish</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-navy/60 p-4 py-10" data-testid="admin-program-editor">
          <div className="w-full max-w-3xl rounded-3xl bg-white p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-semibold text-navy">{editing.slug ? `Edit — ${editing.slug}` : "Add Program"}</h3>
              <button onClick={() => setEditing(null)} data-testid="admin-program-editor-close" className="text-sm font-bold text-muted-foreground hover:text-navy">Close</button>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <input placeholder="slug (e.g. new-program)" value={editing.slug} disabled={!!editing.created_at} onChange={(e) => setEditing({ ...editing, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") })} data-testid="admin-field-slug" className="rounded-xl border border-border px-4 py-2.5 text-sm" />
              <input placeholder="Icon (lucide: Rocket, Zap…)" value={editing.icon} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} className="rounded-xl border border-border px-4 py-2.5 text-sm" />
              {["name", "tag", "summary"].map((f) => (
                <div key={f} className="contents">
                  <input placeholder={`${f} (English)`} value={(editing[f] || {}).en || ""} onChange={(e) => setEditing({ ...editing, [f]: { ...editing[f], en: e.target.value } })} data-testid={`admin-field-${f}-en`} className="rounded-xl border border-border px-4 py-2.5 text-sm" />
                  <input placeholder={`${f} (Marathi)`} value={(editing[f] || {}).mr || ""} onChange={(e) => setEditing({ ...editing, [f]: { ...editing[f], mr: e.target.value } })} data-testid={`admin-field-${f}-mr`} className="rounded-xl border border-border px-4 py-2.5 text-sm" />
                </div>
              ))}
              {["duration", "format", "level", "eligibility"].map((f) => (
                <div key={f} className="contents">
                  <input placeholder={`${f} (English)`} value={((editing[f] || {}) || {}).en || ""} onChange={(e) => setEditing({ ...editing, [f]: { ...(editing[f] || {}), en: e.target.value } })} data-testid={`admin-field-${f}-en`} className="rounded-xl border border-border px-4 py-2.5 text-sm" />
                  <input placeholder={`${f} (Marathi)`} value={((editing[f] || {}) || {}).mr || ""} onChange={(e) => setEditing({ ...editing, [f]: { ...(editing[f] || {}), mr: e.target.value } })} data-testid={`admin-field-${f}-mr`} className="rounded-xl border border-border px-4 py-2.5 text-sm" />
                </div>
              ))}
              <input placeholder="Price (₹, optional — leave empty)" type="number" value={editing.price ?? ""} onChange={(e) => setEditing({ ...editing, price: e.target.value === "" ? null : Number(e.target.value) })} data-testid="admin-field-price" className="rounded-xl border border-border px-4 py-2.5 text-sm" />
              <input placeholder="Offer price (₹, optional)" type="number" value={editing.offer_price ?? ""} onChange={(e) => setEditing({ ...editing, offer_price: e.target.value === "" ? null : Number(e.target.value) })} data-testid="admin-field-offer-price" className="rounded-xl border border-border px-4 py-2.5 text-sm" />
              <input placeholder="Brochure/image URL" value={editing.brochure_url || ""} onChange={(e) => setEditing({ ...editing, brochure_url: e.target.value })} data-testid="admin-field-brochure" className="rounded-xl border border-border px-4 py-2.5 text-sm sm:col-span-2" />
              <input placeholder="Display order" type="number" value={editing.display_order ?? 0} onChange={(e) => setEditing({ ...editing, display_order: Number(e.target.value) })} className="rounded-xl border border-border px-4 py-2.5 text-sm" />
              <div className="flex items-center gap-4 text-xs font-semibold text-navy">
                <label className="flex items-center gap-2"><input type="checkbox" checked={!!editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} /> Featured</label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={editing.status === "published"} onChange={(e) => setEditing({ ...editing, status: e.target.checked ? "published" : "draft" })} /> Published</label>
              </div>
              <div className="sm:col-span-2">
                <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Audience</p>
                <div className="flex flex-wrap gap-3 text-xs font-semibold text-navy">
                  {["students", "graduates", "professionals", "teachers", "business", "parents", "colleges"].map((a) => (
                    <label key={a} className="flex items-center gap-1.5">
                      <input type="checkbox" checked={(editing.audience || []).includes(a)}
                        onChange={(e) => setEditing({ ...editing, audience: e.target.checked ? [...(editing.audience || []), a] : (editing.audience || []).filter((x) => x !== a) })} />
                      {a}
                    </label>
                  ))}
                </div>
              </div>
              {["highlights", "outcomes", "modules", "roadmap", "careers", "methodology", "tracking", "college_value"].map((k) => (
                <div key={k} className="sm:col-span-2">
                  <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{k} (JSON, bilingual {`[{en, mr}]`})</label>
                  <textarea rows={k === "roadmap" ? 6 : 3} value={jsonField(editing[k])} data-testid={`admin-field-${k}`}
                    onChange={(e) => setEditing({ ...editing, [k]: e.target.value })} className="w-full rounded-xl border border-border px-3 py-2 font-mono text-[11px]" />
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={() => save(editing, !editing.created_at)} data-testid="admin-program-save" className="btn-primary flex-1 justify-center">Save Program</button>
              <button onClick={() => setEditing(null)} className="btn-ghost-gold flex-1 justify-center !text-navy !border-navy/30">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Admin() {
  const { t } = useLang();
  const [authed, setAuthed] = useState(null);
  const [tab, setTab] = useState("overview");
  useEffect(() => {
    api("/api/admin/me").then(() => setAuthed(true)).catch(() => setAuthed(false));
  }, []);
  const logout = async () => { await fetch(`${API}/api/admin/logout`, { method: "POST", credentials: "include" }); setAuthed(false); };

  return (
    <div className="min-h-screen bg-cream">
      <Helmet><title>Admin | AI Career Master</title><meta name="robots" content="noindex, nofollow" /></Helmet>
      {authed === null && <div className="flex min-h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-royal" /></div>}
      {authed === false && <Login onOk={() => setAuthed(true)} />}
      {authed === true && (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8" data-testid="admin-dashboard">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="font-display text-2xl font-semibold text-navy">Admin Console</h1>
            <button onClick={logout} data-testid="admin-logout" className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-xs font-bold text-navy hover:border-red-300 hover:text-red-600">
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
          <div className="mt-6 flex gap-2">
            {[["overview", "Overview", LayoutDashboard], ["leads", "Leads", Users], ["programs", "Programs", FolderKanban]].map(([k, label, Icon]) => (
              <button key={k} onClick={() => setTab(k)} data-testid={`admin-tab-${k}`}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition-colors ${tab === k ? "bg-navy text-white" : "border border-border bg-white text-navy/60"}`}>
                <Icon className="h-4 w-4" /> {label}
              </button>
            ))}
          </div>
          <div className="mt-8">
            {tab === "overview" && <Overview />}
            {tab === "leads" && <Leads />}
            {tab === "programs" && <Programs />}
          </div>
        </div>
      )}
    </div>
  );
}
