import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, Sparkles, X } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const MODELS = ["claude", "chatgpt", "gemini"];
const API = process.env.REACT_APP_BACKEND_URL;

function sessionId() {
  try {
    if (!sessionStorage.getItem("acm-ai-session")) {
      sessionStorage.setItem("acm-ai-session", (crypto.randomUUID ? crypto.randomUUID() : String(Math.random()).slice(2) + Date.now()));
    }
    return sessionStorage.getItem("acm-ai-session");
  } catch {
    return "anon-" + Date.now();
  }
}

export default function AiAssistant() {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(false);
  const [provider, setProvider] = useState("claude");
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: t("ai.greeting") },
  ]);
  const scrollRef = useRef(null);
  const sessionRef = useRef(sessionId());

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

  const patchLast = (delta) =>
    setMessages((prev) => {
      const next = [...prev];
      const last = next[next.length - 1];
      if (last && last.role === "assistant" && last.streaming) {
        next[next.length - 1] = { ...last, content: last.content + delta };
      }
      return next;
    });

  const send = async (raw) => {
    const text = (raw ?? input).trim();
    if (!text || busy) return;
    setInput("");
    setErr(false);
    setBusy(true);
    setMessages((prev) => [
      ...prev,
      { role: "user", content: text },
      { role: "assistant", content: "", streaming: true },
    ]);
    try {
      const res = await fetch(`${API}/api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionRef.current, provider, message: text, lang }),
      });
      if (!res.ok || !res.body) throw new Error("bad response");
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = "";
      let got = false;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const parts = buf.split("\n\n");
        buf = parts.pop();
        for (const p of parts) {
          if (!p.startsWith("data:")) continue;
          const data = JSON.parse(p.slice(5).trim());
          if (data.delta) { got = true; patchLast(data.delta); }
          if (data.done) { setMessages((prev) => { const n = [...prev]; const l = n[n.length - 1]; if (l && !l.content) n[n.length - 1] = { ...l, content: t("ai.error"), streaming: false }; return n; }); }
          if (data.error) { setErr(true); }
        }
      }
      if (!got) setErr(true);
    } catch {
      setErr(true);
    } finally {
      setMessages((prev) => {
        const next = [...prev];
        const last = next[next.length - 1];
        if (last) next[next.length - 1] = { ...last, streaming: false };
        return next;
      });
      setBusy(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        data-testid="ai-assistant-toggle"
        aria-label={t("ai.open")}
        className="fixed bottom-5 right-5 z-[60] inline-flex items-center gap-2 rounded-full bg-orange px-5 py-3.5 text-sm font-bold text-white shadow-xl shadow-orange/40 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-deep"
      >
        <Sparkles className="h-5 w-5" />
        <span className="hidden sm:inline">{t("ai.open")}</span>
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            data-testid="ai-assistant-panel"
            className="fixed bottom-20 right-3 z-[60] flex h-[560px] max-h-[calc(100vh-110px)] w-[calc(100vw-24px)] max-w-[390px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-navy shadow-2xl sm:right-5"
            role="dialog"
            aria-label={t("ai.panel")}
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-navy-2/60 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-gold"><Bot className="h-5 w-5" /></span>
                <div>
                  <p className="text-sm font-bold text-white" data-testid="ai-assistant-title">{t("ai.panel")}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">{t("ai.sub")}</p>
                </div>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close assistant" data-testid="ai-assistant-close" className="flex h-9 w-9 items-center justify-center rounded-full text-white/60 hover:bg-white/10 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5" role="tablist" aria-label="AI model">
              {MODELS.map((m) => (
                <button
                  key={m}
                  type="button"
                  role="tab"
                  aria-selected={provider === m}
                  data-testid={`ai-model-${m}`}
                  onClick={() => setProvider(m)}
                  className={`rounded-full px-3 py-1.5 text-[11px] font-bold transition-colors duration-200 ${provider === m ? "bg-gold text-navy" : "bg-white/5 text-white/60 hover:text-white"}`}
                >
                  {t(`ai.models.${m}`)}
                </button>
              ))}
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" data-testid="ai-messages">
              {messages.map((m, i) => (
                <div key={i} data-testid={`ai-message-${m.role}-${i}`} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${m.role === "user" ? "bg-royal text-white" : "bg-white/10 text-white/90"}`}>
                    {m.content}
                    {m.streaming && m.content === "" && (
                      <span className="inline-flex gap-1 py-1" aria-label="Assistant is typing">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold [animation-delay:0ms]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold [animation-delay:120ms]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold [animation-delay:240ms]" />
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {err && <p className="text-center text-xs font-semibold text-red-400" role="alert" data-testid="ai-error">{t("ai.error")}</p>}
            </div>

            <div className="flex flex-wrap gap-1.5 px-4 pb-2">
              {t("ai.quick").map((q, i) => (
                <button key={i} type="button" data-testid={`ai-quick-${i}`} onClick={() => send(q)} disabled={busy}
                  className="rounded-full border border-gold/30 px-3 py-1.5 text-[11px] font-semibold text-gold/90 transition-colors hover:bg-gold/10 disabled:opacity-50">
                  {q}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); send(); }}
              className="flex items-center gap-2 border-t border-white/10 bg-navy-2/40 px-3 py-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("ai.placeholder")}
                data-testid="ai-input"
                aria-label={t("ai.placeholder")}
                className="flex-1 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/40 focus:border-gold"
                maxLength={500}
              />
              <button type="submit" disabled={busy || !input.trim()} data-testid="ai-send" aria-label={t("ai.send")}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange text-white transition-all hover:bg-orange-deep disabled:opacity-40">
                <Send className="h-4 w-4" />
              </button>
            </form>
            <p className="px-4 pb-3 text-center text-[10px] leading-relaxed text-white/40">{t("ai.disclaimer")}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
