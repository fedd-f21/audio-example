import { songs } from './data.js'
import { $, $$ } from './utils.js'


//////////// DOCUMENT ELEMENTS
const thePlaylist = $(`#playlist`)
const playOrPause = $(`#playOrPause`)
const playNext = $(`#playNext`)

//////////// THE PLAYER VARIABLES
// Create an <audio> element in memory
const theAudio = new Audio()
// Current song being played from the [song] array above
let indexToPlay = 0



//////////// UI/FUNCTIONALITY

// Play or pause the song, and adjust the UI accordingly
const togglePlayOrPause = function(play = false) {
  if (theAudio.paused || play) {
    theAudio.play()
    playOrPause.textContent = `⏸`
  } else {
    theAudio.pause()
    playOrPause.textContent = `▶️`
  }
}

// Receives an "index" number, and loads up that song into the player
const loadUpSongByIndex = function(index) {
  let wasPlaying = !theAudio.paused

  indexToPlay = index

  // Load up the song with a url
  theAudio.src = songs[indexToPlay]

  // HERE IS WHERE YOU WOULD PUT ALL THE SONG METADATA


  // Remove .playing from all element
  $$(`.loaded`).forEach(ele => ele.classList.remove(`loaded`))

  // Highlight the song that's playing
  $(`[data-index="${indexToPlay}"]`).classList.add(`loaded`)

  // Play the song, if it was already playing when this was pressed
  if (wasPlaying) {
    togglePlayOrPause(true)
  }
}


const playNextSong = function() {
  // if the next index is greater than the last index of the array, then go back to 0
  loadUpSongByIndex(indexToPlay + 1)
}

const playPrevSong = function() {
  // if the prev index is less than 0, then go back to the last index of the array
  loadUpSongByIndex(indexToPlay - 1)
}


window.addEventListener(`load`, function(event) {

  ///////// CONTROLS
  // When you click play/pause button
  playOrPause.addEventListener(`click`, (event) => {
    togglePlayOrPause()
  })

  playNext.addEventListener(`click`, (event) => {
    playNextSong()
  })


  ///////// PLAYLIST STUFF

  // Add the songs (just the urls in this example) to the UI
  songs.forEach(function(song, index) {
    thePlaylist.innerHTML += `<li class="song" data-index="${index}">${song}</li>`
  })

  // If the #playlist is clicked anywhere
  thePlaylist.addEventListener(`click`, function(event) {

    // Get the <li> element
    const songClicked = event.target.closest(`.song`)

    // escape this function immediately, if what was clicked is not a .song
    if (!songClicked.matches(`.song`)) return 

    // Find it's data-index="" value, set it to the indexToPlay
    // Load the song based on the new index value from the click
    loadUpSongByIndex(songClicked.dataset.index)
  })


  // Start by playing the first song
  loadUpSongByIndex(indexToPlay)

})

