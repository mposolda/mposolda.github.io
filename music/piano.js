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
        "name": "Doors - Crystal ship<"
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
        "name": "Cajkovsky - Swan Lake"
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
        "name": "Adele"
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
        "name": "Coldplay - Clocks"
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
        "name": "Kamila Kabelo"
      },
      {
        "name": "Procol Harum"
      }
    ]
  },
  "todo": {
    "title": "todo",
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


class Piano {

  startMe() {
    document.getElementById('done').innerHTML = this.#renderSongs(songs, "done");
    document.getElementById('inProgress').innerHTML = this.#renderSongs(songs, "inProgress");
    document.getElementById('todo').innerHTML = this.#renderSongs(songs, "todo");
  }

  #renderSongs(songs, groupTitle) {
    var currentGroup = songs[groupTitle];
    var str = "<div id=\"" + groupTitle + "\"><h2>" + currentGroup.title + "</h2><ul>";
    var len = currentGroup.groupSongs.length;
    for (let i = 0; i < len; i++) {
      var song = currentGroup.groupSongs[i];
      str += "<li>" + song.name + "</li>";
    }
    str += "</ul>";
    return str;
  }

}

var piano = new Piano();
