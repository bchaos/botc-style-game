// a player 
var path = require('path');
var { phases ,chosenBy , vilagerDesciptions, possibleVillagers,possibleMinions,possibleStrangers} = require(path.join(__dirname,  'gamePhases'));


class Player {

  constructor(name,playerId,playerName,powerDescription, power, powerTiming, resolutionOrder,canChosePlayer){
      this._name = name;
      this._playerId=playerId;
      this._playerName=playerName
      this._powerDescription =powerDescription;
      this._power =power;
      this._powerActive=true;
      this._powerTiming =powerTiming;
      this._killedByEvil = false;
      this._alive = true;
      this._canChosePlayer=canChosePlayer;
      this._pickedBy=[];
      this._killedLastNight=false;
      this._executedLastNight=false;
      this._powerActive=true;
      this._secretRole= false;
      this._isWereWolf=false;
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

  
}
class Good extends Player{
  constructor(name,playerId,playerName,powerDescription , power, powerTiming, resolutionOrder,canChosePlayer){
    super(name,playerId,playerName,powerDescription , power, powerTiming, resolutionOrder,canChosePlayer)
    this._evil = false;
    this._faction = 'Villager';
  }
  
}
class Stranger extends Player{
  constructor(name,playerId,playerName,powerDescription , power, powerTiming, resolutionOrder,canChosePlayer){
    super(name,playerId,playerName,powerDescription , power, powerTiming, resolutionOrder,canChosePlayer)
    this._evil = evil;
    this._faction = 'Stranger';
  }
  
}

class Minion extends Player{
  constructor(name,playerId,playerName,powerDescription , power, powerTiming, resolutionOrder,canChosePlayer){
    super(name,playerId,playerName,powerDescription , power, powerTiming, resolutionOrder,canChosePlayer)
    this._evil = true;
    this._faction = 'Minion';
  } 
}
class wereWolf extends Minion{
  constructor(name,playerId,playerName,powerDescription , power, powerTiming, resolutionOrder,canChosePlayer)){
    super(name,playerId,playerName,powerDescription , power, powerTiming, resolutionOrder,canChosePlayer)
    this._faction = 'WereWolf';
    this._isWereWolf=true;
  } 
}

let getPossibleRoles = (faction,me) =>{
      let classIdentiy ='';
      let foundStranger=false;
      let truePlayer  = []
      let possiblePlayers =[]
      for (player in players){
           if(player.faction==faction && foundStranger ===flase){
             foundStranger=true;
             classIdentiy = player.name;
            truePlayer.push(player._playerId)
           } else if(player._playerId !== me._playerId){
             possiblePlayers.push(player._playerId);
           }
      }
      let fakePlayer = possiblePlayers[Math.floor(Math.random() * possiblePlayers.length)];
      truePlayer.push(fakePlayer);
      for (var i = truePlayer.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = truePlayer[i];
          truePlayer[i] = truePlayer[j];
          truePlayer[j] = temp;
      }

      return 'Based on your investigations you know that either  ' +truePlayer[0] + ' or '+ truePlayer[1] +' is '+classIdentiy;

}



let checkIfIChoseThem = (player,myChoice) =>{
  if(player._pickedBy.indexOf(myChoice) !== -1)return true;
  return false
  
}

function createMatchMaker(playerId,playerName){
  return new Good('Matchmaker ',
                    playerId,
                    playerName,
                    vilagerDesciptions.Matchmaker,
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
                    phases.__startOfGame,
                    9,
                  false

                   )    
}
                    
function createJudge(playerId,name){
  return new Good('Judge',
                    playerId,
                    vilagerDesciptions.Judge,
                    function(players){
                      let playersAlive = 0; 
                      for (player in players){
                          if(player._alive) playersAlive++;

                      }
                      if(playersAlive===3) return true;
                      return false;
                    },
                    phases.__afterKillResolution
                    9,
                  false
                   )    
}
       
function createPriest(playerId,name){
  return new Good('Priest',
                    playerId,
                    name
                     vilagerDesciptions.Priest,

                    function(){
                        if(this._alive===false && this._killedByEvil===true) this._alive =true;
                        return false;
                    },
                    phases.__afterKillResolution,
                    9,
                  false
                   )    
}                  

                  
function createPickPocket(playerId,name){
  return new Good('Pick Pocket',
                    playerId,
                  name,
                  vilagerDesciptions.Pickpocket,
                  function(players){
                    let prevEvil=false;
                    let prevAlive=false;
                    let evilAdjectCount = 0;
                    let foundMe=false;
                    for (player in players){
                         if(foundMe){
                          if(player._evil && player._alive)evilAdjectCount++;
                          foundMe=false;
                        }
                        if(player._playerId == this._playerId && prevEvil== true && prevAlive){
                          evilAdjectCount++;

                          foundMe=true;
                        } 
                        prevAlive = player._alive;
                        prevEvil = player._evil;
                    }
                    this._knowledge  = 'You know that there are ' +evilAdjectCount + ' members live next to you';
                    return false;
                  },
                  phases.__afterKillResolution,
                  9,
                  false

                )    
}      

                  
function createDetective(playerId,name){
  return new Good('Detective',
                    playerId,
                    name,
                    vilagerDesciptions.Detective,
                   
                      function(players){
                      this._knowledge = getPossibleRoles('Minion',this)
                      return false;
                    },
                    phases.__startOfGame,
                    9,
                  false
                   )    
}
                  

