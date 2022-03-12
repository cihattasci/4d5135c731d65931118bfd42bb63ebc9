import './App.css';
import React, { useState, useEffect } from 'react';
import Product from './product'

const App = () => {
  const [input, setInput] = useState("")
  const [error, setError] = useState(null)
  const [products, setProducts] = useState([])
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [pageNumber, setPageNumber] = useState(null);
  const [selectedPage, setSelectedPage] = useState(0);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  const itemNumberPerPage = 10;

  useEffect(() => {
    const obj = {  
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': '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',
      },
    }
    fetch('https://teknasyon.netlify.app/.netlify/functions/products', obj)
      .then(res => res.json())
      .then(
        (result) => {
          setProducts(result?.products)
          setFilteredDataSource(result?.products)
          setPageNumber(Math.ceil(result?.products?.length / itemNumberPerPage))
          setCurrentProducts(result?.products?.slice(selectedPage * itemNumberPerPage, ((selectedPage + 1) * itemNumberPerPage)))
          setSelectedData(result?.products?.slice(selectedPage * itemNumberPerPage, ((selectedPage + 1) * itemNumberPerPage)))
        },
        (error) => {
          setError(error);
        }
      )
  }, [])

  useEffect(() => {
    const data = filteredDataSource?.slice(selectedPage * itemNumberPerPage, ((selectedPage + 1) * itemNumberPerPage))
    setSelectedData(data)
    setCurrentProducts(data)
  }, [selectedPage])

  const handleChange = event => {
    if (event.target.value) {
      const newData = products?.filter(product => {
          const itemData = product?.title
              ? product?.title?.toUpperCase()
              : ''.toUpperCase();
          const textData = event.target.value.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      );
      setFilteredDataSource(newData);
      setSelectedData(newData);
    } else {
      const data = filteredDataSource?.slice(selectedPage * itemNumberPerPage, ((selectedPage + 1) * itemNumberPerPage))
      setFilteredDataSource(products);
      setSelectedData(data);
    }
    
    setInput(event.target.value);
  }

  if(error) {
    return (
      <div style={styles.smtWentWrong}>Bir şeyler ters gitti!!</div>
    )
  }

  return (
    <>
      <div style={styles.searchContainer}>
        <input placeholder="Bir şey arayın" style={styles.main} value={input} onChange={handleChange} />
      </div>
      {!filteredDataSource?.length && <p style={{textAlign: 'center'}}>Ürün Bulunamadı</p>}
      <div style={styles.renderProductContainer}>
        {selectedData?.map(product => {
          return (
            <div style={{marginLeft: 10, width: '20%', marginTop: 10}}>
              <Product product={product} />
            </div>
          )
        })}
      </div>
      {input === '' &&
        <div style={styles.noFoundContainer}>
          {Array.from({length: pageNumber}, (item, index) => {
            return (
              <div style={{cursor: 'pointer'}} onClick={() => {
                setSelectedPage(index);
              }}>
                <p style={styles.paginationText}>{index + 1}</p>
              </div>
            )
          })}
        </div>
      }
    </>
  );
}

const styles = {
  smtWentWrong: {alignSelf: 'center', justifyContent: 'center', display: 'flex', marginTop: '50%'},
  main: {borderRadius: 10, marginTop: 10, alignSelf: 'center', justifyContent: 'center', width: '50%', height: 30, fontSize: 13},
  searchContainer: {flexDirection: 'row', display: 'flex', width: '100%', marginTop: 10, justifyContent: 'center', alignItems: 'center'},
  renderProductContainer: {flexDirection: 'row', display: 'flex', flexWrap: 'wrap', justifyContent: 'center'},
  noFoundContainer: {flexDirection: 'row', display: 'flex', justifyContent: 'center'},
  paginationText: {textAlign: 'center', marginLeft: 10, border: '1px solid blue', borderRadius: '5px', padding: '5px'}
}

export default App;
