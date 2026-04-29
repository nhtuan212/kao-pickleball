import Button from "@/components/Button";
import TimeField from "@/components/TimeField";
import DatePicker from "@/components/DatePicker";
import { toast } from "@/components/Toast";
import { Input, Textarea } from "@/components/Input";
import { Clock } from "lucide-react";
import { Controller } from "react-hook-form";
import { useModalStore } from "@/stores";
import { useAppForm, useDebounce } from "@/hooks";
import { useMatch } from "@/hooks/queries";
import { getCurrentTime, getToday, matchSchema, toDateValue } from "@/utils";
import { TEXT } from "@/constants";
import { IMatch } from "@/types";

export default function MatchForm({ match }: { match?: IMatch }) {
    //** Stores */
    const { closeModal } = useModalStore();

    //** Queries */
    const { createMatch } = useMatch();

    //** Use App Form */
    const defaultValues = matchSchema.parse(match || {});

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useAppForm<IMatch>({
        schema: matchSchema,
        defaultValues,
    });

    //** Functions */
    const handleSubmitPlayer = useDebounce(async (data: IMatch) => {
        const result = {
            ...data,
            startTime: data.startTime.toString(),
            endTime: data.endTime.toString(),
        };

        if (match) {
            // Edit
            return;
        }

        createMatch(result).then(() => {
            toast({
                title: `${TEXT.ADD} ${TEXT.MATCH} ${TEXT.SUCCESSFULLY}`,
            });
            closeModal();
        });
    });

    //** Return */
    return (
        <form onSubmit={handleSubmit(handleSubmitPlayer)}>
            <div className="grid grid-cols-2 gap-3 p-1">
                <div className="col-span-2">
                    <Controller
                        control={control}
                        name="date"
                        render={({ field }) => (
                            <DatePicker
                                label={`${TEXT.DATE} ${TEXT.MONTH}`}
                                labelClassName="block first-letter:uppercase lowercase"
                                className="w-full"
                                defaultValue={toDateValue(field.value)}
                                isDateUnavailable={date => date.compare(getToday()) < 0}
                                onChange={field.onChange}
                                errorMessage={errors.date}
                            />
                        )}
                    />
                </div>
                <div className="col-span-2">
                    <Input
                        className="w-full"
                        label={TEXT.NAME}
                        {...register("name")}
                        placeholder={TEXT.NAME}
                        errorMessage={errors.name}
                    />
                </div>
                <div className="col-span-2">
                    <Input
                        className="w-full"
                        label={TEXT.LOCATION}
                        {...register("location")}
                        placeholder={TEXT.LOCATION}
                        errorMessage={errors.location}
                    />
                </div>
                <Controller
                    control={control}
                    name="startTime"
                    render={({ field }) => (
                        <TimeField
                            label={TEXT.START_TIME}
                            icon={<Clock className="w-4 h-4" />}
                            defaultValue={getCurrentTime(field.value)}
                            errorMessage={errors.startTime}
                            onChange={field.onChange}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="endTime"
                    render={({ field }) => (
                        <TimeField
                            label={TEXT.END_TIME}
                            icon={<Clock className="w-4 h-4" />}
                            defaultValue={getCurrentTime(field.value)}
                            errorMessage={errors.endTime}
                            onChange={field.onChange}
                        />
                    )}
                />
                <Input
                    className="w-full"
                    label={`${TEXT.COUNT} ${TEXT.PLAYER}`}
                    labelClassName="block first-letter:uppercase lowercase"
                    type="number"
                    {...register("player")}
                    placeholder={`${TEXT.COUNT} ${TEXT.PLAYER}`}
                    errorMessage={errors.player}
                />
                <Input
                    className="w-full"
                    label={`${TEXT.COUNT} ${TEXT.COURT}`}
                    labelClassName="block first-letter:uppercase lowercase"
                    type="number"
                    {...register("court")}
                    placeholder={`${TEXT.COUNT} ${TEXT.COURT}`}
                    errorMessage={errors.court}
                />
                <div className="col-span-2">
                    <Textarea
                        className="w-full"
                        label={TEXT.DESCRIPTION}
                        {...register("description")}
                        placeholder={TEXT.DESCRIPTION}
                        errorMessage={errors.description}
                    />
                </div>
                <div className="col-span-2">
                    <Button type="submit" className="w-full">
                        {TEXT.SUBMIT}
                    </Button>
                </div>
            </div>
        </form>
    );
}
