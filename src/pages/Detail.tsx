import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  IconBookmark,
  IconBookmarkFilled,
  IconStarFilled,
  IconHome2,
} from "@tabler/icons-react";
import { useQuery } from "urql";

import Loader from "../components/Loader";
import Layout from "../components/Layout";
import AnimeDetailQuery from "../queries/AnimeDetailQuery.graphql";
import { Anime } from "../types";
import {
  addBookmark,
  isExistInBookmark,
  ratingColor,
  removeBookmark,
} from "../utils";

type AnimeDetailResponse = {
  media: Anime;
};

const DetailPage: FC = () => {
  const { id } = useParams();
  const [{ data, fetching }] = useQuery<AnimeDetailResponse>({
    query: AnimeDetailQuery,
    variables: { id },
  });

  const [isBookmark, setIsBookmark] = useState(false);

  const onAddBookmark = (value: Anime) => {
    addBookmark(value);
    setIsBookmark(true);
  };

  const onRemoveBookmark = (id: number) => {
    removeBookmark(id);
    setIsBookmark(false);
  };

  useEffect(() => {
    if (data?.media && isExistInBookmark(data?.media.id)) {
      setIsBookmark(true);
    }
  }, [data?.media]);

  const title = data?.media.title.english || data?.media.title.romaji;

  return (
    <Layout>
      {fetching ? (
        <div className="mt-20">
          <Loader />
        </div>
      ) : (
        <div className="mt-14">
          <div className="flex gap-4 px-4 py-2">
            <Link to={"/"} className="cursor-pointer text-blue-500">
              <IconHome2 />
            </Link>
            <div>/</div>
            {title}
          </div>
          <div
            style={{ backgroundImage: `url(${data?.media.bannerImage})` }}
            className="bg-cover bg-no-repeat bg-[50%_35%] h-96"
          >
            <div className="bg-gradient-to-t from-gray-500 w-full h-full"></div>
          </div>
          <div className="grid md:grid-cols-5 grid-cols-1 md:pl-8">
            <div className="md:block flex justify-center">
              <img src={data?.media.coverImage.large} className="-mt-48" />
            </div>
            <div className="col-span-4 p-8">
              <div>
                <div className="flex md:flex-row flex-col items-center md:justify-between">
                  <div className="flex items-center gap-2 md:mb-0 mb-4">
                    <div className="text-2xl font-bold">{title}</div>
                  </div>
                  {isBookmark ? (
                    <IconBookmarkFilled
                      className="cursor-pointer"
                      size={32}
                      onClick={() =>
                        data?.media && onRemoveBookmark(data?.media.id)
                      }
                    />
                  ) : (
                    <IconBookmark
                      className="cursor-pointer"
                      size={32}
                      onClick={() => data?.media && onAddBookmark(data?.media)}
                    />
                  )}
                </div>
                <div className="flex md:flex-row flex-col items-center gap-2 mt-4">
                  <div className="text-xl font-bold">
                    {data?.media.studios.nodes[0].name}
                  </div>
                  <div className="md:block hidden">&#8226;</div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">
                      <IconStarFilled size={16} />
                    </span>
                    <div
                      className={`${ratingColor(
                        data?.media.averageScore ?? 0
                      )}`}
                    >
                      {data?.media.averageScore}%
                    </div>
                  </div>
                  {data?.media.episodes && (
                    <>
                      <div>&#8226;</div>
                      <div>{data?.media.episodes} Episodes</div>
                    </>
                  )}
                </div>
                <div className="md:flex hidden gap-1 mt-3">
                  <div>Genre:</div>
                  {data?.media.genres.map((genre, i) => (
                    <div key={genre}>
                      <div>{genre}</div>
                      {i < data?.media.genres.length - 1 && <div>&#8226;</div>}
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="mt-4"
                dangerouslySetInnerHTML={{
                  __html: data?.media.description ?? "",
                }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default DetailPage;
