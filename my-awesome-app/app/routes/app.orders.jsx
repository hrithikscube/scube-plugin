import React, { Fragment, useCallback, useState } from 'react'
import { authenticate } from '../shopify.server'
import { Select } from '@shopify/polaris'
import { OrdersTable } from '../components/orders/Table'

export const loader = async ({ request }) => {
  await authenticate.admin(request)

  return null
}

const Orders = () => {
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

  const [activeView, setActiveView] = useState('orders')

  // order data
  let data = []

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f2f3f2] p-6 gap-6">
      <div className="w-full flex items-start justify-between">
        <div className="flex flex-row gap-6 items-center">
          <h1 className="lg:text-xl text-base font-semibold">Orders</h1>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (activeView !== 'orders') {
                  setActiveView('orders')
                }
              }}
              className={`p-2 px-3 ${
                activeView === 'orders'
                  ? 'text-blue-500 font-bold border-b-2 border-blue-500'
                  : 'text-gray-400 font-medium border-b-2 border-transparent'
              }`}
            >
              Orders
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

        <div className="lg:w-2/12">
          <Select
            label="Sales Channel"
            options={options}
            onChange={(value) => handleChange('sales_channel', value)}
            value={params.sales_channel}
          />
        </div>
      </div>

      {activeView === 'orders' ? (
        <Fragment>
          <div className="p-6 bg-white rounded-lg shadow flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="lg:text-lg text-base font-bold">List of Orders</p>

              <div className="flex items-center gap-2">
                <button className="p-2 bg-white border text-sm hover:shadow">
                  Bulk Update
                </button>
                <button className="p-2 bg-white border text-sm hover:shadow">
                  Export
                </button>
              </div>
            </div>

            <OrdersTable />
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="w-full bg-white rounded-lg shadow p-4 flex flex-col gap-4">
            <div className="flex items-start gap-2">
              <img
                src="/most-orders.svg"
                alt="lowest orders"
                className="w-16 h-16 object-contain"
              />
              <div>
                {' '}
                <p className="lg:text-lg font-semibold">
                  Most Profitable Orders
                </p>
                <p>See the most profitable orders you received</p>
                <p>for the selected time range based on Con. Profit.</p>
              </div>
            </div>
            <OrdersTable />
          </div>
          <div className="w-full bg-white rounded-lg shadow p-4 flex flex-col gap-4">
            <div className="flex items-start gap-2">
              <img
                src="/lowest-orders.svg"
                alt="lowest orders"
                className="w-16 h-16 object-contain"
              />
              <div>
                <p className="lg:text-lg font-semibold">Lowest Margin Orders</p>
                <p>See the most profitable orders you received</p>
                <p>for the selected time range based on Con. Profit.</p>
              </div>
            </div>
            <OrdersTable />
          </div>
        </Fragment>
      )}
    </div>
  )
}

export default Orders
