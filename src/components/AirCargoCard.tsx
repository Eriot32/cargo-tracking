'use client';

import { AirCargoTracking } from '../lib/types';

interface AirCargoCardProps {
  data: AirCargoTracking;
}

export default function AirCargoCard({ data }: AirCargoCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Top Banner - Dominant Warm Amber with Corporate Accent */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 px-6 sm:px-8 py-5 text-slate-950 flex flex-wrap justify-between items-center gap-4 border-b-2 border-amber-500/20">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-slate-900 text-amber-300 uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
              <svg className="w-3.5 h-3.5 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Package / Air Cargo
            </span>
            {data.service_type && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/80 text-slate-900 border border-slate-900/10">
                {data.service_type}
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
            {data.hawb || 'NO HAWB'}
          </h2>
        </div>

        <div className="text-right">
          <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">MAWB / BL</p>
          <p className="text-lg font-extrabold text-slate-950 font-mono tracking-tight">{data.mawb_bl || '-'}</p>
          <p className="text-xs font-semibold text-slate-800 mt-0.5">PO: <span className="font-extrabold text-slate-950">{data.po || '-'}</span></p>
        </div>
      </div>

      {/* Main Info Body */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Origin - Destination Port Route */}
        <div className="bg-amber-50/70 rounded-xl p-4 sm:p-5 border border-amber-200/90 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex-1">
            <span className="text-xs font-bold uppercase text-amber-900 tracking-wider">Port of Loading (POL)</span>
            <p className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5">{data.pol || '-'}</p>
          </div>
          <div className="flex items-center gap-2 text-amber-700 font-extrabold px-4 py-1.5 bg-white rounded-full border border-amber-300 shadow-sm text-xs tracking-wider uppercase">
            <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <span>Air Transit</span>
          </div>
          <div className="flex-1 sm:text-right">
            <span className="text-xs font-bold uppercase text-amber-900 tracking-wider">Port of Discharge (POD)</span>
            <p className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5">{data.pod || '-'}</p>
          </div>
        </div>

        {/* Shipper & Consignee, Qty & Weight Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50 p-5 rounded-xl border border-slate-200">
          <div>
            <p className="text-xs font-bold uppercase text-slate-400 tracking-wider">Shipper</p>
            <p className="text-sm font-bold text-slate-900 uppercase mt-0.5">{data.shipper || '-'}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-slate-400 tracking-wider">Consignee</p>
            <p className="text-sm font-bold text-slate-900 uppercase mt-0.5">{data.consignee || '-'}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-slate-400 tracking-wider">Quantity</p>
            <p className="text-sm font-bold text-slate-900 mt-0.5">{data.qty || '-'}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-slate-400 tracking-wider">Gross Weight</p>
            <p className="text-sm font-bold text-slate-900 mt-0.5">{data.gw ? `${data.gw} KGS` : '-'}</p>
          </div>
        </div>

        {/* Flight & Milestone Timeline */}
        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            Flight Schedule & Shipment Milestones
          </h3>

          <div className="relative border-l-2 border-amber-300 ml-3 space-y-6 pl-6 pb-2">
            {/* Milestone: Collection / SI */}
            {(data.si_date || data.collection) && (
              <div className="relative">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white border-4 border-amber-500 shadow-sm"></div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">Collection & Shipping Instruction</span>
                  <div className="flex flex-wrap gap-6 text-xs font-semibold text-slate-700 mt-1.5">
                    {data.si_date && <span>SI Date: <span className="font-bold text-slate-900">{data.si_date}</span></span>}
                    {data.collection && <span>Collection Date: <span className="font-bold text-slate-900">{data.collection}</span></span>}
                  </div>
                </div>
              </div>
            )}

            {/* Flight 1 */}
            {(data.fl1_flight || data.fl1_origin) && (
              <div className="relative">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-red-600 border-2 border-white shadow"></div>
                <div className="bg-red-50/60 p-4 rounded-xl border border-red-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-black text-red-800">Flight: {data.fl1_flight || 'TBA'}</span>
                    <span className="text-xs font-bold bg-red-100 text-red-800 px-2.5 py-0.5 rounded-full">Leg 1</span>
                  </div>
                  <p className="text-xs font-bold text-slate-700 mb-2">Sector: {data.fl1_origin || '-'}</p>
                  <p className="text-xs font-semibold text-slate-600">
                    Departed: <span className="font-extrabold text-slate-900">{data.fl1_departed || 'TBA'}</span>
                  </p>
                </div>
              </div>
            )}

            {/* Flight 2 */}
            {(data.fl2_flight || data.fl2_destination) && (
              <div className="relative">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow"></div>
                <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-black text-blue-800">Flight: {data.fl2_flight || 'TBA'}</span>
                    <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">Leg 2</span>
                  </div>
                  <p className="text-xs font-bold text-slate-700 mb-2">Sector: {data.fl2_destination || '-'}</p>
                  <p className="text-xs font-semibold text-slate-600">
                    Arrived: <span className="font-extrabold text-slate-900">{data.fl2_arrived || 'TBA'}</span>
                  </p>
                </div>
              </div>
            )}

            {/* Customs & Final Delivery */}
            {(data.clearance_date || data.delivery_to_paiton) && (
              <div className="relative">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white shadow"></div>
                <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">Clearance & Delivery to Paiton</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 text-xs">
                    <div className="bg-white p-3 rounded-lg border border-emerald-100">
                      <p className="text-slate-400 font-semibold uppercase">Customs Clearance Date</p>
                      <p className="font-black text-slate-900 text-sm mt-0.5">{data.clearance_date || '-'}</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-emerald-100">
                      <p className="text-slate-400 font-semibold uppercase">Delivery to Paiton</p>
                      <p className="font-black text-emerald-700 text-sm mt-0.5">{data.delivery_to_paiton || '-'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
