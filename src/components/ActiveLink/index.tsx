import Link, { LinkProps } from 'next/link';
import { ReactElement, cloneElement } from 'react';
import { useRouter } from 'next/router'

interface ActiveLinkProps extends LinkProps{
    children: ReactElement;
    activeClassName: string
}





export function ActiveLink({ children, activeClassName, href, ...rest}) {

    const { asPath } = useRouter() 

    const className = asPath === href  ? activeClassName : "";

    return (
        <Link href={href} {...rest}>
        { cloneElement(children, {
            className,
        })}
        </Link>
    )
}