import { useState, useEffect} from "react";
import * as ethers from 'ethers';
import { SYMBOL } from '@/constants/constants';


export default function ContractBalanceComponent(props) {
    return (
      <>
        <label htmlFor="contract_amount" className="form-label">Contract balance:<br/><span id="contract_amount">{props.balance} {SYMBOL}</span></label>
      </>
    )
  }
  