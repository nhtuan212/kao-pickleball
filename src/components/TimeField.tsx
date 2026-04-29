import { Label, TimeField as TimeFieldHeroUI, TimeFieldProps, TimeValue } from "@heroui/react";
import { IField } from "@/types";
import ErrorMessage from "./ErrorMessage";

type ITimeField = TimeFieldProps<TimeValue> & IField;

export default function TimeField({
    ref,
    label,
    labelClassName,
    icon,
    errorMessage,
    ...props
}: ITimeField) {
    return (
        <div>
            <TimeFieldHeroUI ref={ref} hourCycle={24} name="time" {...props}>
                {label && <Label className={labelClassName}>{label}</Label>}

                <TimeFieldHeroUI.Group className="h-10 border border-gray-300 rounded-md">
                    {icon && <TimeFieldHeroUI.Prefix>{icon}</TimeFieldHeroUI.Prefix>}

                    <TimeFieldHeroUI.Input>
                        {segment => <TimeFieldHeroUI.Segment segment={segment} />}
                    </TimeFieldHeroUI.Input>
                </TimeFieldHeroUI.Group>
            </TimeFieldHeroUI>

            {errorMessage && <ErrorMessage>{errorMessage.message}</ErrorMessage>}
        </div>
    );
}
