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


class Example {


  // Timestamp (in seconds) when example was started
  startTime = getTimestampInSeconds();

  // Time example took (in seconds). It is set once example is computed
  time;

  // Correct result of this example
  result;

  // Result filled by child. It is set once example is computed
  usedResult;

  // Helper boolean value specifying if computation was successful or not. It is set once example is computed
  goodResult;

  // String representation of this example
  asStr;

}

// Example for small multiplication
class SmallMultiplicationExample extends Example {

  #x = randomNumber(2, 10);
  #y = randomNumber(2, 10);

  // 0 is multiply, 1 is divide
  #sign = randomNumber(0, 1);

  result = this.#x * this.#y;

  // Example for dividing
  constructor() {
    super();
    if (this.#sign === 1) {
      var tmp = this.#x;
      this.#x = this.result;
      this.result = tmp;
      this.asStr = this.#x + ' : ' + this.#y + ' = ';
    } else {
      this.asStr = this.#x + ' * ' + this.#y + ' = ';
    }
  }

}


            // Create new example now
            var restartExample = function() {
                state.counter += 1;
                currentExample = new SmallMultiplicationExample();
                console.log('New example created: ' + currentExample.asStr);

                document.getElementById('counter').innerHTML = 'Příklad ' + state.counter;
                document.getElementById('exampleText').innerHTML = currentExample.asStr;

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
                    str += "<td>" + ex.asStr + "</td>";
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
                var picture;
                var evaluation;
                var level;

                var computePictureAndEvaluation = function() {
                    if (state.errors >= state.ok) {
                        level = 1;
                        picture = '01_vrak.jpg';
                        evaluation = 'Máš co zlepšovat. Zkus to znovu. Určitě se to povede líp.';
                    } else if (state.errors * 3 >= state.ok) {
                        level = 2;
                        picture = '02_trabant.jpg';
                        evaluation = 'Není to tak zlý. Ale ani žádná sláva. Zkus to znovu. Určitě se to povede líp.';
                    } else if (state.errors > 1) {
                        level = 3;
                        picture = '03_skoda.jpeg';
                        evaluation = 'Dost dobrý! Zkus to znovu a budeš možná ještě lepší.';
                    } else if (state.errors == 1) {
                        level = 4;
                        picture = '04_tucson.jpg';
                        evaluation = 'Super! Jen jedna chyba. Dá se to ještě trošku líp.';
                    } else if (state.errors == 0 && state.totalTime > (state.examples.length * 16)) {
                        level = 5;
                        picture = '05_ferrari.jpg';
                        evaluation = 'Super! Žádná chyba. Teď ještě můžeš zlepšit rychlost.';
                    } else if (state.errors == 0 && state.totalTime > (state.examples.length * 10)) {
                        level = 6;
                        picture = '06_porshe.jpg';
                        evaluation = 'Super! Žádná chyba. Teď ještě můžeš trochu zlepšit rychlost.';
                    } else if (state.errors == 0 && state.totalTime > (state.examples.length * 5)) {
                        level = 7;
                        picture = '07_formule-saab.jpg';
                        evaluation = 'Super! Žádná chyba. Teď ještě můžeš trošililinku zlepšit rychlost.';
                    } else {
                        level = 8;
                        picture = '08_formule1.jpg';
                        evaluation = 'Super! Jsi nejlepší!';
                    }
                }

                computePictureAndEvaluation();

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
