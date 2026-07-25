import { useEffect, useState } from 'react';

export default function useTypewriter(
  text: string,
  speed = 80,
  startTyping = true,
) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!startTyping) {
      setDisplayText('');
      setIsComplete(false);
      return;
    }

    let i = 0;
    setDisplayText('');
    setIsComplete(false);

    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, startTyping]);

  return { displayText, isComplete };
}
