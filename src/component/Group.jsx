// import Group1 from "./Group1";
import "./style/file.css";

function Group() {
  return (
    <>
      <h1>FITUR RANDOM GROUP</h1>
      <div>
        <h2>INPUT</h2>
        <textarea id="text1" placeholder="isi nama"></textarea>
        <br></br>
        <input id="input" type="number" placeholder="banyak kelompok"></input>
        <button onClick={test}>GENERATE</button>
      </div>
      <div>
        <h2>OUTPUT</h2>
        <textarea id="text2" placeholder="isi nama"></textarea>
        <div className="container-card"></div>
      </div>
    </>
  );
}

function test() {
  let getText = document.getElementById("text1");
  let getText2 = document.getElementById("text2");
  let nKelompok = document.getElementById("input");
  // let cardContainer = document.getElementsByClassName("container-card");

  if (nKelompok && getText.value.trim() !== "") {
    let lines = getText.value
      .split(/\r?\n/)
      .filter((line) => line.trim() !== "");

    // Ensure nKelompok is a positive integer
    let numGroups = parseInt(nKelompok.value, 10);
    if (!isNaN(numGroups) && numGroups > 0) {
      // Shuffle the lines array randomly
      lines = shuffleArray(lines);

      // Calculate the number of lines per group
      let linesPerGroup = Math.ceil(lines.length / numGroups);

      // Create one textarea for each group
      for (let i = 0; i < numGroups; i++) {
        let groupLines = lines.slice(
          i * linesPerGroup,
          (i + 1) * linesPerGroup
        );

        let cardContainer = document.createElement("div");
        cardContainer.classList.add("container-card");

        let cardText = document.createElement("textarea");
        cardText.value = `Group ${i + 1}:\n${groupLines.join("\n")}`;

        // Append the textarea to the document body or another container
        cardContainer.appendChild(cardText);
        document.body.appendChild(cardContainer);
        cardText.classList.add("output-card");
      }

      // Update the output textarea
      getText2.remove();
    } else {
      alert("Please input a valid number of groups");
    }
  } else {
    alert("Please input text");
  }
}

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default Group;
