import { songs } from './data.js'
import { $, $$, secondsToMinutes } from './utils.js'


//////////// DOCUMENT ELEMENTS
const thePlaylist = $(`#playlist`)
const playOrPause = $(`#playOrPause`)
const playPrev = $(`#playPrev`)
const playNext = $(`#playNext`)
const trackVolume = $(`#trackVolume`)
const trackTime = $(`#trackTime`)
const trackDuration = $(`#trackDuration`)
const trackProgress = $(`#trackProgress`)


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


const playNextSong = function(direction = 1) {
  // if the next index is greater than the last index of the array, then go back to 0
  let nextIndex = ((indexToPlay + direction) < 0) ? songs.length - 1
                : ((indexToPlay + direction) > (songs.length - 1)) ? 0
                : indexToPlay + direction

  /* if ((indexToPlay + direction) < 0) {
    nextIndex = songs.length - 1
  } else if ((indexToPlay + direction) > (songs.length - 1)) {
    nextIndex = 0
  } else {
    nextIndex = indexToPlay + direction
  } */

  loadUpSongByIndex(nextIndex)
}

const setVolume = function(vol) {
  theAudio.volume = vol
  trackVolume.value = theAudio.volume
}

window.addEventListener(`load`, function(event) {

  ///////// CONTROLS
  // When you click play/pause button
  playOrPause.addEventListener(`click`, (event) => {
    togglePlayOrPause()
  })

  playPrev.addEventListener(`click`, (event) => {
    playNextSong(-1)
  })

  playNext.addEventListener(`click`, (event) => {
    playNextSong(1)
  })

  trackVolume.addEventListener(`input`, (event) => {
    setVolume(trackVolume.value)
  })

  theAudio.addEventListener(`canplaythrough`, event => {
    //console.log(theAudio.currentTime, theAudio.duration)
    trackTime.textContent = secondsToMinutes(theAudio.currentTime)
    trackDuration.textContent = secondsToMinutes(theAudio.duration)
    trackProgress.value = 0
  })

  theAudio.addEventListener(`timeupdate`, event => {
    trackTime.textContent = secondsToMinutes(theAudio.currentTime)
    trackProgress.value = theAudio.currentTime / theAudio.duration
  })

  theAudio.addEventListener(`durationchange`, event => {
    trackDuration.textContent = secondsToMinutes(theAudio.duration)
    trackProgress.value = 0
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

  // Setup the initial volume
  setVolume(0.5)

})

