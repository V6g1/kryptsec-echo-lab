import React, { useState } from 'react';
import ComicPanel from '../components/ComicPanel';

import panel1 from '../assets/panel1.jpg.png';
import panel2 from '../assets/panel2.jpg.png';
import panel3 from '../assets/panel3.jpg.png';
import panel4 from '../assets/panel4.jpg.png';
import panel5 from '../assets/panel5.jpg.png';
import panel6 from '../assets/panel6.jpg.png';

const storyPanels = [
  {
    background: panel1,
    dialogue: "I knew this place would have answers... I didn't think it would be a funeral pyre."
  },
  {
    background: panel2,
    dialogue: "The network didn't just go down, Kai. It was murdered. Right before the explosion, a massive data spike shot out of the medical servers. They didn't just burn the place down... they cleaned it out first."
  },
  {
    background: panel3,
    dialogue: "A data heist. They hid the theft in the chaos of the fire. What was the vector?"
  },
  {
    background: panel4,
    dialogue: "The traffic was masked as normal diagnostic pings... but the packet size and frequency are all wrong. It's a ghost protocol. We used to theorize about this... we called it DRAGONFLY."
  },
  {
    background: panel5,
    dialogue: "Jax, pull the core network capture from the main hub. It would have seen everything. Find DRAGONFLY's echo. Find what they stole."
  },
  {
    background: panel6,
    dialogue: "I've isolated the capture from the main hub during the incident window. The signal is in there. It's your turn to trace it."
  }
];

const Story = ({ onStoryComplete }) => {
  const [currentPanelIndex, setCurrentPanelIndex] = useState(0);

  const handleNext = () => {
    if (currentPanelIndex < storyPanels.length - 1) {
      setCurrentPanelIndex(currentPanelIndex + 1);
    } else {
      onStoryComplete();
    }
  };

  return (
    <ComicPanel
      background={storyPanels[currentPanelIndex].background}
      dialogue={storyPanels[currentPanelIndex].dialogue}
      onNext={handleNext}
    />
  );
};

export default Story;