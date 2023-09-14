import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { IconBrandGithubFilled, IconBookmarks } from "@tabler/icons-react";

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <header className="flex justify-between z-10 h-14 border-b border-gray-200 p-2 fixed top-0 left-0 w-full bg-white">
        <Link to="/" className="font-bold text-2xl">
          ANIMONSTER
        </Link>
        <div className="flex justify-end gap-2">
          <Link
            to="/bookmarks"
            className="flex items-center p-2 bg-gray-200 border rounded-md"
          >
            <IconBookmarks />
            Bookmarks
          </Link>
          <Link
            to="https://github.com/ardifirmansyah8/animonster"
            target="_blank"
            className="p-2 bg-gray-200 border rounded-md"
          >
            <IconBrandGithubFilled />
          </Link>
        </div>
      </header>
      {children}
    </>
  );
};

export default Layout;
