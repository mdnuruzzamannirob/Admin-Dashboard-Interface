import DashboardLayout from "@/components/dashboard/DashboardLayout";
import UserManagementTable from "@/components/dashboard/UserManagementTable";

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <UserManagementTable />
    </DashboardLayout>
  );
};

export default DashboardPage;
