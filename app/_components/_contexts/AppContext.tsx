import { createContext, SetStateAction, useContext, useState } from "react";

interface User {
  name: string;
  email: string;
  password: string;
  active: boolean;
  _id: string;
}

interface Provider {
  user: User | null;
  setUser: React.Dispatch<SetStateAction<User | null>>;
}

const ProviderContext = createContext<Provider | undefined>(undefined);

function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  //   const { isLoggedIn } = useLoginState();
  // if(!user?.email) return <div>{</div>

  return (
    <ProviderContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </ProviderContext.Provider>
  );
}

export function useProvider() {
  const value = useContext(ProviderContext);

  if (!value) throw new Error("Provider context was used outsid of provider");

  return value;
}

export default AppProvider;
