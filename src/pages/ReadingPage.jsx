// src/pages/ReadingPage.jsx
import Sidebar from "../components/layout/Sidebar";
import DashboardPanel from "../components/dashboard/DashboardPanel";
import ReadingForm from "../components/reading/ReadingForm";
import ReadingDiary from "../components/reading/ReadingDiary";
import ReadingStats from "../components/reading/ReadingStats";

const ReadingPage = () => {
  return (
    <div className="min-h-screen flex bg-black text-white">
      <Sidebar />

      <main className="flex-1 p-6">
        <DashboardPanel>
          <ReadingForm />
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ReadingDiary />
            <ReadingStats />
          </div>
        </DashboardPanel>
      </main>
    </div>
  );
};

export default ReadingPage;
