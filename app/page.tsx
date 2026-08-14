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
        <div className="min-h-screen bg-[#f0f2f5] p-5 flex justify-center items-start font-sans">
            <div className="w-full max-w-[500px] bg-white p-6 rounded-[12px] shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
                <h1 className="text-[2rem] text-center text-[#4a90e2] font-bold mb-6">방문요양 본인부담금 계산기</h1>

                <div className="mb-4 text-black">
                    <label className="block font-bold mb-2 text-[1.5rem]">장기요양 등급</label>
                    <select
                        className="w-full p-3 border border-[#ddd] rounded-lg text-[1.5rem] bg-white"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                    >
                        <option value="1">1등급 (한도액 2,512,900원)</option>
                        <option value="2">2등급 (한도액 2,331,200원)</option>
                        <option value="3">3등급 (한도액 1,528,200원)</option>
                        <option value="4">4등급 (한도액 1,409,700원)</option>
                        <option value="5">5등급 (한도액 1,208,900원)</option>
                    </select>
                </div>

                <div className="mb-4 text-black">
                    <label className="block font-bold mb-2 text-[1.5rem]">이용 시간 (1회당)</label>
                    <select
                        className="w-full p-3 border border-[#ddd] rounded-lg text-[1.5rem] bg-white"
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
                </div>

                <div className="mb-4 text-black">
                    <label className="block font-bold mb-2 text-[1.5rem]">월 이용 횟수</label>
                    <input
                        type="number"
                        className="w-full p-3 border border-[#ddd] rounded-lg text-[1.5rem] bg-white text-black"
                        value={days}
                        min="1"
                        max="31"
                        onChange={(e) => setDays(Number(e.target.value))}
                    />
                </div>

                <div className="mb-4 text-black">
                    <label className="block font-bold mb-2 text-[1.5rem]">본인부담율</label>
                    <select
                        className="w-full p-3 border border-[#ddd] rounded-lg text-[1.5rem] bg-white"
                        value={rate}
                        onChange={(e) => setRate(Number(e.target.value))}
                    >
                        <option value={0.15}>일반대상자 (15%)</option>
                        <option value={0.09}>본인부담금40%경감자 (9%)</option>
                        <option value={0.06}>본인부담금60%경감자 (6%)</option>
                        <option value={0}>기초생활수급자 (0%)</option>
                    </select>
                </div>

                <button
                    className="w-full p-[14px] bg-[#4a90e2] text-white border-none rounded-lg text-[1.1rem] font-bold cursor-pointer mt-[10px] active:bg-[#357abd]"
                    onClick={calculate}
                >
                    계산하기
                </button>

                <div className="mt-6 p-5 bg-[#f5f7fa] rounded-[12px] border-l-4 border-[#4a90e2] text-black">
                    <div className="flex justify-between mb-[10px] text-[1.5rem]">
                        <span>총 급여비용</span>
                        <span>{result.totalCost.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between mb-[10px] text-[1.5rem]">
                        <span>등급 내 비용</span>
                        <span>{result.withinLimitCost.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between mb-[10px] text-[1.5rem]">
                        <span>한도 초과액 (100% 자부담)</span>
                        <span className="text-[#e74c3c] font-bold">{result.overLimitCost.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between mb-[10px] text-[1.5rem]">
                        <span>등급 내 본인부담금</span>
                        <span>{result.withinLimitSelfPay.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between mt-[15px] pt-[15px] border-t border-[#ddd] font-bold text-[1.5rem] text-[#e74c3c]">
                        <span>총 본인부담금</span>
                        <span>{result.finalSelfPay.toLocaleString()}원</span>
                    </div>
                </div>

                <div className="text-[1rem] text-[#666] mt-3 leading-[1.4]">
                    * 본 계산기는 2026년 수가 기준 예시이며, 실제 금액은 건강보험공단 고시 및 이용 상황(가산, 야간/휴일 이용 등)에 따라 다를 수 있습니다.
                </div>

                <div className="mt-4 p-4 bg-[#eef6ff] rounded-lg border border-[#4a90e2] text-center">
                    <p className="text-[1.5rem] font-bold text-[#2c3e50] mb-2">자세한 설명은 아래 링크를 참고하세요.</p>
                    <a href="https://blog.naver.com/my-silver/224363003269" target="_blank" rel="noopener noreferrer" className="text-[#4a90e2] underline text-[0.85rem] break-all">
                        https://blog.naver.com/my-silver/224363003269
                    </a>
                </div>
            </div>
        </div>
    );
}
