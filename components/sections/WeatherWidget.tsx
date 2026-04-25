"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Cloud, Thermometer, Wind, Droplets, Ship, Clock, Sparkles, MapPin, Sun, Eye, Gauge } from "lucide-react";
import { useCurrency } from "../CurrencyProvider";

const FERRY_SCHEDULE = [
  { route: "Port Blair → Havelock", time: "06:30 AM", arrival: "09:00 AM", operator: "Government", duration: "2h 30m", price: 600, badge: "Budget" },
  { route: "Port Blair → Havelock", time: "08:00 AM", arrival: "09:30 AM", operator: "Makruzz", duration: "1h 30m", price: 1650, badge: "Popular" },
  { route: "Port Blair → Havelock", time: "11:15 AM", arrival: "12:45 PM", operator: "Nautika", duration: "1h 30m", price: 1750, badge: "Luxury" },
  { route: "Port Blair → Neil", time: "06:00 AM", arrival: "07:45 AM", operator: "Green Ocean", duration: "1h 45m", price: 1200, badge: "Scenic" },
  { route: "Havelock → Neil", time: "10:00 AM", arrival: "11:00 AM", operator: "Makruzz", duration: "1h 00m", price: 1500, badge: "Fast" },
  { route: "Havelock → Port Blair", time: "03:00 PM", arrival: "04:30 PM", operator: "Makruzz", duration: "1h 30m", price: 1650, badge: "Popular" },
  { route: "Neil → Port Blair", time: "04:00 PM", arrival: "05:15 PM", operator: "Nautika", duration: "1h 15m", price: 1600, badge: "Comfort" },
];

// WMO Weather code → { label, emoji }
function decodeWMO(code: number): { label: string; emoji: string } {
  if (code === 0) return { label: "Clear Sky", emoji: "☀️" };
  if (code <= 2) return { label: "Partly Cloudy", emoji: "⛅" };
  if (code === 3) return { label: "Overcast", emoji: "☁️" };
  if (code <= 49) return { label: "Foggy", emoji: "🌫️" };
  if (code <= 59) return { label: "Drizzle", emoji: "🌦️" };
  if (code <= 69) return { label: "Rainy", emoji: "🌧️" };
  if (code <= 79) return { label: "Snowy", emoji: "❄️" };
  if (code <= 84) return { label: "Rain Showers", emoji: "🌦️" };
  if (code <= 94) return { label: "Thunderstorm", emoji: "⛈️" };
  return { label: "Storm", emoji: "🌩️" };
}

function fmt12(time: string) {
  if (!time) return "—";
  const [h, m] = time.split("T")[1].split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
}

function dayLabel(dateStr: string, i: number) {
  if (i === 0) return "Today";
  if (i === 1) return "Tomorrow";
  return new Date(dateStr).toLocaleDateString("en-IN", { weekday: "short" });
}

type WeatherData = {
  temp: number; feelsLike: number; humidity: number; wind: number;
  pressure: number; visibility: number; dayLength: string;
  code: number; sunrise: string; sunset: string;
  forecast: { date: string; min: number; max: number; code: number }[];
};

