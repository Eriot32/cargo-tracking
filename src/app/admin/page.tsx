'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { AirCargoTracking, OceanCargoTracking, CargoMode } from '../../lib/types';
import { airCargoData } from '../../lib/data-air';
import { oceanCargoData } from '../../lib/data-ocean';
import * as xlsx from 'xlsx';

const ADMIN_PASSWORD = 'admintanti';

export default function AdminPanel() {
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<CargoMode>('air');

  // Air Data States
  const [airList, setAirList] = useState<AirCargoTracking[]>([]);
  const [isAirModalOpen, setIsAirModalOpen] = useState(false);
  const [airForm, setAirForm] = useState<Partial<AirCargoTracking>>({});

  // Ocean Data States
  const [oceanList, setOceanList] = useState<OceanCargoTracking[]>([]);
  const [isOceanModalOpen, setIsOceanModalOpen] = useState(false);
  const [oceanForm, setOceanForm] = useState<Partial<OceanCargoTracking>>({});

  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      loadAllData();
    } else {
      alert('Password salah!');
    }
  };

  const loadAllData = async () => {
    setIsLoading(true);

    // 1. Load Air
    try {
      if (supabase) {
        const { data, error } = await supabase.from('air_cargo_tracking').select('*').order('id');
        if (!error && data && data.length > 0) {
          setAirList(data.map((r: any) => ({ ...r, id: String(r.id) })));
        } else {
          setAirList(airCargoData);
        }
      } else {
        setAirList(airCargoData);
      }
    } catch {
      setAirList(airCargoData);
    }

    // 2. Load Ocean
    try {
      if (supabase) {
        const { data, error } = await supabase.from('ocean_cargo_tracking').select('*').order('id');
        if (!error && data && data.length > 0) {
          setOceanList(data.map((r: any) => ({ ...r, id: String(r.id) })));
        } else {
          setOceanList(oceanCargoData);
        }
      } else {
        setOceanList(oceanCargoData);
      }
    } catch {
      setOceanList(oceanCargoData);
    }

    setIsLoading(false);
  };

  // ================= AIR CARGO CRUD & EXCEL =================
  const handleExportAir = () => {
    const aoa: any[][] = [
      ['NO', 'PO', 'SERVICE TYPE ', 'SHIPPER', 'CONSIGNEE ', 'QTY', 'GW', 'POL', 'POD ', 'MAWB / BL', 'HAWB', 'SI DATE ', 'COLLECTION ', 'ORIGIN', 'FLIGHT ', 'DEPARTED', 'DESTINATION ', 'FLIGHT ', 'ARRIVED ', 'CLEARANCE DATE  ', 'DELIVERY TO PAITON']
    ];

    airList.forEach((item, idx) => {
      aoa.push([
        idx + 1, item.po, item.service_type, item.shipper, item.consignee,
        item.qty, item.gw, item.pol, item.pod, item.mawb_bl, item.hawb,
        item.si_date, item.collection, item.fl1_origin, item.fl1_flight, item.fl1_departed,
        item.fl2_destination, item.fl2_flight, item.fl2_arrived, item.clearance_date, item.delivery_to_paiton
      ]);
    });

    const ws = xlsx.utils.aoa_to_sheet(aoa);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'AIR & CLEARANCE');
    xlsx.writeFile(wb, `Air_Cargo_Export_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  const handleUploadAir = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!confirm('Replace all Air Cargo records with this Excel file?')) {
      e.target.value = '';
      return;
    }

    setStatusMessage('Reading Air Cargo Excel...');
    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = xlsx.read(bstr, { type: 'binary' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows = xlsx.utils.sheet_to_json<any[]>(ws, { header: 1, defval: '', raw: false }).slice(1);

        const text = (v: any) => String(v ?? '').trim();
        const records: any[] = [];
        let idCounter = 1;

        for (const row of rows) {
          const [no, po, serviceType, shipper, consignee, qty, gw, pol, pod, mawbBl, hawb, siDate, collection, fl1Origin, fl1Flight, fl1Departed, fl2Dest, fl2Flight, fl2Arrived, clearanceDate, deliveryToPaiton] = row;
          if (!text(hawb) && !text(mawbBl) && !text(po)) continue;

          records.push({
            id: String(idCounter++),
            no: text(no),
            po: text(po),
            service_type: text(serviceType),
            shipper: text(shipper),
            consignee: text(consignee),
            qty: text(qty),
            gw: text(gw),
            pol: text(pol),
            pod: text(pod),
            mawb_bl: text(mawbBl),
            hawb: text(hawb),
            si_date: text(siDate),
            collection: text(collection),
            fl1_origin: text(fl1Origin),
            fl1_flight: text(fl1Flight),
            fl1_departed: text(fl1Departed),
            fl2_destination: text(fl2Dest),
            fl2_flight: text(fl2Flight),
            fl2_arrived: text(fl2Arrived),
            clearance_date: text(clearanceDate),
            delivery_to_paiton: text(deliveryToPaiton),
            search_text: [text(hawb), text(mawbBl), text(po), text(shipper), text(consignee)].join(' ').toUpperCase()
          });
        }

        if (supabase) {
          setStatusMessage('Updating Supabase database...');
          await supabase!.from('air_cargo_tracking').delete().gte('id', 0);
          const dbRows = records.map(({ id, ...rest }) => rest);
          const { error } = await supabase!.from('air_cargo_tracking').insert(dbRows);
          if (error) console.warn('Supabase sync notice:', error.message);
        }

        setAirList(records);
        setStatusMessage(`Successfully imported ${records.length} Air Cargo records.`);
      } catch (err: any) {
        setStatusMessage('Error: ' + err.message);
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleSaveAir = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const record: AirCargoTracking = {
      id: airForm.id || String(Date.now()),
      no: airForm.no || '',
      po: airForm.po || '',
      service_type: airForm.service_type || 'AIR & CLEARANCE',
      shipper: airForm.shipper || '',
      consignee: airForm.consignee || 'PAITON ENERGY',
      qty: airForm.qty || '',
      gw: airForm.gw || '',
      pol: airForm.pol || '',
      pod: airForm.pod || '',
      mawb_bl: airForm.mawb_bl || '',
      hawb: airForm.hawb || '',
      si_date: airForm.si_date || '',
      collection: airForm.collection || '',
      fl1_origin: airForm.fl1_origin || '',
      fl1_flight: airForm.fl1_flight || '',
      fl1_departed: airForm.fl1_departed || '',
      fl2_destination: airForm.fl2_destination || '',
      fl2_flight: airForm.fl2_flight || '',
      fl2_arrived: airForm.fl2_arrived || '',
      clearance_date: airForm.clearance_date || '',
      delivery_to_paiton: airForm.delivery_to_paiton || '',
      search_text: [airForm.hawb, airForm.mawb_bl, airForm.po, airForm.shipper, airForm.consignee].join(' ').toUpperCase()
    };

    if (supabase) {
      try {
        const { id, ...payload } = record;
        if (airForm.id) {
          await supabase!.from('air_cargo_tracking').update(payload).eq('id', airForm.id);
        } else {
          await supabase!.from('air_cargo_tracking').insert(payload);
        }
      } catch (e) {
        console.warn(e);
      }
    }

    setAirList((prev) =>
      airForm.id ? prev.map((item) => (item.id === airForm.id ? record : item)) : [record, ...prev]
    );

    setIsAirModalOpen(false);
    setIsLoading(false);
  };

  const handleDeleteAir = async (id: string, hawb: string) => {
    if (!confirm(`Delete Air HAWB ${hawb}?`)) return;
    if (supabase) {
      try {
        await supabase!.from('air_cargo_tracking').delete().eq('id', id);
      } catch (e) {
        console.warn(e);
      }
    }
    setAirList((prev) => prev.filter((item) => item.id !== id));
  };

  // ================= OCEAN CARGO CRUD & EXCEL =================
  const handleExportOcean = () => {
    const aoa: any[][] = [
      ['NO', 'PO', 'SERVICE TYPE ', 'SHIPPER', 'CONSIGNEE ', 'QTY', 'GROSS WEIGHT ', 'POL', 'POD ', 'BL ', 'SI DATE ', 'COLLECTION ', 'DEPARTED', 'ARRIVED', 'VESSEL', 'CLEARANCE DATE ', 'DELIVERY TO PAITON']
    ];

    oceanList.forEach((item, idx) => {
      aoa.push([
        idx + 1, item.po, item.service_type, item.shipper, item.consignee,
        item.qty, item.gross_weight, item.pol, item.pod, item.bl_no,
        item.si_date, item.collection, item.departed, item.arrived,
        item.vessel, item.clearance_date, item.delivery_to_paiton
      ]);
    });

    const ws = xlsx.utils.aoa_to_sheet(aoa);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, `Ocean_Cargo_Export_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  const handleUploadOcean = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!confirm('Replace all Ocean Cargo records with this Excel file?')) {
      e.target.value = '';
      return;
    }

    setStatusMessage('Reading Ocean Cargo Excel...');
    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = xlsx.read(bstr, { type: 'binary' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows = xlsx.utils.sheet_to_json<any[]>(ws, { header: 1, defval: '', raw: false }).slice(1);

        const text = (v: any) => String(v ?? '').trim();
        const records: any[] = [];
        let idCounter = 1;

        for (const row of rows) {
          const [no, po, serviceType, shipper, consignee, qty, grossWeight, pol, pod, blNo, siDate, collection, departed, arrived, vessel, clearanceDate, deliveryToPaiton] = row;
          if (!text(blNo) && !text(po)) continue;

          records.push({
            id: String(idCounter++),
            no: text(no),
            po: text(po),
            service_type: text(serviceType),
            shipper: text(shipper),
            consignee: text(consignee),
            qty: text(qty),
            gross_weight: text(grossWeight),
            pol: text(pol),
            pod: text(pod),
            bl_no: text(blNo),
            si_date: text(siDate),
            collection: text(collection),
            departed: text(departed),
            arrived: text(arrived),
            vessel: text(vessel),
            clearance_date: text(clearanceDate),
            delivery_to_paiton: text(deliveryToPaiton),
            search_text: [text(blNo), text(po), text(shipper), text(consignee), text(vessel)].join(' ').toUpperCase()
          });
        }

        if (supabase) {
          setStatusMessage('Updating Supabase database...');
          await supabase!.from('ocean_cargo_tracking').delete().gte('id', 0);
          const dbRows = records.map(({ id, ...rest }) => rest);
          const { error } = await supabase!.from('ocean_cargo_tracking').insert(dbRows);
          if (error) console.warn('Supabase sync notice:', error.message);
        }

        setOceanList(records);
        setStatusMessage(`Successfully imported ${records.length} Ocean Cargo records.`);
      } catch (err: any) {
        setStatusMessage('Error: ' + err.message);
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleSaveOcean = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const record: OceanCargoTracking = {
      id: oceanForm.id || String(Date.now()),
      no: oceanForm.no || '',
      po: oceanForm.po || '',
      service_type: oceanForm.service_type || 'SEA & CLEARANCE',
      shipper: oceanForm.shipper || '',
      consignee: oceanForm.consignee || 'PAITON ENERGY',
      qty: oceanForm.qty || '',
      gross_weight: oceanForm.gross_weight || '',
      pol: oceanForm.pol || '',
      pod: oceanForm.pod || '',
      bl_no: oceanForm.bl_no || '',
      si_date: oceanForm.si_date || '',
      collection: oceanForm.collection || '',
      departed: oceanForm.departed || '',
      arrived: oceanForm.arrived || '',
      vessel: oceanForm.vessel || '',
      clearance_date: oceanForm.clearance_date || '',
      delivery_to_paiton: oceanForm.delivery_to_paiton || '',
      search_text: [oceanForm.bl_no, oceanForm.po, oceanForm.shipper, oceanForm.consignee, oceanForm.vessel].join(' ').toUpperCase()
    };

    if (supabase) {
      try {
        const { id, ...payload } = record;
        if (oceanForm.id) {
          await supabase!.from('ocean_cargo_tracking').update(payload).eq('id', oceanForm.id);
        } else {
          await supabase!.from('ocean_cargo_tracking').insert(payload);
        }
      } catch (e) {
        console.warn(e);
      }
    }

    setOceanList((prev) =>
      oceanForm.id ? prev.map((item) => (item.id === oceanForm.id ? record : item)) : [record, ...prev]
    );

    setIsOceanModalOpen(false);
    setIsLoading(false);
  };

  const handleDeleteOcean = async (id: string, bl: string) => {
    if (!confirm(`Delete Ocean B/L ${bl}?`)) return;
    if (supabase) {
      try {
        await supabase!.from('ocean_cargo_tracking').delete().eq('id', id);
      } catch (e) {
        console.warn(e);
      }
    }
    setOceanList((prev) => prev.filter((item) => item.id !== id));
  };

  // ================= LOGIN SCREEN =================
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center border-t-4 border-amber-400">
          <div className="bg-slate-900 p-4 rounded-2xl mb-6 inline-block shadow-md border border-amber-400/30">
            <img src="/logo.png" alt="Logo" className="h-16 w-auto object-contain mx-auto" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-1">Admin Portal</h1>
          <p className="text-slate-500 mb-6 text-sm font-medium">Enter password to access cargo management</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin Password"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 outline-none transition-all text-slate-900 font-semibold"
            />
            <button
              type="submit"
              className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-black py-3 rounded-xl transition-all shadow-md active:scale-98 uppercase tracking-wider"
            >
              Sign In
            </button>
          </form>
          <div className="mt-6 pt-4 border-t border-slate-100">
            <a href="/" className="text-xs font-bold text-slate-500 hover:text-amber-600 transition-colors">
              Return to Tracking Portal
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ================= MAIN ADMIN DASHBOARD =================
  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      {/* Top Bar */}
      <nav className="bg-slate-900 text-white p-4 shadow-lg border-b-2 border-amber-400 flex justify-between items-center px-6">
        <div className="flex items-center gap-4">
          <a
            href="https://abhinayatransnuswantara.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="Visit PT. Abhinaya Trans Nuswantara"
            className="bg-white/95 px-4 py-1.5 rounded-xl border border-amber-400/40 hover:scale-105 transition-transform"
          >
            <img src="/logo.png" alt="Logo" className="h-10 w-auto object-contain cursor-pointer" />
          </a>
          <span className="font-extrabold text-amber-400 text-sm sm:text-base hidden sm:inline">
            Management Dashboard
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="text-xs bg-slate-800 hover:bg-slate-700 text-amber-300 px-3.5 py-2 rounded-lg font-bold border border-slate-700 transition-colors"
          >
            Client Portal
          </a>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="text-xs bg-red-600/80 hover:bg-red-600 text-white px-3.5 py-2 rounded-lg font-bold transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
        {/* TABS: Package / Air Cargo vs Ocean Cargo (No emojis) */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('air')}
              className={`flex-1 sm:flex-initial px-5 py-3 rounded-xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === 'air'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <svg className="w-4 h-4 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span>Package / Air Cargo</span>
              <span className="px-2 py-0.5 rounded-full text-xs bg-slate-900 text-amber-300 font-bold ml-1">
                {airList.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('ocean')}
              className={`flex-1 sm:flex-initial px-5 py-3 rounded-xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === 'ocean'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <svg className="w-4 h-4 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M3 13h18M3 17h18M5 9l2-4h10l2 4M4 21h16a1 1 0 001-1v-4H3v4a1 1 0 001 1z" />
              </svg>
              <span>Ocean Cargo</span>
              <span className="px-2 py-0.5 rounded-full text-xs bg-white text-blue-900 font-bold ml-1">
                {oceanList.length}
              </span>
            </button>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-end">
            {activeTab === 'air' ? (
              <>
                <button
                  onClick={() => { setAirForm({}); setIsAirModalOpen(true); }}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-amber-300 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <span>+</span> Add Air Cargo
                </button>
                <button
                  onClick={handleExportAir}
                  className="px-4 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  Export Air Excel
                </button>
                <label className="px-4 py-2 bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-300 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer">
                  <span>Import Excel</span>
                  <input type="file" accept=".xlsx,.xls" onChange={handleUploadAir} className="hidden" />
                </label>
              </>
            ) : (
              <>
                <button
                  onClick={() => { setOceanForm({}); setIsOceanModalOpen(true); }}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-blue-300 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <span>+</span> Add Ocean Cargo
                </button>
                <button
                  onClick={handleExportOcean}
                  className="px-4 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  Export Ocean Excel
                </button>
                <label className="px-4 py-2 bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-300 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer">
                  <span>Import Excel</span>
                  <input type="file" accept=".xlsx,.xls" onChange={handleUploadOcean} className="hidden" />
                </label>
              </>
            )}
          </div>
        </div>

        {statusMessage && (
          <div className="p-3 bg-amber-50 border border-amber-300 text-slate-900 rounded-xl font-bold text-xs flex justify-between items-center">
            <span>{statusMessage}</span>
            <button onClick={() => setStatusMessage('')} className="text-slate-400 hover:text-slate-700">✕</button>
          </div>
        )}

        {/* ================= TAB 1: AIR CARGO TABLE ================= */}
        {activeTab === 'air' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-amber-50/50 flex justify-between items-center">
              <div>
                <h3 className="font-black text-slate-900 text-base">Air Freight Database</h3>
                <p className="text-xs text-slate-500">Searchable by HAWB and MAWB on client portal</p>
              </div>
              <span className="text-xs font-black bg-amber-400 text-slate-950 px-3 py-1 rounded-full">
                {airList.length} Active Records
              </span>
            </div>

            <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="text-[11px] font-black text-slate-700 uppercase bg-slate-50 sticky top-0 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">NO</th>
                    <th className="px-4 py-3">HAWB</th>
                    <th className="px-4 py-3">MAWB / BL</th>
                    <th className="px-4 py-3">PO Number</th>
                    <th className="px-4 py-3">Shipper</th>
                    <th className="px-4 py-3">Origin / Flight</th>
                    <th className="px-4 py-3">Destination / Flight</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {airList.map((item, idx) => (
                    <tr key={item.id || idx} className="hover:bg-amber-50/30 transition-colors">
                      <td className="px-4 py-3 font-bold text-slate-400">{idx + 1}</td>
                      <td className="px-4 py-3 font-black text-slate-900">{item.hawb || '-'}</td>
                      <td className="px-4 py-3 font-mono font-bold text-slate-700">{item.mawb_bl || '-'}</td>
                      <td className="px-4 py-3 font-medium text-slate-800">{item.po || '-'}</td>
                      <td className="px-4 py-3 truncate max-w-[180px]">{item.shipper || '-'}</td>
                      <td className="px-4 py-3">
                        <span className="font-bold text-red-600">{item.fl1_flight}</span> {item.fl1_origin && `(${item.fl1_origin})`}
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-bold text-blue-600">{item.fl2_flight}</span> {item.fl2_destination && `(${item.fl2_destination})`}
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <button
                          onClick={() => { setAirForm(item); setIsAirModalOpen(true); }}
                          className="px-2.5 py-1 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg mr-1.5 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteAir(item.id, item.hawb)}
                          className="px-2.5 py-1 text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 2: OCEAN CARGO TABLE ================= */}
        {activeTab === 'ocean' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-blue-50/50 flex justify-between items-center">
              <div>
                <h3 className="font-black text-slate-900 text-base">Ocean Freight Database</h3>
                <p className="text-xs text-slate-500">Searchable by B/L No. on client portal</p>
              </div>
              <span className="text-xs font-black bg-blue-600 text-white px-3 py-1 rounded-full">
                {oceanList.length} Active Records
              </span>
            </div>

            <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="text-[11px] font-black text-slate-700 uppercase bg-slate-50 sticky top-0 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">NO</th>
                    <th className="px-4 py-3">B/L Number</th>
                    <th className="px-4 py-3">PO Number</th>
                    <th className="px-4 py-3">Shipper</th>
                    <th className="px-4 py-3">Vessel</th>
                    <th className="px-4 py-3">POL (Loading)</th>
                    <th className="px-4 py-3">POD (Discharge)</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {oceanList.map((item, idx) => (
                    <tr key={item.id || idx} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-4 py-3 font-bold text-slate-400">{idx + 1}</td>
                      <td className="px-4 py-3 font-black text-blue-900 font-mono">{item.bl_no || '-'}</td>
                      <td className="px-4 py-3 font-medium text-slate-800">{item.po || '-'}</td>
                      <td className="px-4 py-3 truncate max-w-[180px]">{item.shipper || '-'}</td>
                      <td className="px-4 py-3 font-bold text-slate-900">{item.vessel || '-'}</td>
                      <td className="px-4 py-3">{item.pol || '-'}</td>
                      <td className="px-4 py-3">{item.pod || '-'}</td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <button
                          onClick={() => { setOceanForm(item); setIsOceanModalOpen(true); }}
                          className="px-2.5 py-1 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg mr-1.5 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteOcean(item.id, item.bl_no)}
                          className="px-2.5 py-1 text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* ================= MODAL: ADD / EDIT AIR CARGO ================= */}
      {isAirModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl flex flex-col border-t-4 border-amber-400">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-amber-50/50 sticky top-0 z-10">
              <h2 className="text-lg font-black text-slate-900">
                {airForm.id ? 'Edit Air Cargo Record' : 'Add New Air Cargo Record'}
              </h2>
              <button onClick={() => setIsAirModalOpen(false)} className="text-slate-400 hover:text-slate-700 p-2">✕</button>
            </div>

            <form onSubmit={handleSaveAir} className="p-6 space-y-6">
              <div>
                <h4 className="text-xs font-black uppercase text-amber-800 tracking-wider mb-3">General Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-bold text-slate-700">
                  <div>
                    <label className="block mb-1">HAWB *</label>
                    <input required type="text" value={airForm.hawb || ''} onChange={(e) => setAirForm({ ...airForm, hawb: e.target.value })} className="w-full p-2.5 border rounded-lg uppercase" />
                  </div>
                  <div>
                    <label className="block mb-1">MAWB / BL</label>
                    <input type="text" value={airForm.mawb_bl || ''} onChange={(e) => setAirForm({ ...airForm, mawb_bl: e.target.value })} className="w-full p-2.5 border rounded-lg uppercase" />
                  </div>
                  <div>
                    <label className="block mb-1">PO Number</label>
                    <input type="text" value={airForm.po || ''} onChange={(e) => setAirForm({ ...airForm, po: e.target.value })} className="w-full p-2.5 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block mb-1">Shipper</label>
                    <input type="text" value={airForm.shipper || ''} onChange={(e) => setAirForm({ ...airForm, shipper: e.target.value })} className="w-full p-2.5 border rounded-lg uppercase" />
                  </div>
                  <div>
                    <label className="block mb-1">Consignee</label>
                    <input type="text" value={airForm.consignee || ''} onChange={(e) => setAirForm({ ...airForm, consignee: e.target.value })} className="w-full p-2.5 border rounded-lg uppercase" />
                  </div>
                  <div>
                    <label className="block mb-1">Service Type</label>
                    <input type="text" value={airForm.service_type || ''} onChange={(e) => setAirForm({ ...airForm, service_type: e.target.value })} className="w-full p-2.5 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block mb-1">Quantity</label>
                    <input type="text" value={airForm.qty || ''} onChange={(e) => setAirForm({ ...airForm, qty: e.target.value })} placeholder="e.g. 2 CASES" className="w-full p-2.5 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block mb-1">Gross Weight (KGS)</label>
                    <input type="text" value={airForm.gw || ''} onChange={(e) => setAirForm({ ...airForm, gw: e.target.value })} placeholder="e.g. 37.00" className="w-full p-2.5 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block mb-1">POL / POD</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" placeholder="POL" value={airForm.pol || ''} onChange={(e) => setAirForm({ ...airForm, pol: e.target.value })} className="p-2 border rounded-lg" />
                      <input type="text" placeholder="POD" value={airForm.pod || ''} onChange={(e) => setAirForm({ ...airForm, pod: e.target.value })} className="p-2 border rounded-lg" />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-black uppercase text-red-700 tracking-wider mb-3">Flight 1 Schedule</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold text-slate-700">
                  <div>
                    <label className="block mb-1">Flight Number</label>
                    <input type="text" value={airForm.fl1_flight || ''} onChange={(e) => setAirForm({ ...airForm, fl1_flight: e.target.value })} placeholder="e.g. KE0250" className="w-full p-2.5 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block mb-1">Sector (Origin)</label>
                    <input type="text" value={airForm.fl1_origin || ''} onChange={(e) => setAirForm({ ...airForm, fl1_origin: e.target.value })} placeholder="e.g. JFK - ICN" className="w-full p-2.5 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block mb-1">Departed Date</label>
                    <input type="text" value={airForm.fl1_departed || ''} onChange={(e) => setAirForm({ ...airForm, fl1_departed: e.target.value })} placeholder="e.g. 18 January 2025" className="w-full p-2.5 border rounded-lg" />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-black uppercase text-blue-700 tracking-wider mb-3">Flight 2 Schedule</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold text-slate-700">
                  <div>
                    <label className="block mb-1">Flight Number</label>
                    <input type="text" value={airForm.fl2_flight || ''} onChange={(e) => setAirForm({ ...airForm, fl2_flight: e.target.value })} placeholder="e.g. KE0627" className="w-full p-2.5 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block mb-1">Sector (Destination)</label>
                    <input type="text" value={airForm.fl2_destination || ''} onChange={(e) => setAirForm({ ...airForm, fl2_destination: e.target.value })} placeholder="e.g. ICN - CGK" className="w-full p-2.5 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block mb-1">Arrived Date</label>
                    <input type="text" value={airForm.fl2_arrived || ''} onChange={(e) => setAirForm({ ...airForm, fl2_arrived: e.target.value })} placeholder="e.g. 20 January 2025" className="w-full p-2.5 border rounded-lg" />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-black uppercase text-emerald-800 tracking-wider mb-3">Milestones & Clearance</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-bold text-slate-700">
                  <div>
                    <label className="block mb-1">SI Date</label>
                    <input type="text" value={airForm.si_date || ''} onChange={(e) => setAirForm({ ...airForm, si_date: e.target.value })} className="w-full p-2.5 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block mb-1">Collection Date</label>
                    <input type="text" value={airForm.collection || ''} onChange={(e) => setAirForm({ ...airForm, collection: e.target.value })} className="w-full p-2.5 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block mb-1">Clearance Date</label>
                    <input type="text" value={airForm.clearance_date || ''} onChange={(e) => setAirForm({ ...airForm, clearance_date: e.target.value })} className="w-full p-2.5 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block mb-1">Delivery to Paiton</label>
                    <input type="text" value={airForm.delivery_to_paiton || ''} onChange={(e) => setAirForm({ ...airForm, delivery_to_paiton: e.target.value })} className="w-full p-2.5 border rounded-lg" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setIsAirModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200">Cancel</button>
                <button type="submit" className="px-6 py-2.5 rounded-xl font-black text-slate-950 bg-amber-400 hover:bg-amber-500 shadow-md">Save Record</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD / EDIT OCEAN CARGO ================= */}
      {isOceanModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl flex flex-col border-t-4 border-blue-500">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-blue-50/50 sticky top-0 z-10">
              <h2 className="text-lg font-black text-slate-900">
                {oceanForm.id ? 'Edit Ocean Cargo Record' : 'Add New Ocean Cargo Record'}
              </h2>
              <button onClick={() => setIsOceanModalOpen(false)} className="text-slate-400 hover:text-slate-700 p-2">✕</button>
            </div>

            <form onSubmit={handleSaveOcean} className="p-6 space-y-6">
              <div>
                <h4 className="text-xs font-black uppercase text-blue-900 tracking-wider mb-3">General Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-bold text-slate-700">
                  <div>
                    <label className="block mb-1">B/L Number *</label>
                    <input required type="text" value={oceanForm.bl_no || ''} onChange={(e) => setOceanForm({ ...oceanForm, bl_no: e.target.value })} className="w-full p-2.5 border rounded-lg uppercase" />
                  </div>
                  <div>
                    <label className="block mb-1">PO Number</label>
                    <input type="text" value={oceanForm.po || ''} onChange={(e) => setOceanForm({ ...oceanForm, po: e.target.value })} className="w-full p-2.5 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block mb-1">Vessel Name</label>
                    <input type="text" value={oceanForm.vessel || ''} onChange={(e) => setOceanForm({ ...oceanForm, vessel: e.target.value })} placeholder="e.g. CMA CGM DOLOMITES" className="w-full p-2.5 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block mb-1">Shipper</label>
                    <input type="text" value={oceanForm.shipper || ''} onChange={(e) => setOceanForm({ ...oceanForm, shipper: e.target.value })} className="w-full p-2.5 border rounded-lg uppercase" />
                  </div>
                  <div>
                    <label className="block mb-1">Consignee</label>
                    <input type="text" value={oceanForm.consignee || ''} onChange={(e) => setOceanForm({ ...oceanForm, consignee: e.target.value })} className="w-full p-2.5 border rounded-lg uppercase" />
                  </div>
                  <div>
                    <label className="block mb-1">Service Type</label>
                    <input type="text" value={oceanForm.service_type || ''} onChange={(e) => setOceanForm({ ...oceanForm, service_type: e.target.value })} className="w-full p-2.5 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block mb-1">Quantity</label>
                    <input type="text" value={oceanForm.qty || ''} onChange={(e) => setOceanForm({ ...oceanForm, qty: e.target.value })} placeholder="e.g. 1 CASE" className="w-full p-2.5 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block mb-1">Gross Weight (KGS)</label>
                    <input type="text" value={oceanForm.gross_weight || ''} onChange={(e) => setOceanForm({ ...oceanForm, gross_weight: e.target.value })} placeholder="e.g. 460.00" className="w-full p-2.5 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block mb-1">POL / POD</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" placeholder="POL" value={oceanForm.pol || ''} onChange={(e) => setOceanForm({ ...oceanForm, pol: e.target.value })} className="p-2 border rounded-lg" />
                      <input type="text" placeholder="POD" value={oceanForm.pod || ''} onChange={(e) => setOceanForm({ ...oceanForm, pod: e.target.value })} className="p-2 border rounded-lg" />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-black uppercase text-blue-700 tracking-wider mb-3">Voyage Dates</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-slate-700">
                  <div>
                    <label className="block mb-1">Departed (POL)</label>
                    <input type="text" value={oceanForm.departed || ''} onChange={(e) => setOceanForm({ ...oceanForm, departed: e.target.value })} placeholder="e.g. 21 January 2025" className="w-full p-2.5 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block mb-1">Arrived (POD)</label>
                    <input type="text" value={oceanForm.arrived || ''} onChange={(e) => setOceanForm({ ...oceanForm, arrived: e.target.value })} placeholder="e.g. 24 January 2025" className="w-full p-2.5 border rounded-lg" />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-black uppercase text-emerald-800 tracking-wider mb-3">Milestones & Clearance</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-bold text-slate-700">
                  <div>
                    <label className="block mb-1">SI Date</label>
                    <input type="text" value={oceanForm.si_date || ''} onChange={(e) => setOceanForm({ ...oceanForm, si_date: e.target.value })} className="w-full p-2.5 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block mb-1">Collection Date</label>
                    <input type="text" value={oceanForm.collection || ''} onChange={(e) => setOceanForm({ ...oceanForm, collection: e.target.value })} className="w-full p-2.5 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block mb-1">Clearance Date</label>
                    <input type="text" value={oceanForm.clearance_date || ''} onChange={(e) => setOceanForm({ ...oceanForm, clearance_date: e.target.value })} className="w-full p-2.5 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block mb-1">Delivery to Paiton</label>
                    <input type="text" value={oceanForm.delivery_to_paiton || ''} onChange={(e) => setOceanForm({ ...oceanForm, delivery_to_paiton: e.target.value })} className="w-full p-2.5 border rounded-lg" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setIsOceanModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200">Cancel</button>
                <button type="submit" className="px-6 py-2.5 rounded-xl font-black text-white bg-blue-600 hover:bg-blue-700 shadow-md">Save Record</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
