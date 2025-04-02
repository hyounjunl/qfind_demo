import yfinance as yf
import pandas as pd
import os
from datetime import datetime

# 심볼 매핑
symbols = {
    "나스닥 100 선물": "NQ=F",
    "다우존스 선물": "YM=F",
    "S&P 500 선물": "ES=F",
    "크루드 오일": "CL=F",
    "골드": "GC=F",
    "30년 국채": "^TYX",
    "10년 국채": "^TNX",
    "5년 국채": "^FVX",
    "유로": "EURUSD=X",
    "일본 엔": "JPY=X"
}

# 데이터 저장 디렉토리
os.makedirs("data", exist_ok=True)

# 전체 데이터를 저장할 DataFrame
all_data = pd.DataFrame()

for name, symbol in symbols.items():
    print(f"{name} ({symbol}) 데이터 수집 중...")
    try:
        df = yf.download(symbol, interval="1d", period="1y")[["Close"]]
        df.rename(columns={"Close": name}, inplace=True)
        if all_data.empty:
            all_data = df
        else:
            all_data = all_data.join(df, how="outer")
        print(f"{name} 데이터 수집 완료")
    except Exception as e:
        print(f"{name} 데이터 수집 실패: {e}")

# 결측치 보간
all_data = all_data.interpolate(method="linear")

# 저장
all_data.to_csv("data/all_financial_data.csv")
print("모든 금융 데이터 수집 완료 및 저장됨")

# 미리보기
print(all_data.head())
print(f"데이터 형태: {all_data.shape}")
