// gui
var gui = require('nw.gui');
var item
var win = gui.Window.get();
var nativeMenuBar = new gui.Menu({ type: "menubar" });
nativeMenuBar.createMacBuiltin("MusicTools");

item = new gui.MenuItem({ label: 'Tools'})
var submenu = new gui.Menu();
submenu.append(new gui.MenuItem({ 
  label: "MIDI Note Calculator",
  click: function() {
    win = gui.Window.get()
    console.log(win)
  }
  }));
submenu.append(new gui.MenuItem({ label: 'Delay Calculator' }));
submenu.append(new gui.MenuItem({ label: 'Frequency Counter' }));
item.submenu = submenu;
nativeMenuBar.append(item)



win.menu = nativeMenuBar;



var note_array = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B']

var note_chart = {
  'C' : 0,
  'C#' : 1,
  'Db' : 1,
  'D' : 2,
  'D#' : 3,
  'Eb' : 3,
  'E' : 4,
  'F' : 5,
  'F#' : 6,
  'Gb' : 6,
  'G' : 7,
  'G#' : 8,
  'Ab' : 8,
  'A' : 9,
  'A#' : 10,
  'Bb' : 10,
  'B' : 11
}

var noteNameElement = document.getElementById('note_name')
var noteNumElement = document.getElementById('note_num')

function calculateNote() {
  var noteValue = Number(noteNumElement.value)
  if (noteValue < 0 || noteValue > 127) {
    noteNameElement.value = '--'
  } else {
    var noteName = note_array[noteValue % 12]
    var octave = -1
    while (noteValue >= 12) {
      octave++
      console.log(octave)
      noteValue = noteValue - 12
    }
    noteNameElement.value = noteName + octave
  }
}

function calculateNoteNumber() {
  var noteName
  var noteValue
  var octave

  // check if input is valid
  if (note_chart[noteNameElement.value[0]] >= 0) {
    console.log('note is valid')

    // check for accidentals
    if(noteNameElement.value[1] == 'b' || noteNameElement.value[1] == '#') {
      console.log('there is an accidental')
      noteName = noteNameElement.value.slice(0,2)
      console.log('note name is ' + noteName)
      noteValue = note_chart[noteName]
      console.log('note value is ' + noteValue)
    } else {
      noteName = noteNameElement.value[0]
      noteValue = note_chart[noteName]
      console.log('note value is ' + noteValue)
    }

    // get octave
    octave = noteNameElement.value.slice(noteName.length)
    console.log('octave is ' + octave)
    if ( octave >= -1 && octave < 10) {
      var octaveValue = (octave * 12) + 12
      noteNumElement.value = noteValue + octaveValue
    } else {
      console.log('note is out of range')
      noteNumElement.value = ''
    }

  } else {
    console.log('note is invalid')
    noteNumElement.value = ''
  }
}