import { useState, useEffect } from "react";
import {
  X,
  FileSpreadsheet,
  RefreshCw,
  Trash2,
  LogOut,
  Sliders,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Filter,
  Users,
  Check,
  Globe,
  Settings,
  PlusCircle,
  HelpCircle,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { User } from "firebase/auth";
import { googleSignIn, logoutAdmin, getCachedToken } from "../lib/firebase";
import { InvitationRequest } from "../db/local_db";

interface AdminConsoleProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SheetConfigState {
  spreadsheetId: string;
  accessToken: string | null;
  autoSync: boolean;
  lastSyncedAt: string | null;
}

export default function AdminConsole({ isOpen, onClose }: AdminConsoleProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [invitations, setInvitations] = useState<InvitationRequest[]>([]);
  const [sheetConfig, setSheetConfig] = useState<SheetConfigState>({
    spreadsheetId: "",
    accessToken: null,
    autoSync: false,
    lastSyncedAt: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [professionFilter, setProfessionFilter] = useState<string>("all");

  useEffect(() => {
    if (isOpen) {
      fetchSheetConfig();
      fetchInvitations();
    }
  }, [isOpen]);

  const fetchSheetConfig = async () => {
    try {
      const res = await fetch("/api/admin/sheet-config");
      if (res.ok) {
        const data = await res.json();
        setSheetConfig(data);
      }
    } catch (err) {
      console.error("Failed to fetch sheet config:", err);
    }
  };

  const fetchInvitations = async () => {
    try {
      const res = await fetch("/api/admin/invitations");
      if (res.ok) {
        const data = await res.json();
        // Sort invitations: newest first
        const sorted = data.sort(
          (a: InvitationRequest, b: InvitationRequest) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setInvitations(sorted);
      }
    } catch (err) {
      console.error("Failed to fetch invitations:", err);
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);

        // Update sheet config with new accessToken on the server
        const updateRes = await fetch("/api/admin/sheet-config", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accessToken: result.accessToken }),
        });
        if (updateRes.ok) {
          const updateData = await updateRes.json();
          setSheetConfig(updateData.config);
          setSuccessMsg("Logged in and Google credentials updated successfully.");
          fetchInvitations();
        }
      }
    } catch (err: any) {
      if (err.code === "auth/popup-closed-by-user" || (err.message && err.message.includes("popup-closed-by-user"))) {
        setError("Sign-in popup was closed before completion. If popups are blocked by your browser, please enable them or click the 'Open in a new tab' button at the top-right to run the app in a standalone tab.");
      } else if (err.code === "auth/popup-blocked" || (err.message && err.message.includes("popup-blocked"))) {
        setError("The Google Sign-In popup was blocked by your browser. Please allow popups for this site or click 'Open in a new tab' at the top-right of your screen.");
      } else {
        setError(err.message || "Failed to sign in with Google. Please check your connection and try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      setUser(null);
      setToken(null);
      setSuccessMsg("Logged out successfully.");
    } catch (err: any) {
      setError(err.message || "Failed to log out.");
    }
  };

  const handleCreateSpreadsheet = async () => {
    const activeToken = token || getCachedToken();
    if (!activeToken) {
      setError("Please re-login with Google to authorization your account.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const res = await fetch("/api/admin/create-sheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accessToken: activeToken,
          title: "Karunada Habba RSVPs (Thailand 2026)",
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSheetConfig({
          spreadsheetId: data.spreadsheetId,
          accessToken: activeToken,
          autoSync: true,
          lastSyncedAt: new Date().toISOString(),
        });
        setSuccessMsg(data.message);
        fetchInvitations();
      } else {
        setError(data.error || "Failed to create Google Sheet.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while creating the spreadsheet.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualSync = async () => {
    const activeToken = token || getCachedToken();
    setIsLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const res = await fetch("/api/admin/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken: activeToken || undefined }),
      });

      const data = await res.json();
      if (res.ok) {
        setSheetConfig((prev) => ({
          ...prev,
          lastSyncedAt: data.lastSyncedAt,
        }));
        setSuccessMsg(`Successfully synchronized all ${data.count} entries to Google Sheet.`);
        fetchInvitations();
      } else {
        setError(data.error || "Failed to sync spreadsheet.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while syncing.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    setError(null);
    try {
      const res = await fetch(`/api/admin/invitations/${id}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        // Update local state
        setInvitations((prev) =>
          prev.map((inv) => (inv.id === id ? { ...inv, invitation_status: newStatus as any } : inv))
        );
        setSuccessMsg("Invitation status updated and synced successfully.");
        // Refetch config to update lastSyncedAt
        fetchSheetConfig();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to update invitation status.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    }
  };

  const handleDeleteInvitation = async (id: string, name: string) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${name}'s reservation? This will remove it locally and sync changes.`);
    if (!confirmed) return;

    setError(null);
    try {
      const res = await fetch(`/api/admin/invitations/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setInvitations((prev) => prev.filter((inv) => inv.id !== id));
        setSuccessMsg("Invitation deleted successfully.");
        fetchSheetConfig();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to delete invitation.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during deletion.");
    }
  };

  const handleToggleAutoSync = async (checked: boolean) => {
    try {
      const res = await fetch("/api/admin/sheet-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ autoSync: checked }),
      });
      if (res.ok) {
        const data = await res.json();
        setSheetConfig(data.config);
        setSuccessMsg(`Auto-Sync has been ${checked ? "enabled" : "disabled"}.`);
      }
    } catch (err) {
      console.error("Failed to toggle auto sync:", err);
    }
  };

  // Filter invitation requests
  const filteredInvitations = invitations.filter((inv) => {
    const matchesSearch =
      inv.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.phone.includes(searchTerm) ||
      inv.city_country.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || inv.invitation_status === statusFilter;
    const matchesProfession =
      professionFilter === "all" ||
      (professionFilter === "Salary" && inv.profession === "Salary") ||
      (professionFilter === "Business" && inv.profession === "Business") ||
      (professionFilter === "other" && !inv.profession);

    return matchesSearch && matchesStatus && matchesProfession;
  });

  // Calculate stats
  const totalGuestsCount = invitations.reduce((acc, curr) => acc + (curr.number_of_guests || 1), 0);
  const confirmedCount = invitations.filter((i) => i.invitation_status === "confirmed").length;
  const pendingCount = invitations.filter((i) => i.invitation_status === "pending").length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#121212] border border-white/10 w-full max-w-6xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-brand-black-deep to-[#181818]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#d4af37]/10 text-[#d4af37] rounded-lg border border-[#d4af37]/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-display font-black tracking-tight text-white flex items-center gap-2">
                ORGANIZER CONSOLE
              </h2>
              <p className="text-xs text-white/40">Manage invitation requests &amp; connect Google Sheets / Excel sync</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-white/5 border border-white/10 text-white/60 hover:text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Notifications */}
          {error && (
            <div className="p-4 bg-red-950/40 border border-red-500/20 text-red-300 text-sm rounded-xl flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>{error}</div>
            </div>
          )}

          {successMsg && (
            <div className="p-4 bg-green-950/40 border border-green-500/20 text-green-300 text-sm rounded-xl flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <div>{successMsg}</div>
            </div>
          )}

          {/* Section 1: Connection to Google Sheets */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#34a853]/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2 max-w-xl">
                <span className="text-[10px] font-mono tracking-widest text-[#34a853] font-bold uppercase block flex items-center gap-1.5">
                  <FileSpreadsheet className="w-3.5 h-3.5" /> Google Sheets Sync Integration
                </span>
                <h3 className="text-lg font-bold text-white">Live RSVP Sheet Link</h3>
                <p className="text-sm text-white/60 font-light leading-relaxed">
                  Export and auto-sync all attendees, status levels, phone numbers, and guest counts to a single, secure Google Sheet inside your personal Google Drive account.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {!user ? (
                  <button
                    onClick={handleLogin}
                    disabled={isLoading}
                    className="px-5 py-2.5 bg-[#34a853] hover:bg-[#2d9247] text-white font-medium text-sm rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isLoading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                    )}
                    Sign in with Google
                  </button>
                ) : (
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
                    <img
                      src={user.photoURL || ""}
                      alt={user.displayName || "Admin"}
                      className="w-8 h-8 rounded-full border border-[#34a853]/40"
                    />
                    <div className="text-left">
                      <div className="text-xs font-semibold text-white">{user.displayName}</div>
                      <div className="text-[10px] text-white/40">{user.email}</div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="p-1.5 hover:bg-white/10 rounded text-white/40 hover:text-white transition-colors cursor-pointer"
                      title="Sign Out"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Configured spreadsheet details status */}
            <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/40 font-medium">Auto-Sync Status:</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sheetConfig.autoSync}
                      onChange={(e) => handleToggleAutoSync(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#34a853]"></div>
                    <span className="ml-2 text-xs font-medium text-white/80">
                      {sheetConfig.autoSync ? "Enabled (New submits go straight to sheet)" : "Disabled (Manual Sync Only)"}
                    </span>
                  </label>
                </div>

                {sheetConfig.spreadsheetId ? (
                  <div className="space-y-2">
                    <div className="text-xs text-white/40">Connected Spreadsheet:</div>
                    <div className="flex items-center gap-2 bg-[#1a1a1a] border border-white/5 p-3 rounded-xl">
                      <FileSpreadsheet className="w-5 h-5 text-[#34a853] shrink-0" />
                      <div className="truncate text-xs font-mono text-white/80 flex-1">
                        {sheetConfig.spreadsheetId}
                      </div>
                      <a
                        href={`https://docs.google.com/spreadsheets/d/${sheetConfig.spreadsheetId}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1.5 bg-[#34a853]/10 text-[#34a853] hover:bg-[#34a853]/20 text-[11px] font-medium rounded-lg flex items-center gap-1 transition-colors"
                      >
                        Open <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-[#e8a034]/5 border border-[#e8a034]/20 rounded-xl flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-[#e8a034] shrink-0 mt-0.5" />
                    <div className="text-xs text-[#e8a034]/80 leading-relaxed">
                      You haven't linked a Google Sheet yet. Sign in above and click "Create Live Sheet" to build one dynamically in your Google Drive.
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-end gap-3">
                <div className="text-xs text-white/40 flex items-center justify-between">
                  <span>Last Synchronized At:</span>
                  <span className="font-mono font-medium text-white/80">
                    {sheetConfig.lastSyncedAt ? new Date(sheetConfig.lastSyncedAt).toLocaleString() : "Never"}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCreateSpreadsheet}
                    disabled={isLoading || !user}
                    className="flex-1 px-4 py-2.5 bg-brand-charcoal hover:bg-white/5 border border-white/10 text-white font-medium text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-40"
                  >
                    <PlusCircle className="w-4 h-4 text-[#d4af37]" /> Create Live Sheet
                  </button>
                  <button
                    onClick={handleManualSync}
                    disabled={isLoading || !sheetConfig.spreadsheetId}
                    className="flex-1 px-4 py-2.5 bg-[#34a853] hover:bg-[#2d9247] text-white font-medium text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-40"
                  >
                    {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                    Sync Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white/5 border border-white/5 p-4 rounded-xl">
              <span className="text-[10px] font-mono text-white/40 block uppercase">Total Submissions</span>
              <span className="text-2xl font-bold text-white mt-1 block">{invitations.length}</span>
            </div>
            <div className="bg-white/5 border border-white/5 p-4 rounded-xl">
              <span className="text-[10px] font-mono text-white/40 block uppercase">Total Guests Claimed</span>
              <span className="text-2xl font-bold text-[#d4af37] mt-1 block">{totalGuestsCount}</span>
            </div>
            <div className="bg-[#34a853]/5 border border-[#34a853]/10 p-4 rounded-xl">
              <span className="text-[10px] font-mono text-[#34a853] block uppercase">Confirmed Invites</span>
              <span className="text-2xl font-bold text-[#34a853] mt-1 block">{confirmedCount}</span>
            </div>
            <div className="bg-[#e8a034]/5 border border-[#e8a034]/10 p-4 rounded-xl">
              <span className="text-[10px] font-mono text-[#e8a034] block uppercase">Pending Review</span>
              <span className="text-2xl font-bold text-[#e8a034] mt-1 block">{pendingCount}</span>
            </div>
          </div>

          {/* Section 3: RSVP List Toolbar */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-[#d4af37]" /> RSVP Entry Registers ({filteredInvitations.length})
              </h4>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search name, email, phone..."
                    className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-xl px-2.5 py-1">
                  <Filter className="w-3.5 h-3.5 text-white/40" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-transparent text-xs text-white/80 border-none outline-none pr-1 py-1 cursor-pointer"
                  >
                    <option value="all" className="bg-[#1a1a1a]">All Status</option>
                    <option value="pending" className="bg-[#1a1a1a]">Pending</option>
                    <option value="confirmed" className="bg-[#1a1a1a]">Confirmed</option>
                    <option value="declined" className="bg-[#1a1a1a]">Declined</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-xl px-2.5 py-1">
                  <Sliders className="w-3.5 h-3.5 text-white/40" />
                  <select
                    value={professionFilter}
                    onChange={(e) => setProfessionFilter(e.target.value)}
                    className="bg-transparent text-xs text-white/80 border-none outline-none pr-1 py-1 cursor-pointer"
                  >
                    <option value="all" className="bg-[#1a1a1a]">All Profession</option>
                    <option value="Salary" className="bg-[#1a1a1a]">Salary</option>
                    <option value="Business" className="bg-[#1a1a1a]">Business</option>
                    <option value="other" className="bg-[#1a1a1a]">Not Specified</option>
                  </select>
                </div>
              </div>
            </div>

            {/* List Desktop Table */}
            <div className="border border-white/10 rounded-2xl overflow-hidden bg-[#161616]">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10 text-white/60 font-mono tracking-wider uppercase text-[10px]">
                      <th className="p-4 font-bold">Attendee Details</th>
                      <th className="p-4 font-bold">Contact</th>
                      <th className="p-4 font-bold">Location</th>
                      <th className="p-4 font-bold">Guests &amp; Profession</th>
                      <th className="p-4 font-bold">Status</th>
                      <th className="p-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredInvitations.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-12 text-center text-white/40 font-light">
                          No matching invitations found in database.
                        </td>
                      </tr>
                    ) : (
                      filteredInvitations.map((inv) => (
                        <tr key={inv.id} className="hover:bg-white/[0.02] transition-colors">
                          {/* Name & ID */}
                          <td className="p-4">
                            <div className="font-semibold text-white text-sm">{inv.full_name}</div>
                            <div className="text-[10px] text-white/30 font-mono mt-0.5">{inv.id}</div>
                            <div className="text-[10px] text-white/30 font-mono">
                              {new Date(inv.created_at).toLocaleString()}
                            </div>
                          </td>

                          {/* Email & Phone */}
                          <td className="p-4 space-y-1">
                            <div className="text-white/80 font-medium">{inv.email}</div>
                            <div className="text-white/50">
                              {inv.country_code} {inv.phone}
                            </div>
                          </td>

                          {/* City & Country */}
                          <td className="p-4">
                            <div className="text-white/80 flex items-center gap-1.5">
                              <Globe className="w-3.5 h-3.5 text-[#d4af37]" /> {inv.city_country}
                            </div>
                            <div className="text-[10px] text-white/30 mt-0.5">
                              Marketing Consent: {inv.marketing_consent ? "YES" : "NO"}
                            </div>
                          </td>

                          {/* Guests & Profession */}
                          <td className="p-4">
                            <div className="text-white/80 flex items-center gap-1.5">
                              <Users className="w-3.5 h-3.5 text-white/40" /> {inv.number_of_guests} {inv.number_of_guests === 1 ? "Guest" : "Guests"}
                            </div>
                            <span className="inline-block mt-1 px-2 py-0.5 rounded bg-white/5 text-[10px] text-white/60 uppercase font-bold tracking-wide">
                              {inv.profession || "Not Specified"}
                            </span>
                          </td>

                          {/* Status badge and selection dropdown */}
                          <td className="p-4">
                            <div className="flex flex-col gap-1.5">
                              {inv.invitation_status === "confirmed" && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#34a853] bg-[#34a853]/10 border border-[#34a853]/20 px-2 py-0.5 rounded-full w-fit uppercase">
                                  <Check className="w-3 h-3" /> Confirmed
                                </span>
                              )}
                              {inv.invitation_status === "pending" && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#e8a034] bg-[#e8a034]/10 border border-[#e8a034]/20 px-2 py-0.5 rounded-full w-fit uppercase">
                                  <Clock className="w-3 h-3 animate-pulse" /> Pending
                                </span>
                              )}
                              {inv.invitation_status === "declined" && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-400 bg-red-400/10 border border-red-400/20 px-2 py-0.5 rounded-full w-fit uppercase">
                                  <X className="w-3 h-3" /> Declined
                                </span>
                              )}

                              <select
                                value={inv.invitation_status}
                                onChange={(e) => handleStatusUpdate(inv.id, e.target.value)}
                                className="bg-white/5 border border-white/10 text-[11px] text-white/80 rounded px-1.5 py-0.5 max-w-[120px] outline-none cursor-pointer"
                              >
                                <option value="pending" className="bg-[#1a1a1a]">Pending</option>
                                <option value="confirmed" className="bg-[#1a1a1a]">Confirm</option>
                                <option value="declined" className="bg-[#1a1a1a]">Decline</option>
                              </select>
                            </div>
                          </td>

                          {/* Actions */}
                          <td className="p-4 text-right">
                            <button
                              onClick={() => handleDeleteInvitation(inv.id, inv.full_name)}
                              className="p-2 bg-red-950/20 hover:bg-red-900/40 border border-red-500/10 hover:border-red-500/30 text-red-400 rounded-lg transition-all cursor-pointer inline-flex items-center"
                              title="Delete RSVP"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-white/10 bg-[#151515] text-xs text-white/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
            <span>Secure Admin Portal. Direct integration with Google Cloud Workspace.</span>
          </div>
          <div>
            <span>Version 1.0.0 (Sheets Live Auto-Sync)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
