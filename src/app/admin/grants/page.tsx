"use client";

import { useState, useEffect, useCallback } from "react";

type Grant = {
  id: string;
  name: string;
  organization: string | null;
  url: string | null;
  amount_min: number | null;
  amount_max: number | null;
  deadline: string | null;
  status: string;
  category: string | null;
  eligibility_notes: string | null;
  description: string | null;
  draft_narrative: string | null;
  draft_budget: string | null;
  ai_strategy: string | null;
  notes: string | null;
  awarded_amount: number | null;
  created_at: string;
};

const STATUS_LABELS: Record<string, string> = {
  identified: "Identified",
  researching: "Researching",
  drafting: "Drafting",
  submitted: "Submitted",
  awarded: "Awarded",
  rejected: "Rejected",
};

const STATUS_COLORS: Record<string, string> = {
  identified: "bg-mid-gray text-text-dark",
  researching: "bg-blue-100 text-blue-800",
  drafting: "bg-yellow-100 text-yellow-800",
  submitted: "bg-purple-100 text-purple-800",
  awarded: "bg-emerald-100 text-emerald-800",
  rejected: "bg-red-100 text-red-800",
};

const CATEGORIES = [
  "youth sports",
  "education",
  "mentorship",
  "community development",
  "health & wellness",
  "equity & access",
  "general nonprofit",
];

