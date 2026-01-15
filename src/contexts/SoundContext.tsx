'use client';
import { createContext, useContext, useRef, ReactNode, useState } from 'react';
import Cookies from 'js-cookie';

interface SoundContextType {
  play: (sound: string, loop?: boolean) => void;
  stopSound: (sound: string) => void;            
  stopAll: () => void;                           
  volume: number;
  changeSVolume: (volume: number) => void;
}

const SoundContext = createContext<SoundContextType | null>(null);

export function SoundProvider({ children }: { children: ReactNode }) {
  const sounds = useRef<{ [key: string]: HTMLAudioElement }>({});
  const [volume, setVolume] = useState(
    Cookies.get('soundVolume') ? parseFloat(Cookies.get('soundVolume') as string) : 0.1
  );

  const play = (sound: string, loop?:boolean) => {
    if (!sounds.current[sound]) {
      sounds.current[sound] = new Audio(`/sounds/${sound}`);
      sounds.current[sound].volume = volume;
      sounds.current[sound].loop = loop||false;
    }
    const audio = sounds.current[sound];
    audio.currentTime = 0;
    audio.play().catch(console.error);
  };

  const stopSound = (sound: string) => {
    if (sounds.current[sound]) {
      sounds.current[sound].pause();
      sounds.current[sound].currentTime = 0;
    }
  };

  const stopAll = () => {
    Object.keys(sounds.current).forEach(sound => stopSound(sound));
  };

  const changeSVolume = (newVolume: number) => {
    setVolume(newVolume);
    Object.values(sounds.current).forEach(audio => {
      audio.volume = newVolume;
    });
    setTimeout(() => {
      Cookies.set('soundVolume', newVolume.toString());
    }, 0);
  };

  return (
    <SoundContext.Provider value={{ play, stopSound, stopAll, volume, changeSVolume }}>
      {children}
    </SoundContext.Provider>
  );
}

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) throw new Error('useSound deve estar dentro de SoundProvider');
  return context;
};
