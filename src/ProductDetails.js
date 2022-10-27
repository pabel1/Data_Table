import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Pagination from "@mui/material/Pagination";
import ReactPaginate from 'react-paginate';
import Stack from "@mui/material/Stack";
import cogoToast from "cogo-toast";
import Loading from "./Loading";
import axios from "axios";
const ProductDetails = () => {
  const [loading, setLoading] = useState(false);
  const [row, setRow] = useState([]);
  const [total, setTotal] = useState({});
  const [searchkeyword, setSearchkeyword] = useState(0);
  const [perpage, setPerpage] = useState(50);
//   const [total, setTotal] = useState({});

  // api fetch

  const fetchApi = async (pageno, perpage, searchkeyword) => {

    try {
      const res = await axios.get(
        `http://localhost:5000/products/productList/${pageno}/${perpage}/${searchkeyword}`
      );
      setLoading(false);
      const resData = res.data;
     
    //   console.log(resData);
    //   console.log(resData.data[0].rows);
    // console.log(resData.data[0].rows);
    // console.log(resData.data[0].total);
      
      if (resData.status === "success") {
        if (resData.data[0].rows.length > 0) {
          setRow(resData.data[0].rows);
          setTotal(resData.data[0].total[0]);
         
        } else {
          cogoToast.error("Data Not found!", { position: "buttom-center" });
        }
      }
    } catch (error) {
      cogoToast.error(`${error.error}`, { position: "buttom-center" });
    }
  };

  useEffect(() => {
    // setLoading(true);
    fetchApi(1,perpage,searchkeyword);
   
  }, []);

  const {count}=total;
  

  return (
    <>
      <Loading loading={loading} />

      <div className=" w-[80%] bg-white shadow-lg mx-auto mt-32 rounded-md">
        <div className=" flex items-center justify-between p-4">
          <h1 className=" text-3xl font-semibold text-zinc-600">
            Product List{" "}
          </h1>
          <div className=" border-2 px-4  rounded-md">
            <select
              className=" px-6 py-1 bg-transparent border-fuchsia-700 text-zinc-600"
              name=""
              id=""
            >
              <option value="5"> 5 per page</option>
              <option value="10"> 10 per page</option>
              <option value="15"> 15 per page</option>
              <option value="20"> 20 per page</option>
              <option value="30"> 30 per page</option>
              <option value="40"> 40 per page</option>
              <option value="50"> 50 per page</option>
            </select>
          </div>
          <div className=" flex items-center gap-2 border border-fuchsia-700 py-1 px-4 rounded-md">
            <input
              className=" outline-none text-zinc-600 "
              type="text"
              placeholder="Search "
            />
            <button>
              <FaSearch className=" text-fuchsia-700" />
            </button>
          </div>
        </div>
        <div className=" pt-8 pb-3">
          <table class=" table-auto w-[92%] mx-auto">
            <thead className=" border-b border-gray-300 bg-gray-50 text-left mb-3 text-zinc-600">
              <tr className="">
                <th className=" p-3 font-semibold text-base tracking-wide">
                  Product
                </th>
                <th className=" p-3 font-semibold text-base tracking-wide">
                  Price
                </th>
                <th className=" p-3 font-semibold text-base tracking-wide">
                  Stock
                </th>
                <th className=" p-3 font-semibold text-base tracking-wide">
                  Code
                </th>
              </tr>
            </thead>
            <tbody className=" text-left  ">
              {row &&
                row.map((item, i) => {
                  return (
                    <tr className=" border-b " key={i}>
                      <td className="">
                        <div className=" flex p-2 gap-5">
                          <div className=" ">
                            <img
                              className=" w-[45px] h-[45px] rounded-md "
                              src={item.image}
                              alt=""
                            />
                          </div>
                          <div>
                            <h4 className=" text-lg font-semibold text-zinc-700">
                              {item.title}
                            </h4>
                            <p>{item.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className=" w-[12%]">
                        <h4 className=" text-lg font-semibold text-zinc-700">
                          {item.brand}
                        </h4>
                        <p>{item.price + "Taka"}</p>
                      </td>
                      <td className=" w-[12%] ">
                        <p className=" w-fit py-1 px-2 text-white font-semibold rounded-lg bg-sky-600">
                          {item.stock}
                        </p>
                      </td>
                      <td className=" w-[12%]">
                        <p>{item.product_code}</p>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className=" my-4 ml-4">
        {/* <ReactPaginate
        breakLabel="..."
        previousLabel="< "
        nextLabel=" >"
        // onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={()=>count/10}
        
        renderOnZeroPageCount={null}
      /> */}
          <Stack spacing={2} className="my-4">
            <Pagination count={(count/10)}  color="secondary" />
          </Stack>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
