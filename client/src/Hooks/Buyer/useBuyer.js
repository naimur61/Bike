import { useEffect, useState } from "react"

const useBuyer = email => {
   const [isBuyer, setIsBuyer] = useState('');
   const [buyerLoading, setBuyerLoading] = useState(true);

   useEffect(() => {
      if (email) {
         fetch(`https://bike-one.vercel.app/users/buyer/${email}`)
            .then(res => res.json())
            .then(data => {
               setIsBuyer(data.isBuyer);
               setBuyerLoading(false);
            })
      }
   }, [email])
   return [isBuyer, buyerLoading];
}

export default useBuyer;