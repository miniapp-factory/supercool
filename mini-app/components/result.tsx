"use client";
import { Button } from "@/components/ui/button";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

export type Animal = "cat" | "dog" | "fox" | "hamster" | "horse";

export default function Result({ animal }: { animal: Animal }) {
  const imageMap: Record<Animal, string> = {
    cat: "/cat.png",
    dog: "/dog.png",
    fox: "/fox.png",
    hamster: "/hamster.png",
    horse: "/horse.png",
  };

  const animalNames: Record<Animal, string> = {
    cat: "Cat",
    dog: "Dog",
    fox: "Fox",
    hamster: "Hamster",
    horse: "Horse",
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl">You are a {animalNames[animal]}!</h2>
      <img
        src={imageMap[animal]}
        alt={animalNames[animal]}
        width={512}
        height={512}
        className="size-[512px]"
      />
      <Share text={`I am a ${animalNames[animal]}! ${url}`} />
      <Button onClick={() => window.location.reload()}>Retake Quiz</Button>
    </div>
  );
}
