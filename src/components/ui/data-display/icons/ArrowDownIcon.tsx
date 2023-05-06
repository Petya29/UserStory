import * as Icon from "./IconBase";

export const ArrowDownIcon = ({ ...props }: Icon.IconBaseProps) => {
    return (
        <Icon.IconBase {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </Icon.IconBase>
    )
}