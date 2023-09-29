"use client";
import React, { Component, ErrorInfo, ReactNode } from "react";
// import { Toaster } from "react-hot-toast";
import ProtectedPage from "../../components/ProtectedPage";
// import TrainingSection from "./TrainingSection";
// import ClassificationSection from "./ClassificationSection";
// import { AppProvider } from "./DemoAppProvider";

const Demo = () => {
  return (
    <ProtectedPage>
      {/* <AppProvider>
        <Toaster />
        <ErrorBoundary>
          <main className="flex flex-col min-h-screen bg-gradient-to-br from-first via-second to-third">
            <TrainingSection />
            <ClassificationSection />
          </main>
        </ErrorBoundary>
      </AppProvider> */}
    </ProtectedPage>
  );
};

export default Demo;