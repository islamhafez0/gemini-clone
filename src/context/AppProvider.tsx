import { ReactNode } from "react";
import { AppProvider } from "./AppContext";
import { FirebaseProvider } from "./FirebaseContext";
import { AuthProvider } from "./AuthContext";

export const ApplicationProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AppProvider>
      <FirebaseProvider>
        <AuthProvider>{children}</AuthProvider>
      </FirebaseProvider>
    </AppProvider>
  );
};
export default ApplicationProvider;
