
import React, { useCallback, useState } from 'react'
import { authenticate } from '../shopify.server'
import { Select } from '@shopify/polaris'

export const loader = async ({ request }) => {
  await authenticate.admin(request)

  return null
}

const Dashboard = () => {
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

  const dashboard_stats = [
    {
      name: 'Total Sales',
      value: '$ 100.00',
    },
    {
      name: 'Marketing',
      value: '$ 99.00',
    },
    {
      name: 'Con. Profit',
      value: '$ 58.00',
    },
    {
      name: 'Order Count',
      value: '$ 879.00',
    },
    {
      name: 'POAS',
      value: '$ 200.00',
    },
  ]

  return (
    <div className="flex flex-col w-full h-screen bg-[#f2f3f2] p-6 gap-6">
      <div className="w-full flex items-start justify-between">
        <div>
          <h1 className="lg:text-xl text-base font-semibold">Dashboard</h1>
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

      <div className="bg-white p-4 rounded-lg w-full flex flex-col gap-4 shadow">
        <h1 className="lg:text-lg text-base font-medium">Today's Snapshot</h1>

          <div className="grid grid-cols-5">
            {React.Children.toArray(
              dashboard_stats.map((item) => (
                <div className="flex flex-col">
                  <p className='lg:text-base text-sm'>{item.name}</p>
                  <p className='lg:text-lg text-base font-bold'>{item.value}</p>
                </div>
              )),
            )}
          </div>
      </div>
    </div>
  )
}

export default Dashboard
