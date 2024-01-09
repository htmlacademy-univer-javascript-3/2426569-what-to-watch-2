import React, {useEffect, useRef, useState} from 'react';

import {useNavigate} from 'react-router-dom';
import {FilmDetailsInfo} from '../../types/film-details-info';
import {formatDuration} from '../../utils/time-format';
import {Icon} from '../icon/icon';
import {ICONS} from '../icon/icons';

interface PlayerProps {
  film: FilmDetailsInfo;
}

function PlayerComponent({film: {posterImage, videoLink, name, runTime}}: PlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
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
    <div className="player" data-testid="player">
      <video
        data-testid="player-video"
        autoPlay
        ref={videoRef}
        src={videoLink}
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
          <button type="button" className="player__play" data-testid={'player-play-btn'} onClick={handlePlayClick}>
            {
              !isPlaying ? <><Icon {...ICONS.PLAY_START}/><span>Play</span></>
                : <><Icon {...ICONS.PAUSE}/><span>Pause</span></>
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
