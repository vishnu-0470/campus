import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  User,
  RefreshCw,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { SportsCourt, TimeSlot, CourtType } from '../types';

interface SportsBookingWidgetProps {
  courts: SportsCourt[];
  slots: TimeSlot[];
  onBookSlot: (courtId: string, timeSlot: string) => Promise<void>;
  accessibilityTransparency: boolean;
  onAskAgentToBook: (courtName: string, slotTime: string) => void;
}

export const SportsBookingWidget: React.FC<SportsBookingWidgetProps> = ({
  courts,
  slots,
  onBookSlot,
  accessibilityTransparency,
  onAskAgentToBook
}) => {
  const [selectedType, setSelectedType] = useState<CourtType>('Badminton');
  const [selectedCourtId, setSelectedCourtId] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('16:00');
  const [loading, setLoading] = useState(false);
  const [bookingMessage, setBookingMessage] = useState<{
    text: string;
    isError: boolean;
    conflictInfo?: any;
  } | null>(null);

  const panelClass = accessibilityTransparency ? 'solid-panel' : 'glass-panel';

  const filteredCourts = courts.filter((c) => c.type === selectedType);

  useEffect(() => {
    if (filteredCourts.length > 0 && !filteredCourts.some(c => c.id === selectedCourtId)) {
      setSelectedCourtId(filteredCourts[0].id);
    }
  }, [selectedType, courts]);

  const handleBook = async (courtId: string, slotTime: string) => {
    setLoading(true);
    setBookingMessage(null);
    try {
      const res = await fetch('/api/sports/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courtId,
          timeSlot: slotTime
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setBookingMessage({
          text: data.message,
          isError: false
        });
        // Reload slots
        await onBookSlot(courtId, slotTime);
      } else if (res.status === 409) {
        setBookingMessage({
          text: data.message,
          isError: true,
          conflictInfo: data.conflictResolution
        });
      } else {
        setBookingMessage({
          text: data.message || 'Unable to complete reservation.',
          isError: true
        });
      }
    } catch (err) {
      setBookingMessage({
        text: 'Error contacting sports reservation engine.',
        isError: true
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${panelClass} rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-lg my-6`}>
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-400 text-white shadow-md">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              Sports Court & Turf Slot Reservation Agent
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Real-time slot scheduling & conflict-free court allocation
            </p>
          </div>
        </div>

        <span className="hidden sm:inline-block px-3 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
          ⚡ Real-Time Engine
        </span>
      </div>

      {/* Sport Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
        {(['Badminton', 'Basketball', 'Tennis', 'Football Turf'] as CourtType[]).map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedType === type
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Courts & Slot Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCourts.map((court) => {
          const courtSlots = slots.filter((s) => s.courtId === court.id);
          return (
            <div
              key={court.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {court.name}
                </h4>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  {court.location}
                </span>
              </div>

              {/* Time Slots */}
              <div className="grid grid-cols-2 gap-2 mt-3">
                {courtSlots.length > 0 ? (
                  courtSlots.map((s) => {
                    const isBooked = s.status === 'booked' || s.status === 'reserved';
                    return (
                      <div
                        key={s.id}
                        className={`p-2.5 rounded-xl border text-xs flex flex-col justify-between transition-all ${
                          isBooked
                            ? 'bg-amber-500/10 border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300'
                            : 'bg-emerald-500/10 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-500/20'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {s.startTime} - {s.endTime}
                          </span>
                          {isBooked ? (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-200 dark:bg-amber-900 font-bold">
                              TAKEN
                            </span>
                          ) : (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-200 dark:bg-emerald-900 font-bold">
                              OPEN
                            </span>
                          )}
                        </div>

                        {isBooked && (
                          <div className="text-[11px] mt-1 text-slate-600 dark:text-slate-400 flex items-center gap-1 truncate">
                            <User className="w-3 h-3 shrink-0" />
                            <span className="truncate">{s.bookedBy || 'Reserved'}</span>
                          </div>
                        )}

                        <div className="mt-2 flex items-center gap-1">
                          {isBooked ? (
                            <button
                              onClick={() => handleBook(court.id, s.startTime)}
                              className="w-full py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] transition-colors flex items-center justify-center gap-1"
                              title="Test Conflict Resolution Engine"
                            >
                              <ShieldAlert className="w-3 h-3" />
                              Test Conflict
                            </button>
                          ) : (
                            <button
                              onClick={() => handleBook(court.id, s.startTime)}
                              disabled={loading}
                              className="w-full py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition-colors"
                            >
                              Book Slot
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="col-span-2 text-xs text-slate-500 p-2 text-center">
                    No active slots loaded. Click Agent to auto-reserve.
                  </div>
                )}
              </div>

              {/* Ask Agent to Reserve */}
              <button
                onClick={() => onAskAgentToBook(court.name, '16:00')}
                className="w-full mt-3 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Ask Sports Agent to Book via AI
              </button>
            </div>
          );
        })}
      </div>

      {/* Booking Status / Conflict Feedback Box */}
      {bookingMessage && (
        <div
          className={`mt-4 p-4 rounded-xl text-xs border ${
            bookingMessage.isError
              ? 'bg-red-500/10 border-red-300 dark:border-red-800 text-red-900 dark:text-red-200'
              : 'bg-emerald-500/10 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
          }`}
          role="alert"
        >
          <div className="flex items-start gap-2">
            {bookingMessage.isError ? (
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-bold">{bookingMessage.text}</p>
              {bookingMessage.conflictInfo && (
                <div className="mt-2 p-2.5 rounded-lg bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200">
                  <p className="font-bold text-emerald-600 dark:text-emerald-400">
                    💡 Agent Conflict Resolution Suggestion:
                  </p>
                  <p className="mt-1">
                    • Alternative Slot Available:{' '}
                    <strong>{bookingMessage.conflictInfo.suggestedAlternativeSlot}</strong>
                  </p>
                  <p>
                    • Alternative Court:{' '}
                    <strong>{bookingMessage.conflictInfo.suggestedAlternativeCourt}</strong>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
