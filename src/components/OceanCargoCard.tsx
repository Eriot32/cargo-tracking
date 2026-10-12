'use client';

import { OceanCargoTracking } from '../lib/types';

interface OceanCargoCardProps {
  data: OceanCargoTracking;
}

export default function OceanCargoCard({ data }: OceanCargoCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Top Banner - Deep Maritime Blue & Warm Amber Accent */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-amber-500 px-6 sm:px-8 py-5 text-white flex flex-wrap justify-between items-center gap-4 border-b-2 border-blue-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-white text-blue-900 uppercase tracking-wider shadow-sm flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13h18M3 17h18M5 9l2-4h10l2 4M4 21h16a1 1 0 001-1v-4H3v4a1 1 0 001 1z" />
              </svg>
              Ocean Cargo / Sea Freight
            </span>
            {data.service_type && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950">
                {data.service_type}
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-mono">
            {data.bl_no || 'NO B/L'}
          </h2>
        </div>

        <div className="text-right">
          <p className="text-xs font-bold text-amber-200 uppercase tracking-wider">Vessel Name</p>
          <p className="text-lg font-extrabold text-white">{data.vessel || '-'}</p>
          <p className="text-xs font-semibold text-blue-100 mt-0.5">PO: <span className="font-extrabold text-white">{data.po || '-'}</span></p>
        </div>
      </div>

      {/* Main Info Body */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Origin - Destination Port Route */}
        <div className="bg-blue-50/70 rounded-xl p-4 sm:p-5 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex-1">
            <span className="text-xs font-bold uppercase text-blue-900 tracking-wider">Port of Loading (POL)</span>
            <p className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5">{data.pol || '-'}</p>
          </div>
          <div className="flex items-center gap-2 text-blue-700 font-extrabold px-4 py-1.5 bg-white rounded-full border border-blue-200 shadow-sm text-xs tracking-wider uppercase">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <span>Ocean Voyage</span>
          </div>
          <div className="flex-1 sm:text-right">
            <span className="text-xs font-bold uppercase text-blue-900 tracking-wider">Port of Discharge (POD)</span>
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
            <p className="text-sm font-bold text-slate-900 mt-0.5">{data.gross_weight ? `${data.gross_weight} KGS` : '-'}</p>
          </div>
        </div>

        {/* Voyage & Milestone Timeline */}
        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            Maritime Voyage & Shipment Status
          </h3>

          <div className="relative border-l-2 border-blue-400 ml-3 space-y-6 pl-6 pb-2">
            {/* Milestone: Collection / SI */}
            {(data.si_date || data.collection) && (
              <div className="relative">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white border-4 border-blue-500 shadow-sm"></div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">Shipping Instruction & Collection</span>
                  <div className="flex flex-wrap gap-6 text-xs font-semibold text-slate-700 mt-1.5">
                    {data.si_date && <span>SI Date: <span className="font-bold text-slate-900">{data.si_date}</span></span>}
                    {data.collection && <span>Collection Date: <span className="font-bold text-slate-900">{data.collection}</span></span>}
                  </div>
                </div>
              </div>
            )}

            {/* Maritime Vessel Voyage */}
            <div className="relative">
              <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow"></div>
              <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-black text-blue-900 flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13h18M3 17h18M5 9l2-4h10l2 4M4 21h16a1 1 0 001-1v-4H3v4a1 1 0 001 1z" />
                    </svg>
                    Vessel: {data.vessel || 'Vessel Assigned'}
                  </span>
                  <span className="text-xs font-bold bg-blue-600 text-white px-2.5 py-0.5 rounded-full">Sea Transit</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-xs">
                  <div className="bg-white p-3 rounded-lg border border-blue-100">
                    <p className="text-slate-400 font-bold uppercase">Departed (POL)</p>
                    <p className="text-sm font-extrabold text-slate-900 mt-0.5">{data.departed || 'TBA'}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-blue-100">
                    <p className="text-slate-400 font-bold uppercase">Arrived (POD)</p>
                    <p className="text-sm font-extrabold text-slate-900 mt-0.5">{data.arrived || 'TBA'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customs & Final Delivery */}
            {(data.clearance_date || data.delivery_to_paiton) && (
              <div className="relative">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white shadow"></div>
                <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">Customs Clearance & Delivery to Paiton</span>
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
