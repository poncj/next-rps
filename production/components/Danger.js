
export default function Danger(props) {
    
    const handleClick = () => {
        props.children.setContractBalance("0.0");
    }

    return (
      <>
        <button style={{witdh: 70}} className='btn btn-danger' onClick={handleClick}>DANGER</button>
      </>
    )
  }
  