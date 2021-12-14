// DOCUMENT ELEMENTS
const thePlaylist = document.querySelector(`#playlist`)
const playOrPause = document.querySelector(`#playOrPause`)

// THE PLAYER
const theAudio = new Audio()

// PLAYLIST
const songs = [
  `audio/bensound-sunny.mp3`,
  `https://cdn.pixabay.com/audio/2021/11/13/audio_cb4f1212a9.mp3`,
  `https://cdn.pixabay.com/audio/2021/11/25/audio_91b32e02f9.mp3`
]
let indexToPlay = 0

const loadUpSongByIndex = function(index) {
  let wasPlaying = !theAudio.paused

  // Load up the song with a url
  theAudio.src = songs[index]

  // Place all the song metadata into the player ui

  // Play the song
  if (wasPlaying) {
    theAudio.play()
  }
}


// When you click play/pause
playOrPause.addEventListener(`click`, (event) => {

  if (theAudio.paused) {
    theAudio.play()
    playOrPause.textContent = `⏸`
  } else {
    theAudio.pause()
    playOrPause.textContent = `▶️`
  }
})

// Add the song urls to the UI
songs.forEach(function(song, index) {
  thePlaylist.innerHTML += `<li class="song" data-index="${index}">${song}</li>`
})

thePlaylist.addEventListener(`click`, function(event) {
  const songClicked = event.target.closest(`.song`)
  indexToPlay = songClicked.dataset.index

  loadUpSongByIndex(indexToPlay)
})

// Start by playing the first song
loadUpSongByIndex(indexToPlay)



// Next/prev song (both with click, or `complete` event)

// Thursday:
// - Clean up the code and ui
// - "Present"

// Submit as late as Sunday at 23:59
// Quiz: Between Thurs and Sunday
//  - Discuss more on Thursday