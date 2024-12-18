<script setup lang="ts">
definePageMeta({
  layout: 'vendors',
  middleware: ['sanctum:auth'],
})

const earningsData = ref({
  labels: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  datasets: [
    {
      label: 'Earnings',
      data: [
        1200, 1900, 3000, 5000, 2000, 3000, 4000, 8000, 9000, 10000, 11000,
        12000,
      ],
      borderColor: '#0099ff',
      fill: false,
    },
  ],
})

const trafficData = ref({
  labels: ['Facebook', 'Instagram', 'TikTok', 'Google', 'Direct'],
  datasets: [
    {
      data: [40, 25, 20, 10, 5],
      backgroundColor: ['#0099ff', '#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0'],
    },
  ],
})

const categorySalesData = ref({
  labels: [
    'Electronics',
    'Clothing',
    'Home & Kitchen',
    'Beauty & Health',
    'Sports',
  ],
  datasets: [
    {
      label: 'Sales by Category',
      data: [5000, 3000, 4000, 2000, 1000],
      backgroundColor: '#0099ff',
    },
  ],
})

const customerDemographicsData = ref({
  labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
  datasets: [
    {
      data: [30, 40, 20, 5, 5],
      backgroundColor: ['#0099ff', '#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0'],
    },
  ],
})

const recentOrders = ref([
  { id: 1, customer: 'John Doe', date: '2024-12-10', total: 123.45 },
  { id: 2, customer: 'Jane Smith', date: '2024-12-09', total: 456.78 },
  { id: 3, customer: 'Sam Johnson', date: '2024-12-08', total: 89.9 },
])

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
})
</script>
<template>
  <div>
    <div class="page-header">
      <h3 class="text-2xl font-normal">{{ $t('labels.dashboard') }}</h3>
      <span class="block text-slate-400 font-light">{{
        $t('features.vendors.dashboardDesc')
      }}</span>
    </div>

    <div class="space-y-6">
      <!-- Top Row: Sales Highlight and Earnings Card -->
      <div class="flex py-6 space-x-6">
        <!-- Sales Highlight Card -->
        <div class="w-1/3 bg-white shadow-sm p-6 rounded-lg">
          <h2 class="text-lg font-semibold mb-4">Sales Highlights</h2>
          <div class="space-y-4">
            <div class="text-2xl font-bold">All-Time Sales: $1,234,567</div>
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span>Facebook</span>
                <span>$450,000</span>
              </div>
              <div class="flex justify-between text-sm">
                <span>Instagram</span>
                <span>$350,000</span>
              </div>
              <div class="flex justify-between text-sm">
                <span>TikTok</span>
                <span>$220,000</span>
              </div>
              <div class="flex justify-between text-sm">
                <span>Others</span>
                <span>$214,567</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Earnings Card -->
        <div class="w-2/3 bg-white shadow-sm p-6 rounded-lg">
          <h2 class="text-lg font-semibold mb-4">Earnings Over Time</h2>
          <PrimeChart type="line" :data="earningsData" :options="chartOptions" />
        </div>
      </div>

      <!-- Second Row: Key Metrics Cards -->
      <div class="grid grid-cols-4 gap-6">
        <div class="bg-white shadow-sm p-6 rounded-lg">
          <h3 class="text-sm font-medium">Total Products</h3>
          <p class="text-2xl font-bold mt-2">1,234</p>
        </div>
        <div class="bg-white shadow-sm p-6 rounded-lg">
          <h3 class="text-sm font-medium">New Customers This Month</h3>
          <p class="text-2xl font-bold mt-2">567</p>
        </div>
        <div class="bg-white shadow-sm p-6 rounded-lg">
          <h3 class="text-sm font-medium">Total Orders This Month</h3>
          <p class="text-2xl font-bold mt-2">789</p>
        </div>
        <div class="bg-white shadow-sm p-6 rounded-lg">
          <h3 class="text-sm font-medium">Total Earnings This Month</h3>
          <p class="text-2xl font-bold mt-2">$34,567</p>
        </div>
      </div>

      <!-- Custom Reports Section -->
      <div class="grid grid-cols-2 gap-6">
        <!-- Traffic Sources Report -->
        <div class="bg-white shadow-sm p-6 rounded-lg">
          <h2 class="text-lg font-semibold mb-4">Traffic Sources</h2>
          <PrimeChart type="doughnut" :data="trafficData" :options="chartOptions" />
        </div>

        <!-- Sales by Category Report -->
        <div class="bg-white shadow-sm p-6 rounded-lg">
          <h2 class="text-lg font-semibold mb-4">Sales by Category</h2>
          <PrimeChart type="bar" :data="categorySalesData" :options="chartOptions" />
        </div>

        <!-- Customer Demographics Report -->
        <div class="bg-white shadow-sm p-6 rounded-lg">
          <h2 class="text-lg font-semibold mb-4">Customer Demographics</h2>
          <PrimeChart
            type="pie"
            :data="customerDemographicsData"
            :options="chartOptions"
          />
        </div>

        <!-- Recent Orders Report -->
        <div class="bg-white shadow-sm p-6 rounded-lg">
          <h2 class="text-lg font-semibold mb-4">Recent Orders</h2>
          <ul class="divide-y divide-gray-200">
            <li
              v-for="order in recentOrders"
              :key="order.id"
              class="py-2 flex justify-between text-sm"
            >
              <span>{{ order.customer }}</span>
              <span>{{ order.date }}</span>
              <span class="font-bold">${{ order.total }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
