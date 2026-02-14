const name = "Arziya";

const openings = [
  `I love you ${name} because`,
  `One reason I adore you, ${name}, is because`,
  `My heart belongs to you, ${name}, because`,
  `I fall deeper for you ${name} every day because`,
  `You mean everything to me ${name} because`,
  `The universe chose you for me, ${name}, because`,
  `Life feels magical with you, ${name}, because`,
  `My soul recognizes yours, ${name}, because`,
  `Every heartbeat whispers your name, ${name}, because`,
  `Loving you, ${name}, feels natural because`
];

const qualities = [
  "your smile lights up my darkest thoughts",
  "your voice feels like home to my restless heart",
  "your eyes hold galaxies I could get lost in forever",
  "your kindness makes this world softer",
  "your laughter heals parts of me I never understood",
  "your presence calms my chaos",
  "your love feels like destiny written in the stars",
  "your energy makes ordinary days unforgettable",
  "your heart is the purest place I’ve ever known",
  "your soul connects with mine in ways words cannot explain"
];

const emotions = [
  "and every moment with you feels like a beautiful dream I never want to wake up from.",
  "and being near you gives me a peace I searched my whole life for.",
  "and loving you feels like the greatest blessing I could ever receive.",
  "and I cannot imagine a future where you are not beside me.",
  "and my world becomes brighter whenever you are around.",
  "and even silence feels special when I share it with you.",
  "and my heart chooses you again and again without hesitation.",
  "and forever suddenly feels too short with you.",
  "and you make love feel effortless and eternal.",
  "and every second with you becomes a memory I treasure deeply."
];

const deepLines = [
  `With you ${name}, I discovered a version of myself that feels stronger, softer, and more alive.`,
  `You make my ordinary existence feel like poetry written by destiny, ${name}.`,
  `Even in my worst moods, you find a way to make me smile, ${name}.`,
  `Your love has changed me in ways I never expected but always needed, ${name}.`,
  `Every time I look at you, ${name}, I silently thank fate for choosing us.`,
  `You are not just part of my life, ${name} — you are the best part of it.`,
  `If I had to choose again in every lifetime, it would always be you, ${name}.`,
  `You are my peace in storms and my excitement in calm days, ${name}.`,
  `Loving you feels like the most natural thing I’ve ever done, ${name}.`,
  `My heart feels understood in a way it never was before, because of you ${name}.`
];

// Generate 1000 long personalized reasons
export const reasons = Array.from({ length: 1000 }, (_, i) => {
  const open = openings[i % openings.length];
  const quality = qualities[(i * 3) % qualities.length];
  const emotion = emotions[(i * 5) % emotions.length];
  const deep = deepLines[(i * 7) % deepLines.length];

  return `${i + 1}. ${open} ${quality}, ${emotion} ${deep}`;
});
