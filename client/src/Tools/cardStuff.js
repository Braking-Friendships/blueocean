export const getTip = (card) => {
  switch (card.type){
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