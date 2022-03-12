import React, {useState, useEffect} from 'react'
import Modal from "react-modal";

const Description = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
      let images = [];
      for (let i = 0; i < product?.images?.length; i++) {
        images.push(product?.images[i]?.src)
      }
      setImages(images);
  }, [])

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  }

  const decrementQuantity = () => {
    quantity && setQuantity(quantity - 1);
  } 

  return (
    <div style={styles.main}>
        <h3 style={styles.colorWhite}>{product?.title}</h3>
        <p style={styles.colorWhite}>{product?.variants[0]?.price}₺</p>
        <div onClick={toggleModal} style={styles.openDetailButton}>
            <p style={styles.buttonText}>Ürün Detayı</p>
        </div>

        <Modal isOpen={isOpen} onRequestClose={toggleModal}>
            <div style={styles.modal}>
                <p onClick={toggleModal} style={styles.closeText}>Kapat</p>
                <div style={styles.imageContainer}>
                    {images?.map(image => <img alt={`${image}`} src={image} style={styles.image} /> )}
                </div>
                <div style={styles.descriptionContainer}>
                    <h1 style={styles.colorRed}>{product?.title}</h1>
                    <div style={styles.itemRowDescriptionContainer}>
                        <h4>Satıcı: </h4>
                        <p style={{marginLeft: '2%'}}>{product?.vendor}</p>
                    </div>
                    <div style={styles.itemRowDescriptionContainer}>
                        <h4>Stok Durumu: </h4>
                        <p style={{color: product?.status ? 'green' : 'red', marginLeft: '2%'}}>{product?.status ? 'Stokta Mevcut' : 'Stokta Bulunmuyor'}</p>
                    </div>
                    {product?.options?.map((option, index) => {
                        return (
                            <div key={index} style={styles.optionItemContainer}>
                                <h4>{option?.name}: </h4>
                                {product?.options[index]?.values?.map((value, i) => {
                                    return (
                                        <div key={i} style={styles.optionValueContainer}>
                                            <p style={styles.optionValueText}>{value}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                    <div style={styles.itemRowDescriptionContainer}>
                        <h4 style={{marginRight: '2%'}}>Ürün Adeti:</h4>
                        <div onClick={decrementQuantity} style={styles.decrementQuantityContainer}>
                            <p>-</p>
                        </div>
                        <div style={styles.quantityContainer}>
                            <p style={styles.quantityText}>{quantity}</p>
                        </div>
                        <div onClick={incrementQuantity} style={styles.incrementQuantityContainer}>
                            <p>+</p>
                        </div>
                    </div>
                    <div style={styles.buttonContainer}>
                        <div onClick={() => !quantity && alert('Ürün Adedi Belirleyiniz')} style={styles.addCartButton}>
                            <p style={styles.buttonText}>Sepete Ekle</p>
                        </div>
                        <div style={styles.addWishlistButton}>
                            <p style={styles.buttonText}>İstek Listesine Ekle</p>
                        </div>
                    </div>
                </div>
            </div>
      </Modal>
    </div>
  )
}

const styles = {
    main: {display: 'flex', justifyContent: 'space-between', flex: 1, flexDirection: 'column'},
    colorWhite: {color: 'white'},
    openDetailButton: {display: 'flex', justifyContent: 'center', backgroundColor: 'red', width: '100%', height: '10%', borderRadius: '10px', cursor: 'pointer'},
    buttonText: {textAlign: 'center', color: 'white', fontSize: '80%'},
    modal: {display: 'flex', flexDirection: 'row', height: '100%', alignSelf: 'center'},
    closeText: {position: 'absolute', top: 0, right: 15, cursor: 'pointer'},
    imageContainer: {display: 'flex', width: '30%', flexDirection: 'column', justifyContent: 'space-evenly', marginLeft: '5%'},
    image: {width: '100%', height: '40%', borderRadius: '10px', marginTop: 10, marginBottom: 10, border: '1px solid black'},
    descriptionContainer: {display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', marginLeft: '15%', width: '40%'},
    colorRed: {color: 'red'},
    itemRowDescriptionContainer: {display: 'flex', flexDirection: 'row', alignItems: 'center'},
    optionItemContainer: {flexDirection: 'row', display: 'flex'},
    optionValueContainer: {flexDirection: 'row', display: 'flex',  marginLeft: '2%', width: 'auto', justifyContent: 'center'},
    optionValueText: {fontSize: '13px', border: '1px solid', borderRadius: 10, justifyContent: 'center', alignItems: 'center', display: 'flex', paddingLeft: 2, paddingRight: 2},
    decrementQuantityContainer: {width: '10%', height: 'auto', backgroundColor: '#d9d9d9', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, alignItems: 'center', display: 'flex', justifyContent: 'center', cursor: 'pointer'},
    quantityContainer: {width: '10%', height: 'auto', backgroundColor: '#5a4844', alignItems: 'center', display: 'flex', justifyContent: 'center'},
    quantityText: {marginLeft: '2%', marginRight: '2%', color: 'white'},
    incrementQuantityContainer: {width: '10%', height: 'auto', backgroundColor: '#d9d9d9', borderTopRightRadius: 10, borderBottomRightRadius: 10, alignItems: 'center', display: 'flex', justifyContent: 'center', cursor: 'pointer'},
    buttonContainer: {flexDirection: 'row', display: 'flex'},
    addCartButton: {display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'green', width: '40%', height: '75%', borderRadius: '10px', cursor: 'pointer'},
    addWishlistButton: {display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'gray', width: '40%', height: '75%', borderRadius: '10px', cursor: 'pointer', marginLeft: '5%'}
}

export default Description