import React from 'react';

export const DealsContainer = ({ deal, header, addDeal }) => {
    return (
      <div className="deals-container" data-testid="deals-container">      
        {
          deal.map((price, index) => (
            <div className="deal" key={index}>
              <span>Deal {++index}</span>
              <span>${price}</span>
            </div>
          ))
        }
        <div className="add-deal">
          <span onClick={() => addDeal(header)}>Add Deal</span>
        </div> 
      </div>
    );
}