import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../../pages/home";
import GeneratePoem from "../../pages/generate-poem";
import PreviewVideo from "../../pages/preview-video";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Home />,
  },
  {
    path: "/generate-poem",
    element: <GeneratePoem />,
  },
  {
    path: "/preview-video/:id",
    element: <PreviewVideo />,
  },
]);
