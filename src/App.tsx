import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BookOpen, Home } from "lucide-react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import "./App.css";
import { Layout } from "./components/refine-ui/layout/layout";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import Dashboard from "./pages/dashboard";
import SubjectCreate from "./pages/subjects/create";
import SubjectsList from "./pages/subjects/list";
import { dataProvider } from "./providers/data";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <Refine
          dataProvider={dataProvider}
          notificationProvider={useNotificationProvider()}
          routerProvider={routerProvider}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
            projectId: "0pldMh-fJ6DVe-svQUZO",
          }}
          resources={[
            {
              name: "dashboard",
              list: "/",
              meta: {
                label: "Dashboard",
                icon: <Home />,
              },
            },
            {
              name: "subjects",
              list: "/subjects",
              create: "/subjects/create",
              meta: {
                label: "Subjects",
                icon: <BookOpen />,
              },
            },
          ]}
        >
          <Routes>
            <Route
              element={
                <Layout>
                  <Outlet />
                </Layout>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="subjects" element={<SubjectsList />}>
                <Route path="create" element={<SubjectCreate />} />
              </Route>
            </Route>
          </Routes>

          <RefineKbar />
          <UnsavedChangesNotifier />
          <DocumentTitleHandler />
        </Refine>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
