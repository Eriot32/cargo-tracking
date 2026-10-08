'use client';

import { CargoTracking } from '../lib/types';

interface TrackingCardProps {
  tracking: CargoTracking;
  onClick: (tracking: CargoTracking) => void;
  query?: string;
}

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query || !text) return text;
  const parts = text.toString().split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={i} className="bg-yellow-200 text-slate-900 px-0.5 rounded">{part}</span>
    ) : (
      part
    )
  );
}

export default function TrackingCard({ tracking, onClick, query = '' }: TrackingCardProps) {
  return (
    <div
      onClick={() => onClick(tracking)}
      className="group bg-white rounded-xl border border-slate-200 hover:border-primary-400 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full"
    >
      {/* Image Thumbnail */}
      <div className="relative h-48 bg-slate-100 border-b border-slate-100 overflow-hidden shrink-0">
        <img
          src={tracking.image_url}
          alt={`Tracking ${tracking.hawb}`}
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
        <div className="absolute bottom-3 left-4 right-4">
          <div className="text-white text-xs font-medium uppercase tracking-wider mb-1 opacity-80">HAWB</div>
          <div className="text-white font-mono font-bold text-lg truncate drop-shadow-md">
            {highlightMatch(tracking.hawb, query) || 'N/A'}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Routing Badge */}
        {tracking.routing && (
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200 w-full truncate">
              ✈️ {highlightMatch(tracking.routing, query)}
            </span>
          </div>
        )}

        <div className="space-y-3 flex-1">
          {/* MAWB */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">MAWB</p>
              <p className="text-sm font-medium text-slate-800 truncate">{highlightMatch(tracking.mawb, query)}</p>
            </div>
          </div>

          {/* Pengirim */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">PENGIRIM</p>
              <p className="text-sm font-medium text-slate-800 truncate">{highlightMatch(tracking.pengirim, query)}</p>
            </div>
          </div>
        </div>

        {/* PO Number Footer */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
           <div>
              <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">PONUM PIB</p>
              <p className="text-xs font-mono text-slate-600">{highlightMatch(tracking.ponum_pib, query)}</p>
           </div>
           <div className="text-right">
              <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">WEIGHT</p>
              <p className="text-xs font-medium text-slate-600">{tracking.pieces_weight}</p>
           </div>
        </div>
      </div>
    </div>
  );
}
