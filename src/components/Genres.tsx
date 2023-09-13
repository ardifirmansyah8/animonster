import { FC, useState } from "react";
import { IconCheck } from "@tabler/icons-react";
import { useQuery } from "urql";

import GenresQuery from "../queries/GenresQuery.graphql";

const Genres: FC = () => {
  const [{ data }] = useQuery<{ genres: string[] }>({
    query: GenresQuery,
  });

  const [selectedGenres, setSelectedGenres] = useState<Record<string, boolean>>(
    {}
  );

  const handleSelectedGenre = (genre: string) => {
    const newGenres = {
      ...selectedGenres,
      [genre]: selectedGenres[genre] ? false : true,
    };

    setSelectedGenres(newGenres);
  };

  return (
    <div className="grid grid-cols-8 gap-4">
      {data &&
        data?.genres.map((genre) => (
          <div
            key={genre}
            className={`flex items-center gap-1 border rounded-lg text-center cursor-pointer px-2 py-2 text-sm ${
              selectedGenres[genre]
                ? "bg-blue-500 text-white hover:bg-blue-400"
                : "hover:bg-slate-100"
            }`}
            onClick={() => {
              handleSelectedGenre(genre);
            }}
          >
            {selectedGenres[genre] && (
              <span className="text-white">
                <IconCheck size={18} />
              </span>
            )}
            {genre}
          </div>
        ))}
    </div>
  );
};

export default Genres;
