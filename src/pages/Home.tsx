import { FC, useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useQuery } from "urql";

import Genres from "../components/Genres";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import AnimeQuery from "../queries/AnimeQuery.graphql";
import { Anime, Genres as GenresType, PageInfo } from "../types";
import Card from "../components/Card";

type AnimeResponse = {
  anime: {
    pageInfo: PageInfo;
    media: Anime[];
  };
};

const HomePage: FC = () => {
  const [page, setPage] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState<GenresType>({});
  const [anime, setAnime] = useState<Anime[]>([]);

  const genreQuery = useMemo(
    () =>
      Object.keys(selectedGenres).filter((key) => selectedGenres[key] === true),
    [selectedGenres]
  );

  const [{ data, fetching }] = useQuery<AnimeResponse>({
    query: AnimeQuery,
    variables: {
      page,
      perPage: 30,
      genres: genreQuery && genreQuery.length > 0 ? genreQuery : null,
    },
  });

  useEffect(() => {
    if (!fetching && data?.anime.media) {
      setAnime([...anime, ...data.anime.media]);
    }
  }, [data]);

  const onChangeSelectedGenre = (genres: GenresType) => {
    setAnime([]);
    setSelectedGenres(genres);
    setPage(1);
  };

  const handleLoadMore = () => {
    if (!fetching) {
      setPage(page + 1);
    }
  };

  return (
    <Layout>
      <div className="py-4 px-8 mt-14">
        <Genres
          selectedGenres={selectedGenres}
          onChangeSelectedGenre={onChangeSelectedGenre}
        />

        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={handleLoadMore}
          hasMore={data?.anime.pageInfo.hasNextPage}
          threshold={10}
          loader={<Loader key={"loader"} />}
        >
          <div className="grid gap-y-6 mt-5 2xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 xl:gap-x-8 gap-x-4">
            {anime.map((media) => (
              <Card key={media.id} data={media} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </Layout>
  );
};

export default HomePage;
