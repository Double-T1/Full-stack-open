const Country = ({country}) => {
    return (
      <>
        <h1>{country.name.common}</h1>
        <p>capital: {country.capital[0]} </p>
        <p>area: {country.area} </p>
        <h3>languages</h3>
        <ul>
          {Object.values(country.languages).map(ele => <li key={ele}>{ele}</li>)}
        </ul>
        <font size='10000'>{country.flag}</font>
      </>
    )
}



export default Country