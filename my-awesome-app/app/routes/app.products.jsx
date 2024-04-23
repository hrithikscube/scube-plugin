import React, { Fragment, useCallback, useState } from 'react'
import { authenticate } from '../shopify.server'
import { Select } from '@shopify/polaris'
import { ProductsTable } from '../components/products/Table'

export const loader = async ({ request }) => {
  await authenticate.admin(request)

  return null
}

const Products = () => {
  const [params, setParams] = useState({
    sales_channel: '',
  })

  const handleChange = (value, name) => {
    setParams({
      ...prams,
      [name]: value,
    })
  }

  const options = [{ label: 'NA', value: 'NA' }]

  // products data
  let data = []

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f2f3f2] p-6 gap-6">
      <div className="w-full flex items-start justify-between">
        <div className="flex flex-row gap-6 items-center">
          <h1 className="lg:text-xl text-base font-semibold">Products</h1>
        </div>

        <div className="lg:w-2/12">
          <Select
            label="Sales Channel"
            options={options}
            onChange={(value) => handleChange('sales_channel', value)}
            value={params.sales_channel}
          />
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="lg:text-lg text-base font-bold">List of Products</p>

          <div className="flex items-center gap-2">
            <button className="p-2 bg-white border text-sm hover:shadow">
              Bulk Update
            </button>
            <button className="p-2 bg-white border text-sm hover:shadow">
              Export
            </button>
          </div>
        </div>

        <ProductsTable />
      </div>
    </div>
  )
}

export default Products
