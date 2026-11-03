import {NextResponse} from "next/server";
const MAP:Record<string,string>={XAUUSD:"XAU/USD",EURUSD:"EUR/USD",GBPUSD:"GBP/USD",USDJPY:"USD/JPY",BTCUSD:"BTC/USD",ETHUSD:"ETH/USD"};
export const revalidate=30;
export async function GET(){
const key=process.env.TWELVEDATA_API_KEY;
if(!key)return NextResponse.json({configured:false,message:"Market data is unavailable. Set TWELVEDATA_API_KEY."},{status:503});
const r=await fetch(`https://api.twelvedata.com/quote?symbol=${Object.values(MAP).join(",")}&apikey=${key}`,{next:{revalidate:30}});
if(!r.ok)return NextResponse.json({configured:true,message:"Provider error. Data unavailable."},{status:502});
return NextResponse.json({configured:true,quotes:await r.json(),note:"Indices (NASDAQ, US30) need a provider symbol mapping."});}
