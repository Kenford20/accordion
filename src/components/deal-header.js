import React, { useState, useEffect } from 'react';
import { DealsContainer } from './deals-container';

export const DealHeader = ({ prices, header, addDeal }) => {
  const [dealsTotal, setDealsTotal] = useState(0);
  //const [showDeals, toggleShowDeals] = useState(true);

  useEffect(() => {
    setDealsTotal(prices.reduce((a,b) => a+b));
  }, [prices]);

  const toggleDeals = (e) => {
    // toggleShowDeals(!showDeals);
    
    // logic below is used instead of setstate above to allow for sliding animation
    // handle user clicks on the text/total (aka the spans) to still properly toggle the deals container
    const targetNode = e.target.parentNode.classList.contains('deal-header-containers') 
      ? e.target.parentNode.nextSibling 
      : e.target.nextSibling;
    
    if(targetNode.style.maxHeight !== '0px') {
      targetNode.style.maxHeight = '0px';
      targetNode.style.opacity = '0';
    } else {
      targetNode.style.maxHeight = '2000px';
      targetNode.style.opacity = '100';
    }
  }
  
  return (
    <React.Fragment>
      <div className="deal-header-containers" data-testid="deal-header" onClick={(e) => toggleDeals(e)}>
        <span data-testid="deals-type">{header} Deals</span>
        <span data-testid="deals-total">Total: ${dealsTotal}</span>
      </div>

      <DealsContainer 
        deal={prices} 
        header={header} 
        addDeal={addDeal}
      /> 
    </React.Fragment>
  );
};
