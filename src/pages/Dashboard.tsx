import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardContent } from "@/components/DashboardContent";
import Leads from "./Leads";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={
                <div className="p-6">
                  <DashboardContent />
                </div>
              } />
              <Route path="/leads" element={<Leads />} />
              <Route path="*" element={
                <div className="p-6">
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-semibold mb-4">Page Under Construction</h2>
                    <p className="text-muted-foreground">This page is being developed. Please check back soon!</p>
                  </div>
                </div>
              } />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;