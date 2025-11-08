import React, { use, useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  // class Category {
  // constructor(type, checked) {
  //   this.type = type;
  //   this.checked = checked;
  // }}

  const {products, search, showSearch} = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  // const [categoryFilters, setCategoryFilters] = useState([new Category("Men", false), new Category("Women", false), new Category("Kids", false)]);
  // const [subCategoryFilters, setSubCategoryFilters] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [subCategoryFilters, setSubCategoryFilters] = useState([]);
  const [sortTypeFilters, setSortTypeFilters] = useState('relevant');


  // useEffect(()=>{
  //   setFilterProducts(products)
  // },[])

  // const handleCategoryFiltersChange = (event) => {

  //   // Get type of category from checkboxes
  //   const {value, checked} = event.target;
  //   const updatedCategoryFilters = categoryFilters.map(categoryFilter => 
  //     categoryFilter.type === value ? new Category(categoryFilter.type, checked) : categoryFilter
  //   );

  //   setCategoryFilters(updatedCategoryFilters);

  //   const selectedCategories = updatedCategoryFilters.filter(categoryFilter => categoryFilter.checked === true).map(categoryFilter => categoryFilter.type);

  //   const filteredProducts = selectedCategories.length === 0 ? products : products.filter(product => selectedCategories.includes(product.category));

  //   setFilterProducts(filteredProducts);
  // };

  const toggleCategory = (event) => {
    if(categoryFilters.includes(event.target.value)){
      setCategoryFilters(previous => previous.filter(item => item !== event.target.value))//different ? store it : don't
      //previous/prev is the current value of categoryFilters at the moment React applies the update.
    }
    else{
      setCategoryFilters(previous => [...previous, event.target.value])//js spread syntax
    }
  }

  const toggleSubCategory = (event) => {
    if(subCategoryFilters.includes(event.target.value)){
      setSubCategoryFilters(previous => previous.filter(item => item !== event.target.value))
    }
    else{
      setSubCategoryFilters(previous => [...previous, event.target.value])
    }
  }

  const sortType = (event) =>{
    setSortTypeFilters(event.target.value)
  }

  const sortProduct = (productsCopy) => {

    //Sorting filter with compare function
    switch(sortTypeFilters){
      case 'low-high':
        productsCopy.sort((a,b) => a.price - b.price);//Ascending order
        break;
      case 'high-low':
        productsCopy.sort((a,b) => b.price - a.price);//Descending order
        break;
      default:
        break;
    }

    setFilterProducts(productsCopy)
  }

  const applyFilter = () => {
    let productsCopy = products.slice();

    if(showSearch && search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if(categoryFilters.length > 0){
      productsCopy = productsCopy.filter(item => categoryFilters.includes(item.category));//callback function must return true or false
    }

    if(subCategoryFilters.length > 0){
      productsCopy = productsCopy.filter(item => subCategoryFilters.includes(item.subCategory))
    }
    
    sortTypeFilters === 'relevant' ? setFilterProducts(productsCopy) : sortProduct(productsCopy)
  }

  useEffect(()=>{
    applyFilter();
  },[categoryFilters,subCategoryFilters, sortTypeFilters, search, showSearch])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter Options */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt=""/>
        </p>
        
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'></div>
          <p className='flex gap-2'>
            <input className='w-3' type='checkbox' value={'Men'} onChange={toggleCategory}/> Men
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type='checkbox' value={'Women'} onChange={toggleCategory}/> Women
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type='checkbox' value={'Kids'} onChange={toggleCategory}/> Kids
          </p>
        </div>

        {/* SubCategory Filter*/}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'></div>
          <p className='flex gap-2'>
            <input className='w-3' type='checkbox' value={'Topwear'} onChange={toggleSubCategory}/> Top Wear
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type='checkbox' value={'Bottomwear'} onChange={toggleSubCategory}/> Bottom Wear
          </p>
          <p className='flex gap-2'>
            <input className='w-3' type='checkbox' value={'Winterwear'} onChange={toggleSubCategory}/> Winter Wear
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'}/>
          {/* Product Sorting */}
          <select className='border-2 border-gray-300 text-sm px-2' onChange={sortType}>
            <option value='relevant' >Sort by: Relevant</option>
            <option value='low-high' >Sort by: Low to High</option>
            <option value='high-low' >Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item, index)=>(
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collection
