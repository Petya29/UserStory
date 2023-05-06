import * as Icon from "./IconBase";

export const ArrowUpIcon = ({ ...props }: Icon.IconBaseProps) => {
    return (
        <Icon.IconBase {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </Icon.IconBase>
    )
}
