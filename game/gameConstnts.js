
export const phases= {
    __never:0,
    __startOfGame:1,
     __onNomination:2,
    __beforeNightFall:3,
    __afterNightFall:4,
    __beforeKillResolution:5,
    __killResoluton:6,
    __afterKillResolution:7
}



export const chosenBy= {
    __noOne:0,
    __augur:1,
    __wereWolf:2,
    __oracle:3,
    __hunter:4,
    __bodyGuard:5,
    __fool:6
   
  
}


export const  vilagerDesciptions= {
  Matchmaker: 'You start with knowledge so how many evil players live next to each other',
  Judge:  'You know that victory over the forces of evil can be acheieved onces you and two others are left',
  Priest: 'Mysterious force protects you from the forces of evil',
  Pickpocket: 'You know that how many of those who live next to you are evil',
  Detective:'You know that one of two people are a type of minion',
  Barkeep: 'You know that one of two people are a type of villager',
  Oracle: 'Each night you may choose two people and see if any of them is the werewolf however your senses maybe a bit off',
  Murderer:'If you are nominated for death you will do whatever it takes to stop it.',
  Gravedigger: 'You check the body of those who were executed to determine who they really were.',
  Augur:'You gain knowledge only in death.',
  Hunter:'You were given one siliver bullet use it wisely.',
  Bodyguard:'You chose someone to guard every night'
  
  
}

export const possibleVillagers = [
  'Matchmaker',
  'Judge',
  'Priest',
  'Pickpocket',
  'Detective',
  'Barkeep',
  'Oracle',
  'Murderer',
  'Gravedigger',
  'Augur',
  'Hunter',
  'Bodyguard',
  'Gossip'
]