
export default function InputBet(props) {
    
    const handleChange = (e) => {
        if (props.children.loadLock) {
            return;
        }
        props.children.setBet(e.target.value);
    }
    
    return (
        <>
            <label htmlFor="bet_amount" className="form-label">Your bet:</label>
            <div className="input-group">
                <span className="input-group-text">TBNB</span>
                <input onChange={handleChange} placeholder="place your bet here" type="text" className="form-control" id="bet_amount" aria-describedby="bet_amount_help"/>
            </div>
        </>
    )
  }
  