export default function GrantsAdmin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [grants, setGrants] = useState<Grant[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedGrant, setSelectedGrant] = useState<Grant | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [generating, setGenerating] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [contentType, setContentType] = useState<string | null>(null);

  const fetchGrants = useCallback(async () => {
    const res = await fetch(`/api/grants?status=${activeTab}`, {
      headers: { "x-admin-password": password },
    });
    if (res.ok) setGrants(await res.json());
  }, [activeTab, password]);

  useEffect(() => {
    if (authenticated) fetchGrants();
  }, [authenticated, activeTab, fetchGrants]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/grants?status=all", {
      headers: { "x-admin-password": password },
    });
    if (res.ok) setAuthenticated(true);
    else alert("Invalid password");
  }

  async function addGrant(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    await fetch("/api/grants", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({
        name: data.get("name"),
        organization: data.get("organization") || null,
        url: data.get("url") || null,
        amount_min: data.get("amount_min") ? Number(data.get("amount_min")) : null,
        amount_max: data.get("amount_max") ? Number(data.get("amount_max")) : null,
        deadline: data.get("deadline") || null,
        category: data.get("category") || null,
        description: data.get("description") || null,
        eligibility_notes: data.get("eligibility_notes") || null,
      }),
    });

    setShowAddForm(false);
    form.reset();
    await fetchGrants();
  }

  async function updateStatus(id: string, status: string) {
    await fetch("/api/grants", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ id, status }),
    });
    await fetchGrants();
    if (selectedGrant?.id === id) {
      setSelectedGrant((prev) => prev ? { ...prev, status } : null);
    }
  }

  async function generateContent(grantId: string, type: string) {
    setGenerating(type);
    setGeneratedContent(null);
    setContentType(type);

    const res = await fetch("/api/grants/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ grantId, type }),
    });

    if (res.ok) {
      const data = await res.json();
      setGeneratedContent(data.content);
      await fetchGrants();
      // Update selected grant with new content
      const updated = grants.find((g) => g.id === grantId);
      if (updated) {
        const field = type === "strategy" ? "ai_strategy" : type === "narrative" ? "draft_narrative" : "draft_budget";
        setSelectedGrant({ ...updated, [field]: data.content });
      }
    }
    setGenerating(null);
  }

  async function deleteGrant(id: string) {
    if (!confirm("Delete this grant?")) return;
    await fetch("/api/grants", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ id }),
    });
    setSelectedGrant(null);
    await fetchGrants();
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="bg-white p-10 max-w-sm w-full border border-mid-gray/50">
          <h1 className="font-display text-2xl tracking-wider text-text-dark mb-6">GRANTS ADMIN</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 bg-off-white border border-mid-gray text-text-dark text-sm focus:outline-none focus:border-charcoal mb-4"
          />
          <button className="w-full bg-charcoal text-white font-bold text-sm uppercase tracking-wider py-3">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl tracking-wider text-text-dark">GRANTS PIPELINE</h1>
            <p className="text-text-gray text-sm mt-1">Identify, draft, and submit grant applications</p>
          </div>
          <div className="flex gap-3">
            <a
              href="/admin/outreach"
              className="bg-white text-charcoal border border-charcoal font-bold text-xs uppercase tracking-wider px-6 py-3 hover:bg-off-white transition-colors"
            >
              Outreach Pipeline
            </a>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-charcoal text-white font-bold text-xs uppercase tracking-wider px-6 py-3 hover:bg-charcoal/90 transition-colors"
            >
              {showAddForm ? "Cancel" : "+ Add Grant"}
            </button>
          </div>
        </div>

        {/* Add Grant Form */}
        {showAddForm && (
          <form onSubmit={addGrant} className="bg-white border border-mid-gray/30 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-dark mb-1">Grant Name *</label>
                <input name="name" required className="w-full px-3 py-2 bg-off-white border border-mid-gray text-sm focus:outline-none focus:border-charcoal" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-dark mb-1">Organization</label>
                <input name="organization" className="w-full px-3 py-2 bg-off-white border border-mid-gray text-sm focus:outline-none focus:border-charcoal" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-dark mb-1">Grant URL</label>
                <input name="url" type="url" className="w-full px-3 py-2 bg-off-white border border-mid-gray text-sm focus:outline-none focus:border-charcoal" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-dark mb-1">Category</label>
                <select name="category" className="w-full px-3 py-2 bg-off-white border border-mid-gray text-sm focus:outline-none focus:border-charcoal">
                  <option value="">Select...</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-dark mb-1">Amount Min ($)</label>
                <input name="amount_min" type="number" className="w-full px-3 py-2 bg-off-white border border-mid-gray text-sm focus:outline-none focus:border-charcoal" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-dark mb-1">Amount Max ($)</label>
                <input name="amount_max" type="number" className="w-full px-3 py-2 bg-off-white border border-mid-gray text-sm focus:outline-none focus:border-charcoal" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-dark mb-1">Deadline</label>
                <input name="deadline" type="date" className="w-full px-3 py-2 bg-off-white border border-mid-gray text-sm focus:outline-none focus:border-charcoal" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-dark mb-1">Eligibility Notes</label>
                <input name="eligibility_notes" className="w-full px-3 py-2 bg-off-white border border-mid-gray text-sm focus:outline-none focus:border-charcoal" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-text-dark mb-1">Description</label>
                <textarea name="description" rows={3} className="w-full px-3 py-2 bg-off-white border border-mid-gray text-sm focus:outline-none focus:border-charcoal resize-none" />
              </div>
            </div>
            <button type="submit" className="mt-4 bg-charcoal text-white font-bold text-xs uppercase tracking-wider px-6 py-3">
              Add Grant
            </button>
          </form>
        )}

        {/* Tabs */}
        <div className="flex gap-1 mb-6 overflow-x-auto">
          {["all", ...Object.keys(STATUS_LABELS)].map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setSelectedGrant(null); }}
              className={`text-xs font-bold uppercase tracking-wider px-4 py-2 transition-colors whitespace-nowrap ${
                activeTab === tab ? "bg-charcoal text-white" : "bg-white text-text-gray hover:bg-mid-gray/30"
              }`}
            >
              {tab === "all" ? "All" : STATUS_LABELS[tab]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Grant List */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-mid-gray/30">
              {grants.length === 0 ? (
                <div className="p-8 text-center text-text-gray text-sm">
                  No grants found. Click &quot;+ Add Grant&quot; to get started.
                </div>
              ) : (
                grants.map((grant) => (
                  <div
                    key={grant.id}
                    onClick={() => { setSelectedGrant(grant); setGeneratedContent(null); setContentType(null); }}
                    className={`p-4 border-b border-mid-gray/20 cursor-pointer hover:bg-off-white/50 ${
                      selectedGrant?.id === grant.id ? "bg-off-white" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-text-dark text-sm leading-tight">{grant.name}</h3>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 ml-2 whitespace-nowrap ${STATUS_COLORS[grant.status]}`}>
                        {STATUS_LABELS[grant.status]}
                      </span>
                    </div>
                    <p className="text-text-gray text-xs">{grant.organization || "Unknown org"}</p>
                    <div className="flex justify-between mt-2 text-xs text-text-gray">
                      <span>
                        {grant.amount_max ? `Up to $${Number(grant.amount_max).toLocaleString()}` : "Amount TBD"}
                      </span>
                      <span>
                        {grant.deadline
                          ? new Date(grant.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "America/Los_Angeles" })
                          : "No deadline"}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Grant Detail */}
          <div className="lg:col-span-2">
            {selectedGrant ? (
              <div className="bg-white border border-mid-gray/30 p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="font-display text-2xl tracking-wider text-text-dark">{selectedGrant.name.toUpperCase()}</h2>
                    <p className="text-text-gray text-sm mt-1">{selectedGrant.organization}</p>
                  </div>
                  <div className="flex gap-2">
                    {selectedGrant.url && (
                      <a
                        href={selectedGrant.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-charcoal text-white text-xs font-bold uppercase tracking-wider px-4 py-2 hover:bg-charcoal/90"
                      >
                        View Grant &rarr;
                      </a>
                    )}
                    <button
                      onClick={() => deleteGrant(selectedGrant.id)}
                      className="text-red-600 text-xs font-bold uppercase tracking-wider px-4 py-2 border border-red-200 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-1 mb-6">
                  <div className="bg-off-white p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-text-gray">Amount</p>
                    <p className="text-sm font-semibold text-text-dark mt-1">
                      {selectedGrant.amount_min && selectedGrant.amount_max
                        ? `$${Number(selectedGrant.amount_min).toLocaleString()} - $${Number(selectedGrant.amount_max).toLocaleString()}`
                        : selectedGrant.amount_max
                        ? `Up to $${Number(selectedGrant.amount_max).toLocaleString()}`
                        : "TBD"}
                    </p>
                  </div>
                  <div className="bg-off-white p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-text-gray">Deadline</p>
                    <p className="text-sm font-semibold text-text-dark mt-1">
                      {selectedGrant.deadline
                        ? new Date(selectedGrant.deadline).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "America/Los_Angeles" })
                        : "None"}
                    </p>
                  </div>
                  <div className="bg-off-white p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-text-gray">Category</p>
                    <p className="text-sm font-semibold text-text-dark mt-1">{selectedGrant.category || "General"}</p>
                  </div>
                  <div className="bg-off-white p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-text-gray">Status</p>
                    <select
                      value={selectedGrant.status}
                      onChange={(e) => updateStatus(selectedGrant.id, e.target.value)}
                      className="text-sm font-semibold text-text-dark mt-1 bg-transparent focus:outline-none"
                    >
                      {Object.entries(STATUS_LABELS).map(([val, label]) => (
                        <option key={val} value={val}>{label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description */}
                {selectedGrant.description && (
                  <div className="mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-text-gray mb-2">Description</h3>
                    <p className="text-sm text-text-dark leading-relaxed">{selectedGrant.description}</p>
                  </div>
                )}

                {selectedGrant.eligibility_notes && (
                  <div className="mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-text-gray mb-2">Eligibility</h3>
                    <p className="text-sm text-text-dark leading-relaxed">{selectedGrant.eligibility_notes}</p>
                  </div>
                )}

                {/* AI Actions */}
                <div className="border-t border-mid-gray/30 pt-6 mb-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-text-gray mb-4">AI Grant Writer</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => generateContent(selectedGrant.id, "strategy")}
                      disabled={generating !== null}
                      className="bg-charcoal text-white text-xs font-bold uppercase tracking-wider px-4 py-2 hover:bg-charcoal/90 disabled:opacity-50"
                    >
                      {generating === "strategy" ? "Analyzing..." : "Generate Strategy"}
                    </button>
                    <button
                      onClick={() => generateContent(selectedGrant.id, "narrative")}
                      disabled={generating !== null}
                      className="bg-charcoal text-white text-xs font-bold uppercase tracking-wider px-4 py-2 hover:bg-charcoal/90 disabled:opacity-50"
                    >
                      {generating === "narrative" ? "Writing..." : "Generate Narrative"}
                    </button>
                    <button
                      onClick={() => generateContent(selectedGrant.id, "budget")}
                      disabled={generating !== null}
                      className="bg-charcoal text-white text-xs font-bold uppercase tracking-wider px-4 py-2 hover:bg-charcoal/90 disabled:opacity-50"
                    >
                      {generating === "budget" ? "Building..." : "Generate Budget"}
                    </button>
                  </div>
                </div>

                {/* Generated / Saved Content */}
                {(generatedContent || selectedGrant.ai_strategy || selectedGrant.draft_narrative || selectedGrant.draft_budget) && (
                  <div className="border-t border-mid-gray/30 pt-6">
                    {/* Show tabs for saved content */}
                    <div className="flex gap-2 mb-4">
                      {selectedGrant.ai_strategy && (
                        <button
                          onClick={() => { setGeneratedContent(selectedGrant.ai_strategy); setContentType("strategy"); }}
                          className={`text-xs font-bold uppercase tracking-wider px-3 py-1 ${contentType === "strategy" ? "bg-charcoal text-white" : "bg-off-white text-text-gray"}`}
                        >
                          Strategy
                        </button>
                      )}
                      {selectedGrant.draft_narrative && (
                        <button
                          onClick={() => { setGeneratedContent(selectedGrant.draft_narrative); setContentType("narrative"); }}
                          className={`text-xs font-bold uppercase tracking-wider px-3 py-1 ${contentType === "narrative" ? "bg-charcoal text-white" : "bg-off-white text-text-gray"}`}
                        >
                          Narrative
                        </button>
                      )}
                      {selectedGrant.draft_budget && (
                        <button
                          onClick={() => { setGeneratedContent(selectedGrant.draft_budget); setContentType("budget"); }}
                          className={`text-xs font-bold uppercase tracking-wider px-3 py-1 ${contentType === "budget" ? "bg-charcoal text-white" : "bg-off-white text-text-gray"}`}
                        >
                          Budget
                        </button>
                      )}
                    </div>

                    {generatedContent && (
                      <div className="bg-off-white p-6 text-sm text-text-dark leading-relaxed prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: generatedContent }}
                      />
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white border border-mid-gray/30 p-12 text-center text-text-gray">
                <p className="text-sm">Select a grant to view details and generate application content.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
