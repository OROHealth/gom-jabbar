import {createContext, FC, PropsWithChildren, useContext} from "react";
import {UserStore} from "stores";

type T = {
    userStore: UserStore,
}

const RootStoreContext = createContext<T>({} as T);

const userStore = new UserStore();

export const RootStoreProvider:FC<PropsWithChildren<{}>> = ({
   children
}) => {

    return (
        <RootStoreContext.Provider
            value={{ userStore}}
        >
            {children}
        </RootStoreContext.Provider>
    );
};

export const useRootStore = () => useContext(RootStoreContext);
