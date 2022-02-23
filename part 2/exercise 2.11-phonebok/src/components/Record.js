const Record = ({personToShow}) => {
    return (
      <>
        <h2>Numbers</h2>
        {personToShow.map(ele=> <Log key={ele.id} p={ele}/>)}
      </>
    )
}
  
const Log = ({p}) => {
    return (
        <p>{p.name} {p.number}</p>
    )
}

export default Record