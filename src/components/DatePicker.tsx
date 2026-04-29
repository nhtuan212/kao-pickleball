import ErrorMessage from "./ErrorMessage";
import {
    DatePicker as DatePickerHeroUI,
    DateField,
    Calendar,
    Label,
    DatePickerProps,
    DateValue,
} from "@heroui/react";
import { IField } from "@/types";

export default function DatePicker({
    ref,
    label,
    labelClassName,
    errorMessage,
    ...props
}: DatePickerProps<DateValue> & IField) {
    return (
        <DatePickerHeroUI ref={ref} {...props}>
            {label && <Label className={labelClassName}>{label}</Label>}

            <DateField.Group className="h-10.5 border border-gray-300 rounded-md" fullWidth>
                <DateField.Input>
                    {segment => <DateField.Segment segment={segment} />}
                </DateField.Input>
                <DateField.Suffix>
                    <DatePickerHeroUI.Trigger>
                        <DatePickerHeroUI.TriggerIndicator />
                    </DatePickerHeroUI.Trigger>
                </DateField.Suffix>
            </DateField.Group>

            <DatePickerHeroUI.Popover>
                <Calendar aria-label="Event date">
                    <Calendar.Header>
                        <Calendar.YearPickerTrigger>
                            <Calendar.YearPickerTriggerHeading />
                            <Calendar.YearPickerTriggerIndicator />
                        </Calendar.YearPickerTrigger>
                        <Calendar.NavButton slot="previous" />
                        <Calendar.NavButton slot="next" />
                    </Calendar.Header>
                    <Calendar.Grid>
                        <Calendar.GridHeader>
                            {day => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
                        </Calendar.GridHeader>
                        <Calendar.GridBody>
                            {date => <Calendar.Cell date={date} />}
                        </Calendar.GridBody>
                    </Calendar.Grid>
                    <Calendar.YearPickerGrid>
                        <Calendar.YearPickerGridBody>
                            {({ year }) => <Calendar.YearPickerCell year={year} />}
                        </Calendar.YearPickerGridBody>
                    </Calendar.YearPickerGrid>
                </Calendar>
            </DatePickerHeroUI.Popover>

            {errorMessage && <ErrorMessage>{errorMessage.message}</ErrorMessage>}
        </DatePickerHeroUI>
    );
}
