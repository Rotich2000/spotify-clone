"use client";

import { useRouter } from "next/navigation";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";

type Props = {
  songId: string;
};

const LikeButton = ({ songId }: Props) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();

  const authModal = useAuthModal();
  const { user } = useUser();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songId)
        .single();

      if (!error && data) {
        setIsLiked(true);
      }
    };

    fetchData();
  }, [user?.id, songId, supabaseClient]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async() => {
    if (!user) {
        return authModal.onOpen();
    }
    if(isLiked){
        const {error} = await supabaseClient
        .from('liked_songs')
        .delete()
        .eq('user_id', user.id)
        .eq('song_id', songId);

        if(error){
            toast.error(error.message);
        }else{
            setIsLiked(false);
        }
    }else{
        const {data, error} = await supabaseClient
        .from('liked_songs')
        .insert({
            song_id: songId,
            user_id: user.id
        });
        if (error) {
            toast.error(error.message);
        }else{
            setIsLiked(true);
            toast.success("liked");
        }
    }

    router.refresh();
  };

  return (
    <button
      onClick={handleLike}
      className="hover:opacity-75 transition duration-300"
    >
      <Icon color={isLiked ? "#22c55e" : "white"} size={25} />
    </button>
  );
};

export default LikeButton;
