"use client";
import { useState, useEffect, Suspense, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Save, Upload, Link as LinkIcon, Image as ImageIcon, CalendarCheck, CheckCircle2, Clock, CheckCircle, X, Mail, Phone as PhoneIcon, Globe, Users, Calendar, Info, MessageCircle, AlertCircle, Sparkles, Undo2, Redo2, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

function ImageUploader({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <label className="block text-xs font-sans text-warmgray uppercase tracking-wider font-semibold">Image Path / URL</label>
        <span className="text-[10px] text-warmgray font-sans italic">Example: /images/rooms/room-1.jpg</span>
      </div>

      {value && (
        <div className="relative w-full h-40 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 dark:border-white/10 group mb-3">
          <Image src={value} alt="Preview" fill className="object-cover" unoptimized />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <ImageIcon className="w-6 h-6 text-white drop-shadow-md" />
          </div>
        </div>
      )}

      <div className="relative">
        <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-warmgray" />
        <input 
          type="text" 
          value={value} 
          onChange={(e) => onChange(e.target.value)} 
          placeholder="/images/rooms/..."
          className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-midnight dark:text-white focus:outline-none focus:border-champagne transition-colors" 
        />
      </div>
      <p className="text-[10px] text-warmgray px-1">Tip: Upload images to your GitHub repository in the <code>public/images/</code> folder to use them here.</p>
    </div>
  );
}

const HISTORY_LIMIT = 5;

function AddAddonRow({ onAdd }: { onAdd: (name: string, price: number) => void }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  return (
    <div className="flex items-center gap-2 p-3 rounded-xl border border-dashed border-champagne/40 bg-champagne/5">
      <input
        type="text"
        placeholder="Add-on name (e.g. Airport Pickup)"
        value={name}
        onChange={e => setName(e.target.value)}
        onKeyDown={e => { if (e.key === "Enter") { onAdd(name, parseInt(price) || 0); setName(""); setPrice(""); } }}
        className="flex-1 bg-transparent text-sm text-midnight dark:text-white placeholder-warmgray focus:outline-none"
      />
      <div className="relative w-24 shrink-0">
        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-warmgray text-xs">₹</span>
        <input
          type="number"
          placeholder="0"
          value={price}
          onChange={e => setPrice(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") { onAdd(name, parseInt(price) || 0); setName(""); setPrice(""); } }}
          className="w-full pl-5 pr-2 py-1.5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm text-midnight dark:text-white focus:outline-none focus:border-champagne transition-colors"
        />
      </div>
      <button
        onClick={() => { onAdd(name, parseInt(price) || 0); setName(""); setPrice(""); }}
        className="shrink-0 p-1.5 bg-champagne hover:bg-champagne/80 text-midnight rounded-lg transition-colors"
        title="Add add-on"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}


function DashboardContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "overview";
  const [data, setData] = useState<{ rooms: any[], packages: any[], bookings: any[], settings?: any } | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [showAddPkg, setShowAddPkg] = useState(false);
  const [newRoom, setNewRoom] = useState({ name: "", basePrice: "", guests: "", desc: "", image: "/images/rooms/default.jpg", availability: "Available" });
  const [newPkg, setNewPkg] = useState({ title: "", basePrice: "", duration: "", desc: "", image: "/images/packages/default.jpg" });
  const historyRef = useRef<any[]>([]);
  const futureRef = useRef<any[]>([]);

  const pushHistory = useCallback((prev: any) => {
    historyRef.current = [...historyRef.current.slice(-HISTORY_LIMIT + 1), JSON.parse(JSON.stringify(prev))];
    futureRef.current = [];
  }, []);

  const setDataWithHistory = useCallback((updater: (prev: any) => any) => {
    setData(prev => {
      if (!prev) return prev;
      pushHistory(prev);
      return updater(prev);
    });
  }, [pushHistory]);

  const undo = () => {
    if (!historyRef.current.length || !data) return;
    const prev = historyRef.current.pop()!;
    futureRef.current = [JSON.parse(JSON.stringify(data)), ...futureRef.current.slice(0, HISTORY_LIMIT - 1)];
    setData(prev);
    toast("Undone", { icon: "↩️" });
  };

  const redo = () => {
    if (!futureRef.current.length || !data) return;
    const next = futureRef.current.shift()!;
    historyRef.current = [...historyRef.current.slice(-HISTORY_LIMIT + 1), JSON.parse(JSON.stringify(data))];
    setData(next);
    toast("Redone", { icon: "↪️" });
  };

  useEffect(() => {
    fetch("/api/admin/data")
      .then((res) => res.json())
      .then((d) => { 
        setData({
          ...d,
          bookings: d.bookings || []
        }); 
        setLoading(false); 
      })
      .catch(() => { toast.error("Failed to load data"); setLoading(false); });
  }, []);

  const handleSave = async (silent = false) => {
    if (!silent) setSaving(true);
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        if (!silent) toast.success("Changes published live!");
      } else {
        toast.error("Failed to save changes");
      }
    } catch {
      toast.error("Network error");
    } finally {
      if (!silent) setSaving(false);
    }
  };

  const updateBookingStatus = (id: string, newStatus: string) => {
    if (!data) return;
    const newBookings = data.bookings.map(b => b.id === id ? { ...b, status: newStatus } : b);
    const newData = { ...data, bookings: newBookings };
    setData(newData);
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking({ ...selectedBooking, status: newStatus });
    }
    // Auto-save status changes
    setTimeout(() => {
      fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData)
      });
    }, 100);
    toast.success(`Booking marked as ${newStatus}`);
  };

  if (loading || !data) return (
    <div className="flex items-center justify-center h-[60vh]"><Loader2 className="w-8 h-8 animate-spin text-champagne" /></div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white dark:bg-[#131323] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-midnight dark:text-white capitalize">{tab} Manager</h1>
          <p className="text-sm text-warmgray dark:text-gray-400 font-sans mt-1">Manage homestay data and customer bookings.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={undo} title="Undo" disabled={!historyRef.current.length} className="p-2.5 rounded-xl border border-gray-200 dark:border-white/10 text-warmgray hover:text-midnight dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-30 transition-all">
            <Undo2 className="w-4 h-4" />
          </button>
          <button onClick={redo} title="Redo" disabled={!futureRef.current.length} className="p-2.5 rounded-xl border border-gray-200 dark:border-white/10 text-warmgray hover:text-midnight dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-30 transition-all">
            <Redo2 className="w-4 h-4" />
          </button>
          <button onClick={() => handleSave()} disabled={saving} className="btn-primary flex items-center gap-2 whitespace-nowrap text-sm py-2.5 px-6">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Publish Changes
          </button>
        </div>
      </div>

      {tab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-[#131323] border border-gray-100 dark:border-white/5 p-6 rounded-2xl shadow-sm"><h3 className="text-sm font-sans text-warmgray mb-1 uppercase tracking-wider font-semibold">Total Rooms</h3><p className="text-4xl font-serif font-bold text-midnight dark:text-white">{data.rooms.length}</p></div>
          <div className="bg-white dark:bg-[#131323] border border-gray-100 dark:border-white/5 p-6 rounded-2xl shadow-sm"><h3 className="text-sm font-sans text-warmgray mb-1 uppercase tracking-wider font-semibold">Active Packages</h3><p className="text-4xl font-serif font-bold text-midnight dark:text-white">{data.packages.length}</p></div>
          <div className="bg-white dark:bg-[#131323] border border-gray-100 dark:border-white/5 p-6 rounded-2xl shadow-sm"><h3 className="text-sm font-sans text-warmgray mb-1 uppercase tracking-wider font-semibold">New Bookings</h3><p className="text-4xl font-serif font-bold text-rose-500">{data.bookings.filter(b => b.status === "Pending").length}</p></div>
        </div>
      )}

      {tab === "rooms" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {data.rooms.map((room, i) => (
              <div key={room.id || i} className="bg-white dark:bg-[#131323] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 space-y-6 flex flex-col">
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-4">
                  <h3 className="font-serif font-bold text-lg text-midnight dark:text-white">{room.name || "New Room"}</h3>
                  <div className="flex items-center gap-2">
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Live</span>
                    <button onClick={() => { setDataWithHistory(p => ({ ...p, rooms: p.rooms.filter((_:any,j:number) => j !== i) })); toast.success("Room removed"); }} className="p-1.5 text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
                <ImageUploader value={room.image} onChange={(val) => { setDataWithHistory(p => { const r=[...p.rooms]; r[i]={...r[i],image:val}; return {...p,rooms:r}; }); }} />
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs font-sans text-warmgray uppercase tracking-wider font-semibold mb-1">Room Title</label>
                    <input type="text" value={room.name} onChange={e => { setDataWithHistory(p => { const r=[...p.rooms]; r[i]={...r[i],name:e.target.value}; return {...p,rooms:r}; }); }} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-midnight dark:text-white focus:outline-none focus:border-champagne transition-colors" />
                  </div>
                  <div><label className="block text-xs font-sans text-warmgray uppercase tracking-wider font-semibold mb-1">Base Price (₹)</label><input type="number" value={room.basePrice} onChange={e => { setDataWithHistory(p => { const r=[...p.rooms]; r[i]={...r[i],basePrice:parseInt(e.target.value)}; return {...p,rooms:r}; }); }} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-midnight dark:text-white focus:outline-none focus:border-champagne transition-colors" /></div>
                  <div><label className="block text-xs font-sans text-warmgray uppercase tracking-wider font-semibold mb-1">Guest Capacity</label><input type="text" value={room.guests} onChange={e => { setDataWithHistory(p => { const r=[...p.rooms]; r[i]={...r[i],guests:e.target.value}; return {...p,rooms:r}; }); }} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-midnight dark:text-white focus:outline-none focus:border-champagne transition-colors" /></div>
                  <div className="col-span-2"><label className="block text-xs font-sans text-warmgray uppercase tracking-wider font-semibold mb-1">Description</label><textarea rows={3} value={room.desc} onChange={e => { setDataWithHistory(p => { const r=[...p.rooms]; r[i]={...r[i],desc:e.target.value}; return {...p,rooms:r}; }); }} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-midnight dark:text-white focus:outline-none focus:border-champagne transition-colors resize-none" /></div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setShowAddRoom(true)} className="w-full py-4 border-2 border-dashed border-champagne/30 hover:border-champagne text-champagne hover:bg-champagne/5 rounded-2xl font-sans font-semibold text-sm flex items-center justify-center gap-2 transition-all">
            <Plus className="w-5 h-5" /> Add New Room
          </button>
        </div>
      )}

      {tab === "packages" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {data.packages.map((pkg, i) => (
              <div key={pkg.id || i} className="bg-white dark:bg-[#131323] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 space-y-6 flex flex-col">
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-4">
                  <h3 className="font-serif font-bold text-lg text-midnight dark:text-white">{pkg.title || "New Package"}</h3>
                  <div className="flex items-center gap-2">
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Live</span>
                    <button onClick={() => { setDataWithHistory(p => ({ ...p, packages: p.packages.filter((_:any,j:number) => j !== i) })); toast.success("Package removed"); }} className="p-1.5 text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
                <ImageUploader value={pkg.image} onChange={(val) => { setDataWithHistory(p => { const pk=[...p.packages]; pk[i]={...pk[i],image:val}; return {...p,packages:pk}; }); }} />
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs font-sans text-warmgray uppercase tracking-wider font-semibold mb-1">Package Title</label>
                    <input type="text" value={pkg.title} onChange={e => { setDataWithHistory(p => { const pk=[...p.packages]; pk[i]={...pk[i],title:e.target.value}; return {...p,packages:pk}; }); }} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-midnight dark:text-white focus:outline-none focus:border-champagne transition-colors" />
                  </div>
                  <div><label className="block text-xs font-sans text-warmgray uppercase tracking-wider font-semibold mb-1">Price (₹)</label><input type="number" value={pkg.basePrice} onChange={e => { setDataWithHistory(p => { const pk=[...p.packages]; pk[i]={...pk[i],basePrice:parseInt(e.target.value)}; return {...p,packages:pk}; }); }} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-midnight dark:text-white focus:outline-none focus:border-champagne transition-colors" /></div>
                  <div><label className="block text-xs font-sans text-warmgray uppercase tracking-wider font-semibold mb-1">Duration</label><input type="text" value={pkg.duration} onChange={e => { setDataWithHistory(p => { const pk=[...p.packages]; pk[i]={...pk[i],duration:e.target.value}; return {...p,packages:pk}; }); }} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-midnight dark:text-white focus:outline-none focus:border-champagne transition-colors" /></div>
                  <div className="col-span-2"><label className="block text-xs font-sans text-warmgray uppercase tracking-wider font-semibold mb-1">Description</label><textarea rows={3} value={pkg.desc} onChange={e => { setDataWithHistory(p => { const pk=[...p.packages]; pk[i]={...pk[i],desc:e.target.value}; return {...p,packages:pk}; }); }} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-midnight dark:text-white focus:outline-none focus:border-champagne transition-colors resize-none" /></div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setShowAddPkg(true)} className="w-full py-4 border-2 border-dashed border-champagne/30 hover:border-champagne text-champagne hover:bg-champagne/5 rounded-2xl font-sans font-semibold text-sm flex items-center justify-center gap-2 transition-all">
            <Plus className="w-5 h-5" /> Add New Package
          </button>
        </div>
      )}

      {tab === "bookings" && (
        <div className="bg-white dark:bg-[#131323] rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-sm">
              <thead className="bg-gray-50 dark:bg-white/5 text-warmgray uppercase tracking-wider text-[11px] font-bold">
                <tr>
                  <th className="px-6 py-4">Booking ID</th>
                  <th className="px-6 py-4">Guest Name</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Stay / Package</th>
                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/5 text-midnight dark:text-gray-300">
                {data.bookings.length === 0 ? (
                  <tr><td colSpan={5} className="px-6 py-12 text-center text-warmgray">No bookings found in the database.</td></tr>
                ) : (
                  data.bookings.map((b) => (
                    <tr 
                      key={b.id} 
                      onClick={() => setSelectedBooking(b)}
                      className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group"
                    >
                      <td className="px-6 py-4 font-mono text-xs group-hover:text-champagne transition-colors">#{b.id}</td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-midnight dark:text-white">{b.name}</div>
                        <div className="text-[10px] text-warmgray">{b.phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/10 uppercase">{b.type?.split(' ')[0] || 'Inquiry'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-[200px] truncate font-serif text-xs">{b.roomType || b.packageDuration || 'General Inquiry'}</div>
                        <div className="text-[10px] text-warmgray">{b.checkIn}</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          b.status === "Pending" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                          b.status === "Confirmed" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                          b.status === "Completed" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                          "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                        }`}>
                          {b.status === "Pending" ? <Clock className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "settings" && data.settings && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Global Rates */}
            <div className="bg-white dark:bg-[#131323] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 space-y-4">
              <h3 className="font-serif font-bold text-lg text-midnight dark:text-white border-b border-gray-100 dark:border-white/5 pb-3">Global Rates</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-sans text-warmgray uppercase tracking-wider font-semibold mb-1">Hourly Extension Rate (₹)</label>
                  <input type="number" value={data.settings.hourlyRate || 0} onChange={e => setDataWithHistory(p => ({ ...p, settings: { ...p.settings, hourlyRate: parseInt(e.target.value) || 0 } }))} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-midnight dark:text-white focus:outline-none focus:border-champagne transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-sans text-warmgray uppercase tracking-wider font-semibold mb-1">Tax Percentage (%)</label>
                  <input type="number" value={data.settings.taxes || 0} onChange={e => setDataWithHistory(p => ({ ...p, settings: { ...p.settings, taxes: parseInt(e.target.value) || 0 } }))} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-midnight dark:text-white focus:outline-none focus:border-champagne transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-sans text-warmgray uppercase tracking-wider font-semibold mb-1">Seasonal Rate Multiplier (e.g. 1.2 for 20% extra)</label>
                  <input type="number" step="0.1" value={data.settings.seasonalRateMultiplier || 1} onChange={e => setDataWithHistory(p => ({ ...p, settings: { ...p.settings, seasonalRateMultiplier: parseFloat(e.target.value) || 1 } }))} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-midnight dark:text-white focus:outline-none focus:border-champagne transition-colors" />
                </div>
              </div>
            </div>

            {/* Add-on Prices - Full CRUD */}
            <div className="bg-white dark:bg-[#131323] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-3">
                <h3 className="font-serif font-bold text-lg text-midnight dark:text-white">Add-on Prices</h3>
                <span className="text-[10px] font-bold text-warmgray uppercase tracking-wider bg-gray-100 dark:bg-white/5 px-3 py-1 rounded-full">
                  {Object.keys(data.settings.addonPrices || {}).length} add-ons
                </span>
              </div>

              {/* Add New Add-on Row */}
              <AddAddonRow onAdd={(name: string, price: number) => {
                if (!name.trim()) { toast.error("Add-on name is required"); return; }
                if (data.settings.addonPrices?.[name]) { toast.error("This add-on already exists"); return; }
                setDataWithHistory(p => ({
                  ...p,
                  settings: {
                    ...p.settings,
                    addonPrices: { ...p.settings.addonPrices, [name]: price }
                  }
                }));
                toast.success("Add-on added! Click Publish to go live.");
              }} />

              {/* Existing Add-ons List */}
              <div className="max-h-[340px] overflow-y-auto space-y-2 pr-1">
                {Object.entries(data.settings.addonPrices || {}).length === 0 && (
                  <p className="text-sm text-warmgray text-center py-6">No add-ons yet. Add one above.</p>
                )}
                {Object.entries(data.settings.addonPrices || {}).map(([addon, price]) => (
                  <div key={addon} className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                    <div className="flex-1 text-sm font-sans text-midnight dark:text-white truncate">{addon}</div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <div className="relative w-28">
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-warmgray text-xs">₹</span>
                        <input
                          type="number"
                          value={price as number}
                          onChange={e => setDataWithHistory(p => ({
                            ...p,
                            settings: { ...p.settings, addonPrices: { ...p.settings.addonPrices, [addon]: parseInt(e.target.value) || 0 } }
                          }))}
                          className="w-full pl-6 pr-2 py-1.5 bg-white dark:bg-[#131323] border border-gray-200 dark:border-white/10 rounded-lg text-sm text-midnight dark:text-white focus:outline-none focus:border-champagne transition-colors"
                        />
                      </div>
                      <button
                        onClick={() => {
                          setDataWithHistory(p => {
                            const updated = { ...p.settings.addonPrices };
                            delete updated[addon];
                            return { ...p, settings: { ...p.settings, addonPrices: updated } };
                          });
                          toast.success(`"${addon}" removed.`);
                        }}
                        className="p-1.5 text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors"
                        title="Remove add-on"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Room Modal */}
      <AnimatePresence>
        {showAddRoom && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1001] flex items-center justify-center bg-midnight/80 backdrop-blur-md p-4" onClick={() => setShowAddRoom(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={e => e.stopPropagation()} className="bg-white dark:bg-[#131323] w-full max-w-lg rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
              <div className="p-5 bg-gradient-ocean flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-white">Add New Room</h3>
                <button onClick={() => setShowAddRoom(false)} className="p-1.5 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors"><X className="w-4 h-4" /></button>
              </div>
              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                {[["Room Name", "name", "text"], ["Base Price (₹)", "basePrice", "number"], ["Guest Capacity", "guests", "text"], ["Availability", "availability", "text"]].map(([label, key, type]) => (
                  <div key={key}>
                    <label className="block text-xs font-sans text-warmgray uppercase tracking-wider font-semibold mb-1">{label}</label>
                    <input type={type} value={(newRoom as any)[key]} onChange={e => setNewRoom(p => ({ ...p, [key]: e.target.value }))} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-midnight dark:text-white focus:outline-none focus:border-champagne transition-colors" />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-sans text-warmgray uppercase tracking-wider font-semibold mb-1">Image URL</label>
                  <input type="text" placeholder="https://..." value={newRoom.image} onChange={e => setNewRoom(p => ({ ...p, image: e.target.value }))} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-midnight dark:text-white focus:outline-none focus:border-champagne transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-sans text-warmgray uppercase tracking-wider font-semibold mb-1">Description</label>
                  <textarea rows={3} value={newRoom.desc} onChange={e => setNewRoom(p => ({ ...p, desc: e.target.value }))} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-midnight dark:text-white focus:outline-none focus:border-champagne transition-colors resize-none" />
                </div>
              </div>
              <div className="p-5 bg-gray-50 dark:bg-white/5 border-t border-gray-100 dark:border-white/5 flex gap-3">
                <button onClick={() => setShowAddRoom(false)} className="flex-1 py-2.5 text-xs font-bold border border-gray-200 dark:border-white/10 rounded-xl text-warmgray hover:bg-white transition-colors">Cancel</button>
                <button onClick={() => {
                  if (!newRoom.name.trim()) { toast.error("Room name is required"); return; }
                  setDataWithHistory(p => ({ ...p, rooms: [...p.rooms, { ...newRoom, id: `room-${Date.now()}`, basePrice: parseInt(newRoom.basePrice as any) || 0, features: [], amenities: [] }] }));
                  setNewRoom({ name: "", basePrice: "", guests: "", desc: "", image: "", availability: "Available" });
                  setShowAddRoom(false);
                  toast.success("Room added! Click Publish to go live.");
                }} className="flex-1 btn-primary py-2.5 text-xs flex items-center justify-center gap-2"><Plus className="w-4 h-4" /> Add Room</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Package Modal */}
      <AnimatePresence>
        {showAddPkg && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1001] flex items-center justify-center bg-midnight/80 backdrop-blur-md p-4" onClick={() => setShowAddPkg(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={e => e.stopPropagation()} className="bg-white dark:bg-[#131323] w-full max-w-lg rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
              <div className="p-5 bg-gradient-ocean flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-white">Add New Package</h3>
                <button onClick={() => setShowAddPkg(false)} className="p-1.5 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors"><X className="w-4 h-4" /></button>
              </div>
              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                {[["Package Name", "title", "text"], ["Base Price (₹)", "basePrice", "number"], ["Duration (e.g. 3N/4D)", "duration", "text"]].map(([label, key, type]) => (
                  <div key={key}>
                    <label className="block text-xs font-sans text-warmgray uppercase tracking-wider font-semibold mb-1">{label}</label>
                    <input type={type} value={(newPkg as any)[key]} onChange={e => setNewPkg(p => ({ ...p, [key]: e.target.value }))} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-midnight dark:text-white focus:outline-none focus:border-champagne transition-colors" />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-sans text-warmgray uppercase tracking-wider font-semibold mb-1">Image URL</label>
                  <input type="text" placeholder="https://..." value={newPkg.image} onChange={e => setNewPkg(p => ({ ...p, image: e.target.value }))} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-midnight dark:text-white focus:outline-none focus:border-champagne transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-sans text-warmgray uppercase tracking-wider font-semibold mb-1">Description</label>
                  <textarea rows={3} value={newPkg.desc} onChange={e => setNewPkg(p => ({ ...p, desc: e.target.value }))} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-midnight dark:text-white focus:outline-none focus:border-champagne transition-colors resize-none" />
                </div>
              </div>
              <div className="p-5 bg-gray-50 dark:bg-white/5 border-t border-gray-100 dark:border-white/5 flex gap-3">
                <button onClick={() => setShowAddPkg(false)} className="flex-1 py-2.5 text-xs font-bold border border-gray-200 dark:border-white/10 rounded-xl text-warmgray hover:bg-white transition-colors">Cancel</button>
                <button onClick={() => {
                  if (!newPkg.title.trim()) { toast.error("Package name is required"); return; }
                  setDataWithHistory(p => ({ ...p, packages: [...p.packages, { ...newPkg, id: `pkg-${Date.now()}`, basePrice: parseInt(newPkg.basePrice as any) || 0, includes: [], highlights: [] }] }));
                  setNewPkg({ title: "", basePrice: "", duration: "", desc: "", image: "" });
                  setShowAddPkg(false);
                  toast.success("Package added! Click Publish to go live.");
                }} className="flex-1 btn-primary py-2.5 text-xs flex items-center justify-center gap-2"><Plus className="w-4 h-4" /> Add Package</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Detail Modal */}
      <AnimatePresence>
        {selectedBooking && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-midnight/80 backdrop-blur-md p-4"
            onClick={() => setSelectedBooking(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white dark:bg-[#131323] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            >
              <div className="p-6 bg-gradient-ocean flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-1">Booking Details</div>
                  <h3 className="font-serif text-xl font-bold text-white">#{selectedBooking.id} — {selectedBooking.name}</h3>
                </div>
                <button onClick={() => setSelectedBooking(null)} className="p-2 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-h-[70vh] overflow-y-auto">
                {/* Guest Profile */}
                <div className="space-y-6">
                  <div>
                    <h4 className="flex items-center gap-2 text-xs font-bold text-champagne uppercase tracking-widest mb-4"><Users className="w-3.5 h-3.5" /> Guest Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm font-sans"><PhoneIcon className="w-4 h-4 text-warmgray" /> {selectedBooking.phone}</div>
                      <div className="flex items-center gap-3 text-sm font-sans"><Mail className="w-4 h-4 text-warmgray" /> {selectedBooking.email || 'N/A'}</div>
                      <div className="flex items-center gap-3 text-sm font-sans"><Globe className="w-4 h-4 text-warmgray" /> {selectedBooking.country || 'India'}</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 dark:border-white/5">
                    <h4 className="flex items-center gap-2 text-xs font-bold text-champagne uppercase tracking-widest mb-4"><Calendar className="w-3.5 h-3.5" /> Stay Details</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div><div className="text-[10px] text-warmgray uppercase mb-1">Check In</div><div className="text-sm font-semibold">{selectedBooking.checkIn}</div></div>
                      <div><div className="text-[10px] text-warmgray uppercase mb-1">Check Out</div><div className="text-sm font-semibold">{selectedBooking.checkOut || 'N/A'}</div></div>
                      <div><div className="text-[10px] text-warmgray uppercase mb-1">Guests</div><div className="text-sm font-semibold">{selectedBooking.guests}</div></div>
                    </div>
                  </div>
                </div>

                {/* Requirements */}
                <div className="space-y-6">
                  <div>
                    <h4 className="flex items-center gap-2 text-xs font-bold text-champagne uppercase tracking-widest mb-4"><Info className="w-3.5 h-3.5" /> Selected Option</h4>
                    <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5">
                      <p className="font-serif font-bold text-midnight dark:text-white">{selectedBooking.roomType || selectedBooking.packageDuration || 'General Inquiry'}</p>
                      <p className="text-[10px] text-warmgray mt-1 uppercase tracking-wider">{selectedBooking.type}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="flex items-center gap-2 text-xs font-bold text-champagne uppercase tracking-widest mb-4"><Sparkles className="w-3.5 h-3.5" /> Add-ons & Notes</h4>
                    <div className="space-y-3">
                      <div className="text-sm font-sans bg-gray-50 dark:bg-white/5 p-4 rounded-xl italic">
                        &quot;{selectedBooking.notes || 'No special requests provided.'}&quot;
                      </div>
                      {selectedBooking.addons && (
                        <div className="text-xs text-warmgray font-sans">
                          <span className="font-bold text-midnight dark:text-gray-300">Add-ons:</span> {selectedBooking.addons}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Actions */}
              <div className="p-6 bg-gray-50 dark:bg-white/5 border-t border-gray-100 dark:border-white/5 flex flex-wrap gap-3">
                <button onClick={() => updateBookingStatus(selectedBooking.id, "Confirmed")} className="flex-1 btn-primary py-2.5 text-xs flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Accept & Confirm
                </button>
                <button onClick={() => updateBookingStatus(selectedBooking.id, "Rejected")} className="flex-1 bg-rose-500 hover:bg-rose-600 text-white rounded-xl py-2.5 text-xs font-bold transition-colors flex items-center justify-center gap-2">
                  <AlertCircle className="w-4 h-4" /> Reject Booking
                </button>
                <button onClick={() => updateBookingStatus(selectedBooking.id, "Completed")} className="w-full md:w-auto px-6 py-2.5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-bold text-warmgray hover:bg-white hover:text-midnight transition-colors">
                  Mark as Completed
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<div className="flex justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-champagne" /></div>}>
      <DashboardContent />
    </Suspense>
  );
}
