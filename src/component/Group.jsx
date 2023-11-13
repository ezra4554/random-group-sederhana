import { useState } from 'react'
import './style/file.css'
import GroupCard from './GroupCard'

function Group() {
  const [inputText, setInputText] = useState('')
  const [numGroups, setNumGroups] = useState('')
  const [outputText, setOutputText] = useState('')
  const [groups, setGroups] = useState([])

  function test() {
    if (numGroups && inputText.trim() !== '') {
      let lines = inputText.split(/\r?\n/).filter((line) => line.trim() !== '')

      let parsedNumGroups = parseInt(numGroups, 10)
      if (!isNaN(parsedNumGroups) && parsedNumGroups > 0) {
        lines = shuffleArray(lines)
        let linesPerGroup = Math.ceil(lines.length / parsedNumGroups)

        let newGroups = []
        for (let i = 0; i < parsedNumGroups; i++) {
          let groupLines = lines.slice(
            i * linesPerGroup,
            (i + 1) * linesPerGroup
          )
          for (var j = 0; j < groupLines.length; j++) {
            groupLines[j] = j + 1 + '. ' + groupLines[j]
          }
          console.log(groupLines)
          newGroups.push(`Group ${i + 1}:\n${groupLines.join('\n')}`)
        }

        setGroups(newGroups)

        setOutputText('')
      } else {
        alert('Please input a valid number of groups')
      }
    } else {
      alert('Please input text')
    }
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

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
        <br></br>
        <input
          type="number"
          value={numGroups}
          onChange={(e) => setNumGroups(e.target.value)}
          placeholder="banyak kelompok"
        ></input>
        <button onClick={test}>GENERATE</button>
      </div>
      <div>
        <h2>OUTPUT</h2>
        <textarea
          value={outputText}
          onChange={(e) => setOutputText(e.target.value)}
          placeholder="isi nama"
          hidden={true}
        ></textarea>
        <div className="container-card">
          {groups.map((group, index) => (
            <GroupCard key={index} group={group} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Group
