import React from 'react'
import Description from './description'

const index = ({ product }) => {
  return (
    <div key={product?.id} style={styles.productContainer}>
      <img src={product?.image?.src} alt={`${product?.image?.id}`} style={styles.image} />
      <Description product={product} />
    </div>
  )
}

const styles = {
  productContainer: {padding: '5px', marginBottom: '10px', marginRight: '10px', textAlign: 'left', display: 'flex', flexDirection: 'column', borderRadius: '10px', backgroundColor: '#bbbec4'},
  image: {width: '100%', height: '200px', borderRadius: '10px'}
}

export default index