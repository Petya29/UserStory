import * as Icon from "./IconBase";

export const MinusIcon = ({ ...props }: Icon.IconBaseProps) => {
    return (
        <Icon.IconBase {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
        </Icon.IconBase>
    )
}
