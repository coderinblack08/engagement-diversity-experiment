import {
  usePlayer,
  useRound,
  useStage,
} from "@empirica/core/player/classic/react";
import React from "react";
import { Avatar } from "./components/Avatar";
import { Timer } from "./components/Timer";

export function Profile() {
  const player = usePlayer();
  const round = useRound();
  const stage = useStage();

  const score = player.get("score") || 0;

  return (
    <div className="min-w-lg md:min-w-2xl mt-2 mx-auto px-7 py-4 text-gray-500 rounded-lg grid grid-cols-3 items-center border-2">
      <div className="flex space-x-3 items-center justify-start">
        <div className="flex flex-col items-center leading-tight ml-1">
          <div className="text-xs font-semibold uppercase tracking-wide leading-none text-gray-400">
            {round ? round.get("name") : ""}
          </div>
          <div className="text-3xl font-semibold !leading-none tabular-nums">
            {stage ? stage.get("name") : ""}
          </div>
        </div>
      </div>

      <div className="flex space-x-3 items-center justify-center w-36">
        <div className="flex flex-col items-center">
          <div className="text-xs font-semibold uppercase tracking-wide leading-none text-gray-400">
            Timer
          </div>
          <Timer />
        </div>
      </div>

      <div className="flex space-x-3 items-center justify-end">
        <div className="flex flex-col items-center">
          <div className="text-xs font-semibold uppercase tracking-wide leading-none text-gray-400">
            Score
          </div>
          <div className="text-3xl font-semibold !leading-none tabular-nums">
            {score}
          </div>
        </div>
        {/* <div className="h-11 w-11">
          <Avatar player={player} />
        </div> */}
      </div>
    </div>
  );
}
