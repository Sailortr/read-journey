import SidebarContent from "../components/layout/SidebarContent";
import DashboardPanel from "../components/dashboard/DashboardPanel";

const ReadingPage = () => {
  return (
    <div className="min-h-screen flex bg-black text-white">
      <SidebarContent />

      <main className="flex-1 p-6">
        <DashboardPanel>
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ReadingStats />
          </div>
        </DashboardPanel>
      </main>
    </div>
  );
};

export default ReadingPage;
