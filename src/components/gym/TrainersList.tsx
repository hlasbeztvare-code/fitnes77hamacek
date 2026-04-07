import { getAllTrainers } from '@/lib/queries/trainers';
import { TrainersListClient } from './TrainersListClient';

export const TrainersList = async () => {
  const trainers = await getAllTrainers();

  return (
    <div className="bg-black py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* Levá strana - Headline (smrk) */}
        <div>
          <span className="text-[#d4ff00] font-space text-xs tracking-[0.8em] uppercase mb-6 block">
            THE MENTORS
          </span>
          <h2 className="text-7xl md:text-8xl font-black text-white font-bebas leading-[0.8] mb-12 italic tracking-tighter">
            NAŠI <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1px #fff' }}>LÍDŘI</span>
          </h2>
          
          <TrainersListClient trainers={trainers} />
        </div>

        {/* Pravá strana - Ten výraznej neonovej box (smrk) */}
        <div className="relative">
          <div className="bg-[#d4ff00] p-12 md:p-20 rounded-[2rem] h-full flex flex-col justify-between overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-6xl md:text-7xl font-black text-black font-bebas leading-[0.85] uppercase italic tracking-tighter mb-8">
                PŘIDEJ SE<br />K NÁM
              </h2>
              <p className="text-black font-space text-sm font-bold leading-relaxed max-w-sm uppercase">
                NEJSME JEN FITKO. JSME KOMUNITNÍ GYM, KTERÝ TĚ POSUNE ZA TVOJE LIMITY. 
                PŘIJĎ SE PODÍVAT A ZJISTI, PROČ JSME JEDNIČKA V MLADÉ BOLESLAVI.
              </p>
            </div>
            
            <div className="mt-20 relative z-10">
                <span className="text-black font-bebas text-9xl leading-none opacity-20 font-black tracking-tighter select-none">
                    F77.CZ
                </span>
            </div>
            
            {/* Dekorace na pozadí (smrk) */}
            <div className="absolute -bottom-10 -right-10 text-[20rem] font-black text-black/5 font-bebas italic select-none">
                77
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
