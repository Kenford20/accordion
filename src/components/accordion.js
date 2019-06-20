import React, { useState } from 'react';
import { DealHeader } from './deal-header';

export const Accordion = () => {
  const [deals, setDeals] = useState({
    "Local": [10, 20, 30],
    "Getaway": [40, 50, 60],
    "Goods": [70, 80, 90],
    "Groupon": [150, 10]
  });
  
  function calcInitialGrandTotal(deals) {
    let initialGrandTotal = 0;
    Object.keys(deals).map(deal => {
      deals[deal].map(price => initialGrandTotal += parseInt(price));
      return null;
    });
    
    return initialGrandTotal;
  }

  const [grandTotal, setGrandTotal] = useState(calcInitialGrandTotal(deals));
  
  const addDeal = (dealType) => {
    const randomNum = Math.floor(Math.random()*100);
    setGrandTotal(grandTotal + randomNum);
    setDeals({
      ...deals,
      [dealType]: deals[dealType].concat(randomNum)
    })
  }
    
  return (
    <div id="accordion">
      {
        Object.keys(deals).map((type, index) => (
          <DealHeader 
            header={type}
            prices={deals[type]}
            addDeal={addDeal}
            key={index}
          />
        ))
      }
      <div id="grand-total">
        <div data-testid="grand-total">Grand Total: <span>${grandTotal}</span></div>
      </div>
    </div>
  );
};
  