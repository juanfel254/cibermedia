/* import { useEffect, useRef } from 'react';

const AudioWaveform = ({ src }) => {
  const waveformRef = useRef(null);

  useEffect(() => {
    let WaveSurfer = null;
    let TimelinePlugin = null;
    let CursorPlugin = null;

    const loadWavesurfer = async () => {
      if (!WaveSurfer) {
        WaveSurfer = await import('wavesurfer.js');
      }

      if (!TimelinePlugin) {
        TimelinePlugin = await import('wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js');
      }

      if (!CursorPlugin) {
        CursorPlugin = await import('wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js');
      }

      const wavesurfer = WaveSurfer.default.create({
        container: waveformRef.current,
        waveColor: 'violet',
        progressColor: 'purple',
        fetchParams: { mode: "no=cors" }
      });

      wavesurfer.load(src);

      wavesurfer.on('ready', () => {
        // Waveform is ready
      });

      // Add plugins if desired
      wavesurfer.addPlugin(TimelinePlugin.default.create({ container: '#timeline' }));
      wavesurfer.addPlugin(CursorPlugin.default.create({ showTime: true, opacity: 1 }));

      // Clean up on component unmount
      return () => {
        wavesurfer.destroy();
      };
    };

    // Check if running on the client-side
    if (typeof window !== 'undefined') {
      loadWavesurfer();
    }
  }, [src]);

  return (
    <div>
      <div ref={waveformRef} />
      <div id="timeline" />
    </div>
  );
};

export default AudioWaveform; */

import React, { useState, useEffect, useRef } from 'react';
import styles from "@/styles/audioPlayer/audioPlayer.module.css"
import Image from 'next/image';

const AudioPlayer = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [waveformWidth, setWaveformWidth] = useState(0);

  const audioRef = useRef(null);
  const waveformRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleCanPlayThrough = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('canplaythrough', handleCanPlayThrough);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
    };
  }, []);

  useEffect(() => {
    const calculatedWidth = (currentTime / duration) * 100;
    console.log(currentTime, duration)
    setWaveformWidth(calculatedWidth);
  }, [currentTime, duration]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleReplay = () => {
    const audio = audioRef.current;
    audio.currentTime = 0;
    audio.play();
    setIsPlaying(true);
  };

  const handleForward = () => {
    const audio = audioRef.current;
    audio.currentTime += 5;
  };

  const handleBackward = () => {
    const audio = audioRef.current;
    audio.currentTime -= 5;
  };

  const handleImageClick = (event) => {
    const waveform = waveformRef.current;
    if (waveform) {
      const rect = waveform.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const newTime = (offsetX / rect.width) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <>
    <div className={styles.audio_player}>
      <div className={styles.audio_waveform} style={{ paddingRight: waveformWidth + "%" }}></div>
        <img 
          src="/backgrounds/Imagen4.png"
          width={800}
          height={50} 
          alt="Waveform" 
          className={styles.waveform_image}
          onClick={handleImageClick} 
        />
      <audio ref={audioRef} src={src}></audio>
    </div>
    <div className={styles.audio_controls}>
      <button className={styles.backward} onClick={handleBackward}>
        Retroceder -5s
      </button>
      <button className={styles.play_pause} onClick={handlePlayPause}>
        {isPlaying ? 'Pausa' : 'Reproducir'}
      </button>
      <button className={styles.replay} onClick={handleReplay}>
        Replay
      </button>
      <button className={styles.forward} onClick={handleForward}>
        Avanzar +5s
      </button>

    </div>
    </>
  );
};

export default AudioPlayer;
