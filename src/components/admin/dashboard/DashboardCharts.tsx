
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, BarChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data for charts
const areaData = [
  { name: 'Jan', value: 10000 },
  { name: 'Feb', value: 30000 },
  { name: 'Mar', value: 25000 },
  { name: 'Apr', value: 20000 },
  { name: 'May', value: 32000 },
  { name: 'Jun', value: 35000 },
];

const barData = [
  { month: 'Jan', count: 4000 },
  { month: 'Feb', count: 5000 },
  { month: 'Mar', count: 6000 },
  { month: 'Apr', count: 7500 },
  { month: 'May', count: 9000 },
  { month: 'Jun', count: 12000 },
];

export default function DashboardCharts() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="p-4">
        <CardHeader>
          <CardTitle>Pertumbuhan Anggota</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={areaData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="p-4">
        <CardHeader>
          <CardTitle>Aktivitas Kegiatan</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
