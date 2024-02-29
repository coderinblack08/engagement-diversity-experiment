import {
  usePlayer,
  usePlayers,
  useStage,
} from "@empirica/core/player/classic/react";
import React from "react";

interface PickYourPreferenceProps {}

const PickYourPreference: React.FC<PickYourPreferenceProps> = () => {
  const player = usePlayer();
  const players = usePlayers();
  const stage = useStage();

  function handleChange(e) {
    player.stage.set("pick", e.target.value);
  }

  function handleSubmit() {
    player.stage.set("submit", true);
  }

  return <div>Hello world!</div>;
};

export default PickYourPreference;
