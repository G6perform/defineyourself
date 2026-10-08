"use client";

import { useState, useEffect, useCallback } from "react";

type Subscriber = {
  id: string;
  email: string;
  name: string | null;
  source: string;
  subscribed_at: string;
  unsubscribed_at: string | null;
};

type HistoryItem = {
  id: string;
  subject: string;
  body: string;
  recipients_count: number;
  sent_at: string;
};

type Draft = {
  id: string;
  title: string;
  subject: string;
  body: string;
  scheduled_for: string | null;
  created_at: string;
};

function getSavedAuth(): { authenticated: boolean; password: string } {
  if (typeof window === "undefined") return { authenticated: false, password: "" };
  const saved = localStorage.getItem("dy_admin_auth");
  if (!saved) return { authenticated: false, password: "" };
  try {
    const { password, expiry } = JSON.parse(saved);
    if (Date.now() < expiry) return { authenticated: true, password };
    localStorage.removeItem("dy_admin_auth");
  } catch {}
  return { authenticated: false, password: "" };
}

export default function NewsletterAdmin() {
  const saved = getSavedAuth();
  const [authenticated, setAuthenticated] = useState(saved.authenticated);
  const [password, setPassword] = useState(saved.password);
  const [tab, setTab] = useState<"drafts" | "compose" | "subscribers" | "history">("drafts");

  // Compose state
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [generating, setGenerating] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<string | null>(null);

  // Subscribers state
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [activeCount, setActiveCount] = useState(0);
  const [unsubCount, setUnsubCount] = useState(0);
  const [subLoading, setSubLoading] = useState(false);
  const [addEmail, setAddEmail] = useState("");
  const [addName, setAddName] = useState("");

  // Drafts state
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [draftsLoading, setDraftsLoading] = useState(false);
  const [previewDraft, setPreviewDraft] = useState<Draft | null>(null);

  // History state
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [histLoading, setHistLoading] = useState(false);
  const [previewItem, setPreviewItem] = useState<HistoryItem | null>(null);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    localStorage.setItem(
      "dy_admin_auth",
      JSON.stringify({ password, expiry: Date.now() + 24 * 60 * 60 * 1000 })
    );
    setAuthenticated(true);
  }

  const fetchSubscribers = useCallback(async () => {
    setSubLoading(true);
    try {
      const res = await fetch("/api/newsletter/subscribers", {
        headers: { "x-admin-password": password },
      });
      const data = await res.json();
      if (data.subscribers) {
        setSubscribers(data.subscribers);
        setActiveCount(data.active);
        setUnsubCount(data.unsubscribed);
      }
    } catch {}
    setSubLoading(false);
  }, [password]);

  const fetchDrafts = useCallback(async () => {
    setDraftsLoading(true);
    try {
      const res = await fetch("/api/newsletter/drafts", {
        headers: { "x-admin-password": password },
      });
      const data = await res.json();
      if (data.drafts) setDrafts(data.drafts);
    } catch {}
    setDraftsLoading(false);
  }, [password]);

  const fetchHistory = useCallback(async () => {
    setHistLoading(true);
    try {
      const res = await fetch("/api/newsletter/history", {
        headers: { "x-admin-password": password },
      });
      const data = await res.json();
      if (data.history) setHistory(data.history);
    } catch {}
    setHistLoading(false);
  }, [password]);

  useEffect(() => {
    if (!authenticated) return;
    if (tab === "drafts") fetchDrafts();
    if (tab === "subscribers") fetchSubscribers();
    if (tab === "history") fetchHistory();
  }, [authenticated, tab, fetchDrafts, fetchSubscribers, fetchHistory]);

  function loadDraft(draft: Draft) {
    setSubject(draft.subject);
    setBody(draft.body);
    setTab("compose");
  }

  async function deleteDraft(id: string) {
    if (!confirm("Delete this draft?")) return;
    await fetch("/api/newsletter/drafts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ id }),
    });
    fetchDrafts();
  }

  async function handleGenerate() {
    if (!topic) return;
    setGenerating(true);
    setSendResult(null);
    try {
      const res = await fetch("/api/newsletter/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": password },
        body: JSON.stringify({ topic, tone }),
      });
      const data = await res.json();
      if (data.subject) setSubject(data.subject);
      if (data.body) setBody(data.body);
    } catch {
      setSendResult("Failed to generate");
    }
    setGenerating(false);
  }

  async function handleSend() {
    if (!subject || !body) return;
    if (!confirm(`Send this newsletter to ${activeCount} subscribers?`)) return;
    setSending(true);
    setSendResult(null);
    try {
      const res = await fetch("/api/newsletter/send", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": password },
        body: JSON.stringify({ subject, body }),
      });
      const data = await res.json();
      if (data.success) {
        setSendResult(`Sent to ${data.sent} subscribers${data.failed ? ` (${data.failed} failed)` : ""}`);
        setSubject("");
        setBody("");
        setTopic("");
      } else {
        setSendResult(data.error || "Failed to send");
      }
    } catch {
      setSendResult("Failed to send");
    }
    setSending(false);
  }

  async function handleAddSubscriber(e: React.FormEvent) {
    e.preventDefault();
    if (!addEmail) return;
    await fetch("/api/newsletter/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: addEmail, name: addName || null, source: "admin" }),
    });
    setAddEmail("");
    setAddName("");
    fetchSubscribers();
  }

  async function handleDeleteSubscriber(id: string) {
    if (!confirm("Remove this subscriber?")) return;
    await fetch("/api/newsletter/subscribers", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ id }),
    });
    fetchSubscribers();
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <form onSubmit={handleLogin} className="bg-white p-8 shadow-sm max-w-sm w-full">
          <h1 className="font-display text-3xl tracking-wider text-text-dark mb-6 text-center">
            NEWSLETTER
          </h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            className="w-full px-4 py-3 border border-mid-gray text-sm mb-4 focus:outline-none focus:border-charcoal"
          />
          <button className="w-full bg-charcoal text-white font-bold text-sm uppercase tracking-wider py-3 hover:bg-charcoal/90 transition-colors">
            Enter
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-4xl tracking-wider text-text-dark">NEWSLETTER</h1>
          <a href="/admin/outreach" className="text-text-gray text-sm hover:text-text-dark transition-colors">
            Outreach Dashboard &rarr;
          </a>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 text-center">
            <p className="font-display text-3xl text-text-dark">{activeCount}</p>
            <p className="text-text-gray text-xs uppercase tracking-wider">Active Subscribers</p>
          </div>
          <div className="bg-white p-4 text-center">
            <p className="font-display text-3xl text-text-dark">{unsubCount}</p>
            <p className="text-text-gray text-xs uppercase tracking-wider">Unsubscribed</p>
          </div>
          <div className="bg-white p-4 text-center">
            <p className="font-display text-3xl text-text-dark">{history.length}</p>
            <p className="text-text-gray text-xs uppercase tracking-wider">Newsletters Sent</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6">
          {(["drafts", "compose", "subscribers", "history"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2 text-sm font-bold uppercase tracking-wider transition-colors ${
                tab === t ? "bg-charcoal text-white" : "bg-white text-text-gray hover:bg-mid-gray"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Drafts Tab */}
        {tab === "drafts" && (
          <div className="bg-white p-6">
            <h2 className="font-display text-2xl tracking-wider text-text-dark mb-6">
              SCHEDULED NEWSLETTERS
            </h2>
            {draftsLoading ? (
              <p className="text-text-gray text-sm">Loading...</p>
            ) : drafts.length === 0 ? (
              <p className="text-text-gray text-sm text-center py-8">No drafts yet</p>
            ) : (
              <div className="space-y-4">
                {drafts.map((draft) => (
                  <div key={draft.id} className="border border-mid-gray/50">
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-text-dark">{draft.title}</h3>
                          {draft.scheduled_for && (
                            <span className="text-xs bg-accent/20 text-accent-dark px-2 py-0.5 font-semibold uppercase tracking-wider">
                              {draft.scheduled_for}
                            </span>
                          )}
                        </div>
                        <p className="text-text-gray text-sm mt-1">Subject: {draft.subject}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setPreviewDraft(previewDraft?.id === draft.id ? null : draft)}
                          className="text-xs text-text-gray hover:text-text-dark uppercase tracking-wider"
                        >
                          {previewDraft?.id === draft.id ? "Close" : "Preview"}
                        </button>
                        <button
                          onClick={() => loadDraft(draft)}
                          className="bg-charcoal text-white font-bold text-xs uppercase tracking-wider px-4 py-2 hover:bg-charcoal/90 transition-colors"
                        >
                          Load & Send
                        </button>
                        <button
                          onClick={() => deleteDraft(draft.id)}
                          className="text-red-400 hover:text-red-600 text-xs"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    {previewDraft?.id === draft.id && (
                      <div className="border-t border-mid-gray/50 p-6 bg-off-white max-h-[500px] overflow-y-auto">
                        <div dangerouslySetInnerHTML={{ __html: draft.body }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Compose Tab */}
        {tab === "compose" && (
          <div className="bg-white p-6">
            <h2 className="font-display text-2xl tracking-wider text-text-dark mb-6">
              COMPOSE NEWSLETTER
            </h2>

            {/* AI Generate */}
            <div className="mb-6 p-4 bg-off-white">
              <p className="text-xs font-bold uppercase tracking-wider text-text-gray mb-3">
                AI Generate
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="What's the newsletter about? (e.g. 'Fall ID Camp announcement')"
                  className="flex-1 px-4 py-2 border border-mid-gray text-sm focus:outline-none focus:border-charcoal"
                />
                <input
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  placeholder="Tone (optional)"
                  className="sm:w-48 px-4 py-2 border border-mid-gray text-sm focus:outline-none focus:border-charcoal"
                />
                <button
                  onClick={handleGenerate}
                  disabled={generating || !topic}
                  className="bg-accent hover:bg-accent-dark text-charcoal font-bold text-sm uppercase tracking-wider px-6 py-2 transition-colors disabled:opacity-50"
                >
                  {generating ? "Generating..." : "Generate"}
                </button>
              </div>
            </div>

            {/* Subject */}
            <div className="mb-4">
              <label className="text-xs font-bold uppercase tracking-wider text-text-gray mb-1 block">
                Subject Line
              </label>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Newsletter subject"
                className="w-full px-4 py-2 border border-mid-gray text-sm focus:outline-none focus:border-charcoal"
              />
            </div>

            {/* Body */}
            <div className="mb-4">
              <label className="text-xs font-bold uppercase tracking-wider text-text-gray mb-1 block">
                Email Body (HTML)
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={12}
                placeholder="Paste or generate HTML email content"
                className="w-full px-4 py-2 border border-mid-gray text-sm font-mono focus:outline-none focus:border-charcoal"
              />
            </div>

            {/* Preview */}
            {body && (
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-wider text-text-gray mb-2">
                  Preview
                </p>
                <div className="border border-mid-gray p-6 bg-white max-h-96 overflow-y-auto">
                  <div dangerouslySetInnerHTML={{ __html: body }} />
                </div>
              </div>
            )}

            {/* Send */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleSend}
                disabled={sending || !subject || !body}
                className="bg-charcoal text-white font-bold text-sm uppercase tracking-wider px-8 py-3 hover:bg-charcoal/90 transition-colors disabled:opacity-50"
              >
                {sending ? "Sending..." : `Send to ${activeCount} Subscribers`}
              </button>
              {sendResult && (
                <p className={`text-sm font-semibold ${sendResult.includes("Sent") ? "text-green-600" : "text-red-500"}`}>
                  {sendResult}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Subscribers Tab */}
        {tab === "subscribers" && (
          <div className="bg-white p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl tracking-wider text-text-dark">
                SUBSCRIBERS
              </h2>
              <button
                onClick={fetchSubscribers}
                className="text-text-gray text-sm hover:text-text-dark transition-colors"
              >
                Refresh
              </button>
            </div>

            {/* Add Subscriber */}
            <form onSubmit={handleAddSubscriber} className="flex gap-3 mb-6 p-4 bg-off-white">
              <input
                value={addEmail}
                onChange={(e) => setAddEmail(e.target.value)}
                placeholder="Email"
                type="email"
                required
                className="flex-1 px-4 py-2 border border-mid-gray text-sm focus:outline-none focus:border-charcoal"
              />
              <input
                value={addName}
                onChange={(e) => setAddName(e.target.value)}
                placeholder="Name (optional)"
                className="sm:w-48 px-4 py-2 border border-mid-gray text-sm focus:outline-none focus:border-charcoal"
              />
              <button className="bg-charcoal text-white font-bold text-sm uppercase tracking-wider px-6 py-2 hover:bg-charcoal/90 transition-colors">
                Add
              </button>
            </form>

            {subLoading ? (
              <p className="text-text-gray text-sm">Loading...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs uppercase tracking-wider text-text-gray border-b border-mid-gray">
                      <th className="py-3 pr-4">Email</th>
                      <th className="py-3 pr-4">Name</th>
                      <th className="py-3 pr-4">Source</th>
                      <th className="py-3 pr-4">Subscribed</th>
                      <th className="py-3 pr-4">Status</th>
                      <th className="py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((sub) => (
                      <tr key={sub.id} className="border-b border-mid-gray/50">
                        <td className="py-3 pr-4">{sub.email}</td>
                        <td className="py-3 pr-4 text-text-gray">{sub.name || "—"}</td>
                        <td className="py-3 pr-4">
                          <span className="text-xs bg-off-white px-2 py-0.5">{sub.source}</span>
                        </td>
                        <td className="py-3 pr-4 text-text-gray text-xs">
                          {new Date(sub.subscribed_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </td>
                        <td className="py-3 pr-4">
                          {sub.unsubscribed_at ? (
                            <span className="text-xs text-red-500 font-semibold">Unsubscribed</span>
                          ) : (
                            <span className="text-xs text-green-600 font-semibold">Active</span>
                          )}
                        </td>
                        <td className="py-3 text-right">
                          <button
                            onClick={() => handleDeleteSubscriber(sub.id)}
                            className="text-red-400 hover:text-red-600 text-xs"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {subscribers.length === 0 && (
                  <p className="text-text-gray text-sm text-center py-8">No subscribers yet</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* History Tab */}
        {tab === "history" && (
          <div className="bg-white p-6">
            <h2 className="font-display text-2xl tracking-wider text-text-dark mb-6">
              SEND HISTORY
            </h2>
            {histLoading ? (
              <p className="text-text-gray text-sm">Loading...</p>
            ) : history.length === 0 ? (
              <p className="text-text-gray text-sm text-center py-8">No newsletters sent yet</p>
            ) : (
              <div className="space-y-3">
                {history.map((item) => (
                  <div key={item.id} className="border border-mid-gray/50 p-4 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-text-dark">{item.subject}</p>
                      <p className="text-text-gray text-xs mt-1">
                        {new Date(item.sent_at).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}{" "}
                        &middot; {item.recipients_count} recipients
                      </p>
                    </div>
                    <button
                      onClick={() => setPreviewItem(previewItem?.id === item.id ? null : item)}
                      className="text-xs text-text-gray hover:text-text-dark uppercase tracking-wider"
                    >
                      {previewItem?.id === item.id ? "Close" : "Preview"}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Preview Modal */}
            {previewItem && (
              <div className="mt-4 border border-mid-gray p-6 bg-off-white max-h-96 overflow-y-auto">
                <div dangerouslySetInnerHTML={{ __html: previewItem.body }} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
