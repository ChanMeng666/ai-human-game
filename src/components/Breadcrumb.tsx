"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Breadcrumb() {
  const pathname = usePathname();

  // 定义路径映射
  const pathMap: { [key: string]: string } = {
    "/": "Home",
    "/category": "Category",
    "/game": "Game",
    "/results": "Results",
    "/summary": "Summary",
    "/tutorial": "Tutorial",
  };

  // 生成面包屑路径
  const generateBreadcrumbs = () => {
    const paths = pathname.split("/").filter((path) => path);
    const breadcrumbs = [{ name: "Home", path: "/" }];

    let currentPath = "";
    paths.forEach((path) => {
      currentPath += `/${path}`;
      const name = pathMap[currentPath] || path;
      breadcrumbs.push({ name, path: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // 主页不显示面包屑
  if (pathname === "/") {
    return null;
  }

  return (
    <div className="flex items-center gap-2 flex-wrap text-[10px] sm:text-xs">
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.path} className="flex items-center gap-2">
          {index === breadcrumbs.length - 1 ? (
            // 当前页面，不可点击
            <span className="text-white opacity-100 font-bold">
              {crumb.name}
            </span>
          ) : (
            // 可点击的面包屑
            <Link
              href={crumb.path}
              className="text-white opacity-70 hover:opacity-100 transition-opacity"
            >
              {crumb.name}
            </Link>
          )}
          {index < breadcrumbs.length - 1 && (
            <i className="nes-icon caret-right is-small opacity-50"></i>
          )}
        </div>
      ))}
    </div>
  );
}

