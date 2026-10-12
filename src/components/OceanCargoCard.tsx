'use client';

import { OceanCargoTracking } from '../lib/types';

interface OceanCargoCardProps {
  data: OceanCargoTracking;
}

export default function OceanCargoCard({ data }: OceanCargoCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-400 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-400">
      {/* Top Banner with Blue & Gold theme */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-amber-500 px-6 py-5 text-white flex flex-wrap justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-white text-blue-900 uppercase tracking-wider shadow-sm">
              🚢 Ocean Cargo / Sea Freight
            </span>
            {data.service_type && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-slate-950">
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
          <p className="text-xs font-medium text-blue-100">PO: <span className="font-bold text-white">{data.po || '-'}</span></p>
        </div>
      </div>

      {/* Main Info Grid */}
      <div className="p-6 space-y-6">
        {/* Origin - Destination Ports */}
        <div className="bg-blue-50/70 rounded-xl p-4 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex-1">
            <span className="text-xs font-bold uppercase text-blue-900 tracking-wider">Port of Loading (POL)</span>
            <p className="text-base font-extrabold text-slate-900">{data.pol || '-'}</p>
          </div>
          <div className="flex items-center gap-2 text-blue-700 font-bold px-3 py-1 bg-white rounded-full border border-blue-200 shadow-sm text-sm">
            <span>🚢</span>
            <span>OCEAN ROUTE</span>
            <span>➔</span>
          </div>
          <div className="flex-1 sm:text-right">
            <span className="text-xs font-bold uppercase text-blue-900 tracking-wider">Port of Discharge (POD)</span>
            <p className="text-base font-extrabold text-slate-900">{data.pod || '-'}</p>
          </div>
        </div>

        {/* Shipper & Consignee, Qty & Weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div>
            <p className="text-xs font-bold uppercase text-slate-400">Shipper</p>
            <p className="text-sm font-bold text-slate-900 uppercase">{data.shipper || '-'}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-slate-400">Consignee</p>
            <p className="text-sm font-bold text-slate-900 uppercase">{data.consignee || '-'}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-slate-400">Quantity</p>
            <p className="text-sm font-bold text-slate-900">{data.qty || '-'}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-slate-400">Gross Weight</p>
            <p className="text-sm font-bold text-slate-900">{data.gross_weight ? `${data.gross_weight} KGS` : '-'}</p>
          </div>
        </div>

        {/* Voyage & Milestones Timeline */}
        <div>
          <h3 className="text-base font-extrabold text-slate-900 mb-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            Maritime Voyage & Shipment Status
          </h3>

          <div className="relative border-l-2 border-blue-500 ml-3 space-y-6 pl-6 pb-2">
            {/* Milestone: Collection / SI */}
            {(data.si_date || data.collection) && (
              <div className="relative">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white border-4 border-blue-500"></div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span className="text-xs font-bold text-blue-900 uppercase">Shipping Instruction & Collection</span>
                  <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-700 mt-1">
                    {data.si_date && <span>SI Date: <span className="font-bold text-slate-900">{data.si_date}</span></span>}
                    {data.collection && <span>Collection: <span className="font-bold text-slate-900">{data.collection}</span></span>}
                  </div>
                </div>
              </div>
            )}

            {/* Maritime Vessel Voyage */}
            <div className="relative">
              <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow"></div>
              <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-black text-blue-900 flex items-center gap-1.5">
                    ⚓ Vessel: {data.vessel || 'Vessel Assigned'}
                  </span>
                  <span className="text-xs font-bold bg-blue-600 text-white px-2.5 py-0.5 rounded-full">Sea Transit</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-xs">
                  <div className="bg-white p-2.5 rounded-lg border border-blue-100">
                    <p className="text-slate-400 font-bold uppercase">Departed (POL)</p>
                    <p className="text-sm font-extrabold text-slate-900">{data.departed || 'TBA'}</p>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-blue-100">
                    <p className="text-slate-400 font-bold uppercase">Arrived (POD)</p>
                    <p className="text-sm font-extrabold text-slate-900">{data.arrived || 'TBA'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customs & Final Delivery */}
            {(data.clearance_date || data.delivery_to_paiton) && (
              <div className="relative">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white shadow"></div>
                <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Customs Clearance & Delivery to Paiton</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 text-xs">
                    <div className="bg-white p-2 rounded border border-emerald-100">
                      <p className="text-slate-400 font-semibold">Customs Clearance Date</p>
                      <p className="font-bold text-slate-900 text-sm">{data.clearance_date || '-'}</p>
                    </div>
                    <div className="bg-white p-2 rounded border border-emerald-100">
                      <p className="text-slate-400 font-semibold">Delivery to Paiton</p>
                      <p className="font-bold text-emerald-700 text-sm">{data.delivery_to_paiton || '-'}</p>
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
