import "./App.css";
import AuthProvider from "./providers/authProvider";
import { SnackbarProvider } from "notistack";
import { MyGlobalContext } from "./utils/global";
import Routes from "./routes";
import { useState } from "react";

function App() {
  const [isEditingTask, setIsEditingTask] = useState<boolean>(false);
  const [selectedTaskInput, setSelectedTaskInput] = useState<string | null>(
    null
  );
  const [refetchTaskStatus, setRefectchTaskStatus] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="App">
      <AuthProvider>
        <SnackbarProvider maxSnack={3}>
          <MyGlobalContext.Provider value={{ 
            isEditingTask, setIsEditingTask,
            selectedTaskInput,setSelectedTaskInput,
            refetchTaskStatus,setRefectchTaskStatus,
            isLoading, setIsLoading }}>
            <Routes />
          </MyGlobalContext.Provider>
        </SnackbarProvider>
      </AuthProvider>
    </div>
  );
}

export default App;