import { CloudUpload, X } from 'lucide-react'
import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
// import multer from 'multer'

const AddProduct = () => {
  const [productName, setProductName] = useState("")
  const [price, setPrice] = useState("")
  const [desc, setDesc] = useState("")
  const [category, setCategory] = useState("")
  const [quantity, setQuantity] = useState("")
  const [stock, setStock] = useState("Active")

  const [selectedFile, setFile] = useState(null);
  const formRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const navigate = useNavigate()

  const handler_form = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("price", price);
    formData.append("desc", desc);
    formData.append("category", category);
    formData.append("quantity", quantity);
    formData.append("stock", stock);
    formData.append("product_img", selectedFile);

    try {
      const response = await fetch("http://localhost:5000/api/auth/addData", {
        method: "POST",
        body: formData
        // headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({
        //   productName, price, desc, category, quantity, stock, file
        // })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json()
      // console.log("Success: ", result)
      if (result) {
        setProductName("")
        setPrice("")
        setDesc("")
        setCategory("")
        setQuantity("")
        setStock("")
        setFile("")
        navigate("/?item Added")
      }
      else {
        console.log(`Error!`)
      }
    }

    catch (Error) {
      console.error(`Error catch: ${Error}`)
    }
  }

  return (
    <>
      <div className="w-full font-medium text-2xl mt-5 " >Add Product</div>
      <div className="product_uploader mt-5">
        <form method="post" ref={formRef} onSubmit={handler_form} className="flex flex-wrap gap-5" >
          <div className="product_name basis-[calc(50%-20px)]">
            <label htmlFor="ProductName" className="block mb-1 font-normal " >Product Name</label>
            <input type="text" name="product" id="product" className="w-full border rounded-md p-2" placeholder="Product Name" onChange={(e) => setProductName(e.target.value)} value={productName} />
          </div>

          <div className="product_price basis-[calc(50%-20px)]">
            <label htmlFor="price" className="block font-normal mb-1">Price</label>
            <input type="number" name="price" id="price" className="w-full border rounded-md p-2" placeholder="₹ 0.00" onChange={(e) => setPrice(e.target.value)} value={price} />
          </div>

          <div className="description basis-[calc(50%-20px)]">
            <label htmlFor="desc" className="block font-normal mb-1">Description</label>
            <input type="text" name="desc" id="desc" className="w-full border rounded-md p-2" placeholder="Product Description" onChange={(e) => setDesc(e.target.value)} value={desc} />
          </div>

          <div className="category basis-[calc(50%-20px)]">
            <label htmlFor="category" className="block font-normal mb-1">Category</label>
            <input type="text" name="category" id="caegory" className="w-full border rounded-md p-2" placeholder="Select Catgory" onChange={(e) => setCategory(e.target.value)} value={category} />
          </div>

          <div className="quantity basis-[calc(50%-20px)]">
            <label htmlFor="quantity" className="block font-normal mb-1">Quantity</label>
            <input type="number" name="quantity" id="quantity" className="w-full border rounded-md p-2" placeholder="Quantity" onChange={(e) => setQuantity(e.target.value)} value={quantity} />
          </div>

          <div className="stock basis-[calc(50%-20px)]">
            <label htmlFor="Stock" className="block font-normal mb-1" >Stock</label>
            <select name="stock" id="stock" className="w-full border rounded-md p-2" onChange={(e) => setStock(e.target.value)} value={stock} >
              <option value="Active">Available</option>
              <option value="Deactive">Out Of Stock</option>
            </select>
          </div>

          <div className="image_upload quantity basis-[calc(50%-20px)] w-full">
            <label htmlFor="product_img" className="block font-normal mb-1">Image</label>
            <div className="flex gap-4 mt-4 rounded-md justify-center">
              <label htmlFor="product_img" className="flex flex-col items-center justify-center w-60 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer">
                <CloudUpload stroke='#86929B' width={100} height={120} />
                <span className="select-none">Upload Image</span>
              </label>

              <input type="file" name="product_img" id="product_img" className="hidden" onChange={handleFileChange} />

              <div className="preview_image w-55 h-32 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                {selectedFile ?
                  (<div className="relative size-full">
                    <span className="absolute top-2 right-2 cursor-pointer hover:bg-gray-100"
                     onClick={() => setFile("")}><X /> </span>
                    <img className="size-full" src={(URL.createObjectURL(selectedFile))} alt="preview" />
                  </div>)
                  : "Preview"
                }
              </div>
            </div>
          </div>

          <button value="Add Product" className="bg-[#388AFF] w-30 h-10 self-center mt-5 border border-transparent text-white rounded-md" type="submit" >Add </button>
        </form>
      </div>
    </>
  )
}

export default AddProduct
