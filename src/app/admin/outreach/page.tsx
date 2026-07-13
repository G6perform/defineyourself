"use client";

import { useState, useEffect, useCallback } from "react";

type Business = {
  id: string;
  name: string;
  type: string | null;
  email: string | null;
  phone: string | null;
  status: string;
  city: string;
  google_rating: number | null;
  contacted_at: string | null;
  last_activity_at: string | null;
  donated_amount: number | null;
  notes: string | null;
  lead_source: string | null;
};

type Stats = {
  discovered: number;
  contacted: number;
  opened: number;
  interested: number;
  donated: number;
  declined: number;
  total_donated: number;
};

const STATUS_LABELS: Record<string, string> = {
  discovered: "Discovered",
  contacted: "Contacted",
  opened: "Opened",
  interested: "Interested",
  donated: "Donated",
  declined: "Declined",
  unsubscribed: "Unsubscribed",
};

const STATUS_COLORS: Record<string, string> = {
  discovered: "bg-mid-gray text-text-dark",
  contacted: "bg-blue-100 text-blue-800",
  opened: "bg-yellow-100 text-yellow-800",
  interested: "bg-green-100 text-green-800",
  donated: "bg-emerald-100 text-emerald-800",
  declined: "bg-red-100 text-red-800",
  unsubscribed: "bg-gray-200 text-gray-600",
};

const TABS = ["all", "discovered", "contacted", "opened", "interested", "donated", "declined"];

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

