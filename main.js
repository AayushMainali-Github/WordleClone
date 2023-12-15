boxNo = "";
word = "";
letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
stToClr = ["#3d4054", "#f3c237", "#57ac57"];
const rgb = (r, g, b) => "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");

play = () => {
  play = document.getElementById("play");
  play.style.display = "none";
  game = document.getElementById("game");
  game.style.display = "flex";
  keyboard = document.getElementById("keyboard");
  keyboard.style.display = "flex";
  for (i = 1; i <= 6; i++) {
    row = document.createElement("div");
    row.className = "gamerow";
    row.id = `row${i}`;
    game.appendChild(row);
    for (j = 1; j <= 5; j++) {
      box = document.createElement("div");
      box.className = "gamebox";
      box.id = `box${i}${j}`;
      row.appendChild(box);
    }
  }
  document.addEventListener("keydown", (k) => {
    if (k.key == "Enter") enter();
    if (k.key == "Backspace") backspace();
    if (letters.includes(k.key.toLowerCase())) letter(k.key);
  });

  boxNo = "box11";
  word = "table";
};
enter = () => {
  if (boxNo[4] == "6") {
    enteredWord = "";
    for (i = 1; i <= 5; i++) {
      enteredWord += document.getElementById(`box${boxNo[3]}${i}`).innerText;
    }
    if (wordlist.includes(enteredWord.toLowerCase())) {
      enteredWord = enteredWord.toLowerCase();
      pattern = [];
      for (i = 0; i < 5; i++) {
        if (enteredWord[i] == word[i]) {
          pattern.push([enteredWord[i], 2, i]);
          for (const a of document.querySelectorAll("button")) {
            if (a.textContent == enteredWord[i].toUpperCase()) {
              a.style.backgroundColor = stToClr[2];
            }
          }
        }
      }
      for (i = 0; i < 5; i++) {
        if (word.includes(enteredWord[i])) {
          index = [];
          letter1 = 0;
          letter2 = 0;
          for (j = 0; j < pattern.length; j++) {
            index.push(pattern[j][2]);
            if (enteredWord[i] == pattern[j][0]) letter1++;
          }
          for (j = 0; j < word.length; j++) {
            if (word[j] == enteredWord[i]) letter2++;
          }
          if (!index.includes(i)) {
            if (letter1 > 0 && letter1 == letter2) {
              pattern.push([enteredWord[i], 0, i]);
              for (const a of document.querySelectorAll("button")) {
                if (a.textContent == enteredWord[i].toUpperCase()) {
                  if (!stToClr.includes(eval(a.style.backgroundColor))) {
                    a.style.backgroundColor = stToClr[0];
                  }
                }
              }
            } else {
              pattern.push([enteredWord[i], 1, i]);
              for (const a of document.querySelectorAll("button")) {
                if (a.textContent == enteredWord[i].toUpperCase()) {
                  if (eval(a.style.backgroundColor) != stToClr[2]) {
                    a.style.backgroundColor = stToClr[1];
                  }
                }
              }
            }
          }
        } else {
          pattern.push([enteredWord[i], 0, i]);
          for (const a of document.querySelectorAll("button")) {
            if (a.textContent == enteredWord[i].toUpperCase()) {
              if (!stToClr.includes(eval(a.style.backgroundColor))) {
                a.style.backgroundColor = stToClr[0];
              }
            }
          }
        }
      }
      console.log(pattern);
      gc = 0;
      for (i = 0; i < pattern.length; i++) {
        if (pattern[i][1] == 2) gc++;
        bx1 = document.getElementById(`${boxNo.slice(0, 4)}${pattern[i][2] + 1}`);
        bx1.style.backgroundColor = stToClr[pattern[i][1]];
        bx1.style.borderColor = stToClr[pattern[i][1]];
      }
      if (gc == 5) {
        document.getElementById("popupmsg").innerText = "You Won :)";
        document.getElementById("popup").style.display = "flex";
      } else if (boxNo[3] == 6) {
        document.getElementById("popupmsg").innerText = `You Lost :(\nThe word was ${word.toUpperCase()}`;
        document.getElementById("popup").style.display = "flex";
      } else {
        boxNo = `${boxNo.slice(0, 3)}${Number(boxNo[3]) + 1}1`;
      }
    } else {
      document.getElementById(`row${boxNo[3]}`).className = "gamerow shake";
      setTimeout(() => {
        document.getElementById(`row${boxNo[3]}`).className = "gamerow";
      }, 500);
    }
  }
};
backspace = () => {
  if (boxNo[4] > 1) {
    document.getElementById(`${boxNo.slice(0, 4)}${Number(boxNo[4]) - 1}`).innerText = "";
    boxNo = `${boxNo.slice(0, 4)}${Number(boxNo[4]) - 1}`;
  }
};
letter = (x) => {
  if (boxNo[4] <= 5) {
    document.getElementById(boxNo).innerText = x.toUpperCase();
    boxNo = `${boxNo.slice(0, 4)}${Number(boxNo[4]) + 1}`;
  }
};
playagain = () => {
  document.getElementById("popup").style.display = "none";
  window.location.href = "";
};
