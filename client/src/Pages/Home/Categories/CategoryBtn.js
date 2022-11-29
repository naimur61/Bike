import { Link } from "react-router-dom"

export const CategoryBtn = ({ ctgName }) => {

   return <Link to={`/bikes/${ctgName}`}><div className="py-4 w-56 px-10 rounded-md text-center shadow-xl bg-gray-700 text-white cursor-pointer hover:bg-gray-600 text-xl font-bold">{ctgName}</div></Link>
}