export default function OutreachAdmin() {
  const saved = getSavedAuth();
  const [authenticated, setAuthenticated] = useState(saved.authenticated);
  const [password, setPassword] = useState(saved.password);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [bizRes, statsRes] = await Promise.all([
        fetch(`/api/outreach/businesses?status=${activeTab}`, {
          headers: { "x-admin-password": password },
        }),
        fetch("/api/outreach/stats", {
          headers: { "x-admin-password": password },
        }),
      ]);
      if (bizRes.ok) setBusinesses(await bizRes.json());
      if (statsRes.ok) setStats(await statsRes.json());
    } catch (e) {
      console.error("Failed to fetch:", e);
    }
    setLoading(false);
  }, [activeTab, password]);

  useEffect(() => {
    if (authenticated) fetchData();
  }, [authenticated, activeTab, fetchData]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/outreach/stats", {
      headers: { "x-admin-password": password },
    });
    if (res.ok) {
      setAuthenticated(true);
      localStorage.setItem("dy_admin_auth", JSON.stringify({ password, expiry: Date.now() + 24 * 60 * 60 * 1000 }));
    } else {
      alert("Invalid password");
    }
  }

  async function runDiscovery() {
    setActionLoading("discovery");
    await Promise.all([
      fetch("/api/outreach/discover", {
        method: "POST",
        headers: { "x-admin-password": password },
      }),
      fetch("/api/outreach/discover-apollo", {
        method: "POST",
        headers: { "x-admin-password": password },
      }),
    ]);
    await fetchData();
    setActionLoading(null);
  }

  async function runOutreach() {
    setActionLoading("outreach");
    await fetch("/api/outreach/send", {
      method: "POST",
      headers: { "x-admin-password": password },
    });
    await fetchData();
    setActionLoading(null);
  }

  async function updateStatus(id: string, status: string) {
    await fetch("/api/outreach/businesses", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password,
      },
      body: JSON.stringify({ id, status }),
    });
    await fetchData();
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="bg-white p-10 max-w-sm w-full border border-mid-gray/50">
          <h1 className="font-display text-2xl tracking-wider text-text-dark mb-6">
            OUTREACH ADMIN
          </h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 bg-off-white border border-mid-gray text-text-dark text-sm focus:outline-none focus:border-charcoal mb-4"
          />
          <button className="w-full bg-charcoal text-white font-bold text-sm uppercase tracking-wider py-3">
            Login
          </button>
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
            <h1 className="font-display text-3xl tracking-wider text-text-dark">
              OUTREACH PIPELINE
            </h1>
            <p className="text-text-gray text-sm mt-1">
              Automated business donation outreach
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="/admin/grants"
              className="bg-white text-charcoal border border-charcoal font-bold text-xs uppercase tracking-wider px-6 py-3 hover:bg-off-white transition-colors"
            >
              Grants Pipeline
            </a>
            <button
              onClick={runDiscovery}
              disabled={actionLoading === "discovery"}
              className="bg-charcoal text-white font-bold text-xs uppercase tracking-wider px-6 py-3 hover:bg-charcoal/90 transition-colors disabled:opacity-50"
            >
              {actionLoading === "discovery" ? "Discovering..." : "Find Businesses"}
            </button>
            <button
              onClick={runOutreach}
              disabled={actionLoading === "outreach"}
              className="bg-white text-charcoal border border-charcoal font-bold text-xs uppercase tracking-wider px-6 py-3 hover:bg-off-white transition-colors disabled:opacity-50"
            >
              {actionLoading === "outreach" ? "Sending..." : "Send Outreach"}
            </button>
          </div>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-1 mb-8">
            {[
              { label: "Discovered", value: stats.discovered },
              { label: "Contacted", value: stats.contacted },
              { label: "Opened", value: stats.opened },
              { label: "Interested", value: stats.interested },
              { label: "Donated", value: stats.donated },
              { label: "Declined", value: stats.declined },
              { label: "Total Raised", value: `$${stats.total_donated.toLocaleString()}` },
            ].map((s) => (
              <div key={s.label} className="bg-white p-4 text-center border border-mid-gray/30">
                <p className="font-display text-2xl text-text-dark">
                  {s.value}
                </p>
                <p className="text-text-gray text-xs uppercase tracking-wider mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 mb-6 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs font-bold uppercase tracking-wider px-4 py-2 transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? "bg-charcoal text-white"
                  : "bg-white text-text-gray hover:bg-mid-gray/30"
              }`}
            >
              {tab === "all" ? "All" : STATUS_LABELS[tab]}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white border border-mid-gray/30 overflow-x-auto">
          {loading ? (
            <div className="p-10 text-center text-text-gray">Loading...</div>
          ) : businesses.length === 0 ? (
            <div className="p-10 text-center text-text-gray">
              No businesses found. Click &quot;Find Businesses&quot; to start discovering.
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-mid-gray/30">
                  {["Business", "Type", "Email", "Phone", "Status", "Source", "Contacted", "Actions"].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left text-xs font-bold uppercase tracking-wider text-text-gray px-4 py-3"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {businesses.map((biz) => (
                  <tr
                    key={biz.id}
                    className="border-b border-mid-gray/20 hover:bg-off-white/50"
                  >
                    <td className="px-4 py-3">
                      <p className="font-semibold text-text-dark text-sm">
                        {biz.name}
                      </p>
                      <p className="text-text-gray text-xs">{biz.city}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-text-gray">
                      {biz.type || "—"}
                    </td>
                    <td className="px-4 py-3 text-sm text-text-gray">
                      {biz.email || "—"}
                    </td>
                    <td className="px-4 py-3 text-sm text-text-gray">
                      {biz.phone || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-bold uppercase tracking-wider px-2 py-1 ${
                          STATUS_COLORS[biz.status] || "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {STATUS_LABELS[biz.status] || biz.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 ${
                        biz.lead_source === "apollo" ? "bg-purple-100 text-purple-800" :
                        biz.lead_source === "google_places" ? "bg-blue-100 text-blue-800" :
                        "bg-gray-100 text-gray-600"
                      }`}>
                        {biz.lead_source || "manual"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-text-gray whitespace-nowrap">
                      {biz.contacted_at
                        ? new Date(biz.contacted_at).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                            timeZone: "America/Los_Angeles",
                          })
                        : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={biz.status}
                        onChange={(e) => updateStatus(biz.id, e.target.value)}
                        className="text-xs bg-off-white border border-mid-gray px-2 py-1 text-text-dark focus:outline-none"
                      >
                        {Object.entries(STATUS_LABELS).map(([val, label]) => (
                          <option key={val} value={val}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
