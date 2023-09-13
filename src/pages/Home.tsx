import { FC, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { IconStarFilled } from "@tabler/icons-react";
import { useQuery } from "urql";

import Genres from "../components/Genres";
import AnimeQuery from "../queries/AnimeQuery.graphql";
import { Anime, PageInfo } from "../types";
import Loader from "../components/Loader";
import Layout from "../components/Layout";

type AnimeResponse = {
  anime: {
    pageInfo: PageInfo;
    media: Anime[];
  };
};

const HomePage: FC = () => {
  const [page, setPage] = useState(1);
  const [anime, setAnime] = useState<Anime[]>([]);

  const [{ data, fetching }] = useQuery<AnimeResponse>({
    query: AnimeQuery,
    variables: {
      page,
      perPage: 20,
      genres: null,
    },
  });

  useEffect(() => {
    if (!fetching && data?.anime.media) {
      setAnime([...anime, ...data.anime.media]);
    }
  }, [data]);

  const handleLoadMore = () => {
    if (!fetching) {
      setPage(page + 1);
    }
  };

  const ratingColor = (rating: number): string => {
    if (rating > 75) {
      return "text-green-500";
    } else if (rating < 75 && rating > 60) {
      return "text-orange-500";
    } else {
      return "text-red-500";
    }
  };

  return (
    <Layout>
      <div className="py-4 px-8 mt-12">
        <Genres />

        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={handleLoadMore}
          hasMore={data?.anime.pageInfo.hasNextPage}
          threshold={10}
          loader={<Loader key={"loader"} />}
        >
          <div className="grid grid-cols-5 gap-y-6 mt-5 xl:gap-x-16 lg:gap-x-4">
            {anime.map((media, index) => (
              <div
                key={media.title.romaji + index}
                className="flex flex-col shadow rounded-md border"
              >
                <img
                  src={media.coverImage.large}
                  className="w-full h-[285px] rounded-t-md"
                  alt={media.title.romaji}
                />

                <div className="p-2 flex flex-col justify-between flex-1">
                  <div className="hover:text-blue-400 cursor-pointer">
                    {media.title.english || media.title.romaji}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-yellow-400">
                      <IconStarFilled size={14} />
                    </span>
                    <div
                      className={`text-xs ${ratingColor(media.averageScore)}`}
                    >
                      {media.averageScore}%
                    </div>
                    <div>&#8226;</div>
                    <div className="text-xs">{media.episodes} Episodes</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </Layout>
  );
};

export default HomePage;
