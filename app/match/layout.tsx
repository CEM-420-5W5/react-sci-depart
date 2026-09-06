import { MatchProvider } from "@/lib/match-context";
import { SignalRProvider } from "@/lib/fake-signalr-context";

export default function MatchLayout( {children}: Readonly<{children: React.ReactNode }> ) {

    return(
        <MatchProvider>
            <SignalRProvider>
                {children} 
            </SignalRProvider>
        </MatchProvider> 
    )

}