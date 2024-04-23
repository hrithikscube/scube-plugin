import React, { Fragment, useCallback, useState } from 'react'
import { authenticate } from '../shopify.server'
import { Select } from '@shopify/polaris'
import { OrdersTable } from '../components/orders/Table'

export const loader = async ({ request }) => {
  await authenticate.admin(request)

  return null
}

const Inventory = () => {
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

  const [activeView, setActiveView] = useState('inventory')

  // order data
  let data = []

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f2f3f2] p-6 gap-6">
      <div className="w-full flex items-start justify-between">
        <div className="flex flex-row gap-6 items-center">
          <h1 className="lg:text-xl text-base font-semibold">Inventory</h1>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (activeView !== 'inventory') {
                  setActiveView('inventory')
                }
              }}
              className={`p-2 px-3 ${
                activeView === 'inventory'
                  ? 'text-blue-500 font-bold border-b-2 border-blue-500'
                  : 'text-gray-400 font-medium border-b-2 border-transparent'
              }`}
            >
              Inventory
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
      </div>

      {activeView === 'inventory' ? (
        <Fragment>
          <div className="p-6 bg-white rounded-lg shadow flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="lg:text-lg text-base font-bold">
                List of Inventory
              </p>
            </div>

            <OrdersTable />
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="w-full bg-white rounded-lg shadow p-4 flex flex-col gap-4 min-h-[450px]">
            
          </div>
        </Fragment>
      )}
    </div>
  )
}

export default Inventory
