'use client';
import { createContext, useContext, useRef, ReactNode } from 'react';

type SoundContextType = {
  play: (sound: string) => void;
};

const SoundContext = createContext<SoundContextType | null>(null);

export function SoundProvider({ children }: { children: ReactNode }) {
  const sounds = useRef<{ [key: string]: HTMLAudioElement }>({});

  const play = (name: string) => {
    if (!sounds.current[name]) {
      sounds.current[name] = new Audio(`/sounds/${name}.mp3`);
      sounds.current[name].volume = 0.3;
    }
    const audio = sounds.current[name];
    audio.currentTime = 0;
    audio.play().catch(console.error);
  };

  return (
    <SoundContext.Provider value={{ play }}>
      {children}
    </SoundContext.Provider>
  );
}

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) throw new Error('useSound deve estar dentro de SoundProvider');
  return context;
};
