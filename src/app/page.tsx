//
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";
//
// import DashboardLayout from "@/components/DashboardLayout";
// import styles from "./page.module.css";
// import Heading from "@/components/common/Heading";
// import {PieChart, Pie, Legend, ResponsiveContainer, Cell, Tooltip} from "recharts";
// import useAuth from "@/hooks/useAuth";
// import LoadingSpinner from "@/components/common/LoadingSpinner";
// import {useEffect, useState, useMemo} from "react";
// import {fetchRemindersDataUser, fetchDocumentCategoryWithCount} from "@/utils/dataFetchFunctions";
// import {Badge, Calendar} from "antd";
// import type {CalendarProps} from "antd";
// import type {Dayjs} from "dayjs";
//
// type SelectedDate = {
//     date: string;
//     content: string;
//     type: "success" | "processing" | "error" | "default" | "warning";
// };
//
// export default function Home() {
//     const isAuthenticated = useAuth();
//
//     const [selectedDates, setSelectedDates] = useState<SelectedDate[]>([]);
//     const [categoriesData, setCategoriesData] = useState<{
//         id: number,
//         category_name: string,
//         documents_count: number
//     }[]>([]);
//     const [pieData, setPieData] = useState<{ name: string, value: number, color: string }[]>([]);
//
//     // Colors based on the image provided (Orange, Light Blue, Royal Blue)
//     // const colors = [
//     //     "#FF5733",
//     //     "#33C1FF",
//     //     "#4052EE",
//     //     "#FFC658", "#82ca9d", "#8dd1e1", "#a4de6c", "#d0ed57"
//     // ];
//
//     const colors = [
//         "#FF5733", // Orange Red
//         "#33C1FF", // Sky Blue
//         "#4052EE", // Royal Blue
//         "#FFC658", // Mustard
//         "#82CA9D", // Soft Green
//         "#A4DE6C", // Lime Green
//         "#D0ED57", // Yellow Green
//         "#F44336", // Red
//         "#E91E63", // Pink
//         "#9C27B0", // Purple
//         "#673AB7", // Deep Purple
//         "#3F51B5", // Indigo
//         "#2196F3", // Blue
//         "#03A9F4", // Light Blue
//         "#00BCD4", // Cyan
//         "#009688", // Teal
//         "#4CAF50", // Green
//         "#8BC34A", // Light Green
//         "#CDDC39", // Lime
//         "#FFEB3B", // Yellow
//         "#FFC107", // Amber
//         "#FF9800", // Orange
//         "#FF5722", // Deep Orange
//         "#795548", // Brown
//         "#9E9E9E", // Grey
//         "#607D8B", // Blue Grey
//         "#8884d8", // Soft Purple
//         "#8dd1e1", // Soft Cyan
//         "#83a6ed", // Soft Blue
//         "#8e4585", // Plum
//     ];
//
//     useEffect(() => {
//         fetchDocumentCategoryWithCount(setCategoriesData);
//     }, []);
//
//     useEffect(() => {
//         const data = categoriesData.map((category, index) => ({
//             name: category.category_name,
//             value: category.documents_count,
//             color: colors[index % colors.length],
//         }));
//         setPieData(data);
//     }, [categoriesData]);
//
//     const totalDocuments = useMemo(() => {
//         return pieData.reduce((acc, curr) => acc + curr.value, 0);
//     }, [pieData]);
//
//     useEffect(() => {
//         fetchRemindersDataUser((data) => {
//             const transformedData = data
//                 .filter((reminder: { start_date_time: any; }) => reminder.start_date_time)
//                 .map((reminder: { start_date_time: any; subject: any; }) => ({
//                     date: reminder.start_date_time!.split(" ")[0],
//                     content: reminder.subject,
//                     type: "success",
//                 }));
//             setSelectedDates(transformedData);
//         });
//     }, []);
//
//     const getListData = (value: Dayjs) => {
//         const formattedDate = value.format("YYYY-MM-DD");
//         return selectedDates.filter((item) => item.date === formattedDate);
//     };
//
//     const dateCellRender = (value: Dayjs) => {
//         const listData = getListData(value);
//         return (
//             <ul className="events">
//                 {listData.map((item, index) => (
//                     <li key={index}>
//                         <Badge status={item.type} text={item.content}/>
//                     </li>
//                 ))}
//             </ul>
//         );
//     };
//
//     const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
//         if (info.type === "date") return dateCellRender(current);
//         return info.originNode;
//     };
//
//     const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
//         console.log(value.format("YYYY-MM-DD"), mode);
//     };
//
//     const renderLegend = (props: any) => {
//         const {payload} = props;
//
//         return (
//             <div style={{display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '20px', flexWrap: 'wrap'}}>
//                 {payload.map((entry: any, index: number) => (
//                     <div key={`item-${index}`}
//                          style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
//             <span style={{fontSize: '14px', color: '#6c757d', marginBottom: '4px'}}>
//               {entry.payload.name}
//             </span>
//                         <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
//                             <div
//                                 style={{
//                                     width: '12px',
//                                     height: '12px',
//                                     backgroundColor: entry.color,
//                                     borderRadius: '3px'
//                                 }}
//                             />
//                             <span style={{fontSize: '16px', fontWeight: 'bold', color: '#333'}}>
//                 {entry.payload.value}
//               </span>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         );
//     };
//
//     if (!isAuthenticated) {
//         return <LoadingSpinner/>;
//     }
//
//     return (
//         <div className={styles.page}>
//             <DashboardLayout>
//                 <div
//                     className="d-flex flex-column custom-scroll"
//                     style={{minHeight: "100vh", maxHeight: "100%", overflowY: "scroll"}}
//                 >
//                     {/* Chart Section */}
//                     <div className="d-flex flex-column bg-white p-2 p-lg-3 rounded-4">
//                         <div className="d-flex flex-row align-items-center mb-3">
//                             <Heading text="Documents by Category" color="#172635"/>
//                         </div>
//
//                         <ResponsiveContainer width="100%" height={400}>
//                             <PieChart>
//                                 <defs>
//                                     <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
//                                         <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur"/>
//                                         <feOffset in="blur" dx="0" dy="3" result="offsetBlur"/>
//                                         <feFlood floodColor="rgba(0,0,0,0.1)" result="color"/>
//                                         <feComposite in="color" in2="offsetBlur" operator="in" result="shadow"/>
//                                         <feComposite in="SourceGraphic" in2="shadow" operator="over"/>
//                                     </filter>
//                                 </defs>
//
//                                 <Pie
//                                     data={pieData}
//                                     dataKey="value"
//                                     nameKey="name"
//                                     cx="50%"
//                                     cy="50%"
//                                     innerRadius={90}
//                                     outerRadius={120}
//                                     cornerRadius={10}
//                                     paddingAngle={1}
//                                     startAngle={90}
//                                     endAngle={-270}
//                                     stroke="none"
//                                 >
//                                     {pieData.map((entry, index) => (
//                                         <Cell
//                                             key={`cell-${index}`}
//                                             fill={entry.color}
//                                             style={{filter: "url(#shadow)"}}
//                                         />
//                                     ))}
//                                 </Pie>
//
//                                 <Tooltip/>
//
//                                 {/* Central Text */}
//                                 <text x="50%" y="35%" textAnchor="middle" dominantBaseline="middle">
//                                     <tspan x="50%" dy="-10" fontSize="32" fontWeight="bold" fill="#172635">
//                                         {totalDocuments}
//                                     </tspan>
//                                     <tspan x="50%" dy="25" fontSize="16" fill="#6c757d">
//                                         Total Documents
//                                     </tspan>
//                                 </text>
//
//                                 <Legend
//                                     content={renderLegend}
//                                     verticalAlign="bottom"
//                                     align="center"
//                                 />
//                             </PieChart>
//                         </ResponsiveContainer>
//                     </div>
//
//                     {/* Calendar Section */}
//                     <div
//                         className="d-flex flex-column bg-white p-2 p-lg-3 rounded-4 mb-3"
//                         style={{marginTop: "12px"}}
//                     >
//                         <div className="d-flex flex-row align-items-center">
//                             <Heading text="Reminders" color="#172635"/>
//                         </div>
//                         <Calendar cellRender={cellRender} onPanelChange={onPanelChange}/>
//                     </div>
//                 </div>
//             </DashboardLayout>
//         </div>
//     );
// }


