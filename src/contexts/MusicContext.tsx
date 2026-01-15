'use client';
import { createContext, useContext, useRef, ReactNode, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface MusicContextType {
  playMusic: (musicFile: string) => void;
  stopMusic: () => void;
  togglePause: () => void;
  isPlaying: boolean;
  currentTrack: string | null;
  volume: number;
  changeMVolume: (volume: number) => void;
};

const MusicContext = createContext<MusicContextType | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(
    Cookies.get('musicVolume') ? parseFloat(Cookies.get('musicVolume') as string) : 0.3
  );

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    Cookies.set('musicVolume', volume.toString());
  }, [volume]);

  const playMusic = (musicFile: string) => {
    const src = `/music/${musicFile}`;

    if (audioRef.current && currentTrack === src) {
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
      return;
    }
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = volume;

    audioRef.current = audio;
    setCurrentTrack(src);

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(err => {
        console.error(err);
        setIsPlaying(false);
      });
  };

  const stopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  };

  const togglePause = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const changeMVolume = (newVolume: number) => {
    setVolume(newVolume);
  };

  return (
    <MusicContext.Provider
      value={{ playMusic, stopMusic, togglePause, isPlaying, currentTrack, volume, changeMVolume }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export const useMusic = () => {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error('useMusic deve estar dentro de MusicProvider');
  return ctx;
};
