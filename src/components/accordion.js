import React from 'react';
import DealHeader from './deal-header';

export default class Accordion extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
        deals: {
          "Local": [10, 20, 30],
          "Getaway": [40, 50, 60],
          "Goods": [70, 80, 90],
          "Groupon": [150]
        },
        grandTotal: 0
      }
    }
    
    componentDidMount() {
      let initialGrandTotal = 0;
      Object.keys(this.state.deals).map(deal => {
        this.state.deals[deal].map(price => initialGrandTotal += parseInt(price));
      });
      
      this.setState({ grandTotal: initialGrandTotal });
    }
    
    addDeal = (dealType) => {
      const randomNum = Math.floor(Math.random()*100);
      this.setState(prevState => {
        return { 
          grandTotal: prevState.grandTotal + randomNum,
          deals: {
            ...prevState.deals,
            [dealType]: prevState.deals[dealType].concat(randomNum)
          }
        }
      });
    }
    
    render() {
      const { deals, grandTotal } = this.state;
      return (
        <div id="accordion">
          {
            Object.keys(deals).map((type, index) => (
              <DealHeader 
                header={type}
                prices={deals[type]}
                addDeal={this.addDeal}
                key={index}
              />
            ))
          }
          <div id="grand-total">
            <div>Grand Total: <span>${grandTotal}</span></div>
          </div>
        </div>
      );
    };
  }