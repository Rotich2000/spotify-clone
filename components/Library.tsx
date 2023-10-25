"use client";
import {TbPlaylist} from 'react-icons/tb';
import {AiOutlinePlus} from 'react-icons/ai';
import useAuthModal from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import useUploadModal from '@/hooks/useUploadModal';
import { Song } from '@/types';
import MediaItem from './MediaItem';
import useOnPlay from '@/hooks/useOnPlay';

type Props = {
    songs: Song[]
}

const Library = ({songs}: Props) => {
    const authModal = useAuthModal();
    const uploadModal = useUploadModal();
    const {user} = useUser();

    const onPlay = useOnPlay(songs);
    const onClick = () => {
        if(!user){
            return authModal.onOpen();
        }

        // TODO: Check for subscription
        
        return uploadModal.onOpen();
    }
  return (
    <div className="flex flex-col">
        <div className="flex items-center justify-between px-5 py-4">
            <div className="inline-flex items-center gap-x-2">
                <TbPlaylist className="text-neutral-400" size={26} />
                <p className='text-neutral-400 text-base font-medium '>Your library</p>
            </div>
            <AiOutlinePlus 
            onClick={onClick} 
            className="text-neutral-400 cursor-pointer hover:text-white transition duration-300" 
            size={20} 
            />
        </div>
        <div className='flex flex-col gap-y-2 mt-4 px-5'>
            {songs.map(song => (
               <MediaItem 
               key={song.id} 
               song={song}
               onClick={(id) => onPlay(id)}
               />
            )) }
        </div>
    </div>
  )
}

export default Library