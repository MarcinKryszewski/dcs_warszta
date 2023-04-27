import React from "react";

import { AuthContextProvider } from "@/context/AuthContext";
import { UserContextProvider } from "@/context/UserContext";
import { combineComponents } from "@/utils/combineComponents";

const providers = [AuthContextProvider, UserContextProvider];
export const AppContextProvider = combineComponents(...providers);
