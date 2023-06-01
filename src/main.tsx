import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { BreakpointProvider, setDefaultBreakpoints } from "react-socks";
import PromptProvider from "./shared/context/prompts/PromptProvider";
import StepsProvider from "./shared/context/StepsProvider";
import { router } from "./shared/utils/routes";
import "./styles/main.sass";
import "react-tooltip/dist/react-tooltip.css";

setDefaultBreakpoints([
  { xs: 0 },
  { s: 376 },
  { m: 426 },
  { l: 1079 },
  { xl: 1080 },
])

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <PromptProvider>
        <StepsProvider>
          <BreakpointProvider>
            <RouterProvider router={router} />
          </BreakpointProvider>
        </StepsProvider>
      </PromptProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
