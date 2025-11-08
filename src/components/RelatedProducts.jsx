import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = (props) => {
    //Pass props → <Comp a="x" b="y" />
    //props is an object → { category: "men", subCategory: "topwear" }
    //Receive props → function Comp({ a, b }), destructuring syntax OR like this component

    const {products} = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(()=>{
        if(!products) return;
        if(products.length > 0){
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item)=> props.category === item.category);
            productsCopy = productsCopy.filter((item)=> props.subCategory === item.subCategory);
            setRelated(productsCopy);
        }
    }, [products])

  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2'>
        <Title text1={'RELATED'} text2={'PRODUCTS'}/>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
            related.map((item, index)=>(
                <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image}/>
            ))
        }
      </div>
    </div>
  )
}

export default RelatedProducts
