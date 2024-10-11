import { memo } from "react"

export const Error = memo(() => (
   <div className="content__error-info">
      <h2>Произошла ошибка 😕</h2>
      <p>
         К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.
      </p>
   </div>
))