"use client";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link} from "@heroui/react";


export default function TopNavbar() {
  return (
    <Navbar>
      <NavbarBrand>
        <Link href="/" />
      </NavbarBrand>
      <NavbarContent>
        <NavbarItem>
          <Link href="/">Home</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/dashboard">Dashboard</Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};