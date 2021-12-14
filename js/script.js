//////////// DOCUMENT ELEMENTS
const thePlaylist = document.querySelector(`#playlist`)
const playOrPause = document.querySelector(`#playOrPause`)


//////////// THE PLAYER VARIABLES
// Create an <audio> element in memory
const theAudio = new Audio()

// A simplified version of a song playlist
const songs = [
  `audio/bensound-sunny.mp3`,
  `https://cdn.pixabay.com/audio/2021/11/13/audio_cb4f1212a9.mp3`,
  `https://cdn.pixabay.com/audio/2021/11/25/audio_91b32e02f9.mp3`
]

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

  // Load up the song with a url
  theAudio.src = songs[index]

  // HERE IS WHERE YOU WOULD PUT ALL THE SONG METADATA

  // Play the song, if it was already playing when this was pressed
  if (wasPlaying) {
    togglePlayOrPause(true)
  }
}

// When you click play/pause button
playOrPause.addEventListener(`click`, (event) => {
  togglePlayOrPause()
})

// Add the songs (just the urls in this example) to the UI
songs.forEach(function(song, index) {
  thePlaylist.innerHTML += `<li class="song" data-index="${index}">${song}</li>`
})

// If the #playlist is clicked anywhere
thePlaylist.addEventListener(`click`, function(event) {

  // Get the <li> element
  const songClicked = event.target.closest(`.song`)

  // Find it's data-index="" value, set it to the indexToPlay
  indexToPlay = songClicked.dataset.index

  // Load the song based on the new index value from the click
  loadUpSongByIndex(indexToPlay)
})

// Start by playing the first song
loadUpSongByIndex(indexToPlay)




// Thursday:
// - Clean up the code and ui
// - Next/prev song (both with click, or `complete` event)
// - "Present" your UI/code
// - Fixed up bugs and errors as a team

// After Thursday
// - Project can be submit as late as Sunday at 23:59
// - Quiz: Done any time between Thurs (15:00) and Sunday (23:59)
//    - Will discuss this item more on Thursday