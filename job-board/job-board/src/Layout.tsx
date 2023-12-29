import Header from "componets/Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex flex-col max-w-[1200px] mx-auto border max-h-max">
      <Header />
      <main className="mt-[10vh]">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
