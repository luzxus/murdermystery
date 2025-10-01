// Utility functions (Single Responsibility: pure helpers)
export const normalize = (value) =>
  value
    .toUpperCase()
    .replace(/\s+/g, '')
    .replace(/[ÅÄÖ]/g, (match) => ({ Å: 'A', Ä: 'A', Ö: 'O' }[match] || match));

export const isAcceptedAnswer = (userInput, accepted) => {
  const normalized = normalize(userInput);
  return accepted.some((ans) => normalize(ans) === normalized);
};

export const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

export const pickRandom = (array) => array[Math.floor(Math.random() * array.length)];

export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};
