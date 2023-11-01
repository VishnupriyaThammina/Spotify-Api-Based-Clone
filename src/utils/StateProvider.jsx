import { createContext,useContext,useReducer } from "react";

export const StateContext = createContext();
// we created a context and exporting it 

export const StateProvider = ({children,initialState,reducer})=>( 
    <StateContext.Provider value={useReducer(reducer,initialState)}>
        {children}
    </StateContext.Provider>
)
export const useStateProvider = () => useContext(StateContext)