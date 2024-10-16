import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addItem, selectCartItems } from "../../redux/slices/cartSlice"

interface PizzaBlockProps extends Pizza { }

const typesName = ['тонкое', 'традиционное']

export const PizzaBlock = ({ id, imageUrl, title, types, sizes, price, category, rating }: PizzaBlockProps) => {
   const dispatch = useDispatch()
   const items = useSelector(selectCartItems)

   const [activeSizeIndex, setActiveSizeIndex] = useState(0)
   const [activeTypeIndex, setActiveTypeIndex] = useState(0)

   const existItem = items.find((item) => item.id === id)
   const count = existItem && existItem.count

   const onAddItem = () => {
      const item: CartItem = {
         id,
         title,
         price,
         imageUrl,
         type: typesName[activeTypeIndex],
         size: sizes[activeSizeIndex],
         count: 1
      }

      dispatch(addItem(item))
   }

   return (
      <div className="pizza-block">
         <img
            className="pizza-block__image"
            src={imageUrl}
            alt={title}
         />
         <h4 className="pizza-block__title">{title}</h4>
         <div className="pizza-block__selector">
            <ul>
               {types.map((typeIndex) => (
                  <li key={typeIndex}
                     onClick={() => setActiveTypeIndex(typeIndex)}
                     className={activeTypeIndex === typeIndex ? 'active' : ''}>
                     {typesName[typeIndex]}
                  </li>
               ))}
            </ul>
            <ul>
               {sizes.map((size, i) => (
                  <li key={size + i}
                     onClick={() => setActiveSizeIndex(i)}
                     className={activeSizeIndex === i ? 'active' : ''}>
                     {size} см.
                  </li>
               ))}
            </ul>
         </div>
         <div className="pizza-block__bottom">
            <div className="pizza-block__price">от {price} ₽</div>
            <button onClick={onAddItem} className="button button--outline button--add">
               <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                     fill="white"
                  />
               </svg>
               <span>Добавить</span>
               {count && <i>{count}</i>}
            </button>
         </div>
      </div>
   )
}