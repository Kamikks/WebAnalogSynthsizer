# Infinite
Infinite is web based analog synthesizer.
It is almost written in HTML and Javascript using Web Audio API.

## DESCRIPTION
This is card based synthesizer.

- Oscillator card

  There are sawtooth, sine and square cards.

- ADSR card

  Envelope Generator card.

- Filter card

  There Lowpass, Highpass and Bandpass filter cards.

- Keyboard card

  Midi control and web based keyboard card.

- Panner card

  This card is Panner effect.
  

There are initialize, add, and open function.
- initialize

  Initialize the deck.Clear all added cards except for "master" card.

- add

  Select and add card to the deck.
  
- open 

  Open ready-made sound patch.


Each card has three buttons.
- left button

  Select card which selected card connect to.

- middle button

  Maxmize/minimize selected card.

- right button

  Delete selected card from the deck.

## How to install
1. Clone repository
    git clone https://github.com/tKammy/WebAnalogSynthsizer.git
2. Install npm package
  If you fail to execute 'npm install', please execute it with '--no-bin-links' option.
    npm install
3. Start Service and access via Chrome browser
    npm start

## License
Infinite uses a Apache license v2. 
