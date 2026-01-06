// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";
//
// import DashboardLayout from "@/components/DashboardLayout";
// import styles from "./page.module.css";
// import Heading from "@/components/common/Heading";
// import { PieChart, Pie, Legend, ResponsiveContainer, Cell } from "recharts";
// import InfoModal from "@/components/common/InfoModel";
// import useAuth from "@/hooks/useAuth";
// import LoadingSpinner from "@/components/common/LoadingSpinner";
// import { useEffect, useState } from "react";
// import { fetchRemindersDataUser,fetchDocumentCategoryWithCount } from "@/utils/dataFetchFunctions";
// import { Badge, Calendar } from "antd";
// import type { BadgeProps, CalendarProps } from "antd";
// import type { Dayjs } from "dayjs";
//
//
//
// type Reminder = {
//   id: number;
//   subject: string;
//   start_date_time: string | null;
// };
//
// type SelectedDate = {
//   date: string;
//   content: string;
//   type: "success" | "processing" | "error" | "default" | "warning";
// };
//
//
// const renderLegend = (props: any) => {
//     const { payload } = props;
//
//     return (
//         <ul style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
//             gap: '10px',
//             padding: '20px 0 0 0',
//             margin: 0,
//             listStyle: 'none',
//             width: '100%'
//         }}>
//             {payload.map((entry: any, index: number) => (
//                 <li key={`item-${index}`} style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: '#555' }}>
//                     <div style={{
//                         width: '12px',
//                         height: '12px',
//                         backgroundColor: entry.color,
//                         marginRight: '8px',
//                         borderRadius: '2px',
//                         flexShrink: 0
//                     }} />
//                     <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
//             {entry.value}
//           </span>
//                 </li>
//             ))}
//         </ul>
//     );
// };
//
//
// export default function Home() {
//   const isAuthenticated = useAuth();
//   const data01 = [
//     {
//       name: "Invoice",
//       value: 400,
//       color: "#8884d8",
//     },
//     {
//       name: "HR Employee fee",
//       value: 300,
//       color: "#888458",
//     },
//     {
//       name: "Test Documents",
//       value: 300,
//       color: "#887778",
//     },
//   ];
//
//
//   const [selectedDates, setSelectedDates] = useState<SelectedDate[]>([]);
//   const [categoriesData, setCategoriesData] = useState<{id: number, category_name: string, documents_count: number}[]>([]);
//   const [pieData, setPieData] = useState<{name: string, value: number, color: string}[]>([]);
//
//   const colors = [
//   "#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1",
//   "#a4de6c", "#d0ed57", "#ffc0cb", "#ffbb28", "#00C49F",
//   "#0088FE", "#FF6666", "#66CCFF", "#9966CC", "#FF9933",
//   "#33CC33", "#FF33CC", "#3399FF", "#FF6699", "#CCFF66"
// ];
//
// useEffect(() => {
//   fetchDocumentCategoryWithCount(setCategoriesData);
// }, []);
//
// useEffect(() => {
//   const data = categoriesData.map((category, index) => ({
//     name: category.category_name,
//     value: category.documents_count,
//     color: colors[index % colors.length], // assign colors in order, repeat if more than 20
//   }));
//   setPieData(data);
// }, [categoriesData]);
//
//   useEffect(() => {
//     fetchRemindersDataUser((data) => {
//       const transformedData = data
//         .filter((reminder: { start_date_time: any; }) => reminder.start_date_time)
//         .map((reminder: { start_date_time: any; subject: any; }) => ({
//           date: reminder.start_date_time!.split(" ")[0],
//           content: reminder.subject,
//           type: "success",
//         }));
//       setSelectedDates(transformedData);
//     });
//   }, []);
//
//   const getListData = (value: Dayjs) => {
//     const formattedDate = value.format("YYYY-MM-DD");
//     return selectedDates.filter((item) => item.date === formattedDate);
//   };
//
//   const dateCellRender = (value: Dayjs) => {
//     const listData = getListData(value);
//     return (
//       <ul className="events">
//         {listData.map((item, index) => (
//           <li key={index}>
//             <Badge status={item.type} text={item.content} />
//           </li>
//         ))}
//       </ul>
//     );
//   };
//
//   const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
//     if (info.type === "date") return dateCellRender(current);
//     return info.originNode;
//   };
//
//   const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
//     console.log(value.format("YYYY-MM-DD"), mode);
//   };
//
//
//   if (!isAuthenticated) {
//     return <LoadingSpinner />;
//   }
//
//
//   return (
//     <div className={styles.page}>
//       <DashboardLayout>
//         <div
//           className="d-flex flex-column custom-scroll"
//           style={{ minHeight: "100vh", maxHeight: "100%", overflowY: "scroll" }}
//         >
//           <div className="d-flex flex-column bg-white p-2 p-lg-3 rounded">
//             <div className="d-flex flex-row align-items-center">
//               <Heading text="Documents by Category" color="#172635" />
//               {/* <InfoModal
//                 title="Sample Blog"
//                 content={`<h1><strong>Hello world,</strong></h1><p>The Company Profile feature allows users to customize the branding of the application by entering the company name and uploading logos. This customization will reflect on the login screen, enhancing the professional appearance and brand identity of the application.</p><br><h3><strong>Hello world,</strong></h3><p>The Company Profile feature allows users to customize the branding of the application by entering the company name and uploading logos. This customization will reflect on the login screen, enhancing the professional appearance and brand identity of the application.</p><br><h3><strong>Hello world,</strong></h3><p>The Company Profile feature allows users to customize the branding of the application by entering the company name and uploading logos. This customization will reflect on the login screen, enhancing the professional appearance and brand identity of the application.</p><br><h3><strong>Hello world,</strong></h3><p>The Company Profile feature allows users to customize the branding of the application by entering the company name and uploading logos. This customization will reflect on the login screen, enhancing the professional appearance and brand identity of the application.</p>`}
//               /> */}
//             </div>
//             <ResponsiveContainer width="100%" height={350}>
//               <PieChart>
//                 <Pie
//                   data={pieData}
//                   dataKey="value"
//                   nameKey="name"
//                   cx="50%"
//                   cy="50%"
//                   label
//                   outerRadius={100}
//                 >
//                   {pieData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={entry.color} />
//                   ))}
//                 </Pie>
//                 <Legend content={renderLegend} verticalAlign="bottom" height={100} />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//           <div
//             className="d-flex flex-column bg-white p-2 p-lg-3 rounded mb-3"
//             style={{ marginTop: "12px" }}
//           >
//             <div className="d-flex flex-row align-items-center">
//               <Heading text="Reminders" color="#444" />
//               {/* <InfoModal
//                 title="Sample Blog"
//                 content={`<h1><strong>Hello world,</strong></h1><p>The Company Profile feature allows users to customize the branding of the application by entering the company name and uploading logos. This customization will reflect on the login screen, enhancing the professional appearance and brand identity of the application.</p><br><h3><strong>Hello world,</strong></h3><p>The Company Profile feature allows users to customize the branding of the application by entering the company name and uploading logos. This customization will reflect on the login screen, enhancing the professional appearance and brand identity of the application.</p><br><h3><strong>Hello world,</strong></h3><p>The Company Profile feature allows users to customize the branding of the application by entering the company name and uploading logos. This customization will reflect on the login screen, enhancing the professional appearance and brand identity of the application.</p><br><h3><strong>Hello world,</strong></h3><p>The Company Profile feature allows users to customize the branding of the application by entering the company name and uploading logos. This customization will reflect on the login screen, enhancing the professional appearance and brand identity of the application.</p>`}
//               /> */}
//             </div>
//             {/* <Calendar onPanelChange={onPanelChange} /> */}
//             <Calendar cellRender={cellRender} onPanelChange={onPanelChange} />
//
//           </div>
//         </div>
//       </DashboardLayout>
//     </div>
//   );
// }


