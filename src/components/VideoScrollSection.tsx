import React from 'react';
import { videoList } from '../data/media';
import { Language } from '../types';
import { CardRail } from './CardRail';
import { VideoCard } from './VideoPlayer';

/** Videos: a row of video cards, moved with the arrow buttons. Each opens its Facebook post in a new tab. */
export const VideoScrollSection: React.FC<{ lang: Language }> = ({ lang }) => {
  const ne = lang === 'ne';
  return (
    <CardRail
      id="videos"
      lang={lang}
      className="bg-ivory-section"
      label={ne ? 'भिडियो' : 'On video'}
      title={ne ? 'भिडियोहरू' : 'Videos'}
      lede={ne ? 'रक्तदानदेखि रात्रिकालीन उद्धारसम्म: फेसबुकमा साझा भएका वास्तविक क्षणहरू।' : 'From blood donation to late-night rescues: real moments shared on Facebook.'}
    >
      {videoList.map((v) => (
        <VideoCard key={v.id} v={v} lang={lang} className="snap-start shrink-0 w-[240px] sm:w-[270px]" />
      ))}
    </CardRail>
  );
};
