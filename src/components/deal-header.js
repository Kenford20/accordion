import React from 'react';
import { DealsContainer } from './deals-container';

export class DealHeader extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
        prices: [],
        dealsTotal: 0,
        showDeals: true
      };
    }
    
    componentDidMount() {
      this.setState({ 
        dealsTotal: this.props.prices.reduce((a,b) => a+b)
      });
    }
    
    componentWillReceiveProps(nextProps) {
      if(this.props.prices.length !== nextProps.prices.length) {
        console.log(nextProps);
        this.setState({ dealsTotal: nextProps.prices.reduce((a,b) => a+b) });
      }
    }
    
    /*static getDerivedStateFromProps(props, state) {
      if (state.prices.length !== props.prices.length) {
        console.log(props.prices);
        console.log(state.prices);
        return {
          prices: this.props.prices,
          dealsTotal: props.prices.reduce((a,b) => a+b)
        };
      }
      return null;
    }*/
    
    toggleDeals = (e) => {
      //this.setState({ showDeals: !this.state.showDeals });
      
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
    
    render() {
      const { header, prices, addDeal } = this.props;
      const { dealsTotal, showDeals } = this.state;
      
      return (
        <React.Fragment>
          <div className="deal-header-containers" onClick={(e) => this.toggleDeals(e)}>
            <span>{header} Deals</span>
            <span>Total: ${dealsTotal}</span>
          </div>
  
          <DealsContainer 
            deal={prices} 
            header={header} 
            addDeal={addDeal}
          /> 
        </React.Fragment>
      );
    };
  }