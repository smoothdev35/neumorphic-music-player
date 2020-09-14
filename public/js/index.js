
alert('nt');

uiController = {
  songsArray: [],
  audioArray: [
    "https://musichugopriet.s3.eu-west-3.amazonaws.com/aint-no-time.mp3",
    "https://musichugopriet.s3.eu-west-3.amazonaws.com/in-her-mouth.mp3",
    "https://musichugopriet.s3.eu-west-3.amazonaws.com/maybach.mp3",
    "https://musichugopriet.s3.eu-west-3.amazonaws.com/xanny-family.mp3",
    "https://musichugopriet.s3.eu-west-3.amazonaws.com/lil-haiti-baby.mp3",
    "https://musichugopriet.s3.eu-west-3.amazonaws.com/photo-copied.mp3",
    "https://musichugopriet.s3.eu-west-3.amazonaws.com/seven-rings.mp3",
    "https://musichugopriet.s3.eu-west-3.amazonaws.com/lie-to-me.mp3",
    "https://musichugopriet.s3.eu-west-3.amazonaws.com/program.mp3",
    "https://musichugopriet.s3.eu-west-3.amazonaws.com/Future+-+Low+Life+(Official+Music+Video)+ft.+The+Weeknd.mp3",
    "https://musichugopriet.s3.eu-west-3.amazonaws.com/fly-shit-only.mp3",
  ],
  titleArray: [
    "EVOL",
    "Ain't No Time",
    "In Her Mouth",
    "Maybach",
    "Xanny Family",
    "Lil Haiti Baby",
    "Photo Copied",
    "Seven Rings",
    "Lie to Me",
    "Program",
    "Low Life",
    "Fly Shit Only",
  ],
  artistArray: ["Future", "Future &#8226 The Weeknd"],
  albumHeading: document.querySelector(
    ".phone.right > .content > .header > h1"
  ),
  titleWrapper: document.querySelector(".title"),
  listWrapper: document.querySelector(".catalog-content"),
  visualButtons: document.querySelectorAll(".visual > div > button "),
  playingTrack: new Audio(),
  toggleState: false,
  songDuration: 0,
  songIndex: 0,
  playing: null,
  entries: "",
  entryArray: "",
  entryButtons: "",
  entryButtonArray: "",
  activeEntry: "",
  headerWrappers: document.querySelectorAll(".header > div "),
  headerButtons: document.querySelectorAll(".header > div > button "),
  controlButtons: document.querySelectorAll(".controls > div > button "),
  controlArray: Array.from(
    document.querySelectorAll(".controls > div > button ")
  ),
  sliderEl: document.querySelector(".slider > input[type=range]"),
  passed: document.querySelector("#passed"),
  remaining: document.querySelector("#left"),
  formatDuration: (s) => {
    let minutes = Math.floor(s / 60);
    let seconds = s % 60;
    let formatted =
      minutes.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0");
    return formatted;
  },
  createSongObject(x, y, z) {
    newSong = {
      src: uiController.audioArray[x],
      title: uiController.titleArray[y],
      artist: uiController.artistArray[z],
    };
    uiController.songsArray.push(newSong);
  },
  populateAlbum: () => {
    let length = uiController.audioArray.length;
    for (let i = 0; i < length; i++) {
      switch (i) {
        case 0:
          uiController.createSongObject(0, 1, 0);
          break;
        case 1:
          uiController.createSongObject(1, 2, 0);
          break;
        case 2:
          uiController.createSongObject(2, 3, 0);
          break;
        case 3:
          uiController.createSongObject(3, 4, 0);
          break;
        case 4:
          uiController.createSongObject(4, 5, 0);
          break;
        case 5:
          uiController.createSongObject(5, 6, 0);
          break;
        case 6:
          uiController.createSongObject(6, 7, 0);
          break;
        case 7:
          uiController.createSongObject(7, 8, 0);
          break;
        case 8:
          uiController.createSongObject(8, 9, 0);
          break;
        case 9:
          uiController.createSongObject(9, 10, 1);
          break;
        case 10:
          uiController.createSongObject(10, 11, 0);
          break;
      }
    }
  },
  createList: () => {
    for (let i = 0; i < uiController.audioArray.length; i++) {
      let newEntry = `<article class='entry-wrapper'><article class='entry'><h1>${
        uiController.songsArray[i].title
      }</h1><h3>${
        i == uiController.audioArray.length - 2
          ? uiController.songsArray[9].artist
          : uiController.songsArray[0].artist
      }</h3><div><button></button></div></article></article>`;
      uiController.listWrapper.insertAdjacentHTML("beforeend", newEntry);
    }
    uiController.entries = document.querySelectorAll(".entry");
    uiController.entryArray = Array.from(uiController.entries);
    uiController.entryButtons = document.querySelectorAll(
      ".entry > div > button"
    );
    uiController.entryButtonArray = Array.from(uiController.entryButtons);

    uiController.albumHeading.innerHTML = `${
      uiController.titleArray[0]
    } &#8226 ${uiController.artistArray[0].toUpperCase()}`;
  },
  passAudioProps: (obj) => {
    if (uiController.playingTrack.src != obj.src) {
      uiController.entryButtons.forEach((item, i) => {
        item.classList.remove("pressed");
        item.parentElement.classList.remove("pressed");
      });
      uiController.entries.forEach((item, i) => {
        item.classList.remove("pressed");
        item.parentElement.classList.remove("pressed");
      });
      uiController.playingTrack.src = obj.src;
      uiController.songIndex = uiController.audioArray.indexOf(
        uiController.playingTrack.src
      );
      uiController.toggleState = false;
    }

    let title = `<h1>${obj.title}</h1><h3>${obj.artist}</h3>`;
    uiController.titleWrapper.innerHTML = title;
  },
  getAudioData: () => {
    uiController.playingTrack.addEventListener("loadedmetadata", (event) => {
      let time = Math.round(uiController.songDuration);
      uiController.remaining.innerHTML = uiController.formatDuration(time);
      uiController.songDuration = uiController.playingTrack.duration;
      uiController.sliderEl.setAttribute("max", time);
    });
  },
  toRangeVal: (x) => {
    uiController.sliderEl.value = x;
  },
  inputRender: () => {
    let time = uiController.songDuration;
    let roundTime = Math.round(time);
    let now = uiController.playingTrack.currentTime;
    let roundNow = Math.round(now);
    uiController.passed.innerHTML = uiController.formatDuration(roundNow);
    let updated = uiController.formatDuration(roundTime - roundNow);
    uiController.remaining.innerHTML = `${updated}`;
    uiController.toRangeVal(roundNow);
  },
  createInterval: () => {
    uiController.entryButtonArray[uiController.songIndex].classList.add(
      "pressed"
    );
    uiController.entryButtonArray[
      uiController.songIndex
    ].parentElement.classList.add("pressed");
    uiController.controlArray[1].parentElement.classList.add("pressed");
    uiController.controlArray[1].classList.add("pressed");
    uiController.playingTrack.play();
    uiController.toggleState = true;
    uiController.playing = setInterval(() => {
      uiController.inputRender();
    }, 1000);
  },
  applySlideValue: (x) => {
    let newCurrent = uiController.formatDuration(x);
    let time = uiController.songDuration;
    let rawLeft = Math.round(time - x);
    let remaining = uiController.formatDuration(rawLeft);
    uiController.playingTrack.currentTime = x;
    if (uiController.controlArray[1].classList.contains("pressed")) {
      uiController.playingTrack.play();
    } else {
      uiController.playingTrack.pause();
    }
    uiController.passed.innerHTML = newCurrent;
    uiController.remaining.innerHTML = remaining;
  },
  setRangeHandler: () => {
    uiController.sliderEl.addEventListener("input", (e) => {
      uiController.applySlideValue(e.target.value);
    });
  },
  selectSong: (i) => {
    uiController.passAudioProps(uiController.songsArray[i]);
    setTimeout(() => {
      uiController.getAudioData();
      uiController.inputRender();
      uiController.setRangeHandler();
    }, 500);
    uiController.entries.forEach((item, i) => {
      item.classList.remove("pressed", "active");
    });
    uiController.entryArray[i].classList.add("pressed", "active");
    uiController.entryArray[i].parentElement.classList.add("pressed");
  },
  playPause: () => {
    uiController.toggleState == false
      ? uiController.createInterval()
      : (uiController.playingTrack.pause(),
        uiController.controlArray[1].classList.remove("pressed"),
        uiController.controlArray[1].parentElement.classList.remove("pressed"),
        uiController.entryButtonArray[uiController.songIndex].classList.remove(
          "pressed"
        ),
        uiController.entryButtonArray[
          uiController.songIndex
        ].parentElement.classList.remove("pressed"),
        clearInterval(uiController.playing),
        (uiController.toggleState = false));
  },
  prevSong: () => {
    uiController.songIndex - 1 < 0
      ? uiController.selectSong(uiController.audioArray.length - 1)
      : uiController.selectSong(uiController.songIndex - 1);
    uiController.controlArray[1].classList.remove("pressed");
    uiController.controlArray[1].parentElement.classList.remove("pressed");
  },
  nextSong: () => {
    uiController.songIndex + 1 > uiController.audioArray.length - 1
      ? uiController.selectSong(0)
      : uiController.selectSong(uiController.songIndex + 1);
    uiController.controlArray[1].classList.remove("pressed");
    uiController.controlArray[1].parentElement.classList.remove("pressed");
  },
  simplePress: (el) => {
    el.addEventListener("mousedown", () => {
      el.classList.add("pressed");
      el.parentElement.classList.add("pressed");
    });
    el.addEventListener("mouseup", () => {
      el.classList.remove("pressed");
      el.parentElement.classList.remove("pressed");
    });
  },
  activeHeart: (el, str, str2) => {
    el.addEventListener("mousedown", () => {
      if (el.classList.contains(str)) {
        el.classList.add(str2);
      }
    });
    el.addEventListener("click", () => {
      el.classList.toggle(str);
    });
    el.addEventListener("mouseup", () => {
      el.classList.remove(str2);
    });
  },
  activePress: (el) => {
    el.classList.add("active");
    el.classList.toggle("pressed");
    el.parentElement.classList.toggle("pressed");
  },
  mainPressHandler: (nodelist) => {
    nodelist.forEach((item, i) => {
      if (nodelist == uiController.visualButtons) {
        switch (i) {
          case 0:
            uiController.simplePress(item);
            uiController.activeHeart(item, "heart-pressed", "heart-back");
            break;
          case 1:
            uiController.simplePress(item);
            break;
        }
      } else if (nodelist == uiController.entries) {
        item.addEventListener("click", () => {
          if (item.classList.contains("pressed")) {
            item.classList.remove("pressed");
            item.parentElement.classList.remove("pressed");
          } else {
            uiController.selectSong(i);
            uiController.controlArray[1].classList.remove("pressed");
            uiController.controlArray[1].parentElement.classList.remove(
              "pressed"
            );
          }
        });
      } else if (nodelist == uiController.entryButtons) {
        item.addEventListener("click", (e) => {
          e.stopPropagation();

          uiController.selectSong(i);
          setTimeout(() => {
            uiController.playPause();
          }, 0);
        });
      } else if (nodelist == uiController.headerButtons) {
        uiController.simplePress(item);
      } else if (nodelist == uiController.controlButtons) {
        item.addEventListener("click", () => {
          switch (i) {
            case 0:
              uiController.simplePress(item);
              uiController.prevSong();
              break;
            case 1:
              uiController.simplePress(item);
              uiController.playPause();
              break;
            case 2:
              uiController.simplePress(item);
              uiController.nextSong();
              break;
          }
        });
      }
    });
  },
  setControlsHandler: () => {
    uiController.mainPressHandler(uiController.visualButtons);
    uiController.mainPressHandler(uiController.entries);
    uiController.mainPressHandler(uiController.entryButtons);
    uiController.mainPressHandler(uiController.headerButtons);
    uiController.mainPressHandler(uiController.controlButtons);
  },
  init: () => {
    uiController.populateAlbum();
    uiController.createList();
    uiController.setControlsHandler();
    uiController.selectSong(0);
    uiController.getAudioData();
    uiController.inputRender();
    uiController.setRangeHandler();
  },
};

uiController.init();
