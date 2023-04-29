import usecurrentUser from "@/Hooks/useCurrentUser";
import useLoginModal from "@/Hooks/useLoginModal";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import Avatar from "../Avatar";
import { AiOutlineHeart, AiFillHeart, AiOutlineMessage } from "react-icons/Ai";
import useLike from "@/Hooks/useLike";

interface PostItemProps {
     data: Record<string, any>;
     userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({ data, userId }) => {
     const { hasLiked, toggleLike } = useLike({ postId: data.id, userId });
     const router = useRouter();
     const loginModal = useLoginModal();

     const { data: currentUser } = usecurrentUser();

     const goToUser = useCallback(
          (event: any) => {
               event.stopPropgation();

               router.push(`/user/${data.user.id}`);
          },
          [router, data.user.id],
     );

     const goToPost = useCallback(() => {
          router.push(`/posts/${data.id}`);
     }, [router, data.id]);

     const onLike = useCallback(
          (event: any) => {
               event.stopPropagation();
               if (!currentUser) {
                    return loginModal.onOpen();
               }
               toggleLike();
          },
          [loginModal, currentUser, toggleLike],
     );

     const createdAt = useMemo(() => {
          if (!data?.createdAt) {
               return null;
          }
          return formatDistanceToNowStrict(new Date(data.createdAt));
     }, [data?.createdAt]);

     const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;
     return (
          <>
               <div
                    onClick={goToPost}
                    className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
                    <div className="flex flex-row items-start gap-3">
                         <Avatar userId={data.user.id} />
                         <div>
                              <div className="flex flex-row items-center gap-2">
                                   <p
                                        className="text-white cursor-pointer hover:underline font-semibold "
                                        onClick={goToUser}>
                                        {data.user.name}
                                   </p>
                                   <span
                                        onClick={goToUser}
                                        className="text-neutral-500 cursor-ponter hover:underline hidden md:block">
                                        @{data.user.username}
                                   </span>
                                   <span
                                        onClick={goToUser}
                                        className="text-neutral-500 text-sm">
                                        {createdAt}
                                   </span>
                              </div>
                              <div className="text-white mt-1">{data.body}</div>
                              <div
                                   className="flex flex-row items-center mt-3 gap-10"
                                   onClick={onLike}>
                                   <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
                                        <AiOutlineMessage size={20} />
                                        <p>{data.comments?.length || 0}</p>
                                   </div>
                                   <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
                                        <LikeIcon size={20} />
                                        <p>{data.likedIds?.length || 0}</p>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </>
     );
};
export default PostItem;
