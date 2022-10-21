const EditInfo = () => {<html>
  <head>
    <title>HTML5のAudioタグテスト</title>
    <style>
      audio {
        display: none
      }
      #play, #stop {
        display: inline-block;
        width: 60px;
        height: 60px;
        margin: 1em;
        border-radius: 50%;
        background: #ddd;
        text-align: center;
        line-height: 60px;
        cursor: pointer;
      }
      #play:hover, #stop:hover {
        background: #eee;
      }
      #time {
        margin: 0 1em;
      }
      #current, #duration {
        padding: 0;
        margin: .2em;
      }
      #seekbar {
        width: 160px;
        height: 10px;
        margin: 1em;
        border-radius: 5px;
        background: linear-gradient(#ccc, #ccc) no-repeat #eee;
      }
    </style>
  </head>
  <body>
    <div>
      <audio src="sample.mp3"></audio>
      <div id="play">Play</div>
      <div id="stop">Stop</div>
      <div id="time">
        <span id="current">00:00</span>
        <span id="duration">00:00</span>
      </div>
      <div id="seekbar"></div>
    </div>
    <script>
      const audio = document.getElementsByTagName("audio")[0]
      const playButton = document.getElementById("play")
      const stopButton = document.getElementById("stop")
      playButton.addEventListener('click', () => {
        if (audio.paused) {
          audio.play()
          play.innerHTML = play.innerHTML === 'Play' ? 'Pause' : 'Play'
        } else {
          audio.pause()
          play.innerHTML = 'Play'
        }
      })
      stopButton.addEventListener('click', () => {
        audio.pause()
        audio.currentTime = 0
      })
  
      audio.addEventListener("timeupdate", (e) => {
        const current = Math.floor(audio.currentTime)
        const duration = Math.round(audio.duration)
        if(!isNaN(duration)){
          document.getElementById('current').innerHTML = playTime(current)
          document.getElementById('duration').innerHTML = playTime(duration)
          const percent = Math.round((audio.currentTime/audio.duration)*1000)/10
          document.getElementById('seekbar').style.backgroundSize = percent + '%'
        }
      })
  
      document.getElementById('seekbar').addEventListener("click", (e) => {
        const duration = Math.round(audio.duration)
        if(!isNaN(duration)){
          const mouse = e.pageX
          const element = document.getElementById('seekbar')
          const rect = element.getBoundingClientRect()
          const position = rect.left + window.pageXOffset
          const offset = mouse - position
          const width = rect.right - rect.left
          audio.currentTime = Math.round(duration * (offset / width))
        }
      })
  
      function playTime (t) {
        let hms = ''
        const h = t / 3600 | 0
        const m = t % 3600 / 60 | 0
        const s = t % 60
        const z2 = (v) => {
          const s = '00' + v
          return s.substr(s.length - 2, 2)
        }
        if(h != 0){
          hms = h + ':' + z2(m) + ':' + z2(s)
        }else if(m != 0){
          hms = z2(m) + ':' + z2(s)
        }else{
          hms = '00:' + z2(s)
        }
        return hms
      }
    </script>
  </body>
  </html>
  };


export default EditInfo;