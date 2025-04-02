// frontend/src/components/futures/FuturesChart.tsx
'use client'

import React, { useEffect, useState } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Define the props for the component
interface PricePoint {
    date: string;
    price: number;
    volume: number;
}

interface FuturesChartProps {
    priceHistory?: PricePoint[];
    symbol: string;
}

// Function to format numbers with commas
const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(num);
};

const FuturesChart: React.FC<FuturesChartProps> = ({ priceHistory, symbol }) => {
    const [chartData, setChartData] = useState<PricePoint[]>([]);

    // Process data when priceHistory changes
    useEffect(() => {
        if (!priceHistory || !Array.isArray(priceHistory) || priceHistory.length === 0) {
            console.log("No valid price history data received");
            setChartData([]);
            return;
        }

        try {
            // Make sure we have valid data
            const validData = priceHistory.filter(item =>
                item && typeof item.date === 'string' &&
                typeof item.price === 'number'
            );

            // Sort by date
            const sortedData = [...validData].sort((a, b) => {
                const dateA = new Date(a.date).getTime();
                const dateB = new Date(b.date).getTime();
                return dateA - dateB;
            });

            console.log(`Processed ${sortedData.length} data points for chart`);
            setChartData(sortedData);
        } catch (error) {
            console.error("Error processing chart data:", error);
            setChartData([]);
        }
    }, [priceHistory]);

    // If no data is available, show a placeholder
    if (!chartData || chartData.length === 0) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-gray-50">
                <div className="text-center text-gray-500">
                    <svg
                        className="w-12 h-12 mx-auto text-gray-400 mb-2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
                    </svg>
                    <p>Price chart for {symbol} would appear here</p>
                    <p className="text-sm mt-2">No data available</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full">
            {/* Price Chart (75% height) */}
            <div className="h-3/4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={chartData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#2563EB" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 10 }}
                            tickFormatter={(tick) => {
                                try {
                                    const date = new Date(tick);
                                    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                                } catch (e) {
                                    return tick;
                                }
                            }}
                        />
                        <YAxis
                            domain={['auto', 'auto']}
                            tick={{ fontSize: 10 }}
                            tickFormatter={(tick) => formatNumber(tick)}
                            orientation="right"
                        />
                        <Tooltip
                            formatter={(value: number) => [formatNumber(value), "Price"]}
                            labelFormatter={(label) => {
                                try {
                                    const date = new Date(label);
                                    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                                } catch (e) {
                                    return label;
                                }
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="price"
                            stroke="#2563EB"
                            fill="url(#colorPrice)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Volume Chart (25% height) */}
            <div className="h-1/4">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
                    >
                        <XAxis
                            dataKey="date"
                            tick={false}
                            axisLine={false}
                        />
                        <YAxis
                            tick={{ fontSize: 8 }}
                            tickFormatter={(tick) => `${(tick / 1000).toFixed(0)}K`}
                            orientation="right"
                            axisLine={false}
                        />
                        <Tooltip
                            formatter={(value: number) => [value.toLocaleString(), "Volume"]}
                            labelFormatter={(label) => {
                                try {
                                    const date = new Date(label);
                                    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                                } catch (e) {
                                    return label;
                                }
                            }}
                        />
                        <Bar
                            dataKey="volume"
                            fill="#9CA3AF"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default FuturesChart;