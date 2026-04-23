
import AdminNav from "../Admin/Pages/AdminNav";
import { MantineProvider } from "@mantine/core";
import { Outlet } from "react-router-dom";
import'./adminstyle.css'

const AdminLayout = () => {
  return (
 <MantineProvider  >
    <div className="grid grid-cols-6 cursor-default">
        <div className="col-span-1 sticky top-0 h-screen  bg-cream border-r">
      <AdminNav />
      </div>
      <div className="col-span-5">
        <Outlet />
      </div>
    </div>
</MantineProvider>
  );
};

export default AdminLayout;