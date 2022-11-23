import AttackPNG from '../assets/cards/attack.png';
import BombPNG from '../assets/cards/bomb.png';
import DefusePNG from '../assets/cards/defuse.png';
import BeardCatPNG from '../assets/cards/beardcat.png';
import BurritoCatPNG from '../assets/cards/burritocat.png';
import FavorPNG from '../assets/cards/favor.png';
import FuturePNG from '../assets/cards/future.png';
import NopePNG from '../assets/cards/nope.png';
import RainbowCatPNG from '../assets/cards/rainbowcat.png';
import ShufflePNG from '../assets/cards/shuffle.png';
import SkipPNG from '../assets/cards/skip.png';
import TacoCatPNG from '../assets/cards/tacocat.png';
import WatermelonCatPNG from '../assets/cards/watermeloncat.png';


export const getCardImg = (imgTag) => {
  switch (imgTag){
    case 'bomb':
      return BombPNG;
    case 'defuse':
      return DefusePNG;
    case 'attack':
      return AttackPNG;
    case 'favor':
      return FavorPNG;
    case 'nope':
      return NopePNG;
    case 'shuffle':
      return ShufflePNG;
    case 'skip':
      return SkipPNG;
    case 'future':
      return FuturePNG;
    case 'beardcat':
      return BeardCatPNG;
    case 'burritocat':
      return BurritoCatPNG;
    case 'rainbowcat':
      return RainbowCatPNG;
    case 'tacocat':
      return TacoCatPNG;
    case 'watermeloncat':
      return WatermelonCatPNG;
    default:
      return ;
  }
  return ;
}

export const getTip = (card) => {
  switch (card.type){
    case 'bomb':
      return 'QUICKLY! DEFUSE THE BOMB!';
    case 'defuse':
      return 'DEFUSES AN EXPLODING KITTEN!';
    case 'attack':
      return 'IMMEDIATELY ENDS THE ACTIVE PLAYER\'S TURN AND FORCES THE NEXT PLAYER TO TAKE TWO TURNS IN A ROW';
    case 'favor':
      return 'FORCE ANOTHER PLAYER TO GIVE YOU A CARD OF THEIR CHOOSING';
    case 'nope':
      return 'STOPS ANY ACTION EXCEPT FOR AN EXPLODING KITTEN OR A DEFUSE';
    case 'shuffle':
      return 'SHUFFLES THE DRAW PILE';
    case 'skip':
      return 'IMMEDIATELY ENDS YOUR TURN WITHOUT DRAWING A CARD';
    case 'future':
      return 'PEEK AT THE TOP 3 CARDS IN THE DRAW PILE';
    default:
      return 'PLAY WITH ANOTHER IDENTICAL CARD TO STEAL A CARD FROM ANOTHER PLAYER\'S HAND'
  }
}
