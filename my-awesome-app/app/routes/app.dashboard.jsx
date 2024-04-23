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

  const overviewItems = [
    {
      name: 'Total Sales',
      value: '$8,082',
    },
    {
      name: 'Net Margin',
      value: '56.9%',
    },
    {
      name: 'Net Profit',
      value: '$3432',
    },
    {
      name: 'Order Count',
      value: '45',
    },
    {
      name: 'Marketing',
      value: '$0',
    },
    {
      name: 'Fulfillment',
      value: '$1211',
    },
    {
      name: 'COGS',
      value: '$1020',
    },
    {
      name: 'Operational Expenses',
      value: '$536',
    },
    {
      name: 'Returns',
      value: '$54.22',
    },
  ]

  const marketStats = [
    {
      name: 'ROAS',
      value: 'N/A',
    },
    {
      name: 'POAS',
      value: 'N/A',
    },
    {
      name: 'CPA',
      value: 'N/A',
    },
    {
      name: 'BCAC',
      value: 'N/A',
    },
  ]

  const appList = [
    {
      name: 'Placeholder 1',
      description:
        'Consectetur ad id in in esse incididunt elit eiusmod laboris.',
      link: '#',
    },
    {
      name: 'Placeholder 2',
      description: 'Ad ipsum est qui enim amet Lorem.',
      link: '#',
    },
  ]

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f2f3f2] p-6 gap-6">
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
                <p className="lg:text-base text-sm">{item.name}</p>
                <p className="lg:text-lg text-base font-bold">{item.value}</p>
              </div>
            )),
          )}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col">
          <h1 className="lg:text-xl text-base font-semibold">Profits</h1>
          <p>
            Track your profits at a glance and monitor your store’s progress
          </p>
        </div>

        <div className="flex flex-row gap-6">
          <div className="lg:w-3/12 min-h-[200px] flex flex-col gap-6">
            <div className="w-full h-[175px] shadow bg-white rounded-lg p-4 flex flex-col gap-1 ">
              <p className="text-base">Gross Profit</p>

              <div className="border-t border-gray-300 pt-1">
                <p className="lg:text-xl text-lg font-bold">$4,795</p>
              </div>
            </div>

            <div className="w-full h-[175px] shadow bg-white rounded-lg p-4 flex flex-col gap-1">
              <p className="text-base">Con. Profit</p>
              <div className="border-t border-gray-300 pt-1">
                <p className="lg:text-xl text-lg font-bold">$4,795</p>
              </div>
            </div>
          </div>

          <div className="bg-white lg:w-9/12 min-h-[350px] shadow rounded-lg p-4">
            <p className="text-base">Compare Key Metrics</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col">
          <h1 className="lg:text-xl text-base font-semibold">Overview</h1>
          <p>Track your store’s metrics and monitor your performance</p>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {React.Children.toArray(
            overviewItems.map((item) => (
              <div className="w-full h-[175px] shadow bg-white rounded-lg p-4 flex flex-col gap-1 ">
                <p className="text-base">{item.name}</p>

                <div className="border-t border-gray-300">
                  <p className="lg:text-xl text-lg font-bold">{item.value}</p>
                </div>
              </div>
            )),
          )}
        </div>
      </div>

      <div className="flex flex-col gap-6 bg-white rounded-lg shadow min-h-[400px] p-4">
        <div className="flex flex-col">
          <h1 className="lg:text-xl text-base font-semibold">
            Profit & Expenses Breakdown
          </h1>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col">
          <h1 className="lg:text-xl text-base font-semibold">Products</h1>
          <p>See a breakdown of your most profitable products</p>
        </div>

        <div className="flex flex-row items-start justify-start gap-6 snap-x snap-mandatory overflow-x-auto w-full pb-4">
          {React.Children.toArray(
            [...Array(10).keys()].map((item) => (
              <div className="w-1/4 flex-shrink-0 h-auto shadow bg-white rounded-lg p-4 flex flex-col gap-1 snap-center">
                <div className="flex flex-row gap-4">
                  <div className="w-7 h-7 bg-gray-400 rounded" />

                  <p className="text-lg text-blue-400 font-medium">
                    Product Name 1
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

      <div className="flex flex-col gap-6">
        <div className="flex flex-col">
          <h1 className="lg:text-xl text-base font-semibold">Custom Reports</h1>
          <p>Track selected metrics in a customized view</p>
        </div>

        <div className="bg-white rounded-lg shadow min-h-[350px] p-4 flex flex-col">
          <h1 className="lg:text-lg text-base font-semibold">
            Marketing Platforms
          </h1>
        </div>
      </div>

      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col">
          <h1 className="lg:text-xl text-base font-semibold">Marketing</h1>
          <p>Track your marketing efforts at a glance</p>
        </div>

        <div className="grid grid-cols-4 gap-6 w-full">
          {React.Children.toArray(
            marketStats.map((item) => (
              <div className="bg-white rounded-lg shadow min-h-[135px] p-4 grid grid-cols-1">
                <p className="text-lg uppercase">{item.name}</p>
                <p className="text-xl font-bold pt-3 border-t border-gray-200">{item.value}</p>
              </div>
            )),
          )}
        </div>

        <div className="grid grid-cols-4 items-start gap-6">
          <div className="flex flex-col p-4 rounded-lg bg-white shadow   min-h-[400px]">
            <p className="text-base">Ad Spend</p>
          </div>

          <div className="flex flex-col p-4 rounded-lg bg-white shadow lg:w-full min-h-[400px] col-span-3">
            <p className="text-base">Ad Spend Trend</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col">
          <h1 className="lg:text-xl text-base font-semibold">
            Recommended apps
          </h1>
        </div>

        <div className="grid grid-cols-2 p-4 bg-white rounded-lg shadow">
          {appList.map((item) => (
            <div className="flex flex-row gap-4 items-start">
              <div className="w-7 h-7 bg-gray-400 rounded" />

              <div className="flex flex-col">
                <p className="lg:text-base font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
                <p className="text-blue-500 hover:underline cursor-pointer">
                  Get app
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
