import { SYMBOL } from '@/constants/constants';

export default function MinBetComponent(props) {
    return (
      <>
        <div id="bet_amount_help" className="form-text">Min bet is <span id="minBet">{props.minBet} {props.minBet ? SYMBOL : ""}</span></div>
      </>
    )
  }
  