import React from 'react';

interface UsernameProps {
  firstName: string;
  lastName: string;
  onUsernameGenerated: (username: string) => void;
}

const geekWords = [
    'Hacker','Ninja','Jedi','Wizard','Ranger','Pirate','Robot','Viking','Mage','Knight',
    'Druid','Paladin','Berserker','Coder','Phantom','Cyborg','Sorcerer','TimeLord','Oracle',
    'Shadow','MechPilot','SpaceCadet','BountyHunter','CyberElf','Dwarf','Elf','Goblin','Troll',
    'Necromancer','Alchemist','Assassin','Scribe','Archivist','Warlock','Engineer','Inventor',
    'Artificer','Sentinel','Guardian','Gladiator','Commando','Pilot','Samurai','Sniper',
    'Mercenary','Scout','Shaman','Monk','Chemist','Spy'
  ];

  
  /**
   * Generate a random "geeky" username if user wants it auto-filled.
   * Called whenever firstName or lastName changes (onBlur).
  */

const GeekWordsUsername: React.FC<UsernameProps> = ({ firstName, lastName, onUsernameGenerated }) => {
  const generateUsername = () => {
    if (!firstName && !lastName) return;

    const randomIndex = Math.floor(Math.random() * geekWords.length);
    const randomGeekWord = geekWords[randomIndex] || 'Coder';
    const baseFirst = firstName || 'Kid';
    const baseLast = lastName || 'Learner';
    const proposedUsername = `${baseFirst}_${baseLast}_${randomGeekWord}`;

    onUsernameGenerated(proposedUsername);
  };

  // You might want to call generateUsername() on certain events or render conditions.
  // For simplicity, we'll return a button that triggers it here.
  return (
    <button onClick={generateUsername} type="button" className="btn">
      Pick One For Me
    </button>
  );
};

export default GeekWordsUsername;
