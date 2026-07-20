import { useAppStore } from '../../store';
import { Trophy, Play, Clock, Users } from 'lucide-react';
import { FeatureGate, FeatureComingSoon } from '../../components/FeatureGate';

const matches = [
  { id: 1, home: 'Al Hilal', away: 'Al Nassr', score: '2 - 1', status: 'live', league: 'Saudi Pro League', time: '72\'' },
  { id: 2, home: 'Barcelona', away: 'Real Madrid', score: '0 - 0', status: 'upcoming', league: 'La Liga', time: '20:00' },
  { id: 3, home: 'Man City', away: 'Liverpool', score: '3 - 2', status: 'finished', league: 'Premier League', time: 'FT' },
];

const sports = [
  { id: 1, title: 'Football', titleAr: 'كرة القدم', emoji: '⚽', count: 24 },
  { id: 2, title: 'Basketball', titleAr: 'كرة السلة', emoji: '🏀', count: 12 },
  { id: 3, title: 'Tennis', titleAr: 'التنس', emoji: '🎾', count: 8 },
  { id: 4, title: 'Boxing', titleAr: 'الملاكمة', emoji: '🥊', count: 5 },
];

export default function Sports() {
  const language = useAppStore((s) => s.language);
  const isRTL = language === 'ar';

  return (
    <FeatureGate feature="sports" fallback={<FeatureComingSoon label={isRTL ? 'الرياضة' : 'Sports'} />}>
      <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>

        <div className="flex items-center gap-3">
          <Trophy size={24} className="text-shams-400" />
          <h1 className="text-2xl font-bold text-white">{isRTL ? 'الرياضة' : 'Sports'}</h1>
        </div>

        {/* فئات الرياضة */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {sports.map((s) => (
            <button key={s.id} className="shams-card flex items-center gap-3 hover:border-shams-500/50 transition-all">
              <span className="text-2xl">{s.emoji}</span>
              <div className="text-left">
                <p className="font-semibold text-white text-sm">{isRTL ? s.titleAr : s.title}</p>
                <p className="text-xs text-gray-500">{s.count} {isRTL ? 'مباراة' : 'matches'}</p>
              </div>
            </button>
          ))}
        </div>

        {/* المباريات */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-white">{isRTL ? 'المباريات' : 'Matches'}</h2>
          {matches.map((match) => (
            <div key={match.id} className="shams-card">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-500 font-medium">{match.league}</span>
                {match.status === 'live' && (
                  <span className="flex items-center gap-1 text-xs text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full font-bold">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                    LIVE {match.time}
                  </span>
                )}
                {match.status === 'upcoming' && (
                  <span className="flex items-center gap-1 text-xs text-gray-400 bg-gray-800 px-2 py-0.5 rounded-full">
                    <Clock size={10} /> {match.time}
                  </span>
                )}
                {match.status === 'finished' && (
                  <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">{match.time}</span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                    <Users size={14} className="text-gray-400" />
                  </div>
                  <span className="font-bold text-white">{match.home}</span>
                </div>
                <div className="text-center px-4">
                  <span className={`text-xl font-black ${match.status === 'live' ? 'text-shams-400' : 'text-white'}`}>
                    {match.score}
                  </span>
                </div>
                <div className="flex items-center gap-3 flex-1 justify-end">
                  <span className="font-bold text-white">{match.away}</span>
                  <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                    <Users size={14} className="text-gray-400" />
                  </div>
                </div>
              </div>
              {match.status === 'live' && (
                <button className="w-full mt-3 shams-btn-primary flex items-center justify-center gap-2 py-2 text-sm">
                  <Play size={14} />
                  {isRTL ? 'شاهد المباشر' : 'Watch Live'}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </FeatureGate>
  );
}
