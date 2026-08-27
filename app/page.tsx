"use client";

import {useEffect, useState} from "react";

const limits = {
    "1": 2512900,
    "2": 2331200,
    "3": 1528200,
    "4": 1409700,
    "5": 1208900
};

export default function Home() {
    const [grade, setGrade] = useState("1");
    const [serviceTime, setServiceTime] = useState(57020);
    const [days, setDays] = useState(20);
    const [rate, setRate] = useState(0.15);

    const [result, setResult] = useState({
        totalCost: 0,
        withinLimitCost: 0,
        overLimitCost: 0,
        withinLimitSelfPay: 0,
        finalSelfPay: 0
    });
    const calculate = () => {
        const limit = limits[grade as keyof typeof limits];
        const totalCost = serviceTime * days;

        let withinLimitCost = 0;
        let overLimitCost = 0;

        if (totalCost > limit) {
            withinLimitCost = limit;
            overLimitCost = totalCost - limit;
        } else {
            withinLimitCost = totalCost;
            overLimitCost = 0;
        }

        const withinLimitSelfPay = Math.floor((withinLimitCost * rate) / 10) * 10;
        const finalSelfPay = withinLimitSelfPay + overLimitCost;

        setResult({
            totalCost,
            withinLimitCost,
            overLimitCost,
            withinLimitSelfPay,
            finalSelfPay
        });
    };
    useEffect(() => {
        calculate();
    }, [grade, serviceTime, days, rate]);


    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex justify-center items-start font-sans">
            <div className="w-full max-w-[520px] bg-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100">
                <header className="text-center mb-8">
                    <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight mb-2">
                        방문요양 <span className="text-blue-600">본인부담금</span>
                    </h1>
                    <p className="text-slate-500 text-sm md:text-base">2026년 수가 기준 자동 계산기</p>
                </header>

                <div className="space-y-6">
                    <div className="text-black">
                        <label className="block font-bold mb-2 text-slate-700 text-sm ml-1">장기요양 등급</label>
                        <div className="relative group">
                            <select
                                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[1.1rem] appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer group-hover:border-slate-300"
                                value={grade}
                                onChange={(e) => setGrade(e.target.value)}
                            >
                                <option value="1">1등급 (한도액 2,512,900원)</option>
                                <option value="2">2등급 (한도액 2,331,200원)</option>
                                <option value="3">3등급 (한도액 1,528,200원)</option>
                                <option value="4">4등급 (한도액 1,409,700원)</option>
                                <option value="5">5등급 (한도액 1,208,900원)</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-slate-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="text-black">
                        <label className="block font-bold mb-2 text-slate-700 text-sm ml-1">이용 시간 (1회당)</label>
                        <div className="relative group">
                            <select
                                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[1.1rem] appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer group-hover:border-slate-300"
                                value={serviceTime}
                                onChange={(e) => setServiceTime(Number(e.target.value))}
                            >
                                <option value={25320}>1시간 (25,320원)</option>
                                <option value={34120}>1.5시간 (34,120원)</option>
                                <option value={43430}>2시간 (43,430원)</option>
                                <option value={50640}>2.5시간 (50,640원)</option>
                                <option value={57020}>3시간 (57,020원)</option>
                                <option value={63530}>3.5시간 (63,530원)</option>
                                <option value={70080}>4시간 (70,080원)</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-slate-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-black">
                            <label className="block font-bold mb-2 text-slate-700 text-sm ml-1">월 이용 횟수</label>
                            <div className="relative group">
                                <select
                                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[1.1rem] appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer group-hover:border-slate-300"
                                    value={days}
                                    onChange={(e) => setDays(Number(e.target.value))}
                                >
                                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                                        <option key={day} value={day}>
                                            {day}회
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-slate-600 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="text-black">
                            <label className="block font-bold mb-2 text-slate-700 text-sm ml-1">본인부담율</label>
                            <div className="relative group">
                                <select
                                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[1.1rem] appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer group-hover:border-slate-300"
                                    value={rate}
                                    onChange={(e) => setRate(Number(e.target.value))}
                                >
                                    <option value={0.15}>일반 (15%)</option>
                                    <option value={0.09}>경감 (9%)</option>
                                    <option value={0.06}>경감 (6%)</option>
                                    <option value={0}>수급자 (0%)</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-slate-600 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 p-7 bg-gradient-to-br from-blue-200 to-indigo-50 rounded-3xl shadow-xl shadow-slate-200/50 text-slate-800 relative overflow-hidden border border-blue-100/50">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-blue-200/20 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-200/20 rounded-full -ml-12 -mb-12 blur-2xl"></div>
                    
                    <div className="relative z-10">
                        <div className="flex justify-between items-end mb-6 border-b border-slate-200 pb-5">
                            <span className="text-slate-500 font-medium pb-1">예상 본인부담금</span>
                            <div className="text-right">
                                <span className="text-4xl font-black tabular-nums text-blue-700">{result.finalSelfPay.toLocaleString()}</span>
                                <span className="text-lg font-medium ml-1 text-slate-500">원</span>
                            </div>
                        </div>
                        
                        <div className="space-y-3 text-[0.925rem]">
                            <div className="flex justify-between items-center text-slate-600">
                                <span className="opacity-80">총 급여비용</span>
                                <span className="font-medium tabular-nums">{result.totalCost.toLocaleString()}원</span>
                            </div>
                            <div className="flex justify-between items-center text-slate-600">
                                <span className="opacity-80">한도 내 적용 비용</span>
                                <span className="font-medium tabular-nums">{result.withinLimitCost.toLocaleString()}원</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="opacity-80 text-slate-600">한도 초과액 (자부담 100%)</span>
                                <span className={`font-bold tabular-nums ${result.overLimitCost > 0 ? "text-red-500" : "text-slate-600"}`}>
                                    {result.overLimitCost.toLocaleString()}원
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 space-y-5">
                    <p className="text-[0.7rem] text-slate-400 leading-relaxed text-center">
                        * 본 계산기는 2026년 수가 기준 예시이며, 실제 금액은 건강보험공단 고시 및 이용 상황에 따라 차이가 발생할 수 있습니다.
                    </p>

                    <a 
                        href="https://blog.naver.com/my-silver/224363003269" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="group flex items-center gap-4 p-4 bg-slate-50 hover:bg-blue-50 rounded-2xl border border-slate-100 hover:border-blue-100 transition-all"
                    >
                        <div className="w-11 h-11 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 shrink-0 group-hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                            </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[0.9rem] font-bold text-slate-700">도움이 더 필요하신가요?</p>
                            <p className="text-xs text-slate-500 group-hover:text-blue-500 transition-colors truncate">블로그에서 이용 가이드와 상세 설명을 확인하세요</p>
                        </div>
                        <div className="text-slate-300 group-hover:text-blue-400 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}
