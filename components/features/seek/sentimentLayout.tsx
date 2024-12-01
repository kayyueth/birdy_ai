'use client';

import { SentimentChart } from '@/components/features/dashboard/sentimentChart';
import { SkeletonBar } from '@/components/features/dashboard/skeleton';
import { ChartLine, TrendingUp, TrendingDown, Info } from 'lucide-react';
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

export default function SentimentLayout() {
  const [isSentimentChartLoading, setIsSentimentChartLoading] = useState(true);
  const [timePeriod, setTimePeriod] = useState('Last 12 months');

  return (
    <div className='border border-zinc-800 dark:border-zinc-100'>
      {/* Sentiment Chart Section - Heading */}
      <div className='flex h-8 w-full border-zinc-300 bg-zinc-300 pl-4 pt-1 text-left font-sans font-medium text-gray-500'>
        <ChartLine className='mr-2 mt-1 h-4 w-4' /> Sentiment Analysis
      </div>
      {/* Label: Generated by AI */}
      <div className='ml-6 mt-4 flex h-6 w-1/6 items-center border border-zinc-400 text-center text-xs text-gray-800 dark:invert'>
        <Info className='ml-2 mr-2 h-3 w-3' />
        Generated by AI
      </div>
      {/* Sentiment Chart Section - Inner */}
      <div className='mb-8 ml-6 mr-6 mt-4 flex flex-col items-start justify-center border border-zinc-400'>
        <div className='items-centers flex w-full flex-row justify-between'>
          {/* Left side: Avatar and h1 */}
          <div className='mb-5 ml-7 mt-5 flex flex-row items-center'>
            <Avatar className='h-6 w-auto'>
              <AvatarImage src='https://cryptologos.cc/logos/bitcoin-btc-logo.png' />
              <AvatarFallback></AvatarFallback>
            </Avatar>
            <h1 className='ml-2 font-sans text-lg font-medium'>
              Bitcoin (BTC)
            </h1>
          </div>
          {/* Right side: Select TimePeriod dropdown */}
          <select
            className='mr-7 mt-5 h-7 border border-zinc-400 pl-1 pr-1 text-xs leading-tight text-gray-800 dark:invert'
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
          >
            <option value='Last 12m'>Last 12 months</option>
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

      {/* Opinions Section */}
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
