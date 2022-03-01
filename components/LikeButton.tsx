import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

type LikeButtonProps = {
  onClick: () => void;
  isLiked: boolean;
  likesCount: number;
};

const LikeButton = ({ onClick, isLiked, likesCount }: LikeButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="absolute -right-2 -bottom-2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gradient-to-b from-blue-500 to-blue-700 hover:to-blue-600"
    >
      <div className="text-5xl text-white opacity-60">
        {isLiked ? <AiFillStar /> : <AiOutlineStar />}
      </div>
      <span className="absolute select-none text-sm font-bold leading-none text-white drop-shadow">
        {likesCount}
      </span>
    </button>
  );
};

export default LikeButton;
