import { FC } from "react";
import { Link } from "react-router-dom";
import { IconStarFilled } from "@tabler/icons-react";

import { Anime } from "../types";
import { ratingColor } from "../utils";

type Props = {
  data: Anime;
  isBookmark?: boolean;
};

const Card: FC<Props> = ({ data, isBookmark = false }) => {
  return (
    <div className="flex flex-col shadow rounded-md border">
      <img
        src={data.coverImage.large}
        className="w-full 2xl:h-[315px] lg:h-[285px] h-[340px] rounded-t-md"
        alt={data.title.romaji}
      />

      <div className="p-2 flex flex-col justify-between flex-1">
        <div className="hover:text-blue-400 cursor-pointer text-sm">
          <Link to={`detail/${data.id}`}>
            {data.title.english || data.title.romaji}
          </Link>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-yellow-400">
            <IconStarFilled size={14} />
          </span>
          <div className={`text-xs ${ratingColor(data.averageScore)}`}>
            {data.averageScore}%
          </div>
          {Boolean(data.episodes) && (
            <>
              <div>&#8226;</div>
              <div>{data.episodes} Episodes</div>
            </>
          )}
        </div>
        {isBookmark && (
          <button className="bg-red-500 text-white text-center border px-2 py-1 w-full mt-2 rounded-md">
            Remove Bookmark
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
