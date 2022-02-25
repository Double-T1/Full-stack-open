const Record = ({personToShow, handleDelete}) => {
    return (
      <>
        <h2>Numbers</h2>
        {personToShow.map(ele=> 
          <p key={ele.id}>
            {ele.name} {ele.number} 
            <button onClick={(e) => 
              {if (window.confirm(`Delete ${ele.name}?`)) handleDelete(e,ele.id)}
            }>
              delete
            </button>
          </p>
        )}
      </>
    )
}


export default Record