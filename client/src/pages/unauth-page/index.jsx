


function UnauthPage() {
    const[info, setInfo] = useState({
        firstName: "",
        lastName: ""
      })
    return (
        <button onClick={handleNextClick} style={index == sculptureList.length ? {display: hidden} : ""  }>
        Next
      </button>
    );
}

export default UnauthPage;