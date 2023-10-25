"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

import {Database} from "@/types_db";

type Props = {
    children: React.ReactNode;
}

const SupabaseProvider = ({children}: Props) =>{
    const [supabaseClient] = useState(() => createClientComponentClient<Database>());
    return (
        <SessionContextProvider supabaseClient={supabaseClient}>
            {children}
        </SessionContextProvider>
    )
}

export default SupabaseProvider;