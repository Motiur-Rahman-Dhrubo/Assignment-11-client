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
        <div className="w-full mt-5">
            <h2 className="md:text-5xl text-4xl text-black italic text-center font-medium" style={{ textShadow: "2px 2px 4px rgba(255, 185, 22, 0.8)" }}>Daily Rental Price Chart:</h2>
            <ResponsiveContainer width="100%" height="100%" className="mt-10 min-h-[300px]">
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