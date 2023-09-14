import { FC } from "react";
import { Link } from "react-router-dom";
import { IconHome2 } from "@tabler/icons-react";

import Layout from "../components/Layout";
import Card from "../components/Card";
import { BOOKMARK } from "../constants";
import { Anime } from "../types";
import { getItem } from "../utils";

const BookmarksPage: FC = () => {
  const anime = getItem(BOOKMARK) as Anime[];

  return (
    <Layout>
      <div className="px-8 mt-14">
        <div className="flex gap-4 py-4">
          <Link to={"/"} className="cursor-pointer text-blue-500">
            <IconHome2 />
          </Link>
          <div>/</div>
          <div>Bookmarks</div>
        </div>
        <div>
          <div className="grid gap-y-6 2xl:grid-cols-6 xl:gap-x-8 lg:grid-cols-5 lg:gap-x-4">
            {anime.map((media) => (
              <Card key={media.id} data={media} isBookmark />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookmarksPage;
