import { useState, useEffect} from "react";
import * as ethers from 'ethers';
import { SYMBOL } from '@/constants/constants';


export default function SignerBalanceComponent(props) {
    return (
      <>
        <label htmlFor="address_amount" className="form-label">Your balance:<br/><span id="address_amount">{props.balance} {SYMBOL}</span></label>
      </>
    )
  }
  