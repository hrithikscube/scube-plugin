import React, { Fragment, useState } from 'react'
import { Select } from '@shopify/polaris'
import { ProductsTable } from '../components/products/Table'
import axios from 'axios'

export const loader = async ({ request }) => {
  let headers = {
    'Content-Type': 'application/json',
    'X-Shopify-Access-Token': import.meta.env.VITE_X_SHOPIFY_ACCESS_TOKEN,
  }

  let data = {}

  await axios
    .get(
      'https://my-scube-store.myshopify.com/admin/api/2024-04/products.json',
      {
        headers: headers,
      },
    )
    .then((response) => {
      console.log(response)
      data = response.data
    })
    .catch((error) => {
      console.log(error)
    })

  return data
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

  const [activeView, setActiveView] = useState('performance')

  // order data
  let data = []

  // best sellers, most profittable, least profitable
  const [variants, setVariants] = useState('best_sellers')

  const [groupBy, setGroupBy] = useState('product')

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f2f3f2] p-6 gap-6">
      <div className="w-full flex items-start justify-between">
        <div className="flex flex-row gap-6 items-center">
          <h1 className="lg:text-xl text-base font-semibold">Products</h1>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (activeView !== 'performance') {
                  setActiveView('performance')
                }
              }}
              className={`p-2 px-3 ${
                activeView === 'performance'
                  ? 'text-blue-500 font-bold border-b-2 border-blue-500'
                  : 'text-gray-400 font-medium border-b-2 border-transparent'
              }`}
            >
              Performance
            </button>
            <button
              onClick={() => {
                if (activeView !== 'insights') {
                  setActiveView('insights')
                }
              }}
              className={`p-2 px-3 ${
                activeView === 'insights'
                  ? 'text-blue-500 font-bold border-b-2 border-blue-500'
                  : 'text-gray-400 font-medium border-b-2 border-transparent'
              }`}
            >
              Insights
            </button>
          </div>
        </div>

        {/* <div className="lg:w-2/12">
          <Select
            label="Sales Channel"
            options={options}
            onChange={(value) => handleChange('sales_channel', value)}
            value={params.sales_channel}
          />
        </div> */}
      </div>

      {activeView === 'performance' ? (
        <Fragment>
          <div className="p-4 flex flex-col gap-6 bg-white rounded-lg shadow min-h-[400px]">
            <p className="lg:text-lg font-semibold">Unit Count By Product</p>
            {/* <ProductsTable /> */}
          </div>

          <div className="p-4 flex flex-col gap-6 bg-white rounded-lg shadow">
            <div className="flex items-end justify-end">
              <button className="text-sm border hover:shadow p-2 px-4">
                Export
              </button>
            </div>
            <ProductsTable />
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              {[
                {
                  name: 'Best Sellers',
                  value: 'best_sellers',
                },
                {
                  name: 'Most Profitable',
                  value: 'most_profitable',
                },
                {
                  name: 'Least Profitable',
                  value: 'least_profitable',
                },
              ].map((item) => (
                <button
                  onClick={() => {
                    setVariants(item.value)
                  }}
                  className={`p-2 px-3 ${
                    variants === item.value
                      ? 'text-blue-500 font-medium border-b-2 border-blue-500'
                      : 'text-gray-400 font-medium border-b-2 border-transparent'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            <div className="flex items-center divide-x w-fit border border-gray-300 rounded overflow-hidden">
              {[
                {
                  name: 'Product',
                  value: 'product',
                },
                {
                  name: 'Vendor',
                  value: 'vendor',
                },
                {
                  name: 'Type',
                  value: 'type',
                },
              ].map((item) => (
                <button
                  onClick={() => {
                    setGroupBy(item.value)
                  }}
                  className={`p-2 px-4 ${
                    groupBy === item.value
                      ? 'bg-blue-200 text-blue-500'
                      : 'bg-white'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            <div className="flex flex-row items-start justify-start snap-x snap-mandatory overflow-x-auto w-full pb-4">
              {React.Children.toArray(
                [...Array(10).keys()].map((item) => (
                  <div className="w-1/4 flex-shrink-0 mr-4 h-auto shadow bg-white rounded-lg p-4 flex flex-col gap-1 snap-center">
                    <div className="flex flex-row gap-4">
                      <div className="w-7 h-7 bg-gray-400 rounded" />

                      <p className="text-lg text-blue-400 font-medium">
                        {groupBy} name
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {[
                        {
                          name: 'Sales',
                          value: '8',
                        },
                        {
                          name: 'Total Sales',
                          value: '$1211',
                        },
                        {
                          name: 'Profit',
                          value: '$2321',
                        },
                        {
                          name: 'Profit Margin',
                          value: '98.23%',
                        },
                      ].map((item) => (
                        <div>
                          <p className="text-sm text-gray-500">{item.name}</p>
                          <p className="text-base font-bold">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )),
              )}
            </div>
          </div>
        </Fragment>
      )}
    </div>
  )
}

export default Products