export default function WeatherWidget() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const scrollRef = useRef<HTMLDivElement>(null);
  const { formatPrice } = useCurrency();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=11.6234&longitude=92.7265&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,surface_pressure,visibility&daily=sunrise,sunset,weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia%2FKolkata&forecast_days=4",
        { cache: "no-store" }
      );
      if (!res.ok) throw new Error();
      const data = await res.json();
      const c = data.current;
      
      const sunriseTime = new Date(data.daily.sunrise[0]);
      const sunsetTime = new Date(data.daily.sunset[0]);
      const diffMs = sunsetTime.getTime() - sunriseTime.getTime();
      const hours = Math.floor(diffMs / 3600000);
      const minutes = Math.floor((diffMs % 3600000) / 60000);

      setWeather({
        temp: Math.round(c.temperature_2m),
        feelsLike: Math.round(c.apparent_temperature),
        humidity: c.relative_humidity_2m,
        wind: Math.round(c.wind_speed_10m),
        pressure: Math.round(c.surface_pressure),
        visibility: Math.round(c.visibility / 1000),
        dayLength: `${hours}h ${minutes}m`,
        code: c.weather_code,
        sunrise: data.daily.sunrise[0],
        sunset: data.daily.sunset[0],
        forecast: data.daily.time.slice(0, 4).map((d: string, i: number) => ({
          date: d,
          min: Math.round(data.daily.temperature_2m_min[i]),
          max: Math.round(data.daily.temperature_2m_max[i]),
          code: data.daily.weather_code[i],
        })),
      });
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // drag-scroll
  let isDown = false, startX = 0, scrollLeft = 0;
  const onMouseDown = (e: React.MouseEvent) => { isDown = true; startX = e.pageX - (scrollRef.current?.offsetLeft ?? 0); scrollLeft = scrollRef.current?.scrollLeft ?? 0; scrollRef.current?.classList.add("cursor-grabbing"); };
  const onMouseLeave = () => { isDown = false; scrollRef.current?.classList.remove("cursor-grabbing"); };
  const onMouseUp = () => { isDown = false; scrollRef.current?.classList.remove("cursor-grabbing"); };
  const onMouseMove = (e: React.MouseEvent) => { if (!isDown || !scrollRef.current) return; e.preventDefault(); scrollRef.current.scrollLeft = scrollLeft - (e.pageX - scrollRef.current.offsetLeft - startX) * 2; };

  const w = weather;
  const condition = w ? decodeWMO(w.code) : null;

  return (
    <section id="weather" className="section-padding bg-pearl dark:bg-midnight overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
          <div className="badge-gold mx-auto mb-4 w-fit"><Sparkles className="w-3.5 h-3.5" /> Live Info</div>
          <h2 className="section-title text-midnight dark:text-white mb-4">
            Weather & <span className="text-gradient-gold">Ferry Schedule</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto mt-4">
            Live Port Blair weather and inter-island ferry timings. Plan your island-hopping perfectly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Weather Card */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }} className="card-luxury p-8 lg:col-span-4 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-ocean" />
                <h3 className="font-serif font-semibold text-lg text-midnight dark:text-white">Port Blair</h3>
              </div>
              {!loading && !error && (
                <span className="text-[10px] text-green-500 font-sans font-semibold bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">● Live</span>
              )}
            </div>

            {loading && (
              <div className="flex-1 space-y-4 animate-pulse">
                <div className="h-20 bg-gray-100 dark:bg-white/5 rounded-2xl" />
                <div className="grid grid-cols-3 gap-3">
                  {[1,2,3].map(i => <div key={i} className="h-16 bg-gray-100 dark:bg-white/5 rounded-2xl" />)}
                </div>
                <div className="h-12 bg-gray-100 dark:bg-white/5 rounded-2xl" />
              </div>
            )}

            {error && !loading && (
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-3">
                <span className="text-5xl">⛅</span>
                <p className="text-sm text-warmgray font-sans">Sunny tropical weather awaits!</p>
                <p className="text-xs text-warmgray/60 font-sans">Typical: 28–32°C · Humidity 75%</p>
                <button onClick={fetchWeather} className="text-xs text-champagne hover:underline font-sans">Retry</button>
              </div>
            )}

            {w && condition && !loading && (
              <>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-7xl">{condition.emoji}</span>
                  <div>
                    <div className="font-serif text-5xl font-bold text-midnight dark:text-white">{w.temp}°C</div>
                    <div className="font-sans text-warmgray dark:text-gray-400 text-sm">{condition.label}</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div className="text-center p-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                    <Thermometer className="w-4 h-4 text-champagne mx-auto mb-1" />
                    <div className="font-semibold text-sm text-midnight dark:text-white font-sans">{w.feelsLike}°</div>
                    <div className="text-[10px] text-warmgray font-sans uppercase tracking-wider">Feels</div>
                  </div>
                  <div className="text-center p-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                    <Droplets className="w-4 h-4 text-ocean mx-auto mb-1" />
                    <div className="font-semibold text-sm text-midnight dark:text-white font-sans">{w.humidity}%</div>
                    <div className="text-[10px] text-warmgray font-sans uppercase tracking-wider">Humid</div>
                  </div>
                  <div className="text-center p-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                    <Wind className="w-4 h-4 text-palm mx-auto mb-1" />
                    <div className="font-semibold text-sm text-midnight dark:text-white font-sans">{w.wind}<span className="text-[10px]">km/h</span></div>
                    <div className="text-[10px] text-warmgray font-sans uppercase tracking-wider">Wind</div>
                  </div>
                  <div className="text-center p-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                    <Gauge className="w-4 h-4 text-champagne mx-auto mb-1" />
                    <div className="font-semibold text-sm text-midnight dark:text-white font-sans">{w.pressure}<span className="text-[10px]">hPa</span></div>
                    <div className="text-[10px] text-warmgray font-sans uppercase tracking-wider">Pressure</div>
                  </div>
                  <div className="text-center p-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                    <Eye className="w-4 h-4 text-ocean mx-auto mb-1" />
                    <div className="font-semibold text-sm text-midnight dark:text-white font-sans">{w.visibility}<span className="text-[10px]">km</span></div>
                    <div className="text-[10px] text-warmgray font-sans uppercase tracking-wider">Visibility</div>
                  </div>
                  <div className="text-center p-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                    <Sun className="w-4 h-4 text-palm mx-auto mb-1" />
                    <div className="font-semibold text-sm text-midnight dark:text-white font-sans">{w.dayLength}</div>
                    <div className="text-[10px] text-warmgray font-sans uppercase tracking-wider">Daylight</div>
                  </div>
                </div>

                {/* Sunrise / Sunset */}
                <div className="flex items-center justify-around text-xs font-sans mb-5 bg-gray-50 dark:bg-white/5 rounded-2xl p-3 border border-gray-100 dark:border-white/10">
                  <div className="text-center"><span className="text-xl">🌅</span><div className="text-warmgray mt-1">Rise</div><div className="font-semibold text-midnight dark:text-white">{fmt12(w.sunrise)}</div></div>
                  <div className="w-px h-8 bg-gray-200 dark:bg-white/10" />
                  <div className="text-center"><span className="text-xl">🌇</span><div className="text-warmgray mt-1">Set</div><div className="font-semibold text-midnight dark:text-white">{fmt12(w.sunset)}</div></div>
                </div>

                {/* 4-day forecast */}
                <div className="grid grid-cols-4 gap-2">
                  {w.forecast.map((f, i) => {
                    const fc = decodeWMO(f.code);
                    return (
                      <div key={i} className={`text-center p-2 rounded-xl text-xs font-sans ${i === 0 ? "bg-champagne/10 border border-champagne/30" : "bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5"}`}>
                        <div className="text-warmgray dark:text-gray-400 text-[10px] mb-1">{dayLabel(f.date, i)}</div>
                        <div className="text-lg">{fc.emoji}</div>
                        <div className="font-semibold text-midnight dark:text-white">{f.max}°</div>
                        <div className="text-warmgray dark:text-gray-500">{f.min}°</div>
                      </div>
                    );
                  })}
                </div>

                <p className="text-xs text-warmgray dark:text-gray-500 font-sans mt-4 text-center">Best time to visit: Oct – May 🌞</p>
              </>
            )}
          </motion.div>

          {/* Ferry Schedule */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }} className="lg:col-span-8 flex flex-col">
            <div className="flex items-center gap-2 mb-4 px-2">
              <Ship className="w-5 h-5 text-ocean" />
              <h3 className="font-serif font-semibold text-xl text-midnight dark:text-white">Inter-Island Ferries</h3>
            </div>
            <div
              ref={scrollRef} onMouseDown={onMouseDown} onMouseLeave={onMouseLeave}
              onMouseUp={onMouseUp} onMouseMove={onMouseMove}
              className="flex overflow-x-auto gap-4 pb-6 snap-x snap-mandatory cursor-grab w-full"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as any}
            >
              {FERRY_SCHEDULE.map((f, i) => (
                <div key={i} className="min-w-[280px] md:min-w-[320px] card-luxury p-6 snap-center flex-shrink-0 select-none">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-champagne/10 text-champagne text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">{f.badge}</span>
                    <Ship className="w-5 h-5 text-gray-300 dark:text-white/20" />
                  </div>
                  <h4 className="font-serif font-bold text-lg text-midnight dark:text-white mb-1">{f.route}</h4>
                  <div className="text-sm font-sans text-ocean dark:text-ocean-light font-medium mb-5">{f.operator}</div>
                  <div className="grid grid-cols-2 gap-4 mb-5 border-t border-b border-gray-100 dark:border-white/10 py-4">
                    <div><div className="text-[10px] text-warmgray uppercase tracking-wider mb-1">Departure</div><div className="font-semibold text-sm text-midnight dark:text-white flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-champagne" /> {f.time}</div></div>
                    <div><div className="text-[10px] text-warmgray uppercase tracking-wider mb-1">Arrival</div><div className="font-semibold text-sm text-midnight dark:text-white flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-ocean" /> {f.arrival}</div></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-warmgray font-sans flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {f.duration}</div>
                    <div className="font-serif font-bold text-gradient-gold text-lg">{formatPrice(f.price)}</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-warmgray dark:text-gray-500 font-sans mt-2 mb-6 text-center">⚠️ Slide to view all ferries. We arrange all tickets seamlessly!</p>

            {/* Travel Info Cards — fill all remaining space */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-gray-50 dark:bg-white/5 p-3.5 rounded-2xl border border-gray-100 dark:border-white/10 flex items-start gap-3">
                <div className="p-1.5 bg-champagne/10 rounded-lg text-champagne shrink-0"><Sparkles className="w-3.5 h-3.5" /></div>
                <div>
                  <h5 className="font-serif text-xs font-bold text-midnight dark:text-white">Tourist Helpline</h5>
                  <p className="text-[11px] text-warmgray font-sans mt-0.5">1800-345-2200 (Free)</p>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-white/5 p-3.5 rounded-2xl border border-gray-100 dark:border-white/10 flex items-start gap-3">
                <div className="p-1.5 bg-ocean/10 rounded-lg text-ocean shrink-0"><MapPin className="w-3.5 h-3.5" /></div>
                <div>
                  <h5 className="font-serif text-xs font-bold text-midnight dark:text-white">Best Beach Visit</h5>
                  <p className="text-[11px] text-warmgray font-sans mt-0.5">5:30 AM – Radhanagar Sunrise</p>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-white/5 p-3.5 rounded-2xl border border-gray-100 dark:border-white/10 flex items-start gap-3">
                <div className="p-1.5 bg-palm/10 rounded-lg text-palm shrink-0"><Ship className="w-3.5 h-3.5" /></div>
                <div>
                  <h5 className="font-serif text-xs font-bold text-midnight dark:text-white">Ferry Tip</h5>
                  <p className="text-[11px] text-warmgray font-sans mt-0.5">Arrive 45 min early</p>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-white/5 p-3.5 rounded-2xl border border-gray-100 dark:border-white/10 flex items-start gap-3">
                <div className="p-1.5 bg-rose-500/10 rounded-lg text-rose-500 shrink-0"><Sun className="w-3.5 h-3.5" /></div>
                <div>
                  <h5 className="font-serif text-xs font-bold text-midnight dark:text-white">UV Index</h5>
                  <p className="text-[11px] text-warmgray font-sans mt-0.5">High – carry SPF 50+</p>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-white/5 p-3.5 rounded-2xl border border-gray-100 dark:border-white/10 flex items-start gap-3">
                <div className="p-1.5 bg-champagne/10 rounded-lg text-champagne shrink-0"><Clock className="w-3.5 h-3.5" /></div>
                <div>
                  <h5 className="font-serif text-xs font-bold text-midnight dark:text-white">Local Time Zone</h5>
                  <p className="text-[11px] text-warmgray font-sans mt-0.5">IST (UTC +5:30)</p>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-white/5 p-3.5 rounded-2xl border border-gray-100 dark:border-white/10 flex items-start gap-3">
                <div className="p-1.5 bg-ocean/10 rounded-lg text-ocean shrink-0"><Droplets className="w-3.5 h-3.5" /></div>
                <div>
                  <h5 className="font-serif text-xs font-bold text-midnight dark:text-white">Sea Condition</h5>
                  <p className="text-[11px] text-warmgray font-sans mt-0.5">Calm · Good for ferries</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
