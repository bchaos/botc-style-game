// a player 
class Player {

  constructor(name,playerId,powerDescription , nightPower, gameStartPower,nominationPower, resolutionOrder,nightResolution,victoryResolution){
      this._name = name;
      this._playerId=playerId;
      
      this._powerDescription =powerDescription;
     
      this._nightPower =nightPower;
      this._victoryResolution =victoryResolution;
      this._nightResolution =nightResolution;
      this._gameStartPower= gameStartPower;
      this._resolutionOrder=resolutionOrder;
      this._killedByEvil = false;
      this._alive = true;
      this._powerActive=true;
      this._secretRole= name;
  }

  get name() {
    return this._name;
  }

  get alive() {
    return this._alive;
  }

  get evil() {
     return this._evil;
  }
  
  get faction(){
     return this._faction;
  }
  
  get knowledge (){
    
    return this._knowledge;
  }
  
  executeNightPower(){
    
    
  }
  
}
class Good extends Player{
  constructor(name,playerId,powerDescription , nightPower, gameStartPower,nominationPower, resolutionOrder,nightResolution,victoryResolution){
    super(name,playerId,powerDescription , nightPower, gameStartPower,nominationPower, resolutionOrder,nightResolution,victoryResolution)
    this._evil = false;
    this._faction = 'Villager';
  }
  
}
class Stranger extends Player{
  constructor(name,playerId,powerDescription , nightPower, gameStartPower,nominationPower, resolutionOrder,nightResolution,evil){
    super(name,playerId,powerDescription , nightPower, gameStartPower,nominationPower, resolutionOrder,nightResolution,victoryResolution)
    this._evil = evil;
    this._faction = 'Stranger';
  }
  
}

class Evil extends Player{
  constructor(name,playerId,powerDescription , nightPower, gameStartPower,nominationPower, resolutionOrder,nightResolution){
    super(name,playerId,powerDescription , nightPower, gameStartPower,nominationPower, resolutionOrder,nightResolution,victoryResolution)
    this._evil = true;
    this._faction = 'Evil';
  } 
}

let skipCondidtion =function(){
  
  return false;
}


function createMatchMaker(playerId){
  return new Good('Match Maker ',
                    playerId,
                            'You start with knowledge so how many evil players live next to each other',
                            skipCondidtion,
                            function(players){
                              let prevEvil=false;
                              let evilAdjectCount = 0;
                              for (player in players){
                                  if(player._evil == true && prevEvil== true) evilAdjectCount++;
                                  prevEvil = player._evil;
                              }
                              this._knowledge  = 'You know that there are ' +evilAdjectCount + ' members of the forces of evil sitting next to each other';
                              return false;
                            },
                            skipCondidtion,
                            9,
                            skipCondidtion,
                            skipCondidtion,
                           )    
}
                    
function createJudge(playerId){
  return new Good('Match Maker ',
                    playerId,
                            'You know that victory over the forces of evil can be acheieved onces you and two others are left',
                            skipCondidtion,
                            skipCondidtion,
                            skipCondidtion,
                            9,
                            skipCondidtion,
                            function(players){
                              let playersAlive = 0; 
                              for (player in players){
                                  if(player._alive) playersAlive++;
                                  
                              }
                              if(playersAlive===3) return true;
                              return false;
                            },
                           )    
}
                            
module.exports.createMatchMaker = createMatchMaker;