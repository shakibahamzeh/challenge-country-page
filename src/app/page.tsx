"use client";
import dynamic from "next/dynamic";

const Home = dynamic(() => import("@/components/CountryRanking"), { ssr: false });

export default Home;