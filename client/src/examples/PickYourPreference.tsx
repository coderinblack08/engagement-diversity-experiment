import { usePlayer, useStage } from "@empirica/core/player/classic/react";
import { RadioGroup } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Button } from "../components/ui/button";

interface PickYourPreferenceProps {
  method: string;
}

const PickYourPreference: React.FC<PickYourPreferenceProps> = ({ method }) => {
  const player = usePlayer();
  const stage = useStage();
  const query = useQuery<any[]>({ queryKey: [`/${method}`] });
  const [selected, setSelected] = useState(null);

  function onClick() {
    player.round.set("decision", selected);
    player.stage.set("submit", true);
  }

  return (
    <div>
      <div className="max-w-2xl w-full mx-auto">
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-2 grid grid-cols-3 gap-4">
            {query.data?.map((art) => (
              <RadioGroup.Option
                key={art.title}
                value={art.id}
                className={({ active, checked }) =>
                  `${active ? "ring-2 ring-zinc-300" : ""}
                  ${checked ? "bg-zinc-900 text-white" : "bg-white"}
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? "text-white" : "text-zinc-900"
                            }`}
                          >
                            {art.title}
                          </RadioGroup.Label>
                          <RadioGroup.Description as="div">
                            <img src={art.iiifthumburl} alt={art.title} />
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
      <Button className="mt-4 max-w-2xl w-full" onClick={onClick}>
        Next
      </Button>
    </div>
  );
};

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default PickYourPreference;
