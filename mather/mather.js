// Not used right now
var EVALUATION_TEXTS = [
  "Máš co zlepšovat. Zkus to znovu. Určitě se to povede líp.",
  "Není to tak zlý. Ale ani žádná sláva. Zkus to znovu. Určitě se to povede líp.",
  "Dost dobrý! Zkus to znovu a budeš možná ještě lepší.",
  "Super! Jen jedna chyba. Dá se to ještě trošku líp.",
  "Super! Žádná chyba. Teď ještě můžeš zlepšit rychlost.",
  "Super! Žádná chyba. Teď ještě můžeš trochu zlepšit rychlost.",
  "Super! Žádná chyba. Teď ještě můžeš trošililinku zlepšit rychlost.",
  "Super! Jsi nejlepší!"
];

var PICTURES_CARS = [
  "01_vrak.jpg",
  "02_trabant.jpg",
  "03_skoda.jpeg",
  "04_tucson.jpg",
  "05_ferrari.jpg",
  "06_porshe.jpg",
  "07_formule-saab.jpg",
  "08_formule1.jpg"
];

// TODO: More "types" of pictures
var PICTURES = PICTURES_CARS;

            var state = {
                counter: 0,
                ok: 0,
                errors: 0,
                totalTime: null, // Filled once whole exam is finished
                examples: []
            };

            var currentExample = null;

            // Random number from 2 to 10
            var randomNumber = function(from, to) {
                return from + Math.floor(Math.random() * (to - from + 1));
            }

            var getTimestampInSeconds = function() {
                return Math.floor(Date.now() / 1000)
            }

            // Multiply or divide
            var randomSign = function() {
                return Math.floor(Math.random() * 2);
            }


            // Create new example now
            var restartExample = function() {
                state.counter += 1;

                currentExample = config.getExampleFactory().createExample();


                console.log('New example created: ' + currentExample.asStr + "_" + currentExample.asStrAfter);

                document.getElementById('counter').innerHTML = 'Příklad ' + state.counter;
                document.getElementById('exampleText').innerHTML = currentExample.asStr;
                document.getElementById('exampleTextAfter').innerHTML = currentExample.asStrAfter;

                var myInput = document.getElementById('exampleInput');
                myInput.value = '';
                myInput.focus();
            }

            var renderTable = function() {
                var str = '<table border><tr><th>Příklad</th><th>Správný výsledek</th><th>Napsaný výsledek</th><th></th></tr>';
                var len = state.examples.length;
                for (let i = 0; i < len; i++) {
                    var ex = state.examples[i];
                    str += "<tr>";
                    str += "<td>" + ex.asStr + "_" + ex.asStrAfter + "</td>";
                    str += "<td>" + ex.result + "</td>";

                    str += "<td>" + ex.usedResult + "</td>";

                    var okState = ex.goodResult ? "OK" : "CHYBA";
                    var bgColor = ex.goodResult ? "#66ff66" : "#ff6666";
                    str += '<td style="background-color: ' + bgColor + '">' + okState + "</td>";

                    str += "</tr>";
                }
                str += '</table>';
                return str;
            }

            var renderSummary = function() {
                var level = config.getExampleFactory().getLevelFromState(state);
                var picture = PICTURES[level - 1];
                var evaluation = EVALUATION_TEXTS[level - 1];

                // Hide the example. Exam is finished
                document.getElementById('example').style = 'display: none';

                var str = "<br />";
                str += '<img src="' + picture + '" style="width: 60%"></img><br />';
                str += "<b>Level " + level + " z 8.<br />";
                str += "<b>Správně: " + state.ok + "<br />";
                str += "Chyby: " + state.errors + "<br />";
                str += "</b>";
                document.getElementById('summary').innerHTML = str;
            }


            // Executed when "Enter" is pressed.
            var onEnterKey = function() {
                console.log('Enter was pressed. Example input: ' + document.getElementById('exampleInput').value);

                // Evaluate and push current example
                currentExample.usedResult = document.getElementById('exampleInput').value;
                currentExample.time = getTimestampInSeconds() - currentExample.startTime;
                currentExample.goodResult = currentExample.result == currentExample.usedResult;

                if (currentExample.goodResult) {
                    state.ok += 1;
                } else {
                    state.errors += 1;
                }

                state.examples.push(currentExample);

                document.getElementById('examplesTable').innerHTML = renderTable();

                // Check if we're already finished. If yes, render summary. If not, create new example
                if (state.counter === config.getExamplesCount()) {
                    state.totalTime = getTimestampInSeconds() - state.examples[0].startTime;
                    renderSummary();
                } else {
                    restartExample();
                }
            }


class Mather {

  startMe() {
    document.getElementById('configArea').style = 'display: none';
    document.getElementById('example').style = 'display: inline';

                document.getElementById('exampleInput').addEventListener("keypress", function(event) {
                    if (event.key === "Enter") {
                        onEnterKey();
                    } else if (event.key >= "0" && event.key <= "9") {
                        //document.getElementById('exampleInput').value = document.getElementById('exampleInput').value + event.key;
                    }
                });

                restartExample();
  }

}

var mather = new Mather();
