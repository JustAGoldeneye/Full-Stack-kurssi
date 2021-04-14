import React, { useState } from 'react'

const Title = ({text}) => (
  <h1>{text}</h1>
)

const AnecdoteLine = ({text}) => (
  <div>
    {text}
  </div>
)

const VotesLine = ({votes}) => (
  <div>
    has {votes} votes
  </div>
)

const AnecdoteBlock = ({text, votes}) => (
  <>
    <AnecdoteLine text={text}/>
    <VotesLine votes={votes}/>
  </>
)

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const anecdoteIndexRandom = () => (
    Math.floor(Math.random() * anecdotes.length)
  )
   
  const [selected, setSelected] = useState(anecdoteIndexRandom())
  const [points, setPoints] = useState(new Uint32Array(anecdotes.length))
  const [mostVotes, setMostVotes] = useState(0)

  const handleNextClick = () => {
    setSelected(anecdoteIndexRandom())
  }

  const handleVoteClick = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    
    if (copy[selected] > copy[mostVotes]) {
      setMostVotes(selected)
    }
  }


  return (
    <div>
      <Title text={'Anecdote of the day'}/>
      <AnecdoteBlock text={anecdotes[selected]} votes={points[selected]}/>
      <div>
        <Button handleClick={handleVoteClick} text={'vote'}/>
        <Button handleClick={handleNextClick} text={'next anecdote'}/>
      </div>
      <Title text={'Anecdote with most votes'}/>
      <AnecdoteBlock text={anecdotes[mostVotes]} votes={points[mostVotes]}/>
    </div>
  )
}

export default App