/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import DashboardLayout from "@/components/DashboardLayout";
import styles from "./page.module.css";
import Heading from "@/components/common/Heading";
import { PieChart, Pie, Legend, ResponsiveContainer, Cell, Tooltip } from "recharts";
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
    const [categoriesData, setCategoriesData] = useState<{ id: number, category_name: string, documents_count: number }[]>([]);
    const [pieData, setPieData] = useState<{ name: string, value: number, color: string }[]>([]);

    // Colors based on the image provided (Orange, Light Blue, Royal Blue)
    // const colors = [
    //     "#FF5733",
    //     "#33C1FF",
    //     "#4052EE",
    //     "#FFC658", "#82ca9d", "#8dd1e1", "#a4de6c", "#d0ed57"
    // ];

    const colors = [
        "#FF5733", // Orange Red
        "#33C1FF", // Sky Blue
        "#4052EE", // Royal Blue
        "#FFC658", // Mustard
        "#82CA9D", // Soft Green
        "#A4DE6C", // Lime Green
        "#D0ED57", // Yellow Green
        "#F44336", // Red
        "#E91E63", // Pink
        "#9C27B0", // Purple
        "#673AB7", // Deep Purple
        "#3F51B5", // Indigo
        "#2196F3", // Blue
        "#03A9F4", // Light Blue
        "#00BCD4", // Cyan
        "#009688", // Teal
        "#4CAF50", // Green
        "#8BC34A", // Light Green
        "#CDDC39", // Lime
        "#FFEB3B", // Yellow
        "#FFC107", // Amber
        "#FF9800", // Orange
        "#FF5722", // Deep Orange
        "#795548", // Brown
        "#9E9E9E", // Grey
        "#607D8B", // Blue Grey
        "#8884d8", // Soft Purple
        "#8dd1e1", // Soft Cyan
        "#83a6ed", // Soft Blue
        "#8e4585", // Plum
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

    const renderLegend = (props: any) => {
        const { payload } = props;

        return (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '20px', flexWrap: 'wrap' }}>
                {payload.map((entry: any, index: number) => (
                    <div key={`item-${index}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '14px', color: '#6c757d', marginBottom: '4px' }}>
              {entry.payload.name}
            </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div
                                style={{
                                    width: '12px',
                                    height: '12px',
                                    backgroundColor: entry.color,
                                    borderRadius: '3px'
                                }}
                            />
                            <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                {entry.payload.value}
              </span>
                        </div>
                    </div>
                ))}
            </div>
        );
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
                    {/* Chart Section */}
                    <div className="d-flex flex-column bg-white p-2 p-lg-3 rounded-4">
                        <div className="d-flex flex-row align-items-center mb-3">
                            <Heading text="Documents by Category" color="#172635" />
                        </div>

                        <ResponsiveContainer width="100%" height={400}>
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
                                    innerRadius={90}
                                    outerRadius={120}
                                    cornerRadius={10}
                                    paddingAngle={1}
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

                                <Tooltip />

                                {/* Central Text */}
                                <text x="50%" y="35%" textAnchor="middle" dominantBaseline="middle">
                                    <tspan x="50%" dy="-10" fontSize="32" fontWeight="bold" fill="#172635">
                                        {totalDocuments}
                                    </tspan>
                                    <tspan x="50%" dy="25" fontSize="16" fill="#6c757d">
                                        Total Documents
                                    </tspan>
                                </text>

                                <Legend
                                    content={renderLegend}
                                    verticalAlign="bottom"
                                    align="center"
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Calendar Section */}
                    <div
                        className="d-flex flex-column bg-white p-2 p-lg-3 rounded-4 mb-3"
                        style={{ marginTop: "12px" }}
                    >
                        <div className="d-flex flex-row align-items-center">
                            <Heading text="Reminders" color="#172635" />
                        </div>
                        <Calendar cellRender={cellRender} onPanelChange={onPanelChange} />
                    </div>
                </div>
            </DashboardLayout>
        </div>
    );
}