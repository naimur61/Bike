import { useEffect, useState } from "react"

const useAdmin = email => {
   const [isAdmin, setIsAdmin] = useState('');
   const [adminLoading, setAdminLoading] = useState(true);

   useEffect(() => {
      if (email) {
         fetch(`https://bike-one.vercel.app/users/admin/${email}`)
            .then(res => res.json())
            .then(data => {
               setIsAdmin(data.isAdmin);
               setAdminLoading(false);
            })
      }
   }, [email])
   return [isAdmin, adminLoading];
}

export default useAdmin;