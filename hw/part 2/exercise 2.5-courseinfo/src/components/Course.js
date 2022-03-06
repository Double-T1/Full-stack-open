import React from 'react'
const Header = ({name}) => {
    return (
        <div>
            <h1>{name}</h1>
        </div>
    )
}

const Content = ({parts}) => {
    return parts.map(ele => {
        return (
            <p key={ele.id}>
                {ele.name} {ele.exercises}
            </p>
        ) 
    })
}

const Total = ({sum}) => {
    return (
        <div>
            <b>Number of exercises {sum}</b>
        </div>
    )
}

const Course = ({course}) => {
    const sum = course.parts.reduce((accu,ele) => accu + ele["exercises"],0)
    return (
        <div>
            <Header name={course.name}/>
            <Content parts={course.parts}/>
            <Total sum={sum}/>
        </div>
    )
}

export default Course