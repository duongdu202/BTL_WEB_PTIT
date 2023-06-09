import Footer from "./Footer";
import { Link, NavLink } from "react-router-dom";

export default function Navbar(){
    return (
        <nav className="flex items-center justify-between flex-wrap bg-gray-400 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">Library Manager</span>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <NavLink to="/" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-blue-300 mr-4 text-2xl font-bold">
            Home
          </NavLink>
          <NavLink to="cart" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-blue-300 mr-4 text-2xl font-bold">
            Cart
          </NavLink>
          {JSON.parse(localStorage.getItem("info")).role === 1 ?(<NavLink to="/admin/listbook" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-blue-300 mr-4 text-2xl font-bold">
            List
          </NavLink>):""}
          {JSON.parse(localStorage.getItem("info")).login ? (
        <input className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          type="submit"
          value={"LogOut"}
          onClick={() => {
            localStorage.setItem(
              "info",
              JSON.stringify({
                email: "",
                login: false,
                role: 0,
                name: "",
                id: 0,
              })
            );
            window.location.reload(false)
          }}
        />
      ) : (
        <Link to={"/login"}>
          <input type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" value={"Login"} />
        </Link>
      )}
        </div>
      </div>
    </nav>
    );
}