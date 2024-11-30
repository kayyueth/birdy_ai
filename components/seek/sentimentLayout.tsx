'use client';

import { SentimentChart } from '@/components/dashboard/sentimentChart';
import { SkeletonBar } from '@/components/dashboard/skeleton';
import { ChartLine, TrendingUp, TrendingDown, Info } from 'lucide-react';
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function SentimentLayout() {
  const [isSentimentChartLoading, setIsSentimentChartLoading] = useState(true);
  const [timePeriod, setTimePeriod] = useState('last 12m');

  return (
    <div className='border'>
      {/* Sentiment Chart Section - Heading */}
      <div className='flex h-8 w-full border-zinc-300 bg-zinc-300 pl-4 pt-1 text-left font-sans font-medium text-gray-500'>
        <ChartLine className='mr-2 mt-1 h-4 w-4' /> Sentiment Analysis
      </div>
      {/* Label: Generated by AI */}
      <div className='ml-6 mt-3 flex h-6 w-1/6 items-center border-2 text-center text-xs text-gray-400'>
        <Info className='ml-2 mr-2 h-3 w-3' />
        Generated by AI
      </div>
      {/* Sentiment Chart Section - Inner */}
      <div className='mb-8 ml-6 mr-6 mt-4 flex flex-col items-start justify-center border'>
        <div className='items-centers ml-10 flex w-[700px] flex-row justify-between'>
          {/* Left side: Avatar and h1 */}
          <div className='mb-5 mt-5 flex flex-row items-center'>
            <Avatar className='h-6 w-auto'>
              <AvatarImage src='https://cryptologos.cc/logos/bitcoin-btc-logo.png' />
              <AvatarFallback></AvatarFallback>
            </Avatar>
            <h1 className='ml-2 font-sans font-medium'>BTC</h1>
          </div>
          {/* Right side: Select TimePeriod dropdown */}
          <select
            className='dark:text-grey-200 mt-5 h-7 rounded border border-gray-300 px-1 text-xs leading-tight dark:bg-gray-800'
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
          >
            <option value='Last 12m'>Last 12m</option>
            <option value='Last 6m'>Last 6 months</option>
            <option value='Last 3m'>Last 3 months</option>
            <option value='Last 1m'>Last 1 month</option>
          </select>
        </div>
        {isSentimentChartLoading && <SkeletonBar />}
        <SentimentChart
          timePeriod={timePeriod}
          onLoadComplete={() => setIsSentimentChartLoading(false)}
        />
      </div>

      {/* Sentiment Chart Section - Opinions */}
      <div className='flex justify-between gap-x-6'>
        {/* Sentiment Chart Section - Opinions Bullish */}
        <div className='mb-6 ml-6 h-40 w-1/2 border-2'>
          <div className='flex h-8 w-full border-zinc-300 bg-zinc-300 pl-4 pt-1 text-left font-sans font-medium text-gray-500'>
            <TrendingUp className='mr-2 mt-1 h-4 w-4' /> Bullish
          </div>
        </div>
        {/* Sentiment Chart Section - Opinions Bearish */}
        <div className='mb-6 mr-6 h-40 w-1/2 border-2'>
          <div className='flex h-8 w-full border-zinc-300 bg-zinc-300 pl-4 pt-1 text-left font-sans font-medium text-gray-500'>
            <TrendingDown className='mr-2 mt-1 h-4 w-4' /> Bearish
          </div>
        </div>
      </div>
    </div>
  );
}
