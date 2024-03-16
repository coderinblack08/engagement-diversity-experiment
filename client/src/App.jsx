import { EmpiricaClassic } from "@empirica/core/player/classic";
import { EmpiricaContext } from "@empirica/core/player/classic/react";
import { EmpiricaMenu, EmpiricaParticipant } from "@empirica/core/player/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Game } from "./Game";
import { ExitSurvey } from "./intro-exit/ExitSurvey";
import { Introduction } from "./intro-exit/Introduction";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      async queryFn({ queryKey }) {
        const res = await fetch("http://localhost:8000" + queryKey[0]);
        return res.json();
      },
    },
  },
});

export default function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const playerKey = urlParams.get("participantKey") || "";

  const { protocol, host } = window.location;
  const url = `${protocol}//${host}/query`;

  function introSteps({ game, player }) {
    return [Introduction];
  }

  function exitSteps({ game, player }) {
    return [ExitSurvey];
  }

  return (
    <QueryClientProvider client={queryClient}>
      <EmpiricaParticipant url={url} ns={playerKey} modeFunc={EmpiricaClassic}>
        <div className="h-screen relative">
          <EmpiricaMenu position="bottom-left" />
          <div className="h-full overflow-auto">
            <EmpiricaContext introSteps={introSteps} exitSteps={exitSteps}>
              <Game />
            </EmpiricaContext>
          </div>
        </div>
      </EmpiricaParticipant>
    </QueryClientProvider>
  );
}
