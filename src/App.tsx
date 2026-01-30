import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BookOpen, GraduationCap, Home } from "lucide-react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import "./App.css";
import { Layout } from "./components/refine-ui/layout/layout";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import ClassesCreate from "./pages/classes/create";
import ClassesList from "./pages/classes/list";
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
            {
              name: "classes",
              list: "/classes",
              create: "/classes/create",
              meta: {
                label: "Classes",
                icon: <GraduationCap />,
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
              <Route path="/" element={<Dashboard />} />
              <Route path="subjects">
                <Route index element={<SubjectsList />} />
                <Route path="create" element={<SubjectCreate />} />
              </Route>

              <Route path="classes">
                <Route index element={<ClassesList />} />
                <Route path="create" element={<ClassesCreate />} />
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