function createBartender(playerId,name){
  return new Good('Bartender',
                    playerId,
                    name,
                    vilagerDesciptions.Barkeep,
              
                   function(players){
                    this._knowledge = getPossibleRoles('Villager',this)
                    return false;
                  },
                  phases.__startOfGame,
                  9,
                  false
                 
                 )    
}
      
function createOracle(playerId,name){
  return new Good('Oracle',
                    playerId,
                  name,
                  vilagerDesciptions.Oracle,
                    function(players){
                             
                        let wereWolfFound = false;

                        let playersChosen = []
                        for (player in players){
                             if(checkIfIChoseThem(player,chosenBy.__oracle) && player._isWereWolf){
                                playersChosen.push(player._playerId);
                                wereWolfFound=true
                            }
                          else if(checkIfIChoseThem(player,chosenBy.__oracle) ){
                            playersChosen.push(player._playerId);
                          }

                        }
                        if(wereWolfFound) this._knowledge  = 'You know that ' +playersChosen[0] + 'or ' + playersChosen[1]+ 'maybe the werewolf';
                        else this._knowledge  = 'You know that neither ' +playersChosen[0] + 'nor ' + playersChosen[1]+ 'are a werewolf';

                        return false;
                   },
                  phases.__beforeKillResolution
                  9,
                  {players:2,chosenValue:chosenBy.__oracle}
                 )    
}
function createMurder(playerId,name){
  return new Good('Murder',
                    playerId,
                    name,
                   vilagerDesciptions.Murderer,
                
                  function(players){
                      
                      for (player in players){
                        if(player.nominator == true) player._alive=false; 
                        
                      }
                      return players;
                      
                  },
    
                  phases.__onNomination,
                  1,
                  false
                 
                 )    
}

                  
function createGravedigger(playerId,name){
  return new Good('Gravedigger',
                    playerId,
                    name,
                   ,
                  vilagerDesciptions.Gravedigger
                  function(players){
                      
                      for (player in players){
                        if(player._killedLastNight) this._knowledge ='Last night  '+player._name+" was buried by you";
                        
                      }
                      
                  },
                  phase.__afterKillResolution,
                  9,
                  false
                 )    
}
                  
function createAugur(playerId,name){
  return new Good('Augur',
                    playerId,
                    name,
                   vilagerDesciptions.Augur,
                 
                  function(players){
                      if(this._killedLastNight && this._killedByEvil){
                        for (player in players){
                          if(checkIfIChoseThem(player,chosenBy.__augur)) this._knowledge ='the player you were investigating was a  '+player._name+".";

                        }
                      }
                  },
                  phase.__afterKillResolution,
                  9,
                  {players:1,chosenValue:chosenBy.__augur}
                 )    
}

function createHunter(playerId,name){
  return new Good('Hunter',
                    playerId,
                    name,
                   vilagerDesciptions.Hunter,
                 
                  function(players){
                      if(this._powerActive){
                        for (player in players){
                          if(checkIfIChoseThem(player,chosenBy.__hunter) && player._faction = 'WereWolf') return true;
                          return false;
                        }
                    }
                  },
                  phase.__afterKillResolution,
                  9,
                  {players:1,chosenValue:chosenBy.__hunter}
                 )    
}

function createBodyGuard(playerId,name){
  return new Good('Bodyguard',
                    playerId,
                    name,
                   vilagerDesciptions.Bodyguard,
                 
                  function(players){
                      
                        for (player in players){
                          if(checkIfIChoseThem(player,chosenBy.__bodyGuard) && player._killedByEvil && player._alive==false) player._alive=true;

                        }
                      return players;
                  },
                  phase.__afterKillResolution,
                  9,
                  {players:1,chosenValue:chosenBy.__bodyGuard}
                 )    
}


function createGossip(playerId,name){
  return new Good('Gossip',
                    playerId,
                    name,
                    vilagerDesciptions.Gossip,
                   
                      function(players){
                      this._knowledge = getPossibleRoles('Stranger',this)
                      return false;
                    },
                    phases.__startOfGame,
                    2,
                  false
                   )    
}  
       
