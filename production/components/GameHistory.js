import { SYMBOL } from "@/constants/constants"

export default function GameHistory(props) {    
    
    const statuses = ["DRAW", "WIN", "LOSS"];
    
    const renderAmount = (item) => {
      switch(item.status){
        case 0:
          //draw
          return (item.bet + " " + SYMBOL);
        case 1:
          //win
          return ("+" + item.prize + " " + SYMBOL);
        case 2:
          //loss
          return ("-" + item.bet + " " + SYMBOL);
      }
    };

  
    if (props.children.history.length == 0) {
      return (
        <>
            <tr>
              <td colSpan={2}>History</td>
            </tr>
        </>
      )
    } else {
      return (
        <>
          {
            props.children.history.map(item => (
              <tr key={item.id}>
                <td>{statuses[item.status]}</td>
                <td>{renderAmount(item)}</td>
              </tr>
            ))
          }
            
        </>
      )
    }

  }
  