import React from 'react';
import './App.css';
import products from './products.json';

class App extends React.Component<{}, AppState> {
  prods: Product[];

  constructor(props: any) {
    super(props);

    this.prods = products/*[
      {
        id: 1,
        name: 'Jam',
        price: 1.99
      },
      {
        id: 2,
        name: 'Bread',
        price: 2.99
      },
    ]*/

    this.state = {
      bin: []
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Total: {this.getBinData().total} | Items: {this.getBinData().items}</p>
          <button className="AppButton" onClick={() => {
            this.addProduct()
          }} id="dabut">
            Add Product
          </button>
        </header>

        <div className="bin">
          {this.getBin()}
        </div>
      </div>
    );
  }

  addProduct() {
    let ask = prompt('Enter product id:');
    if(!ask) return alert('No id entered');

    let id = Number(ask);
    if(isNaN(id)) return alert('Invalid id entered');

    let data = this.prods;
    const bin = this.state.bin;
    const product = data.find((p: Product) => p.id === id);
    if(!product) return alert('Product not found');
    bin.push(product)
    this.setState({
      bin: bin
    })
  }

  getBin() {
      let map = this.state.bin.map((i: Product) => {
        return(
          <div className='Product'>
            <p>{i.name} {i.price}</p>
          </div>
        )
      })    
      
      return map
  }

  getBinData() {
    let data = this.state.bin;
    let total = 0;
    data.forEach((i: Product) => {
      total += i.price;
    })
    return { total: total.toFixed(2), items: data.length}
  }
}

window.onkeydown = (e: KeyboardEvent) => {
  if(e.key === 'a' || 'A') {
    document.getElementById('dabut')?.click();
  }
}
export default App;

interface Product {
  id: number;
  name: string;
  price: number;
}

interface AppState {
  bin: Product[];
}