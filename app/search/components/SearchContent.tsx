'use client';

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";

type Props = {
    songs: Song[];
}

const SearchContent = ({songs}: Props) => {
    const onPlay = useOnPlay(songs);

    if(songs.length === 0){
        return(
            <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">No Songs Found</div>
        )
    }
  return (
    <div className="flex flex-col gap-y-2 w-full px-6">
        {songs.map((song) => (
            <div 
            key={song.id}
            className="flex items-center gap-x-4 w-full"
            >
                <div className="flex-1">
                    <MediaItem
                    onClick={(id) => onPlay(id)}
                    song={song}
                    />
                </div>
                {/* TODO: Add like button here... */}
                <LikeButton songId={song.id}/>
            </div>
        ))}
    </div>
  )
}

export default SearchContent