function createFool(playerId,name){
  let tempFool =  new Stranger('Fool',
                    playerId,
                    name,
                    '',
                    function(players){
                      this._secretRole='Fool'
                      this.name= possibleVillagers[Math.floor(Math.random() * possibleVillagers.length)];
                      this._powerDescription= vilagerDesciptions[this.name];
                      swith(this.name) {
                        case "Matchmaker":{
                          this._knowledge  = 'You know that there are ' +Math.floor(Math.random() * 3) + ' members of the forces of evil sitting next to each other';
                          break;
                        }
                        case "Pickpocket":{
                            this._knowledge  = 'You know that there are ' +Math.floor(Math.random() * 2)  + ' members live next to you';
                          break;
                          
                        }
                        case "Detective":{
                           let possiblePlayers =[]
                           for(player in players){
                             if(player._playerId !==this._playerId)possiblePlayers.push()
                           }
                          let fakeMinon = possibleMinions[Math.floor(Math.random() * possibleVillagers.length)];
                           for (var i = possiblePlayers.length - 1; i > 0; i--) {
                              var j = Math.floor(Math.random() * (i + 1));
                              var temp = truePlayer[i];
                              possiblePlayers[i] = possiblePlayers[j];
                              possiblePlayers[j] = temp;
                          }
                          this._knowledge 'Based on your investigations you know that either  ' +possiblePlayers[0] + ' or '+ possiblePlayers[1] +' is '+fakeMinon;
                           break;
                        }
                        
                        case "Barkeep":{
                           let possiblePlayers =[]
                           for(player in players){
                             if(player._playerId !==this._playerId) possiblePlayers.push()
                           }
                          let fakeVillager = possibleVillagers[Math.floor(Math.random() * possibleVillagers.length)];
                           for (var i = possiblePlayers.length - 1; i > 0; i--) {
                              var j = Math.floor(Math.random() * (i + 1));
                              var temp = truePlayer[i];
                              possiblePlayers[i] = possiblePlayers[j];
                              possiblePlayers[j] = temp;
                          }
                          this._knowledge 'Based on your investigations you know that either  ' +possiblePlayers[0] + ' or '+ possiblePlayers[1] +' is '+fakeVillager;
                           break;
                        }
                        
                        case "Oracle":{
                           this._power = function(){
                                     
                              let wereWolfFound = false;

                              let playersChosen = []
                              for (player in players){
                                   if(checkIfIChoseThem(player,chosenBy.__fool) && Math.floor(Math.random() * 3) > 0){
                                      playersChosen.push(player._playerId);
                                      wereWolfFound=true
                                  }
                                else if(checkIfIChoseThem(player,chosenBy.__fool) ){
                                  playersChosen.push(player._playerId);
                                }

                              }
                              if(wereWolfFound) this._knowledge  = 'You know that ' +playersChosen[0] + 'or ' + playersChosen[1]+ 'maybe the werewolf';
                              else this._knowledge  = 'You know that neither ' +playersChosen[0] + 'nor ' + playersChosen[1]+ 'are a werewolf';

                              return false;
                          }
                          this._powerTiming =  phases.__beforeKillResolution
                          this._canChosePlayer={players:2,chosenValue:chosenBy.__fool}
                           break;
                        }
                        case "Gravedigger":{
                           this._power =  for (player in players){
                              if(player._killedLastNight) this._knowledge ='Last night  '+ possibleVillagers[Math.floor(Math.random() * possibleVillagers.length)]+" was buried by you";
                        
                            }
                          this._powerTiming =  phases.__afterKillResolution
                           break;
                        }
                        case "Augur":{
                           this._power =  function(players){
                              if(this._killedLastNight && this._killedByEvil){
                                for (player in players){
                                  if(checkIfIChoseThem(player,chosenBy.__augur)) this._knowledge ='the player you were investigating was a  '+possibleVillagers[Math.floor(Math.random() * possibleVillagers.length)]+".";

                                }
                              }
                          }
                          this._powerTiming =  phases.__afterKillResolution
                           break;
                        }
                          
                      },
                      case "Gossip":{
                           let possiblePlayers =[]
                           for(player in players){
                             if(player._playerId !==this._playerId) possiblePlayers.push()
                           }
                          let fakeVillager = possibleStrangers[Math.floor(Math.random() * possibleVillagers.length)];
                           for (var i = possiblePlayers.length - 1; i > 0; i--) {
                              var j = Math.floor(Math.random() * (i + 1));
                              var temp = truePlayer[i];
                              possiblePlayers[i] = possiblePlayers[j];
                              possiblePlayers[j] = temp;
                          }
                          this._knowledge 'Based on your investigations you know that either  ' +possiblePlayers[0] + ' or '+ possiblePlayers[1] +' is '+fakeVillager;
                           break;
                        }
                    },
                    phases.__startOfGame,
                    9,
                      false
                   )  
  
  
  
}  
    

            
module.exports.createMatchMaker = createMatchMaker;