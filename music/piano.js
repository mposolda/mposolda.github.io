var songs = {
  "done": {
    "title": "Done",
    "groupSongs": [
      {
        "name": "John Lennon - Imagine"
      },
      {
        "name": "Hey Bulldog"
      },
      {
        "name": "Let it be"
      },
      {
        "name": "Oh darling"
      },
      {
        "name": "Metallica - Nothing else matters"
      },
      {
        "name": "REM - Nightswimming"
      },
      {
        "name": "Ozzy - Dreamer"
      },
      {
        "name": "Perfect day"
      },
      {
        "name": "Lady Gaga & Bradley Cooper"
      },
      {
        "name": "Doors - Crystal ship"
      },
      {
        "name": "Queen - We are the champions"
      },
      {
        "name": "Radiohead - Karma police"
      },
      {
        "name": "Amelie z Montmartru"
      },
      {
        "name": "Cajkovsky - Swan Lake",
        "links": [ "notes/swanLake1.jpg", "notes/swanLake2.jpg" ]
      },
      {
        "name": "Nights in white satin"
      },
      {
        "name": "Moje - narez 1"
      },
      {
        "name": "Moje - plouzacek 1"
      }
    ]
  },
  "inProgress": {
    "title": "In progress",
    "groupSongs": [
      {
        "name": "Kiss - Beth"
      },
      {
        "name": "Coldplay - full of stars"
      },
      {
        "name": "Twist and shout"
      },
      {
        "name": "Adele",
        "links": [ "notes/adele-bridge.jpg" ]
      },
      {
        "name": "Elan - Kocka",
        "links": [ "https://pisnicky-akordy.cz/elan/kocka" ]
      },
      {
        "name": "Canon D"
      },
      {
        "name": "Lady Madonna"
      },
      {
        "name": "Coldplay - Clocks",
        "links": [ "notes/clocks1.jpg", "notes/clocks2.jpg" ]
      },
      {
        "name": "Elton John - I am still standing"
      },
      {
        "name": "Waterloo"
      },
      {
        "name": "Black Sabbath - changes"
      },
      {
        "name": "Kamil (remove after some time)"
      },
      {
        "name": "Kamila Kabelo - Havana",
        "links": [ "notes/havana.jpg" ]
      },
      {
        "name": "Procol Harum"
      }
    ]
  },
  "todo": {
    "title": "Todo",
    "groupSongs": [
      {
        "name": "Dance Monkey"
      },
      {
        "name": "Layla"
      },
      {
        "name": "Hey Jude"
      },
      {
        "name": "Aerosmith - Dream on"
      },
      {
        "name": "Coldplay - Scientist"
      },
      {
        "name": "Beatles - Lovely Ritta"
      },
      {
        "name": "Beatles - Walrus"
      },
      {
        "name": "Queen - Somebody"
      },
      {
        "name": "Queen - Seven seas of rhye"
      },
      {
        "name": "Queen - Love of my life"
      },
      {
        "name": "Bridge over troubled water"
      },
      {
        "name": "November rain"
      },
      {
        "name": "Pyramid song"
      },
      {
        "name": "Deep purple - child in time"
      },
      {
        "name": "Prokofiev - nights"
      },
      {
        "name": "Blues"
      },
      {
        "name": "Boogie Woogie"
      }
    ]
  }
};

var randomNumber = function(from, to) {
  return from + Math.floor(Math.random() * (to - from + 1));
}

class Piano {

  startMe() {
    document.getElementById('done').innerHTML = this.#renderSongs(songs, "done");
    document.getElementById('inProgress').innerHTML = this.#renderSongs(songs, "inProgress");
    document.getElementById('todo').innerHTML = this.#renderSongs(songs, "todo");

    this.generateRandomSong();
  }

  generateRandomSong() {
    var len = songs.done.groupSongs.length;
    var rand = randomNumber(1, len);
    var songName = songs.done.groupSongs[rand - 1].name;
    console.log("Random number: " + rand);
    document.getElementById('randomSongTitle').innerHTML = songName;

    // Just for testing
    // this.#testRandomNumbers();
  }

  #renderSongs(songs, groupTitle) {
    var currentGroup = songs[groupTitle];
    var str = "<h2>" + currentGroup.title + "</h2><ul>";
    var len = currentGroup.groupSongs.length;
    for (let i = 0; i < len; i++) {
      var song = currentGroup.groupSongs[i];
      str += "<li>" + song.name;

      if (song.links) {
        var len2 = song.links.length;
        str += " - ";
        for (let j = 0; j < len2; j++) {
          str += "<a href=\"" + song.links[j] + "\">" + (j + 1) + "</a> ";
        }
      }

      str += "</li>";
    }
    str += "</ul>";
    return str;
  }

  // Just to test random song generation. Not used in reality
  #testRandomNumbers() {
    var len = songs.done.groupSongs.length;
    var keys = {};
    for (let i = 1; i < (len + 1); i++) {
      keys[i] = 0;
    }
    console.log(keys);
    for (let i = 0; i < 1000; i++) {
      var randd = randomNumber(1, len);
      keys[randd] = keys[randd] + 1;
    }
    console.log(keys);
  }

}

var piano = new Piano();
