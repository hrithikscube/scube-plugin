import React, { Fragment, useCallback, useState } from 'react'
import { authenticate } from '../shopify.server'
import { Select } from '@shopify/polaris'

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

  return (
    <div className="flex flex-col w-full h-screen bg-[#f2f3f2] p-6 gap-6">
      <div className="w-full flex items-start justify-between">
        <div className="flex flex-row gap-6">
          <h1 className="lg:text-xl text-base font-semibold">Orders</h1>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (activeView !== 'orders') {
                  setActiveView('orders')
                }
              }}
              className={`p-2 px-3 rounded-lg ${
                activeView === 'orders'
                  ? 'bg-blue-400 text-white'
                  : 'bg-gray-300 text-black'
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
              className={`p-2 px-3 rounded-lg ${
                activeView === 'insights'
                  ? 'bg-blue-400 text-white'
                  : 'bg-gray-300 text-black'
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
        <div className="w-full bg-white rounded-lg shadow p-4 min-h-40">
          <div className="flex items-center justify-end gap-2">
            <button className="p-2 bg-white border text-sm hover:shadow">
              Bulk Update
            </button>
            <button className="p-2 bg-white border text-sm hover:shadow">
              Export
            </button>
          </div>
        </div>
      ) : (
        <Fragment>
          <div className="w-full bg-white rounded-lg shadow p-4 min-h-40">
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
          </div>
          <div className="w-full bg-white rounded-lg shadow p-4 min-h-40">
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
          </div>
        </Fragment>
      )}
    </div>
  )
}

export default Orders
