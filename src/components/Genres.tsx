import { FC } from "react";
import { IconCheck } from "@tabler/icons-react";
import { useQuery } from "urql";

import GenresQuery from "../queries/GenresQuery.graphql";
import { Genres as GenresType } from "../types";

type Props = {
  selectedGenres: GenresType;
  onChangeSelectedGenre: (genres: GenresType) => void;
};

const Genres: FC<Props> = ({ selectedGenres, onChangeSelectedGenre }) => {
  const [{ data }] = useQuery<{ genres: string[] }>({
    query: GenresQuery,
  });

  const handleSelectedGenre = (genre: string) => {
    const newGenres = {
      ...selectedGenres,
      [genre]: !selectedGenres[genre],
    };

    onChangeSelectedGenre(newGenres);
  };

  return (
    <div className="grid xl:grid-cols-10 lg:grid-cols-8 md:grid-cols-5 grid-cols-3 gap-4">
      {data?.genres.map((genre) => (
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
