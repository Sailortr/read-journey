import Header from "./Header";

const MainLayout = ({ sidebarContent, children }) => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header + arkaplan bloğu */}
      <div className="px-4 sm:px-6 lg:px-8 py-3">
        <Header />
      </div>

      {/* Sayfa içerik alanı */}
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-start gap-4 sm:gap-6 lg:gap-8 flex-col lg:flex-row">
          {/* Sidebar (lg ve üstünde 353px sabit) */}
          {sidebarContent && (
            <aside className="w-full lg:w-[353px] shrink-0">
              {sidebarContent}
            </aside>
          )}

          {/* İçerik */}
          <main className="flex-1 w-full">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