/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import DashboardLayout from "@/components/DashboardLayout";
import styles from "./page.module.css";
import Heading from "@/components/common/Heading";
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from "recharts";
import useAuth from "@/hooks/useAuth";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useEffect, useState, useMemo } from "react";
import { fetchRemindersDataUser, fetchDocumentCategoryWithCount } from "@/utils/dataFetchFunctions";
import { Badge, Calendar } from "antd";
import type { CalendarProps } from "antd";
import type { Dayjs } from "dayjs";

type SelectedDate = {
    date: string;
    content: string;
    type: "success" | "processing" | "error" | "default" | "warning";
};

export default function Home() {
    const isAuthenticated = useAuth();

    const [selectedDates, setSelectedDates] = useState<SelectedDate[]>([]);
    const [categoriesData, setCategoriesData] = useState<{
        id: number,
        category_name: string,
        documents_count: number
    }[]>([]);
    const [pieData, setPieData] = useState<{ name: string, value: number, color: string }[]>([]);

    const colors = [
        "#FF5733", "#33C1FF", "#4052EE", "#FFC658", "#82CA9D", "#A4DE6C",
        "#D0ED57", "#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5",
        "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A",
        "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548",
        "#9E9E9E", "#607D8B", "#8884d8", "#8dd1e1", "#83a6ed", "#8e4585",
    ];

    useEffect(() => {
        fetchDocumentCategoryWithCount(setCategoriesData);
    }, []);

    useEffect(() => {
        const data = categoriesData.map((category, index) => ({
            name: category.category_name,
            value: category.documents_count,
            color: colors[index % colors.length],
        }));
        setPieData(data);
    }, [categoriesData]);

    const totalDocuments = useMemo(() => {
        return pieData.reduce((acc, curr) => acc + curr.value, 0);
    }, [pieData]);

    useEffect(() => {
        fetchRemindersDataUser((data) => {
            const transformedData = data
                .filter((reminder: { start_date_time: any; }) => reminder.start_date_time)
                .map((reminder: { start_date_time: any; subject: any; }) => ({
                    date: reminder.start_date_time!.split(" ")[0],
                    content: reminder.subject,
                    type: "success",
                }));
            setSelectedDates(transformedData);
        });
    }, []);

    // ... Calendar helper functions remain the same ...
    const getListData = (value: Dayjs) => {
        const formattedDate = value.format("YYYY-MM-DD");
        return selectedDates.filter((item) => item.date === formattedDate);
    };

    const dateCellRender = (value: Dayjs) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map((item, index) => (
                    <li key={index}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    };

    const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
        if (info.type === "date") return dateCellRender(current);
        return info.originNode;
    };

    const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
        console.log(value.format("YYYY-MM-DD"), mode);
    };

    if (!isAuthenticated) {
        return <LoadingSpinner />;
    }

    return (
        <div className={styles.page}>
            <DashboardLayout>
                <div
                    className="d-flex flex-column custom-scroll"
                    style={{ minHeight: "100vh", maxHeight: "100%", overflowY: "scroll" }}
                >
                    <div className="d-flex flex-column bg-white p-3 p-lg-4 rounded-4 shadow-sm">
                        <div className="d-flex flex-row align-items-center mb-4">
                            <Heading text="Documents by Category" color="#172635" />
                        </div>

                        <div className="row g-4 align-items-center">

                            <div className="col-12 col-lg-7 col-xl-8" style={{ height: "400px" }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <defs>
                                            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                                                <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
                                                <feOffset in="blur" dx="0" dy="3" result="offsetBlur" />
                                                <feFlood floodColor="rgba(0,0,0,0.1)" result="color" />
                                                <feComposite in="color" in2="offsetBlur" operator="in" result="shadow" />
                                                <feComposite in="SourceGraphic" in2="shadow" operator="over" />
                                            </filter>
                                        </defs>

                                        <Pie
                                            data={pieData}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            innerRadius="60%"
                                            outerRadius="80%"
                                            cornerRadius={10}
                                            paddingAngle={2}
                                            startAngle={90}
                                            endAngle={-270}
                                            stroke="none"
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={entry.color}
                                                    style={{ filter: "url(#shadow)" }}
                                                />
                                            ))}
                                        </Pie>

                                        <Tooltip
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                        />

                                        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
                                            <tspan x="50%" dy="-10" fontSize="32" fontWeight="bold" fill="#172635">
                                                {totalDocuments}
                                            </tspan>
                                            <tspan x="50%" dy="25" fontSize="14" fill="#6c757d">
                                                Total Documents
                                            </tspan>
                                        </text>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="col-12 col-lg-5 col-xl-4">
                                <div
                                    className="custom-scroll"
                                    style={{
                                        maxHeight: '400px',
                                        overflowY: 'auto',
                                        paddingRight: '10px'
                                    }}
                                >
                                    <div className="d-flex flex-column gap-3">
                                        {pieData.map((entry, index) => (
                                            <div key={`legend-${index}`} className="d-flex align-items-center justify-content-between p-2 rounded hover-bg-light">
                                                <div className="d-flex align-items-center gap-3">
                                                    <div
                                                        style={{
                                                            width: '12px',
                                                            height: '12px',
                                                            backgroundColor: entry.color,
                                                            borderRadius: '50%',
                                                            flexShrink: 0
                                                        }}
                                                    />
                                                    <span style={{ fontSize: '14px', color: '#495057', fontWeight: 500 }}>
                                                        {entry.name}
                                                    </span>
                                                </div>
                                                <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#172635' }}>
                                                    {entry.value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div
                        className="d-flex flex-column bg-white p-3 p-lg-4 rounded-4 mb-3"
                        style={{ marginTop: "24px" }}
                    >
                        <div className="d-flex flex-row align-items-center mb-3">
                            <Heading text="Reminders" color="#172635" />
                        </div>
                        <Calendar cellRender={cellRender} onPanelChange={onPanelChange} />
                    </div>
                </div>
            </DashboardLayout>
        </div>
    );
}