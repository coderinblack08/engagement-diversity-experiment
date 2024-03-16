import { ClassicListenersCollector } from "@empirica/core/admin/classic";
export const Empirica = new ClassicListenersCollector();

Empirica.onGameStart(({ game }) => {
  const round = game.addRound({
    name: "Round",
    task: "pick-your-preference",
  });
  // FIX
  const treatment = game.get("treatment");
  for (let i = 1; i <= 10; i++) {
    if (name === "content-based-filtering") {
      round.addStage({
        name: i,
        method: i === 1 ? "random" : "content",
        duration: 180,
      });
    }
    if (name === "random-based-filtering") {
      round.addStage({ name: i, method: "random", duration: 180 });
    }
  }
});

Empirica.onRoundStart(({ round }) => {});

Empirica.onStageStart(({ stage }) => {});

Empirica.onStageEnded(({ stage }) => {});

Empirica.onRoundEnded(({ round }) => {});

Empirica.onGameEnded(({ game }) => {});
