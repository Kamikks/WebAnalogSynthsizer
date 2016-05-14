var context = new window.AudioContext();
var _tmpDrgSrc = null;
osc = [];
filter = [];
dest = null;
env = [];

const LARGE = 1;
const MIDDLE = 2;
const SAW = 'sawtooth';
const SINE = 'sine';
const SQUARE = 'square';
const KEY = 'keyboard';
const ADSR = 'adsr';
const DEST = 'dest';
const KEYC = "8.2";
const KNOB_CTRL = "KNOB_CTRL";
const KEY_CTRL = "KEY_CTRL";
const MIDI_CTRL = "MIDI_CTRL";

const LOWPASS = 'lowpass';
const HIGHPASS = 'highpass';
const BANDPASS = 'bandpass';
const LOWSHELF = 'lowshelf';
const HIGHSHELF = 'highshelf';
const PEACKING = 'peaking';
const NOTCH = 'notch';

const CARDLIST = [SAW, SINE, SQUARE, 
                  ADSR, LOWPASS,
                  HIGHPASS, BANDPASS, LOWSHELF, HIGHSHELF, PEACKING, NOTCH, 
                  KEY]
const COLOR = {
  'sawtooth': "#477332",
  'sine': "#477332",
  'square': "#477332",
  'adsr': "#123457",
  'lowpass': "#87DA1A",
  'highpass': "#87DA1A",
  'bandpass': "#87DA1A",
  'lowshelf': "#87DA1A",
  'highshelf': "#87DA1A",
  'peaking': "#87DA1A",
  'notch': "#87DA1A",
  'keyboard': "#123125"
  }
