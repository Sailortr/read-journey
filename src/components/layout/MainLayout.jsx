// src/components/layout/MainLayout.jsx
import Header from "./Header";

const MainLayout = ({ sidebarContent, children }) => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      {/* İçerik alanı */}
      <div className="flex flex-col lg:flex-row gap-6 p-4">
        {/* Sol panel (SidebarContent) */}
        <div className="w-full lg:w-[353px] shrink-0">{sidebarContent}</div>

        {/* Sağ panel (Sayfa içeriği) */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
