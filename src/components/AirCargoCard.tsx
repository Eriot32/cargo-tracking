'use client';

import { AirCargoTracking } from '../lib/types';

interface AirCargoCardProps {
  data: AirCargoTracking;
}

export default function AirCargoCard({ data }: AirCargoCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl border-2 border-amber-300 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-400">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 px-6 py-5 text-slate-950 flex flex-wrap justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-slate-900 text-amber-300 uppercase tracking-wider">
              ✈️ Package / Air Cargo
            </span>
            {data.service_type && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/70 text-slate-900 border border-slate-900/10">
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
          <p className="text-lg font-extrabold text-slate-950 font-mono">{data.mawb_bl || '-'}</p>
          <p className="text-xs font-medium text-slate-800">PO: <span className="font-bold">{data.po || '-'}</span></p>
        </div>
      </div>

      {/* Main Info Grid */}
      <div className="p-6 space-y-6">
        {/* Origin - Destination Ports */}
        <div className="bg-amber-50/60 rounded-xl p-4 border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex-1">
            <span className="text-xs font-bold uppercase text-amber-900 tracking-wider">Port of Loading (POL)</span>
            <p className="text-base font-extrabold text-slate-900">{data.pol || '-'}</p>
          </div>
          <div className="flex items-center gap-2 text-amber-600 font-bold px-3 py-1 bg-white rounded-full border border-amber-200 shadow-sm text-sm">
            <span>✈️</span>
            <span>AIR ROUTE</span>
            <span>➔</span>
          </div>
          <div className="flex-1 sm:text-right">
            <span className="text-xs font-bold uppercase text-amber-900 tracking-wider">Port of Discharge (POD)</span>
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
            <p className="text-sm font-bold text-slate-900">{data.gw ? `${data.gw} KGS` : '-'}</p>
          </div>
        </div>

        {/* Flight & Milestone Timeline */}
        <div>
          <h3 className="text-base font-extrabold text-slate-900 mb-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            Flight Schedule & Shipment Milestones
          </h3>

          <div className="relative border-l-2 border-amber-400 ml-3 space-y-6 pl-6 pb-2">
            {/* Milestone: Collection / SI */}
            {(data.si_date || data.collection) && (
              <div className="relative">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white border-4 border-amber-500"></div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span className="text-xs font-bold text-amber-800 uppercase">Collection & SI</span>
                  <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-700 mt-1">
                    {data.si_date && <span>SI Date: <span className="font-bold text-slate-900">{data.si_date}</span></span>}
                    {data.collection && <span>Collection: <span className="font-bold text-slate-900">{data.collection}</span></span>}
                  </div>
                </div>
              </div>
            )}

            {/* Flight 1 */}
            {(data.fl1_flight || data.fl1_origin) && (
              <div className="relative">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-red-500 border-2 border-white shadow"></div>
                <div className="bg-red-50/50 p-4 rounded-xl border border-red-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-black text-red-700">Flight: {data.fl1_flight || 'TBA'}</span>
                    <span className="text-xs font-bold bg-red-100 text-red-800 px-2.5 py-0.5 rounded-full">Leg 1</span>
                  </div>
                  <p className="text-xs font-bold text-slate-700 mb-2">Sector: {data.fl1_origin || '-'}</p>
                  <p className="text-xs font-medium text-slate-600">
                    Departed: <span className="font-bold text-slate-900">{data.fl1_departed || 'TBA'}</span>
                  </p>
                </div>
              </div>
            )}

            {/* Flight 2 */}
            {(data.fl2_flight || data.fl2_destination) && (
              <div className="relative">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow"></div>
                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-black text-blue-700">Flight: {data.fl2_flight || 'TBA'}</span>
                    <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">Leg 2</span>
                  </div>
                  <p className="text-xs font-bold text-slate-700 mb-2">Sector: {data.fl2_destination || '-'}</p>
                  <p className="text-xs font-medium text-slate-600">
                    Arrived: <span className="font-bold text-slate-900">{data.fl2_arrived || 'TBA'}</span>
                  </p>
                </div>
              </div>
            )}

            {/* Customs & Final Delivery */}
            {(data.clearance_date || data.delivery_to_paiton) && (
              <div className="relative">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white shadow"></div>
                <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Clearance & Delivery to Paiton</span>
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
