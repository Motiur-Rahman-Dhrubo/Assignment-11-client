import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const MyBookingsChart = ({ data }) => {
    return (
        <div className="w-full h-96 my-10">
            <h2 className="text-center text-2xl font-bold mb-4">Daily Rental Price Chart</h2>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="dailyPrice" fill="#8884d8" name="Daily Price" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MyBookingsChart;