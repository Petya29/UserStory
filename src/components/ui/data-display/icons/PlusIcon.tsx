import * as Icon from "./IconBase";

export const PlusIcon = ({ ...props }: Icon.IconBaseProps) => {
    return (
        <Icon.IconBase {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </Icon.IconBase>
    )
}
