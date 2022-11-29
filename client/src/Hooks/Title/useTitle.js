import { useEffect } from 'react';

const useTitle = (title) => {
   useEffect(() => {
      document.title = `${title} - Bike.`;
   }, [title])
};

export default useTitle;