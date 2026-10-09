'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { CargoTracking } from '../../lib/types';
import * as xlsx from 'xlsx';

const ADMIN_PASSWORD = 'admintanti';

// Tipe untuk Form Manual
type FormData = {
  id?: string;
  ponum_pib: string;
  pengirim: string;
  hawb: string;
  mawb: string;
  quantity: string;
  weight: string;
  fl1Route: string;
  fl1Flight: string;
  fl1Dep: string;
  fl1Arr: string;
  fl2Route: string;
  fl2Flight: string;
  fl2Dep: string;
  fl2Arr: string;
};

const initialForm: FormData = {
  ponum_pib: '', pengirim: '', hawb: '', mawb: '', quantity: '', weight: '',
  fl1Route: '', fl1Flight: '', fl1Dep: '', fl1Arr: '',
  fl2Route: '', fl2Flight: '', fl2Dep: '', fl2Arr: ''
};

export default function AdminPanel() {
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState<CargoTracking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadStatus, setUploadStatus] = useState('');
  
  // State untuk Modal Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [isSaving, setIsSaving] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      fetchData();
    } else {
      alert('Password salah!');
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    if (!supabase) return;
    const { data: records, error } = await supabase
      .from('cargo_tracking')
      .select('*')
      .order('id');
      
    if (!error && records) {
      setData(records as CargoTracking[]);
    }
    setIsLoading(false);
  };

  // ================= EXPORT EXCEL =================
  const handleExportExcel = () => {
    // Array of Arrays agar header duplikat (seperti FLIGHT, TIME) bisa ditoleransi
    const aoa: any[][] = [
      ['NO ', 'PONUM_PIB', 'PENGIRIM', 'HAWB ', 'MAWB ', 'QUANTITY (CASE) ', 'WEIGHT (KGS) ', 'ORIGIN', 'FLIGHT ', 'DEPARTED ', 'TIME ', 'ARRIVED ', 'TIME', 'DESTINATION', 'FLIGHT ', 'DEPARTED ', 'TIME ', 'ARRIVED', 'TIME']
    ];

    data.forEach((item, idx) => {
      // Ekstrak Qty & Weight dari "1 pcs / 15 kg"
      const pwMatch = item.pieces_weight?.match(/([\d\.]+)\s*pcs\s*\/\s*([\d\.]+)\s*kg/i);
      const qty = pwMatch ? pwMatch[1] : '';
      const wt = pwMatch ? pwMatch[2] : '';

      const f1 = item.flights?.[0] || { flight: '', route: '', departed: '', arrived: '' };
      const f2 = item.flights?.[1] || { flight: '', route: '', departed: '', arrived: '' };

      // Pisah "24 May 2025 16:55" jadi Date dan Time
      const splitDT = (dt: string) => {
        if (!dt || dt === 'TBA') return ['', ''];
        const parts = dt.split(' ');
        if (parts.length >= 4) {
          const time = parts.pop(); // Ambil elemen terakhir sbg jam
          return [parts.join(' '), time];
        }
        return [dt, ''];
      };

      const [f1DepD, f1DepT] = splitDT(f1.departed);
      const [f1ArrD, f1ArrT] = splitDT(f1.arrived);
      const [f2DepD, f2DepT] = splitDT(f2.departed);
      const [f2ArrD, f2ArrT] = splitDT(f2.arrived);

      aoa.push([
        idx + 1, item.ponum_pib, item.pengirim, item.hawb, item.mawb, qty, wt,
        f1.route, f1.flight, f1DepD, f1DepT, f1ArrD, f1ArrT,
        f2.route, f2.flight, f2DepD, f2DepT, f2ArrD, f2ArrT
      ]);
    });

    const ws = xlsx.utils.aoa_to_sheet(aoa);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "TrackingData");
    xlsx.writeFile(wb, `Cargo_Tracking_Export_${new Date().toISOString().slice(0,10)}.xlsx`);
  };

  // ================= UPLOAD EXCEL =================
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !supabase) return;

    if (!confirm('Peringatan: Mengunggah Excel akan menghapus dan mengganti SEMUA data yang ada di database saat ini. Lanjutkan?')) {
      e.target.value = '';
      return;
    }

    setUploadStatus('Membaca file Excel...');
    
    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = xlsx.read(bstr, { type: 'binary', cellDates: false });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows = xlsx.utils.sheet_to_json<any[]>(ws, { header: 1, defval: '', raw: false }).slice(1);

        setUploadStatus('Memproses format data...');
        const records = processExcelRows(rows);

        setUploadStatus('Menghapus data lama di database...');
        const { error: delError } = await supabase!.from('cargo_tracking').delete().gte('id', 0);
        if (delError) throw delError;

        setUploadStatus(`Mengunggah ${records.length} data baru...`);
        const { error: insError } = await supabase!.from('cargo_tracking').insert(records);
        if (insError) throw insError;

        setUploadStatus(`✅ Berhasil! ${records.length} data diperbarui.`);
        fetchData();
      } catch (error: any) {
        console.error(error);
        setUploadStatus('❌ Error: ' + error.message);
      }
    };
    reader.readAsBinaryString(file);
  };

  const processExcelRows = (rows: any[]) => {
    const text = (v: any) => String(v ?? '').trim();
    const records: any[] = [];
    let idCounter = 1;

    for (const row of rows) {
      const ponumPib = row[1];
      const pengirim = row[2];
      const hawb = row[3];
      const mawb = row[4];
      if (!text(hawb) && !text(mawb)) continue;

      const quantity = row[5];
      const weight = row[6];
      const piecesWeight = (text(quantity) && text(weight)) ? `${text(quantity)} pcs / ${text(weight)} kg` : '-';
      
      const flights = [];
      const fl1Route = text(row[7]);
      const fl1Flight = text(row[8]);
      if (fl1Flight || fl1Route) {
        flights.push({
          flight: fl1Flight, route: fl1Route,
          departed: [text(row[9]), text(row[10]).slice(0,5)].filter(Boolean).join(' ') || 'TBA',
          arrived: [text(row[11]), text(row[12]).slice(0,5)].filter(Boolean).join(' ') || 'TBA'
        });
      }

      const fl2Route = text(row[13]);
      const fl2Flight = text(row[14]);
      if (fl2Flight || fl2Route) {
        flights.push({
          flight: fl2Flight, route: fl2Route,
          departed: [text(row[15]), text(row[16]).slice(0,5)].filter(Boolean).join(' ') || 'TBA',
          arrived: [text(row[17]), text(row[18]).slice(0,5)].filter(Boolean).join(' ') || 'TBA'
        });
      }

      const routing = [fl1Route, fl2Route].filter(Boolean).join(' → ').replace(/ - /g, '-').replace(/→/g, '→').replace(/\s+/g, ' ').replace(/-([A-Z])/g, ' - $1');

      const item = {
        id: String(idCounter++),
        ponum_pib: text(ponumPib),
        pengirim: text(pengirim),
        hawb: text(hawb),
        mawb: text(mawb),
        pieces_weight: piecesWeight,
        routing: routing || 'Standard Route',
        flights: flights,
        search_text: [text(ponumPib), text(pengirim), text(hawb), text(mawb), routing].join(' ').toUpperCase()
      };
      records.push(item);
    }
    return records;
  };

  // ================= ADD / EDIT MANUAL =================
  const openAddForm = () => {
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const openEditForm = (item: CargoTracking) => {
    const pwMatch = item.pieces_weight?.match(/([\d\.]+)\s*pcs\s*\/\s*([\d\.]+)\s*kg/i);
    const f1 = item.flights?.[0] || { flight: '', route: '', departed: '', arrived: '' };
    const f2 = item.flights?.[1] || { flight: '', route: '', departed: '', arrived: '' };

    setFormData({
      id: item.id,
      ponum_pib: item.ponum_pib,
      pengirim: item.pengirim,
      hawb: item.hawb,
      mawb: item.mawb,
      quantity: pwMatch ? pwMatch[1] : '',
      weight: pwMatch ? pwMatch[2] : '',
      fl1Route: f1.route, fl1Flight: f1.flight, fl1Dep: f1.departed, fl1Arr: f1.arrived,
      fl2Route: f2.route, fl2Flight: f2.flight, fl2Dep: f2.departed, fl2Arr: f2.arrived,
    });
    setIsModalOpen(true);
  };

  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setIsSaving(true);

    const flights = [];
    if (formData.fl1Flight || formData.fl1Route) {
      flights.push({ flight: formData.fl1Flight, route: formData.fl1Route, departed: formData.fl1Dep || 'TBA', arrived: formData.fl1Arr || 'TBA' });
    }
    if (formData.fl2Flight || formData.fl2Route) {
      flights.push({ flight: formData.fl2Flight, route: formData.fl2Route, departed: formData.fl2Dep || 'TBA', arrived: formData.fl2Arr || 'TBA' });
    }

    const pieces_weight = (formData.quantity && formData.weight) ? `${formData.quantity} pcs / ${formData.weight} kg` : '-';
    const routing = [formData.fl1Route, formData.fl2Route].filter(Boolean).join(' → ').replace(/ - /g, '-').replace(/→/g, '→').replace(/\s+/g, ' ').replace(/-([A-Z])/g, ' - $1');
    const search_text = [formData.ponum_pib, formData.pengirim, formData.hawb, formData.mawb, routing].join(' ').toUpperCase();

    const record = {
      ponum_pib: formData.ponum_pib,
      pengirim: formData.pengirim,
      hawb: formData.hawb,
      mawb: formData.mawb,
      pieces_weight,
      routing,
      flights,
      search_text
    };

    try {
      if (formData.id) {
        // Update
        const { error } = await supabase!.from('cargo_tracking').update(record).eq('id', formData.id);
        if (error) throw error;
      } else {
        // Insert
        const { error } = await supabase!.from('cargo_tracking').insert(record);
        if (error) throw error;
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err: any) {
      alert("Error saving data: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, hawb: string) => {
    if (!supabase || !confirm(`Yakin ingin menghapus resi ${hawb}?`)) return;
    await supabase!.from('cargo_tracking').delete().eq('id', id);
    fetchData();
  };

  // ================= UI RENDER =================
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center border border-slate-100">
          <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Admin Panel</h1>
          <p className="text-slate-500 mb-6 text-sm">Masukkan password untuk mengelola data cargo.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin Password"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-all text-slate-900"
            />
            <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-colors">
              Masuk
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-slate-900 text-white p-4 shadow-md flex justify-between items-center px-6">
        <h1 className="font-bold text-lg flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          Admin Dashboard
        </h1>
        <button onClick={() => setIsLoggedIn(false)} className="text-sm bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-full transition-colors">
          Logout
        </button>
      </nav>

      <main className="p-6 max-w-7xl mx-auto space-y-6">
        
        {/* Top Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <button onClick={openAddForm} className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Tambah Data Baru
          </button>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center bg-white p-2 rounded-xl shadow-sm border border-slate-200">
             <button onClick={handleExportExcel} className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 hover:bg-green-100 font-semibold rounded-lg transition-colors">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
               Export Excel
             </button>
             <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
             <div className="flex items-center gap-2 relative">
               <input 
                 type="file" 
                 accept=".xlsx, .xls"
                 onChange={handleFileUpload}
                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
               />
               <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold rounded-lg transition-colors cursor-pointer pointer-events-none">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                 Import/Sync Excel
               </button>
             </div>
          </div>
        </div>
        {uploadStatus && <div className="p-3 bg-blue-50 text-blue-800 rounded-lg text-sm font-medium border border-blue-100">{uploadStatus}</div>}

        {/* Data Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h2 className="font-bold text-slate-800">Database Saat Ini</h2>
            <span className="text-xs font-bold bg-primary-100 text-primary-700 px-3 py-1 rounded-full">{data.length} Data Aktif</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="text-xs text-slate-400 uppercase bg-slate-50/50 border-b border-slate-100">
                <tr>
                  <th className="px-4 py-4 font-semibold">HAWB</th>
                  <th className="px-4 py-4 font-semibold">MAWB</th>
                  <th className="px-4 py-4 font-semibold">PO Number</th>
                  <th className="px-4 py-4 font-semibold">Pengirim</th>
                  <th className="px-4 py-4 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan={5} className="px-4 py-8 text-center">Memuat data...</td></tr>
                ) : data.length === 0 ? (
                  <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-400">Belum ada data. Silakan upload Excel atau Tambah Data.</td></tr>
                ) : (
                  data.map((item) => (
                    <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-bold text-slate-800 whitespace-nowrap">{item.hawb}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{item.mawb}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{item.ponum_pib}</td>
                      <td className="px-4 py-3 truncate max-w-[200px]">{item.pengirim}</td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <button onClick={() => openEditForm(item)} className="text-blue-600 hover:text-blue-800 font-medium px-3 py-1 hover:bg-blue-50 rounded-lg mr-2 transition-colors">Edit</button>
                        <button onClick={() => handleDelete(item.id, item.hawb)} className="text-red-600 hover:text-red-800 font-medium px-3 py-1 hover:bg-red-50 rounded-lg transition-colors">Hapus</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* MODAL FORM ADD/EDIT */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl flex flex-col">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-slate-900">{formData.id ? 'Edit Data' : 'Tambah Data Baru'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <form onSubmit={handleSaveForm} className="p-6 space-y-8">
              {/* Section 1: Info Utama */}
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b pb-2">Informasi Utama</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-semibold text-slate-700 mb-1">HAWB *</label><input required type="text" value={formData.hawb} onChange={e=>setFormData({...formData, hawb: e.target.value})} className="w-full p-2.5 border rounded-lg uppercase" /></div>
                  <div><label className="block text-sm font-semibold text-slate-700 mb-1">MAWB *</label><input required type="text" value={formData.mawb} onChange={e=>setFormData({...formData, mawb: e.target.value})} className="w-full p-2.5 border rounded-lg" /></div>
                  <div><label className="block text-sm font-semibold text-slate-700 mb-1">PO / PONUM_PIB</label><input type="text" value={formData.ponum_pib} onChange={e=>setFormData({...formData, ponum_pib: e.target.value})} className="w-full p-2.5 border rounded-lg" /></div>
                  <div><label className="block text-sm font-semibold text-slate-700 mb-1">SHIPPER (Pengirim)</label><input type="text" value={formData.pengirim} onChange={e=>setFormData({...formData, pengirim: e.target.value})} className="w-full p-2.5 border rounded-lg uppercase" /></div>
                  <div><label className="block text-sm font-semibold text-slate-700 mb-1">Quantity (Pcs)</label><input type="number" value={formData.quantity} onChange={e=>setFormData({...formData, quantity: e.target.value})} className="w-full p-2.5 border rounded-lg" /></div>
                  <div><label className="block text-sm font-semibold text-slate-700 mb-1">Weight (Kgs)</label><input type="number" step="0.01" value={formData.weight} onChange={e=>setFormData({...formData, weight: e.target.value})} className="w-full p-2.5 border rounded-lg" /></div>
                </div>
              </div>

              {/* Section 2: Flight 1 */}
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b pb-2">Flight 1 (Origin)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div><label className="block text-xs font-semibold text-slate-700 mb-1">Flight Number</label><input type="text" value={formData.fl1Flight} onChange={e=>setFormData({...formData, fl1Flight: e.target.value})} placeholder="e.g. KE0270" className="w-full p-2 border rounded-lg" /></div>
                  <div><label className="block text-xs font-semibold text-slate-700 mb-1">Route (Origin)</label><input type="text" value={formData.fl1Route} onChange={e=>setFormData({...formData, fl1Route: e.target.value})} placeholder="e.g. JFK - ICN" className="w-full p-2 border rounded-lg" /></div>
                  <div><label className="block text-xs font-semibold text-slate-700 mb-1">Departed (Date & Time)</label><input type="text" value={formData.fl1Dep} onChange={e=>setFormData({...formData, fl1Dep: e.target.value})} placeholder="e.g. 05 Feb 2026 12:17" className="w-full p-2 border rounded-lg" /></div>
                  <div><label className="block text-xs font-semibold text-slate-700 mb-1">Arrived (Date & Time)</label><input type="text" value={formData.fl1Arr} onChange={e=>setFormData({...formData, fl1Arr: e.target.value})} placeholder="e.g. 06 Feb 2026 03:32" className="w-full p-2 border rounded-lg" /></div>
                </div>
              </div>

              {/* Section 3: Flight 2 */}
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b pb-2">Flight 2 (Destination)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div><label className="block text-xs font-semibold text-slate-700 mb-1">Flight Number</label><input type="text" value={formData.fl2Flight} onChange={e=>setFormData({...formData, fl2Flight: e.target.value})} placeholder="e.g. KE0437" className="w-full p-2 border rounded-lg" /></div>
                  <div><label className="block text-xs font-semibold text-slate-700 mb-1">Route (Destination)</label><input type="text" value={formData.fl2Route} onChange={e=>setFormData({...formData, fl2Route: e.target.value})} placeholder="e.g. ICN - CGK" className="w-full p-2 border rounded-lg" /></div>
                  <div><label className="block text-xs font-semibold text-slate-700 mb-1">Departed (Date & Time)</label><input type="text" value={formData.fl2Dep} onChange={e=>setFormData({...formData, fl2Dep: e.target.value})} className="w-full p-2 border rounded-lg" /></div>
                  <div><label className="block text-xs font-semibold text-slate-700 mb-1">Arrived (Date & Time)</label><input type="text" value={formData.fl2Arr} onChange={e=>setFormData({...formData, fl2Arr: e.target.value})} className="w-full p-2 border rounded-lg" /></div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 rounded-xl font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Batal</button>
                <button type="submit" disabled={isSaving} className="px-6 py-2.5 rounded-xl font-bold text-white bg-primary-600 hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center gap-2">
                  {isSaving ? 'Menyimpan...' : 'Simpan Data'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
