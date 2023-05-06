import * as Icon from "./IconBase";

export const XMarkIcon = ({ ...props }: Icon.IconBaseProps) => {
    return (
        <Icon.IconBase {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </Icon.IconBase>
    )
}
