export type NavbarProps ={
    logo:string,
    name:string,
    items:ItemProp[],
    social:SocialProp[],
    theme:ThemeProp
    admin?:boolean
}

export type ItemProp ={
    name:string,
    link:string

}

export type SocialProp ={
    name:string,
    link:string,
    icon:string
}

export type ThemeProp ={
    primary:string,
    secondary:string,
    white:string,
    black:string,
    gray:string,
    gray_dark:string,
}

// close menu 
export interface CloseMenuProps {
    color: string;
}