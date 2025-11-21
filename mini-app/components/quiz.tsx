"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Result from "./result";

const questions = [
  {
    question: "What is your favorite activity?",
    options: [
      { text: "Chasing mice", animal: "cat" },
      { text: "Playing fetch", animal: "dog" },
      { text: "Hunting in the woods", animal: "fox" },
      { text: "Nibbling on seeds", animal: "hamster" },
      { text: "Galloping", animal: "horse" },
    ],
  },
  {
    question: "Which environment do you prefer?",
    options: [
      { text: "Home", animal: "cat" },
      { text: "Park", animal: "dog" },
      { text: "Forest", animal: "fox" },
      { text: "Cage", animal: "hamster" },
      { text: "Field", animal: "horse" },
    ],
  },
  {
    question: "What is your personality like?",
    options: [
      { text: "Independent", animal: "cat" },
      { text: "Friendly", animal: "dog" },
      { text: "Clever", animal: "fox" },
      { text: "Curious", animal: "hamster" },
      { text: "Strong", animal: "horse" },
    ],
  },
  {
    question: "How do you handle stress?",
    options: [
      { text: "Curl up", animal: "cat" },
      { text: "Run around", animal: "dog" },
      { text: "Hide", animal: "fox" },
      { text: "Hide in a burrow", animal: "hamster" },
      { text: "Stand tall", animal: "horse" },
    ],
  },
  {
    question: "What is your favorite food?",
    options: [
      { text: "Fish", animal: "cat" },
      { text: "Bones", animal: "dog" },
      { text: "Insects", animal: "fox" },
      { text: "Seeds", animal: "hamster" },
      { text: "Grass", animal: "horse" },
    ],
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [shuffledOptions, setShuffledOptions] = useState(
    shuffleArray(questions[0].options)
  );
  const [showResult, setShowResult] = useState(false);
  const [resultAnimal, setResultAnimal] = useState<string | null>(null);

  useEffect(() => {
    setShuffledOptions(shuffleArray(questions[current].options));
  }, [current]);

  const handleSelect = (animal: string) => {
    setAnswers([...answers, animal]);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      const counts: Record<string, number> = {};
      answers.concat(animal).forEach((a) => {
        counts[a] = (counts[a] ?? 0) + 1;
      });
      const max = Math.max(...Object.values(counts));
      const top = Object.entries(counts).filter(([_, v]) => v === max).map(([k]) => k);
      setResultAnimal(top[0] as string);
      setShowResult(true);
    }
  };

  if (showResult && resultAnimal) {
    return <Result animal={resultAnimal as any} />;
  }

  const q = questions[current];
  return (
    <div className="w-full max-w-md">
      <h2 className="text-xl mb-4">{q.question}</h2>
      <div className="flex flex-col gap-2">
        {shuffledOptions.map((opt) => (
          <Button
            key={opt.text}
            variant="outline"
            onClick={() => handleSelect(opt.animal)}
          >
            {opt.text}
          </Button>
        ))}
      </div>
    </div>
  );
}
