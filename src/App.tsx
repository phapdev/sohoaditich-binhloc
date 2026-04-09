import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { HomePage } from "@/pages/HomePage";
import { MartyrSearchPage } from "@/pages/MartyrSearchPage";
import { MartyrDetailPage } from "@/pages/MartyrDetailPage";
import { ActivitiesPage } from "@/pages/ActivitiesPage";
import { LocationsPage } from "@/pages/LocationsPage";
import { LocationDetailPage } from "@/pages/LocationDetailPage";
import { MapPage } from "@/pages/MapPage";
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
    <Analytics />
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/martyrs" element={<MartyrSearchPage />} />
          <Route path="/martyrs/:id" element={<MartyrDetailPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/locations/:id" element={<LocationDetailPage />} />
          <Route path="/map" element={<MapPage />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </>
  );
}

export default App;
