import { useState } from "react";
import "./style/file.css";
import GroupCard from "./GroupCard";

function Group() {
  const [inputText, setInputText] = useState("");
  const [numGroups, setNumGroups] = useState("");
  const [outputText, setOutputText] = useState("");
  const [groups, setGroups] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState(null);

  function test() {
    let lines = inputText.split(/\r?\n/).filter((line) => line.trim() !== "");
    let parsedNumGroups = parseInt(numGroups, 10);

    if (numGroups && inputText.trim() !== "") {
      //opsi 1
      if (selectedRadio === "opsi2") {
        if (!isNaN(parsedNumGroups) && parsedNumGroups > 0) {
          lines = shuffleArray(lines);
          let maxLinesPerGroup = Math.ceil(lines.length / parsedNumGroups);

          let newGroups = [];
          for (let i = 0; i < parsedNumGroups; i++) {
            let groupLines = lines.slice(
              i * maxLinesPerGroup,
              (i + 1) * maxLinesPerGroup
            );

            for (var j = 0; j < groupLines.length; j++) {
              groupLines[j] = j + 1 + ". " + groupLines[j];
            }

            newGroups.push(`Group ${i + 1}:\n${groupLines.join("\n")}`);
          }

          setGroups(newGroups);
          setOutputText("");
        } else {
          alert("Please input a valid number of groups");
        }
        //opsi 2
      } else if (selectedRadio === "opsi1") {
        if (!isNaN(parsedNumGroups) && parsedNumGroups > 0) {
          lines = shuffleArray(lines);
          let maxLinesPerGroup = Math.ceil(lines.length / parsedNumGroups);

          let newGroups = [];
          for (let i = 0; i < maxLinesPerGroup; i++) {
            let groupLines = lines.slice(
              i * parsedNumGroups,
              (i + 1) * parsedNumGroups
            );

            for (let j = 0; j < parsedNumGroups; j++) {
              groupLines[j] = j + 1 + ". " + groupLines[j];
            }

            newGroups.push(`Group ${i + 1}:\n${groupLines.join("\n")}`);
          }

          setGroups(newGroups);
          setOutputText("");
        } else {
          alert("Please input a valid number of groups");
        }
      } else {
        alert("Please select an option");
      }
    } else {
      alert("Please input text and a valid number of groups");
    }
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const checkedRadio = (event) => {
    setSelectedRadio(event.target.id);
  };

  return (
    <>
      <h1>FITUR RANDOM GROUP</h1>
      <div>
        <h2>INPUT</h2>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="isi nama"
        ></textarea>
        <br />
        <div>
          <label>
            <input
              type="radio"
              id="opsi1"
              name="opsi"
              onChange={checkedRadio}
              checked={selectedRadio === "opsi1"}
              required
            />
            Opsi 1. Per Kelompok Butuh Berapa Banyak Orang
          </label>
          <br />
          <label>
            <input
              type="radio"
              id="opsi2"
              name="opsi"
              onChange={checkedRadio}
              checked={selectedRadio === "opsi2"}
              required
            />
            Opsi 2. Butuh Berapa Banyak Kelompok (bagi rata)
          </label>
        </div>
        <input
          id="fill1"
          type="number"
          value={numGroups}
          onChange={(e) => setNumGroups(e.target.value)}
          placeholder="fill 1"
          hidden={selectedRadio !== "opsi1"}
        />
        <input
          id="fill2"
          type="number"
          value={numGroups}
          onChange={(e) => setNumGroups(e.target.value)}
          placeholder="fill 2"
          hidden={selectedRadio !== "opsi2"}
        />
        <button onClick={test}>GENERATE</button>
      </div>
      <div>
        <h2>OUTPUT</h2>
        <textarea
          value={outputText}
          onChange={(e) => setOutputText(e.target.value)}
          placeholder="isi nama"
          hidden={true}
        />
        <div className="container-card">
          {groups.map((group, index) => (
            <GroupCard key={index} group={group} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Group;
