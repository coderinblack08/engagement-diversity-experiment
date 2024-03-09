import React from "react";
import { Button } from "../components/ui/button";

export function Introduction({ next }) {
  return (
    <div className="mt-3 sm:mt-5 p-20">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Instructions
      </h3>
      <div className="mt-2 mb-6">
        <p className="text-sm text-gray-500">
          In this game, there will be multiple rounds. In each round, you will
          select the most appealing/interesting option from a set of five.
        </p>
      </div>
      <Button onClick={next} autoFocus>
        <p>Next</p>
      </Button>
    </div>
  );
}
