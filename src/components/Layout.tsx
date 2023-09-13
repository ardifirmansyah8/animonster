import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <header className="flex justify-between z-10 h-12 border-b border-gray-200 p-2 fixed top-0 left-0 w-full bg-white">
        <div className="font-bold text-2xl">Animonster</div>
      </header>
      {children}
    </>
  );
};

export default Layout;
