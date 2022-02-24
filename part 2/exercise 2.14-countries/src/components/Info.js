import Country from "./Country"
  
const MaxTenContries = ({countriesToShow, setToShow}) => {
    return countriesToShow.map(ele => {
    return (
        <li key={ele.name.common}>
            {ele.name.common} <button type='submit' onClick={() => setToShow([ele])}>show</button>
        </li>
    )
    })
}
  
const Info = ({countriesToShow, setToShow}) => {
    let len = countriesToShow.length
    if (len===1) {
        return <Country country={countriesToShow[0]}/>
    } else if (len < 10) {
        return <MaxTenContries countriesToShow={countriesToShow} setToShow={setToShow}/>
    } else {
        return <p>Too many matches, specify another filter</p>
    }
}

export default Info