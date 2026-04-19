"use client"
import { usePathname } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { GiCook } from "react-icons/gi";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { RiAccountCircleFill } from "react-icons/ri";
import { FaRandom } from "react-icons/fa";
import { ListGroup, ListGroupItem, Nav, NavLink } from "react-bootstrap";
import Link from "next/link";
import "./FFStyles.css";
export default function FFNavigation() {
    const pathname = usePathname();
    const links = [
        { label: "Home", path: "/", icon: FaHome },
        { label: "Recipes", path: "/recipes", icon: GiCook },
        { label: "Explore", path: "/explore", icon: HiMagnifyingGlass },
        { label: "Random Recipe", path: "/recipes/random", icon: FaRandom },
        { label: "Account", path: "/account", icon: RiAccountCircleFill }

    ];
    const checkActive = (currentLabel : string) => {
        switch (currentLabel) {
            case "Home":
                return pathname === "/";
            case "Recipes":
                pathname !== "/recipes/random" && pathname.startsWith("/recipes");
            case "Explore":
                pathname.startsWith("/explore");
            case "Random Recipe":
                pathname === "/recipes/random";
            case "Account":
                pathname.startsWith("/account");
            default:
                return false;
        }
    };
    return (
        <div >
            <Nav className="position-fixed nav-pills rounded-0 start-0 end-0 top-0 d-none 
            d-md-flex bg-orange z-2 flex-row align-items-center" style={{ height: 80 }}>
                <NavLink as={Link} href="/" className="burger-guy text-center px-3">
                    <img src="/images/freestyle-burger-guy.png" width="120px" height="auto" />
                </NavLink>
                {links.map((link) => (
                    <NavLink key={link.path} as={Link} href={link.path}  
                    className={`${checkActive(link.label) ? "active" : ""} navi-link px-3 d-flex flex-row align-items-center justify-content-center`} >
                        {link.icon({fontSize: 35})}
                        {link.label}

                    </NavLink>
                )
                    
                )}


            </Nav>

        </div>
    );


}