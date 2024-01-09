import {useEffect, useRef, useState} from 'react';
import {FILM_PREVIEW_MS} from '../../consts.ts';
import {FilmInfo} from '../../types/film-info';

type Props = FilmInfo & { isMuted?: boolean; width: string; height: string };

export const SmallPreviewPlayer: React.FC<Props> = ({
  previewVideoLink,
  previewImage,
  name,
  isMuted = true,
  width,
  height
}: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [timeout, setModalTimeout] = useState<ReturnType<typeof setTimeout>>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleMouseEnter = () => {
    if (timeout) {
      clearTimeout(timeout);
    }

    setModalTimeout(setTimeout(() => {
      setIsPlaying(true);
    }, FILM_PREVIEW_MS));
  };

  const handleMouseLeave = () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.load();
    }
  };

  useEffect(() => {
    if (isPlaying) {
      videoRef.current?.play();
    }
  }, [isPlaying]);
  useEffect(() => () => clearTimeout(timeout), [timeout]);

  return (
    <div
      data-testid={'small-preview-container'}
      className="small-film-card__image"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isPlaying ? (
        <video
          ref={videoRef}
          src={previewVideoLink}
          poster={previewImage}
          muted={isMuted}
          width={width}
          height={height}
          controls={false}
        />
      ) : (
        <img
          src={previewImage}
          alt={name}
          width={width}
          height={height}
        />
      )}
    </div>
  );
};
