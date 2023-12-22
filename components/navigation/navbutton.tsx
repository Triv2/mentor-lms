'use client'

import Link from 'next/link';

import {useState, useEffect} from'react'

interface NavButtonProps {
  href: string;
  text?: string;
  className?: string;
  icon?:JSX.Element;
}

const NavButton:React.FC<NavButtonProps> = ({
  href,
  text,
  className,
  icon
}) => {


const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
setIsMounted(true);
}, []);

if (!isMounted) {
return null;
}
  return (
    <Link className={className} href={href}>
      {icon}{text}
    </Link>
  );
}
export default NavButton;