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
const KEYC = "261.6";
const KNOB_CTRL = "KNOB_CTRL";
const KEY_CTRL = "KEY_CTRL";

const LOWPASS = 'lowpass';
const HIGHPASS = 'highpass';
const BANDPASS = 'bandpass';
const LOWSHELF = 'lowshelf';
const HIGHSHELF = 'highshelf';
const PEACKING = 'peaking';
const NOTCH = 'notch';

