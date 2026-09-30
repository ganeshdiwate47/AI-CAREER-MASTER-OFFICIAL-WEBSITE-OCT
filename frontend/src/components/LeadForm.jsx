import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import { CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { PROGRAMS } from "@/data/programs";
import { CONTACT } from "@/data/site";

// Reusable lead form. variant: "student" | "college" | "strategy"
// Leads POST to the site backend (/api/leads), which stores them and —
// when configured by the owner via env vars — relays to Google Forms / CRM.
export default function LeadForm({ variant = "student", defaultProgram = "", dark = false, testId }) {
  const { t, L, lang } = useLang();
  const location = useLocation();
  const [form, setForm] = useState({
    name: "", phone: "", email: "", program: defaultProgram || "",
    org: "", role: "", interest: "", status: "", message: "", consent: false,
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | done | error

  const utm = useMemo(() => {
    const p = new URLSearchParams(location.search);
    return {
      source: p.get("utm_source") || "", medium: p.get("utm_medium") || "",
      campaign: p.get("utm_campaign") || "", term: p.get("utm_term") || "",
      content: p.get("utm_content") || "", referrer: document.referrer || "",
    };
  }, [location.search]);

  const set = (k) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (!form.name || form.name.trim().length < 2) er.name = t("forms.shared.errRequired");
    const digits = form.phone.replace(/\D/g, "").slice(-10);
    if (!form.phone) er.phone = t("forms.shared.errRequired");
    else if (!/^[6-9]\d{9}$/.test(digits)) er.phone = t("forms.shared.errPhone");
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) er.email = t("forms.shared.errEmail");
    if (variant === "college" && !form.org.trim()) er.org = t("forms.shared.errRequired");
    if (variant !== "student" && !form.email.trim()) er.email = t("forms.shared.errRequired");
    if (!form.consent) er.consent = t("forms.shared.errConsent");
    return er;
  };

  const submit = async (e) => {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) return;
    setStatus("sending");
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead_type: variant, ...form, phone_country_code: "+91",
          lang, page: location.pathname, utm,
        }),
      });
      if (!res.ok) throw new Error("submit failed");
      setStatus("done");
      toast.success(t("forms.shared.successTitle"));
    } catch {
      setStatus("error");
      toast.error(t("forms.shared.errGeneric"));
    }
  };

  const inputCls = (bad) =>
    `w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors duration-200 placeholder:text-current/40 ${
      dark
        ? `border-white/20 bg-white/10 text-white focus:border-gold ${bad ? "border-red-400" : ""}`
        : `border-input bg-white text-navy focus:border-royal ${bad ? "border-red-400" : ""}`
    }`;
  const labelCls = `mb-1.5 block text-xs font-bold uppercase tracking-wider ${dark ? "text-white/70" : "text-navy/70"}`;
  const errCls = "mt-1 text-xs font-semibold text-red-400";
  const idp = (f) => `${variant}-${f}`;

  if (status === "done") {
    return (
      <div className={`rounded-2xl p-8 text-center ${dark ? "border border-gold/40 bg-white/5" : "border border-gold/50 bg-white"}`} data-testid={`${testId || "lead-form"}-success`}>
        <CheckCircle2 className="mx-auto h-14 w-14 text-gold" />
        <h3 className={`mt-4 font-display text-2xl font-semibold ${dark ? "text-white" : "text-navy"}`}>{t("forms.shared.successTitle")}</h3>
        <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-white/70" : "text-muted-foreground"}`}>{t("forms.shared.successBody")}</p>
        <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="btn-primary mt-6" data-testid="success-whatsapp-btn">
          <MessageCircle className="h-4 w-4" /> {t("sections.cta.whatsapp")}
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      data-testid={testId || `lead-form-${variant}`}
      className="space-y-4"
    >
      <input type="hidden" name="lead_type" value={variant} />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={idp("name")} className={labelCls}>{t("forms.shared.name")} *</label>
          <input id={idp("name")} data-testid={`lead-input-${variant}-name`} className={inputCls(!!errors.name)} placeholder={t("forms.shared.namePh")} value={form.name} onChange={set("name")} autoComplete="name" />
          {errors.name && <p className={errCls} role="alert">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor={idp("phone")} className={labelCls}>{t("forms.shared.phone")} *</label>
          <input id={idp("phone")} data-testid={`lead-input-${variant}-phone`} className={inputCls(!!errors.phone)} placeholder={t("forms.shared.phonePh")} inputMode="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" />
          {errors.phone && <p className={errCls} role="alert">{errors.phone}</p>}
        </div>
      </div>

      {variant === "college" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={idp("org")} className={labelCls}>{t("forms.college.org")} *</label>
            <input id={idp("org")} data-testid={`lead-input-${variant}-org`} className={inputCls(!!errors.org)} placeholder={t("forms.college.orgPh")} value={form.org} onChange={set("org")} />
            {errors.org && <p className={errCls} role="alert">{errors.org}</p>}
          </div>
          <div>
            <label htmlFor={idp("role")} className={labelCls}>{t("forms.college.role")}</label>
            <input id={idp("role")} data-testid={`lead-input-${variant}-role`} className={inputCls()} placeholder={t("forms.college.rolePh")} value={form.role} onChange={set("role")} />
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={idp("email")} className={labelCls}>{variant === "student" ? t("forms.shared.emailOpt") : `${t("forms.shared.email")} *`}</label>
          <input id={idp("email")} type="email" data-testid={`lead-input-${variant}-email`} className={inputCls(!!errors.email)} placeholder={t("forms.shared.emailPh")} value={form.email} onChange={set("email")} autoComplete="email" />
          {errors.email && <p className={errCls} role="alert">{errors.email}</p>}
        </div>
        {variant === "student" && (
          <div>
            <label htmlFor={idp("program")} className={labelCls}>{t("forms.shared.program")}</label>
            <select id={idp("program")} data-testid={`lead-select-${variant}-program`} className={inputCls()} value={form.program} onChange={set("program")}>
              <option value="">{t("forms.shared.programAny")}</option>
              {PROGRAMS.map((p) => (
                <option key={p.slug} value={p.slug}>{L(p.name)} — {L(p.tag)}</option>
              ))}
            </select>
          </div>
        )}
        {variant === "college" && (
          <div>
            <label htmlFor={idp("interest")} className={labelCls}>{t("forms.college.interest")}</label>
            <select id={idp("interest")} data-testid={`lead-select-${variant}-interest`} className={inputCls()} value={form.interest} onChange={set("interest")}>
              <option value="">{t("forms.shared.programAny")}</option>
              {["MoU / Long-term Partnership", "AI Workshop for Students", "Faculty Development Program", "Campus Placement Drive", "AI Innovation Lab"].map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
        )}
        {variant === "strategy" && (
          <div>
            <label htmlFor={idp("status")} className={labelCls}>{t("forms.strategy.status")}</label>
            <select id={idp("status")} data-testid={`lead-select-${variant}-status`} className={inputCls()} value={form.status} onChange={set("status")}>
              <option value="">{t("forms.shared.programAny")}</option>
              {["Final-Year Student", "Fresh Graduate", "Working Professional", "Teacher / Educator", "Business Owner", "Parent"].map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div>
        <label htmlFor={idp("message")} className={labelCls}>{t("forms.shared.messageOpt")}</label>
        <textarea id={idp("message")} rows={3} data-testid={`lead-input-${variant}-message`} className={inputCls()} placeholder={t("forms.shared.messagePh")} value={form.message} onChange={set("message")} />
      </div>

      <label className={`flex items-start gap-3 text-xs leading-relaxed ${dark ? "text-white/70" : "text-muted-foreground"}`} data-testid={`lead-consent-${variant}`}>
        <input type="checkbox" checked={form.consent} onChange={set("consent")} className="mt-0.5 h-4 w-4 shrink-0 accent-orange" data-testid={`lead-consent-checkbox-${variant}`} />
        <span>
          {t("forms.shared.consent")}{" "}
          <a href="/privacy" className={`underline ${dark ? "text-gold" : "text-royal"}`}>{t("pages.privacy.title")}</a>
        </span>
      </label>
      {errors.consent && <p className={errCls} role="alert">{errors.consent}</p>}

      <button type="submit" disabled={status === "sending"} data-testid="lead-form-submit" className="btn-primary w-full disabled:opacity-60">
        {status === "sending" ? (<><Loader2 className="h-4 w-4 animate-spin" />{t("forms.shared.submitting")}</>) : t("forms.shared.submit")}
      </button>
      {status === "error" && <p className="text-center text-xs font-semibold text-red-400" role="alert">{t("forms.shared.errGeneric")}</p>}
      <p className={`text-center text-[11px] ${dark ? "text-white/50" : "text-muted-foreground"}`}>{t("sections.cta.secure")}</p>
    </form>
  );
}
