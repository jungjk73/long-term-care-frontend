import type { NextConfig } from "next";

const repoName = "long-term-care-frontend";

const nextConfig: NextConfig = {
  output: 'export',               // 정적 HTML 내보내기 활성화
  images: { unoptimized: true },  // GitHub Pages 호스팅을 위해 이미지 최적화 비활성화

  // 로컬 개발 환경(npm run dev)이 아닐 때만 깃허브 저장소 경로를 주소에 붙여줍니다.
  basePath: process.env.NODE_ENV === "production" ? `/${repoName}` : "",
  assetPrefix: process.env.NODE_ENV === "production" ? `/${repoName}/` : "",
};

export default nextConfig;
