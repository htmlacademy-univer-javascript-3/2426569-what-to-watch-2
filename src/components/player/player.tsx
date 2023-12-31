import React, {useEffect, useRef, useState} from 'react';

import {useNavigate} from 'react-router-dom';
import {Icon} from '../icon/icon.tsx';
import {ICONS} from '../icon/icons.ts';
import {formatDuration} from '../../utils/time-format.ts';
import {FilmDetailsInfo} from '../../types/film-details-info.ts';

interface PlayerProps {
  film: FilmDetailsInfo;
}

function PlayerComponent({film: {posterImage, videoLink, name, runTime}}: PlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [lastTime, setLastTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();


  useEffect(() => {
    if (videoRef.current && videoRef.current?.paused !== !isPlaying) {
      setIsPlaying(!isPlaying);
    }
  }, [videoRef.current?.paused]);

  const handlePlayClick = () => {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleMuteClick = () => {
    setIsMuted(!isMuted);
  };

  const handleFullscreenClick = () => {
    videoRef.current?.requestFullscreen();
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setLastTime(videoRef.current?.currentTime);
      setProgress((videoRef.current?.currentTime / runTime) * 100);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="player">
      <video
        ref={videoRef}
        src={videoLink}
        muted={!isMuted}
        className="player__video"
        poster={posterImage}
        onTimeUpdate={handleTimeUpdate}
      >
        <source src={videoLink} type="video/mp4"/>
      </video>

      <button type="button" className="player__exit" onClick={handleGoBack}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={progress} max="100"></progress>
            <div className="player__toggler" style={{left: `${progress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{formatDuration(runTime - lastTime)}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={handlePlayClick}>
            {
              !isPlaying ? <><Icon {...ICONS.PLAY_START}/><span>Play</span></>
                : <><Icon {...ICONS.PAUSE}/><span>Pause</span></>
            }
          </button>
          <button type="button" className="player__play" onClick={handleMuteClick}>
            {
              isMuted ? <><Icon {...ICONS.MUTE}/><span>Mute</span></>
                : <><Icon {...ICONS.UNMUTE}/><span>Unmute</span></>
            }
          </button>
          <div className="player__name">{name}</div>
          <button type="button" className="player__full-screen" onClick={handleFullscreenClick}>
            <Icon {...ICONS.FULL_SCREEN}/>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export const Player = React.memo(PlayerComponent);
