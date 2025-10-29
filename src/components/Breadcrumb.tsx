"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useGame } from "@/src/context/GameContext";

export default function Breadcrumb() {
  const pathname = usePathname();
  const { category } = useGame();

  // Path mapping with category context
  const pathMap: { [key: string]: string } = {
    "/": "Home",
    "/category": "Categories",
    "/game": category ? `Game: ${category.charAt(0).toUpperCase() + category.slice(1)}` : "Game",
    "/results": category ? `Results: ${category.charAt(0).toUpperCase() + category.slice(1)}` : "Results",
    "/summary": "Summary",
    "/tutorial": "Tutorial",
  };

  // Generate breadcrumb path with intelligent linking
  const generateBreadcrumbs = () => {
    const paths = pathname.split("/").filter((path) => path);
    const breadcrumbs = [{ name: "Home", path: "/", clickable: pathname !== "/" }];

    let currentPath = "";
    paths.forEach((path) => {
      currentPath += `/${path}`;
      const name = pathMap[currentPath] || path;
      
      // Determine if this breadcrumb should be clickable
      let clickable = true;
      
      // Disable "Game" link from Results page (can't go back to ongoing game)
      if (currentPath === "/game" && pathname === "/results") {
        clickable = false;
      }
      
      // Disable "Results" link from Summary page (results are temporary)
      if (currentPath === "/results" && pathname === "/summary") {
        clickable = false;
      }
      
      breadcrumbs.push({ name, path: currentPath, clickable });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumb on home page
  if (pathname === "/") {
    return null;
  }

  return (
    <div className="flex items-center gap-2 flex-wrap text-[10px] sm:text-xs">
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.path} className="flex items-center gap-2">
          {index === breadcrumbs.length - 1 ? (
            // Current page, not clickable
            <span className="text-white opacity-100 font-bold">
              {crumb.name}
            </span>
          ) : crumb.clickable ? (
            // Clickable breadcrumb
            <Link
              href={crumb.path}
              className="text-white opacity-70 hover:opacity-100 transition-opacity"
            >
              {crumb.name}
            </Link>
          ) : (
            // Disabled breadcrumb (not clickable)
            <span className="text-white opacity-50 cursor-not-allowed" title="Cannot navigate here">
              {crumb.name}
            </span>
          )}
          {index < breadcrumbs.length - 1 && (
            <i className="nes-icon caret-right is-small opacity-50"></i>
          )}
        </div>
      ))}
    </div>
  );
}

