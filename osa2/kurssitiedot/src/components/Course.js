const Course = ({ course }) => (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
  
  const Header = ({ course }) => (
    <>
      <h1>
        {course}
      </h1>
    </>
  )
  
  const Content = ({ parts }) => (
    parts.map(part => <Part key={part.id} part={part} />)
  )
  
  const Part = ({ part }) => (
    <>
      <p>
        {part.name} {part.exercises}
      </p>
    </>
  )
  
  const Total = ({ parts }) => {
    const exercisesTotal = 
      parts.map(part => part.exercises)
      .reduce( (s, p) => s+p )
      
    return (
      <>
        <p>
          <b>Total of {exercisesTotal} exercises</b>
        </p>
      </>
    )
  } 

  export default Course