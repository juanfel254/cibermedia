import React, { useState, useEffect, useRef } from 'react';
import styles from "@/styles/audioPlayer/audioPlayer.module.css"
import Image from 'next/image';

const AudioPlayer = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [waveformWidth, setWaveformWidth] = useState(0);
  const [wavePicture, setWavePicture] = useState("/backgrounds/waveform.png")

  const audioRef = useRef(null);
  const waveformRef = useRef(null);

  useEffect(()=> {
    if(window.innerWidth < 1050) {
      setWavePicture("/backgrounds/waveformMobile.png")
    } else {
      setWavePicture("/backgrounds/waveform.png")
    }
  }, [])

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


  function convertSecs(seconds) {return ((Math.round(seconds % 0x3C)).toString())}
  function convertHrs(seconds) {return ((Math.floor(seconds / 0xE10)).toString())}
  function convertMins(seconds) {return ((Math.floor(seconds / 0x3C ) % 0x3C).toString())}

  return (
    <>
    <div className={styles.audio_player_all_container}>
      <div className={styles.audio_player_container}>
        <div className={styles.audio_player}>
          <div className={styles.audio_waveform} style={{ paddingRight: waveformWidth + "%" }}></div>
            <img 
              src={wavePicture}
              width={800}
              height={50} 
              alt="Waveform" 
              className={styles.waveform_image}
              onClick={handleImageClick} 
            />
          <audio ref={audioRef} src={src}></audio>
        </div>

        <div className={styles.audio_controls}>

          <button 
            className={styles.play_pause} 
            onClick={currentTime === duration ? handleReplay : handlePlayPause}>
            { currentTime !== duration ? 
              <Image
                src={`/icons/${ isPlaying ? 'Pause-button' : 'Play-button'}.png`}
                alt='Play-pause button'
                height={50}
                width={50}
              /> : 
              <Image
                src={`/icons/Replay-button.svg`}
                alt='Replay button'
                height={50}
                width={50}
              />
            }
          </button>
        </div>
      </div>
      <div className={styles.time_controls}>
        <button className={styles.backward} onClick={handleBackward}>
        <Image
          src={'/icons/Backward-button.png'}
          alt='Forward button'
          width={20}
          height={20}
        /> 
        <p>-5s</p>
        </button>
        <p className={styles.audio_time}>
          {convertMins(currentTime)}:{convertSecs(currentTime)} / {convertMins(duration)}:{convertSecs(duration)} 
        </p>
        <button className={styles.forward} onClick={handleForward}>
          <p>+5s</p>
          <Image
            src={'/icons/Forward-button.png'}
            alt='Forward button'
            width={20}
            height={20}
          />
        </button>
      </div>
    </div>
    </>
  );
};

export default AudioPlayer;
